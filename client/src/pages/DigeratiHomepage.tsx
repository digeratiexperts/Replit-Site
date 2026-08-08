import { MegaMenu } from "@/components/MegaMenu";
import { FullPageScrollProvider, ScrollSectionAuto } from "@/components/FullPageScroll";
import { useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/JsonLd";
import { ModernHeroSection } from "./sections/ModernHeroSection";
import { HomepageTrustRail } from "./sections/HomepageTrustRail";
import { DigeratiStatsSection } from "./sections/DigeratiStatsSection";
import { HomepageEngagementSection } from "./sections/HomepageEngagementSection";
import { HomepageOutcomesSection } from "./sections/HomepageOutcomesSection";
import { DigeratiPricingSection } from "./sections/DigeratiPricingSection";
import { HomepageHowItWorks } from "./sections/HomepageHowItWorks";
import { HomepageProofSection } from "./sections/HomepageProofSection";
import { DigeratiIndustriesSection } from "./sections/DigeratiIndustriesSection";
import { DigeratiCTASection } from "./sections/DigeratiCTASection";
import { DigeratiContactSection } from "./sections/DigeratiContactSection";
import { DigeratiEnhancedFooterSection } from "./sections/DigeratiEnhancedFooterSection";

/** Compact buyer journey — calculators / threat feeds / newsletter moved off homepage. */
const homepageSections: { id: string; label: string; theme: "dark" | "light"; showInNav?: boolean }[] = [
  { id: "hero", label: "Home", theme: "dark" },
  { id: "trust-rail", label: "Why DE", theme: "dark" },
  { id: "industry-context", label: "Context", theme: "dark", showInNav: false },
  { id: "engage", label: "Engage", theme: "dark" },
  { id: "outcomes", label: "Outcomes", theme: "dark" },
  { id: "pricing", label: "Packages", theme: "dark" },
  { id: "how-it-works", label: "Process", theme: "dark" },
  { id: "proof", label: "Trust", theme: "dark" },
  { id: "industries", label: "Industries", theme: "dark" },
  { id: "contact", label: "Next step", theme: "dark" },
];

export const DigeratiHomepage = (): JSX.Element => {
  useSEO({
    title: "Cybersecurity-First Managed IT for Arizona Businesses",
    description:
      "Digerati Experts delivers managed IT and cybersecurity in one accountable operating model for Arizona businesses. Schedule a Cyber Risk Assessment to prioritize risk, recovery, and day-to-day IT.",
    canonical: "/",
  });

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const targetId = hash.replace("#", "");
    const timer = setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <FullPageScrollProvider sections={homepageSections} enableOnMobile={false}>
      <div className="min-h-screen bg-[#050312] pb-20 lg:pb-24">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <MegaMenu />

        <ScrollSectionAuto id="hero">
          <ModernHeroSection />
        </ScrollSectionAuto>

        <ScrollSectionAuto id="trust-rail">
          <HomepageTrustRail />
        </ScrollSectionAuto>

        <ScrollSectionAuto id="industry-context">
          <DigeratiStatsSection />
        </ScrollSectionAuto>

        <ScrollSectionAuto id="engage">
          <HomepageEngagementSection />
        </ScrollSectionAuto>

        <ScrollSectionAuto id="outcomes">
          <HomepageOutcomesSection />
        </ScrollSectionAuto>

        <ScrollSectionAuto id="pricing">
          <DigeratiPricingSection />
        </ScrollSectionAuto>

        <ScrollSectionAuto id="how-it-works">
          <HomepageHowItWorks />
        </ScrollSectionAuto>

        <ScrollSectionAuto id="proof">
          <HomepageProofSection />
        </ScrollSectionAuto>

        <ScrollSectionAuto id="industries">
          <DigeratiIndustriesSection />
        </ScrollSectionAuto>

        <ScrollSectionAuto id="contact" className="scroll-mt-20 pt-8">
          <DigeratiCTASection />
          <DigeratiContactSection />
          <DigeratiEnhancedFooterSection />
        </ScrollSectionAuto>
      </div>
    </FullPageScrollProvider>
  );
};
