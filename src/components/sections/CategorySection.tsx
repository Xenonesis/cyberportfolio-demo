'use client';

import { motion } from 'framer-motion';
import { SkillCard } from './SkillCard';
import { SkillCategory, DetailedSkill, ProficiencyLevel } from '@/types';

interface CategorySectionProps {
  category: SkillCategory;
  onSkillClick?: (skill: DetailedSkill) => void;
  proficiencyLevels: ProficiencyLevel[];
  showProficiencyLevels?: boolean;
  showYearsOfExperience?: boolean;
  showCertifications?: boolean;
  animationSpeed?: number;
  className?: string;
}

export const CategorySection = ({
  category,
  onSkillClick,
  proficiencyLevels,
  showProficiencyLevels = true,
  showYearsOfExperience = true,
  showCertifications = true,
  animationSpeed = 0.6,
  className = '',
}: CategorySectionProps) => {
  // Animation variants
  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 20,
        duration: animationSpeed,
      },
    },
  };

  const skillGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <motion.section
      className={`category-section ${className}`}
      variants={categoryVariants}
      initial='hidden'
      animate='visible'
    >
      {/* Category Header */}
      <div className='category-header mb-6 p-4 bg-deep-navy-700 rounded-lg border border-electric-cyan-500/30'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <div className='text-2xl' aria-hidden='true'>
              {category.icon === 'shield'
                ? '🛡️'
                : category.icon === 'code'
                  ? '💻'
                  : '📁'}
            </div>
            <div>
              <h3 className='text-xl font-bold text-white mb-1'>
                {category.title}
              </h3>
              <p className='text-gray-400 text-sm'>{category.description}</p>
            </div>
          </div>

          {/* Category Stats */}
          <div className='text-right'>
            <div className='text-electric-cyan-400 font-bold text-lg'>
              {category.skillCount}
            </div>
            <div className='text-gray-500 text-xs'>Skills</div>
            <div className='text-neon-green-400 font-medium text-sm mt-1'>
              Avg: {category.averageProficiency}%
            </div>
          </div>
        </div>
      </div>

      {/* Skill Grid */}
      <motion.div
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
        variants={skillGridVariants}
      >
        {category.skills.map(skill => (
          <SkillCard
            key={skill.id}
            skill={skill}
            proficiencyLevels={proficiencyLevels}
            showProficiencyLevels={showProficiencyLevels}
            showYearsOfExperience={showYearsOfExperience}
            showCertifications={showCertifications}
            onClick={onSkillClick}
          />
        ))}
      </motion.div>
    </motion.section>
  );
};
