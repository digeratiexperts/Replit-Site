import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText, ExternalLink, Shield, Server, Cloud, Users, Lock, BarChart } from "lucide-react";

interface Document {
  id: number;
  title: string;
  description: string;
  category: string;
  type: "datasheet" | "whitepaper" | "guide" | "infographic";
  pages?: number;
  fileSize: string;
  icon: any;
}

const documents: Document[] = [
  {
    id: 1,
    title: "Managed IT Support Services",
    description: "Comprehensive overview of our managed IT support offerings, SLAs, and service levels.",
    category: "Services",
    type: "datasheet",
    pages: 4,
    fileSize: "2.1 MB",
    icon: Server,
  },
  {
    id: 2,
    title: "Cybersecurity Solutions",
    description: "Details on our multi-layered security approach including EDR, SIEM, and SOC services.",
    category: "Security",
    type: "datasheet",
    pages: 6,
    fileSize: "3.4 MB",
    icon: Shield,
  },
  {
    id: 3,
    title: "Cloud Backup & Disaster Recovery",
    description: "Technical specifications and pricing for our backup and DR solutions.",
    category: "Backup",
    type: "datasheet",
    pages: 4,
    fileSize: "1.8 MB",
    icon: Cloud,
  },
  {
    id: 4,
    title: "HIPAA Compliance Guide",
    description: "Step-by-step guide to achieving and maintaining HIPAA compliance for healthcare providers.",
    category: "Compliance",
    type: "guide",
    pages: 24,
    fileSize: "5.2 MB",
    icon: Lock,
  },
  {
    id: 5,
    title: "Security Awareness Training Program",
    description: "Overview of our employee security training platform and curriculum.",
    category: "Training",
    type: "datasheet",
    pages: 3,
    fileSize: "1.5 MB",
    icon: Users,
  },
  {
    id: 6,
    title: "Cost of a Data Breach",
    description: "Analysis of breach costs and ROI of preventive security measures for SMBs.",
    category: "Research",
    type: "whitepaper",
    pages: 12,
    fileSize: "4.1 MB",
    icon: BarChart,
  },
  {
    id: 7,
    title: "Zero Trust Security Framework",
    description: "Understanding and implementing Zero Trust architecture for your organization.",
    category: "Security",
    type: "whitepaper",
    pages: 18,
    fileSize: "4.8 MB",
    icon: Shield,
  },
  {
    id: 8,
    title: "Ransomware Defense Infographic",
    description: "Visual guide to ransomware attack vectors and prevention strategies.",
    category: "Security",
    type: "infographic",
    fileSize: "1.2 MB",
    icon: FileText,
  },
  {
    id: 9,
    title: "Co-Managed IT Services",
    description: "How our co-managed IT model works alongside your internal team.",
    category: "Services",
    type: "datasheet",
    pages: 4,
    fileSize: "2.3 MB",
    icon: Users,
  },
  {
    id: 10,
    title: "Compliance Requirements by Industry",
    description: "Overview of PCI DSS, HIPAA, SOX, and other compliance frameworks.",
    category: "Compliance",
    type: "guide",
    pages: 16,
    fileSize: "3.8 MB",
    icon: Lock,
  },
  {
    id: 11,
    title: "vCIO Strategic Planning",
    description: "How our virtual CIO services help align IT with business objectives.",
    category: "Services",
    type: "datasheet",
    pages: 5,
    fileSize: "2.6 MB",
    icon: BarChart,
  },
  {
    id: 12,
    title: "Endpoint Detection & Response",
    description: "Technical deep-dive into our EDR solution and threat response capabilities.",
    category: "Security",
    type: "datasheet",
    pages: 6,
    fileSize: "3.1 MB",
    icon: Shield,
  },
];

const categories = ["All", "Services", "Security", "Backup", "Compliance", "Training", "Research"];

const getTypeColor = (type: string) => {
  switch (type) {
    case "datasheet": return "bg-violet-500/20 text-violet-400 border-violet-500/30";
    case "whitepaper": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    case "guide": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "infographic": return "bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30";
    default: return "bg-white/10 text-white/70 border-white/20";
  }
};

export default function Datasheets() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <MegaMenu />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-violet-500/20 text-violet-400 border-violet-500/30">
              Resource Library
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Datasheets & Documentation
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Download detailed information about our services, solutions, and best practices guides.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                className="border-violet-500/30 bg-transparent text-white/70 hover:bg-violet-500/10 hover:text-violet-400 hover:border-violet-400"
                data-testid={`button-filter-${category.toLowerCase()}`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Document Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <Card key={doc.id} className="bg-white/[0.02] border-white/10 hover:border-violet-500/50 transition-colors" data-testid={`card-document-${doc.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-12 h-12 rounded-lg bg-violet-500/20 flex items-center justify-center">
                      <doc.icon className="h-6 w-6 text-violet-400" />
                    </div>
                    <Badge className={getTypeColor(doc.type)}>
                      {doc.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-white">{doc.title}</CardTitle>
                  <CardDescription className="text-white/60">
                    {doc.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-white/50 mb-4">
                    <span>{doc.category}</span>
                    <span>{doc.pages ? `${doc.pages} pages` : ""} • {doc.fileSize}</span>
                  </div>
                  <Button className="w-full bg-violet-600 hover:bg-violet-500 text-white" data-testid={`button-download-${doc.id}`}>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Request Custom Content */}
          <Card className="mt-12 bg-gradient-to-r from-violet-600/20 to-purple-600/20 border-violet-500/30">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Need Custom Documentation?</h3>
                  <p className="text-white/70">We can provide tailored proposals, assessments, and documentation for your specific needs.</p>
                </div>
                <Button 
                  className="bg-white text-violet-700 hover:bg-white/90 whitespace-nowrap"
                  onClick={() => window.open("https://meet.digerati-experts.com/", "_blank")}
                  data-testid="button-request-docs"
                >
                  Request Documents
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Legal Notice */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>All documents are for informational purposes. Contact us for specific pricing and service details.</p>
            <p className="mt-1">© {new Date().getFullYear()} Digerati Experts. All rights reserved.</p>
          </div>
        </div>
      </main>

      <DigeratiEnhancedFooterSection />
    </div>
  );
}
