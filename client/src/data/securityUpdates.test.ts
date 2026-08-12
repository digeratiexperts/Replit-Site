import { describe, expect, it } from "vitest";
import {
  getHomepageRecentThreats,
  HOMEPAGE_MAX_AGE_DAYS,
  isFreshUpdate,
  securityUpdates,
} from "./securityUpdates";

describe("securityUpdates freshness", () => {
  it("sorts and filters homepage threats within the freshness window", () => {
    const now = new Date("2026-01-20T12:00:00Z");
    const recent = getHomepageRecentThreats(3, HOMEPAGE_MAX_AGE_DAYS, now);
    expect(recent.length).toBeGreaterThan(0);
    expect(recent.length).toBeLessThanOrEqual(3);
    for (const item of recent) {
      expect(isFreshUpdate(item, HOMEPAGE_MAX_AGE_DAYS, now)).toBe(true);
    }
    // newest first
    for (let i = 1; i < recent.length; i++) {
      expect(recent[i - 1].date >= recent[i].date).toBe(true);
    }
  });

  it("returns empty homepage set when all items are stale (no fake backfill)", () => {
    const now = new Date("2026-08-12T12:00:00Z");
    const recent = getHomepageRecentThreats(3, HOMEPAGE_MAX_AGE_DAYS, now);
    expect(recent).toEqual([]);
  });

  it("keeps full archive available regardless of homepage freshness", () => {
    expect(securityUpdates.length).toBeGreaterThanOrEqual(5);
    for (const u of securityUpdates) {
      expect(u.sourceUrl).toMatch(/^https:\/\//);
      expect(u.sourceName.length).toBeGreaterThan(0);
      expect(u.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});
