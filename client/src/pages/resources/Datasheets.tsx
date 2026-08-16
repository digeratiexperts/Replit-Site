import { Link } from "wouter";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText, ExternalLink, Shield, Server, Cloud, Users, Lock, BarChart } from "lucide-react";
import { resources as registryResources } from "@/data/resourceRegistry";

interface Document {
  id: number;
  title: string;
  description: string;
  category: string;
  type: "datasheet" | "whitepaper" | "guide" | "infographic";
  pages?: number;
  fileSize?: string;
  icon: any;
  downloadUrl?: string;
}

/** Map page card titles to registry resource titles when a close match exists */
const TITLE_TO_REGISTRY: Record<string, string[]> = {
  "Managed IT Support Services": ["Managed Workplace Overview", "ProActive IT Ecosystem Datasheet"],
  "Cybersecurity Solutions": ["ProActive IT & Security Ecosystem Overview"],
  "Cloud Backup & Disaster Recovery": [],
  "HIPAA Compliance Guide": [],
  "Security Awareness Training Program": [],
  "Cost of a Data Breach": [],
  "Zero Trust Security Framework": [],
  "Ransomware Defense Infographic": [],
  "Co-Managed IT Services": ["Co-Managed IT Datasheet"],
  "Compliance Requirements by Industry": ["Compliance & Risk Reports Overview"],
  "vCIO Strategic Planning": [],
  "Endpoint Detection & Response": [],
};

function resolveDownloadUrl(title: string): string | undefined {
  const candidates = TITLE_TO_REGISTRY[title] ?? [];
  for (const candidate of candidates) {
    const match = registryResources.find(
      (r) => r.title.toLowerCase() === candidate.toLowerCase()
    );
    if (match?.file) return match.file;
  }
  const exact = registryResources.find(
    (r) => r.title.toLowerCase() === title.toLowerCase()
  );
  if (exact?.file) return exact.file;
  return undefined;
}

const documents: Document[] = [
  {
    id: 1,
    title: "Managed IT Support Services",
    description: "Comprehensive overview of our managed IT support offerings, SLAs, and service levels.",
    category: "Services",
    type: "datasheet",
    pages: 4,
    icon: Server,
  },
  {
    id: 2,
    title: "Cybersecurity Solutions",
    description: "Details on our multi-layered security approach including EDR, SIEM, and SOC services.",
    category: "Security",
    type: "datasheet",
    pages: 6,
    icon: Shield,
  },
  {
    id: 3,
    title: "Cloud Backup & Disaster Recovery",
    description: "Technical specifications and pricing for our backup and DR solutions.",
    category: "Backup",
    type: "datasheet",
    pages: 4,
    icon: Cloud,
  },
  {
    id: 4,
    title: "HIPAA Compliance Guide",
    description: "Step-by-step guide to achieving and maintaining HIPAA compliance for healthcare providers.",
    category: "Compliance",
    type: "guide",
    pages: 24,
    icon: Lock,
  },
  {
    id: 5,
    title: "Security Awareness Training Program",
    description: "Overview of our employee security training platform and curriculum.",
    category: "Training",
    type: "datasheet",
    pages: 3,
    icon: Users,
  },
  {
    id: 6,
    title: "Cost of a Data Breach",
    description: "Analysis of breach costs and ROI of preventive security measures for SMBs.",
    category: "Research",
    type: "whitepaper",
    pages: 12,
    icon: BarChart,
  },
  {
    id: 7,
    title: "Zero Trust Security Framework",
    description: "Understanding and implementing Zero Trust architecture for your organization.",
    category: "Security",
    type: "whitepaper",
    pages: 18,
    icon: Shield,
  },
  {
    id: 8,
    title: "Ransomware Defense Infographic",
    description: "Visual guide to ransomware attack vectors and prevention strategies.",
    category: "Security",
    type: "infographic",
    icon: FileText,
  },
  {
    id: 9,
    title: "Co-Managed IT Services",
    description: "How our co-managed IT model works alongside your internal team.",
    category: "Services",
    type: "datasheet",
    pages: 4,
    icon: Users,
  },
  {
    id: 10,
    title: "Compliance Requirements by Industry",
    description: "Overview of PCI DSS, HIPAA, SOX, and other compliance frameworks.",
    category: "Compliance",
    type: "guide",
    pages: 16,
    icon: Lock,
  },
  {
    id: 11,
    title: "vCIO Strategic Planning",
    description: "How our virtual CIO services help align IT with business objectives.",
    category: "Services",
    type: "datasheet",
    pages: 5,
    icon: BarChart,
  },
  {
    id: 12,
    title: "Endpoint Detection & Response",
    description: "Technical deep-dive into our EDR solution and threat response capabilities.",
    category: "Security",
    type: "datasheet",
    pages: 6,
    icon: Shield,
  },
].map((doc) => ({
  ...doc,
  downloadUrl: resolveDownloadUrl(doc.title),
}));

