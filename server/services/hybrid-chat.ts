import { withOpenAIGuard } from "./openai-config";

export type ChatMode = "human" | "ai" | "hybrid";
export type ChatTone = "professional" | "friendly" | "technical";

export interface ChatResponse {
  messageId: string;
  content: string;
  mode: ChatMode;
  respondedBy: "user" | "ai" | "human";
  tone: ChatTone;
  confidence?: number;
  timestamp: string;
  suggestedFollowUp?: string;
}

export interface ChatContext {
  clientId: string;
  ticketId?: string;
  previousMessages?: Array<{ role: "user" | "assistant"; content: string }>;
  tone?: ChatTone;
  mode?: ChatMode;
}

/**
 * Generate AI response for chat
 * Gracefully falls back if OpenAI is disabled
 */
export async function generateAIChatResponse(
  userMessage: string,
  context: ChatContext,
  tone: ChatTone = "professional"
): Promise<ChatResponse | null> {
  const aiResponse = await withOpenAIGuard(async () => {
    // Mock implementation - will be replaced with real OpenAI call
    // when integrated with actual API

    // Simulated OpenAI response generation
    const systemPrompt = buildSystemPrompt(context, tone);
    const messages = buildMessageHistory(userMessage, context);

    // In production: const result = await openai.chat.completions.create({...})
    // For now, return structured mock response
    return {
      content: generateMockResponse(userMessage, tone),
      confidence: 0.82,
      suggestedFollowUp: generateFollowUp(userMessage),
    };
  });

  if (!aiResponse) {
    // OpenAI disabled - return null, will escalate to human
    return null;
  }

  return {
    messageId: `msg-${Math.random().toString(36).substring(7)}`,
    content: aiResponse.content,
    mode: "ai",
    respondedBy: "ai",
    tone,
    confidence: aiResponse.confidence,
    timestamp: new Date().toISOString(),
    suggestedFollowUp: aiResponse.suggestedFollowUp,
  };
}

/**
 * Determine if response should be handled by AI or escalated to human
 */
export function shouldEscalateToHuman(
  userMessage: string,
  context: ChatContext
): boolean {
  const text = userMessage.toLowerCase();

  // Escalate if message contains escalation keywords
  const escalationKeywords = [
    "urgent",
    "emergency",
    "human",
    "manager",
    "supervisor",
    "complaint",
    "unhappy",
    "frustrated",
    "refund",
    "billing issue",
    "critical",
  ];

  if (escalationKeywords.some((kw) => text.includes(kw))) {
    return true;
  }

  // Escalate if message is too complex (long or technical)
  if (userMessage.length > 500) {
    return true;
  }

  // Escalate if it contains code or technical patterns
  if (text.includes("error") || text.includes("crash") || text.includes("exception")) {
    return true;
  }

  return false;
}

/**
 * Route message to appropriate handler
 */
export async function routeMessage(
  userMessage: string,
  context: ChatContext
): Promise<ChatResponse | null> {
  // Check if should escalate immediately
  if (shouldEscalateToHuman(userMessage, context)) {
    return null; // Signal to escalate to human
  }

  // Try AI response first
  const tone = context.tone || "professional";
  const aiResponse = await generateAIChatResponse(userMessage, context, tone);

  if (aiResponse) {
    return aiResponse;
  }

  // If AI disabled or failed, return null to escalate to human
  return null;
}

/**
 * Build system prompt for OpenAI
 */
function buildSystemPrompt(context: ChatContext, tone: ChatTone): string {
  const toneInstructions: Record<ChatTone, string> = {
    professional:
      "Respond in a professional, business-appropriate manner. Keep responses concise and action-oriented.",
    friendly:
      "Respond in a warm, approachable manner. Use conversational language while remaining helpful.",
    technical:
      "Respond with technical accuracy and detail. Assume the user has technical knowledge. Include relevant technical terms.",
  };

  return `You are a helpful support assistant for Digerati Experts MSP portal. 
${toneInstructions[tone]}
- Be concise and clear
- Provide actionable solutions
- If you don't know, say so and suggest escalation to human support
- Always be professional and respectful`;
}

/**
 * Build message history for OpenAI context
 */
function buildMessageHistory(
  userMessage: string,
  context: ChatContext
): Array<{ role: "user" | "assistant"; content: string }> {
  const messages: Array<{ role: "user" | "assistant"; content: string }> = [];

  // Add previous messages for context
  if (context.previousMessages) {
    messages.push(...context.previousMessages.slice(-5)); // Last 5 messages for context
  }

  // Add current message
  messages.push({ role: "user", content: userMessage });

  return messages;
}

/**
 * Generate mock AI response (until real OpenAI integration)
 */
function generateMockResponse(userMessage: string, tone: ChatTone): string {
  const text = userMessage.toLowerCase();

  // Simple pattern matching for demo
  if (text.includes("password") || text.includes("login")) {
    return "I can help you with password issues. To reset your password, please visit the login page and click 'Forgot Password'. If you need additional help, I can escalate this to our support team.";
  }

  if (text.includes("bill") || text.includes("invoice")) {
    return "For billing questions, I can help you understand your invoice. What specifically would you like to know about your billing?";
  }

  if (text.includes("shipping") || text.includes("ship")) {
    return "We can help you with shipping! You can track packages in the Ship Center. Would you like to track a specific order?";
  }

  if (text.includes("status") || text.includes("availability")) {
    return "Our systems are currently operating normally. All services are available. If you're experiencing issues, please provide more details.";
  }

  return "Thank you for your message. I'm here to help. Could you provide more details about what you need assistance with?";
}

/**
 * Generate follow-up suggestion
 */
function generateFollowUp(userMessage: string): string {
  const text = userMessage.toLowerCase();

  if (text.includes("password")) {
    return "Would you like me to send you a password reset link?";
  }

  if (text.includes("track")) {
    return "Do you have a tracking number I can help you look up?";
  }

  if (text.includes("help")) {
    return "Is there anything else I can help you with today?";
  }

  return undefined;
}

/**
 * Assess message sentiment for AI confidence
 */
export function assessSentiment(message: string): "positive" | "neutral" | "negative" {
  const text = message.toLowerCase();

  const negativeWords = ["bad", "poor", "awful", "terrible", "hate", "angry", "upset", "frustrated"];
  const positiveWords = ["great", "excellent", "thank", "appreciate", "love", "happy", "perfect"];

  const negativeCount = negativeWords.filter((w) => text.includes(w)).length;
  const positiveCount = positiveWords.filter((w) => text.includes(w)).length;

  if (negativeCount > positiveCount) return "negative";
  if (positiveCount > negativeCount) return "positive";
  return "neutral";
}

/**
 * Determine priority for human review
 */
export function getPriorityForHumanReview(
  userMessage: string,
  sentiment: "positive" | "neutral" | "negative"
): "low" | "medium" | "high" {
  if (sentiment === "negative" || shouldEscalateToHuman(userMessage, {})) {
    return "high";
  }

  if (userMessage.length > 300) {
    return "medium";
  }

  return "low";
}
