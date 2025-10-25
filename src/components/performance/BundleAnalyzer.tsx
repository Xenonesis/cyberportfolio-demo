'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { usePerformance } from './PerformanceProvider';

interface BundleAnalyzerProps {
  children: React.ReactNode;
  enableAnalysis?: boolean;
  showReport?: boolean;
}

interface BundleStats {
  totalSize: number;
  chunkCount: number;
  largestChunk: number;
  optimized: boolean;
  compressionRatio: number;
}

export const BundleAnalyzer: React.FC<BundleAnalyzerProps> = ({
  children,
  enableAnalysis = true,
  showReport = false,
}) => {
  const { isOptimized } = usePerformance();
  const [bundleStats, setBundleStats] = useState<BundleStats | null>(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // Analyze bundle statistics
  const analyzeBundle = useCallback(() => {
    if (!enableAnalysis || !isOptimized) return;

    // In a real implementation, this would connect to webpack-bundle-analyzer
    // For now, we'll simulate the data
    const stats: BundleStats = {
      totalSize: Math.floor(Math.random() * 2000) + 500, // KB
      chunkCount: Math.floor(Math.random() * 10) + 3,
      largestChunk: Math.floor(Math.random() * 500) + 100, // KB
      optimized: true,
      compressionRatio: parseFloat((Math.random() * 0.5 + 0.3).toFixed(2)), // 30-80%
    };
    
    setBundleStats(stats);
    setAnalysisComplete(true);
  }, [enableAnalysis, isOptimized]);

  // Toggle analyzer visibility with keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        analyzeBundle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [analyzeBundle]);

  // Auto-analyze on mount if enabled
  useEffect(() => {
    if (enableAnalysis && isOptimized) {
      const timer = setTimeout(() => {
        analyzeBundle();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [enableAnalysis, isOptimized, analyzeBundle]);

  if (!showReport || !analysisComplete || !bundleStats) {
    return <>{children}</>;
  }

  // Calculate optimization score
  const calculateOptimizationScore = (): number => {
    if (!bundleStats) return 0;
    
    let score = 100;
    
    // Deduct points for large bundles
    if (bundleStats.totalSize > 1500) {
      score -= 20;
    } else if (bundleStats.totalSize > 1000) {
      score -= 10;
    }
    
    // Deduct points for many chunks
    if (bundleStats.chunkCount > 8) {
      score -= 15;
    } else if (bundleStats.chunkCount > 5) {
      score -= 5;
    }
    
    // Deduct points for large chunks
    if (bundleStats.largestChunk > 400) {
      score -= 25;
    } else if (bundleStats.largestChunk > 250) {
      score -= 10;
    }
    
    // Add points for good compression
    if (bundleStats.compressionRatio > 0.6) {
      score += 15;
    } else if (bundleStats.compressionRatio > 0.4) {
      score += 5;
    }
    
    return Math.max(0, Math.min(100, score));
  };

  const optimizationScore = calculateOptimizationScore();

  return (
    <div className="relative">
      {/* Bundle Analyzer Overlay */}
      {showReport && analysisComplete && bundleStats && (
        <div className="fixed bottom-4 left-4 bg-deep-navy-500 border border-electric-cyan-500 rounded-lg p-4 shadow-lg z-50 max-w-md w-full">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-electric-cyan-500 font-mono text-sm">Bundle Analyzer</h3>
            <button 
              onClick={() => setAnalysisComplete(false)}
              className="text-gray-400 hover:text-white text-lg"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-300">Total Bundle Size:</span>
              <span className={`font-mono ${bundleStats.totalSize > 1500 ? 'text-red-400' : bundleStats.totalSize > 1000 ? 'text-orange-400' : 'text-neon-green-500'}`}>
                {bundleStats.totalSize} KB
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-300">Chunk Count:</span>
              <span className={`font-mono ${bundleStats.chunkCount > 8 ? 'text-red-400' : bundleStats.chunkCount > 5 ? 'text-orange-400' : 'text-neon-green-500'}`}>
                {bundleStats.chunkCount}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-300">Largest Chunk:</span>
              <span className={`font-mono ${bundleStats.largestChunk > 400 ? 'text-red-400' : bundleStats.largestChunk > 250 ? 'text-orange-400' : 'text-neon-green-500'}`}>
                {bundleStats.largestChunk} KB
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-300">Compression Ratio:</span>
              <span className={`font-mono ${bundleStats.compressionRatio > 0.6 ? 'text-neon-green-500' : bundleStats.compressionRatio > 0.4 ? 'text-orange-400' : 'text-red-400'}`}>
                {(bundleStats.compressionRatio * 100).toFixed(1)}%
              </span>
            </div>
            
            <div className="pt-2 border-t border-gray-700">
              <div className="flex justify-between text-gray-300">
                <span>Optimization Score:</span>
                <span className={`font-mono ${optimizationScore >= 80 ? 'text-neon-green-500' : optimizationScore >= 60 ? 'text-orange-400' : 'text-red-400'}`}>
                  {optimizationScore}/100
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                <div 
                  className={`h-1.5 rounded-full ${
                    optimizationScore >= 80 ? 'bg-neon-green-500' : 
                    optimizationScore >= 60 ? 'bg-orange-500' : 'bg-red-500'
                  }`} 
                  style={{ width: `${optimizationScore}%` }}
                ></div>
              </div>
            </div>
            
            {optimizationScore < 80 && (
              <div className="pt-2 border-t border-gray-700">
                <h4 className="text-electric-cyan-500 font-mono text-xs mb-1">Recommendations:</h4>
                <ul className="text-gray-400 text-[10px] space-y-1">
                  {bundleStats.totalSize > 1500 && (
                    <li>• Reduce bundle size by code splitting large modules</li>
                  )}
                  {bundleStats.chunkCount > 8 && (
                    <li>• Consolidate small chunks to reduce HTTP requests</li>
                  )}
                  {bundleStats.largestChunk > 400 && (
                    <li>• Split large chunks to improve loading performance</li>
                  )}
                  {bundleStats.compressionRatio < 0.4 && (
                    <li>• Enable better compression (gzip/brotli) for assets</li>
                  )}
                  <li>• Use dynamic imports for non-critical components</li>
                  <li>• Remove unused dependencies and dead code</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {children}
    </div>
  );
};

// Bundle size optimization utility
export const withBundleOptimization = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return (props: P) => {
    const { isOptimized } = usePerformance();
    
    if (!isOptimized) {
      return (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-electric-cyan-500 mb-3"></div>
            <p className="text-electric-cyan-500">Optimizing bundle size...</p>
          </div>
        </div>
      );
    }
    
    return <Component {...props} />;
  };
};