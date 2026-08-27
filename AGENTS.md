# Agent workflow (Digerati Experts)

Authoritative policy: **`.cursorrules`** (sections 1–42, including §9A Visual System v2). Always-applied pointer: `.cursor/rules/00-follow-cursorrules.mdc`.

Design OS (execution layer, does not replace `.cursorrules`): `.cursor/rules/ui-ux.mdc`, `brand.mdc`, `frontend.mdc`, `visual-system-v2.mdc` + `design/DESIGN_SYSTEM.md` + `design/VISUAL_SYSTEM_V2.md`. Never judge UI from source code alone. Blog/Journal and Store colors are locked: `.cursor/rules/blog-store-color-lock.mdc`.

Task ledger: `docs/SITE-VISUAL-TASKS.md`. Do not start a visual task marked IN PROGRESS by another owner. Do not invent HUD/evidence primitives ad hoc.

## DE SITE-WIDE VISUAL COMPLETION DIRECTIVE

You are working in a multi-agent repository. Other agents may be modifying the site concurrently.

**Before working:**

1. Fetch the latest `origin/main`.
2. Read `design/BRAND.md`, `DESIGN_SYSTEM.md`, `UX_PRINCIPLES.md`, `IMAGERY.md`, and the Visual System v2 documents.
3. Read `docs/SITE-VISUAL-TASKS.md`.
4. Confirm your task has one assigned owner and is not already IN PROGRESS elsewhere.
5. Work on an isolated branch/worktree.

**Brand foundation is locked:** graphite `#050312`, warm paper `#F7F5F2`, magenta `#D3126A`, restrained violet illumination, Space Grotesk / Inter / Oxanium, Store electric blue remains Store-specific. Do not redesign the foundational palette or typography.

**New visual philosophy:** Prefer real artifact ? real data ? real person ? diagram ? sanitized UI ? illustrative scenario ? editorial photography ? environment plate ? icon. Use technical HUD chrome only to communicate precision, metadata, state, or structure. Do not turn DE into a cyberpunk terminal. Classify operational visuals as LIVE / SANITIZED REAL / EXAMPLE / ILLUSTRATIVE. Never fabricate clients, testimonials, metrics, incident-response times, security events, telemetry, compliance claims, partnerships, or product behavior. Build reusable primitives before duplicating patterns across pages.

**During implementation:** inspect ? architect ? implement ? render ? screenshot ? critique ? refine. Verify at 390 / 768 / 1440.

**Before PR:** Fetch origin/main again. Identify every commit that landed on main since your branch began. Compare overlapping files. Preserve newer unrelated work. Never resolve conflicts by blindly taking a whole-file “ours” or “theirs.” Run typecheck/tests/build. Include the concurrency report and visual evidence in the PR. **Do not merge your own PR.**

A task is not finished until reviewed, merged, production-verified, and marked LIVE in the shared task ledger.

## Closed loop (UI work)

0. **Visual audit first** — read `.cursor/skills/visual-audit/SKILL.md` (and premium-saas-ui / responsive-review / image-art-direction as needed) before changing UI.
1. **Inspect** — existing components, tokens, routes, content (preserve ? elevate ? consolidate).
2. **Implement** — reuse before inventing; no content destruction without DE approval.
3. **Browser verify** — Playwright/browser tooling; desktop + tablet + mobile as required (390 / 768 / 1440 minimum).
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
