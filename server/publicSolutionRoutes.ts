import { randomUUID } from "crypto";
import type { Express, Request, Response } from "express";
import {
  getFamilyById,
  publicSolutionFamilies,
  slugToFamilyId,
  toPublicFamily,
} from "../client/src/lib/businessNeeds";
import { eventBus, EventTypes } from "./eventBus";
import { syncPublicSolutionRequestToCrm } from "./publicSolutionRequestCrm";
import {
  createPublicSolutionRequest,
  findPublicSolutionRequest,
  markPublicSolutionRequestCrm,
  publicFamilyExists,
  publicSolutionRequestView,
  submitPublicSolutionRequest,
  upsertPublicSolutionRequest,
} from "./publicSolutionRequestStore";

const SESSION_COOKIE = "de_solution_request";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readSessionId(req: Request): string {
  const fromCookie = typeof req.cookies?.[SESSION_COOKIE] === "string" ? req.cookies[SESSION_COOKIE] : "";
  const fromBody = typeof req.body?.sessionId === "string" ? req.body.sessionId : "";
  const fromQuery = typeof req.query.sessionId === "string" ? req.query.sessionId : "";
  return (fromCookie || fromBody || fromQuery).trim().slice(0, 80);
}

function ensureSession(req: Request, res: Response): string {
  const existing = readSessionId(req);
  if (existing) {
    res.cookie(SESSION_COOKIE, existing, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    return existing;
  }
  const sessionId = randomUUID();
  res.cookie(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
  return sessionId;
}

function genericNotFound(res: Response) {
  return res.status(404).json({ error: "Not found" });
}

function requestInput(req: Request, sessionId: string) {
  return {
    sessionId,
    id: typeof req.body?.id === "string" ? req.body.id : undefined,
    familyId: req.body?.familyId,
    offerId: req.body?.offerId,
    deliveryModel: req.body?.deliveryModel,
    deliveryPreference: req.body?.deliveryPreference,
    selectedNeeds: req.body?.selectedNeeds,
    environment: req.body?.environment,
    fulfillment: req.body?.fulfillment,
    intent: req.body?.intent,
    organizationName: req.body?.organizationName,
    contactName: req.body?.contactName,
    contactEmail: req.body?.contactEmail,
    contactPhone: req.body?.contactPhone,
    notes: req.body?.notes,
  };
}

export function registerPublicSolutionRoutes(app: Express): void {
  app.get("/api/public/solutions/families", (_req, res) => {
    res.json({ families: publicSolutionFamilies() });
  });

  app.get("/api/public/solutions/families/:id", (req, res) => {
    const raw = String(req.params.id || "");
    const familyId = slugToFamilyId(raw) || (publicFamilyExists(raw) ? raw : null);
    const family = familyId ? getFamilyById(familyId) : null;
    if (!family) return genericNotFound(res);
    return res.json({ family: toPublicFamily(family) });
  });

  app.get("/api/public/solutions/request", (req, res) => {
    const sessionId = ensureSession(req, res);
    const existing = findPublicSolutionRequest(sessionId);
    const record = existing ?? createPublicSolutionRequest(sessionId);
    return res.json({ request: publicSolutionRequestView(record) });
  });

  // Save progress without collecting contact information. This is the server-side
  // companion to the browser autosave and intentionally does not submit a lead.
  app.put("/api/public/solutions/request", (req, res) => {
    const sessionId = ensureSession(req, res);
    const record = upsertPublicSolutionRequest(requestInput(req, sessionId));
    return res.json({ request: publicSolutionRequestView(record) });
  });

  app.post("/api/public/solutions/request", async (req, res) => {
    const sessionId = ensureSession(req, res);
    const contactName = typeof req.body?.contactName === "string" ? req.body.contactName.trim() : "";
    const contactEmail = typeof req.body?.contactEmail === "string" ? req.body.contactEmail.trim() : "";
    if (contactName.length < 2 || !EMAIL_RE.test(contactEmail)) {
      return res.status(400).json({ error: "A name and email are required to submit this solution." });
    }

    const draft = upsertPublicSolutionRequest({
      ...requestInput(req, sessionId),
      contactName,
      contactEmail,
    });

    if (!draft.familyId && draft.selectedNeeds.length === 0) {
      return res.status(400).json({ error: "Select at least one business need before submitting." });
    }

    let submitted;
    try {
      submitted = submitPublicSolutionRequest(
        draft,
        {
          name: contactName,
          email: contactEmail,
          phone: typeof req.body?.contactPhone === "string" ? req.body.contactPhone : "",
          organizationName: typeof req.body?.organizationName === "string" ? req.body.organizationName : "",
        },
        typeof req.body?.idempotencyKey === "string" ? req.body.idempotencyKey : undefined,
      );
    } catch (error: any) {
      console.error("[solution-request] persist failed", error);
      return res.status(500).json({ error: "We could not save your solution request. Please try again." });
    }

    if (!submitted.replayed) {
      void eventBus.emit(EventTypes.LEAD_CREATED, {
        source: "solution_request",
        correlationId: submitted.record.correlationId,
        familyId: submitted.record.familyId,
        offerId: submitted.record.offerId,
        deliveryModel: submitted.record.deliveryModel,
        deliveryPreference: submitted.record.deliveryPreference,
        selectedNeeds: submitted.record.selectedNeeds.map((need) => need.familyId),
        installation: submitted.record.fulfillment.installation,
        remoteSupport: submitted.record.fulfillment.remoteSupport,
        intent: submitted.record.intent,
      });
      void syncPublicSolutionRequestToCrm(submitted.record)
        .then((crmStatus) => markPublicSolutionRequestCrm(submitted.record.id, crmStatus))
        .catch((error: any) => {
          console.warn("[solution-request] CRM follow-up pending:", error?.message || error);
        });
    }

    const latest = markPublicSolutionRequestCrm(submitted.record.id, "pending");
    const view = publicSolutionRequestView(latest ?? submitted.record);
    return res.json({
      request: view,
      correlationId: view.correlationId,
      crm: view.crmStatus,
      replayed: submitted.replayed,
      message: "Your solution was saved. DE will confirm package fit, scope, fulfillment, and pricing before you commit.",
    });
  });
}
