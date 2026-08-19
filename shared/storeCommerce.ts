/**
 * DE Solution commerce math.
 *
 * The Solution is the canonical object. Browser totals are display-only;
 * the server recalculates from the catalog before persist / quote / checkout.
 * Zoho Payments remains the money path — this module never talks to Stripe.
 */

export type CommercePricingType =
  | "one_time"
  | "monthly"
  | "yearly"
  | "per_hour"
  | "per_user"
  | "per_endpoint"
  | "per_device"
  | "per_location"
  | "per_seat";

export type CommerceProduct = {
  id: string;
  sku: string;
  name: string;
  basePrice: number;
  pricingType: CommercePricingType;
  pricingUnit?: string;
  minimumQuantity: number;
  isCheckoutEnabled: boolean;
  isContractOnly: boolean;
};

export type SolutionLineInput = {
  productId: string;
  sku?: string;
  quantity: number;
};

export type CanonicalSolutionLine = {
  productId: string;
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  pricingType: CommercePricingType;
  pricingUnit: string;
  bucket: "dueToday" | "monthly" | "annual";
};

export type SolutionTotals = {
  dueToday: number;
  monthly: number;
  annual: number;
  oneTime: number;
  recurringMonthlyEquivalent: number;
  itemCount: number;
  lineCount: number;
};

export type SolutionSnapshot = {
  lines: CanonicalSolutionLine[];
  totals: SolutionTotals;
};

export function money(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function isRecurringPricingType(pricingType: CommercePricingType): boolean {
  return (
    pricingType === "monthly" ||
    pricingType === "yearly" ||
    pricingType === "per_user" ||
    pricingType === "per_endpoint" ||
    pricingType === "per_device" ||
    pricingType === "per_location" ||
    pricingType === "per_seat"
  );
}

export function pricingBucket(pricingType: CommercePricingType): CanonicalSolutionLine["bucket"] {
  if (pricingType === "yearly") return "annual";
  if (isRecurringPricingType(pricingType)) return "monthly";
  return "dueToday";
}

export function billingLabel(pricingType: CommercePricingType, unit?: string): string {
  switch (pricingType) {
    case "one_time":
      return "One-time";
    case "yearly":
      return unit ? `Per ${unit} / year` : "Annual";
    case "monthly":
      return unit ? `Per ${unit} / month` : "Monthly";
    case "per_hour":
      return "Hourly / as used";
    case "per_user":
    case "per_seat":
      return "Per user / month";
    case "per_endpoint":
    case "per_device":
      return "Per endpoint / month";
    case "per_location":
      return "Per site / month";
    default:
      return "Quoted";
  }
}

function findProduct(
  catalog: CommerceProduct[],
  productId: string,
  sku?: string,
): CommerceProduct | undefined {
  const byId = catalog.find((product) => product.id === productId);
  if (!byId) return undefined;
  if (sku && byId.sku !== sku) return undefined;
  return byId;
}

/**
 * Recalculate a solution from catalog list prices.
 * Client-supplied unit prices are ignored — they are not authoritative.
 */
export function computeSolutionSnapshot(
  lines: SolutionLineInput[],
  catalog: CommerceProduct[],
): SolutionSnapshot {
  const merged = new Map<string, number>();
  for (const line of lines) {
    if (!line || typeof line.productId !== "string") continue;
    const quantity = Number(line.quantity);
    if (!Number.isFinite(quantity)) continue;
    merged.set(line.productId, (merged.get(line.productId) ?? 0) + quantity);
  }

  const canonical: CanonicalSolutionLine[] = [];
  for (const [productId, rawQuantity] of merged) {
    const input = lines.find((line) => line.productId === productId);
    const product = findProduct(catalog, productId, input?.sku);
    if (!product || product.isContractOnly || !product.isCheckoutEnabled) continue;
    const quantity = Math.min(10000, Math.max(product.minimumQuantity, Math.floor(rawQuantity)));
    const unitPrice = money(product.basePrice);
    const bucket = pricingBucket(product.pricingType);
    canonical.push({
      productId: product.id,
      sku: product.sku,
      name: product.name,
      quantity,
      unitPrice,
      lineTotal: money(unitPrice * quantity),
      pricingType: product.pricingType,
      pricingUnit: product.pricingUnit || "unit",
      bucket,
    });
  }

  const totals: SolutionTotals = {
    dueToday: money(canonical.filter((line) => line.bucket === "dueToday").reduce((sum, line) => sum + line.lineTotal, 0)),
    monthly: money(canonical.filter((line) => line.bucket === "monthly").reduce((sum, line) => sum + line.lineTotal, 0)),
    annual: money(canonical.filter((line) => line.bucket === "annual").reduce((sum, line) => sum + line.lineTotal, 0)),
    oneTime: 0,
    recurringMonthlyEquivalent: 0,
    itemCount: canonical.reduce((sum, line) => sum + line.quantity, 0),
    lineCount: canonical.length,
  };
  totals.oneTime = totals.dueToday;
  totals.recurringMonthlyEquivalent = money(totals.monthly + totals.annual / 12);

  return { lines: canonical, totals };
}
