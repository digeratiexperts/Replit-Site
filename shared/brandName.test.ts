import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { COMPANY } from "./companyContact";

const ROOT = join(import.meta.dirname, "..");
const SCAN_DIRS = ["client/src", "server", "shared"];
const SCAN_FILES = ["client/index.html"];

/**
 * Whole-word “Digerati” that is not immediately followed by “ Experts”.
 * CamelCase identifiers (DigeratiHomepage) and DigeratiExperts do not match.
 */
const STANDALONE = /\bDigerati\b(?! Experts)/g;

function walk(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (name === "node_modules" || name === "dist") continue;
      walk(full, acc);
    } else if (/\.(ts|tsx|js|mjs|html)$/.test(name)) {
      acc.push(full);
    }
  }
  return acc;
}

describe("brand name", () => {
  it("exposes Digerati Experts and DE as the only spoken forms", () => {
    expect(COMPANY.legalName).toBe("Digerati Experts");
    expect(COMPANY.shortName).toBe("DE");
  });

  it("does not use standalone Digerati in app source", () => {
    const hits: string[] = [];
    const files = [
      ...SCAN_DIRS.flatMap((dir) => walk(join(ROOT, dir))),
      ...SCAN_FILES.map((rel) => join(ROOT, rel)),
    ];
    for (const file of files) {
      const rel = relative(ROOT, file).replace(/\\/g, "/");
      if (rel === "shared/brandName.test.ts") continue;
      if (/\.test\.(ts|tsx|js)$/.test(rel)) continue;
      const text = readFileSync(file, "utf8");
      const lines = text.split("\n");
      lines.forEach((line, index) => {
        if (STANDALONE.test(line)) {
          hits.push(`${rel}:${index + 1}:${line.trim()}`);
        }
        STANDALONE.lastIndex = 0;
      });
    }
    expect(hits).toEqual([]);
  });
});
