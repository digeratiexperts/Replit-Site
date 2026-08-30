import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, X } from "lucide-react";
import { useLocation } from "wouter";
import {
  HomepageDockActions,
  HomepageDockMenu,
  useHomepageDockVisibility,
} from "@/components/HomepageSectionNav";
import { openMspAdvisor } from "@/lib/openMspAdvisor";
import { isDoor2Path } from "@/lib/isDoor2Path";
import { PRIMARY_PHONE } from "@shared/companyContact";

/** Original used 0.28s easeOut layout + 300ms grid. Keep that pacing without transform. */
const EXPAND_S = 0.4;
const EXPAND_EASE = "easeOut" as const;

/** Shown once per tab session so the compact Store launcher doesn't nag on every render. */
const STORE_CALLOUT_SEEN_KEY = "de-store-ask-callout-seen";

/**
 * On Store/Door 2 pages the storefront has its own floating "Your Solution"
 * button in the same bottom-right corner. Full Ask DE (icon + two lines of
 * text) crowded that button, so here it balls up to the round icon only and
 * surfaces a small dismissible callout pointing at Get Support / a live call
 * instead of relying on the wide label to explain itself.
 */
function AskDELauncherButton({ compact = false }: { compact?: boolean }) {
  const [showCallout, setShowCallout] = useState(false);

  useEffect(() => {
    if (!compact) {
      setShowCallout(false);
      return;
    }
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(STORE_CALLOUT_SEEN_KEY)) return;
    const timer = window.setTimeout(() => setShowCallout(true), 900);
    return () => window.clearTimeout(timer);
  }, [compact]);

  const dismissCallout = () => {
    setShowCallout(false);
    window.sessionStorage?.setItem(STORE_CALLOUT_SEEN_KEY, "1");
  };

  return (
    <div className="relative flex shrink-0 items-center">
      <AnimatePresence>
        {showCallout && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 z-10 w-60 rounded-2xl border border-[#D3126A]/50 bg-[#141014] p-3 text-left shadow-[0_10px_32px_rgba(211,18,106,0.4)]"
            style={{
              bottom: "calc(100% + var(--de-store-cart-h, 0px) + 1.25rem)",
            }}
            role="status"
            data-testid="store-ask-de-callout"
          >
            <button
              type="button"
              onClick={dismissCallout}
              className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full text-white/50 hover:bg-white/10 hover:text-white"
              aria-label="Dismiss"
              data-testid="button-dismiss-store-ask-callout"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <p className="pr-5 text-sm font-semibold text-white">Need a hand with this?</p>
            <div className="mt-2 flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => {
                  dismissCallout();
                  openMspAdvisor({ tab: "ticket" });
                }}
                className="text-left text-sm font-medium text-[#F04C97] hover:underline"
                data-testid="button-store-callout-support"
              >
                Get support &rarr;
              </button>
              <a
                href={PRIMARY_PHONE.telHref}
                onClick={dismissCallout}
                className="text-left text-sm font-medium text-white/75 hover:text-white hover:underline"
                data-testid="link-store-callout-call"
              >
                Talk to a live person &rarr;
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => {
          dismissCallout();
          openMspAdvisor();
        }}
        className="group flex h-10 shrink-0 items-center gap-2 rounded-full px-1 pr-1.5 text-white transition-colors duration-200 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        data-testid="button-open-asap-widget"
        aria-label={compact ? "Open DE Desk for support" : "Open DE Desk"}
        aria-expanded={false}
      >
        <span
          className={`relative flex h-8 w-8 items-center justify-center rounded-full bg-[#D3126A] text-sm font-bold tracking-tight ${
            compact ? "ring-2 ring-[#D3126A]/40 ring-offset-2 ring-offset-black" : ""
          }`}
        >
          DE
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border-2 border-[#0a0a0a] bg-emerald-400" />
        </span>
        {!compact && (
          <span className="hidden text-left sm:block">
            <span className="block text-base font-semibold leading-4 tracking-tight">Ask DE</span>
            <span className="block text-base leading-4 text-white/70">We&apos;re here to help.</span>
          </span>
        )}
      </button>
    </div>
  );
}

/**
 * One bottom chrome shell: homepage chapter menu (after scroll), scroll-to-top,
 * and the Ask DE launcher. Desk window stays in ZohoASAPWidget.
 *
 * Width is tweened as CSS width (not Framer `layout` / scale) so backdrop-filter
 * on the static glass layer does not smear text while the capsule grows.
 */
