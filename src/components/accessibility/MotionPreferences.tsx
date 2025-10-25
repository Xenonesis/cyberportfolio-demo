"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAccessibility } from './AccessibilityProvider';

interface MotionPreferencesContextType {
  reducedMotion: boolean;
  prefersReducedMotion: boolean;
  animationEnabled: boolean;
  toggleReducedMotion: () => void;
  setAnimationEnabled: (enabled: boolean) => void;
  getAnimationClass: (baseClass: string, animatedClass?: string) => string;
  getTransitionClass: (baseClass: string, transitionClass?: string) => string;
}

const MotionPreferencesContext = createContext<MotionPreferencesContextType | undefined>(undefined);

interface MotionPreferencesProps {
  children: ReactNode;
  enableAnimationControl?: boolean;
  enableMotionToggle?: boolean;
}

export const MotionPreferences: React.FC<MotionPreferencesProps> = ({
  children,
  enableAnimationControl = true,
  enableMotionToggle = true,
}) => {
  const accessibilityContext = useAccessibility();
  const [reducedMotion, setReducedMotion] = useState(false);

  // Compute animation enabled state based on preferences
  const shouldReduceMotion = reducedMotion || accessibilityContext.prefersReducedMotion;
  const animationEnabled = !shouldReduceMotion;

  const toggleReducedMotion = () => {
    const newReducedMotion = !reducedMotion;
    setReducedMotion(newReducedMotion);

    // Add security alert for motion preference change
    accessibilityContext.addSecurityAlert({
      message: newReducedMotion
        ? 'Reduced motion enabled for accessibility'
        : 'Standard motion enabled',
      type: 'info',
      priority: 'low'
    });
  };

  const getAnimationClass = (baseClass: string, animatedClass?: string): string => {
    if (!enableAnimationControl || !animationEnabled) {
      return baseClass;
    }
    return animatedClass ? `${baseClass} ${animatedClass}` : baseClass;
  };

  const getTransitionClass = (baseClass: string, transitionClass?: string): string => {
    if (!enableAnimationControl || !animationEnabled) {
      return baseClass;
    }
    return transitionClass ? `${baseClass} ${transitionClass}` : baseClass;
  };

  const contextValue: MotionPreferencesContextType = {
    reducedMotion: reducedMotion || accessibilityContext.prefersReducedMotion,
    prefersReducedMotion: accessibilityContext.prefersReducedMotion,
    animationEnabled,
    toggleReducedMotion,
    setAnimationEnabled: () => {}, // Not used in this implementation
    getAnimationClass,
    getTransitionClass,
  };

  return (
    <MotionPreferencesContext.Provider value={contextValue}>
      <div
        className={getAnimationClass('motion-preferences-container')}
        data-reduced-motion={reducedMotion || accessibilityContext.prefersReducedMotion}
        data-animation-enabled={animationEnabled}
        aria-label={reducedMotion || accessibilityContext.prefersReducedMotion ? 'Motion reduced for accessibility' : undefined}
      >
        {children}
      </div>
    </MotionPreferencesContext.Provider>
  );
};

export const useMotionPreferences = (): MotionPreferencesContextType => {
  const context = useContext(MotionPreferencesContext);
  if (!context) {
    throw new Error('useMotionPreferences must be used within a MotionPreferences provider');
  }
  return context;
};

// Motion Toggle Button Component
interface MotionToggleButtonProps {
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const MotionToggleButton: React.FC<MotionToggleButtonProps> = ({
  className = '',
  showLabel = true,
  size = 'md',
}) => {
  const { reducedMotion, toggleReducedMotion } = useMotionPreferences();

  let sizeClass = 'px-3 py-2 text-base'; // default md
  if (size === 'sm') {
    sizeClass = 'px-2 py-1 text-sm';
  } else if (size === 'lg') {
    sizeClass = 'px-4 py-3 text-lg';
  }

  const buttonClasses = [
    'inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700',
    sizeClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      onClick={toggleReducedMotion}
      className={buttonClasses}
      aria-pressed={reducedMotion}
      aria-label={reducedMotion ? 'Disable reduced motion' : 'Enable reduced motion'}
      type="button"
    >
      <svg
        className={`h-4 w-4 ${reducedMotion ? 'text-blue-600' : 'text-gray-400'}`}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        aria-hidden="true"
      >
        {reducedMotion ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        )}
      </svg>
      {showLabel && (
        <span className="sr-only sm:not-sr-only">
          {reducedMotion ? 'Disable Reduced Motion' : 'Enable Reduced Motion'}
        </span>
      )}
    </button>
  );
};

// Animated Wrapper Component
interface AnimatedWrapperProps {
  children: ReactNode;
  animationClass?: string;
  transitionClass?: string;
  baseClass?: string;
  disabled?: boolean;
}

export const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  children,
  animationClass,
  transitionClass,
  baseClass = '',
  disabled = false,
}) => {
  const { getAnimationClass, getTransitionClass } = useMotionPreferences();

  if (disabled) {
    return <div className={baseClass}>{children}</div>;
  }

  const finalClass = getAnimationClass(
    getTransitionClass(baseClass, transitionClass),
    animationClass
  );

  return <div className={finalClass}>{children}</div>;
};

// Hook for conditional animations
export const useConditionalAnimation = () => {
  const { animationEnabled, reducedMotion } = useMotionPreferences();

  return {
    shouldAnimate: animationEnabled,
    reducedMotion,
    animationClass: (animated: string, fallback: string = '') =>
      animationEnabled ? animated : fallback,
    transitionClass: (transition: string, fallback: string = '') =>
      animationEnabled ? transition : fallback,
  };
};

export default MotionPreferences;