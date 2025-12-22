import { motion } from "framer-motion";

export const AnimatedShield = ({ className = "" }: { className?: string }) => {
  return (
    <motion.svg
      viewBox="0 0 200 240"
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <defs>
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="shieldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="innerGlow">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>

      {/* Outer glow ring */}
      <motion.ellipse
        cx="100"
        cy="120"
        rx="90"
        ry="100"
        fill="none"
        stroke="url(#shieldGlow)"
        strokeWidth="1"
        opacity="0.3"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main shield shape */}
      <motion.path
        d="M100 20 L170 50 L170 110 Q170 180 100 220 Q30 180 30 110 L30 50 Z"
        fill="url(#shieldGradient)"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Shield inner highlight */}
      <motion.path
        d="M100 35 L155 58 L155 108 Q155 165 100 200 Q45 165 45 108 L45 58 Z"
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />

      {/* Checkmark */}
      <motion.path
        d="M65 115 L90 140 L135 90"
        fill="none"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#innerGlow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
      />

      {/* Animated scan line */}
      <motion.rect
        x="40"
        y="50"
        width="120"
        height="3"
        fill="rgba(255,255,255,0.6)"
        rx="1.5"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: [50, 180, 50], opacity: [0, 0.8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1.5 }}
      />

      {/* Corner accents */}
      <motion.circle
        cx="100"
        cy="20"
        r="6"
        fill="#c4b5fd"
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      />
    </motion.svg>
  );
};
