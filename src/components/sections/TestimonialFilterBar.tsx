'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, X, Check, ChevronDown, ChevronUp } from 'lucide-react';
import type { TestimonialFilters, TestimonialCategory, EnhancedTestimonial } from '@/types/testimonials';

interface TestimonialFilterBarProps {
  filters: TestimonialFilters;
  onFilterChange: (filterType: keyof TestimonialFilters, value: string | string[] | number[]) => void;
  onSortChange: (sortBy: TestimonialFilters['sortBy']) => void;
  availableCategories: TestimonialCategory[];
  testimonials: EnhancedTestimonial[];
  className?: string;
}

export const TestimonialFilterBar: React.FC<TestimonialFilterBarProps> = ({
  filters,
  onFilterChange,
  onSortChange,
  availableCategories,
  testimonials,
  className = '',
}) => {
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery);

  // Extract unique values for filtering
  const filterOptions = useMemo(() => {
    const industries = [...new Set(testimonials.map(t => t.companyIndustry).filter(Boolean))] as string[];
    const companySizes = [...new Set(testimonials.map(t => t.companySize).filter(Boolean))] as string[];
    const projectTypes = [...new Set(testimonials.map(t => t.projectType).filter(Boolean))] as string[];
    const ratings = [5, 4, 3, 2, 1];

    return {
      industries,
      companySizes,
      projectTypes,
      ratings,
    };
  }, [testimonials]);

  // Clear all filters
  const clearAllFilters = () => {
    onFilterChange('categories', []);
    onFilterChange('securityDomains', []);
    onFilterChange('industries', []);
    onFilterChange('companySizes', []);
    onFilterChange('projectTypes', []);
    onFilterChange('ratings', []);
    onFilterChange('searchQuery', '');
    setSearchQuery('');
  };

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.categories.length > 0 ||
      filters.securityDomains.length > 0 ||
      filters.industries.length > 0 ||
      filters.companySizes.length > 0 ||
      filters.projectTypes.length > 0 ||
      filters.ratings.length > 0 ||
      filters.searchQuery.trim().length > 0
    );
  }, [filters]);

  // Security domain options
  const securityDomainOptions = [
    { id: 'web-application-security', name: 'Web Application Security', color: 'text-electric-cyan-400' },
    { id: 'network-security', name: 'Network Security', color: 'text-neon-green-400' },
    { id: 'cloud-security', name: 'Cloud Security', color: 'text-blue-400' },
    { id: 'incident-response', name: 'Incident Response', color: 'text-red-400' },
    { id: 'secure-development', name: 'Secure Development', color: 'text-purple-400' },
    { id: 'compliance', name: 'Compliance', color: 'text-yellow-400' },
    { id: 'data-protection', name: 'Data Protection', color: 'text-cyan-400' },
    { id: 'identity-access-management', name: 'Identity Management', color: 'text-pink-400' },
  ];

  // Project type options
  const projectTypeOptions = [
    { id: 'assessment', name: 'Security Assessment', icon: 'shield-check' },
    { id: 'development', name: 'Secure Development', icon: 'code' },
    { id: 'incident-response', name: 'Incident Response', icon: 'alert-circle' },
    { id: 'consulting', name: 'Security Consulting', icon: 'settings' },
    { id: 'training', name: 'Security Training', icon: 'users' },
  ];

  // Company size options
  const companySizeOptions = [
    { id: 'startup', name: 'Startup', icon: 'rocket', color: 'bg-green-600/20 text-green-400' },
    { id: 'smb', name: 'Small Business', icon: 'building', color: 'bg-blue-600/20 text-blue-400' },
    { id: 'mid-market', name: 'Mid-Market', icon: 'factory', color: 'bg-purple-600/20 text-purple-400' },
    { id: 'enterprise', name: 'Enterprise', icon: 'skyscraper', color: 'bg-red-600/20 text-red-400' },
  ];

  // Search input handler with debouncing
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // Debounce the search to avoid excessive filtering
    setTimeout(() => {
      onFilterChange('searchQuery', query);
    }, 300);
  };

  // Filter button component
  const FilterButton = ({ 
    label, 
    count, 
    isActive, 
    onClick 
  }: { 
    label: string; 
    count: number; 
    isActive: boolean; 
    onClick: () => void 
  }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 border ${
        isActive
          ? 'bg-electric-cyan-500/20 text-electric-cyan-400 border-electric-cyan-500/50'
          : 'bg-deep-navy-700/50 text-gray-400 border-deep-navy-600/50 hover:bg-deep-navy-600/50 hover:text-gray-300'
      }`}
    >
      {label} {count > 0 && <span className="ml-1 text-xs">({count})</span>}
    </button>
  );

  // Category filter chips
  const renderCategoryFilters = () => (
    <div className="flex flex-wrap gap-2">
      {availableCategories.map((category) => {
        const isActive = filters.categories.includes(category.id);
        const count = testimonials.filter(t => 
          t.securityDomain?.some(domain => category.securityDomains.includes(domain))
        ).length;
        
        return (
          <FilterButton
            key={category.id}
            label={category.name}
            count={count}
            isActive={isActive}
            onClick={() => {
              const newCategories = isActive
                ? filters.categories.filter(id => id !== category.id)
                : [...filters.categories, category.id];
              onFilterChange('categories', newCategories);
            }}
          />
        );
      })}
    </div>
  );

  // Security domain filter chips
  const renderSecurityDomainFilters = () => (
    <div className="flex flex-wrap gap-2">
      {securityDomainOptions.map((domain) => {
        const isActive = filters.securityDomains.includes(domain.id as any);
        const count = testimonials.filter(t => t.securityDomain?.includes(domain.id as any)).length;
        
        return (
          <FilterButton
            key={domain.id}
            label={domain.name}
            count={count}
            isActive={isActive}
            onClick={() => {
              const newDomains = isActive
                ? filters.securityDomains.filter(id => id !== domain.id)
                : [...filters.securityDomains, domain.id];
              onFilterChange('securityDomains', newDomains);
            }}
          />
        );
      })}
    </div>
  );

  // Advanced filters section
  const renderAdvancedFilters = () => (
    <div className={`space-y-4 transition-all duration-300 ${isAdvancedFiltersOpen ? 'block' : 'hidden'}`}>
      {/* Industry Filters */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Industry</label>
        <div className="flex flex-wrap gap-2">
          {filterOptions.industries.map((industry) => {
            const isActive = filters.industries.includes(industry);
            const count = testimonials.filter(t => t.companyIndustry === industry).length;
            
            return (
              <FilterButton
                key={industry}
                label={industry}
                count={count}
                isActive={isActive}
                onClick={() => {
                  const newIndustries = isActive
                    ? filters.industries.filter(id => id !== industry)
                    : [...filters.industries, industry];
                  onFilterChange('industries', newIndustries);
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Company Size Filters */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Company Size</label>
        <div className="flex flex-wrap gap-2">
          {companySizeOptions.map((size) => {
            const isActive = filters.companySizes.includes(size.id);
            const count = testimonials.filter(t => t.companySize === size.id).length;
            
            return (
              <FilterButton
                key={size.id}
                label={size.name}
                count={count}
                isActive={isActive}
                onClick={() => {
                  const newSizes = isActive
                    ? filters.companySizes.filter(id => id !== size.id)
                    : [...filters.companySizes, size.id];
                  onFilterChange('companySizes', newSizes);
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Project Type Filters */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Project Type</label>
        <div className="flex flex-wrap gap-2">
          {projectTypeOptions.map((type) => {
            const isActive = filters.projectTypes.includes(type.id);
            const count = testimonials.filter(t => t.projectType === type.id).length;
            
            return (
              <FilterButton
                key={type.id}
                label={type.name}
                count={count}
                isActive={isActive}
                onClick={() => {
                  const newTypes = isActive
                    ? filters.projectTypes.filter(id => id !== type.id)
                    : [...filters.projectTypes, type.id];
                  onFilterChange('projectTypes', newTypes);
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Rating Filters */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
        <div className="flex flex-wrap gap-2">
          {filterOptions.ratings.map((rating) => {
            const isActive = filters.ratings.includes(rating);
            const count = testimonials.filter(t => t.rating >= rating).length;
            
            return (
              <FilterButton
                key={rating}
                label={`${rating}+ Stars`}
                count={count}
                isActive={isActive}
                onClick={() => {
                  const newRatings = isActive
                    ? filters.ratings.filter(r => r !== rating)
                    : [...filters.ratings, rating];
                  onFilterChange('ratings', newRatings);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`bg-deep-navy-800 border border-deep-navy-600 rounded-xl p-6 ${className}`}>
      {/* Search and Sort Row */}
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between mb-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search testimonials by client, company, or technology..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-deep-navy-700 border border-deep-navy-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-cyan-500/50 focus:border-electric-cyan-500"
            />
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-300">Sort by:</label>
          <select
            value={filters.sortBy}
            onChange={(e) => onSortChange(e.target.value as TestimonialFilters['sortBy'])}
            className="bg-deep-navy-700 border border-deep-navy-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-electric-cyan-500/50"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="rating">Highest Rating</option>
            <option value="impact">Security Impact</option>
            <option value="company-size">Company Size</option>
          </select>
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-300">Security Categories</h4>
          <button
            onClick={() => setIsAdvancedFiltersOpen(!isAdvancedFiltersOpen)}
            className="flex items-center space-x-1 text-electric-cyan-400 hover:text-electric-cyan-300 transition-colors"
          >
            <span>{isAdvancedFiltersOpen ? 'Hide' : 'Show'} Advanced Filters</span>
            {isAdvancedFiltersOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
        {renderCategoryFilters()}
      </div>

      {/* Security Domain Filters */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-300 mb-3">Security Domains</h4>
        {renderSecurityDomainFilters()}
      </div>

      {/* Advanced Filters */}
      {renderAdvancedFilters()}

      {/* Filter Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-deep-navy-600">
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center space-x-1 text-gray-400 hover:text-electric-cyan-400 transition-colors text-sm"
            >
              <X className="w-4 h-4" />
              <span>Clear All Filters</span>
            </button>
          )}
          <span className="text-sm text-gray-500">
            {testimonials.length} {testimonials.length === 1 ? 'testimonial' : 'testimonials'} found
          </span>
        </div>

        {/* Active Filters Count */}
        {hasActiveFilters && (
          <div className="flex items-center space-x-2 text-sm">
            <Filter className="w-4 h-4 text-electric-cyan-400" />
            <span className="text-electric-cyan-400 font-medium">
              {filters.categories.length + filters.securityDomains.length + filters.industries.length + 
               filters.companySizes.length + filters.projectTypes.length + filters.ratings.length} 
              filters active
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// Search bar component for standalone use
export const TestimonialSearchBar: React.FC<{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}> = ({
  value,
  onChange,
  placeholder = "Search testimonials by client, company, or technology...",
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3 bg-deep-navy-700 border border-deep-navy-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-cyan-500/50 focus:border-electric-cyan-500 text-sm"
      />
    </div>
  );
};

// Quick filter chips for mobile
export const QuickFilterChips: React.FC<{
  filters: TestimonialFilters;
  onFilterChange: (filterType: keyof TestimonialFilters, value: string | string[] | number[]) => void;
  testimonials: EnhancedTestimonial[];
}> = ({
  filters,
  onFilterChange,
  testimonials,
}) => {
  const topCategories = [
    { id: 'featured', label: 'Featured', count: testimonials.filter(t => t.featured).length },
    { id: '5-star', label: '5 Star', count: testimonials.filter(t => t.rating === 5).length },
    { id: 'enterprise', label: 'Enterprise', count: testimonials.filter(t => t.companySize === 'enterprise').length },
    { id: 'cloud', label: 'Cloud Security', count: testimonials.filter(t => t.securityDomain?.includes('cloud-security')).length },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {topCategories.map((category) => {
        const isActive = filters.categories.includes(category.id);
        
        return (
          <button
            key={category.id}
            onClick={() => {
              if (isActive) {
                onFilterChange('categories', filters.categories.filter(id => id !== category.id));
              } else {
                onFilterChange('categories', [...filters.categories, category.id]);
              }
            }}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 border ${
              isActive
                ? 'bg-electric-cyan-500/20 text-electric-cyan-400 border-electric-cyan-500/50'
                : 'bg-deep-navy-700/50 text-gray-400 border-deep-navy-600/50 hover:bg-deep-navy-600/50'
            }`}
          >
            {category.label} ({category.count})
          </button>
        );
      })}
    </div>
  );
};