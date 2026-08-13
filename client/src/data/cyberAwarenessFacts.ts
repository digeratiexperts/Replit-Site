/**
 * Canonical industry cybersecurity awareness facts for the public site.
 *
 * Rules:
 * - Industry context only — never present as Digerati performance proof.
 * - Every fact must include a named source + year.
 * - Do not invent DE customer counts, SLAs, savings, or testimonials here.
 * - Never reinstate the indefensible small-business post-attack closure myth (see ban list below).
 */

export type CyberFactScope = "arizona" | "national" | "global";

export interface CyberAwarenessFact {
  id: string;
  scope: CyberFactScope;
  metric: string;
  statement: string;
  source: string;
  year: number;
  sourceUrl?: string;
  relatedServices?: string[];
}

/** Visible source line, e.g. "Verizon DBIR 2026". */
export function formatFactSource(fact: CyberAwarenessFact): string {
  return `${fact.source} ${fact.year}`;
}

/** Shape used by StatCallout / homepage cards. */
export function toDisplayStat(fact: CyberAwarenessFact): {
  value: string;
  label: string;
  source: string;
  sourceUrl?: string;
} {
  return {
    value: fact.metric,
    label: fact.statement,
    source: formatFactSource(fact),
    sourceUrl: fact.sourceUrl,
  };
}

export const BANNED_AWARENESS_SUBSTRINGS = [
  "close within six months",
  "close within 6 months",
  "60% of small businesses close",
] as const;

/**
 * Curated high-quality facts (prefer a small set over a wall of stale stats).
 * Verify before changing years or metrics.
 */
export const cyberAwarenessFacts: CyberAwarenessFact[] = [
  {
    id: "az-ic3-losses-2024",
    scope: "arizona",
    metric: "$392M",
    statement:
      "in internet crime losses reported from Arizona in 2024 (IC3 state ranking by loss)",
    source: "FBI IC3 Annual Report",
    year: 2024,
    sourceUrl: "https://www.ic3.gov/AnnualReport/Reports/2024_IC3Report.pdf",
    relatedServices: ["threat-detection", "security-awareness", "managed-it"],
  },
  {
    id: "az-breach-notify-framing",
    scope: "arizona",
    metric: "45 days",
    statement:
      "Arizona’s breach-notification window (A.R.S. § 18-552) — and larger incidents also notify the AG / AZDHS",
    source: "Arizona Attorney General",
    year: 2025,
    sourceUrl: "https://www.azag.gov/consumer/data-breach/faq",
    relatedServices: ["compliance", "managed-it", "backup-disaster-recovery"],
  },
  {
    id: "dbir-ransomware-2026",
    scope: "national",
    metric: "48%",
    statement: "of breaches involve ransomware",
    source: "Verizon DBIR",
    year: 2026,
    sourceUrl: "https://www.verizon.com/business/resources/reports/dbir/",
    relatedServices: ["threat-detection", "backup-disaster-recovery", "security-operations"],
  },
  {
    id: "dbir-vuln-exploit-2026",
    scope: "national",
    metric: "31%",
    statement:
      "of breaches begin with exploitation of software vulnerabilities (top initial-access vector)",
    source: "Verizon DBIR",
    year: 2026,
    sourceUrl: "https://www.verizon.com/business/resources/reports/dbir/",
    relatedServices: ["managed-it", "threat-detection", "security-operations"],
  },
  {
    id: "dbir-human-element-2026",
    scope: "national",
    metric: "62%",
    statement: "of breaches involve the human element",
    source: "Verizon DBIR",
    year: 2026,
    sourceUrl: "https://www.verizon.com/business/resources/reports/dbir/",
    relatedServices: ["security-awareness"],
  },
  {
    id: "dbir-smb-ransomware-victims-2026",
    scope: "national",
    metric: "~96%",
    statement:
      "of ransomware victims (where organization size was known) were small and medium-sized businesses",
    source: "Verizon DBIR",
    year: 2026,
    sourceUrl: "https://www.verizon.com/business/resources/reports/dbir/",
    relatedServices: ["threat-detection", "backup-disaster-recovery"],
  },
  {
    id: "ibm-us-breach-cost-2026",
    scope: "national",
    metric: "$11.5M",
    statement: "average cost of a data breach in the United States",
    source: "IBM Cost of a Data Breach",
    year: 2026,
    sourceUrl: "https://www.ibm.com/reports/data-breach",
    relatedServices: ["threat-detection", "backup-disaster-recovery", "managed-it"],
  },
  {
    id: "ibm-global-breach-cost-2026",
    scope: "global",
    metric: "$4.99M",
    statement: "global average cost of a data breach",
    source: "IBM Cost of a Data Breach",
    year: 2026,
    sourceUrl: "https://www.ibm.com/reports/data-breach",
    relatedServices: ["threat-detection", "backup-disaster-recovery"],
  },
  {
    id: "microsoft-mfa-blocks-2025",
    scope: "global",
    metric: "99%+",
    statement: "of unauthorized access attempts are blocked by multifactor authentication (MFA)",
    source: "Microsoft Digital Defense Report",
    year: 2025,
    sourceUrl:
      "https://www.microsoft.com/en-us/corporate-responsibility/cybersecurity/microsoft-digital-defense-report-2025/",
    relatedServices: ["managed-it", "security-awareness", "threat-detection"],
  },
  {
    id: "ic3-bec-losses-2024",
    scope: "national",
    metric: "$2.77B",
    statement: "in Business Email Compromise (BEC) losses reported to IC3",
    source: "FBI IC3 Annual Report",
    year: 2024,
    sourceUrl: "https://www.ic3.gov/AnnualReport/Reports/2024_IC3Report.pdf",
    relatedServices: ["security-awareness", "managed-it"],
  },
];

const byId = new Map(cyberAwarenessFacts.map((f) => [f.id, f]));

export function getCyberFact(id: string): CyberAwarenessFact {
  const fact = byId.get(id);
  if (!fact) {
    throw new Error(`Unknown cyber awareness fact id: ${id}`);
  }
  return fact;
}

/** Tight homepage set: national drivers first, then Arizona — not a wall of stats. */
export const HOMEPAGE_FACT_IDS = [
  "dbir-ransomware-2026",
  "ibm-us-breach-cost-2026",
  "microsoft-mfa-blocks-2025",
  "az-ic3-losses-2024",
] as const;

export function getHomepageCyberFacts(): CyberAwarenessFact[] {
  return HOMEPAGE_FACT_IDS.map((id) => getCyberFact(id));
}

/** AZ-relevant facts for Chandler / Phoenix / metro location pages. */
export const LOCATION_FACT_IDS = [
  "az-ic3-losses-2024",
  "az-breach-notify-framing",
] as const;

export function getLocationCyberFacts(): CyberAwarenessFact[] {
  return LOCATION_FACT_IDS.map((id) => getCyberFact(id));
}

export function getFactsForService(serviceSlug: string): CyberAwarenessFact[] {
  return cyberAwarenessFacts.filter((f) => f.relatedServices?.includes(serviceSlug));
}
