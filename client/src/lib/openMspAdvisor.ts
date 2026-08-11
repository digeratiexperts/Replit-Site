/**
 * Open the sitewide Virtual MSP Advisor with optional store-context seed.
 * Do not invent a second chatbot — this only deeplinks the existing advisor.
 */
export type OpenMspAdvisorDetail = {
  seedMessage?: string;
  context?: "store" | "home" | "other";
};

export function openMspAdvisor(detail: OpenMspAdvisorDetail = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("de-open-msp-advisor", { detail }));
}

export const STORE_ADVISOR_SEED =
  "I'm shopping the IT store and want help building a solution. Ask me about company size, industry, Microsoft 365 vs Google, whether we have internal IT, and our main objective — then recommend real catalog services I can add.";
