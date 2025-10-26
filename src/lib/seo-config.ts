// Comprehensive SEO configuration for cybersecurity portfolio

export const SEO_CONFIG = {
  // Site-wide SEO settings
  siteName: 'Aditya Kumar Tiwari - Cybersecurity Expert',
  siteTitle: 'Cybersecurity Portfolio - Aditya Kumar Tiwari',
  siteDescription:
    'Expert cybersecurity consultant specializing in enterprise security, incident response, and cloud security solutions. Protecting organizations from evolving cyber threats.',
  siteUrl: 'https://aditya-cybersecurity.com',
  siteImage: '/images/og-image.jpg',
  siteEmail: 'aditya@cybersecurity.com',
  sitePhone: '+1 (555) 123-4567',
  siteAddress: 'New York, NY, USA',

  // Primary keywords (security-focused)
  primaryKeywords: [
    'cybersecurity specialist',
    'security consultant',
    'penetration testing',
    'vulnerability assessment',
    'incident response',
    'cloud security',
    'network security',
    'AI security',
    'prompt engineering security',
    'secure development',
  ],

  // Secondary keywords
  secondaryKeywords: [
    'cybersecurity',
    'security expert',
    'ethical hacker',
    'security architecture',
    'risk assessment',
    'threat analysis',
    'security compliance',
    'data protection',
    'zero trust',
    'security consulting',
  ],

  // Long-tail keywords
  longTailKeywords: [
    'cybersecurity services for startups',
    'security assessment consultant',
    'enterprise security consultant',
    'cloud security implementation',
    'AI security consulting',
    'prompt engineering for security',
    'cybersecurity expert India',
    'security consultant Mumbai',
    'best cybersecurity consultant',
    'affordable security services',
  ],

  // Local keywords
  localKeywords: [
    'cybersecurity expert India',
    'security consultant Mumbai',
    'cybersecurity services Delhi',
    'security consultant Bangalore',
    'cybersecurity training India',
  ],

  // Industry-specific keywords
  industryKeywords: [
    'cloud security AWS Azure GCP',
    'AI ML security',
    'devops security',
    'container security',
    'API security',
    'web application security',
    'mobile security',
    'IoT security',
    'OT security',
    'critical infrastructure security',
  ],

  // Meta tag defaults
  metaDefaults: {
    titleLength: 60,
    descriptionLength: 160,
    keywordsLength: 10,
    imageDimensions: {
      width: 1200,
      height: 630,
    },
  },

  // OpenGraph settings
  openGraph: {
    defaultImage: '/images/og-image.jpg',
    siteName: 'Aditya Kumar Tiwari - Cybersecurity Expert',
    type: 'website',
    locale: 'en_US',
  },

  // Twitter Card settings
  twitter: {
    card: 'summary_large_image',
    site: '@aditya_cyber',
    creator: '@aditya_cyber',
  },

  // Schema markup defaults
  schemaDefaults: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Aditya Kumar Tiwari',
      url: 'https://aditya-cybersecurity.com',
      description:
        'Expert cybersecurity consultant specializing in enterprise security, incident response, and cloud security solutions.',
      image: 'https://aditya-cybersecurity.com/images/profile.jpg',
      sameAs: [
        'https://linkedin.com/in/aditya-cybersecurity',
        'https://twitter.com/aditya_cyber',
        'https://github.com/aditya-cybersecurity',
        'https://medium.com/@aditya-cybersecurity',
      ],
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://aditya-cybersecurity.com',
      },
    },
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Aditya Kumar Tiwari - Cybersecurity Expert',
      url: 'https://aditya-cybersecurity.com',
      description:
        'Expert cybersecurity consultant specializing in enterprise security, incident response, and cloud security solutions.',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://aditya-cybersecurity.com',
      },
    },
  },

  // Performance optimization settings
  performance: {
    enableLazyLoading: true,
    enableImageOptimization: true,
    enableMinification: true,
    enableCaching: true,
    enableCDN: true,
    mobileFirst: true,
  },

  // Security-focused SEO elements
  securitySEO: {
    trustSignals: [
      'ISO 27001 Certified',
      'CISSP Certified',
      '100+ Security Assessments',
      '99.9% Success Rate',
      'Enterprise Clients',
      '24/7 Support',
    ],
    certifications: [
      'Google Foundations of Cybersecurity',
      'Cisco Cyber Threat Management',
      'ISO 27001 Information Security',
      'Cisco Ethical Hacker',
    ],
    clientIndustries: [
      'Financial Services',
      'Healthcare',
      'Technology',
      'Manufacturing',
      'Government',
      'Education',
    ],
  },
};

