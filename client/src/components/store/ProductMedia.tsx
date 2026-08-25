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
        ? "aspect-[16/7] rounded-xl"
        : "aspect-square rounded-lg";

  const logoBox =
    variant === "detail"
      ? "aspect-square w-[48%] max-w-[14rem] p-6 sm:p-8"
      : variant === "card"
        ? "h-16 w-16 p-2.5 sm:h-20 sm:w-20 sm:p-3"
        : "h-9 w-9 p-1.5";

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

      <div className="absolute inset-0 flex items-center justify-center p-3">
        {visual.logoUrl ? (
          <div
            className={`flex items-center justify-center rounded-xl border border-white/15 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.4)] ${logoBox}`}
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
            className={`flex items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm ${logoBox}`}
          >
            <span
              className={`font-semibold tracking-wide text-white/80 ${
                variant === "detail" ? "text-2xl" : "text-[10px]"
              }`}
            >
              DE
            </span>
          </div>
        )}
      </div>

      {(categoryBadge || visual.vendor) && variant === "detail" && (
        <div className="absolute left-2.5 top-2.5 z-10 flex max-w-[85%] flex-wrap gap-1.5">
          {categoryBadge && (
            <span className="rounded-full border border-white/20 bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-sm">
              {categoryBadge}
            </span>
          )}
          {visual.vendor && (
            <span className="rounded-full border border-white/20 bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-sm">
              {visual.vendor.name}
            </span>
          )}
        </div>
      )}

      <span className="sr-only">{visual.alt}</span>
    </div>
  );
}
