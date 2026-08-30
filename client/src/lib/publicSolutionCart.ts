import type { CuratedDeliveryModel, CuratedSolutionFamily } from "@/data/curatedSolutions";

export type PublicSolutionCartItem = {
  familyId: CuratedSolutionFamily["id"];
  delivery: CuratedDeliveryModel;
};

const STORAGE_KEY = "de-public-solution-cart-v1";
export const SOLUTION_CART_EVENT = "de-solution-cart-change";

export function readSolutionCart(): PublicSolutionCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(value) ? value.filter((item) => item?.familyId && item?.delivery) : [];
  } catch {
    return [];
  }
}

function write(items: PublicSolutionCartItem[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(SOLUTION_CART_EVENT));
}

export function addSolutionCartItem(item: PublicSolutionCartItem) {
  const items = readSolutionCart().filter((entry) => entry.familyId !== item.familyId);
  write([...items, item]);
}

export function removeSolutionCartItem(familyId: string) {
  write(readSolutionCart().filter((entry) => entry.familyId !== familyId));
}

export function clearSolutionCart() {
  write([]);
}
