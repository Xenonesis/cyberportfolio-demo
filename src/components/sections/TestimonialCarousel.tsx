'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play, Pause, Shield, Star } from 'lucide-react';
import type { EnhancedTestimonial } from '@/types/testimonials';
import { TestimonialCard } from './TestimonialCard';

interface TestimonialCarouselProps {
  testimonials: EnhancedTestimonial[];
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  showSecurityMetrics?: boolean;
  variant?: 'standard' | 'featured' | 'compact';
  className?: string;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  autoPlay = true,
  interval = 5000,
  showControls = true,
  showIndicators = true,
  showSecurityMetrics = true,
  variant = 'standard',
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || !isPlaying || isHovered) return;

    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, isPlaying, isHovered, interval, currentIndex]);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      prev => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getCurrentTestimonial = () => {
    return testimonials[currentIndex];
  };

  // Security-focused card variants
  const renderTestimonialCard = (testimonial: EnhancedTestimonial) => {
    if (variant === 'featured') {
      return (
        <div className='h-full flex items-center justify-center'>
          <div className='w-full max-w-4xl'>
            <TestimonialCard
              testimonial={testimonial}
              showSecurityMetrics={showSecurityMetrics}
              showRating={true}
              showVerificationBadge={true}
              className='h-full'
            />
          </div>
        </div>
      );
    }

    if (variant === 'compact') {
      return (
        <div className='h-full flex items-center'>
          <TestimonialCard
            testimonial={testimonial}
            showSecurityMetrics={false}
            showRating={true}
            showVerificationBadge={false}
            className='h-full'
          />
        </div>
      );
    }

    return (
      <div className='h-full flex items-center justify-center'>
        <div className='w-full max-w-md'>
          <TestimonialCard
            testimonial={testimonial}
            showSecurityMetrics={showSecurityMetrics}
            showRating={true}
            showVerificationBadge={true}
            className='h-full'
          />
        </div>
      </div>
    );
  };

  // Security-themed navigation controls
  const renderNavigationControls = () => {
    if (!showControls) return null;

    return (
      <div className='absolute inset-0 pointer-events-none'>
        {/* Left Navigation */}
        <div className='absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-auto'>
          <motion.button
            onClick={prevSlide}
            whileHover={{ scale: 1.1, x: -4 }}
            whileTap={{ scale: 0.9 }}
            className='w-12 h-12 bg-deep-navy-700/80 backdrop-blur-sm border border-electric-cyan-500/30 rounded-full flex items-center justify-center text-electric-cyan-400 hover:bg-electric-cyan-500/20 transition-all duration-300'
            aria-label='Previous testimonial'
          >
            <ArrowLeft className='w-5 h-5' />
          </motion.button>
        </div>

        {/* Right Navigation */}
        <div className='absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-auto'>
          <motion.button
            onClick={nextSlide}
            whileHover={{ scale: 1.1, x: 4 }}
            whileTap={{ scale: 0.9 }}
            className='w-12 h-12 bg-deep-navy-700/80 backdrop-blur-sm border border-electric-cyan-500/30 rounded-full flex items-center justify-center text-electric-cyan-400 hover:bg-electric-cyan-500/20 transition-all duration-300'
            aria-label='Next testimonial'
          >
            <ArrowRight className='w-5 h-5' />
          </motion.button>
        </div>

        {/* Play/Pause Control */}
        <div className='absolute top-4 right-4 pointer-events-auto'>
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='w-10 h-10 bg-deep-navy-700/80 backdrop-blur-sm border border-electric-cyan-500/30 rounded-full flex items-center justify-center text-electric-cyan-400 hover:bg-electric-cyan-500/20 transition-all duration-300'
            aria-label={isPlaying ? 'Pause auto-play' : 'Start auto-play'}
          >
            {isPlaying ? (
              <Pause className='w-4 h-4' />
            ) : (
              <Play className='w-4 h-4 ml-1' />
            )}
          </motion.button>
        </div>
      </div>
    );
  };

  // Security-themed indicators
  const renderIndicators = () => {
    if (!showIndicators || testimonials.length <= 1) return null;

    return (
      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-electric-cyan-400 shadow-lg shadow-electric-cyan-400/50'
                : 'bg-gray-600 hover:bg-electric-cyan-500/50'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    );
  };

  // Security metrics overlay for featured variant
  const renderSecurityMetricsOverlay = () => {
    if (variant !== 'featured') return null;

    const testimonial = getCurrentTestimonial();
    const metrics = testimonial.securityMetrics;

    if (!metrics) return null;

    return (
      <div className='absolute top-4 left-4 right-4 flex justify-between items-start'>
        <div className='flex space-x-4 text-sm'>
          {metrics.vulnerabilitiesFound !== undefined && (
            <div className='bg-deep-navy-700/80 backdrop-blur-sm border border-red-500/30 rounded-lg px-3 py-2'>
              <div className='text-red-400 font-bold'>
                {metrics.vulnerabilitiesFound}
              </div>
              <div className='text-gray-400 text-xs'>Vulns Found</div>
            </div>
          )}
          {metrics.securityScoreImprovement && (
            <div className='bg-deep-navy-700/80 backdrop-blur-sm border border-green-500/30 rounded-lg px-3 py-2'>
              <div className='text-green-400 font-bold'>
                {metrics.securityScoreImprovement}%
              </div>
              <div className='text-gray-400 text-xs'>Security ↑</div>
            </div>
          )}
          {metrics.incidentResponseTime && (
            <div className='bg-deep-navy-700/80 backdrop-blur-sm border border-blue-500/30 rounded-lg px-3 py-2'>
              <div className='text-blue-400 font-bold'>
                {metrics.incidentResponseTime}
              </div>
              <div className='text-gray-400 text-xs'>Response Time</div>
            </div>
          )}
        </div>

        {/* Security verification badge */}
        <div className='bg-gradient-to-r from-green-600/20 to-electric-cyan-600/20 border border-green-500/50 rounded-lg px-3 py-2 flex items-center space-x-2'>
          <Shield className='w-4 h-4 text-green-400' />
          <span className='text-green-400 text-sm font-medium'>Verified</span>
        </div>
      </div>
    );
  };

  // Client information overlay
  const renderClientOverlay = () => {
    const testimonial = getCurrentTestimonial();
    return (
      <div className='absolute bottom-4 left-4 right-4 flex justify-between items-end'>
        <div className='flex items-center space-x-3'>
          <div className='flex items-center space-x-1'>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
              />
            ))}
          </div>
          <div className='text-sm text-gray-300'>
            {testimonial.name}, {testimonial.role}
          </div>
        </div>

        <div className='text-sm text-gray-400'>{testimonial.company}</div>
      </div>
    );
  };

  if (testimonials.length === 0) {
    return (
      <div className='flex items-center justify-center h-64 bg-deep-navy-800 rounded-xl border border-gray-700'>
        <div className='text-center text-gray-500'>
          <div className='w-12 h-12 mx-auto mb-4 bg-deep-navy-700 rounded-full flex items-center justify-center'>
            <Shield className='w-6 h-6' />
          </div>
          <p>No testimonials available</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={carouselRef}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Security-themed background */}
      <div className='absolute inset-0 bg-gradient-to-br from-deep-navy-900 via-electric-cyan-900/10 to-neon-green-900/10'>
        {/* Animated circuit pattern */}
        <div className='absolute inset-0 opacity-5'>
          <div
            className='w-full h-full'
            style={{
              backgroundImage: `
              linear-gradient(90deg, transparent 98%, rgba(0, 255, 255, 0.3) 100%),
              linear-gradient(0deg, transparent 98%, rgba(0, 255, 255, 0.3) 100%)
            `,
              backgroundSize: '40px 40px',
              animation: 'circuitFlow 20s linear infinite',
            }}
          />
        </div>

        {/* Binary code rain effect */}
        <div className='absolute inset-0 opacity-10'>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className='absolute text-electric-cyan-400 text-xs animate-pulse'
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>
      </div>

      {/* Carousel content */}
      <div className='relative h-96 md:h-[28rem] lg:h-[32rem]'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className='absolute inset-0'
          >
            {renderTestimonialCard(getCurrentTestimonial())}
          </motion.div>
        </AnimatePresence>

        {/* Security metrics overlay for featured variant */}
        {renderSecurityMetricsOverlay()}

        {/* Client information overlay */}
        {renderClientOverlay()}

        {/* Navigation controls */}
        {renderNavigationControls()}

        {/* Indicators */}
        {renderIndicators()}
      </div>

      {/* Progress indicator */}
      <div className='absolute bottom-0 left-0 right-0 h-1 bg-deep-navy-700/50'>
        <motion.div
          className='h-full bg-electric-cyan-500'
          initial={{ width: '0%' }}
          animate={{ width: isPlaying && !isHovered ? '100%' : '0%' }}
          transition={{ duration: interval / 1000, ease: 'linear' }}
          style={{
            transition:
              isPlaying && !isHovered ? `width ${interval}ms linear` : 'none',
          }}
        />
      </div>
    </div>
  );
};

