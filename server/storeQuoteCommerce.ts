import { money, pricingBucket, type CommercePricingType } from "@shared/storeCommerce";
import { storeProducts } from "../client/src/data/storeProducts";
import { resolveUnitPrice } from "./storeClientPricing";

export type CanonicalQuoteLine = {
  productId: string;
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  listPrice: number;
  pricingType: CommercePricingType;
  total: number;
  contractOnly: boolean;
};

export type QuoteTotals = {
  dueToday: number;
  monthly: number;
  annual: number;
};

function stringValue(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

/**
 * Quotes may include contract-only SKUs. Browser unit prices are ignored.
 * Client list prices apply only when they are a verified discount.
 */
export function canonicalizeQuoteItems(
  suppliedItems: unknown,
  priceOverrides: Record<string, number> = {},
): CanonicalQuoteLine[] {
  if (!Array.isArray(suppliedItems) || suppliedItems.length === 0) {
    throw new Error("Requested items are required");
  }
  if (suppliedItems.length > 50) {
    throw new Error("Too many line items");
  }

  const canonical: CanonicalQuoteLine[] = [];
  for (const raw of suppliedItems) {
    if (!raw || typeof raw !== "object") {
      throw new Error("Invalid line item");
    }
    const item = raw as Record<string, unknown>;
    const productId = stringValue(item.productId ?? item.id, 100);
    const sku = stringValue(item.sku, 100);
    if (!productId) {
      throw new Error("Every line item must include productId");
    }

    const product = storeProducts.find((candidate) => candidate.id === productId);
    if (!product) {
      throw new Error(`Unknown store product: ${productId}`);
    }
    if (sku && product.sku !== sku) {
      throw new Error(`Unknown or mismatched store product: ${sku || productId}`);
    }

    const rawQuantity = Number(item.quantity);
    if (!Number.isSafeInteger(rawQuantity) || rawQuantity < product.minimumQuantity || rawQuantity > 10000) {
      throw new Error(`Invalid quantity for ${product.sku}`);
    }

    const listPrice = money(Number(product.basePrice));
    if (!Number.isFinite(listPrice) || listPrice <= 0) {
      throw new Error(`Product does not have a valid quote price: ${product.sku}`);
    }

    const unitPrice = resolveUnitPrice(listPrice, priceOverrides[product.id]);
    canonical.push({
      productId: product.id,
      sku: product.sku,
      name: product.name,
      quantity: rawQuantity,
      unitPrice,
      listPrice,
      pricingType: product.pricingType,
      total: money(unitPrice * rawQuantity),
      contractOnly: product.isContractOnly,
    });
  }

  return canonical;
}

export function quoteTotals(lines: CanonicalQuoteLine[]): QuoteTotals {
  const totals: QuoteTotals = { dueToday: 0, monthly: 0, annual: 0 };
  for (const line of lines) {
    const bucket = pricingBucket(line.pricingType);
    totals[bucket] = money(totals[bucket] + line.total);
  }
  return totals;
}
