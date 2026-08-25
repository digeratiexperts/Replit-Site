import { and, eq } from "drizzle-orm";
import { money } from "@shared/storeCommerce";
import { storeClientPricing } from "@shared/schema";
import { storeProducts as catalogProducts } from "../client/src/data/storeProducts";
import { db, dbReady, initPromise } from "./db";

export type ClientPriceEntry = {
  productId: string;
  customPrice: number;
  discountPercent: number;
};

export type ClientPricingMutationResult = {
  previous: ClientPriceEntry | null;
  current: ClientPriceEntry | null;
  source: "database" | "demo";
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

function rowToEntry(row: {
  productId: string;
  customPrice: string | number;
  discountPercent?: string | number | null;
}): ClientPriceEntry | null {
  const customPrice = money(Number(row.customPrice));
  const discountPercent = money(Number(row.discountPercent || 0));
  if (!Number.isFinite(customPrice) || customPrice <= 0) return null;
  return {
    productId: row.productId,
    customPrice,
    discountPercent: Number.isFinite(discountPercent) ? discountPercent : 0,
  };
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
      .map(rowToEntry)
      .filter((row): row is ClientPriceEntry => row !== null);
  } catch (error: any) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(`Client pricing lookup failed: ${error?.message || error}`);
    }
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

/**
 * Canonical precedence for negotiated pricing:
 * 1. explicit custom price, when supplied;
 * 2. otherwise a percentage discount converted from the canonical catalog price;
 * 3. otherwise no override (catalog price remains authoritative).
 *
 * discountPercent is stored as derived metadata whenever customPrice is supplied,
 * preventing the two fields from disagreeing about what checkout should charge.
 */
export function buildClientPriceEntry(input: {
  productId: string;
  customPrice?: unknown;
  discountPercent?: unknown;
}): ClientPriceEntry {
  const product = catalogProducts.find((candidate) => candidate.id === input.productId);
  if (!product) throw new Error("Unknown store product");

  const listPrice = money(Number(product.basePrice));
  if (!Number.isFinite(listPrice) || listPrice <= 0) {
    throw new Error("Store product does not have a valid base price");
  }

  const hasCustom = input.customPrice !== undefined && input.customPrice !== null && input.customPrice !== "";
  const hasDiscount = input.discountPercent !== undefined && input.discountPercent !== null && input.discountPercent !== "";
  if (!hasCustom && !hasDiscount) {
    throw new Error("Either custom price or discount percent is required");
  }

  if (hasCustom) {
    const customPrice = money(Number(input.customPrice));
    if (!Number.isFinite(customPrice) || customPrice <= 0 || customPrice >= listPrice) {
      throw new Error("Custom price must be greater than zero and lower than catalog price");
    }
    const discountPercent = money(((listPrice - customPrice) / listPrice) * 100);
    return { productId: product.id, customPrice, discountPercent };
  }

  const discountPercent = money(Number(input.discountPercent));
  if (!Number.isFinite(discountPercent) || discountPercent <= 0 || discountPercent >= 100) {
    throw new Error("Discount percent must be greater than zero and less than 100");
  }
  const customPrice = money(listPrice * (1 - discountPercent / 100));
  if (!Number.isFinite(customPrice) || customPrice <= 0 || customPrice >= listPrice) {
    throw new Error("Discount does not produce a valid client price");
  }
  return { productId: product.id, customPrice, discountPercent };
}

export async function setClientPricing(input: {
  clientId: string;
  productId: string;
  customPrice?: unknown;
  discountPercent?: unknown;
}): Promise<ClientPricingMutationResult> {
  const clientId = String(input.clientId || "").trim();
  if (!clientId) throw new Error("Client ID is required");
  const next = buildClientPriceEntry(input);

  await initPromise;
  if (dbReady && db) {
    const [existing] = await db
      .select()
      .from(storeClientPricing)
      .where(and(eq(storeClientPricing.clientId, clientId), eq(storeClientPricing.productId, next.productId)))
      .limit(1);
    const previous = existing ? rowToEntry(existing) : null;

    if (existing) {
      await db
        .update(storeClientPricing)
        .set({
          customPrice: next.customPrice.toFixed(2),
          discountPercent: next.discountPercent.toFixed(2),
          isActive: true,
          updatedAt: new Date(),
        })
        .where(eq(storeClientPricing.id, existing.id));
    } else {
      await db.insert(storeClientPricing).values({
        clientId,
        productId: next.productId,
        customPrice: next.customPrice.toFixed(2),
        discountPercent: next.discountPercent.toFixed(2),
        isActive: true,
      });
    }

    return { previous, current: next, source: "database" };
  }

  if (!isDemoClientPricingAllowed()) {
    throw new Error("Durable client pricing database is unavailable");
  }

  const previous = listDemoClientPricing(clientId).find((row) => row.productId === next.productId) || null;
  upsertDemoClientPricing(clientId, next);
  return { previous, current: next, source: "demo" };
}

export async function removeClientPricing(
  clientIdInput: string,
  productIdInput: string,
): Promise<ClientPricingMutationResult> {
  const clientId = String(clientIdInput || "").trim();
  const productId = String(productIdInput || "").trim();
  if (!clientId || !productId) throw new Error("Client ID and Product ID are required");

  await initPromise;
  if (dbReady && db) {
    const [existing] = await db
      .select()
      .from(storeClientPricing)
      .where(and(eq(storeClientPricing.clientId, clientId), eq(storeClientPricing.productId, productId)))
      .limit(1);
    const previous = existing ? rowToEntry(existing) : null;
    if (existing) {
      await db
        .update(storeClientPricing)
        .set({ isActive: false, updatedAt: new Date() })
        .where(eq(storeClientPricing.id, existing.id));
    }
    return { previous, current: null, source: "database" };
  }

  if (!isDemoClientPricingAllowed()) {
    throw new Error("Durable client pricing database is unavailable");
  }

  const previous = removeDemoClientPricing(clientId, productId) || null;
  return { previous, current: null, source: "demo" };
}
