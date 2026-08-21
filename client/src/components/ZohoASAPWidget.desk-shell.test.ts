import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const src = readFileSync(
  resolve(dirname(fileURLToPath(import.meta.url)), "ZohoASAPWidget.tsx"),
  "utf8",
);

describe("DE Desk shell positioning", () => {
  it("keeps the dialog position:fixed in unlayered CSS so Tailwind `fixed` cannot lose to `relative`", () => {
    const shell = src.match(/\.de-desk-shell \{[\s\S]*?box-shadow:[^}]+\}/);
    expect(shell?.[0]).toMatch(/position:\s*fixed/);
    expect(shell?.[0]).not.toMatch(/position:\s*relative/);
  });

  it("stops pointer events on the shell so inner clicks cannot count as outside/dismiss", () => {
    expect(src).toMatch(/data-testid="desk-modal"/);
    expect(src).toMatch(/onPointerDown=\{\(event\) => event\.stopPropagation\(\)\}/);
    expect(src).toMatch(/onClick=\{\(event\) => event\.stopPropagation\(\)\}/);
  });

  it("ignores a close click that arrives with the same pointer that opened the Desk", () => {
    expect(src).toMatch(/ignoreDismissUntilRef/);
    expect(src).toMatch(/Date\.now\(\) \+ 400/);
  });

  it("keeps graphite chrome with a magenta cap instead of purple-wash or cream fields", () => {
    expect(src).toMatch(/inset 0 1px 0 #D3126A/);
    expect(src).toMatch(/\.de-desk-shell::before \{\s*content:\s*none;/);
    expect(src).toMatch(/background: var\(--de-raised, #151217\) !important;/);
    expect(src).not.toMatch(/radial-gradient\(ellipse 70% 36% at 50% 0%, rgba\(91,69,224/);
    expect(src).not.toMatch(/background:\s*#fcfaf7/);
    expect(src).toMatch(/import \{ PORTAL_LOGIN \} from "@\/lib\/portalUrls"/);
    expect(src).toMatch(/href: PORTAL_LOGIN/);
    expect(src).not.toMatch(/\/\/login/);
  });

  it("keeps Get Support optional fields behind a distinct control, not a second Details label", () => {
    expect(src).toMatch(/Add company, category, or a file/);
    expect(src).not.toMatch(/>More details</);
  });
});
