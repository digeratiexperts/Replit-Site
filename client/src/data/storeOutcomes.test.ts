import { describe, expect, it } from "vitest";
import {
  complianceReadinessTracks,
  resolveStoreOutcomeId,
  storeOutcomes,
} from "./storeMerchandising";

describe("store outcome taxonomy", () => {
  it("locks Protect · Recover · Communicate · Operate · Compliance in that order", () => {
    expect(storeOutcomes.map((outcome) => outcome.label)).toEqual([
      "Protect",
      "Recover",
      "Communicate",
      "Operate",
      "Compliance",
    ]);
  });

  it("does not expose Comply or retired public outcome names", () => {
    const labels = storeOutcomes.map((outcome) => outcome.label);
    expect(labels).not.toContain("Comply");
    expect(labels).not.toContain("Modernize");
    expect(labels).not.toContain("Outsource");
    expect(labels).not.toContain("Support IT Team");
    expect(labels).not.toContain("Secure Remote");
  });

  it("aliases retired URL ids without inventing a second public set", () => {
    expect(resolveStoreOutcomeId("modernize")).toBe("communicate");
    expect(resolveStoreOutcomeId("support_it")).toBe("operate");
    expect(resolveStoreOutcomeId("outsource")).toBe("operate");
    expect(resolveStoreOutcomeId("secure_remote")).toBe("operate");
    expect(resolveStoreOutcomeId("compliance")).toBe("compliance");
    expect(resolveStoreOutcomeId("unknown")).toBeNull();
  });

  it("reserves Compliance children as readiness tracks, not certification claims", () => {
    expect(complianceReadinessTracks.map((track) => track.label)).toEqual([
      "HIPAA Readiness",
      "PCI DSS Readiness",
      "SOC 2 Readiness",
      "Cyber Insurance Readiness",
    ]);
    expect(storeOutcomes.some((outcome) => /HIPAA compliant|PCI certified|SOC 2 compliant/i.test(outcome.blurb))).toBe(
      false,
    );
  });
});
