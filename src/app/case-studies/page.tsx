import { Metadata } from 'next';
import { SITE_CONFIG, SEO_CONFIG } from '@/lib/data';
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection';
import { CaseStudiesSEO } from '@/components/sections/CaseStudiesSEO';
import { PerformanceMetrics } from '@/components/sections/PerformanceOptimization';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Case Studies & Security Projects - Aditya Kumar Tiwari',
  description: 'Explore comprehensive cybersecurity case studies showcasing measurable security improvements, successful implementations, and proven results across various industries.',
  keywords: [
    'cybersecurity case studies',
    'security projects',
    'security assessment',
    'penetration testing',
    'incident response',
    'cloud security',
    'security metrics',
    'security improvements',
    'cybersecurity portfolio',
    'security consulting',
  ],
  openGraph: {
    title: 'Case Studies & Security Projects - Aditya Kumar Tiwari',
    description: 'View successful cybersecurity implementations with measurable outcomes and proven security improvements.',
    images: [
      {
        url: 'https://aditya-cybersecurity.com/images/og-case-studies.jpg',
        width: 1200,
        height: 630,
        alt: 'Cybersecurity Case Studies Overview',
      },
    ],
    url: 'https://aditya-cybersecurity.com/case-studies',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies & Security Projects - Aditya Kumar Tiwari',
    description: 'View successful cybersecurity implementations with measurable outcomes.',
    images: ['https://aditya-cybersecurity.com/images/og-case-studies.jpg'],
  },
  alternates: {
    canonical: 'https://aditya-cybersecurity.com/case-studies',
  },
};

export default function CaseStudiesPage() {
  const handlePerformanceUpdate = (metrics: {
    loadTime: number;
    renderTime: number;
    interactionTime: number;
  }) => {
    console.log('Performance Metrics:', metrics);
    // In a real implementation, this would send metrics to analytics
  };

  return (
    <>
      {/* SEO Components */}
      <CaseStudiesSEO caseStudies={[]} /> {/* Will be populated with actual data */}
      <PerformanceMetrics onMetricsUpdate={handlePerformanceUpdate} />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="min-h-screen">
        {/* Case Studies Section */}
        <CaseStudiesSection
          config={{
            title: 'Case Studies & Security Projects',
            subtitle: 'Real-World Cybersecurity Success Stories',
            description:
              'Explore successful cybersecurity implementations that have protected organizations and prevented potential breaches. Each case study demonstrates measurable outcomes and proven security improvements.',
            showFilters: true,
            showSearch: true,
            showPagination: true,
            itemsPerPage: 6,
            animationSpeed: 0.6,
            enableLazyLoading: true,
            showClientLogos: true,
            showMetrics: true,
          }}
        />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}