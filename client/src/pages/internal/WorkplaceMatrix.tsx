import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ChevronDown, Check, Minus, Circle, Users, Building, Calendar, Info } from "lucide-react";
import logoImage from "@assets/DE-Logo-new_1762461524794.webp";

interface Feature {
  category: string;
  name: string;
  description: string;
  core: "included" | "optional" | "not-offered";
  pro: "included" | "optional" | "not-offered";
  elite: "included" | "optional" | "not-offered";
}

const userFeatures: Feature[] = [
  { category: "Identity", name: "Account provisioning + licensing assignment", description: "We create and configure user accounts in Microsoft 365, Zoho, or your preferred platform, assign appropriate licenses based on role requirements, and ensure users have the right subscriptions and permissions from day one.", core: "included", pro: "included", elite: "included" },
  { category: "Identity", name: "Groups/roles + MFA + SSO for assigned apps", description: "We configure security groups, role-based access controls, and Multi-Factor Authentication (MFA) for enhanced security. Single Sign-On (SSO) is set up for seamless access to all assigned business applications.", core: "included", pro: "included", elite: "included" },
  { category: "Hardware", name: "Laptop/Desktop setup + baseline config", description: "We configure laptops and desktops with your organization's standard software, security policies, and settings including OS updates, antivirus installation, domain joining, and baseline configurations.", core: "optional", pro: "included", elite: "included" },
  { category: "Hardware", name: "Phone setup (optional)", description: "We configure mobile phones for business use, including email sync, app deployment, security policies, and mobile device management (MDM) enrollment.", core: "optional", pro: "optional", elite: "included" },
  { category: "Hardware", name: "Headset + camera readiness checklist", description: "We provide a comprehensive checklist to ensure users have working headsets and cameras for video conferencing with compatibility verification and troubleshooting guidance.", core: "included", pro: "included", elite: "included" },
  { category: "Apps", name: "Zoho Apps or Zoho Mail/Zoho One assignment", description: "We assign users to the appropriate Zoho package based on their role and needs, including email account setup and app access provisioning.", core: "included", pro: "included", elite: "included" },
  { category: "Apps", name: "LOB app access + role-based app set", description: "We grant access to Line-of-Business applications based on job function and department with a curated set of applications specific to their role.", core: "optional", pro: "included", elite: "included" },
  { category: "Mail/Meet", name: "Teams setup (chat/meetings) + user standards", description: "We configure Microsoft Teams for chat, video meetings, and collaboration including team/channel assignments, meeting policies, and guest access rules.", core: "included", pro: "included", elite: "included" },
  { category: "Calling", name: "Teams Calling enablement (per-user)", description: "We enable Teams Phone System functionality for users who need to make and receive business calls directly through Microsoft Teams.", core: "optional", pro: "optional", elite: "included" },
  { category: "Enablement", name: "New user orientation (workplace basics)", description: "We provide new employees with comprehensive orientation covering workplace technology basics, including email setup, password policies, and how to use core workplace tools.", core: "included", pro: "included", elite: "included" },
  { category: "Enablement", name: "Power-user training + productivity tips", description: "We offer advanced training sessions for power users who want to maximize productivity with keyboard shortcuts, advanced Teams features, and automation.", core: "not-offered", pro: "optional", elite: "included" },
];

