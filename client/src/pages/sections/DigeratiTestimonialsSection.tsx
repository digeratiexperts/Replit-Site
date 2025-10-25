import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface Testimonial {
  rating: number;
  text: string;
  author: string;
  role: string;
  avatar: string;
}

export const DigeratiTestimonialsSection = (): JSX.Element => {
  const testimonials: Testimonial[] = [
    {
      rating: 5,
      text: "Digerati delivered beyond our expectations. Their encryption protocols and risk assessments helped us meet strict compliance standards with ease.",
      author: "James Torres",
      role: "CEO, Phoenix Manufacturing",
      avatar: "/api/placeholder/40/40"
    },
    {
      rating: 5, 
      text: "We passed our HIPAA audit with flying colors thanks to Digerati. They handle our compliance so we can focus on patient care.",
      author: "Dr. Sarah Martinez",
      role: "Chandler Medical Group",
      avatar: "/api/placeholder/40/40"
    },
    {
      rating: 5,
      text: "Switching to Digerati cut our IT costs by 40% while dramatically improving our security posture. Best decision we've made.",
      author: "Michael Chen",
      role: "CFO, Arizona Financial Services",
      avatar: "/api/placeholder/40/40"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const handlePrevious = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
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
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real Stories from Satisfied Customers
          </h2>
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className="text-lg text-gray-600">
            Trusted by 100+ Arizona Businesses
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="relative">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
                <span className="ml-2 text-sm text-gray-600">5-Star Rating</span>
              </div>
              
              <p className="text-lg text-gray-700 italic text-center mb-6" data-testid="testimonial-text">
                "{testimonials[currentTestimonial].text}"
              </p>
              
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <div className="font-semibold text-gray-900" data-testid="testimonial-author">
                    {testimonials[currentTestimonial].author}
                  </div>
                  <div className="text-sm text-gray-600" data-testid="testimonial-role">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </div>

              <button
                onClick={handlePrevious}
                className="absolute top-1/2 -translate-y-1/2 left-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600"
                data-testid="testimonial-prev"
                aria-label="Previous testimonial"
                type="button"
              >
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              </button>

              <button
                onClick={handleNext}
                className="absolute top-1/2 -translate-y-1/2 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600"
                data-testid="testimonial-next"
                aria-label="Next testimonial"
                type="button"
              >
                <ChevronRight className="h-5 w-5 text-gray-700" />
              </button>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 hover:scale-125 ${
                  currentTestimonial === index ? 'bg-purple-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                data-testid={`testimonial-indicator-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};