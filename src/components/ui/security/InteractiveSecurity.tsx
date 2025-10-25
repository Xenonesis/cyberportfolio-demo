'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SecurityIcons } from './SecurityIcons';
import { SecurityAnimations } from './SecurityAnimations';

// Interactive Component Types
export interface SecurityButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'security' | 'neon';
  size?: 'sm' | 'md' | 'lg';
  color?: 'cyan' | 'neon-green' | 'white' | 'red' | 'yellow';
  icon?: 'lock' | 'shield' | 'circuit' | 'binary' | 'alert' | string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  securityEffect?: 'scan' | 'encrypt' | 'shield' | 'pulse';
  animate?: boolean;
}

export interface ProtectionToggleProps {
  enabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'cyan' | 'neon-green' | 'white' | 'red' | 'yellow';
  label?: string;
  onToggle?: (enabled: boolean) => void;
  className?: string;
  animate?: boolean;
}

export interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  variant?: 'alert' | 'confirmation' | 'info' | 'threat';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export interface SecurityCardProps {
  title: string;
  description: string;
  icon?: string;
  variant?: 'default' | 'threat' | 'secure' | 'encrypted';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  animate?: boolean;
}

// Security Button Component
export const SecurityButton = ({
  variant = 'primary',
  size = 'md',
  color = 'cyan',
  icon,
  children,
  onClick,
  disabled = false,
  loading = false,
  className = '',
  securityEffect = 'scan',
  animate = true,
}: SecurityButtonProps) => {
  const sizeConfig = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const colorConfig = {
    cyan: 'bg-electric-cyan-500/20 border-electric-cyan-500 text-electric-cyan-400',
    'neon-green': 'bg-neon-green-500/20 border-neon-green-500 text-neon-green-400',
    white: 'bg-white/20 border-white text-white',
    red: 'bg-red-500/20 border-red-500 text-red-400',
    yellow: 'bg-yellow-500/20 border-yellow-500 text-yellow-400',
  };

  const variantConfig = {
    primary: 'bg-electric-cyan-500/30 border-electric-cyan-500 hover:bg-electric-cyan-500/40',
    secondary: 'bg-neon-green-500/30 border-neon-green-500 hover:bg-neon-green-500/40',
    outline: 'border-2 border-electric-cyan-500 bg-transparent hover:bg-electric-cyan-500/20',
    security: 'bg-gradient-to-r from-electric-cyan-500/20 to-neon-green-500/20 border border-electric-cyan-500',
    neon: 'bg-gradient-to-r from-electric-cyan-500 to-neon-green-500 border border-transparent',
  };

  const [isAnimating, setIsAnimating] = useState(false);
  const [showEffect, setShowEffect] = useState(false);

  const handleClick = () => {
    if (disabled || loading) return;
    
    setIsAnimating(true);
    setShowEffect(true);
    
    setTimeout(() => setIsAnimating(false), 300);
    setTimeout(() => setShowEffect(false), 1000);
    
    onClick?.();
  };

  const animationVariants = {
    initial: { scale: 1, filter: 'hue-rotate(0deg)' },
    animate: { 
      scale: 1.05, 
      filter: 'hue-rotate(180deg)',
      boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)' 
    },
    tap: { scale: 0.95 },
  };

  const securityEffectVariants = {
    scan: (
      <SecurityAnimations.SecurityScan
        type="radial"
        speed="fast"
        color={color}
        className="absolute inset-0"
        animate={showEffect}
      />
    ),
    encrypt: (
      <SecurityAnimations.EncryptionEffect
        level="standard"
        speed="normal"
        color={color}
        className="absolute inset-0"
        animate={showEffect}
      />
    ),
    shield: (
      <motion.div
        className="absolute inset-0 border-4 border-electric-cyan-500 rounded-lg"
        initial={{ scale: 0, opacity: 0 }}
        animate={showEffect ? { scale: 1.2, opacity: 0.3 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5 }}
      />
    ),
    pulse: (
      <motion.div
        className={`absolute inset-0 rounded-lg ${colorConfig[color]} opacity-20`}
        animate={showEffect ? { scale: 1.5, opacity: 0 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.8 }}
      />
    ),
  };

  return (
    <motion.button
      className={`relative ${variantConfig[variant]} ${colorConfig[color]} ${sizeConfig[size]} border rounded-lg font-medium transition-all duration-300 ease-out ${className}`}
      onClick={handleClick}
      disabled={disabled || loading}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 0 15px rgba(0, 255, 255, 0.2)',
      }}
      whileTap={{ scale: 0.98 }}
      animate={animate && isAnimating ? animationVariants.animate : animationVariants.initial}
      transition={{ duration: 0.3 }}
    >
      {securityEffect && securityEffectVariants[securityEffect]}
      
      <div className="relative flex items-center gap-2">
        {icon && (
          <SecurityIcons.Lock
            size={size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'md'}
            color={color}
            animate={animate}
          />
        )}
        {loading ? 'Loading...' : children}
      </div>
    </motion.button>
  );
};

