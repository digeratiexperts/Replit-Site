# Product media

Store visual grammar. Layer 7 of Visual System v2. Parent: `VISUAL_SYSTEM_V2.md`.

**P0 for the program, docs-only this sprint.** Implementation is VIS-011. Do not restyle Store cards, pills, or electric atmosphere in VIS-001.

Color lock remains authoritative: `.cursor/rules/blog-store-color-lock.mdc`. Store page accent is electric (`--de-accent-rgb: 29 111 242`; ink `111 179 255`). Category pills stay the 14 distinct hues in `categoryAccent` (`StoreProductCard.tsx`, guarded by `categoryAccent.test.ts`). Vendor marks stay vendor colors. Primary marketing CTA fill stays `#D3126A` even on Store chrome that is not the page accent.

Gold (`#e7b20d`) is wordmark bars only — not a Store fill.

---

## Distinction the Store must keep

| Audience | Frame |
|----------|--------|
| New prospects | Solutions — not a commodity shelf as the brand story |
| Existing clients | Client Marketplace |

The Store must not make Digerati Experts appear to be primarily a hardware retailer (`.cursorrules` §18). Improve categorization, filters, navigation, product hierarchy, service context, buyer guidance, cross-selling, and mobile UX. Do not remove valid catalog items merely to simplify the UI.

---

## Current implementation (preserve, then elevate)

| Piece | Where | Rule |
|-------|-------|------|
| `ProductMedia` | `client/src/components/store/ProductMedia.tsx` | Vendor plate is the subject. Category / atmosphere art is background only |
| `getProductVisual` | `client/src/data/productImages.ts` | Resolver: product / sku override / meshy / category. No client-side `MESHY_API_KEY` |
| `categoryAccent` | `StoreProductCard.tsx` | Pill-only. Do not paint cards or rails with pill hues |
| Electric atmosphere | Store field | Store-specific. Do not import into marketing HUD |

VIS-011 should extend this grammar, not replace vendor-in-front with generic cyber sculpture.

---

## Visual grammar (target)

### Subject

1. **Vendor mark** when a real vendor relationship exists — actual logo, actual colors, not recolored to magenta or electric.
2. **DE service artifact** when the SKU is a DE service (assessment, onboarding, template): evidence or diagram, classified per `VISUAL_EVIDENCE.md`, not a fake appliance render.
3. **Category atmosphere** only behind the subject, never as the product.

Do not default to laptop / padlock / robot / hoodie (`IMAGERY.md`). Meshy category heroes may remain inventory; do not remount cheap cyber toys as the subject.

### Field

- Graphite well, not a white catalog grid
- Electric accent for Store wayfinding (filters, active chips, links) — not a blue wash on every card
- Hairline `--de-hairline`
- No purple-filled product tiles (taxonomy pill violets stay **pills only**)

### Technical media (optional HUD)

Store **technical** product media (what a control covers, how a service is structured) may use HUDFrame + EvidenceFrame **after** those primitives exist.

Ordinary catalog cards do **not** become SOC terminals. No `+` on every tile.

### Classification

If a PDP shows a dashboard, report, or “protection score”:

- LIVE only with real customer-safe data
- otherwise EXAMPLE or ILLUSTRATIVE, labeled
- never invent a coverage percentage for merchandising

Proof chips on PDPs follow `PROOF_SYSTEM.md` (factual only).

---

## Do

- Keep vendor logos authentic
- Keep the 14 pill hues distinct (`comanaged_subscriptions` violet-300, `comanaged_onboarding` purple-300, `digital_templates` indigo-300, `professional_services` pink-300, and the rest as locked)
- Prefer real packaging, real vendor art, or a quiet DE service frame over generated gadgets
- Align detail / card / thumb variants so the same product does not change identity across listing and PDP

## Do not

- Recolor the Store to marketing magenta as a “unification” pass
- Collapse two categories onto one hue
- Spray HUD ticks across the catalog in an unowned pass
- Show EXAMPLE incident metrics as product benefits
- Treat Meshy stills as a substitute for missing vendor art when a logo exists

---

## Consumers (later)

- VIS-011 Store product-media system
- Listing cards, PDP hero, compare, related rails
- Possible datasheet covers that share Layer 7 with `EDITORIAL_ASSETS.md` — Store electric stays on Store routes; datasheets on marketing routes use graphite / paper / magenta

---

## Related

- Store merchandising: `client/src/data/storeMerchandising.ts`
- Solution engine: `docs/STORE-SOLUTION-ENGINE.md`
- Task: VIS-011 in `docs/SITE-VISUAL-TASKS.md`
