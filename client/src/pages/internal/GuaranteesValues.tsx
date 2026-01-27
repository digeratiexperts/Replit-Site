import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ChevronDown, ChevronRight, Phone, Headphones, MapPin, RefreshCw, Clock, FlaskConical, Lock, Handshake, PhoneCall, CheckCircle, Compass, Boxes, Zap, Heart, ScrollText } from "lucide-react";
import { MegaMenu } from "@/components/MegaMenu";
import Footer from "@/components/Footer";

interface Guarantee {
  icon: React.ReactNode;
  title: string;
  description: string;
  tooltip: string;
}

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
  tooltip: string;
}

interface Step {
  number: number;
  title: string;
  badges?: string[];
  content: React.ReactNode;
}

const guarantees: Guarantee[] = [
  { icon: <Headphones className="w-6 h-6" />, title: "Tech-Answered Calls", description: "You reach a technician—fast.", tooltip: "Calls are answered by technical staff, not a generic answering line." },
  { icon: <MapPin className="w-6 h-6" />, title: "On-Site On-Time", description: "We show up when we commit.", tooltip: "If we say we'll be there, we'll be there." },
  { icon: <RefreshCw className="w-6 h-6" />, title: "Make-It-Right Promise", description: "Clear remediation & accountability.", tooltip: "If it's not working for you, we'll make it right." },
  { icon: <Clock className="w-6 h-6" />, title: "SLA Commitment", description: "Measured response & resolution.", tooltip: "We commit to response and resolution windows and track them." },
  { icon: <FlaskConical className="w-6 h-6" />, title: "Proof-Before-Partnership", description: "Pilot or limited engagement available.", tooltip: "Try us on a limited scope before expanding." },
  { icon: <Lock className="w-6 h-6" />, title: "Information Privacy", description: "Security & discretion by default.", tooltip: "We protect client information with strict privacy controls." },
  { icon: <Handshake className="w-6 h-6" />, title: "Easy Transitions", description: "Support for switching from your current MSP.", tooltip: "Ask us about incentives to help you transition providers." },
  { icon: <PhoneCall className="w-6 h-6" />, title: "No Voicemail Dead-Ends", description: "Live triage, real follow-through.", tooltip: "We don't leave you in a voicemail black hole." },
  { icon: <CheckCircle className="w-6 h-6" />, title: "Satisfaction First", description: "We're not happy unless you are.", tooltip: "Your satisfaction matters. We stand behind outcomes." },
];

const values: Value[] = [
  { icon: <Compass className="w-6 h-6" />, title: "Integrity First", description: "Every decision measured against what's right.", tooltip: "We do the right thing for clients, team, and partners." },
  { icon: <Boxes className="w-6 h-6" />, title: "Ownership", description: "We take responsibility, end-to-end.", tooltip: "We own the outcome—no excuses." },
  { icon: <Zap className="w-6 h-6" />, title: "Agility", description: "Forward-looking, flexible, and fast.", tooltip: "We adapt quickly to new threats and tech." },
  { icon: <Heart className="w-6 h-6" />, title: "Respect", description: "Clients, teammates, and competitors alike.", tooltip: "We treat people how we expect to be treated." },
  { icon: <ScrollText className="w-6 h-6" />, title: "Keep Promises", description: "Commitments matter. We honor them.", tooltip: "We keep our word—internally and externally." },
];

const steps: Step[] = [
  {
    number: 1,
    title: "Choose Your Managed Services Package",
    content: (
      <div>
        <ul className="space-y-3 mb-4">
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
            <span className="text-white/80"><span className="font-semibold text-white">Basic IT</span> — productivity suite support, unified ticketing, SaaS backups, secure file sharing</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
            <span className="text-white/80"><span className="font-semibold text-white">Advanced Security</span> — endpoint & email protection, SOC/MDR, DLP & encryption, risk reporting</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
            <span className="text-white/80"><span className="font-semibold text-white">Enterprise</span> — continuous compliance (SOC 2, HIPAA, ISO), audit-ready documentation, evidence management</span>
          </li>
        </ul>
        <p className="text-sm text-amber-400/80 italic">UCaaS/VoIP and DRaaS are available as add-ons.</p>
      </div>
    ),
  },
  {
    number: 2,
    title: "Select Your Cybersecurity Package",
    badges: ["Essentials", "Advanced", "Compliance"],
    content: (
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-semibold text-violet-300 mb-3">Essentials</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Anti-malware & anti-ransomware</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Email security & spam filtering</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Multi-factor authentication (MFA)</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Web gateway protection</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-violet-300 mb-3">Advanced</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> 24/7 SOC/MDR with human-led response</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> SIEM & internal threat detection</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> DLP, encryption & application controls</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Dark web exposure monitoring</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-violet-300 mb-3">Compliance</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Continuous control monitoring</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Policy tracking & evidence collection</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Compliance dashboards & reporting</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Certification readiness (SOC 2/HIPAA)</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    number: 3,
    title: "Choose Your Data Backup Strategy",
    content: (
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-semibold text-violet-300 mb-3">SaaS & Endpoint</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Microsoft 365 / Google Workspace backups</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Endpoint file backup & archiving</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Retention policies aligned to risk</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-violet-300 mb-3">Servers & BDR</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Image-based server backup</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Local + cloud BDR</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Recovery objectives set by workload</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-violet-300 mb-3">Disaster Recovery</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> DR runbooks and testing</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Cloud failover & warm standbys</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Executive continuity dashboards</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    number: 4,
    title: "Pick Site Services & Add-Ons",
    content: (
      <div>
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            "UCaaS / VoIP (add-on)",
            "Firewall with IDS/IPS",
            "Network monitoring & automation",
            "Mobile device management (MDM)",
            "Access control & video surveillance",
            "Structured cabling & power management",
            "Virtual desktop & server hosting",
            "Website & application monitoring",
          ].map((item, index) => (
            <span key={index} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white/70">
              {item}
            </span>
          ))}
        </div>
        <p className="text-sm text-amber-400/80 italic">We scope site services to your environment and budget.</p>
      </div>
    ),
  },
];

