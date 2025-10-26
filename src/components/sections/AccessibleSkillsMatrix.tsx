'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useRef, KeyboardEvent } from 'react';
import { DetailedSkill, SkillCategory, SkillsMatrixConfig } from '@/types';
import { SKILLS_MATRIX_CONFIG, PROFICIENCY_LEVELS } from '@/lib/data';
import { SkillCard } from './SkillCard';
import { CategorySection } from './CategorySection';
import { MatrixHeader } from './MatrixHeader';

interface AccessibleSkillsMatrixProps {
  config?: SkillsMatrixConfig;
  className?: string;
}

export const AccessibleSkillsMatrix = ({
  config = SKILLS_MATRIX_CONFIG,
  className = '',
}: AccessibleSkillsMatrixProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [focusedElement, setFocusedElement] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const categoryButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);

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

  // Keyboard navigation handlers
  const handleKeyDown = (event: KeyboardEvent, category: string) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        setSelectedCategory(category);
        break;
      case 'ArrowRight':
        event.preventDefault();
        const currentIndex = allCategories.indexOf(category);
        if (currentIndex < allCategories.length - 1) {
          const nextCategory = allCategories[currentIndex + 1];
          setSelectedCategory(nextCategory);
          setTimeout(() => {
            const nextButton =
              categoryButtonsRef.current[allCategories.indexOf(nextCategory)];
            nextButton?.focus();
          }, 0);
        }
        break;
      case 'ArrowLeft':
        event.preventDefault();
        const currentIndex2 = allCategories.indexOf(category);
        if (currentIndex2 > 0) {
          const prevCategory = allCategories[currentIndex2 - 1];
          setSelectedCategory(prevCategory);
          setTimeout(() => {
            const prevButton =
              categoryButtonsRef.current[allCategories.indexOf(prevCategory)];
            prevButton?.focus();
          }, 0);
        }
        break;
    }
  };

  const handleSearchKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setSearchTerm('');
      searchInputRef.current?.focus();
    }
  };

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
        stiffness: 150,
        damping: 20,
        duration: 0.6,
      },
    },
  };

  return (
    <motion.section
      className={`skills-matrix ${className}`}
      initial='hidden'
      animate='visible'
      variants={containerVariants}
      role='region'
      aria-label='Cybersecurity and development skills matrix'
      tabIndex={-1}
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
        role='search'
        aria-label='Skills search and filter controls'
      >
        <div className='flex flex-col md:flex-row gap-4 items-start md:items-center justify-between'>
          {/* Search */}
          {config.enableSearch && (
            <div className='flex-1 min-w-0'>
              <label htmlFor='skills-search' className='sr-only'>
                Search skills by name or description
              </label>
              <input
                id='skills-search'
                ref={searchInputRef}
                type='text'
                placeholder='Search skills by name or description...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className='w-full px-4 py-2 bg-security-gray-700 border border-security-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-electric-cyan-500 focus:ring-1 focus:ring-electric-cyan-500 transition-colors'
                aria-label='Search skills'
              />
            </div>
          )}

          {/* Category Filter */}
          {config.enableFiltering && (
            <div
              className='flex flex-wrap gap-2'
              role='group'
              aria-label='Skill category filters'
            >
              <button
                ref={el => {
                  categoryButtonsRef.current[0] = el;
                }}
                onClick={() => setSelectedCategory('all')}
                onKeyDown={e => handleKeyDown(e, 'all')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-neon-green-500/20 text-neon-green-400 border border-neon-green-500/30'
                    : 'bg-security-gray-700 text-gray-400 hover:bg-security-gray-600'
                }`}
                aria-pressed={selectedCategory === 'all'}
                aria-label={`Show all skills (${config.categories.reduce((sum, cat) => sum + cat.skillCount, 0)} total)`}
              >
                All (
                {config.categories.reduce(
                  (sum, cat) => sum + cat.skillCount,
                  0
                )}
                )
              </button>
              {allCategories.map((category, index) => (
                <button
                  key={category}
                  ref={el => {
                    categoryButtonsRef.current[index + 1] = el;
                  }}
                  onClick={() => setSelectedCategory(category)}
                  onKeyDown={e => handleKeyDown(e, category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-electric-cyan-500/20 text-electric-cyan-400 border border-electric-cyan-500/30'
                      : 'bg-security-gray-700 text-gray-400 hover:bg-security-gray-600'
                  }`}
                  aria-pressed={selectedCategory === category}
                  aria-label={`Show ${category.replace('-', ' ')} skills`}
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
            aria-pressed={showAllSkills}
            aria-label={
              showAllSkills
                ? 'Hide empty categories'
                : 'Show all categories including empty ones'
            }
          >
            {showAllSkills ? 'Hide Empty' : 'Show All'}
          </button>
        </div>
      </motion.div>

      {/* Skills Categories */}
      <AnimatePresence mode='wait'>
        <motion.div
          className='grid gap-8'
          variants={containerVariants}
          role='list'
          aria-label='Skill categories'
        >
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
          role='alert'
          aria-live='polite'
        >
          <div className='text-6xl mb-4' aria-hidden='true'>
            🔍
          </div>
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
