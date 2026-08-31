/**
 * Ref-counted body scroll lock.
 *
 * The naive capture-and-restore pattern (`prev = body.style.overflow; ... ;
 * body.style.overflow = prev`) deadlocks when two overlays interleave: if A
 * locks, B locks (capturing "hidden"), and both unlock in the same batched
 * commit in the wrong order, B restores the stale "hidden" and the page can
 * never scroll again (adversarial-review finding F5, 2026-08-31: MegaMenu
 * mobile menu + Desk fullscreen both closing on one Escape at 640–1023px).
 *
 * This helper counts lockers instead: overflow is set to "hidden" while at
 * least one lock is held and cleared only when the last lock releases. Calling
 * the returned release function twice is safe (idempotent). It also clears a
 * stray "hidden" left by an interleaved capture/restore locker when the count
 * reaches zero, which is what un-deadlocks the MegaMenu interleaving.
 */

let lockCount = 0;

export function acquireBodyScrollLock(): () => void {
  lockCount += 1;
  document.body.style.overflow = "hidden";

  let released = false;
  return () => {
    if (released) return;
    released = true;
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0 && document.body.style.overflow === "hidden") {
      document.body.style.overflow = "";
    }
  };
}
