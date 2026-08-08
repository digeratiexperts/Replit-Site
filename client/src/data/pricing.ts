/**
 * CANONICAL public commercial pricing for ProActive Ecosystem packages.
 *
 * Source of truth alignment: Intelligence-Hub `lib/db/src/utils/pricing-catalog.ts`
 * CANONICAL_TIERS (IT/Office/Business/Enterprise monthly floors and per-user rates).
 *
 * Public marketing surfaces MUST import from this module. Do not hardcode
 * per-user rates or monthly minimums elsewhere.
 *
 * GCCH tiers exist in TechSales but are not published on the public site.
 */

export type ProActiveTierKey = "it" | "office" | "business" | "enterprise";

export type ProActiveTier = {
  id: ProActiveTierKey;
  /** Short marketing name */
  name: string;
  /** Full product name */
  label: string;
  /** Published per-user / month starting rate */
  user: number;
  /** Monthly recurring revenue floor (greater of seat×rate or this minimum) */
  monthlyMinimum: number;
  /** @deprecated alias of monthlyMinimum — kept for gradual migration */
  siteMin: number;
  /** Ideal buyer (short) */
  idealBuyer: string;
  note: string;
  learnMoreUrl: string;
  /** Highlight as recommended for typical SMB */
  recommended?: boolean;
  /** Meaningful inclusions for comparison cards */
  inclusions: readonly string[];
};

const tiers = {
  it: {
    id: "it" as const,
    name: "IT",
    label: "ProActive IT",
    user: 125,
    monthlyMinimum: 1600,
    siteMin: 1600,
    idealBuyer: "Small teams needing accountable day-to-day IT and baseline security",
    note: "Entry managed IT with foundational identity, endpoint, and help-desk coverage.",
    learnMoreUrl: "/solutions/proactive-it-ecosystem",
    inclusions: [
      "Service desk & issue ownership",
      "Endpoint protection foundation",
      "Identity & MFA guidance",
      "Documented environment basics",
      "Clear upgrade path into Office",
    ],
  },
  office: {
    id: "office" as const,
    name: "Office",
    label: "ProActive Office",
    user: 165,
    monthlyMinimum: 2400,
    siteMin: 2400,
    idealBuyer: "Typical Arizona SMB that wants dependable IT + stronger protection",
    note: "Recommended core package — managed IT, network, and stronger identity/email controls.",
    learnMoreUrl: "/solutions/proactive-office-ecosystem",
    recommended: true,
    inclusions: [
      "Everything meaningful in IT, plus",
      "Managed network & connectivity",
      "Stronger MFA / SSO / password hygiene",
      "Advanced email anti-phishing",
      "Endpoint backup",
      "Annual technology + cyber review",
    ],
  },
  business: {
    id: "business" as const,
    name: "Business",
    label: "ProActive Business",
    user: 245,
    monthlyMinimum: 5400,
    siteMin: 5400,
    idealBuyer: "Organizations where downtime or a breach would be a leadership-level event",
    note: "Security-first operating model with monitoring, training, BCDR, and business reviews.",
    learnMoreUrl: "/solutions/proactive-business-ecosystem",
    inclusions: [
      "Everything in Office, plus",
      "Security operations / threat detection",
      "Security awareness training",
      "Backup & disaster recovery posture",
      "Compliance / risk reporting support",
      "Semi-annual technology + security reviews",
    ],
  },
  enterprise: {
    id: "enterprise" as const,
    name: "Enterprise",
    label: "ProActive Enterprise",
    user: 345,
    monthlyMinimum: 9000,
    siteMin: 9000,
    idealBuyer: "Regulated or complex environments needing board-ready security governance",
    note: "Governance-grade managed security with executive reporting and advanced controls.",
    learnMoreUrl: "/solutions/proactive-enterprise-ecosystem",
    inclusions: [
      "Everything in Business, plus",
      "Unified security posture reporting",
      "Advanced compliance / risk reporting",
      "Custom BCDR architecture support",
      "Privileged access program elements",
      "Quarterly executive reviews",
    ],
  },
} satisfies Record<ProActiveTierKey, ProActiveTier>;

export const pricing = tiers;

/** All four public ProActive tiers in display order */
export const pricingTiers: readonly ProActiveTier[] = [
  pricing.it,
  pricing.office,
  pricing.business,
  pricing.enterprise,
];

/** TechSales catalog alignment constants (for tests / drift detection) */
export const TECHSALES_ALIGNED = {
  source: "Intelligence-Hub/lib/db/src/utils/pricing-catalog.ts CANONICAL_TIERS",
  expected: {
    it: { user: 125, monthlyMinimum: 1600 },
    office: { user: 165, monthlyMinimum: 2400 },
    business: { user: 245, monthlyMinimum: 5400 },
    enterprise: { user: 345, monthlyMinimum: 9000 },
  },
} as const;

export const formatPrice = (amount: number): string => `$${amount.toLocaleString()}`;

export const formatMonthlyMinimum = (tier: ProActiveTierKey): string =>
  `${formatPrice(pricing[tier].monthlyMinimum)}/mo minimum`;

/** @deprecated use formatMonthlyMinimum */
export const formatSiteMin = formatMonthlyMinimum;

export const formatUserPrice = (tier: ProActiveTierKey): string =>
  `${formatPrice(pricing[tier].user)}/user/mo`;

export function enforceMonthlyFloor(seatTotal: number, tier: ProActiveTierKey): number {
  return Math.max(Math.round(seatTotal || 0), pricing[tier].monthlyMinimum);
}

export function monthlyForSeats(tier: ProActiveTierKey, seats: number): number {
  return enforceMonthlyFloor(pricing[tier].user * seats, tier);
}

export const getPricingFooterText = (): string =>
  `Monthly minimums: IT ${formatPrice(pricing.it.monthlyMinimum)}, Office ${formatPrice(pricing.office.monthlyMinimum)}, Business ${formatPrice(pricing.business.monthlyMinimum)}, Enterprise ${formatPrice(pricing.enterprise.monthlyMinimum)}. Final scope confirmed after assessment.`;

export const getShortPricingText = (): string =>
  `IT ${formatPrice(pricing.it.monthlyMinimum)} · Office ${formatPrice(pricing.office.monthlyMinimum)} · Business ${formatPrice(pricing.business.monthlyMinimum)} · Enterprise ${formatPrice(pricing.enterprise.monthlyMinimum)} /mo mins`;

export type PricingTier = ProActiveTier;
export type PricingTierKey = ProActiveTierKey;
