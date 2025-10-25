// Core data interfaces for the cybersecurity portfolio

// Navigation items
export interface NavigationItem {
  id: string;
  title: string;
  href: string;
  icon?: string;
  children?: NavigationItem[];
}

// Social media links
export interface SocialLink {
  id: string;
  title: string;
  url: string;
  icon: string;
  username: string;
}

// Professional experience
export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

// Education
export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  description: string;
  honors?: string[];
}

// Base skill category types
export type BaseSkillCategory = 'technical' | 'security' | 'management' | 'soft' | 'cybersecurity' | 'development';

// Detailed skill category types
export type DetailedSkillCategory =
  | BaseSkillCategory
  | 'vulnerability-assessment'
  | 'penetration-testing'
  | 'network-security'
  | 'forensics'
  | 'cloud-security'
  | 'siem'
  | 'languages'
  | 'frameworks'
  | 'security-tools'
  | 'devops'
  | 'cloud-platforms'
  | 'databases';

// Skills and expertise
export interface Skill {
  id: string;
  name: string;
  category: BaseSkillCategory;
  level: number; // 1-10
  description: string;
}

// Enhanced skill with detailed proficiency levels
export interface DetailedSkill {
  id: string;
  name: string;
  category: DetailedSkillCategory;
  level: number; // 1-10
  description: string;
  proficiency: number; // 0-100 percentage
  yearsOfExperience?: number;
  icon?: string;
  certificationLinks?: string[];
  projectExamples?: string[];
  isExpert?: boolean;
  isAdvanced?: boolean;
  isIntermediate?: boolean;
  isBeginner?: boolean;
  isFamiliar?: boolean;
}

// Skill category with organized skills
export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon?: string;
  color: string;
  skills: DetailedSkill[];
  skillCount: number;
  averageProficiency: number;
}

// Skills matrix configuration
export interface SkillsMatrixConfig {
  title: string;
  description: string;
  categories: SkillCategory[];
  showProficiencyLevels: boolean;
  showYearsOfExperience: boolean;
  showCertifications: boolean;
  enableFiltering: boolean;
  enableSearch: boolean;
  animationSpeed: number;
  responsiveBreakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

// Proficiency level definitions
export interface ProficiencyLevel {
  level: 'expert' | 'advanced' | 'intermediate' | 'beginner' | 'familiar';
  minPercentage: number;
  maxPercentage: number;
  color: string;
  description: string;
  icon?: string;
}

// Services offered
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  duration?: string;
  price?: string;
}

// Project/portfolio items
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  technologies: string[];
  category: string[];
  liveUrl?: string;
  githubUrl?: string;
  caseStudy?: string;
  challenges: string[];
  solutions: string[];
  results: string[];
}

// Testimonials
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
}

// Blog categories
export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon?: string;
  postCount: number;
}

// Blog posts
export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
  readingTime: string;
  tags: string[];
  category: string;
  featuredImage: string;
  featured: boolean;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  authorInfo: {
    name: string;
    bio: string;
    avatar: string;
    credentials: string[];
    socialLinks: SocialLink[];
  };
  readingProgress?: number;
  socialShares?: {
    twitter: number;
    linkedin: number;
    facebook: number;
  };
  relatedPosts?: string[];
}

// Blog filters and search
export interface BlogFilters {
  category?: string;
  search?: string;
  tags?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  sortBy?: 'newest' | 'oldest' | 'popular' | 'featured';
}

// Blog pagination
export interface BlogPagination {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  postsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Newsletter subscription
export interface NewsletterSubscription {
  email: string;
  name?: string;
  preferences: {
    categories: string[];
    frequency: 'weekly' | 'monthly' | 'daily';
    contentTypes: string[];
  };
}

// Contact form data
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget?: string;
  timeline?: string;
}

// Site configuration
export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  email: string;
  phone?: string;
  address?: string;
  socials: SocialLink[];
  navigation: NavigationItem[];
  footerNavigation: NavigationItem[];
}

// SEO metadata
export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  url?: string;
  type?: string;
}

// Schema markup
export interface SchemaMarkup {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  description: string;
  image?: string | string[];
  sameAs?: string[];
  mainEntityOfPage?: {
    '@type': string;
    '@id': string;
  };
}

// UI component props
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'security' | 'neon';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: 'lock' | 'eye' | 'download' | 'shield' | string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface CardProps {
  title?: string;
  description?: string;
  image?: string;
  href?: string;
  tags?: string[];
  className?: string;
  children?: React.ReactNode;
}

// Animation variants
export interface AnimationVariants {
  initial: object;
  animate: object;
  transition?: object;
  whileHover?: object;
  whileTap?: object;
}

// Career timeline event categories
export type TimelineCategory = 'education' | 'experience' | 'certification' | 'achievement';

// Career timeline event status
export type TimelineStatus = 'completed' | 'in-progress' | 'upcoming';

// Career timeline event interface
export interface TimelineEvent {
  id: string;
  title: string;
  subtitle?: string;
  category: TimelineCategory;
  status: TimelineStatus;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string;
  achievements?: string[];
  technologies?: string[];
  metrics?: {
    label: string;
    value: string;
    icon?: string;
  }[];
  icon?: string;
  color?: string;
  priority?: number;
  relatedProjects?: string[];
  verificationUrl?: string;
}

// Resume summary interface
export interface ResumeSummary {
  overview: string;
  keyAchievements: string[];
  specializations: string[];
  philosophy: string;
  goals: string[];
  contactEmail: string;
  downloadUrl: string;
  lastUpdated: string;
}

// Career timeline configuration
export interface CareerTimelineConfig {
  title: string;
  subtitle: string;
  enableFiltering: boolean;
  enableSearch: boolean;
  showMetrics: boolean;
  animationSpeed: number;
  responsiveBreakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}