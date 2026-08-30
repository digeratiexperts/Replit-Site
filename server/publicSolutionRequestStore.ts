import { randomUUID } from "crypto";
import {
  curatedSolutionFamilies,
  type CuratedDeliveryModel,
  type CuratedSolutionFamily,
} from "../client/src/data/curatedSolutions";
import { SOLUTION_SIZING_FIELDS } from "../client/src/data/solutionSizingFields";

export type SolutionRequestIntent = "request" | "quote" | "assessment" | "consultation";
export type SolutionRequestStatus = "draft" | "submitted";

export type PublicSolutionRequest = {
  id: string;
  sessionId: string;
  correlationId: string;
  familyId: string | null;
  offerId: string | null;
  deliveryModel: CuratedDeliveryModel;
  intent: SolutionRequestIntent;
  organizationName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  notes: string;
  /** Scope-sizing answers keyed by field key — see solutionSizingFields.ts. No pricing, ever. */
  sizingAnswers: Record<string, string>;
  status: SolutionRequestStatus;
  crmStatus: "not_requested" | "pending" | "recorded";
  createdAt: string;
  updatedAt: string;
};

const records = new Map<string, PublicSolutionRequest>();
const idempotency = new Map<string, string>();
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;

export function publicFamilyExists(familyId: string): boolean {
  return curatedSolutionFamilies.some((family) => family.id === familyId);
}

export function publicOfferInFamily(familyId: string, offerId: string, delivery: CuratedDeliveryModel): boolean {
  const family = curatedSolutionFamilies.find((entry) => entry.id === familyId);
  return !!family?.offers.some((offer) => offer.id === offerId && offer.deliveryModel === delivery);
}

function expireDrafts() {
  const cutoff = Date.now() - SESSION_TTL_MS;
  for (const [id, record] of records) {
    if (record.status === "submitted") continue;
    if (new Date(record.updatedAt).getTime() < cutoff) records.delete(id);
  }
}

export function createPublicSolutionRequest(sessionId: string): PublicSolutionRequest {
  expireDrafts();
  const now = new Date().toISOString();
  const record: PublicSolutionRequest = {
    id: randomUUID(),
    sessionId,
    correlationId: randomUUID(),
    familyId: null,
    offerId: null,
    deliveryModel: "standalone",
    intent: "request",
    organizationName: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    notes: "",
    sizingAnswers: {},
    status: "draft",
    crmStatus: "not_requested",
    createdAt: now,
    updatedAt: now,
  };
  records.set(record.id, record);
  return { ...record };
}

export function findPublicSolutionRequest(sessionId: string): PublicSolutionRequest | undefined {
  expireDrafts();
  const matches = [...records.values()]
    .filter((record) => record.sessionId === sessionId)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  return matches[0] ? { ...matches[0] } : undefined;
}

export function getPublicSolutionRequest(id: string): PublicSolutionRequest | undefined {
  const record = records.get(id);
  return record ? { ...record } : undefined;
}

function asIntent(value: unknown): SolutionRequestIntent {
  if (value === "quote" || value === "assessment" || value === "consultation" || value === "request") {
    return value;
  }
  return "request";
}

function asDelivery(value: unknown): CuratedDeliveryModel {
  return value === "co_managed" ? "co_managed" : "standalone";
}

