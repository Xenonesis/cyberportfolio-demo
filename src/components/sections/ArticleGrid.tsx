'use client';

import { BlogPost } from '@/types';
import { ArticleCard } from './ArticleCard';

export interface ArticleGridProps {
  posts: BlogPost[];
  loading?: boolean;
  onPostClick?: () => void;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
  showLoadMore?: boolean;
  onLoadMore?: () => void;
}

export const ArticleGrid: React.FC<ArticleGridProps> = ({
  posts,
  loading = false,
  onPostClick,
  className = '',
  columns = 3,
  showLoadMore = false,
  onLoadMore,
}) => {
  if (posts.length === 0 && !loading) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className='flex justify-center mb-4'>
          <svg
            className='w-16 h-16 text-gray-600'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </div>
        <h3 className='text-lg font-semibold text-gray-400 mb-2'>
          No articles found
        </h3>
        <p className='text-gray-500'>
          Try adjusting your search criteria or check back later for new
          content.
        </p>
      </div>
    );
  }

  const getGridColumns = () => {
    switch (columns) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 3:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <div className={className}>
      <div className={`grid gap-8 ${getGridColumns()}`}>
        {posts.map(post => (
          <ArticleCard
            key={post.id}
            post={post}
            variant='default'
            showCategory={true}
            showAuthor={true}
            showTags={true}
            showReadingTime={true}
            onClick={onPostClick}
          />
        ))}

        {loading &&
          // Loading skeleton cards
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={`loading-${index}`}
              className='bg-navy-800 border border-navy-700 rounded-lg overflow-hidden animate-pulse'
            >
              <div className='h-48 bg-gradient-to-r from-cyan-600 to-neon-green-600'></div>
              <div className='p-6'>
                <div className='h-4 bg-navy-700 rounded mb-2'></div>
                <div className='h-4 bg-navy-700 rounded mb-2 w-3/4'></div>
                <div className='h-4 bg-navy-700 rounded mb-4 w-1/2'></div>
                <div className='flex space-x-2 mb-4'>
                  <div className='h-4 bg-navy-700 rounded w-16'></div>
                  <div className='h-4 bg-navy-700 rounded w-20'></div>
                  <div className='h-4 bg-navy-700 rounded w-12'></div>
                </div>
                <div className='h-10 bg-navy-700 rounded'></div>
              </div>
            </div>
          ))}
      </div>

      {showLoadMore && posts.length > 0 && (
        <div className='flex justify-center mt-8'>
          <button
            onClick={onLoadMore}
            disabled={loading}
            className='inline-flex items-center space-x-2 bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 text-sm font-medium'
            aria-label='Load more articles'
          >
            {loading ? (
              <>
                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                <span>Loading...</span>
              </>
            ) : (
              <>
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
                    d='M4 4v16h16M4 4l16 16M20 4L4 20'
                  />
                </svg>
                <span>Load More</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
