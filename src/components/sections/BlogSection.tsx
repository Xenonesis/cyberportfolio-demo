'use client';

import { useState, useEffect } from 'react';
import {
  BLOG_POSTS,
  BLOG_CATEGORIES,
  getFeaturedPosts,
  getRecentPosts,
  searchPosts,
  getPostsByCategory,
  getCategoryStats,
} from '@/lib/blogData';
import { BlogPost, BlogFilters } from '@/types';
import { SectionHeader } from './SectionHeader';
import { FeaturedArticles } from './FeaturedArticles';
import { ArticleGrid } from './ArticleGrid';
import { CategoryFilter } from './CategoryFilter';
import { SearchBar } from './SearchBar';
import { NewsletterSignup } from './NewsletterSignup';
import { Pagination } from './Pagination';
import { ArticleCard } from './ArticleCard';

export interface BlogSectionProps {
  initialPosts?: BlogPost[];
  initialFilters?: BlogFilters;
  showFeatured?: boolean;
  showNewsletter?: boolean;
  postsPerPage?: number;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  initialPosts = BLOG_POSTS,
  initialFilters = {},
  showFeatured = true,
  showNewsletter = true,
  postsPerPage = 9,
}) => {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(initialPosts);
  const [filters, setFilters] = useState<BlogFilters>(initialFilters);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categoryStats, setCategoryStats] = useState(getCategoryStats());

  // Featured posts for the FeaturedArticles section
  const [featuredPosts, setFeaturedPosts] =
    useState<BlogPost[]>(getFeaturedPosts());

  // Recent posts for sidebar or recommendations
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>(getRecentPosts(5));

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Apply filters and search
  useEffect(() => {
    let filtered = [...posts];

    // Apply category filter
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(post => post.category === filters.category);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = searchPosts(searchQuery);
    }

    // Apply date range filter
    if (filters.dateRange) {
      filtered = filtered.filter(post => {
        const postDate = new Date(post.publishedAt);
        const start = new Date(filters.dateRange!.start);
        const end = new Date(filters.dateRange!.end);
        return postDate >= start && postDate <= end;
      });
    }

    // Apply sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case 'newest':
            return (
              new Date(b.publishedAt).getTime() -
              new Date(a.publishedAt).getTime()
            );
          case 'oldest':
            return (
              new Date(a.publishedAt).getTime() -
              new Date(b.publishedAt).getTime()
            );
          case 'popular':
            // For now, sort by featured status and then by date
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return (
              new Date(b.publishedAt).getTime() -
              new Date(a.publishedAt).getTime()
            );
          case 'featured':
            return Number(b.featured) - Number(a.featured);
          default:
            return 0;
        }
      });
    }

    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, searchQuery, posts]);

  // Update category stats when posts change
  useEffect(() => {
    setCategoryStats(getCategoryStats());
  }, [posts]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle category filter change
  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({
      ...prev,
      category: category === 'all' ? undefined : category,
    }));
  };

  // Handle sort change
  const handleSortChange = (sortBy: string) => {
    setFilters(prev => ({
      ...prev,
      sortBy: sortBy as BlogFilters['sortBy'],
    }));
  };

  // Handle date range change
  const handleDateRangeChange = (dateRange: { start: string; end: string }) => {
    setFilters(prev => ({
      ...prev,
      dateRange,
    }));
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of blog section
    const blogSection = document.getElementById('blog-section');
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Loading state for async operations
  const handleLoadingStart = () => setLoading(true);
  const handleLoadingEnd = () => setLoading(false);

  return (
    <section
      id='blog-section'
      className='bg-navy-900 text-white'
      aria-labelledby='blog-section-heading'
    >
      {/* Blog Header */}
      <SectionHeader
        title='Cybersecurity Insights & Blog'
        subtitle='Expert insights, industry trends, and practical guidance on cybersecurity, Zero Trust architecture, cloud security, and emerging threats'
        className='py-20'
      />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Featured Articles Section */}
        {showFeatured && featuredPosts.length > 0 && (
          <FeaturedArticles
            posts={featuredPosts}
            className='mb-20'
            onPostClick={handleLoadingStart}
          />
        )}

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* Main Content Area */}
          <div className='lg:col-span-3'>
            {/* Search and Filter Controls */}
            <div className='bg-navy-800/50 border border-navy-700 rounded-lg p-6 mb-8'>
              <div className='flex flex-col sm:flex-row gap-4 items-center justify-between'>
                <SearchBar
                  onSearch={handleSearch}
                  placeholder='Search articles, topics, or keywords...'
                  className='flex-1'
                />

                <div className='flex flex-wrap gap-2'>
                  <CategoryFilter
                    categories={categoryStats}
                    selectedCategory={filters.category || 'all'}
                    onCategoryChange={handleCategoryChange}
                    className='min-w-max'
                  />

                  <select
                    value={filters.sortBy || 'newest'}
                    onChange={e => handleSortChange(e.target.value)}
                    className='bg-navy-700 border border-navy-600 text-white text-sm rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400'
                  >
                    <option value='newest'>Newest First</option>
                    <option value='oldest'>Oldest First</option>
                    <option value='popular'>Most Popular</option>
                    <option value='featured'>Featured Only</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Article Grid */}
            <ArticleGrid
              posts={currentPosts}
              loading={loading}
              onPostClick={handleLoadingEnd}
              className='mb-8'
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                showFirstLast={true}
                showNumbers={true}
                className='flex justify-center'
              />
            )}
          </div>

          {/* Sidebar */}
          <div className='lg:col-span-1'>
            {/* Recent Posts */}
            <div className='bg-navy-800/50 border border-navy-700 rounded-lg p-6 mb-8'>
              <h3 className='text-lg font-semibold text-cyan-400 mb-4'>
                Recent Articles
              </h3>
              <div className='space-y-4'>
                {recentPosts.map(post => (
                  <ArticleCard
                    key={post.id}
                    post={post}
                    variant='compact'
                    showCategory={false}
                    showAuthor={false}
                    className='border-0 bg-transparent hover:bg-navy-700/50'
                  />
                ))}
              </div>
            </div>

            {/* Category Cloud */}
            <div className='bg-navy-800/50 border border-navy-700 rounded-lg p-6 mb-8'>
              <h3 className='text-lg font-semibold text-cyan-400 mb-4'>
                Categories
              </h3>
              <div className='flex flex-wrap gap-2'>
                {categoryStats.map(category => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.slug)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      filters.category === category.slug
                        ? 'bg-cyan-600 text-white'
                        : 'bg-navy-700 text-gray-300 hover:bg-navy-600'
                    }`}
                  >
                    {category.name} ({category.postCount})
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            {showNewsletter && (
              <NewsletterSignup
                title='Stay Updated'
                subtitle='Get the latest cybersecurity insights delivered to your inbox'
                className='bg-navy-800/50 border border-navy-700 rounded-lg p-6'
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
