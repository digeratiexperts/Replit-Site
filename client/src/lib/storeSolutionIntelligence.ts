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

export type SolutionChip = {
  kind: "in_solution" | "required_by" | "works_with" | "upgrade";
  label: string;
};

/** Status chips only when merchandising data exists — never “already owned”. */
export function getSolutionChips(product: StoreProduct, solution: StoreProduct[]): SolutionChip[] {
  const chips: SolutionChip[] = [];
  if (solution.some((item) => item.sku === product.sku)) {
    chips.push({ kind: "in_solution", label: "Already in your solution" });
  }
  for (const item of solution) {
    if (item.sku === product.sku) continue;
    const rel = getProductRelationships(item.sku);
    if (rel?.required?.includes(product.sku)) {
      chips.push({ kind: "required_by", label: `Required by ${item.name}` });
    }
    if (rel?.worksWith?.includes(product.sku)) {
      chips.push({ kind: "works_with", label: `Works with ${item.name}` });
    }
    if (rel?.upgradeTo?.includes(product.sku)) {
      chips.push({ kind: "upgrade", label: `Upgrade from ${item.name}` });
    }
  }
  const seen = new Set<string>();
  return chips.filter((chip) => {
    if (seen.has(chip.label)) return false;
    seen.add(chip.label);
    return true;
  }).slice(0, 2);
}

export function recommendationWhy(candidate: StoreProduct, cart: StoreProduct[]): string | null {
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
  return null;
}
