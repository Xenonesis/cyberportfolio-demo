'use client';

import { motion } from 'framer-motion';

// Security Icon Types
export interface SecurityIconProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: string;
  color?: 'cyan' | 'neon-green' | 'white' | 'gray' | 'red' | 'yellow';
  className?: string;
  animate?: boolean;
  pulse?: boolean;
  duration?: number;
}

// Lock Icon Variants
export interface LockIconProps extends SecurityIconProps {
  variant?:
    | 'default'
    | 'open'
    | 'locked'
    | 'unlocked'
    | 'breach'
    | 'encrypted'
    | 'biometric';
}

// Shield Icon Variants
export interface ShieldIconProps extends SecurityIconProps {
  variant?:
    | 'default'
    | 'active'
    | 'inactive'
    | 'damaged'
    | 'multi-layer'
    | 'quantum'
    | 'firewall';
}

// Circuit Icon Variants
export interface CircuitIconProps extends SecurityIconProps {
  variant?: 'static' | 'flowing' | 'pulsing' | 'network' | 'quantum' | 'mesh';
}

// Binary Icon Variants
export interface BinaryIconProps extends SecurityIconProps {
  variant?: 'rain' | 'stream' | 'matrix' | 'code' | 'data';
}

// Alert Icon Variants
export interface AlertIconProps extends SecurityIconProps {
  variant?: 'info' | 'success' | 'warning' | 'error' | 'critical' | 'threat';
}

// Comprehensive Lock Icon System
export const LockIcon = ({
  size = 'md',
  variant = 'default',
  color = 'cyan',
  className = '',
  animate = false,
  pulse = false,
  duration = 0.5,
}: LockIconProps) => {
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20',
  };

  const colorClasses = {
    cyan: 'text-electric-cyan-500',
    'neon-green': 'text-neon-green-500',
    white: 'text-white',
    gray: 'text-gray-500',
    red: 'text-red-500',
    yellow: 'text-yellow-500',
  };

  const baseClasses = `${sizeClasses[size]} ${colorClasses[color]} ${className}`;

  // Different lock animations and styles
  const lockVariants = {
    default: {},
    open: {
      rotate: [0, 15, -15, 0],
      scale: [1, 1.1, 1],
    },
    locked: {
      scale: [1, 1.2, 1],
      rotate: [0, 5, -5, 0],
    },
    unlocked: {
      scale: [1, 0.9, 1],
      rotate: [0, -10, 10, 0],
    },
    breach: {
      scale: [1, 1.3, 1],
      rotate: [0, 20, -20, 0],
      x: [0, 10, -10, 0],
      y: [0, 5, -5, 0],
    },
    encrypted: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.8, 1],
      filter: ['hue-rotate(0deg)', 'hue-rotate(180deg)', 'hue-rotate(360deg)'],
    },
    biometric: {
      scale: [1, 1.05, 1],
      rotate: [0, 2, -2, 0],
      pulse: [1, 1.1, 1],
    },
  };

  const animationProps = animate
    ? {
        animate: lockVariants[variant],
        transition: {
          duration,
          repeat: pulse ? Infinity : 0,
          ease: 'easeInOut',
        },
      }
    : {};

  return (
    <motion.div className={baseClasses} {...animationProps}>
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='w-full h-full'
      >
        {/* Standard lock body */}
        <rect x='3' y='11' width='18' height='11' rx='2' ry='2' />

        {/* Lock shackle */}
        <path d='M7 11V7a5 5 0 0 1 10 0v4' />

        {/* Lock hole and variants */}
        {variant === 'open' || variant === 'unlocked' ? (
          <circle cx='12' cy='16' r='1' fill='currentColor' />
        ) : variant === 'breach' ? (
          <>
            <circle cx='12' cy='16' r='1' fill='currentColor' />
            <line
              x1='10'
              y1='14'
              x2='14'
              y2='18'
              stroke='currentColor'
              strokeWidth='2'
            />
            <line
              x1='14'
              y1='14'
              x2='10'
              y2='18'
              stroke='currentColor'
              strokeWidth='2'
            />
          </>
        ) : variant === 'encrypted' ? (
          <>
            <circle cx='12' cy='16' r='1' />
            <path d='M12 14v4' stroke='currentColor' strokeWidth='1' />
            <path d='M10 16h4' stroke='currentColor' strokeWidth='1' />
          </>
        ) : variant === 'biometric' ? (
          <>
            <circle cx='12' cy='16' r='2' fill='currentColor' opacity='0.3' />
            <circle cx='12' cy='16' r='0.5' fill='currentColor' />
          </>
        ) : (
          <circle cx='12' cy='16' r='1' />
        )}
      </svg>
    </motion.div>
  );
};

