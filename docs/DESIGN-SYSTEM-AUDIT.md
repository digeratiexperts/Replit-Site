# Design System Audit — Digerati Experts

> Phase 1 deliverable. Read-only audit of the existing production site before any broad
> visual change. Companion to [`docs/DIGERATI-DESIGN-SYSTEM.md`](./DIGERATI-DESIGN-SYSTEM.md)
> (canonical spec) and the existing internal system under [`design/`](../design).
> Authoritative policy: root `.cursorrules`. Nothing here authorizes deleting content.

**Audit date:** 2026-08 · **Branch:** `cursor/design-system-audit-a75a`
**Method:** static inspection of `client/`, `server/`, `design/`, `tailwind.config.ts`,
`client/src/index.css`; rendered inspection of `/`, `/proactive-ecosystem-pricing`,
`/portal/login` via the local dev server.

---

## 1. What currently exists

### 1.1 Framework & application architecture
- **Client:** Vite + React 18 + TypeScript SPA. Routing via **wouter** (`client/src/App.tsx`).
- **Server:** Express (`server/index.ts`) serving the built SPA and the API; Vite
  middleware in dev. Drizzle ORM (Postgres) with a graceful **in-memory fallback** when
  `DATABASE_URL` is unset.
- **Styling:** Tailwind CSS 3 + **shadcn/ui** (new-york style, `components.json`), CVA for
  variants, `tailwind-merge`/`clsx` via `lib/utils.ts`.
- **Data/state:** `@tanstack/react-query`, React Context for cart/booking, `zustand` present.
- **Animation:** `framer-motion` (~77 files) + CSS keyframes in `index.css` + `tailwindcss-animate`.
- **Icons:** `lucide-react` (~203 files, dominant); `react-icons` in a single legacy file.
- **SEO:** `react-helmet-async` + `hooks/useSEO.ts` (title/meta/canonical/robots) +
  `components/JsonLd.tsx` (Organization, WebSite, FAQ, Article, Product, Service, Breadcrumb).

### 1.2 Routing
- One `<Switch>`/`<Route>` tree in `App.tsx`. Homepage (`/` → `pages/DigeratiHomepage.tsx`)
  is eagerly imported; ~120+ other pages are `React.lazy` + `<Suspense>`.
- Dynamic route families from `pages/routes/servicePages.tsx` → `GenericServicePage`
  (services, industries, resources, support).
- Redirects encode canonical paths (e.g. `/login` → `/portal/login`, `/contact` → `/#contact`).
- **No shared marketing layout wrapper** — each page composes `MegaMenu` + footer itself
  (or via `PageTemplate` / homepage `FullPageScrollProvider`). Only `MarketingChrome`
  (the DE Desk widget), cart drawer, booking modal, sticky CTA, exit-intent, and cookie
  banner are truly global (from `App.tsx`).

### 1.3 Styling system & design tokens (three coexisting layers)
1. **Canonical DE tokens** — `--de-*` in `client/src/index.css` (`:root`) mapped to Tailwind
   `colors.de.*` in `tailwind.config.ts`. The intended brand system: graphite ladder
   (`--de-bg #050312` → `--de-surface #0a0a0a` → `--de-raised #151217`), hairlines, paper
   chapters (`--de-paper #f7f5f2`), brand magenta `--de-magenta #D3126A`, violet
   `--de-violet #5B45E0`, plus chapter utility classes (`.de-dark-well`, `.de-paper-chapter`,
   `.de-brand-energy-band`, chapter fades/seams). Documented in `design/DESIGN_SYSTEM.md`.
2. **shadcn HSL tokens** — `--background`/`--foreground`/`--primary`/… with a `.dark` block
   and `darkMode: ["class"]`. Default is a **light** theme; `.dark` is **never applied to
   `<html>`**, so portal `dark:` utilities largely don't activate.
3. **Legacy `lib/designSystem.ts`** — an off-brand token object (purple→blue gradients,
   cyan accents, `bg-white`, gray text, glassmorphism, glow shadows). **Zero imports** —
   dead code that contradicts the brand.

Adoption is uneven: the `de-*` chapter system is used mainly on the homepage and a few
shells (~21 files), while glassmorphism / purple→blue / cyan / hard-coded hexes remain the
dominant styling path across inner pages, store, legal, trust, and portal (~100+ files).

