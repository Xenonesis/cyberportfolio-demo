'use client';

import { motion } from 'framer-motion';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  icon?: string;
  pulse?: boolean;
}

export const Badge = ({
  variant = 'default',
  size = 'md',
  children,
  className = '',
  icon,
  pulse = false,
}: BadgeProps) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full border transition-all duration-300';

  const variantClasses = {
    default: 'bg-navy-700 text-gray-300 border-navy-600',
    success: 'bg-green-600/20 text-green-400 border-green-600/30',
    warning: 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30',
    error: 'bg-red-600/20 text-red-400 border-red-600/30',
    info: 'bg-cyan-600/20 text-cyan-400 border-cyan-600/30',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  const pulseClass = pulse ? 'animate-pulse' : '';

  const badgeClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${pulseClass} ${className}`;

  return (
    <motion.span
      className={badgeClasses}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon && (
        <div className="w-3 h-3 mr-1.5">
          {/* Placeholder for icons */}
          <div className="w-full h-full bg-current rounded-sm"></div>
        </div>
      )}
      <span>{children}</span>
    </motion.span>
  );
};