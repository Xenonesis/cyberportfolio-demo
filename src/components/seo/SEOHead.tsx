import { useEffect, useState } from 'react';
import { generateSeoMetadata, generateOpenGraph, generateTwitterCard } from '@/lib/schema';
import { SEO_CONFIG, SEO_PAGES } from '@/lib/seo-config';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  structuredData?: any;
  canonicalUrl?: string;
  robots?: string;
  language?: string;
  locale?: string;
}

export const SEOHead = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  structuredData,
  canonicalUrl,
  robots = 'index, follow',
  language = 'en',
  locale = 'en_US',
}: SEOHeadProps) => {
  const [seoData, setSeoData] = useState<any>({});
  const [schemaData, setSchemaData] = useState<any[]>([]);

  useEffect(() => {
    // Generate SEO metadata
    const pageData = {
      title,
      description,
      keywords,
      image,
      url,
      type,
    };

    const generatedSeoData = generateSeoMetadata(pageData, SEO_CONFIG);
    setSeoData(generatedSeoData);

    // Generate schema markup
    const generatedSchema = generateSchemaMarkup(generatedSeoData, structuredData);
    setSchemaData(generatedSchema);
  }, [title, description, keywords, image, url, type, structuredData]);

  const generateSchemaMarkup = (seoData: any, customSchema?: any) => {
    const schemas = [];

    // Add organization schema
    schemas.push({
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

    // Add website schema
    schemas.push({
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

    // Add custom schema if provided
    if (customSchema) {
      schemas.push(customSchema);
    }

    // Add breadcrumb schema for deeper pages
    if (url && url.split('/').filter(Boolean).length > 1) {
      schemas.push(generateBreadcrumbSchema(url));
    }

    return schemas;
  };

  const generateBreadcrumbSchema = (currentUrl: string) => {
    const pathSegments = currentUrl.split('/').filter(Boolean);
    const breadcrumbs = pathSegments.map((segment, index) => {
      const path = '/' + pathSegments.slice(0, index + 1).join('/');
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        item: `${SEO_CONFIG.siteUrl}${path}`,
      };
    });

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SEO_CONFIG.siteUrl,
        },
        ...breadcrumbs,
      ],
    };
  };

  const openGraph = generateOpenGraph(seoData);
  const twitterCard = generateTwitterCard(seoData);
  const finalCanonicalUrl = canonicalUrl || seoData.url || SEO_CONFIG.siteUrl;

  return (
    <>
      {/* Basic Meta Tags */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta
        name="keywords"
        content={keywords?.join(', ') || SEO_CONFIG.primaryKeywords.join(', ')}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content={robots} />
      <meta name="language" content={language} />
      <meta name="locale" content={locale} />

      {/* Open Graph */}
      {Object.entries(openGraph).map(([key, value]) => (
        <meta key={key} property={key} content={value} />
      ))}

      {/* Twitter Card */}
      {Object.entries(twitterCard).map(([key, value]) => (
        <meta key={key} name={key} content={value} />
      ))}

      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonicalUrl} />

      {/* Alternate URLs for internationalization */}
      <link rel="alternate" hrefLang="en-US" href={finalCanonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={finalCanonicalUrl} />

      {/* Favicon and Apple Touch Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

      {/* Preconnect for external resources */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      {/* Font loading optimization */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        media="print"
        // @ts-ignore
        onLoad={(e) => {
          (e.target as HTMLLinkElement).media = 'all';
        }}
      />

      {/* Security-focused meta tags */}
      <meta name="author" content="Aditya Kumar Tiwari" />
      <meta
        name="category"
        content="Cybersecurity, Security Consulting, Technology"
      />
      <meta
        name="security-credentials"
        content="ISO 27001 Certified, CISSP, 100+ Security Assessments"
      />

      {/* Structured Data (Schema Markup) */}
      {schemaData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}

      {/* Performance optimization meta tags */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="theme-color" content="#0F172A" />
      <meta name="msapplication-TileColor" content="#0F172A" />

      {/* Security headers simulation (for SEO purposes) */}
      <meta name="X-Content-Type-Options" content="nosniff" />
      <meta name="X-Frame-Options" content="DENY" />
      <meta name="X-XSS-Protection" content="1; mode=block" />

      {/* Content Security Policy simulation */}
      <meta
        name="Content-Security-Policy"
        content="default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com"
      />
    </>
  );
};