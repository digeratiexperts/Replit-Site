import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import atmosphere from "@assets/de-section-atmosphere-electric.svg";

/**
 * Store field depth — electric lighting only (store accent lock).
 * Parallax is a few percent of travel and stops for reduced motion.
 */
export function StorePageAtmosphere() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "8%"],
  );
  const bloomY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "14%"],
  );

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <motion.img
        src={atmosphere}
        alt=""
        className="absolute inset-x-0 top-0 h-[78vh] min-h-[32rem] w-full object-cover object-center"
        style={{ y, opacity: 0.44 }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.18) 0%, rgba(10,10,10,0.52) 46%, #0a0a0a 84%), linear-gradient(90deg, rgba(10,10,10,0.38) 0%, rgba(10,10,10,0.08) 50%, rgba(10,10,10,0.34) 100%)",
        }}
      />
      <motion.div
        className="absolute -right-[12%] top-[6%] h-[30rem] w-[30rem]"
        style={{
          y: bloomY,
          background:
            "radial-gradient(circle at 60% 40%, rgba(29, 111, 242, 0.2) 0%, rgba(29, 111, 242, 0.05) 42%, transparent 68%)",
        }}
      />
    </div>
  );
}
