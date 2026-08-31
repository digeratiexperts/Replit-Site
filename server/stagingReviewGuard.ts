/**
 * Staging review mode — application-level outbound mutation kill switch.
 *
 * Set `DE_STAGING_REVIEW=1` on a review/staging instance. While it is on, this
 * process refuses every outbound mutation (Zoho Desk/CRM writes, payments,
 * transactional email, Intelligence Hub events, vendor API writes) **even if
 * production credentials are present in the environment**.
 *
 * Why this exists: credential omission alone is one mistake away from failing
 * (someone copies a production `.env`). This is defence in depth — the switch
 * is independent of which keys are set, so a review instance cannot create real
 * tickets, CRM records, orders, payments, or Hub events by accident.
 *
 * Read paths stay fully functional on purpose: the OpenAI advisor, Zoho OIDC
 * sign-in, catalog reads, and health checks still work, so a reviewer exercises
 * the real Ask DE LLM and real authentication.
 *
 * Production must never set this flag. `deploy/vps/staging-review-safety.md`
 * documents the deployment contract.
 */

const TRUTHY = new Set(["1", "true", "yes", "on"]);

/** True when this process is running as a locked-down review instance. */
export function isStagingReview(): boolean {
  return TRUTHY.has((process.env.DE_STAGING_REVIEW || "").trim().toLowerCase());
}

/**
 * Soft guard for callers that already handle a "not available" outcome
 * gracefully (the same path used when credentials are absent).
 *
 * Returns true when the caller must skip the mutation.
 */
export function shouldBlockMutation(operation: string): boolean {
  if (!isStagingReview()) return false;
  console.warn(
    `[STAGING REVIEW] Blocked outbound mutation: ${operation}. ` +
      "DE_STAGING_REVIEW=1 — no production records are written from this instance.",
  );
  return true;
}

/**
 * Hard guard for callers with no safe no-op path. Throws so the request fails
 * closed rather than silently appearing to succeed.
 */
export function assertMutationAllowed(operation: string): void {
  if (!isStagingReview()) return;
  console.warn(`[STAGING REVIEW] Refused outbound mutation: ${operation}`);
  throw new Error(
    `Staging review mode: '${operation}' is disabled on this instance. ` +
      "No production data is modified from a review deployment.",
  );
}

/** Surfaced in health output so a reviewer can confirm lockdown is active. */
export function stagingReviewStatus(): "locked_down" | "off" {
  return isStagingReview() ? "locked_down" : "off";
}
