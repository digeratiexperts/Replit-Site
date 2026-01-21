import { useState, useEffect } from "react";

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

export function useAnimationConfig() {
  const prefersReducedMotion = useReducedMotion();

  return {
    duration: prefersReducedMotion ? 0 : 0.3,
    stiffness: prefersReducedMotion ? 1000 : 300,
    damping: prefersReducedMotion ? 100 : 30,
    animate: !prefersReducedMotion,
  };
}