// Enhanced Shield Icon System
export const ShieldIcon = ({
  size = 'md',
  variant = 'default',
  color = 'cyan',
  className = '',
  animate = false,
  pulse = false,
  duration = 0.6,
}: ShieldIconProps) => {
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20',
  };

  const colorClasses = {
    cyan: 'text-electric-cyan-500',
    'neon-green': 'text-neon-green-500',
    white: 'text-white',
    gray: 'text-gray-500',
    red: 'text-red-500',
    yellow: 'text-yellow-500',
  };

  const baseClasses = `${sizeClasses[size]} ${colorClasses[color]} ${className}`;

  // Shield animation variants
  const shieldVariants = {
    default: {},
    active: {
      scale: [1, 1.2, 1],
      rotate: [0, 5, -5, 0],
      opacity: [1, 0.9, 1],
    },
    inactive: { opacity: 0.3 },
    damaged: {
      rotate: [0, 3, -3, 0],
      scale: [1, 0.9, 1],
      x: [0, 5, -5, 0],
    },
    'multi-layer': {
      scale: [1, 1.1, 1],
      opacity: [1, 0.8, 1],
      filter: ['hue-rotate(0deg)', 'hue-rotate(120deg)', 'hue-rotate(240deg)'],
    },
    quantum: {
      scale: [1, 1.15, 1],
      rotate: [0, 10, -10, 0],
      opacity: [0.7, 1, 0.7],
      pulse: [1, 1.2, 1],
    },
    firewall: {
      scale: [1, 1.05, 1],
      x: [0, 8, -8, 0],
      y: [0, 3, -3, 0],
      opacity: [1, 0.9, 1],
    },
  };

  const animationProps = animate
    ? {
        animate: shieldVariants[variant],
        transition: {
          duration,
          repeat: pulse ? Infinity : 0,
          ease: 'easeInOut',
        },
      }
    : {};

  return (
    <motion.div className={baseClasses} {...animationProps}>
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='w-full h-full'
      >
        {/* Shield body */}
        <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />

        {/* Shield variants */}
        {variant === 'active' && (
          <circle cx='12' cy='12' r='3' fill='currentColor' opacity='0.3' />
        )}

        {variant === 'damaged' && (
          <>
            <line
              x1='9'
              y1='9'
              x2='15'
              y2='15'
              stroke='currentColor'
              strokeWidth='2'
            />
            <line
              x1='15'
              y1='9'
              x2='9'
              y2='15'
              stroke='currentColor'
              strokeWidth='2'
            />
          </>
        )}

        {variant === 'multi-layer' && (
          <>
            <path
              d='M12 8v8M8 12h8'
              stroke='currentColor'
              strokeWidth='1'
              opacity='0.6'
            />
            <circle
              cx='12'
              cy='12'
              r='2'
              stroke='currentColor'
              strokeWidth='1'
              opacity='0.4'
            />
          </>
        )}

        {variant === 'quantum' && (
          <>
            <path d='M12 8v8' stroke='currentColor' strokeWidth='2' />
            <circle
              cx='12'
              cy='12'
              r='4'
              stroke='currentColor'
              strokeWidth='1'
              opacity='0.2'
            />
            <circle cx='12' cy='12' r='1' fill='currentColor' />
          </>
        )}

        {variant === 'firewall' && (
          <>
            <rect
              x='8'
              y='8'
              width='8'
              height='8'
              stroke='currentColor'
              strokeWidth='1'
              opacity='0.7'
            />
            <line
              x1='12'
              y1='8'
              x2='12'
              y2='16'
              stroke='currentColor'
              strokeWidth='1'
            />
            <line
              x1='8'
              y1='12'
              x2='16'
              y2='12'
              stroke='currentColor'
              strokeWidth='1'
            />
          </>
        )}

        {variant === 'default' && (
          <path d='M12 8v8M8 12h8' stroke='currentColor' strokeWidth='1.5' />
        )}
      </svg>
    </motion.div>
  );
};

