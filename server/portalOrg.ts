/**
 * Client-org hierarchy helpers for portal multi-role RBAC.
 * DE portal admins (role=admin) bypass client org gates.
 */
import { eq, and, sql } from "drizzle-orm";
import { db, dbReady, initPromise } from "./db";
import {
  portalDepartments,
  portalUsers as portalUsersTable,
} from "@shared/schema";
import { listUniqueUsers, getUser as portalAuthGetUser } from "./portalAuthStore";

export type OrgRole = "staff" | "manager" | "dept_it_contact" | "company_it_contact";

export const SKIP_LEVEL_AMOUNT_CENTS = 100_000; // $1,000
export const INFRA_CATEGORIES = [
  "Infrastructure - Problem",
  "Infrastructure - Onsite Outage",
  "Infrastructure - Project Onsite",
] as const;

export type OrgUserFields = {
  id: string;
  email: string;
  fullName: string;
  role: string;
  orgRole?: OrgRole | string | null;
  clientId?: string | null;
  departmentId?: string | null;
  managerUserId?: string | null;
  isCompanyItContact?: boolean | null;
};

let schemaReady = false;

export async function ensureOrgSchema(): Promise<void> {
  if (schemaReady || !dbReady || !db) return;
  try {
    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE portal_org_role AS ENUM ('staff', 'manager', 'dept_it_contact', 'company_it_contact');
      EXCEPTION WHEN duplicate_object THEN NULL;
      END $$
    `);
    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE portal_approval_request_status AS ENUM ('pending', 'approved', 'rejected', 'info_requested', 'cancelled');
      EXCEPTION WHEN duplicate_object THEN NULL;
      END $$
    `);
    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE portal_approval_step_type AS ENUM ('manager', 'skip_level', 'dept_it', 'company_it');
      EXCEPTION WHEN duplicate_object THEN NULL;
      END $$
    `);
    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE portal_approval_step_status AS ENUM ('pending', 'approved', 'rejected', 'info_requested', 'skipped');
      EXCEPTION WHEN duplicate_object THEN NULL;
      END $$
    `);
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS portal_departments (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid()::text,
        client_id varchar NOT NULL REFERENCES portal_clients(id) ON DELETE CASCADE,
        name text NOT NULL,
        it_contact_user_id varchar,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `);
    await db.execute(sql`ALTER TABLE portal_users ADD COLUMN IF NOT EXISTS org_role portal_org_role DEFAULT 'staff'`);
    await db.execute(sql`ALTER TABLE portal_users ADD COLUMN IF NOT EXISTS department_id varchar`);
    await db.execute(sql`ALTER TABLE portal_users ADD COLUMN IF NOT EXISTS manager_user_id varchar`);
    await db.execute(sql`ALTER TABLE portal_users ADD COLUMN IF NOT EXISTS is_company_it_contact boolean DEFAULT false`);
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS portal_approval_requests (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid()::text,
        request_number text NOT NULL UNIQUE,
        client_id varchar NOT NULL REFERENCES portal_clients(id) ON DELETE CASCADE,
        requester_user_id varchar NOT NULL REFERENCES portal_users(id) ON DELETE CASCADE,
        type text NOT NULL,
        title text NOT NULL,
        description text NOT NULL,
        priority ticket_priority DEFAULT 'medium',
        amount_cents integer,
        status portal_approval_request_status DEFAULT 'pending',
        payload jsonb DEFAULT '{}'::jsonb,
        fulfillment_ticket_id varchar,
        no_manager_assigned boolean DEFAULT false,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `);
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS portal_approval_steps (
        id varchar PRIMARY KEY DEFAULT gen_random_uuid()::text,
        request_id varchar NOT NULL REFERENCES portal_approval_requests(id) ON DELETE CASCADE,
        step_order integer NOT NULL,
        step_type portal_approval_step_type NOT NULL,
        approver_user_id varchar REFERENCES portal_users(id) ON DELETE SET NULL,
        status portal_approval_step_status DEFAULT 'pending',
        note text,
        acted_at timestamp,
        created_at timestamp DEFAULT now() NOT NULL
      )
    `);
    schemaReady = true;
  } catch (err: any) {
    console.warn("[portalOrg] schema ensure:", err?.message);
  }
}

export async function initPortalOrg(): Promise<void> {
  await initPromise;
  await ensureOrgSchema();
  if (dbReady && schemaReady) {
    console.log("✅ Portal org / approvals schema ready");
  }
}

export function isDeAdmin(user: { role?: string | null }): boolean {
  return user.role === "admin";
}

export function resolveOrgRole(user: OrgUserFields): OrgRole {
  if (isDeAdmin(user)) return "company_it_contact";
  if (user.isCompanyItContact) return "company_it_contact";
  const role = (user.orgRole || "staff") as OrgRole;
  if (["staff", "manager", "dept_it_contact", "company_it_contact"].includes(role)) {
    return role;
  }
  return "staff";
}

export function canInitiateChat(user: OrgUserFields): boolean {
  if (isDeAdmin(user)) return true;
  const role = resolveOrgRole(user);
  return role === "company_it_contact" || role === "dept_it_contact";
}

export function canAccessApprovals(user: OrgUserFields): boolean {
  if (isDeAdmin(user)) return true;
  const role = resolveOrgRole(user);
  return role === "manager" || role === "dept_it_contact" || role === "company_it_contact";
}

export function canManageOrg(user: OrgUserFields): boolean {
  if (isDeAdmin(user)) return true;
  return resolveOrgRole(user) === "company_it_contact" || !!user.isCompanyItContact;
}

export function canViewClientWide(user: OrgUserFields): boolean {
  if (isDeAdmin(user)) return true;
  const role = resolveOrgRole(user);
  return role === "company_it_contact" || role === "dept_it_contact";
}

export function needsSkipLevel(priority?: string | null, amountCents?: number | null): boolean {
  const p = (priority || "medium").toLowerCase();
  if (p === "high" || p === "critical") return true;
  if (typeof amountCents === "number" && amountCents >= SKIP_LEVEL_AMOUNT_CENTS) return true;
  return false;
}

export function findUserById(userId: string): OrgUserFields | null {
  for (const u of listUniqueUsers()) {
    if (u.id === userId) {
      return u as OrgUserFields;
    }
  }
  return null;
}

export function findUserByEmail(email: string): OrgUserFields | null {
  const u = portalAuthGetUser(email);
  return u ? (u as OrgUserFields) : null;
}

export function listClientUsers(clientId: string): OrgUserFields[] {
  return listUniqueUsers()
    .filter((u) => u.clientId === clientId)
    .map((u) => u as OrgUserFields)
    .sort((a, b) => (a.fullName || "").localeCompare(b.fullName || ""));
}

export async function findCompanyItContact(clientId: string): Promise<OrgUserFields | null> {
  const users = listClientUsers(clientId);
  const flagged = users.find((u) => u.isCompanyItContact || u.orgRole === "company_it_contact");
  if (flagged) return flagged;
  if (dbReady && db) {
    try {
      await ensureOrgSchema();
      const rows = await db
        .select()
        .from(portalUsersTable)
        .where(
          and(eq(portalUsersTable.clientId, clientId), eq(portalUsersTable.isCompanyItContact, true)),
        )
        .limit(1);
      if (rows[0]) {
        return {
          id: rows[0].id,
          email: rows[0].email,
          fullName: rows[0].fullName,
          role: rows[0].role || "user",
          orgRole: rows[0].orgRole || "staff",
          clientId: rows[0].clientId,
          departmentId: rows[0].departmentId,
          managerUserId: rows[0].managerUserId,
          isCompanyItContact: rows[0].isCompanyItContact,
        };
      }
    } catch {
      /* fall through */
    }
  }
  return users[0] || null;
}

export async function findDeptItContact(
  clientId: string,
  departmentId?: string | null,
): Promise<OrgUserFields | null> {
  if (!departmentId || !dbReady || !db) return null;
  try {
    await ensureOrgSchema();
    const depts = await db
      .select()
      .from(portalDepartments)
      .where(and(eq(portalDepartments.id, departmentId), eq(portalDepartments.clientId, clientId)))
      .limit(1);
    const contactId = depts[0]?.itContactUserId;
    if (!contactId) return null;
    return findUserById(contactId);
  } catch {
    return null;
  }
}

export async function listDepartments(clientId: string) {
  if (!dbReady || !db) return [];
  await ensureOrgSchema();
  return db.select().from(portalDepartments).where(eq(portalDepartments.clientId, clientId));
}

export async function createDepartment(clientId: string, name: string, itContactUserId?: string | null) {
  if (!dbReady || !db) throw new Error("Database unavailable");
  await ensureOrgSchema();
  const [row] = await db
    .insert(portalDepartments)
    .values({
      clientId,
      name: name.trim(),
      itContactUserId: itContactUserId || null,
    })
    .returning();
  return row;
}

export async function updateDepartment(
  id: string,
  clientId: string,
  patch: { name?: string; itContactUserId?: string | null },
) {
  if (!dbReady || !db) throw new Error("Database unavailable");
  await ensureOrgSchema();
  const [row] = await db
    .update(portalDepartments)
    .set({
      ...(patch.name !== undefined ? { name: patch.name.trim() } : {}),
      ...(patch.itContactUserId !== undefined ? { itContactUserId: patch.itContactUserId } : {}),
      updatedAt: new Date(),
    })
    .where(and(eq(portalDepartments.id, id), eq(portalDepartments.clientId, clientId)))
    .returning();
  return row;
}

export function orgPublicUser(user: OrgUserFields) {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    orgRole: resolveOrgRole(user),
    clientId: user.clientId || null,
    departmentId: user.departmentId || null,
    managerUserId: user.managerUserId || null,
    isCompanyItContact: !!user.isCompanyItContact || resolveOrgRole(user) === "company_it_contact",
    capabilities: {
      chat: canInitiateChat(user),
      approvals: canAccessApprovals(user),
      manageOrg: canManageOrg(user),
      clientWide: canViewClientWide(user),
    },
  };
}
