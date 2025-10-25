'use client';

import { motion } from 'framer-motion';

interface LinkedInIconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'cyan' | 'neon-green' | 'white' | 'gray';
  className?: string;
  animate?: boolean;
  pulse?: boolean;
}

export const LinkedInIcon = ({
  size = 'md',
  color = 'cyan',
  className = '',
  animate = false,
  pulse = false,
}: LinkedInIconProps) => {
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
    <motion.div
      className={baseClasses}
      {...animationProps}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    </motion.div>
  );
};