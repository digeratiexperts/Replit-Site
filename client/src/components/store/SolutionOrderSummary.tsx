import type { ReactNode } from "react";
import { Package, RefreshCw } from "lucide-react";
import type { SolutionSnapshot } from "@shared/storeCommerce";
import {
  formatSnapshotMoney,
  lineCadence,
  linesByBucket,
} from "@/lib/solutionSnapshotView";

type SolutionOrderSummaryProps = {
  snapshot: SolutionSnapshot;
  title: string;
  titleIcon?: ReactNode;
  testId?: string;
  footer?: ReactNode;
};

function LineRows({
  lines,
  testPrefix,
}: {
  lines: ReturnType<typeof linesByBucket>;
  testPrefix: string;
}) {
  return (
    <>
      {lines.map((line) => (
        <div
          key={line.productId}
          className="flex items-start justify-between border-b border-white/10 py-3"
          data-testid={`${testPrefix}-${line.productId}`}
        >
          <div className="flex-1">
            <p className="text-sm font-medium text-white">{line.name}</p>
            <p className="text-xs text-white/50">
              {line.quantity}x {formatSnapshotMoney(line.unitPrice)}
              {lineCadence(line)}
            </p>
          </div>
          <p className="text-sm font-medium text-white">
            {formatSnapshotMoney(line.lineTotal)}
            {lineCadence(line)}
          </p>
        </div>
      ))}
    </>
  );
}

/** Shared quote + checkout money view — same snapshot as the drawer. */
export function SolutionOrderSummary({
  snapshot,
  title,
  titleIcon,
  testId = "section-order-summary",
  footer,
}: SolutionOrderSummaryProps) {
  const monthly = linesByBucket(snapshot, "monthly");
  const annual = linesByBucket(snapshot, "annual");
  const dueToday = linesByBucket(snapshot, "dueToday");

  return (
    <div
      className="sticky top-28 rounded-xl border border-white/10 bg-white/5 p-6"
      data-testid={testId}
    >
      <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-white">
        {titleIcon}
        {title}
      </h2>

      <div className="mb-6 space-y-4">
        {monthly.length > 0 && (
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm text-white/60">
              <RefreshCw className="h-4 w-4" />
              Monthly
            </div>
            <LineRows lines={monthly} testPrefix="order-item" />
          </div>
        )}
        {annual.length > 0 && (
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm text-white/60">
              <RefreshCw className="h-4 w-4" />
              Annual
            </div>
            <LineRows lines={annual} testPrefix="order-item" />
          </div>
        )}
        {dueToday.length > 0 && (
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm text-white/60">
              <Package className="h-4 w-4" />
              Due today
            </div>
            <LineRows lines={dueToday} testPrefix="order-item" />
          </div>
        )}
      </div>

      <div className="space-y-2 border-t border-white/20 pt-4">
        {snapshot.totals.monthly > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Monthly</span>
            <span className="text-white">{formatSnapshotMoney(snapshot.totals.monthly)} / month</span>
          </div>
        )}
        {snapshot.totals.annual > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Annual</span>
            <span className="text-white">{formatSnapshotMoney(snapshot.totals.annual)} / year</span>
          </div>
        )}
        <div className="flex justify-between border-t border-white/10 pt-2 text-lg font-semibold">
          <span className="text-white">Due today</span>
          <span className="text-de-accent-ink" data-testid="text-total-due">
            {formatSnapshotMoney(snapshot.totals.dueToday)}
          </span>
        </div>
      </div>
      {footer}
    </div>
  );
}
