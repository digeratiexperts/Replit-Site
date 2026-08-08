import { motion, useReducedMotion } from "framer-motion";
import { Shield, ArrowRight } from "lucide-react";
import colleaguesImg from "@assets/business-colleagues-working-office_1767027918693.png";
import professionalImg from "@assets/stock_images/professional_busines_96e20e69.jpg";
import officeManagerImg from "@assets/stock_images/office_manager_profe_89dfed13.jpg";
import realEstateImg from "@assets/stock_images/real_estate_broker_p_f7fb1c14.jpg";

const commitments = [
  { value: "Assessment first", label: "Recommendations start with your actual environment" },
  { value: "Plain English", label: "You will understand the risk and the next step" },
  { value: "Principal-led", label: "Joe stays involved from recommendation through delivery" },
  { value: "Accountable", label: "We own the follow-through after the sale" },
];

export const DigeratiTrustPhotoSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-white py-14 md:py-20 lg:py-24 overflow-hidden" data-testid="section-trust-photo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Copy */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Shield className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-semibold text-violet-600 uppercase tracking-wider">
                A Local Operator, Not a Faceless Help Desk
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              You should know who is{" "}
              <span className="text-violet-600">accountable.</span>
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
              Digerati Experts is built around a hands-on promise: understand the business, assess the environment, explain what matters, and remain accountable after the work begins.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              {commitments.map((commitment) => (
                <div key={commitment.value} className="border-l-2 border-violet-200 pl-4">
                  <div className="text-lg sm:text-xl font-bold text-gray-900 mb-1" data-testid={`commitment-${commitment.value.replace(/\s+/g, '-').toLowerCase()}`}>
                    {commitment.value}
                  </div>
                  <div className="text-sm text-gray-500 leading-snug">{commitment.label}</div>
                </div>
              ))}
            </div>

            <a
              href="/book"
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
              data-testid="link-trust-cta"
            >
              See Whether We’re a Fit
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Right: Photo grid */}
          <motion.div
            className="grid grid-cols-2 gap-3 sm:gap-4"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Main large photo - spans full width on top */}
            <div className="col-span-2 rounded-xl overflow-hidden aspect-[16/9] bg-gray-100">
              <img
                src={colleaguesImg}
                alt="Business colleagues working together in an Arizona office"
                className="w-full h-full object-cover"
                loading="lazy"
                data-testid="img-colleagues-office"
              />
            </div>

            {/* Bottom row: three smaller photos */}
            <div className="rounded-xl overflow-hidden aspect-square bg-gray-100">
              <img
                src={professionalImg}
                alt="IT professional"
                className="w-full h-full object-cover object-top"
                loading="lazy"
                data-testid="img-professional-1"
              />
            </div>

            <div className="rounded-xl overflow-hidden aspect-square bg-gray-100 grid grid-rows-2 gap-3">
              <div className="rounded-lg overflow-hidden bg-gray-100 h-full">
                <img
                  src={officeManagerImg}
                  alt="Office manager working with managed IT support"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  data-testid="img-office-manager"
                />
              </div>
              <div className="rounded-lg overflow-hidden bg-gray-100 h-full">
                <img
                  src={realEstateImg}
                  alt="Real estate professional"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  data-testid="img-real-estate"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
