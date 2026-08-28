import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Phone, Shield, X } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/contexts/BookingContext";
import { CTA } from "@/lib/ctaCopy";
import { PRIMARY_PHONE } from "@/data/companyContact";
import { isStorePath } from "@/lib/storeChromeGestures";
import { cn } from "@/lib/utils";
import {
  STICKY_CTA_AUTO_HIDE_MS,
  STICKY_CTA_RESHOW_DELTA_PX,
  STICKY_CTA_SCROLL_IDLE_MS,
  isNearDocumentEnd,
  isPageFooterOnScreen,
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
  const light = isStorePath(location);
  const [dismissed, setDismissed] = useState(false);
  const [pastThreshold, setPastThreshold] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [overlapping, setOverlapping] = useState(false);
  const [autoHidden, setAutoHidden] = useState(false);
  const { openBooking } = useBooking();
  const barRef = useRef<HTMLDivElement>(null);
  const lastShowScroll = useRef(0);
  // 0, not a fallback height: nothing should reserve this bar's space until it has
  // actually shown once (it publishes its real measured height at that point).
  const lastHeight = useRef(0);

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
      document.documentElement.dataset.stickyCtaScrolling = "false";
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
      const overlayHits = rectOverlapsPageContent(rect, (x) =>
        document.elementsFromPoint(x, top + Math.min(20, height / 2)),
      );
      const footerHits = Array.from(document.querySelectorAll("footer")).some((el) => {
        if (el.closest("[role='dialog']") || el.closest(".de-desk-shell")) return false;
        return isPageFooterOnScreen(el.getBoundingClientRect().top, window.innerHeight);
      });
      const endHits = isNearDocumentEnd(
        window.scrollY,
        window.innerHeight,
        document.documentElement.scrollHeight,
      );
      setOverlapping(overlayHits || footerHits || endHits);
    };

    const markScrolling = (on: boolean) => {
      document.documentElement.dataset.stickyCtaScrolling = on ? "true" : "false";
      setScrolling(on);
    };

    const onScroll = () => {
      const scrollY = window.scrollY;
      setPastThreshold(isPastStickyCtaThreshold(scrollY, window.innerHeight));
      markScrolling(true);
      if (Math.abs(scrollY - lastShowScroll.current) >= STICKY_CTA_RESHOW_DELTA_PX) {
        setAutoHidden(false);
      }
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        markScrolling(false);
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
    const overlapPoll = window.setInterval(measureOverlap, 500);
    return () => {
      window.clearTimeout(idleTimer);
      window.clearInterval(overlapPoll);
      window.removeEventListener("scroll", onScrollRaf);
      window.removeEventListener("resize", measureOverlap);
      document.documentElement.dataset.stickyCtaScrolling = "false";
    };
  }, [dismissed, routeAllowed]);

  useEffect(() => {
    if (dismissed || !routeAllowed) {
      publishStickyCtaHeight(0);
      return;
    }
    if (!visible) {
      // Keep the reserved slot while the bar is only parked so the page does not jump.
      publishStickyCtaHeight(lastHeight.current);
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
    };
  }, [visible, dismissed, routeAllowed]);

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
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 16, opacity: 0 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          className="de-bottom-bar"
          data-testid="sticky-cta-bar"
          data-sticky-cta-chrome="true"
          data-surface={light ? "light" : "dark"}
        >
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl border",
              light
                ? "border-black/10 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.16)]"
                : "border-de-hairline bg-de-raised",
            )}
          >
            <button
              onClick={handleDismiss}
              className={cn(
                "absolute right-2 top-2 z-10 rounded-full p-1.5 transition-colors",
                light ? "hover:bg-black/5" : "hover:bg-white/10",
              )}
              aria-label="Close banner"
              data-testid="button-dismiss-sticky-cta"
            >
              <X className={cn("h-4 w-4", light ? "text-slate-600" : "text-white/70")} />
            </button>

            <div className="px-4 py-3 pr-11">
              <div className="flex flex-col items-center justify-between gap-3 lg:flex-row lg:gap-5">
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={cn(
                      "hidden h-10 w-10 shrink-0 items-center justify-center rounded-full sm:flex",
                      light ? "bg-black/[0.04]" : "bg-white/10",
                    )}
                  >
                    <Shield className="h-5 w-5 text-de-accent-ink" />
                  </div>
                  <div className="min-w-0 text-center lg:text-left">
                    <p
                      className={cn(
                        "text-base font-semibold md:text-lg",
                        light ? "text-slate-900" : "text-white",
                      )}
                    >
                      Independent Risk Assessment
                    </p>
                    <p
                      className={cn(
                        "max-w-xl text-sm leading-snug md:text-base",
                        light ? "text-slate-600" : "text-white/70",
                      )}
                    >
                      Your current provider has a conflict grading their own work.
                      {" "}
                      <span className={light ? "text-slate-800" : "text-white/90"}>
                        We map the gaps, build a plan, and can collaborate with them — switching is optional.
                      </span>
                    </p>
                  </div>
                </div>

                <div className="hidden items-center xl:flex">
                  <span
                    className={cn(
                      "whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium tracking-wide",
                      light
                        ? "border-black/10 bg-black/[0.03] text-slate-700"
                        : "border-white/20 bg-white/5 text-white/80",
                    )}
                    data-testid="sticky-cta-reassurance"
                  >
                    No switch required
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-2 md:gap-4">
                  <a
                    href={PRIMARY_PHONE.telHref}
                    className={cn(
                      "hidden items-center gap-2 text-base transition-colors md:flex",
                      light ? "text-slate-600 hover:text-slate-900" : "text-white/75 hover:text-white",
                    )}
                    data-testid="link-phone-sticky"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{PRIMARY_PHONE.display}</span>
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
