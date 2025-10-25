// Comprehensive Testimonials Data for Cybersecurity Portfolio

import type {
  EnhancedTestimonial,
  TestimonialCategory,
  TestimonialsConfig,
  SecuritySuccessStory,
  ClientInfo,
  SecurityBadge,
  TrustIndicator,
} from '@/types/testimonials';

// Enhanced testimonials with security-specific details
export const ENHANCED_TESTIMONIALS: EnhancedTestimonial[] = [
  {
    id: 'ceo-manufacturing-zero-trust',
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechManufacture Inc.',
    companyIndustry: 'Manufacturing',
    companySize: 'enterprise',
    image: '/images/testimonials/sarah-johnson.jpg',
    content:
      'Aditya transformed our security posture completely. His expertise in Zero Trust architecture and incident response saved our company from potential catastrophic breaches. The 75% reduction in security incidents speaks volumes about his capabilities.',
    rating: 5,
    verified: true,
    securityDomain: ['data-protection', 'incident-response', 'network-security'],
    projectType: 'assessment',
    projectDuration: '4 months',
    projectImpact: '75% reduction in security incidents, $2M annual cost savings',
    securityMetrics: {
      vulnerabilitiesFound: 45,
      securityScoreImprovement: 65,
      incidentResponseTime: '2 hours',
      complianceAchieved: ['SOC 2 Type II'],
      costSavings: '$2M annually',
    },
    beforeAfter: {
      before: 'Legacy systems with outdated security controls, no centralized monitoring',
      after: 'Zero Trust architecture implemented, 24/7 security monitoring, SOC 2 compliance',
    },
    tags: ['Zero Trust', 'Incident Response', 'Enterprise Security'],
    date: '2024-11-15',
    featured: true,
    caseStudyId: 'enterprise-security-overhaul',
  },
  {
    id: 'cto-healthcare-cloud-migration',
    name: 'Dr. Michael Chen',
    role: 'CTO',
    company: 'HealthCare Plus',
    companyIndustry: 'Healthcare',
    companySize: 'mid-market',
    image: '/images/testimonials/michael-chen.jpg',
    content:
      'Working with Aditya on our cloud migration was exceptional. His deep understanding of HIPAA compliance and AWS security ensured our patient data remained protected throughout the transition. His strategic approach and attention to detail are unmatched.',
    rating: 5,
    verified: true,
    securityDomain: ['cloud-security', 'compliance', 'data-protection'],
    projectType: 'development',
    projectDuration: '3 months',
    projectImpact: 'HIPAA compliance achieved, zero data breaches during migration',
    securityMetrics: {
      securityScoreImprovement: 80,
      complianceAchieved: ['HIPAA'],
      costSavings: '$150K annually',
    },
    beforeAfter: {
      before: 'On-premise systems with limited cloud security expertise',
      after: 'HIPAA-compliant AWS environment with robust data protection',
    },
    tags: ['Cloud Security', 'HIPAA Compliance', 'AWS'],
    date: '2024-10-28',
    featured: true,
    caseStudyId: 'cloud-migration-security',
  },
  {
    id: 'security-director-bank-penetration-test',
    name: 'Lisa Rodriguez',
    role: 'Security Director',
    company: 'Global Bank Corp.',
    companyIndustry: 'Financial Services',
    companySize: 'enterprise',
    image: '/images/testimonials/lisa-rodriguez.jpg',
    content:
      "Aditya's penetration testing revealed critical vulnerabilities we never knew existed. His comprehensive report and remediation guidance have significantly strengthened our security program. His professionalism and expertise are top-notch.",
    rating: 5,
    verified: true,
    securityDomain: ['web-application-security', 'network-security', 'compliance'],
    projectType: 'assessment',
    projectDuration: '6 weeks',
    projectImpact: '15 critical vulnerabilities identified and remediated',
    securityMetrics: {
      vulnerabilitiesFound: 15,
      securityScoreImprovement: 70,
      complianceAchieved: ['PCI DSS'],
    },
    beforeAfter: {
      before: 'Unaware of critical security gaps in our network',
      after: 'Comprehensive vulnerability management program with regular testing',
    },
    tags: ['Penetration Testing', 'Vulnerability Assessment', 'PCI DSS'],
    date: '2024-10-15',
    featured: true,
    caseStudyId: 'financial-institution-penetration-test',
  },
  {
    id: 'founder-fintech-startup-secure-development',
    name: 'Raj Patel',
    role: 'Founder & CEO',
    company: 'FinSecure Tech',
    companyIndustry: 'Fintech',
    companySize: 'startup',
    image: '/images/testimonials/raj-patel.jpg',
    content:
      'As a startup, security was our top concern. Aditya built our entire application with security-first principles. We now have zero critical vulnerabilities and investor confidence has skyrocketed. His development security expertise is exceptional.',
    rating: 5,
    verified: true,
    securityDomain: ['secure-development', 'web-application-security', 'data-protection'],
    projectType: 'development',
    projectDuration: '5 months',
    projectImpact: 'Zero critical vulnerabilities, 99.9% security test pass rate',
    securityMetrics: {
      vulnerabilitiesFound: 0,
      securityScoreImprovement: 90,
    },
    beforeAfter: {
      before: 'Basic security measures, limited developer security knowledge',
      after: 'Security-first development culture with comprehensive testing',
    },
    tags: ['Secure Development', 'Fintech', 'Zero Vulnerabilities'],
    date: '2024-09-30',
    featured: false,
  },
  {
    id: 'cio-education-institution-incident-response',
    name: 'Emma Thompson',
    role: 'CIO',
    company: 'National Education Network',
    companyIndustry: 'Education',
    companySize: 'enterprise',
    image: '/images/testimonials/emma-thompson.jpg',
    content:
      'When we experienced a ransomware attack, Aditya was our calm in the storm. His incident response team contained the threat within hours and recovered our systems with minimal data loss. His crisis management skills are invaluable.',
    rating: 5,
    verified: true,
    securityDomain: ['incident-response', 'data-protection', 'network-security'],
    projectType: 'incident-response',
    projectDuration: 'Emergency Response',
    projectImpact: 'Threat contained in 2 hours, 95% data recovery',
    securityMetrics: {
      incidentResponseTime: '2 hours',
    },
    beforeAfter: {
      before: 'No formal incident response plan, vulnerable to ransomware',
      after: 'Comprehensive incident response plan with regular drills',
    },
    tags: ['Incident Response', 'Ransomware', 'Disaster Recovery'],
    date: '2024-09-15',
    featured: false,
  },
  {
    id: 'vp-engineering-saas-compliance-consulting',
    name: 'David Kim',
    role: 'VP of Engineering',
    company: 'CloudFlow SaaS',
    companyIndustry: 'Technology',
    companySize: 'smb',
    image: '/images/testimonials/david-kim.jpg',
    content:
      'Aditya provided strategic security guidance that transformed our approach. His consulting helped us achieve SOC 2 compliance and build customer trust. His ability to explain complex security concepts is remarkable.',
    rating: 4,
    verified: true,
    securityDomain: ['compliance', 'data-protection', 'network-security'],
    projectType: 'consulting',
    projectDuration: '6 months',
    projectImpact: 'SOC 2 compliance achieved, customer trust improved',
    securityMetrics: {
      securityScoreImprovement: 60,
      complianceAchieved: ['SOC 2 Type I'],
    },
    beforeAfter: {
      before: 'Ad-hoc security practices, no formal compliance framework',
      after: 'SOC 2 compliant security program with documented processes',
    },
    tags: ['Security Consulting', 'SOC 2', 'Risk Management'],
    date: '2024-08-20',
    featured: false,
  },
  {
    id: 'security-manager-retail-employee-training',
    name: 'Aisha Rahman',
    role: 'Security Manager',
    company: 'RetailPlus Group',
    companyIndustry: 'Retail',
    companySize: 'mid-market',
    image: '/images/testimonials/aisha-rahman.jpg',
    content:
      'The security awareness training program designed by Aditya has been a game-changer. Our employees are now our first line of defense. Phishing simulation results show a 75% improvement in threat detection.',
    rating: 4,
    verified: true,
    securityDomain: ['data-protection', 'network-security', 'compliance'],
    projectType: 'training',
    projectDuration: 'Ongoing',
    projectImpact: '75% improvement in employee threat detection',
    securityMetrics: {
      securityScoreImprovement: 50,
    },
    beforeAfter: {
      before: 'Low security awareness, frequent phishing success',
      after: 'High security awareness, proactive threat reporting',
    },
    tags: ['Security Training', 'Phishing Prevention', 'Employee Awareness'],
    date: '2024-08-05',
    featured: false,
  },
  {
    id: 'founder-healthtech-ai-security',
    name: 'Dr. Priya Singh',
    role: 'Founder & CTO',
    company: 'MediAI Solutions',
    companyIndustry: 'Healthcare Technology',
    companySize: 'startup',
    image: '/images/testimonials/priya-singh.jpg',
    content:
      'Aditya helped us secure our AI-powered medical platform. His expertise in AI/ML security and prompt engineering ensured our patient data is protected while maintaining model performance.',
    rating: 5,
    verified: true,
    securityDomain: ['data-protection', 'cloud-security', 'secure-development'],
    projectType: 'development',
    projectDuration: '4 months',
    projectImpact: 'AI security framework implemented, zero data breaches',
    securityMetrics: {
      securityScoreImprovement: 85,
    },
    beforeAfter: {
      before: 'Basic AI security, concerns about data privacy',
      after: 'Comprehensive AI security framework with privacy controls',
    },
    tags: ['AI Security', 'ML Security', 'Healthcare', 'Prompt Engineering'],
    date: '2024-07-22',
    featured: false,
  },
];

