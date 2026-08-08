import { describe, expect, it } from "vitest";
import {
  canAccessApprovals,
  canInitiateChat,
  canManageOrg,
  needsSkipLevel,
  resolveOrgRole,
  SKIP_LEVEL_AMOUNT_CENTS,
  type OrgUserFields,
} from "./portalOrg";

function user(partial: Partial<OrgUserFields>): OrgUserFields {
  return {
    id: "u1",
    email: "a@example.com",
    fullName: "A",
    role: "user",
    orgRole: "staff",
    clientId: "c1",
    ...partial,
  };
}

describe("portalOrg RBAC", () => {
  it("staff cannot chat or manage org", () => {
    const staff = user({ orgRole: "staff" });
    expect(canInitiateChat(staff)).toBe(false);
    expect(canManageOrg(staff)).toBe(false);
    expect(canAccessApprovals(staff)).toBe(false);
    expect(resolveOrgRole(staff)).toBe("staff");
  });

  it("manager can approve but not chat", () => {
    const manager = user({ orgRole: "manager" });
    expect(canAccessApprovals(manager)).toBe(true);
    expect(canInitiateChat(manager)).toBe(false);
  });

  it("company IT contact can chat and manage org", () => {
    const it = user({ orgRole: "company_it_contact", isCompanyItContact: true });
    expect(canInitiateChat(it)).toBe(true);
    expect(canManageOrg(it)).toBe(true);
    expect(canAccessApprovals(it)).toBe(true);
  });

  it("DE admin bypasses org gates", () => {
    const admin = user({ role: "admin", orgRole: "staff" });
    expect(canInitiateChat(admin)).toBe(true);
    expect(canManageOrg(admin)).toBe(true);
    expect(resolveOrgRole(admin)).toBe("company_it_contact");
  });

  it("skip-level triggers on high priority or amount threshold", () => {
    expect(needsSkipLevel("low", 100)).toBe(false);
    expect(needsSkipLevel("high", 100)).toBe(true);
    expect(needsSkipLevel("medium", SKIP_LEVEL_AMOUNT_CENTS)).toBe(true);
  });
});
