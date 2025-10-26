'use client';

import React, { useEffect, useState } from 'react';
import { usePerformance } from './PerformanceProvider';

interface PerformanceMonitorProps {
  children: React.ReactNode;
}

interface PerformanceMetrics {
  memoryUsage: number | null;
  fps: number | null;
  networkSpeed: number | null;
}

interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  children,
}) => {
  const { isOptimized } = usePerformance();
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    memoryUsage: null,
    fps: null,
    networkSpeed: null,
  });
  const [showMonitor, setShowMonitor] = useState(false);

  // Toggle monitor visibility with keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'm') {
        e.preventDefault();
        setShowMonitor(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Monitor performance metrics
  useEffect(() => {
    if (!isOptimized) return;

    // Monitor memory usage
    const measureMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as Performance & { memory?: MemoryInfo })
          .memory;
        if (memory) {
          setMetrics(prev => ({
            ...prev,
            memoryUsage: memory.usedJSHeapSize / 1048576,
          }));
        }
      }
    };

    // Monitor FPS
    let lastTime = performance.now();
    let frameCount = 0;
    const measureFPS = () => {
      const now = performance.now();
      frameCount++;
      if (now - lastTime >= 1000) {
        setMetrics(prev => ({ ...prev, fps: frameCount }));
        frameCount = 0;
        lastTime = now;
      }
      requestAnimationFrame(measureFPS);
    };

    // Monitor network speed
    const measureNetworkSpeed = () => {
      if ('connection' in navigator) {
        const connection = (
          navigator as Navigator & { connection?: { downlink: number } }
        ).connection;
        if (connection) {
          setMetrics(prev => ({ ...prev, networkSpeed: connection.downlink }));
        }
      }
    };

    const memoryInterval = setInterval(measureMemory, 2000);
    const fpsFrame = requestAnimationFrame(measureFPS);
    const networkInterval = setInterval(measureNetworkSpeed, 5000);

    return () => {
      clearInterval(memoryInterval);
      cancelAnimationFrame(fpsFrame);
      clearInterval(networkInterval);
    };
  }, [isOptimized]);

  if (!showMonitor) {
    return <>{children}</>;
  }

  return (
    <div className='relative'>
      {/* Performance Monitor Overlay */}
      <div className='fixed top-4 right-4 bg-deep-navy-500 border border-electric-cyan-500 rounded-lg p-4 shadow-lg z-50 max-w-xs w-full'>
        <div className='flex justify-between items-center mb-2'>
          <h3 className='text-electric-cyan-500 font-mono text-sm'>
            Performance Monitor
          </h3>
          <button
            onClick={() => setShowMonitor(false)}
            className='text-gray-400 hover:text-white text-lg'
          >
            ×
          </button>
        </div>

        <div className='space-y-2 text-xs'>
          <div className='flex justify-between'>
            <span className='text-gray-300'>Memory Usage:</span>
            <span className='text-neon-green-500'>
              {metrics.memoryUsage
                ? `${metrics.memoryUsage.toFixed(2)} MB`
                : '...'}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-300'>FPS:</span>
            <span className='text-neon-green-500'>{metrics.fps || '...'}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-30'>Network Speed:</span>
            <span className='text-neon-green-500'>
              {metrics.networkSpeed
                ? `${metrics.networkSpeed.toFixed(2)} Mbps`
                : '...'}
            </span>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};
