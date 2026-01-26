import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "./sections/DigeratiEnhancedFooterSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users, Building2, ChevronDown, ChevronUp, Shield, Server, 
  Lock, Mail, GraduationCap, Database, HardDrive, Monitor,
  FileText, Key, ArrowRight, Check, Calculator, Sparkles,
  TrendingUp, DollarSign, Percent
} from "lucide-react";
import { FloatingParticles } from "@/components/graphics";
import { useSEO } from "@/hooks/useSEO";

interface Service {
  id: string;
  name: string;
  icon: typeof Shield;
  unit: string;
  cost: number;
  qtyPerUser: number;
  category: string;
}

interface Plan {
  id: string;
  name: string;
  tier: string;
  pricePerUser: number;
  minUsers: number;
  siteFee: number;
  minMonthly: number;
  bullets: string[];
  gradient: string;
  borderColor: string;
  services: string[];
  popular?: boolean;
}

const services: Service[] = [
  { id: "jumpcloud", name: "JumpCloud IAM (SSO/MFA/Device)", icon: Key, unit: "user/mo", cost: 21.6, qtyPerUser: 1, category: "identity" },
  { id: "blackpoint", name: "Blackpoint MDR/XDR", icon: Shield, unit: "user/mo", cost: 5, qtyPerUser: 1, category: "mdr" },
  { id: "coro", name: "Coro (EDR+Email+Cloud)", icon: Monitor, unit: "user/mo", cost: 20, qtyPerUser: 1, category: "edr" },
  { id: "emailsec", name: "Email Security", icon: Mail, unit: "user/mo", cost: 3, qtyPerUser: 1, category: "security" },
  { id: "ninjio", name: "Security Awareness Training", icon: GraduationCap, unit: "user/mo", cost: 1.5, qtyPerUser: 1, category: "training" },
  { id: "msp360_m365", name: "MSP360 SaaS Backup (M365/GWS)", icon: Database, unit: "user/mo", cost: 1.10, qtyPerUser: 1, category: "backup" },
  { id: "wasabi", name: "Wasabi Cloud Storage", icon: HardDrive, unit: "TB/mo", cost: 6.99, qtyPerUser: 0.10, category: "storage" },
  { id: "controlone_user", name: "ControlOne Endpoint", icon: Monitor, unit: "user/mo", cost: 10, qtyPerUser: 1, category: "rmm" },
  { id: "controlone_org", name: "ControlOne Cloud Instance", icon: Server, unit: "org/mo", cost: 49, qtyPerUser: 0, category: "rmm" },
  { id: "controlone_site", name: "ControlOne Site License + HW", icon: Building2, unit: "site/mo", cost: 100, qtyPerUser: 0, category: "rmm" },
  { id: "wazuh", name: "Wazuh SIEM (self-hosted)", icon: Shield, unit: "org/mo", cost: 0, qtyPerUser: 0, category: "monitoring" },
  { id: "hudu", name: "Hudu IT Documentation", icon: FileText, unit: "org/mo", cost: 30, qtyPerUser: 0, category: "compliance" },
  { id: "msp360_connect", name: "MSP360 Connect (admin)", icon: Server, unit: "admin/mo", cost: 34.99, qtyPerUser: 0.05, category: "rmm" },
  { id: "msp360_rmm", name: "MSP360 RMM (admin)", icon: Monitor, unit: "admin/mo", cost: 59.99, qtyPerUser: 0.05, category: "rmm" },
  { id: "atakama", name: "Atakama Passwordless/File Encryption", icon: Lock, unit: "user/mo", cost: 0, qtyPerUser: 1, category: "security" },
];

