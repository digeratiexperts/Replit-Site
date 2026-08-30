## Summary

<!-- What changed and why. Preserve existing DE content unless DE approved removal. -->

## Agent governance

Mandatory: `docs/AI-ENGINEERING-GOVERNANCE.md`.

- Task / claim ID:
- Implementing agent:
- Lead integrator: Claude Code by default / Joe-authorized override:
- Isolated branch/worktree used: YES / NO
- `.ai/ACTIVE_WORK.yaml` + current open PRs checked before implementation: YES / NO
- Any overlapping active agent work: NONE / describe
- Merge/deploy authority: lead integrator / Joe-authorized exception

Specialist agents do not merge or deploy their own website work by default.

## Completion report

1. What changed
2. Why it changed
3. Files changed
4. Functionality preserved
5. Tests performed
6. Browser verification performed
7. Remaining issues
8. Human inputs still required

Do not write “everything looks great.” Provide evidence.

## CONCURRENCY AUDIT

Required on every PR. A green CI check does not substitute. Full instructions: `docs/PR-CONCURRENCY-AUDIT.md`.

```
CONCURRENCY AUDIT
Branch base:
Current origin/main:
Commits landed on main since branch creation:
Overlapping files:
- ...
Overlapping active-agent claims:
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
Before/after evidence:
YES / NO / N/A
Screenshots captured:
YES / NO
Production impact:
...
```

Docs-only: visual QA of rendered pages is N/A; still fill the audit. Do not claim design-complete for UI.

## Visual System v2

If this PR adds visual treatments, HUD, evidence frames, or diagrams: read `design/VISUAL_SYSTEM_V2.md` and `docs/SITE-VISUAL-TASKS.md`. Do not invent primitives ad hoc. Classify operational visuals LIVE / SANITIZED REAL / EXAMPLE / ILLUSTRATIVE. Do not start a task marked IN PROGRESS by another owner.

For meaningful UI changes, inspect the rendered component in context before editing and provide browser evidence at 390 / 768 / 1440. Code correctness alone is not visual acceptance.

## Release state

- PR state: IMPLEMENTED / REVIEWED / MERGED
- Production state: NOT DEPLOYED / DEPLOYED UNVERIFIED / LIVE VERIFIED
- Expected release SHA / identifier:
- Production verification evidence:

`MERGED` does not mean `LIVE`.
