/**
 * Canonical public contact identity for Digerati Experts.
 * Import from here instead of hardcoding phone/email literals in UI.
 *
 * Primary public sales/business number: 480-519-5892
 * Additional numbers must be labeled by function (Sales / Client Support / Emergency).
 * Do not invent alternate numbers; confirm with Joseph Petro before changing.
 */

export type PhoneRole = "primary" | "sales" | "client_support" | "emergency";

export interface CompanyPhone {
  role: PhoneRole;
  /** Display form, e.g. 480-519-5892 */
  display: string;
  /** tel: href without spaces, e.g. tel:480-519-5892 */
  telHref: string;
  /** E.164, e.g. +14805195892 */
  e164: string;
  /** Schema.org telephone, e.g. +1-480-519-5892 */
  schemaTelephone?: string;
  /** Short label when multiple numbers appear */
  label: string;
}

export const COMPANY = {
  legalName: "Digerati Experts",
  email: "info@digeratiexperts.com",
  supportEmail: "support@digeratiexperts.com",
  privacyEmail: "privacy@digeratiexperts.com",
  website: "https://digeratiexperts.com",
  bookingUrl: "https://meet.digerati-experts.com/",
  streetAddress: "3165 S Alma School Rd Suite 29",
  addressLocality: "Chandler",
  addressRegion: "AZ",
  postalCode: "85248",
  addressCountry: "US",
  areaServed: "Arizona and Greater Phoenix (Chandler, Phoenix, Scottsdale, Tempe, Mesa, Gilbert)",
} as const;

/** Primary public business / sales number used across marketing + schema. */
export const PRIMARY_PHONE: CompanyPhone = {
  role: "primary",
  display: "480-519-5892",
  telHref: "tel:480-519-5892",
  e164: "+14805195892",
  /** Schema.org / JSON-LD preferred display form */
  schemaTelephone: "+1-480-519-5892",
  label: "Sales & Business",
};

/**
 * Known alternate / legacy numbers found in repo or GBP docs.
 * Do NOT render as an unlabeled primary number.
 * Status notes are for engineering — confirm before promoting to UI.
 */
export const PHONE_REGISTRY = {
  primary: PRIMARY_PHONE,
  /**
   * Appears in older GBP / Maps feature-ID notes and MSP advisor knowledge.
   * Treated as legacy until Joseph Petro confirms its function.
   */
  legacyGbp: {
    role: "sales" as const,
    display: "325-480-9870",
    telHref: "tel:325-480-9870",
    e164: "+13254809870",
    label: "Legacy (confirm before public use)",
    publicUse: false,
  },
} as const;

export function formatAddressOneLine(): string {
  return `${COMPANY.streetAddress}, ${COMPANY.addressLocality}, ${COMPANY.addressRegion} ${COMPANY.postalCode}`;
}
