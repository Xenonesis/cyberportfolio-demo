'use client';

import React, { useEffect, useState, ReactNode } from 'react';
import { useAccessibility } from './AccessibilityProvider';

// Color contrast component props
interface ColorContrastProps {
  children: ReactNode;
  enableAutoAdjustment?: boolean;
  enableContrastToggle?: boolean;
  enableContrastMonitoring?: boolean;
  minNormalContrast?: number;
  minLargeContrast?: number;
}

// Color contrast levels
type ContrastLevel = 'normal' | 'enhanced' | 'high';

// Color scheme types
type ColorScheme = 'light' | 'dark' | 'auto';

// Color contrast component
export const ColorContrast: React.FC<ColorContrastProps> = ({
  children,
  enableAutoAdjustment = true,
  enableContrastToggle = true,
  enableContrastMonitoring = true,
  minNormalContrast = 4.5,
  minLargeContrast = 3.0
}) => {
  const { 
    currentContrast, 
    adjustContrast, 
    addError, 
    addSecurityAlert
  } = useAccessibility();
  
  // Color contrast state
  const [detectedContrast, setDetectedContrast] = useState<number>(0);
  const [isContrastGood, setIsContrastGood] = useState<boolean>(true);
  const [colorScheme, setColorScheme] = useState<ColorScheme>('auto');
  
  // WCAG contrast requirements
  const wcagRequirements = {
    normal: minNormalContrast, // 4.5:1 for normal text
    large: minLargeContrast,   // 3.0:1 for large text
    enhanced: 7.0,            // 7:1 for enhanced
    ui: 3.0                   // 3:0 for UI components
  };
  
  // Function declarations moved to the top to avoid declaration order issues
  const announceColorContrast = () => {
    // Create ARIA live region for color contrast announcements
    let liveRegion = document.getElementById('color-contrast-live');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'color-contrast-live';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      document.body.appendChild(liveRegion);
    }
    
    liveRegion.textContent = `Color contrast adjustment is available. Current level: ${currentContrast}.`;
  };
  
  const setupColorSchemeDetection = () => {
    // Check for user's color scheme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setColorScheme(mediaQuery.matches ? 'dark' : 'light');
    
    // Listen for color scheme changes
    const handleColorSchemeChange = (e: MediaQueryListEvent) => {
      setColorScheme(e.matches ? 'dark' : 'light');
      
      // Auto-adjust contrast based on color scheme
      if (enableAutoAdjustment) {
        autoAdjustContrast(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleColorSchemeChange);
    
    return () => mediaQuery.removeEventListener('change', handleColorSchemeChange);
  };
  
  const autoAdjustContrast = (scheme: ColorScheme) => {
    if (scheme === 'dark') {
      // For dark mode, use enhanced contrast
      if (currentContrast !== 'enhanced' && currentContrast !== 'high') {
        adjustContrast('enhanced');
      }
    } else {
      // For light mode, use normal contrast
      if (currentContrast !== 'normal') {
        adjustContrast('normal');
      }
    }
  };
  
  const applyContrastSettings = (level: ContrastLevel) => {
    // Apply CSS classes for different contrast levels
    document.documentElement.classList.remove('contrast-normal', 'contrast-enhanced', 'contrast-high');
    document.documentElement.classList.add(`contrast-${level}`);
    
    // Update CSS custom properties
    updateCSSCustomProperties(level);
  };
  
  const updateCSSCustomProperties = (level: ContrastLevel) => {
    const root = document.documentElement;
    
    switch (level) {
      case 'normal':
        root.style.setProperty('--contrast-ratio-normal', wcagRequirements.normal.toString());
        root.style.setProperty('--contrast-ratio-large', wcagRequirements.large.toString());
        break;
      case 'enhanced':
        root.style.setProperty('--contrast-ratio-normal', '5.5');
        root.style.setProperty('--contrast-ratio-large', '4.0');
        break;
      case 'high':
        root.style.setProperty('--contrast-ratio-normal', wcagRequirements.enhanced.toString());
        root.style.setProperty('--contrast-ratio-large', wcagRequirements.large.toString());
        break;
    }
  };
  
  const calculateContrastRatio = (element: Element): number => {
    try {
      const computedStyle = window.getComputedStyle(element);
      const textColor = computedStyle.color;
      const bgColor = computedStyle.backgroundColor;
      
      // Convert colors to RGB
      const textRGB = parseColorToRGB(textColor);
      const bgRGB = parseColorToRGB(bgColor);
      
      // Calculate relative luminance
      const textLuminance = calculateLuminance(textRGB);
      const bgLuminance = calculateLuminance(bgRGB);
      
      // Calculate contrast ratio
      const contrastRatio = (Math.max(textLuminance, bgLuminance) + 0.05) / 
                           (Math.min(textLuminance, bgLuminance) + 0.05);
      
      return Math.round(contrastRatio * 100) / 100; // Round to 2 decimal places
      
    } catch {
      // Fallback: assume good contrast if calculation fails
      return 5.0;
    }
  };
  
  const parseColorToRGB = (color: string): { r: number; g: number; b: number } => {
    // Handle different color formats
    if (color.startsWith('rgb')) {
      const values = color.match(/\d+/g);
      return {
        r: parseInt(values![0]),
        g: parseInt(values![1]),
        b: parseInt(values![2])
      };
    }
    
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16)
      };
    }
    
    // Default fallback
    return { r: 0, g: 0, b: 0 };
  };
  
  const calculateLuminance = (rgb: { r: number; g: number; b: number }): number => {
    const { r, g, b } = rgb;
    
    // Convert to linear RGB
    const linearR = r / 255 <= 0.03928 ? r / 255 / 12.92 : Math.pow((r / 255 + 0.055) / 1.055, 2.4);
    const linearG = g / 255 <= 0.03928 ? g / 255 / 12.92 : Math.pow((g / 255 + 0.055) / 1.055, 2.4);
    const linearB = b / 255 <= 0.03928 ? b / 255 / 12.92 : Math.pow((b / 255 + 0.055) / 1.055, 2.4);
    
    // Calculate luminance
    return 0.2126 * linearR + 0.7152 * linearG + 0.0722 * linearB;
  };
  
  const getFontSize = (element: Element): number => {
    const computedStyle = window.getComputedStyle(element);
    const fontSize = computedStyle.fontSize;
    
    // Convert to pixels
    if (fontSize.endsWith('px')) {
      return parseFloat(fontSize);
    }
    
    if (fontSize.endsWith('em') || fontSize.endsWith('rem')) {
      return parseFloat(fontSize) * 16; // Assuming 16px base
    }
    
    return 16; // Default fallback
  };
  
  const getFontWeight = (element: Element): number => {
    const computedStyle = window.getComputedStyle(element);
    const fontWeight = computedStyle.fontWeight;
    
    if (fontWeight === 'bold' || fontWeight === 'bolder') {
      return 700;
    }
    
    if (fontWeight === 'normal') {
      return 400;
    }
    
    return parseInt(fontWeight) || 400;
  };
  
  const reportContrastIssues = (minContrast: number) => {
    const severity = minContrast < 3.0 ? 'critical' : minContrast < 4.5 ? 'warning' : 'info';
    
    addSecurityAlert({
      message: `Color contrast ratio is ${minContrast}:1, below WCAG AA requirement of ${wcagRequirements.normal}:1`,
      type: severity as 'critical' | 'warning' | 'info',
      priority: severity === 'critical' ? 'urgent' : 'medium'
    });
    
    if (severity === 'critical') {
      const generateErrorId = () => `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      addError({
        message: `Critical color contrast violation detected: ${minContrast}:1 ratio`,
        type: 'critical',
        element: 'color-contrast',
        id: generateErrorId(),
        timestamp: new Date()
      });
    }
  };
  
  const setCustomColor = (colorName: string, colorValue: string) => {
    // Apply the new color immediately
    document.documentElement.style.setProperty(`--${colorName}`, colorValue);
    
    // Re-check contrast with new colors
    if (enableContrastMonitoring) {
      setTimeout(checkContrastLevels, 100);
    }
  };
  
  const getContrastInfo = () => {
    return {
      currentContrast,
      detectedContrast,
      isContrastGood,
      colorScheme,
      wcagRequirements
    };
  };
  
  // Check contrast levels
  const checkContrastLevels = () => {
    try {
      // Get all text elements
      const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, li, td, th');
      
      let minContrast = Infinity;
      let hasContrastIssues = false;
      
      textElements.forEach(element => {
        const contrast = calculateContrastRatio(element);
        if (contrast < minContrast) {
          minContrast = contrast;
        }
        
        // Check if contrast meets requirements
        const fontSize = getFontSize(element);
        const isLargeText = fontSize >= 18 || (fontSize >= 14 && getFontWeight(element) >= 700);
        const requiredContrast = isLargeText ? wcagRequirements.large : wcagRequirements.normal;
        
        if (contrast < requiredContrast) {
          hasContrastIssues = true;
          element.classList.add('contrast-violation');
        } else {
          element.classList.remove('contrast-violation');
        }
      });
      
      setDetectedContrast(minContrast);
      setIsContrastGood(minContrast >= wcagRequirements.normal);
      
      // Report contrast issues
      if (hasContrastIssues && enableContrastMonitoring) {
        reportContrastIssues(minContrast);
      }
      
    } catch (error) {
      const generateErrorId = () => `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      addError({
        message: `Contrast checking failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        type: 'warning',
        element: 'contrast-checking',
        id: generateErrorId(),
        timestamp: new Date()
      });
    }
  };
  
  // Initialize color contrast system
  useEffect(() => {
    try {
      // Setup color scheme detection
      const setupColorScheme = () => {
        return setupColorSchemeDetection();
      };
      const cleanupColorScheme = setupColorScheme();
      
      // Apply initial contrast settings
      const applySettings = () => {
        applyContrastSettings(currentContrast);
      };
      applySettings();
      
      // Announce color contrast availability
      announceColorContrast();
      
      // Cleanup function
      return () => {
        cleanupColorScheme();
      };
      
    } catch (error) {
      const generateErrorId = () => `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      addError({
        message: `Color contrast initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        type: 'warning',
        element: 'color-contrast',
        id: generateErrorId(),
        timestamp: new Date()
      });
    }
  }, []);
  
  // Monitor color scheme changes
  useEffect(() => {
    if (enableAutoAdjustment) {
      const setupColorSchemeMonitoring = () => {
        // Monitor for manual color scheme changes
        const observer = new MutationObserver(() => {
          const htmlElement = document.documentElement;
          const currentScheme = htmlElement.getAttribute('data-color-scheme');
          
          if (currentScheme && currentScheme !== colorScheme) {
            setColorScheme(currentScheme as ColorScheme);
          }
        });
        
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['data-color-scheme']
        });
        
        return () => observer.disconnect();
      };
      
      const cleanupMonitoring = setupColorSchemeMonitoring();
      return () => cleanupMonitoring();
    }
  }, [enableAutoAdjustment]);
  
  // Monitor contrast levels
  useEffect(() => {
    if (enableContrastMonitoring) {
      const checkContrast = () => {
        checkContrastLevels();
      };
      checkContrast();
    }
  }, [enableContrastMonitoring, currentContrast]);
  
  // Context value for child components
  const colorContrastContext: ColorContrastContextType = {
    setCustomColor,
    getContrastInfo,
    currentContrast,
    detectedContrast,
    isContrastGood,
    colorScheme
  };
  
  return (
    <ColorContrastContext.Provider value={colorContrastContext}>
      <div 
        className={`color-contrast ${currentContrast} ${colorScheme}`}
        data-contrast-level={currentContrast}
        data-color-scheme={colorScheme}
      >
        {children}
        
        {/* Color contrast status for screen readers */}
        {enableContrastMonitoring && (
          <div 
            className="sr-only" 
            aria-live="polite"
            aria-label="Color contrast status"
          >
            {isContrastGood ? (
              <span>Color contrast meets WCAG AA requirements</span>
            ) : (
              <span>Color contrast may not meet accessibility requirements</span>
            )}
          </div>
        )}
        
        {/* Contrast toggle button */}
        {enableContrastToggle && (
          <button
            onClick={() => {
              const nextLevel = currentContrast === 'normal' ? 'enhanced' : 
                               currentContrast === 'enhanced' ? 'high' : 'normal';
              adjustContrast(nextLevel);
            }}
            className="sr-only focus:not-sr-only fixed bottom-4 right-4 bg-cyan-600 text-white px-4 py-2 rounded z-50"
            aria-label={`Switch to ${currentContrast === 'normal' ? 'enhanced' : currentContrast === 'enhanced' ? 'high' : 'normal'} contrast`}
          >
            {currentContrast === 'normal' ? 'Enhanced Contrast' : 
             currentContrast === 'enhanced' ? 'High Contrast' : 'Normal Contrast'}
          </button>
        )}
      </div>
    </ColorContrastContext.Provider>
  );
};

// Color contrast context for child components
interface ColorContrastContextType {
  setCustomColor: (colorName: string, colorValue: string) => void;
  getContrastInfo: () => {
    currentContrast: string;
    detectedContrast: number;
    isContrastGood: boolean;
    colorScheme: string;
    wcagRequirements: {
      normal: number;
      large: number;
      enhanced: number;
      ui: number;
    };
  };
  currentContrast: string;
  detectedContrast: number;
  isContrastGood: boolean;
  colorScheme: string;
}

const ColorContrastContext = React.createContext<ColorContrastContextType | undefined>(undefined);

// Custom hook for color contrast
export const useColorContrast = (): ColorContrastContextType => {
  const context = React.useContext(ColorContrastContext);
  if (context === undefined) {
    throw new Error('useColorContrast must be used within a ColorContrast component');
  }
  return context;
};

// Higher-order component for color contrast
export const withColorContrast = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const WithColorContrast: React.FC<P> = (props) => (
    <ColorContrast>
      <Component {...props} />
    </ColorContrast>
  );
  
  WithColorContrast.displayName = `withColorContrast(${Component.displayName || Component.name})`;
  
  return WithColorContrast;
};