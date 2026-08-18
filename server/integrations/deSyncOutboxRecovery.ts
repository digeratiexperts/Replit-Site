import { db } from "../db";
import { syncOutbox } from "@shared/schema";
import { and, eq, lt } from "drizzle-orm";

const DEFAULT_LEASE_MS = 2 * 60 * 1000;

/**
 * Requeue rows left in `delivering` when the process dies after claiming them.
 * Memory-mode events disappear with the process, so only durable DB mode needs
 * lease recovery.
 */
export async function recoverStaleOutboxLocks(leaseMs = DEFAULT_LEASE_MS): Promise<number> {
  if (!process.env.DATABASE_URL || !db) return 0;

  const cutoff = new Date(Date.now() - Math.max(30_000, leaseMs));
  const rows = await db
    .update(syncOutbox)
    .set({
      status: "pending",
      lockedAt: null,
      nextAttemptAt: new Date(),
      lastError: "Recovered stale delivery lease after process interruption",
    })
    .where(and(eq(syncOutbox.status, "delivering"), lt(syncOutbox.lockedAt, cutoff)))
    .returning({ id: syncOutbox.id });

  return rows.length;
}
