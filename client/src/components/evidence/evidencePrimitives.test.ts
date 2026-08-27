import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const currentDir = dirname(fileURLToPath(import.meta.url));
const evidenceFrameSrc = readFileSync(resolve(currentDir, "EvidenceFrame.tsx"), "utf8");
const statusTokenSrc = readFileSync(resolve(currentDir, "StatusToken.tsx"), "utf8");
const proofChipSrc = readFileSync(resolve(currentDir, "ProofChip.tsx"), "utf8");
const hudFrameSrc = readFileSync(resolve(currentDir, "HUDFrame.tsx"), "utf8");
const incidentFlowSrc = readFileSync(resolve(currentDir, "IncidentFlow.tsx"), "utf8");

describe("DE Visual System v2 primitives integrity", () => {
  it("enforces the four truthfulness classifications", () => {
    expect(evidenceFrameSrc).toMatch(/export type EvidenceClassification/);
    expect(evidenceFrameSrc).toMatch(/LIVE/);
    expect(evidenceFrameSrc).toMatch(/SANITIZED_REAL/);
    expect(evidenceFrameSrc).toMatch(/EXAMPLE/);
    expect(evidenceFrameSrc).toMatch(/ILLUSTRATIVE/);
  });

  it("does not introduce cyan or one-off dark surfaces into EvidenceFrame", () => {
    expect(evidenceFrameSrc).not.toMatch(/cyan-/);
    expect(evidenceFrameSrc).not.toMatch(/#0d0a14/i);
    expect(evidenceFrameSrc).toMatch(/bg-de-raised/);
  });

  it("keeps live and verified health semantic states emerald", () => {
    expect(statusTokenSrc).toMatch(/active:/);
    expect(statusTokenSrc).toMatch(/verified:/);
    expect(statusTokenSrc).toMatch(/emerald-400/);
    expect(statusTokenSrc).toMatch(/#D3126A/);
  });

  it("supports factual proof chips without requiring invented metrics", () => {
    expect(proofChipSrc).toMatch(/export const ProofChip/);
    expect(proofChipSrc).toMatch(/metric\?:/);
    expect(proofChipSrc).toMatch(/variant\?: "dark" \| "paper"/);
  });

  it("keeps HUDFrame on canonical surfaces with restrained precision marks", () => {
    expect(hudFrameSrc).toMatch(/export const HUDFrame/);
    expect(hudFrameSrc).toMatch(/technicalId\?:/);
    expect(hudFrameSrc).toMatch(/bg-de-raised/);
    expect(hudFrameSrc).not.toMatch(/#0e0b14/i);
  });

  it("marks IncidentFlow as an example and bans unsupported performance-style claims", () => {
    expect(incidentFlowSrc).toMatch(/classification="EXAMPLE"/);
    expect(incidentFlowSrc).toMatch(/EXAMPLE MODEL/);
    expect(incidentFlowSrc).toMatch(/Illustrative resolution/);
    expect(incidentFlowSrc).toMatch(/not live telemetry/);
    expect(incidentFlowSrc).not.toMatch(/under 5 minutes/i);
    expect(incidentFlowSrc).not.toMatch(/18 identical/i);
    expect(incidentFlowSrc).not.toMatch(/Verified Outcome/);
    expect(incidentFlowSrc).not.toMatch(/risk score > 85/i);
  });
});
