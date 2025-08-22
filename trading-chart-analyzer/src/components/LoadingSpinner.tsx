'use client';

import { motion } from 'framer-motion';
import { Brain, BarChart3 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto text-center"
    >
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
        {/* Spinner */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-full h-full border-4 border-white/20 border-t-blue-400 rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Brain className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">
            Analyzing Chart...
          </h3>
          <p className="text-sm text-gray-300">
            AI is processing your trading chart
          </p>
        </div>

        {/* Progress indicators */}
        <div className="mt-6 space-y-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center space-x-2 text-xs text-gray-400"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Detecting patterns...</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="flex items-center justify-center space-x-2 text-xs text-gray-400"
          >
            <Brain className="w-4 h-4" />
            <span>Analyzing indicators...</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
            className="flex items-center justify-center space-x-2 text-xs text-gray-400"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Generating signal...</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}