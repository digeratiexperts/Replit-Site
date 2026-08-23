import { describe, expect, it } from "vitest";
import { getStoreProductBySku } from "../client/src/data/storeCatalog";
import {
  catalogUnitPrice,
  CSRA_PORTAL_ITEM,
  PORTAL_ORDER_SELECTABLE,
  validatePortalOrderSelection,
} from "./portalOrderCatalog";

const csra = { serviceId: "csra-assessment", quantity: 1 };
const proactiveBusiness = { serviceId: "proactive-business", quantity: 1 };

describe("portal order catalog (Intelligence-Hub rules)", () => {
  it("exposes CSRA plus exactly one selectable line per public ProActive tier", () => {
    expect(PORTAL_ORDER_SELECTABLE.map((item) => item.sku)).toEqual([
      "DE-DIG-ASMT-CSRA-OT",
      "DE-SVC-MGD-IT-MO",
      "DE-SVC-MGD-OFFICE-MO",
      "DE-SVC-MGD-BUSINESS-MO",
      "DE-SVC-MGD-ENTERPRISE-MO",
    ]);
  });

  it("uses the store catalog CSRA price and does not invent a $2,500 total", () => {
    const store = getStoreProductBySku("DE-DIG-ASMT-CSRA-OT");
    expect(store?.basePrice).toBeGreaterThan(0);
    expect(catalogUnitPrice(CSRA_PORTAL_ITEM)).toBe(store?.basePrice);
    expect(catalogUnitPrice(CSRA_PORTAL_ITEM)).not.toBe(2500);
  });

  it("allows a CSRA-only order as a payable catalog line", () => {
    const result = validatePortalOrderSelection([csra]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.lines).toHaveLength(1);
    expect(result.lines[0].sku).toBe("DE-DIG-ASMT-CSRA-OT");
    expect(result.lines[0].hubSku).toBe("OT-ASSESSMENT");
    expect(result.payableCheckout).toBe(true);
    expect(result.oneTimeTotal).toBe(catalogUnitPrice(CSRA_PORTAL_ITEM));
    expect(result.hasQuoteItems).toBe(false);
  });

  it("allows a single ProActive tier, quoted after review", () => {
    const result = validatePortalOrderSelection([proactiveBusiness]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.lines[0].hubSku).toBe("MSP-BUSINESS-USER");
    expect(result.payableCheckout).toBe(false);
    expect(result.oneTimeTotal).toBe(0);
    expect(result.monthlyTotal).toBe(0);
    expect(result.hasQuoteItems).toBe(true);
    expect(result.lines[0].pricedAfterReview).toBe(true);
  });

  it("allows CSRA plus one ProActive tier without treating it as a payable checkout", () => {
    const result = validatePortalOrderSelection([csra, proactiveBusiness]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.lines.map((line) => line.hubSku)).toEqual(["OT-ASSESSMENT", "MSP-BUSINESS-USER"]);
    expect(result.payableCheckout).toBe(false);
    expect(result.oneTimeTotal).toBe(0);
    expect(result.hasQuoteItems).toBe(true);
  });

  it("rejects stacking exclusive ProActive tiers", () => {
    const result = validatePortalOrderSelection([
      { serviceId: "proactive-office", quantity: 1 },
      { serviceId: "proactive-business", quantity: 1 },
    ]);
    expect(result).toMatchObject({ ok: false, code: "exclusive_conflict" });
  });

  it("rejects CSRA stacked with multiple Security ecosystem aliases", () => {
    const result = validatePortalOrderSelection([
      csra,
      { serviceId: "security-stack-office", quantity: 1 },
      { serviceId: "security-stack-enterprise", quantity: 1 },
      { serviceId: "security-stack-business", quantity: 1 },
    ]);
    expect(result).toMatchObject({ ok: false, code: "exclusive_conflict" });
  });

  it("rejects an unknown SKU", () => {
    const result = validatePortalOrderSelection([{ serviceId: "not-a-real-sku", quantity: 1 }]);
    expect(result).toMatchObject({ ok: false, code: "unknown_sku" });
  });

  it("rejects a duplicate SKU even when ids differ", () => {
    const result = validatePortalOrderSelection([
      { serviceId: "proactive-business", quantity: 1 },
      { serviceId: "core-it-business", quantity: 1 },
    ]);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(["duplicate_sku", "exclusive_conflict"]).toContain(result.code);
  });

  it("ignores client-supplied prices", () => {
    const result = validatePortalOrderSelection([
      { serviceId: "csra-assessment", quantity: 1, unitPrice: 1, lineTotal: 2500 } as {
        serviceId: string;
        quantity: number;
        unitPrice: number;
        lineTotal: number;
      },
    ]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.oneTimeTotal).toBe(catalogUnitPrice(CSRA_PORTAL_ITEM));
    expect(result.oneTimeTotal).not.toBe(2500);
  });
});
