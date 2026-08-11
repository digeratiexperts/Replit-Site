/**
 * Durable portal surveys store — Neon-backed with in-memory fallback.
 * Seeds first-party MSP surveys (CSAT, onboarding, security awareness, QBR).
 */
import { sql } from "drizzle-orm";
import { db, dbReady, initPromise } from "./db";
import { randomBytes } from "crypto";

export type SurveyQuestionType = "rating" | "text" | "single" | "multi";

export type SurveyQuestion = {
  id: string;
  type: SurveyQuestionType;
  label: string;
  required: boolean;
  options?: string[];
  helpText?: string;
};

export type PortalSurvey = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  questions: SurveyQuestion[];
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
};

export type PortalSurveyResponse = {
  id: string;
  surveyId: string;
  userId: string | null;
  clientId: string | null;
  answers: Record<string, unknown>;
  rating: number | null;
  submittedAt: string;
};

export type SurveyListItem = PortalSurvey & {
  status: "pending" | "completed";
  completedAt: string | null;
  responseId: string | null;
  questionCount: number;
};

const memorySurveys = new Map<string, PortalSurvey>();
const memoryResponses = new Map<string, PortalSurveyResponse[]>();
let schemaReady = false;
let seeded = false;

function newId(): string {
  return randomBytes(16).toString("hex");
}

function normalizeRows(result: unknown): any[] {
  if (Array.isArray(result)) return result;
  const rows = (result as any)?.rows;
  return Array.isArray(rows) ? rows : [];
}

function parseQuestions(raw: unknown): SurveyQuestion[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((q) => {
      if (!q || typeof q !== "object") return null;
      const obj = q as Record<string, unknown>;
      const type = String(obj.type || "text") as SurveyQuestionType;
      if (!["rating", "text", "single", "multi"].includes(type)) return null;
      const id = String(obj.id || "");
      const label = String(obj.label || "");
      if (!id || !label) return null;
      return {
        id,
        type,
        label,
        required: obj.required !== false,
        options: Array.isArray(obj.options)
          ? obj.options.map((o) => String(o))
          : undefined,
        helpText: obj.helpText ? String(obj.helpText) : undefined,
      } as SurveyQuestion;
    })
    .filter(Boolean) as SurveyQuestion[];
}

function rowToSurvey(row: any): PortalSurvey {
  const created =
    row.created_at instanceof Date
      ? row.created_at.toISOString()
      : new Date(row.created_at || Date.now()).toISOString();
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    description: String(row.description || ""),
    category: String(row.category || "general"),
    questions: parseQuestions(
      typeof row.questions === "string" ? JSON.parse(row.questions) : row.questions
    ),
    isActive: row.is_active !== false && row.is_active !== 0,
    sortOrder: Number(row.sort_order || 0),
    createdAt: created,
  };
}

function rowToResponse(row: any): PortalSurveyResponse {
  const submitted =
    row.submitted_at instanceof Date
      ? row.submitted_at.toISOString()
      : new Date(row.submitted_at || Date.now()).toISOString();
  const answersRaw =
    typeof row.answers === "string" ? JSON.parse(row.answers) : row.answers;
  return {
    id: String(row.id),
    surveyId: String(row.survey_id),
    userId: row.user_id ? String(row.user_id) : null,
    clientId: row.client_id ? String(row.client_id) : null,
    answers:
      answersRaw && typeof answersRaw === "object"
        ? (answersRaw as Record<string, unknown>)
        : {},
    rating:
      row.rating === null || row.rating === undefined
        ? null
        : Number(row.rating),
    submittedAt: submitted,
  };
}

