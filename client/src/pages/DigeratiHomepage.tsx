import { MegaMenu } from "@/components/MegaMenu";
import { SimpleDivider } from "@/components/SimpleDivider";
import { FullPageScrollProvider, ScrollSectionAuto } from "@/components/FullPageScroll";
import { useState, useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/JsonLd";

// Import all section components
import { ModernHeroSection } from "./sections/ModernHeroSection";
import { DigeratiAlertBanner } from "./sections/DigeratiAlertBanner";
import { DigeratiServicesSection } from "./sections/DigeratiServicesSection";
import { DigeratiHowWeProtectSection } from "./sections/DigeratiHowWeProtectSection";
import { DigeratiCalculatorsSection } from "./sections/DigeratiCalculatorsSection";
import { DigeratiLeadFormSection } from "./sections/DigeratiLeadFormSection";
import { DigeratiWhatWeTackleSection } from "./sections/DigeratiWhatWeTackleSection";
import { DigeratiThreatsInsightsSection } from "./sections/DigeratiThreatsInsightsSection";
import { DigeratiAIAssistanceSection } from "./sections/DigeratiAIAssistanceSection";
import { DigeratiIndustriesSection } from "./sections/DigeratiIndustriesSection";
import { DigeratiPricingSection } from "./sections/DigeratiPricingSection";
import { DigeratiTestimonialsSection } from "./sections/DigeratiTestimonialsSection";
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
  { id: 'challenges', label: 'Problems', theme: 'dark' },
  { id: 'services', label: 'Engage', theme: 'dark' },
  { id: 'protection', label: 'Protect', theme: 'light' },
  { id: 'pricing', label: 'Packages', theme: 'dark' },
  { id: 'calculators', label: 'Assessment', theme: 'dark' },
  { id: 'industries', label: 'Industries', theme: 'dark' },
  { id: 'trust', label: 'Trust', theme: 'light', showInNav: false },
  { id: 'team', label: 'Team', theme: 'dark' },
  { id: 'testimonials', label: 'Proof', theme: 'dark' },
  { id: 'insights', label: 'Insights', theme: 'dark', showInNav: false },
  { id: 'faq', label: 'FAQ', theme: 'light' },
  { id: 'cta', label: 'Next step', theme: 'dark' },
  { id: 'contact', label: 'Contact', theme: 'dark' },
];

// Industry multiplier lookup table - maps unique keys to exact multiplier values
const industryMultipliers: Record<string, number> = {
  'law-firm': 2.0,
  'cpa-firm': 1.8,
  'medical': 2.5,
  'general-office': 1.6,
  'real-estate': 1.6,
  'animal-hospital': 2.2,
  'retail': 1.7,
  'manufacturing': 2.0,
  'nonprofit': 1.5,
};

export const DigeratiHomepage = (): JSX.Element => {
  useSEO({
    title: 'Managed Security Service Provider',
    description: "Arizona's trusted MSP/MSSP. Get 24/7 cybersecurity monitoring, managed IT services, and compliance support for small-to-medium businesses. Free penetration test available.",
    canonical: '/',
  });

  // State for calculators - managed here as it's shared between calculator sections
  const [employees, setEmployees] = useState(10);
  const [hourlyWage, setHourlyWage] = useState(50);
  const [downtime, setDowntime] = useState(4);
  const [industry, setIndustry] = useState("general-office");
  const [downtimeCost, setDowntimeCost] = useState(0);
  const [serviceEmployees, setServiceEmployees] = useState(10);
  const [servicePackage, setServicePackage] = useState("165");
  const [serviceCost, setServiceCost] = useState(0);

  // Calculate downtime cost using lookup table
  useEffect(() => {
    const multiplier = industryMultipliers[industry] || 1.6;
    const cost = employees * hourlyWage * downtime * multiplier;
    setDowntimeCost(cost);
  }, [employees, hourlyWage, downtime, industry]);

  // Calculate service cost
  useEffect(() => {
    const costPerUser = parseFloat(servicePackage);
    const totalCost = serviceEmployees * costPerUser;
    // Apply minimum for 5+ users
    const finalCost = serviceEmployees >= 5 ? Math.max(totalCost, 1200) : totalCost;
    setServiceCost(finalCost);
  }, [serviceEmployees, servicePackage]);

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
      <div className="min-h-screen bg-[#050312] pb-20 lg:pb-24">
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

        {/* Kept from working branch — not in live sticky bar */}
        <ScrollSectionAuto id="protection">
          <DigeratiHowWeProtectSection />
        </ScrollSectionAuto>

        {/* Packages */}
        <ScrollSectionAuto id="pricing">
          <DigeratiPricingSection />
        </ScrollSectionAuto>

        {/* Assessment */}
        <ScrollSectionAuto id="calculators">
          <DigeratiCalculatorsSection
            employees={employees}
            setEmployees={setEmployees}
            hourlyWage={hourlyWage}
            setHourlyWage={setHourlyWage}
            downtime={downtime}
            setDowntime={setDowntime}
            industry={industry}
            setIndustry={setIndustry}
            downtimeCost={downtimeCost}
            serviceEmployees={serviceEmployees}
            setServiceEmployees={setServiceEmployees}
            servicePackage={servicePackage}
            setServicePackage={setServicePackage}
            serviceCost={serviceCost}
          />
        </ScrollSectionAuto>

        {/* Industries */}
        <ScrollSectionAuto id="industries">
          <DigeratiIndustriesSection />
        </ScrollSectionAuto>

        {/* Trust imagery — feeds Proof story, hidden from sticky bar */}
        <ScrollSectionAuto id="trust">
          <DigeratiTrustPhotoSection />
        </ScrollSectionAuto>

        {/* Meet the Experts — human trust */}
        <ScrollSectionAuto id="team">
          <DigeratiMeetExpertsSection />
        </ScrollSectionAuto>

        {/* Proof — honest shells (no fabricated quotes) */}
        <ScrollSectionAuto id="testimonials">
          <DigeratiTestimonialsSection />
        </ScrollSectionAuto>

        {/* Kept from working branch — not in live sticky bar */}
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