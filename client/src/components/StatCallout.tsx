import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, Shield, TrendingUp, DollarSign, Clock, Users, Lock, Bug } from "lucide-react";

export interface Stat {
  value: string;
  label: string;
  source: string;
  icon?: "warning" | "shield" | "trending" | "dollar" | "clock" | "users" | "lock" | "bug";
}

const iconMap = {
  warning: AlertTriangle,
  shield: Shield,
  trending: TrendingUp,
  dollar: DollarSign,
  clock: Clock,
  users: Users,
  lock: Lock,
  bug: Bug,
};

interface StatCalloutProps {
  stat: Stat;
  variant?: "dark" | "light" | "glass";
  size?: "sm" | "md" | "lg";
}

export const StatCallout = ({ stat, variant = "dark", size = "md" }: StatCalloutProps) => {
  const prefersReducedMotion = useReducedMotion();
  const Icon = stat.icon ? iconMap[stat.icon] : Shield;

  const sizeClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const valueSizes = {
    sm: "text-2xl",
    md: "text-3xl md:text-4xl",
    lg: "text-4xl md:text-5xl",
  };

  const variantClasses = {
    dark: "bg-white/[0.04] border border-white/10 text-white",
    light: "bg-white border border-gray-200 shadow-sm text-gray-900",
    glass: "bg-white/10 backdrop-blur-sm border border-white/20 text-white",
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl ${sizeClasses[size]} ${variantClasses[variant]}`}
      data-testid="stat-callout"
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl ${variant === "light" ? "bg-violet-100" : "bg-violet-500/20"}`}>
          <Icon className={`h-6 w-6 ${variant === "light" ? "text-violet-600" : "text-violet-400"}`} />
        </div>
        <div className="flex-1">
          <div className={`${valueSizes[size]} font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent`}>
            {stat.value}
          </div>
          <p className={`mt-2 ${variant === "light" ? "text-gray-700" : "text-white/80"} leading-relaxed`}>
            {stat.label}
          </p>
          <p className={`mt-2 text-sm ${variant === "light" ? "text-gray-500" : "text-white/50"}`}>
            — {stat.source}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

interface StatBannerProps {
  stat: Stat;
  variant?: "dark" | "light";
}

export const StatBanner = ({ stat, variant = "dark" }: StatBannerProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`py-4 px-6 rounded-xl text-center ${
        variant === "dark" 
          ? "bg-violet-500/10 border border-violet-500/20" 
          : "bg-violet-50 border border-violet-200"
      }`}
      data-testid="stat-banner"
    >
      <p className={variant === "dark" ? "text-white/90" : "text-gray-800"}>
        <span className="font-bold text-violet-400">{stat.value}</span>{" "}
        <span className={variant === "dark" ? "text-white/70" : "text-gray-600"}>{stat.label}</span>
        <span className={`ml-2 text-sm ${variant === "dark" ? "text-white/50" : "text-gray-500"}`}>
          — {stat.source}
        </span>
      </p>
    </motion.div>
  );
};

interface StatGridProps {
  stats: Stat[];
  variant?: "dark" | "light";
  columns?: 2 | 3 | 4;
}

