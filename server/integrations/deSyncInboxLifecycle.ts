import { db } from "../db";
import { syncInbox } from "@shared/schema";
import { eq } from "drizzle-orm";
import type { DeSyncEnvelope } from "./deSyncContract";

type MemoryInboxState = {
  envelope: DeSyncEnvelope;
  appliedAt: Date | null;
};

const memoryInbox = new Map<string, MemoryInboxState>();

function useMemory(): boolean {
  return !process.env.DATABASE_URL || !db;
}

export type InboxBeginResult = {
  duplicate: boolean;
  alreadyApplied: boolean;
};

/**
 * Register an inbound event without marking it applied.
 *
 * A duplicate whose appliedAt is null is intentionally returned as work that
 * must be retried. This prevents a transient projection failure from turning a
 * later Hub retry into a false-success duplicate acknowledgement.
 */
export async function beginInbox(envelope: DeSyncEnvelope): Promise<InboxBeginResult> {
  if (useMemory()) {
    const existing = memoryInbox.get(envelope.eventId);
    if (existing) {
      return {
        duplicate: existing.appliedAt !== null,
        alreadyApplied: existing.appliedAt !== null,
      };
    }
    memoryInbox.set(envelope.eventId, { envelope, appliedAt: null });
    return { duplicate: false, alreadyApplied: false };
  }

  await db
    .insert(syncInbox)
    .values({
      eventId: envelope.eventId,
      eventType: envelope.eventType,
      source: envelope.source,
      canonicalAccountId: envelope.canonicalAccountId ?? null,
      entityType: envelope.entityType,
      entityId: envelope.entityId,
      payload: envelope.payload,
      appliedAt: null,
    })
    .onConflictDoNothing({ target: syncInbox.eventId });

  const [row] = await db
    .select({ appliedAt: syncInbox.appliedAt })
    .from(syncInbox)
    .where(eq(syncInbox.eventId, envelope.eventId))
    .limit(1);

  const alreadyApplied = Boolean(row?.appliedAt);
  return { duplicate: alreadyApplied, alreadyApplied };
}

export async function markInboxApplied(eventId: string): Promise<void> {
  const appliedAt = new Date();
  if (useMemory()) {
    const existing = memoryInbox.get(eventId);
    if (existing) existing.appliedAt = appliedAt;
    return;
  }

  await db
    .update(syncInbox)
    .set({ appliedAt })
    .where(eq(syncInbox.eventId, eventId));
}

/** Test helper. */
export function resetInboxLifecycleMemory(): void {
  memoryInbox.clear();
}
