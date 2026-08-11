/**
 * Manual Google reviews for service-area GBP listings.
 *
 * Places API cannot return reviews for this listing (ChIJ NOT_FOUND / posting off).
 * DE: copy verbatim text from GBP → “Read reviews” (or Maps CID page) into this array.
 * Do NOT invent quotes, ratings, or names. Leave empty until real reviews are pasted.
 *
 * Live API reviews (when a valid GOOGLE_PLACE_ID exists) take priority over this file.
 *
 * @see docs/GOOGLE-REVIEWS.md
 */

export type ManualGoogleReview = {
  authorName: string;
  rating: number; // 1–5, as shown on Google
  text: string;
  /** Optional relative time as shown on Google, e.g. "2 months ago" */
  relativeTime?: string;
};

/** Maps link for the verified service-area listing (CID — not a Place ID). */
export const GOOGLE_MAPS_CID_URL =
  "https://maps.google.com/?cid=1710856351091471339";

/**
 * Paste approved, real Google reviews here (empty by default).
 * Example shape (do not commit fabricated content):
 *
 * {
 *   authorName: "Exact name from Google",
 *   rating: 5,
 *   text: "Exact review body from Google",
 *   relativeTime: "3 months ago",
 * }
 */
export const googleReviewsManual: ManualGoogleReview[] = [];