export const StatGrid = ({ stats, variant = "dark", columns = 3 }: StatGridProps) => {
  const prefersReducedMotion = useReducedMotion();
  
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6`} data-testid="stat-grid">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`p-6 rounded-2xl text-center ${
            variant === "dark"
              ? "bg-white/[0.04] border border-white/10"
              : "bg-white border border-gray-200 shadow-sm"
          }`}
          data-testid={`stat-item-${index}`}
        >
          <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            {stat.value}
          </div>
          <p className={`mt-2 ${variant === "dark" ? "text-white/70" : "text-gray-600"}`}>
            {stat.label}
          </p>
          <p className={`mt-1 text-xs ${variant === "dark" ? "text-white/40" : "text-gray-400"}`}>
            {stat.source}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export const cybersecurityStats = {
  ransomware: {
    smbBreaches: { value: "88%", label: "of SMB breaches involve ransomware", source: "Verizon DBIR 2025", icon: "warning" as const },
    recoveryCost: { value: "$1.53M", label: "average ransomware recovery cost (excluding ransom)", source: "Sophos 2025", icon: "dollar" as const },
    weekRecovery: { value: "53%", label: "of ransomware victims fully recovered within a week", source: "Sophos 2025", icon: "clock" as const },
    paidRansom: { value: "49%", label: "of ransomware victims paid to get their data back", source: "Sophos 2025", icon: "dollar" as const },
    backupRestore: { value: "54%", label: "used backups to restore encrypted data (lowest in 6 years)", source: "Sophos 2025", icon: "shield" as const },
    largeOrg: { value: "39%", label: "of breaches at larger organizations involve ransomware", source: "Verizon DBIR 2025", icon: "warning" as const },
  },
  identity: {
    noMfa: { value: "99.9%", label: "of compromised accounts didn't have MFA enabled", source: "Microsoft 2025", icon: "lock" as const },
  },
  humanRisk: {
    humanElement: { value: "60%", label: "of breaches involve the human element", source: "Verizon DBIR 2025", icon: "users" as const },
    thirdParty: { value: "30%", label: "of breaches involve third-party vendors (doubled from 15%)", source: "Verizon DBIR 2025", icon: "users" as const },
    secretsLeak: { value: "94 days", label: "median time to remediate leaked secrets on GitHub", source: "Verizon DBIR 2025", icon: "clock" as const },
  },
  vulnerabilities: {
    espionage: { value: "70%", label: "of espionage incidents used vulnerability exploitation as initial access", source: "Verizon DBIR 2025", icon: "bug" as const },
    ransomwareRoot: { value: "32%", label: "of ransomware attacks started with exploited vulnerabilities", source: "Sophos 2025", icon: "bug" as const },
  },
  costs: {
    avgBreach: { value: "$4.88M", label: "global average cost of a data breach", source: "IBM 2024", icon: "dollar" as const },
    aiSavings: { value: "$1.9M", label: "in cost savings from extensive AI use in security", source: "IBM 2025", icon: "trending" as const },
    smbBreach: { value: "$3.3M", label: "average breach cost for businesses under 500 employees", source: "IBM 2024", icon: "dollar" as const },
    downtimeHour: { value: "$53,000", label: "average cost per hour of business downtime", source: "CyVent", icon: "clock" as const },
  },
  aiGap: {
    threatLevel: { value: "83%", label: "say AI/GenAI increases threat level, but only 51% have policies", source: "ConnectWise 2025", icon: "warning" as const },
    overspend: { value: "58%", label: "spent more on cybersecurity than originally anticipated", source: "ConnectWise 2025", icon: "dollar" as const },
  },
  crime: {
    ic3Total: { value: "$16B+", label: "in losses reported to FBI IC3 (up 33% from 2023)", source: "FBI IC3 2024", icon: "dollar" as const },
    becLosses: { value: "$2.77B", label: "in Business Email Compromise losses", source: "FBI IC3 2024", icon: "dollar" as const },
  },
  attacks: {
    targetSmb: { value: "43%", label: "of all cyberattacks target small businesses", source: "Verizon DBIR 2024", icon: "warning" as const },
    closeAfter: { value: "60%", label: "of small businesses close within 6 months of a cyberattack", source: "Industry Data", icon: "warning" as const },
    phishingDaily: { value: "3.4B", label: "phishing emails sent daily worldwide", source: "2025 Data", icon: "warning" as const },
    notPrepared: { value: "83%", label: "of SMBs aren't financially prepared for a cyberattack", source: "ConnectWise", icon: "warning" as const },
  },
  msp: {
    revenueGrowth: { value: "64%", label: "of MSPs reported revenue increases in the past year", source: "Datto Report", icon: "trending" as const },
  },
};
