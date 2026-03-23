import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { 
  Target, 
  FileText, 
  Users, 
  Shield, 
  Briefcase, 
  BookOpen, 
  Award, 
  MessageSquare, 
  Mic, 
  ClipboardList,
  DollarSign,
  Layers,
  Check,
  ChevronRight,
  AlertTriangle,
  Compass,
  Phone,
  Settings,
  Building2
} from "lucide-react";
import { MegaMenu } from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import logoImage from "@assets/DE-Logo-new_1762461524794.webp";

interface ToolCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  category: "process" | "reference" | "tools" | "collateral";
  badge?: string;
}

const toolCards: ToolCard[] = [
  {
    title: "Sales Process",
    description: "Complete sales pipeline stages, Q&A cards, objection handlers, and call scripts",
    icon: <Target className="w-6 h-6" />,
    href: "/internal/sales-process",
    category: "process",
    badge: "Core"
  },
  {
    title: "ProActive Ecosystems",
    description: "Service tier comparison matrix - Basic IT, Advanced Security, Enterprise",
    icon: <Layers className="w-6 h-6" />,
    href: "/internal/proactive-ecosystems",
    category: "reference"
  },
  {
    title: "Guarantees & Values",
    description: "9 service guarantees, 5 core values, and 4-step approach guide",
    icon: <Award className="w-6 h-6" />,
    href: "/internal/guarantees-values",
    category: "reference"
  },
  {
    title: "11 Things We Do Better",
    description: "Key differentiators that set Digerati Experts apart from competitors",
    icon: <Check className="w-6 h-6" />,
    href: "/internal/11-things-better",
    category: "reference"
  },
  {
    title: "6 Reasons to Choose Us",
    description: "Core reasons why prospects should work with Digerati Experts",
    icon: <MessageSquare className="w-6 h-6" />,
    href: "/internal/six-reasons",
    category: "reference"
  },
  {
    title: "USP Development Worksheet",
    description: "Interactive worksheet for developing compelling marketing messages",
    icon: <ClipboardList className="w-6 h-6" />,
    href: "/internal/usp-worksheet",
    category: "tools",
    badge: "Interactive"
  },
  {
    title: "Buyers Guide",
    description: "Educational guide for prospects evaluating MSP/MSSP providers",
    icon: <BookOpen className="w-6 h-6" />,
    href: "/internal/buyers-guide",
    category: "collateral"
  },
  {
    title: "Cover Letter Templates",
    description: "Professional proposal cover letters for different engagement types",
    icon: <FileText className="w-6 h-6" />,
    href: "/internal/cover-letter",
    category: "collateral"
  },
  {
    title: "Audio Business Card",
    description: "Voicemail and intro script templates for consistent messaging",
    icon: <Mic className="w-6 h-6" />,
    href: "/internal/audio-business-card",
    category: "tools"
  },
  {
    title: "Pricing Tiers",
    description: "Package pricing structure and per-user rates reference",
    icon: <DollarSign className="w-6 h-6" />,
    href: "/internal/pricing-tiers",
    category: "reference"
  },
  {
    title: "Service Packages",
    description: "Detailed breakdown of what's included in each service tier",
    icon: <Briefcase className="w-6 h-6" />,
    href: "/internal/service-packages",
    category: "reference"
  },
  {
    title: "vCIO Services",
    description: "Virtual CIO offering details and strategic IT guidance scope",
    icon: <Building2 className="w-6 h-6" />,
    href: "/internal/vcio",
    category: "reference"
  },
  {
    title: "Workplace Matrix",
    description: "Managed Workplace feature comparison and deployment options",
    icon: <Settings className="w-6 h-6" />,
    href: "/internal/workplace-matrix",
    category: "reference"
  },
  {
    title: "Core IT Services",
    description: "Foundation IT services and support scope documentation",
    icon: <Compass className="w-6 h-6" />,
    href: "/internal/core-it",
    category: "reference"
  },
  {
    title: "Security Stack",
    description: "Cybersecurity layers and technology stack reference",
    icon: <Shield className="w-6 h-6" />,
    href: "/internal/security-stack",
    category: "reference"
  },
  {
    title: "Cyber Facts",
    description: "Statistics, trends, and talking points for security discussions",
    icon: <AlertTriangle className="w-6 h-6" />,
    href: "/internal/cyber-facts",
    category: "reference"
  }
];

