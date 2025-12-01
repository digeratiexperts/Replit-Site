import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Download, ExternalLink, Lock, Server, Users, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
}

interface ChecklistCategory {
  name: string;
  icon: any;
  items: ChecklistItem[];
}

const checklistData: ChecklistCategory[] = [
  {
    name: "Access Control",
    icon: Lock,
    items: [
      { id: "ac1", title: "Multi-Factor Authentication (MFA)", description: "Enable MFA on all accounts, especially admin and privileged accounts", priority: "critical" },
      { id: "ac2", title: "Strong Password Policy", description: "Enforce minimum 12 characters with complexity requirements", priority: "critical" },
      { id: "ac3", title: "Principle of Least Privilege", description: "Users should only have access to resources they need", priority: "high" },
      { id: "ac4", title: "Regular Access Reviews", description: "Quarterly review of user access rights and permissions", priority: "medium" },
      { id: "ac5", title: "Offboarding Procedures", description: "Immediate account disabling when employees leave", priority: "critical" },
    ],
  },
  {
    name: "Endpoint Security",
    icon: Shield,
    items: [
      { id: "es1", title: "Endpoint Detection & Response (EDR)", description: "Deploy EDR on all workstations and servers", priority: "critical" },
      { id: "es2", title: "Operating System Updates", description: "Enable automatic updates for all operating systems", priority: "critical" },
      { id: "es3", title: "Application Updates", description: "Keep all applications patched and updated", priority: "high" },
      { id: "es4", title: "Full Disk Encryption", description: "Encrypt all laptops and removable storage devices", priority: "high" },
      { id: "es5", title: "USB Device Control", description: "Restrict unauthorized USB device usage", priority: "medium" },
    ],
  },
  {
    name: "Network Security",
    icon: Server,
    items: [
      { id: "ns1", title: "Next-Gen Firewall", description: "Deploy enterprise-grade firewall with intrusion prevention", priority: "critical" },
      { id: "ns2", title: "Network Segmentation", description: "Separate critical systems from general network traffic", priority: "high" },
      { id: "ns3", title: "Secure Wi-Fi", description: "Use WPA3 encryption with separate guest networks", priority: "high" },
      { id: "ns4", title: "VPN for Remote Access", description: "Require VPN for all remote connections", priority: "critical" },
      { id: "ns5", title: "DNS Filtering", description: "Block malicious domains at the DNS level", priority: "high" },
    ],
  },
  {
    name: "Data Protection",
    icon: AlertTriangle,
    items: [
      { id: "dp1", title: "Regular Backups", description: "Daily backups with offsite/cloud copies", priority: "critical" },
      { id: "dp2", title: "Backup Testing", description: "Monthly restoration tests to verify backup integrity", priority: "high" },
      { id: "dp3", title: "Data Classification", description: "Identify and label sensitive data", priority: "medium" },
      { id: "dp4", title: "Email Security", description: "Deploy email filtering and anti-phishing protection", priority: "critical" },
      { id: "dp5", title: "Data Loss Prevention", description: "Monitor and prevent unauthorized data transfers", priority: "high" },
    ],
  },
  {
    name: "User Training",
    icon: Users,
    items: [
      { id: "ut1", title: "Security Awareness Training", description: "Annual training for all employees", priority: "high" },
      { id: "ut2", title: "Phishing Simulations", description: "Monthly simulated phishing tests", priority: "high" },
      { id: "ut3", title: "Incident Reporting", description: "Clear process for reporting security concerns", priority: "medium" },
      { id: "ut4", title: "Role-Based Training", description: "Additional training for IT and admin staff", priority: "medium" },
      { id: "ut5", title: "Security Policies", description: "Documented and acknowledged security policies", priority: "high" },
    ],
  },
];

export default function SecurityChecklist() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const totalItems = checklistData.reduce((acc, cat) => acc + cat.items.length, 0);
  const completedItems = checkedItems.size;
  const percentComplete = Math.round((completedItems / totalItems) * 100);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "high": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030228] to-[#0f0d2e]">
      <MegaMenu />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#5034ff]/20 text-[#5034ff] border-[#5034ff]/30">
              Security Checklist
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Business Security Checklist
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Use this interactive checklist to assess your organization's security posture. Complete these essential items to strengthen your defenses.
            </p>
          </div>

          {/* Progress Card */}
          <Card className="mb-8 bg-gradient-to-r from-[#5034ff]/20 to-purple-600/20 border-[#5034ff]/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Your Progress</h3>
                  <p className="text-gray-300">{completedItems} of {totalItems} items completed</p>
                </div>
                <div className="text-4xl font-bold text-[#5034ff]">{percentComplete}%</div>
              </div>
              <div className="w-full bg-white/10 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-[#5034ff] to-purple-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${percentComplete}%` }}
                />
              </div>
              <div className="mt-4 flex gap-4">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" data-testid="button-download-pdf">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button 
                  className="bg-[#5034ff] hover:bg-[#5034ff]/90"
                  onClick={() => window.open("https://meet.digerati-experts.com/", "_blank")}
                  data-testid="button-get-assessment"
                >
                  Get Free Assessment
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Checklist Categories */}
          <div className="space-y-8">
            {checklistData.map((category) => (
              <Card key={category.name} className="bg-white/5 border-white/10" data-testid={`card-category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-3">
                    <category.icon className="h-6 w-6 text-[#5034ff]" />
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.items.map((item) => (
                    <div 
                      key={item.id}
                      className={`p-4 rounded-lg border transition-colors ${
                        checkedItems.has(item.id) 
                          ? "bg-green-500/10 border-green-500/30" 
                          : "bg-white/5 border-white/10"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <Checkbox
                          id={item.id}
                          checked={checkedItems.has(item.id)}
                          onCheckedChange={() => toggleItem(item.id)}
                          className="mt-1 border-white/30 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                          data-testid={`checkbox-${item.id}`}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <label 
                              htmlFor={item.id} 
                              className={`font-medium cursor-pointer ${checkedItems.has(item.id) ? "text-green-400 line-through" : "text-white"}`}
                            >
                              {item.title}
                            </label>
                            <Badge className={getPriorityColor(item.priority)}>
                              {item.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400">{item.description}</p>
                        </div>
                        {checkedItems.has(item.id) && (
                          <CheckCircle2 className="h-5 w-5 text-green-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <Card className="mt-12 bg-white/5 border-white/10">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Need Help Completing Your Checklist?</h3>
              <p className="text-gray-300 mb-6">Our security experts can help you implement these controls and more. Schedule a free consultation.</p>
              <Button 
                className="bg-[#5034ff] hover:bg-[#5034ff]/90"
                onClick={() => window.open("https://meet.digerati-experts.com/", "_blank")}
                data-testid="button-schedule-consultation"
              >
                Schedule Free Consultation
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <DigeratiEnhancedFooterSection />
    </div>
  );
}
