/**
 * Merchandising layer for the IT Store — maps real catalog SKUs to
 * outcomes, rails, and soft "included in" hints. Does not invent products.
 */
import {
  storeProducts,
  type ProductCategory,
  type PricingType,
  type StoreProduct,
} from "./storeProducts";

export type StoreOutcomeId =
  | "protect"
  | "modernize"
  | "compliance"
  | "recover"
  | "support_it"
  | "outsource"
  | "secure_remote";

export type MerchandisingRailId =
  | "popular"
  | "microsoft365"
  | "comanaged"
  | "cyber_insurance"
  | "best_value";

export type StoreSortOption = "recommended" | "price_asc" | "price_desc" | "popular";

export interface StoreOutcome {
  id: StoreOutcomeId;
  label: string;
  blurb: string;
  /** Categories that primarily serve this outcome */
  categories: ProductCategory[];
  /** Extra SKUs to always include when filtering by this outcome */
  skuHints: string[];
  /** Search keywords (problems / vendors) that map here */
  keywords: string[];
  accent: string;
}

export interface MerchandisingRail {
  id: MerchandisingRailId;
  title: string;
  subtitle: string;
  skus: string[];
}

/** Soft, substantiable trust claims only — no fake cert badges. */
export const storeTrustClaims = [
  { label: "Arizona-based MSP", detail: "Chandler / East Valley" },
  { label: "Security-first", detail: "MSP / MSSP mindset" },
  { label: "Microsoft-aligned", detail: "M365 & identity patterns" },
  { label: "Audit readiness", detail: "Evidence & control support" },
] as const;

export const storeOutcomes: StoreOutcome[] = [
  {
    id: "protect",
    label: "Protect",
    blurb: "Endpoint, email, and identity defenses",
    categories: ["comanaged_subscriptions", "digital_assessments", "digital_training"],
    skuHints: [
      "DE-SVC-CM-ENDPOINT-EDR-MO",
      "DE-SVC-CM-EMAIL-SEC-MO",
      "DE-DIG-ASMT-QUICK-OT",
      "DE-DIG-ASMT-PHISH-MO",
    ],
    keywords: ["security", "edr", "phishing", "threat", "malware", "ransomware", "firewall"],
    accent: "text-rose-300",
  },
  {
    id: "modernize",
    label: "Modernize",
    blurb: "Cloud phone, network, and provisioning",
    categories: ["ucaas_subscriptions", "ucaas_setup", "networking_managed", "networking_projects", "hardware_provisioning"],
    skuHints: [
      "DE-SVC-UC-SEAT-STD-MO",
      "DE-SVC-NET-MANAGED-CORE-MO",
      "DE-HW-PROV-ENDPOINT-OT",
      "DE-SVC-CM-SAAS-MGMT-MO",
    ],
    keywords: ["microsoft", "m365", "office 365", "teams", "ucaas", "voip", "wifi", "cloud", "saas"],
    accent: "text-sky-300",
  },
  {
    id: "compliance",
    label: "Compliance",
    blurb: "Policies, assessments, and readiness",
    categories: ["digital_templates", "digital_assessments"],
    skuHints: [
      "DE-DIG-TPL-POLICY-CORE-OT",
      "DE-DIG-TPL-POLICY-ADV-OT",
      "DE-DIG-ASMT-CSRA-OT",
      "DE-DIG-TRN-AWARE-BASIC-YR",
    ],
    keywords: ["compliance", "policy", "audit", "hipaa readiness", "soc readiness", "risk assessment"],
    accent: "text-amber-300",
  },
  {
    id: "recover",
    label: "Recover",
    blurb: "Continuity, IR, and cutover support",
    categories: ["digital_templates", "networking_projects", "professional_services"],
    skuHints: [
      "DE-DIG-TPL-BCP-OT",
      "DE-DIG-TPL-IR-RUNBOOK-OT",
      "DE-SVC-NET-CUTOVER-OT",
      "DE-SVC-MGD-BCDR-MO",
    ],
    keywords: ["backup", "disaster", "recovery", "bcdr", "continuity", "incident response", "ir"],
    accent: "text-orange-300",
  },
  {
    id: "support_it",
    label: "Support IT Team",
    blurb: "Helpdesk overflow and consulting",
    categories: ["comanaged_subscriptions", "professional_services", "comanaged_onboarding"],
    skuHints: [
      "DE-SVC-CM-HELPDESK-ASSIST-MO",
      "DE-SVC-BLK-5HR-OT",
      "DE-SVC-BLK-10HR-OT",
      "DE-SVC-CONSULT-SYS-HR",
    ],
    keywords: ["helpdesk", "support", "ticket", "overflow", "vCIO", "consulting", "it team"],
    accent: "text-emerald-300",
  },
  {
    id: "outsource",
    label: "Outsource",
    blurb: "Full managed packages & custom builds",
    categories: ["contract_services", "comanaged_subscriptions"],
    skuHints: [
      "DE-SVC-MGD-OFFICE-MO",
      "DE-SVC-MGD-BUSINESS-MO",
      "DE-SVC-MGD-ENTERPRISE-MO",
      "DE-SVC-COMANAGED-CUSTOM-MO",
    ],
    keywords: ["managed", "outsource", "msp", "proactive", "full service", "ecosystem"],
    accent: "text-violet-300",
  },
  {
    id: "secure_remote",
    label: "Secure Remote",
    blurb: "Identity, endpoints, and remote-ready tooling",
    categories: ["comanaged_subscriptions", "hardware_provisioning", "ucaas_subscriptions"],
    skuHints: [
      "DE-SVC-CM-IDENTITY-CORE-MO",
      "DE-SVC-CM-ENDPOINT-CORE-MO",
      "DE-HW-PROV-ENDPOINT-OT",
      "DE-SVC-UC-SEAT-PRO-MO",
    ],
    keywords: ["remote", "wfh", "hybrid", "sso", "mfa", "identity", "vpn", "laptop"],
    accent: "text-cyan-300",
  },
];

