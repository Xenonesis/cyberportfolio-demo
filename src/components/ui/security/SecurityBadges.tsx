'use client';

import { motion } from 'framer-motion';
import { SecurityIcons } from './SecurityIcons';

// Badge Configuration Types
export interface SecurityBadgeProps {
  type: 'status' | 'compliance' | 'threat' | 'encryption' | 'certification';
  variant?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'cyan' | 'neon-green' | 'white' | 'red' | 'yellow' | 'purple';
  className?: string;
  animate?: boolean;
  pulse?: boolean;
  showIcon?: boolean;
}

export interface StatusBadgeProps {
  status: 'online' | 'offline' | 'secure' | 'warning' | 'critical' | 'maintenance';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animate?: boolean;
}

export interface ComplianceBadgeProps {
  standard: 'gdpr' | 'iso27001' | 'soc2' | 'pciDss' | 'hipaa' | 'fedramp';
  status: 'compliant' | 'pending' | 'non-compliant' | 'audit-required';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animate?: boolean;
}

export interface ThreatLevelBadgeProps {
  level: 'low' | 'medium' | 'high' | 'critical' | 'imminent';
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animate?: boolean;
}

export interface EncryptionBadgeProps {
  level: 'basic' | 'standard' | 'advanced' | 'quantum';
  status: 'encrypted' | 'decrypted' | 'pending';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animate?: boolean;
}

// Status Badge Component
export const StatusBadge = ({
  status,
  label,
  size = 'md',
  className = '',
  animate = true,
}: StatusBadgeProps) => {
  const sizeConfig = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const statusConfig = {
    online: {
      bg: 'bg-neon-green-500/15',
      border: 'border-neon-green-500',
      text: 'text-neon-green-500',
      icon: '🟢',
      pulse: true,
    },
    offline: {
      bg: 'bg-gray-500/15',
      border: 'border-gray-500',
      text: 'text-gray-500',
      icon: '🔴',
      pulse: false,
    },
    secure: {
      bg: 'bg-electric-cyan-500/15',
      border: 'border-electric-cyan-500',
      text: 'text-electric-cyan-500',
      icon: '🔒',
      pulse: true,
    },
    warning: {
      bg: 'bg-yellow-500/15',
      border: 'border-yellow-500',
      text: 'text-yellow-500',
      icon: '⚠️',
      pulse: true,
    },
    critical: {
      bg: 'bg-red-500/15',
      border: 'border-red-500',
      text: 'text-red-500',
      icon: '🚨',
      pulse: true,
    },
    maintenance: {
      bg: 'bg-purple-500/15',
      border: 'border-purple-500',
      text: 'text-purple-500',
      icon: '🔧',
      pulse: false,
    },
  };

  const config = statusConfig[status];
  const animationVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      rotate: status === 'critical' ? [0, 5, -5, 0] : 0,
    },
  };

  const animationProps = animate ? {
    initial: animationVariants.initial,
    animate: animationVariants.animate,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
      repeat: config.pulse ? Infinity : 0,
      repeatType: 'reverse' as const,
    },
  } : {};

  return (
    <motion.div
      className={`${config.bg} ${config.border} rounded-full ${sizeConfig[size]} flex items-center gap-1 ${className} ${config.pulse ? 'animate-pulse' : ''}`}
      {...animationProps}
    >
      <span className="text-sm">{config.icon}</span>
      {label && (
        <span className={`${config.text} font-medium`}>
          {label}
        </span>
      )}
      {!label && (
        <span className={`${config.text} font-medium uppercase tracking-wider`}>
          {status}
        </span>
      )}
    </motion.div>
  );
};

