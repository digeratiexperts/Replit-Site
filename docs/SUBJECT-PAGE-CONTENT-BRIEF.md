# Subject-page content brief (magazine pass — deferred)

**Status:** Content + image briefs only. **No UI.** Do not implement hero-corner art or left/right magazine layouts until DE green-lights a visual pass against this doc. `GenericServicePage` stays a text-heavy shell until then.

**Decision (paused visual work)**

Stop implementing hero-corner art and L/R magazine layouts now. This brief locks section copy and image inputs so a later visual pass does not force filler art. Exemplar (for later): Cloud Backup / BCDR hero — white clouds rising from a data center, **right corner only**; subject-matched variants on sibling pages.

**Sources today**

| Layer | File |
|-------|------|
| Feature/benefit shells | `client/src/pages/routes/servicePages.tsx` |
| Sales narrative | `client/src/pages/routes/pageNarratives.ts` |
| Page shell | `client/src/pages/GenericServicePage.tsx` (text-heavy shell — cards, lists, FAQs; **no magazine L/R**) |

**Inventory (2026-08-08)**

| Slug | Path | Narrative | Notes |
|------|------|-----------|-------|
| ProActive-Ecosystem-Packages | `/solutions/ProActive-Ecosystem-Packages` | Yes | Hub/tier pointer |
| managed-it-support | `/solutions/managed-it-support` | Yes | Dedicated wrapper → GenericServicePage |
| managed-workplace | `/solutions/managed-workplace` | **Filled in this pass** | Custom page component today |
| co-managed-it | `/solutions/co-managed-it` | **Filled in this pass** | Custom page component today |
| cloud-backup | `/solutions/cloud-backup` | Yes | **Exemplar** for hero corner art |
| backup-disaster-recovery | `/solutions/backup-disaster-recovery` | **Filled in this pass** | Custom page component today |
| threat-detection | `/solutions/threat-detection` | Yes | GenericServicePage |
| security-operations | `/solutions/security-operations` | Yes | GenericServicePage |
| unified-security | `/solutions/unified-security` | Yes | GenericServicePage |
| security-awareness | `/solutions/security-awareness` | Yes | GenericServicePage |
| data-encryption | `/solutions/data-encryption` | Yes | GenericServicePage |
| compliance-reports | `/solutions/compliance-reports` | Yes | GenericServicePage |
| vcio-strategy | `/solutions/vcio-strategy` | Yes | GenericServicePage |
| professional-services | `/industries/professional-services` | Yes | Shorter industry brief |
| accounting-finance | `/industries/accounting-finance` | Yes | Also has dedicated Accounting page |
| real-estate | `/industries/real-estate` | Yes | Also has dedicated RealEstate page |
| nonprofits | `/industries/nonprofits` | Yes | Also has dedicated Nonprofits page |

**Custom industry pages (note only — do not redesign in this pass):** `/industries/healthcare`, `/industries/law-firms`, `/industries/animal-hospitals`.

**Out of scope:** blog, videos, checklist, datasheets, support utilities, homepage, Solutions mega-menu IA.

---

## Magazine pattern (for later visual pass)

Every subject page should eventually read like a magazine spread, not a feature-card book:

1. **Hero** — brand-safe headline, one support line, one CTA group; **subject art in the right corner only** (not a full-bleed collage of icons).
2. **3–5 alternating L/R beats** — copy left / image right, then reverse; each beat matches a real topic (process step or feature cluster), not decorative filler.
3. **Closing proof + CTA** — quote or industry context (no invented metrics) + assessment CTA.

Until that pass: keep shipping narrative copy into `pageNarratives` / this brief. Do not generate placeholder illustrations.

---

## Solutions

### cloud-backup (exemplar)

| Field | Value |
|-------|--------|
| Title | Cloud Backup |
| Canonical | `/solutions/cloud-backup` |
| Tier | office |
| Sources | `servicePageData['cloud-backup']` + `pageNarratives['cloud-backup']` |

**Hero (draft)**

- Headline: Prove your backups can restore — before you need them
- Support: Encrypted backups for endpoints, servers, and Microsoft 365/Google — with restore tests, not hope.
- CTA: Free cyber risk assessment

