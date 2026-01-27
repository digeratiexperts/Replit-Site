import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ChevronDown, ChevronRight, Briefcase, Shield, FileCheck, Star, Bookmark, Check, Phone } from "lucide-react";
import { MegaMenu } from "@/components/MegaMenu";
import Footer from "@/components/Footer";

interface CategoryData {
  id: string;
  title: string;
  icon: React.ReactNode;
  isHighlight?: boolean;
  isAddon?: boolean;
  ribbon?: string;
  services: ServiceRow[];
}

interface ServiceRow {
  name: string;
  tooltip: string;
  basic: boolean | 'addon';
  advanced: boolean | 'addon';
  enterprise: boolean | 'addon';
  isAddon?: boolean;
}

const categories: CategoryData[] = [
  {
    id: "productivity",
    title: "Productivity & Core IT",
    icon: <Briefcase className="w-5 h-5" />,
    services: [
      { name: "Secure Email & Productivity", tooltip: "Secure cloud email + productivity tools (MS365, Google, Zoho).", basic: true, advanced: true, enterprise: true },
      { name: "Unified Ticketing & Support Desk", tooltip: "Centralized helpdesk & ticketing for IT issues.", basic: true, advanced: true, enterprise: true },
      { name: "Automated Backups + SaaS Archiving", tooltip: "Automated backups for SaaS apps with cloud archiving.", basic: true, advanced: true, enterprise: true },
      { name: "Cloud File Sharing (Compliance Controls)", tooltip: "Secure file sharing with compliance-ready access controls.", basic: true, advanced: true, enterprise: true },
    ]
  },
  {
    id: "security",
    title: "Advanced Security",
    icon: <Shield className="w-5 h-5" />,
    services: [
      { name: "Endpoint & Email Protection", tooltip: "Stops malware, ransomware, phishing & email threats.", basic: false, advanced: true, enterprise: true },
      { name: "Data Loss Prevention & Encryption", tooltip: "Encrypts files, prevents data leaks, DNS filtering.", basic: false, advanced: true, enterprise: true },
      { name: "24/7 SOC + Threat Detection", tooltip: "24/7 monitoring & human-led response to threats.", basic: false, advanced: true, enterprise: true },
      { name: "DRaaS (Disaster Recovery)", tooltip: "Disaster Recovery as a Service with cloud failover.", basic: 'addon', advanced: 'addon', enterprise: 'addon', isAddon: true },
      { name: "Risk Assessments + Insurance Readiness", tooltip: "Risk & compliance reporting for insurance readiness.", basic: false, advanced: true, enterprise: true },
      { name: "Automated Risk Dashboards", tooltip: "Automated dashboards for client compliance visibility.", basic: false, advanced: true, enterprise: true },
    ]
  },
  {
    id: "compliance",
    title: "Enterprise Compliance",
    icon: <FileCheck className="w-5 h-5" />,
    services: [
      { name: "Continuous Compliance Monitoring", tooltip: "Continuous monitoring for HIPAA, SOC 2, ISO compliance.", basic: false, advanced: false, enterprise: true },
      { name: "Audit-Ready Documentation", tooltip: "Automated policy tracking & documentation.", basic: false, advanced: false, enterprise: true },
      { name: "Policy Tracking & Evidence Collection", tooltip: "Centralized collection of compliance evidence.", basic: false, advanced: false, enterprise: true },
      { name: "Compliance Seals & Certifications", tooltip: "Industry certifications (HIPAA Seal, SOC2, ISO).", basic: false, advanced: false, enterprise: true },
    ]
  },
  {
    id: "value-add",
    title: "Digerati Experts Value-Add",
    icon: <Star className="w-5 h-5" />,
    isHighlight: true,
    ribbon: "Included in all packages",
    services: [
      { name: "Proactive Patch & IT Management", tooltip: "Managed IT operations, patching, proactive monitoring.", basic: true, advanced: true, enterprise: true },
      { name: "Network Architecting", tooltip: "Custom network design: Zero Trust, SD-WAN, SASE.", basic: true, advanced: true, enterprise: true },
      { name: "Security Awareness Training", tooltip: "End-user awareness training & phishing simulations.", basic: true, advanced: true, enterprise: true },
      { name: "Executive Risk Dashboards", tooltip: "C-level dashboards with ROI, risk, compliance metrics.", basic: false, advanced: true, enterprise: true },
      { name: "Business Continuity Planning", tooltip: "Plans to minimize downtime & speed recovery.", basic: false, advanced: true, enterprise: true },
    ]
  },
  {
    id: "addons",
    title: "Optional Add-Ons",
    icon: <Bookmark className="w-5 h-5" />,
    isAddon: true,
    services: [
      { name: "UCaaS / VoIP Telephony", tooltip: "Cloud-based voice, UCaaS, VoIP phone systems.", basic: 'addon', advanced: 'addon', enterprise: 'addon', isAddon: true },
      { name: "Extended Cloud Backup", tooltip: "Extra storage, archiving, and compliance backups.", basic: 'addon', advanced: 'addon', enterprise: 'addon', isAddon: true },
    ]
  }
];