// Compliance Badge Component
export const ComplianceBadge = ({
  standard,
  status,
  size = 'md',
  className = '',
  animate = true,
}: ComplianceBadgeProps) => {
  const sizeConfig = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const standardConfig = {
    gdpr: {
      name: 'GDPR',
      color: 'cyan',
      icon: '🇪🇺',
    },
    iso27001: {
      name: 'ISO 27001',
      color: 'neon-green',
      icon: '🛡️',
    },
    soc2: {
      name: 'SOC 2',
      color: 'cyan',
      icon: '🔒',
    },
    pciDss: {
      name: 'PCI DSS',
      color: 'yellow',
      icon: '💳',
    },
    hipaa: {
      name: 'HIPAA',
      color: 'purple',
      icon: '🏥',
    },
    fedramp: {
      name: 'FedRAMP',
      color: 'red',
      icon: '🇺🇸',
    },
  };

  const statusConfig = {
    compliant: {
      bg: 'bg-neon-green-500/15',
      border: 'border-neon-green-500',
      text: 'text-neon-green-500',
      pulse: false,
    },
    pending: {
      bg: 'bg-yellow-500/15',
      border: 'border-yellow-500',
      text: 'text-yellow-500',
      pulse: true,
    },
    'non-compliant': {
      bg: 'bg-red-500/15',
      border: 'border-red-500',
      text: 'text-red-500',
      pulse: false,
    },
    'audit-required': {
      bg: 'bg-purple-500/15',
      border: 'border-purple-500',
      text: 'text-purple-500',
      pulse: true,
    },
  };

  const standardInfo = standardConfig[standard];
  const statusInfo = statusConfig[status];
  const animationVariants = {
    initial: { scale: 0.8, opacity: 0, rotate: -10 },
    animate: { scale: 1, opacity: 1, rotate: 0 },
  };

  const animationProps = animate ? {
    initial: animationVariants.initial,
    animate: animationVariants.animate,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
      repeat: statusInfo.pulse ? Infinity : 0,
      repeatType: 'reverse' as const,
    },
  } : {};

  return (
    <motion.div
      className={`${statusInfo.bg} ${statusInfo.border} rounded-lg ${sizeConfig[size]} flex items-center gap-2 ${className} ${statusInfo.pulse ? 'animate-pulse' : ''}`}
      {...animationProps}
    >
      <span className="text-lg">{standardInfo.icon}</span>
      <div className="flex flex-col">
        <span className={`${statusInfo.text} font-semibold`}>
          {standardInfo.name}
        </span>
        <span className={`${statusInfo.text} text-xs uppercase tracking-wider opacity-70`}>
          {status}
        </span>
      </div>
    </motion.div>
  );
};

