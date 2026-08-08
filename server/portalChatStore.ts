/**
 * Durable portal live-chat store — Neon-backed with in-memory fallback.
 * Conversation key is always live-{userId} so messages survive restarts
 * without depending on portal_tickets FKs.
 */
import { sql } from "drizzle-orm";
import { db, dbReady, initPromise } from "./db";
import { randomBytes } from "crypto";

export type LiveChatMessage = {
  id: string;
  conversationId: string;
  userId: string;
  senderName: string;
  senderRole: "client" | "support";
  content: string;
  isRead: boolean;
  timestamp: string;
};

const memoryByConversation = new Map<string, LiveChatMessage[]>();
let schemaReady = false;

function newId(): string {
  return randomBytes(16).toString("hex");
}

export function conversationIdForUser(userId: string): string {
  return `live-${userId}`;
}

async function ensureSchema(): Promise<void> {
  if (schemaReady || !dbReady || !db) return;
  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS portal_live_chat_messages (
        id varchar PRIMARY KEY,
        conversation_id varchar NOT NULL,
        user_id varchar NOT NULL,
        sender_name text NOT NULL,
        sender_role text NOT NULL,
        content text NOT NULL,
        is_read boolean DEFAULT false,
        created_at timestamptz DEFAULT now() NOT NULL
      )
    `);
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_portal_live_chat_conv_created
      ON portal_live_chat_messages (conversation_id, created_at)
    `);
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_portal_live_chat_user
      ON portal_live_chat_messages (user_id, created_at)
    `);
    schemaReady = true;
  } catch (err: any) {
    console.warn("[portalChatStore] schema ensure:", err?.message);
  }
}

export async function initPortalChatStore(): Promise<void> {
  await initPromise;
  await ensureSchema();
  if (dbReady && schemaReady) {
    console.log("✅ Portal live chat store ready (Neon)");
  } else {
    console.warn("⚠️ Portal live chat store: DB unavailable — using memory (non-durable)");
  }
}

function rowToMessage(row: {
  id: string;
  conversation_id: string;
  user_id: string;
  sender_name: string;
  sender_role: string;
  content: string;
  is_read: boolean | null;
  created_at: Date | string;
}): LiveChatMessage {
  const created =
    row.created_at instanceof Date
      ? row.created_at.toISOString()
      : new Date(row.created_at).toISOString();
  return {
    id: row.id,
    conversationId: row.conversation_id,
    userId: row.user_id,
    senderName: row.sender_name,
    senderRole: row.sender_role === "support" ? "support" : "client",
    content: row.content,
    isRead: !!row.is_read,
    timestamp: created,
  };
}

export async function listMessages(
  conversationId: string,
  opts?: { since?: string; limit?: number }
): Promise<LiveChatMessage[]> {
  await ensureSchema();
  const limit = Math.min(Math.max(opts?.limit || 200, 1), 500);

  if (dbReady && db && schemaReady) {
    try {
      const normalizeRows = (result: unknown): any[] => {
        if (Array.isArray(result)) return result;
        const rows = (result as any)?.rows;
        return Array.isArray(rows) ? rows : [];
      };

      if (opts?.since) {
        const sinceDate = new Date(opts.since);
        if (!Number.isNaN(sinceDate.getTime())) {
          const result = await db.execute(sql`
            SELECT id, conversation_id, user_id, sender_name, sender_role, content, is_read, created_at
            FROM portal_live_chat_messages
            WHERE conversation_id = ${conversationId}
              AND created_at > ${sinceDate}
            ORDER BY created_at ASC
            LIMIT ${limit}
          `);
          return normalizeRows(result).map(rowToMessage);
        }
      }

      const result = await db.execute(sql`
        SELECT id, conversation_id, user_id, sender_name, sender_role, content, is_read, created_at
        FROM portal_live_chat_messages
        WHERE conversation_id = ${conversationId}
        ORDER BY created_at ASC
        LIMIT ${limit}
      `);
      return normalizeRows(result).map(rowToMessage);
    } catch (err: any) {
      console.warn("[portalChatStore] listMessages failed:", err?.message);
    }
  }

  let msgs = memoryByConversation.get(conversationId) || [];
  if (opts?.since) {
    const sinceMs = Date.parse(opts.since);
    if (!Number.isNaN(sinceMs)) {
      msgs = msgs.filter((m) => Date.parse(m.timestamp) > sinceMs);
    }
  }
  return msgs.slice(-limit);
}

export async function appendMessage(input: {
  conversationId: string;
  userId: string;
  senderName: string;
  senderRole: "client" | "support";
  content: string;
}): Promise<LiveChatMessage> {
  await ensureSchema();
  const message: LiveChatMessage = {
    id: newId(),
    conversationId: input.conversationId,
    userId: input.userId,
    senderName: input.senderName,
    senderRole: input.senderRole,
    content: input.content.trim(),
    isRead: input.senderRole === "client",
    timestamp: new Date().toISOString(),
  };

  if (dbReady && db && schemaReady) {
    try {
      await db.execute(sql`
        INSERT INTO portal_live_chat_messages
          (id, conversation_id, user_id, sender_name, sender_role, content, is_read, created_at)
        VALUES (
          ${message.id},
          ${message.conversationId},
          ${message.userId},
          ${message.senderName},
          ${message.senderRole},
          ${message.content},
          ${message.isRead},
          ${new Date(message.timestamp)}
        )
      `);
    } catch (err: any) {
      console.warn("[portalChatStore] appendMessage DB failed, using memory:", err?.message);
      const list = memoryByConversation.get(message.conversationId) || [];
      list.push(message);
      memoryByConversation.set(message.conversationId, list);
      return message;
    }
  }

  const list = memoryByConversation.get(message.conversationId) || [];
  list.push(message);
  memoryByConversation.set(message.conversationId, list);
  return message;
}

export async function ensureWelcomeMessage(
  conversationId: string,
  userId: string
): Promise<LiveChatMessage | null> {
  const existing = await listMessages(conversationId, { limit: 1 });
  if (existing.length > 0) return null;

  return appendMessage({
    conversationId,
    userId,
    senderName: "DE Support",
    senderRole: "support",
    content:
      "Welcome to Digerati Experts Live Chat. Ask a question anytime — our assistant will help immediately, and the team monitors conversations during business hours (Mon–Fri, 9 AM–6 PM EST).",
  });
}

export function getChatStoreStatus(): {
  durable: boolean;
  transport: "http-poll";
} {
  return {
    durable: !!(dbReady && schemaReady),
    transport: "http-poll",
  };
}
