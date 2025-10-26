'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Star,
  Users,
  Award,
  CheckCircle,
  TrendingUp,
  Database,
  AlertCircle,
} from 'lucide-react';
import Image from 'next/image';
import { TestimonialCard, FeaturedTestimonialCard } from './TestimonialCard';
import { TestimonialCarousel } from './TestimonialCarousel';
import {
  TestimonialFilterBar,
  TestimonialSearchBar,
  QuickFilterChips,
} from './TestimonialFilterBar';
import { TestimonialClientLogos } from './TestimonialClientLogos';
import type {
  EnhancedTestimonial,
  TestimonialFilters,
  TestimonialCategory,
  TrustIndicator,
  SecurityBadge,
  TestimonialsConfig,
} from '@/types/testimonials';
import {
  ENHANCED_TESTIMONIALS,
  TESTIMONIAL_CATEGORIES,
  TESTIMONIALS_CONFIG,
  TRUST_INDICATORS,
  SECURITY_BADGES,
  CLIENT_INFO,
} from '@/lib/testimonialsData';

interface TestimonialsSectionProps {
  config?: Partial<TestimonialsConfig>;
  testimonials?: EnhancedTestimonial[];
  categories?: TestimonialCategory[];
  showTrustIndicators?: boolean;
  showSecurityBadges?: boolean;
  showClientLogos?: boolean;
  className?: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  config: customConfig,
  testimonials: customTestimonials,
  categories: customCategories,
  showTrustIndicators = true,
  showSecurityBadges = true,
  showClientLogos = true,
  className = '',
}) => {
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<EnhancedTestimonial | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter states
  const [filters, setFilters] = useState<TestimonialFilters>({
    categories: [],
    securityDomains: [],
    industries: [],
    companySizes: [],
    projectTypes: [],
    ratings: [],
    searchQuery: '',
    sortBy: 'newest',
  });

  const config = { ...TESTIMONIALS_CONFIG, ...customConfig };
  const testimonials = customTestimonials || ENHANCED_TESTIMONIALS;
  const categories = customCategories || TESTIMONIAL_CATEGORIES;

  // Memoized filtered and sorted testimonials
  const filteredTestimonials = useMemo(() => {
    let filtered = [...testimonials];

    // Apply category filters
    if (filters.categories.length > 0) {
      filtered = filtered.filter(testimonial => {
        if (filters.categories.includes('featured')) {
          return testimonial.featured;
        }
        return filters.categories.some(categoryId => {
          const category = categories.find(c => c.id === categoryId);
          return (
            category &&
            testimonial.securityDomain?.some(domain =>
              category.securityDomains.includes(domain)
            )
          );
        });
      });
    }

    // Apply security domain filters
    if (filters.securityDomains.length > 0) {
      filtered = filtered.filter(testimonial =>
        filters.securityDomains.some(domain =>
          testimonial.securityDomain?.includes(domain as any)
        )
      );
    }

    // Apply industry filters
    if (filters.industries.length > 0) {
      filtered = filtered.filter(testimonial =>
        filters.industries.includes(
          testimonial.companyIndustry?.toLowerCase() || ''
        )
      );
    }

    // Apply company size filters
    if (filters.companySizes.length > 0) {
      filtered = filtered.filter(testimonial =>
        filters.companySizes.includes(testimonial.companySize || '')
      );
    }

    // Apply project type filters
    if (filters.projectTypes.length > 0) {
      filtered = filtered.filter(testimonial =>
        filters.projectTypes.includes(testimonial.projectType || '')
      );
    }

    // Apply rating filters
    if (filters.ratings.length > 0) {
      filtered = filtered.filter(testimonial =>
        filters.ratings.some(rating => testimonial.rating >= rating)
      );
    }

    // Apply search query
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        testimonial =>
          testimonial.name.toLowerCase().includes(query) ||
          testimonial.company.toLowerCase().includes(query) ||
          testimonial.content.toLowerCase().includes(query) ||
          testimonial.role.toLowerCase().includes(query) ||
          (testimonial.tags &&
            testimonial.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return (
            new Date(b.date || '').getTime() - new Date(a.date || '').getTime()
          );
        case 'oldest':
          return (
            new Date(a.date || '').getTime() - new Date(b.date || '').getTime()
          );
        case 'rating':
          return b.rating - a.rating;
        case 'impact':
          return (
            (b.securityMetrics?.securityScoreImprovement || 0) -
            (a.securityMetrics?.securityScoreImprovement || 0)
          );
        case 'company-size':
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
            (sizeOrder[b.companySize as keyof typeof sizeOrder] || 1) -
            (sizeOrder[a.companySize as keyof typeof sizeOrder] || 1)
          );
        default:
          return 0;
      }
    });

    return filtered;
  }, [testimonials, filters, categories]);

  // Pagination logic
  const paginatedTestimonials = useMemo(() => {
    const startIndex = (currentPage - 1) * config.itemsPerPage;
    const endIndex = startIndex + config.itemsPerPage;
    return filteredTestimonials.slice(startIndex, endIndex);
  }, [filteredTestimonials, currentPage, config.itemsPerPage]);

  const totalPages = Math.ceil(
    filteredTestimonials.length / config.itemsPerPage
  );

  // Handle filter changes
  const handleFilterChange = (
    filterType: keyof TestimonialFilters,
    value: string | string[] | number[]
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

  const handleSortChange = (sortBy: TestimonialFilters['sortBy']) => {
    handleFilterChange('sortBy', sortBy);
  };

  // Handle testimonial click
  const handleTestimonialClick = (testimonial: EnhancedTestimonial) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTestimonial(null), 300); // Delay to allow animation
  };

  // Load more testimonials (for lazy loading)
  const loadMore = () => {
    if (isLoading) return;

    setIsLoading(true);
    // Simulate loading more testimonials
    setTimeout(() => {
      // In a real implementation, this would fetch more testimonials from an API
      setIsLoading(false);
    }, 1000);
  };

  // Security-focused trust indicators
  const renderTrustIndicators = () => {
    if (!showTrustIndicators) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-16'
      >
        {TRUST_INDICATORS.map(indicator => (
          <motion.div
            key={indicator.id}
            whileHover={{ y: -4, scale: 1.05 }}
            className='text-center p-6 bg-gradient-to-br from-deep-navy-800 to-deep-navy-700 border border-deep-navy-600 rounded-xl'
          >
            <div className='flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-electric-cyan-500/20 to-neon-green-500/20 rounded-full'>
              {indicator.icon &&
                React.createElement(indicator.icon, {
                  className: `w-6 h-6 ${indicator.color}`,
                })}
            </div>
            <div className='text-2xl font-bold text-white mb-1'>
              {indicator.value}
            </div>
            <div className='text-sm text-gray-400'>{indicator.title}</div>
            {indicator.description && (
              <div className='text-xs text-gray-500 mt-2'>
                {indicator.description}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    );
  };

  // Security badges display
  const renderSecurityBadges = () => {
    if (!showSecurityBadges) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className='mb-16'
      >
        <div className='text-center mb-8'>
          <h3 className='text-2xl font-bold text-white mb-2'>
            Security Excellence
          </h3>
          <p className='text-gray-400'>
            Recognized for outstanding security achievements
          </p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {SECURITY_BADGES.map(badge => (
            <motion.div
              key={badge.id}
              whileHover={{ y: -2, scale: 1.02 }}
              className='p-4 bg-gradient-to-br from-deep-navy-800 to-deep-navy-700 border border-deep-navy-600 rounded-lg text-center'
            >
              <div className='flex items-center justify-center w-8 h-8 mx-auto mb-2 bg-gradient-to-r from-electric-cyan-500/20 to-neon-green-500/20 rounded-full'>
                {badge.icon &&
                  React.createElement(badge.icon, {
                    className: `w-4 h-4 ${badge.color}`,
                  })}
              </div>
              <div className='text-sm font-semibold text-white mb-1'>
                {badge.name}
              </div>
              <div className='text-xs text-gray-400'>
                {badge.clients.length} clients
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  // Featured testimonials carousel
  const renderFeaturedCarousel = () => {
    const featuredTestimonials = testimonials.filter(t => t.featured);

    if (featuredTestimonials.length === 0 || !config.showCarousel) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className='mb-16'
      >
        <div className='text-center mb-8'>
          <h3 className='text-2xl font-bold text-white mb-2'>
            Featured Success Stories
          </h3>
          <p className='text-gray-400'>
            Our most impactful security transformations
          </p>
        </div>

        <TestimonialCarousel
          testimonials={featuredTestimonials}
          autoPlay={true}
          interval={6000}
          showControls={true}
          showIndicators={true}
          showSecurityMetrics={true}
          variant='featured'
          className='mx-auto'
        />
      </motion.div>
    );
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
      id='testimonials'
      aria-labelledby='testimonials-heading'
      className={`py-20 bg-gradient-to-b from-deep-navy-900 to-deep-navy-800 ${className}`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <div className='inline-flex items-center space-x-2 bg-deep-navy-800/80 backdrop-blur-sm border border-electric-cyan-500/30 rounded-full px-6 py-2 mb-6'>
            <Shield className='w-4 h-4 text-electric-cyan-400' />
            <span className='text-electric-cyan-400 font-medium text-sm'>
              Client Verified & Security Tested
            </span>
          </div>

          <h2
            id='testimonials-heading'
            className='text-4xl md:text-5xl font-bold text-white mb-6'
          >
            Client Testimonials &{' '}
            <span className='text-neon-green-400'>
              Security Success Stories
            </span>
          </h2>

          <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
            {config.description}
          </p>
        </motion.div>

        {/* Trust Indicators */}
        {renderTrustIndicators()}

        {/* Security Badges */}
        {renderSecurityBadges()}

        {/* Client Logos (if enabled) */}
        {showClientLogos && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='mb-16'
          >
            <TestimonialClientLogos clients={CLIENT_INFO} />
          </motion.div>
        )}

        {/* Featured Carousel */}
        {renderFeaturedCarousel()}

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='mb-8'
        >
          {config.showSearch && (
            <div className='mb-6'>
              <TestimonialSearchBar
                value={filters.searchQuery}
                onChange={handleSearchChange}
                placeholder='Search testimonials by client, company, technology, or security domain...'
              />
            </div>
          )}

          {config.showFilterBar && (
            <TestimonialFilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
              availableCategories={categories}
              testimonials={filteredTestimonials}
            />
          )}
        </motion.div>

        {/* Quick Filter Chips for Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='mb-8 lg:hidden'
        >
          <QuickFilterChips
            filters={filters}
            onFilterChange={handleFilterChange}
            testimonials={filteredTestimonials}
          />
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12'
        >
          <AnimatePresence mode='wait'>
            {paginatedTestimonials.map(testimonial => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  showSecurityMetrics={config.showSecurityMetrics}
                  showRating={config.showRatings}
                  showVerificationBadge={config.showVerificationBadges}
                  onClick={() => handleTestimonialClick(testimonial)}
                  className='h-full'
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredTestimonials.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-center py-12'
          >
            <div className='w-24 h-24 mx-auto mb-4 bg-deep-navy-700 rounded-full flex items-center justify-center'>
              <Shield className='w-12 h-12 text-gray-500' />
            </div>
            <h3 className='text-lg font-semibold text-white mb-2'>
              No Testimonials Found
            </h3>
            <p className='text-gray-400 mb-6'>
              Try adjusting your filters or search terms to find relevant
              testimonials.
            </p>
            <button
              onClick={() =>
                setFilters({
                  categories: [],
                  securityDomains: [],
                  industries: [],
                  companySizes: [],
                  projectTypes: [],
                  ratings: [],
                  searchQuery: '',
                  sortBy: 'newest',
                })
              }
              className='text-electric-cyan-400 hover:text-white transition-colors duration-300 text-sm font-medium'
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
            <div className='flex items-center space-x-2'>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className='px-3 py-2 bg-deep-navy-700 border border-deep-navy-600 rounded-lg text-electric-cyan-400 hover:bg-electric-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Previous
              </button>
              <span className='text-white px-4'>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage(prev => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className='px-3 py-2 bg-deep-navy-700 border border-deep-navy-600 rounded-lg text-electric-cyan-400 hover:bg-electric-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {/* Load More Button (for infinite scroll alternative) */}
        {config.enableLazyLoading && filteredTestimonials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className='text-center mt-8'
          >
            <button
              onClick={loadMore}
              disabled={isLoading}
              className='inline-flex items-center space-x-2 bg-electric-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-electric-cyan-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isLoading ? (
                <>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span>Load More Testimonials</span>
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

      {/* Testimonial Modal */}
      {selectedTestimonial && (
        <TestimonialModal
          testimonial={selectedTestimonial}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </section>
  );
};

// Testimonial Modal Component
const TestimonialModal: React.FC<{
  testimonial: EnhancedTestimonial;
  isOpen: boolean;
  onClose: () => void;
}> = ({ testimonial, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center'>
        <div
          className='fixed inset-0 bg-black/70 transition-opacity'
          onClick={onClose}
        />

        <div className='inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-deep-navy-800 border border-deep-navy-600 rounded-2xl'>
          <div className='relative'>
            <button
              onClick={onClose}
              className='absolute top-4 right-4 z-10 w-8 h-8 bg-deep-navy-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white'
            >
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
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>

            <div className='p-8'>
              <div className='flex items-start space-x-6'>
                <div className='flex-shrink-0'>
                  <div className='w-20 h-20 rounded-full overflow-hidden border-4 border-electric-cyan-500/50'>
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={80}
                      height={80}
                      className='object-cover'
                    />
                  </div>
                </div>

                <div className='flex-1'>
                  <div className='flex items-center space-x-2 mb-2'>
                    {testimonial.verified && (
                      <span className='px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded border border-green-600/30'>
                        Verified Client
                      </span>
                    )}
                    <span className='px-2 py-1 bg-electric-cyan-600/20 text-electric-cyan-400 text-xs rounded border border-electric-cyan-600/30'>
                      {testimonial.companySize} {testimonial.companyIndustry}
                    </span>
                  </div>

                  <h3 className='text-2xl font-bold text-white mb-1'>
                    {testimonial.name}
                  </h3>
                  <p className='text-electric-cyan-400 font-semibold mb-1'>
                    {testimonial.role}
                  </p>
                  <p className='text-gray-300 mb-4'>{testimonial.company}</p>

                  <div className='flex items-center space-x-1 mb-4'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                      />
                    ))}
                  </div>

                  <blockquote className='text-lg text-gray-200 mb-6 italic'>
                    "{testimonial.content}"
                  </blockquote>

                  {/* Security Metrics */}
                  {testimonial.securityMetrics && (
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-6'>
                      {testimonial.securityMetrics.vulnerabilitiesFound !==
                        undefined && (
                        <div className='text-center p-3 bg-deep-navy-700/50 rounded-lg'>
                          <div className='text-xl font-bold text-red-400'>
                            {testimonial.securityMetrics.vulnerabilitiesFound}
                          </div>
                          <div className='text-xs text-gray-400'>
                            Vulns Found
                          </div>
                        </div>
                      )}
                      {testimonial.securityMetrics.securityScoreImprovement && (
                        <div className='text-center p-3 bg-deep-navy-700/50 rounded-lg'>
                          <div className='text-xl font-bold text-green-400'>
                            {
                              testimonial.securityMetrics
                                .securityScoreImprovement
                            }
                            %
                          </div>
                          <div className='text-xs text-gray-400'>
                            Security ↑
                          </div>
                        </div>
                      )}
                      {testimonial.securityMetrics.incidentResponseTime && (
                        <div className='text-center p-3 bg-deep-navy-700/50 rounded-lg'>
                          <div className='text-xl font-bold text-blue-400'>
                            {testimonial.securityMetrics.incidentResponseTime}
                          </div>
                          <div className='text-xs text-gray-400'>
                            Response Time
                          </div>
                        </div>
                      )}
                      {testimonial.securityMetrics.costSavings && (
                        <div className='text-center p-3 bg-deep-navy-700/50 rounded-lg'>
                          <div className='text-xl font-bold text-purple-400'>
                            {testimonial.securityMetrics.costSavings}
                          </div>
                          <div className='text-xs text-gray-400'>
                            Cost Savings
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Project Details */}
                  <div className='space-y-2 text-sm text-gray-400'>
                    {testimonial.projectType && (
                      <div>
                        <strong>Project Type:</strong>{' '}
                        {testimonial.projectType.replace('-', ' ')}
                      </div>
                    )}
                    {testimonial.projectDuration && (
                      <div>
                        <strong>Duration:</strong> {testimonial.projectDuration}
                      </div>
                    )}
                    {testimonial.beforeAfter && (
                      <div>
                        <strong>Before:</strong>{' '}
                        {testimonial.beforeAfter.before}
                        <br />
                        <strong>After:</strong> {testimonial.beforeAfter.after}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
