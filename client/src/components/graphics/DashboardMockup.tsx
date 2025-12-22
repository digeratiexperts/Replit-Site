import { motion } from "framer-motion";
import { Shield, AlertTriangle, CheckCircle, TrendingUp, Lock, Eye, Activity } from "lucide-react";

export const DashboardMockup = ({ className = "" }: { className?: string }) => {
  const threatData = [
    { level: 85, color: "#22c55e" },
    { level: 60, color: "#eab308" },
    { level: 92, color: "#22c55e" },
    { level: 78, color: "#22c55e" },
    { level: 45, color: "#ef4444" },
    { level: 88, color: "#22c55e" },
  ];

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 50, rotateX: 10, rotateY: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{ perspective: "1000px" }}
    >
      {/* Main dashboard container with glassmorphism */}
      <div 
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          transform: "perspective(1000px) rotateX(2deg) rotateY(-2deg)",
        }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/20">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-4 py-1 bg-white/5 rounded-md text-xs text-gray-400 flex items-center gap-2">
              <Lock className="w-3 h-3 text-green-400" />
              security.digeratiexperts.com
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-6 space-y-5">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center"
                animate={{ boxShadow: ["0 0 20px rgba(139, 92, 246, 0.3)", "0 0 30px rgba(139, 92, 246, 0.6)", "0 0 20px rgba(139, 92, 246, 0.3)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Shield className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <div className="text-white font-semibold text-sm">Security Dashboard</div>
                <div className="text-gray-400 text-xs">Real-time threat monitoring</div>
              </div>
            </div>
            <motion.div 
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-green-400 text-xs font-medium">Protected</span>
            </motion.div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: CheckCircle, label: "Threats Blocked", value: "2,847", color: "from-green-500 to-emerald-600", trend: "+12%" },
              { icon: Eye, label: "Endpoints Monitored", value: "156", color: "from-blue-500 to-cyan-600", trend: "Active" },
              { icon: AlertTriangle, label: "Risk Score", value: "Low", color: "from-purple-500 to-violet-600", trend: "Optimal" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="p-3 rounded-xl bg-white/5 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
                <div className="text-white font-bold text-lg">{stat.value}</div>
                <div className="text-gray-400 text-xs">{stat.label}</div>
                <div className="text-green-400 text-xs mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Activity chart */}
          <motion.div
            className="p-4 rounded-xl bg-white/5 border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" />
                <span className="text-white text-sm font-medium">Security Health</span>
              </div>
              <span className="text-xs text-gray-400">Last 7 days</span>
            </div>
            <div className="flex items-end gap-2 h-20">
              {threatData.map((bar, index) => (
                <motion.div
                  key={index}
                  className="flex-1 rounded-t-md"
                  style={{ backgroundColor: bar.color }}
                  initial={{ height: 0 }}
                  animate={{ height: `${bar.level}%` }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5, ease: "backOut" }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <span key={day} className="text-xs text-gray-500">{day}</span>
              ))}
            </div>
          </motion.div>

          {/* Recent alerts */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {[
              { text: "Malware attempt blocked from 192.168.1.45", time: "2 min ago", type: "blocked" },
              { text: "Suspicious login attempt detected", time: "15 min ago", type: "warning" },
              { text: "Security patch applied successfully", time: "1 hour ago", type: "success" },
            ].map((alert, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 border border-white/5"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.3 }}
              >
                <div className={`w-2 h-2 rounded-full ${
                  alert.type === "blocked" ? "bg-red-500" : 
                  alert.type === "warning" ? "bg-yellow-500" : "bg-green-500"
                }`} />
                <div className="flex-1 text-xs text-gray-300">{alert.text}</div>
                <div className="text-xs text-gray-500">{alert.time}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating glow effect behind */}
      <motion.div
        className="absolute -inset-4 -z-10 rounded-3xl opacity-50"
        style={{
          background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
};