/** Rails use only real catalog SKUs. */
export const merchandisingRails: MerchandisingRail[] = [
  {
    id: "popular",
    title: "Popular",
    subtitle: "Frequently added building blocks",
    skus: [
      "DE-SVC-CM-ENDPOINT-CORE-MO",
      "DE-SVC-CM-ENDPOINT-EDR-MO",
      "DE-SVC-CM-EMAIL-SEC-MO",
      "DE-SVC-CM-IDENTITY-CORE-MO",
      "DE-SVC-CM-HELPDESK-ASSIST-MO",
      "DE-DIG-ASMT-QUICK-OT",
    ],
  },
  {
    id: "microsoft365",
    title: "Recommended for Microsoft 365",
    subtitle: "Identity, email, SaaS, and awareness",
    skus: [
      "DE-SVC-CM-IDENTITY-CORE-MO",
      "DE-SVC-CM-EMAIL-SEC-MO",
      "DE-SVC-CM-SAAS-MGMT-MO",
      "DE-DIG-ASMT-DMARC-OT",
      "DE-DIG-ASMT-PHISH-MO",
      "DE-DIG-TRN-AWARE-PRO-YR",
    ],
  },
  {
    id: "comanaged",
    title: "Co-Managed Essentials",
    subtitle: "Tools that extend an existing IT team",
    skus: [
      "DE-SVC-CM-ENDPOINT-CORE-MO",
      "DE-SVC-CM-SERVER-MON-MO",
      "DE-SVC-CM-HELPDESK-ASSIST-MO",
      "DE-SVC-CM-ONBOARD-S-OT",
      "DE-SVC-CM-DOC-PACK-OT",
      "DE-SVC-CONSULT-VCIO-HR",
    ],
  },
  {
    id: "cyber_insurance",
    title: "Cyber Insurance Essentials",
    subtitle: "Controls insurers commonly ask about",
    skus: [
      "DE-DIG-ASMT-CSRA-OT",
      "DE-SVC-CM-ENDPOINT-EDR-MO",
      "DE-SVC-CM-EMAIL-SEC-MO",
      "DE-DIG-ASMT-PHISH-MO",
      "DE-DIG-TPL-IR-RUNBOOK-OT",
      "DE-DIG-TRN-AWARE-BASIC-YR",
    ],
  },
  {
    id: "best_value",
    title: "Best Value",
    subtitle: "High-leverage packs and starters",
    skus: [
      "DE-DIG-TPL-POLICY-CORE-OT",
      "DE-DIG-ASMT-QUICK-OT",
      "DE-SVC-CM-ONBOARD-S-OT",
      "DE-SVC-BLK-5HR-OT",
      "DE-DIG-TRN-ONBOARD-OT",
      "DE-SVC-UC-SEAT-STD-MO",
    ],
  },
];

/**
 * Soft package inclusion hints — co-managed / digital SKUs that map to
 * capabilities already covered inside ProActive Ecosystem tiers.
 */
export const includedInHints: Record<string, string> = {
  "DE-SVC-CM-ENDPOINT-CORE-MO": "Included in ProActive Ecosystem – Office+",
  "DE-SVC-CM-ENDPOINT-EDR-MO": "Included in ProActive Ecosystem – Business+",
  "DE-SVC-CM-EMAIL-SEC-MO": "Included in ProActive Ecosystem – Business+",
  "DE-SVC-CM-IDENTITY-CORE-MO": "Included in ProActive Ecosystem – Office+",
  "DE-SVC-CM-SAAS-MGMT-MO": "Related to ProActive Ecosystem – Office+",
  "DE-SVC-CM-HELPDESK-ASSIST-MO": "Included in ProActive Ecosystem plans",
  "DE-DIG-TRN-AWARE-BASIC-YR": "Included in ProActive Ecosystem – Business+",
  "DE-DIG-TRN-AWARE-PRO-YR": "Included in ProActive Ecosystem – Enterprise",
  "DE-DIG-TPL-POLICY-CORE-OT": "Related to ProActive Ecosystem – Business compliance foundations",
};

