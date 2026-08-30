import { formatSnapshotMoney } from "@/lib/solutionSnapshotView";

export type SolutionDrawerPaneId = "items" | "coverage" | "checkout";
export type SolutionDrawerViewport = "mobile" | "tablet" | "desktop";

export type SolutionDrawerPaneState = Record<SolutionDrawerPaneId, boolean>;

export const SOLUTION_PANE_IDS: SolutionDrawerPaneId[] = ["items", "coverage", "checkout"];

export function readSolutionDrawerViewport(width: number): SolutionDrawerViewport {
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

/**
 * Line items stay open so an add is visible. Checkout stays open so pay/quote
 * is reachable. Coverage is a genuine third pane on desktop; it starts collapsed
 * on smaller screens so it does not bury the cart.
 */
export function defaultSolutionDrawerPanes(
  viewport: SolutionDrawerViewport,
): SolutionDrawerPaneState {
  return {
    items: true,
    coverage: viewport === "desktop",
    checkout: true,
  };
}

export function openItemsPane(state: SolutionDrawerPaneState): SolutionDrawerPaneState {
  return { ...state, items: true };
}

export function toggleSolutionPane(
  state: SolutionDrawerPaneState,
  id: SolutionDrawerPaneId,
): SolutionDrawerPaneState {
  return { ...state, [id]: !state[id] };
}

export function itemsPaneSummary(count: number): string {
  return `${count} service${count === 1 ? "" : "s"}`;
}

export function coveragePaneSummary(coveredCount: number, dimensionCount: number): string {
  return `${coveredCount} of ${dimensionCount} areas`;
}

export function checkoutPaneSummary(totals: {
  dueToday: number;
  monthly: number;
  annual: number;
}): string {
  if (totals.dueToday > 0) return `Due today ${formatSnapshotMoney(totals.dueToday)}`;
  if (totals.monthly > 0) return `Monthly ${formatSnapshotMoney(totals.monthly)}`;
  if (totals.annual > 0) return `Annual ${formatSnapshotMoney(totals.annual)}`;
  return "Review totals";
}