// Testimonial categories for filtering
export const TESTIMONIAL_CATEGORIES: TestimonialCategory[] = [
  {
    id: 'security-assessment',
    name: 'Security Assessment',
    description: 'Comprehensive security evaluations and vulnerability assessments',
    icon: 'shield-check',
    color: 'neon-green',
    securityDomains: ['web-application-security', 'network-security', 'compliance'],
  },
  {
    id: 'secure-development',
    name: 'Secure Development',
    description: 'Security-first development and application security',
    icon: 'code',
    color: 'electric-cyan',
    securityDomains: ['secure-development', 'web-application-security', 'data-protection'],
  },
  {
    id: 'incident-response',
    name: 'Incident Response',
    description: 'Emergency response and threat containment services',
    icon: 'alert-circle',
    color: 'red',
    securityDomains: ['incident-response', 'data-protection', 'network-security'],
  },
  {
    id: 'security-consulting',
    name: 'Security Consulting',
    description: 'Strategic security guidance and compliance consulting',
    icon: 'settings',
    color: 'purple',
    securityDomains: ['compliance', 'data-protection', 'network-security'],
  },
  {
    id: 'cloud-security',
    name: 'Cloud Security',
    description: 'Cloud migration and cloud security implementation',
    icon: 'cloud',
    color: 'blue',
    securityDomains: ['cloud-security', 'data-protection', 'identity-access-management'],
  },
  {
    id: 'security-training',
    name: 'Security Training',
    description: 'Employee training and security awareness programs',
    icon: 'users',
    color: 'orange',
    securityDomains: ['data-protection', 'network-security', 'compliance'],
  },
];

