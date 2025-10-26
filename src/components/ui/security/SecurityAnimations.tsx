'use client';

import { motion } from 'framer-motion';

// Animation Configuration Types
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  repeat?: number | boolean;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
}

export interface DataFlowProps {
  direction?: 'left' | 'right' | 'up' | 'down' | 'circular';
  speed?: 'slow' | 'normal' | 'fast' | 'instant';
  intensity?: 'low' | 'medium' | 'high';
  color?: 'cyan' | 'neon-green' | 'white' | 'red' | 'yellow';
  className?: string;
  children?: React.ReactNode;
  animate?: boolean;
}

export interface BinaryRainProps {
  density?: 'low' | 'medium' | 'high' | 'extreme';
  speed?: 'slow' | 'normal' | 'fast' | 'rapid';
  color?: 'cyan' | 'neon-green' | 'white' | 'red' | 'yellow';
  className?: string;
  children?: React.ReactNode;
  animate?: boolean;
}

export interface SecurityScanProps {
  type?: 'horizontal' | 'vertical' | 'radial' | 'grid';
  speed?: 'slow' | 'normal' | 'fast';
  color?: 'cyan' | 'neon-green' | 'white' | 'red' | 'yellow';
  className?: string;
  children?: React.ReactNode;
  animate?: boolean;
}

export interface EncryptionEffectProps {
  level?: 'basic' | 'standard' | 'advanced' | 'quantum';
  speed?: 'slow' | 'normal' | 'fast';
  color?: 'cyan' | 'neon-green' | 'white' | 'red' | 'yellow';
  className?: string;
  children?: React.ReactNode;
  animate?: boolean;
}

export interface ThreatLevelProps {
  level?: 'low' | 'medium' | 'high' | 'critical' | 'imminent';
  size?: 'sm' | 'md' | 'lg';
  color?: 'cyan' | 'neon-green' | 'white' | 'red' | 'yellow';
  className?: string;
  animate?: boolean;
}

