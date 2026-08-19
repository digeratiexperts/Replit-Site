/**
 * Optional Yelp Fusion reviews for the public site.
 *
 * Requires both:
 *   YELP_API_KEY (or YELP_FUSION_API_KEY)
 *   YELP_BUSINESS_ID
 *
 * Never invents reviews. Missing keys → unconfigured (empty).
 * Fetch failures stay silent in the UI — aggregator omits this source.
 */

export type YelpReview = {
  authorName: string;
  rating: number;
  text: string;
  relativeTime?: string;
  publishedAt?: string;
  url?: string;
};

export type YelpReviewsPayload = {
  status: "ok" | "unconfigured" | "error" | "empty";
  reviews: YelpReview[];
};

function env(...keys: string[]): string {
  for (const key of keys) {
    const value = (process.env[key] || "").trim();
    if (value) return value;
  }
  return "";
}

export function getYelpReviewsConfig() {
  const apiKey = env("YELP_API_KEY", "YELP_FUSION_API_KEY");
  const businessId = env("YELP_BUSINESS_ID");
  return {
    apiKey,
    businessId,
    configured: Boolean(apiKey && businessId),
  };
}

function relativeFromIso(iso?: string): string | undefined {
  if (!iso) return undefined;
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return undefined;
  const days = Math.max(0, Math.round((Date.now() - then) / 86_400_000));
  if (days < 1) return "today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.round(days / 30);
  if (months === 1) return "1 month ago";
  if (months < 12) return `${months} months ago`;
  const years = Math.round(months / 12);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}

export async function getYelpReviews(): Promise<YelpReviewsPayload> {
  const { apiKey, businessId, configured } = getYelpReviewsConfig();
  if (!configured) return { status: "unconfigured", reviews: [] };

  try {
    const url = new URL(
      `https://api.yelp.com/v3/businesses/${encodeURIComponent(businessId)}/reviews`,
    );
    url.searchParams.set("limit", "5");
    url.searchParams.set("sort_by", "newest");

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      throw new Error(`Yelp HTTP ${res.status}`);
    }

    const data = (await res.json()) as {
      reviews?: Array<{
        user?: { name?: string };
        rating?: number;
        text?: string;
        time_created?: string;
        url?: string;
      }>;
    };

    const reviews = (data.reviews || [])
      .filter((r) => r && typeof r.text === "string" && r.text.trim())
      .map((r) => ({
        authorName: String(r.user?.name || "Yelp reviewer").trim(),
        rating: Number(r.rating) || 0,
        text: String(r.text).trim(),
        publishedAt: r.time_created || undefined,
        relativeTime: relativeFromIso(r.time_created),
        url: r.url || undefined,
      }));

    return {
      status: reviews.length ? "ok" : "empty",
      reviews,
    };
  } catch (err) {
    console.error("[yelpReviews]", err instanceof Error ? err.message : "fetch failed");
    return { status: "error", reviews: [] };
  }
}
