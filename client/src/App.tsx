import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { lazy, Suspense } from "react";

import { DigeratiHomepage } from "@/pages/DigeratiHomepage";

const SolutionsIndex = lazy(() => import("@/pages/solutions/SolutionsIndex"));
const ManagedITSupport = lazy(() => import("@/pages/solutions/ManagedITSupport"));
const Healthcare = lazy(() => import("@/pages/industries/Healthcare"));
const Accounting = lazy(() => import("@/pages/industries/Accounting"));
const LawFirms = lazy(() => import("@/pages/industries/LawFirms"));
const RealEstate = lazy(() => import("@/pages/industries/RealEstate"));
const Nonprofits = lazy(() => import("@/pages/industries/Nonprofits"));
const CaseStudies = lazy(() => import("@/pages/resources/CaseStudies"));
const Blog = lazy(() => import("@/pages/resources/Blog"));
const Videos = lazy(() => import("@/pages/resources/Videos"));
const SecurityChecklist = lazy(() => import("@/pages/resources/SecurityChecklist"));
const Datasheets = lazy(() => import("@/pages/resources/Datasheets"));
const KnowledgeBase = lazy(() => import("@/pages/support/KnowledgeBase"));
const RemoteSupport = lazy(() => import("@/pages/support/RemoteSupport"));
const PayInvoice = lazy(() => import("@/pages/support/PayInvoice"));
const MissionValues = lazy(() => import("@/pages/about/MissionValues"));
const Team = lazy(() => import("@/pages/about/Team"));
const Compliance = lazy(() => import("@/pages/about/Compliance"));
const SupportPage = lazy(() => import("@/pages/about/Support"));
const Insurance = lazy(() => import("@/pages/about/Insurance"));
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
const AdminImportPage = lazy(() => import("@/pages/portal/AdminImport").then(m => ({ default: m.AdminImport })));
const AdminAgentsPage = lazy(() => import("@/pages/portal/AdminAgents").then(m => ({ default: m.AdminAgents })));
const AdminOpenAIPage = lazy(() => import("@/pages/portal/AdminOpenAI").then(m => ({ default: m.AdminOpenAI })));
const LeadQuoteWizard = lazy(() => import("@/pages/LeadQuoteWizard"));
const QuoteConfirmation = lazy(() => import("@/pages/QuoteConfirmation"));
const ThankYouSuccess = lazy(() => import("@/pages/ThankYouSuccess"));

import { servicePageData, industryPageData, resourcePageData, supportPageData } from "@/pages/routes/servicePages";

