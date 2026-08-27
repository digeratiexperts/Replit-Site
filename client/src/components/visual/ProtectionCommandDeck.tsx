import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Lock,
  Mail,
  HardDrive,
  Wifi,
  FileCheck,
  CheckCircle2,
  Server,
  Smartphone,
  Eye,
  AlertCircle,
  Clock,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { SecurityBoundary, DiagramNode, ControlGate } from "../evidence/DiagramPrimitives";
import { EvidenceFrame } from "../evidence/EvidenceFrame";
import { StatusToken } from "../evidence/StatusToken";

export interface ProtectionDomain {
  id: string;
  name: string;
  shortName: string;
  icon: LucideIcon;
  tagline: string;
  risksAddressed: string[];
  architectureNodes: {
    boundaryName: string;
    nodes: { title: string; subtitle: string; metrics: string }[];
    gate: { label: string; policy: string };
  };
  operatingModel: {
    protectedScope: string[];
    deManagement: string[];
    monitoredSignals: string[];
    clientDeliverables: string[];
  };
}

export const protectionDomains: ProtectionDomain[] = [
  {
    id: "identity",
    name: "Identity & Access Control",
    shortName: "Identity",
    icon: Lock,
    tagline: "Your identity perimeter is the primary target. We enforce zero-trust access and session telemetry.",
    risksAddressed: [
      "Credential stuffing & brute force",
      "M365 session cookie theft & replay",
      "Offboarded accounts remaining active",
    ],
    architectureNodes: {
      boundaryName: "Identity Perimeter (Entra ID / M365)",
      nodes: [
        { title: "User & Admin Accounts", subtitle: "FIDO2 & Number-Match MFA", metrics: "100% MFA Enforced" },
        { title: "Conditional Access Engine", subtitle: "Geo-IP & Device Health Rules", metrics: "Real-Time Risk Scoring" },
      ],
      gate: { label: "Session Gate", policy: "Revoke token on impossible travel or anomalous user risk" },
    },
    operatingModel: {
      protectedScope: ["M365 accounts", "Google Workspace", "Admin privileged credentials", "SSO applications"],
      deManagement: ["Hardened Conditional Access rules", "MFA enforcement", "Lifecycle onboarding/offboarding"],
      monitoredSignals: ["Impossible travel alerts", "Anomalous OAuth app grants", "Password spray attempts"],
      clientDeliverables: ["Quarterly identity audit", "Active account roster", "Privileged access report"],
    },
  },
  {
    id: "endpoint",
    name: "Endpoint Detection & Isolation",
    shortName: "Endpoint",
    icon: Shield,
    tagline: "Behavioral AI monitoring and 24/7 human SOC analysts isolating compromised workstations within minutes.",
    risksAddressed: [
      "Ransomware execution & lateral spread",
      "Fileless malware & memory injections",
      "Unpatched OS and browser vulnerabilities",
    ],
    architectureNodes: {
      boundaryName: "Workstation & Server Fleet",
      nodes: [
        { title: "Behavioral EDR Agent", subtitle: "Kernel-level anomaly tracking", metrics: "24/7 Active Heuristics" },
        { title: "Automated Host Isolation", subtitle: "Instant network quarantine", metrics: "< 1s Trigger Velocity" },
      ],
      gate: { label: "Process Gate", policy: "Terminate untrusted child process & sever network stack" },
    },
    operatingModel: {
      protectedScope: ["Windows & Mac laptops", "On-prem servers", "Virtual machines", "Executive devices"],
      deManagement: ["EDR sensor deployment", "Rapid patch cadence", "Vulnerability management"],
      monitoredSignals: ["Process injection attempts", "PowerShell anomalies", "Unauthorized persistence mechanisms"],
      clientDeliverables: ["Executive threat containment logs", "Patch status metrics", "Fleet health dashboard"],
    },
  },
  {
    id: "email",
    name: "Email & Collaboration Defense",
    shortName: "Email",
    icon: Mail,
    tagline: "In-line inspection detonating malicious attachments, QR quishing, and executive impersonation attempts.",
    risksAddressed: [
      "Business Email Compromise (BEC)",
      "QR code quishing bypassing spam filters",
      "Secret forwarding & exfiltration rules",
    ],
    architectureNodes: {
      boundaryName: "Inbound & Outbound Mail Stream",
      nodes: [
        { title: "Deep Content Detonation", subtitle: "Cloud sandbox link & QR inspection", metrics: "Sub-Second Latency" },
        { title: "Tenant Forwarding Auditor", subtitle: "Anti-exfiltration scanning", metrics: "Continuous Watch" },
      ],
      gate: { label: "Mail Gate", policy: "Quarantine weaponized payload before delivery & purge variants" },
    },
    operatingModel: {
      protectedScope: ["All company inboxes", "Shared distribution lists", "Microsoft Teams chat", "SharePoint links"],
      deManagement: ["SPF/DKIM/DMARC enforcement", "Mail filter tuning", "Phishing simulation training"],
      monitoredSignals: ["Lookalike domain spoofing", "Hidden inbox rules", "High-risk attachment execution"],
      clientDeliverables: ["Phishing susceptibility reports", "Mailbox hygiene score", "Quarantine summary"],
    },
  },
  {
    id: "network",
    name: "Network & Zero Trust Perimeter",
    shortName: "Network",
    icon: Wifi,
    tagline: "Segmented local networks, enterprise firewalls, and encrypted Zero Trust remote access.",
    risksAddressed: [
      "Rogue IoT devices on internal LAN",
      "Unencrypted guest Wi-Fi exposure",
      "Lateral movement between departments",
    ],
    architectureNodes: {
      boundaryName: "Corporate Office & Remote Edge",
      nodes: [
        { title: "Managed Next-Gen Firewall", subtitle: "Deep packet inspection & IPS", metrics: "Zero Trust Encrypted" },
        { title: "VLAN Segmentation", subtitle: "Isolated Guest, IoT, & Core", metrics: "Strict Layer-3 ACLs" },
      ],
      gate: { label: "Network Gate", policy: "Block unauthorized inter-VLAN communications by default" },
    },
    operatingModel: {
      protectedScope: ["Firewalls", "Managed switches", "Corporate & guest Wi-Fi", "Remote VPN endpoints"],
      deManagement: ["Firmware updates", "Port security policies", "Bandwidth & QoS tuning"],
      monitoredSignals: ["Port scans", "Unusual outbound data bursts", "DNS tunnel queries"],
      clientDeliverables: ["Network topology map", "Firewall change log", "Bandwidth health stats"],
    },
  },
  {
    id: "recovery",
    name: "Data Resilience & Verified BCDR",
    shortName: "Recovery",
    icon: HardDrive,
    tagline: "Air-gapped immutable copies and scheduled restore drills to guarantee business continuity.",
    risksAddressed: [
      "Ransomware backup encryption attacks",
      "Catastrophic hardware / server failure",
      "Accidental or malicious database deletion",
    ],
    architectureNodes: {
      boundaryName: "Immutable Backup Architecture",
      nodes: [
        { title: "Local Flash Appliance", subtitle: "Instant local virtualization", metrics: "Hourly Snapshots" },
        { title: "Air-Gapped Cloud Vault", subtitle: "Immutable WORM storage", metrics: "RTO < 4 Hours" },
      ],
      gate: { label: "Integrity Gate", policy: "Verify checksum integrity & run automated sandbox spin-up" },
    },
    operatingModel: {
      protectedScope: ["Servers & VMs", "M365 mail & OneDrive", "SaaS databases", "Critical workstations"],
      deManagement: ["Backup schedule optimization", "Immutable storage tiering", "Quarterly restore tests"],
      monitoredSignals: ["Backup job failures", "Storage consumption spikes", "Ransomware encryption attempts"],
      clientDeliverables: ["Quarterly restore drill reports", "Documented RTO/RPO SLAs", "DR recovery runbook"],
    },
  },
  {
    id: "compliance",
    name: "Governance, Risk & Compliance",
    shortName: "Compliance",
    icon: FileCheck,
    tagline: "Aligning your infrastructure to NIST CSF, HIPAA, and Cyber Insurance underwriting mandates.",
    risksAddressed: [
      "Failed Cyber Insurance renewal audits",
      "HIPAA regulatory non-compliance fines",
      "Unmanaged vendor & supply-chain risk",
    ],
    architectureNodes: {
      boundaryName: "Governance & Evidence Engine",
      nodes: [
        { title: "Continuous Risk Scanner", subtitle: "Control mapping against NIST CSF", metrics: "Automated Evidence" },
        { title: "Executive IT Strategy (vCIO)", subtitle: "Quarterly alignment & budgeting", metrics: "Clear Roadmap" },
      ],
      gate: { label: "Compliance Gate", policy: "Track non-compliant assets & trigger remediation workflows" },
    },
    operatingModel: {
      protectedScope: ["All technical controls", "Security policies", "Vendor questionnaires", "Employee roster"],
      deManagement: ["Cyber insurance questionnaire support", "Audit evidence collation", "Risk register updates"],
      monitoredSignals: ["Control drift alerts", "Unenforced policy exceptions", "Overdue access reviews"],
      clientDeliverables: ["Executive QBR packs", "Cyber insurance readiness packet", "Compliance matrix"],
    },
  },
];

