import { describe, expect, it } from "vitest";
import { CANONICAL_CSRA_ONE_TIME, CANONICAL_CSRA_STORE_SKU, LEGACY_CSRA_ONE_TIME } from "@shared/canonicalCsra";
import { validatePortalOrderSelection } from "@shared/portalOrderCatalog";
import { storeProducts } from "./storeProducts";
import {
  DEFAULT_GUIDED_ANSWERS,
  GUIDED_BUYER_OPTIONS,
  buildGuidedRecommendation,
  filterProductsForGuidance,
  recommendProactiveSku,
  type GuidedBuyingAnswers,
} from "./storeMerchandising";

const prospectProtect: GuidedBuyingAnswers = {
  ...DEFAULT_GUIDED_ANSWERS,
  buyerType: "prospect",
  objective: "protect",
  companySize: "11-49",
  locations: "1",
  workEmail: "it@acme.com",
};

describe("consultative store guidance", () => {
  it("names buyer types as DE or Digerati Experts", () => {
    expect(GUIDED_BUYER_OPTIONS.map((option) => option.label)).toEqual([
      "New to DE",
      "Existing DE client",
      "In-house IT",
    ]);
  });

  it("does not dump the unfiltered catalog as the default recommendation", () => {
    const rec = buildGuidedRecommendation(prospectProtect);
    const filtered = filterProductsForGuidance(storeProducts, rec, { fullCatalog: false });

    expect(rec.products.length).toBeGreaterThan(0);
    expect(rec.products.length).toBeLessThan(10);
    expect(rec.recommendedSkus.length).toBeLessThan(storeProducts.length / 3);
    expect(filtered.length).toBeLessThan(storeProducts.length);
    expect(filtered.every((product) => rec.recommendedSkus.includes(product.sku))).toBe(true);
  });

  it("reveals the full catalog only when skip/full-catalog is requested", () => {
    const rec = buildGuidedRecommendation(prospectProtect);
    const full = filterProductsForGuidance(storeProducts, rec, { fullCatalog: true });
    expect(full).toHaveLength(storeProducts.length);
  });

  it("captures work email on the recommendation and keeps CSRA at $2,500", () => {
    const rec = buildGuidedRecommendation(prospectProtect);
    expect(rec.workEmail).toBe("it@acme.com");
    expect(rec.csra?.sku).toBe(CANONICAL_CSRA_STORE_SKU);
    expect(rec.csra?.basePrice).toBe(CANONICAL_CSRA_ONE_TIME);
    expect(rec.csra?.basePrice).not.toBe(LEGACY_CSRA_ONE_TIME);
    expect(rec.products.some((product) => product.basePrice === LEGACY_CSRA_ONE_TIME)).toBe(false);
  });

  it("recommends exactly one ProActive tier for prospects and none for marketplace buyers", () => {
    const prospect = buildGuidedRecommendation(prospectProtect);
    expect(prospect.catalogFamily).toBe("solutions");
    expect(prospect.proactiveTier?.sku).toBe(recommendProactiveSku("11-49"));
    expect(prospect.proactiveTier?.sku).toBe("DE-SVC-MGD-OFFICE-MO");

    const marketplace = buildGuidedRecommendation({
      ...prospectProtect,
      buyerType: "existing_client",
    });
    expect(marketplace.catalogFamily).toBe("marketplace");
    expect(marketplace.proactiveTier).toBeNull();
  });

  it("still rejects exclusive ProActive package stacking if they reach the order form", () => {
    const rec = buildGuidedRecommendation(prospectProtect);
    expect(rec.proactiveTier).toBeTruthy();
    const stacked = validatePortalOrderSelection([
      { sku: rec.proactiveTier!.sku, quantity: 1 },
      { sku: "DE-SVC-MGD-BUSINESS-MO", quantity: 1 },
    ]);
    expect(stacked.ok).toBe(false);
    if (!stacked.ok) {
      expect(stacked.code).toBe("exclusive_conflict");
    }

    const allowed = validatePortalOrderSelection([
      { sku: CANONICAL_CSRA_STORE_SKU, quantity: 1 },
      { sku: rec.proactiveTier!.sku, quantity: 1 },
    ]);
    expect(allowed.ok).toBe(true);
  });
});
