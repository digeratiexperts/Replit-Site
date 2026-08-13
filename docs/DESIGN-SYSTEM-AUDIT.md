# Design System Audit — Digerati Experts

> Audit of the existing production site before any broad visual change. Companion to
> [`docs/DIGERATI-DESIGN-SYSTEM.md`](./DIGERATI-DESIGN-SYSTEM.md) (canonical spec) and the
> existing internal system under [`design/`](../design).
> Authoritative policy: root `.cursorrules`. **Nothing here authorizes deleting content or assets.**

**Audit date:** 2026-08-13
**Method:** static inspection of `client/`, `server/`, `design/`, `tailwind.config.ts`,
`client/src/index.css`, **plus rendered inspection** of `/`, `/solutions/managed-it-support`,
`/industries/law-firms`, `/proactive-ecosystem-pricing`, `/store` and `/portal/login` at
**1440 / 768 / 390** using headless Chrome against the local dev server, including per-element
captures of all 14 homepage bands and computed-style measurement of type, surfaces and layout.

Evidence images: [`design/audit-2026-08/`](../design/audit-2026-08).

---

## 0. Rendered evidence (2026-08-13)

Sections 1–9 below are the structural/static audit. This section is what the **running site**
actually shows, and it is the part that drives the work order. Every claim here has a measured
value or a screenshot behind it.

### 0.1 Measured baselines before any change

| Gate | Result |
|---|---|
| `npm run build` | **PASS** (5.2s). Main chunk **972.61 kB / 285.60 kB gzip** (>500 kB warning) |
| `npm run check` (tsc) | **FAIL — 73 pre-existing errors** (54 server/shared, 19 client). CI treats as informational |
| `npm test` | **FAIL — 1 suite**: `server/services/msp-advisor/msp-advisor.test.ts` → "No test suite found"; 39 tests pass |
| CI on `main` | **RED**, solely because of that one suite (`gh run view 31661163851 --log-failed`) |
| Horizontal overflow @ 1440/768/390 | **none** on the five pages audited |
| Homepage height | **15,884px @1440** · **25,973px @390** · 18 `h2` / 35 `h3` / 22 `h4` |
| Fixed chrome | `--de-nav-offset` = **182px** (utility 46 + nav ~103 + section-spy 33) |

The 73 TypeScript errors are **pre-existing and out of scope** — they are not to be "fixed"
opportunistically, so the baseline stays traceable. Only deltas against this table are reported.

### 0.2 The ten highest-impact problems, ranked

Scored 1–5 on user impact (U), conversion impact (C), visual impact (V) and implementation
risk (R). **Priority = (U + C + V) − R.**

