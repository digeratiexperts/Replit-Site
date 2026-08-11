import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star, Quote, Building2, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useBooking } from "@/contexts/BookingContext";
import {
  GOOGLE_MAPS_CID_URL,
  googleReviewsManual,
} from "@/data/googleReviewsManual";

type GoogleReview = {
  authorName: string;
  rating: number;
  text: string;
  relativeTime?: string;
};

type GoogleReviewsResponse = {
  status: "ok" | "unconfigured" | "error" | "empty";
  configured: boolean;
  missing: string[];
  message: string;
  placeName: string | null;
  rating: number | null;
  userRatingsTotal: number | null;
  reviews: GoogleReview[];
  mapsUri: string | null;
};

/**
 * Client Proof Center — elevate existing proof; never invent named testimonials.
 * Live Google reviews render when /api/google-reviews is configured.
 * Service-area interim: manual paste via googleReviewsManual.ts + Maps CID CTA.
 */
const outcomes = [
  {
    title: "Fewer vendors to manage",
    detail: "One accountable team for IT support and security operations.",
  },
  {
    title: "Clearer security visibility",
    detail: "Identity, endpoint, email, and backup posture you can actually explain.",
  },
  {
    title: "Faster triage when something breaks",
    detail: "Named ownership and documented standards — not ticket roulette.",
  },
];

function Stars({ rating, label }: { rating: number; label?: string }) {
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex items-center gap-1 text-amber-300" role="img" aria-label={label || `${full} stars`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < full ? "fill-current" : "fill-transparent opacity-40"}`}
        />
      ))}
    </div>
  );
}

