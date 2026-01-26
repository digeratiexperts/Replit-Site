import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "@/pages/not-found";
import { lazy, Suspense } from "react";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { StickyCTABar } from "@/components/StickyCTABar";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { PageLoadingSkeleton } from "@/components/LoadingSkeleton";
import { AnnouncerProvider } from "@/components/AccessibleAnnouncer";
import { useGlobalShortcuts } from "@/hooks/useKeyboardShortcuts";

import { DigeratiHomepage } from "@/pages/DigeratiHomepage";

const SolutionsIndex = lazy(() => import("@/pages/solutions/SolutionsIndex"));
const ManagedITSupport = lazy(() => import("@/pages/solutions/ManagedITSupport"));
const UCaaS = lazy(() => import("@/pages/services/UCaaS"));
const Healthcare = lazy(() => import("@/pages/industries/Healthcare"));
const Accounting = lazy(() => import("@/pages/industries/Accounting"));
const LawFirms = lazy(() => import("@/pages/industries/LawFirms"));
const RealEstate = lazy(() => import("@/pages/industries/RealEstate"));
const Nonprofits = lazy(() => import("@/pages/industries/Nonprofits"));
const AnimalHospitals = lazy(() => import("@/pages/industries/AnimalHospitals"));
const CaseStudies = lazy(() => import("@/pages/resources/CaseStudies"));
const Blog = lazy(() => import("@/pages/resources/Blog"));
const BlogPost = lazy(() => import("@/pages/resources/BlogPost"));
const SecurityUpdates = lazy(() => import("@/pages/resources/SecurityUpdates"));
const Videos = lazy(() => import("@/pages/resources/Videos"));
const SecurityChecklist = lazy(() => import("@/pages/resources/SecurityChecklist"));
const Datasheets = lazy(() => import("@/pages/resources/Datasheets"));
const DowntimeCalculator = lazy(() => import("@/pages/resources/DowntimeCalculator"));
const KnowledgeBase = lazy(() => import("@/pages/support/KnowledgeBase"));
const RemoteSupport = lazy(() => import("@/pages/support/RemoteSupport"));
const PayInvoice = lazy(() => import("@/pages/support/PayInvoice"));
const MissionValues = lazy(() => import("@/pages/about/MissionValues"));
const Team = lazy(() => import("@/pages/about/Team"));
const Compliance = lazy(() => import("@/pages/about/Compliance"));
const SupportPage = lazy(() => import("@/pages/about/Support"));
const Insurance = lazy(() => import("@/pages/about/Insurance"));
const ComplianceCertifications = lazy(() => import("@/pages/about/ComplianceCertifications"));
const ClientBillOfRights = lazy(() => import("@/pages/about/ClientBillOfRights"));
const Guarantee = lazy(() => import("@/pages/about/Guarantee"));
const TwentyOneQuestions = lazy(() => import("@/pages/about/TwentyOneQuestions"));
const PrivacyPolicy = lazy(() => import("@/pages/legal/PrivacyPolicy"));
const TermsOfUse = lazy(() => import("@/pages/legal/TermsOfUse"));
const MSA = lazy(() => import("@/pages/legal/MSA"));
const SLA = lazy(() => import("@/pages/legal/SLA"));
const AUP = lazy(() => import("@/pages/legal/AUP"));
const DPA = lazy(() => import("@/pages/legal/DPA"));
const SampleSOW = lazy(() => import("@/pages/legal/SampleSOW"));
const TrustCenter = lazy(() => import("@/pages/trust/TrustCenter"));
const VulnerabilityDisclosure = lazy(() => import("@/pages/trust/VulnerabilityDisclosure"));
const Accessibility = lazy(() => import("@/pages/trust/Accessibility"));
const SubmitTicket = lazy(() => import("@/pages/support/SubmitTicket"));
const GenericServicePage = lazy(() => import("@/pages/GenericServicePage"));

// Location pages
const ChandlerAZ = lazy(() => import("@/pages/locations/ChandlerAZ"));
const PhoenixAZ = lazy(() => import("@/pages/locations/PhoenixAZ"));
const MesaAZ = lazy(() => import("@/pages/locations/MesaAZ"));
const GilbertAZ = lazy(() => import("@/pages/locations/GilbertAZ"));
const TempeAZ = lazy(() => import("@/pages/locations/TempeAZ"));
const ScottsdalAZ = lazy(() => import("@/pages/locations/ScottsdalAZ"));

