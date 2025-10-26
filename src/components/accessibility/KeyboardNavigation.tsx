'use client';

import React, { useEffect, useState, ReactNode, useRef } from 'react';
import { useAccessibility } from './AccessibilityProvider';

// Keyboard navigation component props
interface KeyboardNavigationProps {
  children: ReactNode;
  enableSkipLinks?: boolean;
  enableFocusTrapping?: boolean;
  enableKeyboardShortcuts?: boolean;
  enableTabOrder?: boolean;
}

// Keyboard navigation component
export const KeyboardNavigation: React.FC<KeyboardNavigationProps> = ({
  children,
  enableSkipLinks = true,
  enableFocusTrapping = true,
  enableKeyboardShortcuts = true,
  enableTabOrder = true,
}) => {
  const { isFocusVisible, addError, addSecurityAlert } = useAccessibility();

  // Focus management state
  const [currentFocus, setCurrentFocus] = useState<string | null>(null);
  const [focusHistory, setFocusHistory] = useState<string[]>([]);
  const [isTabbing, setIsTabbing] = useState(false);
  const [visibleFocus, setVisibleFocus] = useState(false);

  // Keyboard shortcuts
  const [shortcuts, setShortcuts] = useState<string[]>([]);

  // Focus traps
  const [focusTraps, setFocusTraps] = useState<Map<string, HTMLElement[]>>(
    new Map()
  );
  const [activeTrap, setActiveTrap] = useState<string | null>(null);

  // Refs for focus management
  const containerRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  // Function declarations moved to the top to avoid declaration order issues
  const announceKeyboardNavigation = () => {
    // Create ARIA live region for keyboard navigation announcements
    let liveRegion = document.getElementById('keyboard-navigation-live');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'keyboard-navigation-live';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      document.body.appendChild(liveRegion);
    }

    liveRegion.textContent =
      'Keyboard navigation is available. Press Ctrl+? for help.';
  };

  const setupSkipLinks = () => {
    // Create skip to main content link
    const skipMain = document.createElement('a');
    skipMain.href = '#main-content';
    skipMain.className =
      'skip-nav bg-cyan-600 text-white px-4 py-2 rounded z-50 fixed top-4 left-4';
    skipMain.textContent = 'Skip to main content';
    skipMain.setAttribute('aria-label', 'Skip to main content');

    // Add skip link to document
    document.body.appendChild(skipMain);

    // Handle skip link focus
    skipMain.addEventListener('focus', () => {
      skipMain.style.top = '4px';
    });

    skipMain.addEventListener('blur', () => {
      skipMain.style.top = '-9999px';
    });
  };

  const setupDefaultShortcuts = () => {
    const defaultShortcuts = [
      'Ctrl+K: Focus search field',
      'Ctrl+Enter: Submit form',
      'Ctrl+S: Toggle security panel',
      'Ctrl+?: Show help',
    ];

    setShortcuts(defaultShortcuts);
  };

  const setupTabOrder = () => {
    // Add tabindex to interactive elements that don't have it
    const interactiveElements = document.querySelectorAll(
      'button, a, input, select, textarea, [role="button"], [role="link"]'
    );

    interactiveElements.forEach(element => {
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '0');
      }
    });
  };

  const handleFocusIn = (event: FocusEvent) => {
    const target = event.target as HTMLElement;
    if (target.id || target.getAttribute('data-a11y-id')) {
      const elementId =
        target.id || target.getAttribute('data-a11y-id') || target.tagName;
      setCurrentFocus(elementId);
      setFocusHistory(prev => {
        const newHistory = [...prev, elementId];
        return newHistory.slice(-10); // Keep last 10 focused elements
      });

      lastFocusedElement.current = target;
      setVisibleFocus(true);
    }
  };

  const handleFocusOut = () => {
    setVisibleFocus(false);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    // Handle Tab key for focus visibility
    if (event.key === 'Tab') {
      setIsTabbing(true);
      setVisibleFocus(true);

      // Clear tabbing state after a short delay
      setTimeout(() => setIsTabbing(false), 100);
    }

    // Handle Escape key for focus traps
    if (event.key === 'Escape' && activeTrap) {
      event.preventDefault();
      releaseFocusTrap(activeTrap);
      return;
    }

    // Handle keyboard shortcuts
    if (enableKeyboardShortcuts) {
      handleKeyboardShortcuts(event);
    }

    // Handle focus trapping
    if (enableFocusTrapping && activeTrap) {
      handleFocusTrapping(event);
    }
  };

  const handleKeyboardShortcuts = (event: KeyboardEvent) => {
    // Simple shortcut handling
    if (event.ctrlKey && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      const searchInput = document.querySelector(
        'input[type="search"]'
      ) as HTMLElement;
      if (searchInput) {
        searchInput.focus();
        addSecurityAlert({
          message: 'Search field focused',
          type: 'info',
          priority: 'low',
        });
      }
    } else if (event.ctrlKey && event.key.toLowerCase() === '?') {
      event.preventDefault();
      showKeyboardShortcutsHelp();
    }
  };

  const handleFocusTrapping = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;

    const trap = focusTraps.get(activeTrap!);
    if (!trap) return;

    const elements = trap;
    const currentIndex = elements.indexOf(
      document.activeElement as HTMLElement
    );

    if (event.shiftKey) {
      // Shift + Tab: move to previous element
      event.preventDefault();
      const prevIndex =
        currentIndex <= 0 ? elements.length - 1 : currentIndex - 1;
      const prevElement = elements[prevIndex];
      if (prevElement) {
        prevElement.focus();
      }
    } else {
      // Tab: move to next element
      event.preventDefault();
      const nextIndex =
        currentIndex >= elements.length - 1 ? 0 : currentIndex + 1;
      const nextElement = elements[nextIndex];
      if (nextElement) {
        nextElement.focus();
      }
    }
  };

  const createFocusTrap = (id: string, elements?: HTMLElement[]): string => {
    const trapElements =
      elements ||
      (Array.from(
        document.querySelectorAll('[data-focus-trap]')
      ) as HTMLElement[]);

    if (trapElements.length === 0) {
      addError({
        message: 'No focusable elements found for focus trap',
        type: 'warning',
        element: 'focus-trap',
        id: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date(),
      });
      return '';
    }

    setFocusTraps(prev => new Map(prev.set(id, trapElements)));
    setActiveTrap(id);

    // Focus first element in trap
    trapElements[0]?.focus();

    return id;
  };

  const releaseFocusTrap = (id: string) => {
    const trap = focusTraps.get(id);
    if (trap) {
      setFocusTraps(prev => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });

      setActiveTrap(null);

      // Return focus to last focused element
      if (lastFocusedElement.current) {
        lastFocusedElement.current.focus();
      }
    }
  };

  const showKeyboardShortcutsHelp = () => {
    const helpContent = `
      Keyboard Shortcuts:
      ${shortcuts.join(', ')}
      
      Navigation:
      Tab - Move to next focusable element
      Shift + Tab - Move to previous focusable element
      Escape - Exit focus traps
    `;

    alert(helpContent);
  };

  const getFocusInfo = () => {
    return {
      currentFocus,
      focusHistory,
      isTabbing,
      visibleFocus,
      activeTrap,
      shortcutCount: shortcuts.length,
    };
  };

  // Initialize keyboard navigation
  useEffect(() => {
    try {
      // Setup skip links
      if (enableSkipLinks) {
        setupSkipLinks();
      }

      // Setup default keyboard shortcuts
      if (enableKeyboardShortcuts) {
        const setupShortcuts = () => {
          setupDefaultShortcuts();
        };
        setupShortcuts();
      }

      // Setup tab order
      if (enableTabOrder) {
        setupTabOrder();
      }

      // Announce keyboard navigation availability
      announceKeyboardNavigation();
    } catch (error) {
      const generateErrorId = () =>
        `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      addError({
        message: `Keyboard navigation initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        type: 'warning',
        element: 'keyboard-navigation',
        id: generateErrorId(),
        timestamp: new Date(),
      });
    }
  }, []);

  // Handle focus events
  useEffect(() => {
    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  // Handle keyboard events
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeTrap, enableKeyboardShortcuts, enableFocusTrapping]);

  // Context value for child components
  const keyboardContext: KeyboardNavigationContextType = {
    createFocusTrap,
    releaseFocusTrap,
    getFocusInfo,
    isFocusVisible: visibleFocus || isFocusVisible,
    currentFocus,
    focusHistory,
  };

  return (
    <KeyboardNavigationContext.Provider value={keyboardContext}>
      <div
        ref={containerRef}
        className={`keyboard-navigation ${isTabbing ? 'keyboard-tabbing' : ''}`}
        data-a11y-focus={currentFocus}
      >
        {children}

        {/* Keyboard navigation status for screen readers */}
        <div
          className='sr-only'
          aria-live='polite'
          aria-label='Keyboard navigation status'
        >
          {visibleFocus && currentFocus && (
            <span>Currently focused on {currentFocus}</span>
          )}
          {activeTrap && <span>Focus trap active: {activeTrap}</span>}
        </div>
      </div>
    </KeyboardNavigationContext.Provider>
  );
};

