import { describe, expect, it } from "vitest";
import { resolveLivePortalAuthorization } from "./portalLiveAuthorization";

describe("resolveLivePortalAuthorization", () => {
  it("rejects a deleted/missing live user even when a JWT could still be valid", () => {
    expect(resolveLivePortalAuthorization(null)).toEqual({
      ok: false,
      status: 401,
      error: "User account no longer exists",
    });
  });

  it.each([
    { isActive: false },
    { disabled: true },
    { status: "disabled" },
    { status: "inactive" },
    { status: "deleted" },
    { status: "suspended" },
  ])("rejects inactive live users: %o", (user) => {
    expect(resolveLivePortalAuthorization({ role: "admin", storeRole: "admin", ...user })).toMatchObject({
      ok: false,
      status: 403,
    });
  });

  it("uses the current live role and storeRole, enabling immediate privilege downgrade", () => {
    expect(resolveLivePortalAuthorization({
      role: "user",
      storeRole: "prospect",
      isActive: true,
    })).toEqual({
      ok: true,
      role: "user",
      storeRole: "prospect",
    });
  });

  it("fails closed to least privilege when live authorization fields are absent", () => {
    expect(resolveLivePortalAuthorization({ isActive: true })).toEqual({
      ok: true,
      role: "user",
      storeRole: "public",
    });
  });
});
