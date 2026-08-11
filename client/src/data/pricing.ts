/**
 * Canonical ProActive Ecosystem pricing — single source of truth.
 * Homepage, pricing page, store ProActive SKUs, advisor, and industry copy
 * must import from here. Do not hard-code package floors elsewhere.
 */
export const pricing = {
  it: {
    name: "IT",
    fullName: "ProActive IT",
    tier: "Entry",
    monthlyMin: 1600,
    /** @deprecated use monthlyMin — kept for older imports */
    siteMin: 1600,
    user: 125,
    note: "Entry managed IT with baseline security.",
    learnMoreUrl: "/solutions/proactive-it-ecosystem",
  },
  office: {
    name: "Office",
    fullName: "ProActive Office",
    tier: "Foundation",
    monthlyMin: 2400,
    siteMin: 2400,
    user: 165,
    note: "Core protection + productivity tools for small teams.",
    learnMoreUrl: "/solutions/proactive-office-ecosystem",
  },
  business: {
    name: "Business",
    fullName: "ProActive Business",
    tier: "Operations",
    monthlyMin: 5400,
    siteMin: 5400,
    user: 245,
    note: "Adds SOC monitoring, spend-card controls, and vCIO.",
    learnMoreUrl: "/solutions/proactive-business-ecosystem",
  },
  enterprise: {
    name: "Enterprise",
    fullName: "ProActive Enterprise",
    tier: "Compliance",
    monthlyMin: 9000,
    siteMin: 9000,
    user: 345,
    note: "Adds governance and audit readiness.",
    learnMoreUrl: "/solutions/proactive-enterprise-ecosystem",
  },
} as const;

export const pricingTier = [
  pricing.it,
  pricing.office,
  pricing.business,
  pricing.enterprise,
] as const;

export type PricingTierKey = keyof typeof pricing;

export const formatPrice = (amount: number): string => `$${amount.toLocaleString()}`;

export const formatMonthlyMin = (tier: PricingTierKey): string =>
  `${formatPrice(pricing[tier].monthlyMin)}/mo minimum`;

/** @deprecated use formatMonthlyMin */
export const formatSiteMin = (tier: PricingTierKey): string => formatMonthlyMin(tier);

export const formatUserPrice = (tier: PricingTierKey): string =>
  `$${pricing[tier].user}/user/mo`;

/** Estimate = max(users × rate, monthly minimum). Sites multiply minimum when > 1. */
export function estimateMonthly(
  tier: PricingTierKey,
  users: number,
  sites = 1,
): number {
  const t = pricing[tier];
  const safeUsers = Math.max(0, Math.floor(users) || 0);
  const safeSites = Math.max(1, Math.floor(sites) || 1);
  return Math.max(safeUsers * t.user, t.monthlyMin * safeSites);
}

export const getPricingFooterText = (): string =>
  `Monthly minimums: IT ${formatPrice(pricing.it.monthlyMin)}, Office ${formatPrice(pricing.office.monthlyMin)}, Business ${formatPrice(pricing.business.monthlyMin)}, Enterprise ${formatPrice(pricing.enterprise.monthlyMin)}. Final scope confirmed after Cyber Risk Assessment.`;

export const getShortPricingText = (): string =>
  `IT ${formatPrice(pricing.it.monthlyMin)}/mo · Office ${formatPrice(pricing.office.monthlyMin)}/mo · Business ${formatPrice(pricing.business.monthlyMin)}/mo · Enterprise ${formatPrice(pricing.enterprise.monthlyMin)}/mo`;

export const PRICING_SCOPE_NOTE =
  "Final pricing depends on users, endpoints, locations, infrastructure, backup requirements, and security/compliance scope. Estimates are not quotes — your Cyber Risk Assessment confirms final scope.";

export const NO_BLACK_BOX_TAGLINE =
  "No Black-Box IT. You know what you're buying, what you're paying, what's included, and who owns it.";

export type PricingTier =
  | typeof pricing.it
  | typeof pricing.office
  | typeof pricing.business
  | typeof pricing.enterprise;
