import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

/**
 * Thumb-reach solution summary on /store only — does not replace the marketing sticky CTA.
 */
export function SolutionMobileBar() {
  const [location] = useLocation();
  const { items, totals, openCart, isOpen } = useCart();

  if (!location.startsWith("/store") || isOpen || items.length === 0) return null;

  const monthly = totals.monthly > 0 ? `$${totals.monthly.toFixed(0)}/mo` : null;
  const today = totals.dueToday > 0 ? `$${totals.dueToday.toFixed(0)} today` : null;
  const summary = [monthly, today].filter(Boolean).join(" + ") || "View solution";

  return (
    <div
      className="fixed inset-x-0 bottom-[4.75rem] z-40 px-3 sm:hidden"
      data-testid="solution-mobile-bar"
    >
      <div className="mx-auto flex max-w-lg items-center gap-3 rounded-xl border border-white/10 bg-[#0a0a0a]/95 px-3 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white">{summary}</p>
          <p className="text-xs text-white/55">
            {items.length} service{items.length === 1 ? "" : "s"} in your solution
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
