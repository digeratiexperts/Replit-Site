# Claude Next Base — DE Website / Store

**Date:** 2026-08-30  
**Canonical repo:** `digeratiexperts/digeratiexperts-site`  
**Frozen production checkpoint:** `checkpoint/de-site-base-2026-08-30`  
**Checkpoint SHA:** `eaf8198b9d8b79ffc6e72ad4ca8f3709f84f1fa2`  
**Checkpoint status:** CI, build, browser smoke, production VPS deploy, and production runtime verification passed.  
**Claude role:** default lead website implementation / integration agent under `docs/AI-ENGINEERING-GOVERNANCE.md`.

---

## 1. This is the new base

Start every new website task from the frozen checkpoint SHA above or from a later `main` only after proving that later `main` contains the checkpoint and has passed the same gates.

Do **not** resurrect old branches as bases. Every old branch is stale until compared against the checkpoint/current `main`.

The checkpoint intentionally includes the completed Store architecture and Store jelly-motion work, but excludes incomplete homepage/reference work and other stranded experiments.

---

## 2. What is verified live in this base

### Public Store / Business Solution Builder

- `/store` is the canonical public solution-builder entry.
- Door 2 is not a grocery/SKU store.
- Business profile is Step 0 and captures once for the whole draft:
  - users
  - computers/workstations
  - mobile devices
  - sites/locations
  - device ownership: company / BYOD / hybrid
  - internal IT: yes / no / unsure
- Buyers select one or more pains/business needs.
- Buyers choose offer relationship:
  - Standalone — standard pricing position
  - Co-Managed — preferred pricing position where commercially justified
  - Help me choose / unsure
- Standalone means the buyer receives a DE-designed/preconfigured solution without joining the traditional managed-services operating model. Customer/current IT may implement/operate it; DE implementation/support can be selected separately.
- Co-Managed means shared responsibility with DE, not a blanket hardcoded discount.
- ProActive Managed IT remains a separate relationship / Door 1.
- Package/BOM layer exists for customer-readable inclusions and profile-derived quantities.
- Fulfillment semantics exist for digital/physical, self-install, remote DE setup/support, and technician/on-site possibility.
- Assessments are package policy: required / recommended / not required. Do not restore a universal assessment default.
- Final public contact step is only:
  - company
  - name
  - email
  - phone
- Public Save Progress UI exists and does not require lead/contact submission.
- Multi-need selections are one composed solution draft/request.
- `/store/checkout` is compatibility/alias behavior, not public Pay Now.
- Client Marketplace remains authenticated.
- Digital Warehouse remains staff/internal.
- Public vendor/distributor/SKU/cost/margin/internal mapping leakage is prohibited.
- Public raw product routes remain blocked/destaged.
- Door 2 browser regression coverage exists at 390 / 768 / 1440.

### Store motion / visual interaction

- Compiz/Linux-inspired jelly motion is live on Store cart/configuration surfaces.
- Your Solution launcher squishes.
- Solution drawer has elastic overshoot/settle.
- Configuration cards and choice tiles use restrained jelly/spring response.
- Reduced-motion disables it.
- Store-only CSS is code-split so the global bundle budget is not increased.
- Keep the motion professional; do not convert the whole site into a wobble demo without explicit instruction.

### Store / page chrome safeguards

- No-overlapping-interactive-layers rule is standing law.
- Fixed/floating UI must coordinate through the shared CSS variables and publish its own footprint where appropriate.
- Ask DE, cookie chrome, Store solution controls, sticky CTAs, etc. may not cover one another.

### Deployment / governance

- Canonical production deployment is pinned to `digeratiexperts/digeratiexperts-site`.
- `MERGED` is not `LIVE`; production verification is required.
- GitHub-visible open PRs/issues are authoritative active-work locks; branch-local YAML is only a mirror.
- Claude is default lead integrator unless Joe explicitly reassigns a task.

---

## 3. Open Store work — not complete yet

### P0 / first engineering pass

#### Issue #120 — Durable Save Progress

Current public save is not yet guaranteed across server restarts/devices.

**Important preserved implementation:** branch `chatgpt/store-durable-solution-drafts`, commit `f6502a55067b27dc882ef66071f951618436231b` adds `server/publicSolutionRequestPersistence.ts` with PostgreSQL persistence work. It is **1 commit ahead and 8 commits behind** the checkpoint/current main. Do not merge the branch wholesale. Reconcile the single-file implementation against the checkpoint and current request-store/server architecture, then complete the issue contract:

