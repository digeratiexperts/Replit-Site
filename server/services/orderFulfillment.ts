/**
 * Post-payment order fulfillment orchestrator.
 * Called after store_orders is marked paid (Zoho Payments webhook).
 * Fail-soft: never throws to the caller; webhook must still return 200.
 */

import { eq } from "drizzle-orm";
import { db } from "../db";
import { storeOrders, type StoreOrder } from "@shared/schema";
import { notificationService } from "./notificationService";
import { zohoClient } from "../zoho/zohoClient";
import { zohoDeskService } from "../zoho/zohoDesk";

const FULFILLED_STATUSES = new Set(["provisioning", "processing", "completed"]);
const SKIP_STATUSES = new Set(["cancelled", "refunded"]);
const FULFILLED_NOTE_MARKER = "[FULFILLED]";

type LineItem = {
  name?: string;
  sku?: string;
  unitPrice?: number | string;
  price?: number | string;
  quantity?: number | string;
};

function logSecurity(event: string, data: Record<string, unknown>) {
  console.log(`[SECURITY] ${event}`, data);
}

function alreadyFulfilled(order: StoreOrder): boolean {
  if (FULFILLED_STATUSES.has(order.status || "")) return true;
  if ((order.notes || "").includes(FULFILLED_NOTE_MARKER)) return true;
  return false;
}

function parseLineItems(raw: unknown): LineItem[] {
  if (!Array.isArray(raw)) return [];
  return raw as LineItem[];
}

function formatItemsForEmail(items: LineItem[]) {
  return items.map((item) => ({
    name: item.name || item.sku || "Item",
    price: Number(item.unitPrice ?? item.price ?? 0) || 0,
    quantity: Number(item.quantity ?? 1) || 1,
  }));
}

function buildDeskDescription(order: StoreOrder, items: LineItem[]): string {
  const lines = items.map((item) => {
    const qty = Number(item.quantity ?? 1) || 1;
    const price = Number(item.unitPrice ?? item.price ?? 0) || 0;
    const label = item.name || item.sku || "Item";
    return `- ${label} × ${qty} @ $${price.toFixed(2)}`;
  });

  return [
    `Paid store order requires fulfillment.`,
    ``,
    `Order Number: ${order.orderNumber}`,
    `Order ID: ${order.id}`,
    `Total: $${Number(order.total || 0).toFixed(2)}`,
    `Payment method: ${order.paymentMethod || "unknown"}`,
    `Zoho Payment ID: ${order.zohoPaymentId || "n/a"}`,
    `Zoho Session ID: ${order.zohoPaymentSessionId || "n/a"}`,
    `Billing: ${order.billingName || "n/a"} <${order.billingEmail || "n/a"}>`,
    order.billingCompany ? `Company: ${order.billingCompany}` : null,
    `Paid at: ${order.paidAt ? new Date(order.paidAt).toISOString() : "n/a"}`,
    ``,
    `Line items:`,
    ...lines,
  ]
    .filter(Boolean)
    .join("\n");
}

async function createFulfillmentDeskTicket(order: StoreOrder, items: LineItem[]): Promise<string | null> {
  if (!zohoClient.isDeskConfigured()) {
    console.log("[ORDER FULFILLMENT] Zoho Desk not configured — skipping ticket");
    return null;
  }

  try {
    let contactId: string | undefined;
    if (order.billingEmail) {
      try {
        const contact = await zohoDeskService.getContactByEmail(order.billingEmail);
        if (contact) contactId = contact.id;
      } catch (contactErr) {
        console.warn("[ORDER FULFILLMENT] Desk contact lookup failed:", contactErr);
      }
    }

    const ticket = await zohoDeskService.createTicket({
      subject: `Store order fulfillment: ${order.orderNumber}`,
      description: buildDeskDescription(order, items),
      contactId,
      email: contactId ? undefined : order.billingEmail || undefined,
      priority: "Medium",
    });

    logSecurity("ORDER_FULFILLMENT_DESK_TICKET", {
      orderId: order.id,
      orderNumber: order.orderNumber,
      zohoTicketId: ticket.id,
      ticketNumber: ticket.ticketNumber,
    });

    return ticket.id;
  } catch (err: any) {
    console.warn(
      "[ORDER FULFILLMENT] Zoho Desk ticket failed:",
      err?.response?.data || err?.message || err
    );
    return null;
  }
}

