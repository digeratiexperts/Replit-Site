import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle,
  Phone,
  ArrowRight,
  Shield,
  Zap,
  AlertTriangle,
  Grid3X3,
  MapPin,
  HelpCircle,
  ListChecks,
  Quote,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import { ServiceMatrix } from "@/components/ServiceMatrix";
import { ServiceCapabilityMatrix } from "@/components/ServiceCapabilityMatrix";
import { pageNarratives, type PageNarrative } from "@/pages/routes/pageNarratives";
import { CTA } from "@/lib/ctaCopy";

interface ServiceFeature {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface ServiceStat {
  value: string;
  label: string;
  source: string;
}

interface GenericServicePageProps {
  title: string;
  subtitle: string;
  description: string;
  features: ServiceFeature[];
  benefits: string[];
  gradientColors?: string;
  stat?: ServiceStat;
  canonical?: string;
  recommendedTier?: "it" | "office" | "business" | "enterprise";
  serviceKey?: string;
  narrative?: PageNarrative;
}

const FeatureCard = ({
  feature,
  index,
  prefersReducedMotion,
}: {
  feature: ServiceFeature;
  index: number;
  prefersReducedMotion: boolean;
}) => (
  <motion.div
    initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
  >
    <Card className="group h-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#D3126A]/40 hover:bg-white/[0.08] transition-all duration-300 overflow-hidden">
      <CardHeader className="relative">
        <div className="w-12 h-12 rounded-xl bg-[#D3126A]/20 flex items-center justify-center mb-4">
          {feature.icon || <Shield className="w-6 h-6 text-[#FF477F]" />}
        </div>
        <CardTitle className="text-xl font-semibold text-white group-hover:text-[#FF477F] transition-colors">
          {feature.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <p className="text-white/80 leading-relaxed">{feature.description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

export default function GenericServicePage({
  title,
  subtitle,
  description,
  features,
  benefits,
  gradientColors = "from-[#D3126A] via-fuchsia-700 to-violet-800",
  stat,
  canonical,
  recommendedTier,
  serviceKey,
  narrative: narrativeProp,
}: GenericServicePageProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const narrative = narrativeProp ?? (serviceKey ? pageNarratives[serviceKey] : undefined);

  useSEO({
    title,
    description,
    canonical,
  });

  return (
    <PageTemplate title={title} subtitle={subtitle} gradientColors={gradientColors} variant="dark">
      <div className="space-y-16">
        {stat && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-2xl bg-[#D3126A]/10 border border-[#D3126A]/25"
            data-testid="service-stat-callout"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#D3126A]/20">
                <AlertTriangle className="h-6 w-6 text-[#FF477F]" />
              </div>
              <div>
                <div className="text-3xl font-bold text-[#FF477F]">{stat.value}</div>
                <p className="mt-1 text-white/80">{stat.label}</p>
                <p className="mt-1 text-sm text-white/50">— {stat.source}</p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          className="relative"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#D3126A] to-[#FF477F] rounded-full" />
          <p className="text-xl text-gray-300 leading-relaxed pl-6 max-w-4xl">{description}</p>
          {narrative?.whoFor && (
            <p className="text-base text-white/70 leading-relaxed pl-6 max-w-4xl mt-4">
              <span className="text-[#FF477F] font-medium">Who this is for: </span>
              {narrative.whoFor}
            </p>
          )}
        </motion.div>

        {narrative?.painPoints && narrative.painPoints.length > 0 && (
          <section data-testid="section-pain-points">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#D3126A] flex items-center justify-center">
                <ListChecks className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Is this you?</h2>
                <p className="text-white/60 text-sm">If two or more feel familiar, this page is for your office.</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {narrative.painPoints.map((pain, index) => (
                <motion.div
                  key={index}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.35 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10"
                >
                  <AlertTriangle className="h-5 w-5 text-[#FF477F] mt-0.5 shrink-0" />
                  <p className="text-white/85">{pain}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {features.length > 0 && (
          <div>
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D3126A] to-fuchsia-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">What you get</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  feature={feature}
                  index={index}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </div>
          </div>
        )}

        {narrative?.process && narrative.process.length > 0 && (
          <section data-testid="section-process">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-violet-600 flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">How engagement works</h2>
                <p className="text-white/60 text-sm">A clear path — not a black box of tickets.</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {narrative.process.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className="relative p-5 rounded-xl bg-white/[0.04] border border-white/10"
                >
                  <div className="text-xs font-semibold tracking-wide text-[#FF477F] mb-2">
                    Step {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {benefits.length > 0 && (
          <motion.div
            className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 overflow-hidden border border-white/10"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#D3126A]/15 to-transparent rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Outcomes that matter</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-emerald-500/30 hover:bg-white/[0.08] transition-all duration-300"
                    initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-300 font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {(narrative?.arizonaNote || narrative?.proof) && (
          <section className="grid md:grid-cols-2 gap-6" data-testid="section-local-proof">
            {narrative.arizonaNote && (
              <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="flex items-center gap-2 text-[#FF477F] mb-3">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm font-semibold tracking-wide uppercase">Arizona operator</span>
                </div>
                <p className="text-white/85 leading-relaxed">{narrative.arizonaNote}</p>
              </div>
            )}
            {narrative.proof && (
              <div className="p-6 rounded-2xl bg-[#D3126A]/10 border border-[#D3126A]/25">
                <Quote className="h-6 w-6 text-[#FF477F] mb-3" />
                <p className="text-lg text-white leading-relaxed mb-3">“{narrative.proof.quote}”</p>
                <p className="text-sm text-white/55">— {narrative.proof.attribution}</p>
              </div>
            )}
          </section>
        )}

        {serviceKey && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center">
                <Grid3X3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Service tiers</h2>
                <p className="text-white/80 text-sm">Compare what’s included at each tier</p>
              </div>
            </div>
            <ServiceCapabilityMatrix serviceKey={serviceKey} highlightTier={recommendedTier} />
          </motion.div>
        )}

        {recommendedTier && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2 text-center">
                Where this capability typically lives
              </h2>
              <p className="text-white/80 text-center">
                Fit language — not a ranking. Confirm the operating model in your Cyber Risk Assessment.
              </p>
            </div>
            <ServiceMatrix
              variant="full"
              highlightTier={recommendedTier}
              showOnlyHighlighted={!!recommendedTier}
            />
          </motion.div>
        )}

        {narrative?.faqs && narrative.faqs.length > 0 && (
          <section data-testid="section-faqs">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-[#FF477F]" />
              </div>
              <h2 className="text-3xl font-bold text-white">Questions owners actually ask</h2>
            </div>
            <div className="space-y-4 max-w-4xl">
              {narrative.faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="p-5 rounded-xl bg-white/[0.04] border border-white/10"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-white/70 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <motion.div
          className="relative rounded-2xl overflow-hidden"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#D3126A] via-fuchsia-600 to-rose-500" />
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
          <div className="relative p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              {narrative?.ctaHeadline || "Schedule your cyber risk assessment"}
            </h2>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              {narrative?.ctaBody ||
                "We’ll map risk, stack gaps, and the right next step for your Arizona business — without a hard sell."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/book"
                className="group inline-flex items-center justify-center bg-white text-[#D3126A] hover:bg-pink-50 px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
                data-testid="button-contact"
              >
                <ArrowRight className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                {CTA.primary}
              </a>
              <a
                href="tel:+13254809870"
                className="group inline-flex items-center justify-center border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-[#D3126A] px-8 py-4 rounded-xl font-semibold transition-all"
                data-testid="button-call"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call 325-480-9870
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </PageTemplate>
  );
}
