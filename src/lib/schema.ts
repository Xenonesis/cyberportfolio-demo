// Schema markup and SEO utilities for the cybersecurity portfolio

import type { SchemaMarkup, SeoMetadata } from '@/types';
import { SITE_CONFIG, SEO_CONFIG } from './data';

// Organization schema markup
export const ORGANIZATION_SCHEMA: SchemaMarkup = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  description: SITE_CONFIG.description,
  image: `${SITE_CONFIG.url}/images/profile.jpg`,
  sameAs: SITE_CONFIG.socials.map(social => social.url),
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': SITE_CONFIG.url,
  },
};

// WebSite schema markup
export const WEBSITE_SCHEMA: SchemaMarkup = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_CONFIG.title,
  url: SITE_CONFIG.url,
  description: SITE_CONFIG.description,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': SITE_CONFIG.url,
  },
};

// Generate SEO metadata for pages
export function generateSeoMetadata(
  pageData: Partial<SeoMetadata>,
  defaultData: Partial<SeoMetadata> = SEO_CONFIG
): SeoMetadata {
  return {
    title: pageData.title || defaultData.title || SITE_CONFIG.title,
    description:
      pageData.description ||
      defaultData.description ||
      SITE_CONFIG.description,
    keywords: pageData.keywords || defaultData.keywords || SEO_CONFIG.keywords,
    image: pageData.image || defaultData.image,
    url: pageData.url || defaultData.url || SITE_CONFIG.url,
    type: pageData.type || 'website',
  };
}

// Generate JSON-LD script for pages
export function generateJsonLd(schema: SchemaMarkup): string {
  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

// Generate organization JSON-LD
export function getOrganizationJsonLd(): string {
  return generateJsonLd(ORGANIZATION_SCHEMA);
}

// Generate website JSON-LD
export function getWebsiteJsonLd(): string {
  return generateJsonLd(WEBSITE_SCHEMA);
}

// Generate article JSON-LD for blog posts
export function generateArticleJsonLd(
  title: string,
  description: string,
  publishedAt: string,
  author: string,
  image?: string
): string {
  const articleSchema: SchemaMarkup & {
    headline: string;
    datePublished: string;
    author: { '@type': string; name: string };
  } = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: title,
    headline: title,
    description,
    url: `${SITE_CONFIG.url}/blog/${title.toLowerCase().replace(/\s+/g, '-')}`,
    datePublished: publishedAt,
    author: {
      '@type': 'Person',
      name: author,
    },
    ...(image && { image }),
  };

  return generateJsonLd(articleSchema);
}

// Open Graph metadata generator
export function generateOpenGraph(
  seoData: SeoMetadata
): Record<string, string> {
  return {
    'og:title': seoData.title,
    'og:description': seoData.description,
    'og:type': seoData.type || 'website',
    'og:url': seoData.url || SITE_CONFIG.url,
    ...(seoData.image && { 'og:image': seoData.image }),
    'og:site_name': SITE_CONFIG.name,
  };
}

// Twitter Card metadata generator
export function generateTwitterCard(
  seoData: SeoMetadata
): Record<string, string> {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': seoData.title,
    'twitter:description': seoData.description,
    ...(seoData.image && { 'twitter:image': seoData.image }),
    'twitter:site': '@aditya_cyber',
    'twitter:creator': '@aditya_cyber',
  };
}

// Common SEO utilities
export const SEO_UTILS = {
  // Character limits for meta tags
  TITLE_MAX_LENGTH: 60,
  DESCRIPTION_MAX_LENGTH: 160,

  // Validate and truncate title
  truncateTitle(title: string): string {
    return title.length > this.TITLE_MAX_LENGTH
      ? title.substring(0, this.TITLE_MAX_LENGTH - 3) + '...'
      : title;
  },

  // Validate and truncate description
  truncateDescription(description: string): string {
    return description.length > this.DESCRIPTION_MAX_LENGTH
      ? description.substring(0, this.DESCRIPTION_MAX_LENGTH - 3) + '...'
      : description;
  },

  // Generate slug from title
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  // Validate URL format
  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
};
