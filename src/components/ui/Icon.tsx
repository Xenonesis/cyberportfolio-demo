'use client';

import { motion } from 'framer-motion';

interface IconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'default' | 'cyan' | 'neon-green' | 'white' | 'gray';
  className?: string;
  animate?: boolean;
  pulse?: boolean;
}

export const Icon = ({
  name,
  size = 'md',
  color = 'default',
  className = '',
  animate = false,
  pulse = false,
}: IconProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const colorClasses = {
    default: 'text-gray-400',
    cyan: 'text-cyan-400',
    'neon-green': 'text-neon-green-600',
    white: 'text-white',
    gray: 'text-gray-500',
  };

  const baseClasses = `${sizeClasses[size]} ${colorClasses[color]} ${className}`;
  
  const animationProps = animate
    ? {
        whileHover: { scale: 1.2, rotate: 5 },
        whileTap: { scale: 0.8, rotate: -5 },
      }
    : {};

  const pulseClass = pulse ? 'animate-pulse' : '';

  return (
    <motion.div
      className={`${baseClasses} ${pulseClass}`}
      {...animationProps}
    >
      {/* Placeholder for icons - would use react-icons in real implementation */}
      <div className="w-full h-full bg-current rounded-sm"></div>
    </motion.div>
  );
};