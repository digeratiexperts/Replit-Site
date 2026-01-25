import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ChevronDown, Monitor, Lock, Globe, Headphones, ExternalLink } from "lucide-react";
import logoImage from "@assets/DE-Logo-new_1762461524794.webp";

interface Feature {
  name: string;
  description: string;
  tags?: string[];
}

interface Section {
  id: string;
  title: string;
  icon: string;
  features: Feature[];
}

const sections: Section[] = [
  {
    id: "identity",
    title: "Identity & Access Management",
    icon: "🔐",
    features: [
      { name: "Azure AD / Entra ID tenant management", description: "Full tenant administration including user lifecycle, group management, conditional access policies, and identity governance. We manage your cloud identity foundation.", tags: ["Included"] },
      { name: "Multi-Factor Authentication (MFA) enforcement", description: "Organization-wide MFA deployment with support for authenticator apps, hardware tokens, and passwordless methods. Protects against 99.9% of account compromise attacks.", tags: ["Included"] },
      { name: "Single Sign-On (SSO) configuration", description: "SSO setup for SaaS applications using SAML or OIDC protocols. Users get seamless access to approved apps with one set of credentials.", tags: ["Included"] },
      { name: "Conditional Access policies", description: "Risk-based access policies that adapt authentication requirements based on user location, device health, and app sensitivity.", tags: ["Included"] },
      { name: "Privileged Identity Management (PIM)", description: "Just-in-time privileged access for admin roles. Reduces standing admin privileges and provides audit trails for elevated access.", tags: ["Optional", "Enterprise"] },
    ]
  },
  {
    id: "endpoint",
    title: "Endpoint Management",
    icon: "💻",
    features: [
      { name: "Microsoft Intune / MDM enrollment", description: "Device enrollment and management for Windows, macOS, iOS, and Android. Ensures devices meet security baselines before accessing corporate resources.", tags: ["Included"] },
      { name: "Device compliance policies", description: "Automated compliance checks for encryption, OS version, antivirus status, and security configurations. Non-compliant devices are blocked from corporate access.", tags: ["Included"] },
      { name: "Application deployment", description: "Push approved applications to enrolled devices automatically. Includes LOB apps, Microsoft 365, and third-party software.", tags: ["Included"] },
      { name: "Windows Autopilot / zero-touch deployment", description: "Out-of-box device provisioning that configures new hardware automatically. Users receive fully configured devices shipped directly to them.", tags: ["Optional"] },
      { name: "Patch management", description: "Automated Windows and third-party application patching with staged rollouts and rollback capabilities.", tags: ["Included"] },
    ]
  },
  {
    id: "network",
    title: "Network & Connectivity",
    icon: "🌐",
    features: [
      { name: "Firewall management", description: "Configuration and monitoring of perimeter firewalls with rule management, threat prevention, and VPN services.", tags: ["Included"] },
      { name: "SD-WAN / site connectivity", description: "Software-defined WAN solutions for multi-site connectivity with automatic failover and traffic optimization.", tags: ["Optional"] },
      { name: "DNS filtering / web security", description: "DNS-layer security that blocks malicious domains and enforces acceptable use policies before connections are established.", tags: ["Included"] },
      { name: "Wireless network management", description: "Enterprise WiFi configuration with separate guest networks, WPA3 security, and centralized management.", tags: ["Included"] },
      { name: "Network monitoring & alerting", description: "24/7 monitoring of network devices with automated alerts for outages, high utilization, and security events.", tags: ["Included"] },
    ]
  },
  {
    id: "backup",
    title: "Backup & Disaster Recovery",
    icon: "💾",
    features: [
      { name: "Microsoft 365 backup", description: "Third-party backup of Exchange, SharePoint, OneDrive, and Teams data. Protects against accidental deletion, ransomware, and retention policy gaps.", tags: ["Included"] },
      { name: "Server/VM backup", description: "Image-based backup of on-premises and cloud servers with rapid recovery options and offsite replication.", tags: ["Optional"] },
      { name: "Backup monitoring & verification", description: "Daily backup job monitoring with automated verification and test restores to ensure recoverability.", tags: ["Included"] },
      { name: "Disaster recovery planning", description: "Documented DR procedures with RTO/RPO targets, runbooks, and annual testing exercises.", tags: ["Optional", "Enterprise"] },
    ]
  },
  {
    id: "support",
    title: "Support Operations",
    icon: "🎫",
    features: [
      { name: "Help desk ticketing", description: "Full-service help desk with ticket tracking, SLA management, and escalation procedures. Multiple contact channels including phone, email, and portal.", tags: ["Included"] },
      { name: "Remote support tools", description: "Secure remote access tools for troubleshooting and issue resolution. All sessions are logged for audit purposes.", tags: ["Included"] },
      { name: "On-site support", description: "Scheduled or emergency on-site visits for hardware issues, network troubleshooting, or hands-on assistance.", tags: ["Optional"] },
      { name: "After-hours / emergency support", description: "24/7 emergency support line for critical issues affecting business operations.", tags: ["Included", "Business+"] },
      { name: "Technology Business Reviews (TBRs)", description: "Quarterly strategic reviews covering IT health, project updates, budget planning, and technology roadmap.", tags: ["Included"] },
    ]
  },
];