// Testimonials configuration
export const TESTIMONIALS_CONFIG: TestimonialsConfig = {
  title: 'Client Testimonials & Security Success Stories',
  description:
    'Real feedback from satisfied clients who have benefited from our cybersecurity expertise. These testimonials showcase the tangible security improvements and business value we deliver.',
  itemsPerPage: 6,
  showFeaturedOnly: false,
  showClientLogos: true,
  showSecurityMetrics: true,
  showFilterBar: true,
  showSearch: true,
  showCarousel: true,
  enableLazyLoading: true,
  showRatings: true,
  showVerificationBadges: true,
  animationSpeed: 0.6,
  responsiveBreakpoints: {
    mobile: 640,
    tablet: 1024,
    desktop: 1280,
  },
};

// Security success stories (detailed case studies)
export const SECURITY_SUCCESS_STORIES: SecuritySuccessStory[] = [
  {
    id: 'enterprise-zero-trust-transformation',
    title: 'Enterprise Zero Trust Transformation',
    subtitle: 'Complete security overhaul for Fortune 500 manufacturing company',
    client: {
      name: 'Sarah Johnson',
      role: 'CEO',
      company: 'TechManufacture Inc.',
      industry: 'Manufacturing',
      size: 'Enterprise (10,000+ employees)',
      image: '/images/testimonials/sarah-johnson.jpg',
    },
    timeline: {
      startDate: '2024-01-15',
      endDate: '2024-05-15',
      duration: '4 months',
    },
    securityChallenge: {
      description:
        'Legacy systems with outdated security controls, no centralized monitoring, and increasing cyber threats targeting manufacturing sector.',
      impact:
        'High risk of intellectual property theft, production downtime, and regulatory non-compliance.',
      urgency: 'high',
    },
    solution: {
      approach:
        'Implemented Zero Trust architecture with micro-segmentation, deployed enterprise SIEM, and conducted comprehensive security awareness training.',
      technologies: [
        'Zero Trust Network Access (ZTNA)',
        'SIEM Platform',
        'Endpoint Detection and Response (EDR)',
        'Security Awareness Training Platform',
      ],
      securityDomains: ['data-protection', 'network-security', 'incident-response', 'compliance'],
      team: ['Aditya Kumar Tiwari (Lead Security Architect)', '3 Security Engineers', '1 Training Specialist'],
    },
    results: {
      securityMetrics: {
        vulnerabilitiesFixed: 45,
        securityScoreImprovement: 65,
        incidentResponseTime: '2 hours',
        complianceStatus: ['SOC 2 Type II'],
      },
      businessImpact: {
        costSavings: '$2M annually',
        productivityGain: '15% improvement in security team efficiency',
        riskReduction: '75% reduction in security incidents',
        customerTrust: 'Significant improvement in client confidence',
      },
      beforeAfter: {
        securityPosture:
          'Legacy systems, reactive security, no centralized monitoring',
        businessConfidence:
          'Proactive security, 24/7 monitoring, regulatory compliance',
      },
    },
    testimonial: {
      quote:
        'Aditya transformed our security posture completely. His expertise in Zero Trust architecture and incident response saved our company from potential catastrophic breaches.',
      rating: 5,
      date: '2024-11-15',
    },
    media: {
      images: [
        '/images/stories/zero-trust-before.jpg',
        '/images/stories/zero-trust-after.jpg',
      ],
      caseStudyUrl: '/content/projects/enterprise-security-overhaul.md',
    },
    tags: ['Zero Trust', 'Manufacturing', 'Enterprise', 'SOC 2'],
  },
  {
    id: 'healthcare-cloud-migration-security',
    title: 'Healthcare Cloud Migration Security',
    subtitle: 'Secure AWS migration for HIPAA-compliant healthcare provider',
    client: {
      name: 'Dr. Michael Chen',
      role: 'CTO',
      company: 'HealthCare Plus',
      industry: 'Healthcare',
      size: 'Mid-market (500 employees)',
      image: '/images/testimonials/michael-chen.jpg',
    },
    timeline: {
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      duration: '3 months',
    },
    securityChallenge: {
      description:
        'Need to migrate patient data to AWS while maintaining HIPAA compliance and ensuring data protection.',
      impact:
        'Risk of patient data breaches, regulatory fines, and loss of patient trust.',
      urgency: 'medium',
    },
    solution: {
      approach:
        'Designed HIPAA-compliant AWS architecture, implemented data encryption, and established continuous compliance monitoring.',
      technologies: [
        'AWS Security Hub',
        'HIPAA-compliant Data Encryption',
        'Identity and Access Management (IAM)',
        'Cloud Monitoring and Logging',
      ],
      securityDomains: ['cloud-security', 'compliance', 'data-protection', 'identity-access-management'],
      team: ['Aditya Kumar Tiwari (Cloud Security Architect)', '2 Cloud Engineers'],
    },
    results: {
      securityMetrics: {
        vulnerabilitiesFixed: 0,
        securityScoreImprovement: 80,
        incidentResponseTime: 'Real-time monitoring',
        complianceStatus: ['HIPAA'],
      },
      businessImpact: {
        costSavings: '$150K annually',
        productivityGain: '30% improvement in IT efficiency',
        riskReduction: 'Zero data breaches during migration',
        customerTrust: 'Enhanced patient confidence in data security',
      },
      beforeAfter: {
        securityPosture: 'On-premise systems with limited cloud expertise',
        businessConfidence: 'HIPAA-compliant cloud environment with robust security',
      },
    },
    testimonial: {
      quote:
        'Working with Aditya on our cloud migration was exceptional. His deep understanding of HIPAA compliance and AWS security ensured our patient data remained protected.',
      rating: 5,
      date: '2024-10-28',
    },
    media: {
      images: [
        '/images/stories/healthcare-before.jpg',
        '/images/stories/healthcare-after.jpg',
      ],
      caseStudyUrl: '/content/projects/cloud-migration-security.md',
    },
    tags: ['HIPAA', 'AWS', 'Healthcare', 'Cloud Migration'],
  },
];

