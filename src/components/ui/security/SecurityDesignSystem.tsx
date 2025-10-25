'use client';

import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SecurityIcons } from './SecurityIcons';
import { SecurityAnimations } from './SecurityAnimations';
import { SecurityBadges } from './SecurityBadges';

// Security Design System Context
interface SecurityContextType {
  theme: 'dark' | 'light';
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  animationPreferences: {
    enabled: boolean;
    reducedMotion: boolean;
    duration: number;
  };
  securityLevel: 'low' | 'medium' | 'high' | 'critical';
  updateTheme: (theme: 'dark' | 'light') => void;
  updateSecurityLevel: (level: 'low' | 'medium' | 'high' | 'critical') => void;
  toggleAnimations: () => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

// Security Design System Provider
export const SecurityDesignSystemProvider = ({
  children,
  initialTheme = 'dark' as const,
  initialSecurityLevel = 'medium' as const,
  enableAnimations = true,
}: {
  children: ReactNode;
  initialTheme?: 'dark' | 'light';
  initialSecurityLevel?: 'low' | 'medium' | 'high' | 'critical';
  enableAnimations?: boolean;
}) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(initialTheme);
  const [securityLevel, setSecurityLevel] = useState<'low' | 'medium' | 'high' | 'critical'>(initialSecurityLevel);
  const [animationsEnabled, setAnimationsEnabled] = useState(enableAnimations);

  const colorScheme = theme === 'dark' ? {
    primary: 'var(--electric-cyan-500)',
    secondary: 'var(--neon-green-500)',
    accent: 'var(--light-gray-50)',
    background: 'var(--deep-navy-800)',
    text: 'var(--light-gray-300)',
  } : {
    primary: '#0066CC',
    secondary: '#009900',
    accent: '#333333',
    background: '#F8FAFC',
    text: '#1F2937',
  };

  const animationPreferences = {
    enabled: animationsEnabled,
    reducedMotion: false, // Will be detected from user preferences
    duration: 0.3,
  };

  const updateTheme = (newTheme: 'dark' | 'light') => {
    setTheme(newTheme);
  };

  const updateSecurityLevel = (level: 'low' | 'medium' | 'high' | 'critical') => {
    setSecurityLevel(level);
  };

  const toggleAnimations = () => {
    setAnimationsEnabled(!animationsEnabled);
  };

  const contextValue: SecurityContextType = {
    theme,
    colorScheme,
    animationPreferences,
    securityLevel,
    updateTheme,
    updateSecurityLevel,
    toggleAnimations,
  };

  return (
    <SecurityContext.Provider value={contextValue}>
      <div className={`security-design-system theme-${theme} security-${securityLevel}`}>
        {children}
      </div>
    </SecurityContext.Provider>
  );
};

// Security Design System Component
export const SecurityDesignSystem = ({
  children,
  className = '',
  ...props
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <SecurityDesignSystemProvider>
      <div className={`security-system-container ${className}`} {...props}>
        {children}
      </div>
    </SecurityDesignSystemProvider>
  );
};

// Security Zone Component - Wraps sections with security context
export const SecurityZone = ({
  children,
  level = 'medium' as const,
  className = '',
  // animate prop is available for future use
}: {
  children: ReactNode;
  level?: 'low' | 'medium' | 'high' | 'critical';
  className?: string;
  animate?: boolean;
}) => {
  const context = useContext(SecurityContext);
  
  return (
    <div 
      className={`security-zone security-level-${level} ${className}`}
      data-security-level={level}
    >
      {children}
    </div>
  );
};

