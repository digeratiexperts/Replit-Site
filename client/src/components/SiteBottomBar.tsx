import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLocation } from "wouter";
import { openMspAdvisor } from "@/lib/openMspAdvisor";

const FADE_S = 0.4;

function AskDELauncherButton() {
  return (
    <button
      type="button"
      onClick={() => openMspAdvisor()}
      className="group flex h-10 shrink-0 items-center gap-2 rounded-full px-1 pr-1.5 text-white transition-colors duration-200 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      data-testid="button-open-asap-widget"
      aria-label="Open DE Desk"
      aria-expanded={false}
    >
      <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#D3126A] text-sm font-bold tracking-tight">
        DE
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border-2 border-[#0a0a0a] bg-emerald-400" />
      </span>
      <span className="hidden text-left sm:block">
        <span className="block text-base font-semibold leading-4 tracking-tight">Ask DE</span>
        <span className="block text-base leading-4 text-white/70">We&apos;re here to help.</span>
      </span>
    </button>
  );
}

/**
 * One bottom chrome shell: scroll-to-top and the Ask DE launcher. Desk window
 * stays in ZohoASAPWidget.
 *
 * This used to also expand into a homepage section-jump menu + phone/CTA
 * cluster once scrolled past the hero. Removed: DESIGN_SYSTEM.md and the
 * approved homepage spec both say section jumps belong in the MegaMenu (see
 * HomepageOnPageNav, already mounted there and doing this job in-flow with
 * no overlap risk), and the floating expanded copy was a confirmed-live bug
 * — its own height reservation logic didn't stop it from painting over page
 * content id like the "Why We Exist" paragraph or the assessment card's
 * recommendation list, since a fixed-position capsule has no way to know
 * what text is about to scroll under it. Keeping this shell compact-only
 * removes the duplicate nav and the bug in one move.
 */
export function SiteBottomBar() {
  const [location] = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const [farDown, setFarDown] = useState(false);
  const [deskOpen, setDeskOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
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
  const showBar = !isPortal && (showAskDE || showScrollTop);

  useEffect(() => {
    const root = document.documentElement;
    const el = barRef.current;
    if (!showBar || !el) {
      root.style.setProperty("--de-unified-bar-h", "0px");
      root.style.setProperty("--de-section-dock-h", "0px");
      return;
    }

    const publish = () => {
      root.style.setProperty("--de-unified-bar-h", `${Math.round(el.offsetHeight)}px`);
    };
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.setProperty("--de-unified-bar-h", "0px");
      root.style.setProperty("--de-section-dock-h", "0px");
    };
  }, [showBar]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  if (!showBar) return null;

  const duration = prefersReducedMotion ? 0 : FADE_S;

  return (
    <div
      className="de-unified-bar pointer-events-none flex items-end justify-end"
      data-testid="site-bottom-bar"
    >
      <div
        ref={barRef}
        className="de-unified-bar-shell pointer-events-auto relative flex shrink-0 items-center justify-end gap-1.5 rounded-full border-2 border-[#D3126A]/60 py-1.5 pl-1.5 pr-1.5 shadow-[0_0_24px_rgba(211,18,106,0.35),0_4px_24px_rgba(0,0,0,0.5)]"
      >
        <span className="de-unified-bar-glass" aria-hidden="true" />

        <div className="relative z-[1] flex shrink-0 items-center gap-1.5">
          {location === "/" && !showScrollTop && (
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

          {showAskDE && <AskDELauncherButton />}
        </div>
      </div>
    </div>
  );
}
