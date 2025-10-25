import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Activity } from "lucide-react";

export const DigeratiAlertBanner = (): JSX.Element => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            We Exist to Protect and Enable Your Business
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            If you're like most business leaders, you don't want another vendor — you want a security-first partner who proactively reduces risk, improves uptime, and keeps your team moving.
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
            Digerati Experts brings managed IT, cybersecurity, and compliance together in one streamlined operation – built for results, not noise.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-2 border-gray-200 hover:border-purple-600 transition-all duration-300 group shadow-md hover:shadow-xl">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Security-First Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Every system, endpoint, and user is protected - by design, not by reaction.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 hover:border-purple-600 transition-all duration-300 group shadow-md hover:shadow-xl">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Co-Managed or Fully Managed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We support your internal IT or serve as your outsourced technology team.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 hover:border-purple-600 transition-all duration-300 group shadow-md hover:shadow-xl">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Executive-Level Transparency</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Reports, KPIs, and compliance insights that make sense - and drive decisions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};