export const ProtectionCommandDeck: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>("identity");
  const activeDomain = protectionDomains.find((d) => d.id === selectedId) || protectionDomains[0];
  const DomainIcon = activeDomain.icon;

  return (
    <EvidenceFrame
      classification="ILLUSTRATIVE"
      title="ProActive Six Domains Security Architecture"
      subtitle="How Digerati Experts coordinates technical controls, active telemetry, and engineering operations across your entire business."
      status="active"
      statusLabel="UNIFIED ARCHITECTURE"
      sourceNote="Digerati Experts Security Engineering Specification v2"
      variant="dark"
      className="w-full"
    >
      {/* Domain Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
        {protectionDomains.map((domain) => {
          const isSelected = domain.id === selectedId;
          const Icon = domain.icon;
          return (
            <button
              key={domain.id}
              onClick={() => setSelectedId(domain.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-mono text-xs font-semibold transition-all ${
                isSelected
                  ? "bg-[#D3126A] text-white shadow-md shadow-[#D3126A]/30"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
              data-testid={`domain-tab-${domain.id}`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{domain.shortName}</span>
            </button>
          );
        })}
      </div>

      {/* 3-Column Command Deck Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDomain.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* Column 1: Purpose & Risks (3 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-[#F04C97]">
                <DomainIcon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-heading">{activeDomain.name}</h3>
            </div>
            <p className="text-xs md:text-sm text-white/70 leading-relaxed">
              {activeDomain.tagline}
            </p>

            <div className="rounded-lg border border-white/10 bg-black/40 p-3.5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#F04C97] font-semibold mb-2">
                Primary Threat Vectors Mitigated
              </p>
              <ul className="space-y-1.5 text-xs text-white/80 font-sans">
                {activeDomain.risksAddressed.map((risk, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#D3126A] mt-0.5">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 2: Architectural Defense Diagram (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <SecurityBoundary
              label={activeDomain.architectureNodes.boundaryName}
              variant="perimeter"
              className="h-full flex flex-col justify-between"
            >
              <div className="space-y-2.5 mb-3">
                {activeDomain.architectureNodes.nodes.map((node, i) => (
                  <DiagramNode
                    key={i}
                    title={node.title}
                    subtitle={node.subtitle}
                    metrics={node.metrics}
                    icon={DomainIcon}
                    status="healthy"
                  />
                ))}
              </div>
              <ControlGate
                label={activeDomain.architectureNodes.gate.label}
                policy={activeDomain.architectureNodes.gate.policy}
                enforced={true}
              />
            </SecurityBoundary>
          </div>

          {/* Column 3: DE Operating Model (4 cols) */}
          <div className="lg:col-span-4 rounded-xl border border-white/10 bg-[#151217]/70 p-4 space-y-4">
            <div>
              <p className="font-mono text-[11px] font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#F04C97]" />
                What DE Manages & Protects
              </p>
              <div className="flex flex-wrap gap-1.5">
                {activeDomain.operatingModel.protectedScope.map((item, i) => (
                  <span
                    key={i}
                    className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-white/5 pt-3">
              <p className="font-mono text-[11px] font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-emerald-400" />
                Continuous Monitored Telemetry
              </p>
              <ul className="space-y-1 text-xs text-white/70">
                {activeDomain.operatingModel.monitoredSignals.map((sig, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>{sig}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/5 pt-3">
              <p className="font-mono text-[11px] font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <UserCheck className="h-3.5 w-3.5 text-cyan-400" />
                Verified Client Deliverables
              </p>
              <ul className="space-y-1 text-xs text-white/70">
                {activeDomain.operatingModel.clientDeliverables.map((del, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </EvidenceFrame>
  );
};