### 1.4 Typography
- Space Grotesk (headings), Inter (body), Oxanium/JetBrains Mono (stats) — set in
  `index.css` `@layer base` and `tailwind.config.ts` (`font-heading`/`font-sans`/`font-mono`).
- Root font-size **14px** (15px ≥1920px, 16px ≥2560px). Heading tracking `-0.015em`…`-0.03em`,
  line-height `1.15`; body line-height `1.6` (prose `1.75`).
- **Weakness:** section H2s frequently jump to `text-5xl`/`text-6xl` with `text-2xl` body,
  flattening hierarchy (documented in `design/references/clarity-bar-rambox-monday-2026-08.md`).

### 1.5 Global CSS (`client/src/index.css`, ~1,270 lines)
- Brand tokens + chapter utilities (good, canonical).
- Accessibility: `:focus-visible` ring, `.skip-link`, `prefers-reduced-motion`,
  `prefers-contrast`, `forced-colors`, autofill styling.
- **Bloat/■off-brand:** large blocks of decorative utilities — `.glass`/`.glass-dark`,
  `pulse-glow`, `text-gradient-animate`, `animate-float`, `hover-glow`, scroll-progress,
  ripple, marquee, wave separators, per-city palettes — several of which contradict the
  brand's "restraint / no excessive glow / no glassmorphism everywhere" rules.
- **Duplicate declarations:** `html { scroll-behavior }`, `:focus-visible`, and
  `prefers-reduced-motion` are defined more than once; `@tailwind` directives appear twice.

### 1.6 Tailwind configuration (`tailwind.config.ts`)
- Extends fonts, `colors.de.*`, radius tokens, radial gradient, accordion animation.
- Container centered, padding `1rem`, `2xl` max `1680px`.
- Plugins: `tailwindcss-animate`, `@tailwindcss/typography`. `darkMode: ["class"]`.
- **Gap:** spacing scale, section-spacing scale, elevation/shadow scale, and motion-duration
  tokens are **not** codified in config — they live as ad-hoc utility strings per component.

### 1.7 Reusable UI primitives
- **shadcn/ui** (`components/ui/*`, ~49 files): button, card, badge, accordion, dialog,
  drawer, sheet, tabs, table, form, input, textarea, select, checkbox, radio-group, switch,
  slider, calendar, carousel, command, popover, dropdown-menu, navigation-menu, sidebar,
  toast/toaster, tooltip, skeleton, progress, breadcrumb, pagination, alert, alert-dialog,
  avatar, chart, plus bespoke `enhanced-input`, `premium-slider`.
- **Bespoke marketing primitives:** `Button` (shadcn, with `brand` gradient variant),
  `visual/IconWell` (canonical icon container), `StatCallout`/`StatBanner`, `PremiumCTASection`,
  `PageTemplate`, `RevealOnScroll`, `SectionPatterns` (pattern overlays, dividers, glow orbs),
  `ServiceMatrix`/`ServiceCapabilityMatrix`, `EcosystemProgression`, `TierDetailTemplate`,
  `JsonLd`, booking components. Centralized copy in `lib/ctaCopy.ts`; pricing data in
  `data/pricing.ts`.

### 1.8 Page layouts & responsive behavior
- Homepage uses `FullPageScrollProvider` with proximity scroll-snap (desktop only; disabled
  ≤1023px and under reduced-motion). Inner pages use `PageTemplate` or bespoke composition.
- Container/padding are consistent via Tailwind container + `de-nav-clear`.
- Responsive is generally present (Tailwind breakpoints), but several bands are "shrunk
  desktop" (e.g. N×2 card grids collapsing) rather than recomposed for mobile.

### 1.9 Animations
- `framer-motion` for reveals/hover/scroll; `RevealOnScroll`; CSS keyframes (marquee, waves,
  glow, shimmer). Reduced-motion is respected in most motion components and globally.
- **Weakness:** decorative motion (floating orbs, glow pulses, gradient text) appears in
  places that the brand says to avoid.

### 1.10 Icons
- One family for chrome/interface: **lucide-react** (correct per `IMAGERY.md`).
- Marketing cards should use Lucide inside `IconWell` (muted violet well). Legacy `react-icons`
  usage is a single file (`ThankYouSuccess.tsx`) — consolidate to Lucide.

