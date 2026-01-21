import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface Testimonial {
  rating: number;
  text: string;
  author: string;
  role: string;
  avatar: string;
}

export const DigeratiTestimonialsSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  
  const testimonials: Testimonial[] = [
    {
      rating: 5,
      text: "After a ransomware scare hit a firm down the street, we called Digerati. They implemented 24/7 SOC monitoring and now I actually sleep at night knowing client files are protected.",
      author: "Rebecca Thornton",
      role: "Managing Partner, Thornton & Associates Law",
      avatar: "/api/placeholder/40/40"
    },
    {
      rating: 5, 
      text: "We passed our HIPAA audit with zero findings. Digerati's team documented everything, trained our staff, and handled the technical controls. Worth every penny.",
      author: "Dr. David Nguyen",
      role: "Owner, East Valley Family Medicine",
      avatar: "/api/placeholder/40/40"
    },
    {
      rating: 5,
      text: "Our old MSP took 2 days to respond to tickets. Digerati responds in under 15 minutes. When our server went down last month, they had us back online in 2 hours.",
      author: "Patricia Wells",
      role: "Office Manager, Desert Sun CPA Group",
      avatar: "/api/placeholder/40/40"
    },
    {
      rating: 5,
      text: "We had a wire fraud attempt during a $400K closing. Digerati's email security flagged it instantly and saved us from disaster. That alone paid for years of service.",
      author: "Mark Rodriguez",
      role: "Broker/Owner, Sonoran Realty Partners",
      avatar: "/api/placeholder/40/40"
    },
    {
      rating: 5,
      text: "Moving to their ProActive platform consolidated 6 different vendors into one bill. Now I have one number to call and one team that knows our entire environment.",
      author: "Jennifer Blackwood",
      role: "Operations Director, Blackwood Veterinary Hospital",
      avatar: "/api/placeholder/40/40"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);

  const handlePrevious = () => {
    setPage([page - 1, -1]);
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setPage([page + 1, 1]);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    const newDirection = index > currentTestimonial ? 1 : -1;
    setPage([page + newDirection, newDirection]);
    setCurrentTestimonial(index);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePrevious();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [page]);

  const slideVariants = prefersReducedMotion ? {
    enter: { opacity: 1 },
    center: { zIndex: 1, opacity: 1 },
    exit: { zIndex: 0, opacity: 1 },
  } : {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const containerVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative py-20 bg-[#0a0a0a] overflow-hidden">
      {/* Subtle purple accent */}
      <div 
        className="absolute top-0 right-1/4 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 60%)" }}
      />
      
      <motion.div 
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Real Stories from Satisfied Customers
          </h2>
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className="h-6 w-6 fill-current" 
                style={{
                  color: '#fbbf24',
                  filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.5))'
                }}
              />
            ))}
          </div>
          <p className="text-lg text-gray-400">
            Trusted by 100+ Arizona Businesses
          </p>
        </motion.div>

        <motion.div className="max-w-3xl mx-auto" variants={itemVariants}>
          <div className="relative">
            {/* Floating quote mark */}
            <div className="absolute -top-8 -left-4 md:-left-12 z-0 pointer-events-none">
              <Quote className="w-20 h-20 md:w-28 md:h-28 text-violet-500/20" />
            </div>

            <Card className="relative bg-white/[0.03] border border-white/10 rounded-2xl hover:border-violet-500/20 transition-all duration-300">
              <CardContent className="p-8 md:p-10 overflow-hidden">
                <div className="flex items-center justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-5 w-5 fill-current"
                      style={{
                        color: '#fbbf24',
                        filter: 'drop-shadow(0 0 3px rgba(251, 191, 36, 0.4))'
                      }}
                    />
                  ))}
                  <span className="ml-2 text-base text-gray-400">5-Star Rating</span>
                </div>
                
                <div className="relative min-h-[120px]">
                  <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.3 },
                      }}
                    >
                      <p className="text-lg text-gray-200 italic text-center mb-6" data-testid="testimonial-text">
                        "{testimonials[currentTestimonial].text}"
                      </p>
                      
                      <div className="flex items-center justify-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-cyan-500/30 rounded-full mr-4 border border-white/20 flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">
                            {testimonials[currentTestimonial].author.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-white" data-testid="testimonial-author">
                            {testimonials[currentTestimonial].author}
                          </div>
                          <div className="text-base text-gray-400" data-testid="testimonial-role">
                            {testimonials[currentTestimonial].role}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <button
                  onClick={handlePrevious}
                  className="absolute top-1/2 -translate-y-1/2 left-2 md:left-4 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  data-testid="testimonial-prev"
                  aria-label="Previous testimonial"
                  type="button"
                >
                  <ChevronLeft className="h-5 w-5 text-white" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute top-1/2 -translate-y-1/2 right-2 md:right-4 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  data-testid="testimonial-next"
                  aria-label="Next testimonial"
                  type="button"
                >
                  <ChevronRight className="h-5 w-5 text-white" />
                </button>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`h-3 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0118] hover:scale-125 ${
                  currentTestimonial === index 
                    ? 'w-8 bg-gradient-to-r from-purple-500 to-cyan-400' 
                    : 'w-3 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                data-testid={`testimonial-indicator-${index}`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
