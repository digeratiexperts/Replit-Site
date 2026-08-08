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
| `preserve/replit-internal-pages-pre-redact` | Internal sales pages removed in Aug 2026 cleanup |

## Missing assets that may still exist only on Replit

If a feature is **not** in this git history (example: black blog with read-aloud / TTS + ChatGPT failover modes), recover it from:

1. Replit **Checkpoints / History** for that Repl session  
2. Replit Agent conversation that built it  
3. Any local download / zip from before leaving Replit  

Then import as a branch (`preserve/replit-tts-blog` or similar) — do **not** let a full Replit sync overwrite current HEAD.
