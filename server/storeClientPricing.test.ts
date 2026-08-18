import { describe, expect, it } from "vitest";
import {
  listDemoClientPricing,
  resolveUnitPrice,
  toPriceOverrides,
} from "./storeClientPricing";

describe("store client pricing", () => {
  it("applies only a verified discount below catalog list price", () => {
    expect(resolveUnitPrice(39, 30)).toBe(30);
    expect(resolveUnitPrice(39, 39)).toBe(39);
    expect(resolveUnitPrice(39, 40)).toBe(39);
    expect(resolveUnitPrice(39, 0)).toBe(39);
    expect(resolveUnitPrice(39, undefined)).toBe(39);
  });

  it("maps demo rows to product overrides without trusting missing prices", () => {
    const overrides = toPriceOverrides(listDemoClientPricing("client-1"));
    expect(overrides["prod-010"]).toBe(35);
    expect(overrides["missing"]).toBeUndefined();
  });
});