// Protection Toggle Component
export const ProtectionToggle = ({
  enabled = false,
  size = 'md',
  color = 'cyan',
  label,
  onToggle,
  className = '',
  animate = true,
}: ProtectionToggleProps) => {
  const sizeConfig = {
    sm: 'w-8 h-4',
    md: 'w-12 h-6',
    lg: 'w-16 h-8',
  };

  const toggleEncryption = () => {
    // Placeholder encryption toggle function
    console.log('Encryption toggled');
  };

  const handleToggle = () => {
    const newEnabled = !enabled;
    onToggle?.(newEnabled);
    toggleEncryption();
  };

  const animationVariants = {
    initial: { scale: 1 },
    animate: { scale: 1.1 },
    toggleOn: { 
      x: size === 'sm' ? '4px' : size === 'md' ? '6px' : '8px',
      backgroundColor: 'var(--neon-green)',
    },
    toggleOff: { x: 0, backgroundColor: 'var(--gray)' },
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.div
        className={`relative ${sizeConfig[size]} bg-gray-600 rounded-full cursor-pointer`}
        onClick={handleToggle}
        animate={enabled ? 'toggleOn' : 'toggleOff'}
        variants={animationVariants}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <motion.div
          className={`absolute top-0.5 left-0.5 ${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-6 h-6'} bg-white rounded-full shadow-md`}
          animate={enabled ? { x: size === 'sm' ? '4px' : size === 'md' ? '6px' : '8px' } : { x: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
        
        {enabled && (
          <SecurityIcons.Shield
            size={size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'md'}
            color="neon-green"
            variant="active"
            className="absolute inset-0 flex items-center justify-center"
            animate={animate}
          />
        )}
        
        {!enabled && (
          <SecurityIcons.Lock
            size={size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'md'}
            color="gray"
            variant="default"
            className="absolute inset-0 flex items-center justify-center"
            animate={animate}
          />
        )}
      </motion.div>
      
      {label && (
        <span className="text-sm font-medium text-light-gray-300">
          {enabled ? `Protected ${label}` : `Unprotected ${label}`}
        </span>
      )}
    </div>
  );
};

// Security Modal Component
export const SecurityModal = ({
  isOpen,
  onClose,
  title,
  children,
  variant = 'info',
  size = 'md',
  className = '',
}: SecurityModalProps) => {
  const sizeConfig = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-xl',
    xl: 'max-w-2xl',
  };

  const variantConfig = {
    alert: 'border-red-500 bg-red-500/10',
    confirmation: 'border-neon-green-500 bg-neon-green-500/10',
    info: 'border-electric-cyan-500 bg-electric-cyan-500/10',
    threat: 'border-red-600 bg-red-600/15 animate-pulse',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`relative ${sizeConfig[size]} w-full bg-deep-navy-800 rounded-lg border ${variantConfig[variant]} p-6 ${className}`}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-semibold text-light-gray-300 flex items-center gap-2">
                <SecurityIcons.Alert variant={variant === 'threat' ? 'critical' : variant === 'confirmation' ? 'success' : variant === 'info' ? 'info' : 'warning'} size="md" color="cyan" />
                {title}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <SecurityIcons.Lock variant="default" size="sm" color="gray" />
              </button>
            </div>
            
            <div className="text-light-gray-400">
              {children}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <SecurityButton
                variant="outline"
                size="sm"
                onClick={onClose}
                securityEffect={undefined}
              >
                Cancel
              </SecurityButton>
              <SecurityButton
                variant="security"
                size="sm"
                onClick={onClose}
                securityEffect="encrypt"
              >
                Confirm
              </SecurityButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Security Card Component
export const SecurityCard = ({
  title,
  description,
  icon,
  variant = 'default',
  size = 'md',
  onClick,
  className = '',
  animate = true,
}: SecurityCardProps) => {
  const sizeConfig = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const variantConfig = {
    default: 'border-electric-cyan-500/30 bg-electric-cyan-500/5',
    threat: 'border-red-500/30 bg-red-500/5 animate-pulse',
    secure: 'border-neon-green-500/30 bg-neon-green-500/5',
    encrypted: 'border-electric-cyan-500/30 bg-electric-cyan-500/5',
  };

  const [isHovered, setIsHovered] = useState(false);

  const animationVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.02, 
      rotate: 2,
      boxShadow: '0 8px 32px rgba(0, 255, 255, 0.1)' 
    },
    tap: { scale: 0.98 },
  };

  return (
    <motion.div
      className={`relative ${sizeConfig[size]} border rounded-lg ${variantConfig[variant]} transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      animate={animate ? (isHovered ? animationVariants.hover : animationVariants.initial) : {}}
      whileTap={animate ? animationVariants.tap : {}}
      transition={{ duration: 0.3 }}
    >
      {variant === 'threat' && isHovered && (
        <SecurityAnimations.ThreatLevel
          level="high"
          size="sm"
          className="absolute -top-2 -right-2"
          animate={true}
        />
      )}
      
      {variant === 'secure' && isHovered && (
        <SecurityAnimations.SecurityScan
          type="grid"
          speed="fast"
          color="neon-green"
          className="absolute inset-0"
          animate={true}
        />
      )}
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          {icon && (
            <SecurityIcons.Circuit
              size={size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'md'}
              color={variant === 'threat' ? 'red' : variant === 'secure' ? 'neon-green' : 'cyan'}
              animate={animate}
            />
          )}
          <h4 className="font-semibold text-light-gray-300">{title}</h4>
        </div>
        <p className="text-light-gray-400 text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

// Export all interactive security components
export const InteractiveSecurity = {
  Button: SecurityButton,
  ProtectionToggle,
  Modal: SecurityModal,
  Card: SecurityCard,
};

export default InteractiveSecurity;