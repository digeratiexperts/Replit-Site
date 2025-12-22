import { motion } from "framer-motion";

export const CircuitPattern = ({ className = "" }: { className?: string }) => {
  return (
    <motion.svg
      viewBox="0 0 400 400"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <defs>
        <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.8" />
        </linearGradient>
        <filter id="circuitGlow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Horizontal lines */}
      {[80, 160, 240, 320].map((y, i) => (
        <motion.path
          key={`h-${i}`}
          d={`M 20 ${y} H 100 L 120 ${y - 20} H 200 L 220 ${y} H 300 L 320 ${y + 20} H 380`}
          stroke="url(#circuitGradient)"
          strokeWidth="2"
          fill="none"
          filter="url(#circuitGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ delay: i * 0.2, duration: 1.5, ease: "easeInOut" }}
        />
      ))}

      {/* Vertical lines */}
      {[80, 160, 240, 320].map((x, i) => (
        <motion.path
          key={`v-${i}`}
          d={`M ${x} 20 V 80 L ${x + 20} 100 V 180 L ${x} 200 V 280 L ${x - 20} 300 V 380`}
          stroke="url(#circuitGradient)"
          strokeWidth="2"
          fill="none"
          filter="url(#circuitGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ delay: 0.5 + i * 0.2, duration: 1.5, ease: "easeInOut" }}
        />
      ))}

      {/* Junction nodes */}
      {[
        { x: 80, y: 80 }, { x: 160, y: 80 }, { x: 240, y: 80 }, { x: 320, y: 80 },
        { x: 80, y: 160 }, { x: 160, y: 160 }, { x: 240, y: 160 }, { x: 320, y: 160 },
        { x: 80, y: 240 }, { x: 160, y: 240 }, { x: 240, y: 240 }, { x: 320, y: 240 },
        { x: 80, y: 320 }, { x: 160, y: 320 }, { x: 240, y: 320 }, { x: 320, y: 320 },
      ].map((node, i) => (
        <motion.circle
          key={`node-${i}`}
          cx={node.x}
          cy={node.y}
          r="6"
          fill="url(#circuitGradient)"
          filter="url(#circuitGlow)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 + i * 0.05, duration: 0.3, ease: "backOut" }}
        />
      ))}

      {/* Animated data pulses */}
      {[0, 1, 2, 3].map((i) => (
        <motion.circle
          key={`pulse-h-${i}`}
          r="4"
          fill="#22d3ee"
          filter="url(#circuitGlow)"
          initial={{ opacity: 0 }}
          animate={{
            cx: [20, 380],
            cy: [80 + i * 80, 80 + i * 80],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear",
          }}
        />
      ))}

      {/* Center processor chip */}
      <motion.rect
        x="170"
        y="170"
        width="60"
        height="60"
        rx="8"
        fill="url(#circuitGradient)"
        filter="url(#circuitGlow)"
        initial={{ scale: 0, rotate: 45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.5, duration: 0.5, ease: "backOut" }}
      />
      <motion.rect
        x="185"
        y="185"
        width="30"
        height="30"
        rx="4"
        fill="rgba(255,255,255,0.3)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
      />
    </motion.svg>
  );
};
