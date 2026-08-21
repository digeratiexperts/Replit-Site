import { describe, expect, it } from "vitest";
import { coverageRowIsUniform, isTierLit } from "./proactiveCoverage";

describe("proactiveCoverage", () => {
  it("lights progressive layers up to the selected tier", () => {
    expect(isTierLit("business", "it")).toBe(true);
    expect(isTierLit("business", "office")).toBe(true);
    expect(isTierLit("business", "business")).toBe(true);
    expect(isTierLit("business", "enterprise")).toBe(false);
  });

  it("treats identical matrix cells as non-differences", () => {
    expect(coverageRowIsUniform([true, true, true, true])).toBe(true);
    expect(coverageRowIsUniform(["addon", "addon", "addon", "addon"])).toBe(true);
    expect(coverageRowIsUniform([false, true, true, true])).toBe(false);
  });
});
