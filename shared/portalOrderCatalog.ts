/**
 * Portal Service Order Form catalog — mapped to Intelligence-Hub (TechSales)
 * exclusivity / SKU rules.
 *
 * Hub source (do not rename that repo):
 *   lib/db/src/utils/pricing-catalog.ts  — one selected ProActive tier
 *   lib/db/src/utils/sku-catalog.ts      — MSP-* package SKUs + OT-ASSESSMENT
 *   lib/db/src/utils/sku-conflicts.ts    — one package family; no stacked tiers
 *
 * Website store SKUs stay the public catalog ids. Hub SKUs are recorded so
 * the same combination rules apply on both sides.
 *
 * Assumptions (stricter Hub reading, flagged for DE):
 * - Exactly one ProActive ecosystem package per order (IT / Office / Business /
 *   Enterprise). Security Stack / Core IT / BCDR "tiers" in the old portal
 *   picker are package components, not separately stackable exclusive packages.
 * - CSRA (store DE-DIG-ASMT-CSRA-OT / Hub OT-ASSESSMENT) is $2,500 one-time.
 *   It may stand alone or sit with that single package. Do not auto-credit
 *   the assessment toward a later ProActive agreement.
 * - Contract-only ProActive lines are never a payable checkout total.
 */

import { pricing, type ProActiveTierKey } from "../client/src/data/pricing";
import { getStoreProductBySku } from "../client/src/data/storeCatalog";

export type PortalOrderCheckoutMode = "catalog_price" | "quote_after_review";
export type PortalOrderExclusiveGroup = "proactive_ecosystem";

export type PortalOrderCatalogItem = {
  id: string;
  sku: string;
  hubSku: string;
  name: string;
  shortName: string;
  description: string;
  exclusiveGroup: PortalOrderExclusiveGroup | null;
  checkoutMode: PortalOrderCheckoutMode;
  selectable: boolean;
  documentKey: string;
  minQuantity: number;
  maxQuantity: number;
  tier?: ProActiveTierKey;
  features: readonly string[];
};

export type PortalOrderLineInput = {
  serviceId?: unknown;
  sku?: unknown;
  quantity?: unknown;
};

export type CanonicalPortalOrderLine = {
  id: string;
  sku: string;
  hubSku: string;
  name: string;
  quantity: number;
  exclusiveGroup: PortalOrderExclusiveGroup | null;
  checkoutMode: PortalOrderCheckoutMode;
  /** Catalog list price when checkoutMode is catalog_price; otherwise 0. */
  unitPrice: number;
  lineTotal: number;
  pricedAfterReview: boolean;
};

export type PortalOrderValidationOk = {
  ok: true;
  lines: CanonicalPortalOrderLine[];
  payableCheckout: boolean;
  oneTimeTotal: number;
  monthlyTotal: number;
  hasQuoteItems: boolean;
};

export type PortalOrderValidationError = {
  ok: false;
  code: "empty" | "unknown_sku" | "exclusive_conflict" | "duplicate_sku" | "invalid_quantity";
  error: string;
};

export type PortalOrderValidation = PortalOrderValidationOk | PortalOrderValidationError;

const PROACTIVE_MAP: Record<
  ProActiveTierKey,
  { id: string; sku: string; hubSku: string; shortName: string; documentKey: string }
> = {
  it: {
    id: "proactive-it",
    sku: "DE-SVC-MGD-IT-MO",
    hubSku: "MSP-IT-USER",
    shortName: "ProActive IT",
    documentKey: "de-proactive-it-ecosystem",
  },
  office: {
    id: "proactive-office",
    sku: "DE-SVC-MGD-OFFICE-MO",
    hubSku: "MSP-OFFICE-USER",
    shortName: "ProActive Office",
    documentKey: "de-proactive-office-ecosystem",
  },
  business: {
    id: "proactive-business",
    sku: "DE-SVC-MGD-BUSINESS-MO",
    hubSku: "MSP-BUSINESS-USER",
    shortName: "ProActive Business",
    documentKey: "de-proactive-business-ecosystem",
  },
  enterprise: {
    id: "proactive-enterprise",
    sku: "DE-SVC-MGD-ENTERPRISE-MO",
    hubSku: "MSP-ENTERPRISE-USER",
    shortName: "ProActive Enterprise",
    documentKey: "de-proactive-enterprise-ecosystem",
  },
};

