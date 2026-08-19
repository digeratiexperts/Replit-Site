import { describe, expect, it } from "vitest";
import {
  DESK_TICKET_CHIPS,
  applyDeskTicketChip,
  isDeskTicketChipPrompt,
} from "./deskTicketChips";

describe("DE Desk ticket chips", () => {
  it("leads with a security incident, then the common helpdesk paths", () => {
    expect(DESK_TICKET_CHIPS.map((chip) => chip.id)).toEqual([
      "security-incident",
      "email-m365",
      "sign-in",
      "device",
      "something-else",
    ]);
    expect(DESK_TICKET_CHIPS.map((chip) => chip.category)).toEqual([
      "Access & Security",
      "Email",
      "Access & Security",
      "Hardware & Devices",
      "Other",
    ]);
    const incident = DESK_TICKET_CHIPS.find((chip) => chip.id === "security-incident");
    expect(incident?.priority).toBe("Urgent");
    expect(incident?.featured).toBe(true);
    expect(incident?.blurb).toMatch(/Phishing/);
    expect(DESK_TICKET_CHIPS.find((chip) => chip.id === "device")?.label).toBe("Computer or device");
  });

  it("fills subject, category, and priority, and seeds a prompt", () => {
    const email = DESK_TICKET_CHIPS.find((chip) => chip.id === "email-m365")!;
    const next = applyDeskTicketChip(email, { message: "" });
    expect(next.subject).toBe("Email or Microsoft 365 issue");
    expect(next.category).toBe("Email");
    expect(next.priority).toBe("High");
    expect(next.message).toContain("Outlook, Teams, web mail");
    expect(isDeskTicketChipPrompt(next.message)).toBe(true);
  });

  it("replaces a previous chip prompt but keeps visitor-written details", () => {
    const email = DESK_TICKET_CHIPS.find((chip) => chip.id === "email-m365")!;
    const signIn = DESK_TICKET_CHIPS.find((chip) => chip.id === "sign-in")!;
    const fromEmail = applyDeskTicketChip(email, { message: "" });
    const switched = applyDeskTicketChip(signIn, { message: fromEmail.message });
    expect(switched.subject).toBe("Sign-in or MFA issue");
    expect(switched.message).toContain("password, MFA, VPN");

    const custom = applyDeskTicketChip(signIn, {
      message: "Outlook will not open on Jane's laptop since 9am.",
    });
    expect(custom.message).toBe("Outlook will not open on Jane's laptop since 9am.");
    expect(custom.priority).toBe("High");
  });
});