// Circuit Pattern Icon System
export const CircuitIcon = ({
  size = 'md',
  variant = 'static',
  color = 'cyan',
  className = '',
  animate = false,
  pulse = false,
  duration = 2,
}: CircuitIconProps) => {
  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
    '2xl': 'w-40 h-40',
  };

  const colorClasses = {
    cyan: 'text-electric-cyan-500',
    'neon-green': 'text-neon-green-500',
    white: 'text-white',
    gray: 'text-gray-500',
    red: 'text-red-500',
    yellow: 'text-yellow-500',
  };

  const baseClasses = `${sizeClasses[size]} ${colorClasses[color]} ${className}`;

  // Circuit animation variants
  const circuitVariants = {
    static: {},
    flowing: {
      pathLength: [0, 1],
      opacity: [0, 1, 0],
      rotate: [0, 5, -5, 0],
    },
    pulsing: {
      scale: [1, 1.1, 1],
      opacity: [0.5, 1, 0.5],
      pulse: [1, 1.2, 1],
    },
    network: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(180deg)'],
    },
    quantum: {
      scale: [1, 1.1, 1],
      rotate: [0, 15, -15, 0],
      opacity: [0.6, 1, 0.6],
      x: [0, 10, -10, 0],
      y: [0, 5, -5, 0],
    },
    mesh: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      pulse: [1, 1.1, 1],
    },
  };

  const animationProps = animate
    ? {
        animate: circuitVariants[variant],
        transition: {
          duration,
          repeat: pulse ? Infinity : 0,
          ease: 'easeInOut',
        },
      }
    : {};

  return (
    <motion.div className={baseClasses} {...animationProps}>
      <svg
        viewBox='0 0 100 100'
        fill='none'
        stroke='currentColor'
        strokeWidth='1'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='w-full h-full'
      >
        {/* Circuit board pattern */}
        <defs>
          <pattern
            id='circuit-grid'
            width='10'
            height='10'
            patternUnits='userSpaceOnUse'
          >
            <path
              d='M 5 0 L 5 10 M 0 5 L 10 5'
              stroke='currentColor'
              strokeWidth='0.5'
              opacity='0.3'
            />
          </pattern>
          <pattern
            id='quantum-grid'
            width='8'
            height='8'
            patternUnits='userSpaceOnUse'
          >
            <circle
              cx='4'
              cy='4'
              r='1'
              stroke='currentColor'
              strokeWidth='0.3'
              opacity='0.4'
            />
            <path
              d='M 2 2 L 6 6 M 6 2 L 2 6'
              stroke='currentColor'
              strokeWidth='0.3'
              opacity='0.4'
            />
          </pattern>
        </defs>

        {/* Background grid */}
        <rect
          width='100'
          height='100'
          fill={
            variant === 'quantum' ? 'url(#quantum-grid)' : 'url(#circuit-grid)'
          }
        />

        {/* Main circuit traces */}
        <path
          d='M 10 10 L 90 10 L 90 90 L 10 90 L 10 10'
          stroke='currentColor'
          strokeWidth='2'
        />
        <path
          d='M 25 25 L 75 25 L 75 75 L 25 75 L 25 25'
          stroke='currentColor'
          strokeWidth='1.5'
        />
        <path
          d='M 40 40 L 60 40 L 60 60 L 40 60 L 40 40'
          stroke='currentColor'
          strokeWidth='1'
        />

        {/* Circuit nodes/dots */}
        <circle cx='10' cy='10' r='2' fill='currentColor' />
        <circle cx='90' cy='10' r='2' fill='currentColor' />
        <circle cx='90' cy='90' r='2' fill='currentColor' />
        <circle cx='10' cy='90' r='2' fill='currentColor' />
        <circle cx='50' cy='50' r='3' fill='currentColor' />

        {/* Variant-specific elements */}
        {variant === 'network' && (
          <>
            <path
              d='M 30 30 L 70 70'
              stroke='currentColor'
              strokeWidth='1.5'
              opacity='0.6'
            />
            <path
              d='M 70 30 L 30 70'
              stroke='currentColor'
              strokeWidth='1.5'
              opacity='0.6'
            />
            <circle
              cx='50'
              cy='50'
              r='4'
              stroke='currentColor'
              strokeWidth='1'
              opacity='0.4'
            />
          </>
        )}

        {variant === 'quantum' && (
          <>
            <path
              d='M 20 50 L 80 50'
              stroke='currentColor'
              strokeWidth='2'
              opacity='0.7'
            />
            <path
              d='M 50 20 L 50 80'
              stroke='currentColor'
              strokeWidth='2'
              opacity='0.7'
            />
            <circle
              cx='50'
              cy='50'
              r='5'
              stroke='currentColor'
              strokeWidth='1'
              opacity='0.3'
            />
            <circle cx='50' cy='50' r='1' fill='currentColor' />
          </>
        )}

        {variant === 'mesh' && (
          <>
            <path
              d='M 15 50 L 85 50'
              stroke='currentColor'
              strokeWidth='1'
              opacity='0.5'
            />
            <path
              d='M 50 15 L 50 85'
              stroke='currentColor'
              strokeWidth='1'
              opacity='0.5'
            />
            <path
              d='M 25 25 L 75 75'
              stroke='currentColor'
              strokeWidth='1'
              opacity='0.4'
            />
            <path
              d='M 75 25 L 25 75'
              stroke='currentColor'
              strokeWidth='1'
              opacity='0.4'
            />
          </>
        )}

        {/* Flowing effect */}
        {variant === 'flowing' && animate && (
          <motion.path
            d='M 10 10 L 90 10'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration, repeat: Infinity }}
            fill='none'
          />
        )}
      </svg>
    </motion.div>
  );
};

