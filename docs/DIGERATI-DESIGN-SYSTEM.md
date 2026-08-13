# Digerati Experts — Canonical Design System

> **This is the canonical UI design specification for the project.** It supersedes
> `client/src/lib/designSystem.ts` (legacy, off-brand, to be retired) and consolidates the
> existing internal system in [`design/`](../design) with the audit in
> [`docs/DESIGN-SYSTEM-AUDIT.md`](./DESIGN-SYSTEM-AUDIT.md).
>
> Source of truth for **tokens**: `client/src/index.css` (`--de-*`) + `tailwind.config.ts`
> (`colors.de.*`). Do **not** invent new brand colors — reuse the tokens below.
> Authoritative policy: root `.cursorrules`. Brand rule: `.cursor/rules/brand.mdc`.

**Status:** Phase A foundations — tokens below are **decided and live** in `client/src/index.css`
+ `tailwind.config.ts` unless marked ⏳ (deferred, not blocking Phase B).
Primitives: `Section` / `Container` (`components/layout/`), `.de-display` / `.de-h2` / `.de-h3` /
`.de-lead` / `.de-eyebrow`, Button `cta` + `xl`, tightened `RevealOnScroll`, Vitest exclude for
`msp-advisor` (pre-existing CI config fix).

**Hard gate:** Phase B homepage proof → before/after at 1440/768/390 → STOP for DE. No PageTemplate
rollout until approved.

---

## 1. Brand character

Digerati Experts is a **premium, cybersecurity-first managed IT** company for Arizona SMBs
and their executives. The design language must feel:

- premium · cybersecurity-first · modern · technically sophisticated
- trustworthy · enterprise-capable · yet approachable for SMB decision-makers
- **distinctly different from generic MSP and generic SaaS websites**

**Avoid** (per `.cursorrules`, `design/BRAND.md`, `.cursor/rules/brand.mdc`):
generic blue cybersecurity gradients everywhere · glowing shields · random laptops · robot
imagery · visual clutter · dashboard styling on marketing pages · excessive glassmorphism ·
huge empty hero sections · generic AI-generated SaaS appearance · rainbow gradients · neon glow.

**Design principles (ranked):** restraint over decoration · hierarchy over density ·
consistency over novelty · purpose over ornament · real composition over generic AI imagery.

---

## 2. Reference hierarchy (when references disagree)

1. Existing Digerati **business requirements & functionality**
2. Existing Digerati **brand identity** (`design/BRAND.md`)
3. **Rambox** `DESIGN.md` — overall visual sophistication & presentation
4. **Evervault** `DESIGN.md` — cybersecurity & trust patterns
5. **Relume** — UX architecture & section/component structure
6. **Supporting** (Vercel / HashiCorp / Stripe) — targeted patterns only

Intake location for external references: [`design-references/`](../design-references). The
Rambox/Evervault `DESIGN.md` files are **not yet provided**; do not invent their contents.
Produce **one** coherent Digerati system — never a blend of five visual languages.

---

## 3. Design tokens

CSS-variable-first. Prefer tokens over one-off values. All ✅ values are the live `--de-*`
definitions in `client/src/index.css`; 🆕 values are proposed for Phase 3.

### 3.1 Color — surfaces (dark ladder + paper)
| Token | Value | Use |
|-------|-------|-----|
| `--de-bg` ✅ | `#050312` | Deepest well: hero, credibility, proof-after-magenta, founder, closing CTA/contact/footer |
| `--de-surface` ✅ | `#0a0a0a` | Marketing field for a dark chapter |
| `--de-raised` ✅ | `#151217` | Cards / lifted panels within a dark chapter |
| `--de-hairline` ✅ | `rgba(255,255,255,0.10)` | 1px borders, same-chapter seams |
| `--de-paper` ✅ | `#f7f5f2` | The one light-chapter recipe (protect, trust, FAQ/newsletter) |
| `--de-paper-raised` ✅ | `#ffffff` | Cards on paper |
| `--de-paper-hairline` ✅ | `rgba(26,18,16,0.10)` | Borders on paper |

