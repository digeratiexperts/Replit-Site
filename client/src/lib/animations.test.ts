import { describe, expect, it } from "vitest";
import {
  cardHover,
  fadeInUp,
  revealInitial,
  revealTransition,
  revealViewport,
  staggerContainer,
} from "./animations";

describe("marketing reveal motion", () => {
  it("triggers before the element is centered", () => {
    expect(revealViewport.once).toBe(true);
    expect(revealViewport.amount).toBeLessThan(0.2);
    expect(revealViewport.margin).toMatch(/220px/);
  });

  it("keeps travel short and content readable during the reveal", () => {
    expect(revealInitial.y).toBeLessThanOrEqual(16);
    expect(revealInitial.opacity).toBeGreaterThanOrEqual(0.4);
    expect(fadeInUp.transition.duration).toBeLessThanOrEqual(0.4);
    expect(revealTransition.duration).toBeLessThanOrEqual(0.4);
  });

  it("staggers in short steps", () => {
    expect(staggerContainer.animate.transition.staggerChildren).toBeLessThanOrEqual(0.06);
  });

  it("does not scale cards on hover", () => {
    expect("scale" in cardHover.hover).toBe(false);
    expect(cardHover.hover.y).toBeGreaterThanOrEqual(-4);
    expect(cardHover.hover.y).toBeLessThan(0);
  });
});
