import { Briefcase, Calculator, Stethoscope, Home, Heart } from "lucide-react";
import { designSystem } from "@/lib/designSystem";

export const DigeratiIndustriesSection = (): JSX.Element => {
  const industries = [
    { icon: Briefcase, name: "Law Firms", testId: "industry-law" },
    { icon: Calculator, name: "CPA Firms", testId: "industry-cpa" },
    { icon: Stethoscope, name: "Medical\nPractices", testId: "industry-medical" },
    { icon: Home, name: "Real Estate\nFirms", testId: "industry-realestate" },
    { icon: Heart, name: "Animal\nHospitals", testId: "industry-animal" }
  ];

  return (
    <section className={`${designSystem.spacing.section} ${designSystem.colors.background.secondary}`}>
      <div className={designSystem.spacing.container}>
        <div className="text-center mb-12 md:mb-16">
          <h2 className={`${designSystem.typography.h2} mb-4`}>
            Industries We Serve
          </h2>
          <p className={`${designSystem.typography.body.large} max-w-3xl mx-auto`}>
            Specialized cybersecurity solutions for Arizona's essential sectors
          </p>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ${designSystem.spacing.gap.large}`}>
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div 
                key={index} 
                className="text-center group transition-all duration-300 cursor-pointer"
                data-testid={industry.testId}
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-blue-100 border border-purple-200 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                  <Icon className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 whitespace-pre-line">
                  {industry.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};