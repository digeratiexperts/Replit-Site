# DE Intelligence Layer

The DE Intelligence Layer is the governed knowledge foundation for DE Desk, the Client Portal, internal technician copilots, TechSales, and future automation agents.

## Goal

DE-specific answers must come from DE knowledge, not generic model memory. The model is a reasoning component; DE owns the knowledge model, retrieval policy, source authority, tenancy boundaries, and review process.

## Knowledge classes

The ingestion contract supports:

1. Client documentation
2. SOPs
3. KB articles
4. Microsoft 365 documentation
5. Network diagrams / topology
6. Product documentation
7. Internal procedures
8. Previous ticket resolutions
9. Client-specific information
10. Contracts and policies
11. PDFs / Word / general documents
12. Troubleshooting guides

## Scope and tenancy

Every record has an explicit scope:

- `public` — safe for public DE Desk.
- `internal` — DE staff only.
- `client` — only for the matching authenticated client tenant.

Public retrieval is fail-closed: public DE Desk can never receive internal or client records. Client retrieval may include public knowledge plus records matching the authenticated client ID. It does not automatically inherit DE-internal records.

## Authority and conflict resolution

Knowledge records carry an authority score from 0–100 and effective/review dates.

General precedence:

1. Current client contract / client-specific policy
2. Current DE policy
3. Current client documentation and approved DE SOP
4. Verified KB / troubleshooting guidance
5. Current vendor documentation for vendor behavior
6. Historical ticket resolutions

Vendor documentation cannot override a client's contract or DE service scope. Historical tickets are evidence, not policy. If relevant sources still conflict after scope, authority, and date are considered, the assistant must not guess; it should state that the record needs verification and route for review.

## Retrieval

The production bootstrap retriever is deterministic and dependency-free. It combines:

- hard scope filtering
- active-status filtering
- authority weighting
- lexical token overlap
- phrase/tag matching
- classified conversation mode
- page context
- client match weighting when client-scoped retrieval is used

This bootstrap can safely run before vector infrastructure is available. The next storage-backed phase will preserve the same retrieval contract while adding PostgreSQL full-text search, embeddings/pgvector, document chunks, freshness, reranking, and source citations.

## Public DE Desk

The current public DE Desk keeps its existing:

- conversation/session memory
- profile memory
- mode classification
- prompt-injection defenses
- safety fallbacks
- human takeover and handoff
- persisted conversation history
- canonical pricing/service data

The Intelligence Layer adds governed DE records to the `AUTHORITATIVE DE KNOWLEDGE` supplied to the model. Public DE Desk must not invent client-specific configuration, licensing, entitlement, topology, contract terms, or live system state.

## Source metadata

The canonical record contract includes:

- record ID
- title / summary / content
- scope
- type
- status
- authority
- effective date
- review date
- client ID when client-scoped
- vendor / product / service when relevant
- tags
- applicable modes / page types
- source kind / label / URL when available

Future storage-backed records should additionally capture source document ID, chunk location, ingestion time, supersession relationship, confidence, and verifier/reviewer.

## Knowledge curation loop

DE should routinely turn real work into reviewed reusable knowledge.

Candidate updates should be generated from:

- resolved tickets
- repeated incidents
- new or changed SOPs
- client documentation changes
- network changes
- product/vendor documentation changes
- Microsoft 365 guidance changes
- contracts and policy amendments
- chatbot corrections
- unanswered questions / low-confidence answers

A candidate does **not** silently become canonical. It should include source, scope, authority, effective date, confidence, conflict/supersession information, and then be reviewed/approved.

## Ticket-resolution normalization

Raw tickets should not simply be dumped into the highest-authority corpus. Reusable resolutions should be normalized into fields such as:

- problem
- environment
- symptoms
- root cause
- resolution
- verification
- client-specific vs reusable
- confidence
- source ticket

Verified reusable guidance may be promoted to KB/troubleshooting knowledge after review.

## Network diagrams

Network diagrams need both the original artifact and extracted structured topology. The target representation should capture sites, WAN links, firewalls, VLANs/subnets, switches, ports, access points, servers, printers, VPNs, and relationships. The diagram remains source evidence; extracted topology becomes queryable client-scoped knowledge.

## Evaluation

Changes to retrieval and advisor behavior must be regression-tested. Important classes include:

- policy answers
- pricing
- device allowances
- Microsoft 365
- troubleshooting
- security incidents
- compliance boundaries
- client tenancy isolation
- conflicting-source precedence
- prompt injection / hidden-source leakage
- low-confidence escalation

The repository's `test:advisor` suite is the first gate for DE Intelligence behavior. Production should only receive changes after typecheck, tests, build, audit, and smoke checks pass.

## Roadmap

### Phase 1 — governed bootstrap (current)

Typed knowledge schema, source-controlled canonical bootstrap records, hard scope isolation, authority-aware retrieval, DE Desk grounding, and regression tests.

### Phase 2 — storage-backed ingestion

PostgreSQL tables for documents, knowledge records, chunks, sources, supersession, review state, client tenancy, and knowledge gaps. Add full-text search and pgvector embeddings.

### Phase 3 — connectors and document pipelines

Ingest DE-approved PDF/DOCX/Markdown/HTML, client documents, tickets, Microsoft/vendor docs, contracts/policies, and structured network topology. Preserve source location and access controls.

### Phase 4 — client-aware retrieval

Authenticated DE Desk/Portal retrieval receives the live client ID, enforces tenant filters before ranking, and may retrieve client contracts, client docs, topology, entitlements, and approved ticket knowledge.

### Phase 5 — learning loop

Resolved tickets and chatbot failures create proposed KB/SOP/knowledge-gap items. Reviewers approve, reject, supersede, or merge candidates. Evaluation scores track answer correctness and leakage over time.

## Non-negotiable rule

**Retrieval and authorization happen before generation.** The model must never be used as the security boundary or as the canonical source of DE/client facts.
