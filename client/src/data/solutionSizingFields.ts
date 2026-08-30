import type { CuratedSolutionFamily } from "./curatedSolutions";

/**
 * Per-family "help us size this" fields for the Solution Request form.
 *
 * These are NOT a price calculator. curatedSolutions.ts has no numeric
 * rates anywhere — Door 2 is quote/assessment-first by design (see
 * docs/STORE-ARCHITECTURE-DESIGN.md, section 9). Every field here names a
 * variable already called out in that family's own approved
 * `commercialModel` text (e.g. it_operations: "scope based on users,
 * supported systems, hours, and locations"), so this only structures
 * information DE already asks for — it never invents a rate to multiply.
 * Answers are attached to the Solution Request for a faster, more
 * accurate follow-up, and are shown to the visitor as scope only, with
 * no dollar figure.
 */

export type SizingFieldType = "count" | "select";

export interface SizingSelectOption {
  value: string;
  label: string;
}

export interface SizingField {
  key: string;
  label: string;
  type: SizingFieldType;
  /** count fields only */
  unit?: string;
  min?: number;
  max?: number;
  /** select fields only */
  options?: SizingSelectOption[];
}

export const SOLUTION_SIZING_FIELDS: Record<CuratedSolutionFamily["id"], SizingField[]> = {
  it_operations: [
    { key: "users", label: "Employees needing support", type: "count", unit: "users", min: 1, max: 1000 },
    { key: "systems", label: "Core business systems in scope", type: "count", unit: "systems", min: 0, max: 100 },
    { key: "locations", label: "Locations", type: "count", unit: "locations", min: 1, max: 50 },
    {
      key: "coverage",
      label: "Coverage hours",
      type: "select",
      options: [
        { value: "business", label: "Business hours" },
        { value: "extended", label: "Extended hours" },
        { value: "24x7", label: "24/7" },
      ],
    },
  ],
  endpoint_devices: [
    { key: "users", label: "Covered users", type: "count", unit: "users", min: 1, max: 1000 },
    { key: "devices", label: "Approved devices", type: "count", unit: "devices", min: 1, max: 2000 },
  ],
  identity_access: [
    { key: "users", label: "Users", type: "count", unit: "users", min: 1, max: 1000 },
    { key: "apps", label: "Business applications", type: "count", unit: "apps", min: 1, max: 200 },
    {
      key: "complexity",
      label: "Administrative complexity",
      type: "select",
      options: [
        { value: "low", label: "Low — one identity source" },
        { value: "medium", label: "Medium — a few sources" },
        { value: "high", label: "High — multiple sources or hybrid" },
      ],
    },
  ],
  email_collaboration: [
    { key: "users", label: "Users", type: "count", unit: "users", min: 1, max: 1000 },
    { key: "domains", label: "Domains", type: "count", unit: "domains", min: 1, max: 25 },
  ],
  cybersecurity_operations: [
    { key: "users", label: "Users", type: "count", unit: "users", min: 1, max: 1000 },
    { key: "endpoints", label: "Endpoints", type: "count", unit: "endpoints", min: 1, max: 2000 },
    {
      key: "coverage",
      label: "Coverage window",
      type: "select",
      options: [
        { value: "business", label: "Business hours" },
        { value: "24x7", label: "24/7" },
      ],
    },
  ],
  network_connectivity: [
    { key: "sites", label: "Sites", type: "count", unit: "sites", min: 1, max: 100 },
    { key: "devices", label: "Network devices", type: "count", unit: "devices", min: 1, max: 500 },
  ],
  backup_continuity: [
    { key: "systems", label: "Systems or servers to protect", type: "count", unit: "systems", min: 1, max: 200 },
    {
      key: "dataVolume",
      label: "Approximate data volume",
      type: "select",
      options: [
        { value: "lt1tb", label: "Under 1 TB" },
        { value: "1to10tb", label: "1–10 TB" },
        { value: "gt10tb", label: "Over 10 TB" },
      ],
    },
    {
      key: "retention",
      label: "Retention need",
      type: "select",
      options: [
        { value: "30d", label: "30 days" },
        { value: "1y", label: "1 year" },
        { value: "7y", label: "7+ years (compliance)" },
      ],
    },
  ],
  compliance_risk: [
    {
      key: "framework",
      label: "Framework or requirement",
      type: "select",
      options: [
        { value: "hipaa", label: "HIPAA" },
        { value: "pci", label: "PCI DSS" },
        { value: "cmmc", label: "CMMC" },
        { value: "soc2", label: "SOC 2" },
        { value: "insurance", label: "Cyber insurance questionnaire" },
        { value: "other", label: "Other / not sure yet" },
      ],
    },
    { key: "systems", label: "Systems in scope", type: "count", unit: "systems", min: 1, max: 300 },
  ],
  security_awareness: [
    { key: "participants", label: "Participants", type: "count", unit: "people", min: 1, max: 2000 },
    {
      key: "cadence",
      label: "Campaign cadence",
      type: "select",
      options: [
        { value: "monthly", label: "Monthly" },
        { value: "quarterly", label: "Quarterly" },
      ],
    },
  ],
  business_communications: [
    { key: "seats", label: "Seats", type: "count", unit: "seats", min: 1, max: 1000 },
    { key: "locations", label: "Locations", type: "count", unit: "locations", min: 1, max: 50 },
  ],
  hardware_lifecycle: [
    { key: "devices", label: "Devices to source or deploy", type: "count", unit: "devices", min: 1, max: 1000 },
    { key: "locations", label: "Deployment locations", type: "count", unit: "locations", min: 1, max: 50 },
  ],
  documentation_standards: [
    { key: "systems", label: "Systems to document", type: "count", unit: "systems", min: 1, max: 300 },
    { key: "sites", label: "Sites", type: "count", unit: "sites", min: 1, max: 50 },
  ],
  technology_strategy: [
    { key: "employees", label: "Organization size", type: "count", unit: "employees", min: 1, max: 10000 },
    {
      key: "cadence",
      label: "Advisory cadence",
      type: "select",
      options: [
        { value: "monthly", label: "Monthly" },
        { value: "quarterly", label: "Quarterly" },
      ],
    },
  ],
};

export function sizingFieldsForFamily(familyId: CuratedSolutionFamily["id"]): SizingField[] {
  return SOLUTION_SIZING_FIELDS[familyId] ?? [];
}

export function defaultSizingAnswers(familyId: CuratedSolutionFamily["id"]): Record<string, string> {
  const fields = sizingFieldsForFamily(familyId);
  const defaults: Record<string, string> = {};
  for (const field of fields) {
    if (field.type === "select") {
      defaults[field.key] = field.options?.[0]?.value ?? "";
    } else {
      defaults[field.key] = String(field.min ?? 1);
    }
  }
  return defaults;
}
