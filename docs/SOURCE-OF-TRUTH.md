# Source of truth (stop Replit from overwriting Cursor work)

**Canonical repo:** GitHub `digeratiexperts/Replit-Site`  
**Canonical authoring:** Cursor / local clone → git push → VPS deploy  
**Not canonical:** Replit Agent auto-commits or Replit GitHub sync pushing over our branches

## Prevent Replit from syncing over us

Do these in the Replit UI for **digerati Experts Offical Website**:

1. **Pause or disconnect GitHub sync** (Settings → Git / Version control) so Replit cannot push to `main` or `fix/*` from the Repl.
2. **Do not click “Publish / Deploy from Replit”** for production — production is CyberPanel + PM2 on de-vps (`digeratiexperts.com` :3300).
3. If the Repl must stay open for reference, treat it as **read-only**. Pull from GitHub into Replit only when you explicitly want a preview; never let Replit be the push source.
4. Prefer working on GitHub branches (`fix/homepage-hero-nav-2026-08-08`, `preserve/*`) and merge via PR.

## Preserve branches (do not delete)

| Branch | Why |
|--------|-----|
| `preserve/live-pink-sticky-nav` | Pink sticky section bar chrome |
| `preserve/internal-pages-pre-redact` | Internal sales pages removed in Aug 2026 cleanup (renamed from replit-prefixed branch) |

## Recovered from Replit (do not full-sync)

**Digerati Journal + read-aloud** was restored from the live Replit preview into git (not via full Repl sync):

- `client/src/pages/resources/Blog.tsx` / `BlogPost.tsx`
- `client/src/components/BlogAudioPlayer.tsx` (OpenAI `/api/tts` + browser `speechSynthesis` failover, word highlight, play/pause/stop/speed/voice)
- `client/src/data/resourceRegistry.ts` + `resourceRegistry.v2.json` (16 articles)
- `client/public/assets/covers/blog/*`
- `server` `POST /api/tts` + `generateSpeech` in `openaiService.ts`

If something else is still missing from git, recover surgically from Replit Checkpoints — never let Replit push over Cursor/git HEAD.
