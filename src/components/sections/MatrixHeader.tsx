'use client';

import { motion } from 'framer-motion';
import { CircuitPattern } from '@/components/ui/CircuitPattern';

interface MatrixHeaderProps {
  title: string;
  description: string;
  totalSkills: number;
  averageProficiency: number;
  className?: string;
}

export const MatrixHeader = ({
  title,
  description,
  totalSkills,
  averageProficiency,
  className = '',
}: MatrixHeaderProps) => {
  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 20,
        duration: 0.6,
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  return (
    <motion.header
      className={`matrix-header relative mb-8 ${className}`}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Circuit Pattern */}
      <div className="absolute inset-0 opacity-10">
        <CircuitPattern className="w-full h-full" />
      </div>

      <div className="relative">
        {/* Main Title */}
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
          variants={headerVariants}
        >
          {title}
        </motion.h2>

        {/* Description */}
        <motion.p 
          className="text-lg text-gray-400 mb-6 text-center max-w-3xl mx-auto leading-relaxed"
          variants={headerVariants}
        >
          {description}
        </motion.p>

        {/* Statistics Overview */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
          variants={statVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Total Skills */}
          <motion.div 
            className="stat-card text-center p-4 bg-security-gray-800 rounded-lg border border-electric-cyan-500/30"
            variants={statVariants}
          >
            <div className="text-3xl font-bold text-electric-cyan-400 mb-1">
              {totalSkills.toLocaleString()}
            </div>
            <div className="text-gray-400 text-sm">Total Skills</div>
          </motion.div>

          {/* Average Proficiency */}
          <motion.div 
            className="stat-card text-center p-4 bg-security-gray-800 rounded-lg border border-neon-green-500/30"
            variants={statVariants}
          >
            <div className="text-3xl font-bold text-neon-green-400 mb-1">
              {averageProficiency}%
            </div>
            <div className="text-gray-400 text-sm">Avg Proficiency</div>
          </motion.div>

          {/* Expert Level */}
          <motion.div 
            className="stat-card text-center p-4 bg-security-gray-800 rounded-lg border border-purple-500/30"
            variants={statVariants}
          >
            <div className="text-3xl font-bold text-purple-400 mb-1">8+</div>
            <div className="text-gray-400 text-sm">Expert Skills</div>
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  );
};