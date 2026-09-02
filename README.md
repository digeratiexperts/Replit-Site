# de-agent-skills

Digerati Experts agent skills, packaged as a Claude Code plugin marketplace so any project gets all of them with two commands. The canonical copies also live in `digeratiexperts/digeratiexperts-site` under `.claude/skills/`; this repo is the distribution point.

## Install in any project (Claude Code, local or web)

```
/plugin marketplace add digeratiexperts/de-agent-skills
/plugin install de-skills@de-agent-skills
```

Then `/nano-banana-images`, `/excalidraw-visuals`, `/scrollcraft`, `/frontend-design`, `/video-to-website`, `/web-design-rules`, `/skill-builder`, `/wat-framework`, `/trigger-dev`, `/trigger-ref`, `/excalidraw-diagram` are available in that project. Plugin skills are namespaced, so `/de-skills:nano-banana-images` also works.

## Install for every project on one machine (Claude Code and Codex)

```
bash install-user-skills.sh          # symlinks into ~/.claude/skills and ~/.agents/skills
bash install-user-skills.sh --copy   # copies instead
bash install-user-skills.sh --uninstall
```

## Keys

Image generation reads `KIE_AI_API_KEY` (or `KIE_API_KEY`) from the environment or a project `.env`. Never commit it. Each generation spends kie.ai credits.

## Provenance

Every skill folder carries an `UPSTREAM.md` naming its source, audit date, local deviations and external-service boundary.
