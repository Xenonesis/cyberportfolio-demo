'use client';

import { motion } from 'framer-motion';
import {
  Star,
  Shield,
  CheckCircle,
  AlertCircle,
  Users,
  Award,
} from 'lucide-react';
import Image from 'next/image';
import type { EnhancedTestimonial } from '@/types/testimonials';

interface TestimonialCardProps {
  testimonial: EnhancedTestimonial;
  showSecurityMetrics?: boolean;
  showRating?: boolean;
  showVerificationBadge?: boolean;
  onClick?: () => void;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  showSecurityMetrics = true,
  showRating = true,
  showVerificationBadge = true,
  onClick,
  className = '',
}) => {
  // Security domain icons mapping
  const getSecurityDomainIcon = (domain: string) => {
    const icons = {
      'web-application-security': 'Code',
      'network-security': 'Globe',
      'cloud-security': 'Cloud',
      'incident-response': 'AlertCircle',
      'secure-development': 'Shield',
      compliance: 'FileText',
      'data-protection': 'Database',
      'identity-access-management': 'User',
    };
    return icons[domain as keyof typeof icons] || 'Shield';
  };

  // Security domain colors
  const getSecurityDomainColor = (domain: string) => {
    const colors = {
      'web-application-security': 'text-electric-cyan-400',
      'network-security': 'text-neon-green-400',
      'cloud-security': 'text-blue-400',
      'incident-response': 'text-red-400',
      'secure-development': 'text-purple-400',
      compliance: 'text-yellow-400',
      'data-protection': 'text-cyan-400',
      'identity-access-management': 'text-pink-400',
    };
    return colors[domain as keyof typeof colors] || 'text-gray-400';
  };

  // Get company size badge
  const getCompanySizeBadge = (size?: string) => {
    const badges = {
      startup: 'bg-green-600/20 text-green-400 border border-green-600/30',
      smb: 'bg-blue-600/20 text-blue-400 border border-blue-600/30',
      'mid-market':
        'bg-purple-600/20 text-purple-400 border border-purple-600/30',
      enterprise: 'bg-red-600/20 text-red-400 border border-red-600/30',
    };
    return (
      badges[size as keyof typeof badges] ||
      'bg-gray-600/20 text-gray-400 border border-gray-600/30'
    );
  };

  // Format security metrics for display
  const formatSecurityMetrics = () => {
    const metrics = [];

    if (testimonial.securityMetrics?.vulnerabilitiesFound !== undefined) {
      metrics.push(
        `${testimonial.securityMetrics.vulnerabilitiesFound} vulnerabilities found`
      );
    }

    if (testimonial.securityMetrics?.securityScoreImprovement) {
      metrics.push(
        `${testimonial.securityMetrics.securityScoreImprovement}% security improvement`
      );
    }

    if (testimonial.securityMetrics?.incidentResponseTime) {
      metrics.push(
        `Response time: ${testimonial.securityMetrics.incidentResponseTime}`
      );
    }

    if (testimonial.securityMetrics?.complianceAchieved?.length) {
      metrics.push(
        `Compliance: ${testimonial.securityMetrics.complianceAchieved.join(', ')}`
      );
    }

    if (testimonial.securityMetrics?.costSavings) {
      metrics.push(`Cost savings: ${testimonial.securityMetrics.costSavings}`);
    }

    return metrics;
  };

  const cardContent = (
    <div className='relative bg-deep-navy-800 border border-deep-navy-600 rounded-xl overflow-hidden transition-all duration-300 hover:border-electric-cyan-500 hover:shadow-lg hover:shadow-electric-cyan-400/10 group'>
      {/* Security Glow Effect */}
      <div className='absolute inset-0 bg-gradient-to-br from-electric-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl'></div>

      {/* Header with client info */}
      <div className='p-6 relative'>
        {/* Verification and rating row */}
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center space-x-2'>
            {showVerificationBadge && testimonial.verified && (
              <div className='flex items-center space-x-1 text-green-400'>
                <Award className='w-4 h-4' />
                <span className='text-xs font-medium'>Verified Client</span>
              </div>
            )}
            {testimonial.companySize && (
              <span
                className={`px-2 py-1 text-xs rounded-md ${getCompanySizeBadge(testimonial.companySize)}`}
              >
                {testimonial.companySize}
              </span>
            )}
          </div>

          {showRating && (
            <div className='flex items-center space-x-1'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Client information */}
        <div className='flex items-start space-x-4 mb-4'>
          <div className='flex-shrink-0'>
            <div className='w-12 h-12 rounded-full overflow-hidden border-2 border-electric-cyan-500/50'>
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={48}
                height={48}
                className='object-cover'
              />
            </div>
          </div>

          <div className='flex-1 min-w-0'>
            <h4 className='text-lg font-semibold text-white mb-1'>
              {testimonial.name}
            </h4>
            <p className='text-electric-cyan-400 text-sm font-medium mb-1'>
              {testimonial.role}
            </p>
            <p className='text-gray-400 text-sm'>{testimonial.company}</p>
            {testimonial.companyIndustry && (
              <p className='text-gray-500 text-xs mt-1'>
                {testimonial.companyIndustry}
              </p>
            )}
          </div>
        </div>

        {/* Security domains/tags */}
        {testimonial.securityDomain &&
          testimonial.securityDomain.length > 0 && (
            <div className='flex flex-wrap gap-2 mb-4'>
              {testimonial.securityDomain.slice(0, 3).map(domain => (
                <span
                  key={domain}
                  className={`px-2 py-1 text-xs rounded-md ${getSecurityDomainColor(domain)} bg-deep-navy-700/50 border border-deep-navy-600/50`}
                >
                  {domain.replace('-', ' ')}
                </span>
              ))}
              {testimonial.securityDomain.length > 3 && (
                <span className='px-2 py-1 text-xs text-gray-400 bg-deep-navy-700/50 rounded-md'>
                  +{testimonial.securityDomain.length - 3} more
                </span>
              )}
            </div>
          )}

        {/* Testimonial content */}
        <blockquote className='text-gray-300 text-sm leading-relaxed mb-4 relative'>
          <div className='absolute -left-3 top-0 text-electric-cyan-500'>
            <svg
              className='w-6 h-6 opacity-30'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4.001v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-4 3.638-4 5.849h4.001v10h-10.017z' />
            </svg>
          </div>
          <p className='pl-2'>{testimonial.content}</p>
        </blockquote>

        {/* Security metrics */}
        {showSecurityMetrics && testimonial.securityMetrics && (
          <div className='space-y-2 mb-4'>
            {formatSecurityMetrics().map((metric, index) => (
              <div
                key={index}
                className='flex items-center space-x-2 text-xs text-gray-400'
              >
                <CheckCircle className='w-3 h-3 text-neon-green-400' />
                <span>{metric}</span>
              </div>
            ))}
          </div>
        )}

        {/* Project information */}
        <div className='flex items-center justify-between text-xs text-gray-500'>
          {testimonial.projectType && (
            <span className='capitalize px-2 py-1 bg-deep-navy-700/50 rounded text-electric-cyan-400'>
              {testimonial.projectType.replace('-', ' ')}
            </span>
          )}
          {testimonial.projectDuration && (
            <span>{testimonial.projectDuration}</span>
          )}
        </div>

        {/* Tags */}
        {testimonial.tags && testimonial.tags.length > 0 && (
          <div className='flex flex-wrap gap-1 mt-3'>
            {testimonial.tags.slice(0, 2).map(tag => (
              <span
                key={tag}
                className='px-2 py-1 text-xs bg-electric-cyan-600/20 text-electric-cyan-400 rounded border border-electric-cyan-600/30'
              >
                {tag}
              </span>
            ))}
            {testimonial.tags.length > 2 && (
              <span className='px-2 py-1 text-xs text-gray-400 bg-deep-navy-700/50 rounded'>
                +{testimonial.tags.length - 2} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Hover overlay with action */}
      <div className='absolute inset-0 bg-gradient-to-t from-deep-navy-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
        <div className='text-center text-electric-cyan-400'>
          <div className='w-8 h-8 mx-auto mb-2 border-2 border-electric-cyan-400 rounded-full flex items-center justify-center'>
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
                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
              />
            </svg>
          </div>
          <p className='text-xs font-medium'>View Details</p>
        </div>
      </div>
    </div>
  );

  if (onClick) {
    return (
      <motion.button
        onClick={onClick}
        className={`${className} w-full`}
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {cardContent}
      </motion.button>
    );
  }

  return (
    <motion.div
      className={`${className} w-full`}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {cardContent}
    </motion.div>
  );
};

// Enhanced Testimonial Card for featured testimonials
export const FeaturedTestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  ...props
}) => {
  return (
    <motion.div
      className='relative bg-gradient-to-br from-deep-navy-800 via-electric-cyan-900/20 to-neon-green-900/20 border border-electric-cyan-500/50 rounded-2xl overflow-hidden'
      whileHover={{
        y: -6,
        scale: 1.03,
        transition: { type: 'spring', stiffness: 200, damping: 15 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Animated background pattern */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-electric-cyan-500/20 to-transparent animate-pulse'></div>
        <div className='absolute bottom-0 right-0 w-1/2 h-1/2 bg-neon-green-500/20 rounded-full animate-ping'></div>
      </div>

      {/* Featured badge */}
      <div className='absolute top-4 right-4 z-10'>
        <div className='px-3 py-1 bg-gradient-to-r from-neon-green-500 to-electric-cyan-500 text-white text-xs font-bold rounded-full border border-white/20'>
          FEATURED
        </div>
      </div>

      {/* Enhanced content */}
      <div className='relative p-8'>
        {/* Client info with larger avatar */}
        <div className='flex items-center space-x-4 mb-6'>
          <div className='flex-shrink-0'>
            <div className='w-16 h-16 rounded-full overflow-hidden border-4 border-electric-cyan-500/50 relative'>
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={64}
                height={64}
                className='object-cover'
              />
              {/* Security verification badge */}
              {testimonial.verified && (
                <div className='absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center'>
                  <CheckCircle className='w-3 h-3 text-white' />
                </div>
              )}
            </div>
          </div>

          <div className='flex-1'>
            <h3 className='text-xl font-bold text-white mb-1'>
              {testimonial.name}
            </h3>
            <p className='text-electric-cyan-400 font-semibold mb-1'>
              {testimonial.role}
            </p>
            <p className='text-gray-300'>{testimonial.company}</p>
            {testimonial.companyIndustry && (
              <p className='text-gray-400 text-sm'>
                {testimonial.companyIndustry}
              </p>
            )}
          </div>
        </div>

        {/* Large rating display */}
        <div className='flex items-center space-x-2 mb-4'>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-6 h-6 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
            />
          ))}
          <span className='text-lg font-semibold text-white ml-2'>
            {testimonial.rating}/5
          </span>
        </div>

        {/* Enhanced testimonial content */}
        <blockquote className='text-gray-200 text-lg leading-relaxed mb-6 relative'>
          <p className='italic'>"{testimonial.content}"</p>
        </blockquote>

        {/* Key metrics display */}
        {testimonial.securityMetrics && (
          <div className='grid grid-cols-2 gap-4 mb-6'>
            {testimonial.securityMetrics.vulnerabilitiesFound !== undefined && (
              <div className='text-center'>
                <div className='text-2xl font-bold text-neon-green-400'>
                  {testimonial.securityMetrics.vulnerabilitiesFound}
                </div>
                <div className='text-xs text-gray-400'>
                  Vulnerabilities Found
                </div>
              </div>
            )}
            {testimonial.securityMetrics.securityScoreImprovement && (
              <div className='text-center'>
                <div className='text-2xl font-bold text-electric-cyan-400'>
                  {testimonial.securityMetrics.securityScoreImprovement}%
                </div>
                <div className='text-xs text-gray-400'>
                  Security Improvement
                </div>
              </div>
            )}
          </div>
        )}

        {/* Project details */}
        <div className='flex items-center justify-between text-sm text-gray-400'>
          {testimonial.projectType && (
            <span className='capitalize px-3 py-1 bg-electric-cyan-600/20 text-electric-cyan-400 rounded-full'>
              {testimonial.projectType.replace('-', ' ')}
            </span>
          )}
          {testimonial.projectDuration && (
            <span className='text-electric-cyan-400 font-medium'>
              {testimonial.projectDuration}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