### 1.11 Images & 3D assets
- Locked art-direction system: dark technical sculpture (graphite/smoked-glass/violet-as-light).
  Registry: `client/src/lib/visualAssets.ts`; engage-path stills in
  `client/public/images/visual-system/engage-paths/`. Quality bar in `design/approved/`.
- Rules already documented in `design/IMAGERY.md` (concept-not-noun; sculptures only on
  engage-path cards; no laptop/robot/lock stills on marketing cards).
- **Weakness:** legacy Meshy stills and decorative graphics (`components/graphics/*`) exist
  and must not leak onto marketing cards.

### 1.12 Dark/light theme support
- **No runtime theme toggle** (no `next-themes`). Marketing is effectively hard-dark via the
  `de-*` chapter system; light "paper" chapters are explicit sections, not a global theme.
- The shadcn `.dark` block is inert (never toggled). Portal uses a fixed dark navy shell with
  `dark:` utilities that mostly don't fire — a latent inconsistency.

### 1.13 Accessibility implementation
- Present: skip link, visible `:focus-visible` rings (magenta), semantic headings in base CSS,
  reduced-motion, high-contrast/forced-colors handling, `AccessibleAnnouncer`, `VisuallyHidden`,
  touch-target guidance (~44px). Radix primitives bring keyboard/ARIA for menus/dialogs.
- **Watch items:** contrast of muted-on-dark text (`white/45`), gradient-text legibility,
  and ensuring restyled cards keep focus states and touch targets.

### 1.14 Store architecture (integration-sensitive)
- Pages: `store/{StoreLanding, ManagedStore, CoManagedStore, ProductDetail, Checkout,
  OrderConfirmation, QuoteRequest, QuoteConfirmation}`. Components in `components/store/*`
  (cart, product cards, toolbar, bundles, rails, compare, configure drawer, guided wizard).
- Data: `data/storeProducts.ts` (primary catalog), `data/storeCatalog.ts` (public view),
  `data/storeMerchandising.ts`, `data/pricing.ts` (canonical tier pricing).
- State: `contexts/CartContext.tsx` (localStorage `digerati-store-cart`); `hooks/useStoreAuth.ts`
  (shares `portalToken`; `canPurchase` = comanaged/admin).
- Zoho checkout touchpoints: `POST /api/store/checkout/zoho`, quote requests, order fetch.

### 1.15 Portal architecture (integration-sensitive)
- `PortalLayout` (sidebar + top bar, fixed dark navy) wraps ~40 authenticated pages; auth
  pages (login/signup/forgot/reset) are standalone cards. RBAC via `lib/portalRoles.ts`.
- Client session is imperative (localStorage `portalToken`/`portalUser` + httpOnly cookie),
  through `lib/portalApi.ts`; 401 → `redirectToPortalLogin()`.
- Canonical login **`/portal/login`** (in-app path) and absolute `PORTAL_LOGIN`
  (`lib/portalUrls.ts`) for cross-host links — **never `//login`**.

### 1.16 API/integration-sensitive components
- Forms (RHF+zod mostly): contact, assessment/lead, lead-quote wizard, newsletter, store
  checkout/quote, public ticket, portal login/signup/forgot/create-ticket/order-form/surveys.
- Widgets/flows: `TurnstileWidget` (captcha), `ZohoASAPWidget` (DE Desk chat + ticket +
  resources; `de-open-msp-advisor` event), `ZohoBookingWidget`/`BookingModal`, MSP advisor
  (`/api/public/advisor/chat`), analytics (`lib/analytics.ts`, consent-gated),
  `CookieConsentBanner`, `ExitIntentPopup`, `StickyCTABar`.

---

## 2. What should remain (preserve — do not delete)

Per `.cursorrules` §2/§16/§17 and the user's preservation rule, **keep all of the following**;
restyle in place, never remove without DE approval:

- All routes and pages (marketing, solutions, services, industries, resources, about, support,
  legal, trust, locations, pricing tools, store, portal).
