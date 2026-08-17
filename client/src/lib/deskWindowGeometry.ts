/** Layout math for the DE Desk floating window. Viewport values are injected so tests stay deterministic. */

export const DESK_WINDOW_PAD = 12;
export const DESK_MIN_W = 360;
export const DESK_MIN_H = 440;
export const DESK_MAX_W = 720;
export const DESK_TITLE_KEEP = 56;

export type DeskViewport = {
  width: number;
  height: number;
  gutter: number;
  navBottom: number;
  cookieH: number;
};

export type DeskWindowSize = { w: number; h: number };
export type DeskWindowPos = { x: number; y: number };

export function deskSizeBounds(view: DeskViewport): {
  minW: number;
  minH: number;
  maxW: number;
  maxH: number;
} {
  const maxW = Math.max(
    280,
    Math.min(DESK_MAX_W, view.width - view.gutter * 2 - DESK_WINDOW_PAD * 2),
  );
  const maxH = Math.max(
    320,
    view.height - view.navBottom - view.cookieH - DESK_WINDOW_PAD * 2,
  );
  return {
    minW: Math.min(DESK_MIN_W, maxW),
    minH: Math.min(DESK_MIN_H, maxH),
    maxW,
    maxH,
  };
}

export function clampDeskSize(w: number, h: number, view: DeskViewport): DeskWindowSize {
  const b = deskSizeBounds(view);
  return {
    w: Math.min(Math.max(Math.round(w), b.minW), b.maxW),
    h: Math.min(Math.max(Math.round(h), b.minH), b.maxH),
  };
}

export function clampDeskPos(x: number, y: number, width: number, view: DeskViewport): DeskWindowPos {
  const minX = view.gutter + DESK_WINDOW_PAD;
  const maxX = Math.max(minX, view.width - view.gutter - width - DESK_WINDOW_PAD);
  const minY = view.navBottom + DESK_WINDOW_PAD;
  const maxY = Math.max(minY, view.height - DESK_TITLE_KEEP - view.cookieH - DESK_WINDOW_PAD);
  return {
    x: Math.min(Math.max(x, minX), maxX),
    y: Math.min(Math.max(y, minY), maxY),
  };
}

/**
 * Grow/shrink from the south-east corner. If the new size would overflow the
 * right or bottom edge, shift the window up/left so a docked Desk can still
 * get larger.
 */
export function resizeDeskFromSouthEast(
  start: DeskWindowPos & DeskWindowSize,
  delta: { dx: number; dy: number },
  view: DeskViewport,
): DeskWindowPos & DeskWindowSize {
  const size = clampDeskSize(start.w + delta.dx, start.h + delta.dy, view);
  const maxRight = view.width - view.gutter - DESK_WINDOW_PAD;
  const maxBottom = view.height - view.cookieH - DESK_WINDOW_PAD;
  let x = start.x;
  let y = start.y;
  if (x + size.w > maxRight) x = maxRight - size.w;
  if (y + size.h > maxBottom) y = maxBottom - size.h;
  const pos = clampDeskPos(x, y, size.w, view);
  return { ...pos, ...size };
}