const plans: Plan[] = [
  {
    id: "office_essentials",
    name: "Office Essentials",
    tier: "Monitoring",
    pricePerUser: 0,
    minUsers: 3,
    siteFee: 500,
    minMonthly: 500,
    bullets: ["Agent Deployment", "Patch Management", "Security Alerts", "Basic XDR (up to 3 devices)", "Monthly Reports", "On-demand Ticketing"],
    gradient: "from-slate-500 to-gray-600",
    borderColor: "border-slate-500/30",
    services: ["msp360_rmm", "msp360_connect", "coro"]
  },
  {
    id: "office_custom",
    name: "Office Custom",
    tier: "Basic IT",
    pricePerUser: 125,
    minUsers: 6,
    siteFee: 750,
    minMonthly: 750,
    bullets: ["Core Platform", "Endpoint Security", "Backup Foundation", "Human Firewall Training", "Business-hours Helpdesk", "Monthly Reviews", "Choose ONE: MDR / Passwordless / Continuity / Cloud Gateway"],
    gradient: "from-violet-500 to-purple-500",
    borderColor: "border-violet-500/30",
    services: ["jumpcloud", "coro", "msp360_m365", "wasabi", "ninjio", "msp360_connect", "msp360_rmm", "hudu"]
  },
  {
    id: "business_managed",
    name: "Business Managed",
    tier: "Security",
    pricePerUser: 240,
    minUsers: 5,
    siteFee: 0,
    minMonthly: 1200,
    bullets: ["CloudShield SASE", "IAM (MFA/SSO)", "XDR + 24/7 MDR", "Email Security", "Continuity (failover)", "Security Training", "Passwordless (Atakama)", "Help Desk Support", "Automation", "Quarterly DR Validation"],
    gradient: "from-purple-500 to-violet-500",
    borderColor: "border-purple-500/30",
    services: ["controlone_user", "controlone_org", "jumpcloud", "blackpoint", "emailsec", "msp360_m365", "wasabi", "ninjio", "wazuh", "hudu"],
    popular: true
  },
  {
    id: "business_network",
    name: "Business Network",
    tier: "Infrastructure",
    pricePerUser: 250,
    minUsers: 10,
    siteFee: 2500,
    minMonthly: 0,
    bullets: ["SASE Overlay Network", "Includes Managed Security Stack", "Legacy Hardware Support", "Network Segmentation", "Lifecycle Planning", "Network Diagrams & Addressing", "Upgrade Path Planning"],
    gradient: "from-cyan-500 to-blue-500",
    borderColor: "border-cyan-500/30",
    services: ["controlone_user", "controlone_org", "controlone_site", "jumpcloud", "blackpoint", "emailsec", "msp360_m365", "wasabi", "ninjio", "wazuh", "hudu"]
  },
  {
    id: "enterprise_compliance",
    name: "Enterprise Compliance",
    tier: "Zero-Trust",
    pricePerUser: 350,
    minUsers: 10,
    siteFee: 0,
    minMonthly: 3500,
    bullets: ["Includes Network Integration", "HIPAA/GDPR/FTC Compliance", "Virtual CISO", "Annual Penetration Test", "Live SOC & Forensic Logging", "Incident Response Plan", "DLP & Vendor Review", "Insurance Documentation"],
    gradient: "from-fuchsia-500 to-pink-500",
    borderColor: "border-fuchsia-500/30",
    services: ["controlone_user", "controlone_org", "controlone_site", "jumpcloud", "blackpoint", "emailsec", "msp360_m365", "wasabi", "ninjio", "wazuh", "hudu", "atakama"]
  }
];

