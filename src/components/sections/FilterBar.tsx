'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaseStudyFilters } from '@/types/caseStudies';

interface FilterBarProps {
  filters: CaseStudyFilters;
  onFilterChange: (filterType: keyof CaseStudyFilters, value: string | string[]) => void;
  onSortChange: (sortBy: CaseStudyFilters['sortBy']) => void;
  availableFilters: {
    categories: { id: string; label: string; count: number; isActive: boolean }[];
    securityDomains: { id: string; label: string; count: number; isActive: boolean }[];
    industries: { id: string; label: string; count: number; isActive: boolean }[];
    projectSizes: { id: string; label: string; count: number; isActive: boolean }[];
    difficultyLevels: { id: string; label: string; count: number; isActive: boolean }[];
    compliance: { id: string; label: string; count: number; isActive: boolean }[];
  };
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onSortChange,
  availableFilters,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const toggleFilter = (filterType: keyof CaseStudyFilters, filterId: string) => {
    const currentFilters = filters[filterType] as string[];
    const newFilters = currentFilters.includes(filterId)
      ? currentFilters.filter(id => id !== filterId)
      : [...currentFilters, filterId];
    
    onFilterChange(filterType, newFilters);
  };

  const clearAllFilters = () => {
    onFilterChange('categories', []);
    onFilterChange('securityDomains', []);
    onFilterChange('industries', []);
    onFilterChange('projectSizes', []);
    onFilterChange('difficultyLevels', []);
    onFilterChange('compliance', []);
  };

  const hasActiveFilters = 
    filters.categories.length > 0 ||
    filters.securityDomains.length > 0 ||
    filters.industries.length > 0 ||
    filters.projectSizes.length > 0 ||
    filters.difficultyLevels.length > 0 ||
    filters.compliance.length > 0;

  // Animation variants
  const filterVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  return (
    <div className="bg-navy-800/50 backdrop-blur-sm border border-navy-700 rounded-lg p-4 mb-4">
      {/* Main Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Categories Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-300">Categories:</label>
          <div className="flex flex-wrap gap-1">
            {availableFilters.categories.slice(0, 6).map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleFilter('categories', category.id)}
                className={`
                  px-3 py-1 rounded-full text-xs font-medium transition-all duration-200
                  ${filters.categories.includes(category.id)
                    ? 'bg-cyan-600 text-white'
                    : 'bg-navy-700 text-gray-300 hover:bg-navy-600'
                  }
                `}
              >
                {category.label} ({category.count})
              </motion.button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-300">Sort by:</label>
          <select
            value={filters.sortBy}
            onChange={(e) => onSortChange(e.target.value as CaseStudyFilters['sortBy'])}
            className="bg-navy-700 border border-navy-600 rounded px-3 py-1 text-sm text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="impact">Impact (Most Metrics)</option>
            <option value="client-size">Client Size</option>
          </select>
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div className="flex justify-end mt-3">
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="text-cyan-400 hover:text-white text-sm font-medium transition-colors duration-300 flex items-center space-x-1"
        >
          <span>
            {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${showAdvancedFilters ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showAdvancedFilters && (
          <motion.div
            variants={filterVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="border-t border-navy-700 pt-4 mt-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Security Domains */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Security Domains:</label>
                <div className="flex flex-wrap gap-2">
                  {availableFilters.securityDomains.map((domain) => (
                    <motion.button
                      key={domain.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleFilter('securityDomains', domain.id)}
                      className={`
                        px-3 py-1 rounded-full text-xs font-medium transition-all duration-200
                        ${filters.securityDomains.includes(domain.id)
                          ? 'bg-neon-green-600 text-white'
                          : 'bg-navy-700 text-gray-300 hover:bg-navy-600'
                        }
                      `}
                    >
                      {domain.label} ({domain.count})
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Industries */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Industries:</label>
                <div className="flex flex-wrap gap-2">
                  {availableFilters.industries.map((industry) => (
                    <motion.button
                      key={industry.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleFilter('industries', industry.id)}
                      className={`
                        px-3 py-1 rounded-full text-xs font-medium transition-all duration-200
                        ${filters.industries.includes(industry.id)
                          ? 'bg-cyan-600 text-white'
                          : 'bg-navy-700 text-gray-300 hover:bg-navy-600'
                        }
                      `}
                    >
                      {industry.label} ({industry.count})
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Project Sizes */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Project Sizes:</label>
                <div className="flex flex-wrap gap-2">
                  {availableFilters.projectSizes.map((size) => (
                    <motion.button
                      key={size.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleFilter('projectSizes', size.id)}
                      className={`
                        px-3 py-1 rounded-full text-xs font-medium transition-all duration-200
                        ${filters.projectSizes.includes(size.id)
                          ? 'bg-neon-green-600 text-white'
                          : 'bg-navy-700 text-gray-300 hover:bg-navy-600'
                        }
                      `}
                    >
                      {size.label} ({size.count})
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Difficulty Levels */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Difficulty Levels:</label>
                <div className="flex flex-wrap gap-2">
                  {availableFilters.difficultyLevels.map((level) => (
                    <motion.button
                      key={level.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleFilter('difficultyLevels', level.id)}
                      className={`
                        px-3 py-1 rounded-full text-xs font-medium transition-all duration-200
                        ${filters.difficultyLevels.includes(level.id)
                          ? 'bg-orange-600 text-white'
                          : 'bg-navy-700 text-gray-300 hover:bg-navy-600'
                        }
                      `}
                    >
                      {level.label} ({level.count})
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Compliance */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Compliance:</label>
                <div className="flex flex-wrap gap-2">
                  {availableFilters.compliance.map((compliance) => (
                    <motion.button
                      key={compliance.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleFilter('compliance', compliance.id)}
                      className={`
                        px-3 py-1 rounded-full text-xs font-medium transition-all duration-200
                        ${filters.compliance.includes(compliance.id)
                          ? 'bg-blue-600 text-white'
                          : 'bg-navy-700 text-gray-300 hover:bg-navy-600'
                        }
                      `}
                    >
                      {compliance.label} ({compliance.count})
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Actions */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            variants={filterVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex justify-end mt-4 pt-4 border-t border-navy-700"
          >
            <button
              onClick={clearAllFilters}
              className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors duration-300 flex items-center space-x-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Clear All Filters</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};