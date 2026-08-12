# Design rationale library

Use this folder with the mandatory root `.cursorrules` policy (sections 4–14, 27–28, 31, 40–42).

## Layout

| Path | Purpose |
|------|---------|
| `design/references/` | Inspiration and competitor/industry refs (not yet approved for DE) |
| `design/approved/` | Ship-quality examples agents should match or elevate toward |
| `design/rejected/` | Anti-patterns — do not recreate these looks or structures |

## How agents should use this

1. Before major UI work, scan `approved/` for patterns that already fit DE.
2. Check `rejected/` so you do not reintroduce failed directions.
3. Prefer elevating existing DE sections in place over inventing new layouts.
4. After browser verification, if DE accepts or rejects a direction, drop a short note + screenshot into `approved/` or `rejected/` with why.

## Naming

Prefer descriptive filenames, e.g. `homepage-hero-fullbleed-2026-08.png` plus a sibling `.md` with 2–5 bullets on why it works or fails.
