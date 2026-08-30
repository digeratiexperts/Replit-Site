import type { CuratedSolutionFamily } from "@/data/curatedSolutions";
import { getFamilyById } from "@/lib/businessNeeds";
import {
  buildSolutionPackage,
  type InstallMode,
} from "@/lib/solutionPackage";

export type DeliveryPreference = "standalone" | "co_managed" | "unsure";
export type DeviceOwnership = "company" | "byod" | "hybrid" | "";
export type InternalItStatus = "yes" | "no" | "unsure" | "";
export type SolutionRequestIntent = "request" | "quote" | "assessment" | "consultation";
export type RemoteSupportPreference = "none" | "as_needed" | "ongoing" | "unsure" | "";
export type InstallationPreference = InstallMode | "unsure" | "";

export type SolutionDraftNeed = {
  familyId: CuratedSolutionFamily["id"];
  delivery?: DeliveryPreference;
};

/**
 * Public business profile. These sizing facts are intentionally collected before
 * the prospect chooses a solution so every downstream package can use one source
 * of truth for quantities and fulfillment.
 */
export type SolutionEnvironment = {
  userCount: string;
  workstationCount: string;
  mobileDeviceCount: string;
  siteCount: string;
  deviceOwnership: DeviceOwnership;
  internalIt: InternalItStatus;
  /** Compatibility/context fields retained for older drafts and future conditional questions. */
  deviceMix: string;
  complianceNeeds: string;
  currentProvider: string;
  urgency: string;
};

export type SolutionFulfillmentPreference = {
  installation: InstallationPreference;
  remoteSupport: RemoteSupportPreference;
};

export type SolutionDraft = {
  version: 2;
  needs: SolutionDraftNeed[];
  deliveryPreference: DeliveryPreference | "";
  environment: SolutionEnvironment;
  fulfillment: SolutionFulfillmentPreference;
  intent: SolutionRequestIntent;
};

const STORAGE_KEY = "de-solution-draft-v2";
const LEGACY_V1_KEY = "de-solution-draft-v1";
const LEGACY_CART_KEY = "de-public-solution-cart-v1";
export const SOLUTION_DRAFT_EVENT = "de-solution-draft-change";
/** @deprecated Use SOLUTION_DRAFT_EVENT. Kept so existing listeners keep working. */
export const SOLUTION_CART_EVENT = SOLUTION_DRAFT_EVENT;

const FAMILY_IDS = new Set<string>([
  "it_operations",
  "endpoint_devices",
  "identity_access",
  "email_collaboration",
  "cybersecurity_operations",
  "network_connectivity",
  "backup_continuity",
  "compliance_risk",
  "security_awareness",
  "business_communications",
  "hardware_lifecycle",
  "documentation_standards",
  "technology_strategy",
]);

export function emptyEnvironment(): SolutionEnvironment {
  return {
    userCount: "",
    workstationCount: "",
    mobileDeviceCount: "",
    siteCount: "",
    deviceOwnership: "",
    internalIt: "",
    deviceMix: "",
    complianceNeeds: "",
    currentProvider: "",
    urgency: "",
  };
}

export function emptyFulfillment(): SolutionFulfillmentPreference {
  return {
    installation: "",
    remoteSupport: "",
  };
}

export function emptyDraft(): SolutionDraft {
  return {
    version: 2,
    needs: [],
    deliveryPreference: "",
    environment: emptyEnvironment(),
    fulfillment: emptyFulfillment(),
    intent: "request",
  };
}

function isFamilyId(value: unknown): value is CuratedSolutionFamily["id"] {
  return typeof value === "string" && FAMILY_IDS.has(value);
}

function asDeliveryPreference(value: unknown): DeliveryPreference | undefined {
  if (value === "standalone" || value === "co_managed" || value === "unsure") return value;
  return undefined;
}

function asDeviceOwnership(value: unknown): DeviceOwnership {
  if (value === "company" || value === "byod" || value === "hybrid") return value;
  return "";
}

function asInternalIt(value: unknown): InternalItStatus {
  if (value === "yes" || value === "no" || value === "unsure") return value;
  return "";
}

function asIntent(value: unknown): SolutionRequestIntent {
  if (value === "quote" || value === "assessment" || value === "consultation" || value === "request") {
    return value;
  }
  return "request";
}

function asInstallation(value: unknown): InstallationPreference {
  if (value === "self_install" || value === "remote_assist" || value === "onsite" || value === "unsure") {
    return value;
  }
  return "";
}

function asRemoteSupport(value: unknown): RemoteSupportPreference {
  if (value === "none" || value === "as_needed" || value === "ongoing" || value === "unsure") return value;
  return "";
}

