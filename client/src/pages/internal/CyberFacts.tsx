import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "../sections/DigeratiEnhancedFooterSection";
import { Button } from "@/components/ui/button";
import { 
  Shield, AlertTriangle, Users, DollarSign, Clock, 
  ExternalLink, Copy, Check, RefreshCw, Sparkles,
  Filter, ChevronDown, Lock, Server, Mail, Brain, ArrowLeft
} from "lucide-react";
import { FloatingParticles } from "@/components/graphics";
import { useSEO } from "@/hooks/useSEO";
import { useToast } from "@/hooks/use-toast";

type FactCategory = "ransomware" | "identity" | "human" | "recovery" | "financial" | "ai";
type AccentColor = "violet" | "purple" | "fuchsia";

interface CyberFact {
  id: string;
  stat: string;
  label: string;
  text: string;
  source: string;
  sourceUrl: string;
  category: FactCategory;
  accent: AccentColor;
}

const categoryInfo: Record<FactCategory, { icon: React.ReactNode; label: string; color: string }> = {
  ransomware: { icon: <Lock className="w-4 h-4" />, label: "Ransomware", color: "violet" },
  identity: { icon: <Shield className="w-4 h-4" />, label: "Identity & Access", color: "purple" },
  human: { icon: <Users className="w-4 h-4" />, label: "Human Element", color: "fuchsia" },
  recovery: { icon: <Clock className="w-4 h-4" />, label: "Recovery", color: "purple" },
  financial: { icon: <DollarSign className="w-4 h-4" />, label: "Financial Impact", color: "violet" },
  ai: { icon: <Brain className="w-4 h-4" />, label: "AI & Emerging", color: "fuchsia" },
};

