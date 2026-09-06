import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AnnouncerProvider } from "@/components/AccessibleAnnouncer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { MarketingChrome } from "@/components/MarketingChrome";
import { SiteBottomBar } from "@/components/SiteBottomBar";
import { StickyCTABar } from "@/components/StickyCTABar";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { StagingReviewBadge } from "@/components/StagingReviewBadge";
import { BookingProvider } from "@/contexts/BookingContext";
import { BookingModal } from "@/components/BookingModal";
import { useGlobalShortcuts } from "@/hooks/useKeyboardShortcuts";
import { DigeratiHomepageChallenger } from "./DigeratiHomepageChallenger";

function ChallengerContent() {
  useGlobalShortcuts();

  return (
    <AnnouncerProvider>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <ScrollProgress />
      <div id="main-content" className="de-site-canvas">
        <DigeratiHomepageChallenger />
      </div>
      <MarketingChrome />
      <SiteBottomBar />
      <StickyCTABar />
      <ExitIntentPopup delay={5000} />
      <CookieConsentBanner />
      <StagingReviewBadge />
    </AnnouncerProvider>
  );
}

/**
 * Review-only entry shell for /homepage-challenger.
 * It mirrors the normal marketing providers/chrome without modifying App.tsx
 * or the canonical homepage route.
 */
export default function HomepageChallengerApp() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <BookingProvider>
            <TooltipProvider>
              <Toaster />
              <BookingModal />
              <ChallengerContent />
            </TooltipProvider>
          </BookingProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