function clip(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Keep only known field keys for this family, each clipped to a short value. Drops anything else. */
function sanitizeSizingAnswers(familyId: string | null, value: unknown): Record<string, string> {
  if (!familyId || typeof value !== "object" || value === null) return {};
  const allowedKeys = new Set(
    (SOLUTION_SIZING_FIELDS[familyId as CuratedSolutionFamily["id"]] ?? []).map((field) => field.key),
  );
  const answers: Record<string, string> = {};
  for (const [key, raw] of Object.entries(value as Record<string, unknown>)) {
    if (!allowedKeys.has(key)) continue;
    const text = clip(raw, 60);
    if (text) answers[key] = text;
  }
  return answers;
}

export function upsertPublicSolutionRequest(input: {
  sessionId: string;
  id?: string;
  familyId?: string | null;
  offerId?: string | null;
  deliveryModel?: unknown;
  intent?: unknown;
  organizationName?: unknown;
  contactName?: unknown;
  contactEmail?: unknown;
  contactPhone?: unknown;
  notes?: unknown;
  sizingAnswers?: unknown;
}): PublicSolutionRequest {
  expireDrafts();
  const existing =
    (input.id ? records.get(input.id) : undefined) ??
    [...records.values()].find((record) => record.sessionId === input.sessionId && record.status === "draft");
  const base = existing ?? createPublicSolutionRequest(input.sessionId);
  const familyId = clip(input.familyId, 80) || base.familyId;
  const deliveryModel = asDelivery(input.deliveryModel ?? base.deliveryModel);
  const offerId = clip(input.offerId, 80) || base.offerId;
  const resolvedFamilyId = familyId && publicFamilyExists(familyId) ? familyId : null;
  const next: PublicSolutionRequest = {
    ...base,
    sessionId: input.sessionId,
    familyId: resolvedFamilyId,
    offerId:
      familyId && offerId && publicOfferInFamily(familyId, offerId, deliveryModel) ? offerId : null,
    deliveryModel,
    intent: asIntent(input.intent ?? base.intent),
    organizationName: clip(input.organizationName ?? base.organizationName, 200),
    contactName: clip(input.contactName ?? base.contactName, 120),
    contactEmail: clip(input.contactEmail ?? base.contactEmail, 200).toLowerCase(),
    sizingAnswers:
      input.sizingAnswers !== undefined
        ? sanitizeSizingAnswers(resolvedFamilyId, input.sizingAnswers)
        : base.sizingAnswers,
    contactPhone: clip(input.contactPhone ?? base.contactPhone, 40),
    notes: clip(input.notes ?? base.notes, 2000),
    updatedAt: new Date().toISOString(),
  };
  records.set(next.id, next);
  return { ...next };
}

export function submitPublicSolutionRequest(
  record: PublicSolutionRequest,
  contact: { name: string; email: string; phone?: string; organizationName?: string },
  idempotencyKey?: string,
): { record: PublicSolutionRequest; replayed: boolean } {
  const key =
    idempotencyKey?.trim().slice(0, 120) ||
    `${contact.email.trim().toLowerCase()}|${record.familyId || ""}|${record.offerId || ""}|${record.deliveryModel}|${record.intent}`;
  const existingId = idempotency.get(key);
  if (existingId) {
    const prior = records.get(existingId);
    if (prior) return { record: { ...prior }, replayed: true };
  }

  const submitted: PublicSolutionRequest = {
    ...record,
    contactName: contact.name.trim().slice(0, 120),
    contactEmail: contact.email.trim().toLowerCase().slice(0, 200),
    contactPhone: (contact.phone || "").trim().slice(0, 40),
    organizationName: (contact.organizationName || record.organizationName).trim().slice(0, 200),
    status: "submitted",
    crmStatus: "pending",
    updatedAt: new Date().toISOString(),
  };
  records.set(submitted.id, submitted);
  idempotency.set(key, submitted.id);
  return { record: { ...submitted }, replayed: false };
}

export function markPublicSolutionRequestCrm(
  id: string,
  crmStatus: "pending" | "recorded",
): PublicSolutionRequest | undefined {
  const record = records.get(id);
  if (!record) return undefined;
  const next = { ...record, crmStatus, updatedAt: new Date().toISOString() };
  records.set(id, next);
  return { ...next };
}

export function publicSolutionRequestView(record: PublicSolutionRequest) {
  return {
    id: record.id,
    correlationId: record.correlationId,
    familyId: record.familyId,
    offerId: record.offerId,
    deliveryModel: record.deliveryModel,
    intent: record.intent,
    organizationName: record.organizationName,
    contactName: record.contactName,
    contactEmail: record.contactEmail,
    contactPhone: record.contactPhone,
    notes: record.notes,
    sizingAnswers: record.sizingAnswers,
    status: record.status,
    crmStatus: record.crmStatus,
    updatedAt: record.updatedAt,
  };
}

/** Test helper — not used by routes. */
export function resetPublicSolutionRequestsForTests() {
  records.clear();
  idempotency.clear();
}
