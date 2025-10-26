'use client';

import { BlogPost } from '@/types';
import Link from 'next/link';

export interface ArticleCardProps {
  post: BlogPost;
  variant?: 'default' | 'compact' | 'featured';
  showCategory?: boolean;
  showAuthor?: boolean;
  showTags?: boolean;
  showReadingTime?: boolean;
  className?: string;
  onClick?: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  post,
  variant = 'default',
  showCategory = true,
  showAuthor = true,
  showTags = true,
  showReadingTime = true,
  className = '',
  onClick,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'compact':
        return 'flex items-start space-x-4';
      case 'featured':
        return 'md:flex md:flex-row';
      default:
        return 'flex flex-col h-full';
    }
  };

  const renderContent = () => {
    if (variant === 'compact') {
      return (
        <>
          <div className='flex-shrink-0 w-20 h-16 bg-gradient-to-r from-cyan-600 to-neon-green-600 rounded-lg overflow-hidden'>
            <div className='absolute inset-0 flex items-center justify-center'>
              <svg
                className='w-8 h-8 text-white opacity-20'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1}
                  d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                />
              </svg>
            </div>
          </div>

          <div className='flex-1 min-w-0'>
            <h3 className='text-sm font-semibold text-white line-clamp-2 mb-2'>
              {post.title}
            </h3>
            {showCategory && (
              <span className='px-2 py-1 bg-navy-700 text-cyan-400 text-xs rounded mb-2 inline-block'>
                {post.category}
              </span>
            )}
            <p className='text-xs text-gray-400'>
              {formatDate(post.publishedAt)}
              {showReadingTime && ` • ${post.readingTime}`}
            </p>
          </div>
        </>
      );
    }

    if (variant === 'featured') {
      return (
        <div className='md:flex'>
          {/* Featured Image */}
          <div className='md:w-1/3 h-48 md:h-auto bg-gradient-to-r from-cyan-600 to-neon-green-600'>
            <div className='absolute inset-0 flex items-center justify-center'>
              <svg
                className='w-16 h-16 text-white opacity-20'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1}
                  d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                />
              </svg>
            </div>
          </div>

          {/* Featured Content */}
          <div className='md:w-2/3 p-6 md:p-8'>{renderDefaultContent()}</div>
        </div>
      );
    }

    return renderDefaultContent();
  };

  const renderDefaultContent = () => (
    <>
      {/* Article Header */}
      <header className='mb-4'>
        <div className='flex items-center space-x-4 text-sm text-gray-400 mb-2'>
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
          {showCategory && (
            <span className='px-2 py-1 bg-cyan-600/20 text-cyan-400 text-xs rounded'>
              {post.category}
            </span>
          )}
        </div>

        <h3 className='text-lg font-bold text-white mb-2 line-clamp-2'>
          {post.title}
        </h3>

        <p className='text-gray-400 text-sm line-clamp-3'>{post.excerpt}</p>
      </header>

      {/* Article Meta */}
      <div className='flex items-center justify-between text-sm text-gray-400 mb-4'>
        {showAuthor && <span>{post.author}</span>}
        {showReadingTime && <span>{post.readingTime}</span>}
      </div>

      {/* Tags */}
      {showTags && post.tags && post.tags.length > 0 && (
        <div className='flex flex-wrap gap-1 mb-4'>
          {post.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className='px-2 py-1 bg-navy-700 text-gray-300 text-xs rounded'
            >
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className='px-2 py-1 bg-navy-700 text-gray-500 text-xs rounded'>
              +{post.tags.length - 3} more
            </span>
          )}
        </div>
      )}
    </>
  );

  const cardContent = (
    <article
      className={`bg-navy-800 border border-navy-700 rounded-lg overflow-hidden hover:border-cyan-500 transition-all duration-300 ${getVariantClasses()} ${className}`}
      role='article'
      aria-labelledby={`post-${post.id}-title`}
    >
      {renderContent()}

      {/* CTA for default variant */}
      {variant === 'default' && (
        <footer>
          <Link
            href={`/blog/${post.slug}`}
            className='w-full inline-flex items-center justify-center space-x-2 bg-navy-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-cyan-600/20 hover:text-cyan-400 transition-colors duration-300 text-sm'
            aria-label={`Read article: ${post.title}`}
            onClick={onClick}
          >
            <span>Read Article</span>
            <svg
              className='w-3 h-3'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </Link>
        </footer>
      )}
    </article>
  );

  // For compact variant, wrap in Link
  if (variant === 'compact') {
    return (
      <Link href={`/blog/${post.slug}`} onClick={onClick}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};
