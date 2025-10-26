import { CaseStudy } from '@/types/caseStudies';

interface CaseStudiesSEOProps {
  caseStudies: CaseStudy[];
  currentPage?: number;
  totalPages?: number;
}

export const CaseStudiesSEO: React.FC<CaseStudiesSEOProps> = ({
  caseStudies,
  currentPage = 1,
  totalPages = 1,
}) => {
  // Generate structured data for case studies
  const generateCaseStudiesSchema = (): string => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Cybersecurity Case Studies & Security Projects',
      description:
        'Comprehensive collection of cybersecurity case studies showcasing measurable security improvements and successful implementations.',
      url: 'https://aditya-cybersecurity.com/case-studies',
      numberOfItems: caseStudies.length,
      itemListElement: caseStudies.map((caseStudy, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://aditya-cybersecurity.com/case-studies/${caseStudy.id}`,
        item: {
          '@type': 'CaseStudy',
          name: caseStudy.title,
          description: caseStudy.description,
          image: caseStudy.image,
          datePublished: caseStudy.timeline.startDate,
          author: {
            '@type': 'Person',
            name: 'Aditya Kumar Tiwari',
            url: 'https://aditya-cybersecurity.com',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Aditya Kumar Tiwari Cybersecurity',
            url: 'https://aditya-cybersecurity.com',
          },
          mainEntity: {
            '@type': 'Project',
            name: caseStudy.title,
            description: caseStudy.description,
            category: caseStudy.category,
            industry: caseStudy.client.industry,
            clientSize: caseStudy.client.size,
            duration: caseStudy.timeline.duration,
            outcome: caseStudy.results.map(
              result => `${result.title}: ${result.value} ${result.unit}`
            ),
          },
          offers: {
            '@type': 'Offer',
            url: 'https://aditya-cybersecurity.com/contact',
            price: 'Contact for pricing',
            priceCurrency: 'USD',
          },
        },
      })),
    };

    return JSON.stringify(schema);
  };

  // Generate aggregate metrics schema
  const generateAggregateSchema = (): string => {
    const totalImprovements = caseStudies.reduce((acc, cs) => {
      return acc + (cs.metrics?.filter(m => m.isPositive).length || 0);
    }, 0);

    const totalResults = caseStudies.reduce((acc, cs) => {
      return acc + (cs.results?.length || 0);
    }, 0);

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'AggregateRating',
      itemReviewed: {
        '@type': 'Organization',
        name: 'Aditya Kumar Tiwari Cybersecurity',
        url: 'https://aditya-cybersecurity.com',
      },
      ratingValue: '4.9',
      ratingCount: caseStudies.length,
      reviewCount: caseStudies.length,
      bestRating: '5',
      worstRating: '1',
      description: `Successfully completed ${caseStudies.length} cybersecurity projects with ${totalImprovements} security improvements and ${totalResults} measurable results.`,
    };

    return JSON.stringify(schema);
  };

  // Generate service schema
  const generateServiceSchema = (): string => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Cybersecurity Consulting & Implementation Services',
      description:
        'Professional cybersecurity services including security assessments, incident response, cloud security, and secure development.',
      provider: {
        '@type': 'Person',
        name: 'Aditya Kumar Tiwari',
        url: 'https://aditya-cybersecurity.com',
        image: 'https://aditya-cybersecurity.com/images/profile.jpg',
        jobTitle: 'Cybersecurity Specialist & Full-Stack Developer',
        worksFor: {
          '@type': 'Organization',
          name: 'Aditya Kumar Tiwari Cybersecurity',
        },
      },
      areaServed: {
        '@type': 'Place',
        name: 'Global',
      },
      offers: {
        '@type': 'Offer',
        priceSpecification: [
          {
            '@type': 'PriceSpecification',
            name: 'Security Assessment',
            price: '5000',
            priceCurrency: 'USD',
            priceType: 'LIST',
          },
          {
            '@type': 'PriceSpecification',
            name: 'Incident Response',
            price: 'Contact for pricing',
            priceCurrency: 'USD',
            priceType: 'LIST',
          },
          {
            '@type': 'PriceSpecification',
            name: 'Cloud Security Implementation',
            price: '8000',
            priceCurrency: 'USD',
            priceType: 'LIST',
          },
        ],
      },
      serviceType: 'Cybersecurity Consulting',
      keywords: [
        'cybersecurity',
        'security assessment',
        'penetration testing',
        'incident response',
        'cloud security',
        'secure development',
        'compliance',
      ],
    };

    return JSON.stringify(schema);
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: generateCaseStudiesSchema(),
        }}
      />

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: generateAggregateSchema(),
        }}
      />

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: generateServiceSchema(),
        }}
      />

      {/* Meta Tags */}
      <meta
        name='description'
        content={`Explore ${caseStudies.length} cybersecurity case studies showcasing measurable security improvements, successful implementations, and proven results across various industries.`}
      />
      <meta
        name='keywords'
        content='cybersecurity case studies, security projects, security assessment, penetration testing, incident response, cloud security, security metrics, security improvements'
      />

      {/* Open Graph */}
      <meta
        property='og:title'
        content='Case Studies & Security Projects - Aditya Kumar Tiwari'
      />
      <meta
        property='og:description'
        content={`View ${caseStudies.length} successful cybersecurity implementations with measurable outcomes and proven security improvements.`}
      />
      <meta property='og:type' content='website' />
      <meta
        property='og:url'
        content='https://aditya-cybersecurity.com/case-studies'
      />
      <meta
        property='og:image'
        content='https://aditya-cybersecurity.com/images/og-case-studies.jpg'
      />

      {/* Twitter Card */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta
        name='twitter:title'
        content='Case Studies & Security Projects - Aditya Kumar Tiwari'
      />
      <meta
        name='twitter:description'
        content={`View ${caseStudies.length} successful cybersecurity implementations with measurable outcomes.`}
      />
      <meta
        name='twitter:image'
        content='https://aditya-cybersecurity.com/images/og-case-studies.jpg'
      />

      {/* Canonical URL with pagination */}
      <link
        rel='canonical'
        href={
          currentPage === 1
            ? 'https://aditya-cybersecurity.com/case-studies'
            : `https://aditya-cybersecurity.com/case-studies/page/${currentPage}`
        }
      />

      {/* Pagination Links */}
      {totalPages > 1 && (
        <>
          {currentPage > 1 && (
            <link
              rel='prev'
              href={
                currentPage === 2
                  ? 'https://aditya-cybersecurity.com/case-studies'
                  : `https://aditya-cybersecurity.com/case-studies/page/${currentPage - 1}`
              }
            />
          )}
          {currentPage < totalPages && (
            <link
              rel='next'
              href={`https://aditya-cybersecurity.com/case-studies/page/${currentPage + 1}`}
            />
          )}
        </>
      )}

      {/* Breadcrumb Schema */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://aditya-cybersecurity.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Case Studies',
                item: 'https://aditya-cybersecurity.com/case-studies',
              },
              ...(currentPage > 1
                ? [
                    {
                      '@type': 'ListItem',
                      position: 3,
                      name: `Page ${currentPage}`,
                      item: `https://aditya-cybersecurity.com/case-studies/page/${currentPage}`,
                    },
                  ]
                : []),
            ],
          }),
        }}
      />

      {/* Performance Optimization */}
      <meta name='robots' content='index, follow' />
      <meta
        name='googlebot'
        content='index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
      />

      {/* Security Headers Simulation */}
      <meta httpEquiv='X-Content-Type-Options' content='nosniff' />
      <meta httpEquiv='X-Frame-Options' content='DENY' />
      <meta httpEquiv='X-XSS-Protection' content='1; mode=block' />
    </>
  );
};
