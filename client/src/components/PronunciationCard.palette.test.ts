import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync(new URL("./PronunciationCard.tsx", import.meta.url), "utf8");
const codeOnly = source
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/\/\/.*$/gm, "");

describe("PronunciationCard palette and audio contract", () => {
  it("uses reusable DE accent tokens for topical signals", () => {
    expect(codeOnly).not.toContain('const MAGENTA = "#D3126A"');
    expect(codeOnly).toContain("text-de-accent-ink");
    expect(codeOnly).toContain("bg-de-magenta");
    expect(codeOnly).toContain("hover:bg-de-magenta-hover");
    expect(codeOnly).toContain("rgb(var(--de-accent-rgb) / 0.55)");
    expect(codeOnly).toContain('const WORDMARK_GOLD = "#E7B20D"');
    expect(codeOnly.match(/backgroundColor: WORDMARK_GOLD/g)).toHaveLength(1);
    expect(codeOnly).not.toMatch(/#0A0E27|#0a0e27/);
    expect(codeOnly).toContain("bg-de-raised");
    expect(codeOnly).not.toContain("@keyframes");
  });

  it("requires the canonical full-word audio instead of browser-dependent synthesis", () => {
    expect(codeOnly).toContain('const AUDIO_SRC = "/audio/digerati-pronunciation.mp3"');
    expect(codeOnly).toContain("new Audio(AUDIO_SRC)");
    expect(codeOnly).not.toContain("speak(SPOKEN_PRONUNCIATION");
  });

  it("locks the play-button render fix", () => {
    expect(codeOnly).toContain("flex shrink-0");
    expect(codeOnly).toContain("whitespace-nowrap");
    expect(codeOnly).toContain("minHeight: 44");
  });
});