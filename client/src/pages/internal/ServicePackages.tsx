import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ChevronDown, Target, Shield, Globe, Wrench, Database, Phone, Lock, BarChart3, Crosshair, CheckCircle } from "lucide-react";
import logoImage from "@assets/DE-Logo-new_1762461524794.webp";

interface FeatureGroup {
  title: string;
  items: string[];
}

interface ServicePackage {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  colorClass: string;
  gradientClass: string;
  featureGroups: FeatureGroup[];
  whyMatters: string;
}

const servicePackages: ServicePackage[] = [
  {
    id: "workplace",
    name: "DE Workplace",
    icon: "🎯",
    tagline: "Who gets access to what + what apps/devices they use",
    colorClass: "text-violet-400",
    gradientClass: "from-violet-500 to-purple-600",
    featureGroups: [
      {
        title: "Identity & Access Management",
        items: [
          "Cloud Directory — centralized user management across all systems",
          "Single Sign-On to 900+ business applications",
          "Multi-Factor Authentication — push, biometric, security keys",
          "Passwordless login with device authenticator",
          "Privileged Access Management — secure admin accounts",
          "Conditional Access — network and device-based restrictions"
        ]
      },
      {
        title: "Device Management",
        items: [
          "Cross-platform MDM (Windows, Mac, iOS, Android, Linux)",
          "Zero-touch device enrollment",
          "Policy enforcement & configuration management",
          "Software deployment & patch management",
          "Remote device commands (lock, wipe, restart)",
          "Disk encryption & USB protection"
        ]
      },
      {
        title: "Browser Security",
        items: [
          "Encrypted DNS (DoH) — secure DNS queries",
          "Web content filtering — block phishing/malware sites",
          "Upload/download controls — prevent data exfiltration",
          "Data masking — hide sensitive information (SSN, credit cards)",
          "Credential analysis — password strength & reuse detection",
          "SaaS discovery — application inventory & usage"
        ]
      },
      {
        title: "Collaboration Suite Administration",
        items: [
          "User provisioning & de-provisioning",
          "License management & optimization",
          "Shared drives & folder management",
          "Email routing & security policies",
          "HR-triggered onboarding automation",
          "Offboarding & secure account deactivation"
        ]
      }
    ],
    whyMatters: "One place to control who can access what, on which devices, from where. New hires are productive on day one. Departing employees lose access immediately."
  },
  {
    id: "cyber",
    name: "Cyber Security",
    icon: "🛡️",
    tagline: "Detect + respond + govern + prove",
    colorClass: "text-cyan-400",
    gradientClass: "from-cyan-500 to-blue-600",
    featureGroups: [
      {
        title: "Email Security",
        items: [
          "Secure Email Gateway — 100% anti-malware, 99% anti-spam",
          "Real-time URL and attachment scanning",
          "AI-powered BEC & phishing detection",
          "Impersonation fraud prevention",
          "Zero-day attack protection with sandbox analysis",
          "Data Leak Prevention (DLP) — content scanning",
          "Secure messaging & large file transfer (up to 2GB)"
        ]
      },
      {
        title: "Endpoint & Cloud Protection",
        items: [
          "Extended Detection & Response (XDR)",
          "24/7 Managed Detection & Response (MDR)",
          "Cloud security enforcement",
          "Insider threat detection",
          "Advanced threat hunting"
        ]
      },
      {
        title: "SOC Services",
        items: [
          "24/7 monitoring & threat detection",
          "Incident response & remediation",
          "Security policy management",
          "Compliance audit evidence collection",
          "Threat intelligence integration",
          "Forensic logging & investigation support"
        ]
      },
      {
        title: "Human Firewall",
        items: [
          "Security awareness training",
          "Simulated phishing campaigns",
          "Risk scoring per employee",
          "Targeted remediation training"
        ]
      }
    ],
    whyMatters: "Threats don't sleep. Neither does your security team. Real-time monitoring, instant response, and the documentation insurers and auditors require."
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    icon: "🌐",
    tagline: "The pipes and perimeter",
    colorClass: "text-emerald-400",
    gradientClass: "from-emerald-500 to-teal-600",
    featureGroups: [
      {
        title: "Zero-Trust Network Access",
        items: [
          "SASE/ZTNA — identity-aware access control",
          "SD-WAN optimization for distributed teams",
          "Site-to-site secure connectivity",
          "Cloud gateway for remote workers",
          "Network segmentation & isolation"
        ]
      },
      {
        title: "Network Management",
        items: [
          "Firewall management & monitoring",
          "Wi-Fi access points & configuration",
          "Switch management & VLAN setup",
          "Network monitoring & alerting",
          "ISP coordination & circuit management"
        ]
      },
      {
        title: "Physical Infrastructure",
        items: [
          "Structured cabling & rack management",
          "Power & UPS coordination",
          "Hardware lifecycle planning",
          "Legacy network integration & migration"
        ]
      }
    ],
    whyMatters: "Your network is the foundation. Zero-trust means every access request is verified — no more \"inside the firewall = trusted.\""
  },
  {
    id: "basic-it",
    name: "Basic IT",
    icon: "🔧",
    tagline: "Support labor & general IT operations",
    colorClass: "text-pink-400",
    gradientClass: "from-pink-500 to-rose-600",
    featureGroups: [
      {
        title: "Helpdesk & Support",
        items: [
          "Break/fix troubleshooting",
          "OS & application support",
          "Printer setup & maintenance",
          "Software installation & updates",
          "User training & guidance"
        ]
      },
      {
        title: "Proactive Maintenance",
        items: [
          "Automated patching & updates",
          "System health monitoring",
          "Performance optimization",
          "Vendor coordination for non-security tools"
        ]
      },
      {
        title: "Documentation & Planning",
        items: [
          "IT asset documentation",
          "Network diagrams & addressing",
          "Quarterly technology reviews",
          "Budget & lifecycle planning"
        ]
      }
    ],
    whyMatters: "When things break, you need fast resolution. When things work, you need them to keep working. That's what we do."
  },
  {
    id: "backup",
    name: "Backup & DR",
    icon: "💾",
    tagline: "Protection + recovery + continuity",
    colorClass: "text-amber-400",
    gradientClass: "from-amber-500 to-orange-600",
    featureGroups: [
      {
        title: "Data Protection",
        items: [
          "SaaS backup (Microsoft 365, Google Workspace)",
          "Workstation file-level backup",
          "Server image backup",
          "Cloud storage with immutable retention",
          "Encrypted backups in transit and at rest"
        ]
      },
      {
        title: "Business Continuity",
        items: [
          "Instant failover for critical systems",
          "Recovery time objectives (RTO) planning",
          "Recovery point objectives (RPO) management",
          "Quarterly DR validation & testing",
          "Insurance documentation & compliance evidence"
        ]
      }
    ],
    whyMatters: "Ransomware, hardware failure, human error — disasters happen. The question is whether you can recover in hours vs. weeks."
  },
  {
    id: "ucaas",
    name: "Voice & Communications",
    icon: "📞",
    tagline: "Unified communications platform",
    colorClass: "text-purple-400",
    gradientClass: "from-purple-500 to-indigo-600",
    featureGroups: [
      {
        title: "Business Phone System",
        items: [
          "Cloud-hosted PBX — no on-premise hardware",
          "Unlimited calling (US/Canada)",
          "Auto-attendant & call routing",
          "Voicemail-to-email transcription",
          "Mobile app for remote work",
          "Call recording & analytics"
        ]
      },
      {
        title: "Team Collaboration",
        items: [
          "Video conferencing with screen share",
          "Team messaging & presence",
          "Integration with Microsoft Teams (optional)",
          "Conference room solutions"
        ]
      }
    ],
    whyMatters: "One platform for all communications. Work from anywhere with the same professional phone system."
  }
];

