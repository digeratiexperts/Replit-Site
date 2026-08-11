import { describe, expect, it } from "vitest";
import {
  BANNED_AWARENESS_SUBSTRINGS,
  HOMEPAGE_FACT_IDS,
  cyberAwarenessFacts,
  formatFactSource,
  getCyberFact,
  getHomepageCyberFacts,
} from "./cyberAwarenessFacts";

describe("cyberAwarenessFacts", () => {
  it("requires source and year on every fact", () => {
    expect(cyberAwarenessFacts.length).toBeGreaterThanOrEqual(4);
    for (const fact of cyberAwarenessFacts) {
      expect(fact.id.length).toBeGreaterThan(0);
      expect(fact.metric.length).toBeGreaterThan(0);
      expect(fact.statement.length).toBeGreaterThan(0);
      expect(fact.source.length).toBeGreaterThan(0);
      expect(fact.year).toBeGreaterThanOrEqual(2024);
      expect(["arizona", "national", "global"]).toContain(fact.scope);
      expect(formatFactSource(fact)).toMatch(new RegExp(String(fact.year)));
    }
  });

  it("includes Arizona and national/global scopes", () => {
    const scopes = new Set(cyberAwarenessFacts.map((f) => f.scope));
    expect(scopes.has("arizona")).toBe(true);
    expect(scopes.has("national") || scopes.has("global")).toBe(true);
  });

  it("keeps homepage set small and resolvable", () => {
    expect(HOMEPAGE_FACT_IDS.length).toBeLessThanOrEqual(4);
    const homepage = getHomepageCyberFacts();
    expect(homepage).toHaveLength(HOMEPAGE_FACT_IDS.length);
    expect(homepage.some((f) => f.scope === "arizona")).toBe(true);
  });

  it("rejects the banned small-business closure claim in fact payloads", () => {
    const corpus = cyberAwarenessFacts
      .flatMap((f) => [f.id, f.metric, f.statement, f.source, f.sourceUrl ?? ""])
      .join("\n")
      .toLowerCase();
    for (const banned of BANNED_AWARENESS_SUBSTRINGS) {
      expect(corpus).not.toContain(banned.toLowerCase());
    }
  });

  it("resolves known ids", () => {
    expect(getCyberFact("dbir-ransomware-2026").metric).toBe("48%");
    expect(getCyberFact("ibm-us-breach-cost-2026").year).toBe(2026);
  });
});
