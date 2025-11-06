import { Shield, Users, BarChart, Lock, Code, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";

export const DigeratiProtectEnableSection = (): JSX.Element => {
  const features = [
    {
      title: "Security-First Operations",
      description: "Every system, endpoint, and user is protected - by design, not by reaction.",
      icon: <Shield className="h-12 w-12" />,
      color: "from-purple-600 to-blue-600",
      bgImage: "/api/placeholder/400/300"
    },
    {
      title: "Co-Managed or Fully Managed",
      description: "We support your internal IT or serve as your outsourced technology team.",
      icon: <Users className="h-12 w-12" />,
      color: "from-blue-500 to-cyan-500",
      bgImage: "/api/placeholder/400/300"
    },
    {
      title: "Executive-Level Transparency",
      description: "Reports, KPIs, and compliance insights that make sense - and drive decisions.",
      icon: <BarChart className="h-12 w-12" />,
      color: "from-indigo-500 to-purple-500",
      bgImage: "/api/placeholder/400/300"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            We Exist to Protect and Enable Your Business
          </h2>
          <p className="text-xl text-gray-600">
            If you're like most business leaders, you don't want another vendor — you want a security-first partner 
            who proactively reduces risk, improves uptime, and keeps your team moving. Digerati Experts brings 
            managed IT, cybersecurity, and compliance together in one streamlined operation — built for results, not noise.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <Card className="relative h-full bg-white backdrop-blur-sm border-gray-200 overflow-hidden hover:border-purple-300 hover:shadow-xl transition-all duration-300 hover:scale-105">
                {/* Background image with overlay */}
                <div className="absolute inset-0 opacity-20">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color}`}></div>
                </div>
                
                {/* Content */}
                <div className="relative p-8">
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-lg bg-gradient-to-br ${feature.color} text-white mb-6 shadow-lg`}>
                    {feature.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover effect - corner accent */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-purple-50 to-transparent transform translate-x-12 translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
              </Card>
            </div>
          ))}
        </div>

        {/* Additional features grid */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className="bg-white backdrop-blur-sm rounded-lg p-6 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-4">
              <Lock className="h-8 w-8 text-purple-600 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Security by Design</h4>
                <p className="text-gray-600 text-sm">
                  Every solution we implement has security built into its foundation, not added as an afterthought.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white backdrop-blur-sm rounded-lg p-6 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-4">
              <Code className="h-8 w-8 text-blue-600 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Technology Excellence</h4>
                <p className="text-gray-600 text-sm">
                  We leverage cutting-edge tools and platforms to deliver enterprise-grade solutions to businesses of all sizes.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button 
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Partner With Us
          </button>
        </div>
      </div>
    </section>
  );
};