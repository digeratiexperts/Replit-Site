import { useEffect } from "react";
import { pushOverlayDockLock, popOverlayDockLock } from "@/lib/overlayDock";

/**
 * Call with an overlay's `open`/`isOpen` boolean. While true, the fixed bottom
 * chrome (Ask DE launcher + scroll-to-top + unified bar) hides itself via the
 * `html[data-dock-hidden="true"]` CSS rule in index.css, so it can't render on
 * top of the overlay's own footer content. See lib/overlayDock.ts for why.
 */
export function useDockHiddenWhileOpen(open: boolean) {
  useEffect(() => {
    if (!open) return;
    pushOverlayDockLock();
    return () => popOverlayDockLock();
  }, [open]);
}
