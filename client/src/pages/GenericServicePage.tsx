import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Phone, ArrowRight, Sparkles, Zap, AlertTriangle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import { ServiceMatrix } from "@/components/ServiceMatrix";

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
  recommendedTier?: "office" | "business" | "enterprise";
}

const FeatureCard = ({ 
  feature, 
  index, 
  prefersReducedMotion 
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
    <Card className="group h-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 hover:bg-white/[0.08] transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardHeader className="relative">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          {feature.icon || <Sparkles className="w-6 h-6 text-white" />}
        </div>
        <CardTitle className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
          {feature.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <p className="text-gray-400 leading-relaxed">{feature.description}</p>
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
  gradientColors = "from-violet-600 via-purple-600 to-fuchsia-600",
  stat,
  canonical,
  recommendedTier
}: GenericServicePageProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;

  useSEO({
    title,
    description,
    canonical,
  });
  
  return (
    <PageTemplate
      title={title}
      subtitle={subtitle}
      gradientColors={gradientColors}
      variant="dark"
    >
      <div className="space-y-16">
        {/* Stat Callout */}
        {stat && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-2xl bg-violet-500/10 border border-violet-500/20"
            data-testid="service-stat-callout"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-violet-500/20">
                <AlertTriangle className="h-6 w-6 text-violet-400" />
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <p className="mt-1 text-white/80">{stat.label}</p>
                <p className="mt-1 text-sm text-white/50">— {stat.source}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Description with visual accent */}
        <motion.div 
          className="relative"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-fuchsia-500 rounded-full" />
          <p className="text-xl text-gray-300 leading-relaxed pl-6 max-w-4xl">
            {description}
          </p>
        </motion.div>

        {/* Features Grid */}
        {features.length > 0 && (
          <div>
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Key Features</h2>
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

        {/* Benefits Section */}
        {benefits.length > 0 && (
          <motion.div 
            className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 overflow-hidden border border-white/10"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-fuchsia-500/10 to-transparent rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">What You Get</h2>
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

        {/* Pricing Matrix */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 text-center">
              {recommendedTier ? `Recommended Plan for ${title}` : 'Service Plans'}
            </h2>
            <p className="text-white/60 text-center">
              {recommendedTier ? 'This service is included in the following plan' : 'Choose the plan that fits your needs'}
            </p>
          </div>
          <ServiceMatrix 
            variant="full" 
            highlightTier={recommendedTier}
            showOnlyHighlighted={!!recommendedTier}
          />
          <div className="mt-6 text-center">
            <a href="/pricing" className="text-violet-400 hover:text-violet-300 underline text-sm">
              View all pricing tiers and full service matrix →
            </a>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="relative rounded-2xl overflow-hidden"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600" />
          
          {/* Mesh overlay */}
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
          
          {/* Glowing orbs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-fuchsia-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl" />
          
          <div className="relative p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Learn More?</h2>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Contact us today to discuss how we can help protect and enable your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://meet.digerati-experts.com/" 
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center bg-white text-purple-700 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
                data-testid="button-contact"
              >
                <ArrowRight className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                Schedule Consultation
              </a>
              <a 
                href="tel:325-480-9870"
                className="group inline-flex items-center justify-center border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-purple-700 px-8 py-4 rounded-xl font-semibold transition-all"
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
