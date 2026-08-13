# Design rationale library

Use this folder with the mandatory root `.cursorrules` policy (sections 4�14, 27�28, 31, 40�42).

Design OS (tokens, brand, UX, imagery): `DESIGN_SYSTEM.md`, `BRAND.md`, `UX_PRINCIPLES.md`, `IMAGERY.md`. Cursor execution layer: `.cursor/rules/ui-ux.mdc`, `brand.mdc`, `frontend.mdc`. Audit before implementing: `.cursor/skills/visual-audit/SKILL.md`.

## Layout

| Path | Purpose |
|------|---------|
| `design/DESIGN_SYSTEM.md` | Live tokens (color, type, radius, motion) extracted from the codebase |
| `design/BRAND.md` | Visual identity constraints |
| `design/UX_PRINCIPLES.md` | Design-first / visual QA / definition of done |
| `design/IMAGERY.md` | Dark technical sculpture system; concept-not-noun |
| `design/references/` | Inspiration and competitor/industry refs (not yet approved for DE) |
| `design/approved/` | Ship-quality examples agents should match or elevate toward |
| `design/rejected/` | Anti-patterns � do not recreate these looks or structures |

## How agents should use this

1. Before major UI work, scan `approved/` for patterns that already fit DE.
2. Check `rejected/` so you do not reintroduce failed directions.
3. Prefer elevating existing DE sections in place over inventing new layouts.
4. After browser verification, if DE accepts or rejects a direction, drop a short note + screenshot into `approved/` or `rejected/` with why.

## Homepage shade system (2026-08)

Steal Lucide.dev’s nested neutrals, not their layout. Homepage chapters should juxtapose: `--de-bg` well, `--de-surface` field, `--de-paper`, and the magenta how-it-works band. Adjacent dark sections in the *same* chapter share a field with a 1px hairline and raised cards (`--de-raised`). Do not flatten every section to one `#0a0a0a` slab. Light leftovers use one `--de-paper` (`#f7f5f2`) recipe with lifted white cards. Magenta how-it-works stays the only loud band. Do not call Meshy for UI chrome.

## Naming

Prefer descriptive filenames, e.g. `homepage-hero-fullbleed-2026-08.png` plus a sibling `.md` with 2�5 bullets on why it works or fails.
