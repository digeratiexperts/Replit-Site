import { Briefcase, Calculator, Stethoscope, Home, Heart, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PatternOverlay, GlowOrb } from "@/components/SectionPatterns";

// Import industry images from attached assets
import lawBooksImg from "@assets/Rectangle-152058_1767027918697.png";
import lawScalesImg from "@assets/Rectangle-152058-1_1767027918697.png";
import healthcareImg from "@assets/Rectangle-152058-2_1767027918698.png";
import realEstateImg from "@assets/Rectangle-152058-3_1767027918698.png";
import animalHospitalImg from "@assets/Rectangle-152058-4_1767027918698.png";

export const DigeratiIndustriesSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  const industries = [
    { 
      icon: Briefcase, 
      name: "Law Firms", 
      testId: "industry-law",
      slug: "law-firms",
      description: "Protect client privilege and meet ABA compliance requirements",
      image: lawScalesImg,
      gradient: "from-purple-500 to-violet-600",
      glowColor: "rgba(139,92,246,0.4)"
    },
    { 
      icon: Calculator, 
      name: "CPA Firms", 
      testId: "industry-cpa",
      slug: "accounting-finance",
      description: "Secure tax data and ensure IRS/FTC compliance",
      image: lawBooksImg,
      gradient: "from-blue-500 to-cyan-500",
      glowColor: "rgba(59,130,246,0.4)"
    },
    { 
      icon: Stethoscope, 
      name: "Medical Practices", 
      testId: "industry-medical",
      slug: "healthcare",
      description: "HIPAA compliance and patient data protection",
      image: healthcareImg,
      gradient: "from-cyan-400 to-teal-500",
      glowColor: "rgba(34,211,238,0.4)"
    },
    { 
      icon: Home, 
      name: "Real Estate Firms", 
      testId: "industry-realestate",
      slug: "real-estate",
      description: "Wire fraud prevention and transaction security",
      image: realEstateImg,
      gradient: "from-emerald-500 to-green-500",
      glowColor: "rgba(16,185,129,0.4)"
    },
    { 
      icon: Heart, 
      name: "Animal Hospitals", 
      testId: "industry-animal",
      slug: "nonprofits",
      description: "Veterinary practice and client data protection",
      image: animalHospitalImg,
      gradient: "from-pink-500 to-rose-500",
      glowColor: "rgba(236,72,153,0.4)"
    }
  ];

  const containerVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = prefersReducedMotion ? undefined : {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const titleVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section 
      className="py-16 md:py-20 lg:py-24 bg-[#0d0720] relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.12),transparent_50%),
          radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.08),transparent_50%),
          #0d0720
        `
      }}
    >
      {/* Pattern overlay for visual texture */}
      <PatternOverlay variant="dots" opacity={0.015} />
      
      {/* Accent glows */}
      <GlowOrb color="rgba(59, 130, 246, 0.1)" size={500} top="10%" right="10%" animate />
      <GlowOrb color="rgba(139, 92, 246, 0.08)" size={500} bottom="10%" left="10%" animate />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={titleVariants}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Industries We Serve
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Specialized cybersecurity solutions for Arizona's essential sectors
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {industries.map((industry) => (
            <motion.a 
              key={industry.testId}
              href={`/industries/${industry.slug}`}
              className="group relative block"
              data-testid={industry.testId}
              variants={cardVariants}
            >
              {/* Glow effect */}
              <div 
                className="absolute -inset-0.5 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: industry.glowColor }}
              />
              
              {/* Card */}
              <div className="relative overflow-hidden rounded-2xl h-64 sm:h-72">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${industry.image})` }}
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${industry.gradient} opacity-60 mix-blend-multiply`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${industry.gradient} flex items-center justify-center mb-3 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <industry.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">
                    {industry.name}
                  </h3>
                  <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {industry.description}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a href="https://meet.digerati-experts.com/" target="_blank" rel="noopener noreferrer">
            <Button 
              size="lg"
              className="h-14 px-8 text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border-0 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
              data-testid="button-industries-cta"
            >
              Get Industry-Specific Protection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
