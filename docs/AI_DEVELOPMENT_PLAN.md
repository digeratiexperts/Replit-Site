# Digerati Experts Site — AI Development Plan

## Canonical identity

- Product: Digerati Experts public website and client portal
- Target repository name: `digeratiexperts/digeratiexperts-site`
- GitHub rename status: pending owner-account authentication; until then, the existing `origin` URL is authoritative
- Local workspace: `C:\Users\Joe\Projects\digeratiexperts-site`
- Default branch: `main`
- Production: `https://digeratiexperts.com`
- Runtime: OpenLiteSpeed proxy to the `digeratiexperts-site` systemd service

`de-platform` is a separate repository for Zoho and platform infrastructure. Do not merge its responsibilities into this repository.

Do not change the deployment repository URL to the target name until GitHub confirms that the owner-account rename succeeded.

## Working agreement

1. Inspect the current branch, status, existing tests, and relevant documentation before changing files.
2. Preserve user changes. Never reset, discard, overwrite, auto-stash, or delete uncommitted work.
3. Use a feature branch for non-trivial work. Keep `main` deployable.
4. State a short implementation plan and acceptance criteria before broad changes.
5. Keep secrets in environment files or the production secret store. Never commit credentials, tokens, private keys, or production data.
6. Prefer the existing React, TypeScript, Express, Drizzle, and Vite patterns. Add dependencies only when the existing stack cannot reasonably solve the problem.
7. Treat old Replit files and references as migration history unless they still affect the active build or runtime. Remove active dependencies deliberately and verify each removal.
8. Run focused checks during development and the full verification sequence before proposing deployment.
9. Summarize files changed, checks run, risks, and rollback steps when handing work off.

## Verification sequence

Run the strongest applicable subset while iterating, then run all available checks before deployment:

```text
npm run check
npm test
npm run build
npm run smoke:public
```

Use Playwright for browser-visible changes. Verify desktop and narrow viewport behavior, primary navigation, the changed user journey, console errors, and failed network requests.

## Deployment policy

Deployment is a separate, explicit step after review. Before production deployment:

1. Confirm the target branch and commit.
2. Confirm the working tree contains no accidental changes.
3. Pass type-check, tests, build, public smoke checks, and relevant Playwright journeys.
4. Review database and environment-variable implications.
5. Record rollback instructions.
6. Obtain explicit user approval immediately before changing production.
7. After deployment, verify `/healthz`, critical public routes, portal entry points, logs, and the changed journey.

## Model routing

- Antigravity: use `Gemini 3.1 Pro (High)` for architecture, planning, and complex implementation while it is available.
- Antigravity review option: use `Claude Opus 4.6 (Thinking)` for a second-pass critique on high-risk changes.
- Cursor: follow the same repository rules and verification gates; model choice may vary with account availability.

Model choice never relaxes review, testing, secret handling, or deployment safeguards.
