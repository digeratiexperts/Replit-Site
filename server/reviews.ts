/**
 * Public multi-source reviews aggregator.
 *
 * Merges live Google Places (when configured + ok), optional Yelp Fusion,
 * and the curated catalog (Google / Yelp / Thumbtack pastes).
 * Never invents quotes. Failed APIs are omitted — never surfaced in the UI.
 */

import {
  catalogEntriesToPublic,
  GOOGLE_MAPS_CID_URL,
  listingUrlFor,
  PRIMARY_REVIEW_SOURCES,
  REVIEW_SOURCE_LABELS,
  reviewIdentity,
  reviewsCatalog,
  THUMBTACK_LISTING_URL,
  YELP_LISTING_URL,
  type PublicReviewItem,
  type ReviewSourceId,
} from "../client/src/data/reviewsCatalog";
import { getGoogleReviews, type GoogleReviewsPayload } from "./googleReviews";
import { getYelpReviews, type YelpReviewsPayload } from "./yelpReviews";

export type PublicReview = PublicReviewItem;

export type PublicReviewsPayload = {
  status: "ok" | "empty" | "partial";
  message: string;
  sources: ReviewSourceId[];
  reviews: PublicReview[];
  mapsUri: string;
  listingUrls: Partial<Record<ReviewSourceId, string>>;
  google: GoogleReviewsPayload;
  yelp: Pick<YelpReviewsPayload, "status">;
  fetchedAt: string;
};

export function mergeReviewFeed(parts: {
  live: PublicReview[];
  catalog?: typeof reviewsCatalog;
}): PublicReview[] {
  const known = new Set<string>();
  const reviews: PublicReview[] = [];

  for (const review of parts.live) {
    if (!review.text?.trim() || !review.authorName?.trim()) continue;
    const key = reviewIdentity(review.authorName, review.text);
    if (known.has(key)) continue;
    known.add(key);
    reviews.push(review);
  }

  catalogEntriesToPublic(parts.catalog ?? reviewsCatalog).forEach((entry) => {
    const key = reviewIdentity(entry.authorName, entry.text);
    if (known.has(key)) return;
    known.add(key);
    reviews.push(entry);
  });

  return reviews;
}

function orderSources(ids: ReviewSourceId[]): ReviewSourceId[] {
  const seen = new Set(ids);
  const primary = PRIMARY_REVIEW_SOURCES.filter((id) => seen.has(id));
  const rest = ids.filter((id) => !PRIMARY_REVIEW_SOURCES.includes(id));
  return [...primary, ...rest];
}

export async function getPublicReviews(options?: {
  bypassCache?: boolean;
}): Promise<PublicReviewsPayload> {
  const [google, yelp] = await Promise.all([
    getGoogleReviews(options),
    getYelpReviews(),
  ]);
  const mapsUri = google.mapsUri || GOOGLE_MAPS_CID_URL;
  const live: PublicReview[] = [];

  if (google.status === "ok") {
    google.reviews.forEach((r, index) => {
      live.push({
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

  if (yelp.status === "ok") {
    yelp.reviews.forEach((r, index) => {
      live.push({
        id: `live-yelp-${index}`,
        source: "yelp",
        sourceLabel: REVIEW_SOURCE_LABELS.yelp,
        origin: "live",
        authorName: r.authorName,
        rating: r.rating,
        text: r.text,
        relativeTime: r.relativeTime,
        url: r.url || listingUrlFor("yelp"),
        publishedAt: r.publishedAt,
      });
    });
  }

  const reviews = mergeReviewFeed({ live });
  const sources = orderSources(Array.from(new Set(reviews.map((r) => r.source))));
  const hasLiveGoogle = google.status === "ok" && google.reviews.length > 0;
  const hasLiveYelp = yelp.status === "ok" && yelp.reviews.length > 0;
  const hasCatalog = reviews.some((r) => r.origin === "catalog");

  let status: PublicReviewsPayload["status"] = "empty";
  let message =
    "No published reviews on the site yet. Read us on Google, or paste approved verbatim reviews into the catalog.";

  if (reviews.length > 0) {
    if ((hasLiveGoogle || hasLiveYelp) && hasCatalog) {
      status = "partial";
      message = "Live reviews plus curated multi-source catalog.";
    } else if (hasLiveGoogle || hasLiveYelp) {
      status = "ok";
      message = "Live platform reviews.";
    } else {
      status = "ok";
      message = "Curated reviews from approved sources (verbatim).";
    }
  }

  const listingUrls: Partial<Record<ReviewSourceId, string>> = {
    google: mapsUri,
  };
  if (YELP_LISTING_URL) listingUrls.yelp = YELP_LISTING_URL;
  if (THUMBTACK_LISTING_URL) listingUrls.thumbtack = THUMBTACK_LISTING_URL;

  return {
    status,
    message,
    sources,
    reviews,
    mapsUri,
    listingUrls,
    google,
    yelp: { status: yelp.status },
    fetchedAt: new Date().toISOString(),
  };
}
