import { useEffect, useRef, useState } from "react";
import { ChevronDown, Shield } from "lucide-react";
import { useOptionalFullPageScroll } from "@/components/FullPageScroll";

const ON_PAGE_IDS = new Set([
  "hero",
  "stats",
  "services",
  "pricing",
  "industries",
  "contact",
]);

interface HomepageOnPageNavProps {
  variant: "desktop" | "mobile";
  onOpen?: () => void;
  onNavigate?: () => void;
}

/**
 * Homepage-only section jumps, folded into MegaMenu chrome.
 * Replaces the floating bottom dock so primary nav stays a single layer.
 */
export function HomepageOnPageNav({
  variant,
  onOpen,
  onNavigate,
}: HomepageOnPageNavProps) {
  const ctx = useOptionalFullPageScroll();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
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
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const goTo = (index: number) => {
    setOpen(false);
    onNavigate?.();
    scrollToSection?.(index);
  };

  if (!ctx) return null;

  if (variant === "mobile") {
    return (
      <nav aria-label="On this page" className="mb-4 pb-4 border-b border-white/10">
        <p className="flex items-center gap-2 px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-white/45">
          <Shield className="w-3.5 h-3.5 text-[#FF477F]" aria-hidden="true" />
          Protected?
        </p>
        <p className="px-4 mb-3 text-sm text-white/55">On this page</p>
        <div className="flex flex-col">
          {items.map(({ section, index }) => {
            const isActive = activeIndex === index;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  goTo(index);
                }}
                className={`flex min-h-11 items-center px-4 py-3 text-base font-semibold rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
                aria-current={isActive ? "true" : undefined}
                data-testid={`nav-dot-${section.id}`}
              >
                {section.label}
              </a>
            );
          })}
        </div>
      </nav>
    );
  }

  return (
    <div className="relative hidden lg:block" ref={rootRef}>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-white/80 hover:text-white rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="On this page"
        data-testid="nav-on-this-page"
        onClick={() => {
          setOpen((prev) => {
            const next = !prev;
            if (next) onOpen?.();
            return next;
          });
        }}
      >
        <Shield className="w-3.5 h-3.5 text-[#FF477F]" aria-hidden="true" />
        <span>Protected?</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div
          role="menu"
          aria-label="On this page"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-[70] min-w-[13.5rem] rounded-xl border border-white/12 bg-[#0a0a0a] p-2 shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
        >
          <p className="px-3 pt-1.5 pb-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">
            On this page
          </p>
          {items.map(({ section, index }) => {
            const isActive = activeIndex === index;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                role="menuitem"
                onClick={(event) => {
                  event.preventDefault();
                  goTo(index);
                }}
                className={`flex min-h-11 items-center px-3 py-2 text-sm font-semibold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                  isActive
                    ? "bg-[#D3126A] text-white"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                aria-current={isActive ? "true" : undefined}
                data-testid={`nav-dot-${section.id}`}
              >
                {section.label}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
