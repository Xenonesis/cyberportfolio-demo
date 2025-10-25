'use client';

import { motion } from 'framer-motion';
import { CardProps } from '@/types';

export const Card = ({
  title,
  description,
  image,
  href,
  tags,
  className = '',
  children,
}: CardProps) => {
  const baseClasses = 'bg-deep-navy-800 border border-deep-navy-600 rounded-xl overflow-hidden transition-all duration-300 hover:border-electric-cyan-500 hover:shadow-lg hover:shadow-electric-cyan-400/10 hover:scale-105 relative';
  
  const contentClasses = 'p-6';
  
  const imageClasses = 'w-full h-48 object-cover object-center';

  const cardContent = (
    <>
      {/* Security Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-electric-cyan-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
      
      {image && (
        <div className="relative overflow-hidden">
          <img src={image} alt={title} className={imageClasses} />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-navy-900/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          {/* Image Security Overlay */}
          <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="w-6 h-6 bg-electric-cyan-500/20 border border-electric-cyan-500 rounded flex items-center justify-center animate-lock-in">
              <div className="w-2 h-2 bg-electric-cyan-500 rounded-sm"></div>
            </div>
          </div>
        </div>
      )}
      
      <div className={contentClasses}>
        {tags && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-electric-cyan-600/20 text-electric-cyan-400 rounded-md border border-electric-cyan-600/30 hover:bg-electric-cyan-600/30 hover:text-electric-cyan-300 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {title && (
          <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
            {title}
            <div className="w-2 h-2 bg-neon-green-500 rounded-full animate-pulse"></div>
          </h3>
        )}
        
        {description && (
          <p className="text-light-gray-300 text-sm leading-relaxed">
            {description}
          </p>
        )}
        
        {children}
      </div>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${baseClasses} ${className}`}
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {cardContent}
      </motion.a>
    );
  }

  return (
    <motion.div
      className={`${baseClasses} ${className}`}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {cardContent}
    </motion.div>
  );
};

// Enhanced Security Card variant
export const SecurityCard = ({
  title,
  description,
  image,
  href,
  tags,
  threatLevel = 'low',
  className = '',
  children,
}: CardProps & { threatLevel?: 'low' | 'medium' | 'high' | 'critical' }) => {
  const threatColors = {
    low: 'border-neon-green-500 bg-neon-green-500/5',
    medium: 'border-yellow-500 bg-yellow-500/5',
    high: 'border-red-500 bg-red-500/5',
    critical: 'border-red-600 bg-red-600/10 animate-pulse',
  };

  const baseClasses = `bg-deep-navy-800 ${threatColors[threatLevel]} rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-${threatLevel === 'low' ? 'neon-green' : threatLevel === 'medium' ? 'yellow' : 'red'}-400/10 relative`;
  
  const contentClasses = 'p-6';
  
  const imageClasses = 'w-full h-48 object-cover object-center';

  const cardContent = (
    <>
      {/* Threat Level Indicator */}
      <div className="absolute top-2 left-2 z-10">
        <div className={`w-3 h-3 rounded-full ${threatLevel === 'low' ? 'bg-neon-green-500' : threatLevel === 'medium' ? 'bg-yellow-500' : 'bg-red-500'} animate-pulse`}></div>
      </div>
      
      {image && (
        <div className="relative overflow-hidden">
          <img src={image} alt={title} className={imageClasses} />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-navy-900/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      
      <div className={contentClasses}>
        {tags && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-electric-cyan-600/20 text-electric-cyan-400 rounded-md border border-electric-cyan-600/30"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {title && (
          <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
            {title}
            <div className={`w-2 h-2 rounded-full ${threatLevel === 'low' ? 'bg-neon-green-500' : threatLevel === 'medium' ? 'bg-yellow-500' : 'bg-red-500'} animate-pulse`}></div>
          </h3>
        )}
        
        {description && (
          <p className="text-light-gray-300 text-sm leading-relaxed">
            {description}
          </p>
        )}
        
        {children}
      </div>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${baseClasses} ${className}`}
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {cardContent}
      </motion.a>
    );
  }

  return (
    <motion.div
      className={`${baseClasses} ${className}`}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {cardContent}
    </motion.div>
  );
};