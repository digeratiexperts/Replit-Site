export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3, ease: "easeOut" },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
};

export const slideUp = {
  initial: { y: "100%" },
  animate: { y: 0 },
  exit: { y: "100%" },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
};

export const springConfig = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

export const smoothConfig = {
  type: "tween" as const,
  ease: [0.22, 1, 0.36, 1],
  duration: 0.4,
};

export function createStaggerDelay(index: number, baseDelay = 0.1): number {
  return index * baseDelay;
}

export const cardHover = {
  rest: { 
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  hover: { 
    scale: 1.02,
    y: -4,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export const buttonPress = {
  rest: { scale: 1 },
  pressed: { scale: 0.98 },
  hover: { scale: 1.02 },
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
