import { beforeEach, describe, expect, it } from "vitest";
import {
  classifyHubKnowledgeType,
  extractHubDocumentText,
  ingestTechSalesCompanyKnowledge,
} from "./techSalesIngestion";
import {
  _resetIntelligenceMemoryForTests,
  searchStoredKnowledge,
} from "./storage";

beforeEach(() => {
  _resetIntelligenceMemoryForTests();
});

describe("TechSales DE Intelligence ingestion", () => {
  it("extracts only explicit document text", () => {
    expect(extractHubDocumentText({ fileName: "secret.pdf", url: "https://example.test/secret.pdf" })).toBeNull();
    expect(extractHubDocumentText({
      plainText: "This is explicit extracted document text long enough to be a governed knowledge artifact.",
    })).toContain("explicit extracted document text");
  });

  it("classifies common client document families", () => {
    expect(classifyHubKnowledgeType({ title: "Microsoft 365 Intune onboarding" }, "library"))
      .toBe("microsoft_365_documentation");
    expect(classifyHubKnowledgeType({ title: "Branch network topology diagram" }, "library"))
      .toBe("network_topology");
    expect(classifyHubKnowledgeType({ title: "Support SOP" }, "library"))
      .toBe("sop");
    expect(classifyHubKnowledgeType({ title: "Master Services Agreement" }, "contract"))
      .toBe("contract_policy");
  });

  it("ingests approved portal text into only the authoritative client tenant", async () => {
    const result = await ingestTechSalesCompanyKnowledge({
      clientId: "client-alpha",
      hub: {
        accountId: "hub-alpha",
        contracts: [],
        matchedDeals: [],
        library: [{
          id: "doc-1",
          title: "Microsoft 365 Intune onboarding",
          status: "published",
          plainText: "Alpha tenant uses the unique phrase alpha-intune-enrollment for its approved Microsoft 365 device onboarding procedure.",
        }],
      } as any,
    });

    expect(result.ingested).toBe(1);
    expect(result.failed).toBe(0);

    const alphaHits = await searchStoredKnowledge({
      query: "alpha intune enrollment",
      scope: "client",
      clientId: "client-alpha",
    });
    expect(alphaHits.some((hit) => hit.clientId === "client-alpha")).toBe(true);
    expect(alphaHits.some((hit) => hit.type === "microsoft_365_documentation")).toBe(true);

    const betaHits = await searchStoredKnowledge({
      query: "alpha intune enrollment",
      scope: "client",
      clientId: "client-beta",
    });
    expect(betaHits.some((hit) => hit.clientId === "client-alpha")).toBe(false);

    const publicHits = await searchStoredKnowledge({
      query: "alpha intune enrollment",
      scope: "public",
    });
    expect(publicHits.some((hit) => hit.clientId === "client-alpha")).toBe(false);
  });

  it("stores but never retrieves an unsigned contract as policy", async () => {
    const result = await ingestTechSalesCompanyKnowledge({
      clientId: "client-draft",
      hub: {
        accountId: "hub-draft",
        library: [],
        matchedDeals: [],
        contracts: [{
          signatureId: 77,
          title: "Draft Service Agreement",
          status: "draft",
          extractedText: "Draft agreement unique phrase draft-contract-policy-sentinel must not become authoritative model policy before approval.",
        }],
      } as any,
    });

    expect(result.ingested).toBe(0);
    expect(result.skippedUnapproved).toBe(1);

    const hits = await searchStoredKnowledge({
      query: "draft contract policy sentinel",
      scope: "client",
      clientId: "client-draft",
    });
    expect(hits.some((hit) => hit.content.includes("draft-contract-policy-sentinel"))).toBe(false);
  });
});
