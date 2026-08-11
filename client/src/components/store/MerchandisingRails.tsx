import { useRef, type MouseEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  onLoginRequired,
}: {
  title: string;
  subtitle: string;
  products: StoreProduct[];
  isLoggedIn: boolean;
  getPrice: MerchandisingRailsProps["getPrice"];
  onAddToCart: MerchandisingRailsProps["onAddToCart"];
  onLoginRequired: () => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(360, el.clientWidth * 0.8), behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <div className="mb-12" data-testid={`rail-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold text-white">{title}</h3>
          <p className="mt-1 text-base text-white/55">{subtitle}</p>
        </div>
        <div className="hidden gap-2 sm:flex">
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="h-10 w-10 border-white/15 bg-transparent text-white hover:bg-white/5"
            onClick={() => scroll(-1)}
            aria-label={`Scroll ${title} left`}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="h-10 w-10 border-white/15 bg-transparent text-white hover:bg-white/5"
            onClick={() => scroll(1)}
            aria-label={`Scroll ${title} right`}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className="flex gap-5 overflow-x-auto pb-2 scrollbar-thin"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {products.map((product) => {
          const pricing = getPrice(product.id, product.basePrice);
          return (
            <div
              key={product.id}
              className="w-[300px] flex-shrink-0 sm:w-[320px]"
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
                onLoginRequired={onLoginRequired}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function MerchandisingRails({
  isLoggedIn,
  getPrice,
  onAddToCart,
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
        // Prefer checkout-enabled for add-to-cart rails; keep contract SKUs if present
        return (
          <RailScroller
            key={rail.id}
            title={rail.title}
            subtitle={rail.subtitle}
            products={products}
            isLoggedIn={isLoggedIn}
            getPrice={getPrice}
            onAddToCart={onAddToCart}
            onLoginRequired={onLoginRequired}
          />
        );
      })}
    </section>
  );
}
