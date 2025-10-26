'use client';

import { motion } from 'framer-motion';

// Security Status Indicator Component
interface SecurityStatusProps {
  status: 'online' | 'offline' | 'secure' | 'warning';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SecurityStatus = ({
  status,
  label,
  size = 'md',
  className = '',
}: SecurityStatusProps) => {
  const statusConfig = {
    online: {
      color: 'bg-neon-green-500',
      text: 'ONLINE',
      pulse: true,
    },
    offline: {
      color: 'bg-gray-500',
      text: 'OFFLINE',
      pulse: false,
    },
    secure: {
      color: 'bg-electric-cyan-500',
      text: 'SECURE',
      pulse: true,
    },
    warning: {
      color: 'bg-yellow-500',
      text: 'WARNING',
      pulse: true,
    },
  };

  const config = statusConfig[status];
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className={`rounded-full ${sizeClasses[size]} ${config.color} ${config.pulse ? 'animate-pulse' : ''}`}
      ></div>
      {label && (
        <span className='text-sm font-medium text-light-gray-300'>{label}</span>
      )}
      {!label && (
        <span className='text-xs font-medium text-light-gray-400'>
          {config.text}
        </span>
      )}
    </div>
  );
};

// Threat Level Indicator Component
interface ThreatLevelProps {
  level: 'low' | 'medium' | 'high' | 'critical';
  title?: string;
  description?: string;
  className?: string;
}

