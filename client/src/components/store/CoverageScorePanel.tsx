import { useState } from "react";
import { Link } from "wouter";
import { Check, ChevronDown, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { StoreProduct } from "@/data/storeProducts";
import { computeCoverageScore } from "@/data/storeMerchandising";
import { analytics } from "@/lib/analytics";
import { cartIdentityKeys, suggestionAlreadyInSolution } from "@/components/store/solutionCartUx";

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
  compact = false,
}: CoverageScorePanelProps) {
  const score = computeCoverageScore(products);
  const [expanded, setExpanded] = useState(!compact);
  const inSolution = cartIdentityKeys(products);

  if (products.length === 0) return null;

  const details = (
    <>
      <p className={`${compact ? "mb-3" : "mb-4"} text-xs leading-relaxed text-[color:var(--dp-text-55,#ffffff8c)]`}>
        Heuristic stack coverage (endpoint, identity, email, backup, network, compliance) —
        not a security audit or certification claim.
      </p>

      <div className="space-y-2.5">
        {score.bars.map((bar) => (
          <div key={bar.id} className="flex items-center gap-3">
            <span className="flex w-20 items-center gap-1 text-xs text-[color:var(--dp-text-55,#ffffff8c)]">
              {bar.covered && <Check className="h-3 w-3 shrink-0 text-[color:var(--dp-success,#34d399)]" />}
              {bar.label}
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-[color:var(--dp-tint-bg,#ffffff1a)]">
              <div
                className={`h-full rounded-full transition-all ${
                  bar.covered ? "bg-de-accent" : "bg-[color:var(--dp-border-15,#ffffff26)]"
                }`}
                style={{ width: bar.covered ? "100%" : "18%" }}
              />
            </div>
            {bar.coveredBy && (
              <span className="hidden w-28 truncate text-xs text-[color:var(--dp-text-55,#ffffff8c)] sm:inline">
                {bar.coveredBy}
              </span>
            )}
          </div>
        ))}
      </div>

      {score.suggestions.length > 0 ? (
        <div className="mt-4 space-y-2 border-t border-[color:var(--dp-border-10,#ffffff1a)] pt-4">
          <p className="text-xs font-medium text-[color:var(--dp-text-70,#ffffffb3)]">
            Recommended because this layer is missing
          </p>
          {score.suggestions.map((s) =>
            s.product ? (
              <div
                key={s.sku}
                className="flex items-start justify-between gap-2 rounded-lg border border-[color:var(--dp-border-10,#ffffff1a)] bg-[color:var(--dp-card-bg,#141414)] p-3"
                data-testid={`coverage-suggestion-${s.product.id}`}
              >
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wide text-[color:var(--dp-text-55,#ffffff8c)]">{s.label}</p>
                  <p className="truncate text-sm text-[color:var(--dp-text-primary,#ffffff)]">{s.product.name}</p>
                  <p className="text-xs text-[color:var(--dp-text-55,#ffffff8c)]">
                    Coverage {s.from} → {s.to}
                  </p>
                </div>
                {suggestionAlreadyInSolution(s.product, inSolution) ? (
                  <span
                    className="inline-flex h-10 shrink-0 items-center gap-1 px-2 text-xs text-[color:var(--dp-success,#34d399)]"
                    data-testid={`coverage-in-solution-${s.product.id}`}
                  >
                    <Check className="h-3.5 w-3.5" />
                    In solution
                  </span>
                ) : onAddSuggestion ? (
                  <Button
                    size="sm"
                    variant={compact ? "outline" : "default"}
                    className={
                      compact
                        ? "h-10 shrink-0 border-[color:var(--dp-border-15,#ffffff26)] bg-transparent text-xs text-[color:var(--dp-text-primary,#ffffff)] hover:bg-[color:var(--dp-hover-bg,#ffffff14)]"
                        : "h-8 shrink-0 bg-de-accent text-xs text-white hover:bg-[#6548ff]"
                    }
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
        <p className="mt-4 border-t border-[color:var(--dp-border-10,#ffffff1a)] pt-4 text-xs text-[color:var(--dp-success,#34d399)]">
          All six coverage areas are represented in this solution.
        </p>
      )}
    </>
  );

  if (compact) {
    return (
      <div
        className="shrink-0 border-b border-[color:var(--dp-border-10,#ffffff1a)] bg-[color:var(--dp-card-bg,#141414)]"
        data-testid="coverage-score-panel"
        data-compact="true"
      >
        <button
          type="button"
          className="flex min-h-11 w-full items-center justify-between gap-2 px-4 py-2 text-left sm:px-5"
          onClick={() => setExpanded((open) => !open)}
          aria-expanded={expanded}
          data-testid="button-toggle-coverage"
        >
          <span className="flex min-w-0 items-center gap-2">
            <Shield className="h-4 w-4 shrink-0 text-de-accent-ink" />
            <span className="truncate text-sm font-semibold text-[color:var(--dp-text-primary,#ffffff)]">
              Solution coverage
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-2">
            <span className="text-sm tabular-nums text-[color:var(--dp-text-primary,#ffffff)]" data-testid="text-coverage-score">
              {score.total}
              <span className="text-xs font-medium text-[color:var(--dp-text-55,#ffffff8c)]"> / 100</span>
            </span>
            <span className="hidden text-xs text-[color:var(--dp-text-55,#ffffff8c)] sm:inline" data-testid="text-coverage-areas">
              {score.coveredCount} of {score.dimensionCount} areas
            </span>
            <ChevronDown
              className={`h-4 w-4 text-[color:var(--dp-text-55,#ffffff8c)] transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </span>
        </button>
        {expanded && <div className="px-4 pb-3 sm:px-5">{details}</div>}
      </div>
    );
  }

  return (
    <div
      className="rounded-xl border border-[color:var(--dp-border-10,#ffffff1a)] bg-[color:var(--dp-card-bg,#141414)] p-4"
      data-testid="coverage-score-panel"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-de-accent-ink" />
          <h3 className="text-sm font-semibold text-[color:var(--dp-text-primary,#ffffff)]">Solution coverage</h3>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-[color:var(--dp-text-primary,#ffffff)]" data-testid="text-coverage-score">
            {score.total}
            <span className="text-sm font-medium text-[color:var(--dp-text-55,#ffffff8c)]"> / 100</span>
          </span>
          <p className="text-sm text-[color:var(--dp-text-55,#ffffff8c)]" data-testid="text-coverage-areas">
            {score.coveredCount} of {score.dimensionCount} areas
          </p>
        </div>
      </div>
      {details}
    </div>
  );
}
