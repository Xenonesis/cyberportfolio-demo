'use client';

import { motion } from 'framer-motion';
import { CaseStudy } from '@/types/caseStudies';
import Image from 'next/image';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  onClick?: () => void;
  showMetrics?: boolean;
  className?: string;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  caseStudy,
  onClick,
  showMetrics = true,
  className = '',
}) => {
  // Get difficulty level color
  const getDifficultyColor = (difficulty: CaseStudy['difficultyLevel']) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500';
      case 'intermediate':
        return 'bg-yellow-500';
      case 'advanced':
        return 'bg-orange-500';
      case 'expert':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get security domain icons
  const getSecurityDomainIcon = (domain: CaseStudy['securityDomain'][0]) => {
    switch (domain) {
      case 'web-application-security':
        return (
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
              d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707v4.586a2 2 0 01-2 2h-2.5a1 1 0 01-.8-.4L12 16.8l-1.7 1.6a1 1 0 01-.8.4H7a2 2 0 01-2-2v6a2 2 0 012-2zm0 0a3 3 0 003 3h6a3 3 0 003-3V8a3 3 0 00-3-3H7a3 3 0 00-3 3v8z'
            />
          </svg>
        );
      case 'network-security':
        return (
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
              d='M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 8v6a2 2 0 002 2h8a2 2 0 002-2v-6m-6 0V9a2 2 0 012-2h4a2 2 0 012 2v7h-4m-6-9h8M8 19l4-4 4 4M0 20h24'
            />
          </svg>
        );
      case 'cloud-security':
        return (
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
              d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.97V10h1a2 2 0 012 2v4a2 2 0 01-2 2h-2.5a1 1 0 01-.8-.4L12 16.8l-1.7 1.6a1 1 0 01-.8.4H7a2 2 0 01-2-2v-4a2 2 0 012-2h1zm0 0a3 3 0 003 3h6a3 3 0 003-3V8a3 3 0 00-3-3H7a3 3 0 00-3 3v8z'
            />
          </svg>
        );
      case 'incident-response':
        return (
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
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.822-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z'
            />
          </svg>
        );
      case 'secure-development':
        return (
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
              d='M10 20l4-16m4 4l4 4-16 4-4-4 4 4'
            />
          </svg>
        );
      default:
        return (
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
              d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.152-.262-2.28-.76-3.318z'
            />
          </svg>
        );
    }
  };

  return (
    <motion.article
      layout
      onClick={onClick}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.98 }}
      className={`
        bg-navy-800 border border-navy-700 rounded-lg overflow-hidden 
        hover:border-cyan-500 transition-all duration-300 cursor-pointer
        ${className}
      `}
      role='article'
      aria-labelledby={`case-study-title-${caseStudy.id}`}
    >
      {/* Image/Visual Header */}
      <div className='relative h-48 bg-gradient-to-r from-cyan-600 to-neon-green-600'>
        {caseStudy.image && (
          <Image
            src={caseStudy.image}
            alt={caseStudy.title}
            fill
            className='object-cover opacity-20'
            priority={false}
          />
        )}
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-white opacity-30'>
            {getSecurityDomainIcon(caseStudy.securityDomain[0])}
          </div>
        </div>

        {/* Difficulty Level Badge */}
        <div className='absolute top-4 right-4'>
          <span
            className={`
            ${getDifficultyColor(caseStudy.difficultyLevel)}
            text-white text-xs px-2 py-1 rounded-full font-medium
          `}
          >
            {caseStudy.difficultyLevel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className='p-6'>
        <header className='mb-4'>
          <h3
            id={`case-study-title-${caseStudy.id}`}
            className='text-lg font-semibold text-white mb-2 line-clamp-2'
          >
            {caseStudy.title}
          </h3>
          <p className='text-sm text-gray-400 line-clamp-2'>
            {caseStudy.subtitle}
          </p>
        </header>

        <p className='text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed'>
          {caseStudy.description}
        </p>

        {/* Category Tags */}
        <div className='flex flex-wrap gap-2 mb-4'>
          {caseStudy.category.slice(0, 3).map(category => (
            <span
              key={category}
              className='px-2 py-1 bg-cyan-600/20 text-cyan-400 text-xs rounded'
            >
              {category
                .replace('-', ' ')
                .replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          ))}
          {caseStudy.category.length > 3 && (
            <span className='px-2 py-1 bg-navy-600 text-gray-400 text-xs rounded'>
              +{caseStudy.category.length - 3} more
            </span>
          )}
        </div>

        {/* Metrics Display */}
        {showMetrics && caseStudy.metrics && caseStudy.metrics.length > 0 && (
          <div className='mb-4'>
            <div className='flex items-center space-x-3 text-sm'>
              {caseStudy.metrics.slice(0, 2).map(metric => (
                <div
                  key={metric.id}
                  className={`
                    flex items-center space-x-1
                    ${metric.isPositive ? 'text-neon-green-400' : 'text-red-400'}
                  `}
                >
                  <span className='text-xs'>
                    {metric.isPositive ? '↗' : '↘'}
                  </span>
                  <span className='font-medium'>{metric.improvement}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Client Info */}
        <div className='flex items-center justify-between text-xs text-gray-500 mb-4'>
          <span>{caseStudy.client.name}</span>
          <span>{caseStudy.timeline.duration}</span>
        </div>

        {/* Security Domains */}
        <div className='flex items-center space-x-2 mb-4'>
          {caseStudy.securityDomain.slice(0, 2).map(domain => (
            <div
              key={domain}
              className='flex items-center space-x-1 text-cyan-400 text-xs'
              title={domain
                .replace('-', ' ')
                .replace(/\b\w/g, l => l.toUpperCase())}
            >
              {getSecurityDomainIcon(domain)}
              <span className='hidden sm:inline'>{domain.split('-')[0]}</span>
            </div>
          ))}
          {caseStudy.securityDomain.length > 2 && (
            <span className='text-gray-400 text-xs'>
              +{caseStudy.securityDomain.length - 2}
            </span>
          )}
        </div>

        {/* CTA */}
        <footer>
          <div className='flex items-center justify-between'>
            <span className='text-neon-green-400 text-sm font-medium'>
              View Case Study →
            </span>

            {/* Compliance Badges */}
            <div className='flex items-center space-x-1'>
              {caseStudy.compliance?.slice(0, 2).map(compliance => (
                <span
                  key={compliance}
                  className='px-1 py-0.5 bg-green-600/20 text-green-400 text-xs rounded border border-green-500/30'
                  title={compliance}
                >
                  {compliance}
                </span>
              ))}
              {caseStudy.compliance && caseStudy.compliance.length > 2 && (
                <span className='text-gray-400 text-xs'>
                  +{caseStudy.compliance.length - 2}
                </span>
              )}
            </div>
          </div>
        </footer>
      </div>

      {/* Featured Badge */}
      {caseStudy.isFeatured && (
        <div className='absolute top-4 left-4'>
          <div className='bg-gradient-to-r from-cyan-500 to-neon-green-500 text-white text-xs px-2 py-1 rounded-full font-medium'>
            Featured
          </div>
        </div>
      )}
    </motion.article>
  );
};
