/**
 * Canonical Client Portal URLs.
 *
 * Never send marketing-site visitors through apex `/portal/*` — Cloudflare on
 * digeratexperts.com currently strips `/portal` and 301s to
 * `https://portal.digeratiexperts.com//login`. Always deep-link the portal host
 * with the `/portal` path intact.
 *
 * Canonical login: https://portal.digeratiexperts.com/portal/login
 */
export const PORTAL_ORIGIN = "https://portal.digeratiexperts.com";
export const PORTAL_LOGIN = `${PORTAL_ORIGIN}/portal/login`;
export const PORTAL_HOME = `${PORTAL_ORIGIN}/portal`;

export function portalLoginWithReturn(returnTo?: string): string {
  if (!returnTo) return PORTAL_LOGIN;
  const params = new URLSearchParams({ returnTo });
  return `${PORTAL_LOGIN}?${params.toString()}`;
}
