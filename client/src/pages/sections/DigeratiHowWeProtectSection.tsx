export const DigeratiHowWeProtectSection = (): JSX.Element => {
  const steps = [
    {
      number: 1,
      title: "Discovery & Assessment",
      description: "We analyze your current security posture and identify vulnerabilities"
    },
    {
      number: 2,
      title: "Strategic Planning",
      description: "Custom security roadmap aligned with your business goals"
    },
    {
      number: 3,
      title: "Implementation",
      description: "Deploy enterprise-grade security tools and protocols"
    },
    {
      number: 4,
      title: "Continuous Protection",
      description: "24/7 monitoring, updates, and proactive threat hunting"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How We Protect Your Business
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our proven 4-step process ensures your business stays secure and compliant
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};