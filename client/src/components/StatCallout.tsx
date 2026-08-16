import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, Shield, TrendingUp, DollarSign, Clock, Users, Lock, Bug } from "lucide-react";
import { getCyberFact, toDisplayStat } from "@/data/cyberAwarenessFacts";

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
        <div className={`p-3 rounded-xl ${variant === "light" ? "bg-de-paper-raised" : "bg-de-raised"}`}>
          <Icon className={`h-6 w-6 ${variant === "light" ? "text-de-accent" : "text-de-accent-ink"}`} />
        </div>
        <div className="flex-1">
          <div className={`${valueSizes[size]} font-bold text-de-accent-ink`}>
            {stat.value}
          </div>
          <p className={`mt-2 ${variant === "light" ? "text-gray-700" : "text-white/80"} leading-relaxed`}>
            {stat.label}
          </p>
          <p className={`mt-2 text-sm ${variant === "light" ? "text-white/70" : "text-white/50"}`}>
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
          ? "bg-de-raised border border-de-hairline" 
          : "bg-de-paper-raised border border-de-hairline"
      }`}
      data-testid="stat-banner"
    >
      <p className={variant === "dark" ? "text-white/90" : "text-gray-800"}>
        <span className="font-bold text-de-accent-ink">{stat.value}</span>{" "}
        <span className={variant === "dark" ? "text-white/70" : "text-white/70"}>{stat.label}</span>
        <span className={`ml-2 text-sm ${variant === "dark" ? "text-white/50" : "text-white/70"}`}>
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
          <div className="text-3xl md:text-4xl font-bold text-de-accent-ink">
            {stat.value}
          </div>
          <p className={`mt-2 ${variant === "dark" ? "text-white/70" : "text-white/70"}`}>
            {stat.label}
          </p>
          <p className={`mt-1 text-xs ${variant === "dark" ? "text-white/55" : "text-gray-400"}`}>
            {stat.source}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

/** Thin wrappers over canonical cyberAwarenessFacts — prefer importing facts directly. */
const fromCanonical = (id: string, icon: Stat["icon"]) => {
  const display = toDisplayStat(getCyberFact(id));
  return { ...display, icon };
};

export const cybersecurityStats = {
  ransomware: {
    smbBreaches: fromCanonical("dbir-ransomware-2026", "warning"),
    smbVictims: fromCanonical("dbir-smb-ransomware-victims-2026", "warning"),
    recoveryCost: { value: "$1.53M", label: "average ransomware recovery cost (excluding ransom)", source: "Sophos 2025", icon: "dollar" as const },
    weekRecovery: { value: "53%", label: "of ransomware victims fully recovered within a week", source: "Sophos 2025", icon: "clock" as const },
    paidRansom: { value: "49%", label: "of ransomware victims paid to get their data back", source: "Sophos 2025", icon: "dollar" as const },
    backupRestore: { value: "54%", label: "used backups to restore encrypted data (lowest in 6 years)", source: "Sophos 2025", icon: "shield" as const },
  },
  identity: {
    mfaBlocks: fromCanonical("microsoft-mfa-blocks-2025", "lock"),
    vulnInitial: fromCanonical("dbir-vuln-exploit-2026", "bug"),
  },
  humanRisk: {
    humanElement: fromCanonical("dbir-human-element-2026", "users"),
  },
  arizona: {
    ic3Losses: fromCanonical("az-ic3-losses-2024", "dollar"),
    breachNotify: fromCanonical("az-breach-notify-framing", "clock"),
  },
  costs: {
    usBreach: fromCanonical("ibm-us-breach-cost-2026", "dollar"),
    avgBreach: fromCanonical("ibm-global-breach-cost-2026", "dollar"),
  },
  crime: {
    becLosses: fromCanonical("ic3-bec-losses-2024", "dollar"),
  },
  attacks: {
    // Removed indefensible small-business closure myth — do not reinstate without a primary source.
    ransomwareShare: fromCanonical("dbir-ransomware-2026", "warning"),
  },
};
