import { Button } from "@/components/ui/button";
import { Eye, ShieldCheck, UserCheck, KeyRound, Cloud, AlertCircle, ArrowRight } from "lucide-react";
import { designSystem } from "@/lib/designSystem";

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
    <section id="services" className={`${designSystem.spacing.section} ${designSystem.colors.background.primary}`}>
      <div className={designSystem.spacing.container}>
        <div className="text-center mb-12 md:mb-16">
          <h2 className={`${designSystem.typography.h2} mb-4`}>
            What We Provide
          </h2>
          <p className={`${designSystem.typography.body.large} max-w-3xl mx-auto`}>
            Our comprehensive suite of security services is designed to protect your business at every level, from endpoints to cloud infrastructure.
          </p>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 ${designSystem.spacing.gap.large}`}>
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                className={designSystem.components.serviceCard.container}
                data-testid={service.testId}
              >
                <div className={designSystem.components.serviceCard.icon}>
                  <Icon className={designSystem.components.serviceCard.iconSvg} />
                </div>
                <h3 className={designSystem.components.serviceCard.title}>
                  {service.title}
                </h3>
                <p className={designSystem.components.serviceCard.description}>
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button 
            className={designSystem.components.button.primary}
            size="lg"
            data-testid="button-explore-services"
          >
            Explore More Services <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};