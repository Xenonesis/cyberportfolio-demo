'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePerformance } from './PerformanceProvider';

interface LazyLoaderProps {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

export const LazyLoader: React.FC<LazyLoaderProps> = ({
  children,
  placeholder = null,
  threshold = 0.1,
  rootMargin = '50px',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const { isMobile } = usePerformance();

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setHasIntersected(true);
          }
        });
      },
      {
        threshold,
        rootMargin: isMobile ? '100px' : rootMargin,
      }
    );

    observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, rootMargin, isMobile]);

  return (
    <div 
      ref={elementRef} 
      className={className}
      style={{
        minHeight: !hasIntersected ? '100px' : 'auto',
        transition: 'all 0.3s ease',
      }}
    >
      {isVisible ? (
        children
      ) : (
        placeholder || (
          <div className="flex items-center justify-center min-h-[100px]">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-2 border-electric-cyan-500 border-t-transparent rounded-full animate-spin mb-2"></div>
              <span className="text-electric-cyan-500 text-sm">Loading content...</span>
            </div>
          </div>
        )
      )}
    </div>
  );
};

// Dynamic import HOC for code splitting
export const withLazyImport = <P extends object>(
  importFn: () => Promise<{ default: React.ComponentType<P> }>,
  fallback?: React.ReactNode
) => {
  const LazyComponent: React.FC<P> = (props) => {
    const [Component, setComponent] = useState<React.ComponentType<P> | null>(null);

    useEffect(() => {
      importFn().then((module) => {
        setComponent(() => module.default);
      });
    }, []);

    return Component ? (
      <Component {...props} />
    ) : (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-electric-cyan-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <span className="text-electric-cyan-500">Loading module...</span>
        </div>
      </div>
    );
  };

  LazyComponent.displayName = `LazyLoadedComponent`;
  return LazyComponent;
};

// Performance-optimized conditional rendering
export const ConditionalRenderer: React.FC<{
  condition: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}> = ({ condition, children, fallback = null }) => {
  const [shouldRender, setShouldRender] = useState(condition);
  const { isOptimized } = usePerformance();

  useEffect(() => {
    if (isOptimized && condition) {
      setShouldRender(true);
    }
  }, [condition, isOptimized]);

  return shouldRender ? <>{children}</> : <>{fallback}</>;
};
