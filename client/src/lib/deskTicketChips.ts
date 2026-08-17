/**
 * Ticket issue chips for DE Desk.
 * Four paths that match the most common MSP/MSSP work DE actually handles:
 * email/M365, identity/sign-in, endpoint/printer, and security incidents.
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

export type DeskTicketChipId = "email-m365" | "sign-in" | "device" | "security-incident";

export type DeskTicketChip = {
  id: DeskTicketChipId;
  label: string;
  tone: "red" | "blue" | "violet";
  category: DeskTicketCategory;
  priority: DeskTicketPriority;
  subject: string;
  prompt: string;
};

export const DESK_TICKET_CHIPS: DeskTicketChip[] = [
  {
    id: "email-m365",
    label: "Email or Microsoft 365",
    tone: "blue",
    category: "Email",
    priority: "High",
    subject: "Email or Microsoft 365 issue",
    prompt:
      "What's happening (Outlook, Teams, web mail, or something else):\nWho is affected (just you / several people / everyone):\nWhen it started:\nWhat you already tried:\n",
  },
  {
    id: "sign-in",
    label: "Can't sign in",
    tone: "violet",
    category: "Access & Security",
    priority: "High",
    subject: "Sign-in or MFA issue",
    prompt:
      "What's failing (password, MFA, VPN, portal, or a specific app):\nWho is affected:\nWhen it started:\nWhat you already tried:\n",
  },
  {
    id: "device",
    label: "Computer or printer",
    tone: "blue",
    category: "Hardware & Devices",
    priority: "Medium",
    subject: "Computer or printer issue",
    prompt:
      "Which device (computer, laptop, or printer):\nWhat's happening:\nWhen it started:\nWhat you already tried:\n",
  },
  {
    id: "security-incident",
    label: "Possible security incident",
    tone: "red",
    category: "Access & Security",
    priority: "Urgent",
    subject: "Possible security incident",
    prompt:
      "What did you notice (phishing email, unusual login, ransomware warning, or something else):\nWho is affected:\nWhen you first saw it:\nDo not include passwords or MFA codes.\n",
  },
];

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