export const DigeratiTestimonialsSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  const { openBooking } = useBooking();
  const [reviewsPayload, setReviewsPayload] = useState<GoogleReviewsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/google-reviews");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as GoogleReviewsResponse;
        if (!cancelled) setReviewsPayload(data);
      } catch {
        if (!cancelled) {
          setReviewsPayload({
            status: "error",
            configured: false,
            missing: [],
            message: "Reviews temporarily unavailable",
            placeName: null,
            rating: null,
            userRatingsTotal: null,
            reviews: [],
            mapsUri: null,
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const liveReviews =
    reviewsPayload?.status === "ok" ? reviewsPayload.reviews.slice(0, 3) : [];
  const manualReviews = googleReviewsManual.slice(0, 3);
  const showManual =
    liveReviews.length === 0 && manualReviews.length > 0 && !loading;
  const mapsHref = reviewsPayload?.mapsUri || GOOGLE_MAPS_CID_URL;
  const reviewSource: "live" | "manual" | "none" =
    liveReviews.length > 0 ? "live" : showManual ? "manual" : "none";
  const displayedReviews =
    reviewSource === "live" ? liveReviews : reviewSource === "manual" ? manualReviews : [];

  return (
    <section
      id="testimonials"
      className="relative py-14 md:py-18 lg:py-20 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #0f0f1a 50%, #0a0a0a 100%)",
      }}
      data-testid="section-client-proof"
    >
      <div className="max-w-[100rem] mx-auto px-3 sm:px-4 lg:px-6">
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-sm md:text-base font-medium text-[#FF477F] tracking-wide uppercase mb-3">
            Client proof
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Trust built on outcomes — not invented quotes
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Verified Google reviews appear here when connected. Approved Arizona client stories live
            on our case studies page — we do not publish fabricated testimonials.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 md:p-8 lg:col-span-1"
            data-testid="proof-google-slot"
            id="google-reviews"
          >
            {loading ? (
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
                Reviews loading from Google Business Profile…
              </div>
            ) : reviewSource !== "none" ? (
              <>
                {reviewSource === "live" && reviewsPayload?.rating != null && (
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <Stars
                      rating={reviewsPayload.rating}
                      label={`${reviewsPayload.rating} average Google rating`}
                    />
                    <span className="text-sm text-white/70">
                      {reviewsPayload.rating.toFixed(1)}
                      {reviewsPayload.userRatingsTotal != null
                        ? ` · ${reviewsPayload.userRatingsTotal} reviews`
                        : ""}
                    </span>
                  </div>
                )}
                <p className="text-white font-semibold mb-1">
                  {reviewSource === "live"
                    ? reviewsPayload?.placeName || "Google Business reviews"
                    : "Google Business reviews"}
                </p>
                <p className="text-xs text-white/45 mb-4">
                  {reviewSource === "live"
                    ? "Live from Google — verbatim"
                    : "Copied from Google Business Profile — verbatim"}
                </p>
                <ul className="space-y-4 mb-4">
                  {displayedReviews.map((review, idx) => (
                    <li
                      key={`${review.authorName}-${idx}`}
                      className="border-t border-white/10 pt-3 first:border-0 first:pt-0"
                      data-testid={`google-review-${idx}`}
                    >
                      <Stars rating={review.rating} />
                      <p className="text-sm text-white/80 leading-relaxed mt-2 line-clamp-4">
                        “{review.text}”
                      </p>
                      <p className="text-xs text-white/45 mt-1">
                        {review.authorName}
                        {review.relativeTime ? ` · ${review.relativeTime}` : ""}
                      </p>
                    </li>
                  ))}
                </ul>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-violet-300 hover:text-violet-200 inline-flex items-center gap-1"
                  data-testid="link-read-us-on-google"
                >
                  Read us on Google
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1 text-amber-300/50 mb-3" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4" />
                  ))}
                </div>
                <p className="text-white font-semibold mb-1">Google Business reviews</p>
                <p className="text-base text-white/55 leading-relaxed mb-3">
                  {reviewsPayload?.status === "empty"
                    ? reviewsPayload.userRatingsTotal === 0 ||
                      reviewsPayload.userRatingsTotal == null
                      ? "No reviews yet — ask customers for a Google review. We never invent testimonials."
                      : "Google listing is connected, but no public review text is available yet."
                    : "Google reviews API unavailable for service-area listings — paste approved reviews below."}
                </p>
                {reviewsPayload?.status !== "empty" && (
                  <p className="text-xs text-white/40 mb-4 leading-relaxed">
                    Place ID Finder fails for this service-area GBP. Paste real reviews into{" "}
                    <code className="text-white/55">client/src/data/googleReviewsManual.ts</code>{" "}
                    (or enable a storefront address / GBP API). See{" "}
                    <span className="text-white/55">docs/GOOGLE-REVIEWS.md</span>.
                  </p>
                )}
                {reviewsPayload?.status === "empty" && (
                  <p className="text-xs text-white/40 mb-4 leading-relaxed">
                    Place ID is connected. When the first Google reviews publish, they appear here
                    verbatim.
                  </p>
                )}
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-violet-300 hover:text-violet-200 inline-flex items-center gap-1"
                  data-testid="link-read-us-on-google"
                >
                  Read us on Google
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </>
            )}
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 md:p-8 lg:col-span-2"
            data-testid="proof-outcomes"
          >
            <div className="flex items-start gap-3 mb-4">
              <Quote className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-white font-semibold">What clients hire us to improve</p>
            </div>
            <ul className="space-y-4">
              {outcomes.map((o) => (
                <li key={o.title} className="border-t border-white/8 pt-4 first:border-0 first:pt-0">
                  <p className="text-white text-base font-medium">{o.title}</p>
                  <p className="text-white/55 text-base leading-relaxed">{o.detail}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="flex items-start gap-3">
            <Building2 className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-white font-medium text-sm">Case studies</p>
              <p className="text-white/50 text-sm leading-relaxed">
                Challenge / approach / outcome / stack templates are ready. Approved Arizona client
                stories publish when DE supplies permissioned copy — never fabricated ROI.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link href="/resources/case-studies">
              <span
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 hover:border-violet-400/50 text-white text-base font-semibold px-5 py-3"
                data-testid="link-proof-case-studies"
              >
                View case studies
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <button
              type="button"
              onClick={() => openBooking("proof_section")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-base font-semibold px-5 py-3"
              data-testid="button-proof-assessment"
            >
              Schedule Your Assessment
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
          <Link href="/about/client-bill-of-rights">
            <span className="text-violet-300 hover:text-violet-200" data-testid="link-proof-bill-of-rights">
              Client Bill of Rights
            </span>
          </Link>
          <span className="text-white/25" aria-hidden="true">
            ·
          </span>
          <Link href="/about/guarantee">
            <span className="text-violet-300 hover:text-violet-200" data-testid="link-proof-guarantee">
              Our Guarantee
            </span>
          </Link>
          <span className="text-white/25" aria-hidden="true">
            ·
          </span>
          <Link href="/trust/trust-center">
            <span className="text-violet-300 hover:text-violet-200" data-testid="link-proof-trust">
              Trust Center
            </span>
          </Link>
          <span className="text-white/25" aria-hidden="true">
            ·
          </span>
          <Link href="/industries/healthcare">
            <span className="text-violet-300 hover:text-violet-200">Browse industries</span>
          </Link>
        </div>
        <p className="mt-4 text-center text-sm text-white/45">
          Serving professional services, healthcare, construction, nonprofit, and regulated
          organizations across Greater Phoenix · 325-480-9870
        </p>
      </div>
    </section>
  );
};
