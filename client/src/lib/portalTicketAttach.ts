import {
  PORTAL_TICKET_ACCEPT,
  PORTAL_TICKET_MAX_FILE_BYTES,
  PORTAL_TICKET_MAX_FILES,
  isAllowedPortalTicketExtension,
  sanitizePortalTicketFilename,
} from "@shared/portalTicketFileRules";
import { portalFetch } from "./portalApi";

export { PORTAL_TICKET_ACCEPT, PORTAL_TICKET_MAX_FILE_BYTES, PORTAL_TICKET_MAX_FILES };

export function validatePortalTicketFile(file: File): string | null {
  if (!isAllowedPortalTicketExtension(file.name)) {
    return `${file.name}: use PNG, JPG, PDF, or a .txt/.log file.`;
  }
  if (file.size <= 0) {
    return `${file.name}: file is empty.`;
  }
  if (file.size > PORTAL_TICKET_MAX_FILE_BYTES) {
    return `${file.name}: larger than 10MB.`;
  }
  return null;
}

export async function uploadPortalTicketAttachment(ticketId: string, file: File): Promise<void> {
  const filename = sanitizePortalTicketFilename(file.name);
  const response = await portalFetch(`/api/portal/tickets/${ticketId}/attachments`, {
    method: "POST",
    headers: {
      "Content-Type": file.type || "application/octet-stream",
      "X-Filename": encodeURIComponent(filename),
    },
    body: file,
  });

  if (!response.ok) {
    const text = await response.text();
    let message = text;
    try {
      const json = JSON.parse(text) as { error?: string; message?: string };
      message = json.error || json.message || text;
    } catch {
      /* keep text */
    }
    throw new Error(message || "Could not attach the file.");
  }
}
