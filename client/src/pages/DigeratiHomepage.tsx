import { MegaMenu } from "@/components/MegaMenu";
import { FullPageScrollProvider, ScrollSectionAuto } from "@/components/FullPageScroll";
import { SiteBottomBar } from "@/components/SiteBottomBar";
import { useSEO } from "@/hooks/useSEO";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/JsonLd";

// Canonical homepage sections are reused so the challenger is a true copy of
// the current experience, not a disconnected mockup. Challenger-only pieces
// live beside them and can be swapped independently after review.
import { ReferenceHeroSection } from "./sections/ReferenceHeroSection";
import { DigeratiAlertBanner } from "./sections/DigeratiAlertBanner";
import { DigeratiServicesSection } from "./sections/DigeratiServicesSection";
import { DigeratiHowWeProtectSection } from "./sections/DigeratiHowWeProtectSection";
import { DigeratiLeadFormSection } from "./sections/DigeratiLeadFormSection";
import { DigeratiWhatWeTackleSection } from "./sections/DigeratiWhatWeTackleSection";
import { DigeratiAIAssistanceSection } from "./sections/DigeratiAIAssistanceSection";
import { DigeratiIndustriesSection } from "./sections/DigeratiIndustriesSection";
import { DigeratiPricingSection } from "./sections/DigeratiPricingSection";
import { DigeratiTestimonialsSection } from "./sections/DigeratiTestimonialsSection";
import { HomepageProofSection } from "./sections/HomepageProofSection";
import { DigeratiMeetExpertsSection } from "./sections/DigeratiMeetExpertsSection";
import { DigeratiFAQSection } from "./sections/DigeratiFAQSection";
import { DigeratiNewsletterSection } from "./sections/DigeratiNewsletterSection";
import { DigeratiContactSection } from "./sections/DigeratiContactSection";
import { DigeratiEnhancedFooterSection } from "./sections/DigeratiEnhancedFooterSection";
import { DigeratiStatsSection } from "./sections/DigeratiStatsSection";
import { DigeratiTrustPhotoSection } from "./sections/DigeratiTrustPhotoSection";
import { DigeratiCTASectionChallenger } from "./sections/DigeratiCTASectionChallenger";
import { DigeratiResourceRailChallenger } from "./sections/DigeratiResourceRailChallenger";

// Challenger story order.
// The current production homepage remains untouched on main. This branch moves
// buying-decision content forward, moves generic urgency/statistics later, and
// collapses duplicated trust/team storytelling into one continuous chapter.
const homepageSections: { id: string; label: string; theme: 'dark' | 'light'; showInNav?: boolean }[] = [
  { id: 'hero', label: 'Home', theme: 'dark' },
  { id: 'challenges', label: 'Problems', theme: 'light', showInNav: false },
  { id: 'services', label: 'How It Works', theme: 'dark' },
  { id: 'pricing', label: 'Packages', theme: 'dark' },
  { id: 'protection', label: 'Protect', theme: 'light', showInNav: false },
  { id: 'testimonials', label: 'Proof', theme: 'dark', showInNav: false },
  { id: 'trust', label: 'Why DE', theme: 'light', showInNav: false },
  { id: 'industries', label: 'Industries', theme: 'dark' },
  { id: 'operations', label: 'Operations', theme: 'dark', showInNav: false },
  { id: 'stats', label: 'Risk', theme: 'dark', showInNav: false },
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

  return (
    <FullPageScrollProvider sections={homepageSections} enableOnMobile={false}>
      <div className="de-dark-well min-h-screen bg-[#050312] pb-8">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <MegaMenu />
        <SiteBottomBar />

        {/* 1. Establish the offer and the immediate next step. */}
        <ScrollSectionAuto id="hero" chapter>
          <ReferenceHeroSection />
          <DigeratiAlertBanner />
        </ScrollSectionAuto>

        {/* 2. Start with the prospect's problems, not generic industry statistics. */}
        <ScrollSectionAuto id="challenges">
          <DigeratiWhatWeTackleSection />
        </ScrollSectionAuto>

        {/* 3. Explain how a prospect can engage DE. */}
        <ScrollSectionAuto id="services" chapter>
          <DigeratiServicesSection />
        </ScrollSectionAuto>

        {/* 4. Show the operating-model fit while intent is high. */}
        <ScrollSectionAuto id="pricing" chapter>
          <DigeratiPricingSection />
        </ScrollSectionAuto>

        {/* Pricing tools remain at /proactive-ecosystem-pricing#pricing-tools. */}

        {/* 5. Explain the control surface behind those operating models. */}
        <ScrollSectionAuto id="protection">
          <DigeratiHowWeProtectSection />
        </ScrollSectionAuto>

        {/* 6. Prove it before adding more company narrative. */}
        <ScrollSectionAuto id="testimonials">
          <DigeratiTestimonialsSection />
          <HomepageProofSection />
        </ScrollSectionAuto>

        {/* 7. One continuous trust chapter instead of separate trust/team resets. */}
        <ScrollSectionAuto id="trust">
          <DigeratiTrustPhotoSection />
          <DigeratiMeetExpertsSection />
        </ScrollSectionAuto>

        {/* 8. Show who the model is designed to support. */}
        <ScrollSectionAuto id="industries" chapter>
          <DigeratiIndustriesSection />
        </ScrollSectionAuto>

        {/* 9. Operational differentiation: technology surfaces signals; people own outcomes. */}
        <ScrollSectionAuto id="operations">
          <DigeratiAIAssistanceSection />
        </ScrollSectionAuto>

        {/*
          Recent Threats & Insights no longer duplicates a live feed on the homepage.
          The live stream stays fully available at /resources/security-updates and
          broader editorial guidance stays at /resources/blog.
        */}
        <DigeratiResourceRailChallenger />

        {/* 10. Urgency/statistics now support an understood offer instead of interrupting it. */}
        <ScrollSectionAuto id="stats">
          <DigeratiStatsSection />
        </ScrollSectionAuto>

        {/* Existing Cyber Risk Assessment form is intentionally unchanged. */}
        <DigeratiLeadFormSection />

        {/* Existing FAQ and newsletter capture are intentionally unchanged. */}
        <ScrollSectionAuto id="faq" chapter>
          <DigeratiFAQSection />
          <DigeratiNewsletterSection />
        </ScrollSectionAuto>

        {/* Compact next-step band; email capture behavior remains intact. */}
        <ScrollSectionAuto id="cta">
          <DigeratiCTASectionChallenger />
        </ScrollSectionAuto>

        {/* Existing bottom Get in Touch form remains untouched for later review. */}
        <ScrollSectionAuto id="contact" chapter className="scroll-mt-20">
          <DigeratiContactSection />
          <DigeratiEnhancedFooterSection />
        </ScrollSectionAuto>
      </div>
    </FullPageScrollProvider>
  );
};
