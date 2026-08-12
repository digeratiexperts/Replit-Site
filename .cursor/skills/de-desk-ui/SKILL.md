---
name: de-desk-ui
description: >-
  Designs and restyles the DE Desk support widget (Desk / Ticket / Resources)
  to DE’s approved dark-glass + dual-tone playbook. Use when editing
  ZohoASAPWidget, DE Desk, Ask DE, ASAP widget, support modal tabs, desk
  resources copy, or when DE attaches DE Desk mockups / asks for Desk UI polish.
---

# DE Desk UI

## Before you edit

1. Read this skill, then [tokens-and-structure.md](tokens-and-structure.md).
2. Open mockups under [references/](references/) with the Read tool (images):
   - `resources-premium.png` / `resources-dark.png` — Resources quality bar
   - `desk-dual-tone.png` — Desk light chat insert
   - `ticket-dark.png` — Ticket dark nested form
3. Screenshot live site with Browser after changes; compare to mockups.
4. Prefer **Gemini 3.1 Pro** or **Composer 2.5** for visual passes when available.

## Non-negotiables

- **One shell** for all three tabs: dark glass chrome (header, underline tabs, status, footer).
- **Resources** dark card UI is the quality reference — match its depth, borders, glow, spacing.
- **Desk** = light nested panel inside that shell (high-contrast chat).
- **Ticket** = dark nested panel in the same language as Resources (not a random light form).
- **Function labels**, not vendor names (`Remote session` not `Zoho Assist`). Keep hrefs.
- Do **not** remove tabs, CTAs, disclaimers, or resource rows without asking DE.
- Do **not** invent `//login`; use `PORTAL_LOGIN`.
- Preserve advisor chat, poll, agent live, ticket API, analytics, ASAP bootstrap.

## Workflow

```
DE Desk UI checklist:
- [ ] Shell chrome shared (no per-tab conflicting tab styles)
- [ ] Resources still feels like references/resources-*.png
- [ ] Desk is light nested readable chat
- [ ] Ticket is dark nested (hero + chips + form)
- [ ] Copy is function-based
- [ ] Contrast checked (no white-on-white buttons)
- [ ] Browser screenshot vs mockup
- [ ] Logic untouched unless requested
```

### Restyle pass

1. Change layout/classes in `client/src/components/ZohoASAPWidget.tsx` only as needed.
2. Keep `RESOURCE_LINKS` titles functional; tags describe capability.
3. Deploy path (production): commit → push `main` →  
   `sudo -u diger7051 bash -lc 'DEPLOY_BRANCH=main bash /home/digeratiexperts.com/current/deploy/vps/deploy.sh production'`

### If DE says “Resources good, X sucks”

- Keep Resources.
- Fix X to the shell + panel model above.
- Do not reinvent the whole modal theme.

## Anti-patterns

- Juxtaposed light inactive tabs only on one tab while others use underline dark tabs
- Muddy mid-gradient chat backgrounds that kill text contrast
- Product/vendor branding in client-facing resource titles
- Outline buttons with default `bg-background` on dark pages (renders blank white)
- Purple-on-cream / generic AI SaaS aesthetics unrelated to DE magenta brand
