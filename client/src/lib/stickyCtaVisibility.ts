export const STICKY_CTA_SCROLL_IDLE_MS = 900;
export const STICKY_CTA_AUTO_HIDE_MS = 12_000;
export const STICKY_CTA_RESHOW_DELTA_PX = 160;
export const STICKY_CTA_FALLBACK_HEIGHT = 112;
export const STICKY_CTA_END_RESERVE_PX = 160;

const COMPETING_CHROME_SELECTORS = [
  "[data-testid='sticky-cta-bar']",
  ".de-bottom-bar",
  ".de-unified-bar",
  ".de-fab-rail",
  "[data-sticky-cta-chrome]",
];

const BLOCKING_OVERLAY_SELECTORS = [
  "[role='dialog']",
  "[aria-modal='true']",
  "[data-radix-dialog-content]",
  "[data-radix-dialog-overlay]",
  "[data-testid='cookie-consent-banner']",
  ".de-desk-shell",
];

export function isStickyCtaRouteAllowed(path: string): boolean {
  return path !== "/" && !path.startsWith("/portal");
}

export function isPastStickyCtaThreshold(scrollY: number, viewportH: number): boolean {
  return scrollY > viewportH * 0.5;
}

/** Park the bar when the visitor is on the page footer so links stay clickable. */
export function isNearDocumentEnd(
  scrollY: number,
  viewportH: number,
  scrollHeight: number,
  reservePx = STICKY_CTA_END_RESERVE_PX,
): boolean {
  return scrollY + viewportH >= scrollHeight - reservePx;
}

/** True once a marketing footer has entered the viewport — not only at the last 160px. */
export function isPageFooterOnScreen(footerTop: number, viewportH: number): boolean {
  return Number.isFinite(footerTop) && footerTop < viewportH;
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
  return COMPETING_CHROME_SELECTORS.some((selector) => el.closest(selector));
}

/** Dialogs, drawers, cookie, and Desk occupy the same dock — page copy does not. */
export function isBlockingStickyCtaTarget(el: Element | null): boolean {
  if (!el) return false;
  if (typeof document !== "undefined" && (el === document.documentElement || el === document.body)) {
    return false;
  }
  if (isStickyCtaChrome(el)) return false;
  return BLOCKING_OVERLAY_SELECTORS.some((selector) => el.closest(selector));
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
    return stack.some((el) => {
      if (el === root || el === body) return false;
      return isBlockingStickyCtaTarget(el);
    });
  });
}
