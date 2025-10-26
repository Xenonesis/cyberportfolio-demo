'use client';

import React, { useEffect, useState, createContext, useContext } from 'react';

interface MobileResponsiveProps {
  children: React.ReactNode;
}

interface ResponsiveContextType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  orientation: 'portrait' | 'landscape';
  breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const ResponsiveContext = createContext<ResponsiveContextType | undefined>(
  undefined
);

export const MobileResponsive: React.FC<MobileResponsiveProps> = ({
  children,
}) => {
  const [responsiveState, setResponsiveState] = useState<ResponsiveContextType>(
    {
      isMobile: false,
      isTablet: false,
      isDesktop: false,
      isLargeDesktop: false,
      orientation: 'portrait',
      breakpoint: 'sm',
    }
  );

  useEffect(() => {
    const updateResponsiveState = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setResponsiveState({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024 && width < 1280,
        isLargeDesktop: width >= 1280,
        orientation: width > height ? 'landscape' : 'portrait',
        breakpoint:
          width < 640
            ? 'sm'
            : width < 768
              ? 'md'
              : width < 1024
                ? 'lg'
                : width < 1280
                  ? 'xl'
                  : '2xl',
      });
    };

    // Initial update
    updateResponsiveState();

    // Add event listener for resize
    window.addEventListener('resize', updateResponsiveState);

    // Add event listener for orientation change
    window.addEventListener('orientationchange', updateResponsiveState);

    return () => {
      window.removeEventListener('resize', updateResponsiveState);
      window.removeEventListener('orientationchange', updateResponsiveState);
    };
  }, []);

  return (
    <ResponsiveContext.Provider value={responsiveState}>
      <div
        className={`
          responsive-container
          ${responsiveState.isMobile ? 'mobile-view' : ''}
          ${responsiveState.isTablet ? 'tablet-view' : ''}
          ${responsiveState.isDesktop ? 'desktop-view' : ''}
          ${responsiveState.isLargeDesktop ? 'large-desktop-view' : ''}
          ${responsiveState.orientation}-orientation
          ${responsiveState.breakpoint}-breakpoint
        `}
      >
        {children}
      </div>
    </ResponsiveContext.Provider>
  );
};

export const useResponsive = (): ResponsiveContextType => {
  const context = useContext(ResponsiveContext);
  if (context === undefined) {
    throw new Error(
      'useResponsive must be used within a MobileResponsive provider'
    );
  }
  return context;
};

// Responsive component that renders differently based on screen size
export const ResponsiveComponent: React.FC<{
  mobile?: React.ReactNode;
  tablet?: React.ReactNode;
  desktop?: React.ReactNode;
  largeDesktop?: React.ReactNode;
  fallback?: React.ReactNode;
}> = ({ mobile, tablet, desktop, largeDesktop, fallback }) => {
  const { isMobile, isTablet, isDesktop, isLargeDesktop } = useResponsive();

  if (isMobile && mobile) return <>{mobile}</>;
  if (isTablet && tablet) return <>{tablet}</>;
  if (isDesktop && desktop) return <>{desktop}</>;
  if (isLargeDesktop && largeDesktop) return <>{largeDesktop}</>;

  return <>{fallback}</>;
};

// Performance-optimized responsive grid
export const ResponsiveGrid: React.FC<{
  children: React.ReactNode;
  className?: string;
  mobileCols?: number;
  tabletCols?: number;
  desktopCols?: number;
  largeDesktopCols?: number;
}> = ({
  children,
  className = '',
  mobileCols = 1,
  tabletCols = 2,
  desktopCols = 3,
  largeDesktopCols = 4,
}) => {
  const { isMobile, isTablet, isDesktop, isLargeDesktop } = useResponsive();

  const cols = isMobile
    ? mobileCols
    : isTablet
      ? tabletCols
      : isDesktop
        ? desktopCols
        : largeDesktopCols;

  return (
    <div
      className={`
        grid
        ${className}
        gap-4
        ${isMobile ? 'mobile-grid' : ''}
        ${isTablet ? 'tablet-grid' : ''}
        ${isDesktop ? 'desktop-grid' : ''}
        ${isLargeDesktop ? 'large-desktop-grid' : ''}
      `}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {children}
    </div>
  );
};
