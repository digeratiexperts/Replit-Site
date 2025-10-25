import { MegaMenu } from "@/components/MegaMenu";
import { WaveSeparator } from "@/components/WaveSeparator";
import { useState, useEffect } from "react";

// Import all section components
import { DigeratiHeroSection } from "./sections/DigeratiHeroSection";
import { DigeratiAlertBanner } from "./sections/DigeratiAlertBanner";
import { DigeratiServicesSection } from "./sections/DigeratiServicesSection";
import { DigeratiHowWeProtectSection } from "./sections/DigeratiHowWeProtectSection";
import { DigeratiCalculatorsSection } from "./sections/DigeratiCalculatorsSection";
import { DigeratiIndustriesSection } from "./sections/DigeratiIndustriesSection";
import { DigeratiPricingSection } from "./sections/DigeratiPricingSection";
import { DigeratiTestimonialsSection } from "./sections/DigeratiTestimonialsSection";
import { DigeratiFAQSection } from "./sections/DigeratiFAQSection";
import { DigeratiCTASection } from "./sections/DigeratiCTASection";
import { DigeratiContactSection } from "./sections/DigeratiContactSection";
import { DigeratiFooterSection } from "./sections/DigeratiFooterSection";

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
      <WaveSeparator variant="multi" className="-mt-1" />

      {/* Why Choose Section (Alert Banner) */}
      <DigeratiAlertBanner />

      {/* Services Section */}
      <DigeratiServicesSection />

      {/* Wave separator between Services and How We Protect sections */}
      <WaveSeparator variant="default" />

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

      {/* Wave separator between calculators and industries */}
      <WaveSeparator variant="gradient" />

      {/* Industries Section */}
      <DigeratiIndustriesSection />

      {/* Pricing Section */}
      <DigeratiPricingSection />

      {/* Wave separator between pricing and testimonials */}
      <WaveSeparator variant="inverted" />

      {/* Testimonials Section */}
      <DigeratiTestimonialsSection />

      {/* CTA Section */}
      <DigeratiCTASection />

      {/* FAQ Section */}
      <DigeratiFAQSection />

      {/* Contact Section */}
      <DigeratiContactSection />

      {/* Wave separator before footer */}
      <WaveSeparator variant="smooth" />

      {/* Footer */}
      <DigeratiFooterSection />
    </div>
  );
};