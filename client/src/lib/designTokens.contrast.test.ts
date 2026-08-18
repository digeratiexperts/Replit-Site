import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Marketing magenta has three jobs, not one hue used everywhere:
 * fill on any field, light ink on dark, dark ink on paper.
 * Space Grotesk + Inter + Oxanium remain intentional brand roles.
 */
describe("DE magenta accent tokens", () => {
  const css = readFileSync(
    path.resolve(__dirname, "../index.css"),
    "utf8"
  );

  it("defines magenta fill, dark-ink, paper-ink, and hover tokens", () => {
    expect(css).toMatch(/--de-magenta:\s*#D3126A/i);
    expect(css).toMatch(/--de-magenta-ink:\s*#F04C97/i);
    expect(css).toMatch(/--de-magenta-paper-ink:\s*#A30E52/i);
    expect(css).toMatch(/--de-magenta-hover:\s*#e01874/i);
  });

  it("keeps muted text floors high enough for body contrast", () => {
    expect(css).toMatch(/--de-muted:\s*rgba\(255,\s*255,\s*255,\s*0\.88\)/);
    expect(css).toMatch(/--de-muted-soft:\s*rgba\(255,\s*255,\s*255,\s*0\.78\)/);
  });

  it("gives paper-ink at least 4.5:1 on paper and white without darkening the CTA fill", () => {
    const lin = (channel: number) => {
      const c = channel / 255;
      return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    const luminance = (hex: string) => {
      const n = Number.parseInt(hex.slice(1), 16);
      return 0.2126 * lin(n >> 16) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
    };
    const contrast = (a: string, b: string) => {
      const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
      return (hi + 0.05) / (lo + 0.05);
    };

    expect(contrast("#A30E52", "#f7f5f2")).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#A30E52", "#ffffff")).toBeGreaterThanOrEqual(4.5);
    expect(css).toMatch(/--de-magenta:\s*#D3126A/i);
  });
});
