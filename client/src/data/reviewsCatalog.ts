/**
 * Multi-source reviews catalog for the public site.
 *
 * Paste ONLY real, verbatim reviews DE approved for publication.
 * Do NOT invent quotes, ratings, names, or counts.
 *
 * Live Google Places reviews (when GOOGLE_PLACE_ID works) merge in via
 * GET /api/public/reviews and take priority for matching Google text.
 *
 * @see docs/GOOGLE-REVIEWS.md
 */

export type ReviewSourceId = "google" | "facebook" | "clutch" | "other";

export type CatalogReview = {
  source: ReviewSourceId;
  authorName: string;
  /** 1–5 as shown on the source platform */
  rating: number;
  text: string;
  /** Optional relative time as shown on the source, e.g. "2 months ago" */
  relativeTime?: string;
  /** Optional deep link to the review or listing */
  url?: string;
  /** Optional ISO date when known */
  publishedAt?: string;
};

/** Maps link for the verified service-area listing (CID — not a Place ID). */
export const GOOGLE_MAPS_CID_URL =
  "https://maps.google.com/?cid=1710856351091471339";

export const REVIEW_SOURCE_LABELS: Record<ReviewSourceId, string> = {
  google: "Google",
  facebook: "Facebook",
  clutch: "Clutch",
  other: "Review",
};

/**
 * Curated reviews. Empty by default — honest empty state on the homepage.
 *
 * Example (do not commit fabricated content):
 *
 * {
 *   source: "google",
 *   authorName: "Exact name from Google",
 *   rating: 5,
 *   text: "Exact review body from Google",
 *   relativeTime: "3 months ago",
 *   url: GOOGLE_MAPS_CID_URL,
 * }
 */
export const reviewsCatalog: CatalogReview[] = [];
