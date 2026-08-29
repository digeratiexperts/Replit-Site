import { describe, expect, it } from "vitest";
import { classifyLegacyStorePath, toWarehousePath } from "./storeLegacyRedirects";

describe("legacy /store destage", () => {
  it("sends public workshop URLs to Door 1 or Door 2", () => {
    expect(classifyLegacyStorePath("/store")).toEqual({
      kind: "public_redirect",
      to: "/solutions/business-needs",
    });
    expect(classifyLegacyStorePath("/store/managed")).toEqual({
      kind: "public_redirect",
      to: "/solutions/proactive-ecosystem",
    });
    expect(classifyLegacyStorePath("/store/co-managed")).toEqual({
      kind: "public_redirect",
      to: "/solutions/business-needs",
    });
    expect(classifyLegacyStorePath("/store/product/DE-SVC-MGD-IT-MO")).toEqual({
      kind: "public_redirect",
      to: "/solutions/proactive-it-ecosystem",
    });
  });

  it("does not reveal staff-only SKU destinations", () => {
    expect(classifyLegacyStorePath("/store/product/DE-SVC-CM-ENDPOINT-EDR-MO")).toEqual({
      kind: "generic_deny",
    });
    expect(classifyLegacyStorePath("/store/product/unknown-sku")).toEqual({
      kind: "generic_deny",
    });
  });

  it("maps authorized bookmarks into the warehouse", () => {
    expect(toWarehousePath("/store")).toBe("/internal/warehouse");
    expect(toWarehousePath("/store/product/DE-SVC-MGD-IT-MO")).toBe(
      "/internal/warehouse/product/DE-SVC-MGD-IT-MO",
    );
  });
});
