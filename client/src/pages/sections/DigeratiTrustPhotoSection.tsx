import { motion, useReducedMotion } from "framer-motion";
import { Shield, ArrowRight } from "lucide-react";
import colleaguesImg from "@assets/business-colleagues-working-office_1767027918693.png";
import professionalImg from "@assets/stock_images/professional_busines_96e20e69.jpg";
import officeManagerImg from "@assets/stock_images/office_manager_profe_89dfed13.jpg";
import realEstateImg from "@assets/stock_images/real_estate_broker_p_f7fb1c14.jpg";

const stats = [
  { value: "100+", label: "Arizona businesses protected" },
  { value: "<15 min", label: "Average incident response" },
  { value: "99.9%", label: "Uptime on managed networks" },
  { value: "0", label: "Ransomware payouts by clients" },
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
                Trusted by Arizona Businesses
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Real businesses.{" "}
              <span className="text-violet-600">Real protection.</span>
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
              From medical practices to law firms to family-owned offices, we
              protect the businesses that Arizona runs on — the ones that can't
              afford to go down, get breached, or lose client data.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              {stats.map((stat) => (
                <div key={stat.label} className="border-l-2 border-violet-200 pl-4">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1" data-testid={`stat-${stat.label.replace(/\s+/g, '-').toLowerCase()}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 leading-snug">{stat.label}</div>
                </div>
              ))}
            </div>

            <a
              href="/book"
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
              data-testid="link-trust-cta"
            >
              See if you qualify for a free assessment
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