Chapters must **juxtapose** well ↔ surface ↔ paper ↔ magenta. Never flatten the page to one
`#0a0a0a` slab. Do not introduce competing grays (`#0f0f0f`, `#0f0f1a`, `#141418`, cool `#F7FAFC`).

### 3.2 Color — text
| Token | Value | Use |
|-------|-------|-----|
| `--de-fg` ✅ | `#ffffff` | Primary text on dark |
| `--de-muted` ✅ | `rgba(255,255,255,0.85)` | Secondary text on dark |
| `--de-muted-soft` ✅ | `rgba(255,255,255,0.72)` | Tertiary/supporting text on dark |
| `--de-ink` ✅ | `#111827` | Primary text on paper |
| `--de-ink-muted` ✅ | `#374151` | Secondary text on paper |

Use `white/65` / `white/45` sparingly for the quietest tier only; verify contrast (WCAG 2.2 AA).

### 3.3 Color — accent / brand
| Token | Value | Use |
|-------|-------|-----|
| `--de-magenta` ✅ | `#D3126A` | **Primary brand & CTA** (solid for marketing `cta` variant) |
| `--de-violet` ✅ | `#5B45E0` | Accent & illumination (violet as **light, not paint**) |
| (accent) ✅ | `#7c3aed` / `#8B5CF6` / `#A78BFA` | Deep→lavender violet for gradients/glow frames |
| `--de-brand-energy` ✅ | violet→magenta→coral gradient | The single loud statement band only |

Purple is illumination/accent, not large fills. Exactly one loud band per page. No rainbow gradients.
Marketing primary actions use solid magenta (`Button` `cta`). Keep `brand` gradient for portal/Desk.

### 3.4 Color — semantic states ✅
| Token | Value | Use |
|-------|-------|-----|
| `--de-success` | `#10b981` | Success/validation |
| `--de-warning` | `#f59e0b` | Non-blocking warnings |
| `--de-danger` | `#ef4444` | Errors / destructive |
| `--de-info` | `#5B45E0` | Informational (brand violet) |

### 3.5 Color — focus
| Token | Value | Use |
|-------|-------|-----|
| focus ring ✅ | `2px solid #ec4899`, offset `2px` | Global `:focus-visible` + Button |

### 3.6 Spacing scale
Tailwind default 4px scale. Prefer tokens over inventing steps.

### 3.7 Section spacing ✅
| Token | Value | Use |
|-------|-------|-----|
| `--de-section-y` | `clamp(3.5rem, 6vw, 5.5rem)` | Standard marketing section |
| `--de-section-y-lg` | `clamp(5rem, 8vw, 8rem)` | Hero / major chapter |
| `--de-section-y-sm` | `clamp(2.5rem, 4vw, 3.5rem)` | Continuation bands |

### 3.8 Radius scale
| Token | Value | Use |
|-------|-------|-----|
| `--radius` ✅ | `0.5rem` | shadcn base |
| `--de-radius-card` ✅ | `1rem` | Marketing cards |
| `--de-radius-panel` ✅ | `1.5rem` | Large panels |

### 3.9 Container widths ✅
| Token | Value | Use |
|-------|-------|-----|
| `--de-w-content` | `1280px` | Default band (`Container width="content"`) |
| `--de-w-wide` | `1520px` | Galleries / 4-up |
| `--de-w-prose` | `68ch` | Long-form measure |
| `--de-gutter` | `clamp(1rem, 4vw, 2.5rem)` | Side padding |

### 3.10 Typography scale ✅
- **Families:** Space Grotesk / Inter / Oxanium·JetBrains Mono.
- **Root:** `14px` (→15px ≥1920, →16px ≥2560).
- **Rule:** no section H2 may exceed hero H1 — use utilities `.de-display` / `.de-h2` / `.de-h3` / `.de-lead` / `.de-eyebrow`.
| Role | Token / class | Size |
|------|---------------|------|
| Display (hero H1) | `--de-fs-display` / `.de-display` | `clamp(2.5rem, 4.6vw, 4rem)` |
| H2 | `--de-fs-h2` / `.de-h2` | `clamp(1.75rem, 2.6vw, 2.5rem)` |
| H3 | `--de-fs-h3` / `.de-h3` | `clamp(1.25rem, 1.6vw, 1.5rem)` |
| Lead | `--de-fs-lead` / `.de-lead` | `clamp(1.0625rem, 1.1vw, 1.25rem)` |
| Eyebrow | `--de-fs-eyebrow` / `.de-eyebrow` | `0.75rem` / 600 / `.18em` / uppercase |

