import { useState } from "react";
import { Link } from "wouter";
import { 
  ChevronDown, 
  ChevronRight, 
  Search, 
  Zap, 
  Users, 
  Target, 
  FileCheck, 
  Handshake, 
  Rocket, 
  Shield, 
  ArrowRight, 
  Clock, 
  FileText, 
  Video, 
  Building2,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Circle,
  ExternalLink,
  Sparkles,
  TrendingUp,
  Award,
  BarChart3,
  Home
} from "lucide-react";
import logoImage from "@assets/DE-Logo-new_1762461524794.webp";

interface ProcessStep {
  id: string;
  title: string;
  badge: string;
  description: string;
  bullets: string[];
  meetings: string;
  paperwork: string;
  meetingType: string;
  duration?: string;
  owner?: string;
  details?: string[];
  tools?: string[];
}

interface Department {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
}

const departments: Department[] = [
  { id: "sales", name: "Sales", icon: Target, color: "violet", description: "Revenue generation & client acquisition" },
  { id: "operations", name: "Operations", icon: Building2, color: "blue", description: "Service delivery & project management" },
  { id: "support", name: "Support", icon: Shield, color: "emerald", description: "Technical support & helpdesk" },
  { id: "security", name: "Security", icon: Shield, color: "amber", description: "Cybersecurity & compliance" },
  { id: "engineering", name: "Engineering", icon: Rocket, color: "cyan", description: "Infrastructure & development" },
];

const leadGenSteps: ProcessStep[] = [
  {
    id: "hot-inbound",
    title: "Hot Inbound Leads",
    badge: "Source 1",
    description: "High-intent prospects from marketing, referrals, and organic channels",
    bullets: [
      "Generated from marketing campaigns + referrals",
      "High intent (problem-aware / solution-ready)",
      "Routes directly to Qualification → FTA"
    ],
    meetings: "0-1",
    paperwork: "None",
    meetingType: "None",
    duration: "24-48 hrs",
    owner: "Sales Team",
    details: [
      "Web form submissions with urgent indicators",
      "Chat conversations with buying signals",
      "Partner and client referrals",
      "Direct phone inquiries"
    ],
    tools: ["Zoho CRM", "Zoho SalesIQ", "Seamless.AI"]
  },
  {
    id: "sdr-assisted",
    title: "SDR / Sales Assisted",
    badge: "Source 2",
    description: "Rep-assisted inbound qualification and scheduling support",
    bullets: [
      "Qualification + scheduling support",
      "Warm leads requiring nurturing",
      "Converts interest into commitment"
    ],
    meetings: "0-1",
    paperwork: "None",
    meetingType: "Virtual",
    duration: "1-3 days",
    owner: "SDR Team",
    details: [
      "Email sequences for engaged prospects",
      "Call follow-ups on marketing qualified leads",
      "LinkedIn outreach for warm connections"
    ],
    tools: ["Zoho CRM", "Zoho Campaigns", "LinkedIn Sales Navigator"]
  },
  {
    id: "outbound",
    title: "Outbound Prospecting",
    badge: "Source 3",
    description: "Proactive outreach to ideal customer profile targets",
    bullets: [
      "Cold outreach to ICP companies",
      "Account-based marketing campaigns",
      "Event and networking follow-ups"
    ],
    meetings: "1-2",
    paperwork: "Research Brief",
    meetingType: "Virtual/Phone",
    duration: "2-4 weeks",
    owner: "Business Development",
    details: [
      "Industry-specific targeting",
      "Multi-touch cadence campaigns",
      "Trade show and event leads"
    ],
    tools: ["Seamless.AI", "Zoho CRM", "Apollo.io"]
  }
];

