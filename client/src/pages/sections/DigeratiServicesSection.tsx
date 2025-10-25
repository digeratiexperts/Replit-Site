import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, ShieldCheck, UserCheck, KeyRound, Cloud, AlertCircle, ArrowRight } from "lucide-react";

export const DigeratiServicesSection = (): JSX.Element => {
  const services = [
    {
      icon: Eye,
      title: "24/7 Threat Monitoring & Response",
      description: "We detect and stop threats before they escalate. Real-time MDR for continuous protection.",
      testId: "card-threat-monitoring"
    },
    {
      icon: ShieldCheck,
      title: "Endpoint Protection (EDR/XDR)",
      description: "Advanced endpoint detection and response to secure all devices in your network.",
      testId: "card-endpoint"
    },
    {
      icon: UserCheck,
      title: "User Access & MFA Enforcement",
      description: "Multi-factor authentication and access control to prevent unauthorized entry.",
      testId: "card-mfa"
    },
    {
      icon: KeyRound,
      title: "Identity & Access Management",
      description: "Comprehensive IAM solutions to manage user identities and permissions.",
      testId: "card-identity"
    },
    {
      icon: Cloud,
      title: "Cloud Security Hardening",
      description: "Secure your cloud infrastructure with best-practice configurations and monitoring.",
      testId: "card-cloud"
    },
    {
      icon: AlertCircle,
      title: "Phishing & Email Security",
      description: "Advanced email protection against phishing, spam, and malicious attachments.",
      testId: "card-phishing"
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What We Provide
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our comprehensive suite of security services is designed to protect your business at every level, from endpoints to cloud infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index} 
                className="border-2 border-gray-200 hover:border-purple-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group" 
                data-testid={service.testId}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg" size="lg">
            Explore More Services <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};