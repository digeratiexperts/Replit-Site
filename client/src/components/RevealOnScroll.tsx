import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Cap at 0.2s total stagger budget across a band — do not leave content invisible. */
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

const MAX_DELAY = 0.2;
const MAX_OFFSET = 12;
const DEFAULT_DURATION = 0.32;

export function RevealOnScroll({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = DEFAULT_DURATION,
  threshold = 0.12,
  triggerOnce = true,
}: RevealOnScrollProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    triggerOnce,
  });

  const clampedDelay = Math.min(Math.max(delay, 0), MAX_DELAY);
  const clampedDuration = Math.min(Math.max(duration, 0), 0.4);

  const directionOffsets = {
    up: { y: MAX_OFFSET, x: 0 },
    down: { y: -MAX_OFFSET, x: 0 },
    left: { y: 0, x: MAX_OFFSET },
    right: { y: 0, x: -MAX_OFFSET },
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
      animate={
        isIntersecting
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: offset.x, y: offset.y }
      }
      transition={{
        duration: clampedDuration,
        delay: clampedDelay,
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
  staggerDelay = 0.06,
  threshold = 0.12,
}: StaggerContainerProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    triggerOnce: true,
  });

  // Keep total stagger budget ≤ 200ms for typical 3–4 children.
  const clampedStagger = Math.min(Math.max(staggerDelay, 0), 0.08);

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
            staggerChildren: clampedStagger,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