async function sendConfirmation(order: StoreOrder, items: LineItem[]): Promise<void> {
  if (!order.billingEmail) {
    console.warn("[ORDER FULFILLMENT] No billing email — skipping confirmation", {
      orderId: order.id,
      orderNumber: order.orderNumber,
    });
    return;
  }

  try {
    const sent = await notificationService.sendOrderConfirmation({
      email: order.billingEmail,
      name: order.billingName || "Customer",
      orderId: order.orderNumber,
      items: formatItemsForEmail(items),
      total: Number(order.total || 0) || 0,
    });

    logSecurity("ORDER_CONFIRMATION_EMAIL", {
      orderId: order.id,
      orderNumber: order.orderNumber,
      email: order.billingEmail,
      sent: !!sent,
    });
  } catch (err: any) {
    console.warn("[ORDER FULFILLMENT] Confirmation email failed:", err?.message || err);
  }
}

/**
 * Fulfill a paid store order: confirm email + Zoho Desk ticket + status progression.
 * Idempotent via status (provisioning/processing/completed) or notes marker.
 */
export async function fulfillPaidOrder(orderId: string | number): Promise<void> {
  const id = String(orderId);

  try {
    const [order] = await db.select().from(storeOrders).where(eq(storeOrders.id, id)).limit(1);

    if (!order) {
      console.error("[ORDER FULFILLMENT] Order not found", { orderId: id });
      logSecurity("ORDER_FULFILLMENT_SKIPPED", { orderId: id, reason: "not_found" });
      return;
    }

    if (SKIP_STATUSES.has(order.status || "")) {
      logSecurity("ORDER_FULFILLMENT_SKIPPED", {
        orderId: order.id,
        orderNumber: order.orderNumber,
        reason: "terminal_status",
        status: order.status,
      });
      return;
    }

    if (alreadyFulfilled(order)) {
      logSecurity("ORDER_FULFILLMENT_SKIPPED", {
        orderId: order.id,
        orderNumber: order.orderNumber,
        reason: "already_fulfilled",
        status: order.status,
      });
      return;
    }

    // Allow paid (and awaiting_payment in case webhook race left status briefly stale)
    if (order.status !== "paid" && order.status !== "awaiting_payment") {
      logSecurity("ORDER_FULFILLMENT_SKIPPED", {
        orderId: order.id,
        orderNumber: order.orderNumber,
        reason: "unexpected_status",
        status: order.status,
      });
      return;
    }

    const oldStatus = order.status;
    const items = parseLineItems(order.lineItems);

    await db
      .update(storeOrders)
      .set({
        status: "provisioning",
        updatedAt: new Date(),
      })
      .where(eq(storeOrders.id, order.id));

    logSecurity("ORDER_STATUS_CHANGED", {
      orderId: order.id,
      orderNumber: order.orderNumber,
      oldStatus,
      newStatus: "provisioning",
      triggeredBy: "order_fulfillment",
    });

    await sendConfirmation(order, items);
    const deskTicketId = await createFulfillmentDeskTicket(order, items);

    const fulfilledAt = new Date().toISOString();
    const noteParts = [
      order.notes?.trim() || "",
      `${FULFILLED_NOTE_MARKER} at ${fulfilledAt}`,
      deskTicketId ? `deskTicket:${deskTicketId}` : "deskTicket:skipped",
    ].filter(Boolean);

    await db
      .update(storeOrders)
      .set({
        status: "completed",
        notes: noteParts.join(" | "),
        updatedAt: new Date(),
      })
      .where(eq(storeOrders.id, order.id));

    logSecurity("ORDER_STATUS_CHANGED", {
      orderId: order.id,
      orderNumber: order.orderNumber,
      oldStatus: "provisioning",
      newStatus: "completed",
      triggeredBy: "order_fulfillment",
      deskTicketId,
    });

    logSecurity("ORDER_FULFILLED", {
      orderId: order.id,
      orderNumber: order.orderNumber,
      deskTicketId,
      total: order.total,
    });
  } catch (error: any) {
    console.error("[ORDER FULFILLMENT ERROR]", {
      orderId: id,
      message: error?.message || String(error),
    });
    logSecurity("ORDER_FULFILLMENT_FAILED", {
      orderId: id,
      error: error?.message || String(error),
    });
  }
}
