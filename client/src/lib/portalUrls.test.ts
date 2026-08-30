import { describe, expect, it } from "vitest";
import {
  PORTAL_LOGIN,
  portalLoginWithReturn,
  portalMarketplaceLoginUrl,
} from "./portalUrls";
import { PORTAL_MARKETPLACE_PATH } from "@shared/portalReturnTo";

describe("portal marketplace login loop-back", () => {
  it("sends marketplace login through the portal host with returnTo", () => {
    const url = portalMarketplaceLoginUrl();
    expect(url.startsWith(PORTAL_LOGIN)).toBe(true);
    expect(url).not.toContain("//login");
    expect(url).toContain(`returnTo=${encodeURIComponent(PORTAL_MARKETPLACE_PATH)}`);
  });

  it("maps public Store paths to Client Marketplace instead of portal home", () => {
    const url = portalLoginWithReturn("/store");
    expect(url).toContain(`returnTo=${encodeURIComponent(PORTAL_MARKETPLACE_PATH)}`);
    expect(portalLoginWithReturn("https://digeratiexperts.com/store/checkout")).toContain(
      encodeURIComponent(PORTAL_MARKETPLACE_PATH),
    );
  });

  it("keeps generic portal login on dashboard when no return is given", () => {
    expect(portalLoginWithReturn()).toBe(PORTAL_LOGIN);
  });
});
