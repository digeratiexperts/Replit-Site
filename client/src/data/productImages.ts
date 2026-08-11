/**
 * Store / site product imagery resolver.
 *
 * Assets:
 * - Meshy heroes: /images/meshy/{categories,outcomes,site}/ (preferred when present)
 * - Branded PNG fallbacks: /images/store/{categories,outcomes,site}/
 * Category PNG heroes + vendor logos. MESHY_API_KEY stays server-side only.
 * Populate skuImageOverrides when richer product art arrives.
 */

import type { ProductCategory, StoreProduct } from "./storeProducts";
import {
  getVendorForSku,
  inferVendorFromText,
  vendorLogoUrl,
} from "./vendorLogos";
import type { StoreOutcomeId } from "./storeMerchandising";

export const STORE_IMAGE_BASE = "/images/store";
export const MESHY_IMAGE_BASE = "/images/meshy";

export type ProductVisualSource =
  | "product"
  | "sku_override"
  | "meshy"
  | "category";

export type ProductVendorMark = {
  slug: string;
  name: string;
  logoUrl: string;
};

/** Shape consumed by ProductMedia + product detail SEO image. */
export type ProductVisual = {
  heroUrl: string;
  cardUrl: string;
  logoUrl: string | null;
  vendor: ProductVendorMark | null;
  source: ProductVisualSource;
  alt: string;
};

/** Slots successfully generated via Meshy text-to-image (see images/meshy/manifest.json). */
const MESHY_CATEGORY_IDS = new Set<ProductCategory>([
  "contract_services",
  "comanaged_subscriptions",
  "comanaged_onboarding",
  "networking_managed",
  "networking_projects",
  "ucaas_subscriptions",
  "ucaas_setup",
  "hardware_provisioning",
  "hardware_physical",
  "hardware_handling",
  "digital_assessments",
  "digital_templates",
  "digital_training",
  "professional_services",
]);

const MESHY_OUTCOME_IDS = new Set<StoreOutcomeId>([
  "protect",
  "modernize",
  "compliance",
  "recover",
  "support_it",
  "outsource",
  "secure_remote",
]);

const MESHY_SITE_IDS = new Set<string>([
  "trust-security",
  "trust-microsoft",
  "trust-audit",
  "pricing-ecosystem",
]);

function meshyHero(dir: string, id: string): string {
  return `${MESHY_IMAGE_BASE}/${dir}/${id}.png`;
}

function meshyCard(dir: string, id: string): string {
  return `${MESHY_IMAGE_BASE}/${dir}/${id}-card.png`;
}

export function categoryHeroUrl(category: ProductCategory): string {
  if (MESHY_CATEGORY_IDS.has(category)) {
    return meshyHero("categories", category);
  }
  return `${STORE_IMAGE_BASE}/categories/${category}.png`;
}

export function categoryCardUrl(category: ProductCategory): string {
  if (MESHY_CATEGORY_IDS.has(category)) {
    return meshyCard("categories", category);
  }
  return `${STORE_IMAGE_BASE}/categories/${category}-card.png`;
}

export function outcomeIconUrl(outcomeId: StoreOutcomeId): string {
  if (MESHY_OUTCOME_IDS.has(outcomeId)) {
    return meshyHero("outcomes", outcomeId);
  }
  return `${STORE_IMAGE_BASE}/outcomes/${outcomeId}.png`;
}

export function outcomeCardUrl(outcomeId: StoreOutcomeId): string {
  if (MESHY_OUTCOME_IDS.has(outcomeId)) {
    return meshyCard("outcomes", outcomeId);
  }
  return `${STORE_IMAGE_BASE}/outcomes/${outcomeId}-card.png`;
}

function siteAccentUrl(id: string): string {
  if (MESHY_SITE_IDS.has(id)) {
    return meshyHero("site", id);
  }
  return `${STORE_IMAGE_BASE}/site/${id}.png`;
}

export const siteAccentImages = {
  trustSecurity: siteAccentUrl("trust-security"),
  trustMicrosoft: siteAccentUrl("trust-microsoft"),
  trustAudit: siteAccentUrl("trust-audit"),
  pricingEcosystem: siteAccentUrl("pricing-ecosystem"),
} as const;

/** Optional per-SKU hero overrides when Meshy/custom art ships. */
export const skuImageOverrides: Partial<Record<string, string>> = {};

type ProductImageInput = Pick<
  StoreProduct,
  "sku" | "category" | "name" | "shortDescription" | "description" | "features"
> & { imageUrl?: string };

function resolveVendor(product: ProductImageInput): ProductVendorMark | null {
  return (
    getVendorForSku(product.sku, product.category) ||
    inferVendorFromText(
      `${product.name} ${product.shortDescription} ${product.description} ${product.features.join(" ")}`
    )
  );
}

/** Primary resolver — never blank; every product gets branded category media. */
export function getProductVisual(product: ProductImageInput): ProductVisual {
  const vendor = resolveVendor(product);
  const override = skuImageOverrides[product.sku];
  const custom = product.imageUrl;
  const usesMeshy = MESHY_CATEGORY_IDS.has(product.category);

  if (custom) {
    return {
      heroUrl: custom,
      cardUrl: custom,
      logoUrl: vendor?.logoUrl ?? null,
      vendor,
      source: "product",
      alt: `${product.name} product image`,
    };
  }

  if (override) {
    return {
      heroUrl: override,
      cardUrl: override,
      logoUrl: vendor?.logoUrl ?? null,
      vendor,
      source: "sku_override",
      alt: vendor
        ? `${product.name} — ${vendor.name}`
        : `${product.name} — Digerati Experts`,
    };
  }

  return {
    heroUrl: categoryHeroUrl(product.category),
    cardUrl: categoryCardUrl(product.category),
    logoUrl: vendor?.logoUrl ?? null,
    vendor,
    source: usesMeshy ? "meshy" : "category",
    alt: vendor
      ? `${product.name} — ${vendor.name}`
      : `${product.name} — Digerati Experts`,
  };
}

/** Alias used by cards/detail — same as getProductVisual. */
export function getProductImage(product: ProductImageInput): ProductVisual {
  return getProductVisual(product);
}

export function getProductVendorMarkUrl(
  sku: string,
  category?: ProductCategory
): string | null {
  const v = getVendorForSku(sku, category);
  return v ? vendorLogoUrl(v.slug) : null;
}
