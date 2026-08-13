import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone, Shield } from "lucide-react";
import { useOptionalFullPageScroll } from "@/components/FullPageScroll";
import { useBooking } from "@/contexts/BookingContext";
import { CTA } from "@/lib/ctaCopy";

/** Homepage chapters in the thin top table of contents. */
const TOP_CHAPTERS = new Set([
  "hero",
  "stats",
  "services",
  "pricing",
  "industries",
  "testimonials",
  "faq",
  "contact",
]);

/** Concise dock chapters — same system as the top TOC. */
const DOCK_CHAPTERS = new Set([
  "hero",
  "stats",
  "services",
  "pricing",
  "industries",
  "testimonials",
  "contact",
]);

function nearestNavIndex(
  items: Array<{ index: number }>,
  currentSection: number
): number {
  if (items.some(({ index }) => index === currentSection)) return currentSection;
  let best = items[0]?.index ?? 0;
  let bestDist = Infinity;
  for (const { index } of items) {
    const dist = Math.abs(index - currentSection);
    if (dist < bestDist) {
      bestDist = dist;
      best = index;
    }
  }
  return best;
}

/**
 * Slim homepage table of contents under the global MegaMenu.
 * Hidden on large screens once the compact sticky header takes over — the
 * floating Protected? dock is the scrolled state of this same system.
 */