// Security-focused testimonial slider for case studies integration
export const SecurityMetricsSlider: React.FC<{
  testimonials: EnhancedTestimonial[];
  className?: string;
}> = ({ testimonials, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      prev => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div
      className={`bg-deep-navy-800 rounded-xl border border-electric-cyan-500/30 overflow-hidden ${className}`}
    >
      {/* Header with security metrics */}
      <div className='bg-gradient-to-r from-electric-cyan-600/20 to-neon-green-600/20 border-b border-electric-cyan-500/30 p-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-semibold text-white'>
            Security Success Metrics
          </h3>
          <div className='flex items-center space-x-2'>
            <button
              onClick={prevSlide}
              className='w-8 h-8 bg-deep-navy-700 rounded-full flex items-center justify-center text-electric-cyan-400 hover:bg-electric-cyan-500/20 transition-colors'
            >
              <ArrowLeft className='w-4 h-4' />
            </button>
            <button
              onClick={nextSlide}
              className='w-8 h-8 bg-deep-navy-700 rounded-full flex items-center justify-center text-electric-cyan-400 hover:bg-electric-cyan-500/20 transition-colors'
            >
              <ArrowRight className='w-4 h-4' />
            </button>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className='p-6'>
        <div className='flex items-center space-x-4 mb-4'>
          <div className='w-16 h-16 rounded-full overflow-hidden border-2 border-electric-cyan-500/50'>
            <img
              src={currentTestimonial.image}
              alt={currentTestimonial.name}
              className='w-full h-full object-cover'
            />
          </div>
          <div>
            <h4 className='text-lg font-semibold text-white'>
              {currentTestimonial.name}
            </h4>
            <p className='text-electric-cyan-400'>
              {currentTestimonial.company}
            </p>
            <div className='flex items-center space-x-1 mt-1'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < currentTestimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                />
              ))}
            </div>
          </div>
        </div>

        <blockquote className='text-gray-300 mb-4 italic'>
          "{currentTestimonial.content}"
        </blockquote>

        {/* Security metrics */}
        {currentTestimonial.securityMetrics && (
          <div className='grid grid-cols-2 gap-4'>
            {currentTestimonial.securityMetrics.vulnerabilitiesFound !==
              undefined && (
              <div className='text-center p-3 bg-deep-navy-700/50 rounded-lg'>
                <div className='text-2xl font-bold text-red-400'>
                  {currentTestimonial.securityMetrics.vulnerabilitiesFound}
                </div>
                <div className='text-xs text-gray-400'>Vulns Found</div>
              </div>
            )}
            {currentTestimonial.securityMetrics.securityScoreImprovement && (
              <div className='text-center p-3 bg-deep-navy-700/50 rounded-lg'>
                <div className='text-2xl font-bold text-green-400'>
                  {currentTestimonial.securityMetrics.securityScoreImprovement}%
                </div>
                <div className='text-xs text-gray-400'>Security ↑</div>
              </div>
            )}
            {currentTestimonial.securityMetrics.costSavings && (
              <div className='text-center p-3 bg-deep-navy-700/50 rounded-lg'>
                <div className='text-xl font-bold text-blue-400'>
                  {currentTestimonial.securityMetrics.costSavings}
                </div>
                <div className='text-xs text-gray-400'>Cost Savings</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
