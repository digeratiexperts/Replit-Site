import { randomUUID } from "crypto";
import { eq, or } from "drizzle-orm";
import { storeQuoteRequests } from "@shared/schema";
import { db, dbReady, initPromise } from "./db";
import type { CanonicalQuoteLine } from "./storeQuoteCommerce";

export type StoredQuoteRequest = {
  id: string;
  quoteNumber: string;
  userId: string | null;
  clientId: string | null;
  contactName: string;
  contactEmail: string;
  contactPhone: string | null;
  companyName: string | null;
  requestedItems: CanonicalQuoteLine[];
  message: string | null;
  status: string;
  assignedTo: string | null;
  meetingScheduled: Date | null;
  quoteSentAt: Date | null;
  convertedOrderId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

const quotes = new Map<string, StoredQuoteRequest>();

export function makeQuoteNumber(now = new Date()): string {
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `QR-${dateStr}-${randomSuffix}`;
}

function remember(record: StoredQuoteRequest) {
  quotes.set(record.id, record);
  quotes.set(record.quoteNumber, record);
  return record;
}

function rowToQuote(row: any): StoredQuoteRequest {
  return {
    id: row.id,
    quoteNumber: row.quoteNumber,
    userId: row.userId ?? null,
    clientId: row.clientId ?? null,
    contactName: row.contactName,
    contactEmail: row.contactEmail,
    contactPhone: row.contactPhone ?? null,
    companyName: row.companyName ?? null,
    requestedItems: Array.isArray(row.requestedItems) ? row.requestedItems : [],
    message: row.message ?? null,
    status: row.status || "pending",
    assignedTo: row.assignedTo ?? null,
    meetingScheduled: row.meetingScheduled ?? null,
    quoteSentAt: row.quoteSentAt ?? null,
    convertedOrderId: row.convertedOrderId ?? null,
    createdAt: row.createdAt instanceof Date ? row.createdAt : new Date(row.createdAt || Date.now()),
    updatedAt: row.updatedAt instanceof Date ? row.updatedAt : new Date(row.updatedAt || Date.now()),
  };
}

export async function insertQuoteRequest(input: {
  quoteNumber?: string;
  userId?: string | null;
  clientId?: string | null;
  contactName: string;
  contactEmail: string;
  contactPhone?: string | null;
  companyName?: string | null;
  requestedItems: CanonicalQuoteLine[];
  message?: string | null;
}): Promise<StoredQuoteRequest> {
  const now = new Date();
  const record: StoredQuoteRequest = {
    id: randomUUID(),
    quoteNumber: input.quoteNumber || makeQuoteNumber(now),
    userId: input.userId ?? null,
    clientId: input.clientId ?? null,
    contactName: input.contactName,
    contactEmail: input.contactEmail,
    contactPhone: input.contactPhone ?? null,
    companyName: input.companyName ?? null,
    requestedItems: input.requestedItems,
    message: input.message ?? null,
    status: "pending",
    assignedTo: null,
    meetingScheduled: null,
    quoteSentAt: now,
    convertedOrderId: null,
    createdAt: now,
    updatedAt: now,
  };
  remember(record);

  await initPromise;
  if (dbReady && db) {
    try {
      const [row] = await db
        .insert(storeQuoteRequests)
        .values({
          id: record.id,
          quoteNumber: record.quoteNumber,
          userId: record.userId,
          clientId: record.clientId,
          contactName: record.contactName,
          contactEmail: record.contactEmail,
          contactPhone: record.contactPhone,
          companyName: record.companyName,
          requestedItems: record.requestedItems,
          message: record.message,
          status: record.status,
          quoteSentAt: record.quoteSentAt,
        })
        .returning();
      if (row) return remember(rowToQuote(row));
    } catch (error: any) {
      console.warn("[store-quote] database insert skipped:", error?.message || error);
    }
  }

  return record;
}

export async function getQuoteRequest(idOrNumber: string): Promise<StoredQuoteRequest | undefined> {
  const cached = quotes.get(idOrNumber);
  if (cached) return cached;

  await initPromise;
  if (!dbReady || !db) return undefined;
  try {
    const [row] = await db
      .select()
      .from(storeQuoteRequests)
      .where(or(eq(storeQuoteRequests.id, idOrNumber), eq(storeQuoteRequests.quoteNumber, idOrNumber)))
      .limit(1);
    if (!row) return undefined;
    return remember(rowToQuote(row));
  } catch (error: any) {
    console.warn("[store-quote] database lookup skipped:", error?.message || error);
    return undefined;
  }
}
