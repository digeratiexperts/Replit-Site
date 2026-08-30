import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { curatedSolutionFamilies } from "@/data/curatedSolutions";

const root = path.resolve(import.meta.dirname, "../../../..");

const door2Files = [
  "client/src/lib/businessNeeds.ts",
  "client/src/lib/isDoor2Path.ts",
  "client/src/pages/solutions/BusinessNeedsIndex.tsx",
  "client/src/pages/solutions/BusinessNeedsFamily.tsx",
  "client/src/pages/solutions/SolutionRequest.tsx",
  "server/publicSolutionRoutes.ts",
  "server/publicSolutionRequestStore.ts",
  "server/publicSolutionRequestCrm.ts",
];

const prohibited = [
  "storeProducts",
  "vendorLogos",
  "getProductVisual",
  "computeCoverageScore",
  "Pay Now",
  "Add to cart",
  "coro",
  "guardz",
  "ninjaone",
  "blackpoint",
  "hudu",
  "pax8",
  "sherweb",
  "griffin",
  "ingram",
  "sku",
  "margin",
  "distributor",
  "gcch",
  "waiver",
];

describe("Door 2 public leakage", () => {
  it("does not import the warehouse catalog or vendor map", () => {
    for (const relative of door2Files) {
      const source = readFileSync(path.join(root, relative), "utf8");
      expect(source, relative).not.toMatch(/from ["']@\/data\/storeProducts["']/);
      expect(source, relative).not.toMatch(/from ["']@\/data\/vendorLogos["']/);
      expect(source, relative).not.toMatch(/storeProducts/);
      expect(source, relative).not.toMatch(/vendorLogos/);
    }
  });

  it("keeps prohibited warehouse terms out of Door 2 sources", () => {
    for (const relative of door2Files) {
      const source = readFileSync(path.join(root, relative), "utf8").toLowerCase();
      for (const term of prohibited) {
        if (term === "sku" && relative.includes("Leakage")) continue;
        expect(source, `${relative} contains ${term}`).not.toContain(term.toLowerCase());
      }
    }
  });

  it("covers 13 families with both delivery models and no email gate copy", () => {
    expect(curatedSolutionFamilies).toHaveLength(13);
    const index = readFileSync(path.join(root, "client/src/pages/solutions/BusinessNeedsIndex.tsx"), "utf8");
    const familyPage = readFileSync(path.join(root, "client/src/pages/solutions/BusinessNeedsFamily.tsx"), "utf8");
    expect(index).toContain("without an email address");
    expect(index).not.toContain("type=\"email\"");
    expect(familyPage).toContain("data-testid={`delivery-${value}`}");
    expect(familyPage).toContain('["standalone", "DE owns this solution"]');
    expect(familyPage).toContain('["co_managed", "Work with your IT team"]');
    expect(familyPage).toContain("Add to Your Solution");
    expect(familyPage).toContain("Request a quote");
    expect(familyPage).toContain("Start an assessment");
    expect(familyPage).toContain("Schedule a consultation");
    expect(familyPage).toContain("Ask DE about this solution");
    expect(familyPage).not.toContain("Pay Now");
    expect(familyPage).not.toContain("computeCoverageScore");
    expect(familyPage).not.toContain("@/contexts/CartContext");
  });
});
