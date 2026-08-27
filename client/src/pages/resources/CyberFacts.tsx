import { useState, useEffect, useMemo, forwardRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PageTemplate } from "@/components/PageTemplate";
import { ConversionPathBar } from "@/components/ConversionPathBar";
import { Button } from "@/components/ui/button";
import {
  Shield, Users, DollarSign, Clock,
  ExternalLink, Copy, Check, RefreshCw, Sparkles,
  Filter, ChevronDown, Lock, MapPin,
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useToast } from "@/hooks/use-toast";
import { CTA } from "@/lib/ctaCopy";
import {
  cyberAwarenessFacts,
  formatFactSource,
  type CyberAwarenessFact,
} from "@/data/cyberAwarenessFacts";
import { ProofChip } from "@/components/evidence/ProofChip";
import { EvidenceFrame } from "@/components/evidence/EvidenceFrame";
import { HUDFrame } from "@/components/evidence/HUDFrame";
import { StatusToken } from "@/components/evidence/StatusToken";

type FactCategory = "ransomware" | "identity" | "human" | "recovery" | "financial" | "arizona";

interface CyberFact {
  id: string;
  stat: string;
  label: string;
  text: string;
  source: string;
  sourceUrl: string;
  category: FactCategory;
}

const categoryInfo: Record<FactCategory, { icon: React.ReactNode; label: string }> = {
  ransomware: { icon: <Lock className="w-4 h-4" />, label: "Ransomware" },
  identity: { icon: <Shield className="w-4 h-4" />, label: "Identity & Access" },
  human: { icon: <Users className="w-4 h-4" />, label: "Human Element" },
  recovery: { icon: <Clock className="w-4 h-4" />, label: "Recovery" },
  financial: { icon: <DollarSign className="w-4 h-4" />, label: "Financial Impact" },
  arizona: { icon: <MapPin className="w-4 h-4" />, label: "Arizona" },
};

function categorizeFact(fact: CyberAwarenessFact): FactCategory {
  if (fact.scope === "arizona") return "arizona";
  if (fact.id.includes("ransomware") || fact.id.includes("smb-ransomware")) return "ransomware";
  if (fact.id.includes("mfa") || fact.id.includes("vuln")) return "identity";
  if (fact.id.includes("human")) return "human";
  if (fact.id.includes("breach") || fact.id.includes("bec") || fact.id.includes("cost") || fact.id.includes("ic3")) {
    return "financial";
  }
  return "financial";
}

function shortLabel(fact: CyberAwarenessFact): string {
  if (fact.scope === "arizona") return "Arizona";
  if (fact.id.includes("ransomware") && fact.id.includes("smb")) return "SMB Ransomware";
  if (fact.id.includes("ransomware")) return "Ransomware";
  if (fact.id.includes("mfa")) return "MFA";
  if (fact.id.includes("vuln")) return "Vulnerabilities";
  if (fact.id.includes("human")) return "Human Element";
  if (fact.id.includes("bec")) return "BEC";
  if (fact.id.includes("breach-cost") || fact.id.includes("ibm")) return "Breach Cost";
  if (fact.id.includes("breach-notify")) return "AZ Breach Law";
  return "Industry Fact";
}

const canonicalFacts: CyberFact[] = cyberAwarenessFacts.map((fact) => {
  const category = categorizeFact(fact);
  return {
    id: fact.id,
    stat: fact.metric,
    label: shortLabel(fact),
    text: fact.statement.endsWith(".") ? fact.statement : `${fact.statement}.`,
    source: formatFactSource(fact),
    sourceUrl: fact.sourceUrl || "#",
    category,
  };
});