// ProActive Ecosystem sales track
const proactiveTrackSteps: ProcessStep[] = [
  {
    id: "qualification",
    title: "Qualification",
    badge: "Stage 1",
    description: "Initial discovery to validate fit and urgency",
    bullets: [
      "BANT qualification (Budget, Authority, Need, Timeline)",
      "Pain point identification",
      "Decision-maker mapping"
    ],
    meetings: "1",
    paperwork: "Qualification Form",
    meetingType: "Virtual",
    duration: "15-30 min",
    owner: "SDR/AE",
    details: [
      "Confirm company size and industry fit",
      "Identify current IT provider and pain points",
      "Map decision-making process and stakeholders"
    ],
    tools: ["Zoho CRM", "Qualification Scorecard"]
  },
  {
    id: "fta",
    title: "First Touch Assessment",
    badge: "Stage 2",
    description: "Deep discovery with technical stakeholder engagement",
    bullets: [
      "Technical environment review",
      "Business requirements gathering",
      "Stakeholder alignment check"
    ],
    meetings: "1-2",
    paperwork: "FTA Questionnaire",
    meetingType: "In-Person/Virtual",
    duration: "45-60 min",
    owner: "Account Executive",
    details: [
      "Current infrastructure assessment",
      "Security posture evaluation",
      "Budget range and timeline confirmation"
    ],
    tools: ["FTA Deck", "Discovery Questionnaire", "Zoho CRM"]
  },
  {
    id: "proposal",
    title: "Proposal & Presentation",
    badge: "Stage 3",
    description: "Custom solution design and formal proposal delivery",
    bullets: [
      "Solution architecture design",
      "Pricing and ROI presentation",
      "Executive stakeholder review"
    ],
    meetings: "1-2",
    paperwork: "Proposal Document, SOW Draft",
    meetingType: "In-Person",
    duration: "60-90 min",
    owner: "Account Executive + vCIO",
    details: [
      "Tailored solution presentation",
      "Competitive differentiation",
      "Reference customer stories"
    ],
    tools: ["Proposal Template", "ROI Calculator", "Case Studies"]
  },
  {
    id: "negotiation",
    title: "Negotiation & Legal",
    badge: "Stage 4",
    description: "Terms refinement and contract finalization",
    bullets: [
      "Contract terms review",
      "SLA and scope alignment",
      "Legal and procurement coordination"
    ],
    meetings: "1-3",
    paperwork: "MSA, SLA, NDA",
    meetingType: "Virtual/In-Person",
    duration: "1-2 weeks",
    owner: "Account Executive + Legal",
    details: [
      "Redline and revision cycles",
      "Executive sponsor alignment",
      "Final pricing confirmation"
    ],
    tools: ["Zoho Sign", "Contract Templates", "Legal Review Checklist"]
  },
  {
    id: "closed-won",
    title: "Closed Won",
    badge: "Stage 5",
    description: "Contract execution and handoff to operations",
    bullets: [
      "Contract signature",
      "Onboarding kickoff scheduled",
      "Internal handoff to delivery team"
    ],
    meetings: "1",
    paperwork: "Signed Contract, Onboarding Packet",
    meetingType: "Virtual",
    duration: "1-2 days",
    owner: "Account Executive + Ops",
    details: [
      "Welcome call scheduling",
      "Technical onboarding prep",
      "CRM opportunity closure"
    ],
    tools: ["Zoho Sign", "Zoho Projects", "Onboarding Checklist"]
  }
];