// Security Dashboard Component - Shows system status
export const SecurityDashboard = ({
  showStatus = true,
  showThreats = true,
  showCompliance = true,
  className = '',
}: {
  showStatus?: boolean;
  showThreats?: boolean;
  showCompliance?: boolean;
  className?: string;
}) => {
  const context = useContext(SecurityContext);
  
  if (!context) {
    throw new Error('SecurityDashboard must be used within SecurityDesignSystemProvider');
  }

  const { securityLevel, theme, colorScheme } = context;

  return (
    <div className={`security-dashboard p-6 rounded-lg border ${className}`} style={{
      borderColor: colorScheme.primary,
      background: theme === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(248, 250, 252, 0.9)',
    }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold" style={{ color: colorScheme.text }}>
          Security Dashboard
        </h3>
        <SecurityIcons.Shield 
          variant={securityLevel === 'critical' ? 'damaged' : 'active'}
          size="lg"
          color={securityLevel === 'critical' ? 'red' : 'cyan'}
          animate={true}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {showStatus && (
          <div className="security-status">
            <h4 className="font-medium mb-2" style={{ color: colorScheme.text }}>
              System Status
            </h4>
            <SecurityBadges.Status
              status={securityLevel === 'critical' ? 'critical' : securityLevel === 'high' ? 'warning' : 'secure'}
              size="md"
              animate={true}
            />
          </div>
        )}
        
        {showThreats && (
          <div className="threat-level">
            <h4 className="font-medium mb-2" style={{ color: colorScheme.text }}>
              Threat Level
            </h4>
            <SecurityBadges.ThreatLevel
              level={securityLevel}
              size="md"
              animate={true}
            />
          </div>
        )}
        
        {showCompliance && (
          <div className="compliance-status">
            <h4 className="font-medium mb-2" style={{ color: colorScheme.text }}>
              Compliance
            </h4>
            <div className="flex gap-2">
              <SecurityBadges.Compliance
                standard="gdpr"
                status="compliant"
                size="sm"
                animate={true}
              />
              <SecurityBadges.Compliance
                standard="iso27001"
                status="compliant"
                size="sm"
                animate={true}
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <SecurityAnimations.DataFlow
            direction="right"
            speed="normal"
            intensity="medium"
            color="cyan"
            animate={true}
            className="w-16 h-4"
          />
          <span className="text-sm" style={{ color: colorScheme.text }}>
            Monitoring active...
          </span>
        </div>
      </div>
    </div>
  );
};

// Security Alert Component - Shows security notifications
export const SecurityAlert = ({
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  className = '',
}: {
  type?: 'info' | 'success' | 'warning' | 'error' | 'critical';
  title: string;
  message: string;
  duration?: number;
  onClose?: () => void;
  className?: string;
}) => {
  const context = useContext(SecurityContext);
  
  if (!context) {
    throw new Error('SecurityAlert must be used within SecurityDesignSystemProvider');
  }

  const colorScheme = context?.colorScheme || {
    primary: 'var(--electric-cyan-500)',
    secondary: 'var(--neon-green-500)',
    accent: 'var(--light-gray-50)',
    background: 'var(--deep-navy-800)',
    text: 'var(--light-gray-300)',
  };
  const [isVisible, setIsVisible] = useState(true);

  // Auto-close after duration
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const alertStyles = {
    info: { bg: 'bg-electric-cyan-500/10', border: 'border-electric-cyan-500', text: 'text-electric-cyan-400' },
    success: { bg: 'bg-neon-green-500/10', border: 'border-neon-green-500', text: 'text-neon-green-400' },
    warning: { bg: 'bg-yellow-500/10', border: 'border-yellow-500', text: 'text-yellow-400' },
    error: { bg: 'bg-red-500/10', border: 'border-red-500', text: 'text-red-400' },
    critical: { bg: 'bg-red-600/15', border: 'border-red-600', text: 'text-red-600' },
  };

  const styles = alertStyles[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`security-alert p-4 rounded-lg border ${styles.bg} ${styles.border} ${className}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          style={{ color: colorScheme.text }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <SecurityIcons.Alert variant={type} size="md" color={type === 'critical' ? 'red' : 'cyan'} />
              <div>
                <h4 className="font-semibold" style={{ color: styles.text }}>{title}</h4>
                <p className="text-sm opacity-80" style={{ color: styles.text }}>{message}</p>
              </div>
            </div>
            {onClose && (
              <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-white">
                <SecurityIcons.Lock variant="default" size="sm" color="gray" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Security Context Hook
export const useSecurityContext = () => {
  const context = useContext(SecurityContext);
  
  if (!context) {
    throw new Error('useSecurityContext must be used within SecurityDesignSystemProvider');
  }
  
  return context;
};

// Export all components and utilities
export const SecuritySystem = {
  Provider: SecurityDesignSystemProvider,
  System: SecurityDesignSystem,
  Zone: SecurityZone,
  Dashboard: SecurityDashboard,
  Alert: SecurityAlert,
  useSecurityContext,
};

export default SecuritySystem;