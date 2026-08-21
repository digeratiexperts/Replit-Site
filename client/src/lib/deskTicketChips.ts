/**
 * Ticket issue chips for DE Desk Get Support.
 * Incident first, then the paths a visitor can name in a few seconds.
 * Labels are functions, not vendor products.
 */

export const DESK_TICKET_PRIORITIES = ["Low", "Medium", "High", "Urgent"] as const;
export type DeskTicketPriority = (typeof DESK_TICKET_PRIORITIES)[number];

export const DESK_TICKET_CATEGORIES = [
  "Email",
  "Access & Security",
  "Network & VPN",
  "Software & Applications",
  "Hardware & Devices",
  "Backup & Recovery",
  "Collaboration",
  "Other",
] as const;
export type DeskTicketCategory = (typeof DESK_TICKET_CATEGORIES)[number];

export type DeskTicketChipId =
  | "security-incident"
  | "something-not-working"
  | "sign-in"
  | "email"
  | "device"
  | "network"
  | "security-concern"
  | "something-else";

export type DeskTicketChip = {
  id: DeskTicketChipId;
  label: string;
  blurb?: string;
  featured?: boolean;
  tone: "red" | "blue" | "violet";
  category: DeskTicketCategory;
  priority: DeskTicketPriority;
  subject: string;
  prompt: string;
};

export const DESK_TICKET_CHIPS: DeskTicketChip[] = [
  {
    id: "security-incident",
    label: "Possible security incident",
    blurb: "Phishing, suspicious login, compromised account, malware, or ransomware.",
    featured: true,
    tone: "red",
    category: "Access & Security",
    priority: "Urgent",
    subject: "Possible security incident",
    prompt:
      "What did you notice (phishing email, unusual login, ransomware warning, or something else):\nWho is affected:\nWhen you first saw it:\nDo not include passwords or MFA codes.\n",
  },
  {
    id: "something-not-working",
    label: "Something isn't working",
    tone: "blue",
    category: "Other",
    priority: "Medium",
    subject: "Something isn't working",
    prompt:
      "What's broken:\nWho is affected (just you / several people / everyone):\nWhen it started:\nWhat you already tried:\n",
  },
  {
    id: "sign-in",
    label: "Account / login problem",
    tone: "violet",
    category: "Access & Security",
    priority: "High",
    subject: "Account or login problem",
    prompt:
      "What's failing (password, MFA, VPN, portal, or a specific app):\nWho is affected:\nWhen it started:\nWhat you already tried:\n",
  },
  {
    id: "email",
    label: "Email problem",
    tone: "blue",
    category: "Email",
    priority: "High",
    subject: "Email problem",
    prompt:
      "What's happening (can't send, can't receive, missing mail, or something else):\nWho is affected:\nWhen it started:\nWhat you already tried:\n",
  },
  {
    id: "device",
    label: "Device problem",
    tone: "blue",
    category: "Hardware & Devices",
    priority: "Medium",
    subject: "Device problem",
    prompt:
      "Which device (computer, laptop, phone, or other):\nWhat's happening:\nWhen it started:\nWhat you already tried:\n",
  },
  {
    id: "network",
    label: "Network / Internet problem",
    tone: "blue",
    category: "Network & VPN",
    priority: "High",
    subject: "Network or Internet problem",
    prompt:
      "What's failing (no internet, slow, Wi-Fi, VPN, or a specific office):\nWho is affected:\nWhen it started:\nWhat you already tried:\n",
  },
  {
    id: "security-concern",
    label: "Security concern",
    tone: "violet",
    category: "Access & Security",
    priority: "High",
    subject: "Security concern",
    prompt:
      "What are you seeing that doesn't look right:\nWho is affected:\nWhen you first noticed it:\nDo not include passwords or MFA codes.\n",
  },
  {
    id: "something-else",
    label: "Other",
    tone: "blue",
    category: "Other",
    priority: "Medium",
    subject: "Support request",
    prompt:
      "What's happening:\nWho is affected:\nWhen it started:\nWhat you already tried:\n",
  },
];

export const DESK_STANDARD_TICKET_CHIPS = DESK_TICKET_CHIPS.filter((chip) => !chip.featured);
export const DESK_INCIDENT_CHIP = DESK_TICKET_CHIPS.find((chip) => chip.id === "security-incident")!;

export function deskTicketChipById(id: DeskTicketChipId | null): DeskTicketChip | undefined {
  return DESK_TICKET_CHIPS.find((chip) => chip.id === id);
}

export function isDeskTicketChipPrompt(message: string): boolean {
  const normalized = message.replace(/\s+$/g, "");
  return DESK_TICKET_CHIPS.some((chip) => chip.prompt.replace(/\s+$/g, "") === normalized);
}

export function applyDeskTicketChip(
  chip: DeskTicketChip,
  current: { message: string },
): {
  subject: string;
  category: DeskTicketCategory;
  priority: DeskTicketPriority;
  message: string;
  chipId: DeskTicketChipId;
} {
  const canReplacePrompt = !current.message.trim() || isDeskTicketChipPrompt(current.message);
  return {
    subject: chip.subject,
    category: chip.category,
    priority: chip.priority,
    message: canReplacePrompt ? chip.prompt : current.message,
    chipId: chip.id,
  };
}