function clip(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function parseDraft(raw: unknown): SolutionDraft {
  const base = emptyDraft();
  if (!raw || typeof raw !== "object") return base;
  const input = raw as Record<string, unknown>;
  const needs = Array.isArray(input.needs)
    ? input.needs.flatMap((entry) => {
        if (!entry || typeof entry !== "object") return [];
        const familyId = (entry as { familyId?: unknown }).familyId;
        if (!isFamilyId(familyId)) return [];
        const delivery = asDeliveryPreference((entry as { delivery?: unknown }).delivery);
        return delivery ? [{ familyId, delivery }] : [{ familyId }];
      })
    : [];
  const seen = new Set<string>();
  const uniqueNeeds = needs.filter((need) => {
    if (seen.has(need.familyId)) return false;
    seen.add(need.familyId);
    return true;
  });
  const environmentInput =
    input.environment && typeof input.environment === "object"
      ? (input.environment as Record<string, unknown>)
      : {};
  const fulfillmentInput =
    input.fulfillment && typeof input.fulfillment === "object"
      ? (input.fulfillment as Record<string, unknown>)
      : {};
  return {
    version: 2,
    needs: uniqueNeeds,
    deliveryPreference: asDeliveryPreference(input.deliveryPreference) ?? "",
    intent: asIntent(input.intent),
    environment: {
      userCount: clip(environmentInput.userCount, 12),
      workstationCount: clip(environmentInput.workstationCount, 12),
      mobileDeviceCount: clip(environmentInput.mobileDeviceCount, 12),
      siteCount: clip(environmentInput.siteCount, 12),
      deviceOwnership: asDeviceOwnership(environmentInput.deviceOwnership),
      internalIt: asInternalIt(environmentInput.internalIt),
      deviceMix: clip(environmentInput.deviceMix, 200),
      complianceNeeds: clip(environmentInput.complianceNeeds, 400),
      currentProvider: clip(environmentInput.currentProvider, 200),
      urgency: clip(environmentInput.urgency, 200),
    },
    fulfillment: {
      installation: asInstallation(fulfillmentInput.installation),
      remoteSupport: asRemoteSupport(fulfillmentInput.remoteSupport),
    },
  };
}

export function resolvedNeedDelivery(
  need: SolutionDraftNeed,
  preference: DeliveryPreference | "",
): DeliveryPreference | "" {
  return need.delivery || preference || "";
}

export function upsertNeed(draft: SolutionDraft, need: SolutionDraftNeed): SolutionDraft {
  return {
    ...draft,
    needs: [...draft.needs.filter((entry) => entry.familyId !== need.familyId), need],
  };
}

export function removeNeed(draft: SolutionDraft, familyId: string): SolutionDraft {
  return {
    ...draft,
    needs: draft.needs.filter((entry) => entry.familyId !== familyId),
  };
}

export function toggleNeed(draft: SolutionDraft, familyId: CuratedSolutionFamily["id"]): SolutionDraft {
  if (draft.needs.some((entry) => entry.familyId === familyId)) {
    return removeNeed(draft, familyId);
  }
  return upsertNeed(draft, { familyId });
}

export function setDeliveryPreference(
  draft: SolutionDraft,
  deliveryPreference: DeliveryPreference | "",
): SolutionDraft {
  return { ...draft, deliveryPreference };
}

export function patchEnvironment(
  draft: SolutionDraft,
  patch: Partial<SolutionEnvironment>,
): SolutionDraft {
  return {
    ...draft,
    environment: { ...draft.environment, ...patch },
  };
}

export function patchFulfillment(
  draft: SolutionDraft,
  patch: Partial<SolutionFulfillmentPreference>,
): SolutionDraft {
  return {
    ...draft,
    fulfillment: { ...draft.fulfillment, ...patch },
  };
}

function countReady(value: string, allowZero = false): boolean {
  if (!/^\d{1,6}$/.test(value.trim())) return false;
  const count = Number(value);
  return allowZero ? count >= 0 : count > 0;
}

export function isProfileComplete(environment: SolutionEnvironment): boolean {
  return (
    countReady(environment.userCount) &&
    countReady(environment.workstationCount, true) &&
    countReady(environment.mobileDeviceCount, true) &&
    countReady(environment.siteCount) &&
    !!environment.deviceOwnership &&
    !!environment.internalIt
  );
}

export function profileSummary(environment: SolutionEnvironment): string {
  const parts = [
    environment.userCount ? `${environment.userCount} users` : "users not set",
    environment.workstationCount ? `${environment.workstationCount} computers` : "computers not set",
    environment.mobileDeviceCount ? `${environment.mobileDeviceCount} mobile` : "mobile not set",
    environment.siteCount ? `${environment.siteCount} sites` : "sites not set",
  ];
  return parts.join(" · ");
}

export function recommendedIntent(draft: SolutionDraft): SolutionRequestIntent {
  const packages = draft.needs.flatMap((need) => {
    const family = getFamilyById(need.familyId);
    if (!family) return [];
    const delivery = resolvedNeedDelivery(need, draft.deliveryPreference);
    if (delivery !== "standalone" && delivery !== "co_managed") return [];
    return [buildSolutionPackage(family, delivery, draft.environment)];
  });
  if (packages.some((entry) => entry.assessmentPolicy === "required")) return "assessment";
  if (packages.length > 0) return "quote";
  return draft.intent || "request";
}

export function recommendedCtaLabel(intent: SolutionRequestIntent): string {
  if (intent === "assessment") return "Start required assessment";
  if (intent === "consultation") return "Schedule a consultation";
  if (intent === "quote") return "Continue to contact details";
  return "Submit this solution";
}

export type PublicSolutionNeedPayload = {
  familyId: string;
  offerId: string | null;
  deliveryModel: DeliveryPreference;
};

export function toRequestNeeds(draft: SolutionDraft): PublicSolutionNeedPayload[] {
  const preference = draft.deliveryPreference || "unsure";
  return draft.needs.flatMap((need) => {
    const family = getFamilyById(need.familyId);
    if (!family) return [];
    const delivery = resolvedNeedDelivery(need, preference) || "unsure";
    const offer =
      delivery === "standalone" || delivery === "co_managed"
        ? family.offers.find((entry) => entry.deliveryModel === delivery) ?? null
        : null;
    return [
      {
        familyId: need.familyId,
        offerId: offer?.id ?? null,
        deliveryModel: delivery === "standalone" || delivery === "co_managed" ? delivery : "unsure",
      },
    ];
  });
}

function migrateLegacyCart(): SolutionDraftNeed[] {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(window.localStorage.getItem(LEGACY_CART_KEY) || "[]");
    if (!Array.isArray(value)) return [];
    return value.flatMap((item) => {
      if (!isFamilyId(item?.familyId)) return [];
      const delivery = asDeliveryPreference(item?.delivery);
      return delivery ? [{ familyId: item.familyId, delivery }] : [{ familyId: item.familyId }];
    });
  } catch {
    return [];
  }
}

