import { motion } from "framer-motion";

interface Node {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

interface Connection {
  from: number;
  to: number;
}

export const NetworkNodes = ({ className = "" }: { className?: string }) => {
  const nodes: Node[] = [
    { id: 1, x: 100, y: 50, size: 12, delay: 0 },
    { id: 2, x: 50, y: 120, size: 10, delay: 0.1 },
    { id: 3, x: 150, y: 120, size: 10, delay: 0.2 },
    { id: 4, x: 25, y: 200, size: 8, delay: 0.3 },
    { id: 5, x: 100, y: 180, size: 14, delay: 0.4 },
    { id: 6, x: 175, y: 200, size: 8, delay: 0.5 },
    { id: 7, x: 60, y: 260, size: 6, delay: 0.6 },
    { id: 8, x: 140, y: 260, size: 6, delay: 0.7 },
  ];

  const connections: Connection[] = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 3, to: 5 },
    { from: 3, to: 6 },
    { from: 4, to: 7 },
    { from: 5, to: 7 },
    { from: 5, to: 8 },
    { from: 6, to: 8 },
  ];

  const getNode = (id: number) => nodes.find(n => n.id === id)!;

  return (
    <motion.svg
      viewBox="0 0 200 300"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <defs>
        <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.6" />
        </linearGradient>
        <filter id="nodeGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Connection lines */}
      {connections.map((conn, index) => {
        const fromNode = getNode(conn.from);
        const toNode = getNode(conn.to);
        return (
          <motion.line
            key={`line-${index}`}
            x1={fromNode.x}
            y1={fromNode.y}
            x2={toNode.x}
            y2={toNode.y}
            stroke="url(#lineGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
          />
        );
      })}

      {/* Data pulse animations along connections */}
      {connections.slice(0, 5).map((conn, index) => {
        const fromNode = getNode(conn.from);
        const toNode = getNode(conn.to);
        return (
          <motion.circle
            key={`pulse-${index}`}
            r="3"
            fill="#22d3ee"
            filter="url(#nodeGlow)"
            initial={{ opacity: 0 }}
            animate={{
              cx: [fromNode.x, toNode.x],
              cy: [fromNode.y, toNode.y],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: 1.5 + index * 0.8,
              ease: "linear",
            }}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => (
        <g key={node.id}>
          {/* Outer glow ring */}
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={node.size + 4}
            fill="none"
            stroke="url(#nodeGradient)"
            strokeWidth="1"
            opacity="0.4"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{
              delay: node.delay + 1,
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Main node */}
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={node.size}
            fill="url(#nodeGradient)"
            filter="url(#nodeGlow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: node.delay, duration: 0.4, ease: "backOut" }}
          />
          {/* Inner highlight */}
          <motion.circle
            cx={node.x - node.size * 0.3}
            cy={node.y - node.size * 0.3}
            r={node.size * 0.3}
            fill="rgba(255,255,255,0.4)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: node.delay + 0.2, duration: 0.3 }}
          />
        </g>
      ))}
    </motion.svg>
  );
};
