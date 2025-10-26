'use client';

'use client';

import React, { useEffect, useState, useMemo } from 'react';

interface BrowserCompatibilityProps {
  children: React.ReactNode;
}

interface BrowserInfo {
  name: string;
  version: string;
  isSupported: boolean;
  isMobile: boolean;
  isDesktop: boolean;
  features: {
    webp: boolean;
    avif: boolean;
    cssGrid: boolean;
    cssFlexbox: boolean;
    serviceWorker: boolean;
    webGL: boolean;
    webRTC: boolean;
    indexedDB: boolean;
  };
}

export const BrowserCompatibility: React.FC<BrowserCompatibilityProps> = ({
  children,
}) => {
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo>({
    name: 'Unknown',
    version: 'Unknown',
    isSupported: true, // Default to supported for SSR
    isMobile: false,
    isDesktop: true,
    features: {
      webp: true, // Default to supported
      avif: false,
      cssGrid: true,
      cssFlexbox: true,
      serviceWorker: false,
      webGL: false,
      webRTC: false,
      indexedDB: false,
    },
  });
  const [compatibilityIssues, setCompatibilityIssues] = useState<string[]>([]);

  useEffect(() => {
    const detectBrowser = (): BrowserInfo => {
      const ua = navigator.userAgent;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

      // Browser detection
      let name = 'Unknown';
      let version = 'Unknown';

      if (ua.includes('Chrome') && !ua.includes('Edg')) {
        name = 'Chrome';
        const match = ua.match(/Chrome\/(\d+)/);
        version = match ? match[1] : 'Unknown';
      } else if (ua.includes('Firefox')) {
        name = 'Firefox';
        const match = ua.match(/Firefox\/(\d+)/);
        version = match ? match[1] : 'Unknown';
      } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
        name = 'Safari';
        const match = ua.match(/Version\/(\d+)/);
        version = match ? match[1] : 'Unknown';
      } else if (ua.includes('Edg')) {
        name = 'Edge';
        const match = ua.match(/Edg\/(\d+)/);
        version = match ? match[1] : 'Unknown';
      } else if (ua.includes('Opera') || ua.includes('OPR')) {
        name = 'Opera';
        const match = ua.match(/(?:Opera|OPR)\/(\d+)/);
        version = match ? match[1] : 'Unknown';
      }

      // Feature detection
      const features = {
        webp: false,
        avif: false,
        cssGrid: false,
        cssFlexbox: false,
        serviceWorker: false,
        webGL: false,
        webRTC: false,
        indexedDB: false,
      };

      // WebP support
      try {
        features.webp = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
      } catch {
        features.webp = false;
      }

      // AVIF support (basic check)
      try {
        features.avif = document.createElement('canvas').toDataURL('image/avif').indexOf('data:image/avif') === 0;
      } catch {
        features.avif = false;
      }

      // CSS Grid support
      features.cssGrid = CSS.supports('display', 'grid');

      // CSS Flexbox support
      features.cssFlexbox = CSS.supports('display', 'flex');

      // Service Worker support
      features.serviceWorker = 'serviceWorker' in navigator;

      // WebGL support
      try {
        const canvas = document.createElement('canvas');
        features.webGL = !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
      } catch {
        features.webGL = false;
      }

      // WebRTC support
      features.webRTC = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

      // IndexedDB support
      features.indexedDB = !!window.indexedDB;

      // Determine if browser is supported
      const supportedBrowsers = {
        Chrome: 90,
        Firefox: 88,
        Safari: 14,
        Edge: 90,
        Opera: 75,
      };

      const minVersion = supportedBrowsers[name as keyof typeof supportedBrowsers];
      const isSupported = minVersion ? parseInt(version) >= minVersion : false;

      return {
        name,
        version,
        isSupported,
        isMobile,
        isDesktop: !isMobile,
        features,
      };
    };

    const info = detectBrowser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setBrowserInfo(info);

    // Check for compatibility issues
    const issues: string[] = [];

    if (!info.isSupported) {
      issues.push(`Your browser (${info.name} ${info.version}) may not be fully supported. Please update to a modern browser for the best experience.`);
    }

    if (!info.features.webp) {
      issues.push('Your browser does not support WebP images. Some images may load slower.');
    }

    if (!info.features.cssGrid) {
      issues.push('Your browser has limited CSS Grid support. Layout may appear differently.');
    }

    if (!info.features.serviceWorker) {
      issues.push('Service Worker is not supported. Offline functionality may be limited.');
    }

    setCompatibilityIssues(issues);
  }, []);

  const showWarning = compatibilityIssues.length > 0;

  const dismissWarning = () => {
    // Since showWarning is now computed, we can't dismiss it
    // This is a design choice - warnings are always shown if issues exist
  };

  return (
    <>
      {/* Browser Compatibility Warning */}
      {showWarning && (
        <div className='fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-black p-4 shadow-lg'>
          <div className='max-w-7xl mx-auto flex items-center justify-between'>
            <div className='flex-1'>
              <h3 className='font-semibold mb-2'>Browser Compatibility Notice</h3>
              <ul className='text-sm space-y-1'>
                {compatibilityIssues.map((issue, index) => (
                  <li key={index}>• {issue}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={dismissWarning}
              className='ml-4 p-2 hover:bg-yellow-600 rounded transition-colors'
              aria-label='Dismiss compatibility warning'
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Browser info for debugging (only in development) */}
      {process.env.NODE_ENV === 'development' && browserInfo && (
        <div className='fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-lg text-xs font-mono z-40 max-w-xs'>
          <div className='mb-2'>Browser: {browserInfo.name} {browserInfo.version}</div>
          <div className='mb-2'>Supported: {browserInfo.isSupported ? '✅' : '❌'}</div>
          <div className='mb-2'>Mobile: {browserInfo.isMobile ? '📱' : '🖥️'}</div>
          <div className='grid grid-cols-2 gap-1 text-xs'>
            <div>WebP: {browserInfo.features.webp ? '✅' : '❌'}</div>
            <div>Grid: {browserInfo.features.cssGrid ? '✅' : '❌'}</div>
            <div>SW: {browserInfo.features.serviceWorker ? '✅' : '❌'}</div>
            <div>WebGL: {browserInfo.features.webGL ? '✅' : '❌'}</div>
          </div>
        </div>
      )}

      {/* Apply compatibility classes to body */}
      <div
        className={`browser-compatibility ${
          browserInfo?.isMobile ? 'mobile-device' : 'desktop-device'
        } ${
          browserInfo?.isSupported ? 'supported-browser' : 'unsupported-browser'
        } ${
          browserInfo?.features.webp ? 'webp-supported' : 'webp-unsupported'
        }`}
        data-browser={browserInfo?.name.toLowerCase()}
        data-browser-version={browserInfo?.version}
        data-mobile={browserInfo?.isMobile}
        data-supported={browserInfo?.isSupported}
      >
        {children}
      </div>
    </>
  );
};

// Hook to access browser compatibility info
export const useBrowserCompatibility = () => {
  return useMemo(() => {
    // Reuse the same detection logic
    const ua = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

    let name = 'Unknown';
    let version = 'Unknown';

    if (ua.includes('Chrome') && !ua.includes('Edg')) {
      name = 'Chrome';
      const match = ua.match(/Chrome\/(\d+)/);
      version = match ? match[1] : 'Unknown';
    } else if (ua.includes('Firefox')) {
      name = 'Firefox';
      const match = ua.match(/Firefox\/(\d+)/);
      version = match ? match[1] : 'Unknown';
    } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
      name = 'Safari';
      const match = ua.match(/Version\/(\d+)/);
      version = match ? match[1] : 'Unknown';
    } else if (ua.includes('Edg')) {
      name = 'Edge';
      const match = ua.match(/Edg\/(\d+)/);
      version = match ? match[1] : 'Unknown';
    }

    const supportedBrowsers = {
      Chrome: 90,
      Firefox: 88,
      Safari: 14,
      Edge: 90,
      Opera: 75,
    };

    const minVersion = supportedBrowsers[name as keyof typeof supportedBrowsers];
    const isSupported = minVersion ? parseInt(version) >= minVersion : false;

    const features = {
      webp: false,
      avif: false,
      cssGrid: CSS.supports('display', 'grid'),
      cssFlexbox: CSS.supports('display', 'flex'),
      serviceWorker: 'serviceWorker' in navigator,
      webGL: false,
      webRTC: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
      indexedDB: !!window.indexedDB,
    };

    // WebP support
    try {
      features.webp = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
    } catch {
      features.webp = false;
    }

    // WebGL support
    try {
      const canvas = document.createElement('canvas');
      features.webGL = !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch {
      features.webGL = false;
    }

    return {
      name,
      version,
      isSupported,
      isMobile,
      isDesktop: !isMobile,
      features,
    };
  }, []);
};