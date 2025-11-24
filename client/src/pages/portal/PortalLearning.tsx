import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PortalLayout } from "./PortalLayout";
import { ExternalLink, BookOpen, Video, FileText, Zap } from "lucide-react";
import { Link } from "wouter";

export default function PortalLearning() {
  const resources = [
    {
      title: "Ecosystem & Pricing",
      description: "Learn about our complete service offerings and pricing tiers tailored to your business needs.",
      icon: Zap,
      link: "https://digeratiexperts.com/ecosystem-pricing/",
      type: "Resource",
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Getting Started Guide",
      description: "A comprehensive guide to help you get the most out of your managed services on day one.",
      icon: BookOpen,
      link: "https://digeratiexperts.com/knowledge-base/getting-started",
      type: "Guide",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Security Best Practices",
      description: "Learn how we protect your business and the best practices to ensure maximum security.",
      icon: FileText,
      link: "https://digeratiexperts.com/resources/security-best-practices",
      type: "Resource",
      color: "from-red-500 to-pink-500",
    },
    {
      title: "Feature Tutorials",
      description: "Video tutorials on how to use common features and maximize productivity.",
      icon: Video,
      link: "https://digeratiexperts.com/resources/tutorials",
      type: "Tutorial",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const learnTopics = [
    {
      title: "ProActive IT Services",
      description: "Understand how our proactive approach prevents issues before they impact your business",
      sections: [
        "What is ProActive IT?",
        "Continuous Monitoring & Maintenance",
        "Predictive Issue Resolution",
        "Cost Savings vs Reactive IT",
      ],
    },
    {
      title: "Managed Workplace Services",
      description: "Streamline your digital workplace with comprehensive identity and device management",
      sections: [
        "Identity & Access Management",
        "Device & Mobile Management",
        "Employee Onboarding Automation",
        "Workplace Compliance",
      ],
    },
    {
      title: "Security & Compliance",
      description: "Protect your business with enterprise-grade security and compliance solutions",
      sections: [
        "Security Baseline Standards",
        "Threat Detection & Response",
        "Compliance Documentation",
        "Security Awareness Training",
      ],
    },
    {
      title: "Business Continuity",
      description: "Ensure your business never stops with comprehensive backup and disaster recovery",
      sections: [
        "Cloud Backup Strategy",
        "Disaster Recovery Planning",
        "Recovery Point Objectives",
        "Business Continuity Testing",
      ],
    },
  ];

  return (
    <PortalLayout title="Learning Center">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Learning Center</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Discover resources to help you maximize your services and grow your business
          </p>
        </div>

        {/* Featured Resources */}
        <div>
          <h3 className="text-lg font-bold mb-4">Featured Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Card
                  key={resource.title}
                  className="hover:border-[#5034ff]/50 transition-colors cursor-pointer"
                  data-testid={`resource-${resource.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          <Icon className="h-5 w-5 text-[#5034ff]" />
                          {resource.title}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {resource.description}
                        </CardDescription>
                      </div>
                      <span className="text-xs bg-[#5034ff]/10 text-[#5034ff] px-2 py-1 rounded">
                        {resource.type}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <a href={resource.link} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        className="w-full border-[#5034ff]/30 hover:bg-[#5034ff]/10"
                        data-testid={`button-learn-${resource.title.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Learn More
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Learning Topics */}
        <div>
          <h3 className="text-lg font-bold mb-4">Learning Topics</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {learnTopics.map((topic) => (
              <Card key={topic.title}>
                <CardHeader>
                  <CardTitle className="text-base">{topic.title}</CardTitle>
                  <CardDescription>{topic.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {topic.sections.map((section) => (
                      <li
                        key={section}
                        className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <span className="h-1.5 w-1.5 bg-[#5034ff] rounded-full" />
                        {section}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-[#5034ff]/10 to-blue-500/10 border-[#5034ff]/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold">Ready to Learn More?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Explore our complete ecosystem and pricing to discover which services are right for your business.
              </p>
              <a
                href="https://digeratiexperts.com/ecosystem-pricing/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  className="bg-[#5034ff] hover:bg-[#5034ff]/90 text-white"
                  data-testid="button-explore-ecosystem"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Explore Our Services
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
