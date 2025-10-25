'use client';

import { useEffect, useState } from 'react';

interface MobileOptimizationProps {
  enableTouchOptimization?: boolean;
  enableMobileMetaTags?: boolean;
  enableResponsiveImages?: boolean;
  enableMobileNavigation?: boolean;
  enableAcceleratedMobilePages?: boolean;
  className?: string;
}

interface MobileMetrics {
  isMobile: boolean;
  touchSupport: boolean;
  viewportWidth: number;
  connectionSpeed: string;
  batteryLevel: number | null;
}

export const MobileOptimization = ({
  enableTouchOptimization = true,
  enableMobileMetaTags = true,
  enableResponsiveImages = true,
  enableMobileNavigation = true,
  enableAcceleratedMobilePages = false,
  className = '',
}: MobileOptimizationProps) => {
  const [metrics, setMetrics] = useState<MobileMetrics>({
    isMobile: false,
    touchSupport: false,
    viewportWidth: 0,
    connectionSpeed: 'unknown',
    batteryLevel: null,
  });

  const [mobileOptimized, setMobileOptimized] = useState(false);

  useEffect(() => {
    // Detect mobile environment
    const detectMobile = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

      const touchSupport = 'ontouchstart' in window;
      const viewportWidth = window.innerWidth;

      // Estimate connection speed
      let connectionSpeed = 'unknown';
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        if (connection.effectiveType) {
          connectionSpeed = connection.effectiveType;
        }
      }

      // Get battery level if available
      let batteryLevel = null;
      if ('getBattery' in navigator) {
        (navigator as any).getBattery().then((battery: any) => {
          setMetrics(prev => ({ ...prev, batteryLevel: battery.level }));
        });
      }

      setMetrics({
        isMobile,
        touchSupport,
        viewportWidth,
        connectionSpeed,
        batteryLevel,
      });

      return isMobile;
    };

    const isMobile = detectMobile();
    setMobileOptimized(isMobile);

    // Add mobile-specific optimizations
    if (isMobile) {
      applyMobileOptimizations();
    }

    // Listen for resize events
    window.addEventListener('resize', detectMobile);
    return () => window.removeEventListener('resize', detectMobile);
  }, []);

  const applyMobileOptimizations = () => {
    if (enableMobileMetaTags) {
      addMobileMetaTags();
    }

    if (enableTouchOptimization) {
      addTouchOptimizations();
    }

    if (enableResponsiveImages) {
      optimizeImages();
    }

    if (enableMobileNavigation) {
      optimizeNavigation();
    }
  };

  const addMobileMetaTags = () => {
    // Add mobile-specific meta tags
    const metaTags = [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, user-scalable=no',
      },
      {
        name: 'theme-color',
        content: '#0F172A',
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'default',
      },
      {
        name: 'format-detection',
        content: 'telephone=no',
      },
    ];

    metaTags.forEach(tag => {
      let meta = document.querySelector(`meta[name="${tag.name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta') as HTMLMetaElement;
        meta.name = tag.name;
        document.head.appendChild(meta);
      }
      meta.content = tag.content;
    });
  };

  const addTouchOptimizations = () => {
    // Add touch-friendly CSS
    const style = document.createElement('style');
    style.textContent = `
      /* Touch-friendly button sizes */
      .btn, button, input[type="submit"], input[type="button"] {
        min-height: 44px;
        min-width: 44px;
        padding: 12px 24px;
      }

      /* Touch-friendly links */
      a {
        min-height: 44px;
        min-width: 44px;
        padding: 8px 16px;
      }

      /* Prevent zoom on form inputs */
      input, textarea, select {
        font-size: 16px;
      }

      /* Touch feedback */
      *:active {
        opacity: 0.7;
      }

      /* Swipe gestures support */
      .swipe-container {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }
    `;
    document.head.appendChild(style);
  };

  const optimizeImages = () => {
    // Lazy load and optimize images for mobile
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }

      if (!img.hasAttribute('decoding')) {
        img.setAttribute('decoding', 'async');
      }

      // Add mobile-specific srcset if not present
      if (!img.hasAttribute('srcset') && img.src) {
        const src = img.src;
        const mobileSrc = src.replace(/\.(jpg|jpeg|png|webp)$/, '-mobile.$1');
        img.setAttribute('srcset', `${mobileSrc} 1x, ${src} 2x`);
      }
    });
  };

  const optimizeNavigation = () => {
    // Add mobile navigation optimizations
    const nav = document.querySelector('nav, .navigation, .header');
    if (nav) {
      nav.classList.add('mobile-optimized');

      // Add mobile menu button if not present
      if (!document.querySelector('.mobile-menu-toggle')) {
        const toggle = document.createElement('button');
        toggle.className = 'mobile-menu-toggle';
        toggle.innerHTML = '☰';
        toggle.setAttribute('aria-label', 'Toggle mobile menu');
        nav.insertBefore(toggle, nav.firstChild);
      }
    }
  };

  const getMobilePerformanceScore = (): number => {
    let score = 100;

    // Deduct points for poor mobile optimization
    if (!metrics.isMobile) score += 20; // Desktop gets bonus
    if (!metrics.touchSupport) score -= 10;
    if (metrics.viewportWidth < 320) score -= 5;
    if (metrics.connectionSpeed === 'slow-2g' || metrics.connectionSpeed === '2g') {
      score -= 20;
    }
    if (metrics.connectionSpeed === '3g') score -= 10;
    if (metrics.batteryLevel !== null && metrics.batteryLevel < 0.2) score -= 5;

    return Math.max(0, Math.min(100, score));
  };

  const mobilePerformanceScore = getMobilePerformanceScore();

  return (
    <>
      {/* Mobile Optimization Meta Tags */}
      {enableMobileMetaTags && (
        <div className="mobile-meta-tags" style={{ display: 'none' }}>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="theme-color" content="#0F172A" />
          <meta name="mobile-web-app-capable" content="yes" />
        </div>
      )}

      {/* Mobile Performance Monitoring */}
      <div className={`mobile-optimization ${className}`} data-testid="mobile-optimization">
        <div className="mobile-metrics" style={{ display: 'none' }}>
          <div data-metric="is-mobile">{metrics.isMobile}</div>
          <div data-metric="touch-support">{metrics.touchSupport}</div>
          <div data-metric="viewport-width">{metrics.viewportWidth}</div>
          <div data-metric="connection-speed">{metrics.connectionSpeed}</div>
          <div data-metric="battery-level">{metrics.batteryLevel}</div>
          <div data-metric="performance-score">{mobilePerformanceScore}</div>
        </div>

        {/* Mobile-specific schema markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              isAccessibleForFree: true,
              isFamilyFriendly: true,
              mobileOptimized: true,
              mainContentOfPage: {
                '@type': 'WebPageElement',
                cssSelector: '.main-content',
              },
              potentialAction: {
                '@type': 'ViewAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://aditya-cybersecurity.com',
                  actionPlatform: [
                    'http://schema.org/DesktopWebPlatform',
                    'http://schema.org/MobileWebPlatform',
                  ],
                },
              },
            }),
          }}
        />

        {/* Mobile optimization status indicator */}
        {mobileOptimized && (
          <div className="mobile-optimized-indicator">
            <div className="mobile-badge">
              <span className="mobile-icon">📱</span>
              <span className="mobile-text">Mobile Optimized</span>
            </div>
          </div>
        )}

        <style jsx>{`
          .mobile-optimization {
            position: relative;
          }

          .mobile-optimized-indicator {
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 1000;
            display: ${mobileOptimized ? 'block' : 'none'};
          }

          .mobile-badge {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: #00ffff;
            color: #0f172a;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-weight: 600;
            font-size: 0.9rem;
            box-shadow: 0 4px 12px rgba(0, 255, 255, 0.3);
          }

          .mobile-icon {
            font-size: 1.2rem;
          }

          /* Mobile-specific CSS overrides */
          @media (max-width: 640px) {
            .mobile-optimized-indicator {
              top: 0.5rem;
              right: 0.5rem;
            }

            .mobile-badge {
              padding: 0.25rem 0.75rem;
              font-size: 0.8rem;
            }
          }

          @media (max-width: 480px) {
            .mobile-badge {
              padding: 0.25rem 0.5rem;
              font-size: 0.7rem;
            }
          }
        `}</style>
      </div>

      {/* Accelerated Mobile Pages (AMP) support */}
      {enableAcceleratedMobilePages && (
        <div className="amp-support" style={{ display: 'none' }}>
          {/* AMP components would be added here */}
          <link rel="amphtml" href={`${window.location.href}?amp=1`} />
        </div>
      )}
    </>
  );
};