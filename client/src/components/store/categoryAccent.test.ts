import { describe, expect, it } from "vitest";
import { categoryAccent } from "./StoreProductCard";

/**
 * Store category pills are wayfinding, so two categories sharing a hue is a
 * real defect rather than a cosmetic one. A site-wide colour sweep already
 * collapsed three of these into a single accent once; these assertions make
 * that fail loudly instead of shipping.
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

  it("never reaches for the retired violet chrome", () => {
    const retired = entries.filter(([, token]) => /-(violet|purple|indigo)-/.test(token));
    expect(retired).toEqual([]);
  });

  it("keeps the accents to text tokens so pills stay pills", () => {
    const nonText = entries.filter(([, token]) => !/^text-[a-z]+-\d{3}$/.test(token));
    expect(nonText).toEqual([]);
  });
});
