import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLocation } from "wouter";
import { HomepageDockMenu, useHomepageDockVisibility } from "@/components/HomepageSectionNav";
import { openMspAdvisor } from "@/lib/openMspAdvisor";

function AskDELauncherButton() {
  return (
    <button
      type="button"
      onClick={() => openMspAdvisor()}
      className="group flex h-11 shrink-0 items-center gap-2.5 rounded-full px-1.5 pr-3.5 text-white transition duration-200 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      data-testid="button-open-asap-widget"
      aria-label="Open DE Desk"
      aria-expanded={false}
    >
      <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#D3126A] text-[11px] font-bold tracking-tight">
        DE
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border-2 border-[#0a0a0a] bg-emerald-400" />
      </span>
      <span className="hidden text-left sm:block">
        <span className="block text-sm font-semibold leading-4 tracking-tight">Ask DE</span>
        <span className="block text-[11px] leading-4 text-white/55">We&apos;re here to help.</span>
      </span>
    </button>
  );
}

/**
 * One bottom chrome shell: homepage chapter menu (after scroll), scroll-to-top,
 * and the Ask DE launcher. Desk window stays in ZohoASAPWidget.
 */
export function SiteBottomBar() {
  const [location] = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const { showMenu } = useHomepageDockVisibility();
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
  const expanded = showMenu;
  const showBar = !isPortal && (showAskDE || expanded || showScrollTop);

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

  const duration = prefersReducedMotion ? 0.18 : 0.28;

  return (
    <div
      className={`de-unified-bar pointer-events-none flex items-end ${
        expanded ? "justify-stretch" : "justify-end"
      }`}
      data-testid="site-bottom-bar"
    >
      <motion.div
        ref={barRef}
        layout={!prefersReducedMotion}
        className={`pointer-events-auto flex min-w-0 items-center gap-1 rounded-full border-2 border-[#D3126A]/60 bg-black/95 py-1.5 shadow-[0_0_24px_rgba(211,18,106,0.35),0_4px_24px_rgba(0,0,0,0.5)] backdrop-blur-xl ${
          expanded ? "w-full px-2.5 sm:px-3" : "w-auto px-1.5"
        }`}
        transition={{ duration, ease: "easeOut" }}
      >
        {!expanded && location === "/" && (
          <span
            className="ml-1 mr-0.5 hidden h-2 w-2 rounded-full bg-[#D3126A] shadow-[0_0_8px_rgba(211,18,106,0.8)] sm:block"
            aria-hidden="true"
          />
        )}
        <div
          className={`grid min-w-0 ${prefersReducedMotion ? "" : "transition-[grid-template-columns,opacity] duration-300 ease-out"} ${
            expanded ? "grid-cols-[minmax(0,1fr)] opacity-100" : "pointer-events-none grid-cols-[0fr] opacity-0"
          }`}
          aria-hidden={!expanded}
        >
          <div className="min-w-0 overflow-hidden">
            {expanded ? <HomepageDockMenu /> : null}
          </div>
        </div>

        {expanded && (showScrollTop || showAskDE) && (
          <div className="mx-1 h-6 w-px shrink-0 bg-white/20" aria-hidden="true" />
        )}

        <div className="flex shrink-0 items-center gap-0.5">
          <AnimatePresence initial={false}>
            {showScrollTop && (
              <motion.button
                key="scroll-top"
                type="button"
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, width: 0 }}
                transition={{ duration }}
                onClick={scrollToTop}
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF477F]"
                aria-label="Scroll to top"
                data-testid="button-scroll-to-top"
              >
                <ArrowUp className="h-4 w-4 shrink-0" aria-hidden="true" />
              </motion.button>
            )}
          </AnimatePresence>

          {showAskDE && <AskDELauncherButton />}
        </div>
      </motion.div>
    </div>
  );
}
