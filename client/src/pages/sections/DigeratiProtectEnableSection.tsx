import { Shield, Users, BarChart, Lock, Code, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";

// Import images
import techWorkImg from "@assets/Rectangle-152059_1767027918698.png";
import securityImg from "@assets/Rectangle-152059-1_1767027918699.png";
import codeImg from "@assets/Rectangle-152059-2_1767027918699.png";

export const DigeratiProtectEnableSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  
  const features = [
    {
      title: "Security-First Operations",
      description: "Every system, endpoint, and user is protected - by design, not by reaction.",
      icon: Shield,
      image: securityImg,
      gradient: "from-violet-600 to-purple-600"
    },
    {
      title: "Co-Managed or Fully Managed",
      description: "We support your internal IT or serve as your outsourced technology team.",
      icon: Users,
      image: techWorkImg,
      gradient: "from-purple-500 to-fuchsia-500"
    },
    {
      title: "Executive-Level Transparency",
      description: "Reports, KPIs, and compliance insights that make sense - and drive decisions.",
      icon: BarChart,
      image: codeImg,
      gradient: "from-fuchsia-400 to-pink-500"
    }
  ];

  const additionalFeatures = [
    {
      icon: Lock,
      title: "Security by Design",
      description: "Every solution we implement has security built into its foundation, not added as an afterthought.",
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      icon: Code,
      title: "Technology Excellence",
      description: "We leverage cutting-edge tools and platforms to deliver enterprise-grade solutions to businesses of all sizes.",
      gradient: "from-fuchsia-500 to-violet-600"
    }
  ];

  const containerVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-100/50 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-gray-900">
            We Exist to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Protect and Enable</span> Your Business
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            If you're like most business leaders, you don't want another vendor — you want a security-first partner 
            who proactively reduces risk, improves uptime, and keeps your team moving.
          </p>
        </motion.div>

        <motion.div 
          className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="group relative"
              data-testid={`card-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {/* Card with image */}
              <div className="relative overflow-hidden rounded-2xl h-80 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${feature.image})` }}
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${feature.gradient} opacity-70 mix-blend-multiply`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 border border-white/30`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-200 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional features grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-6 mb-12"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {additionalFeatures.map((feature) => (
            <div 
              key={feature.title}
              className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center flex-shrink-0`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a href="https://meet.digerati-experts.com/" target="_blank" rel="noopener noreferrer">
            <Button 
              size="lg"
              className="h-14 px-8 text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              data-testid="button-partner-with-us"
            >
              Partner With Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
