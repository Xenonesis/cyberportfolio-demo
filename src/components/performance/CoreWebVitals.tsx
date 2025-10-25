'use client';

import React, { useEffect, useState } from 'react';
import { usePerformance } from './PerformanceProvider';

// Define PerformanceLayoutShift interface
interface PerformanceLayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
  lastInputTime: number;
  entries: PerformanceEntry[];
}

// Define PerformanceEventTiming interface
interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
 processingEnd: number;
}

interface CoreWebVitalsProps {
  children: React.ReactNode;
}

interface WebVitalMetrics {
  lcp: number | null;
  fcp: number | null;
  fid: number | null;
  cls: number | null;
  ttfb: number | null;
}

export const CoreWebVitals: React.FC<CoreWebVitalsProps> = ({ children }) => {
  const { isOptimized } = usePerformance();
  const [metrics, setMetrics] = useState<WebVitalMetrics>({
    lcp: null,
    fcp: null,
    fid: null,
    cls: null,
    ttfb: null,
  });
  const [showVitals, setShowVitals] = useState(false);

  // Toggle vitals visibility with keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'v') {
        e.preventDefault();
        setShowVitals(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Measure Core Web Vitals
  useEffect(() => {
    if (!isOptimized) return;

    // Measure Largest Contentful Paint (LCP)
    const measureLCP = () => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { renderTime?: number, loadTime?: number };
        const lcpValue = Math.max(lastEntry.renderTime || 0, lastEntry.loadTime || 0);
        setMetrics(prev => ({ ...prev, lcp: lcpValue }));
      }).observe({ entryTypes: ['largest-contentful-paint'] });
    };

    // Measure First Contentful Paint (FCP)
    const measureFCP = () => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        if (entries.length > 0) {
          setMetrics(prev => ({ ...prev, fcp: entries[0].startTime }));
        }
      }).observe({ entryTypes: ['paint'] });
    };

    // Measure First Input Delay (FID)
    const measureFID = () => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fidValue = Math.max(
          ...entries.map(entry => 
            (entry as PerformanceEventTiming).processingStart 
              ? (entry as PerformanceEventTiming).processingStart - (entry as PerformanceEventTiming).startTime 
              : 0
          )
        );
        setMetrics(prev => ({ ...prev, fid: fidValue }));
      }).observe({ entryTypes: ['first-input'] });
    };

    // Measure Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const measureCLS = () => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries() as PerformanceLayoutShift[];
        for (const entry of entries) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        setMetrics(prev => ({ ...prev, cls: clsValue }));
      }).observe({ entryTypes: ['layout-shift'] });
    };

    // Measure Time to First Byte (TFB)
    const measureTTFB = () => {
      const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navEntry) {
        setMetrics(prev => ({ 
          ...prev, 
          ttfb: navEntry.responseStart - navEntry.requestStart 
        }));
      }
    };

    measureLCP();
    measureFCP();
    measureFID();
    measureCLS();
    measureTTFB();

    // Clean up observers
    return () => {
      if ('PerformanceObserver' in window) {
        // In a real scenario, we would disconnect observers here
      }
    };
  }, [isOptimized]);

  // Determine metric status
  const getMetricStatus = (value: number | null, threshold: number, isGood = true) => {
    if (value === null) return 'loading';
    if (isGood ? value <= threshold : value >= threshold) return 'good';
    return 'needs-improvement';
  };

  // Get status class for metric
  const getStatusClass = (value: number | null, threshold: number, isGood = true) => {
    const status = getMetricStatus(value, threshold, isGood);
    switch (status) {
      case 'good': return 'text-neon-green-50';
      case 'needs-improvement': return 'text-orange-500';
      default: return 'text-gray-400';
    }
  };

  // Calculate overall score
  const calculateOverallScore = () => {
    if (metrics.lcp === null || metrics.fid === null || metrics.cls === null) return 0;
    
    const lcpScore = getMetricStatus(metrics.lcp, 2500) === 'good' ? 1 : 0;
    const fidScore = getMetricStatus(metrics.fid, 100) === 'good' ? 1 : 0;
    const clsScore = getMetricStatus(metrics.cls, 0.1, true) === 'good' ? 1 : 0;
    
    return Math.round(((lcpScore + fidScore + clsScore) / 3) * 100);
  };

  if (!showVitals) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* Core Web Vitals Overlay */}
      <div className="fixed bottom-4 left-4 bg-deep-navy-500 border border-electric-cyan-500 rounded-lg p-4 shadow-lg z-50 max-w-xs w-full">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-electric-cyan-500 font-mono text-sm">Core Web Vitals</h3>
          <button 
            onClick={() => setShowVitals(false)}
            className="text-gray-400 hover:text-white text-lg"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-300">LCP (Largest Contentful Paint):</span>
            <span className={getStatusClass(metrics.lcp, 2500)}>
              {metrics.lcp ? `${Math.round(metrics.lcp)}ms` : '...'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-300">FID (First Input Delay):</span>
            <span className={getStatusClass(metrics.fid, 100)}>
              {metrics.fid ? `${Math.round(metrics.fid)}ms` : '...'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-300">CLS (Cumulative Layout Shift):</span>
            <span className={getStatusClass(metrics.cls, 0.1, true)}>
              {metrics.cls ? metrics.cls.toFixed(3) : '...'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-300">TTFB (Time to First Byte):</span>
            <span className={getStatusClass(metrics.ttfb, 800)}>
              {metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : '...'}
            </span>
          </div>
          
          <div className="mt-3 pt-2 border-t border-gray-700">
            <div className="flex justify-between text-gray-300">
              <span>Overall Score:</span>
              <span className={calculateOverallScore() >= 90 ? 'text-neon-green-50' : 'text-orange-500'}>
                {calculateOverallScore()}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
              <div 
                className={`h-1.5 rounded-full ${
                  calculateOverallScore() >= 90 ? 'bg-neon-green-500' : 
                  calculateOverallScore() >= 50 ? 'bg-orange-500' : 'bg-red-500'
                }`} 
                style={{ width: `${calculateOverallScore()}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};

// Performance optimization HOC for Core Web Vitals
export const withCoreWebVitalsOptimization = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const WithCoreWebVitalsOptimization: React.FC<P> = (props) => {
    const { isOptimized } = usePerformance();
    
    // If not optimized, show loading state
    if (!isOptimized) {
      return (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-electric-cyan-500 mb-3"></div>
            <p className="text-electric-cyan-500">Optimizing Core Web Vitals...</p>
          </div>
        </div>
      );
    }
    
    return <Component {...props} />;
  };

  WithCoreWebVitalsOptimization.displayName = `withCoreWebVitalsOptimization(${Component.displayName || Component.name})`;
  
  return WithCoreWebVitalsOptimization;
};