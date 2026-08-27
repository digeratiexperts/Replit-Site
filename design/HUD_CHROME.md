# HUD chrome

Layer 2 of Visual System v2. Parent: `VISUAL_SYSTEM_V2.md`. Tokens: `DESIGN_SYSTEM.md`. Field recipe: `.cursor/rules/dark-field-accent-pop.mdc`.

**HUD chrome is metadata and framing, not decoration.**

Technical HUD elements are restrained precision details, not a cyberpunk theme. Huntress-like ticks are allowed only as a **controlled upper layer** on DE graphite — never as a site-wide skin.

**Do not add HUD ticks independently.** Vocabulary first. `HUDFrame`, `StatusToken`, and `ProofChip` already exist at `client/src/components/evidence/` (`87e2858` on `main`). Do not fork them. Do not spray `+` marks or `.de-hud-card` across homepage, Store, or DE Desk. Visual review of the landed chrome is VIS-003 — VIS-001 does not restyle those files.

---

## Where allowed

Use primarily on:

- evidence modules (`VISUAL_EVIDENCE.md`)
- diagrams (`DIAGRAM_SYSTEM.md`)
- operational visualizations
- coverage displays
- security telemetry
- Store technical product media (`PRODUCT_MEDIA.md`)

## Where forbidden

Do **not** use on:

- ordinary FAQ
- forms
- long prose
- testimonials
- editorial paper sections (Trust, FAQ, Journal article body)
- MegaMenu / sticky nav
- DE Desk (`ZohoASAPWidget.tsx`) unless a later ledger row explicitly assigns it
- every card, every section, every IconWell

---

## Yes / no

| Yes | No |
|-----|----|
| Tiny corner ticks (two controlled marks, not four competing ornaments) | Every card having `+` signs |
| Alignment markers | Every section looking like a SOC terminal |
| Subtle crosshair intersections | Endless grids |
| Understated grid / dot matrix (low contrast, large pitch) | Neon outlines |
| Small section IDs (`SEC-03`, `EVD-01`) in Oxanium | Sci-fi screen decoration |
| Tiny telemetry labels (`LAST VERIFIED`, `MONITORING / ACTIVE`) | Glow blooms, scanlines, hex overlays, “hacker” bezels |
| Precision rulers / lines (hairline `--de-hairline`) | Purple-filled HUD panels |

---

## HUDFrame / TechnicalFrame

Path: `client/src/components/evidence/HUDFrame.tsx`. Also CSS: `.de-hud-card`, `.de-grid-matrix` in `client/src/index.css`. Do not create a second frame.

| Property | Contract |
|----------|----------|
| Stroke | 1px `--de-hairline` (`rgba(255,255,255,0.1)` on dark; paper hairline on paper) |
| Corners | **Two** controlled corner marks (typically top-start + bottom-end, or top-start + top-end). Not eight. Not `+` on every corner |
| Fill | None, or the chapter field (`--de-bg` / `--de-raised` / `--de-paper`). No decorative fill, no violet wash, no glassmorphism recipe |
| Glow | None. No giant glow. No neon. Landed `accentBorder` adds magenta shadow — keep **off** unless a selected command-deck state needs it |
| ID | Optional Oxanium technical ID, small, muted |
| Radius | Existing tokens (`rounded-xl` / `rounded-2xl`). Do not invent a “tactical” radius |
| Role | Frame for evidence / diagram / coverage — **not a normal card** |

Small functional cards keep `IconWell`. Do not wrap IconWell cards in HUDFrame.

---

## StatusToken

Path: `client/src/components/evidence/StatusToken.tsx`. Landed `active` currently uses emerald + glow. Contract below is the governance rule; reconcile in VIS-003 visual review, not by rewriting in VIS-001.

| Token | Meaning | Color |
|-------|---------|-------|
| `active` | Process or control is on, and that fact is true | Magenta `#D3126A` for brand/action; do not invent “active” |
| `verified` | Checked, attested, or last-verified at a real time | Neutral + optional emerald **only when genuinely healthy/live** |
| `attention` | Needs a decision or follow-up | Restrained warning; not alarmist red on marketing pages unless LIVE severity requires it |
| `informational` | Metadata, not a health claim | Muted white / paper ink |

**Emerald only when genuinely healthy/live.** Do not paint EXAMPLE incidents green. Magenta remains brand/action — not a health light.

Copy is Oxanium or small Inter. Never a fake pulse animation on EXAMPLE content.

---

## Tactical labels (Layer 3)

Oxanium examples (structure, not prescribed copy):

- `01 / IDENTITY`
- `MONITORING / ACTIVE`
- `ASSESS → REMEDIATE → VERIFY`
- `LAST VERIFIED`

Any numeric payload (`RISK / 72`) must be LIVE, SANITIZED REAL, or labeled EXAMPLE / ILLUSTRATIVE.

Space Grotesk remains presentation. Inter remains reading/UI. Oxanium is not a second body font.

---

## Atmosphere vs HUD (Layer 1 vs 2)

Layer 1 (grain, restrained matrices, environmental plates, controlled violet illumination) is **environment**. It may exist in the hero and selected chapters.

Layer 2 is **chrome on modules**. Do not turn Layer 1 into a full-page grid, and do not turn Layer 2 into atmosphere.

Existing electric atmosphere on Store stays Store-specific. Do not import Store electric glow into marketing HUD.

---

## Reduced motion

HUD ticks do not animate by default. If a live status requires motion, follow `MOTION_LANGUAGE.md` and `prefers-reduced-motion`. No looping scanlines.

---

## Related

- Evidence classification: `VISUAL_EVIDENCE.md`
- Diagrams: `DIAGRAM_SYSTEM.md`
- Motion: `MOTION_LANGUAGE.md`
- Task: VIS-003 in `docs/SITE-VISUAL-TASKS.md`
