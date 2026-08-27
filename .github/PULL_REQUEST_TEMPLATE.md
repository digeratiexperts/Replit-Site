## Summary

<!-- What changed and why. Preserve existing DE content unless DE approved removal. -->

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

Docs-only: visual QA of rendered pages is N/A; still fill the audit. Do not claim design-complete for UI.

## Visual System v2

If this PR adds visual treatments, HUD, evidence frames, or diagrams: read `design/VISUAL_SYSTEM_V2.md` and `docs/SITE-VISUAL-TASKS.md`. Do not invent primitives ad hoc. Classify operational visuals LIVE / SANITIZED REAL / EXAMPLE / ILLUSTRATIVE. Do not start a task marked IN PROGRESS by another owner.
