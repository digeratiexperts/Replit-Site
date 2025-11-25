import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Shield, Clock, RefreshCw, Zap, Eye } from "lucide-react";

export default function RemoteSupport() {
  const features = [
    { icon: Clock, title: "Instant Connection", color: "from-blue-500 to-cyan-500", points: ["Connect in under 2 minutes", "No software required", "Windows, Mac, Linux"] },
    { icon: Shield, title: "Secure & Encrypted", color: "from-green-500 to-emerald-500", points: ["End-to-end encryption", "Session recording", "HIPAA & GDPR compliant"] },
    { icon: RefreshCw, title: "Screen Sharing", color: "from-purple-500 to-indigo-500", points: ["Full control capability", "Multi-monitor support", "File transfer included"] },
    { icon: Zap, title: "24/7 Availability", color: "from-amber-500 to-orange-500", points: ["Round-the-clock support", "15-min response time", "Senior engineer escalation"] }
  ];

  return (
    <PageTemplate
      title="Remote Support"
      subtitle="Instant, secure remote assistance from our expert MSP technicians"
      gradientColors="from-blue-600 via-indigo-600 to-violet-600"
    >
      <div className="space-y-16">
        {/* How It Works */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">How Remote Support Works</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            When issues arise, our MSP technicians can securely access your systems to diagnose and resolve problems in minutes. No downtime, no delays.
          </p>
        </div>

        {/* Feature Grid with Modern Design */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-xl blur opacity-0 group-hover:opacity-15 transition-all`} />
                <Card className="relative bg-white hover:shadow-lg transition-all border-2 border-white/50 group-hover:border-blue-200 h-full">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {feature.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Connection Process */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100/50">
          <h3 className="text-2xl font-bold mb-8 text-center">Simple 3-Step Process</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: 1, title: "Request Support", desc: "Submit ticket or call our MSP team", time: "< 1 min" },
              { step: 2, title: "Share Access", desc: "Secure connection established instantly", time: "< 2 mins" },
              { step: 3, title: "We Fix It", desc: "Expert technicians resolve your issue", time: "Fast" }
            ].map((process, idx) => (
              <div key={idx} className="relative">
                {idx < 2 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[40%] h-1 bg-gradient-to-r from-blue-400 to-transparent" />
                )}
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold mx-auto mb-4">
                      {process.step}
                    </div>
                    <h4 className="font-semibold text-lg mb-2">{process.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{process.desc}</p>
                    <p className="text-blue-600 font-medium text-sm">{process.time}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* MSP Statistics */}
        <div className="grid md:grid-cols-4 gap-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
          <div className="text-center">
            <p className="text-4xl font-bold mb-2">2 mins</p>
            <p className="text-blue-100">Avg Connection Time</p>
          </div>
          <div className="text-center border-l border-r border-blue-400">
            <p className="text-4xl font-bold mb-2">15 min</p>
            <p className="text-blue-100">Response Guarantee</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold mb-2">99.9%</p>
            <p className="text-blue-100">Uptime SLA</p>
          </div>
          <div className="text-center border-l border-blue-400">
            <p className="text-4xl font-bold mb-2">24/7</p>
            <p className="text-blue-100">Availability</p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Need Immediate Help?</h2>
          <p className="text-lg mb-6 text-blue-100">Connect with our MSP support team now.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/support/submit-ticket" 
              className="inline-flex items-center justify-center bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
              data-testid="button-submit-ticket-remote"
            >
              Submit Support Request
            </a>
            <a 
              href="tel:325-480-9870"
              className="inline-flex items-center justify-center border-2 border-white bg-transparent text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-all"
              data-testid="button-call-remote"
            >
              Call Support
            </a>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
