import { createHash } from "crypto";
import { sql } from "drizzle-orm";
import { db, dbReady, initPromise } from "../../db";
import type {
  KnowledgeRecord,
  KnowledgeRetrievalRequest,
  KnowledgeScope,
  KnowledgeSource,
  KnowledgeStatus,
  KnowledgeType,
} from "./types";

export type KnowledgeReviewState = "proposed" | "approved" | "rejected" | "needs_review";

export type StoredDocumentInput = {
  id?: string;
  title: string;
  content: string;
  scope: KnowledgeScope;
  type: KnowledgeType;
  status?: KnowledgeStatus;
  authority: number;
  clientId?: string;
  effectiveDate?: string;
  reviewedAt?: string;
  reviewState?: KnowledgeReviewState;
  reviewer?: string;
  vendor?: string;
  product?: string;
  service?: string;
  tags?: string[];
  modes?: string[];
  pageTypes?: string[];
  source: KnowledgeSource;
  sourceExternalId?: string;
  supersedesDocumentId?: string;
  confidence?: number;
  metadata?: Record<string, unknown>;
};

export type IntelligenceStorageStatus = {
  initialized: boolean;
  durable: boolean;
  fullText: boolean;
  pgvector: boolean;
  memoryRecords: number;
};

const memoryRecords = new Map<string, KnowledgeRecord>();
let initialized = false;
let schemaReady = false;
let vectorReady = false;

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function normalizeRows(result: unknown): any[] {
  if (Array.isArray(result)) return result;
  const rows = (result as any)?.rows;
  return Array.isArray(rows) ? rows : [];
}

function toIso(value: unknown): string | undefined {
  if (!value) return undefined;
  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function jsonArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value !== "string") return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

function validateScope(scope: KnowledgeScope, clientId?: string): void {
  if (scope === "client" && !clientId) {
    throw new Error("clientId is required for client-scoped knowledge");
  }
  if (scope !== "client" && clientId) {
    throw new Error("clientId may only be supplied for client-scoped knowledge");
  }
}

function validateAuthority(authority: number): void {
  if (!Number.isFinite(authority) || authority < 0 || authority > 100) {
    throw new Error("authority must be between 0 and 100");
  }
}

function validateConfidence(confidence?: number): void {
  if (confidence == null) return;
  if (!Number.isFinite(confidence) || confidence < 0 || confidence > 1) {
    throw new Error("confidence must be between 0 and 1");
  }
}

/**
 * Paragraph-aware text chunker. The overlap preserves context across chunk
 * boundaries without letting a very large PDF/DOCX become one model prompt.
 */
export function chunkKnowledgeText(
  content: string,
  maxChars = 1800,
  overlapChars = 220,
): string[] {
  const clean = content.replace(/\r\n/g, "\n").replace(/[ \t]+/g, " ").trim();
  if (!clean) return [];
  if (clean.length <= maxChars) return [clean];

  const paragraphs = clean.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const chunks: string[] = [];
  let current = "";

  const flush = () => {
    const text = current.trim();
    if (!text) return;
    chunks.push(text);
    current = text.slice(Math.max(0, text.length - overlapChars));
  };

  for (const paragraph of paragraphs) {
    if (paragraph.length > maxChars) {
      if (current.trim()) flush();
      current = "";
      for (let start = 0; start < paragraph.length;) {
        const end = Math.min(start + maxChars, paragraph.length);
        chunks.push(paragraph.slice(start, end).trim());
        if (end >= paragraph.length) break;
        start = Math.max(start + 1, end - overlapChars);
      }
      continue;
    }

    const candidate = current ? `${current}\n\n${paragraph}` : paragraph;
    if (candidate.length > maxChars) flush();
    current = current ? `${current}\n\n${paragraph}` : paragraph;
  }

  if (current.trim()) chunks.push(current.trim());
  return Array.from(new Set(chunks.filter(Boolean)));
}

