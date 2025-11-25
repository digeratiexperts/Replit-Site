import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const SolutionsIndex = () => {
  const solutions = [
    { key: "office-package", title: "Office Package", color: "from-blue-600 to-indigo-600" },
    { key: "managed-it-support", title: "Managed IT Support", color: "from-indigo-600 to-blue-600" },
    { key: "managed-workplace", title: "Managed Workplace", color: "from-emerald-600 to-teal-600" },
    { key: "cloud-backup", title: "Cloud Backup", color: "from-blue-600 to-cyan-600" },
    { key: "security-awareness", title: "Security Awareness Training", color: "from-amber-600 to-orange-600" },
    { key: "co-managed-it", title: "Co-Managed IT", color: "from-purple-700 to-indigo-700" },
    { key: "threat-detection", title: "Threat Detection & Response", color: "from-red-700 to-rose-700" },
    { key: "security-operations", title: "Security Operations (SOC)", color: "from-purple-600 to-indigo-600" },
    { key: "backup-disaster-recovery", title: "Backup & Disaster Recovery", color: "from-cyan-600 to-indigo-600" },
    { key: "vcio-strategy", title: "vCIO & Strategy", color: "from-emerald-600 to-green-600" },
    { key: "data-encryption", title: "Data Encryption & Control", color: "from-indigo-600 to-cyan-600" },
    { key: "compliance-reports", title: "Compliance & Risk Reports", color: "from-purple-600 to-indigo-600" },
    { key: "unified-security", title: "Unified Security Posture", color: "from-red-600 to-pink-600" }
  ];

  return (
    <PageTemplate
      title="All Solutions"
      subtitle="Comprehensive IT and security solutions for Arizona businesses"
    >
      <div className="space-y-12">
        <p className="text-xl text-gray-700 text-center max-w-2xl mx-auto">
          Explore our complete portfolio of managed IT, security, compliance, and strategic services designed to protect your business.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution) => (
            <Link key={solution.key} href={`/solutions/${solution.key}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${solution.color} mb-4`} />
                  <CardTitle>{solution.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-purple-600">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </PageTemplate>
  );
};

export default SolutionsIndex;
