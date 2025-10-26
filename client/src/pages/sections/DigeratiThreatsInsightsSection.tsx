import { Calendar, User, ArrowRight, AlertCircle, Shield, Lock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const DigeratiThreatsInsightsSection = (): JSX.Element => {
  const insights = [
    {
      category: "CISA Alert",
      date: "March 5, 2025",
      title: "New CISA Alert: Patch These 5 Vulnerabilities Now",
      excerpt: "New security flaws are actively being exploited in the wild. Critical patches required for Microsoft Exchange and VMware systems.",
      author: "Security Team",
      readTime: "3 min read",
      urgent: true,
      icon: <AlertCircle className="h-5 w-5" />
    },
    {
      category: "Threat Analysis",
      date: "March 4, 2025",
      title: "Ransomware Groups Targeting Arizona Healthcare",
      excerpt: "BlackCat ransomware group increases attacks on regional healthcare providers. Learn how to protect your medical practice.",
      author: "James Wilson",
      readTime: "5 min read",
      urgent: true,
      icon: <Shield className="h-5 w-5" />
    },
    {
      category: "Compliance Update",
      date: "March 3, 2025",
      title: "HIPAA Penalties Increase 40% in 2025",
      excerpt: "OCR announces stricter enforcement and higher fines for HIPAA violations. Ensure your compliance program is up to date.",
      author: "Compliance Team",
      readTime: "4 min read",
      urgent: false,
      icon: <Lock className="h-5 w-5" />
    }
  ];

  const categories = ["All", "CISA Alerts", "Ransomware", "Compliance", "Best Practices"];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-100 text-red-700 hover:bg-red-200">
            24/7 Security Response Team
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Recent Threats & Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay ahead of cyber threats with real-time alerts and expert analysis from our security team.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full transition-all duration-200 ${
                index === 0
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {insights.map((insight, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow duration-300 border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge 
                    variant={insight.urgent ? "destructive" : "secondary"}
                    className={insight.urgent ? "bg-red-100 text-red-700" : ""}
                  >
                    {insight.category}
                  </Badge>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {insight.date}
                  </span>
                </div>
                <CardTitle className="text-xl line-clamp-2 hover:text-purple-600 transition-colors cursor-pointer">
                  {insight.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4 line-clamp-3">
                  {insight.excerpt}
                </CardDescription>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User className="h-4 w-4" />
                    <span>{insight.author}</span>
                    <span>•</span>
                    <span>{insight.readTime}</span>
                  </div>
                  <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm flex items-center gap-1 group">
                    Know More
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold">
            View All Security Updates
          </button>
        </div>
      </div>
    </section>
  );
};