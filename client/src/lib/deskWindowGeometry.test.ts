import { describe, expect, it } from "vitest";
import {
  clampDeskSize,
  expandDeskWindow,
  resizeDeskFromEdge,
  resizeDeskFromSouthEast,
} from "./deskWindowGeometry";

const view = {
  width: 1440,
  height: 900,
  gutter: 24,
  navBottom: 72,
  cookieH: 0,
};

describe("deskWindowGeometry", () => {
  it("clamps size between the usable min and max", () => {
    expect(clampDeskSize(100, 100, view)).toEqual({ w: 360, h: 440 });
    expect(clampDeskSize(2000, 2000, view)).toEqual({ w: 720, h: 804 });
  });

  it("grows a bottom-right docked window up and left", () => {
    const docked = { x: 994, y: 168, w: 410, h: 720 };
    const next = resizeDeskFromSouthEast(docked, { dx: 200, dy: 200 }, view);
    expect(next.w).toBeGreaterThan(docked.w);
    expect(next.h).toBeGreaterThan(docked.h);
    expect(next.x + next.w).toBeLessThanOrEqual(1440 - 24 - 12);
    expect(next.y + next.h).toBeLessThanOrEqual(900 - 12);
    expect(next.x).toBeLessThan(docked.x);
  });

  it("shrinks from the south-east corner without leaving the canvas", () => {
    const mid = { x: 400, y: 120, w: 520, h: 600 };
    const next = resizeDeskFromSouthEast(mid, { dx: -80, dy: -60 }, view);
    expect(next.w).toBe(440);
    expect(next.h).toBe(540);
    expect(next.x).toBe(400);
    expect(next.y).toBe(120);
  });

  it("grows a docked window when the west or north edge is pulled toward the page", () => {
    const docked = { x: 994, y: 168, w: 410, h: 720 };
    const fromWest = resizeDeskFromEdge(docked, { dx: -180, dy: 0 }, "w", view);
    expect(fromWest.w).toBe(590);
    expect(fromWest.x).toBe(814);
    expect(fromWest.x + fromWest.w).toBe(docked.x + docked.w);

    const fromNorth = resizeDeskFromEdge(docked, { dx: 0, dy: -80 }, "n", view);
    expect(fromNorth.h).toBe(800);
    expect(fromNorth.y).toBeLessThan(docked.y);
    expect(fromNorth.y + fromNorth.h).toBe(docked.y + docked.h);
  });

  it("expands a docked window to the max on-screen size", () => {
    const docked = { x: 994, y: 168, w: 410, h: 720 };
    const next = expandDeskWindow(docked, view);
    expect(next.w).toBe(720);
    expect(next.h).toBe(804);
    expect(next.x + next.w).toBeLessThanOrEqual(1440 - 24 - 12);
    expect(next.y + next.h).toBeLessThanOrEqual(900 - 12);
  });
});
