// Secure Contact Form Data Types and Interfaces

// Core contact form data with security metadata
export interface SecureContactFormData {
  // Basic contact information
  name: string;
  email: string;
  phone?: string;
  company?: string;
  
  // Security consultation details
  consultationType: ConsultationType;
  projectTimeline: ProjectTimeline;
  budgetRange: BudgetRange;
  securityConcerns: string;
  
  // Security verification
  privacyPolicyAccepted: boolean;
  securityChallengeCompleted: boolean;
  captchaToken?: string;
  
  // Metadata
  submissionId: string;
  timestamp: string;
  userAgent: string;
  ipAddress?: string;
  encryptionStatus: 'encrypted' | 'pending' | 'failed';
  securityLevel: 'standard' | 'high' | 'critical';
}

// Consultation type options
export type ConsultationType = 
  | 'security-assessment'
  | 'development-security'
  | 'incident-response'
  | 'general-inquiry'
  | 'compliance-audit'
  | 'penetration-testing'
  | 'security-training';

// Project timeline options
export type ProjectTimeline = 
  | 'immediate'
  | '1-2-weeks'
  | '1-3-months'
  | '3-plus-months'
  | 'long-term';

// Budget range options
export type BudgetRange = 
  | 'under-5k'
  | '5k-15k'
  | '15k-50k'
  | '50k-plus';

// Form validation state
export interface FormValidationState {
  isValid: boolean;
  errors: Record<string, string>;
  warnings: Record<string, string>;
  securityScore: number; // 0-100
  encryptionReady: boolean;
}

// Security challenge configuration
export interface SecurityChallengeConfig {
  type: 'captcha' | 'honey-pot' | 'time-based' | 'behavioral';
  provider?: 'recaptcha' | 'hcaptcha' | 'cloudflare';
  siteKey?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeout: number; // seconds
}

// Encryption configuration
export interface EncryptionConfig {
  algorithm: 'AES-256-GCM' | 'RSA-2048' | 'ECDH-256';
  keySize: number;
  mode: 'client-side' | 'hybrid' | 'server-side';
  certificatePinned: boolean;
  fallbackEnabled: boolean;
}

// Submission response
export interface SecureSubmissionResponse {
  success: boolean;
  submissionId: string;
  encrypted: boolean;
  securityToken: string;
  nextAction: 'confirmation' | 'verification' | 'pending-review';
  estimatedResponseTime: string;
  securityNotice: string;
  errors?: string[];
}

// Auto-save state
export interface AutoSaveState {
  enabled: boolean;
  lastSaved: string;
  draftAvailable: boolean;
  conflicts: boolean;
  version: number;
}

// Security indicators
export interface SecurityIndicators {
  sslSecured: boolean;
  endToEndEncryption: boolean;
  dataMinimized: boolean;
  gdprCompliant: boolean;
  iso27001Compliant: boolean;
  lastSecurityAudit: string;
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
}

// Form configuration
export interface SecureContactFormConfig {
  title: string;
  subtitle: string;
  securityBadges: SecurityBadge[];
  consultationTypes: ConsultationTypeOption[];
  budgetRanges: BudgetRangeOption[];
  projectTimelines: ProjectTimelineOption[];
  validationRules: ValidationRules;
  encryption: EncryptionConfig;
  securityChallenge: SecurityChallengeConfig;
  autoSave: boolean;
  showSecurityIndicators: boolean;
}

// Security badge configuration
export interface SecurityBadge {
  type: 'ssl' | 'encryption' | 'gdpr' | 'iso27001' | 'zero-retention';
  label: string;
  description: string;
  icon: string;
  verified: boolean;
  expiresAt?: string;
}

// Consultation type option
export interface ConsultationTypeOption {
  value: ConsultationType;
  label: string;
  description: string;
  icon: string;
  recommendedBudget: BudgetRange[];
  typicalTimeline: ProjectTimeline;
}

// Budget range option
export interface BudgetRangeOption {
  value: BudgetRange;
  label: string;
  description: string;
  min: number;
  max: number;
}

// Project timeline option
export interface ProjectTimelineOption {
  value: ProjectTimeline;
  label: string;
  description: string;
  minDays: number;
  maxDays: number;
}

// Validation rules
export interface ValidationRules {
  name: {
    required: boolean;
    minLength: number;
    maxLength: number;
    pattern: string;
  };
  email: {
    required: boolean;
    pattern: string;
  };
  phone: {
    required: boolean;
    pattern: string;
  };
  company: {
    required: boolean;
    minLength: number;
    maxLength: number;
  };
  securityConcerns: {
    required: boolean;
    minLength: number;
    maxLength: number;
  };
}

// Security event log
export interface SecurityEvent {
  id: string;
  timestamp: string;
  type: 'form-submission' | 'security-challenge' | 'encryption-attempt' | 'validation-error';
  severity: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  details: Record<string, string | number | boolean>;
  ipAddress?: string;
  userAgent?: string;
}

// Compliance information
export interface ComplianceInfo {
  gdpr: {
    compliant: boolean;
    dataProcessingAddendum: boolean;
    rightToErasure: boolean;
    dataPortability: boolean;
  };
  iso27001: {
    certified: boolean;
    scope: string;
    certificationBody: string;
    expiresAt: string;
  };
  industryStandards: {
    pciDss?: boolean;
    hipaa?: boolean;
    soc2?: boolean;
    fedramp?: boolean;
  };
}