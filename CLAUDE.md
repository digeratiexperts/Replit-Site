# Claude Code — Digerati Experts Website

Before doing any work in this repository, read and obey:

1. `AGENTS.md`
2. `docs/AI-ENGINEERING-GOVERNANCE.md`
3. `.ai/ACTIVE_WORK.yaml`
4. the relevant design/source-of-truth documents referenced by `AGENTS.md`

Claude Code is the **default lead website implementation and integration agent** unless Joe explicitly reassigns that role for a specific task.

That role does not permit bypassing PR review, concurrency audits, visual QA, production verification, or Joe's final authority.

Never develop directly on `main`. Use an isolated branch/worktree. Reconcile against current `origin/main` before merge. Treat `MERGED` and `LIVE` as separate states.

## Project skills (`.claude/skills/`)

Each vendored skill carries an `UPSTREAM.md` with provenance, local deviations and its external-service boundary. Skills that call kie.ai spend credits; run them only when the user asks for an image, and read the key from the environment or the gitignored `.env` (`KIE_AI_API_KEY`, or `KIE_API_KEY` per PR #168), never from a committed file.

| Skill | Trigger | What it does | Output |
|---|---|---|---|
| `/scrollcraft` | scroll-driven / "Apple-style" landing page | Isolated scroll-experience builds | `scrollcraft/builds/<name>/` |
| `/nano-banana-images` | "nano banana image of…", any generated photo/still | JSON-prompted Nano Banana 2 generation via kie.ai (Python) | `artifacts/kie-ai/nano-banana/` |
| `/excalidraw-visuals` | "excalidraw visual/image of…" | Hand-drawn-style PNG diagrams via kie.ai (Node) | `artifacts/kie-ai/excalidraw/` |
| `/excalidraw-diagram` | "draw me a diagram of…" | Editable `.excalidraw` JSON, no API | `artifacts/diagrams/` |
| `/frontend-design` | build a component, page or site | Distinctive frontend code; DE brand lock wins on `client/` | in place |
| `/video-to-website` | "turn this video into a scroll-driven site" | FFmpeg frames + GSAP/Lenis canvas page | isolated experiment dir |
| `/skill-builder` | "help me build a skill" | Discovery interview, build and audit of skills | `.claude/skills/<name>/` |

Generated images are ILLUSTRATIVE candidates until they pass `design/IMAGERY.md` review; only optimized derivatives go under `client/public/images/`.
