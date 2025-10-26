'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/Badge';
import { DetailedSkill, SkillCategory, SkillsMatrixConfig } from '@/types';
import { SKILLS_MATRIX_CONFIG, PROFICIENCY_LEVELS } from '@/lib/data';
import { SkillCard } from './SkillCard';
import { CategorySection } from './CategorySection';
import { MatrixHeader } from './MatrixHeader';

interface SkillsMatrixProps {
  config?: SkillsMatrixConfig;
  className?: string;
}

export const SkillsMatrix = ({
  config = SKILLS_MATRIX_CONFIG,
  className = '',
}: SkillsMatrixProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAllSkills, setShowAllSkills] = useState(false);

  // Filter skills based on search term and category
  const filteredSkills = useMemo(() => {
    return config.categories
      .map(category => ({
        ...category,
        skills: category.skills.filter(skill => {
          const matchesSearch =
            skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            skill.description.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesCategory =
            selectedCategory === 'all' || skill.category === selectedCategory;
          return matchesSearch && matchesCategory;
        }),
      }))
      .filter(category => category.skills.length > 0 || showAllSkills);
  }, [config.categories, searchTerm, selectedCategory, showAllSkills]);

  // Get all unique categories for filtering
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    config.categories.forEach(category => {
      category.skills.forEach(skill => {
        categories.add(skill.category);
      });
    });
    return Array.from(categories).sort();
  }, [config.categories]);

  // Get proficiency level for display
  const getProficiencyLevel = (proficiency: number) => {
    return (
      PROFICIENCY_LEVELS.find(
        level =>
          proficiency >= level.minPercentage &&
          proficiency <= level.maxPercentage
      ) || PROFICIENCY_LEVELS[2]
    ); // Default to intermediate
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.section
      className={`skills-matrix ${className}`}
      initial='hidden'
      animate='visible'
      variants={containerVariants}
    >
      {/* Matrix Header */}
      <MatrixHeader
        title={config.title}
        description={config.description}
        totalSkills={config.categories.reduce(
          (sum, cat) => sum + cat.skillCount,
          0
        )}
        averageProficiency={Math.round(
          config.categories.reduce(
            (sum, cat) => sum + cat.averageProficiency,
            0
          ) / config.categories.length
        )}
      />

      {/* Controls */}
      <motion.div
        className='matrix-controls mb-8 p-6 bg-security-gray-800 rounded-xl border border-security-gray-700'
        variants={categoryVariants}
      >
        <div className='flex flex-col md:flex-row gap-4 items-start md:items-center justify-between'>
          {/* Search */}
          {config.enableSearch && (
            <div className='flex-1 min-w-0'>
              <input
                type='text'
                placeholder='Search skills by name or description...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='w-full px-4 py-2 bg-security-gray-700 border border-security-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-electric-cyan-500 focus:ring-1 focus:ring-electric-cyan-500 transition-colors'
              />
            </div>
          )}

          {/* Category Filter */}
          {config.enableFiltering && (
            <div className='flex flex-wrap gap-2'>
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-neon-green-500/20 text-neon-green-400 border border-neon-green-500/30'
                    : 'bg-security-gray-700 text-gray-400 hover:bg-security-gray-600'
                }`}
              >
                All (
                {config.categories.reduce(
                  (sum, cat) => sum + cat.skillCount,
                  0
                )}
                )
              </button>
              {allCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-electric-cyan-500/20 text-electric-cyan-400 border border-electric-cyan-500/30'
                      : 'bg-security-gray-700 text-gray-400 hover:bg-security-gray-600'
                  }`}
                >
                  {category
                    .replace('-', ' ')
                    .replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>
          )}

          {/* Show All Toggle */}
          <button
            onClick={() => setShowAllSkills(!showAllSkills)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              showAllSkills
                ? 'bg-neon-green-500/20 text-neon-green-400 border border-neon-green-500/30'
                : 'bg-security-gray-700 text-gray-400 hover:bg-security-gray-600'
            }`}
          >
            {showAllSkills ? 'Hide Empty' : 'Show All'}
          </button>
        </div>
      </motion.div>

      {/* Skills Categories */}
      <AnimatePresence mode='wait'>
        <motion.div className='grid gap-8' variants={containerVariants}>
          {filteredSkills.map(category => (
            <CategorySection
              key={category.id}
              category={category}
              onSkillClick={(skill: DetailedSkill) => {
                // Handle skill click - could open modal or navigate to skill details
                console.log('Skill clicked:', skill.name);
              }}
              proficiencyLevels={PROFICIENCY_LEVELS}
              showProficiencyLevels={config.showProficiencyLevels}
              showYearsOfExperience={config.showYearsOfExperience}
              showCertifications={config.showCertifications}
              animationSpeed={config.animationSpeed}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredSkills.length === 0 && (
        <motion.div
          className='text-center py-12'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className='text-6xl mb-4'>🔍</div>
          <h3 className='text-xl font-semibold text-gray-400 mb-2'>
            No skills found
          </h3>
          <p className='text-gray-500'>
            Try adjusting your search terms or category filters.
          </p>
        </motion.div>
      )}
    </motion.section>
  );
};
