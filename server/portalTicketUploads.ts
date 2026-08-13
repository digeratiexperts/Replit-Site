import {
  PORTAL_TICKET_MAX_FILE_BYTES,
  isAllowedPortalTicketExtension,
  portalTicketFileExtension,
  sanitizePortalTicketFilename,
} from "@shared/portalTicketFileRules";

export {
  PORTAL_TICKET_MAX_FILE_BYTES,
  PORTAL_TICKET_MAX_FILES,
  PORTAL_TICKET_ACCEPT,
  sanitizePortalTicketFilename,
} from "@shared/portalTicketFileRules";

export class PortalTicketUploadError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.name = "PortalTicketUploadError";
    this.status = status;
  }
}

const PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
const JPEG = Buffer.from([0xff, 0xd8, 0xff]);
const PDF = Buffer.from("%PDF");

function looksLikeTextLog(buffer: Buffer): boolean {
  const sample = buffer.subarray(0, Math.min(buffer.length, 1024));
  if (sample.includes(0)) return false;
  const head = sample.toString("utf8").trimStart().slice(0, 32).toLowerCase();
  if (head.startsWith("<!doctype") || head.startsWith("<html") || head.startsWith("<script")) {
    return false;
  }
  let printable = 0;
  for (const byte of sample) {
    if (byte === 9 || byte === 10 || byte === 13 || (byte >= 32 && byte <= 126) || byte >= 128) {
      printable += 1;
    }
  }
  return sample.length === 0 || printable / sample.length >= 0.85;
}

function mimeForExtension(ext: string): string {
  if (ext === "png") return "image/png";
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "pdf") return "application/pdf";
  return "text/plain";
}

export function parseZohoTicketId(assignedTo?: string | null): string | null {
  if (!assignedTo) return null;
  const match = String(assignedTo).match(/^zoho:(\d+)$/i);
  return match?.[1] || null;
}

export function validatePortalTicketUpload(input: {
  filename: string;
  buffer: Buffer;
  declaredMime?: string | null;
}): { filename: string; contentType: string } {
  const filename = sanitizePortalTicketFilename(input.filename);
  if (!isAllowedPortalTicketExtension(filename)) {
    throw new PortalTicketUploadError(
      "File type not allowed. Use PNG, JPG, PDF, or a .txt/.log file.",
    );
  }
  if (!input.buffer?.length) {
    throw new PortalTicketUploadError("File is empty.");
  }
  if (input.buffer.length > PORTAL_TICKET_MAX_FILE_BYTES) {
    throw new PortalTicketUploadError("File is larger than 10MB.");
  }

  const ext = portalTicketFileExtension(filename);
  if (ext === "png" && !input.buffer.subarray(0, 4).equals(PNG)) {
    throw new PortalTicketUploadError("File does not look like a PNG image.");
  }
  if ((ext === "jpg" || ext === "jpeg") && !input.buffer.subarray(0, 3).equals(JPEG)) {
    throw new PortalTicketUploadError("File does not look like a JPEG image.");
  }
  if (ext === "pdf" && !input.buffer.subarray(0, 4).equals(PDF)) {
    throw new PortalTicketUploadError("File does not look like a PDF.");
  }
  if ((ext === "txt" || ext === "log") && !looksLikeTextLog(input.buffer)) {
    throw new PortalTicketUploadError("Log/text files must be plain text.");
  }

  return { filename, contentType: mimeForExtension(ext) };
}
