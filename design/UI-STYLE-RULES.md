# DE UI Style Rules — canonical execution layer

Consolidated rules for **all UI work** on the Digerati Experts site. This document processes the design corpus (`BRAND.md`, `DESIGN_SYSTEM.md`, `UX_PRINCIPLES.md`, `VISUAL_SYSTEM_V2.md`, `.cursor/rules/*`, `design/approved|rejected/`, the 2026-08-30 approved homepage/Ask DE reference) into one place an implementer can follow start-to-finish.

**Authority chain (this doc does not replace it):** root `.cursorrules` (§9A) → `VISUAL_SYSTEM_V2.md` → `BRAND.md` / `DESIGN_SYSTEM.md` / `UX_PRINCIPLES.md` → locked scoped rules (`blog-store-color-lock.mdc`, `dark-field-accent-pop.mdc`, `de-desk-design.mdc`). If anything here conflicts with those, they win — and ask Joe. Joe is final visual authority; rendered quality is an acceptance gate separate from code correctness.

---

## 1. One theme, five surfaces

There is **one** DE theme: graphite wells, warm paper relief, white type, magenta punctuation, violet as light, Space Grotesk / Inter / Oxanium. Each surface expresses it through a scoped **accent channel** (`data-accent` → `--de-accent-rgb` / `--de-accent-ink-rgb`) while keeping the shared ladder, type, and CTA language. That is how sub-themes tie into the whole: **the field and type never change; only the accent channel and density do.**

| Surface | Routes | Accent channel | Expression | Status |
|---|---|---|---|---|
| **A. Homepage (flagship)** | `/` | Violet gradient (hero only) + magenta CTAs | Black precision hero → light trust strip → chapter rhythm. The approved 2026-08 reference look. | Approved 2026-08-30 |
| **B. Site / marketing core** | `/solutions`, `/industries`, `/about`, `/trust`, `/contact`, … | Magenta `#D3126A` | Dark-field chapters + paper relief + one loud band max per page | Locked mechanism |
| **C. Journal (Blog)** | `/resources`, `/case-studies` | Amber (`--de-accent-rgb: 180 83 9`, ink `251 191 36`) | Charcoal masthead ladder, gold "Journal", reading-first | **Color-locked** — do not restyle |
| **D. Store / Door 2** | `/store/*` | Electric (`29 111 242`, ink `111 179 255`) + 14 category pill hues | Task-first builder/catalog; vendor marks keep vendor colors | **Color-locked** — do not restyle |
| **E. Shared chrome** | Sitewide | Neutral black/white + magenta CTA | Black nav + announcement strip, white Ask DE chooser, light Desk, unified bottom bar | Approved 2026-08-30 |

Rules that hold across every surface:
- Primary marketing CTA fill stays magenta `#D3126A` sitewide — including on Journal and Store chrome that is not the page accent.
- Gold `#e7b20d` is the wordmark bars only. Never a CTA, numeral, or fill.
- A sweep or "one theme" pass **skips Blog and Store colors** entirely.
- Portal (`/portal/*`) is out of scope for marketing restyles.

## 2. Foundation tokens (memorize these eight)

| Role | Token | Value | Use |
|---|---|---|---|
| Deep well | `--de-bg` | `#050312` | Page canvas, chapter field, inset cards |
| Marketing field | `--de-surface` | `#0a0a0a` | Adjacent full-bleed dark chapter |
| Raised / style box | `--de-raised` | `#151217` | Contained chapter boxes, panels, chips (max 2–4 boxed chapters/page) |
| Hairline | `--de-hairline` | `rgba(255,255,255,0.1)` | 1px borders, same-chapter seams |
| Paper | `--de-paper` | `#f7f5f2` | Light chapters; cards on paper are `#ffffff` w/ `--de-paper-hairline` |
| Pop | — | `#D3126A` | CTA fill, active border, colon, icon accents, user bubbles |
| Violet | — | `#5B45E0` / `#8B5CF6` / `#A78BFA` | **Lighting only** — glows, gradients-as-light, never a panel/chip/section fill |
| Chrome black | — | `#000` / `#0a0a0a` | Nav bar, announcement strip, utility strip |

