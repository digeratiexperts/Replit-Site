/**
 * AI Service for intelligent portal features
 * Supports ticket classification, smart routing, and recommendations
 */

interface AIClassificationResult {
  category: string;
  confidence: number;
  suggestedPriority: "low" | "medium" | "high" | "critical";
  suggestedDepartment: string;
}

interface AISuggestion {
  type: "resolution" | "escalation" | "info" | "action";
  content: string;
  confidence: number;
  source: string;
}

export const aiService = {
  /**
   * Classify a ticket based on its content
   * Uses local heuristics for now; can be extended with LLM integration
   */
  async classifyTicket(title: string, description: string): Promise<AIClassificationResult> {
    const content = `${title} ${description}`.toLowerCase();

    // Heuristic-based classification
    const urgentKeywords = ["critical", "down", "emergency", "urgent", "hacked", "breach"];
    const securityKeywords = ["security", "malware", "virus", "ransomware", "exploit", "compromise"];
    const networkKeywords = ["network", "connectivity", "internet", "wifi", "vpn", "firewall"];
    const accountKeywords = ["password", "access", "login", "permission", "mfa", "2fa"];

    let category = "General Support";
    let department = "support";
    let priority: "low" | "medium" | "high" | "critical" = "medium";
    let confidence = 0.6;

    // Determine category and priority
    if (urgentKeywords.some((kw) => content.includes(kw))) {
      priority = "critical";
      confidence = 0.9;
      category = "Critical Incident";
    } else if (securityKeywords.some((kw) => content.includes(kw))) {
      category = "Security";
      department = "security";
      priority = "high";
      confidence = 0.85;
    } else if (networkKeywords.some((kw) => content.includes(kw))) {
      category = "Network";
      department = "infrastructure";
      priority = "high";
      confidence = 0.8;
    } else if (accountKeywords.some((kw) => content.includes(kw))) {
      category = "Access & Permissions";
      department = "identity";
      priority = "high";
      confidence = 0.75;
    }

    return {
      category,
      confidence,
      suggestedPriority: priority,
      suggestedDepartment: department,
    };
  },

  /**
   * Generate smart suggestions based on ticket content
   */
  async generateSuggestions(ticketData: {
    title: string;
    description: string;
    category?: string;
  }): Promise<AISuggestion[]> {
    const suggestions: AISuggestion[] = [];
    const content = `${ticketData.title} ${ticketData.description}`.toLowerCase();

    // Check if this is a common password reset issue
    if (content.includes("password") || content.includes("forgot password")) {
      suggestions.push({
        type: "action",
        content:
          "Check knowledge base article 'Self-Service Password Reset' for common solutions",
        confidence: 0.95,
        source: "knowledge_base",
      });
    }

    // Check for VPN issues
    if (content.includes("vpn") || content.includes("cannot connect")) {
      suggestions.push({
        type: "info",
        content: "VPN connectivity issues often resolve after clearing cache. See KB: VPN Troubleshooting",
        confidence: 0.8,
        source: "knowledge_base",
      });
    }

    // Check for security concerns
    if (content.includes("hacked") || content.includes("breach") || content.includes("suspicious")) {
      suggestions.push({
        type: "escalation",
        content:
          "Security concern detected. Recommend immediate escalation to Security Team.",
        confidence: 0.95,
        source: "security_policy",
      });
    }

    // Check for backup/recovery related
    if (
      content.includes("backup") ||
      content.includes("recover") ||
      content.includes("lost data")
    ) {
      suggestions.push({
        type: "resolution",
        content:
          "Check if data can be recovered from backup. See recovery procedures in Knowledge Base.",
        confidence: 0.7,
        source: "disaster_recovery",
      });
    }

    return suggestions;
  },

  /**
   * Analyze ticket resolution time and predict resolution
   */
  async predictResolutionTime(ticketCategory: string, priority: string): Promise<number> {
    // Simple heuristic: return estimated minutes
    const baseTime: Record<string, number> = {
      "Access & Permissions": 15,
      "General Support": 30,
      Network: 45,
      Security: 120,
      "Critical Incident": 10, // immediate response
      "Default": 30,
    };

    const priorityMultiplier: Record<string, number> = {
      low: 2,
      medium: 1.5,
      high: 1,
      critical: 0.5,
    };

    const base = baseTime[ticketCategory] || baseTime["Default"];
    const multiplier = priorityMultiplier[priority] || 1;

    return Math.round(base * multiplier);
  },

  /**
   * Recommend next action for a ticket
   */
  async recommendAction(ticketData: {
    status: string;
    priority: string;
    resolutionTimeElapsed: number;
    lastUpdated: Date;
  }): Promise<{ action: string; reason: string } | null> {
    const now = new Date();
    const minsSinceUpdate = (now.getTime() - ticketData.lastUpdated.getTime()) / (1000 * 60);

    // If ticket is pending_client and no response for > 48 hours, recommend follow-up
    if (ticketData.status === "pending_client" && minsSinceUpdate > 2880) {
      return {
        action: "send_follow_up",
        reason: "Client has not responded in 48+ hours",
      };
    }

    // If high priority ticket unresolved for > 4 hours, recommend escalation
    if (
      ticketData.priority === "high" &&
      ticketData.status === "in_progress" &&
      ticketData.resolutionTimeElapsed > 240
    ) {
      return {
        action: "escalate",
        reason: "High priority ticket unresolved for 4+ hours",
      };
    }

    // If critical ticket unresolved for > 1 hour, recommend immediate escalation
    if (
      ticketData.priority === "critical" &&
      ticketData.status === "in_progress" &&
      ticketData.resolutionTimeElapsed > 60
    ) {
      return {
        action: "escalate_immediately",
        reason: "Critical ticket unresolved for 1+ hour",
      };
    }

    return null;
  },
};