// Portal pages
const PortalLogin = lazy(() => import("@/pages/portal/PortalLogin"));
const PortalSignup = lazy(() => import("@/pages/portal/PortalSignup"));
const PortalDashboard = lazy(() => import("@/pages/portal/PortalDashboard"));
const PortalTickets = lazy(() => import("@/pages/portal/PortalTickets"));
const PortalTicketDetail = lazy(() => import("@/pages/portal/PortalTicketDetail"));
const PortalCreateTicket = lazy(() => import("@/pages/portal/PortalCreateTicket"));
const PortalServices = lazy(() => import("@/pages/portal/PortalServices"));
const PortalInvoices = lazy(() => import("@/pages/portal/PortalInvoices"));
const PortalPayment = lazy(() => import("@/pages/portal/PortalPayment"));
const PortalKB = lazy(() => import("@/pages/portal/PortalKB"));
const PortalStatus = lazy(() => import("@/pages/portal/PortalStatus"));
const PortalLearning = lazy(() => import("@/pages/portal/PortalLearning"));
const PortalChat = lazy(() => import("@/pages/portal/PortalChat"));
const PortalAgent = lazy(() => import("@/pages/portal/PortalAgent"));
const PortalSettings = lazy(() => import("@/pages/portal/PortalSettings"));
const PortalShipCenter = lazy(() => import("@/pages/portal/PortalShipCenter"));
const PortalProcurementStore = lazy(() => import("@/pages/portal/PortalProcurementStore"));
const PortalAdvancedForms = lazy(() => import("@/pages/portal/PortalAdvancedForms").then(m => ({ default: m.PortalAdvancedForms })));
const PortalSatisfactionSurvey = lazy(() => import("@/pages/portal/PortalSatisfactionSurvey").then(m => ({ default: m.PortalSatisfactionSurvey })));
const PortalApprovals = lazy(() => import("@/pages/portal/PortalApprovals").then(m => ({ default: m.PortalApprovals })));
const PortalQuestionnaireCalendar = lazy(() => import("@/pages/portal/PortalQuestionnaireCalendar").then(m => ({ default: m.PortalQuestionnaireCalendar })));
const PortalVPN = lazy(() => import("@/pages/portal/PortalVPN"));
const PortalCytracom = lazy(() => import("@/pages/portal/PortalCytracom"));
const PortalFiles = lazy(() => import("@/pages/portal/PortalFiles"));
const PortalBilling = lazy(() => import("@/pages/portal/PortalBilling"));
const PortalCompany = lazy(() => import("@/pages/portal/PortalCompany"));
const AdminImportPage = lazy(() => import("@/pages/portal/AdminImport").then(m => ({ default: m.AdminImport })));
const AdminAgentsPage = lazy(() => import("@/pages/portal/AdminAgents").then(m => ({ default: m.AdminAgents })));
const AdminOpenAIPage = lazy(() => import("@/pages/portal/AdminOpenAI").then(m => ({ default: m.AdminOpenAI })));
const AdminCompaniesPage = lazy(() => import("@/pages/portal/AdminCompanies").then(m => ({ default: m.AdminCompanies })));
const LeadQuoteWizard = lazy(() => import("@/pages/LeadQuoteWizard"));
const QuoteConfirmation = lazy(() => import("@/pages/QuoteConfirmation"));
const ThankYouSuccess = lazy(() => import("@/pages/ThankYouSuccess"));
const SalesProcess = lazy(() => import("@/pages/portal/SalesProcess"));
const ProActiveEcosystemPricing = lazy(() => import("@/pages/ProActiveEcosystemPricing"));
const EcosystemPricing = lazy(() => import("@/pages/EcosystemPricing"));
const EcosystemMatrixOfficial = lazy(() => import("@/pages/EcosystemMatrixOfficial"));
const NetworkPlannerOfficial = lazy(() => import("@/pages/NetworkPlannerOfficial"));
const Ebook = lazy(() => import("@/pages/resources/Ebook"));

