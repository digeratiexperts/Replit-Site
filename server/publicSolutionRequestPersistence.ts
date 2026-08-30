import type { PublicSolutionRequest } from "./publicSolutionRequestStore";
import { initPromise, pool } from "./db";

const DRAFT_TTL_DAYS = 30;
let schemaPromise: Promise<void> | null = null;

async function ensureSchema(): Promise<boolean> {
  if (!process.env.DATABASE_URL) return false;
  const ready = await initPromise;
  if (!ready || !pool) {
    throw new Error("DATABASE_URL is configured but solution-draft persistence is unavailable");
  }
  if (!schemaPromise) {
    schemaPromise = (async () => {
      const client = await pool.connect();
      try {
        await client.query(`CREATE TABLE IF NOT EXISTS public_solution_requests (
          id varchar PRIMARY KEY,
          session_id varchar NOT NULL,
          status text NOT NULL,
          payload jsonb NOT NULL,
          created_at timestamptz NOT NULL,
          updated_at timestamptz NOT NULL,
          expires_at timestamptz NOT NULL
        )`);
        await client.query(`CREATE INDEX IF NOT EXISTS public_solution_requests_session_idx
          ON public_solution_requests (session_id, updated_at DESC)`);
        await client.query(`CREATE INDEX IF NOT EXISTS public_solution_requests_expiry_idx
          ON public_solution_requests (status, expires_at)`);
      } finally {
        client.release();
      }
    })().catch((error) => {
      schemaPromise = null;
      throw error;
    });
  }
  await schemaPromise;
  return true;
}

function expiryFor(record: PublicSolutionRequest): Date {
  const base = new Date(record.updatedAt).getTime();
  return new Date(base + DRAFT_TTL_DAYS * 24 * 60 * 60 * 1000);
}

function parseRecord(value: unknown): PublicSolutionRequest | null {
  if (!value || typeof value !== "object") return null;
  const record = value as PublicSolutionRequest;
  if (!record.id || !record.sessionId || !record.updatedAt || !record.status) return null;
  return record;
}

export async function persistPublicSolutionRequest(record: PublicSolutionRequest): Promise<boolean> {
  const enabled = await ensureSchema();
  if (!enabled || !pool) return false;
  await pool.query(
    `INSERT INTO public_solution_requests
      (id, session_id, status, payload, created_at, updated_at, expires_at)
     VALUES ($1, $2, $3, $4::jsonb, $5, $6, $7)
     ON CONFLICT (id) DO UPDATE SET
       session_id = EXCLUDED.session_id,
       status = EXCLUDED.status,
       payload = EXCLUDED.payload,
       updated_at = EXCLUDED.updated_at,
       expires_at = EXCLUDED.expires_at`,
    [
      record.id,
      record.sessionId,
      record.status,
      JSON.stringify(record),
      record.createdAt,
      record.updatedAt,
      expiryFor(record),
    ],
  );
  return true;
}

export async function loadPublicSolutionRequestBySession(sessionId: string): Promise<PublicSolutionRequest | null> {
  const enabled = await ensureSchema();
  if (!enabled || !pool) return null;
  await pool.query(`DELETE FROM public_solution_requests WHERE status = 'draft' AND expires_at < now()`);
  const result = await pool.query(
    `SELECT payload
       FROM public_solution_requests
      WHERE session_id = $1
        AND (status = 'submitted' OR expires_at >= now())
      ORDER BY updated_at DESC
      LIMIT 1`,
    [sessionId],
  );
  return parseRecord(result.rows[0]?.payload);
}

export async function deletePublicSolutionRequestForTests(id: string): Promise<void> {
  if (!process.env.DATABASE_URL) return;
  const enabled = await ensureSchema();
  if (!enabled || !pool) return;
  await pool.query(`DELETE FROM public_solution_requests WHERE id = $1`, [id]);
}
