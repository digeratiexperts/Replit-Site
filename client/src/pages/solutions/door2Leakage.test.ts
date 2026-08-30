import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { curatedSolutionFamilies } from "@/data/curatedSolutions";
import { BUSINESS_GOALS } from "@/lib/businessNeeds";

const root = path.resolve(import.meta.dirname, "../../../..");

const door2Files = [
  "client/src/lib/businessNeeds.ts",
  "client/src/lib/isDoor2Path.ts",
  "client/src/lib/solutionDraft.ts",
  "client/src/lib/solutionPackage.ts",
  "client/src/pages/solutions/BusinessNeedsIndex.tsx",
  "client/src/pages/solutions/BusinessNeedsFamily.tsx",
  "client/src/pages/solutions/SolutionRequest.tsx",
  "client/src/pages/store/PublicStoreCheckout.tsx",
  "client/src/components/store/PublicSolutionCart.tsx",
  "client/src/components/store/SolutionProfileForm.tsx",
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

describe("Door 2 public leakage and flow contract", () => {
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

  it("keeps profile first, packages explicit, and contact last", () => {
    expect(curatedSolutionFamilies).toHaveLength(13);
    expect(BUSINESS_GOALS).toHaveLength(5);
    expect(new Set(BUSINESS_GOALS.flatMap((goal) => goal.familyIds)).size).toBe(13);

    const index = readFileSync(path.join(root, "client/src/pages/solutions/BusinessNeedsIndex.tsx"), "utf8");
    const familyPage = readFileSync(path.join(root, "client/src/pages/solutions/BusinessNeedsFamily.tsx"), "utf8");
    const requestPage = readFileSync(path.join(root, "client/src/pages/solutions/SolutionRequest.tsx"), "utf8");
    const workspace = readFileSync(path.join(root, "client/src/pages/store/PublicStoreCheckout.tsx"), "utf8");

    expect(index).toContain("SolutionProfileForm");
    expect(index).toContain("Step 1 · Pain or need");
    expect(index).toContain("Add need");
    expect(index).not.toContain("type=\"email\"");
    expect(index).not.toContain('delivery: "standalone"');
    expect(index).not.toContain("ShoppingCart");

    expect(familyPage).toContain("Standalone");
    expect(familyPage).toContain("Standard price");
    expect(familyPage).toContain("Co-Managed");
    expect(familyPage).toContain("Preferred pricing");
    expect(familyPage).toContain("Add & review package");
    expect(familyPage).toContain("buildSolutionPackage");
    expect(familyPage).not.toContain("DE manages this");
    expect(familyPage).not.toContain("Add to Your Solution");
    expect(familyPage).not.toContain("Pay Now");

    expect(workspace).toContain("Profile → pain or need → offer → package → delivery → contact");
    expect(workspace).toContain("Save progress");
    expect(workspace).toContain("self_install");
    expect(workspace).toContain("remote_assist");
    expect(workspace).toContain("onsite");
    expect(workspace).toContain("Continue to contact details");
    expect(workspace).not.toContain("Continue this solution");
    expect(workspace).not.toContain("checkout path");

    expect(requestPage).toContain("Step 4 · Contact");
    expect(requestPage).toContain("Company name");
    expect(requestPage).toContain("Name");
    expect(requestPage).toContain("Email");
    expect(requestPage).toContain("Phone");
    expect(requestPage).not.toContain("Anything DE should know");
    expect(requestPage).not.toContain("<textarea");
    expect(requestPage).not.toContain("not a cart");
    expect(requestPage).not.toContain("CRM handoff");
  });
});
