import type { StoreProduct } from "@/data/storeProducts";
import { getProductBySku, getProductRelationships } from "@/data/storeMerchandising";

export type SolutionWarning = {
  sku: string;
  product?: StoreProduct;
  forSku: string;
  forName: string;
  message: string;
};

export function getMissingRequirements(products: StoreProduct[]): SolutionWarning[] {
  const inCart = new Set(products.map((product) => product.sku));
  const warnings: SolutionWarning[] = [];
  for (const product of products) {
    const required = getProductRelationships(product.sku)?.required || [];
    for (const sku of required) {
      if (inCart.has(sku)) continue;
      const requiredProduct = getProductBySku(sku);
      warnings.push({
        sku,
        product: requiredProduct,
        forSku: product.sku,
        forName: product.name,
        message: `${requiredProduct?.name || sku} is a prerequisite for ${product.name}.`,
      });
    }
  }
  return warnings;
}

export function recommendationWhy(candidate: StoreProduct, cart: StoreProduct[]): string {
  for (const item of cart) {
    const rel = getProductRelationships(item.sku);
    if (rel?.required?.includes(candidate.sku)) {
      return `Required by ${item.name} — not added automatically.`;
    }
    if (rel?.upgradeTo?.includes(candidate.sku)) {
      return `Upgrade path from ${item.name}.`;
    }
    if (rel?.worksWith?.includes(candidate.sku)) {
      return `Commonly paired with ${item.name}.`;
    }
  }
  return "Closes a detected coverage gap in this solution.";
}