**L/R story beats**

1. **Sync is not a backup** — OneDrive and recycle bins help; they are not independent, tested recovery. Owners learn the difference during an outage.
2. **Protect what must come back** — Scope endpoints, servers, and cloud mail/files; encrypt in transit and at rest; alert when jobs fail.
3. **Verify monthly** — Scheduled restore tests with evidence. An untested backup is a story you tell yourself.
4. **Ransomware-ready copies** — Immutable/offsite copies so encryption of production is not encryption of your only recovery path.
5. **Visibility for owners and auditors** — Exception reporting and health they can skim before insurance or board questions.

**Image briefs (later)**

- **Hero (right corner):** White clouds rising from a modern data-center form — soft volumetric clouds, dark industrial racks below; art stays in the right corner of the hero, not centered full-bleed. No neon grid, no floating shield JPG, no stock handshake.
- Beat 1: Split metaphor — laptop “sync” icon dissolving vs a sealed cloud vault (abstract, not cartoon).
- Beat 2: Clean diagram of endpoints → encrypted pipe → cloud store (DE brand pink/navy, not purple SaaS generic).
- Beat 3: Calendar / checklist moment of a successful restore test (human + UI, Arizona office feel).
- Beat 4: Locked offsite copy vs encrypted production (simple, serious).
- Beat 5: One-page health report mock (blurred, not fake client names).

**Gaps / DE decisions**

- Confirm whether “monthly” restore cadence is always true or plan-dependent (copy currently says monthly).
- Prefer real client proof over “typical outcome” when available.
- Stat in `servicePages` (Sophos 54%) is industry context — keep attribution; do not invent DE-specific restore %.

---

### backup-disaster-recovery

| Field | Value |
|-------|--------|
| Title | Backup & Disaster Recovery (BCDR) |
| Canonical | `/solutions/backup-disaster-recovery` |
| Tier | enterprise |
| Sources | `servicePageData` + narrative (this pass) |

**Hero (draft)**

- Headline: Recover the business on a timeline you define
- Support: Agreed RPO/RTO, image-based recovery, runbooks, and drills — continuity, not “we have backups.”
- CTA: Assessment → recovery targets conversation

**L/R beats**

1. **Targets before tools** — RPO/RTO agreed with ownership; SLA-backed, not marketing slogans.
2. **Image-based recovery** — Full systems back, not file-by-file scavenger hunts.
3. **Drills and runbooks** — Scheduled restore tests + tabletop so people know the order of operations.
4. **Priority restore paths** — Critical systems first; optional warm standby when risk demands it.
5. **Evidence for insurance and boards** — Documented DR that survives underwriter questions.

**Image briefs**

- Hero right corner: Data center with storm clearing / systems “coming back online” — related to cloud-backup exemplar but heavier (failover, not soft clouds alone).
- Beats: timeline RPO/RTO graphic; server image restore; tabletop exercise; priority stack diagram; binder/packet for auditors.

**Gaps**

- Fix typo in live feature title “Guaranteed RTO/RTO” → RPO/RTO when UI pass happens.
- Dedicated custom page today — magazine pass should reconcile with GenericServicePage or keep custom but use this brief.

---

### managed-it-support

| Field | Value |
|-------|--------|
| Title | Managed IT Support |
| Canonical | `/solutions/managed-it-support` |
| Tier | office |
| Sources | Full narrative + service data |

**Hero (draft)**

- Headline: Fast help anchored to the DE stack — not break/fix roulette
- Support: 15-minute first-response target, vendor coordination, and a baseline that stops repeat tickets.
- CTA: Free assessment

**L/R beats**

1. **Helpdesk is the front door** — Value is the stack underneath (identity, patching, monitoring, backup checks).
2. **Stabilize the baseline** — MFA, patching, known-good config before ticket volume drops.
3. **Operate with visibility** — What we fixed and prevented, monthly — not black-box MSP fog.
4. **Onsite when hands matter** — East Valley / Chandler remote-first with real onsite.
5. **Improve every quarter** — Ticket noise → roadmap so IT is not a surprise cost center.

**Image briefs**