// Internal pages (DE staff only)
const InternalSalesProcess = lazy(() => import("@/pages/internal/SalesProcessPage"));
const WorkplaceMatrix = lazy(() => import("@/pages/internal/WorkplaceMatrix"));
const CoreIT = lazy(() => import("@/pages/internal/CoreIT"));
const SecurityStack = lazy(() => import("@/pages/internal/SecurityStack"));
const PricingTiers = lazy(() => import("@/pages/internal/PricingTiers"));
const ServicePackages = lazy(() => import("@/pages/internal/ServicePackages"));
const VcioServices = lazy(() => import("@/pages/internal/VcioServices"));
const SixReasons = lazy(() => import("@/pages/internal/SixReasons"));
const BuyersGuide = lazy(() => import("@/pages/internal/BuyersGuide"));
const CoverLetter = lazy(() => import("@/pages/internal/CoverLetter"));
const AudioBusinessCard = lazy(() => import("@/pages/internal/AudioBusinessCard"));
const ElevenThingsBetter = lazy(() => import("@/pages/internal/ElevenThingsBetter"));
const USPWorksheet = lazy(() => import("@/pages/internal/USPWorksheet"));
const ProActiveEcosystems = lazy(() => import("@/pages/internal/ProActiveEcosystems"));
const GuaranteesValues = lazy(() => import("@/pages/internal/GuaranteesValues"));
const CyberFacts = lazy(() => import("@/pages/internal/CyberFacts"));

import { servicePageData, industryPageData, resourcePageData, supportPageData } from "@/pages/routes/servicePages";

