import { useState } from "react";
import { PageTemplate } from "@/components/PageTemplate";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import { GuidedSalesPitch } from "@/components/GuidedSalesPitch";
import {
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Server,
  Cloud,
  HardDrive,
  FileCheck,
  AlertTriangle,
  RefreshCw,
  ClipboardCheck,
  Users,
  Phone,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Star,
  Zap,
  Database,
  MonitorCheck,
  FileText,
  Target,
  Timer,
  Play,
  Settings,
  BarChart3
} from "lucide-react";

const bcdrSalesPitchData = {
  corePitch: [
    "Tested recovery—not just backups that sit untouched",
    "Documented RPO/RTO targets in your service agreement",
    "Ransomware recovery capability with immutable backups",
    "Annual or quarterly restore verification depending on tier",
    "Immutable backup copies that can't be encrypted by attackers"
  ],
  discoveryQuestions: [
    "When was the last time you actually tested a restore?",
    "What's the acceptable downtime for your critical systems?",
    "Do you have compliance requirements around data recovery?",
    "Who is your current backup vendor—and have you seen a restore report?",
    "How many critical systems would need to come back online first?"
  ],
  objections: [
    {
      objection: "Our backups are already handled",
      response: "Backups ≠ tested recovery. We verify restores regularly and provide proof that your data can actually come back."
    },
    {
      objection: "It's too expensive",
      response: "Compare it to the $1.53M average ransomware recovery cost. BCDR is the cheapest insurance you'll ever buy."
    },
    {
      objection: "We've never needed disaster recovery",
      response: "It's insurance—not if, but when. 60% of SMBs that lose data shut down within 6 months."
    }
  ],
  valueProof: [
    "Documented recovery time in writing",
    "Proof of restore capability with reports",
    "Compliance-ready audit reports",
    "Immutable backups immune to ransomware"
  ]
};

