'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Accessibility context types
interface AccessibilityContextType {
  // User preferences
  prefersReducedMotion: boolean;
  prefersHighContrast: boolean;
  prefersDarkMode: boolean;
  prefersLightMode: boolean;
  
  // Accessibility features
  isHighContrastMode: boolean;
  isReducedMotion: boolean;
  isFocusVisible: boolean;
  isScreenReaderMode: boolean;
  
  // Color contrast
  currentContrast: 'normal' | 'enhanced' | 'high';
  adjustContrast: (level: 'normal' | 'enhanced' | 'high') => void;
  
  // Focus management
  focusedElement: string | null;
  setFocusedElement: (elementId: string | null) => void;
  focusHistory: string[];
  
  // Error handling
  errors: AccessibilityError[];
  addError: (errorData: AccessibilityError) => void;
  removeError: (errorId: string) => void;
  
  // Testing and compliance
  complianceScore: number;
  lastTestDate: Date | null;
  runComplianceTest: () => void;
  
  // Security-specific accessibility
  securityAlerts: SecurityAlert[];
  addSecurityAlert: (alertData: Omit<SecurityAlert, 'id' | 'timestamp'>) => void;
  clearSecurityAlert: (alertId: string) => void;
}

interface AccessibilityError {
  id: string;
  message: string;
  type: 'critical' | 'warning' | 'info';
  element: string;
  timestamp: Date;
}

interface SecurityAlert {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'critical';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  timestamp: Date;
  expiresAt?: Date;
}

// Create context with default values
export const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

// Accessibility provider props
interface AccessibilityProviderProps {
  children: ReactNode;
  enableTesting?: boolean;
  enableSecurityAlerts?: boolean;
}

