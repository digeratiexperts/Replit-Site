import { MegaMenu } from "@/components/MegaMenu";
import { FullPageScrollProvider, ScrollSectionAuto } from "@/components/FullPageScroll";
import { useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/JsonLd";

// Import all section components
import { ModernHeroSection } from "./sections/ModernHeroSection";
import { DigeratiAlertBanner } from "./sections/DigeratiAlertBanner";
import { DigeratiServicesSection } from "./sections/DigeratiServicesSection";
import { DigeratiHowWeProtectSection } from "./sections/DigeratiHowWeProtectSection";
import { DigeratiLeadFormSection } from "./sections/DigeratiLeadFormSection";
import { DigeratiWhatWeTackleSection } from "./sections/DigeratiWhatWeTackleSection";
import { DigeratiThreatsInsightsSection } from "./sections/DigeratiThreatsInsightsSection";
import { DigeratiAIAssistanceSection } from "./sections/DigeratiAIAssistanceSection";
import { DigeratiIndustriesSection } from "./sections/DigeratiIndustriesSection";
import { DigeratiPricingSection } from "./sections/DigeratiPricingSection";
import { DigeratiTestimonialsSection } from "./sections/DigeratiTestimonialsSection";
import { HomepageProofSection } from "./sections/HomepageProofSection";
import { DigeratiMeetExpertsSection } from "./sections/DigeratiMeetExpertsSection";
import { DigeratiFAQSection } from "./sections/DigeratiFAQSection";
import { DigeratiCTASection } from "./sections/DigeratiCTASection";
import { DigeratiNewsletterSection } from "./sections/DigeratiNewsletterSection";
// PremiumCTASection removed - keeping only one CTA section
import { DigeratiContactSection } from "./sections/DigeratiContactSection";
import { DigeratiEnhancedFooterSection } from "./sections/DigeratiEnhancedFooterSection";
import { DigeratiStatsSection } from "./sections/DigeratiStatsSection";
import { DigeratiTrustPhotoSection } from "./sections/DigeratiTrustPhotoSection";

// Live digeratexperts.com story order for sticky-bar cleanness.
// Extra working-branch sections stay on-page with showInNav:false.
const homepageSections: { id: string; label: string; theme: 'dark' | 'light'; showInNav?: boolean }[] = [
  { id: 'hero', label: 'Home', theme: 'dark' },
  { id: 'stats', label: 'Why DE', theme: 'dark' },
  { id: 'challenges', label: 'Problems', theme: 'dark', showInNav: false },
  { id: 'services', label: 'Engage', theme: 'dark' },
  { id: 'protection', label: 'Protect', theme: 'light', showInNav: false },
  { id: 'pricing', label: 'Packages', theme: 'dark' },
  { id: 'industries', label: 'Industries', theme: 'dark' },
  { id: 'trust', label: 'Trust', theme: 'light', showInNav: false },
  { id: 'team', label: 'Team', theme: 'dark', showInNav: false },
  { id: 'testimonials', label: 'Proof', theme: 'dark', showInNav: false },
  { id: 'insights', label: 'Insights', theme: 'dark', showInNav: false },
  { id: 'faq', label: 'FAQ', theme: 'light', showInNav: false },
  { id: 'cta', label: 'Next step', theme: 'dark', showInNav: false },
  { id: 'contact', label: 'Contact', theme: 'dark' },
];

export const DigeratiHomepage = (): JSX.Element => {
  useSEO({
    title: 'Managed Security Service Provider',
    description: "Arizona's trusted MSP/MSSP. Get 24/7 cybersecurity monitoring, managed IT services, and compliance support for small-to-medium businesses. Free penetration test available.",
    canonical: '/',
  });

  // Handle hash navigation - scroll to anchor when navigating from other pages
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const targetId = hash.replace('#', '');
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <FullPageScrollProvider sections={homepageSections} enableOnMobile={false}>
      {/* pb clears fixed bottom section dock so content isn't clipped */}
      <div className="min-h-screen bg-[#050312] pb-28 lg:pb-32">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        {/* Navigation — chat lives in App MarketingChrome sitewide */}
        <MegaMenu />

        {/* Home — Cybersecurity-First hero + Assessment / Talk to Expert CTAs */}
        <ScrollSectionAuto id="hero">
          <ModernHeroSection />
          <DigeratiAlertBanner />
        </ScrollSectionAuto>

        {/* Why DE — dock clearance on each section */}
        <ScrollSectionAuto id="stats" className="pb-20 lg:pb-24">
          <DigeratiStatsSection />
        </ScrollSectionAuto>

        {/* Problems */}
        <ScrollSectionAuto id="challenges" className="pb-20 lg:pb-24">
          <DigeratiWhatWeTackleSection />
        </ScrollSectionAuto>

        {/* Engage */}
        <ScrollSectionAuto id="services" className="pb-20 lg:pb-24">
          <DigeratiServicesSection />
        </ScrollSectionAuto>

        {/* Kept from working branch — not in live sticky bar */}
        <ScrollSectionAuto id="protection" className="pb-20 lg:pb-24">
          <DigeratiHowWeProtectSection />
        </ScrollSectionAuto>

        {/* Packages */}
        <ScrollSectionAuto id="pricing" className="pb-20 lg:pb-24">
          <DigeratiPricingSection />
        </ScrollSectionAuto>

        {/* Pricing tools relocated to /proactive-ecosystem-pricing#pricing-tools */}

        {/* Industries */}
        <ScrollSectionAuto id="industries" className="pb-20 lg:pb-24">
          <DigeratiIndustriesSection />
        </ScrollSectionAuto>

        {/* Trust imagery — feeds Proof story, hidden from sticky bar */}
        <ScrollSectionAuto id="trust" className="pb-20 lg:pb-24">
          <DigeratiTrustPhotoSection />
        </ScrollSectionAuto>

        {/* Meet the Experts — human trust */}
        <ScrollSectionAuto id="team" className="pb-20 lg:pb-24">
          <DigeratiMeetExpertsSection />
        </ScrollSectionAuto>

        {/* Proof — honest shells (no fabricated quotes) */}
        <ScrollSectionAuto id="testimonials" className="pb-20 lg:pb-24">
          <DigeratiTestimonialsSection />
          <HomepageProofSection />
        </ScrollSectionAuto>

        {/* Kept from working branch — not in live sticky bar */}
        <ScrollSectionAuto id="insights" className="pb-20 lg:pb-24">
          <DigeratiThreatsInsightsSection />
          <DigeratiAIAssistanceSection />
        </ScrollSectionAuto>

        {/* Lead form below the fold — hero stays a single Schedule CTA */}
        <DigeratiLeadFormSection />

        {/* FAQ before Next step — live cleanness */}
        <ScrollSectionAuto id="faq" className="pb-20 lg:pb-24">
          <DigeratiFAQSection />
          <DigeratiNewsletterSection />
        </ScrollSectionAuto>

        {/* Next step */}
        <ScrollSectionAuto id="cta" className="pb-20 lg:pb-24">
          <DigeratiCTASection />
        </ScrollSectionAuto>

        {/* Contact */}
        <ScrollSectionAuto id="contact" className="scroll-mt-20 pt-8 pb-20 lg:pb-24">
          <DigeratiContactSection />
          <DigeratiEnhancedFooterSection />
        </ScrollSectionAuto>
      </div>
    </FullPageScrollProvider>
  );
};