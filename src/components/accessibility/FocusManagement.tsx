'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useRef,
} from 'react';
import { useAccessibility } from './AccessibilityProvider';

interface FocusManagementContextType {
  currentFocusElement: string | null;
  focusHistory: string[];
  setFocusElement: (elementId: string | null) => void; // eslint-disable-line no-unused-vars
  focusNext: () => void;
  focusPrevious: () => void;
  focusFirst: () => void;
  focusLast: () => void;
  trapFocus: (container: HTMLElement, options?: FocusTrapOptions) => () => void; // eslint-disable-line no-unused-vars
  showFocusIndicators: boolean;
  toggleFocusIndicators: () => void;
  focusIndicatorStyle: 'default' | 'high-contrast' | 'custom';
  setFocusIndicatorStyle: (  
    style: 'default' | 'high-contrast' | 'custom'
  ) => void;
}

interface FocusTrapOptions {
  initialFocus?: string;
  returnFocus?: boolean;
  escapeDeactivates?: boolean;
  clickOutsideDeactivates?: boolean;
}

const FocusManagementContext = createContext<
  FocusManagementContextType | undefined
>(undefined);

interface FocusManagementProps {
  children: ReactNode;
  enableFocusIndicators?: boolean;
  enableFocusHistory?: boolean;
  enableKeyboardNavigation?: boolean;
  defaultIndicatorStyle?: 'default' | 'high-contrast' | 'custom';
}

export const FocusManagement: React.FC<FocusManagementProps> = ({
  children,
  enableFocusIndicators = true,
  enableFocusHistory = true,
  enableKeyboardNavigation = true,
  defaultIndicatorStyle = 'default',
}) => {
  const accessibilityContext = useAccessibility();
  const [currentFocusElement, setCurrentFocusElement] = useState<string | null>(
    null
  );
  const [focusHistory, setFocusHistory] = useState<string[]>([]);
  const [showFocusIndicators, setShowFocusIndicators] = useState(
    enableFocusIndicators
  );
  const [focusIndicatorStyle, setFocusIndicatorStyle] = useState<
    'default' | 'high-contrast' | 'custom'
  >(defaultIndicatorStyle);
  const focusTrapsRef = useRef<Map<string, () => void>>(new Map());

  // Update focus element and history
  const setFocusElement = (elementId: string | null) => {
    setCurrentFocusElement(elementId);

    if (elementId && enableFocusHistory) {
      setFocusHistory(prev => {
        const newHistory = [...prev, elementId];
        // Keep only last 20 focused elements
        return newHistory.slice(-20);
      });
    }

    // Update accessibility context
    accessibilityContext.setFocusedElement(elementId);
  };

  // Keyboard navigation functions
  const focusNext = () => {
    if (!enableKeyboardNavigation) return;

    const focusableElements = getFocusableElements();
    const currentIndex = focusableElements.findIndex(
      el => el.id === currentFocusElement
    );

    if (currentIndex >= 0 && currentIndex < focusableElements.length - 1) {
      const nextElement = focusableElements[currentIndex + 1];
      nextElement?.focus();
      setFocusElement(nextElement?.id || null);
    } else if (focusableElements.length > 0) {
      // Wrap to first element
      const firstElement = focusableElements[0];
      firstElement?.focus();
      setFocusElement(firstElement?.id || null);
    }
  };

  const focusPrevious = () => {
    if (!enableKeyboardNavigation) return;

    const focusableElements = getFocusableElements();
    const currentIndex = focusableElements.findIndex(
      el => el.id === currentFocusElement
    );

    if (currentIndex > 0) {
      const prevElement = focusableElements[currentIndex - 1];
      prevElement?.focus();
      setFocusElement(prevElement?.id || null);
    } else if (focusableElements.length > 0) {
      // Wrap to last element
      const lastElement = focusableElements[focusableElements.length - 1];
      lastElement?.focus();
      setFocusElement(lastElement?.id || null);
    }
  };

  const focusFirst = () => {
    if (!enableKeyboardNavigation) return;

    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      const firstElement = focusableElements[0];
      firstElement?.focus();
      setFocusElement(firstElement?.id || null);
    }
  };

  const focusLast = () => {
    if (!enableKeyboardNavigation) return;

    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      const lastElement = focusableElements[focusableElements.length - 1];
      lastElement?.focus();
      setFocusElement(lastElement?.id || null);
    }
  };

  // Get all focusable elements in the document
  const getFocusableElements = (): HTMLElement[] => {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ];

    return Array.from(
      document.querySelectorAll(focusableSelectors.join(', '))
    ).filter(el => {
      const element = el as HTMLElement;
      return (
        element.offsetWidth > 0 &&
        element.offsetHeight > 0 &&
        !element.hasAttribute('inert')
      );
    }) as HTMLElement[];
  };

  // Focus trap implementation
  const trapFocus = (
    container: HTMLElement,
    options: FocusTrapOptions = {}
  ): (() => void) => {
    const {
      initialFocus,
      returnFocus = true,
      escapeDeactivates = true,
      clickOutsideDeactivates = false,
    } = options;

    const focusableElements = Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter(el => {
      const element = el as HTMLElement;
      return element.offsetWidth > 0 && element.offsetHeight > 0;
    }) as HTMLElement[];

    if (focusableElements.length === 0) return () => {};

    // Set initial focus
    let initialFocusedElement: HTMLElement | null = null;
    if (initialFocus) {
      const element = container.querySelector(
        `#${initialFocus}`
      ) as HTMLElement;
      if (element && focusableElements.includes(element)) {
        element.focus();
        initialFocusedElement = element;
      }
    } else {
      focusableElements[0].focus();
      initialFocusedElement = focusableElements[0];
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      } else if (e.key === 'Escape' && escapeDeactivates) {
        e.preventDefault();
        deactivate();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (clickOutsideDeactivates && !container.contains(e.target as Node)) {
        deactivate();
      }
    };

    const deactivate = () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (clickOutsideDeactivates) {
        document.removeEventListener('click', handleClickOutside);
      }

      // Return focus to initial element if requested
      if (returnFocus && initialFocusedElement) {
        initialFocusedElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    if (clickOutsideDeactivates) {
      document.addEventListener('click', handleClickOutside);
    }

    const trapId = `focus-trap-${Date.now()}`;
    focusTrapsRef.current.set(trapId, deactivate);

    return () => {
      deactivate();
      focusTrapsRef.current.delete(trapId);
    };
  };

  const toggleFocusIndicators = () => {
    setShowFocusIndicators(!showFocusIndicators);
  };

  // No longer needed, styles are in globals.css
  useEffect(() => {
    // This is intentionally left blank.
  }, [showFocusIndicators, focusIndicatorStyle]);

  // Global focus event listener
  useEffect(() => {
    const handleFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      const elementId =
        target.id ||
        target.getAttribute('data-focus-id') ||
        `focus-${Date.now()}`;
      setFocusElement(elementId);
    };

    document.addEventListener('focus', handleFocus, true);
    return () => document.removeEventListener('focus', handleFocus, true);
  }, []);

  const contextValue: FocusManagementContextType = {
    currentFocusElement,
    focusHistory,
    setFocusElement,
    focusNext,
    focusPrevious,
    focusFirst,
    focusLast,
    trapFocus,
    showFocusIndicators,
    toggleFocusIndicators,
    focusIndicatorStyle,
    setFocusIndicatorStyle,
  };

  return (
    <FocusManagementContext.Provider value={contextValue}>
      <div
        className='focus-management-container'
        data-focus-indicators={showFocusIndicators}
        data-focus-style={focusIndicatorStyle}
      >
        {children}
      </div>
    </FocusManagementContext.Provider>
  );
};

