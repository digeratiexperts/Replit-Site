import { useState } from "react";
import { Link } from "wouter";
import { 
  ChevronDown, 
  Search, 
  Users, 
  Target, 
  Clock, 
  FileText, 
  CheckCircle2,
  ExternalLink,
  Home,
  Briefcase,
  Shield,
  FolderOpen
} from "lucide-react";
import logoImage from "@assets/DE-Logo-new_1762461524794.webp";

interface ProcessStep {
  id: string;
  title: string;
  stage: number;
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

const leadGenSteps: ProcessStep[] = [
  {
    id: "hot-inbound",
    title: "Hot Inbound Leads",
    stage: 1,
    description: "High-intent prospects from marketing, referrals, and organic channels",
    bullets: [
      "Generated from marketing campaigns and referrals",
      "High intent — problem-aware and solution-ready",
      "Routes directly to Qualification"
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
    stage: 2,
    description: "Rep-assisted inbound qualification and scheduling support",
    bullets: [
      "Qualification and scheduling support",
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
    stage: 3,
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

const proactiveTrackSteps: ProcessStep[] = [
  {
    id: "qualification",
    title: "Qualification",
    stage: 1,
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
    stage: 2,
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
    stage: 3,
    description: "Tailored solution presentation with pricing",
    bullets: [
      "Custom solution design",
      "ROI and value demonstration",
      "Stakeholder presentation"
    ],
    meetings: "1-2",
    paperwork: "Proposal, SOW Draft",
    meetingType: "In-Person",
    duration: "60-90 min",
    owner: "Account Executive + SE",
    details: [
      "Solution architecture walkthrough",
      "Pricing and terms presentation",
      "Reference customer stories"
    ],
    tools: ["Proposal Template", "ROI Calculator", "Case Studies"]
  },
  {
    id: "negotiation",
    title: "Negotiation & Legal",
    stage: 4,
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
    stage: 5,
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

const cyberTrackSteps: ProcessStep[] = [
  {
    id: "cyber-discovery",
    title: "Security Discovery",
    stage: 1,
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
    stage: 2,
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
    stage: 3,
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
    stage: 4,
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
    stage: 5,
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
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
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

  const currentTrackSteps = activeTrack === "proactive" ? proactiveTrackSteps : cyberTrackSteps;
  
  const filteredSalesSteps = currentTrackSteps.filter(step => 
    searchQuery === "" || 
    step.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    step.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    step.bullets.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#0a0a12]">
      {/* Simple header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0a0a12]/95 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-4">
              <Link href="/">
                <img src={logoImage} alt="Digerati Experts" className="h-7 w-auto cursor-pointer opacity-90 hover:opacity-100 transition-opacity" />
              </Link>
              <span className="text-white/30">|</span>
              <span className="text-white/60 text-sm font-medium">Sales Process</span>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/internal" className="px-3 py-1.5 text-white/50 hover:text-white/80 text-sm transition-colors flex items-center gap-1">
                <FolderOpen className="w-4 h-4" />
                <span className="hidden sm:inline">All Tools</span>
              </Link>
              <Link href="/" className="px-3 py-1.5 text-white/50 hover:text-white/80 text-sm transition-colors">
                <Home className="w-4 h-4" />
              </Link>
              <Link href="/portal/dashboard" className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-violet-600/80 hover:bg-violet-600 text-white text-sm transition-colors">
                Portal
                <ExternalLink className="w-3 h-3 opacity-70" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
        {/* Page title - clean and simple */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-white tracking-tight mb-2">
            Sales Process
          </h1>
          <p className="text-white/50 text-base leading-relaxed max-w-xl">
            Two tracks with clear stages. Every meeting, document, and milestone mapped for consistent execution.
          </p>
        </div>

        {/* Simple search and filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search stages, tools, paperwork..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-white placeholder-white/30 text-sm focus:outline-none focus:border-violet-500/40 transition-colors"
              data-testid="input-search-process"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowLeadGen(!showLeadGen)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                showLeadGen 
                  ? "bg-violet-500/15 text-violet-300 border border-violet-500/30" 
                  : "bg-white/[0.03] text-white/40 border border-white/[0.08] hover:text-white/60"
              }`}
              data-testid="button-toggle-leadgen"
            >
              Lead Gen
            </button>
            <button
              onClick={() => setShowTrack(!showTrack)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                showTrack 
                  ? "bg-violet-500/15 text-violet-300 border border-violet-500/30" 
                  : "bg-white/[0.03] text-white/40 border border-white/[0.08] hover:text-white/60"
              }`}
              data-testid="button-toggle-track"
            >
              Sales Track
            </button>
          </div>
        </div>

        {/* Track selector - subtle tabs */}
        <div className="flex gap-1 p-1 rounded-lg bg-white/[0.03] border border-white/[0.06] w-fit mb-10">
          <button
            onClick={() => setActiveTrack("proactive")}
            className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
              activeTrack === "proactive"
                ? "bg-violet-600 text-white"
                : "text-white/50 hover:text-white/70"
            }`}
            data-testid="tab-proactive"
          >
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              ProActive Ecosystem
            </div>
          </button>
          <button
            onClick={() => setActiveTrack("cyber")}
            className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
              activeTrack === "cyber"
                ? "bg-violet-600 text-white"
                : "text-white/50 hover:text-white/70"
            }`}
            data-testid="tab-cyber"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Cybersecurity Track
            </div>
          </button>
        </div>

        {/* Lead Generation Section */}
        {showLeadGen && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-5 h-5 text-violet-400" />
              <h2 className="text-lg font-semibold text-white">Lead Generation</h2>
              <span className="text-white/30 text-sm">3 sources</span>
            </div>

            <div className="space-y-3">
              {filteredLeadSteps.map((step) => (
                <div
                  key={step.id}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
                  data-testid={`card-lead-${step.id}`}
                >
                  <button
                    onClick={() => toggleCard(step.id)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                    data-testid={`button-toggle-${step.id}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                        <span className="text-violet-400 text-sm font-semibold">{step.stage}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{step.title}</h3>
                        <p className="text-white/40 text-sm mt-0.5">{step.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex items-center gap-4 text-sm text-white/40">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {step.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" />
                          {step.owner}
                        </span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-white/30 transition-transform ${expandedCards.has(step.id) ? "rotate-180" : ""}`} />
                    </div>
                  </button>

                  {expandedCards.has(step.id) && (
                    <div className="px-5 pb-5 pt-2 border-t border-white/[0.04]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-xs font-medium text-white/40 uppercase tracking-wide mb-3">Key Activities</h4>
                          <ul className="space-y-2">
                            {step.bullets.map((bullet, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-white/60 leading-relaxed">
                                <CheckCircle2 className="w-4 h-4 text-violet-400/60 mt-0.5 flex-shrink-0" />
                                {bullet}
                              </li>
                            ))}
                          </ul>
                          
                          {step.details && (
                            <div className="mt-5">
                              <h4 className="text-xs font-medium text-white/40 uppercase tracking-wide mb-3">Details</h4>
                              <ul className="space-y-1.5">
                                {step.details.map((detail, i) => (
                                  <li key={i} className="text-sm text-white/50 leading-relaxed">
                                    • {detail}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <div className="grid grid-cols-2 gap-3 mb-5">
                            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                              <div className="text-xs text-white/40 mb-1">Meetings</div>
                              <div className="text-sm font-medium text-white">{step.meetings}</div>
                            </div>
                            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                              <div className="text-xs text-white/40 mb-1">Meeting Type</div>
                              <div className="text-sm font-medium text-white">{step.meetingType}</div>
                            </div>
                            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                              <div className="text-xs text-white/40 mb-1">Paperwork</div>
                              <div className="text-sm font-medium text-white">{step.paperwork}</div>
                            </div>
                            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                              <div className="text-xs text-white/40 mb-1">Duration</div>
                              <div className="text-sm font-medium text-white">{step.duration}</div>
                            </div>
                          </div>

                          {step.tools && (
                            <div>
                              <h4 className="text-xs font-medium text-white/40 uppercase tracking-wide mb-3">Tools</h4>
                              <div className="flex flex-wrap gap-2">
                                {step.tools.map((tool, i) => (
                                  <span key={i} className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-white/60 text-xs">
                                    {tool}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Sales Track Section */}
        {showTrack && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-5 h-5 text-violet-400" />
              <h2 className="text-lg font-semibold text-white">
                {activeTrack === "proactive" ? "ProActive Sales Track" : "Cybersecurity Sales Track"}
              </h2>
              <span className="text-white/30 text-sm">{currentTrackSteps.length} stages</span>
            </div>

            <div className="space-y-3">
              {filteredSalesSteps.map((step) => (
                <div
                  key={step.id}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
                  data-testid={`card-sales-${step.id}`}
                >
                  <button
                    onClick={() => toggleCard(step.id)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                    data-testid={`button-toggle-${step.id}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                        <span className="text-violet-400 text-sm font-semibold">{step.stage}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{step.title}</h3>
                        <p className="text-white/40 text-sm mt-0.5">{step.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex items-center gap-4 text-sm text-white/40">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {step.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" />
                          {step.owner}
                        </span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-white/30 transition-transform ${expandedCards.has(step.id) ? "rotate-180" : ""}`} />
                    </div>
                  </button>

                  {expandedCards.has(step.id) && (
                    <div className="px-5 pb-5 pt-2 border-t border-white/[0.04]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-xs font-medium text-white/40 uppercase tracking-wide mb-3">Key Activities</h4>
                          <ul className="space-y-2">
                            {step.bullets.map((bullet, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-white/60 leading-relaxed">
                                <CheckCircle2 className="w-4 h-4 text-violet-400/60 mt-0.5 flex-shrink-0" />
                                {bullet}
                              </li>
                            ))}
                          </ul>
                          
                          {step.details && (
                            <div className="mt-5">
                              <h4 className="text-xs font-medium text-white/40 uppercase tracking-wide mb-3">Details</h4>
                              <ul className="space-y-1.5">
                                {step.details.map((detail, i) => (
                                  <li key={i} className="text-sm text-white/50 leading-relaxed">
                                    • {detail}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <div className="grid grid-cols-2 gap-3 mb-5">
                            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                              <div className="text-xs text-white/40 mb-1">Meetings</div>
                              <div className="text-sm font-medium text-white">{step.meetings}</div>
                            </div>
                            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                              <div className="text-xs text-white/40 mb-1">Meeting Type</div>
                              <div className="text-sm font-medium text-white">{step.meetingType}</div>
                            </div>
                            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                              <div className="text-xs text-white/40 mb-1">Paperwork</div>
                              <div className="text-sm font-medium text-white">{step.paperwork}</div>
                            </div>
                            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                              <div className="text-xs text-white/40 mb-1">Duration</div>
                              <div className="text-sm font-medium text-white">{step.duration}</div>
                            </div>
                          </div>

                          {step.tools && (
                            <div>
                              <h4 className="text-xs font-medium text-white/40 uppercase tracking-wide mb-3">Tools</h4>
                              <div className="flex flex-wrap gap-2">
                                {step.tools.map((tool, i) => (
                                  <span key={i} className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-white/60 text-xs">
                                    {tool}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Reference Materials Section */}
        <section className="mt-16 pt-12 border-t border-white/[0.08]">
          <div className="flex items-center gap-3 mb-8">
            <FolderOpen className="w-6 h-6 text-violet-400" />
            <h2 className="text-xl font-semibold text-white">Reference Materials</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/internal/workplace-matrix" className="block p-4 bg-white/[0.02] border border-white/[0.06] rounded-lg hover:bg-white/[0.04] hover:border-violet-400/30 transition-all" data-testid="link-workplace-matrix">
              <div className="text-violet-400 font-semibold mb-1">Workplace Matrix</div>
              <div className="text-white/50 text-sm">Modern Digital Workplace framework</div>
            </Link>
            <Link href="/internal/core-it" className="block p-4 bg-white/[0.02] border border-white/[0.06] rounded-lg hover:bg-white/[0.04] hover:border-violet-400/30 transition-all" data-testid="link-core-it">
              <div className="text-violet-400 font-semibold mb-1">Core IT</div>
              <div className="text-white/50 text-sm">Essential IT systems overview</div>
            </Link>
            <Link href="/internal/security-stack" className="block p-4 bg-white/[0.02] border border-white/[0.06] rounded-lg hover:bg-white/[0.04] hover:border-violet-400/30 transition-all" data-testid="link-security-stack">
              <div className="text-violet-400 font-semibold mb-1">Security Stack</div>
              <div className="text-white/50 text-sm">Defense-in-depth approach</div>
            </Link>
            <Link href="/internal/pricing-tiers" className="block p-4 bg-white/[0.02] border border-white/[0.06] rounded-lg hover:bg-white/[0.04] hover:border-violet-400/30 transition-all" data-testid="link-pricing-tiers">
              <div className="text-violet-400 font-semibold mb-1">Pricing Tiers</div>
              <div className="text-white/50 text-sm">ProActive Ecosystem pricing</div>
            </Link>
            <Link href="/internal/service-packages" className="block p-4 bg-white/[0.02] border border-white/[0.06] rounded-lg hover:bg-white/[0.04] hover:border-violet-400/30 transition-all" data-testid="link-service-packages">
              <div className="text-violet-400 font-semibold mb-1">Service Packages</div>
              <div className="text-white/50 text-sm">Add-on packages breakdown</div>
            </Link>
            <Link href="/internal/vcio" className="block p-4 bg-white/[0.02] border border-white/[0.06] rounded-lg hover:bg-white/[0.04] hover:border-violet-400/30 transition-all" data-testid="link-vcio">
              <div className="text-violet-400 font-semibold mb-1">vCIO Services</div>
              <div className="text-white/50 text-sm">Strategic IT leadership offerings</div>
            </Link>
            <Link href="/internal/six-reasons" className="block p-4 bg-white/[0.02] border border-white/[0.06] rounded-lg hover:bg-white/[0.04] hover:border-violet-400/30 transition-all" data-testid="link-six-reasons">
              <div className="text-violet-400 font-semibold mb-1">6 Reasons</div>
              <div className="text-white/50 text-sm">Why choose Digerati Experts</div>
            </Link>
            <Link href="/internal/buyers-guide" className="block p-4 bg-white/[0.02] border border-white/[0.06] rounded-lg hover:bg-white/[0.04] hover:border-violet-400/30 transition-all" data-testid="link-buyers-guide">
              <div className="text-violet-400 font-semibold mb-1">21 Questions Buyer's Guide</div>
              <div className="text-white/50 text-sm">IT services evaluation questions</div>
            </Link>
            <Link href="/internal/cover-letter" className="block p-4 bg-white/[0.02] border border-white/[0.06] rounded-lg hover:bg-white/[0.04] hover:border-violet-400/30 transition-all" data-testid="link-cover-letter">
              <div className="text-violet-400 font-semibold mb-1">Pre-Meeting Cover Letter</div>
              <div className="text-white/50 text-sm">Shock & Awe introduction</div>
            </Link>
            <Link href="/internal/audio-business-card" className="block p-4 bg-white/[0.02] border border-white/[0.06] rounded-lg hover:bg-white/[0.04] hover:border-violet-400/30 transition-all" data-testid="link-audio-business-card">
              <div className="text-violet-400 font-semibold mb-1">Audio Business Card</div>
              <div className="text-white/50 text-sm">Interview script for audio content</div>
            </Link>
          </div>
        </section>

        {/* Simple footer */}
        <footer className="mt-16 pt-8 border-t border-white/[0.04]">
          <p className="text-white/30 text-sm text-center">
            Internal use only — Digerati Experts Sales Operations
          </p>
        </footer>
      </main>
    </div>
  );
}
