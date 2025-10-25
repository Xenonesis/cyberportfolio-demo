// Enhanced Testimonials and Client Data Types for Cybersecurity Portfolio

import type { SecurityDomain } from './caseStudies';

// Enhanced testimonial with security-specific data
export interface EnhancedTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  companyIndustry?: string;
  companySize?: 'startup' | 'smb' | 'mid-market' | 'enterprise';
  image: string;
  content: string;
  rating: number; // 1-5 scale
  verified?: boolean; // Client verification status
  securityDomain?: SecurityDomain[]; // Security areas covered
  projectType?: 'assessment' | 'development' | 'incident-response' | 'consulting' | 'training';
  projectDuration?: string; // e.g., "3 months", "6 weeks"
  projectImpact?: string; // Quantified results
  securityMetrics?: {
    vulnerabilitiesFound?: number;
    securityScoreImprovement?: number; // Percentage
    incidentResponseTime?: string; // e.g., "2 hours"
    complianceAchieved?: string[]; // e.g., ["SOC 2", "ISO 27001"]
    costSavings?: string; // e.g., "$50,000 annually"
  };
  beforeAfter?: {
    before: string; // Security posture before
    after: string; // Security posture after
  };
  tags?: string[]; // e.g., ["Zero Trust", "Cloud Security", "Compliance"]
  date?: string; // Testimonial date
  featured?: boolean; // Featured testimonial status
  videoUrl?: string; // Optional video testimonial
  caseStudyId?: string; // Link to related case study
}

// Testimonial category for filtering
export interface TestimonialCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  securityDomains: SecurityDomain[];
}

// Testimonial filter options
export interface TestimonialFilters {
  categories: string[];
  securityDomains: SecurityDomain[];
  industries: string[];
  companySizes: string[];
  projectTypes: string[];
  ratings: number[];
  searchQuery: string;
  sortBy: 'newest' | 'oldest' | 'rating' | 'impact' | 'company-size';
}

// Testimonial configuration
export interface TestimonialsConfig {
  title: string;
  description: string;
  itemsPerPage: number;
  showFeaturedOnly: boolean;
  showClientLogos: boolean;
  showSecurityMetrics: boolean;
  showFilterBar: boolean;
  showSearch: boolean;
  showCarousel: boolean;
  showPagination: boolean;
  enableLazyLoading: boolean;
  showRatings: boolean;
  showVerificationBadges: boolean;
  animationSpeed: number;
  responsiveBreakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

// Security success story (detailed testimonial)
export interface SecuritySuccessStory {
  id: string;
  title: string;
  subtitle: string;
  client: {
    name: string;
    role: string;
    company: string;
    industry: string;
    size: string;
    image: string;
  };
  timeline: {
    startDate: string;
    endDate: string;
    duration: string;
  };
  securityChallenge: {
    description: string;
    impact: string;
    urgency: 'low' | 'medium' | 'high' | 'critical';
  };
  solution: {
    approach: string;
    technologies: string[];
    securityDomains: SecurityDomain[];
    team: string[];
  };
  results: {
    securityMetrics: {
      vulnerabilitiesFixed: number;
      securityScoreImprovement: number;
      incidentResponseTime: string;
      complianceStatus: string[];
    };
    businessImpact: {
      costSavings: string;
      productivityGain: string;
      riskReduction: string;
      customerTrust: string;
    };
    beforeAfter: {
      securityPosture: string;
      businessConfidence: string;
    };
  };
  testimonial: {
    quote: string;
    rating: number;
    date: string;
  };
  media: {
    images: string[];
    videoUrl?: string;
    caseStudyUrl?: string;
  };
  tags: string[];
}

// Client information for trust building
export interface ClientInfo {
  id: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  size: string;
  image: string;
  verified: boolean;
  partnershipDuration: string;
  securityProjects: number;
  satisfactionScore: number; // 1-10
  quote: string;
  logo?: string;
  website?: string;
  caseStudies: string[]; // Related case study IDs
}

// Security badge types
export interface SecurityBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  criteria: string[];
  clients: string[]; // Client IDs that have this badge
}

// Trust indicator
export interface TrustIndicator {
  id: string;
  type: 'client' | 'project' | 'metric' | 'certification';
  title: string;
  value: string;
  description: string;
  icon: string;
  color: string;
  verified: boolean;
}

// Testimonial analytics data
export interface TestimonialAnalytics {
  testimonialId: string;
  views: number;
  engagementRate: number;
  conversionRate: number;
  filterUsage: {
    category: string;
    count: number;
  }[];
  timeOnPage: number;
  ctaClicks: number;
}