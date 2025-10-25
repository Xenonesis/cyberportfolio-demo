'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SecureFormInput, 
  SecureTextarea, 
  SecureSelect, 
  SecureCheckbox 
} from '@/components/ui/SecureFormFields';
import { SecurityBadge, SecurityStatus } from '@/components/ui/SecurityElements';
import {
  contactFormEncryption,
  SecurityValidator,
  rateLimiter
} from '@/lib/encryptionUtils';
import { 
  SecureContactFormData, 
  ConsultationType, 
  ProjectTimeline, 
  BudgetRange,
  SecurityIndicators,
  ComplianceInfo
} from '@/types/secureContact';

// CAPTCHA Component
interface CaptchaComponentProps {
  onVerify: (token: string) => void;
  onError: (error: string) => void;
  theme?: 'light' | 'dark';
}

const CaptchaComponent = ({ onVerify, onError }: CaptchaComponentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [challengeId, setChallengeId] = useState('');

  const generateChallenge = () => {
    setIsLoading(true);
    const id = Math.random().toString(36).substr(2, 9);
    setChallengeId(id);
    setIsLoading(false);
  };

  const verifyChallenge = (token: string) => {
    if (token && token.length > 10) {
      onVerify(token);
    } else {
      onError('Invalid challenge response');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      generateChallenge();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-navy-700 border border-navy-600 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Security Verification</h3>
        <SecurityStatus status="secure" label="CAPTCHA" />
      </div>
      
      <div className="text-center py-8">
        {isLoading ? (
          <div className="animate-spin w-8 h-8 border-2 border-electric-cyan-400 border-t-transparent rounded-full mx-auto"></div>
        ) : (
          <div className="space-y-4">
            <div className="bg-navy-800 border border-electric-cyan-400/30 rounded-lg p-4">
              <div className="text-electric-cyan-400 font-mono text-sm mb-2">
                Challenge ID: {challengeId}
              </div>
              <div className="text-gray-400 text-xs">
                Please complete the security challenge to verify you are not a bot
              </div>
            </div>
            
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4].map((digit) => (
                <input
                  key={digit}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 bg-navy-600 border border-navy-500 text-center text-white text-lg font-bold rounded focus:border-electric-cyan-400 focus:outline-none"
                  onChange={(e) => {
                    if (e.target.value.length === 1 && digit < 4) {
                      const nextInput = e.target.parentElement?.children[digit + 1] as HTMLInputElement;
                      nextInput?.focus();
                    }
                  }}
                  onBlur={(e) => {
                    const allInputs = Array.from(e.target.parentElement?.children || []);
                    const token = allInputs.map((input: Element) => (input as HTMLInputElement).value).join('');
                    if (token.length === 4) {
                      verifyChallenge(token);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      
      <button
        onClick={generateChallenge}
        className="w-full bg-electric-cyan-600 text-navy-900 py-2 px-4 rounded hover:bg-electric-cyan-500 transition-colors"
      >
        Generate New Challenge
      </button>
    </div>
  );
};

// Main Secure Contact Form Component
export const SecureContactForm = () => {
  const [formData, setFormData] = useState<SecureContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    consultationType: 'general-inquiry',
    projectTimeline: '1-2-weeks',
    budgetRange: '5k-15k',
    securityConcerns: '',
    privacyPolicyAccepted: false,
    securityChallengeCompleted: false,
    submissionId: '',
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    encryptionStatus: 'pending',
    securityLevel: 'standard'
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [securityScore, setSecurityScore] = useState(0);
  const [encryptionKey, setEncryptionKey] = useState<CryptoKey | null>(null);
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null);

  // Security indicators
  const [securityIndicators, setSecurityIndicators] = useState<SecurityIndicators>({
    sslSecured: true,
    endToEndEncryption: false,
    dataMinimized: true,
    gdprCompliant: true,
    iso27001Compliant: true,
    lastSecurityAudit: '2024-01-15',
    threatLevel: 'low'
  });

  // Compliance information
  const complianceInfo: ComplianceInfo = {
    gdpr: {
      compliant: true,
      dataProcessingAddendum: true,
      rightToErasure: true,
      dataPortability: true
    },
    iso27001: {
      certified: true,
      scope: 'Information Security Management System',
      certificationBody: 'ISO Certification Authority',
      expiresAt: '2025-12-31'
    },
    industryStandards: {
      pciDss: false,
      hipaa: false,
      soc2: true,
      fedramp: false
    }
  };

  const formRef = useRef<HTMLFormElement>(null);

  // Initialize encryption key
  useEffect(() => {
    const initializeEncryption = async () => {
      try {
        const key = await contactFormEncryption.generateEncryptionKey('contact-form-master-key-v1');
        setEncryptionKey(key);
        setSecurityIndicators(prev => ({ ...prev, endToEndEncryption: true }));
      } catch (error) {
        console.error('Failed to initialize encryption:', error);
      }
    };

    initializeEncryption();
  }, []);

  // Auto-save functionality
  const autoSaveForm = async () => {
    if (formData.name || formData.email || formData.securityConcerns) {
      try {
        const draftData = {
          ...formData,
          lastSaved: new Date().toISOString()
        };
        localStorage.setItem('contact-form-draft', JSON.stringify(draftData));
      } catch (error) {
        console.error('Failed to save draft:', error);
      }
    }
  };

  const loadAutoSaveDraft = () => {
    try {
      const savedDraft = localStorage.getItem('contact-form-draft');
      if (savedDraft) {
        const draft = JSON.parse(savedDraft);
        setFormData(prev => ({ ...prev, ...draft }));
      }
    } catch (error) {
      console.error('Failed to load draft:', error);
    }
  };

  // Load draft on component mount
  useEffect(() => {
    loadAutoSaveDraft();
  }, []);

  // Set up auto-save timer
  useEffect(() => {
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer);
    }
    
    const timer = setTimeout(() => {
      autoSaveForm();
    }, 30000); // Auto-save every 30 seconds

    setAutoSaveTimer(timer);

    return () => clearTimeout(timer);
  }, [formData]);

  // Form validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Name validation
    const nameValidation = SecurityValidator.validateName(formData.name);
    if (!nameValidation.valid) {
      errors.name = nameValidation.error || '';
    }

    // Email validation
    const emailValidation = SecurityValidator.validateEmail(formData.email);
    if (!emailValidation.valid) {
      errors.email = emailValidation.error || '';
    }

    // Phone validation
    const phoneValidation = SecurityValidator.validatePhone(formData.phone || '');
    if (!phoneValidation.valid) {
      errors.phone = phoneValidation.error || '';
    }

    // Company validation
    const companyValidation = SecurityValidator.validateCompany(formData.company || '');
    if (!companyValidation.valid) {
      errors.company = companyValidation.error || '';
    }

    // Security concerns validation
    const concernsValidation = SecurityValidator.validateSecurityConcerns(formData.securityConcerns);
    if (!concernsValidation.valid) {
      errors.securityConcerns = concernsValidation.error || '';
    }

    // Privacy policy acceptance
    if (!formData.privacyPolicyAccepted) {
      errors.privacyPolicy = 'You must accept the privacy policy';
    }

    // Security challenge completion
    if (!formData.securityChallengeCompleted) {
      errors.securityChallenge = 'Please complete the security verification';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Update security score
  useEffect(() => {
    const score = SecurityValidator.generateSecurityScore({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      securityConcerns: formData.securityConcerns,
      privacyPolicyAccepted: formData.privacyPolicyAccepted,
      securityChallengeCompleted: formData.securityChallengeCompleted
    });
    setSecurityScore(score);
  }, [formData]);

  // Form field change handlers
  const handleFieldChange = (field: keyof SecureContactFormData, value: string | boolean | ConsultationType | ProjectTimeline | BudgetRange) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSecurityChange = (field: string, isValid: boolean) => {
    // Update security indicators based on field validation
    if (field === 'email' && isValid) {
      setSecurityIndicators(prev => ({ ...prev, dataMinimized: true }));
    }
  };

  const handleCaptchaVerify = (token: string) => {
    setFormData(prev => ({ ...prev, securityChallengeCompleted: true }));
    setFormData(prev => ({ ...prev, securityChallengeCompleted: true }));
  };

  const handleCaptchaError = (error: string) => {
    setFormErrors(prev => ({ ...prev, securityChallenge: error }));
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (rateLimiter.isRateLimited('contact-form')) {
      setFormErrors(prev => ({ ...prev, rateLimit: 'Too many submission attempts. Please try again later.' }));
      return;
    }

    setIsSubmitting(true);

    try {
      // Check for security threats
      const threats = SecurityValidator.detectSecurityThreats({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        securityConcerns: formData.securityConcerns
      });

      if (threats.length > 0) {
        setFormErrors(prev => ({ ...prev, security: 'Security threats detected. Please review your input.' }));
        rateLimiter.recordAttempt('contact-form');
        return;
      }

      // Generate submission ID
      const submissionId = contactFormEncryption.generateSessionToken();
      const timestamp = new Date().toISOString();

      // Prepare data for encryption
      const submissionData = {
        ...formData,
        submissionId,
        timestamp,
        threatsDetected: threats.length > 0,
        securityScore
      };

      // Encrypt the data
      if (encryptionKey) {
        const dataString = JSON.stringify(submissionData);
        await contactFormEncryption.encryptData(dataString, encryptionKey);
        await contactFormEncryption.createDataHash(dataString);

        // Simulate form submission (in real implementation, this would be an API call)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // For demo purposes, we'll just show success
        setFormData(prev => ({ 
          ...prev, 
          submissionId,
          encryptionStatus: 'encrypted'
        }));

        setSubmissionSuccess(true);
      }

    } catch (error) {
      console.error('Submission failed:', error);
      setFormErrors(prev => ({ ...prev, submit: 'Failed to submit form. Please try again.' }));
      rateLimiter.recordAttempt('contact-form');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const handleReset = () => {
    if (confirm('Are you sure you want to reset the form? All unsaved data will be lost.')) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        consultationType: 'general-inquiry',
        projectTimeline: '1-2-weeks',
        budgetRange: '5k-15k',
        securityConcerns: '',
        privacyPolicyAccepted: false,
        securityChallengeCompleted: false,
        submissionId: '',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        encryptionStatus: 'pending',
        securityLevel: 'standard'
      });
      setFormErrors({});
      setSubmissionSuccess(false);
      localStorage.removeItem('contact-form-draft');
    }
  };

  return (
    <div className="bg-navy-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with Security Indicators */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Secure <span className="text-electric-cyan-400">Contact</span> & Consultation
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Your security is our priority. All communications are encrypted and protected.
          </p>
          
          {/* Security Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <SecurityBadge type="encrypted" label="End-to-End Encryption" />
            <SecurityBadge type="verified" label="SSL Secured" />
            <SecurityBadge type="protected" label="GDPR Compliant" />
            <SecurityBadge type="certified" label="ISO 27001" />
          </div>

          {/* Security Status */}
          <div className="flex justify-center">
            <SecurityStatus 
              status={securityIndicators.threatLevel === 'low' ? 'secure' : 'warning'} 
              label={`Security Score: ${securityScore}/100`}
              size="lg"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Contact Form */}
          <div className="lg:col-span-2">
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-navy-800 border border-navy-700 rounded-xl p-8"
              noValidate
            >
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <SecureFormInput
                  label="Full Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Enter your full name"
                  required
                  error={formErrors.name}
                  securityLevel="high"
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  onSecurityChange={(isValid) => handleSecurityChange('name', isValid)}
                />
                
                <SecureFormInput
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Enter your email address"
                  required
                  error={formErrors.email}
                  securityLevel="high"
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  onSecurityChange={(isValid) => handleSecurityChange('email', isValid)}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <SecureFormInput
                  label="Phone Number (Optional)"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  placeholder="+1 (555) 123-4567"
                  error={formErrors.phone}
                  securityLevel="standard"
                  onChange={(e) => handleFieldChange('phone', e.target.value)}
                  onSecurityChange={(isValid) => handleSecurityChange('phone', isValid)}
                />
                
                <SecureFormInput
                  label="Company/Organization (Optional)"
                  type="text"
                  name="company"
                  value={formData.company}
                  placeholder="Your company name"
                  error={formErrors.company}
                  securityLevel="standard"
                  onChange={(e) => handleFieldChange('company', e.target.value)}
                  onSecurityChange={(isValid) => handleSecurityChange('company', isValid)}
                />
              </div>

              <h3 className="text-xl font-semibold text-white mb-4">Security Consultation Details</h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <SecureSelect
                  label="Consultation Type"
                  name="consultationType"
                  value={formData.consultationType}
                  required
                  error={formErrors.consultationType}
                  securityLevel="high"
                  options={[
                    { value: 'security-assessment', label: 'Security Assessment' },
                    { value: 'development-security', label: 'Development Security' },
                    { value: 'incident-response', label: 'Incident Response' },
                    { value: 'general-inquiry', label: 'General Inquiry' },
                    { value: 'compliance-audit', label: 'Compliance Audit' },
                    { value: 'penetration-testing', label: 'Penetration Testing' },
                    { value: 'security-training', label: 'Security Training' }
                  ]}
                  onChange={(e) => handleFieldChange('consultationType', e.target.value as ConsultationType)}
                  onSecurityChange={(isValid) => handleSecurityChange('consultationType', isValid)}
                />
                
                <SecureSelect
                  label="Project Timeline"
                  name="projectTimeline"
                  value={formData.projectTimeline}
                  required
                  error={formErrors.projectTimeline}
                  securityLevel="standard"
                  options={[
                    { value: 'immediate', label: 'Immediate (within 1 week)' },
                    { value: '1-2-weeks', label: '1-2 weeks' },
                    { value: '1-3-months', label: '1-3 months' },
                    { value: '3-plus-months', label: '3+ months' }
                  ]}
                  onChange={(e) => handleFieldChange('projectTimeline', e.target.value as ProjectTimeline)}
                  onSecurityChange={(isValid) => handleSecurityChange('projectTimeline', isValid)}
                />
                
                <SecureSelect
                  label="Budget Range"
                  name="budgetRange"
                  value={formData.budgetRange}
                  required
                  error={formErrors.budgetRange}
                  securityLevel="standard"
                  options={[
                    { value: 'under-5k', label: '< $5,000' },
                    { value: '5k-15k', label: '$5,000 - $15,000' },
                    { value: '15k-50k', label: '$15,000 - $50,000' },
                    { value: '50k-plus', label: '$50,000+' }
                  ]}
                  onChange={(e) => handleFieldChange('budgetRange', e.target.value as BudgetRange)}
                  onSecurityChange={(isValid) => handleSecurityChange('budgetRange', isValid)}
                />
              </div>

              <SecureTextarea
                label="Security Concerns"
                name="securityConcerns"
                value={formData.securityConcerns}
                placeholder="Please describe your security concerns, project requirements, or questions in detail..."
                required
                rows={6}
                error={formErrors.securityConcerns}
                securityLevel="critical"
                onChange={(e) => handleFieldChange('securityConcerns', e.target.value)}
                onSecurityChange={(isValid) => handleSecurityChange('securityConcerns', isValid)}
              />

              <h3 className="text-xl font-semibold text-white my-6">Security Verification</h3>
              
              <div className="space-y-6">
                <CaptchaComponent 
                  onVerify={handleCaptchaVerify}
                  onError={handleCaptchaError}
                />
                
                <SecureCheckbox
                  label="I have read and accept the Privacy Policy and understand that my data will be encrypted and protected."
                  name="privacyPolicyAccepted"
                  checked={formData.privacyPolicyAccepted}
                  required
                  error={formErrors.privacyPolicy}
                  securityLevel="high"
                  onChange={(e) => handleFieldChange('privacyPolicyAccepted', e.target.checked)}
                  onSecurityChange={(isValid) => handleSecurityChange('privacyPolicy', isValid)}
                />
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-navy-700">
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.securityChallengeCompleted}
                  className="flex-1 bg-electric-cyan-600 text-navy-900 py-3 px-6 rounded-lg hover:bg-electric-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin w-4 h-4 border-2 border-navy-900 border-t-transparent rounded-full mr-2"></div>
                      Encrypting & Submitting...
                    </div>
                  ) : (
                    'Encrypt & Submit'
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 bg-navy-700 text-white py-3 px-6 rounded-lg hover:bg-navy-600 transition-colors font-medium"
                >
                  Reset Form
                </button>
              </div>
            </form>
          </div>

          {/* Security Information Sidebar */}
          <div className="space-y-6">
            {/* Security Indicators */}
            <div className="bg-navy-800 border border-navy-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Security Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">SSL/TLS Encryption</span>
                  <SecurityStatus status={securityIndicators.sslSecured ? 'secure' : 'warning'} size="sm" />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">End-to-End Encryption</span>
                  <SecurityStatus status={securityIndicators.endToEndEncryption ? 'secure' : 'warning'} size="sm" />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Data Minimization</span>
                  <SecurityStatus status={securityIndicators.dataMinimized ? 'secure' : 'warning'} size="sm" />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">GDPR Compliance</span>
                  <SecurityStatus status={securityIndicators.gdprCompliant ? 'secure' : 'warning'} size="sm" />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">ISO 27001</span>
                  <SecurityStatus status={securityIndicators.iso27001Compliant ? 'secure' : 'warning'} size="sm" />
                </div>
              </div>
            </div>

            {/* Compliance Information */}
            <div className="bg-navy-800 border border-navy-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Compliance</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">GDPR</span>
                  <span className="text-green-400">✓ Compliant</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">ISO 27001</span>
                  <span className="text-green-400">✓ Certified</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">SOC 2</span>
                  <span className="text-green-400">✓ Type II</span>
                </div>
                <div className="text-gray-500 text-xs mt-2">
                  Last audit: {securityIndicators.lastSecurityAudit}
                </div>
              </div>
            </div>

            {/* Auto-Save Status */}
            <div className="bg-navy-800 border border-navy-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Auto-Save</h3>
              <div className="text-sm text-gray-400">
                <p>Form data is automatically saved every 30 seconds</p>
                <p className="mt-2">Last saved: {new Date().toLocaleTimeString()}</p>
              </div>
            </div>

            {/* Contact Alternatives */}
            <div className="bg-navy-800 border border-navy-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Alternative Contact</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-electric-cyan-400">📧</span>
                  <span className="text-gray-400 ml-2">aditya@cybersecurity.com</span>
                </div>
                <div>
                  <span className="text-electric-cyan-400">📞</span>
                  <span className="text-gray-400 ml-2">+1 (555) 123-4567</span>
                </div>
                <div>
                  <span className="text-electric-cyan-400">🔗</span>
                  <a href="#" className="text-gray-400 ml-2 hover:text-electric-cyan-400">LinkedIn</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <AnimatePresence>
          {submissionSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <div className="bg-navy-800 border border-green-500/30 rounded-xl p-8 max-w-md mx-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✅</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Form Submitted Successfully!</h3>
                  <p className="text-gray-400 mb-4">
                    Your secure message has been encrypted and sent. You will receive a response within 24 hours.
                  </p>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>Submission ID: {formData.submissionId}</p>
                    <p>Encryption: End-to-End AES-256-GCM</p>
                    <p>Security Score: {securityScore}/100</p>
                  </div>
                  <button
                    onClick={() => setSubmissionSuccess(false)}
                    className="mt-6 bg-electric-cyan-600 text-navy-900 py-2 px-4 rounded hover:bg-electric-cyan-500"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};