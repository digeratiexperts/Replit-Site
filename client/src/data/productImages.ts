/**
 * Store / site product imagery resolver.
 *
 * Assets: /images/store/{categories,outcomes,site}/
 * Branded ink/stone + magenta #D3126A fallbacks (Meshy API key not in env yet).
 * Populate skuImageOverrides when richer Meshy art arrives.
 */

import type { ProductCategory, StoreProduct } from "./storeProducts";
import {
  getVendorForSku,
  inferVendorFromText,
  vendorLogoUrl,
} from "./vendorLogos";
import type { StoreOutcomeId } from "./storeMerchandising";

export const STORE_IMAGE_BASE = "/images/store";

export type ProductVisualSource = "category" | "sku_override";

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

export function categoryHeroUrl(category: ProductCategory): string {
  return `${STORE_IMAGE_BASE}/categories/${category}.png`;
}

export function categoryCardUrl(category: ProductCategory): string {
  return `${STORE_IMAGE_BASE}/categories/${category}-card.png`;
}

export function outcomeIconUrl(outcomeId: StoreOutcomeId): string {
  return `${STORE_IMAGE_BASE}/outcomes/${outcomeId}.png`;
}

export function outcomeCardUrl(outcomeId: StoreOutcomeId): string {
  return `${STORE_IMAGE_BASE}/outcomes/${outcomeId}-card.png`;
}

export const siteAccentImages = {
  trustSecurity: `${STORE_IMAGE_BASE}/site/trust-security.png`,
  trustMicrosoft: `${STORE_IMAGE_BASE}/site/trust-microsoft.png`,
  trustAudit: `${STORE_IMAGE_BASE}/site/trust-audit.png`,
  pricingEcosystem: `${STORE_IMAGE_BASE}/site/pricing-ecosystem.png`,
} as const;

/** Optional per-SKU hero overrides when Meshy/custom art ships. */
export const skuImageOverrides: Partial<Record<string, string>> = {};

type ProductImageInput = Pick<
  StoreProduct,
  "sku" | "category" | "name" | "shortDescription" | "description" | "features"
>;

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
  const heroUrl = override || categoryHeroUrl(product.category);
  const cardUrl = override || categoryCardUrl(product.category);

  return {
    heroUrl,
    cardUrl,
    logoUrl: vendor?.logoUrl ?? null,
    vendor,
    source: override ? "sku_override" : "category",
    alt: vendor
      ? `${product.name} — ${vendor.name}`
      : `${product.name} — Digerati Experts`,
  };
}

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