function proactiveItem(tier: ProActiveTierKey): PortalOrderCatalogItem {
  const map = PROACTIVE_MAP[tier];
  const published = pricing[tier];
  return {
    id: map.id,
    sku: map.sku,
    hubSku: map.hubSku,
    name: `ProActive Ecosystem — ${published.name}`,
    shortName: map.shortName,
    description: published.note,
    exclusiveGroup: "proactive_ecosystem",
    checkoutMode: "quote_after_review",
    selectable: true,
    documentKey: map.documentKey,
    minQuantity: 1,
    maxQuantity: 1,
    tier,
    features: published.inclusions,
  };
}

/** Legacy portal picker ids. Accepted only so the server can reject stacking. */
const LEGACY_ECOSYSTEM_ALIASES: Array<{ id: string; sku: string; hubSku: string; name: string }> = [
  { id: "core-it-office", sku: "DE-SVC-MGD-OFFICE-MO", hubSku: "MSP-OFFICE-USER", name: "Core IT Office" },
  { id: "core-it-business", sku: "DE-SVC-MGD-BUSINESS-MO", hubSku: "MSP-BUSINESS-USER", name: "Core IT Business" },
  { id: "core-it-enterprise", sku: "DE-SVC-MGD-ENTERPRISE-MO", hubSku: "MSP-ENTERPRISE-USER", name: "Core IT Enterprise" },
  { id: "security-stack-office", sku: "DE-SVC-MGD-OFFICE-MO", hubSku: "MSP-OFFICE-USER", name: "Security Office" },
  { id: "security-stack-business", sku: "DE-SVC-MGD-BUSINESS-MO", hubSku: "MSP-BUSINESS-USER", name: "Security Business" },
  { id: "security-stack-enterprise", sku: "DE-SVC-MGD-ENTERPRISE-MO", hubSku: "MSP-ENTERPRISE-USER", name: "Security Enterprise" },
  { id: "bcdr-office", sku: "DE-SVC-MGD-OFFICE-MO", hubSku: "MSP-OFFICE-USER", name: "BCDR Office" },
  { id: "bcdr-business", sku: "DE-SVC-MGD-BUSINESS-MO", hubSku: "MSP-BUSINESS-USER", name: "BCDR Business" },
  { id: "bcdr-enterprise", sku: "DE-SVC-MGD-ENTERPRISE-MO", hubSku: "MSP-ENTERPRISE-USER", name: "BCDR Enterprise" },
];

export const CSRA_PORTAL_ITEM: PortalOrderCatalogItem = {
  id: "csra-assessment",
  sku: "DE-DIG-ASMT-CSRA-OT",
  hubSku: "OT-ASSESSMENT",
  name: "Cybersecurity Risk Assessment",
  shortName: "CSRA",
  description: "Guided cybersecurity risk assessment. Hub treats this as a one-time assessment that can accompany a single ProActive package.",
  exclusiveGroup: null,
  checkoutMode: "catalog_price",
  selectable: true,
  documentKey: "csra-ultimate-cybersecurity-risk-assessment",
  minQuantity: 1,
  maxQuantity: 1,
  features: ["Expert-led workshop", "Comprehensive analysis", "Executive report", "Roadmap"],
};

const SELECTABLE_PROACTIVE = (["it", "office", "business", "enterprise"] as const).map(proactiveItem);

const LEGACY_ITEMS: PortalOrderCatalogItem[] = LEGACY_ECOSYSTEM_ALIASES.map((alias) => ({
  id: alias.id,
  sku: alias.sku,
  hubSku: alias.hubSku,
  name: alias.name,
  shortName: alias.name,
  description: "Legacy portal line — maps to a ProActive ecosystem package, not a separately stackable SKU.",
  exclusiveGroup: "proactive_ecosystem",
  checkoutMode: "quote_after_review",
  selectable: false,
  documentKey: "de-proactive-ecosystem",
  minQuantity: 1,
  maxQuantity: 1,
  features: [],
}));

export const PORTAL_ORDER_CATALOG: PortalOrderCatalogItem[] = [
  CSRA_PORTAL_ITEM,
  ...SELECTABLE_PROACTIVE,
  ...LEGACY_ITEMS,
];

export const PORTAL_ORDER_SELECTABLE: PortalOrderCatalogItem[] = PORTAL_ORDER_CATALOG.filter(
  (item) => item.selectable,
);

const byId = new Map(PORTAL_ORDER_CATALOG.map((item) => [item.id, item]));
const selectableBySku = new Map(
  PORTAL_ORDER_SELECTABLE.map((item) => [item.sku, item]),
);

export function getPortalOrderItem(idOrSku: string): PortalOrderCatalogItem | undefined {
  return byId.get(idOrSku) || selectableBySku.get(idOrSku);
}

