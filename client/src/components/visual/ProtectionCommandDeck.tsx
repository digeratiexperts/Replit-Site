import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Eye,
  FileCheck,
  HardDrive,
  Lock,
  Mail,
  Shield,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { ControlGate, DiagramNode, SecurityBoundary } from "../evidence/DiagramPrimitives";
import { EvidenceFrame } from "../evidence/EvidenceFrame";

export interface ProtectionDomain {
  id: string;
  name: string;
  shortName: string;
  icon: LucideIcon;
  purpose: string;
  commonQuestions: string[];
  architecture: {
    boundaryName: string;
    nodes: { title: string; subtitle: string; detail: string }[];
    gate: { label: string; policy: string };
  };
  operatingModel: {
    scopeExamples: string[];
    managementExamples: string[];
    signalExamples: string[];
    deliverableExamples: string[];
  };
}

export const protectionDomains: ProtectionDomain[] = [
  {
    id: "identity",
    name: "Identity & Access",
    shortName: "Identity",
    icon: Lock,
    purpose: "Control who can access business systems, how access is verified, and how accounts are changed or removed over time.",
    commonQuestions: ["Is MFA appropriate and enforced where required?", "Are privileged accounts separated and reviewed?", "Does offboarding remove access consistently?"],
    architecture: {
      boundaryName: "Identity boundary",
      nodes: [
        { title: "Users & administrators", subtitle: "Accounts, roles, authentication", detail: "Access inventory" },
        { title: "Access policy", subtitle: "Authentication and device/context rules", detail: "Policy layer" },
      ],
      gate: { label: "Access decision", policy: "Apply the approved authentication and access rules for the environment" },
    },
    operatingModel: {
      scopeExamples: ["User accounts", "Admin access", "SSO applications", "Joiner/mover/leaver workflow"],
      managementExamples: ["Access-policy review", "MFA configuration", "Onboarding/offboarding support"],
      signalExamples: ["Risky sign-ins", "Unexpected access changes", "Privilege changes"],
      deliverableExamples: ["Account review", "Access findings", "Remediation roadmap"],
    },
  },
  {
    id: "endpoint",
    name: "Endpoint Protection",
    shortName: "Endpoint",
    icon: Shield,
    purpose: "Keep managed devices visible, maintained, and protected with controls matched to device ownership, user role, and business risk.",
    commonQuestions: ["Which devices are actually in scope?", "Are security and patch states visible?", "What happens when a device needs containment or rebuild?"],
    architecture: {
      boundaryName: "Managed device boundary",
      nodes: [
        { title: "Workstations & servers", subtitle: "Company-managed devices in scope", detail: "Device inventory" },
        { title: "Security controls", subtitle: "Endpoint, patch, configuration, and policy tooling", detail: "Control layer" },
      ],
      gate: { label: "Device decision", policy: "Use the deployed controls and authorized procedure appropriate to the event" },
    },
    operatingModel: {
      scopeExamples: ["Laptops/desktops", "Servers where contracted", "Device configuration", "Patch posture"],
      managementExamples: ["Agent deployment", "Patch/configuration management", "Device lifecycle support"],
      signalExamples: ["Security alerts", "Patch drift", "Device-health exceptions"],
      deliverableExamples: ["Device inventory", "Posture findings", "Remediation actions"],
    },
  },
  {
    id: "email",
    name: "Email & Collaboration",
    shortName: "Email",
    icon: Mail,
    purpose: "Reduce email-driven risk while keeping authentication, filtering, user behavior, and account settings understandable and supportable.",
    commonQuestions: ["Are domain-authentication records configured correctly?", "Are risky mailbox rules or forwarding visible?", "How are users trained and supported after suspicious messages?"],
    architecture: {
      boundaryName: "Messaging boundary",
      nodes: [
        { title: "Mail & collaboration", subtitle: "Tenant, domains, users, and shared resources", detail: "Service scope" },
        { title: "Protection layer", subtitle: "Authentication, filtering, policy, and awareness controls", detail: "Control layer" },
      ],
      gate: { label: "Message decision", policy: "Apply the mail-security controls and investigation path available in the environment" },
    },
    operatingModel: {
      scopeExamples: ["Mailboxes", "Domain authentication", "Shared resources", "User awareness"],
      managementExamples: ["Configuration review", "Filter/policy tuning", "Awareness support where included"],
      signalExamples: ["Suspicious messages", "Forwarding changes", "Account-related alerts"],
      deliverableExamples: ["Mail posture findings", "Configuration actions", "User/security follow-up"],
    },
  },
  {
    id: "network",
    name: "Network & Connectivity",
    shortName: "Network",
    icon: Wifi,
    purpose: "Document and manage the business network so internet edge, switching, Wi-Fi, segmentation, and remote access match the operating model.",
    commonQuestions: ["Who owns and administers the network equipment?", "Are guest/IoT/business networks separated appropriately?", "Is the configuration documented and recoverable?"],
    architecture: {
      boundaryName: "Network boundary",
      nodes: [
        { title: "Internet edge", subtitle: "Firewall/router and provider handoff", detail: "Edge layer" },
        { title: "LAN & wireless", subtitle: "Switching, Wi-Fi, segmentation, and devices", detail: "Internal layer" },
      ],
      gate: { label: "Traffic decision", policy: "Apply documented network policy and segmentation appropriate to the client environment" },
    },
    operatingModel: {
      scopeExamples: ["Firewall/router", "Switching", "Business/guest Wi-Fi", "Remote-access configuration"],
      managementExamples: ["Configuration management", "Firmware/change planning", "Network documentation"],
      signalExamples: ["Availability alerts", "Configuration exceptions", "Unexpected network behavior"],
      deliverableExamples: ["Topology/documentation", "Risk findings", "Change roadmap"],
    },
  },
  {
    id: "recovery",
    name: "Data & Recovery",
    shortName: "Recovery",
    icon: HardDrive,
    purpose: "Make backup and recovery an evidenced operating practice: define what is protected, who owns recovery, and how restore confidence is validated.",
    commonQuestions: ["What data and systems are actually protected?", "Are retention and separation appropriate to the risk?", "Has the required recovery path been tested and documented?"],
    architecture: {
      boundaryName: "Recovery boundary",
      nodes: [
        { title: "Protected workloads", subtitle: "Systems and data explicitly in scope", detail: "Protection scope" },
        { title: "Backup & recovery controls", subtitle: "Retention, separation, monitoring, and restore workflow", detail: "Recovery layer" },
      ],
      gate: { label: "Recovery decision", policy: "Use the approved restore path and validation procedure for the protected workload" },
    },
    operatingModel: {
      scopeExamples: ["Selected endpoints", "Servers/VMs where included", "Cloud/SaaS data where contracted", "Recovery documentation"],
      managementExamples: ["Backup monitoring", "Retention/configuration review", "Restore validation where included"],
      signalExamples: ["Job failures", "Capacity/retention exceptions", "Restore-test findings"],
      deliverableExamples: ["Backup scope", "Restore evidence", "Recovery roadmap"],
    },
  },
  {
    id: "compliance",
    name: "Governance & Compliance Support",
    shortName: "Compliance",
    icon: FileCheck,
    purpose: "Translate technical posture into evidence, priorities, and framework-oriented reporting that helps the business manage risk and third-party requirements.",
    commonQuestions: ["Which requirements actually apply to this organization?", "What technical evidence can support questionnaires or reviews?", "Which gaps belong on the roadmap rather than being hidden?"],
    architecture: {
      boundaryName: "Governance boundary",
      nodes: [
        { title: "Requirements & controls", subtitle: "Framework/customer/insurance requirements in scope", detail: "Requirement layer" },
        { title: "Evidence & roadmap", subtitle: "Findings, documentation, owners, and priorities", detail: "Evidence layer" },
      ],
      gate: { label: "Evidence decision", policy: "Map verified technical evidence to the requirement without claiming certification that DE does not hold" },
    },
    operatingModel: {
      scopeExamples: ["Control evidence", "Questionnaire support", "Risk findings", "Roadmap ownership"],
      managementExamples: ["Evidence collation", "Control mapping", "Review support where contracted"],
      signalExamples: ["Control drift", "Open findings", "Overdue remediation items"],
      deliverableExamples: ["Risk summary", "Evidence package", "Roadmap/QBR inputs"],
    },
  },
];

