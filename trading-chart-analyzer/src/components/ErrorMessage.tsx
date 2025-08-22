'use client';

import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { ErrorMessageProps } from '@/types';

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto text-center"
    >
      <div className="bg-red-500/10 backdrop-blur-md rounded-2xl p-8 border border-red-500/20 shadow-xl">
        {/* Error Icon */}
        <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>

        {/* Error Message */}
        <div className="space-y-3 mb-6">
          <h3 className="text-lg font-semibold text-white">
            Analysis Failed
          </h3>
          <p className="text-sm text-gray-300">
            {message}
          </p>
        </div>

        {/* Retry Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRetry}
          className="inline-flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </motion.button>
      </div>
    </motion.div>
  );
}