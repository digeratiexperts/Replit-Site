import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import {
  REVIEW_SOURCE_LABELS,
  type PublicReviewItem,
  type ReviewSourceId,
} from "@/data/reviewsCatalog";

const FEED_INTERVAL_MS = 7000;

function Stars({ rating, label }: { rating: number; label?: string }) {
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div
      className="flex items-center gap-1 text-amber-300"
      role="img"
      aria-label={label || `${full} stars`}
    >
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < full ? "fill-current" : "fill-transparent opacity-40"}`}
        />
      ))}
    </div>
  );
}

type ReviewsCarouselProps = {
  reviews: PublicReviewItem[];
  prefersReducedMotion: boolean | null;
};

export function ReviewsCarousel({
  reviews,
  prefersReducedMotion,
}: ReviewsCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const canCarousel = reviews.length > 1;
  const reduceMotion = Boolean(prefersReducedMotion);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || !canCarousel || reduceMotion || paused) return;
    const id = window.setInterval(() => {
      api.scrollNext();
    }, FEED_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [api, canCarousel, reduceMotion, paused]);

  const pause = useCallback(() => setPaused(true), []);
  const resume = useCallback(() => setPaused(false), []);

  if (reviews.length === 0) return null;

  return (
    <div
      className="min-w-0"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: canCarousel && reviews.length > 2,
          duration: reduceMotion ? 0 : 22,
        }}
        className="w-full"
        aria-label="Client reviews"
      >
        <CarouselContent className="-ml-4">
          {reviews.map((review, idx) => (
            <CarouselItem
              key={review.id}
              className="pl-4 basis-[min(100%,22.5rem)] sm:basis-[min(80%,28rem)] lg:basis-[min(48%,32rem)]"
              data-testid={`client-review-${idx}`}
            >
              <article className="flex h-full min-h-[14rem] flex-col rounded-2xl border border-de-hairline bg-de-raised p-6 md:p-7">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <Stars rating={review.rating} />
                  <span className="rounded-md border border-de-hairline bg-white/5 px-2 py-0.5 text-base font-semibold uppercase tracking-wide text-white/70">
                    {review.sourceLabel}
                  </span>
                </div>
                <p className="flex-1 text-base leading-relaxed text-white/80">
                  “{review.text}”
                </p>
                <p className="mt-4 text-base text-white/55">
                  {review.authorName}
                  {review.relativeTime ? ` · ${review.relativeTime}` : ""}
                </p>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <p className="sr-only" aria-live="polite">
        Review {selected + 1} of {reviews.length}
        {reviews[selected]
          ? `: ${reviews[selected].authorName} on ${reviews[selected].sourceLabel}`
          : ""}
      </p>

      {canCarousel && (
        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="flex flex-wrap" role="tablist" aria-label="Review slides">
            {reviews.map((review, i) => (
              <button
                key={review.id}
                type="button"
                role="tab"
                aria-selected={i === selected}
                aria-label={`Show review ${i + 1} of ${reviews.length}`}
                onClick={() => api?.scrollTo(i)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--de-magenta)]"
              >
                <span
                  className={cn(
                    "h-2 w-2 rounded-full transition",
                    i === selected
                      ? "scale-125 bg-[var(--de-magenta)]"
                      : "bg-white/25",
                  )}
                />
              </button>
            ))}
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-de-hairline bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--de-magenta)]"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-de-hairline bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--de-magenta)]"
              aria-label="Next review"
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function ReviewSourceChips({
  sources,
  active,
  onChange,
}: {
  sources: ReviewSourceId[];
  active: ReviewSourceId | "all";
  onChange: (id: ReviewSourceId | "all") => void;
}) {
  if (sources.length < 2) return null;

  const chipClass = (selected: boolean) =>
    cn(
      "min-h-11 rounded-full px-3 py-1.5 text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--de-magenta)]",
      selected
        ? "bg-[var(--de-magenta)] text-white"
        : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white",
    );

  return (
    <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Review sources">
      <button
        type="button"
        role="tab"
        aria-selected={active === "all"}
        onClick={() => onChange("all")}
        className={chipClass(active === "all")}
      >
        All
      </button>
      {sources.map((id) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={active === id}
          onClick={() => onChange(id)}
          className={chipClass(active === id)}
        >
          {REVIEW_SOURCE_LABELS[id]}
        </button>
      ))}
    </div>
  );
}
