/**
 * Vendor logo assets for store merchandising (brief point 9).
 * Files live at /images/vendors/<slug>.png — copied from DE-supplied assets.
 * Catalog has no vendor fields yet; map real SKUs / categories to known DE stack.
 */

export const VENDOR_LOGO_BASE = "/images/vendors";

/** Clean slug → display name for logos we shipped. */
export const vendorLogoCatalog: Record<string, string> = {
  "1password": "1Password",
  atakama: "Atakama",
  augmentt: "Augmentt",
  avanan: "Avanan",
  axcient: "Axcient",
  bitdefender: "Bitdefender",
  blackpoint: "Blackpoint",
  bvoip: "bvoip",
  cis: "CIS",
  cloudflare: "Cloudflare",
  coro: "Coro",
  "cove-data-protection": "Cove Data Protection",
  cyberfox: "CyberFOX",
  cyrisma: "Cyrisma",
  cytracom: "Cytracom",
  "cytracom-controlone": "Cytracom ControlOne",
  "d-h-distributing": "D&H Distributing",
  dropsuite: "Dropsuite",
  egnyte: "Egnyte",
  gtia: "GTIA",
  hatz: "Hatz",
  hudu: "Hudu",
  huntress: "Huntress",
  jumpcloud: "JumpCloud",
  kaseya: "Kaseya",
  keeper: "Keeper",
  lenovo: "Lenovo",
  liongard: "Liongard",
  mimecast: "Mimecast",
  msp360: "MSP360",
  mspbots: "MSPBots",
  narmada: "Narmada",
  nerdio: "Nerdio",
  ninjaone: "NinjaOne",
  ninjio: "NINJIO",
  nodeware: "Nodeware",
  opti9: "Opti9",
  pax8: "Pax8",
  proofpoint: "Proofpoint",
  qualys: "Qualys",
  rewst: "Rewst",
  scalepad: "ScalePad",
  seedpodcyber: "Seedpod Cyber",
  sonicwall: "SonicWall",
  sophos: "Sophos",
  "td-synnex": "TD Synnex",
  telivy: "Telivy",
  threatlocker: "ThreatLocker",
  todyl: "Todyl",
  "uplevel-systems": "Uplevel Systems",
  wazuh: "Wazuh",
  zoho: "Zoho",
};

/** SKU → vendor slug (DE architecture stack, not invented products). */
export const skuVendorMap: Record<string, string> = {
  "DE-SVC-CM-ENDPOINT-CORE-MO": "coro",
  "DE-SVC-CM-ENDPOINT-EDR-MO": "coro",
  "DE-SVC-CM-EMAIL-SEC-MO": "mimecast",
  "DE-SVC-CM-IDENTITY-CORE-MO": "jumpcloud",
  "DE-SVC-CM-SAAS-MGMT-MO": "augmentt",
  "DE-SVC-CM-HELPDESK-ASSIST-MO": "ninjaone",
  "DE-SVC-CM-SERVER-MON-MO": "ninjaone",
  "DE-SVC-MGD-BCDR-MO": "opti9",
  "DE-SVC-MGD-CYBER-MO": "blackpoint",
  "DE-SVC-NET-MANAGED-CORE-MO": "todyl",
  "DE-SVC-NET-MANAGED-ADV-MO": "todyl",
  "DE-SVC-UC-SEAT-STD-MO": "cytracom",
  "DE-SVC-UC-SEAT-PRO-MO": "cytracom",
  "DE-DIG-TRN-AWARE-BASIC-YR": "ninjio",
  "DE-DIG-TRN-AWARE-PRO-YR": "ninjio",
  "DE-DIG-ASMT-PHISH-MO": "ninjio",
  "DE-DIG-ASMT-CSRA-OT": "telivy",
  "DE-DIG-ASMT-QUICK-OT": "seedpodcyber",
  "DE-HW-NET-FW-SMB-OT": "sonicwall",
  "DE-HW-PROV-ENDPOINT-OT": "lenovo",
};

export function vendorLogoUrl(slug: string): string {
  return `${VENDOR_LOGO_BASE}/${slug}.png`;
}

export function getVendorForSku(sku: string): { slug: string; name: string; logoUrl: string } | null {
  const slug = skuVendorMap[sku];
  if (!slug || !vendorLogoCatalog[slug]) return null;
  return { slug, name: vendorLogoCatalog[slug], logoUrl: vendorLogoUrl(slug) };
}

/** Heuristic fallback from product name/description when SKU unmapped. */
export function inferVendorFromText(text: string): { slug: string; name: string; logoUrl: string } | null {
  const hay = text.toLowerCase();
  const hints: [string, string][] = [
    ["jumpcloud", "jumpcloud"],
    ["mimecast", "mimecast"],
    ["coro", "coro"],
    ["blackpoint", "blackpoint"],
    ["huntress", "huntress"],
    ["sophos", "sophos"],
    ["proofpoint", "proofpoint"],
    ["threatlocker", "threatlocker"],
    ["sonicwall", "sonicwall"],
    ["ninjaone", "ninjaone"],
    ["keeper", "keeper"],
    ["1password", "1password"],
    ["opti9", "opti9"],
    ["axcient", "axcient"],
    ["cove", "cove-data-protection"],
    ["todyl", "todyl"],
    ["cytracom", "cytracom"],
    ["bvoip", "bvoip"],
    ["nerdio", "nerdio"],
    ["wazuh", "wazuh"],
    ["zoho", "zoho"],
    ["qualys", "qualys"],
    ["bitdefender", "bitdefender"],
  ];
  for (const [needle, slug] of hints) {
    if (hay.includes(needle) && vendorLogoCatalog[slug]) {
      return { slug, name: vendorLogoCatalog[slug], logoUrl: vendorLogoUrl(slug) };
    }
  }
  return null;
}
