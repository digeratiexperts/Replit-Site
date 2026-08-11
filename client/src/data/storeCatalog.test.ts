import { describe, expect, it } from "vitest";
import { pricingTiers } from "./pricing";
import {
  getContractOnlyStoreProducts,
  getStoreProductBySku,
  storeCatalogProducts,
} from "./storeCatalog";

describe("public Store catalog", () => {
  it("publishes all four ProActive tiers from canonical pricing", () => {
    const proactive = getContractOnlyStoreProducts().filter((product) =>
      product.name.startsWith("ProActive Ecosystem"),
    );

    expect(proactive.map((product) => product.sku)).toEqual([
      "DE-SVC-MGD-IT-MO",
      "DE-SVC-MGD-OFFICE-MO",
      "DE-SVC-MGD-BUSINESS-MO",
      "DE-SVC-MGD-ENTERPRISE-MO",
    ]);
    expect(proactive.map((product) => product.basePrice)).toEqual(
      pricingTiers.map((tier) => tier.user),
    );
  });

  it("keeps managed tiers contract-only and non-checkout", () => {
    const proactive = storeCatalogProducts.filter((product) =>
      product.name.startsWith("ProActive Ecosystem"),
    );

    expect(proactive).toHaveLength(4);
    for (const product of proactive) {
      expect(product.isContractOnly).toBe(true);
      expect(product.isCheckoutEnabled).toBe(false);
    }
  });

  it("uses defensible recovery-objective language for public BCDR", () => {
    const bcdr = getStoreProductBySku("DE-SVC-MGD-BCDR-MO");
    expect(bcdr).toBeDefined();
    expect(bcdr?.features).toContain("Contract-Defined RTO/RPO Objectives");
    expect(bcdr?.features.join(" ")).not.toMatch(/RTO\/RPO Guarantees/i);
    expect(bcdr?.description).not.toMatch(/ensuring your business can recover from any disruption/i);
  });
});
