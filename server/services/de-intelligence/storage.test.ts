import { beforeEach, describe, expect, it } from "vitest";
import {
  _resetIntelligenceMemoryForTests,
  chunkKnowledgeText,
  searchStoredKnowledge,
  storeKnowledgeDocument,
} from "./storage";

beforeEach(() => {
  _resetIntelligenceMemoryForTests();
});

describe("DE Intelligence storage ingestion", () => {
  it("chunks long documents with bounded overlap", () => {
    const text = [
      "Paragraph one. ".repeat(80),
      "Paragraph two. ".repeat(80),
      "Paragraph three. ".repeat(80),
    ].join("\n\n");
    const chunks = chunkKnowledgeText(text, 600, 80);
    expect(chunks.length).toBeGreaterThan(2);
    expect(chunks.every((chunk) => chunk.length <= 700)).toBe(true);
    expect(chunks.every(Boolean)).toBe(true);
  });

  it("requires a tenant for client-scoped knowledge", async () => {
    await expect(storeKnowledgeDocument({
      title: "Client firewall notes",
      content: "Firewall is managed by DE.",
      scope: "client",
      type: "client_documentation",
      authority: 90,
      source: { kind: "document", label: "Client notes" },
    })).rejects.toThrow(/clientId is required/i);
  });

  it("never returns a client document to public retrieval", async () => {
    await storeKnowledgeDocument({
      title: "Acme network topology",
      content: "Acme uses VLAN 20 for voice and VLAN 30 for managed workstations.",
      scope: "client",
      clientId: "acme",
      type: "network_topology",
      authority: 95,
      tags: ["vlan", "network", "topology"],
      source: { kind: "document", label: "Acme approved topology" },
      reviewState: "approved",
      reviewer: "DE",
    });

    const publicHits = await searchStoredKnowledge({
      query: "VLAN 20 voice",
      scope: "public",
    });
    expect(publicHits.some((hit) => hit.clientId === "acme")).toBe(false);

    const otherClientHits = await searchStoredKnowledge({
      query: "VLAN 20 voice",
      scope: "client",
      clientId: "other-client",
    });
    expect(otherClientHits.some((hit) => hit.clientId === "acme")).toBe(false);

    const acmeHits = await searchStoredKnowledge({
      query: "VLAN 20 voice",
      scope: "client",
      clientId: "acme",
    });
    expect(acmeHits.some((hit) => hit.clientId === "acme")).toBe(true);
  });

  it("preserves provenance on an ingested public document", async () => {
    const stored = await storeKnowledgeDocument({
      title: "DE password reset guide",
      content: "Verify user identity before any privileged password reset. Use the approved support path for account-specific changes.",
      scope: "public",
      type: "troubleshooting_guide",
      authority: 96,
      tags: ["password", "identity", "reset"],
      source: { kind: "procedure", label: "DE Password Reset Guidance" },
      reviewState: "approved",
      reviewer: "DE",
      confidence: 1,
    });

    const hits = await searchStoredKnowledge({
      query: "password reset identity",
      scope: "public",
    });
    const hit = hits.find((record) => record.sourceDocumentId === stored.documentId);
    expect(hit).toBeTruthy();
    expect(hit?.source.label).toBe("DE Password Reset Guidance");
    expect(hit?.reviewedBy).toBe("DE");
    expect(hit?.confidence).toBe(1);
  });
});
