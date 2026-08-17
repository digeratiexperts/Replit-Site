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
- Portal, login, and signup are out of scope unless DE asks for a separate portal UI pass.
- Dead `client/src/pages/Homepage.tsx` and the legacy sections it imports are not routed (`/` uses `DigeratiHomepage`). Sweeping them is diff noise.
- Intentional exceptions live in `EXCEPTIONS` inside `scripts/brand-audit.mjs`: store category pills, vendor marks, hero lighting, semantic status/charts, official city chips.

## Named leftovers

| Item | Where | Why it is parked | Next move |
|------|--------|------------------|-----------|
| Magenta as text on paper (~3.6:1) | `ComplianceCertifications.tsx` outline buttons; `SecurityUpdates.tsx` source / severity labels | `#D3126A` as a **fill** on dark is fine. As **text on paper** it fails AA. | Add a darker paper-ink token. Do not darken the CTA fill. |
| Quote wizard 1.14:1 on slate-900 | `/quote-wizard` | Not an audit miss. Labels, headings, and outline buttons were `slate-900` / `gray-900` on `--de-bg` `#050312` (~1.14:1). The form was a light-theme recipe dropped on the dark canvas. | Settled on `cursor/quote-wizard-contrast-3080`: existing fields sit on `de-paper-lift-lg` (same recipe as contact). `behind()` left alone. |
| `#5034ff` “Sign Up” | `/de-ecosystem-matrix-offical`, `/official-network-planner` | Official-tool pages, not the marketing/store system. | DE decides whether those tools join the accent system. |
| Yellow star glyphs | `/thank-you-success-page` | Rating affordance, not brand chrome. | Leave unless DE wants a different rating treatment. |
| Legacy unused purple | `Homepage.tsx` + `HeroSection`, `PricingSection`, `ServicesSection`, `BlogSection`, `FooterSection`, `CallToActionSection`, `ContactSection` | Not reachable. | Delete only if DE approves removing dead code; do not restyle in place. |
| Portal palette | `/portal/*` | Explicitly excluded from this sweep. | Separate portal UI audit if DE asks. |

## Optional later

1. Paper-ink token for magenta-on-white text.
2. Official-tool hue decision (`#5034ff` vs electric vs magenta).
3. Portal UI pass — only if requested.
