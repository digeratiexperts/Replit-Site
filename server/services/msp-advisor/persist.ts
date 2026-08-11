/**
 * Durable DE Desk (public advisor) conversation store.
 * Neon-backed with in-memory fallback — same pattern as portalChatStore.
 */
import { sql } from "drizzle-orm";
import { db, dbReady, initPromise } from "../../db";
import { randomBytes } from "crypto";

export type DeskChatMessage = {
  id: string;
  sessionId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

export type DeskChatSessionSummary = {
  sessionId: string;
  email: string | null;
  contactName: string | null;
  companyName: string | null;
  pagePath: string | null;
  messageCount: number;
  preview: string | null;
  createdAt: string;
  updatedAt: string;
};

const memorySessions = new Map<
  string,
  {
    email: string | null;
    contactName: string | null;
    companyName: string | null;
    pagePath: string | null;
    createdAt: string;
    updatedAt: string;
    messages: DeskChatMessage[];
  }
>();

let schemaReady = false;

function newId(): string {
  return randomBytes(16).toString("hex");
}

function normalizeRows(result: unknown): any[] {
  if (Array.isArray(result)) return result;
  const rows = (result as any)?.rows;
  return Array.isArray(rows) ? rows : [];
}

async function ensureSchema(): Promise<void> {
  if (schemaReady || !dbReady || !db) return;
  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS de_desk_chat_sessions (
        session_id varchar PRIMARY KEY,
        email varchar,
        contact_name text,
        company_name text,
        page_path text,
        created_at timestamptz DEFAULT now() NOT NULL,
        updated_at timestamptz DEFAULT now() NOT NULL
      )
    `);
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS de_desk_chat_messages (
        id varchar PRIMARY KEY,
        session_id varchar NOT NULL,
        role text NOT NULL,
        content text NOT NULL,
        created_at timestamptz DEFAULT now() NOT NULL
      )
    `);
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_de_desk_sessions_email
      ON de_desk_chat_sessions (email, updated_at DESC)
    `);
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_de_desk_messages_session
      ON de_desk_chat_messages (session_id, created_at)
    `);
    schemaReady = true;
  } catch (err: any) {
    console.warn("[de-desk-persist] schema ensure:", err?.message);
  }
}

export async function initDeskChatStore(): Promise<void> {
  await initPromise;
  await ensureSchema();
  if (dbReady && schemaReady) {
    console.log("✅ DE Desk chat store ready (Neon)");
  } else {
    console.warn("⚠️ DE Desk chat store: DB unavailable — using memory (non-durable)");
  }
}

export async function upsertDeskSession(input: {
  sessionId: string;
  email?: string | null;
  contactName?: string | null;
  companyName?: string | null;
  pagePath?: string | null;
}): Promise<void> {
  await ensureSchema();
  const now = new Date().toISOString();
  const mem = memorySessions.get(input.sessionId) || {
    email: null,
    contactName: null,
    companyName: null,
    pagePath: null,
    createdAt: now,
    updatedAt: now,
    messages: [],
  };
  if (input.email) mem.email = input.email.toLowerCase();
  if (input.contactName) mem.contactName = input.contactName;
  if (input.companyName) mem.companyName = input.companyName;
  if (input.pagePath) mem.pagePath = input.pagePath;
  mem.updatedAt = now;
  memorySessions.set(input.sessionId, mem);

  if (!(dbReady && db && schemaReady)) return;
  try {
    await db.execute(sql`
      INSERT INTO de_desk_chat_sessions
        (session_id, email, contact_name, company_name, page_path, created_at, updated_at)
      VALUES (
        ${input.sessionId},
        ${mem.email},
        ${mem.contactName},
        ${mem.companyName},
        ${mem.pagePath},
        ${new Date(mem.createdAt)},
        ${new Date(now)}
      )
      ON CONFLICT (session_id) DO UPDATE SET
        email = COALESCE(EXCLUDED.email, de_desk_chat_sessions.email),
        contact_name = COALESCE(EXCLUDED.contact_name, de_desk_chat_sessions.contact_name),
        company_name = COALESCE(EXCLUDED.company_name, de_desk_chat_sessions.company_name),
        page_path = COALESCE(EXCLUDED.page_path, de_desk_chat_sessions.page_path),
        updated_at = EXCLUDED.updated_at
    `);
  } catch (err: any) {
    console.warn("[de-desk-persist] upsert session failed:", err?.message);
  }
}

