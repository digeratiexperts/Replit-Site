/**
 * Historical / compliance archive for /resources/security-updates.
 *
 * The homepage "Recent Threats & Insights" section now reads the live scored
 * feed from GET /api/public/threats (CISA KEV, CISA advisories, FIRST EPSS,
 * NIST NVD, Microsoft MSRC). Keep these dated source records — do not invent
 * replacements, and do not backfill them onto the homepage.
 */

export type SecurityUpdateCategory = "CISA Alert" | "Threat Analysis" | "Compliance Update";

export interface SecurityUpdate {
  id: number;
  category: SecurityUpdateCategory;
  /** ISO date YYYY-MM-DD (publication / advisory date) */
  date: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  urgent: boolean;
  slug: string;
  sourceUrl: string;
  sourceName: string;
}

/** Prefer homepage items no older than this many days. */
export const HOMEPAGE_MAX_AGE_DAYS = 45;

export const securityUpdates: SecurityUpdate[] = [
  {
    id: 1,
    category: "CISA Alert",
    date: "2026-01-07",
    title: "KEV Added: HPE OneView Remote Code Execution (CVE-2025-37164)",
    excerpt:
      "CISA added an HPE OneView code injection/RCE issue to the Known Exploited Vulnerabilities catalog. Apply vendor mitigations and patch per guidance.",
    author: "Security Team",
    readTime: "3 min read",
    urgent: true,
    slug: "kev-hpe-oneview-cve-2025-37164",
    sourceUrl: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
    sourceName: "CISA KEV",
  },
  {
    id: 2,
    category: "Threat Analysis",
    date: "2025-12-05",
    title: "Active Exploitation: React Server Components RCE Added to KEV (CVE-2025-55182)",
    excerpt:
      "CISA KEV lists an RCE risk tied to React Server Components endpoints. Prioritize exposure review and patch/mitigation guidance immediately.",
    author: "Security Team",
    readTime: "5 min read",
    urgent: true,
    slug: "kev-react-server-components-cve-2025-55182",
    sourceUrl: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
    sourceName: "CISA KEV",
  },
  {
    id: 3,
    category: "Compliance Update",
    date: "2025-12-16",
    title: "HIPAA Enforcement: OCR Settlement Includes $112,500 Payment (Right of Access)",
    excerpt:
      "HHS OCR announced a HIPAA Right of Access enforcement action resolved via settlement and payment. Good reminder to verify access request workflows.",
    author: "Compliance Team",
    readTime: "4 min read",
    urgent: false,
    slug: "hhs-ocr-right-of-access-concentra-2025-12-16",
    sourceUrl: "https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/agreements/index.html",
    sourceName: "HHS OCR",
  },
  {
    id: 4,
    category: "CISA Alert",
    date: "2026-01-07",
    title: "KEV Added: Microsoft Office PowerPoint RCE (CVE-2009-0556)",
    excerpt:
      "CISA KEV added a Microsoft Office PowerPoint code injection/RCE vulnerability. Patch/mitigate per vendor guidance.",
    author: "Security Team",
    readTime: "3 min read",
    urgent: true,
    slug: "kev-microsoft-office-ppt-cve-2009-0556",
    sourceUrl: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
    sourceName: "CISA KEV",
  },
  {
    id: 5,
    category: "CISA Alert",
    date: "2025-12-16",
    title: "KEV Added: Fortinet SAML Auth Bypass (CVE-2025-59718)",
    excerpt:
      "KEV entry impacts FortiOS / FortiProxy / FortiWeb related to SAML message handling. Patch and review SSO exposure paths.",
    author: "Security Team",
    readTime: "4 min read",
    urgent: true,
    slug: "kev-fortinet-cve-2025-59718",
    sourceUrl: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
    sourceName: "CISA KEV",
  },
  {
    id: 6,
    category: "Compliance Update",
    date: "2025-03-06",
    title: "HIPAA Right of Access: OCR Imposes $200,000 Civil Monetary Penalty (OHSU)",
    excerpt:
      "HHS OCR announced a $200,000 penalty tied to delayed access to medical records. Reinforces strict handling of access requests and timelines.",
    author: "Compliance Team",
    readTime: "4 min read",
    urgent: false,
    slug: "hhs-ocr-ohsu-200k-right-of-access-2025-03-06",
    sourceUrl: "https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/agreements/index.html",
    sourceName: "HHS OCR",
  },
  {
    id: 7,
    category: "Compliance Update",
    date: "2025-02-20",
    title: "HIPAA Security Rule: OCR Issues $1.5M Penalty After Cyberattack (Warby Parker)",
    excerpt:
      "HHS OCR announced a $1.5M civil money penalty following a hacking investigation involving unauthorized access to customer accounts.",
    author: "Compliance Team",
    readTime: "4 min read",
    urgent: false,
    slug: "hhs-ocr-warby-parker-1-5m-2025-02-20",
    sourceUrl: "https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/agreements/index.html",
    sourceName: "HHS OCR",
  },
];

export function parseUpdateDate(isoDate: string): Date {
  // Force UTC noon to avoid timezone off-by-one on date-only strings
  return new Date(`${isoDate}T12:00:00Z`);
}

export function formatUpdateDisplayDate(isoDate: string): string {
  return parseUpdateDate(isoDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function isFreshUpdate(
  update: SecurityUpdate,
  maxAgeDays: number = HOMEPAGE_MAX_AGE_DAYS,
  now: Date = new Date(),
): boolean {
  const published = parseUpdateDate(update.date).getTime();
  const ageMs = now.getTime() - published;
  return ageMs >= 0 && ageMs <= maxAgeDays * 24 * 60 * 60 * 1000;
}

/** Newest first. */
export function getSecurityUpdatesSorted(): SecurityUpdate[] {
  return [...securityUpdates].sort(
    (a, b) => parseUpdateDate(b.date).getTime() - parseUpdateDate(a.date).getTime(),
  );
}

/**
 * Homepage recent threats: max 3 fresh items, newest first.
 * Returns empty array when nothing qualifies — callers must show empty state
 * (never invent dates or backfill with stale "recent" items).
 */
export function getHomepageRecentThreats(
  limit = 3,
  maxAgeDays: number = HOMEPAGE_MAX_AGE_DAYS,
  now: Date = new Date(),
): SecurityUpdate[] {
  return getSecurityUpdatesSorted()
    .filter((u) => isFreshUpdate(u, maxAgeDays, now))
    .slice(0, limit);
}