/** Popularity rank for sort (lower = more popular). Unknown SKUs sort last. */
export const popularSkuRank: Record<string, number> = Object.fromEntries(
  merchandisingRails
    .find((r) => r.id === "popular")!
    .skus.map((sku, i) => [sku, i + 1])
    .concat(
      merchandisingRails
        .find((r) => r.id === "cyber_insurance")!
        .skus.map((sku, i) => [sku, i + 20])
    )
);

export const billingTypeLabels: Partial<Record<PricingType, string>> = {
  one_time: "One-time",
  monthly: "Monthly",
  yearly: "Yearly",
  per_hour: "Hourly",
  per_user: "Per user",
  per_endpoint: "Per endpoint",
  per_device: "Per device",
  per_location: "Per location",
  per_seat: "Per seat",
};

export function getProductBySku(sku: string): StoreProduct | undefined {
  return storeProducts.find((p) => p.sku === sku);
}

export function getProductsForRail(railId: MerchandisingRailId): StoreProduct[] {
  const rail = merchandisingRails.find((r) => r.id === railId);
  if (!rail) return [];
  return rail.skus
    .map((sku) => getProductBySku(sku))
    .filter((p): p is StoreProduct => !!p);
}

export function productMatchesOutcome(product: StoreProduct, outcomeId: StoreOutcomeId): boolean {
  const outcome = storeOutcomes.find((o) => o.id === outcomeId);
  if (!outcome) return false;
  if (outcome.skuHints.includes(product.sku)) return true;
  if (outcome.categories.includes(product.category)) return true;
  const haystack = `${product.name} ${product.shortDescription} ${product.description} ${product.features.join(" ")}`.toLowerCase();
  return outcome.keywords.some((kw) => haystack.includes(kw.toLowerCase()));
}

export function searchProducts(products: StoreProduct[], query: string): StoreProduct[] {
  const q = query.trim().toLowerCase();
  if (!q) return products;

  const outcomeHits = new Set(
    storeOutcomes
      .filter((o) =>
        o.label.toLowerCase().includes(q) ||
        o.blurb.toLowerCase().includes(q) ||
        o.keywords.some((kw) => kw.includes(q) || q.includes(kw))
      )
      .map((o) => o.id)
  );

  return products.filter((p) => {
    const blob = [
      p.name,
      p.sku,
      p.shortDescription,
      p.description,
      p.features.join(" "),
      p.category,
    ]
      .join(" ")
      .toLowerCase();

    if (blob.includes(q)) return true;
    if (Array.from(outcomeHits).some((id) => productMatchesOutcome(p, id))) return true;
    // Vendor / problem shorthand
    if (q.includes("microsoft") || q.includes("m365") || q.includes("365")) {
      return (
        blob.includes("identity") ||
        blob.includes("email") ||
        blob.includes("saas") ||
        blob.includes("mfa") ||
        blob.includes("sso") ||
        blob.includes("phishing") ||
        blob.includes("dmarc")
      );
    }
    return false;
  });
}

export function sortProducts(products: StoreProduct[], sort: StoreSortOption): StoreProduct[] {
  const sorted = [...products];
  switch (sort) {
    case "price_asc":
      return sorted.sort((a, b) => a.basePrice - b.basePrice || a.sortOrder - b.sortOrder);
    case "price_desc":
      return sorted.sort((a, b) => b.basePrice - a.basePrice || a.sortOrder - b.sortOrder);
    case "popular":
      return sorted.sort((a, b) => {
        const ra = popularSkuRank[a.sku] ?? 999;
        const rb = popularSkuRank[b.sku] ?? 999;
        return ra - rb || a.sortOrder - b.sortOrder;
      });
    case "recommended":
    default:
      return sorted.sort((a, b) => a.sortOrder - b.sortOrder);
  }
}

export function getIncludedInHint(sku: string): string | undefined {
  return includedInHints[sku];
}

/** Lightweight static bundles from real SKUs (display-only; no special pricing). */
export const storeBundles = [
  {
    id: "bundle-secure-basics",
    title: "Secure Basics",
    blurb: "Endpoint + email + identity starting point for co-managed teams.",
    skus: [
      "DE-SVC-CM-ENDPOINT-CORE-MO",
      "DE-SVC-CM-ENDPOINT-EDR-MO",
      "DE-SVC-CM-EMAIL-SEC-MO",
      "DE-SVC-CM-IDENTITY-CORE-MO",
    ],
  },
  {
    id: "bundle-insurance-ready",
    title: "Insurance-Ready Starter",
    blurb: "Assessment, EDR, phishing, and IR documentation commonly requested by underwriters.",
    skus: [
      "DE-DIG-ASMT-CSRA-OT",
      "DE-SVC-CM-ENDPOINT-EDR-MO",
      "DE-DIG-ASMT-PHISH-MO",
      "DE-DIG-TPL-IR-RUNBOOK-OT",
    ],
  },
] as const;
