import { MegaMenu } from "@/components/MegaMenu";
import { SimpleDivider } from "@/components/SimpleDivider";
import { useState, useEffect } from "react";

// Import all section components
import { DigeratiHeroSection } from "./sections/DigeratiHeroSection";
import { DigeratiAlertBanner } from "./sections/DigeratiAlertBanner";
import { DigeratiServicesSection } from "./sections/DigeratiServicesSection";
import { DigeratiHowWeProtectSection } from "./sections/DigeratiHowWeProtectSection";
import { DigeratiCalculatorsSection } from "./sections/DigeratiCalculatorsSection";
import { DigeratiWhatWeTackleSection } from "./sections/DigeratiWhatWeTackleSection";
import { DigeratiThreatsInsightsSection } from "./sections/DigeratiThreatsInsightsSection";
import { DigeratiAIAssistanceSection } from "./sections/DigeratiAIAssistanceSection";
import { DigeratiProtectEnableSection } from "./sections/DigeratiProtectEnableSection";
import { DigeratiIndustriesSection } from "./sections/DigeratiIndustriesSection";
import { DigeratiPricingSection } from "./sections/DigeratiPricingSection";
import { DigeratiTestimonialsSection } from "./sections/DigeratiTestimonialsSection";
import { DigeratiFAQSection } from "./sections/DigeratiFAQSection";
import { DigeratiCTASection } from "./sections/DigeratiCTASection";
import { DigeratiNewsletterSection } from "./sections/DigeratiNewsletterSection";
import { DigeratiContactSection } from "./sections/DigeratiContactSection";
import { DigeratiEnhancedFooterSection } from "./sections/DigeratiEnhancedFooterSection";

export const DigeratiHomepage = (): JSX.Element => {
  // State for calculators - managed here as it's shared between calculator sections
  const [employees, setEmployees] = useState(10);
  const [hourlyWage, setHourlyWage] = useState(50);
  const [downtime, setDowntime] = useState(4);
  const [industry, setIndustry] = useState("1.6");
  const [downtimeCost, setDowntimeCost] = useState(0);
  const [serviceEmployees, setServiceEmployees] = useState(10);
  const [servicePackage, setServicePackage] = useState("165");
  const [serviceCost, setServiceCost] = useState(0);

  // Calculate downtime cost
  useEffect(() => {
    const cost = employees * hourlyWage * downtime * parseFloat(industry);
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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <MegaMenu />

      {/* Hero Section */}
      <DigeratiHeroSection />

      {/* Wave separator between hero and next section */}
      <SimpleDivider variant="default" className="-mt-1" />

      {/* Why Choose Section (Alert Banner) */}
      <DigeratiAlertBanner />

      {/* Services Section */}
      <DigeratiServicesSection />

      {/* Wave separator between Services and How We Protect sections */}
      <SimpleDivider variant="inverted" />

      {/* How We Protect Your Business Section */}
      <DigeratiHowWeProtectSection />

      {/* Calculators Section (both downtime and service cost) */}
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

      {/* What We Tackle Section - Dark background */}
      <DigeratiWhatWeTackleSection />

      {/* Recent Threats & Insights Section - White background */}
      <DigeratiThreatsInsightsSection />

      {/* Wave separator */}
      <SimpleDivider variant="dark" />

      {/* Industries Section */}
      <DigeratiIndustriesSection />

      {/* Pricing Section */}
      <DigeratiPricingSection />

      {/* We Exist to Protect Section - Dark background */}
      <DigeratiProtectEnableSection />

      {/* Wave separator between dark and light sections */}
      <SimpleDivider variant="inverted" />

      {/* Testimonials Section */}
      <DigeratiTestimonialsSection />

      {/* AI Assistance Section - Dark background */}
      <DigeratiAIAssistanceSection />

      {/* CTA Section */}
      <DigeratiCTASection />

      {/* FAQ Section - will update to dark */}
      <DigeratiFAQSection />

      {/* Newsletter Section - Dark background */}
      <DigeratiNewsletterSection />

      {/* Contact Section */}
      <DigeratiContactSection />

      {/* Enhanced Footer - Dark background */}
      <DigeratiEnhancedFooterSection />
    </div>
  );
};