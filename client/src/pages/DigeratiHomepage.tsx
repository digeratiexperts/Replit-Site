import { MegaMenu } from "@/components/MegaMenu";
import { FullPageScrollProvider, ScrollSectionAuto } from "@/components/FullPageScroll";
import { HomepageSectionDock } from "@/components/HomepageSectionNav";
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
  { id: 'stats', label: 'Why DE', theme: 'dark' },
  { id: 'challenges', label: 'Problems', theme: 'dark', showInNav: false },
  { id: 'services', label: 'Engage', theme: 'dark' },
  { id: 'protection', label: 'Protect', theme: 'light', showInNav: false },
  { id: 'testimonials', label: 'Proof', theme: 'dark', showInNav: false },
  { id: 'trust', label: 'Trust', theme: 'light', showInNav: false },
  { id: 'team', label: 'Team', theme: 'dark', showInNav: false },
  { id: 'industries', label: 'Industries', theme: 'dark' },
  { id: 'pricing', label: 'Packages', theme: 'dark' },
  { id: 'insights', label: 'Insights', theme: 'dark', showInNav: false },
  { id: 'faq', label: 'FAQ', theme: 'light' },
  { id: 'cta', label: 'Next step', theme: 'dark', showInNav: false },
  { id: 'contact', label: 'Contact', theme: 'dark' },
];

export const DigeratiHomepage = (): JSX.Element => {
  useSEO({
    title: 'Managed Security Service Provider',
    description: "Arizona MSP/MSSP. Cybersecurity-first managed IT, 24/7 operations, and a Cyber Risk Assessment that matches the operating model to your environment.",
    canonical: '/',
  });

  return (
    <FullPageScrollProvider sections={homepageSections} enableOnMobile={false}>
      {/* Live shade well + A+C canvas base. Ask DE sits bottom-right. */}
      <div className="de-dark-well min-h-screen bg-[#050312] pb-8">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        {/* Navigation — chat lives in App MarketingChrome sitewide */}
        <MegaMenu />
        <HomepageSectionDock />

        {/* Home — Cybersecurity-First hero + Assessment / Talk to Expert CTAs */}
        <ScrollSectionAuto id="hero" chapter>
          <ModernHeroSection />
          <DigeratiAlertBanner />
        </ScrollSectionAuto>

<<<<<<< HEAD
        {/* Why DE */}
        <ScrollSectionAuto id="stats" chapter>
          <DigeratiStatsSection />
        </ScrollSectionAuto>

        {/* Problems */}
        <ScrollSectionAuto id="challenges">
          <DigeratiWhatWeTackleSection />
        </ScrollSectionAuto>

        {/* Engage */}
        <ScrollSectionAuto id="services" chapter>
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
        <ScrollSectionAuto id="industries" chapter>
          <DigeratiIndustriesSection />
        </ScrollSectionAuto>

        {/* Packages — fit-based operating models */}
        <ScrollSectionAuto id="pricing" chapter>
          <DigeratiPricingSection />
        </ScrollSectionAuto>

        {/* Pricing tools relocated to /proactive-ecosystem-pricing#pricing-tools */}

        {/* Insights + AI teasers — full versions live on Resources */}
        <ScrollSectionAuto id="insights">
          <DigeratiThreatsInsightsSection />
          <DigeratiAIAssistanceSection />
        </ScrollSectionAuto>

        <DigeratiLeadFormSection />

        {/* FAQ before Next step — live cleanness */}
        <ScrollSectionAuto id="faq" chapter>
          <DigeratiFAQSection />
          <DigeratiNewsletterSection />
        </ScrollSectionAuto>

        {/* Next step */}
        <ScrollSectionAuto id="cta">
          <DigeratiCTASection />
        </ScrollSectionAuto>

        {/* Contact */}
        <ScrollSectionAuto id="contact" chapter className="scroll-mt-20 pt-8">
          <DigeratiContactSection />
          <DigeratiEnhancedFooterSection />
        </ScrollSectionAuto>
      </div>
    </FullPageScrollProvider>
  );
};
