/**
 * Public visual-system registry for Digerati website stills.
 *
 * Rules:
 * - Only optimized derivatives under `/images/...` (never licensed ORIGINAL paths)
 * - Public marketing: sculpture set for path/section stages; Lucide for small cards
 * - Meshy Batch 01 is retired from public marketing (laptop/robot/lock/envelope)
 * - Portal / mega-menu chrome stays Lucide
 */

export type VisualStill = {
  /** Concept slug */
  id: string;
  /** Human label */
  label: string;
  /** Primary public path (WebP preferred) */
  src: string;
  /** Fallback PNG */
  srcPng: string;
  /** Smaller card thumb */
  srcThumb: string;
  alt: string;
  /** Placement readiness */
  status: "approved" | "awaiting-approval" | "missing";
  source: "meshy-batch-01" | "photography" | "envato" | "engage-sculpture-set" | "meshy-site-accent";
};

const meshy01 = (slug: string, label: string, alt: string, status: VisualStill["status"]): VisualStill => ({
  id: slug,
  label,
  src: `/images/visual-system/meshy-batch-01/${slug}.webp`,
  srcPng: `/images/visual-system/meshy-batch-01/${slug}.png`,
  srcThumb: `/images/visual-system/meshy-batch-01/${slug}-256.webp`,
  alt,
  status,
  source: "meshy-batch-01",
});

/** Approved + refined Batch 01 shapes (dark charcoal + violet/fuchsia) */
export const meshyBatch01 = {
  endpoint: meshy01(
    "endpoint",
    "Endpoint security",
    "3D icon of a laptop with a shield emblem representing endpoint protection",
    "approved",
  ),
  email: meshy01(
    "email",
    "Email security",
    "3D icon of a locked envelope representing email security",
    "approved",
  ),
  network: meshy01(
    "network",
    "Network security",
    "3D icon of connected network nodes representing network protection",
    "approved",
  ),
  backup: meshy01(
    "backup",
    "Backup and recovery",
    "3D icon of a cloud over storage drives representing backup and recovery",
    "approved",
  ),
  /** v4 ID badge — approved after refine (dark + violet accents) */
  identity: meshy01(
    "identity",
    "Identity and access",
    "3D icon of an ID badge with shield and keyhole representing identity and access",
    "approved",
  ),
} as const;

/**
 * Real photography — flip `available` after DE drops optimized files into
 * `client/public/images/team/` (sources under `assets/photography/de-headshots/ORIGINAL/`).
 */
export const photography = {
  founderHeadshot: {
    id: "founder-joseph-petro",
    label: "Joseph Petro — Founder",
    src: "/images/team/joseph-petro-headshot.webp",
    srcPng: "/images/team/joseph-petro-headshot.png",
    alt: "Joseph Petro, Founder of Digerati Experts",
    available: false as boolean,
    dropOriginalsAt: "assets/photography/de-headshots/ORIGINAL/",
    publicDerivativesAt: "client/public/images/team/",
  },
} as const;

/** Envato 4THD2PH — ZIP not yet received */
export const envatoStock = {
  packId: "4THD2PH",
  available: false as boolean,
  dropZipAt: "assets/licensed/envato-4THD2PH/ORIGINAL/",
} as const;

export function isApprovedStill(still: VisualStill | undefined): still is VisualStill {
  return !!still && still.status === "approved";
}

/** Homepage outcomes — Lucide on cards; no 3D on every tile */
export const outcomeVisualByTitle: Record<string, VisualStill | undefined> = {};

/** Tackle cards use Lucide wells — no per-card 3D */
export const tackleVisualByTitle: Record<string, VisualStill | undefined> = {};

const engageSculpture = (
  slug: string,
  label: string,
  alt: string,
  opts?: { alpha?: boolean },
): VisualStill => ({
  id: slug,
  label,
  src: `/images/visual-system/engage-paths/${slug}.webp`,
  // Photographic stills compress better as JPEG; knockout stills need PNG alpha.
  srcPng: `/images/visual-system/engage-paths/${slug}.${opts?.alpha ? "png" : "jpg"}`,
  srcThumb: `/images/visual-system/engage-paths/${slug}-640.webp`,
  alt,
  status: "approved",
  source: "engage-sculpture-set",
});

/**
 * Homepage engage-path sculptures — one locked visual system.
 * Graphite / smoked glass / violet-as-light. Not Meshy Batch 01 icons.
 */
export const engageSculptureSet = {
  fullyManaged: engageSculpture(
    "fully-managed",
    "Fully managed IT",
    "Dark graphite sculpture of a central security core connected to endpoint and network nodes",
  ),
  coManaged: engageSculpture(
    "co-managed",
    "Co-managed IT",
    "Two interlocking technical systems sharing one infrastructure spine",
  ),
  cyberRisk: engageSculpture(
    "cyber-risk",
    "Cyber risk assessment",
    "Network lattice illuminated by a scanning arc highlighting selected nodes",
  ),
  /** Homepage Threats chapter — one knockout still, not Meshy laptop/shield */
  threatTelemetry: engageSculpture(
    "threat-telemetry",
    "Threat telemetry",
    "Graphite telemetry core with smoked-glass plates and violet-lit nodes representing detected events",
    { alpha: true },
  ),
} as const;

/** Engage path cards — one still each, mapped to copy */
export const engagePathVisualByTitle: Record<string, VisualStill | undefined> = {
  "Fully Managed IT & Cybersecurity": engageSculptureSet.fullyManaged,
  "Co-Managed IT": engageSculptureSet.coManaged,
  "Cyber Risk Assessment": engageSculptureSet.cyberRisk,
};

const pricingEcosystemStill: VisualStill = {
  id: "pricing-ecosystem",
  label: "ProActive operating model",
  src: "/images/visual-system/site/pricing-ecosystem.webp",
  srcPng: "/images/visual-system/site/pricing-ecosystem.png",
  srcThumb: "/images/visual-system/site/pricing-ecosystem.webp",
  alt: "Isometric 3×3 service blocks around a ProActive operating-model hub",
  status: "approved",
  source: "meshy-site-accent",
};

/**
 * Homepage section editorials — one still per chapter, not a gallery.
 * Small cards stay Lucide. Protect (light) stays Lucide.
 */
export const homepageSectionAccents = {
  statsThreats: engageSculptureSet.threatTelemetry,
  engagementAssessment: engageSculptureSet.cyberRisk,
  howItWorks: engageSculptureSet.fullyManaged,
  protectProcess: undefined as VisualStill | undefined,
  pricingEcosystem: pricingEcosystemStill,
};

/** Security stack / solutions cards — Lucide wells, not Meshy */
export const stackVisualByTitle: Record<string, VisualStill | undefined> = {};

export const solutionVisualByTitle: Record<string, VisualStill | undefined> = {};
