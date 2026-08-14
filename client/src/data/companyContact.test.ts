import { describe, expect, it } from "vitest";
import { COMPANY, PHONE_REGISTRY, PRIMARY_PHONE } from "./companyContact";

describe("companyContact", () => {
  it("exposes a single primary public phone identity", () => {
    expect(PRIMARY_PHONE.display).toBe("480-519-5892");
    expect(PRIMARY_PHONE.e164).toBe("+14805195892");
    expect(PRIMARY_PHONE.telHref).toBe("tel:480-519-5892");
    expect(PHONE_REGISTRY.primary).toEqual(PRIMARY_PHONE);
  });

  it("keeps legacy alternate numbers non-public by default", () => {
    expect(PHONE_REGISTRY.legacyGbp.publicUse).toBe(false);
    expect(PHONE_REGISTRY.legacyGbp.display).not.toBe(PRIMARY_PHONE.display);
  });

  it("keeps canonical company identity on digeratexperts.com", () => {
    expect(COMPANY.website).toBe("https://digeratiexperts.com");
    expect(COMPANY.addressLocality).toBe("Chandler");
    expect(COMPANY.addressRegion).toBe("AZ");
    expect(COMPANY.mapsUrl).toBe("https://maps.google.com/?cid=1710856351091471339");
  });
});
