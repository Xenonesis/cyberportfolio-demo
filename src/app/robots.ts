import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://aditya-cybersecurity.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/.next/', '/node_modules/', '/out/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}