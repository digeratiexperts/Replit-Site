import { Link } from "wouter";
import { Check, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { StoreProduct } from "@/data/storeProducts";
import { computeCoverageScore } from "@/data/storeMerchandising";

interface CoverageScorePanelProps {
  products: StoreProduct[];
  onAddSuggestion?: (product: StoreProduct) => void;
  compact?: boolean;
}

/**
 * Heuristic protection coverage from cart categories — not a fake security audit.
 */
export function CoverageScorePanel({
  products,
  onAddSuggestion,
}: CoverageScorePanelProps) {
  const score = computeCoverageScore(products);

  if (products.length === 0) return null;

  return (
    <div
      className="rounded-xl border border-white/10 bg-[#141414] p-4"
      data-testid="coverage-score-panel"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-de-accent-ink" />
          <h3 className="text-sm font-semibold text-white">Solution coverage</h3>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-white" data-testid="text-coverage-score">
            {score.total}
            <span className="text-sm font-medium text-white/55"> / 100</span>
          </span>
          <p className="text-sm text-white/55" data-testid="text-coverage-areas">
            {score.coveredCount} of {score.dimensionCount} areas
          </p>
        </div>
      </div>
      <p className="mb-4 text-xs leading-relaxed text-white/55">
        Heuristic stack coverage (endpoint, identity, email, backup, network, compliance) —
        not a security audit or certification claim.
      </p>

      <div className="space-y-2.5">
        {score.bars.map((bar) => (
          <div key={bar.id} className="flex items-center gap-3">
            <span className="flex w-20 items-center gap-1 text-xs text-white/55">
              {bar.covered && <Check className="h-3 w-3 shrink-0 text-emerald-400" />}
              {bar.label}
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full transition-all ${
                  bar.covered ? "bg-de-accent" : "bg-white/15"
                }`}
                style={{ width: bar.covered ? "100%" : "18%" }}
              />
            </div>
            {bar.coveredBy && (
              <span className="hidden w-28 truncate text-xs text-white/55 sm:inline">
                {bar.coveredBy}
              </span>
            )}
          </div>
        ))}
      </div>

      {score.suggestions.length > 0 ? (
        <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
          <p className="text-xs font-medium text-white/70">Close coverage gaps</p>
          {score.suggestions.map((s) =>
            s.product ? (
              <div
                key={s.sku}
                className="flex items-start justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-3"
              >
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wide text-white/55">{s.label}</p>
                  <p className="truncate text-sm text-white">{s.product.name}</p>
                  <p className="text-xs text-white/55">
                    Coverage {s.from} → {s.to}
                  </p>
                </div>
                {onAddSuggestion ? (
                  <Button
                    size="sm"
                    className="h-8 shrink-0 bg-de-accent text-xs text-white hover:bg-[#6548ff]"
                    onClick={() => onAddSuggestion(s.product!)}
                    data-testid={`button-improve-${s.product.id}`}
                  >
                    Add
                  </Button>
                ) : (
                  <Link href={`/store/product/${s.product.sku}`}>
                    <span className="text-xs text-de-accent-ink hover:text-de-accent-ink">View</span>
                  </Link>
                )}
              </div>
            ) : null
          )}
        </div>
      ) : (
        <p className="mt-4 border-t border-white/10 pt-4 text-xs text-emerald-400/90">
          All six coverage areas are represented in this solution.
        </p>
      )}
    </div>
  );
}
