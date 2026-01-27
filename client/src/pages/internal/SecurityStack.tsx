import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ChevronDown, Shield, AlertTriangle, Lock, Eye, Mail, Users } from "lucide-react";
import logoImage from "@assets/DE-Logo-new_1762461524794.webp";

interface SecurityFeature {
  name: string;
  vendor?: string;
  description: string;
  protectionLevel: "critical" | "high" | "standard";
  status: "included" | "addon" | "tbd";
}

interface SecurityLayer {
  id: string;
  title: string;
  icon: string;
  features: SecurityFeature[];
}

const securityLayers: SecurityLayer[] = [
  {
    id: "identity",
    title: "Identity & Access Security",
    icon: "🔐",
    features: [
      { name: "Multi-Factor Authentication (MFA)", vendor: "Microsoft Entra", description: "Organization-wide MFA enforcement across all user accounts with support for authenticator apps, hardware tokens, and passwordless methods.", protectionLevel: "critical", status: "included" },
      { name: "Conditional Access Policies", vendor: "Microsoft Entra", description: "Risk-based access policies that adapt authentication requirements based on user location, device compliance, and application sensitivity.", protectionLevel: "critical", status: "included" },
      { name: "Identity Threat Detection", vendor: "Coro", description: "Continuous monitoring for identity-based threats including impossible travel, leaked credentials, and suspicious sign-in patterns.", protectionLevel: "high", status: "included" },
      { name: "Privileged Access Management", vendor: "Microsoft PIM", description: "Just-in-time privileged access for admin accounts with time-limited role elevation and approval workflows.", protectionLevel: "high", status: "addon" },
    ]
  },
  {
    id: "endpoint",
    title: "Endpoint Detection & Response",
    icon: "💻",
    features: [
      { name: "Next-Gen Antivirus (NGAV)", vendor: "Coro", description: "AI-powered malware prevention that stops known and unknown threats including ransomware, zero-days, and fileless attacks.", protectionLevel: "critical", status: "included" },
      { name: "Endpoint Detection & Response (EDR)", vendor: "Coro", description: "Behavioral analysis and threat hunting on endpoints with automated response actions and forensic capabilities.", protectionLevel: "critical", status: "included" },
      { name: "24/7 Managed Detection & Response", vendor: "Blackpoint", description: "Round-the-clock SOC monitoring with human analysts who investigate alerts and take immediate containment actions.", protectionLevel: "critical", status: "included" },
      { name: "Device Compliance Enforcement", vendor: "Microsoft Intune", description: "Automated compliance checks ensuring devices meet security baselines before accessing corporate resources.", protectionLevel: "high", status: "included" },
    ]
  },
  {
    id: "email",
    title: "Email & Collaboration Security",
    icon: "📧",
    features: [
      { name: "Advanced Email Gateway", vendor: "Mimecast", description: "Multi-layered email filtering with anti-spam, anti-malware, and impersonation protection that stops threats before they reach inboxes.", protectionLevel: "critical", status: "included" },
      { name: "Phishing Simulation & Training", vendor: "Coro", description: "Automated phishing campaigns that test and train employees to recognize social engineering attacks.", protectionLevel: "high", status: "included" },
      { name: "Email Encryption", vendor: "Mimecast", description: "Policy-based email encryption for sensitive communications with secure recipient portal for external parties.", protectionLevel: "standard", status: "addon" },
      { name: "Data Loss Prevention (DLP)", vendor: "Microsoft Purview", description: "Content inspection and policy enforcement to prevent accidental or malicious data exfiltration via email.", protectionLevel: "high", status: "addon" },
    ]
  },
  {
    id: "network",
    title: "Network & DNS Security",
    icon: "🌐",
    features: [
      { name: "DNS Security & Filtering", vendor: "Coro", description: "DNS-layer protection that blocks malicious domains and enforces acceptable use policies before connections are established.", protectionLevel: "high", status: "included" },
      { name: "Secure Web Gateway", vendor: "Coro", description: "Cloud-based web proxy that inspects encrypted traffic, blocks malicious content, and enforces browsing policies.", protectionLevel: "high", status: "included" },
      { name: "Firewall Management", vendor: "Various", description: "Configuration and monitoring of perimeter firewalls with rule management, IPS, and VPN services.", protectionLevel: "high", status: "included" },
      { name: "Network Monitoring", vendor: "RMM Platform", description: "24/7 monitoring of network devices with automated alerts for anomalies and potential security incidents.", protectionLevel: "standard", status: "included" },
    ]
  },
  {
    id: "data",
    title: "Data Protection",
    icon: "🔒",
    features: [
      { name: "Microsoft 365 Backup", vendor: "Third-party", description: "Independent backup of Exchange, SharePoint, OneDrive, and Teams data protecting against ransomware and accidental deletion.", protectionLevel: "critical", status: "included" },
      { name: "Encryption-at-Rest", vendor: "Atakama", description: "File-level encryption for sensitive data with zero-knowledge key management and policy-based access controls.", protectionLevel: "high", status: "addon" },
      { name: "Cloud Access Security (CASB)", vendor: "Coro", description: "Visibility and control over SaaS application usage with data governance policies and shadow IT discovery.", protectionLevel: "high", status: "included" },
    ]
  },
  {
    id: "awareness",
    title: "Security Awareness",
    icon: "🎓",
    features: [
      { name: "Security Awareness Training", vendor: "Coro", description: "Interactive training modules covering phishing, social engineering, password hygiene, and security best practices.", protectionLevel: "high", status: "included" },
      { name: "Phishing Simulations", vendor: "Coro", description: "Automated phishing campaigns that measure employee susceptibility and provide just-in-time training for those who fail.", protectionLevel: "high", status: "included" },
      { name: "Dark Web Monitoring", vendor: "Coro", description: "Continuous monitoring of dark web markets and forums for compromised credentials and company data exposure.", protectionLevel: "standard", status: "included" },
    ]
  },
];

