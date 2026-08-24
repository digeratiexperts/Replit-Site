import { and, eq } from "drizzle-orm";
import { money } from "@shared/storeCommerce";
import { storeClientPricing } from "@shared/schema";
import { db, dbReady, initPromise } from "./db";

export type ClientPriceEntry = {
  productId: string;
  customPrice: number;
  discountPercent: number;
};

/**
 * Demo / admin overlay for local development only.
 * Production commerce must never derive a client price from this map.
 */
const demoClientPricing = new Map<string, ClientPriceEntry[]>([
  [
    "client-1",
    [
      { productId: "prod-010", customPrice: 35, discountPercent: 10 },
      { productId: "prod-011", customPrice: 22, discountPercent: 12 },
      { productId: "prod-040", customPrice: 22.5, discountPercent: 10 },
    ],
  ],
  [
    "client-2",
    [
      { productId: "prod-010", customPrice: 32, discountPercent: 18 },
      { productId: "prod-012", customPrice: 5, discountPercent: 17 },
    ],
  ],
  [
    "client-3",
    [
      { productId: "prod-010", customPrice: 37, discountPercent: 5 },
      { productId: "prod-035", customPrice: 160, discountPercent: 9 },
      { productId: "prod-036", customPrice: 200, discountPercent: 11 },
    ],
  ],
  [
    "client-4",
    [
      { productId: "prod-010", customPrice: 36, discountPercent: 8 },
      { productId: "prod-030", customPrice: 179, discountPercent: 10 },
    ],
  ],
  [
    "client-5",
    [
      { productId: "prod-010", customPrice: 34, discountPercent: 13 },
      { productId: "prod-011", customPrice: 20, discountPercent: 20 },
      { productId: "prod-030", customPrice: 169, discountPercent: 15 },
      { productId: "prod-040", customPrice: 20, discountPercent: 20 },
    ],
  ],
]);

export function isDemoClientPricingAllowed(): boolean {
  return process.env.NODE_ENV !== "production";
}

export function listDemoClientPricing(clientId: string): ClientPriceEntry[] {
  if (!isDemoClientPricingAllowed()) return [];
  return [...(demoClientPricing.get(clientId) || [])];
}

export function upsertDemoClientPricing(clientId: string, entry: ClientPriceEntry): ClientPriceEntry {
  if (!isDemoClientPricingAllowed()) {
    throw new Error("Demo client pricing is disabled in production; persist pricing to store_client_pricing");
  }

  const current = listDemoClientPricing(clientId);
  const index = current.findIndex((row) => row.productId === entry.productId);
  if (index >= 0) current[index] = entry;
  else current.push(entry);
  demoClientPricing.set(clientId, current);
  return entry;
}

export function removeDemoClientPricing(clientId: string, productId: string): ClientPriceEntry | undefined {
  if (!isDemoClientPricingAllowed()) {
    throw new Error("Demo client pricing is disabled in production; persist pricing to store_client_pricing");
  }

  const current = listDemoClientPricing(clientId);
  const removed = current.find((row) => row.productId === productId);
  demoClientPricing.set(
    clientId,
    current.filter((row) => row.productId !== productId),
  );
  return removed;
}

async function loadDbClientPricing(clientId: string): Promise<ClientPriceEntry[]> {
  await initPromise;
  if (!dbReady || !db) return [];
  try {
    const rows = await db
      .select()
      .from(storeClientPricing)
      .where(and(eq(storeClientPricing.clientId, clientId), eq(storeClientPricing.isActive, true)));
    return rows
      .map((row: { productId: string; customPrice: string | number; discountPercent?: string | number | null }) => ({
        productId: row.productId,
        customPrice: Number(row.customPrice),
        discountPercent: Number(row.discountPercent || 0),
      }))
      .filter((row: ClientPriceEntry) => Number.isFinite(row.customPrice) && row.customPrice > 0);
  } catch (error: any) {
    console.warn("[store-pricing] database lookup skipped:", error?.message || error);
    return [];
  }
}

/**
 * Production pricing is DB-authoritative. The in-memory demo overlay exists only
 * for local development/test data and can never influence a production charge.
 */
export async function resolveClientPricingRows(clientId: string | null | undefined): Promise<ClientPriceEntry[]> {
  if (!clientId) return [];
  const fromDb = await loadDbClientPricing(clientId);
  if (fromDb.length) return fromDb;
  if (!isDemoClientPricingAllowed()) return [];
  return listDemoClientPricing(clientId);
}

export function toPriceOverrides(rows: ClientPriceEntry[]): Record<string, number> {
  const overrides: Record<string, number> = {};
  for (const row of rows) {
    const price = money(Number(row.customPrice));
    if (Number.isFinite(price) && price > 0) overrides[row.productId] = price;
  }
  return overrides;
}

/**
 * Honor a server-side client list price only when it is a real discount.
 * Higher or invalid overrides fall back to catalog list price.
 */
export function resolveUnitPrice(listPrice: number, override?: number): number {
  const list = money(listPrice);
  if (override == null) return list;
  const custom = money(Number(override));
  if (!Number.isFinite(custom) || custom <= 0 || custom >= list) return list;
  return custom;
}
