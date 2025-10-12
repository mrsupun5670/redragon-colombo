import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const DevelopmentWatermark = () => {
  return (
    <>
      {/* Top Banner - Fixed */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed top-20 left-0 right-0 z-40 bg-gradient-to-r from-yellow-500 to-orange-500 border-b-2 border-yellow-600 shadow-lg"
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-center gap-3 text-white">
            <AlertTriangle className="w-5 h-5 animate-pulse" />
            <span className="font-black text-sm md:text-base uppercase tracking-wider">
              ⚠️ Website Under Development - Preview Mode
            </span>
            <AlertTriangle className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </motion.div>

      {/* Diagonal Watermark - Bottom Right */}
      <div className="fixed bottom-8 right-8 z-40 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
          animate={{ opacity: 0.15, scale: 1, rotate: -45 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="select-none"
        >
          <div className="text-6xl md:text-8xl font-black text-gray-900 uppercase tracking-wider">
            Under
            <br />
            Development
          </div>
        </motion.div>
      </div>

      {/* Corner Badge - Top Right */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed top-24 right-4 z-40"
      >
        <div className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg shadow-xl border-2 border-yellow-500 transform rotate-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="font-black text-xs uppercase">Beta</span>
          </div>
        </div>
      </motion.div>

      {/* Floating Watermark - Center (for screenshots) */}
      <div className="fixed inset-0 z-30 pointer-events-none flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.03, 0.05, 0.03] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-9xl font-black text-gray-900 uppercase tracking-widest select-none"
          style={{ transform: "rotate(-30deg)" }}
        >
          Preview
        </motion.div>
      </div>
    </>
  );
};

export default DevelopmentWatermark;
