import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PatternOverlay, DiagonalDivider } from "@/components/SectionPatterns";

interface FAQ {
  question: string;
  answer: string;
}

export const DigeratiFAQSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: "What is your best service?",
      answer: "Our most comprehensive service is the Enterprise package, which includes full compliance modules (HIPAA, GDPR), penetration testing, disaster recovery runbooks, and privileged access controls. However, most businesses find our Business package provides the perfect balance of SOC/MDR protection, SMART HR, and vCIO advisory at a great value."
    },
    {
      question: "How do I choose the right plan for my business?",
      answer: "Evaluate your business size, needs, and goals. Our Office package is ideal for small teams (5-30 users) who need security-first IT basics. Business adds SOC/MDR monitoring and SMART HR. Enterprise is designed for organizations with compliance requirements. We offer a free FTA (First Time Appointment) to help you choose."
    },
    {
      question: "Can I customize the solutions?",
      answer: "Yes! We understand every business is unique. Our packages can be customized with additional services, and we offer both co-managed and fully managed options to fit your existing IT structure."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We employ enterprise-grade encryption, 24/7 monitoring, and follow strict security protocols. We're SOC 2 Type II certified and help our clients meet HIPAA, PCI DSS, and other compliance standards."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const headerVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section 
      className="relative py-[80px] pt-32 pb-32 overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 50%, #E2E8F0 100%)'
      }}
    >
      {/* Diagonal transitions */}
      <DiagonalDivider position="top" toColor="#0a0118" height={80} angle="left" />
      <DiagonalDivider position="bottom" toColor="#0a0118" height={80} angle="right" />
      
      {/* Pattern overlay */}
      <PatternOverlay variant="dots" opacity={0.025} />
      
      {/* Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-400/5 rounded-full blur-[80px] pointer-events-none z-0" />
      
      {/* SVG gradient definition for chevron */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="chevronGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#9333EA" />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-[#1A202C]">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-[#4A5568] leading-relaxed">
            Find answers to common queries about us.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="space-y-4"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`
                  relative rounded-xl transition-all duration-300
                  ${isOpen 
                    ? 'bg-white border border-purple-200 shadow-lg' 
                    : 'bg-white border border-gray-200 hover:border-purple-300 hover:shadow-md'
                  }
                `}
                data-testid={`faq-${index}`}
              >
                {/* Accordion Trigger */}
                <button
                  className="w-full p-5 md:p-6 cursor-pointer flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-[#F7FAFC] rounded-xl"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                  data-testid={`faq-trigger-${index}`}
                >
                  <span className="text-lg font-semibold text-[#1A202C] pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown 
                      className="h-5 w-5" 
                      style={{ stroke: 'url(#chevronGradient)' }} 
                    />
                  </motion.div>
                </button>

                {/* Accordion Content */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  {/* Divider */}
                  <div className="mx-5 md:mx-6 h-px bg-purple-200" />
                  
                  <div className="p-5 md:p-6 pt-4">
                    <p className="text-[#4A5568] leading-relaxed" data-testid={`faq-answer-${index}`}>
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