### 3.11 Elevation / shadows ✅
| Token | Value | Use |
|-------|-------|-----|
| `--de-shadow-sm` | `0 1px 2px rgba(0,0,0,.4)` | Subtle lift |
| `--de-shadow-md` | `0 8px 24px rgba(0,0,0,.35)` | Cards on dark |
| `--de-shadow-paper` | paper lift | Cards on paper |
| `--de-shadow-cta` | magenta-tinted | Primary CTA only |
| `--de-rim` | inset top highlight | Raised panels (`.de-raised-panel`) |

**Premium depth (not glow):** chapter juxtaposition, rim light, directional scrims, layered sculpture
stages, editorial asymmetry, hairline seams, real photography. Neon ambient glow is banned.

### 3.12 Motion ✅
`--de-dur-fast 150ms` · `--de-dur 200ms` · `--de-dur-slow 320ms`.
Rules: (1) no `repeat: Infinity` on marketing; (2) reveals ≤12px rise, ≤400ms, total stagger ≤200ms;
(3) prefer `RevealOnScroll` over per-element motion stacks.

### 3.13 Visual treatment matrix
| Treatment | Use for |
|-----------|---------|
| Bespoke / editorial / sculptural | major story concepts |
| Lucide in `IconWell` | services, features, functional UI |
| Real photography | people, Arizona/local, offices, field work |
| Data / product visualization | assessments, posture, pricing, proof |

Never one treatment for everything. Do not confuse cleaner with flatter.

---

## 4. Component architecture

Establish shared primitives **only where reuse is real** (≥2 call sites). Adapt existing
components before creating new ones. Never create `Button2`/`CardV2`/`ImprovedHero`.

| Primitive | Status / source | Action |
|-----------|-----------------|--------|
| `Button` | ✅ `components/ui/button.tsx` (has `brand` variant) | Canonical; migrate inline gradient buttons to it |
| `Badge` | ✅ `components/ui/badge.tsx` | Brandize; reuse |
| `Card` | ✅ `components/ui/card.tsx` | Add tokenized dark/paper variants; replace glass cards |
| `Section` | ✅ `components/layout/Section.tsx` | chapter + rhythm + seam |
| `Container` | ✅ `components/layout/Container.tsx` | content / wide / prose |
| `FeatureCard` / `ServiceCard` | partial (`DigeratiServicesSection`, inline) | Extract one primitive |
| `IconWell` | ✅ `components/visual/IconWell.tsx` | Standardize as the marketing icon container |
| `Stat` | partial (`StatCallout`/inline) | One primitive; prefer number strip |
| `Testimonial` | section-only | Extract card; keep API-aware section |
| `LogoCloud` / trust rail | inline | Extract |
| `CTA` | many (`DigeratiCTASection`,`PremiumCTASection`,…) | One primitive + behavior variants |
| `PricingCard` | inline (data in `data/pricing.ts`) | Extract; single source of pricing |
| `ComparisonTable` | `ServiceMatrix`/`ServiceCapabilityMatrix` | Generalize; mobile-friendly |
| `Accordion` | ✅ shadcn + custom FAQ | Standardize on shadcn, brandized |
| `Modal` | ✅ shadcn dialog | Wrap; reuse |
| `Navigation` / `Footer` | ✅ `MegaMenu` / `DigeratiEnhancedFooterSection` | Keep single live impls; tokenize |
| Form controls | ✅ shadcn `form/input/...` | Reuse; keep RHF+zod pattern |

Retire (after confirming zero imports, in a dedicated cleanup PR — **not** during audit):
`lib/designSystem.ts`, dead `Homepage.tsx` + Figma sections, `hero.tsx`, `navbar.tsx`,
`Footer.tsx`, orphan hero/footer variants.

---

## 5. Marketing site vs application UI