// Cybersecurity Track sales steps
const cyberTrackSteps: ProcessStep[] = [
  {
    id: "cyber-discovery",
    title: "Security Discovery",
    badge: "Stage 1",
    description: "Initial security posture assessment and risk identification",
    bullets: [
      "Current security stack review",
      "Vulnerability exposure mapping",
      "Compliance requirement identification"
    ],
    meetings: "1-2",
    paperwork: "Security Questionnaire",
    meetingType: "Virtual",
    duration: "30-45 min",
    owner: "Security Consultant",
    details: [
      "Industry-specific compliance check (HIPAA, PCI, SOC2)",
      "Current endpoint protection evaluation",
      "Email security and phishing exposure"
    ],
    tools: ["Security Assessment Template", "Zoho CRM", "Coro Dashboard"]
  },
  {
    id: "cyber-assessment",
    title: "Technical Assessment",
    badge: "Stage 2",
    description: "Deep-dive security audit and vulnerability scanning",
    bullets: [
      "Network vulnerability scan",
      "Dark web exposure check",
      "Phishing simulation results review"
    ],
    meetings: "1-2",
    paperwork: "Security Audit Report",
    meetingType: "In-Person/Virtual",
    duration: "60-90 min",
    owner: "Security Engineer",
    details: [
      "External attack surface analysis",
      "Internal network segmentation review",
      "Identity and access management audit"
    ],
    tools: ["Coro Platform", "BlackPoint MDR", "Vulnerability Scanner"]
  },
  {
    id: "cyber-proposal",
    title: "Security Proposal",
    badge: "Stage 3",
    description: "Custom security stack recommendation and roadmap",
    bullets: [
      "Layered security architecture design",
      "Risk prioritization and mitigation plan",
      "Compliance roadmap presentation"
    ],
    meetings: "1-2",
    paperwork: "Security Proposal, Risk Matrix",
    meetingType: "In-Person",
    duration: "60-90 min",
    owner: "Security Consultant + vCISO",
    details: [
      "XDR/MDR solution recommendation",
      "Security awareness training plan",
      "Incident response procedure design"
    ],
    tools: ["Security Proposal Template", "Coro Quote", "Compliance Checklist"]
  },
  {
    id: "cyber-implementation",
    title: "Implementation Planning",
    badge: "Stage 4",
    description: "Deployment timeline and change management coordination",
    bullets: [
      "Phased rollout planning",
      "User communication strategy",
      "Minimal disruption scheduling"
    ],
    meetings: "2-3",
    paperwork: "Implementation Plan, Change Order",
    meetingType: "Virtual",
    duration: "1-2 weeks",
    owner: "Project Manager + Security Team",
    details: [
      "Agent deployment scheduling",
      "Policy configuration timeline",
      "Training session scheduling"
    ],
    tools: ["Zoho Projects", "Implementation Checklist", "Training Calendar"]
  },
  {
    id: "cyber-activation",
    title: "Go-Live & Monitoring",
    badge: "Stage 5",
    description: "Security stack activation and 24/7 monitoring handoff",
    bullets: [
      "Production deployment",
      "SOC handoff and escalation setup",
      "First 30-day review scheduling"
    ],
    meetings: "1-2",
    paperwork: "Activation Checklist, SOC Runbook",
    meetingType: "Virtual",
    duration: "1-2 days",
    owner: "Security Team + SOC",
    details: [
      "Endpoint agent verification",
      "Alert threshold tuning",
      "Executive security dashboard setup"
    ],
    tools: ["BlackPoint SOC", "Coro Dashboard", "Security Report Template"]
  }
];

