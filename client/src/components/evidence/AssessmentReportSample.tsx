import React from "react";
import { Shield, AlertTriangle, CheckCircle2, FileText, ArrowRight } from "lucide-react";
import { EvidenceFrame } from "./EvidenceFrame";

export const AssessmentReportSample: React.FC = () => {
  return (
    <EvidenceFrame
      classification="SANITIZED_REAL"
      title="Sanitized Cyber Risk & Infrastructure Assessment Excerpt"
      subtitle="Sample deliverable produced following our discovery audit for a 35-user medical practice in Scottsdale, AZ (All PII & tenant names redacted)."
      status="verified"
      statusLabel="AUDIT COMPLETE"
      timestamp="Delivered: Day 7 of Discovery"
      sourceNote="Digerati Experts Security Audit Workpapers (Sanitized Client Sample)"
      variant="dark"
      className="max-w-4xl mx-auto"
    >
      <div className="space-y-4 font-sans text-white">
        {/* Scorecard Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-white/10 bg-black/40 p-4">
            <p className="font-mono text-[10px] uppercase text-white/50">Initial Health Score</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold font-mono text-amber-400">54 / 100</span>
              <span className="font-mono text-xs text-amber-400/70">Elevated Exposure</span>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/40 p-4">
            <p className="font-mono text-[10px] uppercase text-white/50">Post-Hardening Target</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold font-mono text-emerald-400">92 / 100</span>
              <span className="font-mono text-xs text-emerald-400/70">Fortified Baseline</span>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/40 p-4">
            <p className="font-mono text-[10px] uppercase text-white/50">Identified Gaps</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold font-mono text-white">14 Controls</span>
              <span className="font-mono text-xs text-[#F04C97]">3 Critical</span>
            </div>
          </div>
        </div>

        {/* Critical Findings Log */}
        <div className="rounded-xl border border-white/10 bg-[#151217] p-4 font-mono text-xs">
          <p className="text-[11px] font-bold text-[#F04C97] uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5" />
            CRITICAL DISCOVERY FINDINGS (PRIORITY 1)
          </p>
          <div className="space-y-2.5">
            <div className="rounded-lg border border-amber-500/20 bg-amber-950/20 p-3">
              <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                <span>1. Legacy M365 Authentication Protocols Active</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">CRITICAL</span>
              </div>
              <p className="text-[11px] text-white/70 font-sans mt-1">
                POP3/IMAP basic auth enabled on 12 mailboxes, allowing password-spray attacks to bypass SMS MFA.
              </p>
            </div>

            <div className="rounded-lg border border-amber-500/20 bg-amber-950/20 p-3">
              <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                <span>2. Backup Repository on Same Broadcast Domain as Primary ERP</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">HIGH</span>
              </div>
              <p className="text-[11px] text-white/70 font-sans mt-1">
                Backup storage was directly discoverable via SMB; zero air-gap or immutability lock in place.
              </p>
            </div>
          </div>
        </div>

        {/* 30-Day Remediation Roadmap */}
        <div className="rounded-xl border border-white/5 bg-black/30 p-4 font-mono text-xs text-white/80">
          <p className="text-[11px] text-white/40 uppercase tracking-wider mb-2">
            30-DAY REMEDIATION ROADMAP
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
            <div className="rounded border border-white/10 bg-[#0d0a14] p-2.5">
              <span className="text-[#F04C97] font-bold">DAYS 1–7</span>
              <p className="text-white/80 text-[11px] font-sans mt-0.5">Disable legacy auth & enforce Conditional Access</p>
            </div>
            <div className="rounded border border-white/10 bg-[#0d0a14] p-2.5">
              <span className="text-[#F04C97] font-bold">DAYS 8–14</span>
              <p className="text-white/80 text-[11px] font-sans mt-0.5">Deploy EDR sensors to all workstations & isolate guest Wi-Fi</p>
            </div>
            <div className="rounded border border-white/10 bg-[#0d0a14] p-2.5">
              <span className="text-[#F04C97] font-bold">DAYS 15–30</span>
              <p className="text-white/80 text-[11px] font-sans mt-0.5">Transition to immutable air-gapped backups & run test restore</p>
            </div>
          </div>
        </div>
      </div>
    </EvidenceFrame>
  );
};