- Hero right: Technician / ops console with Arizona office glass and soft light — no call-center headset farm stock.
- Beats: ticket closing; MFA/patch board; monthly summary; East Valley map/onsite van abstract; QBR table.

**Gaps**

- Proof quote is “typical outcome” — replace with named permissioned quote when DE has one.

---

### managed-workplace

| Field | Value |
|-------|--------|
| Title | Managed Workplace |
| Canonical | `/solutions/managed-workplace` |
| Tier | office |
| Sources | `servicePageData` + narrative (this pass) |

**Hero (draft)**

- Headline: New hires productive in a day — not a week of access chaos
- Support: Identity, apps, devices, email, and offboarding as one lifecycle — not six vendor tickets.
- CTA: Assessment

**L/R beats**

1. **Identity is the spine** — SSO/MFA/conditional access; access follows role, not tribal knowledge.
2. **Apps without sprawl** — License hygiene, shadow IT discovery, access reviews.
3. **Devices that match policy** — Windows/macOS baselines; MDM where mobile is real work.
4. **Joiners and leavers** — HR → identity → device → apps; revoke in minutes on exit.
5. **Collaboration that stays governed** — M365/Google structure, retention, message hygiene.

**Image briefs**

- Hero right: Clean “day-one desk” — laptop unlocked to apps tile, soft office depth; no rainbow SaaS logo salad.
- Beats: identity flow; SaaS license board; device enrollment; offboarding revoke; Teams/Drive tidy structure.

**Gaps**

- Custom long page exists — do not delete content without DE approval; magazine pass should elevate, not strip.

---

### co-managed-it

| Field | Value |
|-------|--------|
| Title | Co-Managed IT |
| Canonical | `/solutions/co-managed-it` |
| Tier | business |
| Sources | `servicePageData` + narrative (this pass) |

**Hero (draft)**

- Headline: Your IT team keeps the wheel — we add stack, coverage, and Tier 2/3 muscle
- Support: Clear RACI, shared tooling, after-hours monitoring so your people don’t burn out.
- CTA: Assessment with your IT lead

**L/R beats**

1. **RACI first** — Who owns patching, onboarding, vendors, incidents — written, not assumed.
2. **Shared platform** — Visibility into the same security/management plane.
3. **Escalation that respects your team** — Tier 2/3 without politics or ticket black holes.
4. **Coverage beyond staff hours** — 24/7 monitoring so nights/weekends aren’t heroics.
5. **Quarterly posture with your lead** — Roadmap and stack optimization as peers.

**Image briefs**

- Hero right: Two operators at one glass wall / shared dashboard (peer dynamic, not MSP “taking over”).
- Beats: RACI matrix; shared console; escalation path; night ops; QBR with internal IT lead.

---

### threat-detection

| Field | Value |
|-------|--------|
| Title | Threat Detection & Response |
| Canonical | `/solutions/threat-detection` |
| Tier | business |

**Hero (draft)**

- Headline: 24/7 detection with real containment — not alerts into a mailbox
- Support: Endpoints, email, identity, and cloud signals watched; humans triage; you get action.
- CTA: Assessment — tools vs monitoring honesty check

**L/R beats**

1. **Instrument** — EDR + email + identity + cloud into one watched layer.
2. **Detect & triage** — Noise filtered; real incidents escalate.
3. **Contain** — Isolate, kill sessions, reset credentials with your people in the loop.
4. **Recover & report** — Root cause + insurance-friendly documentation.
5. **Why antivirus isn’t enough** — Behavior and response, not signatures alone.

**Image briefs**

- Hero right: Dark ops pulse / signal lattice (serious, not neon cyberpunk purple glow cliché).
- Beats: telemetry feed; triage desk; endpoint isolate; incident report; antivirus vs EDR contrast.

**Gaps**

- DBIR 88% is industry context — keep source; never present as DE client metric.

---

### security-operations

| Field | Value |
|-------|--------|
| Title | Security Operations (SOC-as-a-Service) |
| Canonical | `/solutions/security-operations` |
| Tier | business |

**Hero (draft)**

- Headline: SOC outcomes without hiring a SOC team
- Support: Detection plus hunting, policy tuning, correlation, and board-ready reporting.
- CTA: Map your stack to an operating model

