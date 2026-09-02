/**
 * Homepage versions — every homepage the site has had or is considering,
 * each reachable at /version-<n> for reference, never for search.
 *
 * A version is a frozen snapshot made with
 * scripts/snapshot-homepage-version.mjs (kind "react"), or a static build
 * served by Express (kind "static"), or a placeholder for work that has not
 * started (kind "planned"). /versions lists them all.
 */
export type HomepageVersionKind = "react" | "static" | "planned";

export interface HomepageVersion {
  /** Sequential number; the URL is /version-<n>. */
  n: number;
  path: string;
  title: string;
  /** ISO date the snapshot was taken or the version was defined. */
  date: string;
  /** Where it stands: live, preview, draft PR, planned. */
  status: string;
  summary: string;
  kind: HomepageVersionKind;
  /** Git ref or PR the snapshot came from. */
  source?: string;
  /** For static versions: the URL the version path forwards to. */
  href?: string;
}

export const HOMEPAGE_VERSIONS: HomepageVersion[] = [
  {
    n: 1,
    path: "/version-1",
    title: "Production homepage until 2026-09-02",
    date: "2026-09-02",
    status: "Was live at / until version 3 shipped",
    summary:
      "The homepage as it ships on main: reference hero with four trust cards, sourced stats, the Six Domains command deck, four process cards, reviews and outcome tiles, team cards, package tiers, compliance marks, the assessment island, contact.",
    kind: "react",
    source: "origin/main @ 2d7d12a",
  },
  {
    n: 2,
    path: "/version-2",
    title: "Version B, the Scrollcraft story page",
    date: "2026-09-01",
    status: "Preview at /v2, noindex",
    summary:
      "The isolated scroll-driven interpretation: ten acts from fragmentation to the environment waking up, the range rail, the cadence, proof, Arizona, the ask. Reviewed 2026-09-02 as too long for the primary homepage; candidate for a Why DE story.",
    kind: "static",
    source: "PR #164 (build), PR #172 (served at /v2)",
    href: "/v2",
  },
  {
    n: 3,
    path: "/version-3",
    title: "Diagram-system sections",
    date: "2026-09-02",
    status: "Live at / from 2026-09-02 (PR #178)",
    summary:
      "The nine service sections rebuilt on the DE diagram system: one environment, layered protection, the operating cadence, coverage depth, the inspection; plain-language disclosure; How DE delivers; SLA line; mobile step.",
    kind: "react",
    source: "claude/digerati-experts-v2-scrollcraft-7fkrfd @ c03cad9",
  },
  {
    n: 4,
    path: "/version-4",
    title: "Sections recomposed to flow on scroll",
    date: "",
    status: "Not started",
    summary:
      "The next homepage: the same substance recomposed so the page reads as one scroll, conversion in the first viewport and at every chapter close, six domains leading, an eight-viewport length budget (Experience Plan §09).",
    kind: "planned",
  },
];

export function versionByNumber(n: number): HomepageVersion | undefined {
  return HOMEPAGE_VERSIONS.find((v) => v.n === n);
}
