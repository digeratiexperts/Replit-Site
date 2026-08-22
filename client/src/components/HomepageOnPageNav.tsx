import { useEffect, useRef } from "react";
import { useOptionalFullPageScroll } from "@/components/FullPageScroll";

const ON_PAGE_IDS = new Set([
  "hero",
  "stats",
  "services",
  "pricing",
  "industries",
  "contact",
]);

/**
 * Homepage-only slim scroll spy under MegaMenu.
 * MegaMenu remains the only full nav; this row only jumps in-page sections.
 */
export function HomepageOnPageNav() {
  const ctx = useOptionalFullPageScroll();
  const rootRef = useRef<HTMLElement>(null);
  const sections = ctx?.sections ?? [];
  const currentSection = ctx?.currentSection ?? 0;
  const scrollToSection = ctx?.scrollToSection;
  const items = sections
    .map((section, index) => ({ section, index }))
    .filter(({ section }) => ON_PAGE_IDS.has(section.id) && section.showInNav !== false);

  const activeIndex = (() => {
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
  })();

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

  const goTo = (index: number) => {
    scrollToSection?.(index);
  };

  return (
    <nav
      ref={rootRef}
      aria-label="On this page"
      data-testid="homepage-section-spy"
      className="hidden border-t border-white/[0.08] bg-black/90 max-lg:!hidden lg:block"
    >
      <div className="mx-auto flex max-w-[var(--de-canvas)] items-stretch px-2 sm:px-3 xl:px-5">
        <ul className="flex w-full min-h-9 items-stretch justify-start overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] lg:justify-center [&::-webkit-scrollbar]:hidden">
          {items.map(({ section, index }) => {
            const isActive = activeIndex === index;
            return (
              <li key={section.id} className="flex min-w-0 flex-1 justify-center lg:flex-none">
                <a
                  href={`#${section.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    goTo(index);
                  }}
                  className={`group relative inline-flex min-h-9 w-full items-center justify-center px-1 py-1.5 text-xs font-semibold tracking-wide whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-de-accent focus-visible:ring-inset sm:px-2 sm:text-sm lg:min-h-8 lg:w-auto lg:px-3.5 ${
                    isActive
                      ? "text-white"
                      : "text-de-muted-soft hover:text-white"
                  }`}
                  aria-current={isActive ? "location" : undefined}
                  data-testid={`nav-dot-${section.id}`}
                >
                  {section.label}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-1 bottom-0 h-0.5 rounded-full transition-opacity lg:inset-x-2 ${
                      isActive
                        ? "bg-[#D3126A] opacity-100"
                        : "bg-white/45 opacity-0 group-hover:opacity-70 group-focus-visible:opacity-70"
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
