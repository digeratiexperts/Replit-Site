import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { servicePageData } from "@/pages/routes/servicePages";

export default function SolutionsIndex() {
  const solutions = Object.entries(servicePageData).map(([key, data]) => ({
    key,
    ...data
  }));

  return (
    <PageTemplate
      title="Solutions"
      subtitle="Comprehensive IT management and security services designed to prevent problems, manage outcomes, and reduce risk"
      gradientColors="from-indigo-600 via-purple-600 to-blue-600"
    >
      <div className="space-y-12">
        {/* Introduction */}
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700">
            Digerati Experts takes a proactive approach to managed IT and security. Our solutions are organized into three distinct value areas so you only pay for what you need:
          </p>
        </div>

        {/* Pricing Buckets Overview */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg">Security & Managed Services</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              Managed protection for devices, email, cloud apps, and networks. Ongoing maintenance, patching, and proactive monitoring.
            </CardContent>
          </Card>
          <Card className="border-2 border-emerald-200">
            <CardHeader>
              <CardTitle className="text-lg">Workplace Services</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              Complete employee digital experience: identity management, device lifecycle, app provisioning, and communications.
            </CardContent>
          </Card>
          <Card className="border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="text-lg">Compliance Modules</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              Per-user compliance frameworks, audit evidence, and policy enforcement for regulated industries.
            </CardContent>
          </Card>
        </div>

        {/* Solutions Grid */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Our Solutions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {solutions.map((solution) => (
              <a
                key={solution.key}
                href={`#/solutions/${solution.key}`}
                className="block"
              >
                <Card className="h-full hover:shadow-lg hover:border-purple-300 transition-all cursor-pointer group">
                  <CardHeader>
                    <div className={`inline-block w-12 h-12 rounded-lg bg-gradient-to-br ${solution.gradientColors || 'from-purple-600 to-blue-600'} mb-4 opacity-20 group-hover:opacity-30 transition-opacity`} />
                    <CardTitle>{solution.title}</CardTitle>
                    <p className="text-sm text-gray-600 font-normal mt-2">{solution.subtitle}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 line-clamp-2 mb-4">{solution.description}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-600 hover:text-purple-700 p-0"
                      data-testid={`button-learn-more-${solution.key}`}
                      onClick={(e) => e.preventDefault()}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>

        {/* ProActive Philosophy */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 border border-blue-200">
          <h2 className="text-2xl font-bold mb-4">Our ProActive Philosophy</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <h3 className="font-bold text-blue-900 mb-2">Prevention</h3>
              <p className="text-sm text-gray-700">Stop problems before they happen with proactive monitoring and maintenance.</p>
            </div>
            <div>
              <h3 className="font-bold text-blue-900 mb-2">Support</h3>
              <p className="text-sm text-gray-700">Fast, reliable support with root-cause focus to reduce repeat issues.</p>
            </div>
            <div>
              <h3 className="font-bold text-blue-900 mb-2">Recovery</h3>
              <p className="text-sm text-gray-700">Rapid recovery from incidents with tested procedures and guaranteed targets.</p>
            </div>
            <div>
              <h3 className="font-bold text-blue-900 mb-2">Standardization</h3>
              <p className="text-sm text-gray-700">Consistent, standardized environments that reduce complexity and improve security.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-6">Schedule a free consultation to find the right solutions for your business.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-purple-700 hover:bg-gray-100"
              data-testid="button-schedule-consultation"
            >
              Schedule a Consultation
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-purple-600"
              data-testid="button-contact-solutions"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
