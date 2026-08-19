import { describe, expect, it } from "vitest";
import { parallaxTravelRange } from "@/components/visual/ParallaxStill";

describe("parallaxTravelRange", () => {
  it("holds still when the visitor prefers reduced motion", () => {
    expect(parallaxTravelRange(true, 12)).toEqual(["0%", "0%"]);
  });

  it("travels equally above and below the frame", () => {
    expect(parallaxTravelRange(false, 12)).toEqual(["-12%", "12%"]);
    expect(parallaxTravelRange(null, 8)).toEqual(["-8%", "8%"]);
  });
});
