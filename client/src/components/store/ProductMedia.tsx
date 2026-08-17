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
 * Vendor plate is the subject. Category/Meshy art is atmosphere only.
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
      ? "h-[46%] w-[46%] max-h-56 max-w-56 min-h-36 min-w-36 p-6 sm:p-8"
      : variant === "card"
        ? "h-[46%] w-[46%] max-h-44 max-w-44 min-h-28 min-w-28 p-4"
        : "h-[42%] w-[42%] max-h-16 max-w-16 min-h-12 min-w-12 p-2";

  return (
    <div
      className={`relative overflow-hidden border border-white/10 bg-[#0f0f12] ${shell} ${className}`}
      data-testid={`product-media-${product.id}`}
      data-image-source={visual.source}
    >
      <img
        src={mediaSrc}
        alt=""
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50"
        loading={variant === "detail" ? "eager" : "lazy"}
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

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
            <span className="rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm sm:text-xs">
              {categoryBadge}
            </span>
          )}
          {visual.vendor && (
            <span className="rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm sm:text-xs">
              {visual.vendor.name}
            </span>
          )}
        </div>
      )}

      <span className="sr-only">{visual.alt}</span>
    </div>
  );
}
