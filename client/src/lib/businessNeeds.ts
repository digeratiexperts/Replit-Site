import {
  curatedSolutionFamilies,
  type CuratedDeliveryModel,
  type CuratedSolutionFamily,
  type CuratedSolutionOffer,
} from "../data/curatedSolutions";

export type { CuratedDeliveryModel, CuratedSolutionFamily, CuratedSolutionOffer };

export const BUSINESS_NEEDS_INDEX_PATH = "/store";
export const SOLUTION_REQUEST_PATH = "/solutions/request";

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

/** Public wire contract — #101 fields only. */
export function toPublicFamily(family: CuratedSolutionFamily) {
  return {
    id: family.id,
    slug: familyToSlug(family.id),
    label: family.label,
    description: family.description,
    offers: family.offers.map((offer) => ({
      id: offer.id,
      name: offer.name,
      deliveryModel: offer.deliveryModel,
      summary: offer.summary,
      audience: offer.audience,
      outcomes: offer.outcomes,
      includes: offer.includes,
      prerequisites: offer.prerequisites,
      boundaries: offer.boundaries,
      serviceLevel: offer.serviceLevel,
      commercialModel: offer.commercialModel,
      nextStep: offer.nextStep,
    })),
  };
}

export function publicSolutionFamilies() {
  return curatedSolutionFamilies.map(toPublicFamily);
}

export function requestPath(opts: {
  family: CuratedSolutionFamily["id"] | string;
  delivery?: CuratedDeliveryModel;
  intent?: "request" | "quote" | "assessment" | "consultation";
}): string {
  const params = new URLSearchParams();
  params.set("family", familyToSlug(opts.family as CuratedSolutionFamily["id"]));
  if (opts.delivery) params.set("delivery", opts.delivery);
  if (opts.intent) params.set("intent", opts.intent);
  return `${SOLUTION_REQUEST_PATH}?${params.toString()}`;
}

export function familyPath(id: CuratedSolutionFamily["id"]): string {
  return `${BUSINESS_NEEDS_INDEX_PATH}/solutions/${familyToSlug(id)}`;
}
