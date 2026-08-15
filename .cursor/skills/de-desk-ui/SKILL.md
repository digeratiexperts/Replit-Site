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

- **One shell** for all three tabs: light chrome (header, underline tabs, status) + dark composer/footer.
- **Content boxes** are dark (hero, rows, inputs) on the light body — that contrast is the quality reference.
- **Desk / Ticket / Resources** share that language. Do not put a second nested theme per tab.
- **Function labels**, not vendor names (`Remote session` not `Zoho Assist`). Keep hrefs.
- Do **not** remove tabs, CTAs, disclaimers, or resource rows without asking DE.
- Do **not** invent `//login`; use `PORTAL_LOGIN`.
- Preserve advisor chat, poll, agent live, ticket API, analytics, ASAP bootstrap.

## Workflow

```
DE Desk UI checklist:
- [ ] Light shell chrome shared (no per-tab conflicting tab styles)
- [ ] Dark boxes on the light body (hero, rows, inputs)
- [ ] Dark composer + footer on all tabs
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
