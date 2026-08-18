import { describe, expect, it } from "vitest";
import {
  isNearDocumentEnd,
  isPageFooterOnScreen,
  isPastStickyCtaThreshold,
  isStickyCtaRouteAllowed,
  rectOverlapsPageContent,
  shouldShowStickyCta,
} from "./stickyCtaVisibility";

describe("sticky CTA visibility", () => {
  it("stays off the homepage and portal", () => {
    expect(isStickyCtaRouteAllowed("/")).toBe(false);
    expect(isStickyCtaRouteAllowed("/portal/dashboard")).toBe(false);
    expect(isStickyCtaRouteAllowed("/solutions")).toBe(true);
    expect(isStickyCtaRouteAllowed("/store")).toBe(true);
  });

  it("waits until the visitor is halfway down the first screen", () => {
    expect(isPastStickyCtaThreshold(100, 800)).toBe(false);
    expect(isPastStickyCtaThreshold(401, 800)).toBe(true);
  });

  it("hides while scrolling, overlapping, timed out, or dismissed", () => {
    const base = {
      dismissed: false,
      routeAllowed: true,
      pastThreshold: true,
      scrolling: false,
      overlapping: false,
      autoHidden: false,
    };
    expect(shouldShowStickyCta(base)).toBe(true);
    expect(shouldShowStickyCta({ ...base, scrolling: true })).toBe(false);
    expect(shouldShowStickyCta({ ...base, overlapping: true })).toBe(false);
    expect(shouldShowStickyCta({ ...base, autoHidden: true })).toBe(false);
    expect(shouldShowStickyCta({ ...base, dismissed: true })).toBe(false);
  });

  it("does not treat ordinary page copy as overlap", () => {
    const article = {
      closest: () => null,
    } as unknown as Element;
    const overlaps = rectOverlapsPageContent(
      { top: 700, left: 40, width: 1200, height: 100, right: 1240 },
      () => [article],
    );
    expect(overlaps).toBe(false);
  });

  it("parks when a dialog or cookie banner sits in the same slot", () => {
    const dialog = {
      closest: (selector: string) => (selector === "[role='dialog']" ? dialog : null),
    } as unknown as Element;
    expect(
      rectOverlapsPageContent(
        { top: 700, left: 40, width: 1200, height: 100, right: 1240 },
        () => [dialog],
      ),
    ).toBe(true);
  });

  it("parks near the document footer", () => {
    expect(isNearDocumentEnd(2200, 800, 2400)).toBe(true);
    expect(isNearDocumentEnd(400, 800, 2400)).toBe(false);
  });

  it("parks as soon as the marketing footer enters the viewport", () => {
    expect(isPageFooterOnScreen(880, 900)).toBe(true);
    expect(isPageFooterOnScreen(1200, 900)).toBe(false);
  });

  it("ignores the dock and the bar itself", () => {
    const dock = {
      closest: (selector: string) => (selector === ".de-unified-bar" ? dock : null),
    } as unknown as Element;
    const overlaps = rectOverlapsPageContent(
      { top: 700, left: 40, width: 1200, height: 100, right: 1240 },
      () => [dock],
    );
    expect(overlaps).toBe(false);
  });
});
