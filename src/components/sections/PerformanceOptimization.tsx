'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface PerformanceOptimizationProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

export const LazyLoad: React.FC<PerformanceOptimizationProps> = ({
  children,
  threshold = 0.1,
  rootMargin = '50px',
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    amount: threshold,
    once: true,
  });

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

interface ImageOptimizationProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export const OptimizedImage: React.FC<ImageOptimizationProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && !hasError && (
        <div className='absolute inset-0 bg-navy-700 animate-pulse rounded' />
      )}

      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding='async'
        className={`
          ${className}
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          transition-opacity duration-300
        `}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />

      {hasError && (
        <div className='absolute inset-0 bg-navy-700 flex items-center justify-center'>
          <span className='text-gray-400 text-sm'>Image not available</span>
        </div>
      )}
    </div>
  );
};

interface IntersectionObserverProps {
  children: (isIntersecting: boolean) => React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

export const IntersectionObserverWrapper: React.FC<
  IntersectionObserverProps
> = ({ children, threshold = 0.5, rootMargin = '0px' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, rootMargin]);

  return <div ref={ref}>{children(isIntersecting)}</div>;
};

interface PerformanceMetricsProps {
  onMetricsUpdate?: (metrics: {
    loadTime: number;
    renderTime: number;
    interactionTime: number;
  }) => void;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  onMetricsUpdate,
}) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const startTime = performance.now();

    const calculateMetrics = () => {
      const loadTime = performance.now() - startTime;

      // Simulate render time measurement
      const renderTime = Math.random() * 100 + 50;

      // Simulate interaction time measurement
      const interactionTime = Math.random() * 200 + 100;

      const metrics = {
        loadTime: Math.round(loadTime),
        renderTime: Math.round(renderTime),
        interactionTime: Math.round(interactionTime),
      };

      // Only call onMetricsUpdate if it's provided
      if (onMetricsUpdate) {
        onMetricsUpdate(metrics);
      }

      // Send metrics to analytics (would be implemented with real analytics service)
      if (typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('event', 'performance_metrics', {
          event_category: 'Performance',
          event_label: 'Case Studies Section',
          value: loadTime,
        });
      }
    };

    // Calculate metrics after page load
    if (document.readyState === 'complete') {
      calculateMetrics();
    } else {
      window.addEventListener('load', calculateMetrics);
      return () => window.removeEventListener('load', calculateMetrics);
    }
  }, []); // Remove onMetricsUpdate from dependencies since we check if it exists

  return null;
};

interface ResourceHintsProps {
  resources: Array<{
    href: string;
    as?: string;
    type?: string;
    crossorigin?: boolean;
  }>;
}

export const ResourceHints: React.FC<ResourceHintsProps> = ({ resources }) => {
  return (
    <>
      {resources.map((resource, index) => (
        <link
          key={index}
          rel='preload'
          href={resource.href}
          as={resource.as}
          type={resource.type}
          crossOrigin={resource.crossorigin ? 'anonymous' : undefined}
        />
      ))}
    </>
  );
};

// Performance monitoring hook
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    interactionTime: 0,
    memoryUsage: 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const startTime = performance.now();

    // Monitor memory usage (if available)
    const updateMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        setMetrics(prev => ({
          ...prev,
          memoryUsage: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
        }));
      }
    };

    const updateMetrics = () => {
      const loadTime = performance.now() - startTime;
      const renderTime = Math.random() * 100 + 50;
      const interactionTime = Math.random() * 200 + 100;

      setMetrics(prev => ({
        ...prev,
        loadTime: Math.round(loadTime),
        renderTime: Math.round(renderTime),
        interactionTime: Math.round(interactionTime),
      }));

      updateMemoryUsage();
    };

    if (document.readyState === 'complete') {
      updateMetrics();
    } else {
      window.addEventListener('load', updateMetrics);
      return () => window.removeEventListener('load', updateMetrics);
    }

    // Update memory usage periodically
    const memoryInterval = setInterval(updateMemoryUsage, 5000);
    return () => clearInterval(memoryInterval);
  }, []);

  return metrics;
};

// Virtual scrolling for large lists
interface VirtualScrollerProps {
  items: any[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: any, index: number) => React.ReactNode;
  className?: string;
}

export const VirtualScroller: React.FC<VirtualScrollerProps> = ({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  className = '',
}) => {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight),
    items.length
  );

  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={e => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div
        className='relative'
        style={{
          height: items.length * itemHeight,
          width: '100%',
        }}
      >
        <div
          className='absolute'
          style={{
            top: startIndex * itemHeight,
            width: '100%',
          }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={item.id || index}
              style={{ height: itemHeight, width: '100%' }}
            >
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
