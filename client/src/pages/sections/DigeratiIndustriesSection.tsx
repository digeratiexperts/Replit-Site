import { Briefcase, Calculator, Stethoscope, Home, Heart, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";

import lawBooksImg from "@assets/Rectangle-152058_1767027918697.png";
import lawScalesImg from "@assets/Rectangle-152058-1_1767027918697.png";
import healthcareImg from "@assets/Rectangle-152058-2_1767027918698.png";
import realEstateImg from "@assets/Rectangle-152058-3_1767027918698.png";
import animalHospitalImg from "@assets/Rectangle-152058-4_1767027918698.png";

export const DigeratiIndustriesSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms - reduced for smoother scroll
  const backgroundY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["-3%", "3%"]);
  const floatingY1 = useTransform(scrollYProgress, [0, 1], [prefersReducedMotion ? 0 : 18, prefersReducedMotion ? 0 : -18]);
  const floatingY2 = useTransform(scrollYProgress, [0, 1], [prefersReducedMotion ? 0 : -12, prefersReducedMotion ? 0 : 12]);

  const industries = [
    { 
      icon: Briefcase, 
      name: "Law Firms", 
      testId: "industry-law",
      slug: "law-firms",
      description: "Protect client privilege and meet ABA compliance requirements",
      image: lawScalesImg
    },
    { 
      icon: Calculator, 
      name: "CPA Firms", 
      testId: "industry-cpa",
      slug: "accounting-finance",
      description: "Secure tax data and ensure IRS/FTC compliance",
      image: lawBooksImg
    },
    { 
      icon: Stethoscope, 
      name: "Medical Practices", 
      testId: "industry-medical",
      slug: "healthcare",
      description: "HIPAA compliance and patient data protection",
      image: healthcareImg
    },
    { 
      icon: Home, 
      name: "Real Estate Firms", 
      testId: "industry-realestate",
      slug: "real-estate",
      description: "Wire fraud prevention and transaction security",
      image: realEstateImg
    },
    { 
      icon: Heart, 
      name: "Animal Hospitals", 
      testId: "industry-animal",
      slug: "animal-hospitals",
      description: "Veterinary practice and client data protection",
      image: animalHospitalImg
    }
  ];

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      checkScrollButtons();
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const containerVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = prefersReducedMotion ? undefined : {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20
      }
    }
  };

  const titleVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-10 md:py-14 lg:py-16 bg-[#0a0a0a] relative overflow-hidden"
      style={{ position: 'relative' }}
    >
      {/* Parallax background accents */}
      <motion.div 
        className="absolute top-0 left-1/3 w-[600px] h-[600px] pointer-events-none"
        style={{ 
          y: backgroundY,
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 60%)" 
        }}
      />
      <motion.div 
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] pointer-events-none opacity-50"
        style={{ 
          y: floatingY2,
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.06) 0%, transparent 60%)" 
        }}
      />
      
      {/* Floating decorative elements - hidden on mobile */}
      <motion.div 
        className="absolute top-24 right-12 w-6 h-6 rounded-full border border-violet-500/15 pointer-events-none hidden lg:block"
        style={{ y: floatingY1 }}
      />
      <motion.div 
        className="absolute bottom-32 left-16 w-4 h-4 rounded-lg bg-purple-500/10 rotate-45 pointer-events-none hidden lg:block"
        style={{ y: floatingY2 }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-8 md:mb-12 lg:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={titleVariants}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-4 md:mb-6">
            <Briefcase className="w-3.5 h-3.5 md:w-4 md:h-4 text-violet-400" />
            <span className="text-xs md:text-sm font-medium text-violet-300">Specialized Solutions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 md:mb-4 text-white">
            Industries We <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Serve</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto px-4">
            Specialized cybersecurity solutions for Arizona's essential sectors
          </p>
        </motion.div>

        {/* Mobile: Horizontal scroll with navigation arrows */}
        <div className="lg:hidden relative">
          {/* Left scroll button */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/80 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all ${
              canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll left"
            data-testid="industries-scroll-left"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          
          {/* Right scroll button */}
          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/80 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all ${
              canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll right"
            data-testid="industries-scroll-right"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

          {/* Scrollable container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {industries.map((industry) => (
              <a 
                key={industry.testId}
                href={`/industries/${industry.slug}`}
                className="group relative block flex-shrink-0 w-[280px] snap-center"
                data-testid={industry.testId}
              >
                <div className="relative overflow-hidden rounded-2xl h-[320px] border border-white/10 hover:border-violet-500/30 transition-all duration-300">
                  {/* B&W Image with hover color */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    style={{ backgroundImage: `url(${industry.image})` }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-end">
                    <div className="w-11 h-11 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mb-3">
                      <industry.icon className="h-5 w-5 text-violet-400" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">
                      {industry.name}
                    </h3>
                    <p className="text-gray-200 text-base leading-relaxed">
                      {industry.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Scroll indicator dots */}
          <div className="flex justify-center gap-2 mt-4">
            {industries.map((_, index) => (
              <div 
                key={index}
                className="w-2 h-2 rounded-full bg-white/20"
              />
            ))}
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <motion.div 
          className="hidden lg:grid grid-cols-5 gap-6"
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
              <div className="relative overflow-hidden rounded-2xl h-72 border border-white/10 hover:border-violet-500/30 transition-all duration-300">
                {/* B&W Image with hover color */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  style={{ backgroundImage: `url(${industry.image})` }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mb-3">
                    <industry.icon className="h-6 w-6 text-violet-400" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">
                    {industry.name}
                  </h3>
                  <p className="text-gray-200 text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {industry.description}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-8 md:mt-12"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a href="https://meet.digerati-experts.com/" target="_blank" rel="noopener noreferrer">
            <Button 
              size="lg"
              className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 border-0 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300"
              data-testid="button-industries-cta"
            >
              Get Industry-Specific Protection
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