const SEED_SURVEYS: Omit<PortalSurvey, "createdAt">[] = [
  {
    id: "survey-csat-support",
    slug: "support-satisfaction",
    title: "Support Satisfaction",
    description:
      "Rate your recent support experience so we can keep improving ticket quality and response times.",
    category: "csat",
    isActive: true,
    sortOrder: 10,
    questions: [
      {
        id: "overall",
        type: "rating",
        label: "Overall satisfaction with your recent support experience",
        required: true,
      },
      {
        id: "resolution",
        type: "single",
        label: "Was your issue resolved?",
        required: true,
        options: ["Yes, fully resolved", "Partially resolved", "Not resolved"],
      },
      {
        id: "comment",
        type: "text",
        label: "Anything else we should know? (optional)",
        required: false,
        helpText: "What went well, or how we can improve.",
      },
    ],
  },
  {
    id: "survey-onboarding",
    slug: "onboarding-feedback",
    title: "Onboarding Feedback",
    description:
      "Help us refine the client onboarding experience for new users and companies.",
    category: "onboarding",
    isActive: true,
    sortOrder: 20,
    questions: [
      {
        id: "clarity",
        type: "rating",
        label: "How clear was the onboarding process?",
        required: true,
      },
      {
        id: "portal_ready",
        type: "single",
        label: "Did you feel ready to use the Client Portal after onboarding?",
        required: true,
        options: ["Yes", "Mostly", "Not yet"],
      },
      {
        id: "missing",
        type: "text",
        label: "What was missing or confusing?",
        required: false,
      },
    ],
  },
  {
    id: "survey-security-awareness",
    slug: "security-awareness-check",
    title: "Security Awareness Check",
    description:
      "A short awareness quiz covering phishing, passwords, and safe remote work habits.",
    category: "security",
    isActive: true,
    sortOrder: 30,
    questions: [
      {
        id: "phishing",
        type: "single",
        label:
          "You receive an urgent email from “IT Support” asking you to click a link and confirm your password. What should you do?",
        required: true,
        options: [
          "Click the link and enter my password",
          "Forward it to a coworker to check",
          "Do not click — verify with known IT/support contacts",
          "Reply with my password so they can reset it",
        ],
      },
      {
        id: "password",
        type: "single",
        label: "Which password practice is strongest?",
        required: true,
        options: [
          "Reuse one strong password everywhere",
          "Use a unique passphrase plus MFA where available",
          "Write passwords on a sticky note under the keyboard",
          "Share passwords in a team chat for speed",
        ],
      },
      {
        id: "remote",
        type: "single",
        label: "When working remotely on public Wi‑Fi, you should:",
        required: true,
        options: [
          "Disable MFA so logins are faster",
          "Use the company VPN (or approved secure access) before work apps",
          "Email files to a personal account for convenience",
          "Turn off device encryption",
        ],
      },
    ],
  },
  {
    id: "survey-qbr",
    slug: "quarterly-service-review",
    title: "Quarterly Service Review",
    description:
      "Share feedback on MSP delivery, communication, and priorities for the next quarter.",
    category: "qbr",
    isActive: true,
    sortOrder: 40,
    questions: [
      {
        id: "value",
        type: "rating",
        label: "How satisfied are you with overall service value this quarter?",
        required: true,
      },
      {
        id: "communication",
        type: "rating",
        label: "How would you rate communication from your DE team?",
        required: true,
      },
      {
        id: "priorities",
        type: "multi",
        label: "Which areas should we prioritize next? (select all that apply)",
        required: true,
        options: [
          "Cybersecurity hardening",
          "Backup / recovery drills",
          "User training",
          "Cloud / Microsoft 365",
          "Network reliability",
          "Cost optimization",
        ],
      },
      {
        id: "notes",
        type: "text",
        label: "Additional notes for your account team",
        required: false,
      },
    ],
  },
];

async function ensureSchema(): Promise<void> {
  if (schemaReady || !dbReady || !db) return;
  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS portal_surveys (
        id varchar PRIMARY KEY,
        slug text NOT NULL UNIQUE,
        title text NOT NULL,
        description text,
        category text NOT NULL DEFAULT 'general',
        questions jsonb NOT NULL,
        is_active boolean DEFAULT true,
        sort_order integer DEFAULT 0,
        created_at timestamptz DEFAULT now() NOT NULL,
        updated_at timestamptz DEFAULT now() NOT NULL
      )
    `);
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS portal_survey_responses (
        id varchar PRIMARY KEY,
        survey_id varchar NOT NULL REFERENCES portal_surveys(id) ON DELETE CASCADE,
        user_id varchar,
        client_id varchar,
        answers jsonb NOT NULL,
        rating integer,
        submitted_at timestamptz DEFAULT now() NOT NULL
      )
    `);
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_portal_survey_responses_user
      ON portal_survey_responses (user_id, survey_id)
    `);
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_portal_survey_responses_survey
      ON portal_survey_responses (survey_id, submitted_at)
    `);
    schemaReady = true;
  } catch (err: any) {
    console.warn("[portalSurveyStore] schema ensure:", err?.message);
  }
}

