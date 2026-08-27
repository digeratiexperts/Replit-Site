import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Terminal,
  UserX,
  Lock,
  MailCheck,
  CheckCircle2,
} from "lucide-react";
import { EvidenceFrame } from "./EvidenceFrame";

export interface IncidentStep {
  label: string;
  detail: string;
  actor: "SYSTEM" | "SOC_HUMAN" | "AUTOMATION";
}

export interface ScenarioDefinition {
  id: string;
  category: "IDENTITY" | "ENDPOINT" | "EMAIL" | "BACKUP";
  title: string;
  vector: string;
  steps: IncidentStep[];
  outcome: string;
}

const defaultScenarios: ScenarioDefinition[] = [
  {
    id: "SCN-M365-AUTH",
    category: "IDENTITY",
    title: "Suspicious Off-Hours Session Hijack",
    vector: "Adversary replay of stolen session cookie bypassing basic SMS MFA.",
    steps: [
      {
        label: "Anomalous Login Detected",
        detail: "Simultaneous session token active from unrecognized foreign IP subnet.",
        actor: "AUTOMATION",
      },
      {
        label: "Conditional Access Enforcement",
        detail: "Identity threat detection flags risk score > 85 and isolates session.",
        actor: "SYSTEM",
      },
      {
        label: "SOC Analyst Triage & Session Revocation",
        detail: "Analyst confirms credential reuse, revokes all refresh tokens, and enforces FIDO2 re-auth.",
        actor: "SOC_HUMAN",
      },
      {
        label: "Mailbox Rule Audit",
        detail: "Automated scan confirms zero forwarding or exfiltration rules created.",
        actor: "SYSTEM",
      },
    ],
    outcome: "Adversary evicted before data access. Tenant hardened.",
  },
  {
    id: "SCN-ENDPOINT-MALWARE",
    category: "ENDPOINT",
    title: "Malicious Macro Execution on Workstation",
    vector: "Accounting workstation executes obfuscated PowerShell command from supplier invoice zip.",
    steps: [
      {
        label: "Behavioral Heuristic Trigger",
        detail: "Process tree anomaly: Excel spawning unapproved powershell.exe with base64 payload.",
        actor: "SYSTEM",
      },
      {
        label: "Automated Host Isolation",
        detail: "Endpoint immediately severed from local network to prevent lateral spread to domain controller.",
        actor: "AUTOMATION",
      },
      {
        label: "Analyst Artifact Analysis",
        detail: "SOC analyst inspects parent process memory, terminates staging script, and restores clean state.",
        actor: "SOC_HUMAN",
      },
    ],
    outcome: "Contained on single host in under 5 minutes without lateral spread.",
  },
  {
    id: "SCN-QR-PHISHING",
    category: "EMAIL",
    title: "QR Code Quishing Bypassing Traditional Gateway",
    vector: "Inbound PDF with embedded image QR code linking to fraudulent Microsoft login portal.",
    steps: [
      {
        label: "Computer Vision / OCR Scanning",
        detail: "In-line mail inspection extracts QR payload URL and detonates in cloud sandbox.",
        actor: "SYSTEM",
      },
      {
        label: "Global Tenant Quarantine",
        detail: "Message quarantined before delivery; 18 identical variants pulled from other employee inboxes.",
        actor: "AUTOMATION",
      },
      {
        label: "Targeted Micro-Training Dispatch",
        detail: "Targeted department receives instant 60-second micro-training alert on QR attack patterns.",
        actor: "SYSTEM",
      },
    ],
    outcome: "Zero credential compromises. Automated user awareness reinforced.",
  },
];

export const IncidentFlow: React.FC<{ scenarios?: ScenarioDefinition[] }> = ({
  scenarios = defaultScenarios,
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeScenario = scenarios[selectedIdx];

  return (
    <EvidenceFrame
      classification="EXAMPLE"
      title="ProActive Incident Containment Architecture"
      subtitle="How multi-layered automated detection and human SOC analysts isolate threat vectors before damage occurs."
      status="active"
      statusLabel="DEFENSE MODEL"
      sourceNote="Digerati Experts Security Operations Playbook (Representative Scenario)"
      variant="dark"
      className="max-w-4xl mx-auto"
    >
      {/* Category Scenario Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
        {scenarios.map((scn, idx) => {
          const isSelected = idx === selectedIdx;
          return (
            <button
              key={scn.id}
              onClick={() => setSelectedIdx(idx)}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all ${
                isSelected
                  ? "bg-[#D3126A] text-white shadow-md shadow-[#D3126A]/30"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
              data-testid={`scenario-tab-${scn.category.toLowerCase()}`}
            >
              {scn.category} SCENARIO
            </button>
          );
        })}
      </div>

      {/* Active Scenario Flow Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeScenario.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="mt-4 space-y-4"
        >
          {/* Header Summary */}
          <div className="rounded-lg border border-white/10 bg-black/40 p-4">
            <p className="font-mono text-xs text-[#F04C97] uppercase tracking-wider font-semibold">
              Threat Vector: {activeScenario.title}
            </p>
            <p className="mt-1 text-sm text-white/80 leading-relaxed">
              {activeScenario.vector}
            </p>
          </div>

          {/* Sequential Defense Steps */}
          <div className="space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/40">
              OPERATIONAL TIMELINE & CONTAINMENT GATES
            </p>
            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-white/15">
              {activeScenario.steps.map((step, stepIdx) => (
                <div key={stepIdx} className="relative group">
                  <span
                    className={`absolute -left-6 top-1 h-4 w-4 rounded-full border flex items-center justify-center font-mono text-[9px] font-bold ${
                      step.actor === "SOC_HUMAN"
                        ? "bg-[#D3126A] border-[#D3126A] text-white"
                        : "bg-[#0d0a14] border-white/30 text-white/70"
                    }`}
                  >
                    {stepIdx + 1}
                  </span>
                  <div className="rounded-lg border border-white/5 bg-[#151217]/70 p-3 hover:border-white/15 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-white">
                        {step.label}
                      </p>
                      <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-white/50 border border-white/10">
                        {step.actor === "SOC_HUMAN" ? "Human Analyst" : "Automated Control"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-white/70 leading-relaxed font-sans">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Outcome Reassurance */}
          <div className="flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-3.5 text-xs text-emerald-300">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            <div>
              <span className="font-mono font-bold uppercase tracking-wider block text-emerald-400">
                Verified Outcome
              </span>
              <p className="text-white/90 mt-0.5">{activeScenario.outcome}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </EvidenceFrame>
  );
};
