import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { 
  Search, 
  Moon, 
  Sun, 
  Printer, 
  Eye, 
  EyeOff, 
  ChevronDown, 
  Check, 
  Zap,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Density = "cozy" | "compact";

interface FeatureRow {
  name: string;
  tiers: {
    essentials: string | boolean;
    office: string | boolean;
    business: string | boolean;
    enterprise: string | boolean;
  };
  isUpgrade?: boolean;
}

interface Section {
  id: string;
  title: string;
  features: FeatureRow[];
}

const matrixData: Section[] = [
  {
    id: "managed-it",
    title: "Managed IT",
    features: [
      { name: "Help Desk & SLA", tiers: { essentials: false, office: "8×5", business: "8×5 + Priority", enterprise: "VIP + 24×7 opt" } },
      { name: "Remote Monitoring & Alerting", tiers: { essentials: true, office: true, business: true, enterprise: true } },
      { name: "Patch & App Management", tiers: { essentials: true, office: true, business: true, enterprise: true } },
      { name: "Remote Support & Quick Assist", tiers: { essentials: false, office: true, business: true, enterprise: true } },
      { name: "IT Documentation & KB", tiers: { essentials: false, office: "Standard", business: "Comprehensive", enterprise: "Full + Client access" } },
      { name: "Client Portal & Ticketing", tiers: { essentials: false, office: true, business: true, enterprise: true } },
      { name: "Asset & Warranty", tiers: { essentials: false, office: "Basic", business: "Full", enterprise: "Lifecycle + budgeting" } },
      { name: "Executive Reporting & QBRs", tiers: { essentials: false, office: "Semi-annual", business: "Quarterly", enterprise: "Monthly" } },
      { name: "IT Governance & Roadmaps", tiers: { essentials: false, office: false, business: false, enterprise: true }, isUpgrade: true },
      { name: "vCIO", tiers: { essentials: false, office: "Semi-annual", business: "Quarterly", enterprise: "Monthly" } },
    ]
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    features: [
      { name: "Baseline Threat Protection", tiers: { essentials: true, office: true, business: true, enterprise: true } },
      { name: "Data Safeguards & Identity", tiers: { essentials: true, office: true, business: true, enterprise: true } },
      { name: "Email Security & MFA", tiers: { essentials: false, office: "Secure gateway", business: "Advanced gateway", enterprise: "Advanced + SSO" } },
      { name: "Endpoint Detection & Response (EDR)", tiers: { essentials: false, office: "EDR", business: "EDR + rollback", enterprise: "EDR + MDR" } },
      { name: "Security Awareness & Phishing", tiers: { essentials: false, office: "Baseline", business: "Interactive + sims", enterprise: "Role-based + sims" } },
      { name: "SaaS App Security Monitoring", tiers: { essentials: false, office: "Optional", business: true, enterprise: true } },
      { name: "Dark Web Monitoring", tiers: { essentials: false, office: true, business: true, enterprise: true } },
      { name: "Vulnerability Management", tiers: { essentials: false, office: false, business: "Internal", enterprise: "Internal + External" }, isUpgrade: true },
    ]
  }
];

export default function EcosystemMatrixOfficial() {
  const [density, setDensity] = useState<Density>("cozy");
  const [isDark, setIsDark] = useState(true);
  const [showUpgrades, setShowUpgrades] = useState(false);
  const [dimSame, setDimSame] = useState(false);
  const [hideSame, setHideSame] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState<string[]>(matrixData.map(s => s.id));

  const toggleSection = (id: string) => {
    setExpandedSections(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const renderBadge = (value: string | boolean) => {
    if (value === true) return <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border-emerald-500/30"><Check className="w-3 h-3" /></Badge>;
    if (value === false || value === "—") return <span className="text-white/20">—</span>;
    
    const isPro = typeof value === 'string' && (value.includes("VIP") || value.includes("MDR") || value.includes("Full"));
    
    return (
      <Badge variant="outline" className={`${isPro ? 'border-violet-500 text-violet-300 bg-violet-500/10' : 'border-white/10 text-white/70 bg-white/5'}`}>
        {value}
      </Badge>
    );
  };

  const filteredData = matrixData.map(section => ({
    ...section,
    features: section.features.filter(f => 
      f.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.features.length > 0);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-[#0a0a0f] text-white" : "bg-slate-50 text-slate-900"}`}>
      <Helmet>
        <title>Service Matrix | Digerati Experts</title>
        <meta name="description" content="Compare Digerati Experts IT service tiers: IT Essentials, Office, Business, and Enterprise. Interactive service matrix with feature comparison across managed IT and cybersecurity offerings." />
        <meta property="og:title" content="Service Matrix | Digerati Experts" />
        <meta property="og:description" content="Interactive service tier comparison for managed IT and cybersecurity solutions." />
        <meta property="og:type" content="website" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* HERO */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Digerati Experts — Service Matrix
            </h1>
            <p className="text-white/60 text-lg">Security-First IT bundles · Compare tiers · Explore add-ons</p>
            <div className="flex gap-4 mt-4 text-sm font-medium">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Included</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-violet-400"></span> Premium</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-white/20"></span> N/A</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input 
                placeholder="Search features..." 
                className="pl-10 bg-white/5 border-white/10 focus:border-violet-500/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={showUpgrades ? "default" : "outline"}
                size="sm"
                className={showUpgrades ? "bg-violet-600" : "border-white/10"}
                onClick={() => setShowUpgrades(!showUpgrades)}
              >
                <Zap className="w-4 h-4 mr-2" /> Highlight Upgrades
              </Button>
              <div className="flex bg-white/5 rounded-md p-1 border border-white/10">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={density === "cozy" ? "bg-white/10" : ""}
                  onClick={() => setDensity("cozy")}
                >Cozy</Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={density === "compact" ? "bg-white/10" : ""}
                  onClick={() => setDensity("compact")}
                >Compact</Button>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-white/10"
                onClick={() => setIsDark(!isDark)}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button variant="outline" size="sm" className="border-white/10" onClick={() => window.print()}>
                <Printer className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* TIERS HEADER */}
        <div className="grid grid-cols-5 gap-4 mb-6 sticky top-0 z-40 bg-[#0a0a0f]/80 backdrop-blur-md py-4 border-b border-white/10">
          <div className="text-white/40 font-bold uppercase text-xs self-center">Capability</div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <Badge variant="secondary" className="mb-2 bg-slate-500/20 text-slate-400">Core</Badge>
            <h3 className="font-bold text-lg">IT Essentials</h3>
            <p className="text-xs text-white/50">Foundation only</p>
          </div>
          <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 text-center">
            <Badge variant="secondary" className="mb-2 bg-violet-500/20 text-violet-400">Popular</Badge>
            <h3 className="font-bold text-lg text-violet-300">Office</h3>
            <p className="text-xs text-violet-400/60">$65 /user·mo*</p>
          </div>
          <div className="p-4 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 text-center ring-1 ring-fuchsia-500/30">
            <Badge variant="secondary" className="mb-2 bg-fuchsia-500/20 text-fuchsia-400">Best Value</Badge>
            <h3 className="font-bold text-lg text-fuchsia-300">Business</h3>
            <p className="text-xs text-fuchsia-400/60">$95 /user·mo*</p>
          </div>
          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center">
            <Badge variant="secondary" className="mb-2 bg-purple-500/20 text-purple-400">Custom</Badge>
            <h3 className="font-bold text-lg text-purple-300">Enterprise</h3>
            <p className="text-xs text-purple-400/60">Multi-site + MDR</p>
          </div>
        </div>

        {/* MATRIX BODY */}
        <div className="space-y-8">
          {filteredData.map((section) => (
            <div key={section.id} className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02]">
              <button 
                className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/[0.08] transition-colors"
                onClick={() => toggleSection(section.id)}
              >
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-violet-500 rounded-full"></span>
                  {section.title}
                </h2>
                <ChevronDown className={`w-5 h-5 text-white/40 transition-transform ${expandedSections.includes(section.id) ? "" : "-rotate-90"}`} />
              </button>
              
              {expandedSections.includes(section.id) && (
                <div className="divide-y divide-white/5">
                  {section.features.map((feature, idx) => (
                    <div 
                      key={idx} 
                      className={`grid grid-cols-5 gap-4 items-center transition-all ${density === "compact" ? "py-2 px-4" : "py-4 px-4"} ${showUpgrades && feature.isUpgrade ? "bg-violet-500/5 ring-1 ring-inset ring-violet-500/20" : "hover:bg-white/[0.01]"}`}
                    >
                      <div className="flex items-center gap-2 group">
                        <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{feature.name}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger><Info className="w-3.5 h-3.5 text-white/20 hover:text-white/40" /></TooltipTrigger>
                            <TooltipContent><p className="max-w-xs text-xs">Standard industry definition for {feature.name}.</p></TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="text-center">{renderBadge(feature.tiers.essentials)}</div>
                      <div className="text-center">{renderBadge(feature.tiers.office)}</div>
                      <div className="text-center">{renderBadge(feature.tiers.business)}</div>
                      <div className="text-center">{renderBadge(feature.tiers.enterprise)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FOOTER NOTE */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-transparent border border-white/10 text-center">
          <p className="text-white/40 text-sm">
            Minimum billing: Office $750/site/mo; Business $1,200/site/mo; Enterprise $1,725/site/mo. 
            Billing rule: Minimums apply when per-user total &lt; minimum.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button className="bg-violet-600 hover:bg-violet-700">Book Technical Assessment</Button>
            <Button variant="outline" className="border-white/10">Download PDF Matrix</Button>
          </div>
        </div>
      </div>
      
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; }
          .bg-white\\/[0.02] { background: transparent !important; }
          .border-white\\/10 { border-color: #eee !important; }
          .text-white\\/60 { color: #666 !important; }
          .text-white { color: black !important; }
        }
      `}</style>
    </div>
  );
}