- All homepage sections and their content/CTAs/stats (relocate, don't delete, if simplifying).
- Store catalog, cart, checkout, quote, and order flows + their data files and Zoho touchpoints.
- Portal auth/session, RBAC, layout nav, MFA, impersonation, contracts/signature, chat.
- All forms and their POST payload field names; Turnstile wiring; analytics + consent gates.
- SEO: `useSEO` calls, `JsonLd` mounts, portal `noIndex`, `index.html` static schema.
- Canonical portal routing rules (`/portal/login`, absolute `PORTAL_LOGIN`).
- The existing `design/` system (BRAND/DESIGN_SYSTEM/IMAGERY/UX_PRINCIPLES, approved/rejected).
- The canonical `--de-*` token system, brand fonts, magenta/violet palette, imagery registry.

---

## 3. Duplicated / inconsistent UI patterns

| Pattern | Duplicates found | Recommendation |
|--------|------------------|----------------|
| **Design tokens** | `--de-*` (canonical) vs shadcn `.dark` (inert) vs `lib/designSystem.ts` (dead, off-brand) | Make `--de-*` canonical; retire `lib/designSystem.ts`; decide portal theme strategy (see §6 doc). |
| **Hero** | `ModernHeroSection` (live) + `DigeratiHeroSection` (orphan) + `HeroSection` (Figma) + `hero.tsx` (dead) | Keep live; quarantine/remove dead after confirming no imports. |
| **Footer** | `DigeratiEnhancedFooterSection` (live) + `DigeratiFooterSection` + `FooterSection` + `Footer.tsx` | Standardize on the enhanced footer. |
| **CTA surfaces** | `DigeratiCTASection`, `PremiumCTASection`, `CallToActionSection`, `LeadCaptureBand`, `StickyCTABar`, `ExitIntentPopup` | Consolidate into one `CTA` primitive + variants; keep distinct behaviors. |
| **Service cards** | `DigeratiServicesSection`, `ServicesSection`, inline cards in `GenericServicePage` | One `ServiceCard` primitive. |
| **Pricing** | `DigeratiPricingSection`, `PricingSection`, `PricingToolsSection`, `EcosystemProgression`, `ProActiveEcosystemPricing` | One `PricingCard` + `ComparisonTable`, all fed by `data/pricing.ts`. |
| **Stats** | `DigeratiStatsSection` inline cards vs `StatCallout`/`StatBanner` | One `Stat` primitive; prefer a number strip over four cards. |
| **Testimonials** | `DigeratiTestimonialsSection` (live, API-aware) vs `TestimonialsSection` (legacy) | Keep live; retire legacy. |
| **Nav** | `MegaMenu` (live) vs `NavigationSection`/`navbar.tsx` (dead) | Keep MegaMenu. |
| **Accordion** | shadcn `ui/accordion` vs custom motion accordion in FAQ | Standardize on shadcn accordion styled to brand. |
| **Section shell** | Repeated `max-w-7xl mx-auto px-4` + chapter classes, no `Section`/`Container` component | Introduce `Section` + `Container` primitives. |
| **Icons** | lucide-react (dominant) + react-icons (1 file) | Consolidate to lucide. |
| **Section backgrounds** | `SectionPatterns` defaults use off-brand hexes (`#0a0118`, `#F7FAFC`) + glow orbs | Re-point to `--de-*`; drop decorative orbs. |

Dead/legacy (no imports found): `Homepage.tsx` + the Figma section stack, `hero.tsx`,
`navbar.tsx`, `Footer.tsx`, `lib/designSystem.ts`, `DigeratiHeroSection.tsx`,
`DigeratiFooterSection.tsx`. `AnnouncementBanner.tsx` exists but is unwired. **Do not delete
in the audit phase** — flag, confirm zero references, then remove in a dedicated cleanup PR.

---

## 4. Visual weaknesses (grounded in rendered inspection + code)

1. **"Template, not composition."** Several bands are repeated card grids (4 stat cards → 6
   tackle cards → 6 capability cards). One idea per band with varied composition is missing.
2. **Flat type hierarchy.** Oversized H2 + oversized body means nothing reads as quiet;
   the primary message doesn't dominate.
3. **Decoration competing with content.** Glow orbs, radial blobs, glassmorphism, gradient-text,
   and floating animations dilute the premium/restrained brand and add JS/paint cost.
4. **Token drift.** Off-brand purple→blue/cyan gradients and hard-coded hexes on inner/store/
   legal pages break cohesion with the homepage's graphite+magenta chapter system.
5. **Inconsistent surfaces & elevation.** Cards vary in radius, border, padding, and background
   (some `bg-white/5 backdrop-blur`, some `de-raised`), so the interface doesn't feel unified.
6. **Mobile is often shrunk, not recomposed** for several grids and comparison tables.
7. **CTA sprawl.** Multiple CTA components with differing treatments weaken the single
   canonical action ("Get My Cyber Risk Assessment").
8. **Portal theme ambiguity.** `dark:` utilities that never activate = latent visual bugs.

---

## 5. Components that should become shared primitives

Real, repeated usage justifies these (build in Phase 3, adapt existing where possible):

- `Section` (chapter/background/spacing variants over `--de-*`) and `Container` (widths).
- `Button` — already canonical (`components/ui/button.tsx`); migrate inline gradient buttons to it.
- `Badge`, `Card`, `FeatureCard`, `ServiceCard`, `IconWell` (exists — standardize usage).
- `Stat` (+ number strip), `Testimonial`, `LogoCloud`/trust rail.
- `CTA` (one component, behavior variants), `PricingCard`, `ComparisonTable`.
- `Accordion` (brandized shadcn), `Modal` (shadcn dialog wrapper), form-control set (shadcn).
- `Navigation`/`Footer` — already single live implementations; keep and tokenize.

Avoid over-abstraction: only extract where two or more real call sites exist.

---

## 6. Where Relume patterns would materially improve UX

Use Relume as a **structural** reference (not a paste source) for:

1. **Hero** — claim + one product/system visual + one primary CTA; recomposed mobile column.
2. **Service presentation** — differentiated bands (engage paths) instead of uniform card grids.
3. **Feature grids** — 3-up feature blocks with real hierarchy and iconography.
4. **Pricing & comparison** — tier cards + a scannable comparison table (mobile-friendly).
5. **FAQ** — accordion IA and question grouping.
6. **CTA / contact / booking** — single-action conversion bands and booking flow layout.
7. **Resources / case studies / testimonials** — editorial list/detail patterns.

See `design-references/relume/README.md` for import rules.

## 7. Where GetDesign DESIGN.md principles should improve presentation

(Rambox/Evervault `DESIGN.md` files are **not yet in the repo** — see `design-references/`.)

- **Rambox (primary):** editorial spacing rhythm, type hierarchy over volume, surface/elevation
  discipline, "imagery is the system," one primary action — apply to hero, services, pricing.
- **Evervault (secondary):** calm, credible cybersecurity/trust presentation without cliché —
  apply to trust/proof, assessment, compliance, and industry pages.
- **Supporting (optional):** Stripe for pricing/comparison + form ergonomics; Vercel for
  restrained dark surfaces + diagram/code presentation; HashiCorp for dense technical IA.

Fold concrete principles into `docs/DIGERATI-DESIGN-SYSTEM.md` once the files are provided.

---

## 8. Do-not-touch / high-risk list for any visual refactor

Restyle is fine **only if** DOM hooks, payloads, and flows are preserved:

- Portal auth/session (`portalApi.ts`, login/MFA/Zoho SSO), `PORTAL_LOGIN`, `/portal/login`.
- Store cart/checkout (`CartContext` localStorage schema, `ShoppingCart`, `Checkout`, Zoho URLs),
  `useStoreAuth` role gating.
- `TurnstileWidget` (keep `data-testid` + callbacks), all form field names/payloads.
- `ZohoASAPWidget` (DE Desk) chat/ticket + `de-open-msp-advisor`; `ZohoBookingWidget` embed.
- Analytics + consent (`analytics.ts`, `CookieConsentBanner`), SEO (`useSEO`, `JsonLd`, noindex).

---

## 9. Recommended phase sequencing (no destructive work)

- **Phase 2 (next):** finalize `docs/DIGERATI-DESIGN-SYSTEM.md` tokens + component contracts;
  codify spacing/elevation/motion tokens in `tailwind.config.ts` / CSS variables.
- **Phase 3:** build/normalize shared primitives (`Section`, `Container`, `Card`, `ServiceCard`,
  `Stat`, `CTA`, `PricingCard`, `ComparisonTable`) on `--de-*`; migrate call sites incrementally.
- **Phase 4:** redesign the homepage hero + the next 2–3 sections as the proving ground.
- **Phase 5:** visual + technical review (lint/types/tests/build + 390/768/1440 + console).
- **Phase 6:** progressive rollout across remaining public pages; dead-code cleanup PR.
