'use client';

import { useEffect } from 'react';

interface AboutSchemaProps {
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  image: string;
  sameAs: string[];
  alumniOf?: string;
  knowsAbout?: string[];
}

export const AboutSchema = ({
  name,
  jobTitle,
  description,
  url,
  image,
  sameAs,
  alumniOf,
  knowsAbout,
}: AboutSchemaProps) => {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name,
      url,
      image,
      jobTitle,
      description,
      sameAs,
      ...(alumniOf && { alumniOf }),
      ...(knowsAbout && { knowsAbout }),
      worksFor: {
        '@type': 'Organization',
        name: 'Aditya Kumar Tiwari - Cybersecurity Portfolio',
      },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN',
        addressLocality: 'India',
      },
      knowsAbout: [
        'Cybersecurity',
        'Network Security',
        'Cloud Security',
        'Vulnerability Assessment',
        'Penetration Testing',
        'Incident Response',
        'Risk Assessment',
        'AI/ML Security',
        'Prompt Engineering',
        'Secure Development',
        'Laravel/PHP',
        'API Security',
        'Code Security',
        'Security Architecture',
        'Zero Trust',
        'Compliance',
      ],
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [name, jobTitle, description, url, image, sameAs, alumniOf, knowsAbout]);

  return null;
};
