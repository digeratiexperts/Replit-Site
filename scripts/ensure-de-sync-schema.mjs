#!/usr/bin/env node
import pg from "pg";

const { Pool } = pg;

const databaseUrl = String(process.env.DATABASE_URL || "").trim();
if (!databaseUrl) {
  console.log("[de-sync schema] DATABASE_URL not set; memory mode, nothing to migrate");
  process.exit(0);
}

const pool = new Pool({
  connectionString: databaseUrl,
  connectionTimeoutMillis: 10_000,
  max: 1,
});

const statements = [
  `ALTER TABLE portal_clients ADD COLUMN IF NOT EXISTS hub_account_id varchar`,
  `CREATE TABLE IF NOT EXISTS sync_outbox (
    id varchar PRIMARY KEY DEFAULT (gen_random_uuid()::text),
    event_id varchar NOT NULL UNIQUE,
    event_type text NOT NULL,
    version integer NOT NULL DEFAULT 1,
    source text NOT NULL,
    destination text NOT NULL,
    occurred_at timestamp NOT NULL,
    correlation_id varchar,
    entity_type text NOT NULL,
    entity_id text NOT NULL,
    canonical_account_id varchar,
    payload jsonb NOT NULL,
    status text NOT NULL DEFAULT 'pending',
    attempt_count integer NOT NULL DEFAULT 0,
    next_attempt_at timestamp NOT NULL,
    last_error text,
    locked_at timestamp,
    created_at timestamp NOT NULL DEFAULT now(),
    delivered_at timestamp
  )`,
  `CREATE INDEX IF NOT EXISTS sync_outbox_delivery_idx
    ON sync_outbox (status, next_attempt_at)`,
  `CREATE INDEX IF NOT EXISTS sync_outbox_locked_idx
    ON sync_outbox (status, locked_at)`,
  `CREATE TABLE IF NOT EXISTS sync_inbox (
    id varchar PRIMARY KEY DEFAULT (gen_random_uuid()::text),
    event_id varchar NOT NULL UNIQUE,
    event_type text NOT NULL,
    source text NOT NULL,
    canonical_account_id varchar,
    entity_type text NOT NULL,
    entity_id text NOT NULL,
    payload jsonb NOT NULL,
    received_at timestamp NOT NULL DEFAULT now(),
    applied_at timestamp
  )`,
  `CREATE TABLE IF NOT EXISTS sync_failures (
    id varchar PRIMARY KEY DEFAULT (gen_random_uuid()::text),
    event_id varchar NOT NULL,
    direction text NOT NULL,
    event_type text NOT NULL,
    last_error text NOT NULL,
    attempt_count integer NOT NULL DEFAULT 0,
    payload jsonb,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now()
  )`,
  `CREATE INDEX IF NOT EXISTS sync_failures_event_idx
    ON sync_failures (event_id)`,
  `CREATE TABLE IF NOT EXISTS sync_conflicts (
    id varchar PRIMARY KEY DEFAULT (gen_random_uuid()::text),
    canonical_account_id varchar,
    entity_type text NOT NULL,
    entity_id text NOT NULL,
    field text NOT NULL,
    hub_value jsonb,
    peer_value jsonb,
    resolution text NOT NULL DEFAULT 'hub_wins',
    created_at timestamp NOT NULL DEFAULT now()
  )`,
  `CREATE TABLE IF NOT EXISTS public_catalog_snapshots (
    id varchar PRIMARY KEY,
    snapshot jsonb NOT NULL,
    source_version text,
    published_at timestamp NOT NULL DEFAULT now()
  )`,
];

const client = await pool.connect();
try {
  await client.query("BEGIN");
  for (const statement of statements) {
    await client.query(statement);
  }
  await client.query("COMMIT");
  console.log("[de-sync schema] additive schema is ready");
} catch (error) {
  await client.query("ROLLBACK").catch(() => {});
  console.error("[de-sync schema] migration failed", error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  client.release();
  await pool.end();
}
