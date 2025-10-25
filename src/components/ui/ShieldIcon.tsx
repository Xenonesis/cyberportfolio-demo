'use client';

import { motion } from 'framer-motion';

interface ShieldIconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'active' | 'inactive' | 'damaged';
  color?: 'cyan' | 'neon-green' | 'white' | 'gray';
  className?: string;
  animate?: boolean;
  pulse?: boolean;
}

export const ShieldIcon = ({
  size = 'md',
  variant = 'default',
  color = 'cyan',
  className = '',
  animate = false,
  pulse = false,
}: ShieldIconProps) => {
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

  const shieldVariants = {
    default: {},
    active: { 
      scale: [1, 1.2, 1],
      rotate: [0, 5, -5, 0],
    },
    inactive: { opacity: 0.5 },
    damaged: { 
      rotate: [0, 2, -2, 0],
      scale: [1, 0.9, 1],
    },
  };

  const animationProps = animate
    ? {
        animate: shieldVariants[variant],
        transition: { 
          duration: 0.6, 
          repeat: pulse ? Infinity : 0,
          ease: 'easeInOut'
        },
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
        {/* Shield body */}
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        
        {/* Shield emblem - varies by variant */}
        {variant === 'active' && (
          <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3" />
        )}
        
        {variant === 'damaged' && (
          <>
            <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2" />
            <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2" />
          </>
        )}
        
        {variant === 'default' && (
          <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" />
        )}
      </svg>
    </motion.div>
  );
};