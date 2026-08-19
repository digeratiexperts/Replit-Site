import { describe, expect, it } from "vitest";
import { canonicalizeQuoteItems, quoteTotals } from "./storeQuoteCommerce";

describe("store quote canonicalization", () => {
  it("keeps contract-only SKUs and ignores browser unit prices", () => {
    const items = canonicalizeQuoteItems([
      {
        productId: "prod-001",
        sku: "DE-SVC-MGD-OFFICE-MO",
        quantity: 1,
        unitPrice: 0.01,
      },
    ]);
    expect(items).toHaveLength(1);
    expect(items[0].contractOnly).toBe(true);
    expect(items[0].unitPrice).toBeGreaterThan(1);
    expect(items[0].unitPrice).not.toBe(0.01);
  });

  it("applies a client discount on quote lines", () => {
    const items = canonicalizeQuoteItems(
      [
        {
          productId: "prod-010",
          sku: "DE-SVC-CM-ENDPOINT-CORE-MO",
          quantity: 4,
          unitPrice: 1,
        },
      ],
      { "prod-010": 30 },
    );
    expect(items[0].listPrice).toBe(39);
    expect(items[0].unitPrice).toBe(30);
    expect(quoteTotals(items).monthly).toBe(120);
  });

  it("rejects unknown or mismatched catalog products", () => {
    expect(() =>
      canonicalizeQuoteItems([{ productId: "not-real", quantity: 1 }]),
    ).toThrow(/unknown store product/i);
    expect(() =>
      canonicalizeQuoteItems([
        {
          productId: "prod-010",
          sku: "DE-SVC-CM-ENDPOINT-EDR-MO",
          quantity: 1,
        },
      ]),
    ).toThrow(/mismatched/i);
  });
});