/** Secondary sourced facts kept for the facts library (not homepage). */
const secondaryFacts: CyberFact[] = [
  {
    id: "ransomware-recovery",
    stat: "$1.53M",
    label: "Ransomware Recovery",
    text: "average cost to recover from ransomware (excluding ransom).",
    source: "Sophos State of Ransomware 2025",
    sourceUrl: "https://greymatter.com/wp-content/uploads/2025/06/sophos-state-of-ransomware-2025.pdf",
    category: "financial",
  },
  {
    id: "backup-restores",
    stat: "54%",
    label: "Backup Restores",
    text: "used backups to restore encrypted data.",
    source: "Sophos State of Ransomware 2025",
    sourceUrl: "https://greymatter.com/wp-content/uploads/2025/06/sophos-state-of-ransomware-2025.pdf",
    category: "recovery",
  },
  {
    id: "internet-crime",
    stat: "$16.6B",
    label: "Internet Crime",
    text: "reported losses to FBI IC3 in 2024 from 859,532 complaints.",
    source: "FBI IC3 Annual Report 2024",
    sourceUrl: "https://www.ic3.gov/AnnualReport/Reports/2024_IC3Report.pdf",
    category: "financial",
  },
];

const allFacts: CyberFact[] = [...canonicalFacts, ...secondaryFacts];

const featuredFacts = allFacts.filter((f) =>
  [
    "az-ic3-losses-2024",
    "dbir-ransomware-2026",
    "ibm-us-breach-cost-2026",
    "microsoft-mfa-blocks-2025",
    "dbir-human-element-2026",
  ].includes(f.id),
);

interface FactCardProps {
  fact: CyberFact;
  featured?: boolean;
  onCopy: (fact: CyberFact) => void;
  copiedId: string | null;
}

