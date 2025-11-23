/**
 * Event Bus for cross-service communication
 * Enables different portal services to communicate intelligently
 */

type EventListener = (data: any) => Promise<void> | void;

interface EventBusEvent {
  type: string;
  data: any;
  timestamp: Date;
  source: string;
}

class EventBus {
  private listeners: Map<string, EventListener[]> = new Map();
  private eventHistory: EventBusEvent[] = [];
  private maxHistorySize = 1000;

  /**
   * Subscribe to an event type
   */
  on(eventType: string, listener: EventListener): void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType)!.push(listener);
  }

  /**
   * Unsubscribe from an event
   */
  off(eventType: string, listener: EventListener): void {
    if (!this.listeners.has(eventType)) return;
    const handlers = this.listeners.get(eventType)!;
    const index = handlers.indexOf(listener);
    if (index > -1) {
      handlers.splice(index, 1);
    }
  }

  /**
   * Emit an event to all listeners
   */
  async emit(eventType: string, data: any, source: string = "system"): Promise<void> {
    const event: EventBusEvent = {
      type: eventType,
      data,
      timestamp: new Date(),
      source,
    };

    // Store in history for audit/replay
    this.eventHistory.push(event);
    if (this.eventHistory.length > this.maxHistorySize) {
      this.eventHistory.shift();
    }

    const listeners = this.listeners.get(eventType) || [];
    for (const listener of listeners) {
      try {
        await listener(data);
      } catch (error) {
        console.error(`Error in event listener for ${eventType}:`, error);
      }
    }
  }

  /**
   * Get event history for audit trails
   */
  getHistory(eventType?: string, limit: number = 100): EventBusEvent[] {
    if (!eventType) {
      return this.eventHistory.slice(-limit);
    }
    return this.eventHistory.filter((e) => e.type === eventType).slice(-limit);
  }

  /**
   * Clear event history
   */
  clearHistory(): void {
    this.eventHistory = [];
  }
}

// Event types for portal services
export const EventTypes = {
  // Ticket events
  TICKET_CREATED: "ticket:created",
  TICKET_UPDATED: "ticket:updated",
  TICKET_RESOLVED: "ticket:resolved",
  TICKET_ASSIGNED: "ticket:assigned",

  // Payment events
  PAYMENT_COMPLETED: "payment:completed",
  PAYMENT_FAILED: "payment:failed",
  INVOICE_PAID: "invoice:paid",

  // Service events
  SERVICE_ACTIVATED: "service:activated",
  SERVICE_CANCELLED: "service:cancelled",

  // Shipment events
  SHIPMENT_CREATED: "shipment:created",
  SHIPMENT_DELIVERED: "shipment:delivered",

  // AI events
  AI_SUGGESTION: "ai:suggestion",
  AI_CLASSIFICATION: "ai:classification",
  KNOWLEDGE_BASE_UPDATED: "kb:updated",

  // Chat events
  CHAT_MESSAGE_SENT: "chat:message_sent",
  CHAT_SESSION_CREATED: "chat:session_created",
};

export const eventBus = new EventBus();
