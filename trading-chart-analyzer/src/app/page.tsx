'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, BarChart3, Zap } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import AnalysisResults from '@/components/AnalysisResults';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { AnalysisData, AppState } from '@/types';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('upload');
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleFileSelect = async (file: File) => {
    setAppState('loading');
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze chart');
      }

      if (data.success && data.analysis) {
        setAnalysis(data.analysis);
        setAppState('results');
      } else {
        throw new Error('Invalid analysis response');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
      setAppState('error');
    }
  };

  const handleNewAnalysis = () => {
    setAppState('upload');
    setAnalysis(null);
    setErrorMessage('');
  };

  const handleRetry = () => {
    setAppState('upload');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="py-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center space-x-3 mb-4"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Trading Chart Analyzer
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-300 max-w-2xl mx-auto"
            >
              AI-powered analysis of trading charts. Upload a screenshot and get instant insights on pairs, timeframes, trends, and signals.
            </motion.p>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-4xl">
            {appState === 'upload' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center"
                  >
                    <BarChart3 className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                    <h3 className="text-white font-semibold mb-2">Pattern Detection</h3>
                    <p className="text-sm text-gray-300">Advanced AI identifies chart patterns and indicators</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center"
                  >
                    <Brain className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                    <h3 className="text-white font-semibold mb-2">Smart Analysis</h3>
                    <p className="text-sm text-gray-300">Comprehensive analysis of trends and market signals</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center"
                  >
                    <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                    <h3 className="text-white font-semibold mb-2">Instant Results</h3>
                    <p className="text-sm text-gray-300">Get analysis results in seconds with detailed insights</p>
                  </motion.div>
                </div>

                {/* File Upload */}
                <FileUpload onFileSelect={handleFileSelect} />
              </motion.div>
            )}

            {appState === 'loading' && <LoadingSpinner />}
            
            {appState === 'results' && analysis && (
              <AnalysisResults analysis={analysis} onNewAnalysis={handleNewAnalysis} />
            )}
            
            {appState === 'error' && (
              <ErrorMessage message={errorMessage} onRetry={handleRetry} />
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 px-4 text-center">
          <p className="text-gray-400 text-sm">
            Powered by AI • Secure • Fast Analysis
          </p>
        </footer>
      </div>
    </div>
  );
}
