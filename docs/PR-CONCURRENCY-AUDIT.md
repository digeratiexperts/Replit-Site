# PR concurrency audit

Required on **every** Digerati Experts PR that changes the site, docs that agents follow, or shared primitives. A green CI check does not substitute for this.

Template is also in `.github/PULL_REQUEST_TEMPLATE.md`. Copy the block into the PR body and fill it.

Why: multiple agents work this repository at once. Stale branches have already been opened against older `main` (see quarantine on `docs/SITE-VISUAL-TASKS.md` — draft PRs #57, #59, #72). Blind whole-file “ours” / “theirs” overwrites other owners’ work.

---

## Before you open or update a PR

1. `git fetch origin main`
2. Identify every commit that landed on `origin/main` since your branch began (`git log --oneline <your-merge-base>..origin/main`)
3. Compare overlapping files (`git diff --name-only <merge-base>..HEAD` vs `git diff --name-only <merge-base>..origin/main`)
4. Rebase or merge **with intent**. Preserve newer unrelated work. Never resolve conflicts by blindly taking a whole file from either side.
5. Run typecheck / tests / build as applicable
6. Fill the report below
7. **Do not merge your own PR**

---

## Report block (paste into the PR)

```
CONCURRENCY AUDIT
Branch base:
Current origin/main:
Commits landed on main since branch creation:
Overlapping files:
- ...
Reconciliation performed:
- ...
Newer-main work preserved:
YES / NO
Whole-file replacements reviewed:
YES / NO
Tests:
...
Visual QA:
390:
768:
1440:
Screenshots captured:
YES / NO
```

### Field notes

| Field | What to write |
|-------|----------------|
| Branch base | Merge-base SHA with `origin/main` when the branch started (or `origin/main` SHA you branched from) |
| Current origin/main | `git rev-parse origin/main` at PR time |
| Commits landed on main | List SHAs + subjects, or `none` |
| Overlapping files | Paths changed both on your branch and on main since base. `none` is allowed |
| Reconciliation performed | Rebase/merge, file-by-file decisions. If none needed, say so |
| Newer-main work preserved | YES only if you did not clobber unrelated main commits |
| Whole-file replacements reviewed | YES if you used any whole-file take; explain. YES + “none used” is fine |
| Tests | Commands and outcomes. Docs-only: say what you verified (links, ledger, rules consistency) |
| Visual QA | 390 / 768 / 1440. Docs-only PRs: `N/A — docs/rules only; no page restyle` |
| Screenshots captured | YES / NO. Docs-only: NO is expected |

---

## Docs-only exception

Governance PRs (VIS-001) still include this block. Visual QA of rendered pages is N/A. Screenshots of markdown files are not required. Do not claim design-complete for UI.
