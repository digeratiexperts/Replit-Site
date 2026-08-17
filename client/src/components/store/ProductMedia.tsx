import type { StoreProduct } from "@/data/storeProducts";
import { getProductVisual } from "@/data/productImages";

interface ProductMediaProps {
  product: StoreProduct;
  /** detail = large hero plane; card = listing strip; thumb = related/rail */
  variant?: "detail" | "card" | "thumb";
  className?: string;
  categoryBadge?: string;
}

/**
 * Dominant product visual: branded category hero + vendor mark overlay.
 * Used by listing cards and product detail so imagery stays consistent.
 */
export function ProductMedia({
  product,
  variant = "detail",
  className = "",
  categoryBadge,
}: ProductMediaProps) {
  const visual = getProductVisual(product);
  const mediaSrc =
    variant === "detail" ? visual.heroUrl : visual.cardUrl || visual.heroUrl;

  const shell =
    variant === "detail"
      ? "aspect-[4/3] sm:aspect-square rounded-2xl"
      : variant === "card"
        ? "aspect-[16/10] rounded-xl"
        : "aspect-square rounded-lg";

  const logoBox =
    variant === "detail"
      ? "h-36 w-36 sm:h-44 sm:w-44 md:h-52 md:w-52 p-6 sm:p-8"
      : variant === "card"
        ? "h-20 w-20 p-3"
        : "h-12 w-12 p-2";

  return (
    <div
      className={`relative overflow-hidden border border-white/10 bg-[#0f0f12] ${shell} ${className}`}
      data-testid={`product-media-${product.id}`}
      data-image-source={visual.source}
    >
      <img
        src={mediaSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading={variant === "detail" ? "eager" : "lazy"}
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        {visual.logoUrl ? (
          <div
            className={`flex items-center justify-center rounded-2xl border border-white/15 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.35)] ${logoBox}`}
          >
            <img
              src={visual.logoUrl}
              alt={visual.vendor?.name || ""}
              className="h-full w-full object-contain"
              loading={variant === "detail" ? "eager" : "lazy"}
              decoding="async"
              data-testid={`product-vendor-logo-${product.id}`}
            />
          </div>
        ) : (
          <div
            className={`flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm ${logoBox}`}
          >
            <span
              className={`font-semibold tracking-wide text-white/80 ${
                variant === "detail" ? "text-2xl" : "text-xs"
              }`}
            >
              DE
            </span>
          </div>
        )}
      </div>

      {(categoryBadge || visual.vendor) && variant !== "thumb" && (
        <div className="absolute left-3 top-3 z-10 flex max-w-[85%] flex-wrap gap-2 sm:left-4 sm:top-4">
          {categoryBadge && (
            <span className="rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-sm font-medium text-white/90 backdrop-blur-sm sm:text-xs">
              {categoryBadge}
            </span>
          )}
          {visual.vendor && (
            <span className="rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-sm font-medium text-white/90 backdrop-blur-sm sm:text-xs">
              {visual.vendor.name}
            </span>
          )}
        </div>
      )}

      <span className="sr-only">{visual.alt}</span>
    </div>
  );
}
