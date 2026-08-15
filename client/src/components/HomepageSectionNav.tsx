import { useEffect, useRef, useState } from "react";
import { ArrowRight, Phone, Shield } from "lucide-react";
import { useOptionalFullPageScroll } from "@/components/FullPageScroll";
import { useBooking } from "@/contexts/BookingContext";
import { PRIMARY_PHONE } from "@/data/companyContact";
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
      className="hidden border-t border-white/[0.08] bg-black/90 lg:block"
    >
      <div className="mx-auto flex max-w-[100rem] items-stretch px-2 sm:px-3 xl:px-5">
        <ul className="flex w-full min-h-9 items-stretch justify-start overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] md:justify-between [&::-webkit-scrollbar]:hidden">
          {items.map(({ section, index }) => {
            const isActive = activeIndex === index;
            return (
              <li key={section.id} className="flex shrink-0 justify-center md:min-w-0 md:flex-1">
                <a
                  href={`#${section.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection?.(index);
                  }}
                  className={`relative inline-flex min-h-9 items-center justify-center px-2.5 py-1.5 text-base font-semibold tracking-wide whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-inset sm:px-3 md:px-1.5 lg:min-h-9 lg:w-auto lg:px-2 ${
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

export function useHomepageDockVisibility() {
  const ctx = useOptionalFullPageScroll();
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
  const items = sections
    .map((section, index) => ({ section, index }))
    .filter(({ section }) => DOCK_CHAPTERS.has(section.id));

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

  const showMenu =
    Boolean(ctx) && isDesktop && scrolledAway && !nearFooter && cookieClear && items.length > 0;

  return { showMenu, nearFooter, isDesktop };
}

/**
 * Homepage chapters for the unified bottom bar.
 * Protected? stays a fixed lead-in; chapter links flex across leftover
 * width so the row fills instead of clustering left of the actions.
 */
export function HomepageDockMenu() {
  const ctx = useOptionalFullPageScroll();
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

  if (!ctx || items.length === 0) return null;

  return (
    <nav
      className="flex w-full min-w-0 items-center gap-2 overflow-hidden"
      aria-label="On this page"
      data-testid="homepage-section-dock"
    >
      <div className="hidden h-10 shrink-0 items-center gap-2 border-r border-white/20 pr-3 xl:flex">
        <Shield className="h-4 w-4 text-[#FF477F]" aria-hidden="true" />
        <span className="whitespace-nowrap text-base font-semibold text-white">Protected?</span>
      </div>

      <div className="flex min-w-0 flex-1 items-center overflow-x-auto scrollbar-none">
        {items.map(({ section, index }) => {
          const isActive = section.id === conceptualActiveId;
          return (
            <div key={section.id} className="flex min-w-0 flex-1 justify-center">
              <a
                href={`#${section.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection?.(index);
                }}
                className={`relative inline-flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 text-base font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF477F] ${
                  isActive
                    ? "bg-[#D3126A] text-white shadow-lg shadow-[#D3126A]/40"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
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
            </div>
          );
        })}
      </div>
    </nav>
  );
}

/** Phone + Risk Assessment — sits in the bottom-bar action cluster. */
export function HomepageDockActions() {
  const { openBooking } = useBooking();

  return (
    <div className="flex items-center gap-1.5" data-testid="homepage-dock-actions">
      <a
        href={PRIMARY_PHONE.telHref}
        className="flex h-10 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF477F]"
        data-testid="nav-phone"
        aria-label={`Call ${PRIMARY_PHONE.display}`}
      >
        <Phone className="h-4 w-4 text-[#FF477F]" aria-hidden="true" />
        <span className="hidden xl:inline">{PRIMARY_PHONE.display}</span>
      </a>

      <button
        type="button"
        onClick={() => openBooking("homepage_section_dock")}
        className="flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 px-3.5 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:from-fuchsia-500 hover:via-pink-500 hover:to-rose-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
        data-testid="nav-cta-assessment"
      >
        {CTA.primaryNavCompact}
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}

/** @deprecated Use SiteBottomBar — kept so existing homepage imports stay safe during the swap. */
export function HomepageSectionDock() {
  return null;
}
