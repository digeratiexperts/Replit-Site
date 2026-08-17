import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Talos asked to consolidate pink variants. DE keeps exactly two marketing
 * magenta tokens: fill (#D3126A) and ink (#F04C97). Space Grotesk + Inter +
 * Oxanium remain intentional brand roles — not “extra display fonts” to remove.
 */
describe("DE magenta accent tokens", () => {
  const css = readFileSync(
    path.resolve(__dirname, "../index.css"),
    "utf8"
  );

  it("defines magenta fill, ink, and hover tokens", () => {
    expect(css).toMatch(/--de-magenta:\s*#D3126A/i);
    expect(css).toMatch(/--de-magenta-ink:\s*#F04C97/i);
    expect(css).toMatch(/--de-magenta-hover:\s*#e01874/i);
  });

  it("keeps muted text floors high enough for body contrast", () => {
    expect(css).toMatch(/--de-muted:\s*rgba\(255,\s*255,\s*255,\s*0\.88\)/);
    expect(css).toMatch(/--de-muted-soft:\s*rgba\(255,\s*255,\s*255,\s*0\.78\)/);
  });
});
