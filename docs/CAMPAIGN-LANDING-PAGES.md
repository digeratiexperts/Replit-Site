# Campaign landing pages and marketing assets

**Decision:** Paid media and search use short `/go/:slug` URLs. Each page is one offer and one primary CTA (`Get My Cyber Risk Assessment`). Supporting assets are the PDFs already in `client/public/assets/resources/` plus web-native executive briefs.

**Why:** Existing solution pages are long informational hubs. Ads need a single job, honest pricing, and a download — without inventing clients, ratings, or certifications.

## Routes

| URL | Purpose |
|-----|---------|
| `/go` | Offer index for media buyers and SEO |
| `/go/:slug` | Conversion landing page |
| `/lp/:slug`, `/ads/:slug` | Redirects to `/go/:slug` |
| `/resources/datasheets` | Real PDF library (registry only) |
| `/resources/{datasheets,reports,checklists}/:slug` | Asset landing + download |
| `/resources/briefs` | Executive brief index |
| `/resources/briefs/:slug` | Printable brief |

## Conversion priority (why these eight first)

1. Cyber Risk Assessment — primary CTA, reconciles conversation vs $2,500 CSRA
2. Managed IT / ProActive — core revenue path with canonical floors
3. Ransomware readiness — high search intent, backup honesty
4. Co-Managed IT — distinct buyer (internal IT)
5. Healthcare IT — strongest industry path
6. Cyber insurance — questionnaire season
7. Email security — phishing / invoice fraud
8. ProActive Business — mid-funnel package

## Sources

- `client/src/data/pricing.ts` and `shared/canonicalCsra.ts`
- Existing solution, industry, and blog positions
- `client/src/data/resourceRegistry.ts` + shipped PDFs

Do not add testimonials, review counts, or “DE is SOC 2 certified” language to these pages.

## Affected components

- `client/src/data/campaigns.ts`
- `client/src/data/executiveBriefs.ts`
- `client/src/pages/campaigns/*`
- `client/src/pages/resources/Datasheets.tsx` (fake placeholder titles removed)
- `scripts/generate-sitemap.mjs`
