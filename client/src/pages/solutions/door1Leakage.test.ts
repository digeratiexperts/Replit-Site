import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(import.meta.dirname, "../../../..");

const door1Files = [
  "client/src/pages/solutions/SolutionsIndex.tsx",
  "client/src/pages/solutions/ProActiveEcosystemPage.tsx",
  "client/src/pages/solutions/ProActiveITEcosystemPage.tsx",
  "client/src/pages/solutions/ProActiveOfficeEcosystemPage.tsx",
  "client/src/pages/solutions/ProActiveBusinessEcosystemPage.tsx",
  "client/src/pages/solutions/ProActiveEnterpriseEcosystemPage.tsx",
];

describe("Door 1 public leakage", () => {
  it("never offers Pay Now and keeps assessment as the primary action", () => {
    for (const file of door1Files) {
      const src = readFileSync(path.join(root, file), "utf8");
      expect(src).not.toContain("Pay Now");
      expect(src).not.toContain("storeProducts");
      expect(src).not.toContain("vendorLogos");
    }
    const index = readFileSync(path.join(root, "client/src/pages/solutions/SolutionsIndex.tsx"), "utf8");
    expect(index).toContain("/solutions/proactive-ecosystem");
    expect(index).toContain("/store");
    expect(index).toContain("/book");
  });
});
