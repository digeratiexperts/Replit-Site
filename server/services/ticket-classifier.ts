import { withOpenAIGuard } from "./openai-config";

export interface TicketClassification {
  category: string;
  priority: "low" | "medium" | "high" | "critical";
  suggestedResolution?: string;
  confidence: number;
  tags: string[];
}

/**
 * Classify a support ticket using OpenAI
 * Falls back gracefully if OpenAI is disabled
 */
export async function classifyTicket(
  title: string,
  description: string,
  clientContext?: {
    industry?: string;
    serviceLevel?: string;
  }
): Promise<TicketClassification | null> {
  // Use the guard to check if OpenAI is enabled
  const result = await withOpenAIGuard(async () => {
    // Simulated OpenAI call - when ready, replace with real API
    // This would normally call: const result = await openai.chat.completions.create({...})

    // For now, return mock classification
    return {
      category: detectCategory(title, description),
      priority: detectPriority(title, description),
      suggestedResolution: generateSuggestion(title, description),
      confidence: 0.85,
      tags: generateTags(title, description),
    };
  });

  return result;
}

/**
 * Basic category detection (will be enhanced with OpenAI)
 */
function detectCategory(title: string, description: string): string {
  const text = `${title} ${description}`.toLowerCase();

  if (text.includes("password") || text.includes("login") || text.includes("access")) return "Authentication";
  if (text.includes("crash") || text.includes("error") || text.includes("fail")) return "System Error";
  if (text.includes("slow") || text.includes("performance") || text.includes("lag")) return "Performance";
  if (text.includes("security") || text.includes("breach") || text.includes("vulnerability")) return "Security";
  if (text.includes("network") || text.includes("connection") || text.includes("internet")) return "Connectivity";
  if (text.includes("bill") || text.includes("invoice") || text.includes("payment")) return "Billing";

  return "General Support";
}

/**
 * Priority detection based on keywords
 */
function detectPriority(
  title: string,
  description: string
): "low" | "medium" | "high" | "critical" {
  const text = `${title} ${description}`.toLowerCase();

  if (
    text.includes("critical") ||
    text.includes("emergency") ||
    text.includes("urgent") ||
    text.includes("down")
  )
    return "critical";
  if (
    text.includes("important") ||
    text.includes("asap") ||
    text.includes("high") ||
    text.includes("severe")
  )
    return "high";
  if (text.includes("medium") || text.includes("normal")) return "medium";

  return "low";
}

/**
 * Generate suggested resolution
 */
function generateSuggestion(title: string, description: string): string {
  const category = detectCategory(title, description);

  const suggestions: Record<string, string> = {
    Authentication: "Check credentials, reset password, or verify 2FA configuration.",
    "System Error": "Review error logs, restart service, or check system resources.",
    Performance: "Analyze resource usage, optimize queries, or scale infrastructure.",
    Security: "Run security audit, update systems, and review access logs.",
    Connectivity: "Check network connection, firewall rules, and DNS settings.",
    Billing: "Review invoice, verify charges, or contact billing team.",
    "General Support": "Gather more information and escalate if needed.",
  };

  return suggestions[category] || "Needs manual investigation.";
}

/**
 * Generate relevant tags
 */
function generateTags(title: string, description: string): string[] {
  const text = `${title} ${description}`.toLowerCase();
  const tags: string[] = [];

  // Category tag
  tags.push(detectCategory(title, description).replace(" ", "-").toLowerCase());

  // Urgency tag
  if (detectPriority(title, description) === "critical") tags.push("urgent");
  if (detectPriority(title, description) === "high") tags.push("important");

  // Feature tags
  if (text.includes("api")) tags.push("api");
  if (text.includes("database")) tags.push("database");
  if (text.includes("email")) tags.push("email");
  if (text.includes("integration")) tags.push("integration");
  if (text.includes("payment")) tags.push("payment");
  if (text.includes("shipping")) tags.push("shipping");

  return Array.from(new Set(tags));
}

/**
 * Suggest next actions for a ticket
 */
export async function suggestNextActions(
  classification: TicketClassification,
  clientId: string
): Promise<string[]> {
  const actions: string[] = [];

  switch (classification.category) {
    case "Authentication":
      actions.push("Send password reset link", "Check account lockout status", "Review login history");
      break;
    case "System Error":
      actions.push("Check system logs", "Restart affected service", "Monitor for recurrence");
      break;
    case "Performance":
      actions.push("Monitor resource usage", "Analyze slow queries", "Suggest optimization");
      break;
    case "Security":
      actions.push("Run security scan", "Review access controls", "Update security policies");
      break;
    case "Connectivity":
      actions.push("Test network connectivity", "Check firewall rules", "Verify DNS");
      break;
    case "Billing":
      actions.push("Review billing details", "Check invoice accuracy", "Process refund if needed");
      break;
    default:
      actions.push("Gather more information", "Assign to specialist", "Schedule follow-up");
  }

  return actions.slice(0, 3);
}

/**
 * Calculate SLA response time based on priority
 */
export function getSLAResponseTime(priority: string): number {
  const times: Record<string, number> = {
    critical: 15, // minutes
    high: 60,
    medium: 240,
    low: 1440,
  };

  return times[priority.toLowerCase()] || 240;
}
