import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const currentDir = dirname(fileURLToPath(import.meta.url));

const evidenceFrameSrc = readFileSync(
  resolve(currentDir, "EvidenceFrame.tsx"),
  "utf8"
);
const statusTokenSrc = readFileSync(
  resolve(currentDir, "StatusToken.tsx"),
  "utf8"
);
const proofChipSrc = readFileSync(resolve(currentDir, "ProofChip.tsx"), "utf8");
const hudFrameSrc = readFileSync(resolve(currentDir, "HUDFrame.tsx"), "utf8");
const incidentFlowSrc = readFileSync(
  resolve(currentDir, "IncidentFlow.tsx"),
  "utf8"
);
const diagramPrimitivesSrc = readFileSync(
  resolve(currentDir, "DiagramPrimitives.tsx"),
  "utf8"
);
const assessmentReportSrc = readFileSync(
  resolve(currentDir, "AssessmentReportSample.tsx"),
  "utf8"
);
const protectionDeckSrc = readFileSync(
  resolve(currentDir, "../visual/ProtectionCommandDeck.tsx"),
  "utf8"
);
const ecosystemDiagramSrc = readFileSync(
  resolve(currentDir, "../visual/ProActiveEcosystemDiagram.tsx"),
  "utf8"
);

describe("DE Visual System v2 Primitives Integrity", () => {
  it("enforces truthfulness classifications in EvidenceFrame", () => {
    expect(evidenceFrameSrc).toMatch(/export type EvidenceClassification/);
    expect(evidenceFrameSrc).toMatch(/LIVE/);
    expect(evidenceFrameSrc).toMatch(/SANITIZED_REAL/);
    expect(evidenceFrameSrc).toMatch(/EXAMPLE/);
    expect(evidenceFrameSrc).toMatch(/ILLUSTRATIVE/);
  });

  it("enforces emerald-only status tokens for live/verified health", () => {
    expect(statusTokenSrc).toMatch(/active:/);
    expect(statusTokenSrc).toMatch(/emerald-400/);
    expect(statusTokenSrc).toMatch(/#D3126A/); // informational brand
  });

  it("provides factual metrics and Lucide icon support in ProofChip", () => {
    expect(proofChipSrc).toMatch(/export const ProofChip/);
    expect(proofChipSrc).toMatch(/metric\?:/);
    expect(proofChipSrc).toMatch(/variant\?: "dark" \| "paper"/);
  });

  it("provides precision corner marks and technical ID stamping in HUDFrame", () => {
    expect(hudFrameSrc).toMatch(/export const HUDFrame/);
    expect(hudFrameSrc).toMatch(/technicalId\?:/);
    expect(hudFrameSrc).toMatch(/border-t-2 border-l-2 border-\[#D3126A\]/);
  });

  it("marks IncidentFlow explicitly as an EXAMPLE classification", () => {
    expect(incidentFlowSrc).toMatch(/classification="EXAMPLE"/);
    expect(incidentFlowSrc).toMatch(/ProActive Incident Containment Architecture/);
    expect(incidentFlowSrc).toMatch(/OPERATIONAL TIMELINE & CONTAINMENT GATES/);
  });

  it("exports DiagramPrimitives including SecurityBoundary, DiagramNode, and ControlGate", () => {
    expect(diagramPrimitivesSrc).toMatch(/export const SecurityBoundary/);
    expect(diagramPrimitivesSrc).toMatch(/export const DiagramNode/);
    expect(diagramPrimitivesSrc).toMatch(/export const ControlGate/);
  });

  it("marks AssessmentReportSample explicitly as SANITIZED_REAL", () => {
    expect(assessmentReportSrc).toMatch(/classification="SANITIZED_REAL"/);
    expect(assessmentReportSrc).toMatch(/Sanitized Cyber Risk & Infrastructure Assessment Excerpt/);
    expect(assessmentReportSrc).toMatch(/30-DAY REMEDIATION ROADMAP/);
  });

  it("implements 6 domains in ProtectionCommandDeck with explicit ILLUSTRATIVE classification", () => {
    expect(protectionDeckSrc).toMatch(/classification="ILLUSTRATIVE"/);
    expect(protectionDeckSrc).toMatch(/identity/);
    expect(protectionDeckSrc).toMatch(/endpoint/);
    expect(protectionDeckSrc).toMatch(/email/);
    expect(protectionDeckSrc).toMatch(/network/);
    expect(protectionDeckSrc).toMatch(/recovery/);
    expect(protectionDeckSrc).toMatch(/compliance/);
  });

  it("implements 4-stage lifecycle in ProActiveEcosystemDiagram", () => {
    expect(ecosystemDiagramSrc).toMatch(/classification="ILLUSTRATIVE"/);
    expect(ecosystemDiagramSrc).toMatch(/The ProActive Ecosystem Operating Architecture/);
    expect(ecosystemDiagramSrc).toMatch(/Discovery & Environmental Assessment/);
  });
});