function TierCell({ value, isAddon }: { value: boolean | 'addon'; isAddon?: boolean }) {
  if (value === 'addon' || isAddon) {
    return (
      <div className="flex items-center justify-center">
        <span className="text-xs text-amber-400 font-medium">Add-On</span>
      </div>
    );
  }
  if (value) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <Check className="w-3 h-3 text-emerald-400" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center">
      <div className="w-2 h-0.5 bg-white/20 rounded"></div>
    </div>
  );
}

function CategoryCard({ category, isOpen, onToggle }: { category: CategoryData; isOpen: boolean; onToggle: () => void }) {
  const highlightClass = category.isHighlight 
    ? "border-violet-500/30 bg-violet-500/5" 
    : category.isAddon 
      ? "border-amber-500/30 bg-amber-500/5" 
      : "border-white/10 bg-white/[0.02]";

  return (
    <div className={`rounded-xl border ${highlightClass} overflow-hidden transition-all duration-300`} data-testid={`category-${category.id}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors text-left"
        aria-expanded={isOpen}
        data-testid={`button-toggle-${category.id}`}
      >
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          category.isHighlight ? "bg-violet-500/20 text-violet-400" : 
          category.isAddon ? "bg-amber-500/20 text-amber-400" : 
          "bg-white/10 text-white/70"
        }`}>
          {category.icon}
        </div>
        <span className="flex-1 font-semibold text-white">{category.title}</span>
        {category.ribbon && (
          <span className="hidden sm:inline-block px-3 py-1 text-xs font-medium bg-violet-500/20 text-violet-300 rounded-full">
            {category.ribbon}
          </span>
        )}
        {isOpen ? (
          <ChevronDown className="w-5 h-5 text-white/50" />
        ) : (
          <ChevronRight className="w-5 h-5 text-white/50" />
        )}
      </button>
      
      {isOpen && (
        <div className="border-t border-white/10">
          {/* Desktop table header */}
          <div className="hidden md:grid grid-cols-[1fr,100px,100px,100px] gap-4 px-4 py-3 bg-white/[0.02] text-sm font-medium text-white/50">
            <div>Service</div>
            <div className="text-center">Basic</div>
            <div className="text-center">Advanced</div>
            <div className="text-center">Enterprise</div>
          </div>
          
          {category.services.map((service, index) => (
            <div 
              key={index}
              className={`group relative px-4 py-3 border-t border-white/5 hover:bg-white/[0.02] transition-colors ${service.isAddon ? 'bg-amber-500/5' : ''}`}
              title={service.tooltip}
              data-testid={`service-row-${category.id}-${index}`}
            >
              {/* Desktop layout */}
              <div className="hidden md:grid grid-cols-[1fr,100px,100px,100px] gap-4 items-center">
                <div className="text-sm text-white/80 flex items-center gap-2">
                  {service.name}
                  {service.isAddon && (
                    <span className="px-2 py-0.5 text-xs bg-amber-500/20 text-amber-400 rounded">Add-On</span>
                  )}
                </div>
                <TierCell value={service.basic} isAddon={service.isAddon} />
                <TierCell value={service.advanced} isAddon={service.isAddon} />
                <TierCell value={service.enterprise} isAddon={service.isAddon} />
              </div>
              
              {/* Mobile layout */}
              <div className="md:hidden">
                <div className="text-sm text-white/80 mb-2 flex items-center gap-2">
                  {service.name}
                  {service.isAddon && (
                    <span className="px-2 py-0.5 text-xs bg-amber-500/20 text-amber-400 rounded">Add-On</span>
                  )}
                </div>
                {!service.isAddon && (
                  <div className="flex gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <span className="text-white/40">Basic:</span>
                      {service.basic ? <Check className="w-3 h-3 text-emerald-400" /> : <span className="text-white/30">—</span>}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-white/40">Adv:</span>
                      {service.advanced ? <Check className="w-3 h-3 text-emerald-400" /> : <span className="text-white/30">—</span>}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-white/40">Ent:</span>
                      {service.enterprise ? <Check className="w-3 h-3 text-emerald-400" /> : <span className="text-white/30">—</span>}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Tooltip on hover */}
              <div className="absolute left-4 -top-8 z-10 hidden group-hover:block px-3 py-2 bg-gray-900 border border-white/10 rounded-lg text-xs text-white/70 max-w-xs shadow-xl">
                {service.tooltip}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProActiveEcosystems() {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set(["productivity"]));

  const toggleCategory = (id: string) => {
    setOpenCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    setOpenCategories(new Set(categories.map(c => c.id)));
  };

  const collapseAll = () => {
    setOpenCategories(new Set());
  };

  return (
    <>
      <Helmet>
        <title>ProActive Ecosystems - Service Comparison | Digerati Experts</title>
        <meta name="description" content="Compare Digerati Experts ProActive Ecosystems service tiers - Basic IT, Advanced Security, and Enterprise Compliance packages." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-[#0A0E1A]">
        <MegaMenu />

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-40 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <Link href="/internal" className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors mb-8" data-testid="link-back">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sales Tools</span>
            </Link>

            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
                  Digerati Experts — ProActive Ecosystems
                </span>
              </h1>
              <p className="text-xl text-white/70 mb-6">MSP • MSSP • Network Architecting</p>
              
              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium border border-blue-500/30">
                  Basic IT
                </span>
                <span className="px-4 py-2 rounded-full bg-violet-500/20 text-violet-300 text-sm font-medium border border-violet-500/30">
                  Advanced Security
                </span>
                <span className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium border border-purple-500/30">
                  Enterprise
                </span>
              </div>

              {/* Expand/Collapse buttons */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={expandAll}
                  className="px-4 py-2 text-sm text-white/70 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-colors"
                  data-testid="button-expand-all"
                >
                  Expand All
                </button>
                <button
                  onClick={collapseAll}
                  className="px-4 py-2 text-sm text-white/70 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-colors"
                  data-testid="button-collapse-all"
                >
                  Collapse All
                </button>
              </div>
            </div>

            {/* Sticky tier header for desktop */}
            <div className="hidden md:grid grid-cols-[1fr,100px,100px,100px] gap-4 px-4 py-3 mb-4 bg-[#0A0E1A]/90 backdrop-blur-sm border border-white/10 rounded-xl sticky top-20 z-20">
              <div className="font-medium text-white/50">Service Category</div>
              <div className="text-center font-medium text-blue-400">Basic</div>
              <div className="text-center font-medium text-violet-400">Advanced</div>
              <div className="text-center font-medium text-purple-400">Enterprise</div>
            </div>

            {/* Category Cards */}
            <div className="space-y-4">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  isOpen={openCategories.has(category.id)}
                  onToggle={() => toggleCategory(category.id)}
                />
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
              <a
                href="https://meet.digerati-experts.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-violet-700 font-semibold rounded-xl hover:bg-white/90 transition-all shadow-lg hover:shadow-violet-500/20"
                data-testid="button-book-call"
              >
                <Phone className="w-5 h-5" />
                Book a Call
              </a>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-violet-400/50 text-violet-300 font-semibold rounded-xl hover:bg-violet-500/10 transition-all"
                data-testid="link-compare-packages"
              >
                Compare Packages
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
