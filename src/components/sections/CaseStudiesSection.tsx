'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CaseStudy,
  CaseStudyFilters,
  CaseStudiesConfig,
  CaseStudyCategory,
  SecurityDomain,
  ProjectSize,
} from '@/types/caseStudies';
import {
  CASE_STUDIES,
  CASE_STUDIES_CONFIG,
  CASE_STUDY_FILTERS,
} from '@/lib/caseStudiesData';
import { CaseStudyCard } from './CaseStudyCard';
import { FilterBar } from './FilterBar';
import { SearchBar } from './SearchBar';
import { CaseStudyModal } from './CaseStudyModal';
import { MetricsDisplay } from './MetricsDisplay';
import { ClientLogos } from './ClientLogos';
import { Pagination } from './Pagination';

interface CaseStudiesSectionProps {
  config?: Partial<CaseStudiesConfig>;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  config: customConfig,
}) => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(CASE_STUDIES);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter states
  const [filters, setFilters] = useState<CaseStudyFilters>({
    categories: [],
    securityDomains: [],
    industries: [],
    projectSizes: [],
    difficultyLevels: [],
    compliance: [],
    searchQuery: '',
    sortBy: 'newest',
  });

  const config = { ...CASE_STUDIES_CONFIG, ...customConfig };

  // Memoized filtered and sorted case studies
  const filteredCaseStudies = useMemo(() => {
    let filtered = [...caseStudies];

    // Apply category filters
    if (filters.categories.length > 0) {
      filtered = filtered.filter(caseStudy =>
        filters.categories.some(category =>
          caseStudy.category.includes(category as CaseStudyCategory)
        )
      );
    }

    // Apply security domain filters
    if (filters.securityDomains.length > 0) {
      filtered = filtered.filter(caseStudy =>
        filters.securityDomains.some(domain =>
          caseStudy.securityDomain.includes(domain as SecurityDomain)
        )
      );
    }

    // Apply industry filters
    if (filters.industries.length > 0) {
      filtered = filtered.filter(caseStudy =>
        filters.industries.includes(caseStudy.industry.toLowerCase())
      );
    }

    // Apply project size filters
    if (filters.projectSizes.length > 0) {
      filtered = filtered.filter(caseStudy =>
        filters.projectSizes.includes(caseStudy.projectSize as string)
      );
    }

    // Apply difficulty level filters
    if (filters.difficultyLevels.length > 0) {
      filtered = filtered.filter(caseStudy =>
        filters.difficultyLevels.includes(caseStudy.difficultyLevel)
      );
    }

    // Apply compliance filters
    if (filters.compliance.length > 0) {
      filtered = filtered.filter(caseStudy =>
        caseStudy.compliance?.some(compliance =>
          filters.compliance.includes(compliance.toLowerCase())
        )
      );
    }

    // Apply search query
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        caseStudy =>
          caseStudy.title.toLowerCase().includes(query) ||
          caseStudy.subtitle.toLowerCase().includes(query) ||
          caseStudy.description.toLowerCase().includes(query) ||
          caseStudy.client.name.toLowerCase().includes(query) ||
          caseStudy.technologies.some(tech =>
            tech.toLowerCase().includes(query)
          )
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return (
            new Date(b.timeline.startDate).getTime() -
            new Date(a.timeline.startDate).getTime()
          );
        case 'oldest':
          return (
            new Date(a.timeline.startDate).getTime() -
            new Date(b.timeline.startDate).getTime()
          );
        case 'impact':
          return (b.metrics?.length || 0) - (a.metrics?.length || 0);
        case 'client-size':
          const sizeOrder = {
            enterprise: 4,
            'mid-market': 3,
            large: 3,
            medium: 2,
            smb: 1,
            small: 1,
            startup: 1,
          };
          return (
            (sizeOrder[b.projectSize as keyof typeof sizeOrder] || 1) -
            (sizeOrder[a.projectSize as keyof typeof sizeOrder] || 1)
          );
        default:
          return 0;
      }
    });

    return filtered;
  }, [caseStudies, filters]);

  // Pagination logic
  const paginatedCaseStudies = useMemo(() => {
    const startIndex = (currentPage - 1) * config.itemsPerPage;
    const endIndex = startIndex + config.itemsPerPage;
    return filteredCaseStudies.slice(startIndex, endIndex);
  }, [filteredCaseStudies, currentPage, config.itemsPerPage]);

  const totalPages = Math.ceil(
    filteredCaseStudies.length / config.itemsPerPage
  );

  // Handle filter changes
  const handleFilterChange = (
    filterType: keyof CaseStudyFilters,
    value: string | string[]
  ) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSearchChange = (query: string) => {
    handleFilterChange('searchQuery', query);
  };

  const handleSortChange = (sortBy: CaseStudyFilters['sortBy']) => {
    handleFilterChange('sortBy', sortBy);
  };

  // Handle case study click
  const handleCaseStudyClick = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCaseStudy(null), 300); // Delay to allow animation
  };

  // Load more case studies (for lazy loading)
  const loadMore = () => {
    if (isLoading) return;

    setIsLoading(true);
    // Simulate loading more case studies
    setTimeout(() => {
      // In a real implementation, this would fetch more case studies from an API
      setIsLoading(false);
    }, 1000);
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id='case-studies'
      aria-labelledby='case-studies-heading'
      className='py-20 bg-navy-900'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <div className='inline-flex items-center space-x-2 bg-navy-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-2 mb-6'>
            <svg
              className='w-4 h-4 text-cyan-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707v4.586a2 2 0 01-2 2h-2.5a1 1 0 01-.8-.4L12 16.8l-1.7 1.6a1 1 0 01-.8.4H7a2 2 0 01-2-2v6a2 2 0 012-2zm0 0a3 3 0 003 3h6a3 3 0 003-3V8a3 3 0 00-3-3H7a3 3 0 00-3 3v8z'
              />
            </svg>
            <span className='text-cyan-400 font-medium text-sm'>
              Proven Security Results
            </span>
          </div>

          <h2
            id='case-studies-heading'
            className='text-4xl md:text-5xl font-bold text-white mb-6'
          >
            Case Studies &{' '}
            <span className='text-neon-green-400'>Security Projects</span>
          </h2>

          <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
            {config.description}
          </p>
        </motion.div>

        {/* Client Logos (if enabled) */}
        {config.showClientLogos && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='mb-12'
          >
            <ClientLogos caseStudies={caseStudies} />
          </motion.div>
        )}

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='mb-8'
        >
          {config.showSearch && (
            <SearchBar
              onSearch={handleSearchChange}
              placeholder='Search case studies by client, technology, or outcome...'
            />
          )}

          {config.showFilters && (
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
              availableFilters={CASE_STUDY_FILTERS}
            />
          )}
        </motion.div>

        {/* Metrics Summary (if enabled) */}
        {config.showMetrics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='mb-12'
          >
            <MetricsDisplay caseStudies={filteredCaseStudies} />
          </motion.div>
        )}

        {/* Case Studies Grid */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12'
        >
          <AnimatePresence mode='wait'>
            {paginatedCaseStudies.map(caseStudy => (
              <motion.div
                key={caseStudy.id}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <CaseStudyCard
                  caseStudy={caseStudy}
                  onClick={() => handleCaseStudyClick(caseStudy)}
                  showMetrics={config.showMetrics}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredCaseStudies.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-center py-12'
          >
            <div className='w-24 h-24 mx-auto mb-4 bg-navy-700 rounded-full flex items-center justify-center'>
              <svg
                className='w-12 h-12 text-gray-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1}
                  d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707v4.586a2 2 0 01-2 2h-2.5a1 1 0 01-.8-.4L12 16.8l-1.7 1.6a1 1 0 01-.8.4H7a2 2 0 01-2-2v6a2 2 0 012-2zm0 0a3 3 0 003 3h6a3 3 0 003-3V8a3 3 0 00-3-3H7a3 3 0 00-3 3v8z'
                />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-white mb-2'>
              No Case Studies Found
            </h3>
            <p className='text-gray-400 mb-6'>
              Try adjusting your filters or search terms to find relevant case
              studies.
            </p>
            <button
              onClick={() =>
                setFilters({
                  categories: [],
                  securityDomains: [],
                  industries: [],
                  projectSizes: [],
                  difficultyLevels: [],
                  compliance: [],
                  searchQuery: '',
                  sortBy: 'newest',
                })
              }
              className='text-cyan-400 hover:text-white transition-colors duration-300 text-sm font-medium'
            >
              Clear All Filters
            </button>
          </motion.div>
        )}

        {/* Pagination */}
        {config.showPagination && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className='flex justify-center'
          >
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              showFirstLast={true}
              showNumbers={true}
            />
          </motion.div>
        )}

        {/* Load More Button (for infinite scroll alternative) */}
        {config.enableLazyLoading && filteredCaseStudies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className='text-center mt-8'
          >
            <button
              onClick={loadMore}
              disabled={isLoading}
              className='inline-flex items-center space-x-2 bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isLoading ? (
                <>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span>Load More Case Studies</span>
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 14l-7 7m0 0l-7-7m7 7V3'
                    />
                  </svg>
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </section>
  );
};