const bcdrData = {
  packages: [
    {
      sku: "bcdr_essentials",
      name: "BCDR Essentials",
      subtitle: "Backup",
      best_for: "Teams needing reliable backups + verified restore capability",
      rpo: "24 hours",
      rto: "24–72 hours",
      includes: [
        "Image-based server/VM backups",
        "Endpoint backup coverage",
        "Cloud data backup (email/files)",
        "Immutable backup copies",
        "Backup health monitoring",
        "Annual restore verification"
      ],
      test_cadence: "Annual",
      starting_price: "Starting at $350/mo",
      price_note: "per protected environment"
    },
    {
      sku: "bcdr_business",
      name: "BCDR Business",
      subtitle: "Backup + Rapid Restore",
      best_for: "Teams needing defined restore priority + regular testing",
      featured: true,
      rpo: "4–8 hours",
      rto: "4–24 hours",
      includes: [
        "Everything in Essentials",
        "Priority restore sequencing",
        "Quarterly restore testing",
        "DR runbook documentation",
        "RPO/RTO SLA commitments",
        "Restore test reports"
      ],
      test_cadence: "Quarterly",
      starting_price: "Starting at $750/mo",
      price_note: "per protected environment"
    },
    {
      sku: "bcdr_enterprise",
      name: "BCDR Enterprise",
      subtitle: "DR + Continuity",
      best_for: "Teams needing warm standby + documented DR program",
      rpo: "15 min–4 hours",
      rto: "1–4 hours",
      includes: [
        "Everything in Business",
        "Warm standby / cloud failover",
        "Tabletop DR exercises",
        "Monthly restore testing",
        "Priority escalation paths",
        "DR program management"
      ],
      test_cadence: "Monthly",
      starting_price: "Custom pricing",
      price_note: "based on continuity requirements"
    }
  ],
  features: [
    {
      title: "Guaranteed RPO/RTO Targets",
      description: "Committed recovery time and data-loss objectives documented in your agreement",
      deliverable: "RPO/RTO commitment document",
      included_in: ["business", "enterprise"],
      icon: Target
    },
    {
      title: "Image-Based Backups",
      description: "Full-system restore capability—not file-by-file recovery that takes days",
      deliverable: "Backup architecture diagram",
      included_in: ["essentials", "business", "enterprise"],
      icon: HardDrive
    },
    {
      title: "Scheduled Restore Tests",
      description: "Regular failover drills to confirm your systems can actually be restored",
      deliverable: "Restore test report",
      included_in: ["essentials", "business", "enterprise"],
      icon: RefreshCw
    },
    {
      title: "DR Runbooks & Exercises",
      description: "Documented recovery procedures with periodic team tabletop exercises",
      deliverable: "DR runbook + exercise log",
      included_in: ["business", "enterprise"],
      icon: ClipboardCheck
    },
    {
      title: "Priority Restore Paths",
      description: "Defined restore sequencing so critical systems come back first",
      deliverable: "Priority restore map",
      included_in: ["business", "enterprise"],
      icon: Zap
    },
    {
      title: "Warm Standby Options",
      description: "Cloud failover or secondary site for maximum availability",
      deliverable: "Failover runbook",
      included_in: ["enterprise"],
      icon: Cloud
    }
  ],
  deliverables: [
    { name: "BCDR policy + scope document", description: "What's protected and how" },
    { name: "RPO/RTO targets", description: "Agreed and documented recovery objectives" },
    { name: "Recovery runbook", description: "Step-by-step restore procedures" },
    { name: "Restore test schedule + reports", description: "Proof that recovery works" },
    { name: "Priority restore map", description: "Systems ranked 1→N for recovery order" },
    { name: "Warm standby plan", description: "If applicable, failover architecture" }
  ],
  protectedSystems: [
    { name: "Servers/VMs", icon: Server },
    { name: "Cloud Data", icon: Cloud },
    { name: "SaaS Apps", icon: Database },
    { name: "Endpoints", icon: MonitorCheck }
  ],
  faqs: [
    {
      question: "What's the difference between backup and disaster recovery?",
      answer: "Backup is having copies of your data. Disaster recovery is having a tested plan to restore your entire business within a defined timeframe. We provide both—verified backups plus documented, tested recovery procedures."
    },
    {
      question: "How often do you test restores?",
      answer: "Testing cadence depends on your tier: Essentials includes annual testing, Business includes quarterly testing, and Enterprise includes monthly testing. Every test generates a report documenting what was tested and the results."
    },
    {
      question: "What's RPO and RTO?",
      answer: "RPO (Recovery Point Objective) is how much data you can afford to lose—measured in time. RTO (Recovery Time Objective) is how quickly you need systems back online. We help you define realistic targets and build your BCDR program around them."
    },
    {
      question: "Do you provide warm standby / failover?",
      answer: "Yes, in our Enterprise tier. Warm standby means we maintain a ready-to-activate copy of your critical systems in the cloud. If your primary systems fail, we can failover within your agreed RTO—typically 1-4 hours."
    },
    {
      question: "What happens during a real disaster?",
      answer: "We follow your documented runbook: assess the situation, communicate with stakeholders, restore systems in priority order, verify functionality, and document the incident. You'll have clear contacts and escalation paths."
    },
    {
      question: "Is this just for ransomware?",
      answer: "No. BCDR protects against all business disruptions: ransomware, hardware failure, natural disasters, accidental deletion, and more. The $1.53M average ransomware recovery cost is just one example of why tested recovery matters."
    }
  ]
};

const testingSteps = [
  { step: 1, title: "Plan", description: "Schedule test, define scope, notify stakeholders", icon: FileText },
  { step: 2, title: "Test", description: "Execute restore to isolated environment, verify data integrity", icon: Play },
  { step: 3, title: "Report", description: "Document results, identify gaps, adjust procedures", icon: BarChart3 }
];

