import { describe, expect, it } from "vitest";
import { pricing } from "./pricing";
import { storeProducts } from "./storeProducts";
import { getProductBySku, getRelatedProducts } from "./storeMerchandising";

const managedSkus = [
  "DE-SVC-MGD-IT-MO",
  "DE-SVC-MGD-OFFICE-MO",
  "DE-SVC-MGD-BUSINESS-MO",
  "DE-SVC-MGD-ENTERPRISE-MO",
] as const;

describe("managed Store catalog", () => {
  it("exposes all four canonical ProActive tiers in display order", () => {
    const tiers = storeProducts.filter((product) =>
      managedSkus.includes(product.sku as (typeof managedSkus)[number]),
    );

    expect(tiers.map((product) => product.sku)).toEqual(managedSkus);
    expect(tiers.map((product) => product.basePrice)).toEqual([
      pricing.it.user,
      pricing.office.user,
      pricing.business.user,
      pricing.enterprise.user,
    ]);
    expect(tiers.every((product) => product.isContractOnly)).toBe(true);
    expect(tiers.every((product) => !product.isCheckoutEnabled)).toBe(true);
  });

  it("resolves every managed tier detail SKU and related-product navigation", () => {
    for (const sku of managedSkus) {
      const product = getProductBySku(sku);
      expect(product, sku).toBeDefined();
      expect(getRelatedProducts(product!, { limit: 4 })).toBeInstanceOf(Array);
    }
  });

  it("uses contract-defined recovery objectives instead of an unconditional guarantee", () => {
    const bcdr = storeProducts.find((product) => product.sku === "DE-SVC-MGD-BCDR-MO");
    expect(bcdr).toBeDefined();
    expect(bcdr!.features).toContain("Contract-Defined RTO/RPO Objectives");
    expect(bcdr!.features.join(" ")).not.toMatch(/RTO\/RPO Guarantees/i);
    expect(bcdr!.description).not.toMatch(/ensuring your business can recover from any disruption/i);
  });
});
