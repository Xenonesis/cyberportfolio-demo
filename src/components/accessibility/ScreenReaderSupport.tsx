
'use client';

import React, { useEffect, useState, ReactNode } from 'react';

// Screen reader support component props
interface ScreenReaderSupportProps {
  children: ReactNode;
  enableLiveRegions?: boolean;
  enableARIAEnhancements?: boolean;
  enableSemanticEnhancements?: boolean;
}

// ARIA live region types
type LiveRegionType = 'polite' | 'assertive' | 'off';

// ARIA role types for security elements
type SecurityRole = 
  | 'alert' 
  | 'status' 
  | 'log' 
  | 'progressbar' 
  | 'timer' 
  | 'meter' 
  | 'security-indicator';

// Security status types
type SecurityStatus = 
  | 'secure' 
  | 'warning' 
  | 'critical' 
  | 'offline' 
  | 'scanning' 
  | 'protected';

// Screen reader support component
export const ScreenReaderSupport: React.FC<ScreenReaderSupportProps> = ({
  children,
  enableLiveRegions = true,
  enableARIAEnhancements = true,
  enableSemanticEnhancements = true
}) => {
  const { 
    isScreenReaderMode, 
    addError, 
    addSecurityAlert,
    complianceScore 
  } = useAccessibility();
  
  // Live region management
  const [announcementQueue, setAnnouncementQueue] = useState<Array<{ message: string; type: LiveRegionType; id: string }>>([]);
  
  // Security status tracking
  const [securityStatuses, setSecurityStatuses] = useState<Map<string, SecurityStatus>>(new Map());
  
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
        announce('Critical security alert detected across the system', 'assertive');
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
      announce(`Accessibility compliance score is ${complianceScore}%. Some features may not be fully accessible.`, 'polite');
    }
  }, [complianceScore]);
  
  // Announce message to screen reader
  const announce = (message: string, type: LiveRegionType = 'polite') => {
    const generateId = () => `announcement-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const id = generateId();
    setAnnouncementQueue(prev => [...prev, { message, type, id }]);
  };
  
  // Process announcement queue
  const processAnnouncementQueue = () => {
    const announcement = announcementQueue[0];
    if (!announcement) return;
    
    const liveRegion = document.getElementById(
      announcement.type === 'assertive' ? 'screen-reader-live-assertive' : 'screen-reader-live-polite'
    );
    
    if (liveRegion) {
      liveRegion.textContent = announcement.message;
      
      // Clear after announcement
      setTimeout(() => {
        setAnnouncementQueue(prev => prev.slice(1));
      }, 1000);
    }
  };
  
  // Enhance screen reader experience
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
      const generateErrorId = () => `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      addError({
        message: `Screen reader enhancement failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        type: 'warning',
        element: 'screen-reader-support',
        id: generateErrorId(),
        timestamp: new Date()
      });
    }
  };
  
  // Add semantic HTML enhancements
  const addSemanticEnhancements = () => {
    // Enhance navigation landmarks
    const navElements = document.querySelectorAll('nav');
    navElements.forEach((nav, index) => {
      if (!nav.getAttribute('role')) {
        nav.setAttribute('role', 'navigation');
      }
      if (!nav.getAttribute('aria-label')) {
        nav.setAttribute('aria-label', index === 0 ? 'Main navigation' : `Navigation ${index + 1}`);
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
    
    // Enhance sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      if (!section.getAttribute('role')) {
        section.setAttribute('role', 'region');
      }
      if (!section.getAttribute('aria-label') && section.querySelector('h1, h2, h3, h4, h5, h6')) {
        const heading = section.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) {
          section.setAttribute('aria-label', heading.textContent || 'Section');
        }
      }
    });
    
    // Enhance security-specific elements
    enhanceSecurityElements();
  };
  
  // Add ARIA enhancements for security elements
  const enhanceSecurityElements = () => {
    // Enhance security status indicators
    const statusIndicators = document.querySelectorAll('[data-security-status]');
    statusIndicators.forEach(element => {
      const status = element.getAttribute('data-security-status') as SecurityStatus;
      const label = element.getAttribute('data-security-label') || getStatusLabel(status);
      
      element.setAttribute('role', 'status');
      element.setAttribute('aria-label', label);
      element.setAttribute('aria-live', 'polite');
      
      setSecurityStatuses(prev => new Map(prev.set(element.id || element.getAttribute('data-a11y-id') || `status-${Math.random()}`, status)));
    });
    
    // Enhance security alerts
    const securityAlerts = document.querySelectorAll('[data-security-alert]');
    securityAlerts.forEach(alert => {
      alert.setAttribute('role', 'alert');
      alert.setAttribute('aria-live', 'assertive');
      alert.setAttribute('aria-atomic', 'true');
    });
    
    // Enhance security forms
    const securityForms = document.querySelectorAll('[data-security-form]');
    securityForms.forEach(form => {
      form.setAttribute('role', 'form');
      form.setAttribute('aria-label', 'Security assessment form');
    });
    
    // Enhance security controls
    const securityControls = document.querySelectorAll('[data-security-control]');
    securityControls.forEach(control => {
      control.setAttribute('role', 'button');
      control.setAttribute('aria-pressed', control.getAttribute('data-security-pressed') || 'false');
    });
  };
  
  // Add ARIA enhancements
  const addARIAEnhancements = () => {
    // Add ARIA labels to interactive elements without text
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
    interactiveElements.forEach(element => {
      if (!element.getAttribute('aria-label') && 
          !element.getAttribute('aria-labelledby') && 
          !element.textContent?.trim()) {
        
        const elementType = element.tagName.toLowerCase();
        let label = '';
        
        if (elementType === 'button') {
          label = 'Button';
        } else if (elementType === 'a') {
          label = 'Link';
        } else if (elementType === 'input') {
          const inputType = (element as HTMLInputElement).type;
          label = inputType === 'submit' ? 'Submit' : inputType === 'reset' ? 'Reset' : 'Input field';
        }
        
        if (label) {
          element.setAttribute('aria-label', label);
        }
      }
    });
    
    // Enhance form fields
    const formFields = document.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
      const label = field.getAttribute('aria-label');
      const placeholder = field.getAttribute('placeholder');
      
      if (!label && placeholder) {
        field.setAttribute('aria-label', placeholder);
      }
      
      // Add required field indicators
      if ((field as HTMLInputElement).required && !field.getAttribute('aria-required')) {
        field.setAttribute('aria-required', 'true');
      }
      
      // Add error state indicators
      if (field.classList.contains('error') && !field.getAttribute('aria-invalid')) {
        field.setAttribute('aria-invalid', 'true');
      }
    });
    
    // Enhance progress indicators
    const progressElements = document.querySelectorAll('[data-progress]');
    progressElements.forEach(progress => {
      progress.setAttribute('role', 'progressbar');
      progress.setAttribute('aria-valuemin', '0');
      progress.setAttribute('aria-valuemax', '100');
      
      const value = progress.getAttribute('data-progress');
      if (value) {
        progress.setAttribute('aria-valuenow', value);
      }
    });
  };
  
  // Setup live regions for dynamic content
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
    let assertiveRegion = document.getElementById('screen-reader-live-assertive');
    if (!assertiveRegion) {
      assertiveRegion = document.createElement('div');
      assertiveRegion.id = 'screen-reader-live-assertive';
      assertiveRegion.setAttribute('aria-live', 'assertive');
      assertiveRegion.setAttribute('aria-atomic', 'true');
      assertiveRegion.className = 'sr-only';
      document.body.appendChild(assertiveRegion);
    }
  };
  
  // Announce page load
  const announcePageLoad = () => {
    const pageTitle = document.title;
    const mainHeading = document.querySelector('h1')?.textContent;
    
    let announcement = `Page loaded: ${pageTitle}`;
    if (mainHeading) {
      announcement += `. Main content: ${mainHeading}`;
    }
    
    announce(announcement, 'polite');
  };
  
  // Get status label for security status
  const getStatusLabel = (status: SecurityStatus): string => {
    const labels: Record<SecurityStatus, string> = {
      secure: 'System secure',
      warning: 'Security warning detected',
      critical: 'Critical security alert',
      offline: 'Security system offline',
      scanning: 'Security scan in progress',
      protected: 'System protected'
    };
    
    return labels[status] || 'Security status unknown';
  };
  
  // Update security status
  const updateSecurityStatus = (elementId: string, status: SecurityStatus) => {
    setSecurityStatuses(prev => new Map(prev.set(elementId, status)));
    
    const label = getStatusLabel(status);
    announce(`Security status updated: ${label}`, status === 'critical' ? 'assertive' : 'polite');
    
    // Add security alert for critical status
    if (status === 'critical') {
      addSecurityAlert({
        message: 'Critical security alert detected',
        type: 'critical',
        priority: 'urgent'
      });
    }
  };
  
  // Create accessible security element
  const createAccessibleSecurityElement = (
    elementId: string,
    status: SecurityStatus,
    label: string,
    role: SecurityRole = 'status'
  ): ReactNode => {
    return (
      <div
        id={elementId}
        role={role}
        aria-label={label}
        aria-live={role === 'alert' ? 'assertive' : 'polite'}
        data-security-status={status}
        data-a11y-id={elementId}
        className="sr-only"
      >
        {label}
      </div>
    );
  };
  
  // Context value for child components
  const screenReaderContext: ScreenReaderContextType = {
    announce: (message: string, type?: 'polite' | 'assertive') => {
      announce(message, type || 'polite');
    },
    updateSecurityStatus: (elementId: string, status: SecurityStatus) => {
      updateSecurityStatus(elementId, status);
    },
    createAccessibleSecurityElement: (
      elementId: string,
      status: SecurityStatus,
      label: string,
      role?: SecurityRole
    ) => {
      return createAccessibleSecurityElement(elementId, status, label, role);
    },
    isScreenReaderMode,
    securityStatuses: Array.from(securityStatuses.entries())
  };
  
  return (
    <ScreenReaderContext.Provider value={screenReaderContext}>
      {children}
      
      {/* Skip navigation link for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-cyan-600 text-white px-4 py-2 rounded z-50"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>
      
      {/* Security status summary for screen readers */}
      {enableLiveRegions && (
        <div 
          className="sr-only" 
          aria-live="polite"
          aria-label="Security status summary"
        >
          {Array.from(securityStatuses.entries()).map(([elementId, status]) => (
            <div key={elementId} aria-label={`${elementId}: ${getStatusLabel(status)}`}>
              {getStatusLabel(status)}
            </div>
          ))}
        </div>
      )}
    </ScreenReaderContext.Provider>
  );
};

// Screen reader context for child components
interface ScreenReaderContextType {
  announce: (message: string, type?: 'polite' | 'assertive') => void;
  updateSecurityStatus: (elementId: string, status: SecurityStatus) => void;
  createAccessibleSecurityElement: (
    elementId: string,
    status: SecurityStatus,
    label: string,
    role?: SecurityRole
  ) => ReactNode;
  isScreenReaderMode: boolean;
  securityStatuses: Array<[string, SecurityStatus]>;
}

const ScreenReaderContext = React.createContext<ScreenReaderContextType | undefined>(undefined);

// Custom hook for screen reader support
export const useScreenReader = (): ScreenReaderContextType => {
  const context = React.useContext(ScreenReaderContext);
  if (context === undefined) {
    throw new Error('useScreenReader must be used within a ScreenReaderSupport component');
  }
  return context;
};

// Higher-order component for screen reader support
export const withScreenReaderSupport = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const WithScreenReaderSupport: React.FC<P> = (props) => (
    <ScreenReaderSupport>
      <Component {...props} />
    </ScreenReaderSupport>
  );
  
  WithScreenReaderSupport.displayName = `withScreenReaderSupport(${Component.displayName || Component.name})`;
  
  return WithScreenReaderSupport;
};