function Router() {
  return (
    <Switch>
      {/* Homepage */}
      <Route path="/" component={DigeratiHomepage} />
      
      {/* Solutions Pages */}
      <Route path="/solutions" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <SolutionsIndex />
        </Suspense>
      )} />
      <Route path="/solutions/managed-it-support" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <ManagedITSupport />
        </Suspense>
      )} />
      {Object.entries(servicePageData).map(([key, data]) => (
        <Route key={key} path={`/solutions/${key}`} component={() => (
          <Suspense fallback={<PageLoadingSkeleton />}>
            <GenericServicePage {...data} serviceKey={key} />
          </Suspense>
        )} />
      ))}
      
      {/* Services Pages */}
      <Route path="/services/ucaas" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <UCaaS />
        </Suspense>
      )} />
      
      {/* Industries Pages */}
      <Route path="/industries/healthcare" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <Healthcare />
        </Suspense>
      )} />
      <Route path="/industries/accounting-finance" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <Accounting />
        </Suspense>
      )} />
      <Route path="/industries/law-firms" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <LawFirms />
        </Suspense>
      )} />
      <Route path="/industries/real-estate" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <RealEstate />
        </Suspense>
      )} />
      <Route path="/industries/nonprofits" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <Nonprofits />
        </Suspense>
      )} />
      <Route path="/industries/animal-hospitals" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <AnimalHospitals />
        </Suspense>
      )} />
      {Object.entries(industryPageData).map(([key, data]) => (
        <Route key={key} path={`/industries/${key}`} component={() => (
          <Suspense fallback={<PageLoadingSkeleton />}>
            <GenericServicePage {...data} />
          </Suspense>
        )} />
      ))}
      
      {/* Resources Pages */}
      <Route path="/resources/case-studies" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <CaseStudies />
        </Suspense>
      )} />
      <Route path="/resources/blog" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <Blog />
        </Suspense>
      )} />
      <Route path="/resources/blog/:slug" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <BlogPost />
        </Suspense>
      )} />
      <Route path="/resources/ebook/defending-digital-realm" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <Ebook />
        </Suspense>
      )} />
      <Route path="/resources/security-updates" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <SecurityUpdates />
        </Suspense>
      )} />
      <Route path="/resources/videos" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <Videos />
        </Suspense>
      )} />
      <Route path="/resources/security-checklist" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <SecurityChecklist />
        </Suspense>
      )} />
      <Route path="/resources/datasheets" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <Datasheets />
        </Suspense>
      )} />
      <Route path="/resources/downtime-calculator" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <DowntimeCalculator />
        </Suspense>
      )} />
      {Object.entries(resourcePageData).map(([key, data]) => (
        <Route key={key} path={`/resources/${key}`} component={() => (
          <Suspense fallback={<PageLoadingSkeleton />}>
            <GenericServicePage {...data} />
          </Suspense>
        )} />
      ))}
      
      {/* About Pages */}
      <Route path="/about/mission-values" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <MissionValues />
        </Suspense>
      )} />
      <Route path="/about/team" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <Team />
        </Suspense>
      )} />
      <Route path="/about/compliance" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <Compliance />
        </Suspense>
      )} />
      <Route path="/about/support" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <SupportPage />
        </Suspense>
      )} />
      <Route path="/about/insurance" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <Insurance />
        </Suspense>
      )} />
      <Route path="/about/compliance-certifications" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <ComplianceCertifications />
        </Suspense>
      )} />
      <Route path="/about/client-bill-of-rights" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <ClientBillOfRights />
        </Suspense>
      )} />
      <Route path="/about/guarantee" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <Guarantee />
        </Suspense>
      )} />
      <Route path="/about/21-questions" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <TwentyOneQuestions />
        </Suspense>
      )} />
      
      {/* Support Pages */}
      <Route path="/support/submit-ticket" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <SubmitTicket />
        </Suspense>
      )} />
      <Route path="/support/knowledge-base" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <KnowledgeBase />
        </Suspense>
      )} />
      <Route path="/support/remote-support" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <RemoteSupport />
        </Suspense>
      )} />
      <Route path="/support/pay-invoice" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PayInvoice />
        </Suspense>
      )} />
      {Object.entries(supportPageData).map(([key, data]) => (
        <Route key={key} path={`/support/${key}`} component={() => (
          <Suspense fallback={<PageLoadingSkeleton />}>
            <GenericServicePage {...data} />
          </Suspense>
        )} />
      ))}
      
      {/* Legal Pages */}
      <Route path="/legal/privacy-policy" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PrivacyPolicy />
        </Suspense>
      )} />
      <Route path="/legal/terms-of-use" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <TermsOfUse />
        </Suspense>
      )} />
      <Route path="/legal/msa" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <MSA />
        </Suspense>
      )} />
      <Route path="/legal/sla" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <SLA />
        </Suspense>
      )} />
      <Route path="/legal/aup" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <AUP />
        </Suspense>
      )} />
      <Route path="/legal/dpa" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <DPA />
        </Suspense>
      )} />
      <Route path="/legal/sample-sow" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <SampleSOW />
        </Suspense>
      )} />
      
      {/* Trust Pages */}
      <Route path="/trust/trust-center" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <TrustCenter />
        </Suspense>
      )} />
      <Route path="/trust/vulnerability-disclosure" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <VulnerabilityDisclosure />
        </Suspense>
      )} />
      <Route path="/trust/accessibility" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <Accessibility />
        </Suspense>
      )} />
      
      {/* Location Pages */}
      <Route path="/locations/chandler-az" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <ChandlerAZ />
        </Suspense>
      )} />
      <Route path="/locations/phoenix-az" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PhoenixAZ />
        </Suspense>
      )} />
      <Route path="/locations/mesa-az" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <MesaAZ />
        </Suspense>
      )} />
      <Route path="/locations/gilbert-az" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <GilbertAZ />
        </Suspense>
      )} />
      <Route path="/locations/tempe-az" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <TempeAZ />
        </Suspense>
      )} />
      <Route path="/locations/scottsdale-az" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <ScottsdalAZ />
        </Suspense>
      )} />
      
      {/* Portal Pages */}
      <Route path="/portal/login" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PortalLogin />
        </Suspense>
      )} />
      <Route path="/portal/signup" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PortalSignup />
        </Suspense>
      )} />
      <Route path="/portal/dashboard" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PortalDashboard />
        </Suspense>
      )} />
      <Route path="/portal/tickets" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PortalTickets />
        </Suspense>
      )} />
      <Route path="/portal/tickets/create" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PortalCreateTicket />
        </Suspense>
      )} />
      <Route path="/portal/tickets/:id" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PortalTicketDetail />
        </Suspense>
      )} />
      <Route path="/portal/services" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PortalServices />
        </Suspense>
      )} />
      <Route path="/portal/files" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PortalFiles />
        </Suspense>
      )} />
      <Route path="/portal/invoices" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PortalInvoices />
        </Suspense>
      )} />
      <Route path="/portal/invoices/:id/pay" component={({ params }) => {
        const invoice = {
          id: params.id || "",
          invoiceNumber: "INV-2024-004",
          amount: "2600",
        };
        return (
          <Suspense fallback={<PageLoadingSkeleton />}>
            <PortalPayment
              invoiceId={invoice.id}
              invoiceNumber={invoice.invoiceNumber}
              amount={invoice.amount}
            />
          </Suspense>
        );
      }} />
      <Route path="/portal/kb" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PortalKB />
        </Suspense>
      )} />
      <Route path="/portal/status" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PortalStatus />
        </Suspense>
      )} />
      <Route path="/portal/learning" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PortalLearning />
        </Suspense>
      )} />
      <Route path="/portal/chat" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PortalChat />
        </Suspense>
      )} />
      <Route path="/portal/agent" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PortalAgent />
        </Suspense>
      )} />
      <Route path="/portal/settings" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PortalSettings />
        </Suspense>
      )} />
      <Route path="/portal/billing" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PortalBilling />
        </Suspense>
      )} />
      <Route path="/portal/company" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PortalCompany />
        </Suspense>
      )} />
      <Route path="/portal/ship-center" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PortalShipCenter />
        </Suspense>
      )} />
      <Route path="/portal/procurement" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PortalProcurementStore />
        </Suspense>
      )} />
      <Route path="/portal/forms" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PortalAdvancedForms />
        </Suspense>
      )} />
      <Route path="/portal/surveys" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PortalSatisfactionSurvey />
        </Suspense>
      )} />
      <Route path="/portal/approvals" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PortalApprovals />
        </Suspense>
      )} />
      <Route path="/portal/vpn" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PortalVPN />
        </Suspense>
      )} />
      <Route path="/portal/cytracom" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PortalCytracom />
        </Suspense>
      )} />
      <Route path="/portal/questionnaires" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PortalQuestionnaireCalendar />
        </Suspense>
      )} />
      <Route path="/portal/admin/import" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <AdminImportPage />
        </Suspense>
      )} />
      <Route path="/portal/admin/agents" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <AdminAgentsPage />
        </Suspense>
      )} />
      <Route path="/portal/admin/openai" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <AdminOpenAIPage />
        </Suspense>
      )} />
      <Route path="/portal/admin/companies" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <AdminCompaniesPage />
        </Suspense>
      )} />
      <Route path="/portal/sales-process" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <SalesProcess />
        </Suspense>
      )} />
      
      {/* Lead Quote */}
      <Route path="/quote-wizard" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <LeadQuoteWizard />
        </Suspense>
      )} />
      <Route path="/quote-confirmation" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <QuoteConfirmation />
        </Suspense>
      )} />
      <Route path="/thank-you-success-page" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <ThankYouSuccess />
        </Suspense>
      )} />
      
      {/* ProActive Ecosystem Pricing */}
      <Route path="/proactive-ecosystem-pricing" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <ProActiveEcosystemPricing />
        </Suspense>
      )} />
      <Route path="/pricing" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <ProActiveEcosystemPricing />
        </Suspense>
      )} />
      
      {/* Ecosystem Pricing - Service Matrix */}
      <Route path="/ecosystem-pricing" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <EcosystemPricing />
        </Suspense>
      )} />
      
      {/* Internal DE Pages (Staff Only) */}
      <Route path="/internal/sales-process" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <InternalSalesProcess />
        </Suspense>
      )} />
      <Route path="/internal/workplace-matrix" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <WorkplaceMatrix />
        </Suspense>
      )} />
      <Route path="/internal/core-it" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <CoreIT />
        </Suspense>
      )} />
      <Route path="/internal/security-stack" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <SecurityStack />
        </Suspense>
      )} />
      <Route path="/internal/pricing-tiers" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PricingTiers />
        </Suspense>
      )} />
      <Route path="/internal/service-packages" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <ServicePackages />
        </Suspense>
      )} />
      <Route path="/internal/vcio" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <VcioServices />
        </Suspense>
      )} />
      <Route path="/internal/six-reasons" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <SixReasons />
        </Suspense>
      )} />
      <Route path="/internal/buyers-guide" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <BuyersGuide />
        </Suspense>
      )} />
      <Route path="/internal/cover-letter" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <CoverLetter />
        </Suspense>
      )} />
      <Route path="/internal/audio-business-card" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <AudioBusinessCard />
        </Suspense>
      )} />
      <Route path="/internal/11-things-better" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <ElevenThingsBetter />
        </Suspense>
      )} />
      <Route path="/internal/usp-worksheet" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <USPWorksheet />
        </Suspense>
      )} />
      <Route path="/internal/proactive-ecosystems" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <ProActiveEcosystems />
        </Suspense>
      )} />
      <Route path="/internal/guarantees-values" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <GuaranteesValues />
        </Suspense>
      )} />
      <Route path="/internal/cyber-facts" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <CyberFacts />
        </Suspense>
      )} />

      <Route path="/de-ecosystem-matrix-offical" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <EcosystemMatrixOfficial />
        </Suspense>
      )} />
      <Route path="/official-network-planner" component={() => (
        <Suspense fallback={<PageLoadingSkeleton />}>
          <NetworkPlannerOfficial />
        </Suspense>
      )} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  useGlobalShortcuts();
  
  return (
    <AnnouncerProvider>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <ScrollProgress />
      <div id="main-content">
        <Router />
      </div>
      <ScrollToTop />
      <StickyCTABar />
      <ExitIntentPopup delay={10000} />
    </AnnouncerProvider>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <AppContent />
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
