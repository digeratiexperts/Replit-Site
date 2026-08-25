import { describe, expect, it } from "vitest";
import { canonicalizeCheckoutLineItems } from "./secureStoreCheckout";
import { buildClientPriceEntry, resolveUnitPrice } from "./storeClientPricing";

describe("authoritative client pricing", () => {
  it("gives explicit custom price precedence and derives its discount metadata", () => {
    const pricing = buildClientPriceEntry({
      productId: "prod-020",
      customPrice: 600,
      discountPercent: 99,
    });

    expect(pricing).toEqual({
      productId: "prod-020",
      customPrice: 600,
      discountPercent: 20,
    });
  });

  it("converts a percentage-only discount from the canonical catalog price", () => {
    const pricing = buildClientPriceEntry({
      productId: "prod-020",
      discountPercent: 10,
    });

    expect(pricing.customPrice).toBe(675);
    expect(pricing.discountPercent).toBe(10);
  });

  it("rejects a client override that is not a real discount", () => {
    expect(() =>
      buildClientPriceEntry({
        productId: "prod-020",
        customPrice: 750,
      }),
    ).toThrow(/lower than catalog price/);

    expect(resolveUnitPrice(750, 900)).toBe(750);
  });

  it("ignores browser price fields and charges the authenticated client's server override", () => {
    const [line] = canonicalizeCheckoutLineItems(
      [
        {
          productId: "prod-020",
          sku: "DE-SVC-CM-ONBOARD-S-OT",
          quantity: 1,
          unitPrice: 1,
          total: 1,
          discountPercent: 99,
        },
      ],
      "comanaged",
      { "prod-020": 600 },
    );

    expect(line.unitPrice).toBe(600);
    expect(line.total).toBe(600);
  });

  it("does not leak another client's override when no override is supplied for this request", () => {
    const [line] = canonicalizeCheckoutLineItems(
      [
        {
          productId: "prod-020",
          sku: "DE-SVC-CM-ONBOARD-S-OT",
          quantity: 1,
          unitPrice: 600,
        },
      ],
      "comanaged",
      {},
    );

    expect(line.unitPrice).toBe(750);
    expect(line.total).toBe(750);
  });
});