async function ensureSchema(): Promise<void> {
  if (schemaReady || !dbReady || !db) return;

  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS de_knowledge_sources (
        id varchar PRIMARY KEY,
        kind text NOT NULL,
        label text NOT NULL,
        url text,
        external_id text,
        created_at timestamptz DEFAULT now() NOT NULL,
        updated_at timestamptz DEFAULT now() NOT NULL
      )
    `);
    await db.execute(sql`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_de_knowledge_source_identity
      ON de_knowledge_sources (kind, label, COALESCE(external_id, ''))
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS de_knowledge_documents (
        id varchar PRIMARY KEY,
        source_id varchar NOT NULL,
        title text NOT NULL,
        scope text NOT NULL,
        client_id varchar,
        type text NOT NULL,
        status text NOT NULL DEFAULT 'active',
        authority integer NOT NULL,
        effective_date timestamptz,
        reviewed_at timestamptz,
        review_state text NOT NULL DEFAULT 'proposed',
        reviewer text,
        content_hash varchar NOT NULL,
        supersedes_document_id varchar,
        metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
        created_at timestamptz DEFAULT now() NOT NULL,
        updated_at timestamptz DEFAULT now() NOT NULL
      )
    `);
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_de_knowledge_documents_scope_client
      ON de_knowledge_documents (scope, client_id, status, updated_at DESC)
    `);
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_de_knowledge_documents_hash
      ON de_knowledge_documents (content_hash)
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS de_knowledge_records (
        id varchar PRIMARY KEY,
        document_id varchar NOT NULL,
        title text NOT NULL,
        summary text NOT NULL,
        scope text NOT NULL,
        type text NOT NULL,
        status text NOT NULL DEFAULT 'active',
        authority integer NOT NULL,
        effective_date timestamptz,
        reviewed_at timestamptz,
        client_id varchar,
        vendor text,
        product text,
        service text,
        tags jsonb NOT NULL DEFAULT '[]'::jsonb,
        modes jsonb NOT NULL DEFAULT '[]'::jsonb,
        page_types jsonb NOT NULL DEFAULT '[]'::jsonb,
        source_kind text NOT NULL,
        source_label text NOT NULL,
        source_url text,
        confidence double precision,
        review_state text NOT NULL DEFAULT 'proposed',
        reviewer text,
        supersedes_record_id varchar,
        created_at timestamptz DEFAULT now() NOT NULL,
        updated_at timestamptz DEFAULT now() NOT NULL
      )
    `);
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_de_knowledge_records_scope_client
      ON de_knowledge_records (scope, client_id, status, authority DESC)
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS de_knowledge_chunks (
        id varchar PRIMARY KEY,
        document_id varchar NOT NULL,
        record_id varchar NOT NULL,
        chunk_index integer NOT NULL,
        content text NOT NULL,
        content_hash varchar NOT NULL,
        token_estimate integer NOT NULL DEFAULT 0,
        embedding_model text,
        created_at timestamptz DEFAULT now() NOT NULL,
        updated_at timestamptz DEFAULT now() NOT NULL,
        UNIQUE (record_id, chunk_index)
      )
    `);
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_de_knowledge_chunks_document
      ON de_knowledge_chunks (document_id, chunk_index)
    `);
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_de_knowledge_chunks_fts
      ON de_knowledge_chunks USING GIN (to_tsvector('english'::regconfig, content))
    `);

    // Empty strings are used for optional dimensions so the uniqueness rule is
    // ordinary SQL, deterministic, and safe for ON CONFLICT.
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS de_knowledge_gaps (
        id varchar PRIMARY KEY,
        query text NOT NULL,
        query_hash varchar NOT NULL,
        scope text NOT NULL,
        client_id varchar NOT NULL DEFAULT '',
        mode text NOT NULL DEFAULT '',
        page_type text NOT NULL DEFAULT '',
        reason text NOT NULL,
        status text NOT NULL DEFAULT 'open',
        occurrences integer NOT NULL DEFAULT 1,
        first_seen_at timestamptz DEFAULT now() NOT NULL,
        last_seen_at timestamptz DEFAULT now() NOT NULL,
        resolved_record_id varchar,
        UNIQUE (query_hash, scope, client_id, mode, page_type, status)
      )
    `);
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_de_knowledge_gaps_open
      ON de_knowledge_gaps (status, occurrences DESC, last_seen_at DESC)
    `);

    // pgvector is an enhancement, never a startup dependency. Managed DB roles
    // that cannot create the extension continue with PostgreSQL FTS.
    try {
      await db.execute(sql`CREATE EXTENSION IF NOT EXISTS vector`);
      await db.execute(sql`
        ALTER TABLE de_knowledge_chunks
        ADD COLUMN IF NOT EXISTS embedding vector(1536)
      `);
      vectorReady = true;
    } catch (error: any) {
      vectorReady = false;
      console.warn(
        "[de-intelligence] pgvector unavailable; continuing with full-text + governed reranking:",
        error?.message || error,
      );
    }

    schemaReady = true;
  } catch (error: any) {
    schemaReady = false;
    console.warn(
      "[de-intelligence] durable schema unavailable; bootstrap/memory retrieval remains active:",
      error?.message || error,
    );
  }
}

