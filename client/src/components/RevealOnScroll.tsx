import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { REVEAL_ROOT_MARGIN, revealEase } from "@/lib/animations";

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
  duration = 0.3,
  threshold = 0.08,
  triggerOnce = true,
}: RevealOnScrollProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin: REVEAL_ROOT_MARGIN,
    triggerOnce,
  });

  const directionOffsets = {
    up: { y: 12, x: 0 },
    down: { y: -12, x: 0 },
    left: { y: 0, x: 12 },
    right: { y: 0, x: -12 },
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
      initial={{ opacity: 0.55, x: offset.x, y: offset.y }}
      animate={
        isIntersecting
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0.55, x: offset.x, y: offset.y }
      }
      transition={{
        duration,
        delay,
        ease: revealEase,
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
  staggerDelay = 0.045,
  threshold = 0.08,
}: StaggerContainerProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin: REVEAL_ROOT_MARGIN,
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
  hidden: { opacity: 0.55, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: revealEase,
    },
  },
};
