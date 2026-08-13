import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

export type WindowPos = { x: number; y: number };

const PAD = 12;
const TITLE_KEEP = 56;

function parseCssPx(value: string): number {
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : 0;
}

function canvasGutterPx(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--de-canvas").trim();
  const rootFont = parseCssPx(getComputedStyle(document.documentElement).fontSize) || 14;
  let canvasPx = window.innerWidth;
  if (raw.endsWith("rem")) canvasPx = parseFloat(raw) * rootFont;
  else if (raw.endsWith("px")) canvasPx = parseFloat(raw);
  return Math.max(0, (window.innerWidth - Math.min(window.innerWidth, canvasPx)) / 2);
}

function clampPos(x: number, y: number, width: number): WindowPos {
  const navBottom =
    parseCssPx(
      getComputedStyle(document.documentElement).getPropertyValue("--de-nav-current-bottom")
    ) || 72;
  const cookieH = parseCssPx(
    getComputedStyle(document.documentElement).getPropertyValue("--de-cookie-h")
  );
  const gutter = canvasGutterPx();
  const minX = gutter + PAD;
  const maxX = Math.max(minX, window.innerWidth - gutter - width - PAD);
  const minY = navBottom + PAD;
  const maxY = Math.max(minY, window.innerHeight - TITLE_KEEP - cookieH - PAD);
  return {
    x: Math.min(Math.max(x, minX), maxX),
    y: Math.min(Math.max(y, minY), maxY),
  };
}

export function useDraggableWindow(options: {
  enabled: boolean;
  open: boolean;
  storageKey: string;
}) {
  const { enabled, open, storageKey } = options;
  const panelRef = useRef<HTMLElement | null>(null);
  const [pos, setPos] = useState<WindowPos | null>(null);
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0,
  });

  const measureAndClamp = useCallback((x: number, y: number) => {
    const el = panelRef.current;
    const width = el?.offsetWidth ?? 460;
    return clampPos(x, y, width);
  }, []);

  useEffect(() => {
    if (!open || !enabled) return;
    try {
      const raw = sessionStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as WindowPos;
      if (typeof parsed.x === "number" && typeof parsed.y === "number") {
        setPos(measureAndClamp(parsed.x, parsed.y));
      }
    } catch {
      /* ignore */
    }
  }, [open, enabled, storageKey, measureAndClamp]);

  useEffect(() => {
    if (!open || !pos) return;
    const onResize = () => setPos((current) => (current ? measureAndClamp(current.x, current.y) : current));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open, pos, measureAndClamp]);

  const persist = (next: WindowPos) => {
    setPos(next);
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const reset = useCallback(() => {
    setPos(null);
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
    }
  }, [storageKey]);

  const onHandlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (!enabled) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const el = panelRef.current;
    if (!el) return;
    event.preventDefault();

    const rect = el.getBoundingClientRect();
    const start = measureAndClamp(rect.left, rect.top);
    el.style.left = `${start.x}px`;
    el.style.top = `${start.y}px`;
    el.style.right = "auto";
    el.style.bottom = "auto";
    setPos(start);

    dragRef.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      origX: start.x,
      origY: start.y,
    };
    setDragging(true);
    document.body.style.userSelect = "none";

    const onMove = (moveEvent: PointerEvent) => {
      if (!dragRef.current.active) return;
      const { startX, startY, origX, origY } = dragRef.current;
      const next = measureAndClamp(
        origX + moveEvent.clientX - startX,
        origY + moveEvent.clientY - startY
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
      persist(measureAndClamp(box.left, box.top));
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  };

  return {
    panelRef,
    pos,
    dragging,
    reset,
    onHandlePointerDown,
  };
}