const allFacts: CyberFact[] = [
  {
    id: "mfa-gap",
    stat: "99.9%+",
    label: "MFA Gap",
    text: "of compromised accounts didn't have MFA enabled.",
    source: "Microsoft (Jan 2025)",
    sourceUrl: "https://learn.microsoft.com/en-us/partner-center/security/security-at-your-organization",
    category: "identity",
    accent: "violet"
  },
  {
    id: "ransomware-recovery",
    stat: "$1.53M",
    label: "Ransomware Recovery",
    text: "average cost to recover from ransomware (excluding ransom).",
    source: "Sophos State of Ransomware 2025",
    sourceUrl: "https://greymatter.com/wp-content/uploads/2025/06/sophos-state-of-ransomware-2025.pdf",
    category: "financial",
    accent: "purple"
  },
  {
    id: "smb-ransomware",
    stat: "88%",
    label: "Ransomware (SMBs)",
    text: "of SMB breaches involved ransomware.",
    source: "Verizon DBIR 2025 Executive Summary",
    sourceUrl: "https://www.verizon.com/business/resources/reports/2025-dbir-executive-summary.pdf",
    category: "ransomware",
    accent: "violet"
  },
  {
    id: "all-org-ransomware",
    stat: "44%",
    label: "Ransomware (All Orgs)",
    text: "of breaches reviewed involved ransomware.",
    source: "Verizon DBIR 2025 Executive Summary",
    sourceUrl: "https://www.verizon.com/business/resources/reports/2025-dbir-executive-summary.pdf",
    category: "ransomware",
    accent: "violet"
  },
  {
    id: "human-element",
    stat: "~60%",
    label: "Human Element",
    text: "of breaches involved the human element.",
    source: "Verizon DBIR 2025 Executive Summary",
    sourceUrl: "https://www.verizon.com/business/resources/reports/2025-dbir-executive-summary.pdf",
    category: "human",
    accent: "fuchsia"
  },
  {
    id: "third-party",
    stat: "30%",
    label: "Third-Party Risk",
    text: "of breaches involved a third party (up from 15%).",
    source: "Verizon DBIR 2025 Executive Summary",
    sourceUrl: "https://www.verizon.com/business/resources/reports/2025-dbir-executive-summary.pdf",
    category: "human",
    accent: "fuchsia"
  },
  {
    id: "leaked-secrets",
    stat: "94 days",
    label: "Leaked Secrets",
    text: "median time to remediate leaked secrets found in GitHub repositories.",
    source: "Verizon DBIR 2025 Executive Summary",
    sourceUrl: "https://www.verizon.com/business/resources/reports/2025-dbir-executive-summary.pdf",
    category: "recovery",
    accent: "purple"
  },
  {
    id: "recovery-speed",
    stat: "53%",
    label: "Recovery Speed",
    text: "of ransomware victims fully recovered within a week.",
    source: "Sophos State of Ransomware 2025",
    sourceUrl: "https://greymatter.com/wp-content/uploads/2025/06/sophos-state-of-ransomware-2025.pdf",
    category: "recovery",
    accent: "purple"
  },
  {
    id: "ransom-paid",
    stat: "49%",
    label: "Ransom Paid",
    text: "of ransomware victims paid to get data back.",
    source: "Sophos State of Ransomware 2025",
    sourceUrl: "https://greymatter.com/wp-content/uploads/2025/06/sophos-state-of-ransomware-2025.pdf",
    category: "ransomware",
    accent: "fuchsia"
  },
  {
    id: "backup-restores",
    stat: "54%",
    label: "Backup Restores",
    text: "used backups to restore encrypted data.",
    source: "Sophos State of Ransomware 2025",
    sourceUrl: "https://greymatter.com/wp-content/uploads/2025/06/sophos-state-of-ransomware-2025.pdf",
    category: "recovery",
    accent: "purple"
  },
  {
    id: "internet-crime",
    stat: "$16B+",
    label: "Internet Crime",
    text: "reported losses in 2024 from 859,532 complaints.",
    source: "FBI IC3 Press Release (Apr 23, 2025)",
    sourceUrl: "https://www.fbi.gov/news/press-releases/fbi-releases-annual-internet-crime-report",
    category: "financial",
    accent: "violet"
  },
  {
    id: "bec-losses",
    stat: "$2.77B",
    label: "BEC Losses",
    text: "business email compromise losses reported in 2024.",
    source: "FBI IC3 2024 Annual Report",
    sourceUrl: "https://www.ic3.gov/AnnualReport/Reports/2024_IC3Report.pdf",
    category: "financial",
    accent: "fuchsia"
  },
  {
    id: "ai-risk-gap",
    stat: "83% vs 51%",
    label: "AI Risk Gap",
    text: "83% say AI/GenAI raises threat level, but only 51% have related policies.",
    source: "ConnectWise (2025)",
    sourceUrl: "https://www.connectwise.com/resources/state-of-smb-cybersecurity",
    category: "ai",
    accent: "violet"
  },
  {
    id: "msp-market",
    stat: "64% / 67%",
    label: "MSP Growth",
    text: "64% of MSPs grew revenue last year; 67% expect growth over the next 3 years.",
    source: "Datto/Kaseya State of the MSP Report",
    sourceUrl: "https://www.datto.com/wp-content/uploads/dlm_uploads/DAT-2024-State-of-the-MSP-Report-1.pdf",
    category: "ai",
    accent: "purple"
  }
];

const featuredFacts = allFacts.filter(f => 
  ["mfa-gap", "ransomware-recovery", "smb-ransomware", "human-element", "internet-crime"].includes(f.id)
);

const accentStyles: Record<AccentColor, { bg: string; border: string; glow: string; stat: string }> = {
  violet: {
    bg: "from-violet-500/10 to-purple-500/5",
    border: "border-violet-500/30 hover:border-violet-400/50",
    glow: "hover:shadow-violet-500/20",
    stat: "from-violet-400 to-purple-400"
  },
  purple: {
    bg: "from-purple-500/10 to-fuchsia-500/5",
    border: "border-purple-500/30 hover:border-purple-400/50",
    glow: "hover:shadow-purple-500/20",
    stat: "from-purple-400 to-fuchsia-400"
  },
  fuchsia: {
    bg: "from-fuchsia-500/10 to-pink-500/5",
    border: "border-fuchsia-500/30 hover:border-fuchsia-400/50",
    glow: "hover:shadow-fuchsia-500/20",
    stat: "from-fuchsia-400 to-pink-400"
  }
};

interface FactCardProps {
  fact: CyberFact;
  featured?: boolean;
  onCopy: (fact: CyberFact) => void;
  copiedId: string | null;
}

