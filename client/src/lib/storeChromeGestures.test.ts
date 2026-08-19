import { describe, expect, it } from "vitest";
import {
  isHorizontalDominantDelta,
  isStorePath,
  isTraverseNavigateEvent,
  shouldInterceptTraverse,
} from "./storeChromeGestures";

describe("store chrome gestures", () => {
  it("locks only store routes", () => {
    expect(isStorePath("/store")).toBe(true);
    expect(isStorePath("/store/managed")).toBe(true);
    expect(isStorePath("/store/product/de-proactive-office")).toBe(true);
    expect(isStorePath("/")).toBe(false);
    expect(isStorePath("/solutions/managed-it-support")).toBe(false);
    expect(isStorePath("/storage")).toBe(false);
  });

  it("treats trackpad swipe as horizontal only when X dominates", () => {
    expect(isHorizontalDominantDelta(40, 8)).toBe(true);
    expect(isHorizontalDominantDelta(-28, 4)).toBe(true);
    expect(isHorizontalDominantDelta(2, 24)).toBe(false);
    expect(isHorizontalDominantDelta(0, 12)).toBe(false);
    expect(isHorizontalDominantDelta(0.4, 0.1)).toBe(false);
  });

  it("intercepts history traverse only right after a horizontal gesture", () => {
    expect(shouldInterceptTraverse(1000, 800)).toBe(true);
    expect(shouldInterceptTraverse(1000, 549)).toBe(false);
    expect(shouldInterceptTraverse(1000, 0)).toBe(false);
  });

  it("recognizes Navigation API traverse events", () => {
    expect(isTraverseNavigateEvent(new Event("navigate"))).toBe(false);
    const traverse = new Event("navigate") as Event & { navigationType: string };
    Object.assign(traverse, { navigationType: "traverse" });
    expect(isTraverseNavigateEvent(traverse)).toBe(true);
  });
});
