import { getOpenAI } from "../../openaiService";
import { withOpenAIGuard } from "../openai-config";
import { classifyMode, isPromptInjectionAttempt } from "./classify";
import { selectKnowledgeSlice, DE_COMPANY } from "./knowledge";
import {
  extractProfileFromText,
  mergeProfile,
  knownFactsList,
  extractContactNameFromText,
  extractCompanyNameFromText,
  isSubstantiveAdvisorQuestion,
} from "./profile";
import { buildSystemPrompt, OFF_TOPIC_FALLBACK, INCIDENT_FALLBACK, AI_UNAVAILABLE_FALLBACK } from "./prompt";
import { sanitizeActions, assertNoInternalLeak, defaultActionsForMode } from "./actions";
import {
  appendMessage,
  getOrCreateSession,
  updateProfile,
} from "./session";
import { appendDeskMessage, isDeskAgentLive } from "./persist";
import type {
  AdvisorChatRequest,
  AdvisorChatResponse,
  AdvisorMode,
  ModelAdvisorOutput,
} from "./types";

async function persistTurn(
  sessionId: string,
  userMessage: string,
  assistantReply: string,
  profile: { email?: string | null; contactName?: string | null; companyName?: string | null },
  pagePath?: string,
): Promise<{ messageId?: string; messageCreatedAt?: string }> {
  try {
    const meta = {
      email: profile.email || null,
      contactName: profile.contactName || null,
      companyName: profile.companyName || null,
      pagePath: pagePath || null,
    };
    await appendDeskMessage({ sessionId, role: "user", content: userMessage, ...meta });
    const assistant = await appendDeskMessage({
      sessionId,
      role: "assistant",
      content: assistantReply,
      ...meta,
    });
    return { messageId: assistant.id, messageCreatedAt: assistant.createdAt };
  } catch (err: any) {
    console.warn("[msp-advisor] persist failed (non-blocking):", err?.message || err);
    return {};
  }
}

function parseModelJson(raw: string): ModelAdvisorOutput | null {
  try {
    const trimmed = raw.trim().replace(/^```json\s*/i, "").replace(/```$/i, "");
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start < 0 || end < 0) return null;
    return JSON.parse(trimmed.slice(start, end + 1)) as ModelAdvisorOutput;
  } catch {
    return null;
  }
}

function heuristicReply(mode: AdvisorMode, message: string): ModelAdvisorOutput {
  if (mode === "off_topic") {
    return {
      reply: OFF_TOPIC_FALLBACK,
      mode,
      proposedActions: [{ type: "request_assessment" }],
      analyticsEvents: ["off_topic_redirected"],
    };
  }
  if (mode === "security_incident") {
    return {
      reply: INCIDENT_FALLBACK,
      mode,
      proposedActions: [{ type: "request_callback" }, { type: "contact_sales" }],
      analyticsEvents: ["qualified_question"],
    };
  }
  if (mode === "existing_client") {
    return {
      reply: `If you're an existing Digerati Experts client, the fastest path is the Client Portal for tickets and account tools: ${DE_COMPANY.portalLogin}. You can also leave a message here or call ${DE_COMPANY.phoneDisplay}. What do you need help with today?`,
      mode,
      proposedActions: [{ type: "open_portal" }, { type: "leave_message" }],
      analyticsEvents: ["support_routed"],
    };
  }
  if (mode === "pricing") {
    return {
      reply: `Our ProActive packages are sized by users and outcomes — IT from $125/user/mo ($1,600/mo minimum), Office $165/user/mo ($2,400/mo minimum), Business $245/user/mo ($5,400/mo minimum), and Enterprise $345/user/mo ($9,000/mo minimum). The right fit depends on your team size, security needs, and compliance requirements. About how many users do you support?`,
      mode,
      proposedActions: [{ type: "request_assessment" }, { type: "schedule_consultation" }],
      analyticsEvents: ["qualified_question", "service_recommended"],
      profilePatch: { recommendedServices: ["ProActive"] },
    };
  }

  return {
    reply: `${AI_UNAVAILABLE_FALLBACK}\n\nYou asked: “${message.slice(0, 180)}”. Tell me your approximate user count and main IT or security concern and I’ll recommend a DE path.`,
    mode,
    proposedActions: [{ type: "request_assessment" }, { type: "schedule_consultation" }],
    analyticsEvents: ["qualified_question"],
  };
}

