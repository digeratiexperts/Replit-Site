import { useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  merchandisingRails,
  getProductsForRail,
  type MerchandisingRailId,
} from "@/data/storeMerchandising";
import { type StoreProduct } from "@/data/storeProducts";
import { StoreProductCard } from "./StoreProductCard";

interface MerchandisingRailsProps {
  isLoggedIn: boolean;
  getPrice: (productId: string, basePrice: number) => {
    price: number;
    hasDiscount: boolean;
    discountPercent: number;
  };
  onAddToCart: (product: StoreProduct, e: MouseEvent) => void;
  onConfigure?: (product: StoreProduct) => void;
  onLoginRequired: () => void;
  /** Hide rails that only contain client-only items when logged out */
  showClientOnly?: boolean;
  railIds?: MerchandisingRailId[];
}

function RailScroller({
  title,
  subtitle,
  products,
  isLoggedIn,
  getPrice,
  onAddToCart,
  onConfigure,
  onLoginRequired,
}: {
  title: string;
  subtitle: string;
  products: StoreProduct[];
  isLoggedIn: boolean;
  getPrice: MerchandisingRailsProps["getPrice"];
  onAddToCart: MerchandisingRailsProps["onAddToCart"];
  onConfigure?: MerchandisingRailsProps["onConfigure"];
  onLoginRequired: () => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < maxScroll - 4);
  };

  useLayoutEffect(() => {
    updateScrollState();
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => updateScrollState();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products.length]);

  const scroll = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(360, el.clientWidth * 0.8), behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <div className="mb-12" data-testid={`rail-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="mb-5">
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
        <p className="mt-1 text-base text-white/55">{subtitle}</p>
      </div>
      <div className="relative">
        <div
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#0a0a0a] to-transparent transition-opacity duration-200 sm:w-16 ${
            canScrollLeft ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />
        <div
          className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#0a0a0a] to-transparent transition-opacity duration-200 sm:w-16 ${
            canScrollRight ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />
        <button
          type="button"
          onClick={() => scroll(-1)}
          disabled={!canScrollLeft}
          aria-label={`Scroll ${title} left`}
          className="absolute left-1.5 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0a0a0a]/85 text-white shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-all duration-200 hover:border-de-accent/60 hover:bg-[#141414] hover:scale-105 disabled:pointer-events-none disabled:opacity-0 sm:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          disabled={!canScrollRight}
          aria-label={`Scroll ${title} right`}
          className="absolute right-1.5 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0a0a0a]/85 text-white shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-all duration-200 hover:border-de-accent/60 hover:bg-[#141414] hover:scale-105 disabled:pointer-events-none disabled:opacity-0 sm:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      <div
        ref={scrollerRef}
        className="de-store-h-rail flex gap-5 pb-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {products.map((product) => {
          const pricing = getPrice(product.id, product.basePrice);
          return (
            <div
              key={product.id}
              className="w-[280px] flex-shrink-0 sm:w-[300px] lg:w-[320px]"
              style={{ scrollSnapAlign: "start" }}
            >
              <StoreProductCard
                product={product}
                price={pricing.price}
                hasDiscount={pricing.hasDiscount}
                discountPercent={pricing.discountPercent}
                isLoggedIn={isLoggedIn}
                compact
                onAddToCart={onAddToCart}
                onConfigure={onConfigure}
                onLoginRequired={onLoginRequired}
              />
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}

export function MerchandisingRails({
  isLoggedIn,
  getPrice,
  onAddToCart,
  onConfigure,
  onLoginRequired,
  showClientOnly = false,
  railIds,
}: MerchandisingRailsProps) {
  const rails = railIds
    ? merchandisingRails.filter((r) => railIds.includes(r.id))
    : merchandisingRails;

  return (
    <section className="mb-4" data-testid="merchandising-rails">
      <div className="mb-7">
        <h2 className="text-3xl font-bold text-white md:text-4xl">Curated for you</h2>
        <p className="mt-2 text-base text-white/60 md:text-lg">
          Merchandising rails mapped to real SKUs — browse before the full catalog.
        </p>
      </div>
      {rails.map((rail) => {
        let products = getProductsForRail(rail.id);
        if (!showClientOnly && !isLoggedIn) {
          products = products.filter((p) => !p.isClientOnly);
        }
        return (
          <RailScroller
            key={rail.id}
            title={rail.title}
            subtitle={rail.subtitle}
            products={products}
            isLoggedIn={isLoggedIn}
            getPrice={getPrice}
            onAddToCart={onAddToCart}
            onConfigure={onConfigure}
            onLoginRequired={onLoginRequired}
          />
        );
      })}
    </section>
  );
}
