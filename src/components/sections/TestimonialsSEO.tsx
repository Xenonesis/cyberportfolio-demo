'use client';

import React, { useEffect, useState } from 'react';
import type { EnhancedTestimonial } from '@/types/testimonials';

interface TestimonialsSEOProps {
  testimonials: EnhancedTestimonial[];
  currentPage?: number;
  totalPages?: number;
  filters?: any;
}

export const TestimonialsSEO: React.FC<TestimonialsSEOProps> = ({
  testimonials,
  currentPage = 1,
  totalPages = 1,
  filters = {},
}) => {
  // Generate structured data for testimonials
  const generateTestimonialSchema = () => {
    const testimonialsSchema = testimonials.map(testimonial => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: testimonial.name,
        jobTitle: testimonial.role,
        worksFor: {
          '@type': 'Organization',
          name: testimonial.company,
        },
      },
      reviewBody: testimonial.content,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: testimonial.rating,
        bestRating: 5,
      },
      datePublished: testimonial.date,
      itemReviewed: {
        '@type': 'Service',
        name: 'Cybersecurity Consulting Services',
        provider: {
          '@type': 'Person',
          name: 'Aditya Kumar Tiwari',
          jobTitle: 'Cybersecurity Expert',
        },
      },
    }));

    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: testimonialsSchema,
      numberOfItems: testimonials.length,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://aditya-cybersecurity.com/testimonials',
      },
    };
  };

  // Generate meta description based on testimonials
  const generateMetaDescription = () => {
    const topTestimonials = testimonials.slice(0, 3);
    const companies = topTestimonials.map(t => t.company).join(', ');
    const averageRating =
      testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

    return `Read ${testimonials.length} verified client testimonials for Aditya Kumar Tiwari's cybersecurity services. ${companies} and ${testimonials.length - 3}+ other clients trust our security expertise. ${averageRating.toFixed(1)}★ rating.`;
  };

  // Generate Open Graph data
  const generateOpenGraphData = () => ({
    title:
      'Client Testimonials & Security Success Stories - Aditya Kumar Tiwari',
    description: generateMetaDescription(),
    url: `https://aditya-cybersecurity.com/testimonials${currentPage > 1 ? `?page=${currentPage}` : ''}`,
    type: 'website',
    image: 'https://aditya-cybersecurity.com/images/testimonials/og-image.jpg',
  });

  // Update document head
  useEffect(() => {
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', generateMetaDescription());
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', generateOpenGraphData().title);
    }

    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );
    if (ogDescription) {
      ogDescription.setAttribute(
        'content',
        generateOpenGraphData().description
      );
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', generateOpenGraphData().url);
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute('content', generateOpenGraphData().image);
    }

    // Update Twitter cards
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', generateOpenGraphData().title);
    }

    const twitterDescription = document.querySelector(
      'meta[name="twitter:description"]'
    );
    if (twitterDescription) {
      twitterDescription.setAttribute(
        'content',
        generateOpenGraphData().description
      );
    }

    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute('content', generateOpenGraphData().image);
    }

    // Add structured data
    let schemaScript = document.getElementById('testimonials-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'testimonials-schema';
      (schemaScript as HTMLScriptElement).type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    schemaScript.textContent = JSON.stringify(generateTestimonialSchema());

    return () => {
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [testimonials, currentPage]);

  return null; // This component only updates the document head
};

// Performance monitoring component
export const TestimonialsPerformanceMonitor: React.FC<{
  testimonials: EnhancedTestimonial[];
  onPerformanceUpdate?: (metrics: any) => void;
}> = ({ testimonials, onPerformanceUpdate }) => {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    interactionTime: 0,
    testimonialsCount: testimonials.length,
  });

  useEffect(() => {
    const startTime = performance.now();

    // Monitor component performance
    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (entry.entryType === 'measure') {
          setPerformanceMetrics(prev => ({
            ...prev,
            [entry.name]: entry.duration,
          }));
        }
      });
    });

    observer.observe({ entryTypes: ['measure'] });

    // Performance mark for component load
    performance.mark('testimonials-section-start');

    // Simulate render completion
    setTimeout(() => {
      performance.mark('testimonials-section-end');
      performance.measure(
        'testimonials-section-render',
        'testimonials-section-start',
        'testimonials-section-end'
      );

      const endTime = performance.now();
      setPerformanceMetrics(prev => ({
        ...prev,
        loadTime: endTime - startTime,
      }));

      // Call performance callback if provided
      if (onPerformanceUpdate) {
        onPerformanceUpdate({
          loadTime: endTime - startTime,
          renderTime:
            performance.getEntriesByName('testimonials-section-render')[0]
              ?.duration || 0,
          testimonialsCount: testimonials.length,
        });
      }
    }, 100);

    return () => observer.disconnect();
  }, [testimonials, onPerformanceUpdate]);

  return (
    <div className='hidden'>
      {/* Performance metrics for debugging */}
      <div
        data-testid='performance-metrics'
        data-metrics={JSON.stringify(performanceMetrics)}
      />
    </div>
  );
};

// Accessibility helper component
export const TestimonialsAccessibility: React.FC = () => {
  useEffect(() => {
    // Add ARIA live region for dynamic content updates
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'testimonials-live-region';
    document.body.appendChild(liveRegion);

    // Handle reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleReducedMotion = (e: MediaQueryListEvent) => {
      if (e.matches) {
        // Add reduced motion class to disable animations
        document.documentElement.classList.add('reduce-motion');
      } else {
        document.documentElement.classList.remove('reduce-motion');
      }
    };

    if (mediaQuery.matches) {
      document.documentElement.classList.add('reduce-motion');
    }

    mediaQuery.addEventListener('change', handleReducedMotion);

    return () => {
      document.body.removeChild(liveRegion);
      mediaQuery.removeEventListener('change', handleReducedMotion);
    };
  }, []);

  return null;
};