export function catalogUnitPrice(item: PortalOrderCatalogItem): number {
  if (item.checkoutMode !== "catalog_price") return 0;
  const store = getStoreProductBySku(item.sku);
  if (!store || !store.isCheckoutEnabled || store.isContractOnly) return 0;
  const price = Number(store.basePrice);
  return Number.isFinite(price) && price > 0 ? price : 0;
}

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function resolveItem(raw: PortalOrderLineInput): PortalOrderCatalogItem | undefined {
  const serviceId = asTrimmedString(raw.serviceId);
  const sku = asTrimmedString(raw.sku);
  if (serviceId) {
    const byService = byId.get(serviceId);
    if (byService) return byService;
  }
  if (sku) {
    const bySku = byId.get(sku) || selectableBySku.get(sku);
    if (bySku) return bySku;
  }
  return undefined;
}

/**
 * Server-authoritative validation. Client-supplied prices are ignored.
 */
export function validatePortalOrderSelection(rawLines: unknown): PortalOrderValidation {
  if (!Array.isArray(rawLines) || rawLines.length === 0) {
    return { ok: false, code: "empty", error: "Select at least one catalog service." };
  }
  if (rawLines.length > 20) {
    return { ok: false, code: "invalid_quantity", error: "Too many line items." };
  }

  const lines: CanonicalPortalOrderLine[] = [];
  const seenIds = new Set<string>();
  const seenSkus = new Set<string>();
  const exclusiveHits = new Map<PortalOrderExclusiveGroup, string[]>();

  for (const raw of rawLines) {
    if (!raw || typeof raw !== "object") {
      return { ok: false, code: "unknown_sku", error: "Unknown catalog SKU." };
    }
    const input = raw as PortalOrderLineInput;
    const requested = asTrimmedString(input.serviceId) || asTrimmedString(input.sku);
    const item = resolveItem(input);
    if (!item) {
      return {
        ok: false,
        code: "unknown_sku",
        error: `Unknown catalog SKU: ${requested || "missing"}`,
      };
    }

    const quantity = input.quantity === undefined || input.quantity === null ? item.minQuantity : Number(input.quantity);
    if (!Number.isSafeInteger(quantity) || quantity < item.minQuantity || quantity > item.maxQuantity) {
      return {
        ok: false,
        code: "invalid_quantity",
        error: `Invalid quantity for ${item.sku}.`,
      };
    }

    if (seenIds.has(item.id) || seenSkus.has(item.sku)) {
      return {
        ok: false,
        code: "duplicate_sku",
        error: `Duplicate catalog line: ${item.sku}.`,
      };
    }
    seenIds.add(item.id);
    seenSkus.add(item.sku);

    if (item.exclusiveGroup) {
      const existing = exclusiveHits.get(item.exclusiveGroup) ?? [];
      existing.push(item.shortName);
      exclusiveHits.set(item.exclusiveGroup, existing);
    }

    const unitPrice = catalogUnitPrice(item);
    const pricedAfterReview = item.checkoutMode === "quote_after_review" || unitPrice <= 0;
    lines.push({
      id: item.id,
      sku: item.sku,
      hubSku: item.hubSku,
      name: item.name,
      quantity,
      exclusiveGroup: item.exclusiveGroup,
      checkoutMode: pricedAfterReview ? "quote_after_review" : item.checkoutMode,
      unitPrice: pricedAfterReview ? 0 : unitPrice,
      lineTotal: pricedAfterReview ? 0 : unitPrice * quantity,
      pricedAfterReview,
    });
  }

  for (const [group, names] of exclusiveHits) {
    if (names.length > 1) {
      return {
        ok: false,
        code: "exclusive_conflict",
        error:
          group === "proactive_ecosystem"
            ? `Only one ProActive ecosystem package can be on an order. Remove extras: ${names.join(", ")}.`
            : `Incompatible exclusive items: ${names.join(", ")}.`,
      };
    }
  }

  const hasQuoteItems = lines.some((line) => line.pricedAfterReview);
  const oneTimeTotal = lines.reduce((sum, line) => sum + (line.pricedAfterReview ? 0 : line.lineTotal), 0);
  // Mixed CSRA + ProActive is not a payable checkout: the package is still
  // quote-after-review. Do not treat the $2,500 as a credit against the package.
  const payableCheckout = !hasQuoteItems && oneTimeTotal > 0;

  return {
    ok: true,
    lines,
    payableCheckout,
    oneTimeTotal: payableCheckout ? oneTimeTotal : 0,
    monthlyTotal: 0,
    hasQuoteItems,
  };
}

export function portalOrderDocumentKeys(serviceIds: string[]): string[] {
  const keys = new Set<string>();
  for (const id of serviceIds) {
    const item = getPortalOrderItem(id);
    if (item) keys.add(item.documentKey);
  }
  return Array.from(keys);
}