export const ThreatLevel = ({
  level,
  title,
  description,
  className = '',
}: ThreatLevelProps) => {
  const levelConfig = {
    low: {
      color: 'text-neon-green-500',
      bg: 'bg-neon-green-500/10',
      border: 'border-neon-green-500',
      icon: '🔒',
    },
    medium: {
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500',
      icon: '⚠️',
    },
    high: {
      color: 'text-red-500',
      bg: 'bg-red-500/10',
      border: 'border-red-500',
      icon: '🚨',
    },
    critical: {
      color: 'text-red-600',
      bg: 'bg-red-600/15 animate-pulse',
      border: 'border-red-600 animate-pulse',
      icon: '💀',
    },
  };

  const config = levelConfig[level];

  return (
    <div
      className={`p-4 rounded-lg border-2 ${config.border} ${config.bg} ${className}`}
    >
      <div className='flex items-center gap-3'>
        <span className='text-lg'>{config.icon}</span>
        <div>
          {title && (
            <h4 className={`font-semibold ${config.color}`}>{title}</h4>
          )}
          {description && (
            <p className='text-light-gray-400 text-sm'>{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Security Badge Component
interface SecurityBadgeProps {
  type: 'encrypted' | 'verified' | 'protected' | 'certified';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SecurityBadge = ({
  type,
  label,
  size = 'md',
  className = '',
}: SecurityBadgeProps) => {
  const badgeConfig = {
    encrypted: {
      bg: 'bg-electric-cyan-500/15',
      border: 'border-electric-cyan-500',
      text: 'ENCRYPTED',
      icon: '🔐',
    },
    verified: {
      bg: 'bg-neon-green-500/15',
      border: 'border-neon-green-500',
      text: 'VERIFIED',
      icon: '✅',
    },
    protected: {
      bg: 'bg-electric-cyan-500/15',
      border: 'border-electric-cyan-500',
      text: 'PROTECTED',
      icon: '🛡️',
    },
    certified: {
      bg: 'bg-neon-green-500/15',
      border: 'border-neon-green-500',
      text: 'CERTIFIED',
      icon: '📋',
    },
  };

  const config = badgeConfig[type];
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <div
      className={`${config.bg} ${config.border} rounded-md ${sizeClasses[size]} flex items-center gap-1 ${className} animate-shield-activate`}
    >
      <span>{config.icon}</span>
      <span className='font-medium text-electric-cyan-400'>
        {label || config.text}
      </span>
    </div>
  );
};

// Progress Bar with Security Scan Animation
interface SecurityProgressProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  variant?: 'standard' | 'scan';
  className?: string;
}

export const SecurityProgress = ({
  value,
  max = 100,
  label,
  showPercentage = true,
  variant = 'standard',
  className = '',
}: SecurityProgressProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const getProgressColor = () => {
    if (percentage < 30) return 'bg-red-500';
    if (percentage < 70) return 'bg-yellow-500';
    return 'bg-neon-green-500';
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className='flex justify-between items-center mb-2'>
          <span className='text-light-gray-300 font-medium'>{label}</span>
          {showPercentage && (
            <span className='text-electric-cyan-400 font-mono text-sm'>
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      <div className='w-full bg-deep-navy-600 rounded-full h-3 overflow-hidden'>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full ${getProgressColor()} rounded-full relative overflow-hidden`}
        >
          {variant === 'scan' && (
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan'></div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Circuit Pattern Background Component
interface CircuitPatternProps {
  size?: 'sm' | 'md' | 'lg';
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
  children?: React.ReactNode;
}

export const CircuitPattern = ({
  size = 'md',
  intensity = 'medium',
  className = '',
  children,
}: CircuitPatternProps) => {
  const sizeConfig = {
    sm: 'bg-[length:20px_20px] animate-cyber-grid',
    md: 'bg-[length:50px_50px] animate-cyber-grid',
    lg: 'bg-[length:100px_100px] animate-cyber-grid',
  };

  const intensityConfig = {
    low: 'opacity-20',
    medium: 'opacity-40',
    high: 'opacity-60',
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`absolute inset-0 ${sizeConfig[size]} ${intensityConfig[intensity]} circuit-pattern`}
      ></div>
      <div className='relative z-10'>{children}</div>
    </div>
  );
};

// Binary Rain Effect Component
interface BinaryRainProps {
  density?: 'low' | 'medium' | 'high';
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
  children?: React.ReactNode;
}

export const BinaryRain = ({
  density = 'medium',
  speed = 'normal',
  className = '',
  children,
}: BinaryRainProps) => {
  const densityConfig = {
    low: 'opacity-20',
    medium: 'opacity-40',
    high: 'opacity-60',
  };

  const speedConfig = {
    slow: 'animate-[binary-rain_40s_linear_infinite]',
    normal: 'animate-[binary-rain_20s_linear_infinite]',
    fast: 'animate-[binary-rain_10s_linear_infinite]',
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`absolute inset-0 ${densityConfig[density]} ${speedConfig[speed]} binary-texture pointer-events-none`}
      ></div>
      <div className='relative z-10'>{children}</div>
    </div>
  );
};

// Data Flow Animation Component
interface DataFlowProps {
  direction?: 'left' | 'right' | 'up' | 'down';
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
  children?: React.ReactNode;
}

export const DataFlow = ({
  direction = 'right',
  speed = 'normal',
  className = '',
  children,
}: DataFlowProps) => {
  const directionConfig = {
    left: 'animate-[data-flow_3s_ease-in-out_infinite]',
    right: 'animate-[data-flow_3s_ease-in-out_infinite]',
    up: 'animate-[data-flow_3s_ease-in-out_infinite]',
    down: 'animate-[data-flow_3s_ease-in-out_infinite]',
  };

  const speedConfig = {
    slow: 'duration-5000',
    normal: 'duration-3000',
    fast: 'duration-1500',
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`absolute inset-0 ${directionConfig[direction]} ${speedConfig[speed]} data-flow pointer-events-none`}
      ></div>
      <div className='relative z-10'>{children}</div>
    </div>
  );
};

// Security Alert Component
interface SecurityAlertProps {
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  showIcon?: boolean;
  className?: string;
}

export const SecurityAlert = ({
  type,
  title,
  message,
  showIcon = true,
  className = '',
}: SecurityAlertProps) => {
  const alertConfig = {
    info: {
      bg: 'bg-electric-cyan-500/10',
      border: 'border-electric-cyan-500',
      text: 'text-electric-cyan-400',
      icon: 'ℹ️',
    },
    success: {
      bg: 'bg-neon-green-500/10',
      border: 'border-neon-green-500',
      text: 'text-neon-green-400',
      icon: '✅',
    },
    warning: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500',
      text: 'text-yellow-400',
      icon: '⚠️',
    },
    error: {
      bg: 'bg-red-500/10',
      border: 'border-red-500',
      text: 'text-red-400',
      icon: '❌',
    },
  };

  const config = alertConfig[type];

  return (
    <div
      className={`${config.bg} ${config.border} border rounded-lg p-4 ${className}`}
    >
      <div className='flex items-start gap-3'>
        {showIcon && <span className='text-lg mt-0.5'>{config.icon}</span>}
        <div>
          <h4 className={`font-semibold ${config.text} mb-1`}>{title}</h4>
          <p className='text-light-gray-400 text-sm'>{message}</p>
        </div>
      </div>
    </div>
  );
};