function FAQItem({ question, answer, isOpen, onToggle, index }: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onToggle: () => void; 
  index: number 
}) {
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
        aria-expanded={isOpen}
        data-testid={`faq-toggle-${index}`}
      >
        <span className="font-semibold text-white pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-violet-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-violet-400 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-5 pb-5 text-white/70 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

function RPOPickerComponent() {
  const [criticalSystems, setCriticalSystems] = useState<string>("1-5");
  const [targetRTO, setTargetRTO] = useState<string>("24h");
  const [targetRPO, setTargetRPO] = useState<string>("24h");
  const [warmStandby, setWarmStandby] = useState<boolean>(false);

  const getRecommendation = () => {
    if (warmStandby || targetRTO === "1h" || targetRPO === "15m") {
      return { tier: "Enterprise", notes: "Warm standby required for sub-4-hour RTO. High-frequency snapshots for 15-minute RPO." };
    }
    if (targetRTO === "4h" || targetRPO === "1h" || criticalSystems === "16+") {
      return { tier: "Business", notes: "Quarterly testing and priority restore paths recommended for complex environments." };
    }
    return { tier: "Essentials", notes: "Standard backup architecture with annual restore verification." };
  };

  const recommendation = getRecommendation();

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div>
          <label className="block text-white/60 text-sm mb-2">Critical Systems</label>
          <select
            value={criticalSystems}
            onChange={(e) => setCriticalSystems(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
            data-testid="picker-systems"
          >
            <option value="1-5">1–5 systems</option>
            <option value="6-15">6–15 systems</option>
            <option value="16+">16+ systems</option>
          </select>
        </div>
        
        <div>
          <label className="block text-white/60 text-sm mb-2">Target RTO</label>
          <select
            value={targetRTO}
            onChange={(e) => setTargetRTO(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
            data-testid="picker-rto"
          >
            <option value="72h">72 hours</option>
            <option value="24h">24 hours</option>
            <option value="4h">4 hours</option>
            <option value="1h">1 hour</option>
          </select>
        </div>
        
        <div>
          <label className="block text-white/60 text-sm mb-2">Target RPO</label>
          <select
            value={targetRPO}
            onChange={(e) => setTargetRPO(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
            data-testid="picker-rpo"
          >
            <option value="24h">24 hours</option>
            <option value="8h">8 hours</option>
            <option value="1h">1 hour</option>
            <option value="15m">15 minutes</option>
          </select>
        </div>
        
        <div>
          <label className="block text-white/60 text-sm mb-2">Warm Standby</label>
          <button
            onClick={() => setWarmStandby(!warmStandby)}
            className={`w-full px-4 py-3 rounded-lg border transition-colors ${
              warmStandby 
                ? 'bg-violet-600 border-violet-500 text-white' 
                : 'bg-white/5 border-white/20 text-white/60'
            }`}
            data-testid="picker-standby"
          >
            {warmStandby ? 'Yes, Required' : 'No, Not Needed'}
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 border border-violet-500/30 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-white/60 text-sm mb-1">Recommended tier based on your selections:</p>
            <p className="text-2xl font-bold text-white">BCDR {recommendation.tier}</p>
            <p className="text-white/60 text-sm mt-2">{recommendation.notes}</p>
          </div>
          <Button
            asChild
            className="bg-white text-violet-700 hover:bg-violet-50 font-semibold"
            data-testid="btn-picker-quote"
          >
            <a href="https://meet.digerati-experts.com/" target="_blank" rel="noopener noreferrer">
              Get Exact Scope + Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function BackupDisasterRecovery() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Backup & Disaster Recovery (BCDR) - Tested Recovery with Guaranteed Targets | Digerati Experts",
    description: "Recover in hours, not days. BCDR with documented RPO/RTO targets, scheduled restore testing, and DR runbooks. Your business comes back up on a timeline you define.",
    canonical: "/solutions/backup-disaster-recovery"
  });

  const fadeInUp = prefersReducedMotion ? {} : {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <PageTemplate 
      title="Backup & Disaster Recovery" 
      subtitle="Tested Recovery with Guaranteed Targets"
    >
      <div className="space-y-24">
        {/* Hero Section */}
        <motion.section {...fadeInUp} className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent rounded-3xl pointer-events-none" />
          <div className="relative bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-sm font-medium mb-6">
                <AlertTriangle className="w-4 h-4" />
                $1.53M average ransomware recovery cost (Sophos 2025)
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Recover in hours—
                <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-violet-300 bg-clip-text text-transparent">
                  not days
                </span>
              </h1>
              <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-3xl">
                BCDR isn't just "we have backups." It's documented RPO/RTO targets, scheduled restore testing, and runbooks your team can follow. Your business comes back up on a timeline you define.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-violet-700 hover:bg-violet-50 font-semibold shadow-lg"
                  data-testid="btn-hero-assessment"
                >
                  <a href="https://meet.digerati-experts.com/" target="_blank" rel="noopener noreferrer">
                    Schedule BCDR Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  data-testid="btn-hero-quote"
                >
                  <a href="#packages">
                    Get a BCDR Quote
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Target className="w-4 h-4 text-violet-400" />
                  <span>RPO/RTO in writing</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <RefreshCw className="w-4 h-4 text-violet-400" />
                  <span>Scheduled restore testing</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <ClipboardCheck className="w-4 h-4 text-violet-400" />
                  <span>DR runbooks + tabletop exercises</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Guided Sales Pitch */}
        <motion.section {...fadeInUp}>
          <GuidedSalesPitch data={bcdrSalesPitchData} />
        </motion.section>

        {/* What We Protect */}
        <motion.section {...fadeInUp}>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {bcdrData.protectedSystems.map((system, index) => (
              <div key={index} className="flex items-center gap-3 text-white/70">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <system.icon className="w-6 h-6 text-violet-400" />
                </div>
                <span className="font-medium">{system.name}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* BCDR in Plain English */}
        <motion.section {...fadeInUp}>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">BCDR in 30 Seconds</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mx-auto mb-4">
                  <HardDrive className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">Backup</h3>
                <p className="text-white/60 text-sm">Copies of your data, stored securely, with immutable protection against ransomware</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center mx-auto mb-4">
                  <Timer className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">Recovery Targets</h3>
                <p className="text-white/60 text-sm">Agreed RPO (data loss limit) and RTO (downtime limit) documented in your agreement</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center mx-auto mb-4">
                  <ClipboardCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">Tested Recovery</h3>
                <p className="text-white/60 text-sm">Regular restore tests with documented procedures—proven, not assumed</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* RPO/RTO Picker */}
        <motion.section {...fadeInUp} id="picker">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Find Your Recovery Targets</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Answer a few questions to get a recommended tier and implementation notes
            </p>
          </div>
          <RPOPickerComponent />
        </motion.section>

        {/* Key Features */}
        <motion.section {...fadeInUp}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Key BCDR Capabilities</h2>
            <p className="text-white/60">What you get with each tier</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bcdrData.features.map((feature, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-white/[0.03] border border-white/10 rounded-xl p-6 hover:bg-white/[0.05] transition-colors"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-white/60 text-sm">{feature.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-1 text-xs text-white/50">
                    <FileCheck className="w-3 h-3" />
                    {feature.deliverable}
                  </div>
                  <div className="flex gap-1">
                    {feature.included_in.map((tier) => (
                      <span 
                        key={tier} 
                        className={`text-xs px-2 py-0.5 rounded ${
                          tier === 'enterprise' ? 'bg-violet-600/30 text-violet-300' :
                          tier === 'business' ? 'bg-purple-600/30 text-purple-300' :
                          'bg-indigo-600/30 text-indigo-300'
                        }`}
                      >
                        {tier.charAt(0).toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* What You Get (Deliverables) */}
        <motion.section {...fadeInUp}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">What You Get</h2>
            <p className="text-white/60">Concrete deliverables, not vague promises</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bcdrData.deliverables.map((item, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 bg-white/[0.02] border border-white/10 rounded-xl p-5"
              >
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-white text-sm">{item.name}</h3>
                  <p className="text-white/50 text-xs">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Packages Section */}
        <motion.section {...fadeInUp} id="packages" className="scroll-mt-32" data-testid="section-packages">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">BCDR Packages</h2>
            <p className="text-white/60">Choose the protection level that fits your recovery requirements</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {bcdrData.packages.map((pkg, index) => (
              <motion.div
                key={pkg.sku}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl overflow-hidden ${
                  pkg.featured 
                    ? 'border-2 border-violet-500 bg-gradient-to-b from-violet-600/20 to-transparent' 
                    : 'border border-white/10 bg-white/[0.02]'
                }`}
              >
                {pkg.featured && (
                  <div className="absolute top-0 left-0 right-0 bg-violet-600 text-white text-center text-sm py-1 font-medium">
                    <Star className="w-4 h-4 inline mr-1" /> Most Popular
                  </div>
                )}
                <div className={`p-8 ${pkg.featured ? 'pt-12' : ''}`}>
                  <h3 className="text-2xl font-bold text-white">{pkg.name}</h3>
                  <p className="text-violet-300 text-sm mb-2">{pkg.subtitle}</p>
                  <p className="text-white/60 text-sm mb-6">{pkg.best_for}</p>
                  
                  <div className="flex gap-4 mb-6">
                    <div className="bg-white/5 rounded-lg px-3 py-2 text-center flex-1">
                      <p className="text-xs text-white/50 mb-1">RPO</p>
                      <p className="text-sm font-semibold text-white">{pkg.rpo}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg px-3 py-2 text-center flex-1">
                      <p className="text-xs text-white/50 mb-1">RTO</p>
                      <p className="text-sm font-semibold text-white">{pkg.rto}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {pkg.includes.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/80 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white/5 rounded-lg p-3 mb-6 text-center">
                    <p className="text-xs text-white/50">Test Cadence</p>
                    <p className="text-sm font-semibold text-violet-300">{pkg.test_cadence}</p>
                  </div>

                  <div className="mb-6 text-center">
                    <p className="text-2xl font-bold text-white">{pkg.starting_price}</p>
                    <p className="text-white/50 text-xs">{pkg.price_note}</p>
                  </div>

                  <Button
                    asChild
                    className={`w-full ${
                      pkg.featured 
                        ? 'bg-white text-violet-700 hover:bg-violet-50' 
                        : 'bg-violet-600 text-white hover:bg-violet-500'
                    }`}
                    data-testid={`btn-package-${pkg.sku}`}
                  >
                    <a href="https://meet.digerati-experts.com/" target="_blank" rel="noopener noreferrer">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <p className="text-center text-white/50 text-sm mt-6">
            Pricing depends on protected systems, retention period, and recovery targets. Final quote after assessment.
          </p>
        </motion.section>

        {/* How Testing Works */}
        <motion.section {...fadeInUp}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">How Testing Works</h2>
            <p className="text-white/60">Restore testing is how we prove your backups actually work</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testingSteps.map((step, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-8 text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                  <step.icon className="w-8 h-8 text-violet-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-white/60">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-white/20" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQs */}
        <motion.section {...fadeInUp}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-white/60">Common questions about BCDR</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-3">
            {bcdrData.faqs.map((faq, index) => (
              <FAQItem
                key={index}
                index={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === index}
                onToggle={() => setOpenFaq(openFaq === index ? null : index)}
              />
            ))}
          </div>
        </motion.section>

        {/* What Happens Next */}
        <motion.section {...fadeInUp}>
          <div className="bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent rounded-2xl border border-white/10 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">What Happens After You Book?</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">BCDR Assessment</h3>
                <p className="text-white/60 text-sm">We inventory your systems, current backup state, and recovery requirements</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">RPO/RTO Agreement</h3>
                <p className="text-white/60 text-sm">We define realistic recovery targets and document them in your agreement</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Implementation</h3>
                <p className="text-white/60 text-sm">We deploy backup agents, configure policies, and schedule your first restore test</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section {...fadeInUp}>
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 opacity-90" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] pointer-events-none" />
            <div className="relative py-16 px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Know You Can Recover?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Schedule a BCDR assessment. We'll scope your environment and provide a quote within 24 hours.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-violet-700 hover:bg-violet-50 font-semibold shadow-lg"
                  data-testid="btn-final-assessment"
                >
                  <a href="https://meet.digerati-experts.com/" target="_blank" rel="noopener noreferrer">
                    Schedule BCDR Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                  data-testid="btn-final-call"
                >
                  <a href="tel:325-480-9870">
                    <Phone className="mr-2 h-5 w-5" />
                    Call 325-480-9870
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </PageTemplate>
  );
}
