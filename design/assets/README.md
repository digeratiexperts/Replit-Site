# DE Visual Asset Workflow

This folder is the intake and provenance layer for externally sourced visual assets. It complements, rather than replaces, `design/IMAGERY.md`, `design/approved/`, and `client/src/lib/visualAssets.ts`.

## Flow

1. Put or reference new candidates in `design/assets/inbox/`.
2. Create a provenance note in `design/assets/source-notes/` from `TEMPLATE.md`.
3. Review licensing, brand fit, crop, responsive behavior, and technical quality.
4. Move only approved source material into the appropriate approved/source location.
5. Generate optimized derivatives for `client/public/images/` or `client/public/video/`.
6. Register actually used public stills in `client/src/lib/visualAssets.ts`.
7. Verify rendered placement at desktop/tablet/mobile widths.

## Preferred sources

For new content, search in this order when practical: Adobe Stock Free, Unsplash, Motion Array Free, Pixabay. Vecteezy and Freepik may be used only when the exact asset license is recorded and any attribution requirement is satisfied.

## Licensing rule

No provenance note = no production use. A preview, screenshot, search result, or downloadable file is not proof of commercial-use rights.

Never place licensed ORIGINAL files directly into a public web path. Ship optimized derivatives only.

## Quality rule

Existing DE imagery direction remains authoritative. Do not use generic cybersecurity clichés just because they are available. Prefer visuals that feel intentional, enterprise-grade, restrained, and compatible with the actual component/crop where they will render.
