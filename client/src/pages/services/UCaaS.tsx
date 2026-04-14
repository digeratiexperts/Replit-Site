import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  MapPin, 
  Building2, 
  Archive, 
  AlertTriangle, 
  DollarSign, 
  Scale,
  Hash,
  GitBranch,
  Shield,
  Video,
  FileText,
  BarChart3,
  CheckCircle,
  X,
  ArrowRight,
  Headphones
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

export default function UCaaS() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  useSEO({
    title: "UCaaS Voice & Meetings | Managed Phone Systems",
    description: "We design, secure, and run your phone system and meeting stack so it actually supports the business. E911 compliance, call routing, retention policies, and 24/7 support.",
    canonical: "/services/ucaas",
  });

  const brokenItems = [
    {
      icon: <GitBranch className="h-6 w-6 text-violet-400" />,
      title: "Routing",
      description: "Calls go to the wrong person or get dropped. Ring groups and auto-attendants aren't set up correctly, frustrating customers."
    },
    {
      icon: <MapPin className="h-6 w-6 text-violet-400" />,
      title: "E911",
      description: "Your address records are outdated or wrong. In an emergency, first responders could be sent to the wrong location."
    },
    {
      icon: <Building2 className="h-6 w-6 text-violet-400" />,
      title: "Too many vendors",
      description: "Phone from one vendor, meetings from another, fax from a third. Nobody owns the stack, so problems fall through the cracks."
    },
    {
      icon: <Archive className="h-6 w-6 text-violet-400" />,
      title: "No retention",
      description: "Call recordings and voicemails vanish after 30 days. When you need them for compliance or disputes, they're gone."
    }
  ];

  const hiddenBillItems = {
    business: [
      "Lost sales from missed or misrouted calls",
      "Wasted time troubleshooting without expert help",
      "Productivity loss during outages",
      "Customer frustration from poor call quality"
    ],
    liability: [
      "E911 non-compliance fines (up to $10,000 per violation)",
      "HIPAA violations for unencrypted health calls",
      "Legal discovery failures from missing recordings",
      "FTC compliance gaps for financial services"
    ]
  };

  const serviceCards = [
    {
      icon: <Hash className="h-6 w-6 text-white" />,
      title: "Number procurement",
      description: "We port existing numbers and provision new DIDs with proper documentation. Never lose a business number again."
    },
    {
      icon: <GitBranch className="h-6 w-6 text-white" />,
      title: "Call flow / IVR",
      description: "Custom auto-attendants, ring groups, hunt groups, and after-hours routing designed around how your team actually works."
    },
    {
      icon: <Shield className="h-6 w-6 text-white" />,
      title: "E911 compliance",
      description: "Location records updated for every user, every site. Dispatchable addresses verified quarterly. Full audit trail."
    },
    {
      icon: <Video className="h-6 w-6 text-white" />,
      title: "Meetings governance",
      description: "Zoom/Teams/Meet policies enforced across your org. Waiting rooms, passwords, recording rules—all configured to spec."
    },
    {
      icon: <FileText className="h-6 w-6 text-white" />,
      title: "Retention policy",
      description: "Call recordings, voicemails, and meeting recordings retained for your compliance window. Automated purge when allowed."
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-white" />,
      title: "Quality reporting",
      description: "Monthly reports on call quality, uptime, usage patterns, and cost. Actionable insights, not just data dumps."
    }
  ];

  const pricingTiers = [
    {
      name: "SOW Implementation",
      type: "one-time",
      price: "From $1,500",
      description: "One-time project to set up or fix your UCaaS stack",
      features: [
        "Platform audit & gap analysis",
        "Number porting coordination",
        "Call flow design & implementation",
        "E911 address verification",
        "User training session",
        "Documentation & runbook"
      ]
    },
    {
      name: "Managed UCaaS",
      type: "monthly",
      price: "$12/user/mo",
      description: "Ongoing management for your voice and meetings stack",
      features: [
        "24/7 phone system support",
        "User adds/changes/deletes",
        "E911 quarterly audits",
        "Call recording management",
        "Meeting policy enforcement",
        "Monthly quality reports"
      ],
      popular: true
    },
    {
      name: "Managed UCaaS + Platform",
      type: "monthly",
      price: "$35/user/mo",
      description: "Full stack: platform licenses plus management",
      features: [
        "Everything in Managed UCaaS",
        "Cytracom or Teams Phone license",
        "Unlimited US/CA calling",
        "Voicemail to email",
        "Mobile & desktop apps",
        "Call center queue (add-on)"
      ]
    }
  ];

  const comparisonItems = [
    { feature: "Initial setup", diy: "You figure it out", digerati: "White-glove implementation" },
    { feature: "E911 compliance", diy: "Hope it's right", digerati: "Verified quarterly" },
    { feature: "Call flow changes", diy: "Open a ticket, wait", digerati: "Same-day turnaround" },
    { feature: "Retention policy", diy: "Default 30 days", digerati: "Custom to your compliance" },
    { feature: "Quality issues", diy: "Escalate and pray", digerati: "Root cause analysis" },
    { feature: "Vendor coordination", diy: "You manage it", digerati: "Single point of contact" },
    { feature: "Cost visibility", diy: "Surprise invoices", digerati: "Predictable monthly fee" }
  ];

  return (
    <PageTemplate
      title="UCaaS: Voice & Meetings"
      subtitle="We design, secure, and run your phone system and meeting stack so it actually supports the business"
      gradientColors="from-violet-600 via-purple-600 to-fuchsia-600"
      variant="dark"
      icon={<Phone className="h-10 w-10 text-violet-300" />}
      breadcrumbs={[
        { label: "Solutions", href: "/solutions" },
        { label: "UCaaS" }
      ]}
    >
      <ServiceJsonLd
        name="Unified Communications (UCaaS)"
        description="We design, secure, and run your phone system and meeting stack so it actually supports the business."
        url="/solutions/ucaas"
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Solutions", url: "/solutions" },
        { name: "UCaaS", url: "/solutions/ucaas" }
      ]} />
      <div className="space-y-20">
        {/* What's Broken Section */}
        <motion.section
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">What's broken right now</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brokenItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card 
                  className="h-full bg-white/5 backdrop-blur-sm border border-red-500/20 hover:border-red-500/40 transition-all"
                  data-testid={`card-broken-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-3">
                      {item.icon}
                    </div>
                    <CardTitle className="text-xl text-white">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* The Hidden Bill Section */}
        <motion.section
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-red-500/10 to-transparent rounded-full blur-3xl" />
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-amber-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">The hidden bill</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-amber-400" />
                  Business impact
                </h3>
                <ul className="space-y-3">
                  {hiddenBillItems.business.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <X className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Scale className="h-5 w-5 text-red-400" />
                  Liability & compliance
                </h3>
                <ul className="space-y-3">
                  {hiddenBillItems.liability.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* What We Actually Do Section */}
        <motion.section
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center">
              <Headphones className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">What we actually do</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card 
                  className="group h-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 hover:bg-white/[0.08] transition-all duration-300"
                  data-testid={`card-service-${card.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  <CardHeader className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      {card.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-gray-400 leading-relaxed">{card.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Service & Cost Section */}
        <motion.section
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Service & Cost</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose the level of support that fits your business. Start with implementation, 
              add ongoing management, or get the full stack.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative ${tier.popular ? 'md:-mt-4 md:mb-4' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full text-sm font-medium text-white">
                    Most Popular
                  </div>
                )}
                <Card 
                  className={`h-full ${
                    tier.popular 
                      ? 'bg-gradient-to-b from-violet-500/10 to-purple-500/5 border-violet-500/30' 
                      : 'bg-white/5 border-white/10'
                  } backdrop-blur-sm hover:border-purple-500/40 transition-all`}
                  data-testid={`card-pricing-${tier.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <CardHeader>
                    <div className="text-sm text-violet-400 uppercase tracking-wider mb-1">
                      {tier.type === 'one-time' ? 'One-Time' : 'Monthly'}
                    </div>
                    <CardTitle className="text-2xl text-white">{tier.name}</CardTitle>
                    <div className="text-3xl font-bold text-white mt-2">{tier.price}</div>
                    <p className="text-gray-400 text-sm mt-2">{tier.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Comparison Table Section */}
        <motion.section
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">DIY vs Digerati UCaaS</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              See what you're really getting when you partner with us instead of going it alone.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
            <div className="grid grid-cols-3 bg-white/5">
              <div className="p-4 font-semibold text-gray-400">Feature</div>
              <div className="p-4 font-semibold text-gray-400 text-center border-l border-white/10">DIY</div>
              <div className="p-4 font-semibold text-violet-400 text-center border-l border-white/10 bg-violet-500/5">
                Digerati UCaaS
              </div>
            </div>
            {comparisonItems.map((item, index) => (
              <div 
                key={item.feature} 
                className={`grid grid-cols-3 ${index % 2 === 0 ? 'bg-white/[0.02]' : ''}`}
                data-testid={`row-comparison-${index}`}
              >
                <div className="p-4 text-white font-medium">{item.feature}</div>
                <div className="p-4 text-gray-400 text-center border-l border-white/10">{item.diy}</div>
                <div className="p-4 text-emerald-400 text-center border-l border-white/10 bg-violet-500/5 font-medium">
                  {item.digerati}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600" />
          
          <div className="absolute inset-0 opacity-30">
            <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-grid)" />
            </svg>
          </div>
          
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-fuchsia-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl" />
          
          <div className="relative p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to fix your phone system?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Book a 15-minute call to discuss your current setup and see if we're a fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/book" 
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center bg-white text-purple-700 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
                data-testid="button-schedule-call"
              >
                <ArrowRight className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                Schedule a Call
              </a>
              <a 
                href="tel:325-480-9870"
                className="group inline-flex items-center justify-center border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-purple-700 px-8 py-4 rounded-xl font-semibold transition-all"
                data-testid="button-call-now"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call 325-480-9870
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </PageTemplate>
  );
}
