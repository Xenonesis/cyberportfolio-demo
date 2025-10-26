'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

interface PerformanceContextType {
  isOptimized: boolean;
  setIsOptimized: (optimized: boolean) => void;
  loadingProgress: number;
  setLoadingProgress: (progress: number) => void;
  isMobile: boolean;
  setIsMobile: (mobile: boolean) => void;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(
  undefined
);

export const PerformanceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOptimized, setIsOptimized] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Simulate loading progress
  useEffect(() => {
    const timer = setInterval(() => {
      if (loadingProgress < 100) {
        setLoadingProgress(prev => Math.min(prev + 10, 100));
      } else {
        clearInterval(timer);
        setIsOptimized(true);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [loadingProgress]);

  // Core Web Vitals optimization
  useEffect(() => {
    // Optimize for First Input Delay
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Preload critical resources based on current path
        if (pathname === '/') {
          // Preload resources for home page
          const preloadLinks = [
            '/api/projects',
            '/api/blog',
            '/api/testimonials',
          ];

          preloadLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = href;
            link.as = 'fetch';
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
          });
        }
      });
    }
  }, [pathname]);

  const value = {
    isOptimized,
    setIsOptimized,
    loadingProgress,
    setLoadingProgress,
    isMobile,
    setIsMobile,
  };

  return (
    <PerformanceContext.Provider value={value}>
      {/* Performance monitoring script */}
      <Script
        id='performance-monitoring'
        strategy='beforeInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            // Core Web Vitals monitoring
            if ('PerformanceObserver' in window) {
              new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                  // Track Largest Contentful Paint
                  if (entry.entryType === 'largest-contentful-paint') {
                    // Log LCP value for analytics
                    if (window.gtag) {
                      gtag('event', 'web_vital', {
                        event_category: 'LCP',
                        event_label: Math.round(entry.startTime + entry.loadTime),
                        value: Math.round(entry.startTime + entry.loadTime),
                        non_interaction: true,
                      });
                    }
                  }
                }
              }).observe({ entryTypes: ['largest-contentful-paint'] });
              
              new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                  // Track First Input Delay
                  if (entry.entryType === 'first-input') {
                    if (window.gtag) {
                      gtag('event', 'web_vital', {
                        event_category: 'FID',
                        event_label: Math.round(entry.processingStart - entry.startTime),
                        value: Math.round(entry.processingStart - entry.startTime),
                        non_interaction: true,
                      });
                    }
                  }
                }
              }).observe({ entryTypes: ['first-input'] });
              
              new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                  // Track Cumulative Layout Shift
                  if (entry.entryType === 'layout-shift') {
                    if (entry.hadRecentInput) return; // Ignore if recent input
                    if (window.gtag) {
                      gtag('event', 'web_vital', {
                        event_category: 'CLS',
                        event_label: entry.value,
                        value: Math.round(entry.value * 100),
                        non_interaction: true,
                      });
                    }
                  }
                }
              }).observe({ entryTypes: ['layout-shift'] });
            }
          `,
        }}
      />

      {children}
    </PerformanceContext.Provider>
  );
};

export const usePerformance = (): PerformanceContextType => {
  const context = useContext(PerformanceContext);
  if (context === undefined) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
};
