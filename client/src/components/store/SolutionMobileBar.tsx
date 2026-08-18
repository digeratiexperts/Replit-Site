import { useLocation } from "wouter";
import { Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { formatSnapshotMoney } from "@/lib/solutionSnapshotView";
import { cn } from "@/lib/utils";

/**
 * Persistent Your Solution dock on /store/* — desktop bottom-right, mobile sticky.
 * Sits above Ask DE / sticky CTA. Does not replace the marketing assessment bar.
 */
export function SolutionMobileBar() {
  const [location] = useLocation();
  const { items, totals, openCart, isOpen } = useCart();
  const onStore = location.startsWith("/store");
  const onCheckoutFlow = /\/store\/(checkout|quote-request|quote-confirmation|order-confirmation)/.test(
    location,
  );
  const onPdp = location.startsWith("/store/product/");

  if (!onStore || onCheckoutFlow || isOpen || items.length === 0) return null;

  return (
    <div
      className={cn(
        "de-fixed-in-canvas pointer-events-none fixed z-40 px-3 sm:px-0",
        onPdp && "max-lg:hidden",
      )}
      style={{
        bottom:
          "calc(var(--de-chrome-inset) + var(--de-cookie-h) + var(--de-unified-bar-h) + var(--de-sticky-cta-h, 0px) + 0.75rem)",
        right: "calc(var(--de-chrome-inset) + 0.75rem)",
        left: "0.75rem",
      }}
      data-testid="solution-mobile-bar"
    >
      <div className="pointer-events-auto ml-auto flex w-full max-w-lg items-center gap-3 rounded-xl border border-white/10 bg-[#0a0a0a]/95 px-3 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.45)] sm:max-w-md">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
          <Layers className="h-4 w-4 text-de-accent-ink" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium uppercase tracking-wide text-white/55">
            Your solution · {items.length} item{items.length === 1 ? "" : "s"}
          </p>
          <p className="truncate text-sm font-medium text-white">
            Due today {formatSnapshotMoney(totals.dueToday)}
            {totals.monthly > 0 ? ` · Monthly ${formatSnapshotMoney(totals.monthly)} / month` : ""}
          </p>
        </div>
        <Button
          type="button"
          className="h-11 shrink-0 bg-de-accent px-4 text-white hover:bg-[#6548ff]"
          onClick={openCart}
          data-testid="button-mobile-view-solution"
        >
          View Solution
        </Button>
      </div>
    </div>
  );
}