async function seedSurveys(): Promise<void> {
  if (seeded) return;

  for (const survey of SEED_SURVEYS) {
    memorySurveys.set(survey.id, {
      ...survey,
      createdAt: new Date().toISOString(),
    });
  }

  if (dbReady && db && schemaReady) {
    try {
      for (const survey of SEED_SURVEYS) {
        await db.execute(sql`
          INSERT INTO portal_surveys
            (id, slug, title, description, category, questions, is_active, sort_order, created_at, updated_at)
          VALUES (
            ${survey.id},
            ${survey.slug},
            ${survey.title},
            ${survey.description},
            ${survey.category},
            CAST(${JSON.stringify(survey.questions)} AS jsonb),
            ${survey.isActive},
            ${survey.sortOrder},
            now(),
            now()
          )
          ON CONFLICT (id) DO UPDATE SET
            slug = EXCLUDED.slug,
            title = EXCLUDED.title,
            description = EXCLUDED.description,
            category = EXCLUDED.category,
            questions = EXCLUDED.questions,
            is_active = EXCLUDED.is_active,
            sort_order = EXCLUDED.sort_order,
            updated_at = now()
        `);
      }
    } catch (err: any) {
      console.warn("[portalSurveyStore] seed failed:", err?.message);
    }
  }

  seeded = true;
}

export async function initPortalSurveyStore(): Promise<void> {
  await initPromise;
  await ensureSchema();
  await seedSurveys();
  if (dbReady && schemaReady) {
    console.log("✅ Portal surveys store ready (Neon)");
  } else {
    console.warn("⚠️ Portal surveys store: DB unavailable — using memory (non-durable)");
  }
}

export async function listSurveysForUser(
  userId: string
): Promise<SurveyListItem[]> {
  await ensureSchema();
  await seedSurveys();

  let surveys: PortalSurvey[] = [];
  let responses: PortalSurveyResponse[] = [];

  if (dbReady && db && schemaReady) {
    try {
      const surveyResult = await db.execute(sql`
        SELECT id, slug, title, description, category, questions, is_active, sort_order, created_at
        FROM portal_surveys
        WHERE is_active = true
        ORDER BY sort_order ASC, title ASC
      `);
      surveys = normalizeRows(surveyResult).map(rowToSurvey);

      const responseResult = await db.execute(sql`
        SELECT id, survey_id, user_id, client_id, answers, rating, submitted_at
        FROM portal_survey_responses
        WHERE user_id = ${userId}
        ORDER BY submitted_at DESC
      `);
      responses = normalizeRows(responseResult).map(rowToResponse);
    } catch (err: any) {
      console.warn("[portalSurveyStore] listSurveysForUser DB failed:", err?.message);
    }
  }

  if (!surveys.length) {
    surveys = Array.from(memorySurveys.values())
      .filter((s) => s.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder || a.title.localeCompare(b.title));
  }
  if (!responses.length) {
    responses = memoryResponses.get(userId) || [];
  }

  const latestBySurvey = new Map<string, PortalSurveyResponse>();
  for (const r of responses) {
    if (!latestBySurvey.has(r.surveyId)) {
      latestBySurvey.set(r.surveyId, r);
    }
  }

  return surveys.map((survey) => {
    const completed = latestBySurvey.get(survey.id);
    return {
      ...survey,
      status: completed ? "completed" : "pending",
      completedAt: completed?.submittedAt || null,
      responseId: completed?.id || null,
      questionCount: survey.questions.length,
    };
  });
}

export async function getSurveyById(surveyId: string): Promise<PortalSurvey | null> {
  await ensureSchema();
  await seedSurveys();

  if (dbReady && db && schemaReady) {
    try {
      const result = await db.execute(sql`
        SELECT id, slug, title, description, category, questions, is_active, sort_order, created_at
        FROM portal_surveys
        WHERE id = ${surveyId} AND is_active = true
        LIMIT 1
      `);
      const rows = normalizeRows(result);
      if (rows[0]) return rowToSurvey(rows[0]);
    } catch (err: any) {
      console.warn("[portalSurveyStore] getSurveyById DB failed:", err?.message);
    }
  }

  const mem = memorySurveys.get(surveyId);
  return mem && mem.isActive ? mem : null;
}