Type: **Space Grotesk** headings (600–700, tracking −0.015 to −0.045em, leading ~1.05–1.15); **Inter** body (400, leading 1.6); **Oxanium** for stats/labels/sequence IDs only — never paragraphs. Radius from `--radius` (`rounded-lg/xl/2xl`, `rounded-3xl` for large panels — no one-off radii). Section padding `py-10 md:py-14 lg:py-16`. Touch targets ≥ ~44px. Focus ring pink `#ec4899`, 2px, offset 2. Buttons: `duration-200 ease-out`, `active:scale-[0.98]`; respect `prefers-reduced-motion`; motion communicates state/hierarchy/continuity/feedback — never decoration. **Do not invent new colors, purples, near-blacks, radii, or tracking values — reuse these.**

CSS budget discipline: the entry stylesheet is capped (290KB, `check-bundle-budget.mjs`) and the budget is never raised for a restyle. Reuse existing utility classes; put one-off values in inline styles rather than minting new arbitrary Tailwind classes.

## 3. Accent doctrine — who gets which color

The most common way agents break the theme is accent misuse. The channels:

1. **Magenta `#D3126A` = action + punctuation.** CTAs, active chip borders, statement-heading colons, active underlines, icon accents, the incident rail. It pops **because** the field stays black/charcoal — never dilute it by painting fields warm or saturating cards.
2. **Violet = light, plus one sanctioned text gradient.** Radial glows, rim lighting, the shield line-art, and exactly one text treatment: the homepage hero's gradient line (`#9a8bff → #7b6cff → #d3126a` on "Your Business") and the hero primary button (`#5f4ae8 → #7d5cf4`). Do not spread violet-gradient text or violet buttons to other sections or pages — one controlled accent per the reference, not many.
3. **Amber = Journal identity.** Masthead "Journal", accents on `/resources`. Nothing else goes amber.
4. **Electric blue = Store identity.** Store headline accents, controls, "Your Solution" chrome. The 14 category pill hues stay pill-only (guarded by `categoryAccent.test.ts`) — never card/rail/field fills.
5. **White/black = chrome precision.** Nav, announcement strip, Ask DE chooser, Desk light treatment, launcher circle. No decorative status dots unless they reflect real state; no magenta glow rings on chrome (removed 2026-08-30).

## 4. The best of what we have (match or elevate — never regress)

Analysis of the strongest shipped patterns; `design/approved/` holds the screenshots. New work should read like these:

- **The reference hero** (2026-08): black precision field, 3-line oversized headline with one gradient line, restrained wireframe shield subordinate to copy, dual CTA hierarchy, quiet positioning line (no vendor names — Joe 2026-08-30), clean cut into a light trust strip. This is the ceiling for "premium enterprise cybersecurity."
- **Dark field / accent pop** mechanism: quiet wells → charcoal raised boxes → white type → magenta punctuation. Color reads loud because everything else is disciplined.
- **Paper chapters**: warm `#f7f5f2` islands with white lifted cards give the dark rhythm relief and make long pages breathable ("We Exist to Protect…", Protect, FAQ).
- **The white Ask DE chooser + light Desk**: one clean decision pane (Get Support / Get Help / Client Tools / Give Feedback), focus-trapped, bottom-sheet on mobile — support chrome as precision instrument, not popup soup.
- **IconWell on raised cards**: Lucide glyph in a quiet well reads principal-led, not tech-demo. (Sculpture stills and Meshy clip-art are retired from public marketing — inventory only.)
- **Honest evidence**: sourced stat cards (Verizon DBIR, IBM, FBI IC3), LIVE/SANITIZED/EXAMPLE/ILLUSTRATIVE classification, honest empty review states. Trust is earned by real artifacts, never fabricated quotes, metrics, response times, or partnerships.
- **Journal masthead** and **Store category pills**: proof that scoped accents can feel like siblings of the core theme — which is exactly why they're locked.