export function HomepageOnPageNav() {
  const ctx = useOptionalFullPageScroll();
  const rootRef = useRef<HTMLElement>(null);
  const sections = ctx?.sections ?? [];
  const currentSection = ctx?.currentSection ?? 0;
  const scrollToSection = ctx?.scrollToSection;
  const items = sections
    .map((section, index) => ({ section, index }))
    .filter(({ section }) => TOP_CHAPTERS.has(section.id));

  const activeIndex = nearestNavIndex(items, currentSection);

  useEffect(() => {
    const root = document.documentElement;
    const el = rootRef.current;
    if (!el) {
      root.style.setProperty("--de-spy-h", "0px");
      return;
    }

    const publish = () => {
      root.style.setProperty("--de-spy-h", `${Math.round(el.offsetHeight)}px`);
    };
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.setProperty("--de-spy-h", "0px");
    };
  }, [ctx]);

  if (!ctx || items.length === 0) return null;

  return (
    <nav
      ref={rootRef}
      aria-label="On this page"
      data-testid="homepage-section-spy"
      className="border-t border-white/[0.08] bg-black/90"
    >
      <div className="mx-auto flex max-w-[100rem] items-stretch px-2 sm:px-3 xl:px-5">
        <ul className="flex w-full min-h-9 items-stretch justify-start overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] lg:justify-center [&::-webkit-scrollbar]:hidden">
          {items.map(({ section, index }) => {
            const isActive = activeIndex === index;
            return (
              <li key={section.id} className="flex min-w-0 flex-1 justify-center lg:flex-none">
                <a
                  href={`#${section.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection?.(index);
                  }}
                  className={`relative inline-flex min-h-9 w-full items-center justify-center px-1 py-1.5 text-[10px] font-semibold tracking-wide whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-inset sm:px-2 sm:text-[11px] lg:min-h-8 lg:w-auto lg:px-3.5 lg:text-[13px] ${
                    isActive ? "text-white" : "text-white/55 hover:text-white/90"
                  }`}
                  aria-current={isActive ? "true" : undefined}
                  data-testid={`nav-dot-${section.id}`}
                >
                  {section.label}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-1 bottom-0 h-0.5 rounded-full transition-opacity lg:inset-x-2 ${
                      isActive ? "bg-[#D3126A] opacity-100" : "opacity-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

/**
 * Scrolled state of the homepage section navigator — branded Protected? dock.
 */
export function HomepageSectionDock() {
  const ctx = useOptionalFullPageScroll();
  const { openBooking } = useBooking();
  const prefersReducedMotion = useReducedMotion();
  const [scrolledAway, setScrolledAway] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [cookieClear, setCookieClear] = useState(() => {
    try {
      return !!localStorage.getItem("de_cookie_consent_v2") || !!localStorage.getItem("de_cookie_consent");
    } catch {
      return true;
    }
  });

  const sections = ctx?.sections ?? [];
  const currentSection = ctx?.currentSection ?? 0;
  const scrollToSection = ctx?.scrollToSection;
  const items = sections
    .map((section, index) => ({ section, index }))
    .filter(({ section }) => DOCK_CHAPTERS.has(section.id));
  const topItems = sections
    .map((section, index) => ({ section, index }))
    .filter(({ section }) => TOP_CHAPTERS.has(section.id));
  const conceptualActiveIndex = nearestNavIndex(topItems, currentSection);
  const conceptualActiveId = sections[conceptualActiveIndex]?.id;

  useEffect(() => {
    const onConsent = () => setCookieClear(true);
    window.addEventListener("de-cookie-consent", onConsent);
    return () => window.removeEventListener("de-cookie-consent", onConsent);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolledAway(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting && entry.intersectionRatio > 0.28),
      { threshold: [0, 0.28, 0.5] }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const show = Boolean(ctx) && isDesktop && scrolledAway && !nearFooter && cookieClear && items.length > 0;

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--de-section-dock-h",
      show ? "3.75rem" : "0px"
    );
    return () => {
      document.documentElement.style.setProperty("--de-section-dock-h", "0px");
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { y: 18, opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.22, ease: "easeOut" }}
          className="de-bottom-bar hidden lg:flex items-center pointer-events-none"
          data-testid="homepage-section-dock"
        >
          <nav
            className="pointer-events-auto flex w-full min-w-0 flex-row items-center justify-between gap-2 overflow-hidden py-2 px-3.5 rounded-full bg-black/95 backdrop-blur-xl border-2 border-[#D3126A]/60 shadow-[0_0_24px_rgba(211,18,106,0.35),0_4px_24px_rgba(0,0,0,0.5)]"
            aria-label="On this page"
          >
            <div className="hidden xl:flex items-center gap-2 pr-3 border-r border-white/20 mr-2 shrink-0">
              <Shield className="w-4 h-4 text-[#FF477F]" aria-hidden="true" />
              <span className="text-white font-semibold text-sm whitespace-nowrap">Protected?</span>
            </div>

            <div className="flex items-center gap-1 min-w-0 overflow-x-auto scrollbar-none">
              {items.map(({ section, index }) => {
                const isActive = section.id === conceptualActiveId;
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection?.(index);
                    }}
                    className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF477F] whitespace-nowrap shrink-0 ${
                      isActive
                        ? "bg-[#D3126A] text-white shadow-lg shadow-[#D3126A]/40"
                        : "text-white/75 hover:text-white hover:bg-white/10"
                    }`}
                    aria-current={isActive ? "true" : undefined}
                    data-testid={`nav-dock-${section.id}`}
                  >
                    {isActive && (
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.85)]"
                        aria-hidden="true"
                      />
                    )}
                    {section.label}
                  </a>
                );
              })}
            </div>

            <div className="w-px h-6 bg-white/20 mx-2 shrink-0" aria-hidden="true" />

            <a
              href="tel:480-519-5892"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors shrink-0 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF477F]"
              data-testid="nav-phone"
              aria-label="Call 480-519-5892"
            >
              <Phone className="w-4 h-4 text-[#FF477F]" aria-hidden="true" />
              <span className="hidden xl:inline">480-519-5892</span>
            </a>

            <button
              type="button"
              onClick={() => openBooking("homepage_section_dock")}
              className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold rounded-full bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 text-white hover:from-fuchsia-500 hover:via-pink-500 hover:to-rose-400 transition-all duration-200 shadow-lg whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
              data-testid="nav-cta-assessment"
            >
              {CTA.primaryNavCompact}
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
