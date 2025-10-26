'use client';

import { motion } from 'framer-motion';

interface CircuitPatternProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'static' | 'flowing' | 'pulsing';
  color?: 'cyan' | 'neon-green' | 'white' | 'gray';
  className?: string;
  animate?: boolean;
  speed?: 'slow' | 'normal' | 'fast';
}

export const CircuitPattern = ({
  size = 'md',
  variant = 'static',
  color = 'cyan',
  className = '',
  animate = false,
  speed = 'normal',
}: CircuitPatternProps) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    xl: 'w-48 h-48',
  };

  const colorClasses = {
    cyan: 'text-cyan-400',
    'neon-green': 'text-neon-green-600',
    white: 'text-white',
    gray: 'text-gray-500',
  };

  const baseClasses = `${sizeClasses[size]} ${colorClasses[color]} ${className}`;

  const speedDurations = {
    slow: 3,
    normal: 2,
    fast: 1,
  };

  // Circuit animation variants
  const circuitVariants = {
    static: {},
    flowing: {
      pathLength: [0, 1],
      opacity: [0, 1, 0],
    },
    pulsing: {
      scale: [1, 1.1, 1],
      opacity: [0.5, 1, 0.5],
    },
  };

  const animationProps = animate
    ? {
        animate: circuitVariants[variant],
        transition: {
          duration: speedDurations[speed],
          repeat: Infinity,
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
        </defs>

        {/* Background grid */}
        <rect width='100' height='100' fill='url(#circuit-grid)' />

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

        {/* Optional flowing effect */}
        {variant === 'flowing' && animate && (
          <motion.path
            d='M 10 10 L 90 10'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: speedDurations[speed], repeat: Infinity }}
            fill='none'
          />
        )}

        {/* Security lock integration */}
        <g transform='translate(45, 45) scale(0.6)'>
          <rect
            x='3'
            y='11'
            width='18'
            height='11'
            rx='2'
            ry='2'
            stroke='currentColor'
            fill='none'
          />
          <path d='M7 11V7a5 5 0 0 1 10 0v4' stroke='currentColor' />
          <circle cx='12' cy='16' r='1' stroke='currentColor' />
        </g>
      </svg>
    </motion.div>
  );
};
