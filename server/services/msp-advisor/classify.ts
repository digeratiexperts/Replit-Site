import type { AdvisorMode, PageContext } from "./types";

const INCIDENT =
  /\b(ransomware|ransom|breached|breach|hacked|compromised|account\s*takeover|data\s*theft|encrypt(ed|ing)?\s*(files|system)|active\s*incident|security\s*incident|locked\s*out\s*by\s*attacker)\b/i;

const EXISTING_CLIENT =
  /\b(i'?m\s+(an?\s+)?(existing\s+)?client|we\s+are\s+(an?\s+)?(existing\s+)?client|already\s+(a\s+)?(customer|client)|already\s+use\s+you|our\s+account\s+manager|portal\s+login|open\s+a\s+ticket|existing\s+customer|current\s+(de\s+)?client)\b/i;

const OFF_TOPIC =
  /\b(recipe|football|nba|movie|celebrity|horoscope|dating|joke|poem|write\s+me\s+a\s+song|capital\s+of|who\s+won\s+the|weather\s+in(?!\s+(phoenix|chandler|arizona|scottsdale|tempe|mesa)))\b/i;

const COMPLIANCE =
  /\b(hipaa|cmmc|pci(\s*dss)?|soc\s*2|gdpr|glba|compliance|audit|baa|framework|nist|cis\s*controls)\b/i;

const PRICING =
  /\b(how\s+much|pricing|price|cost|quote|budget|per\s*user|site\s*min|package|tier|office\s+plan|business\s+plan|enterprise\s+plan)\b/i;

const CLOUD =
  /\b(microsoft\s*365|m365|office\s*365|azure|entra|intune|sharepoint|teams|exchange\s*online|onedrive|google\s*workspace)\b/i;

const CYBER =
  /\b(phish|phishing|malware|edr|mdr|firewall|vpn|zero\s*trust|mfa|2fa|endpoint|siem|soc|threat|vulnerability|pen\s*test|email\s*security|awareness)\b/i;

const IT_SUPPORT =
  /\b(reset\s+(windows|password|pc)|printer|wifi|wi-fi|slow\s+computer|blue\s+screen|bsod|outlook\s+not|can'?t\s+login|vpn\s+won'?t|install\s+software|help\s+desk|troubleshoot)\b/i;

const ASSESSMENT =
  /\b(assessment|cyber\s*risk|security\s*review|gap\s*analysis|readiness|evaluate\s+(our|my)\s+(security|it))\b/i;

const MSP =
  /\b(msp|managed\s*(it|services)|do\s+i\s+need\s+(an?\s+)?msp|outsourc(e|ing)\s+it|internal\s+it\s+(left|quit|gone)|no\s+it\s+(guy|person|team)|vCIO|co-?managed)\b/i;

/**
 * Heuristic mode classifier. Labels are internal only — never shown to visitors.
 */
export function classifyMode(message: string, page?: PageContext): AdvisorMode {
  const text = message.trim();
  if (!text) return page?.pageType === "cybersecurity" ? "cybersecurity" : "msp_discovery";

  if (INCIDENT.test(text)) return "security_incident";
  if (EXISTING_CLIENT.test(text)) return "existing_client";

  // Off-topic only when clearly unrelated AND not mixed with IT/security language
  if (OFF_TOPIC.test(text) && !CYBER.test(text) && !IT_SUPPORT.test(text) && !MSP.test(text) && !COMPLIANCE.test(text) && !CLOUD.test(text) && !PRICING.test(text)) {
    return "off_topic";
  }

  // Compliance before assessment so "CMMC readiness" is compliance-led
  if (COMPLIANCE.test(text)) return "compliance";
  if (ASSESSMENT.test(text)) return "assessment";
  if (PRICING.test(text)) return "pricing";
  // Cyber before cloud so "M365 phishing" lands as cybersecurity
  if (CYBER.test(text)) return "cybersecurity";
  if (CLOUD.test(text)) return "cloud_m365";
  if (IT_SUPPORT.test(text)) return "it_support";
  if (MSP.test(text)) return "msp_discovery";

  // Page bias when message is ambiguous
  if (page?.pageType === "compliance") return "compliance";
  if (page?.pageType === "cybersecurity") return "cybersecurity";
  if (page?.pageType === "pricing" || page?.pageType === "store") return "pricing";
  if (page?.pageType === "support") return "existing_client";

  return "msp_discovery";
}

export function isPromptInjectionAttempt(message: string): boolean {
  return /\b(ignore\s+(all\s+)?(previous|prior)\s+instructions|reveal\s+(your\s+)?(system|developer)\s+prompt|show\s+(me\s+)?(the\s+)?(system|hidden)\s+prompt|print\s+your\s+instructions|jailbreak|DAN\s+mode|exfiltrat|api[_-]?keys?|client_secret|JWT_SECRET|show\s+me\s+your\s+(api|keys|secrets))\b/i.test(
    message,
  );
}