export const useFocusManagement = (): FocusManagementContextType => {
  const context = useContext(FocusManagementContext);
  if (!context) {
    throw new Error(
      'useFocusManagement must be used within a FocusManagement provider'
    );
  }
  return context;
};

// Focus Indicator Toggle Component
interface FocusIndicatorToggleProps {
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const FocusIndicatorToggle: React.FC<FocusIndicatorToggleProps> = ({
  className = '',
  showLabel = true,
  size = 'md',
}) => {
  const {
    showFocusIndicators,
    toggleFocusIndicators,
    focusIndicatorStyle,
    setFocusIndicatorStyle,
  } = useFocusManagement();

  const buttonClasses = [
    'inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700',
    size === 'sm'
      ? 'px-2 py-1 text-sm'
      : size === 'lg'
        ? 'px-4 py-3 text-lg'
        : 'px-3 py-2 text-base',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className='flex items-center gap-2'>
      <button
        onClick={toggleFocusIndicators}
        className={buttonClasses}
        aria-pressed={showFocusIndicators}
        aria-label={
          showFocusIndicators
            ? 'Hide focus indicators'
            : 'Show focus indicators'
        }
        type='button'
      >
        <svg
          className={`h-4 w-4 ${showFocusIndicators ? 'text-blue-600' : 'text-gray-400'}`}
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          aria-hidden='true'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
          />
        </svg>
        {showLabel && (
          <span className='sr-only sm:not-sr-only'>
            {showFocusIndicators
              ? 'Hide Focus Indicators'
              : 'Show Focus Indicators'}
          </span>
        )}
      </button>

      {showFocusIndicators && (
        <select
          value={focusIndicatorStyle}
          onChange={e =>
            setFocusIndicatorStyle(
              e.target.value as 'default' | 'high-contrast' | 'custom'
            )
          }
          className='rounded-md border border-gray-300 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200'
          aria-label='Focus indicator style'
        >
          <option value='default'>Default</option>
          <option value='high-contrast'>High Contrast</option>
          <option value='custom'>Cyber Theme</option>
        </select>
      )}
    </div>
  );
};

// Skip Link Component
interface SkipLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export const SkipLink: React.FC<SkipLinkProps> = ({
  href,
  children,
  className = '',
}) => {
  return (
    <a
      href={href}
      className={`sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:shadow-lg ${className}`}
      onFocus={e => {
        // Ensure the link is visible when focused
        e.target.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      }}
    >
      {children}
    </a>
  );
};

// Focus Trap Hook
export const useFocusTrap = (
  containerRef: React.RefObject<HTMLElement>,
  options?: FocusTrapOptions
) => {
  const { trapFocus } = useFocusManagement();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive && containerRef.current) {
      const deactivate = trapFocus(containerRef.current, options);
      return deactivate;
    }
  }, [isActive, containerRef, trapFocus, options]);

  return {
    activate: () => setIsActive(true),
    deactivate: () => setIsActive(false),
    isActive,
  };
};

export default FocusManagement;
