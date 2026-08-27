import { useEffect, useRef } from "react";
import { useOptionalFullPageScroll } from "@/components/FullPageScroll";

/** Homepage chapters in the thin top table of contents. */
const TOP_CHAPTERS = new Set([
  "hero",
  "stats",
  "services",
  "pricing",
  "industries",
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
 * Desktop secondary row only — never inside the compact logo bar below lg.
 * Mobile/tablet jumps live in the MegaMenu drawer.
 *
 * This is the only homepage section-jump surface. A second, floating
 * version used to also live in the bottom chrome (SiteBottomBar); it was
 * removed as a duplicate that caused real overlap bugs — see the comment
 * in SiteBottomBar.tsx.
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
      className="hidden border-t border-white/[0.08] bg-black/90 max-lg:!hidden lg:block"
    >
      <div className="mx-auto flex max-w-[var(--de-canvas)] items-stretch px-2 sm:px-3 xl:px-5">
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
                  className={`relative inline-flex min-h-9 items-center justify-center px-2.5 py-1.5 text-base font-semibold tracking-wide whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-de-accent focus-visible:ring-inset sm:px-3 md:px-1.5 lg:min-h-9 lg:w-auto lg:px-2 ${
                    isActive ? "text-white" : "text-de-muted-soft hover:text-white"
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
