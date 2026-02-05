export const pricing = {
  office: {
    name: "Office",
    tier: "Foundation",
    siteMin: 750,
    user: 165,
    note: "Core protection + productivity tools for small teams.",
    learnMoreUrl: "/solutions/office",
  },
  business: {
    name: "Business",
    tier: "Operations",
    siteMin: 1200,
    user: 245,
    note: "Adds SOC monitoring, HR workflows, and vCIO.",
    learnMoreUrl: "/solutions/security-operations",
  },
  enterprise: {
    name: "Enterprise",
    tier: "Compliance",
    siteMin: 1725,
    user: 345,
    note: "Adds governance and audit readiness.",
    learnMoreUrl: "/solutions/compliance-reports",
  },
} as const;

export const pricingTiers = [pricing.office, pricing.business, pricing.enterprise];

export const formatPrice = (amount: number): string => `$${amount.toLocaleString()}`;

export const formatSiteMin = (tier: keyof typeof pricing): string => 
  `$${pricing[tier].siteMin.toLocaleString()}/site/mo minimum`;

export const formatUserPrice = (tier: keyof typeof pricing): string => 
  `$${pricing[tier].user}/user/mo`;

export const getPricingFooterText = (): string => 
  `Minimum billing: Office $${pricing.office.siteMin}/site/mo, Business $${pricing.business.siteMin.toLocaleString()}/site/mo, Enterprise $${pricing.enterprise.siteMin.toLocaleString()}/site/mo`;

export const getShortPricingText = (): string =>
  `Office $${pricing.office.siteMin}/mo, Business $${pricing.business.siteMin.toLocaleString()}/mo, Enterprise $${pricing.enterprise.siteMin.toLocaleString()}/mo`;

export type PricingTier = typeof pricing.office | typeof pricing.business | typeof pricing.enterprise;
export type PricingTierKey = keyof typeof pricing;