const categories = [
  { id: "process", title: "Sales Process", icon: <Target className="w-5 h-5" /> },
  { id: "reference", title: "Reference Materials", icon: <BookOpen className="w-5 h-5" /> },
  { id: "tools", title: "Interactive Tools", icon: <ClipboardList className="w-5 h-5" /> },
  { id: "collateral", title: "Sales Collateral", icon: <FileText className="w-5 h-5" /> }
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function InternalHub() {
  return (
    <>
      <Helmet>
        <title>Internal Sales Tools | Digerati Experts</title>
        <meta name="description" content="Internal sales tools hub for Digerati Experts team. Access sales process, reference materials, and interactive tools." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-[#0A0A0F]">
        <MegaMenu />

        <section className="relative pt-28 pb-16 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-600/5 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-40 right-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div {...fadeIn} className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <img src={logoImage} alt="Digerati Experts" className="h-16 w-auto" />
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm mb-4">
                <Shield className="w-4 h-4" />
                <span>Internal Use Only</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
                  Sales Tools Hub
                </span>
              </h1>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                Everything you need to close deals: process guides, reference materials, and interactive tools
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            >
              {categories.map((cat) => {
                const count = toolCards.filter(t => t.category === cat.id).length;
                
                return (
                  <a
                    key={cat.id}
                    href={`#${cat.id}`}
                    className="flex items-center gap-3 p-4 rounded-xl border bg-violet-500/10 border-violet-500/30 text-violet-400 hover:bg-violet-500/20 hover:border-violet-400/50 transition-all"
                    data-testid={`nav-category-${cat.id}`}
                  >
                    {cat.icon}
                    <div>
                      <div className="font-semibold text-white text-sm">{cat.title}</div>
                      <div className="text-xs text-white/50">{count} items</div>
                    </div>
                  </a>
                );
              })}
            </motion.div>

            {categories.map((cat, catIndex) => {
              const categoryTools = toolCards.filter(t => t.category === cat.id);
              if (categoryTools.length === 0) return null;

              return (
                <motion.section
                  key={cat.id}
                  id={cat.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                  className="mb-12"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400">
                      {cat.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-white">{cat.title}</h2>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryTools.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="group relative p-6 bg-white/[0.02] border border-violet-500/30 rounded-xl hover:bg-white/[0.04] hover:border-violet-400/50 transition-all duration-300"
                        data-testid={`card-tool-${tool.href.split('/').pop()}`}
                      >
                        {tool.badge && (
                          <span className="absolute top-4 right-4 px-2 py-1 text-xs font-medium bg-violet-500/10 text-violet-400 rounded-full">
                            {tool.badge}
                          </span>
                        )}
                        <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 mb-4 group-hover:scale-110 transition-transform">
                          {tool.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors">
                          {tool.title}
                        </h3>
                        <p className="text-sm text-white/50 mb-4 line-clamp-2">
                          {tool.description}
                        </p>
                        <div className="flex items-center text-sm text-violet-400 group-hover:translate-x-1 transition-transform">
                          <span>Open</span>
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.section>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-16 p-8 bg-gradient-to-br from-violet-900/20 to-purple-900/10 border border-violet-500/20 rounded-2xl text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Need Immediate Help?</h3>
              <p className="text-white/60 mb-6 max-w-lg mx-auto">
                Quick access to critical resources for active sales situations
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/book"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-violet-700 font-semibold rounded-xl hover:bg-white/90 transition-all"
                  data-testid="button-book-meeting"
                >
                  <Phone className="w-5 h-5" />
                  Book Client Meeting
                </a>
                <Link
                  href="/internal/sales-process"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-violet-400/50 text-violet-300 font-semibold rounded-xl hover:bg-violet-500/10 transition-all"
                  data-testid="button-objection-handlers"
                >
                  <MessageSquare className="w-5 h-5" />
                  Objection Handlers
                </Link>
                <Link
                  href="/internal/pricing-tiers"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-violet-400/50 text-violet-300 font-semibold rounded-xl hover:bg-violet-500/10 transition-all"
                  data-testid="button-pricing-quick"
                >
                  <DollarSign className="w-5 h-5" />
                  Quick Pricing
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
