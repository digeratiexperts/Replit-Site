import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("homepage chapter fields", () => {
  const css = readFileSync(path.resolve(__dirname, "../index.css"), "utf8");
  const homepage = readFileSync(
    path.resolve(__dirname, "../pages/DigeratiHomepage.tsx"),
    "utf8",
  );
  const insights = readFileSync(
    path.resolve(__dirname, "../pages/sections/DigeratiThreatsInsightsSection.tsx"),
    "utf8",
  );

  it("defines grain, paper grain, film overlay, lighting, and surface fade as opt-in utilities", () => {
    expect(css).toContain("--de-field-grain:");
    expect(css).toContain("--de-field-grain-paper:");
    expect(css).toContain(".de-field-grain {");
    expect(css).toContain(".de-field-grain-paper {");
    expect(css).toContain(".de-field-grain-film::after");
    expect(css).toContain(".de-field-lit::before");
    expect(css).toContain(".de-chapter-fade-to-surface");
    expect(css).toContain("isolation: isolate");
  });

  it("keeps lighting as radial washes, not a violet fill", () => {
    const litBlock = css.slice(css.indexOf(".de-field-lit::before"), css.indexOf(".de-field-lit::before") + 520);
    expect(litBlock).toContain("rgba(211, 18, 106");
    expect(litBlock).toContain("rgba(91, 69, 224");
    expect(litBlock).not.toMatch(/background-color:\s*#(5B45E0|8B5CF6|7c3aed)/i);
  });

  it("recedes insights after the pricing surface so the pair is not two slabs", () => {
    expect(insights).toMatch(/className="de-dark-well/);
    expect(homepage).toContain("DigeratiThreatsInsightsSection");
    expect(homepage).toContain("DigeratiPricingSection");
  });

  it("FAQ matches the paper island recipe with white magenta-rail rows", () => {
    const faq = readFileSync(
      path.resolve(__dirname, "../pages/sections/DigeratiFAQSection.tsx"),
      "utf8",
    );
    expect(faq).toContain("de-dark-well");
    expect(faq).toContain("de-paper-island");
    expect(faq).toContain("de-paper-faq-item");
    expect(faq).toContain('text-[#1A1228]');
    expect(faq).not.toContain("de-hud-card");
    expect(css).toContain(".de-paper-faq-item {");
    expect(css).toContain("inset 3px 0 0 #d3126a");
    expect(css).toContain("background-color: var(--de-paper-raised)");
  });

  it("homepage threat tiles are white on the dark well, not graphite fills", () => {
    expect(insights).toContain("de-paper-on-well");
    expect(insights).toContain("bg-white");
    expect(insights).toContain('text-[#1A1228]');
    expect(insights).not.toContain("from-[#18141f]");
    expect(css).toContain(".de-paper-on-well {");
    const ai = readFileSync(
      path.resolve(__dirname, "../pages/sections/DigeratiAIAssistanceSection.tsx"),
      "utf8",
    );
    expect(ai).toContain("de-paper-on-well");
    expect(ai).toContain("Coverage with Context");
  });
});
