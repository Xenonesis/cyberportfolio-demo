// Encryption and Security Utilities for Secure Contact Form

import { generateSecurityToken } from './utils';

// AES-256-GCM encryption implementation
export class ContactFormEncryption {
  private algorithm = 'AES-GCM';
  private keySize = 256;
  private ivLength = 12; // 96 bits for GCM
  private tagLength = 16; // 128 bits authentication tag

  /**
   * Generate a secure encryption key from a master key
   */
  async generateEncryptionKey(masterKey: string): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(masterKey),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    return await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: encoder.encode('contact-form-salt-v1'),
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      {
        name: this.algorithm,
        length: this.keySize,
      },
      false,
      ['encrypt', 'decrypt']
    );
  }

  /**
   * Encrypt form data using AES-256-GCM
   */
  async encryptData(data: string, key: CryptoKey): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);

    // Generate random IV
    const iv = crypto.getRandomValues(new Uint8Array(this.ivLength));

    // Encrypt the data
    const encrypted = await crypto.subtle.encrypt(
      {
        name: this.algorithm,
        iv: iv,
      },
      key,
      dataBuffer
    );

    // Combine IV + encrypted data
    const encryptedArray = new Uint8Array(encrypted);
    const result = new Uint8Array(iv.length + encryptedArray.length);
    result.set(iv, 0);
    result.set(encryptedArray, iv.length);

    return btoa(String.fromCharCode(...result));
  }

  /**
   * Decrypt form data using AES-256-GCM
   */
  async decryptData(encryptedData: string, key: CryptoKey): Promise<string> {
    const data = new Uint8Array(
      atob(encryptedData)
        .split('')
        .map(char => char.charCodeAt(0))
    );

    // Extract IV and encrypted data
    const iv = data.slice(0, this.ivLength);
    const encrypted = data.slice(this.ivLength);

    // Decrypt the data
    const decrypted = await crypto.subtle.decrypt(
      {
        name: this.algorithm,
        iv: iv,
      },
      key,
      encrypted
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  }

  /**
   * Generate a secure session token for form submission
   */
  generateSessionToken(): string {
    return generateSecurityToken(48);
  }

  /**
   * Create a hash of the form data for integrity verification
   */
  async createDataHash(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest(
      'SHA-256',
      encoder.encode(data)
    );
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  /**
   * Verify data integrity using hash comparison
   */
  async verifyDataIntegrity(
    data: string,
    expectedHash: string
  ): Promise<boolean> {
    const currentHash = await this.createDataHash(data);
    return currentHash === expectedHash;
  }
}

// Security validation utilities
export class SecurityValidator {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private static readonly PHONE_REGEX = /^\+?[\d\s\-\(\)]+$/;
  private static readonly NAME_REGEX = /^[a-zA-Z\s\-'.,]+$/;
  private static readonly SECURITY_CONCERNS_REGEX =
    /^[a-zA-Z0-9\s\-\.,;:!?()]+$/;

  /**
   * Validate email format and check for disposable email providers
   */
  static validateEmail(email: string): { valid: boolean; error?: string } {
    if (!email) {
      return { valid: false, error: 'Email is required' };
    }

    if (!this.EMAIL_REGEX.test(email)) {
      return { valid: false, error: 'Please enter a valid email address' };
    }

    if (email.length > 254) {
      return { valid: false, error: 'Email address is too long' };
    }

    // Check for disposable email providers
    const disposableDomains = [
      '10minutemail.com',
      'tempmail.org',
      'guerrillamail.com',
      'mailinator.com',
      'throwaway.email',
    ];

    const domain = email.split('@')[1]?.toLowerCase();
    if (domain && disposableDomains.includes(domain)) {
      return {
        valid: false,
        error: 'Disposable email addresses are not allowed',
      };
    }

    return { valid: true };
  }

  /**
   * Validate phone number format
   */
  static validatePhone(phone: string): { valid: boolean; error?: string } {
    if (!phone) {
      return { valid: true }; // Phone is optional
    }

    if (!this.PHONE_REGEX.test(phone)) {
      return { valid: false, error: 'Please enter a valid phone number' };
    }

    if (phone.length > 20) {
      return { valid: false, error: 'Phone number is too long' };
    }

    return { valid: true };
  }

  /**
   * Validate name format
   */
  static validateName(name: string): { valid: boolean; error?: string } {
    if (!name) {
      return { valid: false, error: 'Full name is required' };
    }

    if (name.length < 2) {
      return { valid: false, error: 'Name must be at least 2 characters long' };
    }

    if (name.length > 100) {
      return { valid: false, error: 'Name is too long' };
    }

    if (!this.NAME_REGEX.test(name)) {
      return { valid: false, error: 'Name contains invalid characters' };
    }

    return { valid: true };
  }

  /**
   * Validate security concerns text
   */
  static validateSecurityConcerns(concerns: string): {
    valid: boolean;
    error?: string;
  } {
    if (!concerns) {
      return { valid: false, error: 'Security concerns are required' };
    }

    if (concerns.length < 20) {
      return {
        valid: false,
        error:
          'Please provide more details about your security concerns (minimum 20 characters)',
      };
    }

    if (concerns.length > 2000) {
      return {
        valid: false,
        error: 'Security concerns are too long (maximum 2000 characters)',
      };
    }

    if (!this.SECURITY_CONCERNS_REGEX.test(concerns)) {
      return {
        valid: false,
        error: 'Security concerns contain invalid characters',
      };
    }

    return { valid: true };
  }

  /**
   * Validate company name
   */
  static validateCompany(company: string): { valid: boolean; error?: string } {
    if (!company) {
      return { valid: true }; // Company is optional
    }

    if (company.length > 100) {
      return { valid: false, error: 'Company name is too long' };
    }

    return { valid: true };
  }

  /**
   * Check if form data contains sensitive information that should be encrypted
   */
  static containsSensitiveData(
    data: Record<string, string | number | boolean>
  ): boolean {
    const sensitiveKeywords = [
      'password',
      'secret',
      'token',
      'api',
      'key',
      'credential',
      'ssn',
      'social security',
      'credit card',
      'bank',
      'financial',
    ];

    const dataString = JSON.stringify(data).toLowerCase();
    return sensitiveKeywords.some(keyword => dataString.includes(keyword));
  }

  /**
   * Generate security score based on form validation
   */
  static generateSecurityScore(formData: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    securityConcerns: string;
    privacyPolicyAccepted: boolean;
    securityChallengeCompleted: boolean;
  }): number {
    let score = 0;
    const maxScore = 100;

    // Name validation (15 points)
    if (this.validateName(formData.name).valid) score += 15;

    // Email validation (20 points)
    if (this.validateEmail(formData.email).valid) score += 20;

    // Phone validation (10 points)
    if (this.validatePhone(formData.phone || '').valid) score += 10;

    // Company validation (5 points)
    if (this.validateCompany(formData.company || '').valid) score += 5;

    // Security concerns validation (30 points)
    if (this.validateSecurityConcerns(formData.securityConcerns).valid)
      score += 30;

    // Privacy policy acceptance (10 points)
    if (formData.privacyPolicyAccepted) score += 10;

    // Security challenge completion (10 points)
    if (formData.securityChallengeCompleted) score += 10;

    return Math.min(score, maxScore);
  }

  /**
   * Detect potential security threats in form data
   */
  static detectSecurityThreats(formData: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    securityConcerns: string;
  }): string[] {
    const threats: string[] = [];
    const dataString = JSON.stringify(formData).toLowerCase();

    // SQL injection patterns
    const sqlPatterns = [
      /union.*select/i,
      /drop.*table/i,
      /insert.*into/i,
      /delete.*from/i,
      /update.*set/i,
      /' or 1=1/i,
      /'; drop table/i,
    ];

    sqlPatterns.forEach(pattern => {
      if (pattern.test(dataString)) {
        threats.push('Potential SQL injection attempt detected');
      }
    });

    // XSS patterns
    const xssPatterns = [
      /<script/i,
      /javascript:/i,
      /onload=/i,
      /onerror=/i,
      /<iframe/i,
      /<object/i,
    ];

    xssPatterns.forEach(pattern => {
      if (pattern.test(dataString)) {
        threats.push('Potential XSS attempt detected');
      }
    });

    // Suspicious patterns
    const suspiciousPatterns = [
      /eval\(/i,
      /exec\(/i,
      /system\(/i,
      /shell_exec/i,
      /base64_decode/i,
    ];

    suspiciousPatterns.forEach(pattern => {
      if (pattern.test(dataString)) {
        threats.push('Suspicious code execution patterns detected');
      }
    });

    return threats;
  }
}

// Rate limiting and throttling utilities
export class RateLimiter {
  private attempts = new Map<string, { count: number; firstAttempt: number }>();
  private readonly maxAttempts = 5;
  private readonly timeWindow = 15 * 60 * 1000; // 15 minutes

  /**
   * Check if IP address has exceeded rate limit
   */
  isRateLimited(identifier: string): boolean {
    const now = Date.now();
    const attempt = this.attempts.get(identifier);

    if (!attempt) {
      return false;
    }

    if (now - attempt.firstAttempt > this.timeWindow) {
      this.attempts.delete(identifier);
      return false;
    }

    return attempt.count >= this.maxAttempts;
  }

  /**
   * Record an attempt for rate limiting
   */
  recordAttempt(identifier: string): number {
    const now = Date.now();
    const attempt = this.attempts.get(identifier);

    if (!attempt || now - attempt.firstAttempt > this.timeWindow) {
      this.attempts.set(identifier, { count: 1, firstAttempt: now });
      return 1;
    }

    attempt.count++;
    return attempt.count;
  }

  /**
   * Get remaining time before rate limit resets
   */
  getRemainingTime(identifier: string): number {
    const attempt = this.attempts.get(identifier);
    if (!attempt) return 0;

    const now = Date.now();
    const elapsed = now - attempt.firstAttempt;
    return Math.max(0, this.timeWindow - elapsed);
  }
}

// Export singleton instances
export const contactFormEncryption = new ContactFormEncryption();
export const securityValidator = new SecurityValidator();
export const rateLimiter = new RateLimiter();