export default function SalesProcessPage() {
  const [activeDepartment, setActiveDepartment] = useState("sales");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set(["hot-inbound"]));
  const [activeTrack, setActiveTrack] = useState<"proactive" | "cyber">("proactive");
  const [showLeadGen, setShowLeadGen] = useState(true);
  const [showTrack, setShowTrack] = useState(true);

  const toggleCard = (id: string) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredLeadSteps = leadGenSteps.filter(step => 
    searchQuery === "" || 
    step.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    step.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    step.bullets.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Use the appropriate track based on selection
  const currentTrackSteps = activeTrack === "proactive" ? proactiveTrackSteps : cyberTrackSteps;
  
  const filteredSalesSteps = currentTrackSteps.filter(step => 
    searchQuery === "" || 
    step.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    step.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    step.bullets.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const completedLeadSteps = 1;
  const completedSalesSteps = 0;
  const leadProgress = (completedLeadSteps / leadGenSteps.length) * 100;
  const salesProgress = (completedSalesSteps / currentTrackSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030228] via-[#0a0833] to-[#0f0d2e]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030228]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <img src={logoImage} alt="Digerati Experts" className="h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity" />
              </Link>
              <div className="h-6 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">Internal</span>
                <span className="text-white/60 text-sm">|</span>
                <span className="text-white font-medium">Sales Process</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm">
                <Home className="w-4 h-4" />
                Back to Site
              </Link>
              <Link href="/portal/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium transition-all text-sm">
                Portal
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/40 bg-violet-500/10 mb-4">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">DE Internal System</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-3">
            Sales Process <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Command Center</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Two tracks. Clear stages. Every meeting, document, and milestone mapped for decision-ready execution.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <div className="text-2xl font-black text-white">5</div>
                <div className="text-xs text-white/50 uppercase font-bold tracking-wider">Sales Stages</div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-2xl font-black text-white">3</div>
                <div className="text-xs text-white/50 uppercase font-bold tracking-wider">Lead Sources</div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Award className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-2xl font-black text-white">2</div>
                <div className="text-xs text-white/50 uppercase font-bold tracking-wider">Tracks</div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <div className="text-2xl font-black text-white">92%</div>
                <div className="text-xs text-white/50 uppercase font-bold tracking-wider">Win Rate</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search stages, meetings, paperwork, tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-white/10 bg-white/[0.04] text-white placeholder-white/40 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
              data-testid="input-search-process"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setShowLeadGen(!showLeadGen)}
              className={`px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                showLeadGen 
                  ? "bg-violet-500/20 border border-violet-500/50 text-violet-300" 
                  : "bg-white/[0.04] border border-white/10 text-white/50 hover:text-white/70"
              }`}
              data-testid="button-toggle-leadgen"
            >
              <span className={`w-2 h-2 rounded-full ${showLeadGen ? "bg-violet-400" : "bg-white/30"}`} />
              Lead Generation
            </button>
            <button
              onClick={() => setShowTrack(!showTrack)}
              className={`px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                showTrack 
                  ? "bg-violet-500/20 border border-violet-500/50 text-violet-300" 
                  : "bg-white/[0.04] border border-white/10 text-white/50 hover:text-white/70"
              }`}
              data-testid="button-toggle-track"
            >
              <span className={`w-2 h-2 rounded-full ${showTrack ? "bg-violet-400" : "bg-white/30"}`} />
              Sales Track
            </button>
          </div>
        </div>

        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setActiveTrack("proactive")}
            className={`px-6 py-3.5 rounded-2xl font-bold text-sm transition-all ${
              activeTrack === "proactive"
                ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25"
                : "bg-white/[0.04] border border-white/10 text-white/60 hover:text-white hover:bg-white/[0.08]"
            }`}
            data-testid="tab-proactive"
          >
            ProActive Ecosystem
          </button>
          <button
            onClick={() => setActiveTrack("cyber")}
            className={`px-6 py-3.5 rounded-2xl font-bold text-sm transition-all ${
              activeTrack === "cyber"
                ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25"
                : "bg-white/[0.04] border border-white/10 text-white/60 hover:text-white hover:bg-white/[0.08]"
            }`}
            data-testid="tab-cyber"
          >
            Cybersecurity Track
          </button>
        </div>

        {showLeadGen && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-1">Phase 1</div>
                <h2 className="text-2xl font-black text-white">Lead Generation</h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-white/50">
                  <span className="text-violet-400 font-bold">{completedLeadSteps}</span> / {leadGenSteps.length} sources
                </div>
                <div className="w-32 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${leadProgress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLeadSteps.map((step, idx) => (
                <div
                  key={step.id}
                  className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden ${
                    expandedCards.has(step.id)
                      ? "border-violet-500/50 bg-gradient-to-b from-violet-500/10 to-transparent shadow-xl shadow-violet-500/10"
                      : "border-white/10 bg-white/[0.04] hover:border-violet-500/30 hover:bg-white/[0.06]"
                  }`}
                  data-testid={`card-lead-${step.id}`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/30 to-purple-500/30 border border-violet-500/30 flex items-center justify-center">
                          <span className="text-violet-300 font-black text-sm">{idx + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-lg">{step.title}</h3>
                          <span className="text-xs text-violet-400 font-bold uppercase tracking-wider">{step.badge}</span>
                        </div>
                      </div>
                      {idx === 0 && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      )}
                    </div>

                    <p className="text-white/60 text-sm mb-4 leading-relaxed">{step.description}</p>

                    <ul className="space-y-2 mb-4">
                      {step.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                          <ChevronRight className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="p-3 rounded-xl bg-black/20 border border-white/5">
                        <div className="text-xs text-white/40 mb-1">Meetings</div>
                        <div className="text-sm font-bold text-white">{step.meetings}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-black/20 border border-white/5">
                        <div className="text-xs text-white/40 mb-1">Duration</div>
                        <div className="text-sm font-bold text-white">{step.duration || "—"}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-black/20 border border-white/5">
                        <div className="text-xs text-white/40 mb-1">Type</div>
                        <div className="text-sm font-bold text-white">{step.meetingType}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleCard(step.id)}
                      className="w-full py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white/70 font-bold text-sm hover:bg-white/[0.08] hover:text-white transition-all flex items-center justify-center gap-2"
                      data-testid={`button-toggle-${step.id}`}
                    >
                      {expandedCards.has(step.id) ? "Hide Details" : "View Details"}
                      <ChevronDown className={`w-4 h-4 transition-transform ${expandedCards.has(step.id) ? "rotate-180" : ""}`} />
                    </button>

                    {expandedCards.has(step.id) && (
                      <div className="mt-4 pt-4 border-t border-white/10 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                        {step.details && (
                          <div>
                            <div className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-2">Details</div>
                            <ul className="space-y-1.5">
                              {step.details.map((detail, i) => (
                                <li key={i} className="text-sm text-white/60 flex items-start gap-2">
                                  <Circle className="w-1.5 h-1.5 text-violet-400 mt-2 flex-shrink-0" />
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {step.tools && (
                          <div>
                            <div className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-2">Tools</div>
                            <div className="flex flex-wrap gap-2">
                              {step.tools.map((tool, i) => (
                                <span key={i} className="px-3 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium">
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {step.owner && (
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="w-4 h-4 text-white/40" />
                            <span className="text-white/40">Owner:</span>
                            <span className="text-white font-medium">{step.owner}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {showTrack && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Phase 2</div>
                <h2 className="text-2xl font-black text-white">Sales Track</h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-white/50">
                  <span className="text-emerald-400 font-bold">{completedSalesSteps}</span> / {currentTrackSteps.length} stages
                </div>
                <div className="w-32 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500"
                    style={{ width: `${salesProgress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500/50 via-violet-500/50 to-purple-500/50 hidden lg:block" />
              
              <div className="space-y-6">
                {filteredSalesSteps.map((step, idx) => (
                  <div
                    key={step.id}
                    className={`relative lg:ml-16 rounded-2xl border transition-all duration-300 overflow-hidden ${
                      expandedCards.has(step.id)
                        ? "border-violet-500/50 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/5 shadow-xl shadow-violet-500/10"
                        : "border-white/10 bg-white/[0.04] hover:border-violet-500/30 hover:bg-white/[0.06]"
                    }`}
                    data-testid={`card-sales-${step.id}`}
                  >
                    <div className="absolute -left-16 top-6 w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 border-4 border-[#0a0833] flex items-center justify-center hidden lg:flex">
                      <span className="text-white font-black text-sm">{idx + 1}</span>
                    </div>

                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 border border-emerald-500/30 flex items-center justify-center lg:hidden">
                            <span className="text-emerald-300 font-black text-sm">{idx + 1}</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-xl">{step.title}</h3>
                            <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">{step.badge}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-white/60 text-xs font-bold flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {step.duration}
                          </span>
                          <span className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-white/60 text-xs font-bold flex items-center gap-1.5">
                            <Video className="w-3.5 h-3.5" />
                            {step.meetingType}
                          </span>
                        </div>
                      </div>

                      <p className="text-white/60 text-sm mb-4 leading-relaxed">{step.description}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-black/20 border border-white/5">
                          <Calendar className="w-5 h-5 text-violet-400 mt-0.5" />
                          <div>
                            <div className="text-xs text-white/40">Meetings</div>
                            <div className="text-sm font-bold text-white">{step.meetings}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-black/20 border border-white/5">
                          <FileText className="w-5 h-5 text-amber-400 mt-0.5" />
                          <div>
                            <div className="text-xs text-white/40">Paperwork</div>
                            <div className="text-sm font-bold text-white">{step.paperwork}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-black/20 border border-white/5">
                          <Users className="w-5 h-5 text-cyan-400 mt-0.5" />
                          <div>
                            <div className="text-xs text-white/40">Owner</div>
                            <div className="text-sm font-bold text-white">{step.owner}</div>
                          </div>
                        </div>
                      </div>

                      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                        {step.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                            {bullet}
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => toggleCard(step.id)}
                        className="w-full py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white/70 font-bold text-sm hover:bg-white/[0.08] hover:text-white transition-all flex items-center justify-center gap-2"
                        data-testid={`button-toggle-${step.id}`}
                      >
                        {expandedCards.has(step.id) ? "Hide Details" : "Expand Details"}
                        <ChevronDown className={`w-4 h-4 transition-transform ${expandedCards.has(step.id) ? "rotate-180" : ""}`} />
                      </button>

                      {expandedCards.has(step.id) && (
                        <div className="mt-4 pt-4 border-t border-white/10 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                          {step.details && (
                            <div>
                              <div className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-2">Key Activities</div>
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {step.details.map((detail, i) => (
                                  <li key={i} className="text-sm text-white/60 flex items-start gap-2">
                                    <ArrowRight className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {step.tools && (
                            <div>
                              <div className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-2">Tools & Templates</div>
                              <div className="flex flex-wrap gap-2">
                                {step.tools.map((tool, i) => (
                                  <span key={i} className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium flex items-center gap-1.5">
                                    <FileCheck className="w-3.5 h-3.5" />
                                    {tool}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="mt-16 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-white mb-2">Department Processes</h2>
            <p className="text-white/50">Quick access to each department's operational playbooks</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {departments.map((dept) => {
              const Icon = dept.icon;
              return (
                <button
                  key={dept.id}
                  onClick={() => setActiveDepartment(dept.id)}
                  className={`group p-5 rounded-2xl border transition-all duration-300 text-left ${
                    activeDepartment === dept.id
                      ? "border-violet-500/50 bg-gradient-to-br from-violet-500/15 to-purple-500/10 shadow-lg shadow-violet-500/10"
                      : "border-white/10 bg-white/[0.04] hover:border-violet-500/30 hover:bg-white/[0.06]"
                  }`}
                  data-testid={`dept-${dept.id}`}
                >
                  <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center transition-all ${
                    activeDepartment === dept.id
                      ? "bg-violet-500/30"
                      : "bg-white/10 group-hover:bg-violet-500/20"
                  }`}>
                    <Icon className={`w-5 h-5 transition-colors ${
                      activeDepartment === dept.id ? "text-violet-300" : "text-white/60 group-hover:text-violet-400"
                    }`} />
                  </div>
                  <div className="font-bold text-white mb-1">{dept.name}</div>
                  <div className="text-xs text-white/40 leading-relaxed">{dept.description}</div>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <footer className="border-t border-white/10 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-white/40">
              Digerati Experts Internal · Sales Process v2.0 · Last updated January 2026
            </div>
            <div className="flex items-center gap-4 text-sm text-white/40">
              <span>Questions? Contact</span>
              <a href="mailto:sales@digeratiexperts.com" className="text-violet-400 hover:text-violet-300 transition-colors">
                sales@digeratiexperts.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