const valuePropositions = [
  { icon: "🔒", title: "Security-First", description: "Every package is built with security as the foundation, not an afterthought." },
  { icon: "📊", title: "Clear Boundaries", description: "You know exactly what's included. No surprise bills, no scope creep." },
  { icon: "🎯", title: "Right-Sized", description: "From startups to enterprises, packages scale with your business." },
  { icon: "✅", title: "Compliance-Ready", description: "HIPAA, SOC 2, FTC Safeguards, PCI-DSS — documentation built in." }
];

const ownershipRules = [
  { title: "Workplace = Enablement + Lifecycle", description: "People, identity, apps, devices — getting users connected and provisioned", colorClass: "border-l-violet-500" },
  { title: "Basic IT = Day-to-Day Support", description: "Endpoints, fixes, helpdesk — keeping things running", colorClass: "border-l-pink-500" },
  { title: "Cyber Security = Protection + Response", description: "Monitoring, hardening, detections, compliance — securing the environment", colorClass: "border-l-cyan-500" },
  { title: "Infrastructure = Connectivity + Physical", description: "Networks, firewalls, cabling, hardware — the foundation layer", colorClass: "border-l-emerald-500" }
];

export default function ServicePackages() {
  const [expandedPackages, setExpandedPackages] = useState<Set<string>>(new Set(["workplace", "cyber"]));
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const togglePackage = (id: string) => {
    setExpandedPackages(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleGroup = (groupKey: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(groupKey)) {
        next.delete(groupKey);
      } else {
        next.add(groupKey);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a12]">
      <Helmet>
        <title>DE Service Packages — What's Included | Internal Reference | Digerati Experts</title>
        <meta name="description" content="Internal reference for service packages. Clear boundaries, comprehensive coverage — everything you need, nothing you don't." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 via-transparent to-purple-900/5" />
      </div>

      <header className="border-b border-white/10 bg-[#0a0a12]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/internal" className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors mb-8" data-testid="link-back">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sales Tools</span>
          </Link>
          <img src={logoImage} alt="Digerati Experts" className="h-8" />
        </div>
      </header>

      <section className="py-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-4" data-testid="heading-service-packages">
              DE Service Packages
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Clear boundaries, comprehensive coverage — everything you need, nothing you don't
            </p>
          </div>

          <div className="grid gap-6 mb-12">
            {servicePackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden transition-all hover:border-white/20"
                data-testid={`package-card-${pkg.id}`}
              >
                <div className={`h-1 bg-gradient-to-r ${pkg.gradientClass}`} />
                <button
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                  onClick={() => togglePackage(pkg.id)}
                  data-testid={`package-toggle-${pkg.id}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${pkg.gradientClass} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                      {pkg.icon}
                    </div>
                    <div>
                      <h2 className={`text-xl font-bold ${pkg.colorClass}`}>{pkg.name}</h2>
                      <p className="text-sm text-white/50 italic">"{pkg.tagline}"</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 ${pkg.colorClass} transition-transform ${expandedPackages.has(pkg.id) ? 'rotate-180' : ''}`} />
                </button>

                {expandedPackages.has(pkg.id) && (
                  <div className="px-6 pb-6 border-t border-white/10">
                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                      {pkg.featureGroups.map((group, groupIdx) => {
                        const groupKey = `${pkg.id}-${groupIdx}`;
                        const isExpanded = expandedGroups.has(groupKey);
                        return (
                          <div key={groupIdx} className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden">
                            <button
                              className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                              onClick={() => toggleGroup(groupKey)}
                              data-testid={`group-toggle-${pkg.id}-${groupIdx}`}
                            >
                              <h3 className={`font-semibold ${pkg.colorClass}`}>{group.title}</h3>
                              <ChevronDown className={`w-4 h-4 ${pkg.colorClass} transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>
                            {isExpanded && (
                              <div className="px-4 pb-4 border-t border-white/10">
                                <ul className="space-y-2 mt-3">
                                  {group.items.map((item, itemIdx) => (
                                    <li key={itemIdx} className="flex items-start gap-2 text-sm text-white/70">
                                      <span className={pkg.colorClass}>→</span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-6 bg-white/[0.03] border border-white/10 rounded-xl p-5">
                      <h4 className={`text-sm font-semibold ${pkg.colorClass} uppercase tracking-wider mb-2`}>Why This Matters</h4>
                      <p className="text-white/80 leading-relaxed">{pkg.whyMatters}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-400/30 rounded-2xl p-8 mb-10">
            <h2 className="text-2xl font-bold text-center text-white mb-8" data-testid="section-value-props">
              The DE Difference
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {valuePropositions.map((prop, idx) => (
                <div key={idx} className="bg-white/5 rounded-xl p-6 text-center" data-testid={`value-prop-${idx}`}>
                  <div className="text-4xl mb-4">{prop.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{prop.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{prop.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-center text-white mb-8" data-testid="section-ownership-rules">
              Clear Ownership, No Overlap
            </h2>
            <div className="space-y-4">
              {ownershipRules.map((rule, idx) => (
                <div
                  key={idx}
                  className={`bg-white/[0.03] border-l-4 ${rule.colorClass} rounded-r-xl p-5`}
                  data-testid={`ownership-rule-${idx}`}
                >
                  <strong className="block text-white text-lg mb-1">{rule.title}</strong>
                  <p className="text-white/60">{rule.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-violet-400/20 border-l-4 border-l-violet-400 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xl">💡</span>
              <strong className="text-violet-300">Sales Tip</strong>
            </div>
            <p className="text-white/70">
              When presenting packages, focus on <em>outcomes</em> not features. "You'll never lose access to critical data" 
              resonates more than "SaaS backup with immutable retention." Use the "Why This Matters" as your talking points.
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
