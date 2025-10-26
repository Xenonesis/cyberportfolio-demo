'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { usePerformance } from './PerformanceProvider';

interface ResourceLoaderProps {
  children: React.ReactNode;
  criticalResources?: string[];
  preloadResources?: string[];
  prefetchResources?: string[];
  preconnectOrigins?: string[];
}

export const ResourceLoader: React.FC<ResourceLoaderProps> = ({
  children,
  criticalResources = [],
  preloadResources = [],
  prefetchResources = [],
  preconnectOrigins = [],
}) => {
  const { isOptimized } = usePerformance();
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

  // Preload critical resources
  useEffect(() => {
    if (isOptimized && criticalResources.length > 0) {
      const loadCriticalResources = async () => {
        const promises = criticalResources.map(async resource => {
          try {
            if (resource.endsWith('.js')) {
              // For scripts, we'll fetch them instead of using dynamic import
              const response = await fetch(resource);
              if (!response.ok) {
                throw new Error(`Failed to fetch script: ${resource}`);
              }
            } else if (resource.endsWith('.css')) {
              // For stylesheets, create a link element
              const link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = resource;
              document.head.appendChild(link);
            } else {
              // For other resources, fetch them
              await fetch(resource);
            }
          } catch (error) {
            console.warn(
              `Failed to load critical resource: ${resource}`,
              error
            );
          }
        });

        await Promise.all(promises);
        setResourcesLoaded(true);
      };

      loadCriticalResources();
    }
  }, [isOptimized, criticalResources]);

  // Render resource hints
  const renderResourceHints = () => {
    const hints: React.JSX.Element[] = [];

    // Preconnect hints
    preconnectOrigins.forEach((origin, index) => {
      hints.push(
        <link key={`preconnect-${index}`} rel='preconnect' href={origin} />
      );
    });

    // Preload hints
    preloadResources.forEach((resource, index) => {
      const extension = resource.split('.').pop();
      let asType: string | undefined;

      if (extension === 'js') asType = 'script';
      else if (extension === 'css') asType = 'style';
      else if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(extension || ''))
        asType = 'image';
      else if (['woff', 'woff2', 'ttf', 'otf'].includes(extension || ''))
        asType = 'font';
      else if (['json', 'xml'].includes(extension || '')) asType = 'fetch';

      hints.push(
        <link
          key={`preload-${index}`}
          rel='preload'
          href={resource}
          as={asType}
          crossOrigin='anonymous'
        />
      );
    });

    // Prefetch hints
    prefetchResources.forEach((resource, index) => {
      hints.push(
        <link key={`prefetch-${index}`} rel='prefetch' href={resource} />
      );
    });

    return hints;
  };

  return (
    <>
      {/* Resource hints in head */}
      {renderResourceHints()}

      {/* Critical resource loading script */}
      <Script
        id='resource-preloader'
        strategy='beforeInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            // Preload critical resources based on device capabilities
            (function() {
              if (!window.performance) return;
              
              // Check network connection type if available
              const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
              const isSlowConnection = connection && (
                connection.effectiveType === 'slow-2g' || 
                connection.effectiveType === '2g' || 
                connection.downlink < 1
              );
              
              // Only preload critical resources on fast connections
              if (!isSlowConnection) {
                // Preload critical resources for current page
                const criticalResources = ${JSON.stringify(criticalResources)};
                criticalResources.forEach(function(resource) {
                  if (resource.endsWith('.js')) {
                    // Preload JavaScript
                    var script = document.createElement('link');
                    script.rel = 'preload';
                    script.href = resource;
                    script.as = 'script';
                    script.crossOrigin = 'anonymous';
                    document.head.appendChild(script);
                  } else if (resource.endsWith('.css')) {
                    // Preload CSS
                    var link = document.createElement('link');
                    link.rel = 'preload';
                    link.href = resource;
                    link.as = 'style';
                    document.head.appendChild(link);
                  }
                });
              }
            })();
          `,
        }}
      />

      {/* Resource loading status indicator */}
      {!resourcesLoaded && criticalResources.length > 0 && (
        <div className='fixed inset-0 bg-deep-navy-800 z-50 flex items-center justify-center'>
          <div className='text-center'>
            <div className='relative w-16 h-16 mx-auto mb-4'>
              <div className='absolute inset-0 rounded-full bg-electric-cyan-500 opacity-20 animate-ping'></div>
              <div className='relative w-full h-full rounded-full bg-electric-cyan-500 flex items-center justify-center'>
                <div className='w-8 h-8 rounded-full bg-deep-navy-800'></div>
              </div>
            </div>
            <p className='text-electric-cyan-500 text-lg font-mono'>
              Optimizing Resources...
            </p>
            <p className='text-gray-400 text-sm mt-2'>
              Preparing security protocols
            </p>
          </div>
        </div>
      )}

      {children}
    </>
  );
};
