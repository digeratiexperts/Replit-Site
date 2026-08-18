import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import atmosphere from "@assets/de-section-atmosphere.png";

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
  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["0%", "9%"]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <motion.img
        src={atmosphere}
        alt=""
        className="absolute inset-x-0 top-0 h-[70vh] min-h-[28rem] w-full object-cover object-center"
        style={{ y, opacity: 0.32 }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.72) 42%, #0a0a0a 78%), linear-gradient(90deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.12) 48%, rgba(10,10,10,0.45) 100%)",
        }}
      />
      <div
        className="absolute -right-[12%] top-[8%] h-[28rem] w-[28rem]"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, rgba(29, 111, 242, 0.16) 0%, rgba(29, 111, 242, 0.04) 42%, transparent 68%)",
        }}
      />
    </div>
  );
}
