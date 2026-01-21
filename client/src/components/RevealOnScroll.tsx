import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

export function RevealOnScroll({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  triggerOnce = true,
}: RevealOnScrollProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    triggerOnce,
  });

  const directionOffsets = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { y: 0, x: 30 },
    right: { y: 0, x: -30 },
    none: { y: 0, x: 0 },
  };

  const offset = directionOffsets[direction];

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={isIntersecting ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: offset.x, y: offset.y }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  threshold?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  threshold = 0.1,
}: StaggerContainerProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    triggerOnce: true,
  });

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isIntersecting ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
