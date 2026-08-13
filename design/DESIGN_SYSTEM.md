# Design System

Source of truth for Digerati Experts visual tokens. Extracted from the live codebase (`client/src/index.css`, `tailwind.config.ts`, `client/src/components/ui/button.tsx`, DE Desk tokens). Do not invent new brand colors.

Quality bar: `design/approved/` — match or elevate toward those examples. Do not copy Linear/Stripe; analyze principles (hierarchy, restraint, composition) and apply them in DE’s language.

Companion docs: `BRAND.md`, `UX_PRINCIPLES.md`, `IMAGERY.md`. Policy: root `.cursorrules`.

## Personality

Premium
Technical
Trustworthy
Restrained
Modern
Enterprise

## Color

Background:
`#0a0a0a` (marketing/page field; also MegaMenu, store, footer)
`--de-bg` `#050312` (shared dark-cyber token)

Surface:
`#151217` (cards, e.g. engage-path cards)
`--de-surface` `#0a0714`
DE Desk shell `#1a0b33`
Nested dark `#12141c` / `#171922`
Nested light `#ffffff` / `#faf8fc` (Desk chat insert only)

Border:
`white/10` `rgba(255,255,255,0.1)`
`white/15` `rgba(255,255,255,0.15)`
`--radius` `0.5rem` (shadcn)

Primary:
`#D3126A` (brand magenta — CTA, brand mark, active underline, user bubbles)

Accent violet:
`#5B45E0` / `#7c3aed` (lighting, gradients, secondary accents)
`#8B5CF6` / `#A78BFA` (lavender frame / glow)

Primary text:
`#ffffff` / `--de-fg`

Secondary text:
`--de-muted` `rgba(255, 255, 255, 0.85)`
`--de-muted-soft` `rgba(255, 255, 255, 0.72)`
`white/65` / `white/45` (hierarchy on dark)

Focus:
`2px solid rgb(236, 72, 153)` (`#ec4899`) offset `2px`

Button brand variant:
`from-fuchsia-600 via-pink-600 to-rose-500` with pink shadow; violet→magenta gradients (`#7c3aed` → `#D3126A`) on portal/Desk submits.

Do not introduce a new purple, magenta, or near-black. Reuse these.

## Typography

- Headings: Space Grotesk, weight 600–700, letter-spacing `-0.015em` to `-0.03em`, line-height `1.15`
- Body: Inter, weight 400, line-height `1.6` (prose `1.75`)
- Stats/numbers: Oxanium, fallback JetBrains Mono
- Root font-size: `14px` (`15px` at 1920px, `16px` at 2560px)
- Tailwind: `font-heading`, `font-sans` / `font-body`, `font-mono`

## Radius

- Token: `--radius: 0.5rem` → `rounded-lg` / `md` / `sm`
- Common UI: `rounded-xl`, `rounded-2xl` (cards), `rounded-3xl` (large panels)
- Do not invent one-off radii (e.g. 13px, 17px)

## Spacing / layout

- Container: centered, padding `1rem`, `2xl` max `1680px`
- Sticky nav clearance: `--de-nav-offset` (MegaMenu ResizeObserver)
- Homepage section jumps live in MegaMenu (`HomepageOnPageNav`) — no floating bottom dock
- Dark marketing cards: `rounded-2xl border border-white/10 bg-[#151217]` with Lucide in `IconWell` (muted violet well)
- Section padding pattern: `py-10 md:py-14 lg:py-16` (and nearby variants already in sections)
- Touch targets: ~44×44px where practical (`min-h-11`)

## Motion

- Buttons: `transition-all duration-200 ease-out`, `active:scale-[0.98]`, hover `-translate-y-0.5`
- Accordion: `0.2s ease-out`
- Respect `prefers-reduced-motion` (already in `index.css`)
- Motion communicates state, hierarchy, continuity, feedback — never decoration

## Imagery

Locked engage-path system: dark technical sculpture — graphite / smoked glass / violet-as-light. Registry: `client/src/lib/visualAssets.ts`. See `IMAGERY.md`.

## Principles

1. Restraint over decoration.
2. Hierarchy over density.
3. Consistency over novelty.
4. Purpose over ornament.
5. Real visual composition over generic AI imagery.
