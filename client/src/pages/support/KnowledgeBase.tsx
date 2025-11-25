import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Book, FileText, Video, Zap, TrendingUp, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function KnowledgeBase() {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    {
      category: "Getting Started",
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      articles: [
        { title: "How to Access Your Client Portal", views: "1.2K", difficulty: "Beginner" },
        { title: "Setting Up Multi-Factor Authentication", views: "892", difficulty: "Intermediate" },
        { title: "Submitting Your First Support Ticket", views: "756", difficulty: "Beginner" },
        { title: "Understanding Your Invoice and Payment Options", views: "634", difficulty: "Beginner" }
      ]
    },
    {
      category: "Troubleshooting",
      icon: FileText,
      color: "from-amber-500 to-orange-500",
      articles: [
        { title: "Resetting Your Portal Password", views: "2.1K", difficulty: "Beginner" },
        { title: "Cannot Connect to Remote Support", views: "1.4K", difficulty: "Intermediate" },
        { title: "Email and Calendar Not Syncing", views: "987", difficulty: "Intermediate" },
        { title: "Network Connectivity Issues", views: "856", difficulty: "Advanced" }
      ]
    },
    {
      category: "Security & Compliance",
      icon: Book,
      color: "from-green-500 to-emerald-500",
      articles: [
        { title: "Understanding HIPAA Requirements", views: "1.8K", difficulty: "Advanced" },
        { title: "Best Practices for Password Management", views: "1.6K", difficulty: "Beginner" },
        { title: "Recognizing Phishing and Social Engineering", views: "1.3K", difficulty: "Intermediate" },
        { title: "Data Backup and Recovery Options", views: "945", difficulty: "Advanced" }
      ]
    }
  ];

  return (
    <PageTemplate
      title="Knowledge Base"
      subtitle="Self-service resources and troubleshooting guides for Digerati Experts clients"
    >
      <div className="space-y-16">
        {/* Enhanced Search Bar */}
        <div className="max-w-2xl mx-auto w-full">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-all" />
            <div className="relative flex items-center bg-white/80 backdrop-blur-sm rounded-xl border-2 border-white/50 group-hover:border-purple-200 transition-all">
              <Search className="absolute left-4 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search knowledge base..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg border-0 bg-transparent placeholder-gray-400"
                data-testid="input-search-kb"
              />
            </div>
          </div>
        </div>

        {/* Categories with Articles */}
        <div className="space-y-12">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div key={idx}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${cat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">{cat.category}</h2>
                  <Badge variant="outline" className="ml-auto">{cat.articles.length} articles</Badge>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {cat.articles.map((article, i) => (
                    <div key={i} className="group cursor-pointer">
                      <Card className="h-full bg-white hover:shadow-lg transition-all border-2 border-white/50 group-hover:border-purple-200">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-2">
                            <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">{article.title}</CardTitle>
                            <Eye className="h-4 w-4 text-gray-400 group-hover:text-purple-600" />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">{article.views} views</span>
                            <Badge variant="secondary" className="text-xs">{article.difficulty}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Resources */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-12 border border-purple-100/50">
          <h2 className="text-2xl font-bold mb-8 text-center">Quick Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Video, title: "Video Tutorials", desc: "Step-by-step guides", color: "from-red-500 to-pink-500", cta: "Watch Videos" },
              { icon: FileText, title: "Documentation", desc: "Technical references", color: "from-blue-500 to-indigo-500", cta: "View Docs" },
              { icon: Zap, title: "Quick Tips", desc: "Best practices", color: "from-amber-500 to-orange-500", cta: "Read Tips" }
            ].map((resource, idx) => {
              const Icon = resource.icon;
              return (
                <div key={idx} className="group">
                  <Card className="h-full bg-white group-hover:shadow-lg transition-all border-2 border-white/50 group-hover:border-purple-200">
                    <CardContent className="pt-6">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${resource.color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold mb-2 text-gray-900">{resource.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{resource.desc}</p>
                      <Button variant="outline" size="sm" className="w-full" data-testid={`button-${resource.title.toLowerCase()}`}>
                        {resource.cta}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-lg mb-6 text-purple-100">Our MSP support team is ready to assist 24/7.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/support/submit-ticket" 
              className="inline-flex items-center justify-center bg-white text-purple-700 hover:bg-purple-50 px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
              data-testid="button-submit-ticket"
            >
              Submit Support Ticket
            </a>
            <a 
              href="tel:325-480-9870"
              className="inline-flex items-center justify-center border-2 border-white bg-transparent text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-all"
              data-testid="button-call-support"
            >
              Call Support
            </a>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
