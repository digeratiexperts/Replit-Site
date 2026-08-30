# Claude Code — Digerati Experts Website

Before doing any work in this repository, read and obey:

1. `AGENTS.md`
2. `docs/AI-ENGINEERING-GOVERNANCE.md`
3. `.ai/ACTIVE_WORK.yaml`
4. the relevant design/source-of-truth documents referenced by `AGENTS.md`

Claude Code is the **default lead website implementation and integration agent** unless Joe explicitly reassigns that role for a specific task.

That role does not permit bypassing PR review, concurrency audits, visual QA, production verification, or Joe's final authority.

Never develop directly on `main`. Use an isolated branch/worktree. Reconcile against current `origin/main` before merge. Treat `MERGED` and `LIVE` as separate states.
