import { getOpenAI } from "../../openaiService";
import { withOpenAIGuard } from "../openai-config";
import { classifyMode, isPromptInjectionAttempt } from "./classify";
import { selectKnowledgeSlice, DE_COMPANY } from "./knowledge";
import {
  extractProfileFromText,
  mergeProfile,
  knownFactsList,
} from "./profile";
import { buildSystemPrompt, OFF_TOPIC_FALLBACK, INCIDENT_FALLBACK, AI_UNAVAILABLE_FALLBACK } from "./prompt";
import { sanitizeActions, assertNoInternalLeak, defaultActionsForMode } from "./actions";
import {
  appendMessage,
  getOrCreateSession,
  updateProfile,
} from "./session";
import type {
  AdvisorChatRequest,
  AdvisorChatResponse,
  AdvisorMode,
  ModelAdvisorOutput,
} from "./types";

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
      reply: `Our ProActive packages are sized by users and outcomes — for example Office starts at $165/user/mo with a $750/site/mo minimum, Business at $245/user/mo ($1,200 site min), and Enterprise at $345/user/mo ($1,725 site min). The right fit depends on your team size, security needs, and any compliance requirements. About how many users do you support?`,
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

export async function handleAdvisorChat(req: AdvisorChatRequest): Promise<AdvisorChatResponse> {
  const message = (req.message || "").trim().slice(0, 4000);
  if (!message) {
    throw Object.assign(new Error("Message is required"), { status: 400 });
  }

  const session = getOrCreateSession(req.sessionId, req.pageContext);
  const page = req.pageContext || session.pageContext;

  // Merge heuristic extraction before model so known facts are available
  let profile = mergeProfile(session.profile, extractProfileFromText(message));
  updateProfile(session, profile);

  let mode = classifyMode(message, page);

  if (isPromptInjectionAttempt(message)) {
    const reply =
      "I can’t share internal instructions or secrets. I’m here to help with business IT, cybersecurity, compliance, and Digerati Experts services — what technology or security challenge are you working through?";
    appendMessage(session, "user", message);
    appendMessage(session, "assistant", reply);
    session.lastMode = mode === "off_topic" ? "msp_discovery" : mode;
    return {
      sessionId: session.id,
      reply,
      mode: session.lastMode,
      profile,
      actions: defaultActionsForMode(session.lastMode),
      analyticsEvents: ["qualified_question"],
      knownFacts: knownFactsList(profile),
    };
  }

  const knowledge = selectKnowledgeSlice(mode, page);
  const system = buildSystemPrompt({ mode, knowledge, profile, page });

  const history = session.messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  appendMessage(session, "user", message);

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

  return {
    sessionId: session.id,
    reply: modelOut.reply,
    mode,
    profile,
    actions,
    analyticsEvents,
    knownFacts: knownFactsList(profile),
  };
}
