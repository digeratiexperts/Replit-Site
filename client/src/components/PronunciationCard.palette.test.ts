import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync(new URL("./PronunciationCard.tsx", import.meta.url), "utf8");
const codeOnly = source
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/\/\/.*$/gm, "");

describe("PronunciationCard homepage palette contract", () => {
  it("locks the approved homepage color roles", () => {
    expect(codeOnly).toContain('const MAGENTA = "#D3126A"');
    expect(codeOnly).toContain('const WORDMARK_GOLD = "#E7B20D"');
    expect(codeOnly).toContain("style={{ backgroundColor: MAGENTA");
    expect(codeOnly).toMatch(/style=\{\{ color: MAGENTA \}\} aria-hidden="true">1<\/span>/);
    expect(codeOnly).toMatch(/style=\{\{ color: MAGENTA \}\} aria-hidden="true">2<\/span>/);
    expect(codeOnly.match(/backgroundColor: WORDMARK_GOLD/g)).toHaveLength(1);
    expect(codeOnly).not.toMatch(/#0A0E27|#0a0e27/);
    expect(codeOnly).toContain("bg-de-raised");
    expect(codeOnly).not.toContain("@keyframes");
  });

  it("locks the play-button render fix", () => {
    expect(codeOnly).toContain("min-h-11 shrink-0");
    expect(codeOnly).toContain("whitespace-nowrap");
  });
});
