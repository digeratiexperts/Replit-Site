# Relume — structural / UX architecture references

Relume is a **structural and component reference**: page architecture, section
composition, UX patterns, responsive layouts, and React component references. It is
reference priority #5 and it is **not** permission to replace the existing website.

## How to use Relume here

Drop Relume references as markdown notes and/or screenshots, named by the pattern they
inform, e.g.:

```
design-references/relume/hero-split-with-assessment.md
design-references/relume/feature-grid-3col.md
design-references/relume/pricing-tiers-comparison.md
design-references/relume/faq-accordion.md
```

Each note should capture the *structure and UX rationale* (layout, hierarchy, responsive
behavior, states), not the raw copy or imagery.

## Rules when importing/recreating a Relume component

- Adapt it to this codebase (Vite + React + TS + Tailwind + shadcn/ui + wouter).
- Reuse existing primitives (`components/ui/*`, `components/visual/IconWell`, etc.).
- Remove unnecessary dependencies; do not add new libraries for effects.
- Replace placeholder copy with existing Digerati content (do not invent facts).
- Replace placeholder imagery with Digerati assets (`client/src/lib/visualAssets.ts`).
- Use Digerati design tokens (`--de-*`, `de-*` Tailwind colors) — no one-off hexes.
- Preserve SEO semantics (`useSEO`, `JsonLd`) and accessibility.
- Preserve responsive behavior (verify 390 / 768 / 1440 minimum).

Treat Relume as a high-quality reference implementation. **Never paste Relume code
verbatim into production.**

## Where Relume patterns will materially help (from the audit)

See `docs/DESIGN-SYSTEM-AUDIT.md` → "Where Relume patterns would materially improve UX"
for the prioritized list (hero, service presentation, feature grids, pricing/comparison,
FAQ, CTA, contact/booking, resources).
