import type { CanonicalSolutionLine, SolutionSnapshot } from "@shared/storeCommerce";

export function formatSnapshotMoney(amount: number): string {
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function snapshotSubmitLines(snapshot: SolutionSnapshot) {
  return snapshot.lines.map((line) => ({
    productId: line.productId,
    sku: line.sku,
    quantity: line.quantity,
  }));
}

export function linesByBucket(
  snapshot: SolutionSnapshot,
  bucket: CanonicalSolutionLine["bucket"],
): CanonicalSolutionLine[] {
  return snapshot.lines.filter((line) => line.bucket === bucket);
}

export function lineCadence(line: CanonicalSolutionLine): string {
  if (line.bucket === "monthly") return " / month";
  if (line.bucket === "annual") return " / year";
  return "";
}