const FactCard = forwardRef<HTMLDivElement, FactCardProps>(function FactCard(
  { fact, featured = false, onCopy, copiedId },
  ref,
) {
  const isCopied = copiedId === fact.id;

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`de-hud-card relative transition-all duration-200 hover:border-[#D3126A]/40 ${featured ? "p-8 md:p-10" : "p-6"}`}
      data-testid={`fact-card-${fact.id}`}
    >
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-black/40 px-2.5 py-1 text-xs font-mono font-medium text-white/70">
          {categoryInfo[fact.category].icon}
          {categoryInfo[fact.category].label}
        </span>
      </div>

      <div className={`flex flex-wrap items-baseline gap-4 ${featured ? "mb-6 border-b border-white/10 pb-6" : "mb-4"}`}>
        <span className={`font-black font-mono de-tabular-nums tracking-tight text-de-accent-ink ${featured ? "text-5xl md:text-7xl" : "text-3xl md:text-4xl"}`}>
          {fact.stat}
        </span>
        <span className={`font-bold font-mono uppercase tracking-wider text-white/60 ${featured ? "text-base" : "text-xs"}`}>
          {fact.label}
        </span>
      </div>

      <p className={`font-medium leading-relaxed text-white/80 ${featured ? "mb-6 text-lg md:text-xl font-heading" : "mb-4 text-sm"}`}>
        {fact.text}
      </p>

      <div className={`flex flex-wrap items-center justify-between gap-4 ${featured ? "rounded-xl border border-white/10 bg-black/30 p-4" : ""}`}>
        <a
          href={fact.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-mono text-de-accent-ink hover:underline"
          data-testid={`fact-source-${fact.id}`}
        >
          <span className="text-white/55">Source:</span>
          <span className="font-medium">{fact.source}</span>
          <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
        </a>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCopy(fact)}
          className={`text-white/70 hover:bg-white/10 hover:text-white ${isCopied ? "text-de-accent-ink" : ""}`}
          data-testid={`btn-copy-${fact.id}`}
        >
          {isCopied ? (
            <>
              <Check className="mr-1.5 h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-1.5 h-4 w-4" />
              Copy
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
});

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
    canonical: '/resources/cyber-facts',
  });

  useEffect(() => {
    const pick = featuredFacts[Math.floor(Math.random() * featuredFacts.length)];
    setRandomFact(pick);
  }, []);

  const handleCopy = (fact: CyberFact) => {
    navigator.clipboard.writeText(`${fact.stat} ${fact.text} (${fact.source})`);
    setCopiedId(fact.id);
    toast({
      title: "Fact Copied",
      description: "Statistic and source copied to clipboard.",
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const refreshRandomFact = () => {
    const remaining = featuredFacts.filter(f => f.id !== randomFact?.id);
    const pick = remaining[Math.floor(Math.random() * remaining.length)];
    setRandomFact(pick);
  };

  const filteredFacts = useMemo(() => {
    if (selectedCategory === "all") return allFacts;
    return allFacts.filter(f => f.category === selectedCategory);
  }, [selectedCategory]);

  const containerVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  return (
    <PageTemplate
      title="Real Cybersecurity Facts"
      subtitle="Sourced statistics — identity, ransomware, email fraud, and recovery cost. Use them with the source link attached."
      icon={<Shield className="h-10 w-10 text-de-accent-ink" />}
      breadcrumbs={[{ label: "Resources", href: "/resources" }, { label: "Cyber Facts" }]}
      actions={
        <Button asChild variant="brand" size="lg" className="h-12 px-6 font-semibold">
          <a href="/book">{CTA.primary}</a>
        </Button>
      }
    >
      <div className="space-y-16" data-testid="heading-cyber-facts">
        {/* Sourced Proof Chips */}
        <div className="flex flex-wrap items-center gap-3">
          <ProofChip metric="SOURCED" label="Peer-Reviewed Industry Data" icon={Shield} />
          <ProofChip metric="GOVERNMENT" label="CISA & FBI IC3 Audited" icon={Lock} />
          <ProofChip metric="ARIZONA" label="State Breach Law Ready" icon={MapPin} />
        </div>

        <section>
          <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Today's Cyber Fact</h2>
                <p className="text-sm text-white/55 uppercase tracking-wider font-semibold">Auto-randomizes on load</p>
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

            <div className="mt-6 p-4 rounded-xl bg-de-raised border-l-4 border-de-hairline text-white/60 text-sm">
              <strong className="text-white/80">Tip:</strong> Put this under your hero or above pricing to add immediate proof without adding clutter.
            </div>
          </section>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent to-transparent mb-16" />

          {/* Section 2: Quick Proof */}
          <section className="mb-20">
            <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Quick Proof</h2>
                <p className="text-sm text-white/55 uppercase tracking-wider font-semibold">Most persuasive • 2 cards is the sweet spot</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FactCard 
                fact={allFacts.find(f => f.id === "microsoft-mfa-blocks-2025")!}
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
          <div className="h-px bg-gradient-to-r from-transparent via-de-accent/30 to-transparent mb-16" />

          {/* Section 3: Full Fact Library */}
          <section>
            <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Fact Library</h2>
                <p className="text-sm text-white/55 uppercase tracking-wider font-semibold">
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
                      className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-de-hairline bg-de-raised"
                    >
                      <button
                        onClick={() => { setSelectedCategory("all"); setIsFilterOpen(false); }}
                        className={`w-full px-4 py-3 text-left text-sm hover:bg-white/5 transition-colors flex items-center gap-3
                          ${selectedCategory === "all" ? 'text-de-accent-ink bg-de-raised' : 'text-white/70'}`}
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
                            ${selectedCategory === key ? 'text-de-accent-ink bg-de-raised' : 'text-white/70'}`}
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

            <div className="mt-8 p-4 rounded-xl bg-de-raised border-l-4 border-de-hairline text-white/60 text-sm">
              <strong className="text-white/80">Best practice:</strong> Keep "Source:" links clickable. It builds trust and reduces skepticism.
            </div>
          </section>

          <ConversionPathBar
            headline="Want these facts applied to your environment?"
            body="A Cyber Risk Assessment maps sourced industry risk to what is actually running in your Arizona office."
          />
      </div>
    </PageTemplate>
  );
};

export default CyberFacts;
