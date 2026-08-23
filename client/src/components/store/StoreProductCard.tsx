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
      className="relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#121216]/90 transition-all duration-300 hover:border-[#5034ff]/45 hover:bg-[#161622] hover:shadow-xl hover:shadow-[#5034ff]/10 hover:-translate-y-1 group"
      data-testid={`product-${product.id}`}
    >
      {onCompareToggle && !isContract && (
        <label className="absolute right-2.5 top-2.5 z-20 flex cursor-pointer items-center gap-1.5 rounded-full border border-white/15 bg-black/65 px-2 py-0.5 text-[11px] text-white/70 backdrop-blur-md hover:text-white">
          <input
            type="checkbox"
            checked={compareSelected}
            disabled={!compareSelected && compareDisabled}
            onChange={() => onCompareToggle(product)}
            className="h-3.5 w-3.5 rounded border-white/30 bg-transparent accent-[#5034ff]"
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

      <div className={`flex flex-1 flex-col ${compact ? "p-3.5" : "p-4 sm:p-5"}`}>
        <div className="mb-2">
          <div className="mb-1.5 flex flex-wrap items-center gap-1">
            {vendor && (
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-white/70">
                {vendor.name}
              </span>
            )}
            <span
              className={`rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${accent}`}
            >
              {categoryLabels[product.category]}
            </span>
            {product.isClientOnly && (
              <span className="rounded-full border border-[#5034ff]/30 bg-[#5034ff]/15 px-2 py-0.5 text-[10px] font-medium text-[#c4b5fd]">
                Client pricing
              </span>
            )}
            {isContract && (
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-200">
                Consult
              </span>
            )}
          </div>
          <h3
            className={`font-semibold leading-tight text-white transition-colors group-hover:text-[#c4b5fd] ${compact ? "text-sm line-clamp-1" : "text-base sm:text-lg line-clamp-1"}`}
          >
            <Link href={`/store/product/${product.sku}`}>
              <span title={product.name}>
                {product.name}
              </span>
            </Link>
          </h3>
        </div>

        <p
          className={`mb-2.5 font-normal leading-relaxed text-white/75 ${compact ? "text-xs line-clamp-2" : "text-xs sm:text-sm line-clamp-2"}`}
        >
          {getOutcomeLead(product)}
        </p>
        {bestFor && (
          <p className="mb-3 text-sm text-white/55">Best for: {bestFor}</p>
        )}

        {!compact && (
          <ul className="mb-2.5 space-y-1">
            {product.features.slice(0, 2).map((feature) => (
              <li key={feature} className="flex items-center gap-1.5 text-xs text-white/55">
                <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[#5034ff]/90" />
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
            {product.features.length > 2 && (
              <li className="pl-2.5 text-[11px] text-white/40">+{product.features.length - 2} more</li>
            )}
          </ul>
        )}

        <div className="mb-2.5 flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>

        {(includedHint || worksWithNames.length > 0 || relationships?.upgradeTo?.length || solutionChips.length > 0) && (
          <div className="mb-2.5 space-y-0.5 text-xs text-[#a78bfa]/90">
            {includedHint && (
              <p className="line-clamp-1" data-testid={`included-hint-${product.id}`}>{includedHint}</p>
            )}
            {worksWithNames.length > 0 && (
              <p className="line-clamp-1 text-white/45">Works with: {worksWithNames.join(", ")}</p>
            )}
            {solutionChips.length > 0 && (
              <div className="flex flex-wrap gap-1.5" aria-label="Solution status">
                {solutionChips.map((chip) => (
                  <span
                    key={chip.label}
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/70"
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

        <div className="mt-auto border-t border-white/10 pt-3">
          <div className="mb-3 flex items-baseline justify-between gap-2">
            {hasDiscount ? (
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg sm:text-xl font-bold text-white" data-testid={`price-${product.id}`}>
                    ${price.toFixed(2)}
                  </span>
                  <span className="text-xs text-white/40 line-through">
                    ${product.basePrice.toFixed(2)}
                  </span>
                </div>
                <span className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-[#a78bfa]">
                  <Tag className="h-3 w-3" />
                  {discountPercent}% off
                </span>
              </div>
            ) : (
              <span className="text-lg sm:text-xl font-bold text-white" data-testid={`price-${product.id}`}>
                {product.basePrice === 0 && isContract ? "Custom quote" : formatPrice(product)}
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <Link href={`/store/product/${product.sku}`} className="flex-1">
              <Button
                variant="outline"
                size="sm"
                className="h-9 w-full border-white/15 bg-transparent text-xs text-white hover:bg-white/10 hover:border-white/30"
                data-testid={`button-details-${product.id}`}
              >
                <Eye className="mr-1 h-3.5 w-3.5" />
                Details
              </Button>
            </Link>

            {isContract ? (
              <a href="/book" className="flex-1">
                <Button
                  size="sm"
                  className="h-9 w-full bg-[#5034ff] text-xs font-semibold text-white hover:bg-[#6548ff] shadow-md shadow-[#5034ff]/25"
                  data-testid={`button-consult-${product.id}`}
                >
                  Schedule
                </Button>
              </a>
            ) : product.isClientOnly && !isLoggedIn ? (
              <Button
                size="sm"
                className="h-9 flex-1 bg-[#5034ff] text-xs font-semibold text-white hover:bg-[#6548ff] shadow-md shadow-[#5034ff]/25"
                onClick={(e) => {
                  e.preventDefault();
                  onLoginRequired?.();
                }}
                data-testid={`button-login-${product.id}`}
              >
                <LogIn className="mr-1 h-3.5 w-3.5" />
                Login
              </Button>
            ) : configurable ? (
              <Button
                size="sm"
                className="h-9 flex-1 bg-[#5034ff] text-xs font-semibold text-white hover:bg-[#6548ff] shadow-md shadow-[#5034ff]/25"
                onClick={(e) => {
                  e.preventDefault();
                  onConfigure?.(product);
                }}
                data-testid={`button-configure-${product.id}`}
              >
                <Settings2 className="mr-1 h-3.5 w-3.5" />
                Configure
              </Button>
            ) : (
              <Button
                size="sm"
                className="h-9 flex-1 bg-[#5034ff] text-xs font-semibold text-white hover:bg-[#6548ff] shadow-md shadow-[#5034ff]/25"
                onClick={(e) => onAddToCart(product, e)}
                data-testid={`button-add-${product.id}`}
              >
                <ShoppingCart className="mr-1 h-3.5 w-3.5" />
                Add
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
