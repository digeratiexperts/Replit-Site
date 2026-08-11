import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice, type StoreProduct } from "@/data/storeProducts";
import { storeBundles, getProductBySku } from "@/data/storeMerchandising";

interface StoreBundlesSectionProps {
  isLoggedIn: boolean;
  onAddBundle?: (products: StoreProduct[]) => void;
}

/**
 * Display-only bundle maps from real SKUs. No invented bundle pricing.
 */
export function StoreBundlesSection({ isLoggedIn, onAddBundle }: StoreBundlesSectionProps) {
  return (
    <section className="mb-12" data-testid="store-bundles">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-white md:text-3xl">Starter bundles</h2>
        <p className="mt-1 text-white/55">
          Suggested combinations from the live catalog. Add items individually — bundle pricing
          requires DE approval.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {storeBundles.map((bundle) => {
          const products = bundle.skus
            .map((sku) => getProductBySku(sku))
            .filter((p): p is StoreProduct => !!p)
            .filter((p) => isLoggedIn || !p.isClientOnly);

          if (products.length === 0) return null;

          return (
            <div
              key={bundle.id}
              className="rounded-xl border border-white/10 bg-[#141414] p-5"
              data-testid={`bundle-${bundle.id}`}
            >
              <h3 className="text-lg font-semibold text-white">{bundle.title}</h3>
              <p className="mt-1 text-sm text-white/55">{bundle.blurb}</p>
              <ul className="mt-4 space-y-2">
                {products.map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-3 text-sm">
                    <Link href={`/store/product/${p.sku}`}>
                      <span className="text-white/80 hover:text-[#c4b5fd]">{p.name}</span>
                    </Link>
                    <span className="flex-shrink-0 text-white/45">{formatPrice(p)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {onAddBundle && (
                  <Button
                    size="sm"
                    className="bg-[#5034ff] text-white hover:bg-[#6548ff]"
                    onClick={() => onAddBundle(products.filter((p) => p.isCheckoutEnabled))}
                    data-testid={`button-add-bundle-${bundle.id}`}
                  >
                    Add all to cart
                  </Button>
                )}
                <Link href="/store/co-managed">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/15 bg-transparent text-white hover:bg-white/5"
                  >
                    Browse related
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
