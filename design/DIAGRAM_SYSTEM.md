# Diagram system

Diagram grammar for Visual System v2. Parent: `VISUAL_SYSTEM_V2.md`. Evidence rules: `VISUAL_EVIDENCE.md`. Chrome: `HUD_CHROME.md`.

Purpose: one vocabulary for coverage, ecosystem, identity, assessment, and incident explanation — so every agent does not invent a new node-and-glow language.

**Primitives are documented here. They are not built.** Implementation is VIS-004. Flagship diagrams (VIS-005, VIS-006) depend on that vocabulary. Do not treat `HUDFrame` as a diagram system.

Existing `ProActiveCoverageMap` (`client/src/components/pricing/ProActiveCoverageMap.tsx`) is a pricing control mapped to real package inclusions. Do not restyle it into a SOC terminal. Future Protection Coverage (VIS-005) should reconcile with this grammar rather than forking a third diagram style.

---

## Job of a DE diagram

A diagram exists so a visitor can **understand a structure**: what is covered, what sits inside what, where a control lives, what happens next.

It is not:

- a hero illustration
- a substitute for pricing truth
- live telemetry (unless classified LIVE and actually live)
- decoration behind a heading

Prefer the evidence hierarchy: if a real artifact or real data would do the job better, use that.

---

## Classification

Diagrams that depict operations, incidents, or measured state follow `VISUAL_EVIDENCE.md`:

- Package coverage mapped to canonical inclusions → factual product explanation (not LIVE telemetry)
- Incident sequence → **EXAMPLE** unless SANITIZED REAL
- Portal topology with dummy names → **EXAMPLE** or **SANITIZED REAL**
- Live feed visualization → **LIVE** only with a real source

Never label a diagram LIVE because it looks technical.

---

## Future primitives (VIS-004 — do not implement in this PR)

Do **not** create `DiagramPrimitives.tsx` until VIS-004 is owned.

| Primitive | Role |
|-----------|------|
| `DiagramNode` | Named capability, domain, or system. Space Grotesk or Inter label; optional Oxanium ID |
| `DiagramEdge` | Directed or undirected relationship. Hairline. No neon pipes |
| `SecurityBoundary` | Enclosure (identity plane, network, tenant). Hairline + optional muted fill of the **chapter field**, never violet wash |
| `ControlGate` | Explicit control point (MFA, backup, review). Must correspond to a real DE control or be labeled EXAMPLE |
| `RiskMarker` | Residual risk or gap. Not a scare icon. No invented scores |
| `StatusMarker` | Uses StatusToken semantics (`HUD_CHROME.md`) |
| `TelemetryLabel` | Tiny Oxanium caption. LIVE / SANITIZED REAL / EXAMPLE / ILLUSTRATIVE as required |

Shared layout tokens: existing radius, `--de-hairline`, `--de-bg` / `--de-raised` / `--de-paper`. Magenta for selected / active / CTA-adjacent emphasis only.

---

## Grammar

### Nodes

- One idea per node. Do not cram a paragraph inside a node.
- Canonical ProActive names stay **IT / Office / Business / Enterprise**. Do not rename or merge (`.cursorrules` §17).
- Small cards beside a diagram still use `IconWell` if they are offers, not nodes.

### Edges

- Hairline, not glow tubes
- Direction only when sequence matters (`ASSESS → REMEDIATE → VERIFY`)
- Do not animate packets around the graph unless motion communicates state (`MOTION_LANGUAGE.md`)

### Boundaries

- One primary boundary per view when possible
- Nested boundaries must remain readable at 390px (stack or simplify; do not shrink a 12-box mesh)

### Density

- If everything is a node, nothing is
- Prefer 5–9 nodes on marketing diagrams
- Detail belongs on supporting pages, not the homepage (`.cursorrules` §14)

---

## Flagship diagrams (later sprints — do not build here)

| Asset | Task | Notes |
|-------|------|-------|
| DE Protection Coverage | VIS-005 | Depends on VIS-001 + VIS-002. Must match real package inclusions |
| ProActive Ecosystem | VIS-006 | Depends on VIS-004. Preserve ecosystem vs standalone vs co-managed vs assessments |
| IncidentFlow | VIS-008 | EXAMPLE by default. **Not** `SimulatedIncidentResponseCard` |
| Protection Command Deck | VIS-009 | Layer 5 interactive surface; depends on VIS-005 |

---

## Do

- Map nodes to real services, domains, or documented architecture
- Reuse primitives once they exist; do not fork per page
- Keep HUDFrame around the diagram, not inside every node
- Test 390 / 768 / 1440: labels must remain readable; tap targets if interactive ~44px

## Do not

- Invent a new color per node (Store category pills are Store-only)
- Use gold numerals, OpenMSP yellow, or Huntress as a palette
- Draw hoodie-hacker / shield-padlock diagrams (`IMAGERY.md`)
- Imply live Arizona telemetry
- Start independent HUD grids “to make the diagram feel technical”

---

## Related

- Coverage data: `client/src/lib/proactiveCoverage.ts`
- Imagery concept-not-noun: `IMAGERY.md`
- Task: VIS-004 in `docs/SITE-VISUAL-TASKS.md`
