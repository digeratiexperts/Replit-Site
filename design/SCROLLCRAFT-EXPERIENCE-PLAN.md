# Digerati Experts Scrollcraft Experience Plan

**Status:** owner-approved planning basis; **not** authorization for further implementation or release work  
**Planning owner:** ChatGPT (issue #174)  
**Planning began:** `main @ 7c78dae14dfac7675c7a760f29eaaa652967cc3f`  
**Reconciled with:** `main @ 1edee66466fb7f2ab75166e76b15afd38cda3fb3` (PR #173 merged concurrently during this planning task)  
**Applies to:** public DE website experience strategy, Scrollcraft use, material production, and the boundary between cinematic storytelling and ordinary/utility UX.

> **Core rule:** Scrollcraft is a storytelling capability, not a visual theme. DE must look like DE whether a page uses Scrollcraft or not.

---

## 1. Decision summary

The current Scrollcraft work proves that scroll-led storytelling can fit DE. It does **not** establish the finished site-wide design system.

The next phase is therefore **not** “apply Scrollcraft everywhere.” It is:

1. classify every route by how much storytelling it actually needs;
2. define what each important experience must make the visitor understand, feel, and do;
3. plan the material set before coding;
4. decide which materials are real, captured, created, generated, diagrammed, or licensed;
5. design each flagship with a different interaction grammar so the site does not repeat one trick;
6. preserve the existing DE brand foundation and utility UX;
7. build/refine one flagship to a very high standard before propagating anything.

### Current production-state note

While this document was being produced, PR #173 merged and changed `main` so Version B is the homepage release lane, with the previous SPA homepage preserved at `/classic`. That concurrent merge changes the **current state**, not the design conclusion:

- the Version B experience now on the homepage is a **valuable production/reference implementation**, not automatic final design authority;
- `/classic`, `/v2`, the Version B source/brief, and the ProActive amplification should all be treated as comparative evidence during the material/design review;
- this plan does not authorize additional Scrollcraft propagation, consolidation, or new production redesign work;
- before the next design/build step, the material board and creative brief for that route must be approved.

---

## 2. Design doctrine

### 2.1 What DE is building

A **Digerati Experts digital experience system** with four experience levels:

| Level | Name | Purpose | Scrollcraft policy |
|---|---|---|---|
| **A** | Flagship narrative | Change how the visitor understands DE or a major DE operating model | Bespoke/full Scrollcraft allowed |
| **B** | Guided explanation | Explain a complex system, process, risk, or business transformation | Selective Scrollcraft: usually 1–3 meaningful sequences |
| **C** | Editorial / normal marketing | Read, compare, evaluate, browse | Normal DE design; restrained motion only |
| **D** | Utility / transactional | Complete a task quickly and correctly | No Scrollcraft; functional feedback only |

The correct target is **one design intelligence, multiple experience grammars**.

### 2.2 Existing DE identity remains the foundation

Do not redesign the locked Layer 0 foundation:

- Midnight Obsidian / graphite `#050312`
- Warm Paper `#F7F5F2`
- Electric Magenta `#D3126A`
- violet as restrained illumination, not panel paint
- Space Grotesk for presentation
- Inter for reading/UI
- Oxanium for tactical metadata
- Store electric blue remains Store-specific
- Journal amber remains Journal-specific

Scrollcraft consumes these rules. It does not replace them.

### 2.3 Evidence before decoration

Use the existing Visual System v2 evidence order:

**real artifact → real data → real person → explanatory diagram → sanitized interface → illustrative scenario → editorial photography → atmospheric environment → icon**

A beautiful abstract plate is not stronger evidence than a real DE product, real report, real human, or precise explanatory diagram.

### 2.4 The “too much” rule

More motion is not automatically more premium.

A page should earn Scrollcraft by needing one or more of these:

- sequence matters to comprehension;
- a before/after state is difficult to explain statically;
- a system relationship becomes clearer through progressive assembly;
- the emotional journey materially affects conversion/trust;
- the page has a genuine signature behavior worth remembering.

If none apply, use normal DE design.

---

## 3. Site route / archetype inventory

The current router mixes public marketing, publishing, commerce, support, legal, location, pricing tools, portal, and admin surfaces. Classification is by **experience requirement**, not by whether Scrollcraft is technically possible.

### 3.1 Flagship / Level A

| Route / family | Level | Direction |
|---|---:|---|
| `/` | **A** | Current Version B production homepage is a reference baseline, not a locked final. Final flagship should be curated/redesigned from the strongest production + Version B ideas after the material-board process. |
| `/solutions/proactive-ecosystem` | **A** | Major operating-model story. Keep its strategic value but give it a grammar distinct from the homepage. |
| future “How We Protect” flagship destination / strongest security story | **A** | Layered protection as a system, not a SOC-wall aesthetic. May reuse content from current protection/security pages but should have its own experience. |
| Cyber Risk Assessment experience (commercial journey around `/book`, assessment content, and proof) | **A/B** | The assessment itself deserves a guided transformation story; the booking form does not. Build narrative before the utility handoff. |

### 3.2 Selective / Level B

| Route / family | Level | Direction |
|---|---:|---|
| `/solutions` | **B** | Orientation first. One strong systems-landscape moment; browsing must remain fast. |
| `/solutions/managed-it-support` | **B/C** | One meaningful “support becomes an operated system” explanatory moment; otherwise readable marketing. |
| `/solutions/managed-workplace` | **B** | Employee lifecycle can benefit from a single orchestration sequence. |
| `/solutions/backup-disaster-recovery` | **B** | Backup → verification → recovery is inherently sequential. One strong continuity/recovery sequence. |
| `/solutions/co-managed-it` | **B** | Shared responsibility / two operating teams on one spine; one explanatory sequence. |
| `/solutions/proactive-{it,office,business,enterprise}-ecosystem` | **B/C** | Do **not** create four mini cinematic sites. Use a shared normal archetype plus selective differentiation where it explains fit. |
| dynamic `/solutions/:service` (`servicePageData`) | **B/C** | Default C. Upgrade to B only when the subject has a real process/system transformation worth explaining. |
| `/services/ucaas` | **B/C** | Communication flow can justify one sequence; avoid spectacle. |
| `/industries` | **B** | Industry landscape / pressures can have one strong orienting interaction. |
| each `/industries/*` page | **B/C** | One industry-specific visual explanation, then normal editorial content. No 14-viewport cinematic clone per vertical. |
| `/resources/cyber-facts` | **B** | Data storytelling can use restrained sequencing and source visibility. |
| `/resources/security-updates` | **B/C** | Editorial motion only if it clarifies chronology/severity. |
| `/resources/ebook/defending-digital-realm` | **B/C** | Publication-like experience; selective narrative transitions allowed. |
| `/about/mission-values` | **B/C** | One editorial movement around independence, competence, accountability; mostly type + proof. |
| `/about/team` | **B/C** | Human-first; photography and evidence outrank motion. |
| `/about/21-questions` | **B/C** | Could use progressive editorial pacing, not a heavy experience. |
| `/trust/trust-center` | **B/C** | Trust is documentary. One explanatory overview is acceptable; evidence remains static/inspectable. |
| `/proactive-ecosystem-pricing`, `/pricing` | **B/C** | A brief operating-model orientation can precede the calculator/matrix. The pricing tool itself stays utility-like. |
| `/ecosystem-pricing`, `/de-ecosystem-matrix-offical`, `/official-network-planner` | **B/D** | Explanatory shell may use selective motion; interactive tool itself is utility and must remain precise. |

### 3.3 Normal editorial / Level C

Default Level C unless a future brief proves Level B is needed:

- `/resources`
- `/resources/case-studies`
- `/resources/case-studies/:slug`
- `/resources/blog`
- `/resources/blog/:slug`
- `/resources/videos`
- `/resources/security-checklist`
- `/resources/datasheets`
- `/about/compliance`
- `/about/insurance`
- `/about/compliance-certifications`
- `/about/client-bill-of-rights`
- `/about/guarantee`
- `/about/press`
- location pages `/locations/{chandler,phoenix,mesa,gilbert,tempe,scottsdale}-az`
- ordinary generic industry/service pages where sequence adds no real comprehension

These pages can use polished DE entrances, section transitions, diagram micro-animation, and state feedback without mounting a full Scrollcraft runtime.

### 3.4 Utility / Level D — no Scrollcraft

These routes optimize for task completion, clarity, security, speed, and accessibility:

**Commerce / conversion utilities**

- `/store/solution`
- `/store/checkout`
- `/solutions/request`
- `/quote-wizard`
- `/quote-confirmation`
- `/thank-you-success-page`
- `/book` (the form/booking utility itself)
- `/contact` (ordinary contact utility; can be beautiful, should be quiet)

**Support**

- `/support/submit-ticket`
- `/support/ticket-confirmation`
- `/support/knowledge-base`
- `/support/remote-support`
- `/support/pay-invoice`
- dynamic `/support/:service`

**Legal / trust utility**

- `/legal/privacy-policy`
- `/legal/terms-of-use`
- `/legal/msa`
- `/legal/sla`
- `/legal/aup`
- `/legal/dpa`
- `/legal/sample-sow`
- `/trust/vulnerability-disclosure`
- `/trust/accessibility`

**Portal / authenticated product**

- all `/portal/*` routes including login/signup/reset, dashboard, tickets, services, files, invoices, orders, KB, status, learning, chat/agent, settings, billing, company, ship-center, procurement/marketplace, forms/surveys/approvals/people/infrastructure/VPN/Cytracom/questionnaires, contracts, order form, sales process, roadmap, QBR, and admin routes.

**Internal**

- `/internal/warehouse/*`

These surfaces may use motion for functional state feedback only. No pinned storytelling, no cinematic takeover, no scroll-jacking.

---

## 4. Current Scrollcraft audit — keep / redesign / reject

### 4.1 Keep and evolve

These are strategically strong and should survive in concept:

1. **Story-first planning** — interview, feeling curve, peak, authored silence, and tell-someone sentence before implementation.
2. **“The Environment Wakes Up”** — the core idea that disconnected business technology becomes one operated environment remains powerful.
3. **Outcome-driven exploration** — “protect / productivity / automate / compliance” is stronger than exposing technology categories first.
4. **Authored silence** — deliberate quiet before/after a major moment increases perceived quality.
5. **One dominant peak** — a page should have hierarchy, not constant intensity.
6. **Reduced-motion equivalence** — same meaning, less travel.
7. **Real DE proof** — DE Desk, actual product surfaces, real founder/place photography, real assessment/report artifacts.
8. **Scrollcraft verification discipline** — contact sheets, mobile/tablet/desktop, contrast, dead-scroll detection, cue validation.
9. **Quiet-tier philosophy** — FAQ/contact/legal/workhorse pages should remain calm and direct.

### 4.2 Redesign before broader use

1. **Graphite Illumination as a primary visual language**  
   Keep selected plates only if they materially support a scene. Do not let abstract graphite/violet textures become the answer to every visual need.

2. **The technology-map drawing language**  
   The concept is strong; the execution should become a more sophisticated DE diagram language usable both statically and in motion.

3. **Margin folio / live map**  
   It is already used by both recorded builds. Do not treat it as the default Scrollcraft navigation/signature.

4. **Chaptered editorial as default grammar**  
   The fingerprint registry records a collision between `de-v2` and `proactive-ecosystem-amplify`. Future flagship builds must deliberately choose different grammars/signature behavior.

5. **Material hierarchy**  
   A major scene should not be carried by decorative texture when real evidence, a real person, or a bespoke explanatory graphic is available.

6. **Mobile composition**  
   Mobile must be art-directed as its own composition, not just compressed desktop chapters/ribbons.

7. **Transition into/out of ordinary DE site chrome**  
   Scrollcraft moments should feel native to the DE site. The visitor should not feel they entered a separate microsite and then fell back into a template.

### 4.3 Reject as site-wide patterns

- copying the exact Version B page grammar across the site;
- repeating “scattered map → assembled map” as every flagship’s signature;
- using abstract generated textures as proof;
- fake telemetry / fake incident data / simulated customer dashboards that read as live;
- generated faces presented as DE employees/customers;
- Scrollcraft on forms, checkout, portal, legal, FAQ, support workflows;
- gratuitous full-screen pinning because the engine supports it;
- decorative HUD/technical chrome on every card/section;
- literal AI clichés: robots, glowing brains, generic circuitry, cyberpunk neon.

---

## 5. Material system

Every Level A/B build gets an **asset requirement board before code**.

### 5.1 Material classes

| Class | What it is | Default source | Rule |
|---|---|---|---|
| **A. Real DE evidence** | product UI, assessment pages, roadmaps, diagrams, reports, real operational artifacts | capture from DE systems / existing repository | Highest-value material. Sanitize/classify where required. |
| **B. Real people & place** | founder, team, Chandler/Phoenix, actual work environments | DE photography / licensed documentary photography | No generated humans impersonating DE people/customers. |
| **C. Bespoke explanatory graphics** | architecture, workflows, protection boundaries, continuity, lifecycle, orchestration | create in code/vector/canvas | Major opportunity for a proprietary DE visual language. |
| **D. Art-directed atmospheric imagery** | fragmentation, connection, boundary, continuity, intelligence, orchestration | create as a planned set; generation/compositing allowed with provenance | Concept-not-noun. Supports meaning; never substitutes for evidence. |
| **E. Sourced/licensed editorial imagery** | Arizona environment, business context, architectural details | find/license selectively | Use only when reality is stronger than generation; keep one coherent art direction. |

### 5.2 Create vs. find rule

**Create** when the asset communicates a DE-specific concept or system:

- DE technology architecture
- outcome-to-domain relationships
- assessment process
- protection boundaries
- operating cadence
- business workflow orchestration
- continuity / recovery state changes
- ProActive model relationships

**Capture** when the evidence already exists:

- DE Desk
- portal/product surfaces that are safe for public use
- assessment deliverables
- roadmap/report samples
- marketplace/solution-builder surfaces where appropriate

**Photograph** when human accountability or place matters:

- founder/team
- Chandler / Phoenix
- real office/workbench/environment
- real deployment/engineering context where client/privacy rules allow

**Find/license** when a real environmental/documentary image is stronger and consistent with the art direction.

**Generate** only for illustrative/atmospheric material that cannot be better represented by real evidence. Generate as a coherent set, not ad hoc one-offs.

### 5.3 Proposed DE material family

A future planned still/visual set should explore these concepts as one coherent art direction:

- **Fragmentation** — isolated systems, broken continuity, competing boundaries
- **Connection** — controlled relationships forming
- **Boundary** — protected zones / trust transitions
- **Continuity** — resilient layers / recoverable state
- **Orchestration** — multiple systems moving as one workflow
- **Intelligence** — observation → interpretation → action, without “AI brain” clichés
- **Recovery** — damaged state returning to known-good operation
- **Human oversight** — the accountable human layer over automation

Shared direction: graphite/gunmetal/smoked materials, physical depth, controlled violet illumination, precise negative space, cinematic but not cyberpunk.

---

## 6. Required asset board template

No Level A/B route begins coding until this table exists and is approved.

| Scene | Visitor must understand/believe | Primary material | Source | Motion purpose | Mobile form | Status |
|---|---|---|---|---|---|---|
| Example | “My environment is fragmented.” | explanatory diagram + atmospheric ground | create | expose relationships over time | simplified stacked relationship view | planned |

For each asset also record:

- evidence classification: LIVE / SANITIZED REAL / EXAMPLE / ILLUSTRATIVE;
- owner/licensing/provenance;
- final aspect ratios/crops (desktop/tablet/mobile);
- whether typography must occupy negative space;
- static/reduced-motion fallback;
- performance budget;
- whether it belongs to a reusable DE visual family or only one page.

---

## 7. First four flagship creative briefs

These are planning briefs, not implementation specs. Each still requires a full Scrollcraft interview/score/material board before build.

### 7.1 Flagship 1 — Homepage

**Job:** explain DE’s identity and operating philosophy while making the visitor see their own fragmented environment differently.

**Before:** “This is another MSP/security company.”  
**After:** “DE makes all the technology my business depends on operate as one system; I want them to look at mine.”

**Current baseline:** Version B now serves the homepage through the #173 release path; the prior SPA homepage remains `/classic`. Both are inputs to the redesign/material review.

**Story spine:**

1. quiet arrival / conviction;
2. recognize the fragmented reality;
3. stakes, sourced and honest;
4. one major transformation peak;
5. outcomes the buyer actually wants;
6. who this is for / client pressures;
7. breadth beyond conventional MSP work;
8. real proof;
9. human/local accountability;
10. quiet assessment close.

**Signature move target:** retain the strategic idea of the environment becoming coherent, but redesign its visual language and behavior. It must not simply replay the existing `de-v2` map.

**Material requirements:**

- new bespoke DE environment architecture graphic;
- real DE product/assessment evidence;
- founder/team + Arizona photography;
- sourced industry facts with citations;
- one coherent atmospheric art set where real evidence is not the right material;
- industry/client-profile editorial material;
- final CTA tied to the Cyber Risk Assessment.

**Existing site integration:** the best prior SPA homepage content and the strongest Version B story material should be preserved/elevated, not discarded merely because one version is currently mounted at `/`. Navigation, conversion paths, SEO, accessibility, site footer/chrome, and product links remain canonical DE systems.

**Avoid:** constant animation, multiple competing peaks, generic “AI/cyber” imagery, dashboard cosplay, turning every section into a full viewport.

---

### 7.2 Flagship 2 — ProActive Ecosystem

**Job:** make “ProActive” understandable as an operating model, not a package list.

**Before:** “This is a bundle of managed IT/security services.”  
**After:** “DE continuously observes, decides, protects, maintains, and improves the environment on a cadence.”

**Different grammar from homepage:** no chaptered-editorial + margin-map repeat.

**Proposed experience concept:** **Operating Cadence**.

A business environment persists while time/cadence and operational responsibility change around it:

- assess baseline;
- standardize;
- observe;
- protect;
- maintain;
- improve;
- review / roadmap.

The visitor sees not just *what* DE covers, but **when and why the operating motions occur**.

**Material requirements:**

- cadence timeline/state model;
- static + motion-ready diagram primitives;
- real assessment/roadmap/QBR artifacts;
- canonical IT/Office/Business/Enterprise fit model;
- security/identity/endpoint/network/backup/workplace relationships;
- selective real interface/product evidence.

**Interaction target:** visitor can change business context/priority and see how the operating cadence and responsibilities adapt, without presenting fake telemetry.

**Avoid:** another accumulating margin map; another scattered-to-assembled peak; turning pricing figures into animated “truth claims.”

---

### 7.3 Flagship 3 — How DE Protects

**Job:** explain that security is a property of the operating environment, not a pile of products.

**Before:** “They sell security tools.”  
**After:** “Protection exists across identity, endpoints, email, network, backup, and operations, and those controls reinforce each other.”

**Proposed experience concept:** **Layered Boundary / Attack Path**.

Start with an ordinary business action (sign in, open email, use SaaS, work remotely, access data). Progressively expose the protection boundaries and decisions around that action.

The peak is not a threat explosion. The peak is **the moment the visitor sees that an attack path crosses multiple domains and DE closes the path as a system**.

**Material requirements:**

- bespoke security-boundary diagram grammar;
- real/sanitized security evidence where available;
- sourced threat facts where context is useful;
- EXAMPLE attack-path sequence clearly labeled as illustrative;
- no invented mean-time-to-contain or fake live SOC metrics;
- real DE human-response/accountability material.

**Motion purpose:** reveal dependencies and decision points that are hard to see in a static feature grid.

**Avoid:** green/red SOC wall, Matrix code, fake terminals, endless alert particles, generic shields/padlocks.

---

### 7.4 Flagship 4 — Cyber Risk Assessment

**Job:** make the assessment feel like a concrete, valuable diagnostic process rather than a lead form.

**Before:** “They want me to book a sales call.”  
**After:** “They will inspect my environment, show me what matters, prioritize it, and give me a useful roadmap.”

**Proposed experience concept:** **Unknown → Observed → Prioritized → Roadmapped**.

Narrative sequence:

1. unknown environment / blind spots;
2. what DE inspects;
3. evidence becomes findings;
4. findings receive business-impact context;
5. priorities become an ordered roadmap;
6. handoff to booking.

**Material requirements:**

- real/sanitized assessment sample;
- real report/scorecard/roadmap structure;
- bespoke diagnostic overlay/annotation system;
- examples of finding prioritization without using fabricated customer data;
- real explanation of what DE does/does not inspect;
- a quiet booking handoff.

**Important boundary:** Scrollcraft ends before the actual booking form. `/book` remains a utility surface.

---

## 8. Next-wave candidates after the first four

### Automation + AI

Likely **A/B** and worthy of a distinct grammar after the first flagship proves the process.

Potential signature concept: **manual handoffs collapse into an orchestrated business workflow with human oversight**.

Use process/state choreography, not robot/brain art.

### Industries

Use one reusable editorial archetype with one bespoke industry pressure visualization per vertical. Do not build a completely unique cinematic site for each industry.

### Trust / proof

Mostly documentary. Strong material curation, evidence frames, reports, people, certifications, policies, and real proof. Minimal motion.

---

## 9. What needs redesign in the existing site

### 9.1 Keep

- Layer 0 brand palette/type;
- global navigation hierarchy unless a specific flagship brief proves a better temporary chapter navigator;
- Store and Journal scoped color identities;
- forms and transactional flows;
- evidence truthfulness/classification;
- accessibility foundations;
- real product/portal/support surfaces;
- canonical conversion routes.

### 9.2 Add / improve

#### A. Page archetypes

Formalize reusable site archetypes:

1. **Flagship Story**
2. **Guided Solution**
3. **Industry Editorial**
4. **Evidence / Trust**
5. **Utility**
6. **Commerce**
7. **Publication**

A route chooses an archetype before visual treatment begins.

#### B. DE diagram language

This should become one of the strongest brand signatures.

Needed primitives/grammar:

- system/domain node;
- relationship/flow edge;
- trust/security boundary;
- control gate;
- risk/finding marker;
- status/proof marker;
- lifecycle/cadence marker;
- human accountability node;
- evidence annotation;
- responsive simplification rules.

The same language should work:

- statically on ordinary pages;
- interactively in guided pages;
- choreographed inside Scrollcraft.

#### C. Large visual stages

Add better reusable large-scale layouts so important material can breathe without being trapped in rounded cards.

Examples:

- full-bleed technical figure + editorial copy;
- paper/graphite split spread;
- evidence-stage with real artifact;
- diagram stage with metadata rail;
- photography stage with restrained caption/proof;
- comparison stage that does not look like a SaaS pricing grid.

#### D. Material registry / provenance

Every flagship material needs a documented source/classification and intended placements. Assets should be produced as families, not isolated one-offs.

#### E. Motion language boundaries

Motion must encode:

- state change;
- hierarchy;
- continuity;
- causality;
- feedback.

Motion must not exist solely to prove that something can animate.

---

## 10. Motion budget policy

### Level A — Full flagship

Maximum by default:

- **1 signature behavior**;
- **1 dominant peak**;
- **2–4 supporting motion families**;
- deliberate static/quiet chapters;
- no repeated lead device in adjacent major scenes;
- reduced-motion version carries identical meaning.

### Level B — Guided

Maximum by default:

- **1 meaningful scroll sequence**;
- **1 secondary reveal/state system**;
- rest is normal document flow.

### Level C — Normal

Only:

- entrances where useful;
- small section transitions;
- diagram/state micro-animation;
- interaction feedback.

### Level D — Utility

Only functional UI feedback.

No scroll-jacking, no pinned narrative, no decorative parallax.

---

## 11. Technical integration principles

This plan is design-led, but implementation must preserve the site as an application.

1. **Progressive enhancement** — core content remains understandable without Scrollcraft.
2. **Route-level loading** — Scrollcraft code/assets load only on opted-in A/B routes.
3. **No global side effects** — scoped CSS, scoped event handlers, clean teardown.
4. **Existing DE components remain canonical** for navigation, CTA, forms, evidence classifications, Store/Journal scopes, and utility UI.
5. **Reduced motion is first-class**, not an afterthought.
6. **Mobile gets a designed composition**, not a desktop simulation squeezed into 390px.
7. **Truth claims stay static/accurate** — prices, SLAs, metrics, dates, and evidence cannot animate through false intermediate values.
8. **SEO/document semantics survive** — headings/content remain accessible and crawlable.
9. **Performance budget is part of art direction** — do not ship huge video/3D payloads simply because they look impressive in a lab.
10. **No new generic Scrollcraft wrapper across every page.** Each A/B page earns and owns its choreography.

---

## 12. Production process / gates

### Phase 0 — Inventory / showroom

Compare the rendered surfaces now available:

- current `/` Version B release;
- `/classic` prior SPA homepage;
- `/v2` reference path where retained;
- ProActive Scrollcraft amplification;
- Scrollcraft QA/contact sheets, briefs, fingerprint registry, generated plates, and quiet-tier pages.

The goal is to decide from rendered evidence, not memory.

### Phase 1 — Experience map

- finish route classification (`A/B/C/D`);
- verify dynamic service/industry routes against their actual content;
- identify any route whose classification needs promotion/demotion.

**Deliverable:** approved route matrix.

### Phase 2 — Creative direction

For each Level A route:

- visitor before/after belief;
- story spine;
- energy curve;
- signature move;
- peak;
- authored silence;
- material board;
- mobile interpretation;
- reduced-motion interpretation.

**No code.**

### Phase 3 — Material production

Create/capture/find essential assets before implementation.

Gate question:

> If all motion were removed, would this material board already look like a premium, coherent DE campaign and explain the story?

If no, do not code yet.

### Phase 4 — Motion storyboard

Storyboard key states and transitions:

- what is visible at entry;
- what changes and why;
- what is held;
- what exits;
- how the next section receives the state;
- mobile/reduced variants.

### Phase 5 — Build/refine one flagship

**Homepage first**, after its material board is approved.

Do not build four flagships concurrently.

Because Version B is already serving as the homepage release lane after #173, “build homepage first” now means **evaluate and refine/replace deliberately from that baseline**, not blindly start a third unrelated homepage.

### Phase 6 — Extract primitives

Extract only genuinely reusable **DE primitives**:

- diagram primitives;
- evidence stages;
- media stages;
- motion/state utilities.

Do **not** extract a reusable homepage choreography and spray it across other pages.

### Phase 7 — Selective propagation

Recommended order:

1. Homepage
2. ProActive Ecosystem
3. How DE Protects
4. Cyber Risk Assessment
5. Automation + AI
6. Industries selective layer
7. Trust/proof refinement
8. other solution pages only when a specific brief proves Scrollcraft is useful

---

## 13. Acceptance criteria

A flagship is not accepted because it “looks cool.”

It must pass all of these:

### Story

- the visitor can state what changed in their understanding;
- one moment is clearly the peak;
- signature behavior is memorable and tied to the argument;
- quiet sections exist;
- content and customer journey remain primary.

### Material quality

- every major visual has a reason to exist;
- evidence outranks decoration;
- generated/illustrative work is coherent, provenance-aware, and not generic AI art;
- typography and imagery have intentional negative-space relationships;
- materials still look excellent as static frames.

### Integration

- unmistakably DE, not a Scrollcraft demo;
- Store/Journal/portal boundaries remain intact;
- ordinary site components feel deliberately connected to the experience;
- no duplicated design system.

### UX / accessibility

- 390 / 768 / 1440 authored and reviewed;
- reduced motion retains meaning;
- keyboard/focus/content order remains correct;
- no dead scroll;
- no accidental scroll traps;
- no reading-obstructive motion.

### Engineering

- typecheck/tests/build clean;
- route-level/lazy load where applicable;
- no global CSS/JS leakage;
- performance budgets defined and met;
- latest-main concurrency audit complete;
- `MERGED` and `LIVE` tracked separately.

---

## 14. Immediate next decision package

Before any next flagship implementation, produce the **Homepage Material Board** containing at minimum:

1. **Existing assets worth keeping** — exact files/captures with keep/redesign/reject verdict;
2. **New real evidence needed** — screenshots/reports/assessment/roadmap/product captures;
3. **Photography shot list** — people/place/work details;
4. **Bespoke diagram list** — exact explanatory graphics to author;
5. **Atmospheric art set brief** — only the concepts that actually need illustrative material;
6. **Sourced/licensed imagery search list** — only where external reality is stronger;
7. **Desktop/tablet/mobile crops/compositions**;
8. **static/reduced-motion keyframes**;
9. **provenance/classification for every item**;
10. **one storyboard showing the page before any production code is written**.

Only after the material board is approved should the next implementation/refinement begin.

---

## 15. Final design position

The desired finished site is **not** one giant Scrollcraft experience.

It should feel like a sophisticated publication/product system in which intensity is intentional:

- Homepage — cinematic/editorial flagship
- ProActive — operating cadence/system
- Protection — layered boundaries / attack-path understanding
- Assessment — diagnostic transformation
- Automation + AI — workflow orchestration
- Industries — concise editorial dossiers
- Trust — documentary evidence
- Resources — publication
- Contact/FAQ/legal — beautifully quiet
- Store/checkout/portal/support — precise, fast, functional

**The entire site should share one design intelligence without sharing one visual trick.**