// Client information for trust building
export const CLIENT_INFO: ClientInfo[] = [
  {
    id: 'techmanufacture-inc',
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechManufacture Inc.',
    industry: 'Manufacturing',
    size: 'Enterprise',
    image: '/images/testimonials/sarah-johnson.jpg',
    verified: true,
    partnershipDuration: '2 years',
    securityProjects: 3,
    satisfactionScore: 9.5,
    quote:
      'Aditya has been our trusted security partner for 2 years. His proactive approach has prevented multiple potential security incidents.',
    logo: '/images/clients/techmanufacture-logo.png',
    website: 'https://techmanufacture.com',
    caseStudies: ['enterprise-security-overhaul'],
  },
  {
    id: 'healthcare-plus',
    name: 'Dr. Michael Chen',
    role: 'CTO',
    company: 'HealthCare Plus',
    industry: 'Healthcare',
    size: 'Mid-market',
    image: '/images/testimonials/michael-chen.jpg',
    verified: true,
    partnershipDuration: '1 year',
    securityProjects: 2,
    satisfactionScore: 9.8,
    quote:
      'The security transformation we achieved with Aditya has been invaluable. Our patients can trust that their data is secure.',
    logo: '/images/clients/healthcare-plus-logo.png',
    website: 'https://healthcareplus.com',
    caseStudies: ['cloud-migration-security'],
  },
  {
    id: 'global-bank-corp',
    name: 'Lisa Rodriguez',
    role: 'Security Director',
    company: 'Global Bank Corp.',
    industry: 'Financial Services',
    size: 'Enterprise',
    image: '/images/testimonials/lisa-rodriguez.jpg',
    verified: true,
    partnershipDuration: '6 months',
    securityProjects: 1,
    satisfactionScore: 9.2,
    quote:
      "Aditya's penetration testing expertise revealed critical vulnerabilities we missed. His thorough approach is exactly what we needed.",
    logo: '/images/clients/global-bank-logo.png',
    website: 'https://globalbank.com',
    caseStudies: ['financial-institution-penetration-test'],
  },
];