async function callModel(system: string, history: Array<{ role: "user" | "assistant"; content: string }>, userMessage: string): Promise<string | null> {
  return withOpenAIGuard(async () => {
    const client = getOpenAI();
    if (!client) return null;

    const result = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      max_tokens: 550,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        ...history.slice(-10),
        { role: "user", content: userMessage },
      ],
    });

    return result.choices[0]?.message?.content?.trim() || null;
  });
}

function identityNamePrompt(): string {
  return "Before we continue, what's your name?";
}

function identityCompanyPrompt(contactName?: string): string {
  const first = (contactName || "").split(" ")[0];
  return first
    ? `Thanks, ${first}. What company are you with?`
    : "What company are you with?";
}

export async function handleAdvisorChat(req: AdvisorChatRequest): Promise<AdvisorChatResponse> {
  const userTurn = (req.message || "").trim().slice(0, 4000);
  if (!userTurn) {
    throw Object.assign(new Error("Message is required"), { status: 400 });
  }
  let message = userTurn;

  const session = getOrCreateSession(req.sessionId, req.pageContext);
  const page = req.pageContext || session.pageContext;
  const priorName = session.profile.contactName;

  // Merge heuristic extraction before model so known facts are available
  let profile = mergeProfile(session.profile, extractProfileFromText(message));
  if (priorName) {
    profile = mergeProfile(profile, { contactName: priorName });
  } else {
    const named = extractContactNameFromText(message);
    if (named) profile = mergeProfile(profile, { contactName: named });
  }
  updateProfile(session, profile);

  // When a portal agent has joined, skip AI and hand the turn to the human.
  const agentStatus = await isDeskAgentLive(session.id);
  if (agentStatus.live) {
    appendMessage(session, "user", message);
    try {
      await appendDeskMessage({
        sessionId: session.id,
        role: "user",
        content: message,
        email: profile.email || null,
        contactName: profile.contactName || null,
        companyName: profile.companyName || null,
        pagePath: page?.pathname || null,
      });
    } catch (err: any) {
      console.warn("[msp-advisor] agent-live persist failed:", err?.message || err);
    }
    const agentLabel = agentStatus.agentName || "a Digerati specialist";
    const reply = `${agentLabel} is with you now — your message was delivered. They’ll reply in this chat shortly.`;
    // Persist the ack so portal sees it; visitor already shows it from this response.
    let messageId: string | undefined;
    let messageCreatedAt: string | undefined;
    try {
      const ack = await appendDeskMessage({
        sessionId: session.id,
        role: "assistant",
        content: reply,
        senderName: agentStatus.agentName || "DE Desk",
        email: profile.email || null,
        contactName: profile.contactName || null,
        companyName: profile.companyName || null,
        pagePath: page?.pathname || null,
      });
      messageId = ack.id;
      messageCreatedAt = ack.createdAt;
    } catch (err: any) {
      console.warn("[msp-advisor] agent-live ack persist failed:", err?.message || err);
    }
    return {
      sessionId: session.id,
      reply,
      mode: session.lastMode || "existing_client",
      profile,
      actions: defaultActionsForMode(session.lastMode || "existing_client"),
      analyticsEvents: ["support_routed"],
      knownFacts: knownFactsList(profile),
      agentLive: true,
      agentName: agentStatus.agentName,
      messageId,
      messageCreatedAt,
    };
  }

  let mode = classifyMode(message, page);

  if (isPromptInjectionAttempt(message)) {
    const reply =
      "I can’t share internal instructions or secrets. I’m here to help with business IT, cybersecurity, compliance, and Digerati Experts services — what technology or security challenge are you working through?";
    appendMessage(session, "user", message);
    appendMessage(session, "assistant", reply);
    session.lastMode = mode === "off_topic" ? "msp_discovery" : mode;
    const persisted = await persistTurn(session.id, message, reply, profile, page?.pathname);
    return {
      sessionId: session.id,
      reply,
      mode: session.lastMode,
      profile,
      actions: defaultActionsForMode(session.lastMode),
      analyticsEvents: ["qualified_question"],
      knownFacts: knownFactsList(profile),
      ...persisted,
    };
  }

  const skipIdentity = mode === "security_incident";
  if (!skipIdentity && !profile.contactName) {
    if (isSubstantiveAdvisorQuestion(message) && !session.heldUserMessage) {
      session.heldUserMessage = message;
    }
    const reply = identityNamePrompt();
    appendMessage(session, "user", message);
    appendMessage(session, "assistant", reply);
    session.lastMode = mode === "off_topic" ? "msp_discovery" : mode;
    const persisted = await persistTurn(session.id, message, reply, profile, page?.pathname);
    return {
      sessionId: session.id,
      reply,
      mode: session.lastMode,
      profile,
      actions: [],
      analyticsEvents: ["conversation_started"],
      knownFacts: knownFactsList(profile),
      ...persisted,
    };
  }

  if (!skipIdentity && !profile.companyName) {
    const collectedNameThisTurn = Boolean(!priorName && profile.contactName);
    const companyGuess = extractCompanyNameFromText(message, { allowBare: !collectedNameThisTurn });
    if (companyGuess && companyGuess.toLowerCase() !== (profile.contactName || "").toLowerCase()) {
      profile = mergeProfile(profile, { companyName: companyGuess });
      updateProfile(session, profile);
    }
  }

  if (!skipIdentity && !profile.companyName) {
    const reply = identityCompanyPrompt(profile.contactName);
    appendMessage(session, "user", message);
    appendMessage(session, "assistant", reply);
    session.lastMode = mode === "off_topic" ? "msp_discovery" : mode;
    const persisted = await persistTurn(session.id, message, reply, profile, page?.pathname);
    return {
      sessionId: session.id,
      reply,
      mode: session.lastMode,
      profile,
      actions: [],
      analyticsEvents: ["conversation_started"],
      knownFacts: knownFactsList(profile),
      ...persisted,
    };
  }

  if (session.heldUserMessage && session.heldUserMessage !== message) {
    message = session.heldUserMessage;
    session.heldUserMessage = undefined;
    mode = classifyMode(message, page);
  } else {
    session.heldUserMessage = undefined;
  }

  const knowledge = selectKnowledgeSlice(mode, page);
  const system = buildSystemPrompt({ mode, knowledge, profile, page });

  const history = session.messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  appendMessage(session, "user", userTurn);

  let modelOut: ModelAdvisorOutput | null = null;
  try {
    const raw = await callModel(system, history, message);
    if (raw) modelOut = parseModelJson(raw);
  } catch (err) {
    console.error("[msp-advisor] model call failed:", err);
  }

  if (!modelOut?.reply) {
    modelOut = heuristicReply(mode, message);
  }

  // Prefer heuristic mode for safety-critical modes
  if (mode === "security_incident" || mode === "off_topic" || mode === "existing_client") {
    modelOut.mode = mode;
  } else if (modelOut.mode) {
    mode = modelOut.mode;
  }

  if (mode === "off_topic" && !modelOut.reply.includes("focused on business IT")) {
    modelOut.reply = OFF_TOPIC_FALLBACK;
    modelOut.analyticsEvents = [...(modelOut.analyticsEvents || []), "off_topic_redirected"];
  }

  if (!assertNoInternalLeak(modelOut.reply)) {
    modelOut.reply = AI_UNAVAILABLE_FALLBACK;
  }

  profile = mergeProfile(profile, modelOut.profilePatch);
  profile = mergeProfile(profile, extractProfileFromText(message));
  updateProfile(session, profile);

  const actions = sanitizeActions(modelOut.proposedActions, { mode });
  const analyticsEvents = Array.from(
    new Set(
      (modelOut.analyticsEvents || []).filter((e) =>
        [
          "qualified_question",
          "service_recommended",
          "assessment_offered",
          "lead_capture_started",
          "booking_clicked",
          "support_routed",
          "off_topic_redirected",
        ].includes(e),
      ),
    ),
  );

  if (!session.analyticsFlags.conversation_started) {
    session.analyticsFlags.conversation_started = true;
    analyticsEvents.unshift("conversation_started");
  }

  appendMessage(session, "assistant", modelOut.reply);
  session.lastMode = mode;

  const persisted = await persistTurn(session.id, userTurn, modelOut.reply, profile, page?.pathname);

  return {
    sessionId: session.id,
    reply: modelOut.reply,
    mode,
    profile,
    actions,
    analyticsEvents,
    knownFacts: knownFactsList(profile),
    ...persisted,
  };
}
