'use client';

import { BlogPost } from '@/types';
import Link from 'next/link';

export interface FeaturedArticlesProps {
  posts: BlogPost[];
  className?: string;
  onPostClick?: () => void;
}

export const FeaturedArticles: React.FC<FeaturedArticlesProps> = ({
  posts,
  className = "",
  onPostClick
}) => {
  if (!posts || posts.length === 0) {
    return null;
  }

  const featuredPost = posts[0]; // Use the first post as the main featured article

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section 
      className={`py-20 bg-gradient-to-r from-navy-900 via-cyan-900 to-navy-900 ${className}`}
      aria-labelledby="featured-articles-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-navy-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-2 mb-6">
            <svg 
              className="w-4 h-4 text-cyan-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
              />
            </svg>
            <span className="text-cyan-400 font-medium text-sm">
              Featured Article
            </span>
          </div>
          <h2 
            id="featured-articles-heading"
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Featured <span className="text-cyan-400">Post</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Dive into our latest comprehensive guide on cutting-edge cybersecurity topics 
            and practical implementation strategies.
          </p>
        </header>
        
        {/* Featured Post */}
        <article 
          className="bg-navy-800 border border-navy-700 rounded-lg overflow-hidden hover:border-cyan-500 transition-all duration-300"
          role="article"
          aria-labelledby="featured-post-title"
        >
          <div className="md:flex">
            {/* Featured Image */}
            <div className="md:w-1/3 h-48 md:h-auto bg-gradient-to-r from-cyan-600 to-neon-green-600">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg 
                  className="w-16 h-16 text-white opacity-20" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1} 
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                  />
                </svg>
              </div>
            </div>
            
            {/* Featured Content */}
            <div className="md:w-2/3 p-6 md:p-8">
              <header className="mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                  <time dateTime={featuredPost.publishedAt}>
                    {formatDate(featuredPost.publishedAt)}
                  </time>
                  <span className="px-2 py-1 bg-cyan-600/20 text-cyan-400 text-xs rounded">
                    {featuredPost.category}
                  </span>
                </div>
                <h3 
                  id="featured-post-title"
                  className="text-2xl font-bold text-white mb-2"
                >
                  {featuredPost.title}
                </h3>
                <p className="text-gray-400">
                  {featuredPost.excerpt}
                </p>
              </header>
              
              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <span>{featuredPost.author}</span>
                <span>{featuredPost.readingTime}</span>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {featuredPost.tags.slice(0, 3).map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-navy-700 text-gray-300 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
                {featuredPost.tags.length > 3 && (
                  <span className="px-3 py-1 bg-navy-700 text-gray-500 text-xs rounded">
                    +{featuredPost.tags.length - 3} more
                  </span>
                )}
              </div>
              
              {/* CTA */}
              <footer>
                <Link 
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center space-x-2 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-500 transition-colors duration-300 text-sm"
                  aria-label="Read full article about Zero Trust Architecture"
                  onClick={onPostClick}
                >
                  <span>Read Article</span>
                  <svg 
                    className="w-3 h-3" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17 8l4 4m0 0l-4 4m4-4H3" 
                    />
                  </svg>
                </Link>
              </footer>
            </div>
          </div>
        </article>

        {/* Additional Featured Posts (if more than one) */}
        {posts.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {posts.slice(1, 3).map((post) => (
              <article 
                key={post.id}
                className="bg-navy-800/50 border border-navy-700 rounded-lg overflow-hidden hover:border-neon-green-500 transition-all duration-300"
                role="article"
                aria-labelledby={`additional-featured-${post.id}`}
              >
                <div className="h-32 bg-gradient-to-r from-navy-600 to-cyan-600">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg 
                      className="w-12 h-12 text-white opacity-20" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1} 
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                      />
                    </svg>
                  </div>
                </div>
                
                <div className="p-4">
                  <header className="mb-3">
                    <div className="flex items-center space-x-2 text-xs text-gray-400 mb-1">
                      <time dateTime={post.publishedAt}>
                        {formatDate(post.publishedAt)}
                      </time>
                      <span className="px-1 py-0.5 bg-neon-green-600/20 text-neon-green-400 rounded">
                        {post.category}
                      </span>
                    </div>
                    <h4 
                      id={`additional-featured-${post.id}`}
                      className="text-sm font-semibold text-white line-clamp-2"
                    >
                      {post.title}
                    </h4>
                  </header>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                    <span>{post.author}</span>
                    <span>{post.readingTime}</span>
                  </div>
                  
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="w-full inline-flex items-center justify-center space-x-1 bg-navy-700 text-gray-300 px-3 py-1 rounded text-xs hover:bg-neon-green-600/20 hover:text-neon-green-400 transition-colors duration-300"
                    aria-label={`Read article: ${post.title}`}
                    onClick={onPostClick}
                  >
                    <span>Read More</span>
                    <svg 
                      className="w-2 h-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M17 8l4 4m0 0l-4 4m4-4H3" 
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};