// Data Flow Animation Component
export const DataFlow = ({
  direction = 'right',
  speed = 'normal',
  intensity = 'medium',
  color = 'cyan',
  className = '',
  children,
  animate = true,
}: DataFlowProps) => {
  const speedConfig = {
    slow: 4,
    normal: 2.5,
    fast: 1.5,
    instant: 0.5,
  };

  const intensityConfig = {
    low: 0.3,
    medium: 0.6,
    high: 1,
    extreme: 1.5,
  };

  const colorConfig = {
    cyan: 'text-electric-cyan-500',
    'neon-green': 'text-neon-green-500',
    white: 'text-white',
    red: 'text-red-500',
    yellow: 'text-yellow-500',
  };

  const directionConfig = {
    left: { x: '100%', y: '0%' },
    right: { x: '-100%', y: '0%' },
    up: { x: '0%', y: '100%' },
    down: { x: '0%', y: '-100%' },
    circular: { rotate: 0 },
  };

  const animationVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      ...directionConfig[direction],
    },
    animate: {
      opacity: intensityConfig[intensity],
      scale: 1,
      x: 0,
      y: 0,
      rotate: direction === 'circular' ? 0 : undefined,
    },
  };

  const animationProps = animate
    ? {
        initial: animationVariants.initial,
        animate: animationVariants.animate,
        transition: {
          duration: speedConfig[speed],
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse' as const,
        },
      }
    : {};

  return (
    <motion.div
      className={`${colorConfig[color]} ${className}`}
      {...animationProps}
    >
      <div className='relative'>
        {/* Data flow particles */}
        <div className='absolute inset-0'>
          {[...Array(8)].map((_, i) => {
            const randomX = Math.random() * 80 + 10;
            const randomY = Math.random() * 80 + 10;
            const randomDuration = speedConfig[speed] * (0.5 + Math.random());

            return (
              <motion.div
                key={i}
                className='absolute w-1 h-1 bg-current rounded-full'
                initial={{
                  opacity: 0,
                  x: `${randomX}%`,
                  y: `${randomY}%`,
                }}
                animate={
                  animate
                    ? {
                        opacity: [0, intensityConfig[intensity], 0],
                        x:
                          direction === 'left'
                            ? '-100%'
                            : direction === 'right'
                              ? '100%'
                              : 0,
                        y:
                          direction === 'up'
                            ? '-100%'
                            : direction === 'down'
                              ? '100%'
                              : 0,
                      }
                    : {}
                }
                transition={{
                  duration: randomDuration,
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
                style={{
                  left: `${randomX}%`,
                  top: `${randomY}%`,
                }}
              />
            );
          })}
        </div>

        {/* Data stream line */}
        <motion.div
          className='relative h-px bg-current'
          initial={{ scaleX: 0 }}
          animate={
            animate
              ? {
                  scaleX: [0, 1, 0],
                  opacity: [0, intensityConfig[intensity], 0],
                }
              : {}
          }
          transition={{
            duration: speedConfig[speed],
            repeat: Infinity,
          }}
        />

        {children}
      </div>
    </motion.div>
  );
};

// Binary Rain Animation Component
export const BinaryRain = ({
  density = 'medium',
  speed = 'normal',
  color = 'cyan',
  className = '',
  children,
  animate = true,
}: BinaryRainProps) => {
  const speedConfig = {
    slow: 3,
    normal: 2,
    fast: 1,
    rapid: 0.5,
  };

  const densityConfig = {
    low: 20,
    medium: 40,
    high: 60,
    extreme: 100,
  };

  const colorConfig = {
    cyan: 'text-electric-cyan-500',
    'neon-green': 'text-neon-green-500',
    white: 'text-white',
    red: 'text-red-500',
    yellow: 'text-yellow-500',
  };

  const binaryCharacters = ['0', '1'];

  return (
    <div className={`relative ${className}`}>
      {animate && (
        <div className='absolute inset-0 pointer-events-none'>
          {[...Array(densityConfig[density])].map((_, i) => {
            const char =
              binaryCharacters[
                Math.floor(Math.random() * binaryCharacters.length)
              ];
            const size = Math.random() * 4 + 8;
            const left = Math.random() * 100;
            const delay = Math.random() * speedConfig[speed];
            const duration = speedConfig[speed] + Math.random() * 2;
            const initialRotate = Math.random() * 360;
            const animateRotate = Math.random() * 360 + 360;

            return (
              <motion.div
                key={i}
                className={`absolute font-mono font-bold ${colorConfig[color]}`}
                initial={{
                  y: '-100%',
                  opacity: 0,
                  rotate: initialRotate,
                }}
                animate={{
                  y: '100vh',
                  opacity: [0, 0.7, 0.3, 0],
                  rotate: animateRotate,
                }}
                transition={{
                  duration,
                  delay,
                  ease: 'linear',
                }}
                style={{
                  left: `${left}%`,
                  fontSize: `${size}px`,
                }}
              >
                {char}
              </motion.div>
            );
          })}
        </div>
      )}

      <div className='relative z-10'>{children}</div>
    </div>
  );
};

// Security Scan Animation Component
export const SecurityScan = ({
  type = 'horizontal',
  speed = 'normal',
  color = 'cyan',
  className = '',
  children,
  animate = true,
}: SecurityScanProps) => {
  const speedConfig = {
    slow: 3,
    normal: 2,
    fast: 1,
  };

  const colorConfig = {
    cyan: 'bg-electric-cyan-500',
    'neon-green': 'bg-neon-green-500',
    white: 'bg-white',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
  };

  const scanVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 0.6, scale: 1 },
  };

  const getScanElement = () => {
    switch (type) {
      case 'horizontal':
        return (
          <motion.div
            className={`absolute w-full h-1 ${colorConfig[color]} opacity-30`}
            initial={scanVariants.initial}
            animate={
              animate
                ? {
                    y: ['-100%', '100%'],
                    opacity: [0.2, 0.6, 0.2],
                  }
                : {}
            }
            transition={{
              duration: speedConfig[speed],
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      case 'vertical':
        return (
          <motion.div
            className={`absolute h-full w-1 ${colorConfig[color]} opacity-30`}
            initial={scanVariants.initial}
            animate={
              animate
                ? {
                    x: ['-100%', '100%'],
                    opacity: [0.2, 0.6, 0.2],
                  }
                : {}
            }
            transition={{
              duration: speedConfig[speed],
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      case 'radial':
        return (
          <motion.div
            className={`absolute ${colorConfig[color]} opacity-20`}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              animate
                ? {
                    scale: [0, 2, 0],
                    opacity: [0, 0.4, 0],
                  }
                : {}
            }
            transition={{
              duration: speedConfig[speed],
              repeat: Infinity,
              ease: 'easeOut',
            }}
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      case 'grid':
        return (
          <div className='absolute inset-0'>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute ${colorConfig[color]} opacity-20`}
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  animate
                    ? {
                        x: ['-100%', '100%'],
                        y: ['-100%', '100%'],
                        opacity: [0, 0.3, 0],
                        rotate: [0, 360],
                      }
                    : {}
                }
                transition={{
                  duration: speedConfig[speed] + i * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  left: `${i * 25}%`,
                  top: `${i * 25}%`,
                }}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`relative ${className}`}>
      {getScanElement()}
      <div className='relative z-10'>{children}</div>
    </div>
  );
};

// Encryption Effect Animation Component
export const EncryptionEffect = ({
  level = 'standard',
  speed = 'normal',
  color = 'cyan',
  className = '',
  children,
  animate = true,
}: EncryptionEffectProps) => {
  const speedConfig = {
    slow: 3,
    normal: 2,
    fast: 1,
  };

  const colorConfig = {
    cyan: 'text-electric-cyan-500',
    'neon-green': 'text-neon-green-500',
    white: 'text-white',
    red: 'text-red-500',
    yellow: 'text-yellow-500',
  };

  const levelConfig = {
    basic: { particles: 10, layers: 1 },
    standard: { particles: 20, layers: 2 },
    advanced: { particles: 30, layers: 3 },
    quantum: { particles: 50, layers: 5 },
  };

  const config = levelConfig[level];
  const particles = config.particles;
  const layers = config.layers;

  return (
    <div className={`relative ${className}`}>
      {animate && (
        <div className='absolute inset-0 pointer-events-none'>
          {[...Array(layers)].map((_, layer) => (
            <div key={layer} className='absolute inset-0'>
              {[...Array(particles)].map((_, i) => {
                const angle = (i / particles) * 2 * Math.PI;
                const radius = 50 + layer * 20;
                const particleDuration = speedConfig[speed] + layer * 0.5;

                return (
                  <motion.div
                    key={i}
                    className={`absolute w-1 h-1 bg-current rounded-full ${colorConfig[color]}`}
                    initial={{
                      x: Math.cos(angle) * radius,
                      y: Math.sin(angle) * radius,
                      opacity: 0,
                    }}
                    animate={{
                      x: Math.cos(angle + Math.PI) * radius,
                      y: Math.sin(angle + Math.PI) * radius,
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: particleDuration,
                      delay: i * 0.1,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* Lock overlay for encryption effect */}
      {level !== 'basic' && animate && (
        <motion.div
          className={`absolute inset-0 flex items-center justify-center ${colorConfig[color]}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0.8, 1],
            opacity: [0, 0.3, 0.2, 0.3],
          }}
          transition={{
            duration: speedConfig[speed],
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1'
            className='w-1/2 h-1/2'
          >
            <rect x='3' y='11' width='18' height='11' rx='2' ry='2' />
            <path d='M7 11V7a5 5 0 0 1 10 0v4' />
            <circle cx='12' cy='16' r='1' />
          </svg>
        </motion.div>
      )}

      <div className='relative z-10'>{children}</div>
    </div>
  );
};

// Threat Level Animation Component
export const ThreatLevel = ({
  level = 'low',
  size = 'md',
  // color prop is used in colorConfig[color] below
  className = '',
  animate = true,
}: ThreatLevelProps) => {
  const sizeConfig = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  };

  const colorConfig = {
    cyan: 'text-electric-cyan-500',
    'neon-green': 'text-neon-green-500',
    white: 'text-white',
    red: 'text-red-500',
    yellow: 'text-yellow-500',
  };

  const levelConfig = {
    low: {
      icon: '🔒',
      pulse: false,
      scale: 1,
      color: 'neon-green' as const,
    },
    medium: {
      icon: '⚠️',
      pulse: true,
      scale: 1.1,
      color: 'yellow' as const,
    },
    high: {
      icon: '🚨',
      pulse: true,
      scale: 1.2,
      color: 'red' as const,
    },
    critical: {
      icon: '💀',
      pulse: true,
      scale: 1.3,
      color: 'red' as const,
    },
    imminent: {
      icon: '⚡',
      pulse: true,
      scale: 1.4,
      color: 'cyan' as const,
    },
  };

  const config = levelConfig[level];

  const animationVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: {
      scale: config.scale,
      opacity: 1,
      rotate: level === 'imminent' ? [0, 10, -10, 0] : 0,
    },
  };

  const animationProps = animate
    ? {
        initial: animationVariants.initial,
        animate: animationVariants.animate,
        transition: {
          duration: 0.5,
          ease: 'easeOut',
          repeat: config.pulse ? Infinity : 0,
          repeatType: 'reverse' as const,
        },
      }
    : {};

  return (
    <motion.div
      className={`${sizeConfig[size]} ${colorConfig[config.color]} ${className}`}
      {...animationProps}
    >
      <span className='w-full h-full flex items-center justify-center text-lg'>
        {config.icon}
      </span>
    </motion.div>
  );
};

// Export all security animations as a unified system
export const SecurityAnimations = {
  DataFlow,
  BinaryRain,
  SecurityScan,
  EncryptionEffect,
  ThreatLevel,
};

export default SecurityAnimations;
