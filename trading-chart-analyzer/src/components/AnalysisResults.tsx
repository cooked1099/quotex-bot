'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, ArrowUp, ArrowDown } from 'lucide-react';
import { AnalysisResultsProps } from '@/types';

export default function AnalysisResults({ analysis, onNewAnalysis }: AnalysisResultsProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend.toLowerCase()) {
      case 'bullish':
        return <TrendingUp className="w-5 h-5 text-green-400" />;
      case 'bearish':
        return <TrendingDown className="w-5 h-5 text-red-400" />;
      default:
        return <Minus className="w-5 h-5 text-gray-400" />;
    }
  };

  const getSignalIcon = (signal: string) => {
    switch (signal.toLowerCase()) {
      case 'up':
        return <ArrowUp className="w-5 h-5 text-green-400" />;
      case 'down':
        return <ArrowDown className="w-5 h-5 text-red-400" />;
      default:
        return <Minus className="w-5 h-5 text-gray-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend.toLowerCase()) {
      case 'bullish':
        return 'text-green-400';
      case 'bearish':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getSignalColor = (signal: string) => {
    switch (signal.toLowerCase()) {
      case 'up':
        return 'text-green-400';
      case 'down':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto space-y-6"
    >
      {/* Results Card */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Analysis Complete</h2>
          <p className="text-gray-300">AI-powered trading chart analysis results</p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Trading Pair */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider">
                Trading Pair
              </h3>
            </div>
            <p className="text-2xl font-bold text-white">{analysis.pair}</p>
          </div>

          {/* Timeframe */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider">
                Timeframe
              </h3>
            </div>
            <p className="text-2xl font-bold text-white">{analysis.timeframe}</p>
          </div>

          {/* Trend */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider">
                Trend
              </h3>
              {getTrendIcon(analysis.trend)}
            </div>
            <p className={`text-2xl font-bold ${getTrendColor(analysis.trend)}`}>
              {analysis.trend}
            </p>
          </div>

          {/* Signal */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider">
                Signal
              </h3>
              {getSignalIcon(analysis.signal)}
            </div>
            <p className={`text-2xl font-bold ${getSignalColor(analysis.signal)}`}>
              {analysis.signal}
            </p>
          </div>
        </div>

        {/* Raw Result Display */}
        <div className="bg-black/20 rounded-xl p-6 border border-white/10">
          <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider mb-3">
            Raw Analysis
          </h3>
          <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
{`PAIR: "${analysis.pair}"
TIMEFRAME: "${analysis.timeframe}"
TREND: "${analysis.trend}"
SIGNAL: "${analysis.signal}"`}
          </pre>
        </div>
      </div>

      {/* Action Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNewAnalysis}
        className="w-full max-w-md mx-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        Analyze New Chart
      </motion.button>
    </motion.div>
  );
}