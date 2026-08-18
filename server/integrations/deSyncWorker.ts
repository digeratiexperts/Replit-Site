import { logger } from "../logger";
import { claimPendingOutbox, markOutboxDelivered, markOutboxRetry } from "./deSyncStore";
import { recoverStaleOutboxLocks } from "./deSyncOutboxRecovery";
import { deliverEnvelopeToHub } from "./techSalesClient";
import type { DeSyncEnvelope } from "./deSyncContract";

const TICK_MS = 15_000;
let timer: ReturnType<typeof setInterval> | null = null;
let running = false;

function recordToEnvelope(record: {
  eventId: string;
  eventType: DeSyncEnvelope["eventType"];
  version: number;
  source: DeSyncEnvelope["source"];
  occurredAt: Date;
  correlationId: string | null;
  entityType: string;
  entityId: string;
  canonicalAccountId: string | null;
  payload: Record<string, unknown>;
}): DeSyncEnvelope {
  return {
    eventId: record.eventId,
    eventType: record.eventType,
    version: 1,
    source: record.source,
    occurredAt: record.occurredAt.toISOString(),
    correlationId: record.correlationId || record.eventId,
    entityType: record.entityType,
    entityId: record.entityId,
    canonicalAccountId: record.canonicalAccountId,
    payload: record.payload,
  };
}

export async function processDeSyncOutbox(
  limit = 10,
): Promise<{ delivered: number; retried: number; dlq: number }> {
  const recovered = await recoverStaleOutboxLocks();
  if (recovered > 0) {
    logger.warn("recovered stale de-sync delivery leases", { recovered });
  }

  const claimed = await claimPendingOutbox(limit);
  let delivered = 0;
  let retried = 0;
  let dlq = 0;

  for (const record of claimed) {
    try {
      await deliverEnvelopeToHub(recordToEnvelope(record), record.destination);
      await markOutboxDelivered(record.eventId);
      delivered += 1;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const outcome = await markOutboxRetry(record.eventId, message);
      if (outcome === "dlq") dlq += 1;
      else retried += 1;
      logger.warn("de-sync outbox delivery failed", { eventId: record.eventId, message, outcome });
    }
  }

  return { delivered, retried, dlq };
}

export function startDeSyncWorker(): void {
  if (timer) return;
  timer = setInterval(() => {
    if (running) return;
    running = true;
    void processDeSyncOutbox()
      .catch((error) => logger.error("de-sync worker tick failed", error))
      .finally(() => {
        running = false;
      });
  }, TICK_MS);
  logger.info("de-sync worker started");
}

export function stopDeSyncWorker(): void {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}
