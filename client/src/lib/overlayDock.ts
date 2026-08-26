/**
 * Coordinates the fixed bottom chrome (Ask DE launcher, scroll-to-top, unified
 * bar, sticky CTA) so it hides itself while a full-screen overlay (shopping
 * cart drawer, configure-product drawer, etc.) is open.
 *
 * Root cause: those overlays animate with Framer Motion (`animate={{ x, height }}`),
 * which puts a live `transform` on the drawer's own DOM node. A CSS `transform`
 * other than `none` creates a new stacking context, so the drawer's z-index only
 * wins against siblings *inside that same local context* — it can't out-rank the
 * bottom-chrome elements, which live in the true root stacking context untouched
 * by any transform. Numerically raising the drawer's z-index cannot fix that; the
 * chrome has to get out of the way instead. A simple counter (rather than a plain
 * boolean) lets multiple overlays be open at once (e.g. Configure opened from
 * inside the cart) without one closing early and re-showing the dock underneath
 * the other.
 */
let lockCount = 0;

function applyLockState() {
  if (lockCount > 0) {
    document.documentElement.dataset.dockHidden = "true";
  } else {
    delete document.documentElement.dataset.dockHidden;
  }
}

export function pushOverlayDockLock() {
  lockCount += 1;
  applyLockState();
}

export function popOverlayDockLock() {
  lockCount = Math.max(0, lockCount - 1);
  applyLockState();
}
