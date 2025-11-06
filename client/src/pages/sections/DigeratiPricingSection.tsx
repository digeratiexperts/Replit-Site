import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export const DigeratiPricingSection = (): JSX.Element => {
  const pricingPlans = [
    {
      name: "Basic IT",
      price: 165,
      isPopular: false,
      features: [
        "Corporate Antivirus included",
        "Core Monitoring (health & performance)",
        "Service Desk & OS patching",
        "Workstation backup",
        "Microsoft 365 / Google admin",
        "Asset inventory & reporting"
      ]
    },
    {
      name: "Advanced Security",
      price: 245,
      isPopular: true,
      features: [
        "Everything in Basic IT",
        "Advanced endpoint defense",
        "Email + SaaS threat protection",
        "Security awareness training",
        "Quarterly risk reviews"
      ]
    },
    {
      name: "Enterprise",
      price: 345,
      isPopular: false,
      features: [
        "Everything in Advanced Security",
        "Zero-trust networking",
        "Incident response & forensics",
        "Compliance evidence packs (HIPAA/SOC2)",
        "Priority response SLAs",
        "Disaster recovery testing"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            ProActive Ecosystem Pricing
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Clear, predictable, and compliance-ready. Packages start at <span className="font-bold text-purple-600">$165 per user/month</span>. 
            A <span className="font-bold text-purple-600">$1,200/site minimum</span> applies for offices with 5+ users.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${
                plan.isPopular ? 'border-purple-600 border-2 shadow-lg' : 'border border-gray-200 hover:border-purple-300'
              }`}
              data-testid={`pricing-${plan.name.toLowerCase().replace(' ', '-')}`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-purple-600">${plan.price}</span>
                  <span className="text-gray-600 block text-sm mt-1">per user avg</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className={`text-sm ${featureIndex === 0 && plan.name !== "Basic IT" ? 'font-semibold' : ''}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 space-y-2">
                  <Button className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 transition-all duration-200 hover:bg-purple-50" variant="outline">
                    Learn More
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg">
                    Book a Strategy Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Small sites under 5 users are billed per-user only — no minimum. Offices with 5+ users include a $1,200/site minimum.</p>
          <p>Final pricing is tailored to your users, sites, and compliance needs.</p>
        </div>

        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg">
              Book a 15-Minute Intro Call
            </Button>
            <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 transition-all duration-200">
              See Full Pricing & Packages
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};