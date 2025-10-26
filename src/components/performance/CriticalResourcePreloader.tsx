'use client';

import React, { useEffect } from 'react';
import { usePerformance } from './PerformanceProvider';

interface CriticalResourcePreloaderProps {
  children: React.ReactNode;
}

export const CriticalResourcePreloader: React.FC<CriticalResourcePreloaderProps> = ({
  children,
}) => {
  const { isOptimized } = usePerformance();

  useEffect(() => {
    if (!isOptimized) return;

    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload critical fonts
      const fontLinks = [
        {
          href: 'https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap',
          rel: 'preload',
          as: 'style',
          onload: "this.onload=null;this.rel='stylesheet'",
        },
      ];

      fontLinks.forEach(link => {
        const linkElement = document.createElement('link');
        Object.assign(linkElement, link);
        document.head.appendChild(linkElement);
      });

      // Preload critical images (if any)
      const criticalImages: string[] = [
        // Add critical hero images or icons here
      ];

      criticalImages.forEach((src: string) => {
        const linkElement = document.createElement('link');
        linkElement.rel = 'preload';
        linkElement.href = src;
        linkElement.as = 'image';
        document.head.appendChild(linkElement);
      });

      // DNS prefetch for external resources
      const dnsPrefetchDomains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://www.google-analytics.com',
        'https://www.googletagmanager.com',
      ];

      dnsPrefetchDomains.forEach(domain => {
        const linkElement = document.createElement('link');
        linkElement.rel = 'dns-prefetch';
        linkElement.href = domain;
        document.head.appendChild(linkElement);
      });

      // Preconnect to critical origins
      const preconnectOrigins = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
      ];

      preconnectOrigins.forEach(origin => {
        const linkElement = document.createElement('link');
        linkElement.rel = 'preconnect';
        linkElement.href = origin;
        linkElement.crossOrigin = 'anonymous';
        document.head.appendChild(linkElement);
      });
    };

    // Inline critical CSS
    const inlineCriticalCSS = () => {
      try {
        // Critical CSS is loaded via Next.js
        const criticalCSS = `
          :root { --bg-primary: #080c14; --text-primary: #ffffff; --accent-primary: #00ffff; }
          .critical-hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
        `;
        const style = document.createElement('style');
        style.textContent = criticalCSS;
        document.head.appendChild(style);
      } catch {
        // Silently handle error
      }
    };

    // Defer non-critical resources
    const deferNonCriticalResources = () => {
      // Find non-critical stylesheets and defer them
      const styleSheets = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
      styleSheets.forEach((link) => {
        const linkElement = link as HTMLLinkElement;
        if (linkElement.href && !linkElement.href.includes('critical')) {
          // Add a small delay to non-critical stylesheets
          linkElement.media = 'print';
          linkElement.onload = () => {
            linkElement.media = 'all';
          };

          // Fallback in case onload doesn't fire
          setTimeout(() => {
            if (linkElement.media === 'print') {
              linkElement.media = 'all';
            }
          }, 300);
        }
      });
    };

    // Initialize performance optimizations
    const initializeOptimizations = () => {
      preloadCriticalResources();
      inlineCriticalCSS();
      deferNonCriticalResources();
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(initializeOptimizations, { timeout: 2000 });
    } else {
      setTimeout(initializeOptimizations, 1);
    }
  }, [isOptimized]);

  return <>{children}</>;
};

// Performance optimization HOC
export const withCriticalResourcePreloader = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const WithCriticalResourcePreloader: React.FC<P> = props => (
    <CriticalResourcePreloader>
      <Component {...props} />
    </CriticalResourcePreloader>
  );

  WithCriticalResourcePreloader.displayName = `withCriticalResourcePreloader(${Component.displayName || Component.name})`;

  return WithCriticalResourcePreloader;
};