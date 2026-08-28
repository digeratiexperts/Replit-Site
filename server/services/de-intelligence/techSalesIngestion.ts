import { createHash } from "node:crypto";
import { logger } from "../../logger";
import type { HubCompanyDocumentsResponse } from "../../integrations/techSalesClient";
import { storeKnowledgeDocument, type KnowledgeReviewState } from "./storage";
import type { KnowledgeType } from "./types";

type HubDocument = Record<string, unknown>;
type HubDocumentGroup = "contract" | "library";

export type TechSalesIngestionResult = {
  examined: number;
  ingested: number;
  skippedNoText: number;
  skippedUnapproved: number;
  failed: number;
  documentIds: string[];
};

const TEXT_FIELDS = [
  "extractedText",
  "plainText",
  "content",
  "body",
  "markdown",
  "text",
] as const;

const TITLE_FIELDS = ["title", "name", "fileName", "filename", "slug"] as const;
const ID_FIELDS = ["signatureId", "documentId", "id", "slug", "fileName", "filename"] as const;

function stringValue(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const clean = value.replace(/\r\n/g, "\n").trim();
  return clean || undefined;
}

function firstString(document: HubDocument, fields: readonly string[]): string | undefined {
  for (const field of fields) {
    const value = stringValue(document[field]);
    if (value) return value;
    if (typeof document[field] === "number") return String(document[field]);
  }
  return undefined;
}

/**
 * Returns only text explicitly supplied by the Hub. We deliberately do not
 * infer document content from a file name, URL, or contract metadata. Binary
 * PDF/DOCX extraction is a separate connector/parser responsibility.
 */
export function extractHubDocumentText(document: HubDocument): string | null {
  for (const field of TEXT_FIELDS) {
    const value = stringValue(document[field]);
    if (value && value.length >= 40) return value;
  }
  return null;
}

