import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Phone, Shield, X } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/contexts/BookingContext";
import { CTA } from "@/lib/ctaCopy";
import {
  STICKY_CTA_AUTO_HIDE_MS,
  STICKY_CTA_FALLBACK_HEIGHT,
  STICKY_CTA_RESHOW_DELTA_PX,
  STICKY_CTA_SCROLL_IDLE_MS,
  isPastStickyCtaThreshold,
  isStickyCtaRouteAllowed,
  rectOverlapsPageContent,
  shouldShowStickyCta,
} from "@/lib/stickyCtaVisibility";

function publishStickyCtaHeight(px: number) {
  document.documentElement.style.setProperty("--de-sticky-cta-h", `${Math.round(px)}px`);
}

export function StickyCTABar() {
  const [location] = useLocation();
  const [dismissed, setDismissed] = useState(false);
  const [pastThreshold, setPastThreshold] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [overlapping, setOverlapping] = useState(false);
  const [autoHidden, setAutoHidden] = useState(false);
  const { openBooking } = useBooking();
  const barRef = useRef<HTMLDivElement>(null);
  const lastShowScroll = useRef(0);
  const lastHeight = useRef(STICKY_CTA_FALLBACK_HEIGHT);

  const routeAllowed = isStickyCtaRouteAllowed(location);
  const visible = shouldShowStickyCta({
    dismissed,
    routeAllowed,
    pastThreshold,
    scrolling,
    overlapping,
    autoHidden,
  });

  useEffect(() => {
    if (sessionStorage.getItem("stickyCtaDismissed")) {
      setDismissed(true);
    }
  }, []);

  useEffect(() => {
    if (dismissed || !routeAllowed) {
      setPastThreshold(false);
      setScrolling(false);
      setOverlapping(false);
      setAutoHidden(false);
      return;
    }

    let idleTimer: number | undefined;
    let ticking = false;

    const measureOverlap = () => {
      const bar = barRef.current;
      const height = bar?.offsetHeight || lastHeight.current;
      const width = bar?.offsetWidth || window.innerWidth - 32;
      const bottomGap = 16;
      const unified = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--de-unified-bar-h"),
      ) || 0;
      const cookie = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--de-cookie-h"),
      ) || 0;
      const top = window.innerHeight - bottomGap - cookie - unified - height;
      const left = bar?.getBoundingClientRect().left ?? 16;
      const rect = {
        top,
        left,
        width,
        height,
        right: left + width,
      };
      const hits = rectOverlapsPageContent(rect, (x) =>
        document.elementsFromPoint(x, top + Math.min(20, height / 2)),
      );
      setOverlapping(hits);
    };

    const onScroll = () => {
      const scrollY = window.scrollY;
      setPastThreshold(isPastStickyCtaThreshold(scrollY, window.innerHeight));
      setScrolling(true);
      if (Math.abs(scrollY - lastShowScroll.current) >= STICKY_CTA_RESHOW_DELTA_PX) {
        setAutoHidden(false);
      }
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        setScrolling(false);
        measureOverlap();
      }, STICKY_CTA_SCROLL_IDLE_MS);
    };

    const onScrollRaf = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScrollRaf, { passive: true });
    window.addEventListener("resize", measureOverlap);
    return () => {
      window.clearTimeout(idleTimer);
      window.removeEventListener("scroll", onScrollRaf);
      window.removeEventListener("resize", measureOverlap);
    };
  }, [dismissed, routeAllowed]);

  useEffect(() => {
    if (!visible) {
      publishStickyCtaHeight(0);
      return;
    }
    lastShowScroll.current = window.scrollY;
    const el = barRef.current;
    if (!el) return;
    const publish = () => {
      lastHeight.current = el.offsetHeight;
      publishStickyCtaHeight(el.offsetHeight);
    };
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    const hideTimer = window.setTimeout(() => setAutoHidden(true), STICKY_CTA_AUTO_HIDE_MS);
    return () => {
      ro.disconnect();
      window.clearTimeout(hideTimer);
      publishStickyCtaHeight(0);
    };
  }, [visible]);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("stickyCtaDismissed", "true");
    publishStickyCtaHeight(0);
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={barRef}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="de-bottom-bar"
          data-testid="sticky-cta-bar"
          data-sticky-cta-chrome="true"
        >
          <div className="relative overflow-hidden rounded-2xl border border-pink-400/35 bg-de-raised backdrop-blur-lg shadow-lg shadow-pink-500/20">
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 z-10 p-1.5 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close banner"
              data-testid="button-dismiss-sticky-cta"
            >
              <X className="w-4 h-4 text-white/70" />
            </button>

            <div className="px-4 py-3 pr-11">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="hidden sm:flex w-10 h-10 rounded-full bg-white/10 items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-de-accent-ink" />
                  </div>
                  <div className="text-center lg:text-left min-w-0">
                    <p className="text-white font-semibold text-base md:text-lg">
                      Independent Risk Assessment
                    </p>
                    <p className="text-white/70 text-sm md:text-base leading-snug max-w-xl">
                      Your current provider has a conflict grading their own work.
                      {" "}
                      <span className="text-white/90">
                        We map the gaps, build a plan, and can collaborate with them — switching is optional.
                      </span>
                    </p>
                  </div>
                </div>

                <div className="hidden xl:flex items-center">
                  <span
                    className="rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-xs font-medium tracking-wide text-white/80 whitespace-nowrap"
                    data-testid="sticky-cta-reassurance"
                  >
                    No switch required
                  </span>
                </div>

                <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                  <a
                    href="tel:+13254809870"
                    className="hidden md:flex items-center gap-2 text-white/75 hover:text-white transition-colors text-base"
                    data-testid="link-phone-sticky"
                  >
                    <Phone className="w-4 h-4" />
                    <span>325-480-9870</span>
                  </a>

                  <Button
                    size="sm"
                    className="h-11 px-5 text-base font-semibold"
                    variant="brand"
                    data-testid="button-sticky-cta-assessment"
                    onClick={() => openBooking("sticky_cta")}
                    aria-label={CTA.primary}
                  >
                    {CTA.primaryNavCompact}
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