// Accessibility provider component
export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({
  children,
  enableTesting = true,
  enableSecurityAlerts = true
}) => {
  // User preference detection
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [prefersHighContrast, setPrefersHighContrast] = useState(false);
  const [prefersDarkMode, setPrefersDarkMode] = useState(false);
  const [prefersLightMode, setPrefersLightMode] = useState(false);
  
  // Accessibility state
  const [isHighContrastMode, setIsHighContrastMode] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isFocusVisible, setIsFocusVisible] = useState(false);
  const [isScreenReaderMode, setIsScreenReaderMode] = useState(false);
  
  // Color contrast management
  const [currentContrast, setCurrentContrast] = useState<'normal' | 'enhanced' | 'high'>('normal');
  
  // Focus management
  const [focusedElement, setFocusedElementState] = useState<string | null>(null);
  const [focusHistory, setFocusHistory] = useState<string[]>([]);
  
  // Error handling
  const [errors, setErrors] = useState<AccessibilityError[]>([]);
  
  // Testing and compliance
  const [complianceScore, setComplianceScore] = useState(0);
  const [lastTestDate, setLastTestDate] = useState<Date | null>(null);
  
  // Security alerts
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([]);
  
  // Detect user preferences on mount
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQueryReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQueryReducedMotion.matches);
    
    // Check for high contrast preference
    const mediaQueryHighContrast = window.matchMedia('(prefers-contrast: high)');
    setPrefersHighContrast(mediaQueryHighContrast.matches);
    
    // Check for dark mode preference
    const mediaQueryDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    setPrefersDarkMode(mediaQueryDarkMode.matches);
    
    // Check for light mode preference
    const mediaQueryLightMode = window.matchMedia('(prefers-color-scheme: light)');
    setPrefersLightMode(mediaQueryLightMode.matches);
    
    // Set initial states based on preferences
    setIsReducedMotion(mediaQueryReducedMotion.matches);
    setIsHighContrastMode(mediaQueryHighContrast.matches);
    
    // Add event listeners for preference changes
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      setIsReducedMotion(e.matches);
    };
    
    const handleHighContrastChange = (e: MediaQueryListEvent) => {
      setPrefersHighContrast(e.matches);
      setIsHighContrastMode(e.matches);
    };
    
    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      setPrefersDarkMode(e.matches);
      setPrefersLightMode(!e.matches);
    };
    
    mediaQueryReducedMotion.addEventListener('change', handleReducedMotionChange);
    mediaQueryHighContrast.addEventListener('change', handleHighContrastChange);
    mediaQueryDarkMode.addEventListener('change', handleDarkModeChange);
    
    // Cleanup event listeners
    return () => {
      mediaQueryReducedMotion.removeEventListener('change', handleReducedMotionChange);
      mediaQueryHighContrast.removeEventListener('change', handleHighContrastChange);
      mediaQueryDarkMode.removeEventListener('change', handleDarkModeChange);
    };
  }, []);
  
  // Focus management
  useEffect(() => {
    const handleFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      const elementId = target.id || target.getAttribute('data-a11y-id') || target.tagName;
      
      setFocusedElementState(elementId);
      setFocusHistory(prev => {
        const newHistory = [...prev, elementId];
        // Keep only last 10 focused elements
        return newHistory.slice(-10);
      });
      
      setIsFocusVisible(true);
    };
    
    const handleBlur = () => {
      setIsFocusVisible(false);
    };
    
    document.addEventListener('focus', handleFocus, true);
    document.addEventListener('blur', handleBlur, true);
    
    return () => {
      document.removeEventListener('focus', handleFocus, true);
      document.removeEventListener('blur', handleBlur, true);
    };
  }, []);
  
  // Screen reader detection
  useEffect(() => {
    // Simple screen reader detection
    const detectScreenReader = () => {
      const div = document.createElement('div');
      div.setAttribute('role', 'application');
      div.setAttribute('aria-live', 'polite');
      div.style.position = 'absolute';
      div.style.left = '-9999px';
      document.body.appendChild(div);
      
      const isScreenReader = window.speechSynthesis !== undefined ||
                            div.getAttribute('role') === 'application';
      
      document.body.removeChild(div);
      setIsScreenReaderMode(isScreenReader);
    };
    
    detectScreenReader();
  }, []);
  
  // Color contrast adjustment
  const adjustContrast = (level: 'normal' | 'enhanced' | 'high') => {
    setCurrentContrast(level);
    setIsHighContrastMode(level === 'high');
    
    // Apply CSS classes to document
    document.documentElement.classList.remove('contrast-normal', 'contrast-enhanced', 'contrast-high');
    document.documentElement.classList.add(`contrast-${level}`);
    
    // Update CSS custom properties
    if (level === 'high') {
      document.documentElement.style.setProperty('--contrast-ratio-normal', '7');
      document.documentElement.style.setProperty('--contrast-ratio-large', '4.5');
    } else {
      document.documentElement.style.setProperty('--contrast-ratio-normal', '4.5');
      document.documentElement.style.setProperty('--contrast-ratio-large', '3.0');
    }
  };
  
  // Error handling
  const addError = (errorData: Omit<AccessibilityError, 'id' | 'timestamp'>) => {
    const generateId = () => `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const newError: AccessibilityError = {
      ...errorData,
      id: generateId(),
      timestamp: new Date()
    };
    
    setErrors(prev => [...prev, newError]);
    
    // Remove error after 30 seconds for non-critical errors
    if (newError.type !== 'critical') {
      setTimeout(() => {
        removeError(newError.id);
      }, 30000);
    }
  };
  
  const removeError = (errorId: string) => {
    setErrors(prev => prev.filter(error => error.id !== errorId));
  };
  
  // Security alerts
  const addSecurityAlert = (alertData: Omit<SecurityAlert, 'id' | 'timestamp'>) => {
    if (!enableSecurityAlerts) return;
    
    const generateId = () => `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const newAlert: SecurityAlert = {
      ...alertData,
      id: generateId(),
      timestamp: new Date()
    };
    
    setSecurityAlerts(prev => [...prev, newAlert]);
    
    // Auto-remove alerts based on priority
    const autoRemoveTime = newAlert.priority === 'urgent' ? 5000 :
                          newAlert.priority === 'high' ? 10000 :
                          newAlert.priority === 'medium' ? 30000 : 60000;
    
    if (!newAlert.expiresAt) {
      setTimeout(() => {
        clearSecurityAlert(newAlert.id);
      }, autoRemoveTime);
    }
  };
  
  const clearSecurityAlert = (alertId: string) => {
    setSecurityAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };
  
  // Compliance testing
  const runComplianceTest = () => {
    if (!enableTesting) return;
    
    // Simulate WCAG 2.1 AA compliance test
    const testResults = simulateComplianceTest();
    setComplianceScore(testResults.score);
    setLastTestDate(new Date());
    
    // Add errors for any violations found
    testResults.violations.forEach(violation => {
      addError({
        message: violation.message,
        type: violation.severity,
        element: violation.element
      });
    });
  };
  
  // Simulate compliance test (in a real implementation, this would use actual testing tools)
  const simulateComplianceTest = () => {
    const violations: { message: string; severity: 'critical' | 'warning' | 'info'; element: string }[] = [];
    let score = 100;
    
    // Check color contrast
    if (currentContrast !== 'high' && prefersHighContrast) {
      violations.push({
        message: 'High contrast mode should be enabled for users who prefer it',
        severity: 'warning',
        element: 'document'
      });
      score -= 10;
    }
    
    // Check focus indicators
    if (!isFocusVisible) {
      violations.push({
        message: 'Focus indicators should be visible for keyboard navigation',
        severity: 'warning',
        element: 'focus-management'
      });
      score -= 5;
    }
    
    // Check reduced motion
    if (prefersReducedMotion && !isReducedMotion) {
      violations.push({
        message: 'Animations should be reduced for users who prefer it',
        severity: 'warning',
        element: 'animations'
      });
      score -= 8;
    }
    
    // Check ARIA labels
    const elementsWithoutAria = document.querySelectorAll('[role]:not([aria-label]):not([aria-labelledby])');
    if (elementsWithoutAria.length > 0) {
      violations.push({
        message: `Found ${elementsWithoutAria.length} elements with roles but no ARIA labels`,
        severity: 'critical',
        element: 'aria-labels'
      });
      score -= 15;
    }
    
    return { score: Math.max(0, score), violations };
  };
  
  // Initialize with default contrast
  useEffect(() => {
    const initializeContrast = () => {
      adjustContrast('normal');
    };
    
    initializeContrast();
  }, []);
  
  // Run initial compliance test
  useEffect(() => {
    if (enableTesting) {
      const runInitialTest = () => {
        runComplianceTest();
      };
      
      runInitialTest();
      
      // Run periodic tests
      const interval = setInterval(runComplianceTest, 5 * 60 * 1000); // Every 5 minutes
      return () => clearInterval(interval);
    }
  }, [enableTesting]);
  
  const contextValue: AccessibilityContextType = {
    // User preferences
    prefersReducedMotion,
    prefersHighContrast,
    prefersDarkMode,
    prefersLightMode,
    
    // Accessibility features
    isHighContrastMode,
    isReducedMotion,
    isFocusVisible,
    isScreenReaderMode,
    
    // Color contrast
    currentContrast,
    adjustContrast,
    
    // Focus management
    focusedElement,
    setFocusedElement: setFocusedElementState,
    focusHistory,
    
    // Error handling
    errors,
    addError,
    removeError,
    
    // Testing and compliance
    complianceScore,
    lastTestDate,
    runComplianceTest,
    
    // Security-specific accessibility
    securityAlerts,
    addSecurityAlert,
    clearSecurityAlert
  };
  
  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
      
      {/* Global accessibility error display */}
      {errors.length > 0 && (
        <div 
          className="fixed top-20 right-4 z-50 space-y-2 max-w-sm"
          role="alert"
          aria-live="polite"
        >
          {errors.map(error => (
            <div
              key={error.id}
              className={`p-3 rounded-lg border-l-4 ${
                error.type === 'critical' ? 'bg-red-900/90 border-red-500' :
                error.type === 'warning' ? 'bg-yellow-900/90 border-yellow-500' :
                'bg-blue-900/90 border-blue-500'
              }`}
            >
              <div className="flex items-start space-x-2">
                <div className="flex-shrink-0">
                  {error.type === 'critical' && (
                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                  {error.type === 'warning' && (
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  )}
                  {error.type === 'info' && (
                    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{error.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{error.element}</p>
                </div>
                <button
                  onClick={() => removeError(error.id)}
                  className="flex-shrink-0 text-gray-400 hover:text-white"
                  aria-label="Dismiss error"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Security alerts display */}
      {enableSecurityAlerts && securityAlerts.length > 0 && (
        <div 
          className="fixed bottom-20 right-4 z-50 space-y-2 max-w-sm"
          role="alert"
          aria-live="assertive"
        >
          {securityAlerts.map(alert => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border-l-4 ${
                alert.type === 'critical' ? 'bg-red-900/90 border-red-500' :
                alert.type === 'warning' ? 'bg-yellow-900/90 border-yellow-500' :
                'bg-green-900/90 border-green-500'
              }`}
            >
              <div className="flex items-start space-x-2">
                <div className="flex-shrink-0">
                  {alert.type === 'critical' && (
                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                  {alert.type === 'warning' && (
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  )}
                  {alert.type === 'info' && (
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{alert.message}</p>
                  <p className="text-xs text-gray-400 mt-1 capitalize">{alert.priority} priority</p>
                </div>
                <button
                  onClick={() => clearSecurityAlert(alert.id)}
                  className="flex-shrink-0 text-gray-400 hover:text-white"
                  aria-label="Dismiss alert"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AccessibilityContext.Provider>
  );
};

// Custom hook to use accessibility context
export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

// Higher-order component for accessibility
export const withAccessibility = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const WithAccessibility: React.FC<P> = (props) => (
    <AccessibilityProvider>
      <Component {...props} />
    </AccessibilityProvider>
  );
  
  WithAccessibility.displayName = `withAccessibility(${Component.displayName || Component.name})`;
  
  return WithAccessibility;
};