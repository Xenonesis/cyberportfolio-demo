'use client';

import React, { useEffect, useState } from 'react';
import { usePerformance } from './PerformanceProvider';

// Mobile-specific optimizations context
const MobileOptimizations: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  if (!isMobile) return null;

  return (
    <style jsx global>{`
      .mobile-optimized {
        /* Optimize for mobile rendering */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
      }
      
      /* Reduce complex animations on mobile */
      .mobile-optimized .complex-animation {
        animation-duration: 0.3s !important;
      }
      
      /* Optimize for touch targets */
      .mobile-optimized .touch-target {
        min-height: 44px;
        min-width: 44px;
      }
      
      /* Optimize images for mobile */
      .mobile-optimized img {
        max-height: 60vh;
      }
      
      /* Reduce shadow complexity on mobile */
      .mobile-optimized .shadow-complex {
        box-shadow: 0 4px 8px rgba(0, 0, 0.1) !important;
      }
    `}</style>
  );
};

interface MobileOptimizerProps {
  children: React.ReactNode;
}

export const MobileOptimizer: React.FC<MobileOptimizerProps> = ({ children }) => {
  const { isMobile, setIsMobile } = usePerformance();
  const [touchDevice, setTouchDevice] = useState(false);
  const [screenDensity, setScreenDensity] = useState(1);

  // Detect touch device and screen density
  useEffect(() => {
    const checkTouchDevice = () => {
      setTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    const checkScreenDensity = () => {
      setScreenDensity(window.devicePixelRatio || 1);
    };

    checkTouchDevice();
    checkScreenDensity();

    // Update on resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      checkTouchDevice();
      checkScreenDensity();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsMobile]);

  // Optimize for mobile performance
  useEffect(() => {
    if (isMobile) {
      // Add mobile-specific performance optimizations
      document.body.classList.add('mobile-optimized');
      
      // Reduce animations on mobile if not necessary
      if (screenDensity > 2) {
        // High density screens may need optimization
        document.body.style.setProperty('--animation-speed-normal', '0.15s');
      }
    } else {
      document.body.classList.remove('mobile-optimized');
    }

    return () => {
      document.body.classList.remove('mobile-optimized');
    };
  }, [isMobile, screenDensity]);

  return (
    <>
      <MobileOptimizations isMobile={isMobile} />
      
      {/* Mobile performance indicators */}
      {isMobile && (
        <div className="fixed top-12 right-4 bg-deep-navy-500 border border-electric-cyan-500 rounded-lg p-2 z-40 text-xs opacity-80">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-electric-cyan-500"></div>
            <span className="text-electric-cyan-500 font-mono">MOBILE MODE</span>
          </div>
          <div className="mt-1 text-[10px] text-gray-400">
            {touchDevice ? 'Touch: Yes' : 'Touch: No'} | Density: {screenDensity}x
          </div>
        </div>
      )}

      {/* Optimize rendering based on device */}
      <div 
        className={isMobile ? 'mobile-container' : 'desktop-container'}
        style={{
          contain: isMobile ? 'layout style paint' : 'none',
          willChange: isMobile ? 'transform' : 'auto',
        }}
      >
        {children}
      </div>
    </>
  );
};

// Mobile-specific component wrapper
export const withMobileOptimization = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const WithMobileOptimization: React.FC<P> = (props: P) => {
    const { isMobile } = usePerformance();
    
    // Adjust props based on device
    const adjustedProps = isMobile 
      ? { ...props, isMobile: true } 
      : props;

    return <Component {...adjustedProps} />;
  };

  WithMobileOptimization.displayName = `withMobileOptimization(${Component.displayName || Component.name})`;
  
  return WithMobileOptimization;
};