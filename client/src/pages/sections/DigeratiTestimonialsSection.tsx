import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star, Quote, Building2, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useBooking } from "@/contexts/BookingContext";
import { CTA } from "@/lib/ctaCopy";
import {
  GOOGLE_MAPS_CID_URL,
  REVIEW_SOURCE_LABELS,
  type ReviewSourceId,
} from "@/data/reviewsCatalog";

type PublicReview = {
  id: string;
  source: ReviewSourceId;
  sourceLabel: string;
  origin: "live" | "catalog";
  authorName: string;
  rating: number;
  text: string;
  relativeTime?: string;
  url?: string;
};

type PublicReviewsResponse = {
  status: "ok" | "empty" | "partial";
  message: string;
  sources: ReviewSourceId[];
  reviews: PublicReview[];
  mapsUri: string;
  google?: {
    status: string;
    placeName: string | null;
    rating: number | null;
    userRatingsTotal: number | null;
  };
};

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
          className={`h-4 w-4 ${i < full ? "fill-current" : "fill-transparent opacity-40"}`}
        />
      ))}
    </div>
  );
}

export const DigeratiTestimonialsSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  const { openBooking } = useBooking();
  const [payload, setPayload] = useState<PublicReviewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSource, setActiveSource] = useState<ReviewSourceId | "all">("all");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/public/reviews");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as PublicReviewsResponse;
        if (!cancelled) setPayload(data);
      } catch {
        if (!cancelled) {
          setPayload({
            status: "empty",
            message: "Reviews temporarily unavailable",
            sources: [],
            reviews: [],
            mapsUri: GOOGLE_MAPS_CID_URL,
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

  const mapsHref = payload?.mapsUri || GOOGLE_MAPS_CID_URL;
  const allReviews = payload?.reviews || [];
  const sourceFilters = useMemo(() => {
    const ids = payload?.sources?.length
      ? payload.sources
      : (Array.from(new Set(allReviews.map((r) => r.source))) as ReviewSourceId[]);
    return ids;
  }, [payload?.sources, allReviews]);

  const displayedReviews = useMemo(() => {
    const filtered =
      activeSource === "all"
        ? allReviews
        : allReviews.filter((r) => r.source === activeSource);
    return filtered.slice(0, 6);
  }, [allReviews, activeSource]);

  const hasReviews = !loading && displayedReviews.length > 0;
  const googleMeta = payload?.google;
  const showGoogleAverage =
    hasReviews &&
    (activeSource === "all" || activeSource === "google") &&
    googleMeta?.status === "ok" &&
    typeof googleMeta.rating === "number";

  return (
    <section
      id="testimonials"
      className="de-dark-chapter relative overflow-hidden py-14 md:py-18 lg:py-20"
      data-testid="section-client-proof"
    >
      <div className="mx-auto max-w-[100rem] px-3 sm:px-4 lg:px-6">
        <motion.div
          className="mb-10 text-center md:mb-14"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-[#FF477F] md:text-base">
            Client proof
          </p>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Outcomes Arizona businesses hire us for
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
            Fewer vendors, clearer security visibility, and accountable support when something
            breaks — backed by real client reviews and documented ownership.
          </p>
        </motion.div>

        <div className="mb-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 md:p-8 lg:col-span-1"
            data-testid="proof-reviews-slot"
            id="google-reviews"
          >
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Loading reviews…
              </div>
            ) : hasReviews ? (
              <>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-white">Client reviews</p>
                  {showGoogleAverage && (
                    <span className="text-sm text-white/70">
                      {googleMeta!.rating!.toFixed(1)}
                      {googleMeta!.userRatingsTotal != null
                        ? ` · ${googleMeta!.userRatingsTotal} on Google`
                        : " avg on Google"}
                    </span>
                  )}
                </div>

                {showGoogleAverage && (
                  <div className="mb-3">
                    <Stars
                      rating={googleMeta!.rating!}
                      label={`${googleMeta!.rating} average Google rating`}
                    />
                  </div>
                )}

                {sourceFilters.length > 1 && (
                  <div
                    className="mb-4 flex flex-wrap gap-1.5"
                    role="tablist"
                    aria-label="Review sources"
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeSource === "all"}
                      onClick={() => setActiveSource("all")}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
                        activeSource === "all"
                          ? "bg-[#D3126A] text-white"
                          : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      All
                    </button>
                    {sourceFilters.map((id) => (
                      <button
                        key={id}
                        type="button"
                        role="tab"
                        aria-selected={activeSource === id}
                        onClick={() => setActiveSource(id)}
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
                          activeSource === id
                            ? "bg-[#7c3aed] text-white"
                            : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {REVIEW_SOURCE_LABELS[id]}
                      </button>
                    ))}
                  </div>
                )}

                {sourceFilters.length === 1 && (
                  <p className="mb-4 text-xs text-white/45">
                    From {REVIEW_SOURCE_LABELS[sourceFilters[0]!]}
                    {allReviews.some((r) => r.origin === "catalog") && allReviews.every((r) => r.origin === "catalog")
                      ? " (published with permission)"
                      : ""}
                  </p>
                )}

                <ul className="mb-4 space-y-4">
                  {displayedReviews.map((review, idx) => (
                    <li
                      key={review.id}
                      className="border-t border-white/10 pt-3 first:border-0 first:pt-0"
                      data-testid={`client-review-${idx}`}
                    >
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <Stars rating={review.rating} />
                        <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-white/55">
                          {review.sourceLabel}
                        </span>
                      </div>
                      <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-white/80">
                        “{review.text}”
                      </p>
                      <p className="mt-1 text-xs text-white/45">
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
                  className="inline-flex items-center gap-1 text-sm text-violet-300 hover:text-violet-200"
                  data-testid="link-read-us-on-google"
                >
                  Read us on Google
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </>
            ) : (
              <>
                <p className="mb-1 font-semibold text-white">Client reviews</p>
                <p className="mb-4 text-base leading-relaxed text-white/55">
                  We publish only real client reviews — never placeholders. Read current feedback on
                  our Google Business Profile; highlights appear here when live API or approved
                  catalog entries are available.
                </p>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#1a0a2e] transition-colors hover:bg-pink-50"
                  data-testid="link-read-us-on-google"
                >
                  Read us on Google
                  <ArrowRight className="h-3.5 w-3.5" />
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
            <div className="mb-4 flex items-start gap-3">
              <Quote className="mt-0.5 h-5 w-5 flex-shrink-0 text-violet-400" aria-hidden="true" />
              <p className="font-semibold text-white">What clients hire us to improve</p>
            </div>
            <ul className="space-y-4">
              {outcomes.map((o) => (
                <li key={o.title} className="border-t border-white/8 pt-4 first:border-0 first:pt-0">
                  <p className="text-base font-medium text-white">{o.title}</p>
                  <p className="text-base leading-relaxed text-white/55">{o.detail}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.04] to-transparent p-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <Building2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-pink-400" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-white">Case studies</p>
              <p className="text-sm leading-relaxed text-white/50">
                See how we approach real Arizona engagements — challenge, approach, and outcome.
              </p>
            </div>
          </div>
          <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row">
            <Link href="/resources/case-studies">
              <span
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-base font-semibold text-white hover:border-violet-400/50"
                data-testid="link-proof-case-studies"
              >
                View case studies
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <button
              type="button"
              onClick={() => openBooking("proof_section")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 py-3 text-base font-semibold text-white hover:bg-violet-500"
              data-testid="button-proof-assessment"
            >
              {CTA.primary}
              <ArrowRight className="h-4 w-4" />
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
          organizations across Greater Phoenix · 480-519-5892
        </p>
      </div>
    </section>
  );
};
