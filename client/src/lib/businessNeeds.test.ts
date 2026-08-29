import { describe, expect, it } from "vitest";
import { curatedSolutionFamilies } from "@/data/curatedSolutions";
import {
  BUSINESS_NEEDS_INDEX_PATH,
  familyPath,
  familyToSlug,
  getFamilyBySlug,
  offerForDelivery,
  publicSolutionFamilies,
  slugToFamilyId,
} from "./businessNeeds";

describe("Door 2 business-needs helpers", () => {
  it("maps all 13 families to kebab slugs and back", () => {
    expect(curatedSolutionFamilies).toHaveLength(13);
    for (const family of curatedSolutionFamilies) {
      const slug = familyToSlug(family.id);
      expect(slug).not.toContain("_");
      expect(slugToFamilyId(slug)).toBe(family.id);
      expect(getFamilyBySlug(slug)?.id).toBe(family.id);
      expect(familyPath(family.id)).toBe(`${BUSINESS_NEEDS_INDEX_PATH}/${slug}`);
    }
  });

  it("returns null for an unknown family slug", () => {
    expect(getFamilyBySlug("not-a-real-family")).toBeNull();
    expect(slugToFamilyId("warehouse-sku")).toBeNull();
  });

  it("exposes standalone and co-managed offers for every family", () => {
    for (const family of curatedSolutionFamilies) {
      expect(offerForDelivery(family, "standalone").deliveryModel).toBe("standalone");
      expect(offerForDelivery(family, "co_managed").deliveryModel).toBe("co_managed");
    }
  });

  it("public contract stays limited to #101 fields", () => {
    const payload = JSON.stringify(publicSolutionFamilies());
    expect(payload).not.toMatch(/storeProducts|vendorLogos|sku|margin|distributor/i);
    expect(publicSolutionFamilies()).toHaveLength(13);
    expect(publicSolutionFamilies()[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        slug: expect.any(String),
        label: expect.any(String),
        offers: expect.any(Array),
      }),
    );
  });
});
