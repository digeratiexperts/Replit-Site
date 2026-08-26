import { Link } from "wouter";
import { Check, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { StoreProduct } from "@/data/storeProducts";
import { computeCoverageScore } from "@/data/storeMerchandising";
import { analytics } from "@/lib/analytics";

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
      className="rounded-xl border border-[color:var(--dp-border-10)] bg-[color:var(--dp-card-bg)] p-4"
      data-testid="coverage-score-panel"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-de-accent-ink" />
          <h3 className="text-sm font-semibold text-[color:var(--dp-text-primary)]">Solution coverage</h3>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-[color:var(--dp-text-primary)]" data-testid="text-coverage-score">
            {score.total}
            <span className="text-sm font-medium text-[color:var(--dp-text-55)]"> / 100</span>
          </span>
          <p className="text-sm text-[color:var(--dp-text-55)]" data-testid="text-coverage-areas">
            {score.coveredCount} of {score.dimensionCount} areas
          </p>
        </div>
      </div>
      <p className="mb-4 text-xs leading-relaxed text-[color:var(--dp-text-55)]">
        Heuristic stack coverage (endpoint, identity, email, backup, network, compliance) —
        not a security audit or certification claim.
      </p>

      <div className="space-y-2.5">
        {score.bars.map((bar) => (
          <div key={bar.id} className="flex items-center gap-3">
            <span className="flex w-20 items-center gap-1 text-xs text-[color:var(--dp-text-55)]">
              {bar.covered && <Check className="h-3 w-3 shrink-0 text-[color:var(--dp-success)]" />}
              {bar.label}
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-[color:var(--dp-tint-bg)]">
              <div
                className={`h-full rounded-full transition-all ${
                  bar.covered ? "bg-de-accent" : "bg-[color:var(--dp-border-15)]"
                }`}
                style={{ width: bar.covered ? "100%" : "18%" }}
              />
            </div>
            {bar.coveredBy && (
              <span className="hidden w-28 truncate text-xs text-[color:var(--dp-text-55)] sm:inline">
                {bar.coveredBy}
              </span>
            )}
          </div>
        ))}
      </div>

      {score.suggestions.length > 0 ? (
        <div className="mt-4 space-y-2 border-t border-[color:var(--dp-border-10)] pt-4">
          <p className="text-xs font-medium text-[color:var(--dp-text-70)]">Recommended because this layer is missing</p>
          {score.suggestions.map((s) =>
            s.product ? (
              <div
                key={s.sku}
                className="flex items-start justify-between gap-2 rounded-lg border border-[color:var(--dp-border-10)] bg-[color:var(--dp-card-bg)] p-3"
              >
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wide text-[color:var(--dp-text-55)]">{s.label}</p>
                  <p className="truncate text-sm text-[color:var(--dp-text-primary)]">{s.product.name}</p>
                  <p className="text-xs text-[color:var(--dp-text-55)]">
                    Coverage {s.from} → {s.to}
                  </p>
                </div>
                {onAddSuggestion ? (
                  <Button
                    size="sm"
                    className="h-8 shrink-0 bg-de-accent text-xs text-white hover:bg-[#6548ff]"
                    onClick={() => {
                      analytics.storeCoverageGapViewed(s.label);
                      analytics.storeAcceptRecommendation(s.product!.name, `Closes ${s.label} coverage gap`);
                      onAddSuggestion(s.product!);
                    }}
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
        <p className="mt-4 border-t border-[color:var(--dp-border-10)] pt-4 text-xs text-[color:var(--dp-success)]">
          All six coverage areas are represented in this solution.
        </p>
      )}
    </div>
  );
}