Maintain a deliberate distinction — do **not** turn the public website into a SaaS dashboard.

| | Public marketing site | Portal / application UI |
|--|-----------------------|--------------------------|
| Feel | editorial, polished, spacious, trustworthy, conversion-focused | denser, application-oriented, efficient |
| References | Rambox / Evervault principles | product-app conventions; shadcn density |
| Surfaces | `--de-*` chapter ladder (well/surface/paper/magenta) | fixed dark app shell (`PortalLayout`) |
| Motion | restrained, purposeful | minimal, functional |
| Density | generous whitespace, one idea per band | tables, forms, multi-step flows OK |

Portal theme note: resolve the inert shadcn `.dark` ambiguity in Phase 3 (either apply `.dark`
to the portal shell or replace non-firing `dark:` utilities with explicit tokens) — behavior-safe.

---

## 6. Imagery & visual assets

Follow `design/IMAGERY.md` (canonical). Summary:

- **Locked system:** dark technical sculpture — graphite / gunmetal / smoked glass / violet-as-light,
  controlled studio lighting, generous negative space. Registry: `client/src/lib/visualAssets.ts`.
- **Concept, not noun:** represent the idea (central core + nodes; interlocking systems; scanned
  lattice) — never shields, padlocks, laptops, robots, hoodies, server racks, binary, cyberpunk.
- **Placement:** sculptures on engage-path cards (and at most one editorial stage per section);
  small marketing cards use **Lucide in `IconWell`**; portal/mega-menu chrome stays Lucide.
- **Icons:** one family for marketing (Lucide via `IconWell`) + chrome (Lucide). Consolidate the
  single `react-icons` usage to Lucide.
- **Consistency:** keep camera, lighting, materials, palette, density, scale constant across images.

---

## 7. Homepage objective

The homepage must communicate, with **each section having a defined conversion/communication
purpose** (no sections added merely to lengthen the page):

1. Who Digerati serves 2. What Digerati does 3. Why Digerati is different 4. Cybersecurity
credibility 5. Business outcomes 6. Proof/trust 7. Core service paths 8. Assessment/advisory
capability 9. Pricing/buying-path clarity 10. Strong next action.

The current live composition (`pages/DigeratiHomepage.tsx`) already covers these; Phase 4 will
**recompose** the hero + following sections (one idea per band, stronger hierarchy, restrained
decoration) — relocating rather than deleting any content per the preservation rule.

**Canonical CTAs:** Primary "Get My Cyber Risk Assessment" · Secondary "See Plans & Pricing" ·
Utility "Client Support". Avoid vague "Learn More"/"Get Started".

---

## 8. Relume usage (structure, not paste)

Use Relume to identify better structures for hero, service presentation, feature grids,
industry pages, trust sections, testimonials, case studies, pricing, comparison, FAQ, CTA,
contact/booking, and resources. When recreating a Relume component: adapt to this stack, reuse
primitives, strip extra deps, swap in Digerati copy/imagery/tokens, preserve SEO + a11y +
responsive behavior. Never paste verbatim. Rules: `design-references/relume/README.md`.

---

## 9. Responsiveness & accessibility (non-negotiable)

- Verify every redesigned component at **390 / 768 / 1440** minimum (plus large desktop).
  Recompose for mobile (stack/reorder/simplify) — never merely shrink desktop grids.
- Maintain/improve: semantic HTML, heading hierarchy, keyboard nav, visible focus (magenta
  ring), contrast (WCAG 2.2 AA), form labels, ARIA where appropriate, reduced-motion, ~44px
  touch targets. Never sacrifice accessibility for polish.

## 10. Performance

Prefer CSS + existing utilities + optimized SVG + WebP/AVIF + lazy loading + responsive images.
Do not add dependencies for visual effects. Avoid unnecessary client-side JS and ambient
animation. Protect Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP < 200ms where achievable).

---

## 11. Definition of done (per section)

A section is done only when: implementation works · build/types/tests pass · console clean ·
390/768/1440 verified · a11y preserved · no existing content/functionality lost · no fabricated
facts · brand tokens used (no off-brand hexes) · it reads as a composition, not a template ·
it would pass an experienced UI/UX designer's review.
