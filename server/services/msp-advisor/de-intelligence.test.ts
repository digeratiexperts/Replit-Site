import assert from "node:assert/strict";
import test from "node:test";
import { retrieveKnowledge, retrievePublicKnowledge } from "../de-intelligence/retrieve";
import type { KnowledgeRecord } from "../de-intelligence/types";

const fixture: KnowledgeRecord[] = [
  {
    id: "public-low",
    title: "General endpoint note",
    summary: "General endpoint note",
    content: "A generic endpoint note.",
    scope: "public",
    type: "kb_article",
    status: "active",
    authority: 50,
    tags: ["endpoint"],
    modes: ["it_support"],
    source: { kind: "document", label: "Generic KB" },
  },
  {
    id: "public-high",
    title: "Current endpoint policy",
    summary: "Current endpoint policy",
    content: "The current governed endpoint policy.",
    scope: "public",
    type: "contract_policy",
    status: "active",
    authority: 100,
    tags: ["endpoint"],
    modes: ["it_support"],
    source: { kind: "policy", label: "Current Policy" },
  },
  {
    id: "internal-secret",
    title: "Internal only",
    summary: "Internal only",
    content: "This record must never reach public DE Desk retrieval.",
    scope: "internal",
    type: "internal_procedure",
    status: "active",
    authority: 100,
    tags: ["endpoint"],
    modes: ["it_support"],
    source: { kind: "canonical", label: "Internal" },
  },
  {
    id: "client-a",
    title: "Client A endpoint contract",
    summary: "Client-specific endpoint contract",
    content: "Client A has a special endpoint rule.",
    scope: "client",
    clientId: "client-a",
    type: "contract_policy",
    status: "active",
    authority: 100,
    tags: ["endpoint"],
    modes: ["it_support"],
    source: { kind: "policy", label: "Client A Contract" },
  },
];

test("public retrieval cannot leak internal or client records", () => {
  const hits = retrieveKnowledge(
    { query: "endpoint", scope: "public", mode: "it_support", limit: 10 },
    fixture,
  );
  assert.deepEqual(hits.map((hit) => hit.record.id), ["public-high", "public-low"]);
});

test("client retrieval includes only the matching client's private record", () => {
  const hits = retrieveKnowledge(
    { query: "endpoint", scope: "client", clientId: "client-a", mode: "it_support", limit: 10 },
    fixture,
  );
  const ids = hits.map((hit) => hit.record.id);
  assert.ok(ids.includes("client-a"));
  assert.ok(ids.includes("public-high"));
  assert.ok(!ids.includes("internal-secret"));
});

test("authority breaks otherwise equivalent source ties", () => {
  const hits = retrieveKnowledge(
    { query: "endpoint", scope: "public", mode: "it_support", limit: 10 },
    fixture,
  );
  assert.equal(hits[0]?.record.id, "public-high");
});

test("production public catalog retrieves governed device policy", () => {
  const hits = retrievePublicKnowledge({
    query: "BYOD device endpoint coverage",
    mode: "it_support",
    limit: 6,
  });
  assert.equal(hits[0]?.record.id, "de-policy-device-coverage-v1");
  assert.ok(hits.every((hit) => hit.record.scope === "public"));
});

test("security incident mode prioritizes incident knowledge", () => {
  const hits = retrievePublicKnowledge({
    query: "ransomware compromised computer",
    mode: "security_incident",
    pageType: "cybersecurity",
    limit: 3,
  });
  assert.equal(hits[0]?.record.id, "de-policy-security-incident-v1");
});