export async function initDeIntelligenceStorage(): Promise<IntelligenceStorageStatus> {
  if (!initialized) {
    await initPromise;
    await ensureSchema();
    initialized = true;
  }
  return getIntelligenceStorageStatus();
}

export function getIntelligenceStorageStatus(): IntelligenceStorageStatus {
  return {
    initialized,
    durable: !!(dbReady && db && schemaReady),
    fullText: !!(dbReady && db && schemaReady),
    pgvector: vectorReady,
    memoryRecords: memoryRecords.size,
  };
}

function allowedScopeSql(scope: KnowledgeScope, clientId?: string) {
  validateScope(scope, clientId);
  if (scope === "public") return sql`r.scope = 'public'`;
  if (scope === "internal") return sql`r.scope IN ('public', 'internal')`;
  return sql`(r.scope = 'public' OR (r.scope = 'client' AND r.client_id = ${clientId!}))`;
}

function allowedInMemory(record: KnowledgeRecord, request: KnowledgeRetrievalRequest): boolean {
  if (record.status !== "active") return false;
  if (request.scope === "public") return record.scope === "public";
  if (request.scope === "internal") return record.scope === "public" || record.scope === "internal";
  return record.scope === "public" || (
    record.scope === "client" && !!request.clientId && record.clientId === request.clientId
  );
}

function rowToKnowledgeRecord(row: any): KnowledgeRecord {
  const effectiveDate = toIso(row.effective_date);
  const reviewedAt = toIso(row.reviewed_at);
  const ingestedAt = toIso(row.updated_at);
  return {
    id: `${String(row.record_id)}#${Number(row.chunk_index)}`,
    title: String(row.title),
    summary: String(row.summary),
    content: String(row.chunk_content),
    scope: String(row.scope) as KnowledgeScope,
    type: String(row.type) as KnowledgeType,
    status: String(row.status) as KnowledgeStatus,
    authority: Number(row.authority),
    ...(effectiveDate ? { effectiveDate } : {}),
    ...(reviewedAt ? { reviewedAt } : {}),
    ...(row.client_id ? { clientId: String(row.client_id) } : {}),
    ...(row.vendor ? { vendor: String(row.vendor) } : {}),
    ...(row.product ? { product: String(row.product) } : {}),
    ...(row.service ? { service: String(row.service) } : {}),
    tags: jsonArray(row.tags),
    modes: jsonArray(row.modes),
    pageTypes: jsonArray(row.page_types),
    source: {
      kind: String(row.source_kind) as KnowledgeSource["kind"],
      label: String(row.source_label),
      ...(row.source_url ? { url: String(row.source_url) } : {}),
    },
    sourceDocumentId: String(row.document_id),
    chunkIndex: Number(row.chunk_index),
    ...(ingestedAt ? { ingestedAt } : {}),
    ...(row.confidence == null ? {} : { confidence: Number(row.confidence) }),
    ...(row.reviewer ? { reviewedBy: String(row.reviewer) } : {}),
  };
}

const SELECT_COLUMNS = sql`
  r.id AS record_id,
  r.document_id,
  r.title,
  r.summary,
  r.scope,
  r.type,
  r.status,
  r.authority,
  r.effective_date,
  r.reviewed_at,
  r.client_id,
  r.vendor,
  r.product,
  r.service,
  r.tags,
  r.modes,
  r.page_types,
  r.source_kind,
  r.source_label,
  r.source_url,
  r.confidence,
  r.reviewer,
  c.chunk_index,
  c.content AS chunk_content,
  c.updated_at
`;

/**
 * Hard tenancy filtering is performed in SQL before any candidate reaches the
 * model-facing reranker. This is the security boundary for durable knowledge.
 */