// Security badges for trust building
export const SECURITY_BADGES: SecurityBadge[] = [
  {
    id: 'certified-secure',
    name: 'Certified Secure',
    description: 'Projects that have achieved security certification or compliance',
    icon: 'shield-check',
    color: 'neon-green',
    criteria: [
      'Completed comprehensive security assessment',
      'Achieved relevant compliance certification',
      'Zero critical vulnerabilities in final assessment',
    ],
    clients: ['techmanufacture-inc', 'healthcare-plus'],
  },
  {
    id: 'trusted-partner',
    name: 'Trusted Partner',
    description: 'Long-term clients with ongoing security partnership',
    icon: 'users',
    color: 'electric-cyan',
    criteria: [
      'Ongoing security partnership (6+ months)',
      'Multiple security projects completed',
      'Client satisfaction score 9.0+',
    ],
    clients: ['techmanufacture-inc'],
  },
  {
    id: 'zero-vulnerabilities',
    name: 'Zero Vulnerabilities',
    description: 'Projects achieving zero critical security vulnerabilities',
    icon: 'check-circle',
    color: 'neon-green',
    criteria: [
      'Zero critical vulnerabilities in final security assessment',
      'Comprehensive security testing completed',
      'Security-first development practices implemented',
    ],
    clients: ['healthcare-plus', 'finsecure-tech'],
  },
  {
    id: 'rapid-response',
    name: 'Rapid Response',
    description: 'Exceptional incident response and threat containment',
    icon: 'alert-circle',
    color: 'red',
    criteria: [
      'Incident response time under 4 hours',
      'Successful threat containment and recovery',
      'Minimal business impact from security incidents',
    ],
    clients: ['national-education-network'],
  },
];

// Trust indicators for social proof
export const TRUST_INDICATORS: TrustIndicator[] = [
  {
    id: 'clients-served',
    type: 'client',
    title: 'Clients Served',
    value: '50+',
    description: 'Startups and SMBs protected across various industries',
    icon: 'users',
    color: 'electric-cyan',
    verified: true,
  },
  {
    id: 'security-assessments',
    type: 'project',
    title: 'Security Assessments',
    value: '100+',
    description: 'Comprehensive security evaluations completed',
    icon: 'shield-check',
    color: 'neon-green',
    verified: true,
  },
  {
    id: 'success-rate',
    type: 'metric',
    title: 'Success Rate',
    value: '99.9%',
    description: 'Security project success and client satisfaction rate',
    icon: 'check-circle',
    color: 'neon-green',
    verified: true,
  },
  {
    id: 'threats-prevented',
    type: 'metric',
    title: 'Threats Prevented',
    value: '1,000+',
    description: 'Potential security threats identified and mitigated',
    icon: 'alert-triangle',
    color: 'red',
    verified: true,
  },
  {
    id: 'compliance-achievements',
    type: 'certification',
    title: 'Compliance Achievements',
    value: '15+',
    description: 'Compliance certifications achieved for clients',
    icon: 'file-text',
    color: 'blue',
    verified: true,
  },
];