- durable server-side persistence
- safe anonymous draft identifier / continuation semantics
- no contact submission required to save
- expiration/cleanup
- privacy/tenant boundaries
- migration/backward compatibility for current draft v2
- restart persistence, idempotency, invalid/expired IDs, privacy tests
- 390/768/1440 rendered verification

#### Issue #121 — Authoritative Co-Managed preferred pricing

- No fake blanket percentage.
- Pricing must come from authoritative DE pricing rules/engine.
- Customer-facing result only; never expose vendor cost, distributor, SKU, margin, or internal price logic.
- Preserve tier minimum/margin governance and graceful unpriced states.

#### Issue #122 — Hardware availability / ship dates

- Exact/estimated shipment messaging only when backed by authoritative model/inventory/destination data.
- Distinguish digital provisioning from physical shipping.
- Never fabricate availability or dates.
- Keep vendor/distributor/SKU/cost private on the public side.

#### Issue #123 — Technician eligibility / scheduling

- Determine whether the configured scope is self-install, remote, on-site optional, or on-site required.
- Connect eligible work to the approved real scheduling/calendar workflow.
- Do not fake appointment availability.
- Preserve quote/scope approval where required.

### P0 recovery / continuity

#### Issue #119 — Anonymous situation continuity

The original Cursor local implementation bytes were never committed. Remote recovery proved the branch only contains the already-merged marketplace returnTo change.

Do not wait forever for missing bytes. First inspect the original Cursor environment if still available. If not recoverable, rebuild the preserved requirement cleanly on the checkpoint/current main. Do not overwrite the Store solution-builder state model.

---

## 4. Homepage + Ask DE — preserved but NOT ready to merge

### PR #116 / branch `chatgpt/homepage-support-reference-style`

The branch has been reconciled to the current checkpoint and is currently ahead of `main`; it contains:

- `ReferenceHeroSection`
- a dark precision / reference-style hero
- a single white Ask DE chooser pane
- chooser actions: Get Support, Get Help, Client Tools, Give Feedback
- reference-style Desk CSS
- rendered smoke additions

**DO NOT MERGE #116 AS-IS.**

Joe clarified after it was built that the intent was **a full homepage redesign in the supplied reference style, not only a hero replacement plus Ask DE shell**.

Use #116 as preserved source material, not as the finished feature.

### Full homepage design requirement

- Preserve all useful/current homepage content and functionality; do not erase the existing site to get a new look.
- Recompose the **entire homepage** into one coherent design system using the approved reference direction.
- Cleaner, more intentional use of white/light sections is allowed where it improves hierarchy; preserve DE graphite / warm-limestone / magenta / restrained violet identity.
- Avoid generic cyberpunk/HUD overload, Huntress-style cyan, random gradients, and aggressive vendor-site mimicry.
- Visual proof/evidence, diagrams, product storytelling, human presence, and editorial polish matter more than another theme swap.
- The Ask DE first interaction should be one chooser pane, not three competing tabs shown up front.
- Existing real support/chat/ticket/client-tools behavior must remain underneath it.
- Re-audit right-click/context actions, message timestamps, compact message-action icons, and message micro-controls in DE Desk. Real timestamps are already part of prior work; the broader right-click/action feature set has not been proven complete.
- Verify launcher / Your Solution / cookie / unified bar coordination at short mobile heights.
- Required rendered review: 390 / 768 / 1440, plus interaction and keyboard/focus review.

---

## 5. Visual Engine / high-visual capability work discussed in other ChatGPT threads

Joe explicitly wants the site capable of rendering and displaying things it cannot do today. Treat this as a **capability layer**, not a dependency kitchen sink and not a simultaneous sitewide rewrite.

Approved/recommended capability set from prior planning:

1. Three.js + React Three Fiber + Drei — primary 3D web layer.
2. Spline — authored interactive 3D/hero scenes where it materially improves the design.
3. Rive — high-quality interactive vector/state-machine animation.
4. GSAP + ScrollTrigger — controlled timeline/scroll choreography.
5. Cytoscape.js — topology/security/network relationship visualization.
6. React Flow (`@xyflow/react`) — interactive workflow/architecture diagrams.
7. Apache ECharts — richer data/evidence visualization.
8. MapLibre GL + deck.gl — maps/geospatial/coverage visualization.
9. WebGPU — progressive enhancement for advanced rendering; never sole rendering path.
10. Babylon.js / WebXR — isolated specialty use for XR/simulation only; do not duplicate the primary R3F 3D layer.

### Capability rollout rules

- Add by phase/use case, not globally.
- Lazy-load renderer-specific chunks.
- Keep static/text/HTML fallbacks for SEO/accessibility.
- Respect reduced motion.
- Adaptive quality by device/GPU/viewport.
- Feature flags for expensive/experimental surfaces.
- Hard bundle/performance budgets; do not raise budgets merely to make CI green.
- One canonical data model feeds rich and fallback visualizations.
- No fake metrics/data for visual drama.
- Never expose protected Store/vendor/warehouse data through diagrams or client bundles.
- Suggested order: foundation -> GSAP/Rive -> ECharts/Cytoscape/React Flow -> Three/R3F/WebGPU -> Spline -> MapLibre/deck.gl -> isolated Babylon/WebXR.

Do not start this rollout until the core checkpoint and active P0 reconciliation are understood. The right goal is a coherent visual system with reusable primitives, not ten libraries installed with no production use.

---

## 6. Visual System v2 preserved branch audit

### Already absorbed into main/history

`chatgpt/visual-system-v2-governed-20260827` is behind main with no unique commits. Treat it as historical/merged.

### Stale but potentially useful reference — DO NOT MERGE WHOLESALE

`chatgpt/visual-system-v2-sitewide-20260827`
- 4 unique stale commits, ~143 commits behind.
- Unique changes are concentrated in EvidenceFrame/HUDFrame/IncidentFlow tests/components.
- Reference/cherry-pick-by-intent only after comparing against current equivalents.

`chatgpt/visual-system-v2-sitewide-current-20260827`
- 9 unique stale commits, ~142 commits behind.
- Contains potentially useful reference work including:
  - AssessmentReportSample
  - ProActiveEcosystemDiagram
  - evidence primitives
  - SolutionsIndex / CyberFacts / GenericServicePage visual work
- Do not merge or cherry-pick the branch wholesale. Rebuild/reconcile the good concepts on the checkpoint/current main under the current design system.

---

## 7. Other preserved ChatGPT branch work

### Campaign/resources work

`chatgpt/port-pr59-campaign-resources-20260827`
- 4 unique stale commits, ~116 commits behind.
- Contains a substantial campaign/resource system: campaigns data/tests, executive briefs, campaign pages, resource asset pages, sitemap additions, etc.
- This is **not part of the immediate Store/homepage checkpoint**, but it is not to be forgotten/deleted. Re-audit as a separate bounded feature after the core site milestone.

`chatgpt/port-pr59-campaigns-current-main` is fully behind current main and has no unique commits; historical only.

### Repository authority/naming branch

`chatgpt/repository-authority-and-naming-cleanup-20260827` has stale unique docs/rules but is heavily behind current main. Current governance/authority work has since moved forward through merged rules/PRs. Treat this branch as reference-only unless a current doc audit proves a specific missing rule.

---

## 8. GitHub / multi-agent safety that still needs external action

### Issue #124 — `main` is still unprotected

Current GitHub state still reports main protection disabled / required checks off.

Repository-admin action is still required to:

- require PR before merge
- restrict direct pushes
- prohibit force pushes/deletion
- require canonical CI before merge
- keep production deploy as post-main verification
- keep admin bypass narrow/intentional

Do not treat the existence of governance docs as technical branch protection.

---

## 9. Canonical architecture / business rules Claude must not regress

### Four experiences

1. Handle Our IT — public ProActive managed plans, consultation/assessment led.
2. Solve a Business Need — public Business Solution Builder.
3. Client Marketplace — authenticated client purchasing.
4. Digital Warehouse — DE staff/internal full catalog.

### Public secrecy boundary

Never expose publicly:

- vendor names where DE policy requires outcome-first presentation
- distributor names
- SKUs/product codes
- internal costs
- margins
- implementation mappings
- full internal catalog
- distributor availability source details

### Store source of truth