**L/R beats**

1. Baseline controls and monitoring to real risk.
2. Operate: detect, respond, hunt, tune.
3. Report monthly like a SOC would.
4. Mature quarterly as headcount and SaaS grow.
5. Insurance evidence as a byproduct of operations.

**Image briefs**

- Hero right: Calm “security room” — screens with posture, not red alarm theater.
- Beats: hunt cycle; policy diff; SIEM correlation; monthly packet; underwriter checklist.

---

### unified-security

| Field | Value |
|-------|--------|
| Title | Unified Security Posture |
| Canonical | `/solutions/unified-security` |
| Tier | enterprise |

**Hero (draft)**

- Headline: One security program — not a pile of portals
- Support: Identity, endpoint, email, cloud, awareness, and recovery under one operating rhythm.
- CTA: Diagram what you have vs unified posture

**L/R beats**

1. Unify identity (Zero Trust spine).
2. Align detections across surfaces.
3. Tie backup/BCDR to IR playbooks.
4. Drift detection and correction.
5. One reporting rhythm for risk and readiness.

**Image briefs**

- Hero right: Single pane / connected rings (identity at center) — avoid logo salad.
- Beats: SSO spine; unified alert; IR+restore link; drift fix; executive dashboard.

---

### security-awareness

| Field | Value |
|-------|--------|
| Title | Security Awareness Training |
| Canonical | `/solutions/security-awareness` |
| Tier | business |

**Hero (draft)**

- Headline: Turn staff into a control — not a liability
- Support: Short training, realistic phish sims, coaching for high-risk users, audit evidence.
- CTA: Include human-risk scoring in assessment

**L/R beats**

1. Baseline with short lessons + first sim.
2. Coach clickers — no public shaming.
3. Measure by department, not vanity completion %.
4. Evidence for HIPAA/insurance.
5. Culture: security is everyone’s job, still owned by leadership.

**Image briefs**

- Hero right: People + subtle phish email UI (Arizona office), not cartoon fishhooks.
- Beats: micro-lesson; coaching moment; risk heatmap; training log; culture poster (tasteful).

---

### data-encryption

| Field | Value |
|-------|--------|
| Title | Data Encryption & Control |
| Canonical | `/solutions/data-encryption` |
| Tier | business |

**Hero (draft)**

- Headline: Control data where your team actually works — the browser
- Support: DLP, anti-phish, DNS filtering, and activity insight at the browser boundary.
- CTA: Ask about browser-layer controls in assessment

**L/R beats**

1. Policy: what can leave, who can access.
2. Enforce in-browser DLP and phishing blocks.
3. DNS filtering as a quiet control.
4. Monitor for insider/exfil patterns.
5. Works with endpoint security — not instead of it.

**Image briefs**

- Hero right: Browser chrome with a soft “shielded session” (no padlock-on-everything stock).
- Beats: policy board; blocked download; DNS wall; activity insight; stacked with EDR.

---

### compliance-reports

| Field | Value |
|-------|--------|
| Title | Compliance & Risk Reports |
| Canonical | `/solutions/compliance-reports` |
| Tier | enterprise |

**Hero (draft)**

- Headline: Stop scrambling when auditors or insurers ask
- Support: Framework mapping, retained evidence, monthly posture, packets on demand.
- CTA: Assessment — evidence you have vs gaps

**L/R beats**

1. Map DE controls to HIPAA / FTC / CIS / insurance.
2. Collect evidence continuously.
3. Monthly posture leadership can skim.
4. Audit/insurance packet without the fire drill.
5. Honest gap tracking — no “we certify you HIPAA” claims.

**Image briefs**

- Hero right: Clean evidence packet / binder emerging from a secure vault (abstract).
- Beats: framework map; evidence shelf; monthly report; packet handoff; gap roadmap.

**Gaps**

- `servicePages` benefit “full compliance certification” is too strong — prefer narrative FAQ language (“demonstrate compliance”) in magazine copy.

---

### vcio-strategy

| Field | Value |
|-------|--------|
| Title | vCIO & Strategy |
| Canonical | `/solutions/vcio-strategy` |
| Tier | enterprise |

**Hero (draft)**