export default function CoreIT() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["identity"]));
  const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(new Set());

  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
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
    <div className="min-h-screen bg-[#030228]">
      <header className="border-b border-white/10 bg-[#030228]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/internal/sales-process" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm" data-testid="link-back">
            <ArrowLeft className="w-4 h-4" />
            Back to Sales Process
          </Link>
          <img src={logoImage} alt="Digerati Experts" className="h-8" />
        </div>
      </header>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2" data-testid="heading-core-it">
                Core IT, Infrastructure & Support
              </h1>
              <p className="text-white/80 text-lg mb-4">
                The foundation that powers your DE managed services plan
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <Monitor className="w-4 h-4" /> Endpoints
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <Lock className="w-4 h-4" /> Identity & Access
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Network & Connectivity
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <Headphones className="w-4 h-4" /> Support Operations
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a2e] border border-violet-400/20 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center text-lg">
                🧩
              </div>
              <h3 className="text-lg font-bold text-white">Where Core IT Fits</h3>
            </div>
            <p className="text-white/70 mb-4">
              <strong className="text-violet-300">Core IT</strong> is the baseline platform layer that underpins managed service delivery. 
              Some components are included by plan, and some are optional add-ons depending on your environment.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-violet-500/20 border border-violet-400/30 px-4 py-2 rounded-full text-sm text-violet-300 font-medium">
                Included in: <strong>Office / Business / Enterprise</strong>
              </span>
              <span className="bg-amber-500/20 border border-amber-400/30 px-4 py-2 rounded-full text-sm text-amber-300 font-medium">
                Essentials: <strong>limited baseline</strong>
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {sections.map((section) => (
              <div key={section.id} className="bg-[#1a1a2e] border border-violet-400/20 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-violet-500/10 transition-colors"
                  onClick={() => toggleSection(section.id)}
                  data-testid={`section-${section.id}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{section.icon}</span>
                    <h3 className="text-lg font-bold text-white">{section.title}</h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-violet-400 transition-transform ${expandedSections.has(section.id) ? 'rotate-180' : ''}`} />
                </button>
                
                {expandedSections.has(section.id) && (
                  <div className="border-t border-white/10">
                    {section.features.map((feature, idx) => (
                      <div key={feature.name} className={idx % 2 === 0 ? '' : 'bg-white/[0.02]'}>
                        <button
                          className="w-full flex items-center justify-between p-4 pl-14 text-left hover:bg-violet-500/10 transition-colors"
                          onClick={() => toggleFeature(feature.name)}
                          data-testid={`feature-${section.id}-${idx}`}
                        >
                          <div className="flex items-center gap-3">
                            <ChevronDown className={`w-4 h-4 text-violet-400 transition-transform ${expandedFeatures.has(feature.name) ? 'rotate-180' : ''}`} />
                            <span className="text-white font-medium">{feature.name}</span>
                            {feature.tags?.map(tag => (
                              <span
                                key={tag}
                                className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                                  tag === 'Included' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' :
                                  tag === 'Optional' ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30' :
                                  'bg-violet-500/20 text-violet-300 border border-violet-400/30'
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </button>
                        {expandedFeatures.has(feature.name) && (
                          <div className="bg-violet-500/10 border-l-4 border-violet-400 px-14 py-4">
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

          <div className="mt-8 bg-[#1e293b] border border-violet-400/20 border-l-4 border-l-violet-400 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xl">💡</span>
              <strong className="text-violet-300">Pro Tip</strong>
            </div>
            <p className="text-white/70">
              If a prospect asks "is this included?", route them to the pricing matrix on the Services page and keep detail pages consistent with it. 
              This page defines <em>what</em> we do; the Services page defines <em>what tier</em> includes it.
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