// Binary Code Icon System
export const BinaryIcon = ({
  size = 'md',
  variant = 'rain',
  color = 'cyan',
  className = '',
  animate = false,
  pulse = false,
  duration = 3,
}: BinaryIconProps) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
    '2xl': 'w-24 h-24',
  };

  const colorClasses = {
    cyan: 'text-electric-cyan-500',
    'neon-green': 'text-neon-green-500',
    white: 'text-white',
    gray: 'text-gray-500',
    red: 'text-red-500',
    yellow: 'text-yellow-500',
  };

  const baseClasses = `${sizeClasses[size]} ${colorClasses[color]} ${className}`;

  // Binary animation variants
  const binaryVariants = {
    rain: {
      y: [0, '100%'],
      opacity: [0, 1, 0],
      scale: [0.8, 1, 0.8],
    },
    stream: {
      x: ['-100%', '100%'],
      opacity: [0, 1, 0],
      rotate: [0, 5, -5, 0],
    },
    matrix: {
      y: [0, '200%'],
      opacity: [0, 1, 0],
      scale: [0.5, 1, 0.5],
      filter: ['hue-rotate(0deg)', 'hue-rotate(180deg)', 'hue-rotate(360deg)'],
    },
    code: {
      scale: [0.9, 1.1, 0.9],
      opacity: [0.7, 1, 0.7],
      pulse: [1, 1.2, 1],
    },
    data: {
      x: [0, '50%', 0],
      y: [0, '-50%', 0],
      opacity: [0.5, 1, 0.5],
      rotate: [0, 10, -10, 0],
    },
  };

  const animationProps = animate
    ? {
        animate: binaryVariants[variant],
        transition: {
          duration,
          repeat: pulse ? Infinity : 1,
          ease: 'linear',
        },
      }
    : {};

  return (
    <motion.div className={baseClasses} {...animationProps}>
      <svg
        viewBox='0 0 100 100'
        fill='none'
        stroke='currentColor'
        strokeWidth='1'
        className='w-full h-full'
      >
        {/* Binary code patterns */}
        {variant === 'rain' && (
          <>
            <text x='10' y='20' fontSize='8' fill='currentColor'>
              0
            </text>
            <text x='30' y='40' fontSize='8' fill='currentColor'>
              1
            </text>
            <text x='50' y='60' fontSize='8' fill='currentColor'>
              0
            </text>
            <text x='70' y='80' fontSize='8' fill='currentColor'>
              1
            </text>
            <text x='20' y='10' fontSize='8' fill='currentColor'>
              1
            </text>
            <text x='40' y='30' fontSize='8' fill='currentColor'>
              0
            </text>
            <text x='60' y='50' fontSize='8' fill='currentColor'>
              1
            </text>
            <text x='80' y='70' fontSize='8' fill='currentColor'>
              0
            </text>
          </>
        )}

        {variant === 'stream' && (
          <>
            <text
              x='0'
              y='50'
              fontSize='12'
              fill='currentColor'
              className='font-mono'
            >
              1010
            </text>
            <text
              x='25'
              y='50'
              fontSize='12'
              fill='currentColor'
              className='font-mono'
            >
              1100
            </text>
            <text
              x='50'
              y='50'
              fontSize='12'
              fill='currentColor'
              className='font-mono'
            >
              0101
            </text>
            <text
              x='75'
              y='50'
              fontSize='12'
              fill='currentColor'
              className='font-mono'
            >
              0011
            </text>
          </>
        )}

        {variant === 'matrix' && (
          <>
            <text
              x='10'
              y='20'
              fontSize='6'
              fill='currentColor'
              className='font-mono'
            >
              010101
            </text>
            <text
              x='10'
              y='40'
              fontSize='6'
              fill='currentColor'
              className='font-mono'
            >
              101010
            </text>
            <text
              x='10'
              y='60'
              fontSize='6'
              fill='currentColor'
              className='font-mono'
            >
              010101
            </text>
            <text
              x='10'
              y='80'
              fontSize='6'
              fill='currentColor'
              className='font-mono'
            >
              101010
            </text>
          </>
        )}

        {variant === 'code' && (
          <>
            <text
              x='20'
              y='30'
              fontSize='8'
              fill='currentColor'
              className='font-mono'
            >
              01
            </text>
            <text
              x='40'
              y='50'
              fontSize='8'
              fill='currentColor'
              className='font-mono'
            >
              10
            </text>
            <text
              x='60'
              y='70'
              fontSize='8'
              fill='currentColor'
              className='font-mono'
            >
              01
            </text>
            <text
              x='30'
              y='60'
              fontSize='8'
              fill='currentColor'
              className='font-mono'
            >
              10
            </text>
          </>
        )}

        {variant === 'data' && (
          <>
            <text
              x='25'
              y='25'
              fontSize='10'
              fill='currentColor'
              className='font-mono'
            >
              DATA
            </text>
            <text
              x='55'
              y='55'
              fontSize='10'
              fill='currentColor'
              className='font-mono'
            >
              SEC
            </text>
          </>
        )}

        {/* Binary background pattern */}
        <defs>
          <pattern
            id='binary-bg'
            width='20'
            height='20'
            patternUnits='userSpaceOnUse'
          >
            <text
              x='2'
              y='15'
              fontSize='4'
              fill='currentColor'
              opacity='0.2'
              className='font-mono'
            >
              01
            </text>
            <text
              x='12'
              y='5'
              fontSize='4'
              fill='currentColor'
              opacity='0.2'
              className='font-mono'
            >
              10
            </text>
          </pattern>
        </defs>
        <rect width='100' height='100' fill='url(#binary-bg)' opacity='0.1' />
      </svg>
    </motion.div>
  );
};

