import { MegaMenu } from "@/components/MegaMenu";
import { SimpleDivider } from "@/components/SimpleDivider";
import { ZohoASAPWidget } from "@/components/ZohoASAPWidget";
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
import { DigeratiFAQSection } from "./sections/DigeratiFAQSection";
import { DigeratiCTASection } from "./sections/DigeratiCTASection";
import { DigeratiNewsletterSection } from "./sections/DigeratiNewsletterSection";
// PremiumCTASection removed - keeping only one CTA section
import { DigeratiContactSection } from "./sections/DigeratiContactSection";
import { DigeratiEnhancedFooterSection } from "./sections/DigeratiEnhancedFooterSection";
import { DigeratiStatsSection } from "./sections/DigeratiStatsSection";
import { DigeratiTrustPhotoSection } from "./sections/DigeratiTrustPhotoSection";

// Themes must match real section backgrounds — drives header/logo chrome while scrolling.
const homepageSections: { id: string; label: string; theme: 'dark' | 'light' }[] = [
  { id: 'hero', label: 'Home', theme: 'dark' },
  { id: 'stats', label: 'Results', theme: 'dark' },
  { id: 'services', label: 'Services', theme: 'dark' },
  { id: 'protection', label: 'How It Works', theme: 'light' },
  { id: 'calculators', label: 'Calculators', theme: 'dark' },
  { id: 'challenges', label: 'Challenges', theme: 'dark' },
  { id: 'industries', label: 'Industries', theme: 'dark' },
  { id: 'trust', label: 'Trust', theme: 'light' },
  { id: 'pricing', label: 'Pricing', theme: 'dark' },
  { id: 'testimonials', label: 'Reviews', theme: 'dark' },
  { id: 'insights', label: 'Insights', theme: 'dark' },
  { id: 'cta', label: 'Get Started', theme: 'dark' },
  { id: 'faq', label: 'FAQ', theme: 'light' },
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
      <div className="min-h-screen bg-[#050312]">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        {/* Zoho ASAP Widget */}
        <ZohoASAPWidget 
          isEnabled={true}
          accountId={import.meta.env.VITE_ZOHO_ACCOUNT_ID}
          portalId={import.meta.env.VITE_ZOHO_PORTAL_ID}
        />

        {/* Navigation */}
        <MegaMenu />

        {/* Modern Hero Section — single dominant Schedule CTA */}
        <ScrollSectionAuto id="hero">
          <ModernHeroSection />
          <DigeratiAlertBanner />
        </ScrollSectionAuto>

        {/* Statistics Section */}
        <ScrollSectionAuto id="stats">
          <DigeratiStatsSection />
        </ScrollSectionAuto>

        {/* Services Section */}
        <ScrollSectionAuto id="services">
          <DigeratiServicesSection />
        </ScrollSectionAuto>

        {/* How We Protect Your Business Section */}
        <ScrollSectionAuto id="protection">
          <DigeratiHowWeProtectSection />
        </ScrollSectionAuto>

        {/* Calculators Section */}
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

        {/* What We Tackle Section */}
        <ScrollSectionAuto id="challenges">
          <DigeratiWhatWeTackleSection />
        </ScrollSectionAuto>

        {/* Industries Section */}
        <ScrollSectionAuto id="industries">
          <DigeratiIndustriesSection />
        </ScrollSectionAuto>

        {/* Trust & Photography Section */}
        <ScrollSectionAuto id="trust">
          <DigeratiTrustPhotoSection />
        </ScrollSectionAuto>

        {/* Pricing Section */}
        <ScrollSectionAuto id="pricing">
          <DigeratiPricingSection />
        </ScrollSectionAuto>

        {/* Testimonials Section */}
        <ScrollSectionAuto id="testimonials">
          <DigeratiTestimonialsSection />
        </ScrollSectionAuto>

        {/* Recent Threats & Insights Section */}
        <ScrollSectionAuto id="insights">
          <DigeratiThreatsInsightsSection />
          <DigeratiAIAssistanceSection />
        </ScrollSectionAuto>

        {/* Lead form lives below the fold — hero keeps a single Schedule CTA */}
        <DigeratiLeadFormSection />

        {/* CTA Section */}
        <ScrollSectionAuto id="cta">
          <DigeratiCTASection />
        </ScrollSectionAuto>

        {/* FAQ Section */}
        <ScrollSectionAuto id="faq">
          <DigeratiFAQSection />
          <DigeratiNewsletterSection />
        </ScrollSectionAuto>

        {/* Contact Section */}
        <ScrollSectionAuto id="contact" className="scroll-mt-20 pt-8">
          <DigeratiContactSection />
          <DigeratiEnhancedFooterSection />
        </ScrollSectionAuto>
      </div>
    </FullPageScrollProvider>
  );
};