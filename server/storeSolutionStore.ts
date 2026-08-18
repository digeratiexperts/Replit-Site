import { randomUUID } from "crypto";
import { computeSolutionSnapshot, type SolutionLineInput, type SolutionSnapshot } from "@shared/storeCommerce";
import { storeProducts } from "../client/src/data/storeProducts";

export type StoredSolution = {
  id: string;
  sessionId: string;
  userId: string | null;
  name: string;
  status: "draft" | "saved" | "archived";
  items: SolutionLineInput[];
  savedForLater: SolutionLineInput[];
  snapshot: SolutionSnapshot;
  updatedAt: string;
  createdAt: string;
};

const solutions = new Map<string, StoredSolution>();
const GUEST_TTL_MS = 1000 * 60 * 60 * 24 * 30;

function catalog() {
  return storeProducts.map((product) => ({
    id: product.id,
    sku: product.sku,
    name: product.name,
    basePrice: product.basePrice,
    pricingType: product.pricingType,
    pricingUnit: product.pricingUnit,
    minimumQuantity: product.minimumQuantity,
    isCheckoutEnabled: product.isCheckoutEnabled,
    isContractOnly: product.isContractOnly,
  }));
}

function hydrate(record: StoredSolution): StoredSolution {
  return {
    ...record,
    snapshot: computeSolutionSnapshot(record.items, catalog()),
  };
}

function expireGuests() {
  const cutoff = Date.now() - GUEST_TTL_MS;
  for (const [id, record] of solutions) {
    if (record.userId) continue;
    if (new Date(record.updatedAt).getTime() < cutoff) solutions.delete(id);
  }
}

export function createSolution(sessionId: string, userId: string | null = null): StoredSolution {
  expireGuests();
  const now = new Date().toISOString();
  const record: StoredSolution = {
    id: randomUUID(),
    sessionId,
    userId,
    name: "Your Solution",
    status: "draft",
    items: [],
    savedForLater: [],
    snapshot: computeSolutionSnapshot([], catalog()),
    createdAt: now,
    updatedAt: now,
  };
  solutions.set(record.id, record);
  return record;
}

export function getSolution(id: string): StoredSolution | undefined {
  const record = solutions.get(id);
  return record ? hydrate(record) : undefined;
}

export function findSolution(opts: { id?: string; sessionId?: string; userId?: string | null }): StoredSolution | undefined {
  expireGuests();
  if (opts.id) {
    const exact = solutions.get(opts.id);
    if (exact) return hydrate(exact);
  }
  if (opts.userId) {
    const owned = [...solutions.values()].find((record) => record.userId === opts.userId && record.status !== "archived");
    if (owned) return hydrate(owned);
  }
  if (opts.sessionId) {
    const guest = [...solutions.values()].find(
      (record) => record.sessionId === opts.sessionId && record.status !== "archived",
    );
    if (guest) return hydrate(guest);
  }
  return undefined;
}

export function upsertSolution(input: {
  id?: string;
  sessionId: string;
  userId?: string | null;
  name?: string;
  items: SolutionLineInput[];
  savedForLater?: SolutionLineInput[];
}): StoredSolution {
  const existing = findSolution({ id: input.id, sessionId: input.sessionId, userId: input.userId });
  const now = new Date().toISOString();
  const base = existing ?? createSolution(input.sessionId, input.userId ?? null);
  const next: StoredSolution = {
    ...base,
    sessionId: input.sessionId || base.sessionId,
    userId: input.userId ?? base.userId,
    name: input.name?.trim() || base.name,
    items: input.items,
    savedForLater: input.savedForLater ?? base.savedForLater,
    updatedAt: now,
    snapshot: computeSolutionSnapshot(input.items, catalog()),
  };
  solutions.set(next.id, next);
  return next;
}

function mergeLines(primary: SolutionLineInput[], secondary: SolutionLineInput[]): SolutionLineInput[] {
  const map = new Map<string, number>();
  for (const line of [...primary, ...secondary]) {
    map.set(line.productId, Math.max(map.get(line.productId) ?? 0, line.quantity));
  }
  return [...map.entries()].map(([productId, quantity]) => ({ productId, quantity }));
}

/** Attach a guest solution to a portal user. Union quantities; never drop either side. */
export function claimSolution(sessionId: string, userId: string): StoredSolution {
  const guest = findSolution({ sessionId });
  const owned = findSolution({ userId });
  if (guest && owned && guest.id !== owned.id) {
    const merged = upsertSolution({
      id: owned.id,
      sessionId,
      userId,
      items: mergeLines(owned.items, guest.items),
      savedForLater: mergeLines(owned.savedForLater, guest.savedForLater),
    });
    solutions.delete(guest.id);
    return merged;
  }
  if (guest) {
    guest.userId = userId;
    guest.updatedAt = new Date().toISOString();
    solutions.set(guest.id, guest);
    return hydrate(guest);
  }
  if (owned) return owned;
  return createSolution(sessionId, userId);
}

export function publicSolution(record: StoredSolution) {
  return {
    id: record.id,
    name: record.name,
    status: record.status,
    items: record.items,
    savedForLater: record.savedForLater,
    snapshot: record.snapshot,
    updatedAt: record.updatedAt,
    createdAt: record.createdAt,
  };
}
