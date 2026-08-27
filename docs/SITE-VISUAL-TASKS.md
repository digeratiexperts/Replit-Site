# Site visual tasks (Visual System v2)

Shared ledger for Digerati Experts site visual completion. Canonical rules: `design/VISUAL_SYSTEM_V2.md`. Governance PR: VIS-001.

**Rule: No agent starts something marked IN PROGRESS by another owner.** One task = one owner = one branch.

**VIS-001 through VIS-005 should happen before agents start spraying new design treatments across 138 pages.** Vocabulary first. Do not add HUD ticks independently.

---

## Status values

`BACKLOG` · `READY` · `IN PROGRESS` · `BLOCKED` · `PR READY` · `VISUAL REVIEW` · `APPROVED` · `MERGED` · `LIVE`

A task is not finished until reviewed, merged, production-verified, and marked **LIVE**.

Definition of complete: rule defined → primitive built → real content used → rendered → 390 / 768 / 1440 tested → self-critique → a11y → tests/build clean → latest-main concurrency audit clean → PR reviewed → merged → production verified → this ledger marked LIVE.

Docs-only rows (VIS-001): rendered visual QA is N/A. Still require a concurrency audit in the PR.

---

## Board

| ID | Task | Owner | Branch | Dependencies | Files expected | Status | Visual QA | PR | Approved |
|----|------|-------|--------|--------------|----------------|--------|-----------|-----|----------|
| VIS-001 | Visual System v2 docs + rules (governance). Original board suggested Claude; a short v2 note was pushed to `main` in `87e2858` (Antigravity / Joe) and marked LIVE prematurely. This Cursor Cloud Agent owns completing the corpus, rules, ledger, and PR template. | Cursor Cloud Agent (this PR) | `cursor/vis-001-visual-system-v2-c9ac` | — | `design/VISUAL_SYSTEM_V2.md` (expand, do not drop Layer 0 lock), sibling `design/*.md`, `docs/SITE-VISUAL-TASKS.md`, `docs/PR-CONCURRENCY-AUDIT.md`, `.cursor/rules/visual-system-v2.mdc`, AGENTS.md / `.cursorrules` §9A, PR template | IN PROGRESS | N/A (docs) | TBD | — |
| VIS-002 | EvidenceFrame + classifications (`dark` \| `paper` \| `interactive`) | Antigravity (code on `main`); Cursor/Codex for visual review — **do not start a parallel rewrite** | `main` @ `87e2858` | VIS-001 governance | `client/src/components/evidence/EvidenceFrame.tsx` + tests. Not mounted on pages. | VISUAL REVIEW | pending 390 / 768 / 1440 | landed on `main` (not a PR) | — |
| VIS-003 | HUDFrame + StatusToken + ProofChip | Antigravity (code on `main`); Cursor for visual review against `HUD_CHROME.md` (emerald-on-active, `accentBorder` glow) | `main` @ `87e2858` | VIS-001 | `HUDFrame.tsx`, `StatusToken.tsx`, `ProofChip.tsx`, `.de-hud-card` in `index.css` | VISUAL REVIEW | pending | landed on `main` | — |
| VIS-004 | Diagram primitives | Codex / Cursor | TBD | VIS-001 | `DiagramNode`, `DiagramEdge`, `SecurityBoundary`, `ControlGate`, `RiskMarker`, `StatusMarker`, `TelemetryLabel` | READY | when built | — | — |
| VIS-005 | DE Protection Coverage | Claude + frontend | TBD | VIS-001, VIS-002 visual review | Flagship coverage asset using EvidenceFrame + real package inclusions | BACKLOG | required | — | — |
| VIS-006 | ProActive Ecosystem diagram | Claude + Antigravity | TBD | VIS-004 | Ecosystem vs standalone vs co-managed vs assessments; canonical IT / Office / Business / Enterprise | BACKLOG | required | — | — |
| VIS-007 | Assessment EvidenceFrame | Claude | TBD | VIS-002 visual review | Assessment evidence module; classify SANITIZED REAL or EXAMPLE | BACKLOG | required | — | — |
| VIS-008 | IncidentFlow example module | Antigravity (code on `main`); Claude/Cursor for copy/visual review | `main` @ `87e2858` | VIS-002 | `IncidentFlow.tsx` is EXAMPLE-classified. Contains “under 5 minutes” — must never read as live DE performance. Do not mount until reviewed. | VISUAL REVIEW | pending | landed on `main` | — |
| VIS-009 | Protection Command Deck | Antigravity + Cursor | TBD | VIS-005 | Layer 5 interactive surface | BACKLOG | required | — | — |
| VIS-010 | Environment plate set (four plates) | Image generation + art direction | TBD | VIS-001, `PHOTOGRAPHY.md` / `IMAGERY.md` | Layer 1 plates; ILLUSTRATIVE; no live Arizona telemetry implication | BACKLOG | required | — | — |
| VIS-011 | Store product-media system (P0) | Claude / Cursor | TBD | VIS-001 + `design/PRODUCT_MEDIA.md` | Elevate `ProductMedia` / vendor-in-front grammar. **Do not restyle Store color lock** | BACKLOG | required | — | — |
| VIS-012 | Photography plan / assets | Human / content | TBD | VIS-001, `PHOTOGRAPHY.md` | Real people; no generated faces | BACKLOG | human review | — | — |
| VIS-013 | Proof system implementation | Claude / Cursor | TBD | VIS-002 | ProofChip usage + proof chapter; no fabricated trust | BACKLOG | required | — | — |
| VIS-014 | Threat-story template | Claude | TBD | VIS-001, `EDITORIAL_ASSETS.md` | Journal amber stays. LIVE feed dates stay honest | BACKLOG | required | — | — |
| VIS-015 | Editorial / publication templates | Antigravity / design | TBD | VIS-001, `EDITORIAL_ASSETS.md` | Datasheets, report covers | BACKLOG | required | — | — |
| VIS-016 | Final site propagation + QA | All, coordinated | TBD | VIS-001–VIS-015 as applicable | Coordinated rollout — not a drive-by HUD pass on 138 pages | BACKLOG | full | — | — |

