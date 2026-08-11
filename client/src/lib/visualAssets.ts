/**
 * Public visual-system registry for Digerati website stills.
 *
 * Rules:
 * - Only optimized derivatives under `/images/...` (never licensed ORIGINAL paths)
 * - Meshy Batch 01 (all five) approved + refined — place selectively, not icon salad
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
  source: "meshy-batch-01" | "photography" | "envato";
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

/** Homepage outcomes → optional Meshy still (selective; not every card) */
export const outcomeVisualByTitle: Record<string, VisualStill | undefined> = {
  "Protect identities and devices": meshyBatch01.identity,
  "Keep the business recoverable": meshyBatch01.backup,
  "Protect and monitor the environment": meshyBatch01.network,
};

/**
 * Homepage single-accent placements (one still per section — not card grids).
 * Hero keeps Arizona dusk + DashboardMockup; no Meshy swarm there.
 */
export const homepageSectionAccents = {
  /** Engagement assessment band — copy names email explicitly */
  engagementAssessment: meshyBatch01.email,
  /** Process intro — environment / operating-model cue */
  howItWorks: meshyBatch01.network,
} as const;

/** Solutions index cards that map cleanly to approved Batch 01 */
export const solutionVisualByTitle: Record<string, VisualStill | undefined> = {
  "Managed Network Security": meshyBatch01.network,
  "Threat Detection & Response": meshyBatch01.endpoint,
  "Backup & Disaster Recovery": meshyBatch01.backup,
};
