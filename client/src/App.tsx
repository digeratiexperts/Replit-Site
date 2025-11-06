import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { lazy, Suspense } from "react";

import { DigeratiHomepage } from "@/pages/DigeratiHomepage";

const ManagedITSupport = lazy(() => import("@/pages/solutions/ManagedITSupport"));
const Healthcare = lazy(() => import("@/pages/industries/Healthcare"));
const CaseStudies = lazy(() => import("@/pages/resources/CaseStudies"));
const MissionValues = lazy(() => import("@/pages/about/MissionValues"));
const Team = lazy(() => import("@/pages/about/Team"));
const PrivacyPolicy = lazy(() => import("@/pages/legal/PrivacyPolicy"));
const TermsOfUse = lazy(() => import("@/pages/legal/TermsOfUse"));
const SubmitTicket = lazy(() => import("@/pages/support/SubmitTicket"));
const GenericServicePage = lazy(() => import("@/pages/GenericServicePage"));

import { servicePageData, industryPageData, resourcePageData, supportPageData } from "@/pages/routes/servicePages";

function Router() {
  return (
    <Switch>
      {/* Homepage */}
      <Route path="/" component={DigeratiHomepage} />
      
      {/* Solutions Pages */}
      <Route path="/solutions/managed-it-support" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <ManagedITSupport />
        </Suspense>
      )} />
      <Route path="/solutions/office-package" component={() => (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <GenericServicePage 
            title="Office Package"
            subtitle="Complete IT management for small offices"
            description="Our Office Package provides comprehensive IT support and management for small businesses. Get enterprise-level IT without the enterprise cost."
            features={[
              { title: "Help Desk Support", description: "Unlimited support tickets with 15-minute response time" },
              { title: "Proactive Monitoring", description: "24/7 monitoring of your critical systems" },
              { title: "Regular Maintenance", description: "Scheduled updates and preventive maintenance" }
            ]}
            benefits={[
              "Predictable monthly costs",
              "No IT staff needed",
              "Expert support when you need it",
              "Regular system maintenance"
            ]}
          />
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
