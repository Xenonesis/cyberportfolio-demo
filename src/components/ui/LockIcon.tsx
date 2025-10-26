'use client';

import { motion } from 'framer-motion';

interface LockIconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'open' | 'locked' | 'unlocked';
  color?: 'cyan' | 'neon-green' | 'white' | 'gray';
  className?: string;
  animate?: boolean;
  pulse?: boolean;
}

export const LockIcon = ({
  size = 'md',
  variant = 'default',
  color = 'cyan',
  className = '',
  animate = false,
  pulse = false,
}: LockIconProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const colorClasses = {
    cyan: 'text-cyan-400',
    'neon-green': 'text-neon-green-600',
    white: 'text-white',
    gray: 'text-gray-500',
  };

  const baseClasses = `${sizeClasses[size]} ${colorClasses[color]} ${className}`;

  const lockVariants = {
    default: {},
    open: { rotate: [0, 10, -10, 0] },
    locked: { scale: [1, 1.1, 1] },
    unlocked: { scale: [1, 0.9, 1] },
  };

  const animationProps = animate
    ? {
        animate: lockVariants[variant],
        transition: { duration: 0.5, repeat: pulse ? Infinity : 0 },
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
        {/* Lock body */}
        <rect x='3' y='11' width='18' height='11' rx='2' ry='2' />

        {/* Lock shackle */}
        <path d='M7 11V7a5 5 0 0 1 10 0v4' />

        {/* Lock hole */}
        {variant === 'open' || variant === 'unlocked' ? (
          <circle cx='12' cy='16' r='1' fill='currentColor' />
        ) : (
          <circle cx='12' cy='16' r='1' />
        )}
      </svg>
    </motion.div>
  );
};
