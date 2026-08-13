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

// Live digeratexperts.com story order.
// Extra working-branch sections stay on-page with showInNav:false.
const homepageSections: { id: string; label: string; theme: 'dark' | 'light'; showInNav?: boolean }[] = [
  { id: 'hero', label: 'Home', theme: 'dark' },
  { id: 'stats', label: 'Threats', theme: 'dark' },
  { id: 'challenges', label: 'Problems', theme: 'dark', showInNav: false },
  { id: 'services', label: 'Engage', theme: 'dark' },
  { id: 'protection', label: 'Protect', theme: 'light', showInNav: false },
  { id: 'testimonials', label: 'Proof', theme: 'dark', showInNav: false },
  { id: 'trust', label: 'Trust', theme: 'light', showInNav: false },
  { id: 'team', label: 'Team', theme: 'dark', showInNav: false },
  { id: 'industries', label: 'Industries', theme: 'dark' },
  { id: 'pricing', label: 'Packages', theme: 'dark' },
  { id: 'insights', label: 'Insights', theme: 'dark', showInNav: false },
  { id: 'faq', label: 'FAQ', theme: 'light', showInNav: false },
  { id: 'cta', label: 'Next step', theme: 'dark', showInNav: false },
  { id: 'contact', label: 'Contact', theme: 'dark' },
];

export const DigeratiHomepage = (): JSX.Element => {
  useSEO({
    title: 'Managed Security Service Provider',
    description: "Arizona MSP/MSSP. Cybersecurity-first managed IT, 24/7 operations, and a Cyber Risk Assessment that matches the operating model to your environment.",
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
      {/* Ask DE sits bottom-right; extra lift only while the cookie banner is visible */}
      <div className="de-dark-well min-h-screen pb-8">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        {/* Navigation — chat lives in App MarketingChrome sitewide */}
        <MegaMenu />

        {/* Home — Cybersecurity-First hero + Assessment / Talk to Expert CTAs */}
        <ScrollSectionAuto id="hero">
          <ModernHeroSection />
          <DigeratiAlertBanner />
        </ScrollSectionAuto>

        {/* Why DE */}
        <ScrollSectionAuto id="stats">
          <DigeratiStatsSection />
        </ScrollSectionAuto>

        {/* Problems */}
        <ScrollSectionAuto id="challenges">
          <DigeratiWhatWeTackleSection />
        </ScrollSectionAuto>

        {/* Engage */}
        <ScrollSectionAuto id="services">
          <DigeratiServicesSection />
        </ScrollSectionAuto>

        {/* What we protect + how */}
        <ScrollSectionAuto id="protection">
          <DigeratiHowWeProtectSection />
        </ScrollSectionAuto>

        {/* Proof — honest shells (no fabricated quotes) */}
        <ScrollSectionAuto id="testimonials">
          <DigeratiTestimonialsSection />
          <HomepageProofSection />
        </ScrollSectionAuto>

        <ScrollSectionAuto id="trust">
          <DigeratiTrustPhotoSection />
        </ScrollSectionAuto>

        <ScrollSectionAuto id="team">
          <DigeratiMeetExpertsSection />
        </ScrollSectionAuto>

        {/* Industries */}
        <ScrollSectionAuto id="industries">
          <DigeratiIndustriesSection />
        </ScrollSectionAuto>

        {/* Packages — fit-based operating models */}
        <ScrollSectionAuto id="pricing">
          <DigeratiPricingSection />
        </ScrollSectionAuto>

        {/* Pricing tools relocated to /proactive-ecosystem-pricing#pricing-tools */}

        {/* Insights + AI teasers — full versions live on Resources */}
        <ScrollSectionAuto id="insights">
          <DigeratiThreatsInsightsSection />
          <DigeratiAIAssistanceSection />
        </ScrollSectionAuto>

        {/* Lead form below the fold — hero stays a single Schedule CTA */}
        <DigeratiLeadFormSection />

        {/* FAQ before Next step — live cleanness */}
        <ScrollSectionAuto id="faq">
          <DigeratiFAQSection />
          <DigeratiNewsletterSection />
        </ScrollSectionAuto>

        {/* Next step */}
        <ScrollSectionAuto id="cta">
          <DigeratiCTASection />
        </ScrollSectionAuto>

        {/* Contact */}
        <ScrollSectionAuto id="contact" className="scroll-mt-20 pt-8">
          <DigeratiContactSection />
          <DigeratiEnhancedFooterSection />
        </ScrollSectionAuto>
      </div>
    </FullPageScrollProvider>
  );
};