export async function searchStoredKnowledge(
  request: KnowledgeRetrievalRequest,
  candidateLimit = 40,
): Promise<KnowledgeRecord[]> {
  await initDeIntelligenceStorage();
  validateScope(request.scope, request.clientId);

  const inMemory = Array.from(memoryRecords.values()).filter((record) =>
    allowedInMemory(record, request),
  );
  if (!(dbReady && db && schemaReady)) return inMemory;

  const limit = Math.max(1, Math.min(candidateLimit, 100));
  const scopePredicate = allowedScopeSql(request.scope, request.clientId);
  const query = request.query.trim();

  try {
    const result = query
      ? await db.execute(sql`
          SELECT ${SELECT_COLUMNS},
            ts_rank(
              to_tsvector(
                'english'::regconfig,
                COALESCE(r.title, '') || ' ' || COALESCE(r.summary, '') || ' ' || COALESCE(c.content, '')
              ),
              websearch_to_tsquery('english'::regconfig, ${query})
            ) AS text_rank
          FROM de_knowledge_records r
          JOIN de_knowledge_chunks c ON c.record_id = r.id
          WHERE r.status = 'active'
            AND ${scopePredicate}
            AND to_tsvector(
                  'english'::regconfig,
                  COALESCE(r.title, '') || ' ' || COALESCE(r.summary, '') || ' ' || COALESCE(c.content, '')
                ) @@ websearch_to_tsquery('english'::regconfig, ${query})
          ORDER BY text_rank DESC, r.authority DESC, r.updated_at DESC
          LIMIT ${limit}
        `)
      : await db.execute(sql`
          SELECT ${SELECT_COLUMNS}, 0 AS text_rank
          FROM de_knowledge_records r
          JOIN de_knowledge_chunks c ON c.record_id = r.id
          WHERE r.status = 'active' AND ${scopePredicate}
          ORDER BY r.authority DESC, r.updated_at DESC
          LIMIT ${limit}
        `);

    const merged = new Map<string, KnowledgeRecord>();
    for (const row of normalizeRows(result)) {
      const record = rowToKnowledgeRecord(row);
      merged.set(record.id, record);
    }
    for (const record of inMemory) merged.set(record.id, record);
    return Array.from(merged.values());
  } catch (error: any) {
    console.warn(
      "[de-intelligence] durable search failed; using in-memory candidates:",
      error?.message || error,
    );
    return inMemory;
  }
}

/**
 * Ingest an already-extracted text artifact. Phase 3 parsers/connectors feed
 * this contract, so source and tenant metadata are preserved independently of
 * whether the original artifact was PDF, DOCX, Markdown, HTML, a ticket, etc.
 */
