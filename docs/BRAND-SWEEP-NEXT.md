# Brand sweep — next pass

**Date:** 2026-08-16  
**Settled on:** `cursor/homepage-retire-leftover-purple-chrome-3080` / PR #20  
**Do not start** another full-site rewrite. Start from the named flags below.

The audit (`scripts/brand-audit.mjs`) is a regression detector, not a requirement to force every route to zero flags.

## Already settled — do not re-litigate

- Marketing field stays the charcoal ladder. Primary CTA fill is solid `#D3126A`.
- Page families keep one topical hue: store → electric, support → cyan, resources → amber, everything else inherits magenta.
- **Locked (DE):** Blog/Journal and Store keep the colors they have now. Do not restyle those palettes. Rule: `.cursor/rules/blog-store-color-lock.mdc`.
- Store category pills stay pill-only and use 14 distinct hues. `comanaged_subscriptions`, `comanaged_onboarding`, and `digital_templates` keep their pre-sweep taxonomy colours (violet / purple / indigo). Do not apply the marketing-page “remove purple” rule to those pills. Everything else in the store palette stays as it currently looks. Guard: `client/src/components/store/categoryAccent.test.ts`.
- Portal, login, and signup join the magenta accent system when DE asks (see leftovers).
- Dead `Homepage.tsx` and its unused Figma sections were deleted after DE approval (`cursor/brand-leftovers-3080`). `/` stays `DigeratiHomepage`.
- Intentional exceptions live in `EXCEPTIONS` inside `scripts/brand-audit.mjs`: store category pills, vendor marks, hero lighting, semantic status/charts, official city chips.

## Named leftovers

| Item | Where | Why it is parked | Next move |
|------|--------|------------------|-----------|
| Magenta as text on paper (~3.6:1) | `ComplianceCertifications.tsx` outline buttons; `SecurityUpdates.tsx` source / severity labels | `#D3126A` as a **fill** on dark is fine. As **text on paper** it fails AA. | Add a darker paper-ink token. Do not darken the CTA fill. |
| Quote wizard 1.14:1 on slate-900 | `/quote-wizard` | Almost certainly a backdrop-measurement miss in the audit, not a purple regression. | Confirm in the browser, then fix `behind()` in `brand-audit.mjs` if the form is actually readable. |
| `#5034ff` “Sign Up” | Official tools + portal login | DE asked these tools to join the accent system. The `#5034ff` “Sign Up” string is the portal login link; official-tool pages no longer use that fill. | Official-tool violet glow retired. Portal Sign Up / fills move to magenta in the portal commit. |
| Yellow star glyphs | `/thank-you-success-page` | Unsourced ★★★★★ is a fabricated rating. | Removed. Badge now links to `/#google-reviews` with no star count. |
| Legacy unused purple | `Homepage.tsx` + unused Figma sections | DE approved deletion. | Deleted. Live homepage is still `DigeratiHomepage`. |
| Portal palette | `/portal/*` | DE asked for the pass. | `#5034ff` / violet fills → magenta tokens. Paths stay `/portal/login`. |

## Optional later

1. Paper-ink token for magenta-on-white text (separate PR).
2. Quote-wizard contrast (separate PR).