And the failure modes we already paid to learn (`design/rejected/`, rhythm notes): flattening every section to one `#0a0a0a` slab; wrapping every chapter in a rounded gray island; purple-filled panels; glass `bg-white/5 backdrop-blur` as the default card; decorative blobs/dots; clip-art nouns (shield/padlock/laptop/robot); three competing Desk tabs as the visitor's first decision; overlapping floating chrome; hover-only content; cyberpunk/HUD overload.

## 5. Section archetypes — use case → recipe

Every section exists to make the visitor **understand or believe something** (V2 master rule: real artifact → real data → real person → diagram → sanitized UI → illustrative → editorial photo → environment → icon; decoration last). Pick the archetype by job, then use its recipe:

| Archetype | Visitor job | Field | Recipe |
|---|---|---|---|
| **Announcement strip** | One timely offer | Chrome black | Single line + underlined action + dismiss X; session-remembered; desktop only; never stacks a second bar |
| **Hero** | "Who is this, is it for me, what do I do next" | `--de-bg` atmospheric | Eyebrow (tracked caps) → oversized left headline (≤3 lines, one accent) → one-sentence subcopy → primary CTA + outline secondary → quiet positioning line. Illustration subordinate, right, hidden < lg |
| **Trust strip** | Instant "safe choice" scan | Paper, attached to hero | Title + 4 equal bordered cells (icon, bold claim, one line). No shadows, hairline dividers |
| **Stats / evidence band** | "The threat is real" | Well or raised box | Oxanium numbers, sourced attributions, 3–4 cards max, link to full sourced facts |
| **Problems grid** | "They get my pain" | Paper island | Numbered 2×3 list, hairline column seams, one closing CTA row |
| **Process / how-it-works** | "What happens if I engage" | Surface; may be the page's one loud band | 3–4 numbered steps, IconWell, equal columns; no fake dashboards |
| **Capability / protection model** | Depth without jargon | Paper + dark inset evidence panel | Interactive switcher (tabs/domains), classified as ILLUSTRATIVE where applicable |
| **Packages / pricing** | Self-qualification | Raised style box | Equal cards, one "flagship" badge max, fit-based copy ("not universally better"), magenta text links |
| **Proof / testimonials** | Believe outcomes | Well | Real reviews only; honest empty shells until live data; never fabricate |
| **Team / human** | "Real people own this" | Well | Real names/roles/photos, principal-led framing |
| **Industries** | "They know my world" | Surface | Cards with always-visible descriptions (never hover-only) |
| **Insights / feed** | Live expertise | Well | Real feed (CISA KEV etc.) with dates + sources; white cards pop on dark |
| **Lead form / booking** | Convert | Paper island | White card, minimal required fields, reassurance chips, phone fallback |
| **FAQ** | Objection handling | Paper | Accordion, straight answers, no HUD/decoration |
| **Next-step CTA** | Final push | Paper or surface | One headline, primary + phone secondary — never three competing CTAs |
| **Contact + footer** | Reach us / orient | Quiet well | Form on white card; footer = link columns + newsletter + legal; page ends quiet |
| **Floating chrome** | Persistent access | — | See §7 hard rules; everything positions via shared CSS vars |

## 6. Page-layout doctrine — pages are not the same

Choose the **page type**, then compose chapters by these rhythm rules instead of cloning the homepage:

**Rhythm rules (all pages):**
1. Adjacent dark sections in the *same* chapter share one field, separated by a hairline, with lift coming from raised cards — different chapters step well ↔ surface ↔ paper (↔ one loud band). Never one continuous `#0a0a0a` slab; never a gray island around every section.
2. **One loud band per page maximum** (magenta how-it-works style). Hero stays atmospheric, ending stays quiet.
3. Paper chapters are the relief valve — use them where reading or form-filling happens.
4. CTA cadence: hero → mid-page → closing. Between those, let evidence do the selling.
5. Only add HUD/precision chrome (ticks, corner markers, Oxanium metadata) on evidence modules, diagrams, coverage/telemetry, and Store technical media — never on FAQ, prose, forms, or testimonials.