// Page-specific SEO configurations
export const SEO_PAGES = {
  home: {
    title: 'Cybersecurity Expert & Full-Stack Developer | Aditya Kumar Tiwari',
    description:
      'Bridging Security and Innovation. Cybersecurity Specialist & Full-Stack Developer combining security expertise with cutting-edge development to create innovative, secure solutions for modern businesses.',
    keywords: [
      ...SEO_CONFIG.primaryKeywords,
      ...SEO_CONFIG.secondaryKeywords,
      'full-stack developer',
      'Laravel developer',
      'secure web applications',
    ],
    image: '/images/hero-security.jpg',
    schema: {
      '@type': 'Person',
      jobTitle: 'Cybersecurity Specialist & Full-Stack Developer',
      worksFor: 'Freelance/Consulting',
      knowsAbout: [
        'Cybersecurity',
        'Penetration Testing',
        'Vulnerability Assessment',
        'Cloud Security',
        'AI Security',
        'Web Development',
      ],
    },
  },

  about: {
    title: 'About Aditya Kumar Tiwari | Cybersecurity Expert & Developer',
    description:
      "Learn about Aditya Kumar Tiwari's cybersecurity expertise, education, certifications, and professional journey in protecting organizations from cyber threats.",
    keywords: [
      'about cybersecurity expert',
      'cybersecurity professional',
      'security consultant background',
      'cybersecurity education',
      'security certifications',
    ],
    image: '/images/about-hero.jpg',
    schema: {
      '@type': 'AboutPage',
      mainEntity: {
        '@type': 'Person',
        name: 'Aditya Kumar Tiwari',
        description:
          'Cybersecurity Specialist & Full-Stack Developer with 7+ years of experience.',
      },
    },
  },

  services: {
    title: 'Cybersecurity Services | Security Consulting & Assessment',
    description:
      'Comprehensive cybersecurity services including security assessment, incident response, cloud security, compliance, and security training for startups and enterprises.',
    keywords: [
      'cybersecurity services',
      'security consulting',
      'security assessment',
      'incident response services',
      'cloud security services',
      'compliance services',
    ],
    image: '/images/services-hero.jpg',
    schema: {
      '@type': 'ProfessionalService',
      name: 'Cybersecurity Services by Aditya Kumar Tiwari',
      description:
        'Comprehensive cybersecurity services including assessment, consulting, and training.',
      serviceArea: {
        '@type': 'Place',
        name: 'Global',
      },
      offers: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Security Assessment',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Incident Response',
          },
        },
      ],
    },
  },

  'case-studies': {
    title: 'Case Studies | Cybersecurity Success Stories & Results',
    description:
      'Real-world cybersecurity case studies showcasing successful security transformations, threat mitigations, and security implementations for enterprise clients.',
    keywords: [
      'cybersecurity case studies',
      'security success stories',
      'enterprise security case studies',
      'security implementation results',
      'threat mitigation examples',
    ],
    image: '/images/case-studies-hero.jpg',
    schema: {
      '@type': 'CollectionPage',
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: [],
      },
    },
  },

  blog: {
    title: 'Cybersecurity Blog | Security Insights & Expert Advice',
    description:
      'Latest cybersecurity insights, security tips, industry trends, and expert advice on protecting your organization from evolving cyber threats.',
    keywords: [
      'cybersecurity blog',
      'security insights',
      'security tips',
      'cybersecurity trends',
      'security expert advice',
      'threat intelligence',
    ],
    image: '/images/blog-hero.jpg',
    schema: {
      '@type': 'Blog',
      mainEntity: {
        '@type': 'BlogPosting',
        headline: 'Cybersecurity Blog',
        description:
          'Expert insights on cybersecurity, threat intelligence, and security best practices.',
      },
    },
  },

  contact: {
    title: 'Contact Aditya Kumar Tiwari | Cybersecurity Consultant',
    description:
      'Get in touch with Aditya Kumar Tiwari for cybersecurity consulting, security assessments, or to discuss your security needs. 24/7 support available.',
    keywords: [
      'contact cybersecurity expert',
      'security consultant contact',
      'cybersecurity consultation',
      'security assessment inquiry',
      'hire security expert',
    ],
    image: '/images/contact-hero.jpg',
    schema: {
      '@type': 'ContactPage',
      mainEntity: {
        '@type': 'Person',
        name: 'Aditya Kumar Tiwari',
        contactType: 'Cybersecurity Consultation',
        email: 'aditya@cybersecurity.com',
        telephone: '+1 (555) 123-4567',
      },
    },
  },
};

// SEO performance metrics configuration
export const SEO_PERFORMANCE_CONFIG = {
  // Core Web Vitals thresholds
  coreWebVitals: {
    LCP: 2500, // Largest Contentful Paint (ms)
    FID: 100, // First Input Delay (ms)
    CLS: 0.1, // Cumulative Layout Shift
  },

  // SEO ranking factors
  rankingFactors: {
    contentQuality: 0.3,
    backlinks: 0.25,
    technicalSEO: 0.2,
    userExperience: 0.15,
    mobileOptimization: 0.1,
  },

  // Performance monitoring intervals
  monitoring: {
    pageSpeed: 60000, // 1 minute
    keywordRanking: 86400000, // 1 day
    backlinkTracking: 86400000, // 1 day
    userBehavior: 300000, // 5 minutes
  },
};

// Content optimization guidelines
export const CONTENT_OPTIMIZATION_GUIDELINES = {
  // Content structure
  structure: {
    headingHierarchy: ['H1', 'H2', 'H3', 'H4'],
    paragraphLength: {
      min: 50,
      max: 150,
    },
    sentenceLength: {
      min: 10,
      max: 25,
    },
  },

  // Keyword optimization
  keywordOptimization: {
    density: {
      min: 0.5,
      max: 2.5,
    },
    placement: {
      title: true,
      firstParagraph: true,
      headings: true,
      metaDescription: true,
    },
    semanticKeywords: true,
    LSIKeywords: true,
  },

  // Readability
  readability: {
    fleschKincaid: {
      min: 60,
      max: 80,
    },
    gradeLevel: {
      min: 8,
      max: 12,
    },
  },

  // Content length guidelines
  contentLength: {
    blogPosts: {
      min: 800,
      max: 2500,
    },
    caseStudies: {
      min: 1500,
      max: 4000,
    },
    servicePages: {
      min: 500,
      max: 1500,
    },
    landingPages: {
      min: 1000,
      max: 3000,
    },
  },
};
