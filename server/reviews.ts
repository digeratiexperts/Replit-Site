/**
 * Public multi-source reviews aggregator.
 *
 * Merges live Google Places (when configured + ok) with the curated catalog.
 * Never invents quotes. Catalog is the interim path for service-area GBP.
 */

import {
  GOOGLE_MAPS_CID_URL,
  REVIEW_SOURCE_LABELS,
  reviewsCatalog,
  type CatalogReview,
  type ReviewSourceId,
} from "../client/src/data/reviewsCatalog";
import { getGoogleReviews, type GoogleReviewsPayload } from "./googleReviews";

export type PublicReview = {
  id: string;
  source: ReviewSourceId;
  sourceLabel: string;
  origin: "live" | "catalog";
  authorName: string;
  rating: number;
  text: string;
  relativeTime?: string;
  url?: string;
  publishedAt?: string;
};

export type PublicReviewsPayload = {
  status: "ok" | "empty" | "partial";
  message: string;
  sources: ReviewSourceId[];
  reviews: PublicReview[];
  mapsUri: string;
  google: GoogleReviewsPayload;
  fetchedAt: string;
};

function reviewKey(authorName: string, text: string): string {
  return `${authorName.trim().toLowerCase()}::${text.trim().toLowerCase()}`;
}

function catalogToPublic(entry: CatalogReview, index: number): PublicReview {
  return {
    id: `catalog-${entry.source}-${index}`,
    source: entry.source,
    sourceLabel: REVIEW_SOURCE_LABELS[entry.source],
    origin: "catalog",
    authorName: entry.authorName,
    rating: entry.rating,
    text: entry.text,
    relativeTime: entry.relativeTime,
    url: entry.url,
    publishedAt: entry.publishedAt,
  };
}

export async function getPublicReviews(options?: {
  bypassCache?: boolean;
}): Promise<PublicReviewsPayload> {
  const google = await getGoogleReviews(options);
  const mapsUri = google.mapsUri || GOOGLE_MAPS_CID_URL;
  const known = new Set<string>();
  const reviews: PublicReview[] = [];

  if (google.status === "ok") {
    google.reviews.forEach((r, index) => {
      const key = reviewKey(r.authorName, r.text);
      if (known.has(key)) return;
      known.add(key);
      reviews.push({
        id: `live-google-${index}`,
        source: "google",
        sourceLabel: REVIEW_SOURCE_LABELS.google,
        origin: "live",
        authorName: r.authorName,
        rating: r.rating,
        text: r.text,
        relativeTime: r.relativeTime,
        url: mapsUri,
        publishedAt: r.publishTime,
      });
    });
  }

  reviewsCatalog.forEach((entry, index) => {
    if (!entry?.text?.trim() || !entry?.authorName?.trim()) return;
    const key = reviewKey(entry.authorName, entry.text);
    if (known.has(key)) return;
    known.add(key);
    reviews.push(catalogToPublic(entry, index));
  });

  const sources = Array.from(new Set(reviews.map((r) => r.source)));
  const hasLiveGoogle = google.status === "ok" && google.reviews.length > 0;
  const hasCatalog = reviews.some((r) => r.origin === "catalog");

  let status: PublicReviewsPayload["status"] = "empty";
  let message =
    "No published reviews on the site yet. Read us on Google, or paste approved verbatim reviews into reviewsCatalog.ts.";

  if (reviews.length > 0) {
    if (hasLiveGoogle && hasCatalog) {
      status = "partial";
      message = "Live Google reviews plus curated multi-source catalog.";
    } else if (hasLiveGoogle) {
      status = "ok";
      message = "Live Google Business reviews.";
    } else {
      status = "ok";
      message = "Curated reviews from approved sources (verbatim).";
    }
  }

  return {
    status,
    message,
    sources,
    reviews,
    mapsUri,
    google,
    fetchedAt: new Date().toISOString(),
  };
}
