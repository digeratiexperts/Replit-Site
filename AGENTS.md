# Agent workflow (Digerati Experts)

Authoritative policy: **`.cursorrules`** (sections 1?42). Always-applied pointer: `.cursor/rules/00-follow-cursorrules.mdc`.

Design OS (execution layer, does not replace `.cursorrules`): `.cursor/rules/ui-ux.mdc`, `brand.mdc`, `frontend.mdc` + `design/DESIGN_SYSTEM.md`. Never judge UI from source code alone. Blog/Journal and Store colors are locked: `.cursor/rules/blog-store-color-lock.mdc`.

## Closed loop (UI work)

0. **Visual audit first** ? read `.cursor/skills/visual-audit/SKILL.md` (and premium-saas-ui / responsive-review / image-art-direction as needed) before changing UI.
1. **Inspect** ? existing components, tokens, routes, content (preserve ? elevate ? consolidate).
2. **Implement** ? reuse before inventing; no content destruction without DE approval.
3. **Browser verify** ? Playwright/browser tooling; desktop + tablet + mobile as required (390 / 768 / 1440 minimum).
4. **Critique** ? separate UI/UX pass against `.cursorrules` + `design/approved|rejected`.
5. **Repair** ? fix issues found; re-verify.
6. **Report done** ? only after verification + critique + fixes (completion report per §40?41).

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

## Master guardrails

Standing operating guardrails for any agent (Cowork, Claude Code, Cursor, Antigravity) working production/security/tax/UI concerns on this repo: `docs/MASTER-GUARDRAILS.md`. Adopted 2026-08-25. Read before autonomous multi-step work.