export async function appendDeskMessage(input: {
  sessionId: string;
  role: "user" | "assistant";
  content: string;
  email?: string | null;
  contactName?: string | null;
  companyName?: string | null;
  pagePath?: string | null;
}): Promise<DeskChatMessage> {
  await upsertDeskSession({
    sessionId: input.sessionId,
    email: input.email,
    contactName: input.contactName,
    companyName: input.companyName,
    pagePath: input.pagePath,
  });

  const message: DeskChatMessage = {
    id: newId(),
    sessionId: input.sessionId,
    role: input.role,
    content: input.content.trim().slice(0, 8000),
    createdAt: new Date().toISOString(),
  };

  const mem = memorySessions.get(input.sessionId)!;
  mem.messages.push(message);
  if (mem.messages.length > 100) mem.messages = mem.messages.slice(-100);
  mem.updatedAt = message.createdAt;

  if (dbReady && db && schemaReady) {
    try {
      await db.execute(sql`
        INSERT INTO de_desk_chat_messages (id, session_id, role, content, created_at)
        VALUES (
          ${message.id},
          ${message.sessionId},
          ${message.role},
          ${message.content},
          ${new Date(message.createdAt)}
        )
      `);
      await db.execute(sql`
        UPDATE de_desk_chat_sessions
        SET updated_at = ${new Date(message.createdAt)}
        WHERE session_id = ${input.sessionId}
      `);
    } catch (err: any) {
      console.warn("[de-desk-persist] append message DB failed:", err?.message);
    }
  }

  return message;
}

export async function listDeskSessions(opts?: {
  email?: string;
  limit?: number;
}): Promise<DeskChatSessionSummary[]> {
  await ensureSchema();
  const limit = Math.min(Math.max(opts?.limit || 50, 1), 200);
  const email = opts?.email?.toLowerCase();

  if (dbReady && db && schemaReady) {
    try {
      const result = email
        ? await db.execute(sql`
            SELECT s.session_id, s.email, s.contact_name, s.company_name, s.page_path,
                   s.created_at, s.updated_at,
                   (SELECT COUNT(*)::int FROM de_desk_chat_messages m WHERE m.session_id = s.session_id) AS message_count,
                   (SELECT m.content FROM de_desk_chat_messages m
                      WHERE m.session_id = s.session_id AND m.role = 'user'
                      ORDER BY m.created_at DESC LIMIT 1) AS preview
            FROM de_desk_chat_sessions s
            WHERE lower(s.email) = ${email}
            ORDER BY s.updated_at DESC
            LIMIT ${limit}
          `)
        : await db.execute(sql`
            SELECT s.session_id, s.email, s.contact_name, s.company_name, s.page_path,
                   s.created_at, s.updated_at,
                   (SELECT COUNT(*)::int FROM de_desk_chat_messages m WHERE m.session_id = s.session_id) AS message_count,
                   (SELECT m.content FROM de_desk_chat_messages m
                      WHERE m.session_id = s.session_id AND m.role = 'user'
                      ORDER BY m.created_at DESC LIMIT 1) AS preview
            FROM de_desk_chat_sessions s
            ORDER BY s.updated_at DESC
            LIMIT ${limit}
          `);

      return normalizeRows(result).map((row) => ({
        sessionId: String(row.session_id),
        email: row.email ? String(row.email) : null,
        contactName: row.contact_name ? String(row.contact_name) : null,
        companyName: row.company_name ? String(row.company_name) : null,
        pagePath: row.page_path ? String(row.page_path) : null,
        messageCount: Number(row.message_count || 0),
        preview: row.preview ? String(row.preview).slice(0, 160) : null,
        createdAt:
          row.created_at instanceof Date
            ? row.created_at.toISOString()
            : new Date(row.created_at).toISOString(),
        updatedAt:
          row.updated_at instanceof Date
            ? row.updated_at.toISOString()
            : new Date(row.updated_at).toISOString(),
      }));
    } catch (err: any) {
      console.warn("[de-desk-persist] list sessions failed:", err?.message);
    }
  }

  let entries = Array.from(memorySessions.entries());
  if (email) {
    entries = entries.filter(([, s]) => s.email === email);
  }
  return entries
    .sort((a, b) => Date.parse(b[1].updatedAt) - Date.parse(a[1].updatedAt))
    .slice(0, limit)
    .map(([sessionId, s]) => {
      const lastUser = [...s.messages].reverse().find((m) => m.role === "user");
      return {
        sessionId,
        email: s.email,
        contactName: s.contactName,
        companyName: s.companyName,
        pagePath: s.pagePath,
        messageCount: s.messages.length,
        preview: lastUser?.content.slice(0, 160) || null,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
      };
    });
}