function readStoredDraft(): SolutionDraft | null {
  if (typeof window === "undefined") return null;
  const current = window.localStorage.getItem(STORAGE_KEY);
  if (current) return parseDraft(JSON.parse(current));
  const legacyV1 = window.localStorage.getItem(LEGACY_V1_KEY);
  if (legacyV1) return parseDraft(JSON.parse(legacyV1));
  return null;
}

export function readSolutionDraft(): SolutionDraft {
  if (typeof window === "undefined") return emptyDraft();
  try {
    const stored = readStoredDraft();
    if (stored) {
      if (!window.localStorage.getItem(STORAGE_KEY)) writeSolutionDraft(stored);
      return stored;
    }
    const migrated = migrateLegacyCart();
    if (migrated.length === 0) return emptyDraft();
    const draft = { ...emptyDraft(), needs: migrated };
    writeSolutionDraft(draft);
    window.localStorage.removeItem(LEGACY_CART_KEY);
    return draft;
  } catch {
    return emptyDraft();
  }
}

export function writeSolutionDraft(draft: SolutionDraft): SolutionDraft {
  const next = parseDraft(draft);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.localStorage.removeItem(LEGACY_V1_KEY);
    window.dispatchEvent(new CustomEvent(SOLUTION_DRAFT_EVENT));
  }
  return next;
}

export function addDraftNeed(need: SolutionDraftNeed): SolutionDraft {
  return writeSolutionDraft(upsertNeed(readSolutionDraft(), need));
}

export function removeDraftNeed(familyId: string): SolutionDraft {
  return writeSolutionDraft(removeNeed(readSolutionDraft(), familyId));
}

export function toggleDraftNeed(familyId: CuratedSolutionFamily["id"]): SolutionDraft {
  return writeSolutionDraft(toggleNeed(readSolutionDraft(), familyId));
}

export function patchSolutionDraft(patch: Partial<SolutionDraft>): SolutionDraft {
  return writeSolutionDraft({ ...readSolutionDraft(), ...patch });
}

export function clearSolutionDraft(): SolutionDraft {
  return writeSolutionDraft(emptyDraft());
}
