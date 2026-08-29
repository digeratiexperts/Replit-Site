/**
 * Checkout eligibility is an explicit enum — not a hidden Pay Now default.
 * Website-local until Hub entitlements exist. Do not invent tenant catalogs.
 */
export const CHECKOUT_ELIGIBILITY = [
  "assessment_first",
  "request_quote",
  "request_approval",
  "pay_now",
] as const;

export type CheckoutEligibility = (typeof CHECKOUT_ELIGIBILITY)[number];

export const DOOR_1_ELIGIBILITY: CheckoutEligibility = "assessment_first";
export const DOOR_2_ELIGIBILITY: CheckoutEligibility = "request_quote";
export const MARKETPLACE_ELIGIBILITY: CheckoutEligibility = "request_approval";
/** Staff warehouse only this phase — never expose as a public default. */
export const WAREHOUSE_STAFF_ELIGIBILITY: CheckoutEligibility = "pay_now";

export function isPayNowAllowed(eligibility: CheckoutEligibility): boolean {
  return eligibility === "pay_now";
}
