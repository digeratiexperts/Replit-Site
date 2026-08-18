import { describe, expect, it } from "vitest";
import { formatPrice, storeProducts } from "./storeProducts";

function bySku(sku: string) {
  const product = storeProducts.find((item) => item.sku === sku);
  if (!product) throw new Error(`Missing SKU ${sku}`);
  return product;
}

describe("formatPrice", () => {
  it("owns the UCaaS per-user string without a trailing per-unit label", () => {
    expect(formatPrice(bySku("DE-SVC-UC-SEAT-STD-MO"))).toBe("$24.95 / user / month");
  });

  it("owns the hourly engineering string", () => {
    expect(formatPrice(bySku("DE-SVC-NET-ENG-HR"))).toBe("$175.00 / hour");
  });

  it("owns one-time hardware without a unit suffix", () => {
    expect(formatPrice(bySku("DE-HW-INFRA-UPS-1500-OT"))).toBe("$349.00");
  });

  it("keeps zero-price contract SKUs as a quote", () => {
    expect(formatPrice(bySku("DE-SVC-MGD-WORKPLACE-MO"))).toBe("Contact for Quote");
  });

  it("never emits concatenated unit bugs", () => {
    for (const product of storeProducts) {
      const listed = formatPrice(product);
      expect(listed).not.toMatch(/moper|hrper|userper|monthper/i);
    }
  });
});
