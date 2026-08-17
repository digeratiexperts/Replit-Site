import { describe, expect, it } from "vitest";
import { catalogSearchHasDeepLink } from "./CoManagedStore";

describe("catalogSearchHasDeepLink", () => {
  it("is false for an unfiltered catalog", () => {
    expect(catalogSearchHasDeepLink("")).toBe(false);
    expect(catalogSearchHasDeepLink("?")).toBe(false);
  });

  it("is true when an outcome or other catalog filter is present", () => {
    expect(catalogSearchHasDeepLink("?outcome=protect")).toBe(true);
    expect(catalogSearchHasDeepLink("?category=comanaged_subscriptions")).toBe(true);
    expect(catalogSearchHasDeepLink("?q=endpoint")).toBe(true);
    expect(catalogSearchHasDeepLink("?vendor=Coro")).toBe(true);
  });

  it("ignores unknown outcome ids", () => {
    expect(catalogSearchHasDeepLink("?outcome=not-a-real-outcome")).toBe(false);
  });
});
