import { DE_KNOWLEDGE_CATALOG } from "./catalog";
import type {
  KnowledgeRecord,
  KnowledgeRetrievalHit,
  KnowledgeRetrievalRequest,
  KnowledgeScope,
} from "./types";

const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "but", "by", "for", "from", "how", "i", "in",
  "is", "it", "my", "of", "on", "or", "our", "that", "the", "this", "to", "was", "we", "what",
  "when", "where", "which", "who", "why", "with", "you", "your",
]);

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9+.#-]+/g, " ").replace(/\s+/g, " ").trim();
}

function tokens(value: string): string[] {
  return Array.from(new Set(normalize(value).split(" ").filter((token) => token.length > 1 && !STOP_WORDS.has(token))));
}

function scopeAllowed(record: KnowledgeRecord, scope: KnowledgeScope, clientId?: string): boolean {
  if (record.status !== "active") return false;
  if (scope === "public") return record.scope === "public";
  if (scope === "internal") return record.scope === "public" || record.scope === "internal";
  if (record.scope === "public") return true;
  if (record.scope === "client") return !!clientId && record.clientId === clientId;
  return false;
}

function scoreRecord(record: KnowledgeRecord, request: KnowledgeRetrievalRequest): KnowledgeRetrievalHit {
  const query = normalize(request.query);
  const queryTokens = tokens(query);
  const searchable = normalize([
    record.title,
    record.summary,
    record.content,
    record.vendor,
    record.product,
    record.service,
    ...record.tags,
  ].filter(Boolean).join(" "));
  const searchableTokens = new Set(tokens(searchable));

  let score = record.authority / 100;
  const reasons: string[] = [`authority:${record.authority}`];

  let lexicalMatches = 0;
  for (const token of queryTokens) {
    if (searchableTokens.has(token)) lexicalMatches += 1;
  }
  if (queryTokens.length && lexicalMatches) {
    const lexical = lexicalMatches / queryTokens.length;
    score += lexical * 4;
    reasons.push(`lexical:${lexicalMatches}/${queryTokens.length}`);
  }

  for (const tag of record.tags) {
    const tagNorm = normalize(tag);
    if (tagNorm && query.includes(tagNorm)) {
      score += tagNorm.includes(" ") ? 1.4 : 0.65;
      reasons.push(`tag:${tag}`);
    }
  }

  if (request.mode && record.modes?.includes(request.mode)) {
    score += 1.75;
    reasons.push(`mode:${request.mode}`);
  }
  if (request.pageType && record.pageTypes?.includes(request.pageType)) {
    score += 1.1;
    reasons.push(`page:${request.pageType}`);
  }
  if (record.scope === "client" && request.clientId && record.clientId === request.clientId) {
    score += 3;
    reasons.push("client-match");
  }

  return { record, score, reasons };
}

export function retrieveKnowledge(
  request: KnowledgeRetrievalRequest,
  catalog: KnowledgeRecord[] = DE_KNOWLEDGE_CATALOG,
): KnowledgeRetrievalHit[] {
  const limit = Math.max(1, Math.min(request.limit ?? 6, 12));
  return catalog
    .filter((record) => scopeAllowed(record, request.scope, request.clientId))
    .map((record) => scoreRecord(record, request))
    .sort((a, b) => b.score - a.score || b.record.authority - a.record.authority || a.record.id.localeCompare(b.record.id))
    .slice(0, limit);
}

export function formatKnowledgeForPrompt(hits: KnowledgeRetrievalHit[]): string {
  if (!hits.length) return "No governed DE knowledge matched this turn. Do not invent DE-specific facts; ask one clarifying question or route to support.";

  return hits
    .map(({ record }, index) => [
      `[DE SOURCE ${index + 1}: ${record.id}]`,
      `Title: ${record.title}`,
      `Type: ${record.type}; authority=${record.authority}; scope=${record.scope}; effective=${record.effectiveDate || "unspecified"}`,
      `Source: ${record.source.label}`,
      record.content,
    ].join("\n"))
    .join("\n\n");
}

export function retrievePublicKnowledge(params: {
  query: string;
  mode?: string;
  pageType?: string;
  limit?: number;
}): KnowledgeRetrievalHit[] {
  return retrieveKnowledge({
    query: params.query,
    scope: "public",
    mode: params.mode,
    pageType: params.pageType,
    limit: params.limit,
  });
}