const categories = ["All", "Services", "Security", "Backup", "Compliance", "Training", "Research"];

const getTypeColor = (type: string) => {
  switch (type) {
    case "datasheet": return "bg-de-raised text-de-accent-ink border-de-hairline";
    case "whitepaper": return "bg-de-raised text-de-accent-ink border-de-hairline";
    case "guide": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "infographic": return "bg-de-raised text-de-accent-ink border-de-hairline";
    default: return "bg-white/10 text-white/70 border-white/20";
  }
};

export default function Datasheets() {
  const downloadableCount = documents.filter((d) => d.downloadUrl).length;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <MegaMenu />
      
      <main className="de-nav-clear pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-de-raised text-de-accent-ink border-de-hairline">
              Resource Library
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Datasheets & Documentation
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Browse our service documentation. {downloadableCount} documents are available for immediate PDF download;
              others can be requested and we&apos;ll send the latest version.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                className="border-de-hairline bg-transparent text-white/70 hover:bg-de-raised hover:text-de-accent-ink hover:border-de-hairline"
                data-testid={`button-filter-${category.toLowerCase()}`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Document Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <Card key={doc.id} className="bg-white/[0.02] border-white/10 hover:border-de-hairline transition-colors" data-testid={`card-document-${doc.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-12 h-12 rounded-lg bg-de-raised flex items-center justify-center">
                      <doc.icon className="h-6 w-6 text-de-accent-ink" />
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
                    <span>{doc.pages ? `${doc.pages} pages` : "Document"}</span>
                  </div>
                  {doc.downloadUrl ? (
                    <Button
                      asChild
                      className="w-full bg-de-accent hover:bg-de-accent text-white"
                      data-testid={`button-download-${doc.id}`}
                    >
                      <a href={doc.downloadUrl} download target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </a>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-de-hairline text-de-accent-ink hover:bg-de-raised hover:text-de-accent-ink"
                      data-testid={`button-request-${doc.id}`}
                    >
                      <Link href="/book">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Request document
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Request Custom Content */}
          <Card className="mt-12 bg-de-raised border-de-hairline">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Need Custom Documentation?</h3>
                  <p className="text-white/70">We can provide tailored proposals, assessments, and documentation for your specific needs.</p>
                </div>
                <Button 
                  className="bg-white text-de-accent hover:bg-white/90 whitespace-nowrap"
                  onClick={() => window.location.href = "/book"}
                  data-testid="button-request-docs"
                >
                  Request Documents
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Legal Notice */}
          <div className="mt-8 text-center text-sm text-white/70">
            <p>All documents are for informational purposes. Contact us for specific pricing and service details.</p>
            <p className="mt-1">© {new Date().getFullYear()} Digerati Experts. All rights reserved.</p>
          </div>
        </div>
      </main>

      <DigeratiEnhancedFooterSection />
    </div>
  );
}