const companyFeatures: Feature[] = [
  { category: "Governance", name: "Licensing standards + procurement workflow", description: "We establish organization-wide licensing standards, create procurement workflows for requesting new licenses, and implement approval processes.", core: "included", pro: "included", elite: "included" },
  { category: "Governance", name: "Company Portal self-service + app catalog", description: "We configure the Microsoft Company Portal as a self-service hub where employees can install approved applications and enroll devices.", core: "optional", pro: "included", elite: "included" },
  { category: "Governance", name: "Naming conventions + org standards doc", description: "We establish and document naming conventions for users, groups, devices, and resources to maintain consistency across the organization.", core: "included", pro: "included", elite: "included" },
  { category: "Collab", name: "SharePoint/OneDrive folder structure + permissions", description: "We design and implement a logical folder structure with appropriate permissions for secure file sharing and collaboration.", core: "included", pro: "included", elite: "included" },
  { category: "Collab", name: "Teams governance (team creation, retention, archival)", description: "We implement Teams governance policies including who can create teams, retention policies, and archival procedures.", core: "optional", pro: "included", elite: "included" },
  { category: "Mail", name: "Shared mailbox + distribution list setup", description: "We configure shared mailboxes and distribution lists for team communication and departmental email needs.", core: "included", pro: "included", elite: "included" },
  { category: "Mail", name: "Email signatures (org-wide template)", description: "We design and deploy standardized email signatures across the organization with consistent branding.", core: "optional", pro: "included", elite: "included" },
  { category: "Voice", name: "Teams Phone: auto-attendant + call queues", description: "We configure auto-attendants and call queues for professional call handling and routing.", core: "not-offered", pro: "optional", elite: "included" },
  { category: "Voice", name: "Meeting rooms + resource accounts", description: "We set up meeting room calendars and resource accounts for conference room booking and management.", core: "optional", pro: "included", elite: "included" },
];

const hrFeatures: Feature[] = [
  { category: "Onboarding", name: "Automated onboarding workflow", description: "We create automated workflows that trigger when HR adds a new employee, provisioning accounts and access automatically.", core: "not-offered", pro: "optional", elite: "included" },
  { category: "Onboarding", name: "Manager notification + checklist", description: "Automated notifications to managers with onboarding checklists and status updates for new hires.", core: "optional", pro: "included", elite: "included" },
  { category: "Offboarding", name: "Automated offboarding workflow", description: "Secure, automated workflows for employee departures including account disabling, license reclamation, and data retention.", core: "not-offered", pro: "optional", elite: "included" },
  { category: "Offboarding", name: "License reclamation + data export", description: "We ensure licenses are properly reclaimed and employee data is exported or archived according to policy.", core: "optional", pro: "included", elite: "included" },
  { category: "Lifecycle", name: "Role change automation", description: "Automated access adjustments when employees change roles or departments within the organization.", core: "not-offered", pro: "optional", elite: "included" },
  { category: "Lifecycle", name: "Annual access reviews", description: "Scheduled access reviews to ensure employees have appropriate permissions and licenses.", core: "not-offered", pro: "optional", elite: "included" },
];

function StatusBadge({ status }: { status: "included" | "optional" | "not-offered" }) {
  if (status === "included") {
    return <span className="text-emerald-400 font-bold text-lg" data-testid="badge-included"><Check className="w-5 h-5" /></span>;
  }
  if (status === "optional") {
    return <span className="text-amber-400 font-bold text-lg" data-testid="badge-optional"><Circle className="w-4 h-4" /></span>;
  }
  return <span className="text-white/30 font-bold" data-testid="badge-not-offered"><Minus className="w-5 h-5" /></span>;
}

