import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(import.meta.dirname, "..");

describe("public sitemap destage", () => {
  it("does not index warehouse or SKU store URLs", () => {
    const script = readFileSync(path.join(root, "scripts/generate-sitemap.mjs"), "utf8");
    const sitemap = readFileSync(path.join(root, "public/sitemap.xml"), "utf8");
    expect(script).not.toContain("/store/product/");
    expect(script).toContain('["/store"');
    expect(sitemap).not.toContain("/store/product/");
    expect(sitemap).not.toContain("/internal/warehouse");
    expect(sitemap).toContain("/store/solutions/identity-access");
    expect(sitemap).toContain("/solutions/proactive-ecosystem");
  });
});
