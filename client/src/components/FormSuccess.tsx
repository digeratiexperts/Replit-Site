import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface FormSuccessProps {
  title?: string;
  message?: string;
  onComplete?: () => void;
}

export function FormSuccess({ 
  title = "Success!", 
  message = "Your submission has been received.",
  onComplete 
}: FormSuccessProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-8 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: [0.22, 1, 0.36, 1]
      }}
      role="status"
      aria-live="polite"
    >
      <motion.div
        className="relative mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          delay: prefersReducedMotion ? 0 : 0.2,
          type: "spring",
          stiffness: 200,
          damping: 15
        }}
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ 
              delay: prefersReducedMotion ? 0 : 0.4,
              duration: prefersReducedMotion ? 0 : 0.3
            }}
          >
            <Check className="w-8 h-8 text-emerald-500" aria-hidden="true" />
          </motion.div>
        </div>
        
        {!prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 rounded-full bg-emerald-500/20"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        )}
      </motion.div>

      <motion.h3
        className="text-xl font-semibold text-white mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: prefersReducedMotion ? 0 : 0.3 }}
      >
        {title}
      </motion.h3>

      <motion.p
        className="text-white/60 text-base max-w-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: prefersReducedMotion ? 0 : 0.4 }}
      >
        {message}
      </motion.p>
    </motion.div>
  );
}

export function FormSubmitting({ message = "Submitting..." }: { message?: string }) {
  return (
    <div 
      className="flex flex-col items-center justify-center py-8"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative mb-4">
        <div className="w-12 h-12 rounded-full border-2 border-de-hairline border-t-de-accent animate-spin" />
        <div className="absolute inset-0 w-12 h-12 rounded-full bg-de-raised blur-xl animate-pulse" />
      </div>
      <p className="text-white/60 text-base animate-pulse">{message}</p>
      <span className="sr-only">Form is being submitted, please wait</span>
    </div>
  );
}