// Analytics tracking component
export const TestimonialsAnalytics: React.FC<{
  testimonials: EnhancedTestimonial[];
  onEvent?: (event: string, data: any) => void;
}> = ({ testimonials, onEvent }) => {
  const [engagementData, setEngagementData] = useState<{
    testimonialViews: number;
    filterUsage: Record<string, number>;
    searchQueries: string[];
    carouselInteractions: number;
    modalOpens: number;
  }>({
    testimonialViews: 0,
    filterUsage: {},
    searchQueries: [],
    carouselInteractions: 0,
    modalOpens: 0,
  });

  useEffect(() => {
    // Track page view
    const trackPageView = () => {
      if (onEvent) {
        onEvent('testimonials_page_view', {
          testimonialsCount: testimonials.length,
          timestamp: new Date().toISOString(),
        });
      }
    };

    // Track filter interactions
    const trackFilterInteraction = (filterType: string, value: string) => {
      setEngagementData(prev => ({
        ...prev,
        filterUsage: {
          ...prev.filterUsage,
          [filterType]: (prev.filterUsage[filterType] || 0) + 1,
        },
      }));

      if (onEvent) {
        onEvent('testimonials_filter', {
          filterType,
          value,
          timestamp: new Date().toISOString(),
        });
      }
    };

    // Track search usage
    const trackSearch = (query: string) => {
      setEngagementData(prev => ({
        ...prev,
        searchQueries: [...prev.searchQueries, query],
      }));

      if (onEvent) {
        onEvent('testimonials_search', {
          query,
          timestamp: new Date().toISOString(),
        });
      }
    };

    // Track carousel interactions
    const trackCarouselInteraction = () => {
      setEngagementData(prev => ({
        ...prev,
        carouselInteractions: prev.carouselInteractions + 1,
      }));

      if (onEvent) {
        onEvent('testimonials_carousel_interaction', {
          timestamp: new Date().toISOString(),
        });
      }
    };

    // Track modal opens
    const trackModalOpen = (testimonialId: string) => {
      setEngagementData(prev => ({
        ...prev,
        modalOpens: prev.modalOpens + 1,
      }));

      if (onEvent) {
        onEvent('testimonials_modal_open', {
          testimonialId,
          timestamp: new Date().toISOString(),
        });
      }
    };

    // Expose tracking functions globally
    (window as any).testimonialsAnalytics = {
      trackFilterInteraction,
      trackSearch,
      trackCarouselInteraction,
      trackModalOpen,
    };

    trackPageView();

    return () => {
      delete (window as any).testimonialsAnalytics;
    };
  }, [testimonials, onEvent]);

  return (
    <div className='hidden'>
      {/* Analytics data for debugging */}
      <div
        data-testid='analytics-data'
        data-engagement={JSON.stringify(engagementData)}
      />
    </div>
  );
};

// Lazy loading wrapper for testimonials
export const TestimonialLazyLoader: React.FC<{
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}> = ({ children, threshold = 0.1, rootMargin = '50px' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div ref={ref} className='w-full'>
      {isVisible ? (
        children
      ) : (
        <div className='w-full h-64 bg-deep-navy-800 animate-pulse rounded-xl' />
      )}
    </div>
  );
};

// Performance optimized testimonial grid
export const OptimizedTestimonialGrid: React.FC<{
  testimonials: EnhancedTestimonial[];
  renderItem: (testimonial: EnhancedTestimonial) => React.ReactNode;
  itemsPerRow?: number;
}> = ({ testimonials, renderItem, itemsPerRow = 3 }) => {
  const [visibleItems, setVisibleItems] = useState(itemsPerRow * 2); // Initial visible items

  useEffect(() => {
    // Load more items as user scrolls
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 1000;

      if (scrollPosition >= threshold && visibleItems < testimonials.length) {
        setVisibleItems(prev =>
          Math.min(prev + itemsPerRow * 2, testimonials.length)
        );
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleItems, testimonials.length, itemsPerRow]);

  return (
    <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
      {testimonials.slice(0, visibleItems).map((testimonial, index) => (
        <React.Fragment key={testimonial.id}>
          {renderItem(testimonial)}
        </React.Fragment>
      ))}

      {/* Loading skeleton for remaining items */}
      {visibleItems < testimonials.length && (
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {Array.from({
            length: Math.min(
              itemsPerRow * 2,
              testimonials.length - visibleItems
            ),
          }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className='bg-deep-navy-800 border border-deep-navy-600 rounded-xl overflow-hidden'
            >
              <div className='p-6'>
                <div className='flex items-center space-x-3 mb-4'>
                  <div className='w-12 h-12 bg-deep-navy-700 rounded-full animate-pulse' />
                  <div className='flex-1'>
                    <div className='h-4 bg-deep-navy-700 rounded animate-pulse mb-2' />
                    <div className='h-3 bg-deep-navy-700 rounded animate-pulse w-3/4' />
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='h-3 bg-deep-navy-700 rounded animate-pulse' />
                  <div className='h-3 bg-deep-navy-700 rounded animate-pulse w-5/6' />
                  <div className='h-3 bg-deep-navy-700 rounded animate-pulse w-4/6' />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
