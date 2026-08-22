/**
 * Shared marketing motion.
 * Reveals must start before the element is centered and finish while
 * the visitor is still looking at it. Prefer transform/opacity only.
 */

export const revealEase = [0.22, 1, 0.36, 1] as const;

/** Expand the root downward so the reveal starts as the block approaches.
 *  Pixel values only — percentage rootMargin is ignored in some engines. */
export const REVEAL_ROOT_MARGIN = "0px 0px 220px 0px";

export const revealViewport = {
  once: true,
  amount: 0.08,
  margin: REVEAL_ROOT_MARGIN,
} as const;

export const revealTransition = {
  duration: 0.3,
  ease: revealEase,
};

export const revealInitial = { opacity: 0.55, y: 12 };
export const revealInView = { opacity: 1, y: 0 };

export const fadeIn = {
  initial: { opacity: 0.55 },
  animate: { opacity: 1 },
  exit: { opacity: 0.55 },
  transition: { duration: 0.28, ease: "easeOut" },
};

export const fadeInUp = {
  initial: revealInitial,
  animate: revealInView,
  exit: { opacity: 0.55, y: -8 },
  transition: revealTransition,
};

export const fadeInDown = {
  initial: { opacity: 0.55, y: -12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0.55, y: 8 },
  transition: revealTransition,
};

export const fadeInLeft = {
  initial: { opacity: 0.55, x: -12 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0.55, x: 12 },
  transition: revealTransition,
};

export const fadeInRight = {
  initial: { opacity: 0.55, x: 12 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0.55, x: -12 },
  transition: revealTransition,
};

export const scaleIn = {
  initial: { opacity: 0.55, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0.55, scale: 0.98 },
  transition: { duration: 0.28, ease: revealEase },
};

export const slideUp = {
  initial: { y: "100%" },
  animate: { y: 0 },
  exit: { y: "100%" },
  transition: { duration: 0.32, ease: revealEase },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0,
    },
  },
};

export const staggerItem = {
  initial: revealInitial,
  animate: revealInView,
  transition: revealTransition,
};

export const springConfig = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

export const smoothConfig = {
  type: "tween" as const,
  ease: revealEase,
  duration: 0.3,
};

export function createStaggerDelay(index: number, baseDelay = 0.045): number {
  return index * baseDelay;
}

/** Lift only — no scale. Scale-on-hover reads as generic SaaS chrome. */
export const cardHover = {
  rest: {
    y: 0,
    transition: { duration: 0.18, ease: "easeOut" },
  },
  hover: {
    y: -3,
    transition: { duration: 0.18, ease: "easeOut" },
  },
};

export const buttonPress = {
  rest: { scale: 1 },
  pressed: { scale: 0.98 },
  hover: { y: -1 },
};

export const linkHover = {
  rest: {
    backgroundSize: "0% 2px",
    backgroundPosition: "0% 100%",
  },
  hover: {
    backgroundSize: "100% 2px",
    backgroundPosition: "0% 100%",
  },
};