// Keyboard navigation context for child components
interface KeyboardNavigationContextType {
  createFocusTrap: (id: string, elements?: HTMLElement[]) => string;
  releaseFocusTrap: (id: string) => void;
  getFocusInfo: () => {
    currentFocus: string | null;
    focusHistory: string[];
    isTabbing: boolean;
    visibleFocus: boolean;
    activeTrap: string | null;
    shortcutCount: number;
  };
  isFocusVisible: boolean;
  currentFocus: string | null;
  focusHistory: string[];
}

const KeyboardNavigationContext = React.createContext<
  KeyboardNavigationContextType | undefined
>(undefined);

// Custom hook for keyboard navigation
export const useKeyboardNavigation = (): KeyboardNavigationContextType => {
  const context = React.useContext(KeyboardNavigationContext);
  if (context === undefined) {
    throw new Error(
      'useKeyboardNavigation must be used within a KeyboardNavigation component'
    );
  }
  return context;
};

// Higher-order component for keyboard navigation
export const withKeyboardNavigation = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const WithKeyboardNavigation: React.FC<P> = props => (
    <KeyboardNavigation>
      <Component {...props} />
    </KeyboardNavigation>
  );

  WithKeyboardNavigation.displayName = `withKeyboardNavigation(${Component.displayName || Component.name})`;

  return WithKeyboardNavigation;
};
