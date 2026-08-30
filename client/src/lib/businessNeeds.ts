import {
  curatedSolutionFamilies,
  type CuratedDeliveryModel,
  type CuratedSolutionFamily,
  type CuratedSolutionOffer,
} from "../data/curatedSolutions";
import { buildSolutionPackage } from "./solutionPackage";

export type { CuratedDeliveryModel, CuratedSolutionFamily, CuratedSolutionOffer };

export const BUSINESS_NEEDS_INDEX_PATH = "/store";
export const SOLUTION_WORKSPACE_PATH = "/store/solution";
export const SOLUTION_REQUEST_PATH = "/solutions/request";

export const BUSINESS_GOALS = [
  { id: "productive", label: "Keep my team productive", familyIds: ["it_operations", "endpoint_devices"] },
  { id: "protect", label: "Protect the business", familyIds: ["identity_access", "email_collaboration", "cybersecurity_operations", "backup_continuity"] },
  { id: "requirements", label: "Meet requirements", familyIds: ["compliance_risk", "documentation_standards", "security_awareness"] },
  { id: "connect", label: "Connect my people & locations", familyIds: ["network_connectivity", "business_communications"] },
  { id: "modernize", label: "Equip & modernize", familyIds: ["hardware_lifecycle", "technology_strategy"] },
] as const satisfies ReadonlyArray<{
  id: string;
  label: string;
  familyIds: CuratedSolutionFamily["id"][];
}>;

export type BusinessGoalId = (typeof BUSINESS_GOALS)[number]["id"];

export function familyToSlug(id: CuratedSolutionFamily["id"]): string {
  return id.replaceAll("_", "-");
}

export function slugToFamilyId(slug: string): CuratedSolutionFamily["id"] | null {
  const normalized = slug.trim().toLowerCase().replaceAll("-", "_");
  const family = curatedSolutionFamilies.find((entry) => entry.id === normalized);
  return family?.id ?? null;
}

export function getFamilyBySlug(slug: string): CuratedSolutionFamily | null {
  const id = slugToFamilyId(slug);
  if (!id) return null;
  return curatedSolutionFamilies.find((entry) => entry.id === id) ?? null;
}

export function getFamilyById(id: string): CuratedSolutionFamily | null {
  return curatedSolutionFamilies.find((entry) => entry.id === id) ?? null;
}

export function offerForDelivery(
  family: CuratedSolutionFamily,
  delivery: CuratedDeliveryModel,
): CuratedSolutionOffer {
  return family.offers.find((offer) => offer.deliveryModel === delivery) ?? family.offers[0];
}

export function parseDeliveryModel(value: string | null | undefined): CuratedDeliveryModel {
  return value === "co_managed" ? "co_managed" : "standalone";
}

export function parseDeliveryPreference(
  value: string | null | undefined,
): "standalone" | "co_managed" | "unsure" | "" {
  if (value === "standalone" || value === "co_managed" || value === "unsure") return value;
  return "";
}

function publicOfferView(family: CuratedSolutionFamily, offer: CuratedSolutionOffer) {
  const packageView = buildSolutionPackage(family, offer.deliveryModel, {});
  const standalone = offer.deliveryModel === "standalone";
  return {
    id: offer.id,
    name: packageView.offerName,
    deliveryModel: offer.deliveryModel,
    summary: standalone ? packageView.relationshipSummary : offer.summary,
    audience: standalone
      ? "Organizations that want this capability as a packaged solution without enrolling in DE's managed-services operating model."
      : offer.audience,
    outcomes: offer.outcomes,
    includes: offer.includes,
    prerequisites: offer.prerequisites,
    boundaries: offer.boundaries,
    serviceLevel: standalone
      ? "DE provides the approved package and any separately selected implementation or support. Ongoing operation remains with the customer or its existing IT provider unless Co-Managed is selected."
      : offer.serviceLevel,
    commercialModel: packageView.pricingLabel,
    nextStep: offer.nextStep,
    package: {
      pricingPosition: packageView.pricingPosition,
      lineItems: packageView.lineItems,
      assessmentPolicy: packageView.assessmentPolicy,
      shipmentMode: packageView.shipmentMode,
      shipmentCopy: packageView.shipmentCopy,
      installModes: packageView.installModes,
      technicianPolicy: packageView.technicianPolicy,
      technicianCopy: packageView.technicianCopy,
      remoteSupportAvailable: packageView.remoteSupportAvailable,
      remoteSupportCopy: packageView.remoteSupportCopy,
      primaryIntent: packageView.primaryIntent,
    },
  };
}

/** Public wire contract. Never join vendor, SKU, cost, margin, or distributor data here. */
export function toPublicFamily(family: CuratedSolutionFamily) {
  return {
    id: family.id,
    slug: familyToSlug(family.id),
    label: family.label,
    description: family.description,
    offers: family.offers.map((offer) => publicOfferView(family, offer)),
  };
}

export function publicSolutionFamilies() {
  return curatedSolutionFamilies.map(toPublicFamily);
}

export function requestPath(opts?: {
  family?: CuratedSolutionFamily["id"] | string;
  delivery?: CuratedDeliveryModel | "unsure";
  intent?: "request" | "quote" | "assessment" | "consultation";
}): string {
  const params = new URLSearchParams();
  if (opts?.family) params.set("family", familyToSlug(opts.family as CuratedSolutionFamily["id"]));
  if (opts?.delivery) params.set("delivery", opts.delivery);
  if (opts?.intent) params.set("intent", opts.intent);
  const query = params.toString();
  return query ? `${SOLUTION_REQUEST_PATH}?${query}` : SOLUTION_REQUEST_PATH;
}

export function familyPath(id: CuratedSolutionFamily["id"]): string {
  return `${BUSINESS_NEEDS_INDEX_PATH}/solutions/${familyToSlug(id)}`;
}