function ProtectionBadge({ level }: { level: "critical" | "high" | "standard" }) {
  const colors = {
    critical: "bg-red-500/20 text-red-300 border-red-400/30",
    high: "bg-orange-500/20 text-orange-300 border-orange-400/30",
    standard: "bg-amber-500/20 text-amber-300 border-amber-400/30",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${colors[level]} uppercase`}>
      {level}
    </span>
  );
}

function StatusBadge({ status }: { status: "included" | "addon" | "tbd" }) {
  const colors = {
    included: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
    addon: "bg-amber-500/20 text-amber-300 border-amber-400/30",
    tbd: "bg-slate-500/20 text-slate-300 border-slate-400/30",
  };
  const labels = { included: "Included", addon: "Add-on", tbd: "TBD" };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${colors[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function SecurityStack() {
  const [expandedLayers, setExpandedLayers] = useState<Set<string>>(new Set(["identity", "endpoint"]));
  const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(new Set());

  const toggleLayer = (id: string) => {
    setExpandedLayers(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleFeature = (name: string) => {
    setExpandedFeatures(prev => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030228] to-[#0a0a12]">
      <Helmet>
        <title>DE Security Stack | Internal Reference | Digerati Experts</title>
        <meta name="description" content="Internal reference guide for the 6-layer security stack including Identity, Endpoint, Email, Network, Data Protection, and Security Awareness." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <header className="border-b border-white/10 bg-[#030228]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/internal" className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors mb-8" data-testid="link-back">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sales Tools</span>
          </Link>
          <img src={logoImage} alt="Digerati Experts" className="h-8" />
        </div>
      </header>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 rounded-2xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse" />
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2" data-testid="heading-security-stack">
                DE Security Stack
              </h1>
              <p className="text-white/90 text-lg mb-4">
                Multi-Layered Defense-in-Depth Protection
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <Shield className="w-4 h-4" /> 24/7 SOC
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <Eye className="w-4 h-4" /> MDR
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email Security
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <Users className="w-4 h-4" /> User Training
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#1a1a2e] border border-red-400/20 rounded-xl p-5">
              <div className="text-3xl mb-2">🛡️</div>
              <div className="text-2xl font-bold text-red-400">6</div>
              <div className="text-white/60 text-sm">Security Layers</div>
            </div>
            <div className="bg-[#1a1a2e] border border-red-400/20 rounded-xl p-5">
              <div className="text-3xl mb-2">🔍</div>
              <div className="text-2xl font-bold text-red-400">24/7</div>
              <div className="text-white/60 text-sm">SOC Monitoring</div>
            </div>
            <div className="bg-[#1a1a2e] border border-red-400/20 rounded-xl p-5">
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-2xl font-bold text-red-400">&lt;15 min</div>
              <div className="text-white/60 text-sm">Response Time</div>
            </div>
            <div className="bg-[#1a1a2e] border border-red-400/20 rounded-xl p-5">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-2xl font-bold text-red-400">99.9%</div>
              <div className="text-white/60 text-sm">Threat Block Rate</div>
            </div>
          </div>

          <div className="bg-[#1a1a2e] border border-red-400/20 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">Defense-in-Depth Strategy</h3>
            </div>
            <p className="text-white/70 mb-4">
              Our security stack uses multiple overlapping layers of protection. If one layer is bypassed, others are in place to detect and stop the threat. 
              This approach significantly reduces risk compared to relying on any single security product.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full text-sm text-emerald-300">
                <strong>Included</strong> = In base package
              </span>
              <span className="bg-amber-500/20 border border-amber-400/30 px-3 py-1 rounded-full text-sm text-amber-300">
                <strong>Add-on</strong> = Optional enhancement
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {securityLayers.map((layer) => (
              <div key={layer.id} className="bg-[#1a1a2e] border border-red-400/20 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-red-500/10 transition-colors"
                  onClick={() => toggleLayer(layer.id)}
                  data-testid={`layer-${layer.id}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{layer.icon}</span>
                    <h3 className="text-lg font-bold text-white">{layer.title}</h3>
                    <span className="text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full">
                      {layer.features.length} controls
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-red-400 transition-transform ${expandedLayers.has(layer.id) ? 'rotate-180' : ''}`} />
                </button>
                
                {expandedLayers.has(layer.id) && (
                  <div className="border-t border-white/10">
                    {layer.features.map((feature, idx) => (
                      <div key={feature.name} className={idx % 2 === 0 ? '' : 'bg-white/[0.02]'}>
                        <button
                          className="w-full flex items-center justify-between p-4 pl-14 text-left hover:bg-red-500/10 transition-colors"
                          onClick={() => toggleFeature(feature.name)}
                          data-testid={`feature-${layer.id}-${idx}`}
                        >
                          <div className="flex items-center gap-3 flex-wrap">
                            <ChevronDown className={`w-4 h-4 text-red-400 transition-transform ${expandedFeatures.has(feature.name) ? 'rotate-180' : ''}`} />
                            <span className="text-white font-medium">{feature.name}</span>
                            {feature.vendor && (
                              <span className="text-xs text-white/40">({feature.vendor})</span>
                            )}
                            <ProtectionBadge level={feature.protectionLevel} />
                            <StatusBadge status={feature.status} />
                          </div>
                        </button>
                        {expandedFeatures.has(feature.name) && (
                          <div className="bg-red-500/10 border-l-4 border-red-400 px-14 py-4">
                            <p className="text-white/70 leading-relaxed">{feature.description}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-red-400/20 border-l-4 border-l-red-400 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xl">⚠️</span>
              <strong className="text-red-300">Important Note</strong>
            </div>
            <p className="text-white/70">
              Security is not a product—it's a process. Our stack combines best-in-class tools with 24/7 human expertise. 
              When Blackpoint's SOC detects a threat, they take immediate action to contain it, not just send an alert.
            </p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-white/50 text-sm">
              DIGERATI EXPERTS | (480) 519-5892 | info@digeratiexperts.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
