import { MegaMenu } from "@/components/MegaMenu";
import { SimpleDivider } from "@/components/SimpleDivider";
import { ZohoASAPWidget } from "@/components/ZohoASAPWidget";
import { useState, useEffect } from "react";

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
import { PremiumCTASection } from "@/components/PremiumCTASection";
import { DigeratiContactSection } from "./sections/DigeratiContactSection";
import { DigeratiEnhancedFooterSection } from "./sections/DigeratiEnhancedFooterSection";

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

  return (
    <div className="min-h-screen bg-[#050312]">
      {/* Zoho ASAP Widget */}
      <ZohoASAPWidget 
        isEnabled={true}
        accountId={import.meta.env.VITE_ZOHO_ACCOUNT_ID}
        portalId={import.meta.env.VITE_ZOHO_PORTAL_ID}
      />

      {/* Navigation */}
      <MegaMenu />

      {/* Modern Hero Section - Includes integrated lead capture form */}
      <ModernHeroSection />

      {/* Value Proof / Alert Banner Section */}
      <DigeratiAlertBanner />

      {/* Services Section */}
      <DigeratiServicesSection />

      {/* How We Protect Your Business Section */}
      <DigeratiHowWeProtectSection />

      {/* Calculators Section */}
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

      {/* Lead Form Section - Below Downtime Calculator */}
      <DigeratiLeadFormSection />

      {/* What We Tackle Section */}
      <DigeratiWhatWeTackleSection />

      {/* Industries Section */}
      <DigeratiIndustriesSection />

      {/* Premium CTA Section */}
      <PremiumCTASection 
        headline="Ready to Secure Your Business?"
        subheadline="Get enterprise-grade protection tailored for Arizona businesses. Let's discuss your security needs."
      />

      {/* Pricing Section */}
      <DigeratiPricingSection />

      {/* Testimonials Section */}
      <DigeratiTestimonialsSection />

      {/* Recent Threats & Insights Section */}
      <DigeratiThreatsInsightsSection />

      {/* AI Assistance Section */}
      <DigeratiAIAssistanceSection />

      {/* CTA Section */}
      <DigeratiCTASection />

      {/* FAQ Section */}
      <DigeratiFAQSection />

      {/* Newsletter Section */}
      <DigeratiNewsletterSection />

      {/* Contact Section */}
      <DigeratiContactSection />

      {/* Enhanced Footer */}
      <DigeratiEnhancedFooterSection />
    </div>
  );
};