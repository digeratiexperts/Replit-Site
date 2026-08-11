/**
 * Merchandising layer for the IT Store — maps real catalog SKUs to
 * outcomes, rails, and soft "included in" hints. Does not invent products.
 */
import {
  storeProducts,
  categoryLabels,
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

/** Outcome-first lead copy for cards — buyer understands before the stack. */
export const outcomeLeads: Record<string, string> = {
  "DE-SVC-CM-ENDPOINT-CORE-MO":
    "Protect employee computers with managed endpoint baseline coverage for your IT team.",
  "DE-SVC-CM-ENDPOINT-EDR-MO":
    "Protect every employee computer from ransomware and modern endpoint attacks.",
  "DE-SVC-CM-EMAIL-SEC-MO":
    "Stop phishing and mailbox compromises before they become business incidents.",
  "DE-SVC-CM-IDENTITY-CORE-MO":
    "Harden sign-ins with managed identity, MFA, and access controls.",
  "DE-SVC-CM-SAAS-MGMT-MO":
    "Keep Microsoft 365 and SaaS apps governed, patched, and supportable.",
  "DE-SVC-CM-HELPDESK-ASSIST-MO":
    "Give your IT team overflow helpdesk capacity without hiring full-time.",
  "DE-SVC-CM-SERVER-MON-MO":
    "Monitor servers and catch failures before users feel the outage.",
  "DE-SVC-UC-SEAT-STD-MO":
    "Modernize phone service with cloud seats your team can actually use.",
  "DE-SVC-UC-SEAT-PRO-MO":
    "Upgrade communications with advanced cloud phone features and support.",
  "DE-SVC-NET-MANAGED-CORE-MO":
    "Keep sites online with managed network monitoring and change control.",
  "DE-DIG-ASMT-QUICK-OT":
    "Get a fast, practical read on identity, endpoint, email, and backup gaps.",
  "DE-DIG-ASMT-CSRA-OT":
    "Document cyber risk in language insurers and auditors understand.",
  "DE-DIG-ASMT-PHISH-MO":
    "Measure phishing susceptibility and train people where risk is highest.",
  "DE-DIG-TRN-AWARE-BASIC-YR":
    "Build security habits across the company with recurring awareness training.",
  "DE-DIG-TPL-POLICY-CORE-OT":
    "Stand up core IT/security policies without starting from a blank page.",
  "DE-DIG-TPL-IR-RUNBOOK-OT":
    "Know who does what when an incident hits — before you need it.",
  "DE-DIG-TPL-BCP-OT":
    "Define how the business continues when systems or sites are disrupted.",
  "DE-SVC-MGD-BCDR-MO":
    "Protect critical data and shorten recovery when something fails.",
};

export function getOutcomeLead(product: StoreProduct): string {
  return outcomeLeads[product.sku] || product.shortDescription || product.description;
}

/** Soft discovery tags for cards (not rainbow category paint). */
export const productTags: Record<string, string[]> = {
  "DE-SVC-CM-ENDPOINT-CORE-MO": ["Endpoint", "Co-Managed", "Security"],
  "DE-SVC-CM-ENDPOINT-EDR-MO": ["Endpoint", "EDR", "Security"],
  "DE-SVC-CM-EMAIL-SEC-MO": ["Email", "Security", "M365"],
  "DE-SVC-CM-IDENTITY-CORE-MO": ["Identity", "MFA", "Access"],
  "DE-SVC-CM-SAAS-MGMT-MO": ["Microsoft 365", "SaaS", "Governance"],
  "DE-SVC-CM-HELPDESK-ASSIST-MO": ["Helpdesk", "Co-Managed", "Support"],
  "DE-SVC-UC-SEAT-STD-MO": ["UCaaS", "Communications"],
  "DE-SVC-UC-SEAT-PRO-MO": ["UCaaS", "Communications"],
  "DE-SVC-NET-MANAGED-CORE-MO": ["Network", "Managed"],
  "DE-DIG-ASMT-QUICK-OT": ["Assessment", "Security"],
  "DE-DIG-ASMT-CSRA-OT": ["Assessment", "Insurance", "Compliance"],
  "DE-DIG-ASMT-PHISH-MO": ["Phishing", "Training"],
  "DE-DIG-TRN-AWARE-BASIC-YR": ["Training", "Awareness"],
  "DE-DIG-TPL-POLICY-CORE-OT": ["Compliance", "Policies"],
  "DE-DIG-TPL-IR-RUNBOOK-OT": ["Incident Response", "Continuity"],
};

export function getProductTags(product: StoreProduct): string[] {
  if (productTags[product.sku]) return productTags[product.sku];
  const tags: string[] = [categoryLabels[product.category]];
  if (product.pricingType.includes("user") || product.pricingUnit === "user") tags.push("Per user");
  if (product.pricingType.includes("endpoint") || product.pricingUnit === "endpoint") tags.push("Per endpoint");
  if (["monthly", "yearly", "per_user", "per_endpoint", "per_seat", "per_location"].includes(product.pricingType)) {
    tags.push("Recurring");
  } else if (product.pricingType === "one_time") {
    tags.push("One-time");
  }
  return tags.slice(0, 3);
}

export interface ProductRelationship {
  worksWith?: string[];
  required?: string[];
  includedIn?: string;
  upgradeTo?: string[];
}

/** Product relationships from real catalog SKUs only. */
export const productRelationships: Record<string, ProductRelationship> = {
  "DE-SVC-CM-ENDPOINT-CORE-MO": {
    worksWith: ["DE-SVC-CM-ENDPOINT-EDR-MO", "DE-SVC-CM-IDENTITY-CORE-MO", "DE-SVC-CM-EMAIL-SEC-MO"],
    includedIn: "ProActive Ecosystem – Office+",
    upgradeTo: ["DE-SVC-CM-ENDPOINT-EDR-MO"],
  },
  "DE-SVC-CM-ENDPOINT-EDR-MO": {
    worksWith: ["DE-SVC-CM-EMAIL-SEC-MO", "DE-SVC-CM-IDENTITY-CORE-MO", "DE-DIG-TRN-AWARE-BASIC-YR"],
    includedIn: "ProActive Ecosystem – Business+",
  },
  "DE-SVC-CM-EMAIL-SEC-MO": {
    worksWith: ["DE-SVC-CM-IDENTITY-CORE-MO", "DE-DIG-ASMT-PHISH-MO", "DE-DIG-ASMT-DMARC-OT"],
    includedIn: "ProActive Ecosystem – Business+",
  },
  "DE-SVC-CM-IDENTITY-CORE-MO": {
    worksWith: ["DE-SVC-CM-EMAIL-SEC-MO", "DE-SVC-CM-SAAS-MGMT-MO", "DE-SVC-CM-ENDPOINT-CORE-MO"],
    includedIn: "ProActive Ecosystem – Office+",
  },
  "DE-DIG-ASMT-CSRA-OT": {
    worksWith: ["DE-SVC-CM-ENDPOINT-EDR-MO", "DE-DIG-TPL-IR-RUNBOOK-OT", "DE-DIG-ASMT-PHISH-MO"],
  },
  "DE-SVC-UC-SEAT-STD-MO": {
    worksWith: ["DE-SVC-UC-SEAT-PRO-MO"],
    upgradeTo: ["DE-SVC-UC-SEAT-PRO-MO"],
  },
};

export function getProductRelationships(sku: string): ProductRelationship | undefined {
  return productRelationships[sku];
}

const CONFIGURABLE_PRICING: PricingType[] = [
  "per_endpoint",
  "per_user",
  "per_device",
  "per_seat",
  "per_location",
];

/** Qty/unit configurable before blind Add — unit-priced catalog SKUs. */
export function isConfigurableProduct(product: StoreProduct): boolean {
  if (product.isContractOnly || !product.isCheckoutEnabled) return false;
  return CONFIGURABLE_PRICING.includes(product.pricingType) || !!product.pricingUnit;
}

export function configUnitLabel(product: StoreProduct): string {
  if (product.pricingUnit) return product.pricingUnit;
  switch (product.pricingType) {
    case "per_endpoint":
      return "endpoints";
    case "per_user":
      return "users";
    case "per_device":
      return "devices";
    case "per_seat":
      return "seats";
    case "per_location":
      return "locations";
    default:
      return "units";
  }
}

export type CoverageDimension =
  | "endpoint"
  | "identity"
  | "email"
  | "backup"
  | "network"
  | "compliance";

export const coverageDimensions: {
  id: CoverageDimension;
  label: string;
  match: (p: StoreProduct) => boolean;
  improveSku: string;
}[] = [
  {
    id: "endpoint",
    label: "Endpoint",
    match: (p) =>
      /endpoint|edr|device/i.test(`${p.name} ${p.sku} ${p.shortDescription}`) ||
      p.pricingType === "per_endpoint",
    improveSku: "DE-SVC-CM-ENDPOINT-EDR-MO",
  },
  {
    id: "identity",
    label: "Identity",
    match: (p) => /identity|mfa|sso|access/i.test(`${p.name} ${p.sku} ${p.shortDescription}`),
    improveSku: "DE-SVC-CM-IDENTITY-CORE-MO",
  },
  {
    id: "email",
    label: "Email",
    match: (p) => /email|phish|dmarc|mailbox/i.test(`${p.name} ${p.sku} ${p.shortDescription}`),
    improveSku: "DE-SVC-CM-EMAIL-SEC-MO",
  },
  {
    id: "backup",
    label: "Backup",
    match: (p) =>
      /backup|bcdr|disaster|continuity|recover/i.test(`${p.name} ${p.sku} ${p.shortDescription}`),
    improveSku: "DE-SVC-MGD-BCDR-MO",
  },
  {
    id: "network",
    label: "Network",
    match: (p) =>
      p.category.startsWith("networking") ||
      /network|firewall|wifi|sase/i.test(`${p.name} ${p.sku}`),
    improveSku: "DE-SVC-NET-MANAGED-CORE-MO",
  },
  {
    id: "compliance",
    label: "Compliance",
    match: (p) =>
      p.category === "digital_assessments" ||
      p.category === "digital_templates" ||
      p.category === "digital_training" ||
      /compliance|policy|hipaa|audit|assessment/i.test(`${p.name} ${p.sku}`),
    improveSku: "DE-DIG-ASMT-CSRA-OT",
  },
];

export interface CoverageScore {
  total: number;
  max: number;
  bars: { id: CoverageDimension; label: string; covered: boolean; improveSku: string }[];
  suggestions: { sku: string; product?: StoreProduct; from: number; to: number }[];
}

/** Heuristic cart coverage — category presence, not a fake security audit. */
export function computeCoverageScore(products: StoreProduct[]): CoverageScore {
  const bars = coverageDimensions.map((d) => ({
    id: d.id,
    label: d.label,
    covered: products.some((p) => d.match(p)),
    improveSku: d.improveSku,
  }));
  const coveredCount = bars.filter((b) => b.covered).length;
  const max = bars.length;
  const total = Math.round((coveredCount / max) * 100);
  const suggestions = bars
    .filter((b) => !b.covered)
    .map((b) => {
      const product = getProductBySku(b.improveSku);
      const nextCovered = coveredCount + 1;
      return {
        sku: b.improveSku,
        product,
        from: total,
        to: Math.round((nextCovered / max) * 100),
      };
    })
    .filter((s) => !!s.product)
    .slice(0, 3);

  return { total, max: 100, bars, suggestions };
}

/** Solution cart grouping labels. */
export function solutionGroupFor(product: StoreProduct): string {
  if (
    /security|endpoint|edr|email|identity|phish|mdr|threat/i.test(
      `${product.name} ${product.category}`
    ) ||
    product.category === "digital_assessments" ||
    product.category === "digital_training"
  ) {
    return "Security";
  }
  if (
    /backup|bcdr|continuity|disaster|recover|ir-runbook|bcp/i.test(
      `${product.name} ${product.sku}`
    )
  ) {
    return "Continuity";
  }
  if (product.category.startsWith("networking") || product.category.startsWith("ucaas")) {
    return "Communications & Network";
  }
  if (product.category.startsWith("hardware")) {
    return "Hardware & Provisioning";
  }
  if (product.category === "professional_services" || product.category === "comanaged_onboarding") {
    return "Services & Onboarding";
  }
  if (product.category === "digital_templates") {
    return "Compliance & Docs";
  }
  return categoryLabels[product.category];
}

/** Lightweight static bundles from real SKUs (display-only; no invented discounts). */
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
  {
    id: "bundle-secure-m365",
    title: "Secure Microsoft 365",
    blurb: "Identity, email, SaaS governance, and awareness for M365 tenants.",
    skus: [
      "DE-SVC-CM-IDENTITY-CORE-MO",
      "DE-SVC-CM-EMAIL-SEC-MO",
      "DE-SVC-CM-SAAS-MGMT-MO",
      "DE-DIG-TRN-AWARE-BASIC-YR",
    ],
  },
] as const;
