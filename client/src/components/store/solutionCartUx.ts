import type { StoreProduct } from "@/data/storeProducts";

/**
 * Quote-builder totals for the Your Solution footer.
 * Ongoing equivalent duplicates Monthly when there is no annual to convert.
 */
export function shouldShowOngoingEquivalent(totals: {
  monthly: number;
  annual: number;
  recurringMonthlyEquivalent: number;
}): boolean {
  if (totals.recurringMonthlyEquivalent <= 0) return false;
  if (totals.annual <= 0 && Math.abs(totals.recurringMonthlyEquivalent - totals.monthly) < 0.005) {
    return false;
  }
  return true;
}

export function cartIdentityKeys(products: Pick<StoreProduct, "id" | "sku">[]): Set<string> {
  const keys = new Set<string>();
  for (const product of products) {
    keys.add(product.id);
    keys.add(product.sku);
  }
  return keys;
}

export function suggestionAlreadyInSolution(
  product: Pick<StoreProduct, "id" | "sku"> | undefined,
  inSolution: Set<string>,
): boolean {
  if (!product) return false;
  return inSolution.has(product.id) || inSolution.has(product.sku);
}