- Keep `client/src/data/curatedSolutions.ts` as the canonical curated solution-family source unless a deliberate migration replaces it.
- Do not fork another public solution catalog.
- Raw legacy wording inside that source may still carry old assumptions; public adapters/policy must prevent those assumptions from leaking back into UX. Long term, migrate source wording carefully rather than creating parallel catalogs.

### Public profile and package logic

Website collects facts. Hub/server owns authoritative qualification/eligibility/pricing/business rules where appropriate. Do not silently duplicate Hub logic in the frontend.

### ProActive pricing currently established

- IT: $125/user/mo, $1,600 minimum
- Office: $165/user/mo, $2,400 minimum
- Business: $245/user/mo, $5,400 minimum
- Enterprise: $345/user/mo, $9,000 minimum
- GCCH floors: Business $7,500; Enterprise $12,500

Do not invent public prices outside authoritative rules.

---

## 10. Claude execution order from this milestone

### Phase A — Reconcile and close P0 Store backend gaps

1. Start from checkpoint/current main.
2. Reconcile the single durable-draft persistence commit from `chatgpt/store-durable-solution-drafts` and fully complete #120.
3. Implement #121 authoritative Co-Managed pricing adapter.
4. Implement #122 authoritative shipping/availability adapter.
5. Implement #123 technician eligibility + real scheduling handoff.
6. Resolve/rebuild #119 anonymous continuity without disturbing Store state.
7. Render/test Store at 390 / 768 / 1440 and verify production.

### Phase B — Full homepage + Ask DE redesign

1. Do not merge #116 directly.
2. Use #116's hero/chooser/style work as source material.
3. Recompose the entire homepage in the approved reference direction while preserving current content/functionality.
4. Finish Ask DE message interaction audit (timestamps/context actions/action icons/right-click-equivalent behavior as appropriate).
5. Render interaction evidence at 390 / 768 / 1440.
6. Merge only after current-main reconciliation and full visual/functional review.

### Phase C — Visual Engine / evidence system

1. Audit current dependencies/components before adding anything.
2. Introduce the approved high-visual capability stack in phases and only where there is a real production surface.
3. Recover good ideas from the stale Visual System v2 branches by intent, not wholesale merge.
4. Prioritize evidence visualization, topology/workflow diagrams, product/solution storytelling, editorial visuals, and rich but performant interactions.

### Phase D — Deferred preserved features

- campaign/resources branch re-audit
- stale Google `/store/product/*` search-index cleanup / Search Console
- any other preserved branch only after compare-to-current-main + explicit need

---

## 11. Definition of the next milestone

Do not call the next milestone complete until:

- P0 Store backend issues are either VERIFIED LIVE or explicitly BLOCKED by an external dependency.
- Full homepage redesign is rendered and approved as a whole, not only hero/support.
- Ask DE first-pane and chat micro-interactions are coherent and non-overlapping.
- No protected Store data leaks.
- No fake pricing, shipment dates, technician slots, metrics, or status.
- 390 / 768 / 1440 rendered QA passes.
- Typecheck, unit/advisor tests, production build, bundle budget, and local production smoke pass.
- Work is merged one PR at a time after latest-main reconciliation.
- Production deploy and runtime verification pass.
- Final live SHA is recorded.

---

## 12. Hard instructions for Claude

- **Do not overwrite the checkpoint.** Branch from it/current verified main.
- **Do not merge PR #116 as-is.** It is a partial implementation of a larger homepage request.
- **Do not merge stale visual/campaign branches wholesale.** Reconcile useful intent into current code.
- **Do not make UI-only promises for pricing, inventory, shipping, scheduling, persistence, or status.** Back them with authoritative services or display an honest unavailable/pending state.
- **Do not reintroduce grocery-cart semantics to public Door 2.**
- **Do not reintroduce universal assessment-first behavior.**
- **Do not expose the Digital Warehouse or supplier data publicly.**
- **Do not raise bundle budgets to hide regressions.**
- **Do not call merged work live without production verification.**
- **Do not start simultaneous overlapping branches without GitHub-visible claims.**
- Preserve newer work from every agent. Compare before touching whole files.

This document is the consolidated handoff derived from the August 29–30 ChatGPT workstreams, current GitHub state, the current production checkpoint, and preserved branches/issues.