export async function storeKnowledgeDocument(input: StoredDocumentInput): Promise<{
  documentId: string;
  recordId: string;
  chunkCount: number;
  durable: boolean;
  duplicate: boolean;
}> {
  validateScope(input.scope, input.clientId);
  validateAuthority(input.authority);
  validateConfidence(input.confidence);
  const title = input.title.trim();
  const content = input.content.trim();
  if (!title) throw new Error("title is required");
  if (!content) throw new Error("content is required");

  await initDeIntelligenceStorage();

  const hash = sha256(content);
  const documentId = input.id || `de-doc-${hash.slice(0, 20)}`;
  const recordId = `de-record-${hash.slice(0, 20)}`;
  const sourceId = `de-source-${sha256(
    `${input.source.kind}|${input.source.label}|${input.sourceExternalId || ""}`,
  ).slice(0, 20)}`;
  const chunks = chunkKnowledgeText(content);
  const summary = content.slice(0, 420);
  const now = new Date().toISOString();

  chunks.forEach((chunk, index) => {
    const record: KnowledgeRecord = {
      id: `${recordId}#${index}`,
      title,
      summary,
      content: chunk,
      scope: input.scope,
      type: input.type,
      status: input.status || "active",
      authority: input.authority,
      ...(input.effectiveDate ? { effectiveDate: input.effectiveDate } : {}),
      ...(input.reviewedAt ? { reviewedAt: input.reviewedAt } : {}),
      ...(input.clientId ? { clientId: input.clientId } : {}),
      ...(input.vendor ? { vendor: input.vendor } : {}),
      ...(input.product ? { product: input.product } : {}),
      ...(input.service ? { service: input.service } : {}),
      tags: input.tags || [],
      modes: input.modes || [],
      pageTypes: input.pageTypes || [],
      source: input.source,
      sourceDocumentId: documentId,
      chunkIndex: index,
      ingestedAt: now,
      ...(input.confidence == null ? {} : { confidence: input.confidence }),
      ...(input.reviewer ? { reviewedBy: input.reviewer } : {}),
    };
    memoryRecords.set(record.id, record);
  });

  if (!(dbReady && db && schemaReady)) {
    return { documentId, recordId, chunkCount: chunks.length, durable: false, duplicate: false };
  }

  try {
    const duplicateRows = normalizeRows(await db.execute(sql`
      SELECT id FROM de_knowledge_documents
      WHERE content_hash = ${hash}
        AND scope = ${input.scope}
        AND COALESCE(client_id, '') = ${input.clientId || ""}
        AND id <> ${documentId}
      LIMIT 1
    `));
    const duplicate = duplicateRows.length > 0;

    await db.execute(sql`
      INSERT INTO de_knowledge_sources (id, kind, label, url, external_id, updated_at)
      VALUES (
        ${sourceId}, ${input.source.kind}, ${input.source.label},
        ${input.source.url || null}, ${input.sourceExternalId || null}, now()
      )
      ON CONFLICT (id) DO UPDATE SET
        label = EXCLUDED.label,
        url = EXCLUDED.url,
        external_id = EXCLUDED.external_id,
        updated_at = now()
    `);

    await db.execute(sql`
      INSERT INTO de_knowledge_documents (
        id, source_id, title, scope, client_id, type, status, authority,
        effective_date, reviewed_at, review_state, reviewer, content_hash,
        supersedes_document_id, metadata, updated_at
      ) VALUES (
        ${documentId}, ${sourceId}, ${title}, ${input.scope}, ${input.clientId || null},
        ${input.type}, ${input.status || "active"}, ${input.authority},
        ${input.effectiveDate ? new Date(input.effectiveDate) : null},
        ${input.reviewedAt ? new Date(input.reviewedAt) : null},
        ${input.reviewState || "proposed"}, ${input.reviewer || null}, ${hash},
        ${input.supersedesDocumentId || null}, ${JSON.stringify(input.metadata || {})}::jsonb, now()
      )
      ON CONFLICT (id) DO UPDATE SET
        source_id = EXCLUDED.source_id,
        title = EXCLUDED.title,
        status = EXCLUDED.status,
        authority = EXCLUDED.authority,
        effective_date = EXCLUDED.effective_date,
        reviewed_at = EXCLUDED.reviewed_at,
        review_state = EXCLUDED.review_state,
        reviewer = EXCLUDED.reviewer,
        content_hash = EXCLUDED.content_hash,
        supersedes_document_id = EXCLUDED.supersedes_document_id,
        metadata = EXCLUDED.metadata,
        updated_at = now()
    `);

    await db.execute(sql`
      INSERT INTO de_knowledge_records (
        id, document_id, title, summary, scope, type, status, authority,
        effective_date, reviewed_at, client_id, vendor, product, service,
        tags, modes, page_types, source_kind, source_label, source_url,
        confidence, review_state, reviewer, updated_at
      ) VALUES (
        ${recordId}, ${documentId}, ${title}, ${summary}, ${input.scope}, ${input.type},
        ${input.status || "active"}, ${input.authority},
        ${input.effectiveDate ? new Date(input.effectiveDate) : null},
        ${input.reviewedAt ? new Date(input.reviewedAt) : null}, ${input.clientId || null},
        ${input.vendor || null}, ${input.product || null}, ${input.service || null},
        ${JSON.stringify(input.tags || [])}::jsonb,
        ${JSON.stringify(input.modes || [])}::jsonb,
        ${JSON.stringify(input.pageTypes || [])}::jsonb,
        ${input.source.kind}, ${input.source.label}, ${input.source.url || null},
        ${input.confidence ?? null}, ${input.reviewState || "proposed"},
        ${input.reviewer || null}, now()
      )
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        summary = EXCLUDED.summary,
        status = EXCLUDED.status,
        authority = EXCLUDED.authority,
        effective_date = EXCLUDED.effective_date,
        reviewed_at = EXCLUDED.reviewed_at,
        vendor = EXCLUDED.vendor,
        product = EXCLUDED.product,
        service = EXCLUDED.service,
        tags = EXCLUDED.tags,
        modes = EXCLUDED.modes,
        page_types = EXCLUDED.page_types,
        source_label = EXCLUDED.source_label,
        source_url = EXCLUDED.source_url,
        confidence = EXCLUDED.confidence,
        review_state = EXCLUDED.review_state,
        reviewer = EXCLUDED.reviewer,
        updated_at = now()
    `);

    await db.execute(sql`DELETE FROM de_knowledge_chunks WHERE record_id = ${recordId}`);
    for (let index = 0; index < chunks.length; index += 1) {
      const chunk = chunks[index];
      await db.execute(sql`
        INSERT INTO de_knowledge_chunks (
          id, document_id, record_id, chunk_index, content, content_hash,
          token_estimate, updated_at
        ) VALUES (
          ${`${recordId}-chunk-${index}`}, ${documentId}, ${recordId}, ${index},
          ${chunk}, ${sha256(chunk)}, ${Math.ceil(chunk.length / 4)}, now()
        )
        ON CONFLICT (record_id, chunk_index) DO UPDATE SET
          content = EXCLUDED.content,
          content_hash = EXCLUDED.content_hash,
          token_estimate = EXCLUDED.token_estimate,
          updated_at = now()
      `);
    }

    if (input.supersedesDocumentId) {
      await db.execute(sql`
        UPDATE de_knowledge_documents
        SET status = 'superseded', updated_at = now()
        WHERE id = ${input.supersedesDocumentId} AND id <> ${documentId}
      `);
      await db.execute(sql`
        UPDATE de_knowledge_records
        SET status = 'superseded', updated_at = now()
        WHERE document_id = ${input.supersedesDocumentId}
      `);
    }

    return { documentId, recordId, chunkCount: chunks.length, durable: true, duplicate };
  } catch (error: any) {
    console.warn(
      "[de-intelligence] durable ingest failed; current process retains memory copy:",
      error?.message || error,
    );
    return { documentId, recordId, chunkCount: chunks.length, durable: false, duplicate: false };
  }
}

