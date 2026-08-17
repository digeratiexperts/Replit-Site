import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import {
  clampDeskPos,
  clampDeskSize,
  resizeDeskFromSouthEast,
  type DeskViewport,
  type DeskWindowPos,
  type DeskWindowSize,
} from "@/lib/deskWindowGeometry";

export type WindowPos = DeskWindowPos;

function parseCssPx(value: string): number {
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : 0;
}

function canvasGutterPx(): number {
  const gutter = parseCssPx(
    getComputedStyle(document.documentElement).getPropertyValue("--de-canvas-gutter"),
  );
  if (gutter > 0) return gutter;
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--de-canvas").trim();
  const rootFont = parseCssPx(getComputedStyle(document.documentElement).fontSize) || 14;
  let canvasPx = window.innerWidth;
  if (raw.endsWith("rem")) canvasPx = parseFloat(raw) * rootFont;
  else if (raw.endsWith("px")) canvasPx = parseFloat(raw);
  return Math.max(0, (window.innerWidth - Math.min(window.innerWidth, canvasPx)) / 2);
}

function readViewport(): DeskViewport {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    gutter: canvasGutterPx(),
    navBottom:
      parseCssPx(
        getComputedStyle(document.documentElement).getPropertyValue("--de-nav-current-bottom"),
      ) || 72,
    cookieH: parseCssPx(
      getComputedStyle(document.documentElement).getPropertyValue("--de-cookie-h"),
    ),
  };
}

type StoredLayout = {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
};

export function useDraggableWindow(options: {
  enabled: boolean;
  open: boolean;
  storageKey: string;
}) {
  const { enabled, open, storageKey } = options;
  const panelRef = useRef<HTMLElement | null>(null);
  const [pos, setPos] = useState<DeskWindowPos | null>(null);
  const [size, setSize] = useState<DeskWindowSize | null>(null);
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const sizeRef = useRef<DeskWindowSize | null>(null);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0,
  });
  const resizeRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0,
    origW: 0,
    origH: 0,
  });

  const measureAndClamp = useCallback((x: number, y: number) => {
    const el = panelRef.current;
    const width = el?.offsetWidth ?? 410;
    return clampDeskPos(x, y, width, readViewport());
  }, []);

  const persist = (nextPos: DeskWindowPos | null, nextSize: DeskWindowSize | null) => {
    if (nextPos) setPos(nextPos);
    if (nextSize) {
      sizeRef.current = nextSize;
      setSize(nextSize);
    }
    try {
      const payload: StoredLayout = {
        ...(nextPos ?? pos ?? {}),
        ...(nextSize ?? size ?? {}),
      };
      if (
        typeof payload.x === "number" ||
        typeof payload.y === "number" ||
        typeof payload.w === "number" ||
        typeof payload.h === "number"
      ) {
        sessionStorage.setItem(storageKey, JSON.stringify(payload));
      }
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    if (!open || !enabled) return;
    try {
      const raw = sessionStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as StoredLayout;
      if (typeof parsed.x === "number" && typeof parsed.y === "number") {
        setPos(measureAndClamp(parsed.x, parsed.y));
      }
      if (typeof parsed.w === "number" && typeof parsed.h === "number") {
        const nextSize = clampDeskSize(parsed.w, parsed.h, readViewport());
        sizeRef.current = nextSize;
        setSize(nextSize);
      }
    } catch {
      /* ignore */
    }
  }, [open, enabled, storageKey, measureAndClamp]);

  useEffect(() => {
    if (!open || (!pos && !size)) return;
    const onResize = () => {
      const view = readViewport();
      setPos((current) => (current ? clampDeskPos(current.x, current.y, size?.w ?? panelRef.current?.offsetWidth ?? 410, view) : current));
      setSize((current) => (current ? clampDeskSize(current.w, current.h, view) : current));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open, pos, size]);

  const reset = useCallback(() => {
    setPos(null);
    sizeRef.current = null;
    setSize(null);
    try {
      sessionStorage.removeItem(storageKey);
    } catch {
      /* ignore */
    }
    const el = panelRef.current;
    if (el) {
      el.style.left = "";
      el.style.top = "";
      el.style.right = "";
      el.style.bottom = "";
      el.style.width = "";
      el.style.height = "";
    }
  }, [storageKey]);

  const pinCurrentRect = () => {
    const el = panelRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const start = measureAndClamp(rect.left, rect.top);
    const nextSize = clampDeskSize(rect.width, rect.height, readViewport());
    el.style.left = `${start.x}px`;
    el.style.top = `${start.y}px`;
    el.style.right = "auto";
    el.style.bottom = "auto";
    el.style.width = `${nextSize.w}px`;
    el.style.height = `${nextSize.h}px`;
    setPos(start);
    sizeRef.current = nextSize;
    setSize(nextSize);
    return { ...start, ...nextSize };
  };

  const onHandlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (!enabled) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const el = panelRef.current;
    if (!el) return;
    event.preventDefault();

    const pinned = pinCurrentRect();
    if (!pinned) return;

    dragRef.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      origX: pinned.x,
      origY: pinned.y,
    };
    setDragging(true);
    document.body.style.userSelect = "none";

    const onMove = (moveEvent: PointerEvent) => {
      if (!dragRef.current.active) return;
      const { startX, startY, origX, origY } = dragRef.current;
      const next = measureAndClamp(
        origX + moveEvent.clientX - startX,
        origY + moveEvent.clientY - startY,
      );
      el.style.left = `${next.x}px`;
      el.style.top = `${next.y}px`;
    };

    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      if (!dragRef.current.active) return;
      dragRef.current.active = false;
      document.body.style.userSelect = "";
      setDragging(false);
      const box = el.getBoundingClientRect();
      persist(measureAndClamp(box.left, box.top), sizeRef.current);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  };

  const onResizePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (!enabled) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const el = panelRef.current;
    if (!el) return;
    event.preventDefault();
    event.stopPropagation();

    const pinned = pinCurrentRect();
    if (!pinned) return;

    resizeRef.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      origX: pinned.x,
      origY: pinned.y,
      origW: pinned.w,
      origH: pinned.h,
    };
    setResizing(true);
    document.body.style.userSelect = "none";
    document.body.style.cursor = "nwse-resize";

    const onMove = (moveEvent: PointerEvent) => {
      if (!resizeRef.current.active) return;
      const { startX, startY, origX, origY, origW, origH } = resizeRef.current;
      const next = resizeDeskFromSouthEast(
        { x: origX, y: origY, w: origW, h: origH },
        { dx: moveEvent.clientX - startX, dy: moveEvent.clientY - startY },
        readViewport(),
      );
      el.style.left = `${next.x}px`;
      el.style.top = `${next.y}px`;
      el.style.width = `${next.w}px`;
      el.style.height = `${next.h}px`;
    };

    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      if (!resizeRef.current.active) return;
      resizeRef.current.active = false;
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
      setResizing(false);
      const box = el.getBoundingClientRect();
      const view = readViewport();
      persist(
        clampDeskPos(box.left, box.top, box.width, view),
        clampDeskSize(box.width, box.height, view),
      );
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  };

  return {
    panelRef,
    pos,
    size,
    dragging,
    resizing,
    reset,
    onHandlePointerDown,
    onResizePointerDown,
  };
}
