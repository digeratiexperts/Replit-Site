/** Shared portal ticket attachment rules (client + server). */

export const PORTAL_TICKET_MAX_FILE_BYTES = 10 * 1024 * 1024;
export const PORTAL_TICKET_MAX_FILES = 5;

export const PORTAL_TICKET_ALLOWED_EXTENSIONS = ["png", "jpg", "jpeg", "pdf", "txt", "log"] as const;

export const PORTAL_TICKET_ACCEPT =
  ".png,.jpg,.jpeg,.pdf,.txt,.log,image/png,image/jpeg,application/pdf,text/plain";

export type PortalTicketAllowedExtension = (typeof PORTAL_TICKET_ALLOWED_EXTENSIONS)[number];

const EXT_SET = new Set<string>(PORTAL_TICKET_ALLOWED_EXTENSIONS);

export function portalTicketFileExtension(filename: string): string {
  const base = filename.split(/[/\\]/).pop() || "";
  const dot = base.lastIndexOf(".");
  if (dot < 0) return "";
  return base.slice(dot + 1).toLowerCase();
}

export function isAllowedPortalTicketExtension(filename: string): boolean {
  return EXT_SET.has(portalTicketFileExtension(filename));
}

export function sanitizePortalTicketFilename(filename: string): string {
  const base = (filename.split(/[/\\]/).pop() || "attachment").trim();
  const cleaned = base.replace(/[^\w.\- ]+/g, "_").replace(/\s+/g, " ").slice(0, 120);
  return cleaned || "attachment";
}