const FactCard = ({ fact, featured = false, onCopy, copiedId }: FactCardProps) => {
  const styles = accentStyles[fact.accent];
  const isCopied = copiedId === fact.id;
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      className={`relative group rounded-2xl border backdrop-blur-xl transition-all duration-300 
        bg-gradient-to-br ${styles.bg} ${styles.border} ${styles.glow}
        hover:shadow-2xl ${featured ? 'p-8 md:p-10' : 'p-6'}`}
      data-testid={`fact-card-${fact.id}`}
    >
      {/* Category badge */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium 
          bg-white/5 border border-white/10 text-white/60`}>
          {categoryInfo[fact.category].icon}
          {categoryInfo[fact.category].label}
        </span>
      </div>

      {/* Stat & Label */}
      <div className={`flex items-baseline gap-4 flex-wrap ${featured ? 'mb-6 pb-6 border-b border-white/10' : 'mb-4'}`}>
        <span className={`font-black tracking-tight bg-gradient-to-r ${styles.stat} bg-clip-text text-transparent
          ${featured ? 'text-5xl md:text-7xl' : 'text-3xl md:text-4xl'}`}>
          {fact.stat}
        </span>
        <span className={`font-bold uppercase tracking-wider text-white/60
          ${featured ? 'text-base' : 'text-xs'}`}>
          {fact.label}
        </span>
      </div>

      {/* Text */}
      <p className={`text-white/80 font-medium leading-relaxed ${featured ? 'text-lg md:text-xl mb-6' : 'text-sm mb-4'}`}>
        {fact.text}
      </p>

      {/* Source & Actions */}
      <div className={`flex items-center justify-between gap-4 flex-wrap
        ${featured ? 'p-4 -mx-4 -mb-4 md:-mx-6 md:-mb-6 bg-white/5 rounded-b-2xl border-t border-white/10' : ''}`}>
        <a 
          href={fact.sourceUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-violet-300 hover:text-violet-200 transition-colors"
          data-testid={`fact-source-${fact.id}`}
        >
          <span className="text-white/40">Source:</span>
          <span className="font-medium">{fact.source}</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-60" />
        </a>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCopy(fact)}
          className={`opacity-0 group-hover:opacity-100 transition-opacity text-white/60 hover:text-white hover:bg-white/10
            ${isCopied ? 'opacity-100 text-emerald-400' : ''}`}
          data-testid={`btn-copy-${fact.id}`}
        >
          {isCopied ? (
            <>
              <Check className="w-4 h-4 mr-1.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-1.5" />
              Copy
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

const CyberFacts = () => {
  const prefersReducedMotion = useReducedMotion();
  const { toast } = useToast();
  const [randomFact, setRandomFact] = useState<CyberFact | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<FactCategory | "all">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useSEO({
    title: 'Cybersecurity Facts - Credibility Layer | Digerati Experts',
    description: 'Real cybersecurity statistics with sources. Use these facts across the site to support why proactive cybersecurity matters.',
    canonical: '/internal/cyber-facts',
  });

  // Randomize featured fact on load
  useEffect(() => {
    const pick = featuredFacts[Math.floor(Math.random() * featuredFacts.length)];
    setRandomFact(pick);
  }, []);

  const refreshRandomFact = () => {
    const currentIndex = featuredFacts.findIndex(f => f.id === randomFact?.id);
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * featuredFacts.length);
    } while (newIndex === currentIndex && featuredFacts.length > 1);
    setRandomFact(featuredFacts[newIndex]);
  };

  const filteredFacts = useMemo(() => {
    if (selectedCategory === "all") return allFacts;
    return allFacts.filter(f => f.category === selectedCategory);
  }, [selectedCategory]);

  const handleCopy = async (fact: CyberFact) => {
    const text = `${fact.stat} ${fact.text}\n\nSource: ${fact.source}\n${fact.sourceUrl}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(fact.id);
      toast({
        title: "Copied to clipboard",
        description: `"${fact.label}" fact copied successfully.`,
      });
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please try again or copy manually.",
        variant: "destructive"
      });
    }
  };

  const containerVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <MegaMenu />
      <FloatingParticles />
      
      <main className="relative z-10 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link href="/internal" className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors mb-8" data-testid="link-back">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sales Tools</span>
          </Link>
          
          {/* Page Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Credibility Layer</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight" data-testid="heading-cyber-facts">
              Real Cybersecurity Facts
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400">
                (With Sources)
              </span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Use these across your site to support why proactive cybersecurity matters: 
              identity, ransomware, email fraud, and recovery cost.
            </p>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent mb-16" />

          {/* Section 1: Today's Cyber Fact */}
          <section className="mb-20">
            <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Today's Cyber Fact</h2>
                <p className="text-sm text-white/40 uppercase tracking-wider font-semibold">Auto-randomizes on load</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={refreshRandomFact}
                className="border-white/20 text-white/70 hover:text-white hover:bg-white/10"
                data-testid="btn-refresh-fact"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                New Fact
              </Button>
            </div>

            <AnimatePresence mode="wait">
              {randomFact && (
                <FactCard 
                  key={randomFact.id}
                  fact={randomFact} 
                  featured 
                  onCopy={handleCopy}
                  copiedId={copiedId}
                />
              )}
            </AnimatePresence>

            <div className="mt-6 p-4 rounded-xl bg-violet-500/5 border-l-4 border-violet-500 text-white/60 text-sm">
              <strong className="text-white/80">Tip:</strong> Put this under your hero or above pricing to add immediate proof without adding clutter.
            </div>
          </section>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-16" />

          {/* Section 2: Quick Proof */}
          <section className="mb-20">
            <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Quick Proof</h2>
                <p className="text-sm text-white/40 uppercase tracking-wider font-semibold">Most persuasive • 2 cards is the sweet spot</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FactCard 
                fact={allFacts.find(f => f.id === "mfa-gap")!}
                onCopy={handleCopy}
                copiedId={copiedId}
              />
              <FactCard 
                fact={allFacts.find(f => f.id === "ransomware-recovery")!}
                onCopy={handleCopy}
                copiedId={copiedId}
              />
            </div>
          </section>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-fuchsia-500/30 to-transparent mb-16" />

          {/* Section 3: Full Fact Library */}
          <section>
            <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Fact Library</h2>
                <p className="text-sm text-white/40 uppercase tracking-wider font-semibold">
                  Copy anywhere • Use 1–3 per page • {filteredFacts.length} facts
                </p>
              </div>

              {/* Filter Dropdown */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="border-white/20 text-white/70 hover:text-white hover:bg-white/10"
                  data-testid="btn-filter-facts"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {selectedCategory === "all" ? "All Categories" : categoryInfo[selectedCategory].label}
                  <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                </Button>
                
                <AnimatePresence>
                  {isFilterOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-[#1a1a2e] border border-white/10 shadow-2xl overflow-hidden z-50"
                    >
                      <button
                        onClick={() => { setSelectedCategory("all"); setIsFilterOpen(false); }}
                        className={`w-full px-4 py-3 text-left text-sm hover:bg-white/5 transition-colors flex items-center gap-3
                          ${selectedCategory === "all" ? 'text-violet-300 bg-violet-500/10' : 'text-white/70'}`}
                        data-testid="filter-all"
                      >
                        <Sparkles className="w-4 h-4" />
                        All Categories
                      </button>
                      {Object.entries(categoryInfo).map(([key, info]) => (
                        <button
                          key={key}
                          onClick={() => { setSelectedCategory(key as FactCategory); setIsFilterOpen(false); }}
                          className={`w-full px-4 py-3 text-left text-sm hover:bg-white/5 transition-colors flex items-center gap-3
                            ${selectedCategory === key ? 'text-violet-300 bg-violet-500/10' : 'text-white/70'}`}
                          data-testid={`filter-${key}`}
                        >
                          {info.icon}
                          {info.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence mode="popLayout">
                {filteredFacts.map(fact => (
                  <FactCard 
                    key={fact.id}
                    fact={fact}
                    onCopy={handleCopy}
                    copiedId={copiedId}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            <div className="mt-8 p-4 rounded-xl bg-purple-500/5 border-l-4 border-purple-500 text-white/60 text-sm">
              <strong className="text-white/80">Best practice:</strong> Keep "Source:" links clickable. It builds trust and reduces skepticism.
            </div>
          </section>

        </div>
      </main>

      <DigeratiEnhancedFooterSection />
    </div>
  );
};

export default CyberFacts;
