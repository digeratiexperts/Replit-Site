import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Shield, Clock } from "lucide-react";

export default function CaseStudies() {
  const caseStudies = [
    {
      industry: "Healthcare",
      title: "Phoenix Medical Practice Achieves HIPAA Compliance",
      challenge: "Medical practice with 25 employees needed HIPAA-compliant IT infrastructure and failed their security audit.",
      solution: "Implemented encrypted email, secure file sharing, access controls, and comprehensive compliance documentation.",
      results: [
        "Passed HIPAA audit with zero findings",
        "Reduced security incidents by 95%",
        "Saved $50K in potential HIPAA fines"
      ],
      icon: Shield
    },
    {
      industry: "Law Firm",
      title: "Law Firm Eliminates Downtime and Data Loss",
      challenge: "50-attorney law firm experiencing frequent server crashes and lost billable hours due to IT issues.",
      solution: "Deployed proactive monitoring, cloud backup, and dedicated IT support team.",
      results: [
        "Zero unplanned downtime in 12 months",
        "Recovered from ransomware attack in 4 hours",
        "Increased productivity by 30%"
      ],
      icon: TrendingUp
    },
    {
      industry: "Accounting",
      title: "CPA Firm Meets Insurance Requirements",
      challenge: "Accounting firm's cyber insurance required enhanced security measures and audit documentation.",
      solution: "Implemented MFA, EDR, security awareness training, and compliance reporting.",
      results: [
        "Renewed cyber insurance with 20% lower premium",
        "Passed all insurance security requirements",
        "Zero security incidents in 18 months"
      ],
      icon: Shield
    }
  ];

  return (
    <PageTemplate
      title="Case Studies"
      subtitle="Real-world success stories from Arizona businesses that transformed their IT security and operations."
    >
      <div className="space-y-12">
        {/* Case Studies */}
        <div className="space-y-8">
          {caseStudies.map((study, index) => {
            const Icon = study.icon;
            return (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge className="mb-2">{study.industry}</Badge>
                      <CardTitle className="text-2xl mb-2">{study.title}</CardTitle>
                    </div>
                    <Icon className="h-10 w-10 text-purple-600" />
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-lg mb-2">The Challenge</h4>
                      <p className="text-gray-600">{study.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Our Solution</h4>
                      <p className="text-gray-600">{study.solution}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Results</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        {study.results.map((result, idx) => (
                          <div key={idx} className="bg-green-50 rounded-lg p-4">
                            <p className="text-green-800 font-medium">{result}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
          <p className="text-lg mb-6">Let's discuss how we can help your business achieve similar results.</p>
          <a href="https://meet.digerati-experts.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-purple-700 hover:bg-gray-100 px-8 py-3 rounded-md font-semibold transition-all" data-testid="button-contact-us">
            Contact Us
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </PageTemplate>
  );
}