export async function getDeskSessionMessages(
  sessionId: string,
): Promise<{ session: DeskChatSessionSummary | null; messages: DeskChatMessage[] }> {
  await ensureSchema();

  if (dbReady && db && schemaReady) {
    try {
      const sessionResult = await db.execute(sql`
        SELECT session_id, email, contact_name, company_name, page_path, created_at, updated_at
        FROM de_desk_chat_sessions
        WHERE session_id = ${sessionId}
        LIMIT 1
      `);
      const sessionRows = normalizeRows(sessionResult);
      if (sessionRows.length === 0) {
        return { session: null, messages: [] };
      }
      const row = sessionRows[0];
      const msgResult = await db.execute(sql`
        SELECT id, session_id, role, content, created_at
        FROM de_desk_chat_messages
        WHERE session_id = ${sessionId}
        ORDER BY created_at ASC
        LIMIT 200
      `);
      const messages = normalizeRows(msgResult).map((m) => ({
        id: String(m.id),
        sessionId: String(m.session_id),
        role: (m.role === "assistant" ? "assistant" : "user") as "user" | "assistant",
        content: String(m.content),
        createdAt:
          m.created_at instanceof Date
            ? m.created_at.toISOString()
            : new Date(m.created_at).toISOString(),
      }));
      const lastUser = [...messages].reverse().find((m) => m.role === "user");
      return {
        session: {
          sessionId: String(row.session_id),
          email: row.email ? String(row.email) : null,
          contactName: row.contact_name ? String(row.contact_name) : null,
          companyName: row.company_name ? String(row.company_name) : null,
          pagePath: row.page_path ? String(row.page_path) : null,
          messageCount: messages.length,
          preview: lastUser?.content.slice(0, 160) || null,
          createdAt:
            row.created_at instanceof Date
              ? row.created_at.toISOString()
              : new Date(row.created_at).toISOString(),
          updatedAt:
            row.updated_at instanceof Date
              ? row.updated_at.toISOString()
              : new Date(row.updated_at).toISOString(),
        },
        messages,
      };
    } catch (err: any) {
      console.warn("[de-desk-persist] get session failed:", err?.message);
    }
  }

  const mem = memorySessions.get(sessionId);
  if (!mem) return { session: null, messages: [] };
  const lastUser = [...mem.messages].reverse().find((m) => m.role === "user");
  return {
    session: {
      sessionId,
      email: mem.email,
      contactName: mem.contactName,
      companyName: mem.companyName,
      pagePath: mem.pagePath,
      messageCount: mem.messages.length,
      preview: lastUser?.content.slice(0, 160) || null,
      createdAt: mem.createdAt,
      updatedAt: mem.updatedAt,
    },
    messages: mem.messages,
  };
}

export function getDeskStoreStatus(): { durable: boolean } {
  return { durable: !!(dbReady && schemaReady) };
}