export function SiteBottomBar() {
  const [location] = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const { showMenu } = useHomepageDockVisibility();
  const [farDown, setFarDown] = useState(false);
  const [deskOpen, setDeskOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const [trackW, setTrackW] = useState(0);
  const [compactW, setCompactW] = useState(0);
  const isPortal = location.startsWith("/portal");

  const syncFarDown = useCallback(() => {
    setFarDown(window.scrollY > 500);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        syncFarDown();
        ticking = false;
      });
    };
    syncFarDown();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [syncFarDown]);

  useEffect(() => {
    const onDesk = (event: Event) => {
      const open = !!(event as CustomEvent<{ open?: boolean }>).detail?.open;
      setDeskOpen(open);
    };
    window.addEventListener("de-desk-open-change", onDesk as EventListener);
    return () => window.removeEventListener("de-desk-open-change", onDesk as EventListener);
  }, []);

  const showScrollTop = farDown;
  const showAskDE = !deskOpen;
  const compactAskDE = isDoor2Path(location);
  const expanded = showMenu;
  const showBar = !isPortal && (showAskDE || expanded || showScrollTop);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const actions = actionsRef.current;
    if (!track) return;
    const publish = () => {
      setTrackW(Math.round(track.getBoundingClientRect().width));
      if (actions) {
        // Compact capsule = action cluster + even 6px padding + 2px border each side.
        setCompactW(Math.round(actions.getBoundingClientRect().width + 16));
      }
    };
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(track);
    if (actions) ro.observe(actions);
    return () => ro.disconnect();
  }, [showAskDE, showScrollTop, location]);

  useEffect(() => {
    const root = document.documentElement;
    const el = barRef.current;
    if (!showBar || !el) {
      root.style.setProperty("--de-unified-bar-h", "0px");
      root.style.setProperty("--de-section-dock-h", "0px");
      return;
    }

    const publish = () => {
      const height = `${Math.round(el.offsetHeight)}px`;
      root.style.setProperty("--de-unified-bar-h", height);
      root.style.setProperty("--de-section-dock-h", expanded ? height : "0px");
    };
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.setProperty("--de-unified-bar-h", "0px");
      root.style.setProperty("--de-section-dock-h", "0px");
    };
  }, [showBar, expanded, showAskDE, showScrollTop]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  if (!showBar) return null;

  const duration = prefersReducedMotion ? 0 : EXPAND_S;

  return (
    <div
      ref={trackRef}
      className="de-unified-bar pointer-events-none flex items-end justify-end"
      data-testid="site-bottom-bar"
    >
      <motion.div
        ref={barRef}
        className={`de-unified-bar-shell pointer-events-auto relative flex items-center rounded-full border-2 border-[#D3126A]/60 py-1.5 shadow-[0_0_24px_rgba(211,18,106,0.35),0_4px_24px_rgba(0,0,0,0.5)] ${
          expanded
            ? "w-full min-w-0 justify-between gap-6 pl-3 pr-2.5"
            : "shrink-0 justify-end gap-0 pl-1.5 pr-1.5"
        }`}
        initial={false}
        layout={false}
        transformTemplate={() => "none"}
        animate={{
          width: expanded ? (trackW > 0 ? trackW : "100%") : compactW > 0 ? compactW : "auto",
        }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: EXPAND_S, ease: EXPAND_EASE }
        }
      >
        <span className="de-unified-bar-glass" aria-hidden="true" />

        <div
          className={`relative z-[1] grid min-w-0 ${
            prefersReducedMotion ? "" : "transition-[grid-template-columns,opacity] duration-[400ms] ease-out"
          } ${
            expanded
              ? "w-full min-w-0 flex-1 grid-cols-[minmax(0,1fr)] opacity-100"
              : "pointer-events-none w-0 flex-none grid-cols-[0fr] overflow-hidden opacity-0"
          }`}
          aria-hidden={!expanded}
        >
          <div className="w-full min-w-0 overflow-hidden">
            <HomepageDockMenu />
          </div>
        </div>

        <div className="relative z-[1] flex shrink-0 items-center gap-1.5">
          {expanded && (
            <>
              <div className="h-6 w-px shrink-0 bg-white/20" aria-hidden="true" />
              <HomepageDockActions />
            </>
          )}
          <div ref={actionsRef} className="flex shrink-0 items-center gap-1.5">
            {!expanded && location === "/" && !showScrollTop && (
              <span
                className="ml-0.5 hidden h-2 w-2 shrink-0 rounded-full bg-[#D3126A] shadow-[0_0_8px_rgba(211,18,106,0.8)] sm:block"
                aria-hidden="true"
              />
            )}
            <AnimatePresence initial={false}>
              {showScrollTop && (
                <motion.button
                  key="scroll-top"
                  type="button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration }}
                  onClick={scrollToTop}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-white/85 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-de-magenta-ink"
                  aria-label="Scroll to top"
                  data-testid="button-scroll-to-top"
                >
                  <ArrowUp className="h-4 w-4 shrink-0" aria-hidden="true" />
                </motion.button>
              )}
            </AnimatePresence>

            {showAskDE && <AskDELauncherButton compact={compactAskDE} />}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
