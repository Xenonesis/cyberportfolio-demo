'use client';

import { useEffect, useState } from 'react';
import { SEO_CONFIG } from '@/lib/seo-config';

interface SchemaMarkupProps {
  pageType?: string;
  pageTitle?: string;
  pageDescription?: string;
  pageImage?: string;
  pageUrl?: string;
  author?: string;
  publishDate?: string;
  modifiedDate?: string;
  articleSection?: string;
  articleTags?: string[];
  breadcrumbList?: { name: string; url: string }[];
  faqList?: { question: string; answer: string }[];
  howToSteps?: { name: string; text: string; url?: string }[];
  caseStudyData?: {
    client: string;
    industry: string;
    challenges: string[];
    solutions: string[];
    results: string[];
    metrics: { label: string; value: string }[];
  };
  reviewData?: {
    reviewer: string;
    rating: number;
    review: string;
    date: string;
    verified: boolean;
  };
  serviceData?: {
    name: string;
    description: string;
    priceRange?: string;
    serviceArea: string;
    availableAtOrFrom?: string;
  };
  eventDate?: string;
  eventLocation?: string;
  eventDescription?: string;
}

interface SchemaData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export const SchemaMarkup = ({
  pageType = 'website',
  pageTitle,
  pageDescription,
  pageImage,
  pageUrl,
  author = 'Aditya Kumar Tiwari',
  publishDate,
  modifiedDate,
  articleSection,
  articleTags,
  breadcrumbList,
  faqList,
  howToSteps,
  caseStudyData,
  reviewData,
  serviceData,
  eventDate,
  eventLocation,
  eventDescription,
}: SchemaMarkupProps) => {
  const [schemas, setSchemas] = useState<SchemaData[]>([]);

  useEffect(() => {
    const generatedSchemas: SchemaData[] = [];

    // Always include organization schema
    generatedSchemas.push({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Aditya Kumar Tiwari',
      url: SEO_CONFIG.siteUrl,
      description: SEO_CONFIG.siteDescription,
      image: `${SEO_CONFIG.siteUrl}/images/profile.jpg`,
      sameAs: [
        'https://linkedin.com/in/aditya-cybersecurity',
        'https://twitter.com/aditya_cyber',
        'https://github.com/aditya-cybersecurity',
        'https://medium.com/@aditya-cybersecurity',
      ],
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': SEO_CONFIG.siteUrl,
      },
    });

    // Always include website schema
    generatedSchemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SEO_CONFIG.siteTitle,
      url: SEO_CONFIG.siteUrl,
      description: SEO_CONFIG.siteDescription,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': SEO_CONFIG.siteUrl,
      },
    });

    // Generate page-specific schema
    switch (pageType) {
      case 'article':
        if (pageTitle && pageDescription) {
          generatedSchemas.push(generateArticleSchema());
        }
        break;
      case 'case-study':
        if (caseStudyData) {
          generatedSchemas.push(generateCaseStudySchema());
        }
        break;
      case 'review':
        if (reviewData) {
          generatedSchemas.push(generateReviewSchema());
        }
        break;
      case 'service':
        if (serviceData) {
          generatedSchemas.push(generateServiceSchema());
        }
        break;
      case 'event':
        if (eventDate && eventLocation && eventDescription) {
          generatedSchemas.push(generateEventSchema());
        }
        break;
      case 'faq':
        if (faqList && faqList.length > 0) {
          generatedSchemas.push(generateFAQSchema());
        }
        break;
      case 'how-to':
        if (howToSteps && howToSteps.length > 0) {
          generatedSchemas.push(generateHowToSchema());
        }
        break;
      case 'breadcrumb':
        if (breadcrumbList && breadcrumbList.length > 0) {
          generatedSchemas.push(generateBreadcrumbSchema());
        }
        break;
    }

    setSchemas(generatedSchemas);
  }, [
    pageType,
    pageTitle,
    pageDescription,
    pageImage,
    pageUrl,
    author,
    publishDate,
    modifiedDate,
    articleSection,
    articleTags,
    breadcrumbList,
    faqList,
    howToSteps,
    caseStudyData,
    reviewData,
    serviceData,
    eventDate,
    eventLocation,
    eventDescription,
  ]);

  const generateArticleSchema = (): SchemaData => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: pageTitle,
    description: pageDescription,
    image: pageImage ? [pageImage] : undefined,
    url: pageUrl,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Person',
      name: 'Aditya Kumar Tiwari',
      url: SEO_CONFIG.siteUrl,
    },
    datePublished: publishDate,
    dateModified: modifiedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    articleSection: articleSection,
    keywords: articleTags?.join(', '),
  });

  const generateCaseStudySchema = (): SchemaData => ({
    '@context': 'https://schema.org',
    '@type': 'CaseStudy',
    name: pageTitle,
    description: pageDescription,
    image: pageImage ? [pageImage] : undefined,
    url: pageUrl,
    author: {
      '@type': 'Person',
      name: author,
    },
    client: {
      '@type': 'Organization',
      name: caseStudyData?.client,
      industry: caseStudyData?.industry,
    },
    challenges: caseStudyData?.challenges,
    solutions: caseStudyData?.solutions,
    results: caseStudyData?.results,
    metrics: caseStudyData?.metrics?.map(metric => ({
      '@type': 'PropertyValue',
      name: metric.label,
      value: metric.value,
    })),
  });

  const generateReviewSchema = (): SchemaData => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: pageTitle,
    description: pageDescription,
    reviewBody: reviewData?.review,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: reviewData?.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      '@type': 'Person',
      name: reviewData?.reviewer,
    },
    datePublished: reviewData?.date,
    itemReviewed: {
      '@type': 'Person',
      name: 'Aditya Kumar Tiwari',
      url: SEO_CONFIG.siteUrl,
    },
    reviewAspect: 'Cybersecurity Services',
    isVerified: reviewData?.verified,
  });

  const generateServiceSchema = (): SchemaData => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceData?.name,
    description: serviceData?.description,
    url: pageUrl,
    provider: {
      '@type': 'Person',
      name: 'Aditya Kumar Tiwari',
      url: SEO_CONFIG.siteUrl,
    },
    serviceArea: {
      '@type': 'Place',
      name: serviceData?.serviceArea,
    },
    offers: serviceData?.priceRange
      ? {
          '@type': 'Offer',
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: serviceData.priceRange,
          },
        }
      : undefined,
    availableAtOrFrom: serviceData?.availableAtOrFrom
      ? {
          '@type': 'Place',
          name: serviceData.availableAtOrFrom,
        }
      : undefined,
  });

  const generateEventSchema = (): SchemaData => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: pageTitle,
    description: eventDescription,
    startDate: eventDate,
    location: {
      '@type': 'Place',
      name: eventLocation,
    },
    organizer: {
      '@type': 'Person',
      name: 'Aditya Kumar Tiwari',
      url: SEO_CONFIG.siteUrl,
    },
    url: pageUrl,
  });

  const generateFAQSchema = (): SchemaData => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList?.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  });

  const generateHowToSchema = (): SchemaData => ({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: pageTitle,
    description: pageDescription,
    step: howToSteps?.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      url: step.url,
    })),
  });

  const generateBreadcrumbSchema = (): SchemaData => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbList?.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
};