Owner labels (Claude / Codex / Cursor / Antigravity) are **preferred pairing**, not a race. DE may restore Claude as VIS-001 owner historically; this row records who actually wrote the governance.

---

## How to take a task

1. Fetch latest `origin/main`.
2. Read `design/BRAND.md`, `DESIGN_SYSTEM.md`, `UX_PRINCIPLES.md`, `IMAGERY.md`, and Visual System v2 docs.
3. Confirm this ledger: your ID is assigned to you and is not IN PROGRESS elsewhere.
4. Isolated branch / worktree. Name `cursor/<task>-<suffix>` (or the team’s equivalent). Do not work on another owner’s branch.
5. Set status to IN PROGRESS in this file on your branch (and keep it updated as you PR).
6. Do not implement primitives that belong to another ID.
7. Before PR: concurrency audit (`docs/PR-CONCURRENCY-AUDIT.md`). Do not merge your own PR.

---

## Out of scope / do not collide

| Work | Branch / surface | Rule |
|------|------------------|------|
| DE Desk Ask DE / Get Support restyle | `cursor/de-desk-ask-support-style-c9ac` · `client/src/components/ZohoASAPWidget.tsx` | **Do not touch.** Another agent owns it. Visual System v2 does not restyle Desk in VIS-001–VIS-016 unless DE adds a ledger row. |
| Blog / Journal colors | `/resources`, `/case-studies` | Locked amber |
| Store colors | `/store` | Locked electric + 14 pills |
| Draft PRs #57, #59, #72 | See quarantine below | Do not merge as-is |

---

## PR quarantine

Recorded **2026-08-27** during VIS-001.

| Ref | SHA / note |
|-----|------------|
| `origin/main` at VIS-001 **start** (user check) | `45eafe7e17be56f08faba193814de27f95b2b6e4` — Homepage paper-ink contrast #75 |
| `origin/main` at VIS-001 **reconcile** | `87e2858a3544cf4d065b33300d5f9e84d8bc631e` — `feat(visual-system): initialize Visual System v2 docs, multi-agent ledger, and evidence primitives` |
| Commits on main since VIS-001 branch creation | **1:** `87e2858` (overlap: `design/VISUAL_SYSTEM_V2.md`, `docs/SITE-VISUAL-TASKS.md`; plus new evidence TSX + `index.css` HUD utilities). This PR expands those two markdown files and **preserves** all TSX/`index.css` from `87e2858`. |
| False LIVE | The `87e2858` ledger marked VIS-001 **LIVE**. That was premature: sibling docs, agent rules, PR template, and concurrency audit were missing. This PR corrects the ledger. |
| Local `main` in one agent workspace (stale checkout) | Previously `71130fa` — not authority |
| Parallel Desk work | `cursor/de-desk-ask-support-style-c9ac` owns `ZohoASAPWidget.tsx` — not this branch |

### Draft PRs that must not merge as-is

These PRs may contain valuable work. They are **stale** relative to current main. Quarantine until each is individually rebased and audited against current `origin/main`. **Do not close unless DE asks. Do not merge.**

| PR | Title | Head | Base OID when opened | Distance from current main |
|----|-------|------|----------------------|----------------------------|
| [#57](https://github.com/digeratiexperts/digeratiexperts-site/pull/57) | Use Digerati Experts or DE, never standalone Digerati | `cursor/digerati-experts-or-de-23d4` | `54d29c019919f4994a1572c1d1a80cfaa78a202b` | **30** commits on main since that base (through `45eafe7`) |
| [#59](https://github.com/digeratiexperts/digeratiexperts-site/pull/59) | Campaign landing pages, executive briefs, and real datasheet downloads | `cursor/campaign-landing-pages-23d4` | `54d29c019919f4994a1572c1d1a80cfaa78a202b` | Same stale base as #57 |
| [#72](https://github.com/digeratiexperts/digeratiexperts-site/pull/72) | Document canonical Hub vs legacy TechSales freeze | `cursor/repository-authority-23d4` | `f099ace5e749fa24021d690a60f622f7c747bff6` | **4** commits on main since that base (`ddae210` #73, `71130fa`, `56e8e06` #74, `45eafe7` #75) |

Main moved through Store cart/dock work, homepage rhythm, buyer-selector branding (#74), paper-ink contrast (#75), then **direct-to-main** visual-system primitives (`87e2858`). Blind-merging #57 / #59 / #72 would skip that history.

`87e2858` evidence components are **not mounted** on marketing routes. Do not treat them as a reason to HUD-spray the site. VIS-002 / VIS-003 / VIS-008 need visual review before page use.

---

## Sprints (program map)

See `design/VISUAL_SYSTEM_V2.md` for the full Sprint 0–8 narrative. Short form:

| Sprint | IDs |
|--------|-----|
| 0 Governance | VIS-001 |
| 1 Primitives | VIS-002, VIS-003, VIS-004 |
| 2 Flagship assets | VIS-005–VIS-008 |
| 3 Command deck | VIS-009 |
| 4 Environment plates | VIS-010 |
| 5 Store visual system (P0) | VIS-011 |
| 6 Human proof | VIS-012, VIS-013 |
| 7 Threat storytelling | VIS-014 |
| 8 Publication + propagation | VIS-015, VIS-016 |
