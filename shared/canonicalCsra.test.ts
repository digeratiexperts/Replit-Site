import { describe, expect, it } from "vitest";
import { getStoreProductBySku } from "../client/src/data/storeCatalog";
import { serviceCatalog } from "../client/src/data/serviceCatalog";
import {
  CANONICAL_CSRA_HUB_SKU,
  CANONICAL_CSRA_ONE_TIME,
  CANONICAL_CSRA_STORE_SKU,
  LEGACY_CSRA_ONE_TIME,
} from "./canonicalCsra";
import { catalogUnitPrice, CSRA_PORTAL_ITEM, validatePortalOrderSelection } from "./portalOrderCatalog";

describe("canonical CSRA price", () => {
  it("is $2,500 one-time on the store SKU, portal catalog, and service catalog", () => {
    const store = getStoreProductBySku(CANONICAL_CSRA_STORE_SKU);
    expect(store?.basePrice).toBe(CANONICAL_CSRA_ONE_TIME);
    expect(store?.basePrice).not.toBe(LEGACY_CSRA_ONE_TIME);
    expect(catalogUnitPrice(CSRA_PORTAL_ITEM)).toBe(CANONICAL_CSRA_ONE_TIME);
    expect(CSRA_PORTAL_ITEM.hubSku).toBe(CANONICAL_CSRA_HUB_SKU);

    const csra = serviceCatalog
      .flatMap((category) => category.services)
      .find((service) => service.id === "csra-assessment");
    expect(csra?.basePrice).toBe(CANONICAL_CSRA_ONE_TIME);
  });

  it("does not keep $999 as an independently purchasable CSRA price", () => {
    const store = getStoreProductBySku(CANONICAL_CSRA_STORE_SKU);
    expect(store).toBeTruthy();
    expect(store?.isCheckoutEnabled).toBe(true);
    expect(store?.basePrice).toBe(2500);
    expect([store?.basePrice, catalogUnitPrice(CSRA_PORTAL_ITEM)]).not.toContain(999);
  });

  it("still rejects stacked ProActive packages beside CSRA", () => {
    const result = validatePortalOrderSelection([
      { serviceId: "csra-assessment", quantity: 1 },
      { serviceId: "proactive-it", quantity: 1 },
      { serviceId: "proactive-business", quantity: 1 },
    ]);
    expect(result).toMatchObject({ ok: false, code: "exclusive_conflict" });
  });
});
