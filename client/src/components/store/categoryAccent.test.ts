import { describe, expect, it } from "vitest";
import { categoryAccent } from "./StoreProductCard";

/**
 * Store category pills are wayfinding, so two categories sharing a hue is a
 * real defect rather than a cosmetic one. A site-wide colour sweep already
 * collapsed three of these into a single accent once; these assertions lock
 * the pre-sweep distinct tokens and fail if they collapse again.
 */
describe("store category accents", () => {
  const entries = Object.entries(categoryAccent);

  it("gives every category its own hue", () => {
    const hueOf = (token: string) => token.replace(/^text-/, "").replace(/-\d+$/, "");
    const byHue = new Map<string, string[]>();

    for (const [category, token] of entries) {
      const hue = hueOf(token);
      byHue.set(hue, [...(byHue.get(hue) ?? []), category]);
    }

    const shared = [...byHue.entries()].filter(([, categories]) => categories.length > 1);
    expect(shared).toEqual([]);
  });

  it("keeps the three pre-sweep taxonomy pills on their distinct hues", () => {
    expect(categoryAccent.comanaged_subscriptions).toBe("text-violet-300");
    expect(categoryAccent.comanaged_onboarding).toBe("text-purple-300");
    expect(categoryAccent.digital_templates).toBe("text-indigo-300");
  });

  it("keeps the accents to text tokens so pills stay pills", () => {
    const nonText = entries.filter(([, token]) => !/^text-[a-z]+-\d{3}$/.test(token));
    expect(nonText).toEqual([]);
  });
});
