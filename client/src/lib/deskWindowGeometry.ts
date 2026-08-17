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
export type DeskResizeEdge = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

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

function deskMaxRight(view: DeskViewport): number {
  return view.width - view.gutter - DESK_WINDOW_PAD;
}

function deskMaxBottom(view: DeskViewport): number {
  return view.height - view.cookieH - DESK_WINDOW_PAD;
}

/**
 * Grow/shrink from a window edge or corner. West/north pulls keep the opposite
 * edge planted so a bottom-right docked Desk can expand toward the page.
 * East/south growth that would overflow shifts the window up/left.
 */
export function resizeDeskFromEdge(
  start: DeskWindowPos & DeskWindowSize,
  delta: { dx: number; dy: number },
  edge: DeskResizeEdge,
  view: DeskViewport,
): DeskWindowPos & DeskWindowSize {
  const fromW = edge.includes("w");
  const fromE = edge.includes("e");
  const fromN = edge.includes("n");
  const fromS = edge.includes("s");

  let nextW = start.w;
  let nextH = start.h;
  if (fromE) nextW = start.w + delta.dx;
  if (fromW) nextW = start.w - delta.dx;
  if (fromS) nextH = start.h + delta.dy;
  if (fromN) nextH = start.h - delta.dy;

  const size = clampDeskSize(nextW, nextH, view);
  let x = fromW ? start.x + start.w - size.w : start.x;
  let y = fromN ? start.y + start.h - size.h : start.y;
  if (x + size.w > deskMaxRight(view)) x = deskMaxRight(view) - size.w;
  if (y + size.h > deskMaxBottom(view)) y = deskMaxBottom(view) - size.h;
  const pos = clampDeskPos(x, y, size.w, view);
  return { ...pos, ...size };
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
  return resizeDeskFromEdge(start, delta, "se", view);
}

/** Grow to the largest on-screen size while keeping the bottom-right planted. */
export function expandDeskWindow(
  start: DeskWindowPos & DeskWindowSize,
  view: DeskViewport,
): DeskWindowPos & DeskWindowSize {
  const b = deskSizeBounds(view);
  return resizeDeskFromEdge(start, { dx: b.maxW - start.w, dy: b.maxH - start.h }, "se", view);
}

export function isDeskExpanded(size: DeskWindowSize, view: DeskViewport): boolean {
  const b = deskSizeBounds(view);
  return size.w >= b.maxW - 16 && size.h >= b.maxH - 16;
}
