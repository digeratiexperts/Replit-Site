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
const CaseStudies = lazy(() => import("@/pages/resources/CaseStudies"));
const MissionValues = lazy(() => import("@/pages/about/MissionValues"));
const Team = lazy(() => import("@/pages/about/Team"));
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

// Portal pages
const PortalLogin = lazy(() => import("@/pages/portal/PortalLogin"));
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
const PortalAdvancedForms = lazy(() => import("@/pages/portal/PortalAdvancedForms"));
const PortalSatisfactionSurvey = lazy(() => import("@/pages/portal/PortalSatisfactionSurvey"));
const PortalApprovals = lazy(() => import("@/pages/portal/PortalApprovals"));

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
      <Route path="/industries/law-firms" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <GenericServicePage 
            title="IT Solutions for Law Firms"
            subtitle="Secure document management and compliance for legal practices"
            description="Law firms handle sensitive client information and need secure, reliable IT systems that protect client confidentiality while meeting regulatory requirements."
            features={[
              { title: "Secure Document Management", description: "Encrypted storage and sharing of sensitive legal documents" },
              { title: "Compliance Support", description: "Meet ABA and state bar IT security requirements" },
              { title: "E-Discovery Ready", description: "Systems configured for litigation support and e-discovery" }
            ]}
            benefits={[
              "Client privilege protection",
              "Secure client communications",
              "Audit trails and access logs",
              "Disaster recovery planning"
            ]}
            gradientColors="from-slate-700 via-slate-800 to-gray-900"
          />
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
      
      {/* Support Pages */}
      <Route path="/support/submit-ticket" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <SubmitTicket />
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
      
      {/* Portal Pages */}
      <Route path="/portal/login" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <PortalLogin />
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
