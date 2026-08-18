import { billingLabel, money } from "@shared/storeCommerce";
import type { CanonicalQuoteLine, QuoteTotals } from "./storeQuoteCommerce";
import { quoteTotals } from "./storeQuoteCommerce";

export type QuotePdfInput = {
  quoteNumber: string;
  contactName: string;
  contactEmail: string;
  companyName?: string | null;
  createdAt: Date | string;
  requestedItems: CanonicalQuoteLine[];
  message?: string | null;
};

function pdfEscape(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/[^\x09\x20-\x7E]/g, "?");
}

function moneyLabel(value: number): string {
  return `$${money(value).toFixed(2)}`;
}

function wrapLine(text: string, width: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > width) {
      if (current) lines.push(current);
      current = word.length > width ? word.slice(0, width) : word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines.length ? lines : [""];
}

function buildPageContent(lines: string[]): string {
  const commands = [
    "BT",
    "/F1 11 Tf",
    "14 TL",
    "48 744 Td",
    ...lines.map((line, index) => (index === 0 ? `(${pdfEscape(line)}) Tj` : `T* (${pdfEscape(line)}) Tj`)),
    "ET",
  ];
  return commands.join("\n");
}

/**
 * Minimal PDF 1.4 writer — no Puppeteer, no filesystem source of truth.
 * Regenerated on each download from the stored canonical quote.
 */
export function buildQuotePdf(quote: QuotePdfInput): Buffer {
  const totals: QuoteTotals = quoteTotals(quote.requestedItems);
  const submitted =
    quote.createdAt instanceof Date ? quote.createdAt.toISOString().slice(0, 10) : String(quote.createdAt).slice(0, 10);

  const body: string[] = [
    "DIGERATI EXPERTS",
    "Preliminary Solution Quote",
    "",
    `Quote ${quote.quoteNumber}`,
    `Date ${submitted}`,
    `Prepared for ${quote.contactName}`,
    quote.companyName ? `Company ${quote.companyName}` : "",
    `Email ${quote.contactEmail}`,
    "",
    "This PDF restates catalog pricing for the requested solution.",
    "It is not a signed commercial offer. A consultant will confirm terms.",
    "",
    "Line items",
    "----------------------------------------",
  ];

  for (const item of quote.requestedItems) {
    const cadence = billingLabel(item.pricingType);
    const discount =
      item.unitPrice < item.listPrice ? ` (list ${moneyLabel(item.listPrice)})` : "";
    body.push(
      `${item.quantity} x ${item.name}`,
      `  ${item.sku}  ${cadence}  ${moneyLabel(item.unitPrice)} each${discount}  = ${moneyLabel(item.total)}`,
    );
    if (item.contractOnly) body.push("  Contract review required before provisioning.");
  }

  body.push(
    "----------------------------------------",
    `Due today   ${moneyLabel(totals.dueToday)}`,
    `Monthly     ${moneyLabel(totals.monthly)}`,
    `Annual      ${moneyLabel(totals.annual)}`,
    "",
  );

  if (quote.message) {
    body.push("Notes from request");
    body.push(...wrapLine(quote.message.slice(0, 800), 88));
    body.push("");
  }

  body.push(
    "Digerati Experts  |  digeratiexperts.com",
    "Questions: sales@digerati-experts.com  |  325-480-9870",
  );

  const filtered = body.filter((line) => line !== undefined);
  const pages: string[][] = [];
  const perPage = 46;
  for (let i = 0; i < filtered.length; i += perPage) {
    pages.push(filtered.slice(i, i + perPage));
  }

  const objects: string[] = [];
  objects.push("<< /Type /Catalog /Pages 2 0 R >>");
  const pageIds = pages.map((_, index) => 3 + index * 2);
  objects.push(`<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pages.length} >>`);

  const contentIds: number[] = [];
  pages.forEach((pageLines, index) => {
    const pageId = 3 + index * 2;
    const contentId = pageId + 1;
    contentIds.push(contentId);
    objects[pageId - 1] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents ${contentId} 0 R /Resources << /Font << /F1 ${3 + pages.length * 2} 0 R >> >> >>`;
    const stream = buildPageContent(pageLines);
    objects[contentId - 1] = `<< /Length ${Buffer.byteLength(stream, "utf8")} >>\nstream\n${stream}\nendstream`;
  });

  const fontId = 3 + pages.length * 2;
  objects[fontId - 1] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf, "utf8"));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xref = Buffer.byteLength(pdf, "utf8");
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i < offsets.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(pdf, "utf8");
}