export async function recordKnowledgeGap(input: {
  query: string;
  scope: KnowledgeScope;
  clientId?: string;
  mode?: string;
  pageType?: string;
  reason: string;
}): Promise<void> {
  validateScope(input.scope, input.clientId);
  const query = input.query.trim();
  if (!query) return;

  await initDeIntelligenceStorage();
  if (!(dbReady && db && schemaReady)) return;

  const queryHash = sha256(query.toLowerCase());
  const gapId = `de-gap-${sha256(
    `${queryHash}|${input.scope}|${input.clientId || ""}|${input.mode || ""}|${input.pageType || ""}`,
  ).slice(0, 20)}`;
  try {
    await db.execute(sql`
      INSERT INTO de_knowledge_gaps (
        id, query, query_hash, scope, client_id, mode, page_type,
        reason, status, occurrences, last_seen_at
      ) VALUES (
        ${gapId}, ${query}, ${queryHash}, ${input.scope}, ${input.clientId || ""},
        ${input.mode || ""}, ${input.pageType || ""}, ${input.reason}, 'open', 1, now()
      )
      ON CONFLICT (query_hash, scope, client_id, mode, page_type, status)
      DO UPDATE SET
        occurrences = de_knowledge_gaps.occurrences + 1,
        reason = EXCLUDED.reason,
        last_seen_at = now()
    `);
  } catch (error: any) {
    console.warn("[de-intelligence] knowledge-gap write failed:", error?.message || error);
  }
}

/** pgvector write hook for the Phase 3 embedding worker. */
export async function storeChunkEmbedding(params: {
  chunkId: string;
  embedding: number[];
  model?: string;
}): Promise<boolean> {
  await initDeIntelligenceStorage();
  if (!(dbReady && db && schemaReady && vectorReady)) return false;
  if (params.embedding.length !== 1536 || params.embedding.some((n) => !Number.isFinite(n))) {
    throw new Error("embedding must contain exactly 1536 finite numbers");
  }

  const vectorLiteral = `[${params.embedding.join(",")}]`;
  try {
    await db.execute(sql`
      UPDATE de_knowledge_chunks
      SET embedding = ${vectorLiteral}::vector,
          embedding_model = ${params.model || "text-embedding-3-small"},
          updated_at = now()
      WHERE id = ${params.chunkId}
    `);
    return true;
  } catch (error: any) {
    console.warn("[de-intelligence] embedding write failed:", error?.message || error);
    return false;
  }
}

export function _resetIntelligenceMemoryForTests(): void {
  memoryRecords.clear();
}