- Headline: IT leadership without hiring a full-time CIO
- Support: QBRs, risk register, budget forecast, vendor rationalization, compliance planning.
- CTA: Assessment → prioritized roadmap

**L/R beats**

1. Listen to business goals and risk tolerance.
2. Assess stack, spend, quick wins vs structural fixes.
3. Roadmap with budget ranges.
4. Govern with quarterly TBRs.
5. Prevention incentives / tech points when used in package.

**Image briefs**

- Hero right: Owner + advisor at a clean roadmap wall (Chandler/Phoenix professional, not generic boardroom stock).
- Beats: listening session; gap map; roadmap timeline; QBR; spend consolidation chart.

---

### ProActive-Ecosystem-Packages

| Field | Value |
|-------|--------|
| Title | ProActive Ecosystem Packages |
| Canonical | `/solutions/ProActive-Ecosystem-Packages` |
| Tier | office (entry) → business / enterprise |

**Hero (draft)**

- Headline: One accountable partner for IT + security — not a vendor patchwork
- Support: Helpdesk, security baseline, backup, identity, vendor coordination — packaged by tier.
- CTA: Assessment → tier recommendation

**L/R beats**

1. Fit Office / Business / Enterprise to headcount and risk.
2. Onboard to a known-good baseline.
3. Run with predictable monthly operations.
4. Review with summaries / optional QBRs.
5. Point to standalone modules when risk needs more (detection, BCDR, compliance).

**Image briefs**

- Hero right: Three-tier ecosystem “orbit” (subtle), or single office protected under one canopy — avoid pricing table as hero art.
- Beats: tier fit; onboarding checklist; monthly ops; QBR; module add-ons.

**Gaps**

- Keep tier pages (`proactive-*-ecosystem`) as deep links; this page is the hub story.

---

## Industries (shorter)

### professional-services

- Hero: Protect the trust clients already place in you.
- Beats: client-data boundaries; secure field/remote work; questionnaire readiness.
- Image: proposal-sharp AZ firm + secure file boundary (right corner).
- Gap: permissioned case quote.

### accounting-finance

- Hero: Secure client financial data without slowing the firm.
- Beats: tax-season phishing; harden identity/email; protect files/payments; evidence for insurance.
- Image: firm at busy season with calm security layer (right corner) — no “calculator + padlock” cliché.
- Note: Dedicated `/industries/accounting-finance` Accounting page may diverge; elevate in place, don’t strip.

### real-estate

- Hero: Reduce wire-fraud exposure before the next closing.
- Beats: spoofed instructions; lock identity/email; verification workflows; mobile/docs hygiene.
- Image: Arizona closing desk + verified channel metaphor (right corner).

### nonprofits

- Hero: Protect the mission and the donor data behind it.
- Beats: right-size identity/backup/email; harden CRM/payments; sustainable support.
- Image: community/mission space + quiet data protection (right corner) — not corporate skyscraper stock.

### Healthcare / Law / Animal hospitals

Custom pages — **content elevation only when DE schedules**; do not remove existing sections for “cleaner design.” Magazine L/R pattern can be applied later using the same slot template as above.

---

## DE decisions checklist (before visual pass)

- [ ] Approve exemplar Cloud Backup hero: white clouds from data center, **right corner only**
- [ ] Confirm restore-test cadence language (monthly vs plan-based)
- [ ] Supply permissioned proof quotes where “typical outcome” appears
- [ ] Soften/remove overclaim copy (e.g. “compliance certification”) on magazine rewrite
- [ ] Decide whether custom pages (Managed Workplace, Co-Managed, BCDR, industries) adopt GenericServicePage magazine shell or stay custom with shared section components
- [ ] Asset production method (commissioned illustration vs photo composite vs vector) — pick one system for all subject pages

## Explicitly deferred (do not build now)

- Hero corner imagery (clouds/data center exemplar and subject-matched siblings)
- Left/right magazine image columns down the page
- New illustration/asset generation pipeline
- Restyling `GenericServicePage` into a magazine layout
- Mega-menu / Solutions IA restructure

**When DE is ready for the visual pass:** implement against this brief — hero right-corner subject art + alternating L/R sections driven by the locked beats above.