// Threat Level Badge Component
export const ThreatLevelBadge = ({
  level,
  title,
  description,
  size = 'md',
  className = '',
  animate = true,
}: ThreatLevelBadgeProps) => {
  const sizeConfig = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4',
  };

  const levelConfig = {
    low: {
      bg: 'bg-neon-green-500/10',
      border: 'border-neon-green-500',
      text: 'text-neon-green-500',
      icon: '🟢',
      glow: false,
    },
    medium: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500',
      text: 'text-yellow-500',
      icon: '🟡',
      glow: true,
    },
    high: {
      bg: 'bg-red-500/10',
      border: 'border-red-500',
      text: 'text-red-500',
      icon: '🟠',
      glow: true,
    },
    critical: {
      bg: 'bg-red-600/15',
      border: 'border-red-600',
      text: 'text-red-600',
      icon: '🔴',
      glow: true,
    },
    imminent: {
      bg: 'bg-purple-500/15',
      border: 'border-purple-500',
      text: 'text-purple-500',
      icon: '⚡',
      glow: true,
    },
  };

  const config = levelConfig[level];
  const animationVariants = {
    initial: { scale: 0.7, opacity: 0, y: 20 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
      rotate: level === 'imminent' ? [0, 15, -15, 0] : 0,
    },
  };

  const animationProps = animate ? {
    initial: animationVariants.initial,
    animate: animationVariants.animate,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      repeat: config.glow ? Infinity : 0,
      repeatType: 'reverse' as const,
    },
  } : {};

  return (
    <motion.div
      className={`${config.bg} ${config.border} rounded-lg ${sizeConfig[size]} ${className} ${config.glow ? 'animate-pulse' : ''}`}
      {...animationProps}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{config.icon}</span>
        <div>
          {title && (
            <h4 className={`${config.text} font-semibold flex items-center gap-2`}>
              {title}
              {level === 'imminent' && (
                <SecurityIcons.Alert 
                  variant="critical" 
                  size="sm" 
                  animate={true} 
                  pulse={true} 
                />
              )}
            </h4>
          )}
          {description && (
            <p className={`${config.text} text-sm opacity-80`}>{description}</p>
          )}
          {!title && !description && (
            <span className={`${config.text} font-medium uppercase tracking-wider`}>
              Threat Level: {level.toUpperCase()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Encryption Badge Component
export const EncryptionBadge = ({
  level,
  status,
  size = 'md',
  className = '',
  animate = true,
}: EncryptionBadgeProps) => {
  const sizeConfig = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const levelConfig = {
    basic: {
      name: 'Basic',
      color: 'gray',
      icon: '🔒',
    },
    standard: {
      name: 'Standard',
      color: 'cyan',
      icon: '🔐',
    },
    advanced: {
      name: 'Advanced',
      color: 'neon-green',
      icon: '🔒',
    },
    quantum: {
      name: 'Quantum',
      color: 'electric-cyan',
      icon: '🔐',
    },
  };

  const statusConfig = {
    encrypted: {
      bg: 'bg-neon-green-500/15',
      border: 'border-neon-green-500',
      text: 'text-neon-green-500',
      pulse: false,
    },
    decrypted: {
      bg: 'bg-red-500/15',
      border: 'border-red-500',
      text: 'text-red-500',
      pulse: false,
    },
    pending: {
      bg: 'bg-yellow-500/15',
      border: 'border-yellow-500',
      text: 'text-yellow-500',
      pulse: true,
    },
  };

  const levelInfo = levelConfig[level];
  const statusInfo = statusConfig[status];
  const animationVariants = {
    initial: { scale: 0.8, opacity: 0, rotate: 180 },
    animate: { scale: 1, opacity: 1, rotate: 0 },
  };

  const animationProps = animate ? {
    initial: animationVariants.initial,
    animate: animationVariants.animate,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
      repeat: statusInfo.pulse ? Infinity : 0,
      repeatType: 'reverse' as const,
    },
  } : {};

  return (
    <motion.div
      className={`${statusInfo.bg} ${statusInfo.border} rounded-full ${sizeConfig[size]} flex items-center gap-2 ${className} ${statusInfo.pulse ? 'animate-pulse' : ''}`}
      {...animationProps}
    >
      <SecurityIcons.Lock 
        variant={status === 'encrypted' ? 'locked' : 'unlocked'}
        size={size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'md'}
        color={levelInfo.color === 'electric-cyan' ? 'cyan' : (levelInfo.color as 'cyan' | 'neon-green' | 'white' | 'red' | 'yellow' | 'gray')}
        animate={animate}
        pulse={statusInfo.pulse}
      />
      <div className="flex flex-col">
        <span className={`${statusInfo.text} font-medium`}>
          {levelInfo.name}
        </span>
        <span className={`${statusInfo.text} text-xs uppercase tracking-wider opacity-70`}>
          {status}
        </span>
      </div>
    </motion.div>
  );
};

// Generic Security Badge Component
export const SecurityBadge = ({
  type,
  variant = 'default',
  label,
  size = 'md',
  color = 'cyan',
  className = '',
  animate = true,
  pulse = false,
  showIcon = true,
}: SecurityBadgeProps) => {
  const sizeConfig = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const colorConfig = {
    cyan: 'text-electric-cyan-500',
    'neon-green': 'text-neon-green-500',
    white: 'text-white',
    red: 'text-red-500',
    yellow: 'text-yellow-500',
    purple: 'text-purple-500',
  };

  // Type-specific configurations
  const typeConfig = {
    status: {
      bg: `${colorConfig[color]}/15`,
      border: `border-${colorConfig[color]}`,
      icon: showIcon ? '🔒' : '',
      pulse: pulse,
    },
    compliance: {
      bg: `${colorConfig[color]}/15`,
      border: `border-${colorConfig[color]}`,
      icon: showIcon ? '📋' : '',
      pulse: pulse,
    },
    threat: {
      bg: `${colorConfig[color]}/15`,
      border: `border-${colorConfig[color]}`,
      icon: showIcon ? '⚠️' : '',
      pulse: pulse,
    },
    encryption: {
      bg: `${colorConfig[color]}/15`,
      border: `border-${colorConfig[color]}`,
      icon: showIcon ? '🔐' : '',
      pulse: pulse,
    },
    certification: {
      bg: `${colorConfig[color]}/15`,
      border: `border-${colorConfig[color]}`,
      icon: showIcon ? '✅' : '',
      pulse: pulse,
    },
  };

  const config = typeConfig[type];
  const animationVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
  };

  const animationProps = animate ? {
    initial: animationVariants.initial,
    animate: animationVariants.animate,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
      repeat: config.pulse ? Infinity : 0,
      repeatType: 'reverse' as const,
    },
  } : {};

  return (
    <motion.div
      className={`${config.bg} ${config.border} border rounded-full ${sizeConfig[size]} flex items-center gap-1 ${className} ${config.pulse ? 'animate-pulse' : ''}`}
      {...animationProps}
    >
      {config.icon && <span className="text-sm">{config.icon}</span>}
      <span className={`${colorConfig[color]} font-medium`}>
        {label || `${type.toUpperCase()} ${variant.toUpperCase()}`}
      </span>
    </motion.div>
  );
};

// Export all security badges as a unified system
export const SecurityBadges = {
  Status: StatusBadge,
  Compliance: ComplianceBadge,
  ThreatLevel: ThreatLevelBadge,
  Encryption: EncryptionBadge,
  Generic: SecurityBadge,
};

export default SecurityBadges;