import { describe, expect, it } from "vitest";
import { GREATER_PHOENIX_CITIES, cityPageSlug } from "./greaterPhoenixCities";

describe("GREATER_PHOENIX_CITIES", () => {
  it("keeps the six Greater Phoenix city homepage routes", () => {
    expect(GREATER_PHOENIX_CITIES.map((city) => city.href)).toEqual([
      "/locations/chandler-az",
      "/locations/phoenix-az",
      "/locations/gilbert-az",
      "/locations/tempe-az",
      "/locations/mesa-az",
      "/locations/scottsdale-az",
    ]);
  });

  it("builds location slugs from city names", () => {
    expect(cityPageSlug("Chandler")).toBe("chandler-az");
    expect(cityPageSlug("Scottsdale")).toBe("scottsdale-az");
  });
});
