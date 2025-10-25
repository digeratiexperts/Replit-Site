import { Briefcase, Calculator, Stethoscope, Home, Heart } from "lucide-react";

export const DigeratiIndustriesSection = (): JSX.Element => {
  const industries = [
    { icon: Briefcase, name: "Law Firms" },
    { icon: Calculator, name: "CPA Firms" },
    { icon: Stethoscope, name: "Medical\nPractices" },
    { icon: Home, name: "Real Estate\nFirms" },
    { icon: Heart, name: "Animal\nHospitals" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Industries We Serve
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Specialized cybersecurity solutions for Arizona's essential sectors
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div key={index} className="text-center group hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-purple-200 group-hover:to-blue-200 transition-all duration-300 shadow-md group-hover:shadow-lg">
                  <Icon className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 whitespace-pre-line">{industry.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};