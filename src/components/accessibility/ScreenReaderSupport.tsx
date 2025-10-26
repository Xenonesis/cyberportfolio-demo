'use client';

import React, { useEffect, useState, ReactNode } from 'react';
import { useAccessibility } from './AccessibilityProvider';

// Screen reader support component props
interface ScreenReaderSupportProps {
  children: ReactNode;
  enableLiveRegions?: boolean;
  enableARIAEnhancements?: boolean;
  enableSemanticEnhancements?: boolean;
}

// ARIA live region types
type LiveRegionType = 'polite' | 'assertive' | 'off';

// Screen reader support component
export const ScreenReaderSupport: React.FC<ScreenReaderSupportProps> = ({
  children,
  enableLiveRegions = true,
  enableARIAEnhancements = true,
  enableSemanticEnhancements = true,
}) => {
  const { isScreenReaderMode, addError, addSecurityAlert, complianceScore } =
    useAccessibility();

  // Live region management
  const [announcementQueue, setAnnouncementQueue] = useState<
    Array<{ message: string; type: LiveRegionType; id: string }>
  >([]);

  // Security status tracking
  const [securityStatuses, setSecurityStatuses] = useState<Map<string, string>>(
    new Map()
  );

  // Function declarations moved to the top to avoid declaration order issues
  const announce = (message: string, type: LiveRegionType = 'polite') => {
    const generateId = () =>
      `announcement-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const id = generateId();
    setAnnouncementQueue(prev => [...prev, { message, type, id }]);
  };

  const processAnnouncementQueue = () => {
    const announcement = announcementQueue[0];
    if (!announcement) return;

    const liveRegion = document.getElementById(
      announcement.type === 'assertive'
        ? 'screen-reader-live-assertive'
        : 'screen-reader-live-polite'
    );

    if (liveRegion) {
      liveRegion.textContent = announcement.message;

      // Clear after announcement
      setTimeout(() => {
        setAnnouncementQueue(prev => prev.slice(1));
      }, 1000);
    }
  };

  const enhanceScreenReaderExperience = () => {
    try {
      // Add semantic enhancements
      if (enableSemanticEnhancements) {
        addSemanticEnhancements();
      }

      // Add ARIA enhancements
      if (enableARIAEnhancements) {
        addARIAEnhancements();
      }

      // Setup live regions
      if (enableLiveRegions) {
        setupLiveRegions();
      }

      // Announce page load
      announcePageLoad();
    } catch (error) {
      const generateErrorId = () =>
        `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      addError({
        message: `Screen reader enhancement failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        type: 'warning',
        element: 'screen-reader-support',
        id: generateErrorId(),
        timestamp: new Date(),
      });
    }
  };

  const addSemanticEnhancements = () => {
    // Enhance navigation landmarks
    const navElements = document.querySelectorAll('nav');
    navElements.forEach((nav, index) => {
      if (!nav.getAttribute('role')) {
        nav.setAttribute('role', 'navigation');
      }
      if (!nav.getAttribute('aria-label')) {
        nav.setAttribute(
          'aria-label',
          index === 0 ? 'Main navigation' : `Navigation ${index + 1}`
        );
      }
    });

    // Enhance main content
    const mainElement = document.querySelector('main');
    if (mainElement && !mainElement.getAttribute('role')) {
      mainElement.setAttribute('role', 'main');
    }

    // Enhance articles
    const articles = document.querySelectorAll('article');
    articles.forEach(article => {
      if (!article.getAttribute('role')) {
        article.setAttribute('role', 'article');
      }
    });
  };

  const addARIAEnhancements = () => {
    // Add ARIA labels to interactive elements without text
    const interactiveElements = document.querySelectorAll(
      'button, a, input, select, textarea'
    );
    interactiveElements.forEach(element => {
      if (
        !element.getAttribute('aria-label') &&
        !element.getAttribute('aria-labelledby') &&
        !element.textContent?.trim()
      ) {
        const elementType = element.tagName.toLowerCase();
        let label = '';

        if (elementType === 'button') {
          label = 'Button';
        } else if (elementType === 'a') {
          label = 'Link';
        } else if (elementType === 'input') {
          const inputType = (element as HTMLInputElement).type;
          label =
            inputType === 'submit'
              ? 'Submit'
              : inputType === 'reset'
                ? 'Reset'
                : 'Input field';
        }

        if (label) {
          element.setAttribute('aria-label', label);
        }
      }
    });
  };

  const setupLiveRegions = () => {
    // Create live region for general announcements
    let liveRegion = document.getElementById('screen-reader-live-polite');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'screen-reader-live-polite';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'false');
      liveRegion.className = 'sr-only';
      document.body.appendChild(liveRegion);
    }

    // Create live region for urgent announcements
    let assertiveRegion = document.getElementById(
      'screen-reader-live-assertive'
    );
    if (!assertiveRegion) {
      assertiveRegion = document.createElement('div');
      assertiveRegion.id = 'screen-reader-live-assertive';
      assertiveRegion.setAttribute('aria-live', 'assertive');
      assertiveRegion.setAttribute('aria-atomic', 'true');
      assertiveRegion.className = 'sr-only';
      document.body.appendChild(assertiveRegion);
    }
  };

  const announcePageLoad = () => {
    const pageTitle = document.title;
    const mainHeading = document.querySelector('h1')?.textContent;

    let announcement = `Page loaded: ${pageTitle}`;
    if (mainHeading) {
      announcement += `. Main content: ${mainHeading}`;
    }

    announce(announcement, 'polite');
  };

  const updateSecurityStatus = (elementId: string, status: string) => {
    setSecurityStatuses(prev => new Map(prev.set(elementId, status)));

    announce(
      `Security status updated: ${status}`,
      status === 'critical' ? 'assertive' : 'polite'
    );

    // Add security alert for critical status
    if (status === 'critical') {
      addSecurityAlert({
        message: 'Critical security alert detected',
        type: 'critical',
        priority: 'urgent',
      });
    }
  };

  const createAccessibleSecurityElement = (
    elementId: string,
    status: string,
    label: string,
    role: string = 'status'
  ): ReactNode => {
    return (
      <div
        id={elementId}
        role={role}
        aria-label={label}
        aria-live={role === 'alert' ? 'assertive' : 'polite'}
        data-security-status={status}
        data-a11y-id={elementId}
        className='sr-only'
      >
        {label}
      </div>
    );
  };

  // Initialize screen reader enhancements
  useEffect(() => {
    if (isScreenReaderMode) {
      enhanceScreenReaderExperience();
    }
  }, [isScreenReaderMode]);

  // Process announcement queue
  useEffect(() => {
    if (announcementQueue.length > 0) {
      processAnnouncementQueue();
    }
  }, [announcementQueue]);

  // Security status monitoring
  useEffect(() => {
    const checkSecurityStatus = () => {
      const currentStatuses = Array.from(securityStatuses.values());
      const hasCritical = currentStatuses.includes('critical');
      const hasWarning = currentStatuses.includes('warning');

      if (hasCritical) {
        announce(
          'Critical security alert detected across the system',
          'assertive'
        );
      } else if (hasWarning) {
        announce('Security warning detected', 'polite');
      }
    };

    const interval = setInterval(checkSecurityStatus, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [securityStatuses]);

  // Compliance monitoring
  useEffect(() => {
    if (complianceScore < 80) {
      const complianceAnnouncement = () => {
        announce(
          `Accessibility compliance score is ${complianceScore}%. Some features may not be fully accessible.`,
          'polite'
        );
      };
      complianceAnnouncement();
    }
  }, [complianceScore]);

  // Context value for child components
  const screenReaderContext: ScreenReaderContextType = {
    announce,
    updateSecurityStatus,
    createAccessibleSecurityElement,
    isScreenReaderMode,
    securityStatuses: Array.from(securityStatuses.entries()),
  };

  return (
    <ScreenReaderContext.Provider value={screenReaderContext}>
      {children}

      {/* Skip navigation link for screen readers */}
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-cyan-600 text-white px-4 py-2 rounded z-50'
        aria-label='Skip to main content'
      >
        Skip to main content
      </a>
    </ScreenReaderContext.Provider>
  );
};

// Screen reader context for child components
interface ScreenReaderContextType {
  announce: (message: string, type?: 'polite' | 'assertive') => void;
  updateSecurityStatus: (elementId: string, status: string) => void;
  createAccessibleSecurityElement: (
    elementId: string,
    status: string,
    label: string,
    role?: string
  ) => ReactNode;
  isScreenReaderMode: boolean;
  securityStatuses: Array<[string, string]>;
}

const ScreenReaderContext = React.createContext<
  ScreenReaderContextType | undefined
>(undefined);

// Custom hook for screen reader support
export const useScreenReader = (): ScreenReaderContextType => {
  const context = React.useContext(ScreenReaderContext);
  if (context === undefined) {
    throw new Error(
      'useScreenReader must be used within a ScreenReaderSupport component'
    );
  }
  return context;
};

// Higher-order component for screen reader support
export const withScreenReaderSupport = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const WithScreenReaderSupport: React.FC<P> = props => (
    <ScreenReaderSupport>
      <Component {...props} />
    </ScreenReaderSupport>
  );

  WithScreenReaderSupport.displayName = `withScreenReaderSupport(${Component.displayName || Component.name})`;

  return WithScreenReaderSupport;
};
