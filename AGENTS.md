# Agent workflow (Digerati Experts)

Authoritative policy: **`.cursorrules`**. Always-applied pointer: `.cursor/rules/00-follow-cursorrules.mdc`.

Design OS (execution layer, does not replace `.cursorrules`): `.cursor/rules/ui-ux.mdc`, `brand.mdc`, `frontend.mdc` + `design/DESIGN_SYSTEM.md`. Never judge UI from source code alone. Blog/Journal and Store colors are locked: `.cursor/rules/blog-store-color-lock.mdc`.

## Repository authority — check this before starting work

- This repository, `digeratiexperts/digeratiexperts-site`, is the **canonical public website repository**.
- Website work branches from and opens PRs back to this repository's current `main`.
- `Replit-Site` references are historical and must not redirect new website work.
- `digeratiexperts/Intelligence-Hub` is the canonical internal Intelligence Hub / Tech Sales application repository.
- `digeratiexperts/TechSales` is legacy/reference-only by default; do not start new work there or archive/delete it without an explicit migration decision.
- Full authority matrix: `docs/REPOSITORY-AUTHORITY.md`.
- Website source-of-truth details: `docs/SOURCE-OF-TRUTH.md`.

If an old Cursor task, chat, PR description, screenshot, or migration note conflicts with current GitHub state and the authority files above, treat the old instruction as stale and re-check before acting.

## Company naming

Customer-facing company naming is **Digerati Experts** or **DE**, never standalone **Digerati** as the company label. See `.cursor/rules/digerati-naming.mdc`.

## Closed loop (UI work)

0. **Visual audit first** -> read `.cursor/skills/visual-audit/SKILL.md` (and premium-saas-ui / responsive-review / image-art-direction as needed) before changing UI.
1. **Inspect** -> existing components, tokens, routes, content (preserve -> elevate -> consolidate).
2. **Implement** -> reuse before inventing; no content destruction without DE approval.
3. **Browser verify** -> Playwright/browser tooling; desktop + tablet + mobile as required (390 / 768 / 1440 minimum).
4. **Critique** -> separate UI/UX pass against `.cursorrules` + `design/approved|rejected`.
5. **Repair** -> fix issues found; re-verify.
6. **Report done** -> only after verification + critique + fixes.

## Role separation (same agent, distinct passes)

| Pass | Focus |
|------|--------|
| UI director | Hierarchy, brand, conversion, anti-patterns |
| FE engineer | Correct reuse, tokens, a11y, performance |
| QA critic | Rendered result vs rules; routes; regressions |
| Repair | Fix critique findings; re-verify |

## Hosts

- Site: `https://digeratiexperts.com`
- Portal login: `https://portal.digeratiexperts.com/portal/login` (never `//login`)

## Next steps (out of scope here)

- Figma MCP + Code Connect
- Storybook / Chromatic if needed later