function GuaranteeCard({ guarantee }: { guarantee: Guarantee }) {
  return (
    <div 
      className="group relative p-6 bg-white/[0.02] border border-white/10 rounded-xl hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300"
      title={guarantee.tooltip}
      data-testid={`card-guarantee-${guarantee.title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400 mb-4 group-hover:scale-110 transition-transform">
        {guarantee.icon}
      </div>
      <h4 className="font-semibold text-white mb-2">{guarantee.title}</h4>
      <p className="text-sm text-white/60">{guarantee.description}</p>
    </div>
  );
}

function ValueCard({ value }: { value: Value }) {
  return (
    <div 
      className="group relative p-6 bg-white/[0.02] border border-white/10 rounded-xl hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300"
      title={value.tooltip}
      data-testid={`card-value-${value.title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
        {value.icon}
      </div>
      <h4 className="font-semibold text-white mb-2">{value.title}</h4>
      <p className="text-sm text-white/60">{value.description}</p>
    </div>
  );
}

function StepCard({ step, isOpen, onToggle }: { step: Step; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`border border-white/10 rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-white/[0.02]' : ''}`} data-testid={`step-card-${step.number}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors text-left"
        aria-expanded={isOpen}
        data-testid={`button-toggle-step-${step.number}`}
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold">
          {step.number}
        </div>
        <span className="flex-1 font-semibold text-white">{step.title}</span>
        {step.badges && (
          <div className="hidden sm:flex gap-2">
            {step.badges.map((badge, index) => (
              <span key={index} className="px-2 py-1 text-xs bg-violet-500/20 text-violet-300 rounded-full">
                {badge}
              </span>
            ))}
          </div>
        )}
        {isOpen ? (
          <ChevronDown className="w-5 h-5 text-white/50" />
        ) : (
          <ChevronRight className="w-5 h-5 text-white/50" />
        )}
      </button>
      
      {isOpen && (
        <div className="px-4 pb-4 pl-18 ml-14 border-l-2 border-violet-500/30">
          {step.content}
        </div>
      )}
    </div>
  );
}

export default function GuaranteesValues() {
  const [openSteps, setOpenSteps] = useState<Set<number>>(new Set([1]));

  const toggleStep = (num: number) => {
    setOpenSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(num)) {
        newSet.delete(num);
      } else {
        newSet.add(num);
      }
      return newSet;
    });
  };

  return (
    <>
      <Helmet>
        <title>Service Guarantees & Core Values | Digerati Experts</title>
        <meta name="description" content="Discover Digerati Experts' service guarantees, core values, and our 4-step approach to ProActive IT ecosystems." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-[#0A0E1A]">
        <MegaMenu />

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-40 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <Link href="/internal" className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors mb-8" data-testid="link-back">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sales Tools</span>
            </Link>

            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
                  Service Guarantees & Core Values
                </span>
              </h1>
              <p className="text-xl text-white/70">Aligned with our ProActive Ecosystems approach</p>
            </div>

            {/* Quick Nav */}
            <nav className="flex flex-wrap justify-center gap-4 mb-16" aria-label="Section navigation">
              <a href="#guarantees" className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white/70 hover:text-white hover:border-violet-400 transition-colors" data-testid="nav-guarantees">
                Guarantees
              </a>
              <a href="#values" className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white/70 hover:text-white hover:border-violet-400 transition-colors" data-testid="nav-values">
                Core Values
              </a>
              <a href="#steps" className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white/70 hover:text-white hover:border-violet-400 transition-colors" data-testid="nav-steps">
                How It Works
              </a>
            </nav>
          </div>
        </section>

        {/* Guarantees Section */}
        <section id="guarantees" className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Service Guarantees</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {guarantees.map((guarantee, index) => (
                <GuaranteeCard key={index} guarantee={guarantee} />
              ))}
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section id="values" className="py-16 px-4 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Core Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {values.map((value, index) => (
                <ValueCard key={index} value={value} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="steps" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works — 4 Steps</h2>
            <div className="space-y-4">
              {steps.map((step) => (
                <StepCard
                  key={step.number}
                  step={step}
                  isOpen={openSteps.has(step.number)}
                  onToggle={() => toggleStep(step.number)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://meet.digerati-experts.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-violet-700 font-semibold rounded-xl hover:bg-white/90 transition-all shadow-lg hover:shadow-violet-500/20"
                data-testid="button-book-call"
              >
                <Phone className="w-5 h-5" />
                Book a Call
              </a>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-violet-400/50 text-violet-300 font-semibold rounded-xl hover:bg-violet-500/10 transition-all"
                data-testid="link-compare-packages"
              >
                Compare Packages
              </Link>
            </div>

            <p className="mt-8 text-xs text-white/40 italic">
              *Content structure adapted to Digerati Experts from common industry comparisons and selection flows.*
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
