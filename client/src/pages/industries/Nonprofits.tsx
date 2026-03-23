import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Heart, Users, Shield, Zap, TrendingUp, DollarSign, Target } from "lucide-react";

export default function Nonprofits() {
  const savings = [
    { metric: "IT Cost Savings", value: "40%", icon: DollarSign, color: "text-violet-400" },
    { metric: "Staff Time Saved", value: "6 hrs/wk", icon: Zap, color: "text-violet-400" },
    { metric: "Donor Confidence", value: "+85%", icon: Heart, color: "text-violet-400" },
    { metric: "Audit Pass Rate", value: "100%", icon: CheckCircle, color: "text-emerald-500" }
  ];

  return (
    <PageTemplate
      title="IT Solutions for Nonprofits"
      subtitle="Cost-effective, compliant IT for mission-driven organizations in Arizona"
      gradientColors="from-violet-600 via-purple-600 to-fuchsia-600"
    >
      <div className="space-y-16">
        {/* Impact Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {savings.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-all" />
                <Card className="relative bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <Icon className={`h-6 w-6 ${item.color} mb-3`} />
                    <p className="text-3xl font-bold text-white">{item.value}</p>
                    <p className="text-sm text-gray-400 mt-2">{item.metric}</p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Why Nonprofits Struggle */}
        <div className="bg-violet-500/10 backdrop-blur-sm border border-violet-500/30 rounded-xl p-8">
          <div className="flex gap-4">
            <Target className="h-8 w-8 text-violet-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">Nonprofit IT Challenges</h3>
              <div className="space-y-2 text-white/50">
                {[
                  "Limited IT budgets—every dollar matters for mission",
                  "Volunteer staff with limited technical expertise",
                  "Donor data privacy requirements (PII protection)",
                  "Grant compliance requirements (security evidence)",
                  "Rapid growth strains IT infrastructure"
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-violet-400 font-bold">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mission-Focused Services */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Nonprofit-Specific IT Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { 
                icon: Zap, 
                title: "Nonprofit Pricing", 
                desc: "20% discount for 501(c)(3)s",
                features: ["20% managed IT discount", "No setup or onboarding fees", "Microsoft nonprofit grants", "Scaled pricing for growth", "Flexible service tiers"]
              },
              { 
                icon: Shield, 
                title: "Donor Data Protection", 
                desc: "Secure donation processing",
                features: ["PCI DSS compliance", "Encrypted donor database", "GDPR/state privacy", "Secure online donations", "Backup protection"]
              },
              { 
                icon: Users, 
                title: "Grant Compliance", 
                desc: "Meet funder requirements",
                features: ["Security documentation", "Data retention procedures", "Vendor risk management", "Incident response planning", "Compliance evidence packets"]
              },
              { 
                icon: TrendingUp, 
                title: "Scalable Growth", 
                desc: "IT grows with mission",
                features: ["Add users without overhaul", "Remote team support", "Cloud app integration", "Multi-office capability", "Nonprofit software support"]
              }
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-15 transition-all" />
                  <Card className="relative bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:shadow-lg transition-all group-hover:border-violet-500/30">
                    <CardHeader>
                      <Icon className="h-10 w-10 text-violet-400 mb-2 group-hover:scale-110 transition-transform" />
                      <CardTitle className="text-white">{service.title}</CardTitle>
                      <p className="text-sm text-gray-400 mt-1">{service.desc}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {service.features.map((f, i) => (
                          <li key={i} className="flex gap-2 text-sm text-gray-300">
                            <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Supported Programs */}
        <div className="bg-violet-500/10 backdrop-blur-sm rounded-xl p-8 border border-violet-500/20">
          <h3 className="text-2xl font-bold mb-8 text-center text-white">Nonprofit Programs We Support</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              "Microsoft Nonprofit Grants",
              "Google Workspace for Nonprofits",
              "Adobe Creative Cloud Discounts",
              "Salesforce Nonprofit Edition",
              "Neon CRM Integration",
              "QuickBooks Nonprofit Pricing"
            ].map((prog, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all">
                <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span className="text-gray-300 font-medium">{prog}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Success Story */}
        <div className="grid md:grid-cols-3 gap-6 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl p-8 text-white">
          <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <p className="text-3xl font-bold mb-1">40%</p>
            <p className="text-white/70">IT Cost Reduction</p>
            <p className="text-xs text-white/50 mt-2">20% nonprofit discount + efficient management</p>
          </div>
          <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm border-l border-r border-violet-400">
            <p className="text-3xl font-bold mb-1">100%</p>
            <p className="text-white/70">Audit Pass Rate</p>
            <p className="text-xs text-white/50 mt-2">Grant compliance documentation</p>
          </div>
          <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <p className="text-3xl font-bold mb-1">24/7</p>
            <p className="text-white/70">Support Available</p>
            <p className="text-xs text-white/50 mt-2">Dedicated MSP partner for mission</p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Focus on Your Mission</h2>
          <p className="text-lg mb-6 text-white/70">Let us handle technology. Get nonprofit pricing + free consultation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/book" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-violet-700 hover:bg-violet-50 px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
              data-testid="button-schedule-nonprofit"
            >
              Schedule Free Consultation
            </a>
            <a 
              href="tel:325-480-9870"
              className="inline-flex items-center justify-center border-2 border-white bg-transparent text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-all"
              data-testid="button-call-nonprofit"
            >
              Call 325-480-9870
            </a>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
