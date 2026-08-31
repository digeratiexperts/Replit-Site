import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const here = dirname(fileURLToPath(import.meta.url));
const card = readFileSync(resolve(here, "DeskLoginCard.tsx"), "utf8");
const widget = readFileSync(resolve(here, "ZohoASAPWidget.tsx"), "utf8");
const storeAuth = readFileSync(resolve(here, "../hooks/useStoreAuth.ts"), "utf8");

describe("DE Desk inline login card (issue #153 constraints)", () => {
  it("delegates to the canonical portal login + MFA endpoints, nothing parallel", () => {
    expect(card).toMatch(/fetch\("\/api\/portal\/login"/);
    expect(card).toMatch(/fetch\("\/api\/portal\/mfa\/verify-login"/);
    expect(card).toMatch(/credentials: "include"/);
    // No parallel identity silo: no other auth endpoints, no client-side hashing.
    expect(card).not.toMatch(/\/api\/auth\//);
    expect(card).not.toMatch(/bcrypt|passkey|webauthn|navigator\.credentials/i);
  });

  it("sends the Turnstile token exactly like the portal login page", () => {
    expect(card).toMatch(/TurnstileWidget/);
    expect(card).toMatch(/JSON\.stringify\(\{ email, password, turnstileToken \}\)/);
  });

  it("stores the same session keys the portal login page stores", () => {
    expect(card).toMatch(/localStorage\.setItem\("portalUser", JSON\.stringify\(user\)\)/);
    expect(card).toMatch(/localStorage\.setItem\("portalToken", token\)/);
    expect(card).toMatch(/localStorage\.setItem\("portalUserId", user\.id \|\| "portal-user"\)/);
    expect(card).toMatch(/localStorage\.setItem\("userEmail", user\.email \|\| email\)/);
  });

  it("announces sign-in to same-tab listeners and the store auth hook hears it", () => {
    expect(card).toMatch(/new CustomEvent\("de-portal-auth-changed"\)/);
    expect(storeAuth).toMatch(/addEventListener\("de-portal-auth-changed"/);
    expect(storeAuth).toMatch(/removeEventListener\("de-portal-auth-changed"/);
  });

  it("supports the MFA challenge step with a way back", () => {
    expect(card).toMatch(/mfaRequired/);
    expect(card).toMatch(/mfaToken, code: mfaCode/);
    expect(card).toMatch(/Authenticator code/);
    expect(card).toMatch(/Back to sign-in/);
  });

  it("links recovery and SSO out to the canonical portal host, never apex //login", () => {
    expect(card).toMatch(/PORTAL_FORGOT_PASSWORD/);
    expect(card).toMatch(/href=\{PORTAL_LOGIN\}/);
    expect(card).toMatch(/from "@\/lib\/portalUrls"/);
    expect(card).not.toMatch(/\/\/login/);
    // Password reset and Zoho SSO stay on the portal page — no in-card flows.
    expect(card).not.toMatch(/api\/portal\/auth\/zoho/);
  });

  it("keeps the Desk gate expanding in place instead of navigating away", () => {
    expect(widget).toMatch(/<DeskLoginCard onSignedIn=\{handleDeskSignIn\} \/>/);
    expect(widget).toMatch(/setShowInlineLogin\(true\)/);
    expect(widget).toMatch(/Sign in to Client Tools/);
    // The full portal page stays reachable as an explicit escape hatch.
    expect(widget).toMatch(/href=\{PORTAL_LOGIN\}/);
  });
});
