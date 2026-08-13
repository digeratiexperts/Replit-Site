# Design references (GetDesign + Relume)

This folder holds **external** design-system references used to inform — never clone — the
Digerati Experts design language. It is the intake area for the GetDesign `DESIGN.md`
exports (Rambox, Evervault, supporting systems) and for Relume structural references.

> Principle over imitation. We extract hierarchy, spacing, restraint, surface logic,
> and interaction patterns from these systems and translate them into Digerati's own
> brand language. We do **not** copy their layouts, headlines, colors, or components.
> The canonical Digerati spec is [`docs/DIGERATI-DESIGN-SYSTEM.md`](../docs/DIGERATI-DESIGN-SYSTEM.md).

## Relationship to the existing `design/` folder

The repository already has a mature internal design system under [`design/`](../design/):

- `design/BRAND.md`, `design/DESIGN_SYSTEM.md`, `design/IMAGERY.md`, `design/UX_PRINCIPLES.md`
- `design/approved/` — shipped, DE-approved quality bar (screenshots + rationale)
- `design/rejected/` — anti-patterns
- `design/references/` — internal *principle notes* + inspiration screenshots (e.g. `clarity-bar-rambox-monday-2026-08.md`)

`design-references/` (this folder) is **only** for the raw, externally-sourced reference
material (GetDesign `DESIGN.md` files and Relume component references). Keep the two
separate: `design/` is Digerati's own system; `design-references/` is the source material
we learn from. Do not duplicate content between them — cross-link instead.

## Structure

```
design-references/
  getdesign/
    rambox/        # Rambox DESIGN.md (primary visual sophistication reference)
    evervault/     # Evervault DESIGN.md (cybersecurity / trust reference)
    supporting/    # Vercel / HashiCorp / Stripe DESIGN.md (only where appropriate)
  relume/          # Relume section/component structural references
  README.md
```

## Reference priority (when references disagree)

1. Existing Digerati business requirements and functionality
2. Existing Digerati brand identity (`design/BRAND.md`, `.cursor/rules/brand.mdc`)
3. **Rambox** `DESIGN.md` — overall visual sophistication and presentation
4. **Evervault** `DESIGN.md` — cybersecurity and trust-oriented patterns
5. **Relume** — UX architecture and section/component structure
6. Supporting systems (Vercel, HashiCorp, Stripe) — targeted patterns only

Do not blend five visual languages arbitrarily. There is exactly one Digerati system.

## How to add the reference files (action for DE)

The Rambox and Evervault `DESIGN.md` exports are **not yet in the repository**. When you
have them, place them here (filenames are suggestions — keep the `DESIGN.md` name where
possible so tooling can find them):

| Reference | Put the file at | Status |
|-----------|-----------------|--------|
| Rambox (primary) | `design-references/getdesign/rambox/DESIGN.md` | ⛔ not provided yet |
| Evervault (secondary) | `design-references/getdesign/evervault/DESIGN.md` | ⛔ not provided yet |
| Vercel (optional) | `design-references/getdesign/supporting/vercel-DESIGN.md` | optional |
| HashiCorp (optional) | `design-references/getdesign/supporting/hashicorp-DESIGN.md` | optional |
| Stripe (optional) | `design-references/getdesign/supporting/stripe-DESIGN.md` | optional |
| Relume references | `design-references/relume/<pattern-name>.md` or screenshots | as gathered |

If a `DESIGN.md` already exists elsewhere in the repo, reuse it in place rather than
duplicating; note its location in the relevant leaf `README.md`.

After the files are added, the canonical spec (`docs/DIGERATI-DESIGN-SYSTEM.md`) should be
revisited so that any concrete Rambox/Evervault principles are folded into the Digerati
tokens and component rules.
