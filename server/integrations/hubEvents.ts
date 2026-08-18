import type { Request, Response } from "express";
import { eventBus } from "../eventBus";
import { logger } from "../logger";
import { parseDeSyncEnvelope, shouldEchoToHub, type DeSyncEnvelope } from "./deSyncContract";
import { requireDeSyncAuth } from "./deSyncAuth";
import { recordInbox, recordConflict, saveCatalogSnapshot } from "./deSyncStore";
import { persistHubAccountId } from "./techSalesClient";
import { publishPortalProjection } from "./portalSse";

const projections = new Map<string, Record<string, unknown>>();

export function getHubProjection(entityType: string, entityId: string): Record<string, unknown> | undefined {
  return projections.get(`${entityType}:${entityId}`);
}

export function resetHubProjections(): void {
  projections.clear();
}

async function applyHubEvent(envelope: DeSyncEnvelope): Promise<void> {
  if (shouldEchoToHub(envelope)) return;

  const key = `${envelope.entityType}:${envelope.entityId}`;
  const existing = projections.get(key);

  if (existing && envelope.eventType.startsWith("account.") && envelope.payload && existing.name && envelope.payload.name && existing.name !== envelope.payload.name) {
    await recordConflict({
      canonicalAccountId: envelope.canonicalAccountId,
      entityType: envelope.entityType,
      entityId: envelope.entityId,
      field: "name",
      hubValue: envelope.payload.name,
      peerValue: existing.name,
    });
  }

  projections.set(key, {
    ...(existing || {}),
    ...envelope.payload,
    eventType: envelope.eventType,
    updatedAt: envelope.occurredAt,
  });

  const portalClientId = typeof envelope.payload.portalClientId === "string" ? envelope.payload.portalClientId : null;
  if (envelope.canonicalAccountId && portalClientId) {
    await persistHubAccountId(portalClientId, envelope.canonicalAccountId);
  }

  if (
    envelope.eventType === "catalog.published" ||
    envelope.eventType === "pricing.updated" ||
    envelope.eventType === "bundle.updated"
  ) {
    const snapshot =
      envelope.payload.catalog && typeof envelope.payload.catalog === "object"
        ? (envelope.payload.catalog as Record<string, unknown>)
        : envelope.payload;
    await saveCatalogSnapshot(snapshot, envelope.eventId);
  }

  await eventBus.emit(`hub:${envelope.eventType}`, {
    eventId: envelope.eventId,
    entityType: envelope.entityType,
    entityId: envelope.entityId,
    canonicalAccountId: envelope.canonicalAccountId,
  }, "techsales");

  publishPortalProjection({ eventType: envelope.eventType, entityId: envelope.entityId });
}

export async function handleHubEvents(req: Request, res: Response): Promise<void> {
  let envelope: DeSyncEnvelope;
  try {
    envelope = parseDeSyncEnvelope(req.body);
  } catch {
    res.status(400).json({ error: "Invalid integration envelope" });
    return;
  }

  if (shouldEchoToHub(envelope)) {
    res.status(400).json({ error: "Hub events must originate from techsales" });
    return;
  }

  const inbox = await recordInbox(envelope);
  if (inbox.duplicate) {
    res.status(200).json({ ok: true, duplicate: true });
    return;
  }

  try {
    await applyHubEvent(envelope);
    res.status(200).json({ ok: true, duplicate: false });
  } catch (error) {
    logger.error("Failed to apply Hub event", error);
    res.status(500).json({ error: "Failed to apply event" });
  }
}

export const hubEventsAuth = requireDeSyncAuth("hub_to_website");
