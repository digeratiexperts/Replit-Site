import { useState, type FormEvent } from "react";
import { AlertCircle, ArrowLeft, Lock, LogIn, Mail, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import TurnstileWidget from "@/components/TurnstileWidget";
import { PORTAL_FORGOT_PASSWORD, PORTAL_LOGIN } from "@/lib/portalUrls";
import type { PortalUserSession } from "@/lib/portalRoles";

type LoginStep = "credentials" | "mfa";

interface DeskLoginCardProps {
  /** Fires after the canonical portal session is stored client-side. */
  onSignedIn: (user: PortalUserSession) => void;
}

/**
 * Inline Client Portal sign-in for the DE Desk widget (issue #153).
 *
 * This card is a thin front-end for the canonical portal auth service — the
 * same `/api/portal/login` + `/api/portal/mfa/verify-login` endpoints and the
 * same localStorage session keys the full portal login page uses. It must
 * never grow its own identity storage, hashing, or recovery paths; Zoho SSO
 * and password recovery stay on the portal host and are linked out below.
 */
export default function DeskLoginCard({ onSignedIn }: DeskLoginCardProps) {
  const [step, setStep] = useState<LoginStep>("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [mfaToken, setMfaToken] = useState("");
  const [mfaMethod, setMfaMethod] = useState<"totp" | "email">("totp");
  const [mfaMessage, setMfaMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const storeSession = (user: PortalUserSession, token: string) => {
    localStorage.setItem("portalUser", JSON.stringify(user));
    localStorage.setItem("portalToken", token);
    localStorage.setItem("portalUserId", user.id || "portal-user");
    localStorage.setItem("userEmail", user.email || email);
    // storage events only fire in other tabs — tell this tab's listeners too.
    window.dispatchEvent(new CustomEvent("de-portal-auth-changed"));
    onSignedIn(user);
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/portal/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, turnstileToken }),
        credentials: "include",
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.message || data.error || "Sign-in failed. Please try again.");
        return;
      }
      if (data.mfaRequired) {
        setMfaToken(data.mfaToken);
        setMfaMethod(data.mfaMethod);
        setMfaMessage(data.message);
        setStep("mfa");
        return;
      }
      storeSession(data.user, data.token);
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMfaVerify = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/portal/mfa/verify-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mfaToken, code: mfaCode }),
        credentials: "include",
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.message || "Verification failed");
        return;
      }
      storeSession(data.user, data.token);
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (step === "mfa") {
    return (
      <form className="de-desk-form de-desk-login" onSubmit={handleMfaVerify} data-testid="desk-login-card">
        <p className="de-desk-login-hint" data-testid="desk-login-mfa-hint">
          <ShieldCheck aria-hidden="true" />
          {mfaMessage || "Enter your verification code."} A backup code also works.
        </p>
        {error ? (
          <div className="de-desk-form-error" role="alert" data-testid="desk-login-error">
            <AlertCircle aria-hidden="true" />
            {error}
          </div>
        ) : null}
        <div className="de-desk-field">
          <label htmlFor="desk-login-mfa">
            {mfaMethod === "totp" ? "Authenticator code" : "Email verification code"}
          </label>
          <Input
            id="desk-login-mfa"
            type="text"
            inputMode="numeric"
            pattern="[0-9A-Za-z]*"
            maxLength={8}
            placeholder={mfaMethod === "totp" ? "6-digit code" : "Code from your email"}
            value={mfaCode}
            onChange={(event) => setMfaCode(event.target.value)}
            className="de-desk-input is-bare"
            autoFocus
            required
            data-testid="input-desk-login-mfa"
          />
        </div>
        <button
          type="submit"
          className="de-desk-btn-grad"
          disabled={loading || mfaCode.length < 6}
          data-testid="button-desk-login-verify"
        >
          {loading ? "Verifying…" : "Verify & sign in"}
        </button>
        <button
          type="button"
          className="de-desk-more-toggle"
          onClick={() => {
            setStep("credentials");
            setError("");
            setMfaCode("");
          }}
          data-testid="button-desk-login-back"
        >
          <ArrowLeft aria-hidden="true" />
          Back to sign-in
        </button>
      </form>
    );
  }

  return (
    <form className="de-desk-form de-desk-login" onSubmit={handleLogin} data-testid="desk-login-card">
      {error ? (
        <div className="de-desk-form-error" role="alert" data-testid="desk-login-error">
          <AlertCircle aria-hidden="true" />
          {error}
        </div>
      ) : null}
      <div className="de-desk-field">
        <label htmlFor="desk-login-email">Email</label>
        <div className="de-desk-input-wrap">
          <Mail aria-hidden="true" />
          <Input
            id="desk-login-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="de-desk-input"
            required
            data-testid="input-desk-login-email"
          />
        </div>
      </div>
      <div className="de-desk-field">
        <label htmlFor="desk-login-password">Password</label>
        <div className="de-desk-input-wrap">
          <Lock aria-hidden="true" />
          <Input
            id="desk-login-password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="de-desk-input"
            required
            data-testid="input-desk-login-password"
          />
        </div>
      </div>
      <TurnstileWidget onVerify={setTurnstileToken} theme="light" />
      <button
        type="submit"
        className="de-desk-btn-grad"
        disabled={loading}
        data-testid="button-desk-login-submit"
      >
        <LogIn aria-hidden="true" />
        {loading ? "Signing in…" : "Sign in"}
      </button>
      <div className="de-desk-login-links">
        <a
          href={PORTAL_FORGOT_PASSWORD}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="link-desk-login-forgot"
        >
          Forgot password?
        </a>
        <a
          href={PORTAL_LOGIN}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="link-desk-login-full-portal"
        >
          Zoho sign-in &amp; more
        </a>
      </div>
    </form>
  );
}
