import { describe, expect, it } from "vitest";
import { curatedSolutionFamilies } from "./curatedSolutions";

const expectedSubjects = [
  "it_operations",
  "endpoint_devices",
  "identity_access",
  "email_collaboration",
  "cybersecurity_operations",
  "network_connectivity",
  "backup_continuity",
  "compliance_risk",
  "security_awareness",
  "business_communications",
  "hardware_lifecycle",
  "documentation_standards",
  "technology_strategy",
] as const;

const privateStackTerms = [
  "coro",
  "guardz",
  "ninjaone",
  "blackpoint",
  "mimecast",
  "jumpcloud",
  "augmentt",
  "ninjio",
  "telivy",
  "seedpod",
  "opti9",
  "hudu",
  "pax8",
  "sherweb",
  "ingram",
  "griffin",
  "d&h",
  "qualys",
  "wazuh",
  "atakama",
  "cytracom",
];

describe("curated DE solution families", () => {
  it("covers every approved subject with standalone and co-managed offers", () => {
    expect(curatedSolutionFamilies.map((family) => family.id)).toEqual(expectedSubjects);

    for (const family of curatedSolutionFamilies) {
      expect(family.offers.map((offer) => offer.deliveryModel).sort()).toEqual([
        "co_managed",
        "standalone",
      ]);
      for (const offer of family.offers) {
        expect(offer.name).toMatch(/^DE /);
        expect(offer.audience.length).toBeGreaterThan(20);
        expect(offer.outcomes.length).toBeGreaterThanOrEqual(2);
        expect(offer.includes.length).toBeGreaterThanOrEqual(3);
        expect(offer.prerequisites.length).toBeGreaterThanOrEqual(1);
        expect(offer.boundaries.length).toBeGreaterThanOrEqual(1);
        expect(offer.serviceLevel.length).toBeGreaterThan(10);
        expect(offer.nextStep).toBe("Assessment and scope approval");
      }
    }
  });

  it("keeps implementation vendors, distributors, SKUs, and margins out of public package data", () => {
    const publicCopy = JSON.stringify(curatedSolutionFamilies).toLowerCase();

    for (const term of privateStackTerms) {
      expect(publicCopy).not.toContain(term);
    }
    expect(publicCopy).not.toContain("sku");
    expect(publicCopy).not.toContain("margin");
    expect(publicCopy).not.toContain("distributor");
    expect(publicCopy).not.toContain("wholesale");
  });

  it("uses unique stable offer identifiers", () => {
    const ids = curatedSolutionFamilies.flatMap((family) =>
      family.offers.map((offer) => offer.id),
    );
    expect(new Set(ids).size).toBe(ids.length);
  });
});
