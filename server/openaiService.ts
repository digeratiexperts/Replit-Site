import OpenAI from "openai";

let openaiClient: OpenAI | null = null;

export function initOpenAI(): OpenAI | null {
  if (openaiClient) return openaiClient;
  
  const baseURL = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;
  const apiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY;
  
  if (!baseURL || !apiKey) {
    console.log("⚠️ OpenAI integration not configured - AI features disabled");
    return null;
  }
  
  try {
    openaiClient = new OpenAI({
      baseURL,
      apiKey,
    });
    console.log("✅ OpenAI client initialized");
    return openaiClient;
  } catch (error) {
    console.error("Failed to initialize OpenAI:", error);
    return null;
  }
}

export function getOpenAI(): OpenAI | null {
  return openaiClient || initOpenAI();
}

export async function classifyTicket(title: string, description: string): Promise<{
  category: string;
  priority: "low" | "medium" | "high" | "critical";
  suggestedTags: string[];
}> {
  const client = getOpenAI();
  
  if (!client) {
    return {
      category: "General",
      priority: "medium",
      suggestedTags: [],
    };
  }
  
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a support ticket classifier for an MSP (Managed Service Provider). 
Analyze the ticket and return JSON with:
- category: one of "Network", "Hardware", "Software", "Security", "Email", "Cloud", "General"
- priority: one of "low", "medium", "high", "critical" based on urgency
- suggestedTags: array of relevant tags

Respond only with valid JSON.`
        },
        {
          role: "user",
          content: `Title: ${title}\nDescription: ${description}`
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 200,
    });
    
    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from AI");
    }
    
    return JSON.parse(content);
  } catch (error) {
    console.error("AI classification failed:", error);
    return {
      category: "General",
      priority: "medium",
      suggestedTags: [],
    };
  }
}

export async function generateChatResponse(
  userMessage: string,
  conversationHistory: Array<{ role: "user" | "assistant"; content: string }>
): Promise<string> {
  const client = getOpenAI();
  
  if (!client) {
    return "I'm sorry, the AI assistant is currently unavailable. Please contact support directly or create a support ticket.";
  }
  
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a helpful IT support assistant for Digerati Experts, an MSP company. 
You help clients with technical questions, troubleshooting, and service inquiries.
Be professional, concise, and helpful. If you cannot resolve an issue, suggest creating a support ticket.
For billing or account-specific questions, direct users to their account manager.`
        },
        ...conversationHistory.map(msg => ({
          role: msg.role as "user" | "assistant",
          content: msg.content
        })),
        { role: "user" as const, content: userMessage }
      ],
      max_tokens: 500,
    });
    
    return response.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("AI chat failed:", error);
    return "I'm experiencing technical difficulties. Please try again or contact support directly.";
  }
}

export async function summarizeTicket(
  ticketHistory: string
): Promise<string> {
  const client = getOpenAI();
  
  if (!client) {
    return "Summary unavailable - AI service not configured.";
  }
  
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Summarize the following support ticket history in 2-3 concise sentences, highlighting the main issue and current status."
        },
        { role: "user", content: ticketHistory }
      ],
      max_tokens: 150,
    });
    
    return response.choices[0]?.message?.content || "Unable to generate summary.";
  } catch (error) {
    console.error("AI summary failed:", error);
    return "Summary generation failed.";
  }
}
