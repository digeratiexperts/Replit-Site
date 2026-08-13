import { describe, expect, it } from "vitest";
import {
  parseZohoTicketId,
  validatePortalTicketUpload,
  PortalTicketUploadError,
} from "./portalTicketUploads";
import { sanitizePortalTicketFilename } from "@shared/portalTicketFileRules";

describe("portal ticket uploads", () => {
  it("parses zoho:id from assignedTo", () => {
    expect(parseZohoTicketId("zoho:123456789")).toBe("123456789");
    expect(parseZohoTicketId("agent-name")).toBeNull();
    expect(parseZohoTicketId(null)).toBeNull();
  });

  it("sanitizes filenames and rejects path traversal", () => {
    expect(sanitizePortalTicketFilename("../../etc/passwd.png")).toBe("passwd.png");
    expect(sanitizePortalTicketFilename("screen shot (1).PNG")).toBe("screen shot _1_.PNG");
  });

  it("accepts PNG magic bytes", () => {
    const png = Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), Buffer.alloc(16)]);
    const result = validatePortalTicketUpload({ filename: "error.png", buffer: png });
    expect(result.contentType).toBe("image/png");
  });

  it("rejects exe disguised as png", () => {
    expect(() =>
      validatePortalTicketUpload({ filename: "payload.png", buffer: Buffer.from("MZ") }),
    ).toThrow(PortalTicketUploadError);
  });

  it("accepts a small log file", () => {
    const result = validatePortalTicketUpload({
      filename: "vpn.log",
      buffer: Buffer.from("2026-08-12 ERROR tunnel down\n"),
    });
    expect(result.contentType).toBe("text/plain");
  });

  it("rejects html posing as a log", () => {
    expect(() =>
      validatePortalTicketUpload({
        filename: "note.log",
        buffer: Buffer.from("<script>alert(1)</script>"),
      }),
    ).toThrow(/plain text/i);
  });
});