export default function WorkplaceMatrix() {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (name: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  const renderFeatureTable = (title: string, features: Feature[], sectionId: string) => (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-violet-500/20 to-purple-500/20 border-t-2 border-b-2 border-violet-400/40 px-6 py-4">
        <h3 className="text-lg font-bold text-white" data-testid={`section-${sectionId}`}>{title}</h3>
      </div>
      {features.map((feature, index) => (
        <div key={feature.name}>
          <div
            className={`grid grid-cols-[1fr,100px,100px,100px] gap-4 px-6 py-4 border-b border-white/5 cursor-pointer hover:bg-violet-500/10 transition-colors ${expandedRows.has(feature.name) ? 'bg-violet-500/15' : index % 2 === 0 ? '' : 'bg-white/[0.02]'}`}
            onClick={() => toggleRow(feature.name)}
            data-testid={`row-feature-${index}`}
          >
            <div className="flex items-center gap-3">
              <ChevronDown className={`w-4 h-4 text-violet-400 transition-transform ${expandedRows.has(feature.name) ? 'rotate-180' : ''}`} />
              <div>
                <span className="text-xs text-violet-300/70 uppercase tracking-wider">{feature.category}</span>
                <p className="text-white font-medium">{feature.name}</p>
              </div>
            </div>
            <div className="flex items-center justify-center"><StatusBadge status={feature.core} /></div>
            <div className="flex items-center justify-center"><StatusBadge status={feature.pro} /></div>
            <div className="flex items-center justify-center"><StatusBadge status={feature.elite} /></div>
          </div>
          {expandedRows.has(feature.name) && (
            <div className="bg-violet-500/10 border-l-4 border-violet-400 px-8 py-4">
              <p className="text-white/70 leading-relaxed">{feature.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030228]">
      <Helmet>
        <title>Workplace Scope Matrix | Internal Reference | Digerati Experts</title>
        <meta name="description" content="Internal reference guide for Workplace scope matrix showing Core, Pro, and Elite tier service inclusions for user, company, and HR features." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <header className="border-b border-white/10 bg-[#030228]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/internal/sales-process" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm" data-testid="link-back">
            <ArrowLeft className="w-4 h-4" />
            Back to Sales Process
          </Link>
          <img src={logoImage} alt="Digerati Experts" className="h-8" />
        </div>
      </header>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 pb-8 border-b border-violet-400/30">
            <p className="text-violet-400 font-semibold text-sm uppercase tracking-wider mb-2">Internal Reference</p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="heading-workplace-matrix">
              Workplace Scope Matrix
            </h1>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                <Users className="w-4 h-4" /> User Services
              </span>
              <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                <Building className="w-4 h-4" /> Company Setup
              </span>
              <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                <Calendar className="w-4 h-4" /> HR Workflows
              </span>
            </div>
          </div>

          <div className="bg-[#1a1a2e] border border-violet-400/20 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Info className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">Service Levels</h3>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-emerald-400"><Check className="w-5 h-5" /></span>
                <div>
                  <p className="text-white font-semibold">Included</p>
                  <p className="text-white/50 text-xs">Standard feature</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-amber-400"><Circle className="w-4 h-4" /></span>
                <div>
                  <p className="text-white font-semibold">Optional</p>
                  <p className="text-white/50 text-xs">Available add-on</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white/30"><Minus className="w-5 h-5" /></span>
                <div>
                  <p className="text-white font-semibold">Not Offered</p>
                  <p className="text-white/50 text-xs">Not available</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a2e] border border-violet-400/20 rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 gap-0 border-b border-violet-400/30">
              <div className="bg-gradient-to-br from-slate-600/20 to-slate-700/20 p-4 text-center border-r border-violet-400/20">
                <p className="text-white font-bold">Core</p>
                <p className="text-white/50 text-xs mt-1">Workplace basics + standards</p>
              </div>
              <div className="bg-gradient-to-br from-violet-600/20 to-purple-600/20 p-4 text-center border-r border-violet-400/20">
                <p className="text-white font-bold">Pro</p>
                <p className="text-white/50 text-xs mt-1">Core + deeper rollout + governance</p>
              </div>
              <div className="bg-gradient-to-br from-purple-600/20 to-fuchsia-600/20 p-4 text-center">
                <p className="text-white font-bold">Elite</p>
                <p className="text-white/50 text-xs mt-1">Pro + exec polish + HR automation</p>
              </div>
            </div>

            <div className="grid grid-cols-[1fr,100px,100px,100px] gap-4 px-6 py-3 bg-black/30 text-sm font-semibold text-violet-300 uppercase tracking-wider border-b border-white/10">
              <div>Feature</div>
              <div className="text-center">Core</div>
              <div className="text-center">Pro</div>
              <div className="text-center">Elite</div>
            </div>

            {renderFeatureTable("A) User (Per-Person Buildout)", userFeatures, "user")}
            {renderFeatureTable("B) Company (Org-Level Workplace)", companyFeatures, "company")}
            {renderFeatureTable("C) HR Workflows (Lifecycle Automation)", hrFeatures, "hr")}
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
