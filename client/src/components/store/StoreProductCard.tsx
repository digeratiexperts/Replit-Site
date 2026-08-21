import type { MouseEvent } from "react";
import { Link } from "wouter";
import { ShoppingCart, LogIn, Tag, Eye, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  categoryLabels,
  formatPrice,
  type ProductCategory,
  type StoreProduct,
} from "@/data/storeProducts";
import {
  getBestForLabel,
  getIncludedInHint,
  getOutcomeLead,
  getProductBySku,
  getProductRelationships,
  getProductTags,
  isConfigurableProduct,
} from "@/data/storeMerchandising";
import { getProductVisual } from "@/data/productImages";
import { ProductMedia } from "@/components/store/ProductMedia";
import { useCart } from "@/contexts/CartContext";
import { getSolutionChips } from "@/lib/storeSolutionIntelligence";

/**
 * Soft accent colors — pills only, not whole-card rainbow.
 *
 * This is wayfinding, not decoration: every category has to stay tellable from
 * every other one, so no two entries may share a hue. The pill also prints its
 * category label, which keeps colour as reinforcement rather than the only
 * channel.
 *
 * Store taxonomy colours are exceptions to the marketing-page accent cleanup.
 * Do not collapse them onto one hue, and do not strip violet / purple / indigo
 * from these pills just because those tokens are retired on marketing chrome.
 * See the store entry in scripts/brand-audit.mjs and blog-store-color-lock.mdc.
 */
export const categoryAccent: Record<ProductCategory, string> = {
  contract_services: "text-amber-300",
  comanaged_subscriptions: "text-violet-300",
  comanaged_onboarding: "text-purple-300",
  networking_managed: "text-cyan-300",
  networking_projects: "text-sky-300",
  ucaas_subscriptions: "text-green-300",
  ucaas_setup: "text-emerald-300",
  hardware_provisioning: "text-orange-300",
  hardware_physical: "text-rose-300",
  hardware_handling: "text-red-300",
  digital_assessments: "text-blue-300",
  digital_templates: "text-indigo-300",
  digital_training: "text-fuchsia-300",
  professional_services: "text-pink-300",
};

export interface StoreProductCardProps {
  product: StoreProduct;
  price: number;
  hasDiscount?: boolean;
  discountPercent?: number;
  isLoggedIn?: boolean;
  compact?: boolean;
  compareSelected?: boolean;
  onCompareToggle?: (product: StoreProduct) => void;
  compareDisabled?: boolean;
  onAddToCart: (product: StoreProduct, e: MouseEvent) => void;
  onConfigure?: (product: StoreProduct) => void;
  onLoginRequired?: () => void;
}

