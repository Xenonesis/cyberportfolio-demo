import {
  generateSeoMetadata,
  generateOpenGraph,
  generateTwitterCard,
  getOrganizationJsonLd,
  getWebsiteJsonLd,
} from '@/lib/schema';
import { SEO_CONFIG } from '@/lib/data';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
}

export const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type,
}: SEOProps) => {
  const seoData = generateSeoMetadata(
    { title, description, keywords, image, url, type },
    SEO_CONFIG
  );

  const openGraph = generateOpenGraph(seoData);
  const twitterCard = generateTwitterCard(seoData);

  return (
    <>
      {/* Basic Meta Tags */}
      <title>{seoData.title}</title>
      <meta name='description' content={seoData.description} />
      <meta
        name='keywords'
        content={keywords?.join(', ') || SEO_CONFIG.keywords.join(', ')}
      />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='robots' content='index, follow' />

      {/* Open Graph */}
      {Object.entries(openGraph).map(([key, value]) => (
        <meta key={key} property={key} content={value} />
      ))}

      {/* Twitter Card */}
      {Object.entries(twitterCard).map(([key, value]) => (
        <meta key={key} name={key} content={value} />
      ))}

      {/* Canonical URL */}
      <link rel='canonical' href={seoData.url || SEO_CONFIG.url} />

      {/* JSON-LD Schema Markup */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: getOrganizationJsonLd(),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: getWebsiteJsonLd(),
        }}
      />

      {/* Favicon */}
      <link rel='icon' href='/favicon.ico' />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/apple-touch-icon.png'
      />

      {/* Preconnect for external fonts */}
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />

      {/* Font loading optimization */}
      <link
        rel='stylesheet'
        href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap'
        media='print'
        // @ts-ignore
        onLoad={e => {
          (e.target as HTMLLinkElement).media = 'all';
        }}
      />
    </>
  );
};
