'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { SEOHead } from './SEOHead';
import SchemaMarkup from './SchemaMarkup';
import { BreadcrumbNavigation } from './BreadcrumbNavigation';
import { PerformanceMonitoring } from './PerformanceMonitoring';
import { MobileOptimization } from './MobileOptimization';
import { ContentOptimization } from './ContentOptimization';
import { TrustBuilding } from './TrustBuilding';
import { SEO_CONFIG, SEO_PAGES } from '@/lib/seo-config';

interface SEOProviderProps {
  children: ReactNode;
  pageType?: string;
  pageTitle?: string;
  pageDescription?: string;
  pageKeywords?: string[];
  pageImage?: string;
  pageUrl?: string;
  structuredData?: any;
  enablePerformanceMonitoring?: boolean;
  enableMobileOptimization?: boolean;
  enableTrustBuilding?: boolean;
}

interface SEOContextType {
  config: typeof SEO_CONFIG;
  pages: typeof SEO_PAGES;
  currentPage: string;
  updatePageData: (data: Partial<SEOProviderProps>) => void;
  performanceMetrics: any;
  updatePerformanceMetrics: (metrics: any) => void;
}

const SEOContext = createContext<SEOContextType | undefined>(undefined);

export const SEOProvider = ({
  children,
  pageType = 'website',
  pageTitle,
  pageDescription,
  pageKeywords,
  pageImage,
  pageUrl,
  structuredData,
  enablePerformanceMonitoring = true,
  enableMobileOptimization = true,
  enableTrustBuilding = true,
}: SEOProviderProps) => {
  const [currentPage, setCurrentPage] = useState('');
  const [performanceMetrics, setPerformanceMetrics] = useState({
    pageLoadTime: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    firstInputDelay: 0,
    cumulativeLayoutShift: 0,
    timeToFirstByte: 0,
    domContentLoaded: 0,
    totalBlockingTime: 0,
    speedIndex: 0,
    seoScore: 0,
    keywordRankings: {},
    organicTraffic: 0,
    bounceRate: 0,
    conversionRate: 0,
    mobileUsability: 0,
    accessibilityScore: 0,
  });
  const [urlParams, setUrlParams] = useState({});

  useEffect(() => {
    // Get current page from URL
    if (typeof window !== 'undefined') {
      setCurrentPage(window.location.pathname);
      const params = new URLSearchParams(window.location.search);
      setUrlParams(Object.fromEntries(params));
    }
  }, []);

  const updatePageData = (data: Partial<SEOProviderProps>) => {
    // Update page-specific SEO data
    console.log('SEO data updated:', data);
  };

  const updatePerformanceMetrics = (metrics: any) => {
    setPerformanceMetrics(prev => ({ ...prev, ...metrics }));
  };

  const contextValue: SEOContextType = {
    config: SEO_CONFIG,
    pages: SEO_PAGES,
    currentPage,
    updatePageData,
    performanceMetrics,
    updatePerformanceMetrics,
  };

  return (
    <SEOContext.Provider value={contextValue}>
      <div className='seo-optimized-content'>
        {/* SEO Head with meta tags and schema */}
        <SEOHead
          title={pageTitle}
          description={pageDescription}
          keywords={pageKeywords}
          image={pageImage}
          url={pageUrl}
          type={pageType}
          structuredData={structuredData}
        />

        {/* Breadcrumb Navigation */}
        <BreadcrumbNavigation currentPath={currentPage} />

        {/* Content Optimization */}
        <ContentOptimization>{children}</ContentOptimization>

        {/* Trust Building Elements */}
        {enableTrustBuilding && <TrustBuilding />}

        {/* Mobile Optimization */}
        {enableMobileOptimization && <MobileOptimization />}

        {/* Performance Monitoring */}
        {enablePerformanceMonitoring && (
          <PerformanceMonitoring metrics={performanceMetrics} />
        )}

        {/* Schema Markup */}
        <SchemaMarkup
          pageType={pageType}
          pageTitle={pageTitle}
          pageDescription={pageDescription}
          pageImage={pageImage}
          pageUrl={pageUrl}
        />
      </div>
    </SEOContext.Provider>
  );
};

export const useSEO = () => {
  const context = useContext(SEOContext);
  if (context === undefined) {
    throw new Error('useSEO must be used within SEOProvider');
  }
  return context;
};