export function StoreProductCard({
  product,
  price,
  hasDiscount = false,
  discountPercent = 0,
  isLoggedIn = false,
  compact = false,
  compareSelected = false,
  onCompareToggle,
  compareDisabled = false,
  onAddToCart,
  onConfigure,
  onLoginRequired,
}: StoreProductCardProps) {
  const accent = categoryAccent[product.category];
  const includedHint = getIncludedInHint(product.sku);
  const isContract = product.isContractOnly || !product.isCheckoutEnabled;
  const configurable = isConfigurableProduct(product) && !!onConfigure;
  const tags = getProductTags(product);
  const relationships = getProductRelationships(product.sku);
  const worksWithNames = (relationships?.worksWith || [])
    .map((sku) => getProductBySku(sku)?.name)
    .filter(Boolean)
    .slice(0, 2) as string[];
  const visual = getProductVisual(product);
  const vendor = visual.vendor;
  const { items } = useCart();
  const solutionChips = getSolutionChips(
    product,
    items.map((item) => item.product),
  );
  const bestFor = getBestForLabel(product);

  return (
    <article
      className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141414] transition-all duration-200 hover:border-de-accent/35 hover:bg-[#171717]"
      data-testid={`product-${product.id}`}
    >
      {onCompareToggle && !isContract && (
        <label className="absolute right-3 top-3 z-20 flex cursor-pointer items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-xs text-white/70 backdrop-blur-sm hover:text-white">
          <input
            type="checkbox"
            checked={compareSelected}
            disabled={!compareSelected && compareDisabled}
            onChange={() => onCompareToggle(product)}
            className="h-4 w-4 rounded border-white/30 bg-transparent accent-de-accent"
            data-testid={`compare-check-${product.id}`}
          />
          Compare
        </label>
      )}

      <Link href={`/store/product/${product.sku}`}>
        <ProductMedia
          product={product}
          variant="card"
          className="rounded-none border-0 border-b border-white/10"
          categoryBadge={categoryLabels[product.category]}
        />
      </Link>

      <div className={`flex flex-1 flex-col ${compact ? "p-5" : "p-6 md:p-7"}`}>
        <div className="mb-4">
          <div className="mb-2 flex flex-wrap items-center gap-1.5">
            {vendor && (
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-sm font-medium text-white/70">
                {vendor.name}
              </span>
            )}
            <span
              className={`de-store-category rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-sm font-medium uppercase tracking-wide ${accent}`}
            >
              {categoryLabels[product.category]}
            </span>
            {product.isClientOnly && (
              <span className="rounded-full border border-de-accent/30 bg-de-accent/15 px-2.5 py-0.5 text-sm font-medium text-de-accent-ink">
                Client pricing
              </span>
            )}
            {isContract && (
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-sm font-medium text-amber-200">
                Consult
              </span>
            )}
          </div>
          <h3
            className={`font-semibold leading-snug text-white ${compact ? "text-lg" : "text-xl md:text-2xl"}`}
          >
            <Link href={`/store/product/${product.sku}`}>
              <span className="transition-colors hover:text-de-accent-ink" title={product.name}>
                {product.name}
              </span>
            </Link>
          </h3>
        </div>

        <p
          className={`mb-3 font-medium leading-relaxed text-white/85 ${compact ? "text-sm line-clamp-2" : "text-base md:text-lg line-clamp-3"}`}
        >
          {getOutcomeLead(product)}
        </p>
        {bestFor && (
          <p className="mb-3 text-sm text-white/55">Best for: {bestFor}</p>
        )}

        {!compact && (
          <ul className="mb-4 space-y-2">
            {product.features.slice(0, 3).map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-white/50">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-de-accent/80" />
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
            {product.features.length > 3 && (
              <li className="pl-3.5 text-sm text-white/55">+{product.features.length - 3} more</li>
            )}
          </ul>
        )}

        <div className="mb-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-sm text-white/55"
            >
              {tag}
            </span>
          ))}
        </div>

        {(includedHint || worksWithNames.length > 0 || relationships?.upgradeTo?.length || solutionChips.length > 0) && (
          <div className="mb-4 space-y-1 text-sm text-de-accent-ink/90">
            {includedHint && (
              <p data-testid={`included-hint-${product.id}`}>{includedHint}</p>
            )}
            {worksWithNames.length > 0 && (
              <p className="text-white/55">Works with: {worksWithNames.join(", ")}</p>
            )}
            {solutionChips.length > 0 && (
              <div className="flex flex-wrap gap-1.5" aria-label="Solution status">
                {solutionChips.map((chip) => (
                  <span
                    key={chip.label}
                    className="inline-flex items-center rounded-full border border-de-hairline bg-de-raised px-2 py-0.5 text-xs text-white/70"
                    data-testid={`solution-chip-${product.id}`}
                  >
                    {chip.label}
                  </span>
                ))}
              </div>
            )}
            {relationships?.upgradeTo?.[0] && (
              <p className="text-white/55">
                Upgrade:{" "}
                {getProductBySku(relationships.upgradeTo[0])?.name || relationships.upgradeTo[0]}
              </p>
            )}
          </div>
        )}

        <div className="mt-auto border-t border-white/10 pt-5">
          <div className="mb-4 flex items-end justify-between gap-2">
            {hasDiscount ? (
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white" data-testid={`price-${product.id}`}>
                    ${price.toFixed(2)}
                  </span>
                  <span className="text-sm text-white/55 line-through">
                    ${product.basePrice.toFixed(2)}
                  </span>
                </div>
                <span className="mt-0.5 inline-flex items-center gap-1 text-sm text-de-accent-ink">
                  <Tag className="h-3.5 w-3.5" />
                  {discountPercent}% off
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-white" data-testid={`price-${product.id}`}>
                {product.basePrice === 0 && isContract ? "Custom quote" : formatPrice(product)}
              </span>
            )}
          </div>

          <div className="flex gap-2.5">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-12 w-full flex-1 border-white/15 bg-transparent text-base text-white hover:bg-white/5"
              data-testid={`button-details-${product.id}`}
            >
              <Link href={`/store/product/${product.sku}`}>
                <Eye className="mr-1.5 h-4 w-4" />
                View details
              </Link>
            </Button>

            {isContract ? (
              <Button
                asChild
                size="sm"
                className="h-12 w-full flex-1 bg-de-accent text-base text-white hover:bg-[#6548ff]"
                data-testid={`button-consult-${product.id}`}
              >
                <a href="/book">
                  Schedule
                </a>
              </Button>
            ) : product.isClientOnly && !isLoggedIn ? (
              <Button
                size="sm"
                className="h-12 flex-1 bg-de-accent text-base text-white hover:bg-[#6548ff]"
                onClick={(e) => {
                  e.preventDefault();
                  onLoginRequired?.();
                }}
                data-testid={`button-login-${product.id}`}
              >
                <LogIn className="mr-1.5 h-4 w-4" />
                Login
              </Button>
            ) : configurable ? (
              <Button
                size="sm"
                className="h-12 flex-1 bg-de-accent text-base text-white hover:bg-[#6548ff]"
                onClick={(e) => {
                  e.preventDefault();
                  onConfigure?.(product);
                }}
                data-testid={`button-configure-${product.id}`}
              >
                <Settings2 className="mr-1.5 h-4 w-4" />
                Configure
              </Button>
            ) : (
              <Button
                size="sm"
                className="h-12 flex-1 bg-de-accent text-base text-white hover:bg-[#6548ff]"
                onClick={(e) => onAddToCart(product, e)}
                data-testid={`button-add-${product.id}`}
              >
                <ShoppingCart className="mr-1.5 h-4 w-4" />
                Add to Solution
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