const ProActiveEcosystemPricing = () => {
  const prefersReducedMotion = useReducedMotion();
  const [users, setUsers] = useState(10);
  const [sites, setSites] = useState(1);
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);

  useSEO({
    title: 'ProActive Ecosystem Pricing - Managed IT & Security Plans',
    description: 'Transparent pricing for managed IT services. Office, Business, and Enterprise plans with detailed cost breakdowns. Calculate your exact investment with our interactive pricing tool.',
    canonical: '/proactive-ecosystem-pricing',
    noIndex: true,
  });

  const calculateServiceCost = (serviceId: string, userCount: number, siteCount: number) => {
    const service = services.find(s => s.id === serviceId);
    if (!service) return 0;
    
    if (serviceId === "controlone_org" || serviceId === "wazuh" || serviceId === "hudu") return service.cost;
    if (serviceId === "controlone_site") return siteCount * service.cost;
    if (serviceId === "wasabi") return userCount * service.qtyPerUser * service.cost;
    return service.qtyPerUser * userCount * service.cost;
  };

  const calculatePlanDetails = useMemo(() => {
    return plans.map(plan => {
      const effectiveUsers = Math.max(users, plan.minUsers);
      let baseRevenue = 0;
      
      if (plan.pricePerUser > 0) {
        baseRevenue += effectiveUsers * plan.pricePerUser;
      }
      if (plan.siteFee > 0) {
        baseRevenue += Math.max(sites, 1) * plan.siteFee;
      }
      if (plan.minMonthly > 0) {
        baseRevenue = Math.max(baseRevenue, plan.minMonthly);
      }
      
      const serviceCosts = plan.services.reduce((total, serviceId) => {
        return total + calculateServiceCost(serviceId, effectiveUsers, sites);
      }, 0);
      
      const profit = baseRevenue - serviceCosts;
      const margin = baseRevenue > 0 ? (profit / baseRevenue) * 100 : 0;
      
      return {
        ...plan,
        effectiveUsers,
        monthlyTotal: baseRevenue,
        perUserEffective: baseRevenue / effectiveUsers,
        serviceCosts,
        profit,
        margin
      };
    });
  }, [users, sites]);

  const containerVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a0118] via-[#0d0720] to-[#050312]">
        <motion.div
          className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(139, 92, 246, 0) 60%)",
          }}
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.15, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] left-[-15%] w-[700px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0) 60%)",
          }}
          animate={prefersReducedMotion ? {} : {
            scale: [1.1, 1, 1.1],
            x: [0, -40, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <FloatingParticles count={20} />
      </div>
      
      <MegaMenu />
      
      <main className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Interactive Pricing Calculator
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
              ProActive Ecosystem
              <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Transparent pricing with real-time calculations. Adjust users and sites to see your exact investment.
            </p>
          </motion.div>

          {/* Calculator Controls */}
          <motion.div
            className="mb-8 rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(15, 15, 35, 0.9))',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg">Configure Your Environment</h2>
                  <p className="text-white/50 text-sm">Prices update automatically as you adjust</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-white/70 text-sm font-medium">
                    <Users className="w-4 h-4 text-violet-400" />
                    Number of Users
                  </label>
                  <Input
                    type="number"
                    value={users}
                    onChange={(e) => setUsers(Math.max(1, parseInt(e.target.value) || 1))}
                    min={1}
                    className="bg-white/5 border-white/10 text-white text-lg font-bold h-12"
                    data-testid="input-users"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-white/70 text-sm font-medium">
                    <Building2 className="w-4 h-4 text-violet-400" />
                    Number of Sites
                  </label>
                  <Input
                    type="number"
                    value={sites}
                    onChange={(e) => setSites(Math.max(1, parseInt(e.target.value) || 1))}
                    min={1}
                    className="bg-white/5 border-white/10 text-white text-lg font-bold h-12"
                    data-testid="input-sites"
                  />
                </div>
                <div className="sm:col-span-2 flex items-end">
                  <div className="w-full p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-white/50 text-sm">Calculating for:</span>
                      <span className="text-white font-bold" data-testid="text-calculation-summary">
                        {users} users across {sites} {sites === 1 ? 'site' : 'sites'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Plan Cards */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-5 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {calculatePlanDetails.map((plan) => {
              const isExpanded = expandedPlan === plan.id;
              const planServices = plan.services.map(id => services.find(s => s.id === id)).filter(Boolean) as Service[];
              
              return (
                <motion.div
                  key={plan.id}
                  className={`relative rounded-2xl border backdrop-blur-xl overflow-hidden transition-all duration-300 ${plan.borderColor} ${plan.popular ? 'lg:-mt-4 lg:mb-4 ring-2 ring-purple-500/50' : ''}`}
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))'
                  }}
                  variants={itemVariants}
                  data-testid={`plan-${plan.id}`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-violet-500 text-white text-xs font-bold text-center py-1.5">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <div className={`p-5 ${plan.popular ? 'pt-8' : ''}`}>
                    {/* Plan Header */}
                    <div className={`absolute left-0 right-0 ${plan.popular ? 'top-7' : 'top-0'} h-1 bg-gradient-to-r ${plan.gradient} opacity-80`} />
                    
                    <div className="mb-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${plan.gradient} text-white`} data-testid={`text-tier-${plan.id}`}>
                        {plan.tier}
                      </span>
                      <h3 className="text-white font-bold text-lg mt-2" data-testid={`text-plan-name-${plan.id}`}>{plan.name}</h3>
                    </div>

                    {/* Pricing */}
                    <div className="mb-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-white font-black text-3xl" data-testid={`text-monthly-total-${plan.id}`}>${Math.round(plan.monthlyTotal).toLocaleString()}</span>
                        <span className="text-white/50 text-sm">/mo</span>
                      </div>
                      <div className="text-white/40 text-xs mt-1" data-testid={`text-per-user-${plan.id}`}>
                        ${Math.round(plan.perUserEffective)}/user effective
                      </div>
                      {plan.pricePerUser > 0 && (
                        <div className="text-violet-300 text-xs mt-1">
                          ${plan.pricePerUser}/user base rate
                        </div>
                      )}
                      {plan.siteFee > 0 && (
                        <div className="text-cyan-300 text-xs">
                          +${plan.siteFee}/site
                        </div>
                      )}
                      {plan.minMonthly > 0 && users < plan.minUsers && (
                        <div className="text-amber-300 text-xs mt-1">
                          Min ${plan.minMonthly}/mo ({plan.minUsers}+ users)
                        </div>
                      )}
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center gap-1 text-white/40 text-[10px] uppercase">
                          <TrendingUp className="w-3 h-3" />
                          Margin
                        </div>
                        <div className={`font-bold text-sm ${plan.margin >= 30 ? 'text-emerald-400' : plan.margin >= 15 ? 'text-amber-400' : 'text-red-400'}`} data-testid={`text-margin-${plan.id}`}>
                          {plan.margin.toFixed(1)}%
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center gap-1 text-white/40 text-[10px] uppercase">
                          <DollarSign className="w-3 h-3" />
                          Profit
                        </div>
                        <div className={`font-bold text-sm ${plan.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`} data-testid={`text-profit-${plan.id}`}>
                          ${Math.round(plan.profit).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-1.5 mb-4">
                      {plan.bullets.slice(0, 4).map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2 text-white/70 text-xs">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                      {plan.bullets.length > 4 && !isExpanded && (
                        <li className="text-white/40 text-xs pl-5">
                          +{plan.bullets.length - 4} more features
                        </li>
                      )}
                      {isExpanded && plan.bullets.slice(4).map((bullet, i) => (
                        <li key={i + 4} className="flex items-start gap-2 text-white/70 text-xs">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Expand/Collapse Services */}
                    <button
                      onClick={() => setExpandedPlan(isExpanded ? null : plan.id)}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white text-xs transition-colors"
                      data-testid={`toggle-services-${plan.id}`}
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          Hide Services ({planServices.length})
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          View Services ({planServices.length})
                        </>
                      )}
                    </button>

                    {/* Expanded Services */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-white/10"
                      >
                        <div className="space-y-2">
                          {planServices.map((service) => {
                            const cost = calculateServiceCost(service.id, plan.effectiveUsers, sites);
                            return (
                              <div key={service.id} className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-white/[0.03]" data-testid={`row-service-${plan.id}-${service.id}`}>
                                <div className="flex items-center gap-2">
                                  <service.icon className="w-3.5 h-3.5 text-violet-400" />
                                  <span className="text-white/70 text-[11px]" data-testid={`text-service-name-${service.id}`}>{service.name}</span>
                                </div>
                                <span className="text-white/50 text-[11px] font-mono" data-testid={`text-service-cost-${plan.id}-${service.id}`}>
                                  ${cost.toFixed(2)}
                                </span>
                              </div>
                            );
                          })}
                          <div className="flex items-center justify-between pt-2 border-t border-white/10">
                            <span className="text-white/60 text-xs font-medium">Total Cost</span>
                            <span className="text-white font-bold text-sm" data-testid={`text-total-cost-${plan.id}`}>
                              ${plan.serviceCosts.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Summary & CTA */}
          <motion.div
            className="mt-10 rounded-2xl border border-violet-500/20 p-8 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.05))'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3 className="text-white font-bold text-2xl mb-2" data-testid="heading-ready">
              Ready to Get Started?
            </h3>
            <p className="text-white/60 mb-6 max-w-xl mx-auto">
              Schedule a strategy call to discuss your specific needs. Custom pricing available for larger organizations and unique compliance requirements.
            </p>
            <a href="https://meet.digerati-experts.com/" target="_blank" rel="noopener noreferrer" data-testid="link-schedule-call">
              <Button 
                size="lg"
                className="h-14 px-10 text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-0 shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300"
                data-testid="button-schedule-call"
              >
                Schedule a Strategy Call
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </motion.div>

          {/* Legend */}
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span>30%+ margin (healthy)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <span>15-30% margin (moderate)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <span>&lt;15% margin (review pricing)</span>
            </div>
          </motion.div>
        </div>
      </main>

      <DigeratiEnhancedFooterSection />
    </div>
  );
};

export default ProActiveEcosystemPricing;
