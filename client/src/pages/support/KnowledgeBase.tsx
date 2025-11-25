import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Book, FileText, Video, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function KnowledgeBase() {
  const [searchTerm, setSearchTerm] = useState("");

  const articles = [
    {
      category: "Getting Started",
      icon: Zap,
      articles: [
        { title: "How to Access Your Client Portal", views: "1.2K" },
        { title: "Setting Up Multi-Factor Authentication", views: "892" },
        { title: "Submitting Your First Support Ticket", views: "756" },
        { title: "Understanding Your Invoice and Payment Options", views: "634" }
      ]
    },
    {
      category: "Troubleshooting",
      icon: FileText,
      articles: [
        { title: "Resetting Your Portal Password", views: "2.1K" },
        { title: "Cannot Connect to Remote Support", views: "1.4K" },
        { title: "Email and Calendar Not Syncing", views: "987" },
        { title: "Network Connectivity Issues", views: "856" }
      ]
    },
    {
      category: "Security & Compliance",
      icon: Book,
      articles: [
        { title: "Understanding HIPAA Requirements", views: "1.8K" },
        { title: "Best Practices for Password Management", views: "1.6K" },
        { title: "Recognizing Phishing and Social Engineering", views: "1.3K" },
        { title: "Data Backup and Recovery Options", views: "945" }
      ]
    }
  ];

  return (
    <PageTemplate
      title="Knowledge Base"
      subtitle="Self-service resources and troubleshooting guides for Digerati Experts clients"
    >
      <div className="space-y-12">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto w-full">
          <div className="relative">
            <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search knowledge base..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg"
              data-testid="input-search-kb"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {articles.map((category, idx) => {
            const Icon = category.icon;
            return (
              <div key={idx}>
                <div className="flex items-center gap-3 mb-6">
                  <Icon className="h-6 w-6 text-purple-600" />
                  <h2 className="text-2xl font-bold">{category.category}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {category.articles.map((article, i) => (
                    <Card key={i} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-lg">{article.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500">{article.views} views</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Links */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Quick Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6">
              <Video className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-semibold mb-2">Video Tutorials</h3>
              <p className="text-gray-600 text-sm mb-4">Step-by-step video guides for common tasks</p>
              <Button variant="outline" size="sm" data-testid="button-video-tutorials">Watch Videos</Button>
            </div>
            <div className="bg-white rounded-lg p-6">
              <FileText className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-semibold mb-2">Documentation</h3>
              <p className="text-gray-600 text-sm mb-4">Complete technical documentation and guides</p>
              <Button variant="outline" size="sm" data-testid="button-documentation">View Docs</Button>
            </div>
            <div className="bg-white rounded-lg p-6">
              <Zap className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-semibold mb-2">Quick Tips</h3>
              <p className="text-gray-600 text-sm mb-4">Productivity hacks and best practices</p>
              <Button variant="outline" size="sm" data-testid="button-quick-tips">Read Tips</Button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Didn't Find What You're Looking For?</h2>
          <p className="text-lg mb-6">Our support team is ready to help 24/7.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/support/submit-ticket" 
              className="inline-flex items-center justify-center bg-white text-purple-700 hover:bg-gray-100 px-8 py-3 rounded-md font-semibold transition-all"
              data-testid="button-submit-ticket"
            >
              Submit Support Ticket
            </a>
            <a 
              href="tel:325-480-9870"
              className="inline-flex items-center justify-center border-2 border-white bg-transparent text-white hover:bg-white hover:text-purple-700 px-8 py-3 rounded-md font-semibold transition-all"
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