export async function getUserResponseForSurvey(
  userId: string,
  surveyId: string
): Promise<PortalSurveyResponse | null> {
  await ensureSchema();

  if (dbReady && db && schemaReady) {
    try {
      const result = await db.execute(sql`
        SELECT id, survey_id, user_id, client_id, answers, rating, submitted_at
        FROM portal_survey_responses
        WHERE user_id = ${userId} AND survey_id = ${surveyId}
        ORDER BY submitted_at DESC
        LIMIT 1
      `);
      const rows = normalizeRows(result);
      if (rows[0]) return rowToResponse(rows[0]);
    } catch (err: any) {
      console.warn("[portalSurveyStore] getUserResponseForSurvey failed:", err?.message);
    }
  }

  const list = memoryResponses.get(userId) || [];
  return list.find((r) => r.surveyId === surveyId) || null;
}

export function validateAnswers(
  survey: PortalSurvey,
  answers: Record<string, unknown>
): { ok: true; rating: number | null } | { ok: false; error: string } {
  for (const q of survey.questions) {
    const value = answers[q.id];
    if (q.required) {
      if (value === undefined || value === null || value === "") {
        return { ok: false, error: `Missing answer for: ${q.label}` };
      }
      if (q.type === "multi" && (!Array.isArray(value) || value.length === 0)) {
        return { ok: false, error: `Select at least one option for: ${q.label}` };
      }
    }
    if (q.type === "rating" && value !== undefined && value !== null && value !== "") {
      const n = Number(value);
      if (!Number.isInteger(n) || n < 1 || n > 5) {
        return { ok: false, error: `Rating must be 1–5 for: ${q.label}` };
      }
    }
    if (q.type === "single" && value !== undefined && value !== null && value !== "") {
      if (q.options && !q.options.includes(String(value))) {
        return { ok: false, error: `Invalid option for: ${q.label}` };
      }
    }
    if (q.type === "multi" && Array.isArray(value) && q.options) {
      for (const item of value) {
        if (!q.options.includes(String(item))) {
          return { ok: false, error: `Invalid option for: ${q.label}` };
        }
      }
    }
  }

  const ratingQuestion = survey.questions.find((q) => q.type === "rating");
  let rating: number | null = null;
  if (ratingQuestion) {
    const raw = answers[ratingQuestion.id];
    if (raw !== undefined && raw !== null && raw !== "") {
      rating = Number(raw);
    }
  }

  return { ok: true, rating };
}

export async function submitSurveyResponse(input: {
  surveyId: string;
  userId: string;
  clientId?: string | null;
  answers: Record<string, unknown>;
}): Promise<PortalSurveyResponse> {
  await ensureSchema();
  await seedSurveys();

  const survey = await getSurveyById(input.surveyId);
  if (!survey) {
    throw new Error("Survey not found");
  }

  const existing = await getUserResponseForSurvey(input.userId, input.surveyId);
  if (existing) {
    throw new Error("Survey already completed");
  }

  const validation = validateAnswers(survey, input.answers || {});
  if (!validation.ok) {
    throw new Error(validation.error);
  }

  const response: PortalSurveyResponse = {
    id: newId(),
    surveyId: input.surveyId,
    userId: input.userId,
    clientId: input.clientId || null,
    answers: input.answers || {},
    rating: validation.rating,
    submittedAt: new Date().toISOString(),
  };

  if (dbReady && db && schemaReady) {
    try {
      await db.execute(sql`
        INSERT INTO portal_survey_responses
          (id, survey_id, user_id, client_id, answers, rating, submitted_at)
        VALUES (
          ${response.id},
          ${response.surveyId},
          ${response.userId},
          ${response.clientId},
          CAST(${JSON.stringify(response.answers)} AS jsonb),
          ${response.rating},
          ${new Date(response.submittedAt)}
        )
      `);
      return response;
    } catch (err: any) {
      console.warn("[portalSurveyStore] submit DB failed, using memory:", err?.message);
    }
  }

  const list = memoryResponses.get(input.userId) || [];
  list.unshift(response);
  memoryResponses.set(input.userId, list);
  return response;
}

export function getSurveyStoreStatus(): { durable: boolean } {
  return { durable: !!(dbReady && schemaReady) };
}
