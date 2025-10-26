'use client';

import { motion } from 'framer-motion';
import { ButtonProps } from '@/types';
import { LockIcon } from './LockIcon';
import { ShieldIcon } from './ShieldIcon';

export const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  children,
  onClick,
  type = 'button',
  className = '',
  ...props
}: ButtonProps) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-electric-cyan-500 to-electric-cyan-600 text-deep-navy-900 hover:from-electric-cyan-400 hover:to-electric-cyan-500 focus:ring-electric-cyan-400 shadow-lg hover:shadow-electric-cyan-400/25 hover:shadow-lg hover:scale-105',
    secondary:
      'bg-neon-green-600 text-deep-navy-900 hover:bg-neon-green-500 focus:ring-neon-green-400 shadow-lg hover:shadow-neon-green-400/25 border-2 border-neon-green-500',
    outline:
      'border-2 border-electric-cyan-500 text-electric-cyan-500 bg-transparent hover:bg-electric-cyan-500 hover:text-deep-navy-900 focus:ring-electric-cyan-400 hover:shadow-electric-cyan-400/10',
    ghost:
      'text-electric-cyan-400 hover:text-electric-cyan-300 hover:bg-deep-navy-700 focus:ring-electric-cyan-400 hover:bg-deep-navy-600/50',
    security:
      'bg-deep-navy-800 border-2 border-electric-cyan-500 text-electric-cyan-400 hover:border-neon-green-500 hover:text-neon-green-400 focus:ring-electric-cyan-400 hover:shadow-neon-green-400/10 hover:scale-105',
    neon: 'bg-gradient-to-r from-electric-cyan-500 via-neon-green-500 to-electric-cyan-500 text-deep-navy-900 animate-neon-pulse hover:animate-none hover:scale-105',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : 'px-6';

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  return (
    <motion.button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
      {...props}
    >
      {/* Security Glow Effect */}
      {variant === 'security' && (
        <div className='absolute inset-0 bg-electric-cyan-500/0 hover:bg-electric-cyan-500/5 transition-colors duration-300 rounded-lg'></div>
      )}

      {loading && (
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className='w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2'
        />
      )}

      {icon && !loading && (
        <div className='w-4 h-4 mr-2 flex items-center justify-center'>
          {icon === 'lock' ? (
            <LockIcon size='sm' variant='locked' color='white' animate pulse />
          ) : icon === 'shield' ? (
            <ShieldIcon size='sm' variant='default' color='white' />
          ) : icon === 'eye' ? (
            <div className='w-full h-full bg-current rounded-sm border border-current'></div>
          ) : icon === 'download' ? (
            <div className='w-full h-full bg-current flex items-center justify-center text-xs'>
              ↓
            </div>
          ) : (
            <div className='w-full h-full bg-current rounded-sm'></div>
          )}
        </div>
      )}

      <span className={`relative ${loading ? 'opacity-75' : ''}`}>
        {children}
      </span>
    </motion.button>
  );
};
