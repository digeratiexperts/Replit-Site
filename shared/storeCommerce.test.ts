import { describe, expect, it } from "vitest";
import { computeSolutionSnapshot, money, pricingBucket } from "./storeCommerce";
import { storeProducts } from "../client/src/data/storeProducts";

const catalog = storeProducts.map((product) => ({
  id: product.id,
  sku: product.sku,
  name: product.name,
  basePrice: product.basePrice,
  pricingType: product.pricingType,
  pricingUnit: product.pricingUnit,
  minimumQuantity: product.minimumQuantity,
  isCheckoutEnabled: product.isCheckoutEnabled,
  isContractOnly: product.isContractOnly,
}));

describe("computeSolutionSnapshot", () => {
  it("recalculates from catalog list prices and ignores client-supplied amounts", () => {
    const endpoint = storeProducts.find((product) => product.id === "prod-010");
    expect(endpoint).toBeTruthy();
    const snapshot = computeSolutionSnapshot(
      [{ productId: "prod-010", sku: "DE-SVC-CM-ENDPOINT-CORE-MO", quantity: 10 }],
      catalog,
    );
    expect(snapshot.lines).toHaveLength(1);
    expect(snapshot.lines[0].unitPrice).toBe(endpoint!.basePrice);
    expect(snapshot.totals.monthly).toBe(money(endpoint!.basePrice * 10));
    expect(snapshot.totals.dueToday).toBe(0);
  });

  it("splits one-time work into Due Today and yearly into Annual", () => {
    const oneTime = storeProducts.find(
      (product) => product.pricingType === "one_time" && product.isCheckoutEnabled && !product.isContractOnly,
    );
    const yearly = storeProducts.find(
      (product) => product.pricingType === "yearly" && product.isCheckoutEnabled && !product.isContractOnly,
    );
    expect(oneTime && yearly).toBeTruthy();
    const snapshot = computeSolutionSnapshot(
      [
        { productId: oneTime!.id, sku: oneTime!.sku, quantity: 1 },
        { productId: yearly!.id, sku: yearly!.sku, quantity: 2 },
      ],
      catalog,
    );
    expect(snapshot.totals.dueToday).toBe(money(oneTime!.basePrice));
    expect(snapshot.totals.annual).toBe(money(yearly!.basePrice * 2));
    expect(pricingBucket("yearly")).toBe("annual");
  });

  it("drops contract-only and unknown SKUs instead of inventing prices", () => {
    const snapshot = computeSolutionSnapshot(
      [
        { productId: "prod-001", quantity: 1 },
        { productId: "not-a-real-product", quantity: 4 },
      ],
      catalog,
    );
    expect(snapshot.lines).toHaveLength(0);
    expect(snapshot.totals.itemCount).toBe(0);
  });

  it("enforces minimum quantity and merges duplicate lines", () => {
    const product = storeProducts.find((entry) => entry.id === "prod-010")!;
    const snapshot = computeSolutionSnapshot(
      [
        { productId: product.id, sku: product.sku, quantity: 0 },
        { productId: product.id, sku: product.sku, quantity: 3 },
      ],
      catalog,
    );
    expect(snapshot.lines[0].quantity).toBe(3);
  });
});
