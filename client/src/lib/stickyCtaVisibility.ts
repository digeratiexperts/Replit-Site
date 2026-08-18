export const STICKY_CTA_SCROLL_IDLE_MS = 900;
export const STICKY_CTA_AUTO_HIDE_MS = 12_000;
export const STICKY_CTA_RESHOW_DELTA_PX = 160;
export const STICKY_CTA_FALLBACK_HEIGHT = 112;

export function isStickyCtaRouteAllowed(path: string): boolean {
  return path !== "/" && !path.startsWith("/portal");
}

export function isPastStickyCtaThreshold(scrollY: number, viewportH: number): boolean {
  return scrollY > viewportH * 0.5;
}

export function shouldShowStickyCta(input: {
  dismissed: boolean;
  routeAllowed: boolean;
  pastThreshold: boolean;
  scrolling: boolean;
  overlapping: boolean;
  autoHidden: boolean;
}): boolean {
  return (
    !input.dismissed &&
    input.routeAllowed &&
    input.pastThreshold &&
    !input.scrolling &&
    !input.overlapping &&
    !input.autoHidden
  );
}

export function isStickyCtaChrome(el: Element | null): boolean {
  if (!el) return true;
  return Boolean(
    el.closest("[data-testid='sticky-cta-bar']") ||
      el.closest(".de-bottom-bar") ||
      el.closest(".de-unified-bar") ||
      el.closest(".de-fab-rail") ||
      el.closest("[data-sticky-cta-chrome]"),
  );
}

/** Page content or a modal under the bar should park it. */
export function isBlockingStickyCtaTarget(el: Element | null): boolean {
  if (!el) return false;
  if (typeof document !== "undefined" && (el === document.documentElement || el === document.body)) {
    return false;
  }
  if (isStickyCtaChrome(el)) return false;
  return true;
}

export function samplePointsInRect(rect: DOMRect): Array<{ x: number; y: number }> {
  const y = rect.top + Math.min(24, Math.max(8, rect.height / 2));
  const inset = Math.min(48, rect.width * 0.12);
  return [
    { x: rect.left + inset, y },
    { x: rect.left + rect.width / 2, y },
    { x: rect.right - inset, y },
  ];
}

export function rectOverlapsPageContent(
  rect: Pick<DOMRect, "top" | "left" | "width" | "height" | "right">,
  elementsFromPoint: (x: number) => Element[],
): boolean {
  if (rect.width <= 0 || rect.height <= 0) return false;
  const points = samplePointsInRect(rect as DOMRect);
  const root = typeof document === "undefined" ? null : document.documentElement;
  const body = typeof document === "undefined" ? null : document.body;
  return points.some(({ x }) => {
    const stack = elementsFromPoint(x);
    const top = stack.find((el) => el !== root && el !== body);
    return isBlockingStickyCtaTarget(top ?? null);
  });
}
