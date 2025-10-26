'use client';

import { motion } from 'framer-motion';

interface GitHubIconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'cyan' | 'neon-green' | 'white' | 'gray';
  className?: string;
  animate?: boolean;
  pulse?: boolean;
}

export const GitHubIcon = ({
  size = 'md',
  color = 'cyan',
  className = '',
  animate = false,
  pulse = false,
}: GitHubIconProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const colorClasses = {
    cyan: 'text-cyan-400',
    'neon-green': 'text-neon-green-600',
    white: 'text-white',
    gray: 'text-gray-500',
  };

  const baseClasses = `${sizeClasses[size]} ${colorClasses[color]} ${className}`;

  const animationProps = animate
    ? {
        animate: { scale: [1, 1.1, 1] },
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
        <path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' />
      </svg>
    </motion.div>
  );
};