| # | Problem | Evidence | U | C | V | R | Pri |
|---|---|---|---|---|---|---|---|
| **1** | **`PageTemplate` is a cliché generator across ~80 public routes.** It contains a glowing shield inside a glassmorphic circle, three `repeat: Infinity` blobs, two more `blur-3xl` glow orbs, a noise layer and a grid layer, over an off-token saturated `#2a0a32 → #1a0b3a` slab — and **no CTA** (only a "Back" link). Every service page and every industry page are visually identical. | `components/PageTemplate.tsx` L21–100; `before-pagetemplate-service-1440.png`, `before-pagetemplate-industry-1440.png` | 5 | 5 | 5 | 1 | **14** |
| **2** | **`document.body` computes to `rgb(255,255,255)`** on a site whose every marketing page is near-black. shadcn's light `--background` is the default and `.dark` is never applied to `<html>`. White bleeds through wherever a lazy or un-triggered section has not painted, plus FOUC before the hero and white overscroll. | computed style; `index.css:877` vs inert `.dark` at `:910`; `before-white-body-bleed.png` | 4 | 2 | 5 | 1 | **10** |
| **3** | **The heading scale is inverted.** Computed on `/`: H1 = **45.5px**; H2s = **26.25 / 31.5 / 42 / 52.5px**. Three H2s ("Frequently Asked Questions", "Start with a Cyber Risk Assessment", "Protection that fits how you actually operate") are **larger than the H1**. Nothing dominates; every band shouts equally. | computed `font-size` sweep | 4 | 4 | 5 | 2 | **11** |
| **4** | **Five competing content widths.** `max-w-[100rem]` (×8), `max-w-7xl` (×5), `max-w-[1200px]` (×5), `max-w-[1440px]` (×2), `max-w-[92rem]` (×2), plus `container`. The hero runs edge-to-edge while the next band is inset, so the left edge visibly jumps. Section padding drifts too: `py-16`(6) `py-20`(4) `py-24`(2) **`py-22`**(1, off-scale) `py-12`(1). | `rg` over `pages/sections/*.tsx` | 3 | 2 | 5 | 2 | **8** |
| **5** | **The closing CTA band fabricates trust.** Five glowing gold stars imply a 5.0 rating with no source or count (`.cursorrules` §3/§20). The heading "Enterprise-Grade Compliance & **Certifications**" sits over capability statements ("Audit readiness support", "HIPAA-minded controls"). Plus glassmorphic pills, an infinite light-sweep, and 11 staggered reveals delayed to **1.4s** so the band reads as empty on arrival. | `DigeratiCTASection.tsx` L80–160; `before-cta-1440.png` | 4 | 5 | 3 | 1 | **11** |
| **6** | **`whileInView` leaves real content invisible.** 192 uses across 48 files, 120 with `initial={{ opacity: 0 }}`. Homepage `#pricing` renders **~450px of blank black** where the four un-triggered tier cards sit. Also an LCP/CLS liability. | `before-pricing-1440.png` | 5 | 4 | 4 | 2 | **11** |
| **7** | **Imagery contradicts the locked art direction.** `#industries` uses grayscale literal-noun stock photos — scales of justice, law books, stethoscope, door handle, a hand — which `design/IMAGERY.md` and `.cursorrules` §5 explicitly ban. Cards also fade progressively darker left→right (reads as broken), and the mobile peek-carousel arrow overlaps the card. The hero photo at `opacity-.38` under a 75% black scrim reads as mud rather than depth. | `before-industries-1440.png`, `before-industries-390.png` | 3 | 3 | 5 | 3 | **8** |
| **8** | **Token drift — hard-coded hexes outnumber tokens.** `#5034ff` appears **319 times** and is not a brand colour at all; `#FFB800` ×89; `#FF477F` ×38; `#6548ff` ×32; `#c4b5fd` ×33. **Nine competing near-blacks** are in use (`#020029` `#141414` `#0a0118` `#030228` `#252550` `#1a1228` `#0f0d2e` `#0e1524` `#1A202C`) — exactly what `design/DESIGN_SYSTEM.md` forbids. Brand tokens are the minority (`#D3126A` 94, `#0a0a0a` 68, `#151217` 22, `#050312` 13). | `rg` over `client/src/**/*.tsx` | 2 | 2 | 4 | 3 | **5** |
| **9** | **The homepage is an encyclopedia, not a narrative.** 15,884px at 1440 (≈18 viewports), 18 H2s, four near-identical card grids in sequence (stats → tackle → trust → capabilities), and large dead zones in `#challenges` (~120px of empty left column), `#team` and `#cta` (~300px of empty background image). The `#stats` nav label says "Why DE" while the heading says "The Threats Are Real". | full-page metrics + per-band captures | 4 | 4 | 4 | 4 | **8** |
| **10** | **182px of fixed chrome** — utility bar 46px + main nav ~103px + section-spy 33px — is ~20% of a 900px viewport before any content, and three stacked bars on mobile. | live `--de-nav-offset` | 4 | 3 | 3 | 3 | **7** |

### 0.3 Tracked runners-up