export function classifyHubKnowledgeType(
  document: HubDocument,
  group: HubDocumentGroup,
): KnowledgeType {
  if (group === "contract") return "contract_policy";

  const haystack = [
    firstString(document, TITLE_FIELDS),
    stringValue(document.category),
    stringValue(document.type),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (/\b(microsoft|m365|office 365|entra|intune|exchange|sharepoint|teams)\b/.test(haystack)) {
    return "microsoft_365_documentation";
  }
  if (/\b(network|topology|diagram|firewall|switch|router|vlan|subnet)\b/.test(haystack)) {
    return "network_topology";
  }
  if (/\b(sop|standard operating procedure|runbook|procedure)\b/.test(haystack)) {
    return "sop";
  }
  if (/\b(troubleshoot|troubleshooting|break.?fix|resolution guide)\b/.test(haystack)) {
    return "troubleshooting_guide";
  }
  if (/\b(kb|knowledge base|knowledge article|how.?to)\b/.test(haystack)) {
    return "kb_article";
  }
  if (/\b(product|datasheet|manual|vendor|configuration guide)\b/.test(haystack)) {
    return "product_documentation";
  }
  return "client_documentation";
}

function publishedReviewState(document: HubDocument, group: HubDocumentGroup): KnowledgeReviewState {
  const status = [
    stringValue(document.status),
    stringValue(document.state),
    stringValue(document.signatureStatus),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const explicitPublished =
    document.published === true ||
    document.isPublished === true ||
    document.approved === true ||
    document.isApproved === true;

  if (explicitPublished) return "approved";
  if (/\b(approved|published|signed|executed|active|current|completed)\b/.test(status)) {
    return "approved";
  }

  // A contract without an affirmative signed/executed state must never become
  // policy merely because its metadata appeared in the portal response.
  if (group === "contract") return "needs_review";

  // TechSales library entries are customer-facing material, but unknown state
  // still enters the review queue instead of model retrieval.
  return "needs_review";
}

function safeDate(document: HubDocument): string | undefined {
  for (const field of ["effectiveDate", "signedAt", "approvedAt", "publishedAt", "updatedAt"]) {
    const raw = document[field];
    if (typeof raw !== "string" && !(raw instanceof Date)) continue;
    const date = raw instanceof Date ? raw : new Date(raw);
    if (!Number.isNaN(date.getTime())) return date.toISOString();
  }
  return undefined;
}

function stableExternalId(document: HubDocument, group: HubDocumentGroup, title: string): string {
  return firstString(document, ID_FIELDS) || `${group}:${createHash("sha256").update(title).digest("hex").slice(0, 20)}`;
}

function stableDocumentId(clientId: string, group: HubDocumentGroup, externalId: string): string {
  return `techsales-${createHash("sha256")
    .update(`${clientId}\u0000${group}\u0000${externalId}`)
    .digest("hex")
    .slice(0, 40)}`;
}

function sourceUrl(document: HubDocument): string | undefined {
  for (const field of ["url", "downloadUrl", "viewUrl"]) {
    const value = stringValue(document[field]);
    if (!value) continue;
    try {
      const parsed = new URL(value);
      if (parsed.protocol === "https:") return parsed.toString();
    } catch {
      // Ignore non-URL metadata. It must not become a model-facing source URL.
    }
  }
  return undefined;
}

async function ingestOne(
  clientId: string,
  hubAccountId: string | null,
  document: HubDocument,
  group: HubDocumentGroup,
): Promise<"ingested" | "no_text" | "unapproved"> {
  const text = extractHubDocumentText(document);
  if (!text) return "no_text";

  const title = firstString(document, TITLE_FIELDS) || `${group === "contract" ? "Contract" : "Client document"}`;
  const externalId = stableExternalId(document, group, title);
  const reviewState = publishedReviewState(document, group);
  const knowledgeType = classifyHubKnowledgeType(document, group);
  const status = stringValue(document.status) || stringValue(document.state) || "";
  const slug = stringValue(document.slug);

  const result = await storeKnowledgeDocument({
    id: stableDocumentId(clientId, group, externalId),
    title,
    content: text,
    scope: "client",
    clientId,
    type: knowledgeType,
    status: "active",
    authority: group === "contract" ? 100 : 82,
    reviewState,
    effectiveDate: safeDate(document),
    confidence: reviewState === "approved" ? 0.98 : 0.7,
    source: {
      kind: "document",
      label: group === "contract" ? "TechSales signed/client contract" : "TechSales client document library",
      ...(sourceUrl(document) ? { url: sourceUrl(document) } : {}),
    },
    sourceExternalId: externalId,
    tags: ["techsales", group, ...(slug ? [slug] : [])],
    modes: ["general", "support", "security", "sales"],
    pageTypes: ["portal", "desk"],
    metadata: {
      connector: "techsales",
      sourceGroup: group,
      externalId,
      ...(hubAccountId ? { hubAccountId } : {}),
      ...(slug ? { slug } : {}),
      ...(status ? { upstreamStatus: status } : {}),
    },
  });

  return reviewState === "approved" && result.chunkCount > 0 ? "ingested" : "unapproved";
}

/**
 * Ingest client-facing text returned by the existing authenticated TechSales
 * document bridge. Tenant identity is supplied by the live portal user context,
 * never by document metadata or a browser-provided company name.
 */
export async function ingestTechSalesCompanyKnowledge(options: {
  clientId: string;
  hub: HubCompanyDocumentsResponse;
}): Promise<TechSalesIngestionResult> {
  const clientId = options.clientId.trim();
  if (!clientId) throw new Error("clientId is required for TechSales knowledge ingestion");

  const hubAccountId = options.hub.accountId == null ? null : String(options.hub.accountId);
  const entries: Array<{ document: HubDocument; group: HubDocumentGroup }> = [
    ...(Array.isArray(options.hub.contracts)
      ? options.hub.contracts.filter((d): d is HubDocument => !!d && typeof d === "object").map((document) => ({ document, group: "contract" as const }))
      : []),
    ...(Array.isArray(options.hub.library)
      ? options.hub.library.filter((d): d is HubDocument => !!d && typeof d === "object").map((document) => ({ document, group: "library" as const }))
      : []),
  ];

  const result: TechSalesIngestionResult = {
    examined: entries.length,
    ingested: 0,
    skippedNoText: 0,
    skippedUnapproved: 0,
    failed: 0,
    documentIds: [],
  };

  for (const entry of entries) {
    try {
      const outcome = await ingestOne(clientId, hubAccountId, entry.document, entry.group);
      if (outcome === "no_text") result.skippedNoText += 1;
      else if (outcome === "unapproved") result.skippedUnapproved += 1;
      else {
        result.ingested += 1;
        const title = firstString(entry.document, TITLE_FIELDS) || entry.group;
        const externalId = stableExternalId(entry.document, entry.group, title);
        result.documentIds.push(stableDocumentId(clientId, entry.group, externalId));
      }
    } catch (error) {
      result.failed += 1;
      logger.warn("TechSales knowledge item ingestion failed", {
        clientId,
        group: entry.group,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  logger.info("TechSales knowledge ingestion complete", {
    clientId,
    hubAccountId,
    examined: result.examined,
    ingested: result.ingested,
    skippedNoText: result.skippedNoText,
    skippedUnapproved: result.skippedUnapproved,
    failed: result.failed,
  });

  return result;
}
