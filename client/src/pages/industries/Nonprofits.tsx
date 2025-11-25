import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Heart, Users, Shield, Zap, TrendingUp } from "lucide-react";
import { Phone } from "lucide-react";

export default function Nonprofits() {
  return (
    <PageTemplate
      title="IT Solutions for Nonprofits"
      subtitle="Cost-effective, compliant IT for mission-driven organizations in Arizona"
      gradientColors="from-purple-600 via-fuchsia-600 to-pink-600"
    >
      <div className="space-y-12">
        {/* Problem Statement */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-8">
          <div className="flex gap-4">
            <Heart className="h-8 w-8 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-purple-900 mb-2">Nonprofit IT Challenges</h3>
              <ul className="space-y-2 text-purple-800">
                <li>• Limited IT budgets—every dollar matters for mission</li>
                <li>• Volunteer staff with limited technical expertise</li>
                <li>• Donor data privacy requirements (PII protection)</li>
                <li>• Grant compliance requirements (security evidence)</li>
                <li>• Rapid growth strains IT infrastructure</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Digerati */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Why Nonprofits Choose Digerati</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Nonprofits require IT partners who understand budget constraints and mission-driven priorities. We specialize in cost-effective managed IT, nonprofit pricing, grant compliance, and donor data protection that lets you focus on your mission, not technology problems.
          </p>
        </div>

        {/* Core Services */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Mission-Focused IT Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle className="text-xl">Nonprofit Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600">Special pricing and discounts for 501(c)(3) organizations:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ 20% discount on managed IT services for 501(c)(3)s</li>
                  <li>✓ No setup fees or onboarding charges</li>
                  <li>✓ Free Microsoft nonprofit grants assistance</li>
                  <li>✓ Scaled pricing for growing organizations</li>
                  <li>✓ Flexible service tiers to match budget</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle className="text-xl">Donor Data Protection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600">Secure donor information and payment processing:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ PCI DSS compliance for donation processing</li>
                  <li>✓ Encrypted donor database and communications</li>
                  <li>✓ GDPR and state privacy compliance</li>
                  <li>✓ Secure online donation platforms</li>
                  <li>✓ Backup protection for donor records</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle className="text-xl">Grant Compliance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600">Meet funder security and compliance requirements:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Documentation of security controls for audits</li>
                  <li>✓ Data retention and privacy procedures</li>
                  <li>✓ Vendor management and third-party risk</li>
                  <li>✓ Incident response planning and reporting</li>
                  <li>✓ Compliance evidence packets for grantors</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle className="text-xl">Scalable Growth</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600">IT grows with your organization:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Add users and services without major overhaul</li>
                  <li>✓ Support for remote teams and volunteers</li>
                  <li>✓ Cloud applications that reduce on-premise costs</li>
                  <li>✓ Integration with nonprofit software (Salesforce, Neon, etc.)</li>
                  <li>✓ Multi-office support as you expand</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why Nonprofits Need Digerati */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-8">Keep More Resources for Your Mission</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Reduce IT Costs", desc: "20% nonprofit discount + efficient management" },
              { title: "Protect Donors", desc: "Secure donation processing builds trust" },
              { title: "Pass Audits", desc: "Documented compliance for grant requirements" },
              { title: "Support Volunteers", desc: "Easy remote access and user management" },
              { title: "Scale Safely", desc: "Grow IT with your organization's needs" },
              { title: "Focus on Mission", desc: "Let us handle technology; you focus on impact" }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Story */}
        <div className="border-l-4 border-purple-600 bg-purple-50 rounded-lg p-8">
          <Badge className="mb-3">Success Story</Badge>
          <h3 className="text-2xl font-bold mb-3">Phoenix Nonprofit: From Chaos to Compliance</h3>
          <p className="text-gray-700 mb-4">
            A social services nonprofit had outdated servers, volunteer staff managing IT, and no donor data security. They failed their grant compliance audit and nearly lost funding. Digerati implemented managed IT with nonprofit pricing, PCI DSS compliance, and automated backups. Result: Passed audit, renewed grant, reduced IT staff burden.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded p-3">
              <p className="text-sm text-gray-600">IT Costs:</p>
              <p className="text-2xl font-bold text-green-600">↓ 40%</p>
            </div>
            <div className="bg-white rounded p-3">
              <p className="text-sm text-gray-600">Compliance:</p>
              <p className="text-2xl font-bold text-purple-600">Audit Pass</p>
            </div>
            <div className="bg-white rounded p-3">
              <p className="text-sm text-gray-600">Staff Time:</p>
              <p className="text-2xl font-bold text-blue-600">+6 hrs/wk</p>
            </div>
          </div>
        </div>

        {/* Available Nonprofit Programs */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6">Nonprofit Programs We Support</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Microsoft Nonprofit Grants Program",
              "Google Workspace for Nonprofits",
              "Adobe Creative Cloud for Nonprofits",
              "Salesforce Nonprofit Edition",
              "Neon CRM integration",
              "QuickBooks nonprofit pricing"
            ].map((prog, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-purple-600" />
                <span className="text-gray-700">{prog}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Streamline Nonprofit IT?</h2>
          <p className="text-lg mb-6">Let's discuss nonprofit pricing and how we can help your organization.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://meet.digerati-experts.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-purple-700 hover:bg-gray-100 px-8 py-3 rounded-md font-semibold transition-all"
              data-testid="button-schedule-nonprofit"
            >
              Schedule Free Consultation
            </a>
            <a 
              href="tel:325-480-9870"
              className="inline-flex items-center justify-center border-2 border-white bg-transparent text-white hover:bg-white hover:text-purple-700 px-8 py-3 rounded-md font-semibold transition-all"
              data-testid="button-call-nonprofit"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call 325-480-9870
            </a>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