// Alert/Threat Icon System
export const AlertIcon = ({
  size = 'md',
  variant = 'info',
  color = 'cyan',
  className = '',
  animate = false,
  pulse = false,
  duration = 0.8,
}: AlertIconProps) => {
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20',
  };

  const colorClasses = {
    cyan: 'text-electric-cyan-500',
    'neon-green': 'text-neon-green-500',
    white: 'text-white',
    gray: 'text-gray-500',
    red: 'text-red-500',
    yellow: 'text-yellow-500',
  };

  const baseClasses = `${sizeClasses[size]} ${colorClasses[color]} ${className}`;

  // Alert animation variants
  const alertVariants = {
    info: { scale: [1, 1.1, 1], opacity: [1, 0.8, 1] },
    success: {
      scale: [1, 1.2, 1],
      rotate: [0, 5, -5, 0],
      opacity: [1, 0.9, 1],
    },
    warning: { scale: [1, 1.1, 1], pulse: [1, 1.3, 1], opacity: [1, 0.7, 1] },
    error: {
      scale: [1, 1.15, 1],
      rotate: [0, 10, -10, 0],
      opacity: [1, 0.6, 1],
      x: [0, 5, -5, 0],
    },
    critical: {
      scale: [1, 1.2, 1],
      pulse: [1, 1.4, 1],
      opacity: [0.8, 1, 0.8],
      filter: ['hue-rotate(0deg)', 'hue-rotate(180deg)', 'hue-rotate(360deg)'],
    },
    threat: {
      scale: [1, 1.1, 1],
      x: [0, 8, -8, 0],
      y: [0, 4, -4, 0],
      opacity: [1, 0.7, 1],
    },
  };

  const animationProps = animate
    ? {
        animate: alertVariants[variant],
        transition: {
          duration,
          repeat: pulse ? Infinity : 0,
          ease: 'easeOut',
        },
      }
    : {};

  return (
    <motion.div className={baseClasses} {...animationProps}>
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='w-full h-full'
      >
        {/* Different alert symbols */}
        {variant === 'info' && <circle cx='12' cy='12' r='10' />}

        {variant === 'success' && (
          <>
            <path d='M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20z' />
            <path d='m15 9-6 6' />
            <path d='m9 9 3 3 3-3' />
          </>
        )}

        {variant === 'warning' && (
          <path d='M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20z' />
        )}

        {variant === 'error' && (
          <>
            <circle cx='12' cy='12' r='10' />
            <line
              x1='15'
              y1='9'
              x2='9'
              y2='15'
              stroke='currentColor'
              strokeWidth='2'
            />
            <line
              x1='9'
              y1='9'
              x2='15'
              y2='15'
              stroke='currentColor'
              strokeWidth='2'
            />
          </>
        )}

        {variant === 'critical' && (
          <>
            <path d='M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20z' />
            <circle cx='12' cy='12' r='3' fill='currentColor' opacity='0.3' />
            <line
              x1='9'
              y1='9'
              x2='15'
              y2='15'
              stroke='currentColor'
              strokeWidth='2'
            />
            <line
              x1='15'
              y1='9'
              x2='9'
              y2='15'
              stroke='currentColor'
              strokeWidth='2'
            />
          </>
        )}

        {variant === 'threat' && (
          <>
            <path d='M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20z' />
            <path d='M8 12h8' stroke='currentColor' strokeWidth='2' />
            <circle cx='12' cy='12' r='2' fill='currentColor' opacity='0.5' />
          </>
        )}

        {/* Info symbol */}
        {variant === 'info' && (
          <circle cx='12' cy='12' r='2' fill='currentColor' opacity='0.3' />
        )}

        {/* Warning exclamation */}
        {variant === 'warning' && (
          <path d='M12 8v4M12 16h.01' stroke='currentColor' strokeWidth='2' />
        )}
      </svg>
    </motion.div>
  );
};

// Export all security icons as a unified system
export const SecurityIcons = {
  Lock: LockIcon,
  Shield: ShieldIcon,
  Circuit: CircuitIcon,
  Binary: BinaryIcon,
  Alert: AlertIcon,
};

export default SecurityIcons;
