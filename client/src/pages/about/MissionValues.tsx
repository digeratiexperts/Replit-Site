import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Target, Users, Shield } from "lucide-react";

export default function MissionValues() {
  return (
    <PageTemplate
      title="Mission & Values"
      subtitle="Our commitment to partnership and protecting Arizona businesses."
    >
      <div className="space-y-12">
        {/* Mission Statement */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            To empower small and medium-sized businesses in Arizona with enterprise-grade IT security and support, 
            making advanced cybersecurity accessible and affordable for organizations of all sizes.
          </p>
        </div>

        {/* Core Values */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle className="text-2xl">Security First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We believe every business deserves enterprise-level security, regardless of size. 
                  We stay ahead of threats so you don't have to.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle className="text-2xl">Partnership</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We're not just your IT provider – we're your technology partner. Your success is our success, 
                  and we're invested in your long-term growth.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Target className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle className="text-2xl">Proactive Approach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We prevent problems before they happen. Our proactive monitoring and maintenance 
                  keep your systems running smoothly 24/7.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Heart className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle className="text-2xl">Local Commitment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Based in Chandler, Arizona, we're proud to serve businesses throughout the Phoenix metro area 
                  with personalized, local support.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* What Sets Us Apart */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6">What Sets Us Apart</h2>
          <div className="space-y-4 text-gray-700">
            <p className="text-lg">
              <strong>Human-First Technology:</strong> While we use advanced tools and automation, 
              every client has a dedicated team of real people who know your business.
            </p>
            <p className="text-lg">
              <strong>Compliance Expertise:</strong> We specialize in helping businesses meet complex 
              compliance requirements like HIPAA, PCI DSS, and SOC 2.
            </p>
            <p className="text-lg">
              <strong>Transparent Pricing:</strong> No hidden fees, no surprises. You'll always know 
              exactly what you're paying for and why.
            </p>
            <p className="text-lg">
              <strong>15-Minute Response Guarantee:</strong> When you need help, we're there – with an 
              industry-leading 15-minute response time during business hours.
            </p>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}