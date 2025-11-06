import { designSystem } from "@/lib/designSystem";

export const DigeratiHowWeProtectSection = (): JSX.Element => {
  const steps = [
    {
      number: 1,
      title: "Discovery & Assessment",
      description: "We analyze your current security posture and identify vulnerabilities",
      testId: "step-discovery"
    },
    {
      number: 2,
      title: "Strategic Planning",
      description: "Custom security roadmap aligned with your business goals",
      testId: "step-planning"
    },
    {
      number: 3,
      title: "Implementation",
      description: "Deploy enterprise-grade security tools and protocols",
      testId: "step-implementation"
    },
    {
      number: 4,
      title: "Continuous Protection",
      description: "24/7 monitoring, updates, and proactive threat hunting",
      testId: "step-protection"
    }
  ];

  return (
    <section className={`${designSystem.spacing.section} ${designSystem.colors.background.primary}`}>
      <div className={designSystem.spacing.container}>
        <div className="text-center mb-12 md:mb-16">
          <h2 className={`${designSystem.typography.h2} mb-4`}>
            How We Protect Your Business
          </h2>
          <p className={`${designSystem.typography.body.large} max-w-3xl mx-auto`}>
            Our proven 4-step process ensures your business stays secure and compliant
          </p>
        </div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 ${designSystem.spacing.gap.large}`}>
          {steps.map((step) => (
            <div 
              key={step.number} 
              className="text-center group"
              data-testid={step.testId}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-all duration-300 group-hover:shadow-xl">
                {step.number}
              </div>
              <h3 className={`${designSystem.typography.h5} mb-3`}>
                {step.title}
              </h3>
              <p className={designSystem.typography.body.default}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};