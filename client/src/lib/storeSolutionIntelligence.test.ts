import { describe, expect, it } from "vitest";
import { getBestForLabel, getProductBySku } from "@/data/storeMerchandising";
import { getSolutionChips, recommendationWhy } from "./storeSolutionIntelligence";

function sku(id: string) {
  const product = getProductBySku(id);
  if (!product) throw new Error(`Missing SKU ${id}`);
  return product;
}

describe("getSolutionChips", () => {
  it("marks a SKU already in the solution", () => {
    const endpoint = sku("DE-SVC-CM-ENDPOINT-CORE-MO");
    const chips = getSolutionChips(endpoint, [endpoint]);
    expect(chips.some((chip) => chip.kind === "in_solution")).toBe(true);
  });

  it("surfaces works-with and upgrade from real relationships", () => {
    const core = sku("DE-SVC-CM-ENDPOINT-CORE-MO");
    const edr = sku("DE-SVC-CM-ENDPOINT-EDR-MO");
    const chips = getSolutionChips(edr, [core]);
    expect(chips.some((chip) => chip.kind === "works_with" || chip.kind === "upgrade")).toBe(true);
  });

  it("never invents already-owned copy", () => {
    const endpoint = sku("DE-SVC-CM-ENDPOINT-CORE-MO");
    const chips = getSolutionChips(endpoint, []);
    expect(chips.every((chip) => !/owned/i.test(chip.label))).toBe(true);
  });
});

describe("recommendationWhy", () => {
  it("explains works-with from merchandising data", () => {
    const core = sku("DE-SVC-CM-ENDPOINT-CORE-MO");
    const edr = sku("DE-SVC-CM-ENDPOINT-EDR-MO");
    expect(recommendationWhy(edr, [core])).toMatch(/Upgrade path|Commonly paired|Required by/);
  });

  it("returns null when no relationship exists", () => {
    const ups = sku("DE-HW-INFRA-UPS-1500-OT");
    const core = sku("DE-SVC-CM-ENDPOINT-CORE-MO");
    expect(recommendationWhy(ups, [core])).toBeNull();
  });
});

describe("getBestForLabel", () => {
  it("uses an explicit outcome hint only", () => {
    expect(getBestForLabel(sku("DE-SVC-CM-ENDPOINT-EDR-MO"))).toBe("Protect");
    expect(getBestForLabel(sku("DE-SVC-UC-SEAT-STD-MO"))).toBe("Communicate");
    expect(getBestForLabel(sku("DE-HW-INFRA-UPS-1500-OT"))).toBeNull();
  });
});