`/store` `<title>` duplicates its suffix ("IT Services Store | Digerati Experts | Digerati Experts") ·
70–86 interactive elements under 32px tall on every page audited · one heading-order skip per inner
page · `repeat: Infinity` in 8 files / 17 occurrences · `backdrop-blur` ×216 across 77 files ·
`bg-clip-text` gradient text ×39 across 27 files (on `/`: "protected 24/7.", "how you actually
operate.", "Serve", "Insights", plus every MegaMenu column heading) · `Button`'s `brand` variant is a
three-stop gradient with a pink glow while the brand calls for solid `#D3126A` · two focus-ring systems
(`ring-purple-500` in `button.tsx` vs the global magenta ring in `index.css`) · a 972 kB main chunk ·
a framer-motion "non-static position" console warning on `/` · confirmed-dead code
(`lib/designSystem.ts`, `Homepage.tsx` + the Figma section stack, `hero.tsx`, `navbar.tsx`,
`Footer.tsx`, `DigeratiHeroSection.tsx`, `DigeratiFooterSection.tsx`, `AnnouncementBanner.tsx`).

### 0.4 Two integrity findings (content, not styling)

**Fabricated rating signal.** `DigeratiCTASection` renders five gold `Star` icons with a glow and no
review source, above a "…& Certifications" heading. `.cursorrules` §3 forbids manufacturing ratings and
§20 forbids certification signalling DE cannot support. Commit `e83a95a` already replaced the SOC 2 /
HIPAA badge *text* with capability language but left the misleading heading and the stars.

**Stale content presented as current.** `#insights` is titled "Recent Threats & Insights" and shows
items dated **January 7 2026, December 5 2025 and December 16 2025** — seven to eight months stale as of
2026-08-13, violating `.cursorrules` §34. Verified during this audit: **no live feed exists and none was
partially implemented.** `DigeratiThreatsInsightsSection.tsx` holds a hardcoded three-item array with
hardcoded date strings; `pages/resources/SecurityUpdates.tsx` is fully static (no `useQuery`, no
`fetch`); and `server/routes.ts` has no CISA/KEV/threat endpoint.

### 0.5 What is genuinely good and must be preserved

This site is not short of content or capability — it is short of a *system*. The following already
work and must be elevated in place, never replaced:

- **The engage-path sculptures** in `#services` (`lib/visualAssets.ts`) — the strongest visual asset DE
  owns: graphite / smoked glass / violet-as-light, consistent camera and materials. `before-services-1440.png`.
- **The hero right-rail assessment graphic** (`graphics/DashboardMockup.tsx`) — a distinctive, premium
  product visualization. Its *concept*, its four review-area tiles and its three outcome lines are all
  sound. Only the invented numeric posture scores are a problem (see §0.6).
- **The sourced statistics** in `#stats` — Verizon DBIR, IBM Cost of a Data Breach, Microsoft Digital
  Defense Report, FBI IC3 — with visible attributions. This is exactly what `.cursorrules` §33 asks for.
- **The honest empty states** in `#testimonials` / `#proof` — "We publish only real client reviews —
  never placeholders." This is `.cursorrules` §36 done correctly.
- **The `--de-*` chapter ladder** (well / surface / raised / paper / magenta) and its utility classes.
- **The founder section's content**, the Client Bill of Rights, the Trust Center, and the ProActive
  IT / Office / Business / Enterprise architecture.

### 0.6 Correction: the hero graphic is a *honesty* fix, not a redesign

`graphics/DashboardMockup.tsx` defines `postureBars` with hardcoded levels — Identity 78, Endpoints 84,
Email 72, Backups 88, Controls 70, Overall 80 — rendered as a labelled bar chart. The component carries
`aria-hidden` on the chart and a source comment stating the bars are "unlabeled example levels — not
customer metrics", but neither changes what a visitor sees: a scored security-posture chart with named
axes. That single block must lose its numbers. Secondary issues: five competing bar colours including an
off-ladder emerald, macOS-style traffic-light window dots that push the piece toward "admin dashboard
screenshot", no illustrative labelling, and `hidden lg:flex` so tablet and mobile visitors never see the
hero's main visual at all. **Everything else about the graphic is kept.**

### 0.7 Contrast methodology (read before quoting any contrast number)

A naive contrast sweep that walks up the DOM for the first non-transparent `background-color` reports
**false 1:1 failures** on this site, because it stops at translucent overlays such as
`rgba(255,255,255,0.05)` and treats them as opaque white. Only **alpha-composited** results are
trustworthy. That corrected sweep is what surfaced the white-`body` bug in §0.2 #2. No raw contrast
counts from the naive method appear in this document, and a repeatable composited harness is added under
`scripts/` so the figure can be re-measured rather than re-guessed.

### 0.8 Corrections to the static audit below

Sections 1–9 were written from source inspection alone. Rendering corrects three things:

1. **§1.12 / §4.8 understate the shadcn theme problem.** The inert `.dark` block is not merely a
   "latent visual bug" — it produces a live white `body` that users can see (§0.2 #2).
2. **`PageTemplate` is never named** as a problem, yet it is the single largest source of design debt
   on the site by reach (~80 routes) and the only place the forbidden glowing-shield cliché ships.
3. **§4.1 / §4.5 are directionally right but unquantified.** The specific numbers — five content widths,
   an inverted 45.5px-H1-vs-52.5px-H2 scale, 15,884px of homepage — are what make the case actionable.

### 0.9 Reference availability

**Rambox `DESIGN.md`, Evervault `DESIGN.md` and Relume exports are NOT present in this repository.**
`design-references/` is empty intake scaffolding. Their contents must not be invented or paraphrased
from memory. Where this audit and the canonical design system cite "Rambox-level polish" or
"Evervault-level credibility", those are DE's stated quality targets, not quotations from files.

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

## 9. Recommended phase sequencing (approved by DE 2026-08-13)

Hard gate: **Phase A (foundation) → Phase B (homepage proof) → STOP for DE before/after review.**
No `PageTemplate` / ~80-route rollout until that checkpoint is approved.

- **Phase A:** evidence audit (§0) · canonical design system · dark `body` · type/width/rhythm/motion
  tokens · `Section`/`Container` · typography utilities · `cta` button variant · `RevealOnScroll`
  policy · Vitest exclude for the pre-existing `node:test` advisor suite.
- **Phase B:** hero (refine `DashboardMockup`, do not replace) · credibility/proof · engagement paths ·
  one content section · **before/after at 1440/768/390** · validation report · **STOP**.
- **Later (gated):** PageTemplate with pageKind variation · industry imagery · closing CTA honesty ·
  insights gateway · homepage condensation · marketing token sweep.

Preserve → elevate → consolidate → relocate. Never delete DE content or assets without approval.