**Page types:**
- **Conversion (homepage, /solutions, /industries/*, pricing):** dark-led chapter rhythm as above; homepage is the flagship and the only page with the violet hero gradient. Sub-pages inherit the structure at lower intensity — smaller heroes, fewer chapters, same tokens.
- **Editorial (Journal, guides, case studies):** reading-first. Charcoal masthead (amber accent), then generous paper/long-form measure (~65–75ch), restrained imagery, no HUD, no loud bands. Chrome stays minimal so the content is the design.
- **Catalog / utility (Store, calculators, tools):** task density beats atmosphere. Electric accent, persistent "Your Solution" chrome, form controls and cards optimized for scanning and input; marketing flourish only at the top. Never let marketing chrome cover task chrome.
- **Trust / legal / contact:** quiet wells, evidence-first (real documents, real addresses, real hours), forms on white cards, zero decoration.
- **Support chrome (Ask DE / Desk):** white precision panel language — `#fbfbfa` panel, `border-black/10`, near-black text, one decision at a time, magenta only for submit/incident. Bottom-sheet + scrim < 768px; popover with tail ≥ 768px.

**Composing a page that doesn't exist yet:** pick the page type → list what the visitor must understand/believe in order → assign one archetype per belief → apply rhythm rules → reuse existing section components before inventing (preserve → elevate → consolidate → relocate). If a new pattern is genuinely needed, build it as a reusable primitive first and get it approved — never style a one-off.

## 7. Hard rules (non-negotiable)

- **No overlapping chrome.** Two independently-interactive fixed/floating elements never occupy the same space. Every floating element positions via the shared vars (`--de-chrome-inset`, `--de-unified-bar-h`, `--de-cookie-h`, `--de-sticky-cta-h`, `--de-store-cart-h`, `--de-nav-offset`…) and publishes its own height var. Scrim-dimmed layers are the only sanctioned overlay.
- **Never judge UI from source.** Code → render → screenshot → critique → iterate, at **390 / 768 / 1440** minimum (Playwright; consent pre-seeded via `de_cookie_consent_v2`). Evidence goes to `artifacts/visual-qa/<task>/`; accepted/rejected directions get a screenshot + note in `design/approved|rejected/`.
- **Never fabricate**: clients, quotes, metrics, response times ("replies in minutes"), partnerships, vendor logos DE doesn't use, telemetry, compliance status, or product behavior. Classify evidence LIVE / SANITIZED REAL / EXAMPLE / ILLUSTRATIVE.
- **No vendor names on the public homepage hero** (Joe, 2026-08-30). Vendor marks live in Store merchandising where they're already sanctioned.
- **Preserve content**: existing copy, CTAs, nav, routes, SEO/JSON-LD, analytics, and functionality survive restyles. Elevate, don't delete.
- **All states designed**: default, hover, focus-visible, active, disabled, loading, empty (honest), error, success. Keyboard: focus traps in dialogs, Escape closes + restores focus, WCAG 2.2 AA contrast.
- **Company naming**: "Digerati Experts" or "DE" — never standalone "Digerati". Portal login is `https://portal.digeratiexperts.com/portal/login`.
- **Definition of done**: rendered result is coherent, responsive, accessible, consistent — verified in the browser and (for visual tasks) approved by Joe from screenshots, not tests alone.

## 8. Quick pre-flight for any UI task

1. Read this doc + the scoped lock rules for the surface you're touching.
2. Scan `design/approved/` (target quality) and `design/rejected/` (paid-for mistakes).
3. Identify page type (§6) and section archetypes (§5); find the existing component to reuse.
4. Confirm accent channel (§3) and field steps (§2) before writing classes.
5. Implement → render 390/768/1440 → screenshot → critique against §4 → fix → re-render.
6. Run typecheck, tests, build, bundle budget, route smoke; capture evidence; show Joe before merge.
