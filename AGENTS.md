# Agent workflow (Digerati Experts)

Authoritative policy: **`.cursorrules`** (sections 1–42). Always-applied pointer: `.cursor/rules/00-follow-cursorrules.mdc`.

## Closed loop (UI work)

1. **Inspect** — existing components, tokens, routes, content (preserve ? elevate ? consolidate).
2. **Implement** — reuse before inventing; no content destruction without DE approval.
3. **Browser verify** — Playwright/browser tooling; desktop + tablet + mobile as required.
4. **Critique** — separate UI/UX pass against `.cursorrules` + `design/approved|rejected`.
5. **Repair** — fix issues found; re-verify.
6. **Report done** — only after verification + critique + fixes (completion report per §40–41).

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
