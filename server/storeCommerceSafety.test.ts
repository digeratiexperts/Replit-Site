import { afterEach, describe, expect, it } from "vitest";
import { storeProducts } from "../client/src/data/storeProducts";
import {
  canonicalizeCheckoutLineItems,
  isRecurringSubscriptionProduct,
  recurringCheckoutSkus,
} from "./secureStoreCheckout";
import {
  isDemoClientPricingAllowed,
  listDemoClientPricing,
  upsertDemoClientPricing,
} from "./storeClientPricing";

const originalNodeEnv = process.env.NODE_ENV;

afterEach(() => {
  if (originalNodeEnv === undefined) delete process.env.NODE_ENV;
  else process.env.NODE_ENV = originalNodeEnv;
});

describe("Store commerce safety", () => {
  it("rebuilds checkout pricing from the server catalog", () => {
    const [line] = canonicalizeCheckoutLineItems(
      [
        {
          productId: "prod-020",
          sku: "DE-SVC-CM-ONBOARD-S-OT",
          quantity: 1,
          unitPrice: 0.01,
          total: 0.01,
        },
      ],
      "comanaged",
    );

    expect(line.unitPrice).toBe(750);
    expect(line.total).toBe(750);
  });

  it("enforces catalog minimum quantities", () => {
    expect(() =>
      canonicalizeCheckoutLineItems(
        [
          {
            productId: "prod-036",
            sku: "DE-SVC-NET-ONSITE-HR",
            quantity: 1,
          },
        ],
        "comanaged",
      ),
    ).toThrow(/Invalid quantity/);
  });

  it("identifies recurring catalog families before one-time payment", () => {
    const recurringProduct = storeProducts.find((product) => product.id === "prod-010");
    const oneTimeProduct = storeProducts.find((product) => product.id === "prod-020");

    expect(recurringProduct).toBeDefined();
    expect(oneTimeProduct).toBeDefined();
    expect(isRecurringSubscriptionProduct(recurringProduct!)).toBe(true);
    expect(isRecurringSubscriptionProduct(oneTimeProduct!)).toBe(false);

    const recurringLines = canonicalizeCheckoutLineItems(
      [
        {
          productId: "prod-010",
          sku: "DE-SVC-CM-ENDPOINT-CORE-MO",
          quantity: 2,
        },
      ],
      "comanaged",
    );
    expect(recurringCheckoutSkus(recurringLines)).toEqual(["DE-SVC-CM-ENDPOINT-CORE-MO"]);

    const oneTimeLines = canonicalizeCheckoutLineItems(
      [
        {
          productId: "prod-020",
          sku: "DE-SVC-CM-ONBOARD-S-OT",
          quantity: 1,
        },
      ],
      "comanaged",
    );
    expect(recurringCheckoutSkus(oneTimeLines)).toEqual([]);
  });

  it("never exposes demo client pricing in production", () => {
    process.env.NODE_ENV = "production";

    expect(isDemoClientPricingAllowed()).toBe(false);
    expect(listDemoClientPricing("client-1")).toEqual([]);
    expect(() =>
      upsertDemoClientPricing("client-1", {
        productId: "prod-020",
        customPrice: 1,
        discountPercent: 99,
      }),
    ).toThrow(/disabled in production/);
  });
});