function Router() {
  return (
    <Switch>
      {/* Homepage */}
      <Route path="/" component={DigeratiHomepage} />
      
      {/* Solutions Pages */}
      <Route path="/solutions" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <SolutionsIndex />
        </Suspense>
      )} />
      <Route path="/solutions/managed-it-support" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <ManagedITSupport />
        </Suspense>
      )} />
      {Object.entries(servicePageData).map(([key, data]) => (
        <Route key={key} path={`/solutions/${key}`} component={() => (
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <GenericServicePage {...data} />
          </Suspense>
        )} />
      ))}
      
      {/* Industries Pages */}
      <Route path="/industries/healthcare" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <Healthcare />
        </Suspense>
      )} />
      <Route path="/industries/accounting-finance" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <Accounting />
        </Suspense>
      )} />
      <Route path="/industries/law-firms" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <LawFirms />
        </Suspense>
      )} />
      <Route path="/industries/real-estate" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <RealEstate />
        </Suspense>
      )} />
      <Route path="/industries/nonprofits" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <Nonprofits />
        </Suspense>
      )} />
      {Object.entries(industryPageData).map(([key, data]) => (
        <Route key={key} path={`/industries/${key}`} component={() => (
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <GenericServicePage {...data} />
          </Suspense>
        )} />
      ))}
      
      {/* Resources Pages */}
      <Route path="/resources/case-studies" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <CaseStudies />
        </Suspense>
      )} />
      <Route path="/resources/blog" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <Blog />
        </Suspense>
      )} />
      <Route path="/resources/videos" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <Videos />
        </Suspense>
      )} />
      <Route path="/resources/security-checklist" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <SecurityChecklist />
        </Suspense>
      )} />
      <Route path="/resources/datasheets" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <Datasheets />
        </Suspense>
      )} />
      {Object.entries(resourcePageData).map(([key, data]) => (
        <Route key={key} path={`/resources/${key}`} component={() => (
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <GenericServicePage {...data} />
          </Suspense>
        )} />
      ))}
      
      {/* About Pages */}
      <Route path="/about/mission-values" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <MissionValues />
        </Suspense>
      )} />
      <Route path="/about/team" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <Team />
        </Suspense>
      )} />
      <Route path="/about/compliance" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <Compliance />
        </Suspense>
      )} />
      <Route path="/about/support" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <SupportPage />
        </Suspense>
      )} />
      <Route path="/about/insurance" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <Insurance />
        </Suspense>
      )} />
      
      {/* Support Pages */}
      <Route path="/support/submit-ticket" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <SubmitTicket />
        </Suspense>
      )} />
      <Route path="/support/knowledge-base" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <KnowledgeBase />
        </Suspense>
      )} />
      <Route path="/support/remote-support" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <RemoteSupport />
        </Suspense>
      )} />
      <Route path="/support/pay-invoice" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <PayInvoice />
        </Suspense>
      )} />
      {Object.entries(supportPageData).map(([key, data]) => (
        <Route key={key} path={`/support/${key}`} component={() => (
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <GenericServicePage {...data} />
          </Suspense>
        )} />
      ))}
      
      {/* Legal Pages */}
      <Route path="/legal/privacy-policy" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <PrivacyPolicy />
        </Suspense>
      )} />
      <Route path="/legal/terms-of-use" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <TermsOfUse />
        </Suspense>
      )} />
      <Route path="/legal/msa" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <MSA />
        </Suspense>
      )} />
      <Route path="/legal/sla" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <SLA />
        </Suspense>
      )} />
      <Route path="/legal/aup" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <AUP />
        </Suspense>
      )} />
      <Route path="/legal/dpa" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <DPA />
        </Suspense>
      )} />
      <Route path="/legal/sample-sow" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <SampleSOW />
        </Suspense>
      )} />
      
      {/* Trust Pages */}
      <Route path="/trust/trust-center" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <TrustCenter />
        </Suspense>
      )} />
      <Route path="/trust/vulnerability-disclosure" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <VulnerabilityDisclosure />
        </Suspense>
      )} />
      <Route path="/trust/accessibility" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <Accessibility />
        </Suspense>
      )} />
      
      {/* Location Pages */}
      <Route path="/locations/chandler-az" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <ChandlerAZ />
        </Suspense>
      )} />
      <Route path="/locations/phoenix-az" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <PhoenixAZ />
        </Suspense>
      )} />
      <Route path="/locations/mesa-az" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <MesaAZ />
        </Suspense>
      )} />
      <Route path="/locations/gilbert-az" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <GilbertAZ />
        </Suspense>
      )} />
      <Route path="/locations/tempe-az" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <TempeAZ />
        </Suspense>
      )} />
      <Route path="/locations/scottsdale-az" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <ScottsdalAZ />
        </Suspense>
      )} />
      
      {/* Portal Pages */}
      <Route path="/portal/login" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <PortalLogin />
        </Suspense>
      )} />
      <Route path="/portal/signup" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <PortalSignup />
        </Suspense>
      )} />
      <Route path="/portal/dashboard" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <PortalDashboard />
        </Suspense>
      )} />
      <Route path="/portal/tickets" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <PortalTickets />
        </Suspense>
      )} />
      <Route path="/portal/tickets/create" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <PortalCreateTicket />
        </Suspense>
      )} />
      <Route path="/portal/tickets/:id" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <PortalTicketDetail />
        </Suspense>
      )} />
      <Route path="/portal/services" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <PortalServices />
        </Suspense>
      )} />
      <Route path="/portal/invoices" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
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
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <PortalPayment
              invoiceId={invoice.id}
              invoiceNumber={invoice.invoiceNumber}
              amount={invoice.amount}
            />
          </Suspense>
        );
      }} />
      <Route path="/portal/kb" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <PortalKB />
        </Suspense>
      )} />
      <Route path="/portal/status" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <PortalStatus />
        </Suspense>
      )} />
      <Route path="/portal/learning" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <PortalLearning />
        </Suspense>
      )} />
      <Route path="/portal/chat" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <PortalChat />
        </Suspense>
      )} />
      <Route path="/portal/agent" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <PortalAgent />
        </Suspense>
      )} />
      <Route path="/portal/settings" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <PortalSettings />
        </Suspense>
      )} />
      <Route path="/portal/ship-center" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <PortalShipCenter />
        </Suspense>
      )} />
      <Route path="/portal/procurement" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <PortalProcurementStore />
        </Suspense>
      )} />
      <Route path="/portal/forms" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <PortalAdvancedForms />
        </Suspense>
      )} />
      <Route path="/portal/surveys" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <PortalSatisfactionSurvey />
        </Suspense>
      )} />
      <Route path="/portal/approvals" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <PortalApprovals />
        </Suspense>
      )} />
      <Route path="/portal/vpn" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <PortalVPN />
        </Suspense>
      )} />
      <Route path="/portal/cytracom" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <PortalCytracom />
        </Suspense>
      )} />
      <Route path="/portal/questionnaires" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <PortalQuestionnaireCalendar />
        </Suspense>
      )} />
      <Route path="/portal/admin/import" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <AdminImportPage />
        </Suspense>
      )} />
      <Route path="/portal/admin/agents" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <AdminAgentsPage />
        </Suspense>
      )} />
      <Route path="/portal/admin/openai" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <AdminOpenAIPage />
        </Suspense>
      )} />
      
      {/* Lead Quote */}
      <Route path="/quote-wizard" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <LeadQuoteWizard />
        </Suspense>
      )} />
      <Route path="/quote-confirmation" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <QuoteConfirmation />
        </Suspense>
      )} />
      <Route path="/thank-you-success-page" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <ThankYouSuccess />
        </Suspense>
      )} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
