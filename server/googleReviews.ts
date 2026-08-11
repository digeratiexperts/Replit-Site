/**
 * Google Business / Places reviews for the public site.
 *
 * Requires both:
 *   GOOGLE_PLACES_API_KEY (or GOOGLE_MAPS_API_KEY / GBP_API_KEY)
 *   GOOGLE_PLACE_ID (or GBP_PLACE_ID / PLACES_PLACE_ID)
 *
 * Never invent reviews. When credentials are missing, return status "unconfigured".
 */

export type GoogleReview = {
  authorName: string;
  rating: number;
  text: string;
  relativeTime?: string;
  publishTime?: string;
  profilePhotoUrl?: string;
};

export type GoogleReviewsPayload = {
  status: "ok" | "unconfigured" | "error" | "empty";
  configured: boolean;
  missing: string[];
  message: string;
  placeIdMasked: string | null;
  placeName: string | null;
  rating: number | null;
  userRatingsTotal: number | null;
  reviews: GoogleReview[];
  mapsUri: string | null;
  fetchedAt: string | null;
};

type CacheEntry = {
  expiresAt: number;
  payload: GoogleReviewsPayload;
};

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
let cache: CacheEntry | null = null;

function env(...keys: string[]): string {
  for (const key of keys) {
    const value = (process.env[key] || "").trim();
    if (value) return value;
  }
  return "";
}

export function getGoogleReviewsConfig() {
  const apiKey = env(
    "GOOGLE_PLACES_API_KEY",
    "GOOGLE_MAPS_API_KEY",
    "GBP_API_KEY",
    "PLACES_API_KEY",
  );
  const placeId = env("GOOGLE_PLACE_ID", "GBP_PLACE_ID", "PLACES_PLACE_ID");
  const missing: string[] = [];
  if (!apiKey) missing.push("GOOGLE_PLACES_API_KEY");
  if (!placeId) missing.push("GOOGLE_PLACE_ID");
  return { apiKey, placeId, missing, configured: missing.length === 0 };
}

function maskPlaceId(placeId: string): string {
  if (placeId.length <= 10) return "***";
  return `${placeId.slice(0, 6)}…${placeId.slice(-4)}`;
}

function unconfiguredPayload(missing: string[]): GoogleReviewsPayload {
  return {
    status: "unconfigured",
    configured: false,
    missing,
    message:
      "Connect Google Business Place ID and Places API key to load live reviews. See docs/GOOGLE-REVIEWS.md.",
    placeIdMasked: null,
    placeName: null,
    rating: null,
    userRatingsTotal: null,
    reviews: [],
    mapsUri: null,
    fetchedAt: null,
  };
}

function normalizeLegacyReviews(raw: any[]): GoogleReview[] {
  return (raw || [])
    .filter((r) => r && typeof r.text === "string" && r.text.trim())
    .map((r) => ({
      authorName: String(r.author_name || "Google reviewer").trim(),
      rating: Number(r.rating) || 0,
      text: String(r.text).trim(),
      relativeTime: r.relative_time_description
        ? String(r.relative_time_description)
        : undefined,
      publishTime: r.time ? new Date(Number(r.time) * 1000).toISOString() : undefined,
      profilePhotoUrl: r.profile_photo_url
        ? String(r.profile_photo_url)
        : undefined,
    }));
}

async function fetchLegacyPlaceDetails(
  apiKey: string,
  placeId: string,
): Promise<GoogleReviewsPayload> {
  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/details/json",
  );
  url.searchParams.set("place_id", placeId);
  url.searchParams.set(
    "fields",
    "name,rating,user_ratings_total,reviews,url",
  );
  url.searchParams.set("reviews_sort", "newest");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Places API HTTP ${res.status}`);
  }
  const data = (await res.json()) as {
    status: string;
    error_message?: string;
    result?: {
      name?: string;
      rating?: number;
      user_ratings_total?: number;
      reviews?: any[];
      url?: string;
    };
  };

  if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
    throw new Error(data.error_message || `Places status ${data.status}`);
  }

  const result = data.result || {};
  const reviews = normalizeLegacyReviews(result.reviews || []);

  return {
    status: reviews.length ? "ok" : "empty",
    configured: true,
    missing: [],
    message: reviews.length
      ? "Live Google Business reviews."
      : "Place is connected but Google returned no public review text yet.",
    placeIdMasked: maskPlaceId(placeId),
    placeName: result.name || null,
    rating: typeof result.rating === "number" ? result.rating : null,
    userRatingsTotal:
      typeof result.user_ratings_total === "number"
        ? result.user_ratings_total
        : null,
    reviews,
    mapsUri: result.url || null,
    fetchedAt: new Date().toISOString(),
  };
}

export async function getGoogleReviews(options?: {
  bypassCache?: boolean;
}): Promise<GoogleReviewsPayload> {
  const { apiKey, placeId, missing, configured } = getGoogleReviewsConfig();
  if (!configured) return unconfiguredPayload(missing);

  if (!options?.bypassCache && cache && cache.expiresAt > Date.now()) {
    return cache.payload;
  }

  try {
    const payload = await fetchLegacyPlaceDetails(apiKey, placeId);
    cache = { expiresAt: Date.now() + CACHE_TTL_MS, payload };
    return payload;
  } catch (err: any) {
    const message = err?.message || "Failed to fetch Google reviews";
    console.error("[googleReviews]", message);
    return {
      status: "error",
      configured: true,
      missing: [],
      message,
      placeIdMasked: maskPlaceId(placeId),
      placeName: null,
      rating: null,
      userRatingsTotal: null,
      reviews: [],
      mapsUri: null,
      fetchedAt: new Date().toISOString(),
    };
  }
}
