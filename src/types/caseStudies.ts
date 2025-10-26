// Case Studies and Security Projects Data Types

// Core case study interface
export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: CaseStudyCategory[];
  client: ClientInfo;
  timeline: TimelineInfo;
  securityDomain: SecurityDomain[];
  metrics: CaseStudyMetric[];
  challenges: string[];
  solutions: string[];
  results: CaseStudyResult[];
  testimonial?: TestimonialInfo;
  technologies: string[];
  caseStudyUrl?: string;
  isFeatured?: boolean;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  compliance?: string[];
  industry: string;
  projectSize: ProjectSize;
}

// Client information
export interface ClientInfo {
  name: string;
  industry: string;
  size: 'startup' | 'smb' | 'mid-market' | 'enterprise';
  location?: string;
  logo?: string;
  isAnonymized: boolean;
}

// Timeline information
export interface TimelineInfo {
  startDate: string;
  endDate: string;
  duration: string;
  phase?: string;
}

// Security domain classification
export type SecurityDomain =
  | 'web-application-security'
  | 'network-security'
  | 'cloud-security'
  | 'incident-response'
  | 'secure-development'
  | 'compliance'
  | 'iot-security'
  | 'mobile-security'
  | 'data-protection'
  | 'identity-access-management';

// Case study category for filtering
export type CaseStudyCategory =
  | 'web-security'
  | 'network-security'
  | 'cloud-security'
  | 'incident-response'
  | 'secure-development'
  | 'compliance'
  | 'enterprise'
  | 'healthcare'
  | 'financial'
  | 'technology'
  | 'government'
  | 'education'
  | 'retail'
  | 'startup'
  | 'smb'
  | 'mid-market';

// Project size classification
export type ProjectSize =
  | 'small'
  | 'medium'
  | 'large'
  | 'enterprise'
  | 'startup'
  | 'smb'
  | 'mid-market';

// Metric types for measurable outcomes
export interface CaseStudyMetric {
  id: string;
  label: string;
  before: string | number;
  after: string | number;
  improvement: string;
  type: 'percentage' | 'count' | 'score' | 'time' | 'cost';
  isPositive: boolean;
  icon?: string;
}

// Result types with quantified outcomes
export interface CaseStudyResult {
  id: string;
  title: string;
  description: string;
  value: string;
  unit: string;
  impact: 'high' | 'medium' | 'low';
  beforeValue?: string | number;
  afterValue?: string | number;
  icon?: string;
}

// Testimonial information
export interface TestimonialInfo {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  isFeatured: boolean;
  image?: string;
}

// Filter options
export interface FilterOption {
  id: string;
  label: string;
  count: number;
  isActive: boolean;
}

// Search and filter state
export interface CaseStudyFilters {
  categories: string[];
  securityDomains: string[];
  industries: string[];
  projectSizes: string[];
  difficultyLevels: string[];
  compliance: string[];
  searchQuery: string;
  sortBy: 'newest' | 'oldest' | 'impact' | 'client-size';
}

// Case study section configuration
export interface CaseStudiesConfig {
  title: string;
  subtitle: string;
  description: string;
  showFilters: boolean;
  showSearch: boolean;
  showPagination: boolean;
  itemsPerPage: number;
  animationSpeed: number;
  enableLazyLoading: boolean;
  showClientLogos: boolean;
  showMetrics: boolean;
}

// API response structure
export interface CaseStudiesResponse {
  caseStudies: CaseStudy[];
  total: number;
  filters: {
    categories: FilterOption[];
    securityDomains: FilterOption[];
    industries: FilterOption[];
    projectSizes: FilterOption[];
  };
  pagination: {
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Case study schema for SEO
export interface CaseStudySchema {
  '@context': 'https://schema.org';
  '@type': 'CaseStudy';
  name: string;
  description: string;
  image?: string;
  url: string;
  datePublished: string;
  author: {
    '@type': 'Person';
    name: string;
    url: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
  mainEntity: {
    '@type': 'Project';
    name: string;
    description: string;
    category: string[];
    outcome: string[];
  };
}
