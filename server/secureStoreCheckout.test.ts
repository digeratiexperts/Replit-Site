import { describe, expect, it } from "vitest";
import {
  canonicalCheckoutTotal,
  canonicalizeCheckoutLineItems,
} from "./secureStoreCheckout";

describe("secure store checkout canonicalization", () => {
  it("uses trusted catalog price even when the browser supplies a cheaper price", () => {
    const items = canonicalizeCheckoutLineItems([
      {
        productId: "prod-010",
        sku: "DE-SVC-CM-ENDPOINT-CORE-MO",
        name: "Fake browser name",
        quantity: 2,
        unitPrice: 0.01,
        total: 0.02,
      },
    ], "comanaged");

    expect(items).toEqual([
      {
        productId: "prod-010",
        sku: "DE-SVC-CM-ENDPOINT-CORE-MO",
        name: "Co-Managed Endpoint Management",
        quantity: 2,
        unitPrice: 39,
        pricingType: "per_endpoint",
        total: 78,
      },
    ]);
    expect(canonicalCheckoutTotal(items)).toBe(78);
  });

  it("rejects contract-only managed products from online checkout", () => {
    expect(() => canonicalizeCheckoutLineItems([
      {
        productId: "prod-001",
        sku: "DE-SVC-MGD-OFFICE-MO",
        quantity: 1,
      },
    ], "admin")).toThrow(/not eligible for online checkout/i);
  });

  it("rejects a product ID and SKU mismatch", () => {
    expect(() => canonicalizeCheckoutLineItems([
      {
        productId: "prod-010",
        sku: "DE-SVC-CM-ENDPOINT-EDR-MO",
        quantity: 1,
      },
    ], "comanaged")).toThrow(/unknown or mismatched store product/i);
  });

  it("rejects invalid quantities", () => {
    expect(() => canonicalizeCheckoutLineItems([
      {
        productId: "prod-010",
        sku: "DE-SVC-CM-ENDPOINT-CORE-MO",
        quantity: 0,
      },
    ], "comanaged")).toThrow(/invalid quantity/i);
  });
});
