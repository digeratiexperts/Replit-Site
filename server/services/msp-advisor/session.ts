import { randomBytes } from "crypto";
import type { AdvisorSession, ChatMessage, ConversationProfile, PageContext } from "./types";
import { createEmptyProfile } from "./profile";

const TTL_MS = 2 * 60 * 60 * 1000; // 2 hours
const MAX_MESSAGES = 24;

const sessions = new Map<string, AdvisorSession>();

function newId(): string {
  return randomBytes(16).toString("hex");
}

function pruneExpired(now = Date.now()): void {
  for (const [id, s] of Array.from(sessions.entries())) {
    if (now - s.updatedAt > TTL_MS) sessions.delete(id);
  }
}

export function createSession(pageContext?: PageContext): AdvisorSession {
  pruneExpired();
  const now = Date.now();
  const session: AdvisorSession = {
    id: newId(),
    createdAt: now,
    updatedAt: now,
    messages: [],
    profile: createEmptyProfile(),
    lastMode: "msp_discovery",
    analyticsFlags: {},
    pageContext,
  };
  sessions.set(session.id, session);
  return session;
}

export function getSession(id: string | undefined): AdvisorSession | undefined {
  if (!id) return undefined;
  pruneExpired();
  const s = sessions.get(id);
  if (!s) return undefined;
  if (Date.now() - s.updatedAt > TTL_MS) {
    sessions.delete(id);
    return undefined;
  }
  return s;
}

export function getOrCreateSession(id: string | undefined, pageContext?: PageContext): AdvisorSession {
  const existing = getSession(id);
  if (existing) {
    if (pageContext) existing.pageContext = pageContext;
    existing.updatedAt = Date.now();
    return existing;
  }
  return createSession(pageContext);
}

export function appendMessage(session: AdvisorSession, role: ChatMessage["role"], content: string): void {
  session.messages.push({ role, content, at: Date.now() });
  if (session.messages.length > MAX_MESSAGES) {
    session.messages = session.messages.slice(-MAX_MESSAGES);
  }
  session.updatedAt = Date.now();
}

export function updateProfile(session: AdvisorSession, profile: ConversationProfile): void {
  session.profile = profile;
  session.updatedAt = Date.now();
}

export function publicSessionView(session: AdvisorSession) {
  return {
    sessionId: session.id,
    profile: session.profile,
    messages: session.messages.map((m) => ({ role: m.role, content: m.content })),
    lastMode: session.lastMode,
  };
}

/** Test helper */
export function _resetSessionsForTests(): void {
  sessions.clear();
}
