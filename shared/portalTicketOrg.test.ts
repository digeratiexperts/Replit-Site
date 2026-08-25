import { describe, expect, it } from "vitest";
import { INTERNAL_COMPANY_NAME, isInternalPortalOrg, ticketCompanyName } from "./portalTicketOrg";

describe("ticketCompanyName", () => {
  it("does not throw when client is undefined", () => {
    expect(() => ticketCompanyName(undefined)).not.toThrow();
    expect(ticketCompanyName(undefined)).toBe("");
    expect(ticketCompanyName(undefined, INTERNAL_COMPANY_NAME)).toBe(INTERNAL_COMPANY_NAME);
  });

  it("does not throw when client exists but companyName is missing", () => {
    expect(ticketCompanyName({})).toBe("");
    expect(ticketCompanyName({ companyName: null })).toBe("");
    expect(ticketCompanyName({ companyName: "  Acme  " })).toBe("Acme");
  });
});

describe("isInternalPortalOrg", () => {
  it("treats the Digerati Experts MSP org as internal", () => {
    expect(isInternalPortalOrg({ id: "msp-digerati", companyName: "Digerati Experts" })).toBe(true);
    expect(isInternalPortalOrg({ id: "client-1", type: "msp" })).toBe(true);
    expect(isInternalPortalOrg({ id: "x", companyName: "Digerati Experts (Internal)" })).toBe(true);
  });

  it("does not treat a regular client as internal", () => {
    expect(isInternalPortalOrg({ id: "client-1", companyName: "Acme Corp" })).toBe(false);
    expect(isInternalPortalOrg(undefined, "client-1")).toBe(false);
  });
});