export const ProtectionCommandDeck: React.FC = () => {
  const [selectedId, setSelectedId] = useState("identity");
  const activeDomain = protectionDomains.find((domain) => domain.id === selectedId) ?? protectionDomains[0];
  const DomainIcon = activeDomain.icon;

  return (
    <EvidenceFrame
      classification="ILLUSTRATIVE"
      title="Six-domain protection model"
      subtitle="Explore how DE thinks about identity, endpoints, email, network, recovery, and compliance support without implying every client receives the same controls or tooling."
      status="informational"
      statusLabel="INTERACTIVE MODEL"
      sourceNote="Illustrative architecture. Exact scope, controls, monitoring, deliverables, vendors, and cadence depend on the selected operating model and client environment."
      variant="dark"
      className="w-full"
    >
      <div className="flex flex-wrap items-center gap-2 border-b border-de-hairline pb-4">
        {protectionDomains.map((domain) => {
          const isSelected = domain.id === selectedId;
          const Icon = domain.icon;
          return (
            <button
              key={domain.id}
              type="button"
              onClick={() => setSelectedId(domain.id)}
              aria-pressed={isSelected}
              className={`flex min-h-11 items-center gap-2 rounded-lg border px-3.5 py-2 font-mono text-xs font-semibold transition-colors ${
                isSelected
                  ? "border-[#D3126A] bg-[#D3126A] text-white"
                  : "border-[var(--de-paper-hairline)] bg-white text-[#3A3448] hover:border-[#D3126A]/35"
              }`}
              data-testid={`domain-tab-${domain.id}`}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{domain.shortName}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeDomain.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12"
        >
          <div className="space-y-4 lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--de-paper-hairline)] bg-white text-[#A30E52]">
                <DomainIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">{activeDomain.name}</h3>
            </div>
            <p className="text-sm leading-relaxed text-white/70">{activeDomain.purpose}</p>

            <div className="rounded-lg border border-[var(--de-paper-hairline)] bg-white p-3.5">
              <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#A30E52]">Questions the assessment should answer</p>
              <ul className="space-y-2 text-xs leading-relaxed text-[#3A3448]">
                {activeDomain.commonQuestions.map((question) => (
                  <li key={question} className="flex items-start gap-2">
                    <span className="mt-1 text-[#D3126A]" aria-hidden="true">•</span>
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-3 lg:col-span-4">
            <SecurityBoundary label={activeDomain.architecture.boundaryName} variant="perimeter" className="h-full">
              <div className="mb-3 space-y-2.5">
                {activeDomain.architecture.nodes.map((node) => (
                  <DiagramNode
                    key={node.title}
                    title={node.title}
                    subtitle={node.subtitle}
                    metrics={node.detail}
                    icon={DomainIcon}
                    status="monitored"
                    tone="paper"
                  />
                ))}
              </div>
              <ControlGate label={activeDomain.architecture.gate.label} policy={activeDomain.architecture.gate.policy} enforced={false} tone="paper" />
            </SecurityBoundary>
          </div>

          <div className="space-y-4 rounded-xl border border-de-hairline bg-de-raised p-4 lg:col-span-4">
            <div>
              <p className="mb-2 flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-white">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#F04C97]" aria-hidden="true" />
                Representative scope
              </p>
              <div className="flex flex-wrap gap-1.5">
                {activeDomain.operatingModel.scopeExamples.map((item) => (
                  <span key={item} className="rounded border border-[var(--de-paper-hairline)] bg-white px-2 py-0.5 font-mono text-[10px] text-[#3A3448]">{item}</span>
                ))}
              </div>
            </div>

            <div className="border-t border-de-hairline pt-3">
              <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-wider text-white">Management may include</p>
              <ul className="space-y-1 text-xs text-white/70">
                {activeDomain.operatingModel.managementExamples.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </div>

            <div className="border-t border-de-hairline pt-3">
              <p className="mb-2 flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-white">
                <Eye className="h-3.5 w-3.5 text-[#F04C97]" aria-hidden="true" />
                Signal examples
              </p>
              <ul className="space-y-1 text-xs text-white/70">
                {activeDomain.operatingModel.signalExamples.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </div>

            <div className="border-t border-de-hairline pt-3">
              <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-wider text-white">Representative outputs</p>
              <ul className="space-y-1 text-xs text-white/70">
                {activeDomain.operatingModel.deliverableExamples.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </EvidenceFrame>
  );
};
