import { PageTemplate } from "@/components/PageTemplate";
import { ConversionPathBar } from "@/components/ConversionPathBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Lock, Server, Users, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { CTA } from "@/lib/ctaCopy";
import { useSEO } from "@/hooks/useSEO";

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
      case "critical":
        return "border border-red-500/40 bg-transparent text-red-300";
      case "high":
        return "border border-de-hairline bg-transparent text-white";
      case "medium":
        return "border border-de-hairline bg-transparent text-white/70";
      default:
        return "border border-de-hairline bg-transparent text-white/55";
    }
  };

  useSEO({
    title: "Business Security Checklist",
    description:
      "Interactive security checklist for Arizona businesses. Assess access control, endpoints, network, backups, and training before you talk to an MSP.",
    canonical: "/resources/security-checklist",
  });

  return (
    <PageTemplate
      title="Business Security Checklist"
      subtitle="Use this interactive checklist to assess your organization's security posture. Complete these essential items to strengthen your defenses."
      icon={<Shield className="h-10 w-10 text-de-accent-ink" />}
      breadcrumbs={[{ label: "Resources", href: "/resources" }, { label: "Security Checklist" }]}
      actions={
        <Button asChild variant="brand" size="lg" className="h-12 px-6 font-semibold" data-testid="button-get-assessment">
          <a href="/book">{CTA.primary}</a>
        </Button>
      }
    >
      <div className="mx-auto max-w-5xl space-y-12">
          <div className="rounded-2xl border border-de-hairline bg-de-raised p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Your Progress</h2>
                  <p className="text-white/70">
                    {completedItems} of {totalItems} items completed
                  </p>
                </div>
                <div className="text-4xl font-bold text-de-accent-ink">{percentComplete}%</div>
              </div>
              <div className="h-4 w-full rounded-full bg-de-bg">
                <div
                  className="h-4 rounded-full bg-[#D3126A] transition-all duration-500"
                  style={{ width: `${percentComplete}%` }}
                />
              </div>
              <div className="mt-4">
                <Button
                  asChild
                  variant="outline"
                  className="border-de-hairline bg-transparent text-white/70 hover:bg-de-bg hover:text-white"
                  data-testid="button-request-checklist"
                >
                  <a href="/book">Request a reviewed checklist</a>
                </Button>
              </div>
          </div>

          <div className="space-y-8">
            {checklistData.map((category) => (
              <section
                key={category.name}
                className="rounded-2xl border border-de-hairline bg-de-raised p-6"
                data-testid={`card-category-${category.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                  <h2 className="mb-6 flex items-center gap-3 text-xl font-semibold text-white">
                    <category.icon className="h-6 w-6 text-de-accent-ink" aria-hidden="true" />
                    {category.name}
                  </h2>
                  <div className="space-y-4">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className={`rounded-lg border p-4 transition-colors ${
                        checkedItems.has(item.id)
                          ? "border-[#D3126A]/40 bg-de-bg"
                          : "border-de-hairline bg-de-bg"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <Checkbox
                          id={item.id}
                          checked={checkedItems.has(item.id)}
                          onCheckedChange={() => toggleItem(item.id)}
                          className="mt-1 border-white/30 data-[state=checked]:border-[#D3126A] data-[state=checked]:bg-[#D3126A]"
                          data-testid={`checkbox-${item.id}`}
                        />
                        <div className="flex-1">
                          <div className="mb-1 flex items-center gap-3">
                            <label
                              htmlFor={item.id}
                              className={`cursor-pointer font-medium ${checkedItems.has(item.id) ? "text-white/55 line-through" : "text-white"}`}
                            >
                              {item.title}
                            </label>
                            <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                          </div>
                          <p className="text-sm text-white/55">{item.description}</p>
                        </div>
                        {checkedItems.has(item.id) && (
                          <CheckCircle2 className="h-5 w-5 text-de-accent-ink" aria-hidden="true" />
                        )}
                      </div>
                    </div>
                  ))}
                  </div>
              </section>
            ))}
          </div>

          <ConversionPathBar
            headline="Need help completing your checklist?"
            body="Our security experts can help you implement these controls. Start with a Cyber Risk Assessment."
            primaryTestId="button-schedule-consultation"
          />
      </div>
    </PageTemplate>
  );
}
