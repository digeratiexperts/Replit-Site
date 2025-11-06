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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <MegaMenu />

      {/* Hero Section */}
      <DigeratiHeroSection />

      {/* Why Choose Section (Alert Banner) - Seamless transition */}
      <div className="-mt-16">
        <DigeratiAlertBanner />
      </div>

      {/* Services Section - Smooth transition */}
      <div className="bg-white">
        <DigeratiServicesSection />
      </div>

      {/* How We Protect Your Business Section */}
      <div className="bg-gradient-to-b from-white to-slate-50">
        <DigeratiHowWeProtectSection />
      </div>

      {/* Calculators Section (both downtime and service cost) */}
      <div className="bg-slate-50">
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
      </div>

      {/* What We Tackle Section - Gradient transition to dark */}
      <div className="bg-gradient-to-b from-slate-50 to-slate-900">
        <DigeratiWhatWeTackleSection />
      </div>

      {/* Recent Threats & Insights Section - Stay in dark theme */}
      <div className="bg-slate-900">
        <DigeratiThreatsInsightsSection />
      </div>

      {/* Industries Section - Transition back to light */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-white">
        <DigeratiIndustriesSection />
      </div>

      {/* Pricing Section */}
      <div className="bg-white">
        <DigeratiPricingSection />
      </div>

      {/* We Exist to Protect Section - Transition to dark */}
      <div className="bg-gradient-to-b from-white via-slate-700 to-slate-900">
        <DigeratiProtectEnableSection />
      </div>

      {/* Testimonials Section */}
      <div className="bg-slate-900">
        <DigeratiTestimonialsSection />
      </div>

      {/* AI Assistance Section - Stay dark */}
      <div className="bg-slate-900">
        <DigeratiAIAssistanceSection />
      </div>

      {/* CTA Section - Transition to lighter */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-800">
        <DigeratiCTASection />
      </div>

      {/* FAQ Section */}
      <div className="bg-slate-800">
        <DigeratiFAQSection />
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-b from-slate-800 to-slate-900">
        <DigeratiNewsletterSection />
      </div>

      {/* Contact Section */}
      <DigeratiContactSection />

      {/* Enhanced Footer - Dark background */}
      <DigeratiEnhancedFooterSection />
    </div>
  );
};