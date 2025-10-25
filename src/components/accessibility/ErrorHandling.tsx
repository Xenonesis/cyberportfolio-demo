"use client";

import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';
import { useAccessibility } from './AccessibilityProvider';

interface ValidationRule {
  id: string;
  field: string;
  rule: (value: any) => boolean;
  message: string;
  severity: 'error' | 'warning' | 'info';
  preventSubmission?: boolean;
}

interface ValidationResult {
  field: string;
  isValid: boolean;
  message?: string;
  severity?: 'error' | 'warning' | 'info';
}

interface ErrorHandlingContextType {
  // Form validation
  validateField: (fieldName: string, value: any, rules?: ValidationRule[]) => ValidationResult;
  validateForm: (formData: Record<string, any>, rules?: ValidationRule[]) => ValidationResult[];
  addValidationRule: (rule: ValidationRule) => void;
  removeValidationRule: (ruleId: string) => void;
  getValidationRules: (fieldName?: string) => ValidationRule[];

  // Error recovery
  suggestCorrection: (fieldName: string, value: any, error: ValidationResult) => string[];
  autoCorrect: (fieldName: string, value: any, error: ValidationResult) => any;

  // Accessibility announcements
  announceValidation: (results: ValidationResult[]) => void;
  announceError: (message: string, severity?: 'error' | 'warning' | 'info') => void;

  // Form state management
  formErrors: Record<string, ValidationResult[]>;
  setFormErrors: (formId: string, errors: ValidationResult[]) => void;
  clearFormErrors: (formId: string) => void;

  // Security validation
  validateSecurityInput: (fieldName: string, value: string) => ValidationResult;
  sanitizeInput: (value: string, type?: 'text' | 'email' | 'url' | 'password') => string;
}

const ErrorHandlingContext = createContext<ErrorHandlingContextType | undefined>(undefined);

interface ErrorHandlingProps {
  children: ReactNode;
  enableAutoCorrection?: boolean;
  enableValidationAnnouncements?: boolean;
  enableSecurityValidation?: boolean;
  customValidationRules?: ValidationRule[];
}

export const ErrorHandling: React.FC<ErrorHandlingProps> = ({
  children,
  enableAutoCorrection = true,
  enableValidationAnnouncements = true,
  enableSecurityValidation = true,
  customValidationRules = [],
}) => {
  const accessibilityContext = useAccessibility();
  const [validationRules, setValidationRules] = useState<ValidationRule[]>([
    // Default validation rules
    {
      id: 'email-format',
      field: 'email',
      rule: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Please enter a valid email address',
      severity: 'error',
      preventSubmission: true,
    },
    {
      id: 'required-field',
      field: '*',
      rule: (value: any) => value !== null && value !== undefined && value !== '',
      message: 'This field is required',
      severity: 'error',
      preventSubmission: true,
    },
    {
      id: 'minimum-length',
      field: 'password',
      rule: (value: string) => value.length >= 8,
      message: 'Password must be at least 8 characters long',
      severity: 'error',
      preventSubmission: true,
    },
    {
      id: 'phone-format',
      field: 'phone',
      rule: (value: string) => /^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, '')),
      message: 'Please enter a valid phone number',
      severity: 'warning',
      preventSubmission: false,
    },
    {
      id: 'url-format',
      field: 'website',
      rule: (value: string) => {
        if (!value) return true; // Optional field
        try {
          new URL(value.startsWith('http') ? value : `https://${value}`);
          return true;
        } catch {
          return false;
        }
      },
      message: 'Please enter a valid URL',
      severity: 'warning',
      preventSubmission: false,
    },
    ...customValidationRules,
  ]);

  const [formErrors, setFormErrorsState] = useState<Record<string, ValidationResult[]>>({});
  const liveRegionRef = useRef<HTMLDivElement>(null);

  // Add validation rule
  const addValidationRule = (rule: ValidationRule) => {
    setValidationRules(prev => [...prev, rule]);
  };

  // Remove validation rule
  const removeValidationRule = (ruleId: string) => {
    setValidationRules(prev => prev.filter(rule => rule.id !== ruleId));
  };

  // Get validation rules for a field
  const getValidationRules = (fieldName?: string): ValidationRule[] => {
    if (!fieldName) return validationRules;
    return validationRules.filter(rule => rule.field === fieldName || rule.field === '*');
  };

  // Validate single field
  const validateField = (fieldName: string, value: any, rules?: ValidationRule[]): ValidationResult => {
    const applicableRules = rules || getValidationRules(fieldName);

    for (const rule of applicableRules) {
      if (rule.field === fieldName || rule.field === '*') {
        const isValid = rule.rule(value);
        if (!isValid) {
          return {
            field: fieldName,
            isValid: false,
            message: rule.message,
            severity: rule.severity,
          };
        }
      }
    }

    return {
      field: fieldName,
      isValid: true,
    };
  };

  // Validate entire form
  const validateForm = (formData: Record<string, any>, rules?: ValidationRule[]): ValidationResult[] => {
    const results: ValidationResult[] = [];
    const applicableRules = rules || validationRules;

    for (const [fieldName, value] of Object.entries(formData)) {
      const result = validateField(fieldName, value, applicableRules);
      if (!result.isValid) {
        results.push(result);
      }
    }

    return results;
  };

  // Suggest corrections for validation errors
  const suggestCorrection = (fieldName: string, value: any, error: ValidationResult): string[] => {
    const suggestions: string[] = [];

    switch (fieldName) {
      case 'email':
        if (error.message?.includes('valid email')) {
          suggestions.push('Check for typos in the email address');
          suggestions.push('Make sure the email includes @ and a domain');
          suggestions.push('Example: user@example.com');
        }
        break;

      case 'phone':
        if (error.message?.includes('phone number')) {
          suggestions.push('Enter numbers only, no spaces or special characters');
          suggestions.push('Include country code for international numbers');
          suggestions.push('Example: +1234567890');
        }
        break;

      case 'password':
        if (error.message?.includes('8 characters')) {
          suggestions.push('Add more characters to meet the minimum length');
          suggestions.push('Include uppercase and lowercase letters');
          suggestions.push('Add numbers and special characters for security');
        }
        break;

      case 'website':
        if (error.message?.includes('valid URL')) {
          suggestions.push('Include http:// or https:// at the beginning');
          suggestions.push('Check for typos in the domain name');
          suggestions.push('Example: https://www.example.com');
        }
        break;

      default:
        suggestions.push('Please review and correct the entered information');
    }

    return suggestions;
  };

  // Auto-correct common errors
  const autoCorrect = (fieldName: string, value: any, error: ValidationResult): any => {
    if (!enableAutoCorrection) return value;

    switch (fieldName) {
      case 'email':
        // Trim whitespace and convert to lowercase
        if (typeof value === 'string') {
          return value.trim().toLowerCase();
        }
        break;

      case 'phone':
        // Remove spaces, dashes, and parentheses
        if (typeof value === 'string') {
          return value.replace(/[\s\-\(\)]/g, '');
        }
        break;

      case 'website':
        // Add https:// if missing
        if (typeof value === 'string' && value && !value.startsWith('http')) {
          return `https://${value}`;
        }
        break;

      default:
        return value;
    }

    return value;
  };

  // Announce validation results to screen readers
  const announceValidation = (results: ValidationResult[]) => {
    if (!enableValidationAnnouncements || !liveRegionRef.current) return;

    const errorCount = results.filter(r => !r.isValid).length;
    const warningCount = results.filter(r => r.severity === 'warning' && !r.isValid).length;

    let announcement = '';

    if (errorCount > 0) {
      announcement += `${errorCount} validation error${errorCount > 1 ? 's' : ''} found. `;
    }

    if (warningCount > 0) {
      announcement += `${warningCount} validation warning${warningCount > 1 ? 's' : ''} found. `;
    }

    if (results.length > 0) {
      announcement += 'Please review the form and correct any issues.';
    }

    if (announcement) {
      liveRegionRef.current.textContent = announcement;
      setTimeout(() => {
        if (liveRegionRef.current) {
          liveRegionRef.current.textContent = '';
        }
      }, 1000);
    }
  };

  // Announce individual errors
  const announceError = (message: string, severity: 'error' | 'warning' | 'info' = 'error') => {
    if (!enableValidationAnnouncements || !liveRegionRef.current) return;

    const prefix = severity === 'error' ? 'Error: ' :
                  severity === 'warning' ? 'Warning: ' : 'Info: ';

    liveRegionRef.current.textContent = prefix + message;
    setTimeout(() => {
      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = '';
      }
    }, 1000);

    // Add to accessibility errors - the addError function handles id and timestamp internally
    accessibilityContext.addError({
      message,
      type: severity === 'error' ? 'critical' : severity === 'warning' ? 'warning' : 'info',
      element: 'form-validation',
    } as any);
  };

  // Form error management
  const setFormErrors = (formId: string, errors: ValidationResult[]) => {
    setFormErrorsState(prev => ({
      ...prev,
      [formId]: errors,
    }));

    // Announce errors
    announceValidation(errors);
  };

  const clearFormErrors = (formId: string) => {
    setFormErrorsState(prev => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [formId]: _, ...rest } = prev;
      return rest;
    });
  };

  // Security input validation
  const validateSecurityInput = (fieldName: string, value: string): ValidationResult => {
    if (!enableSecurityValidation) {
      return { field: fieldName, isValid: true };
    }

    // Check for potentially malicious input
    const maliciousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /<iframe/i,
      /<object/i,
      /<embed/i,
    ];

    for (const pattern of maliciousPatterns) {
      if (pattern.test(value)) {
        return {
          field: fieldName,
          isValid: false,
          message: 'Input contains potentially unsafe content',
          severity: 'error',
        };
      }
    }

    // Check password strength for password fields
    if (fieldName === 'password' || fieldName === 'newPassword') {
      const hasLowerCase = /[a-z]/.test(value);
      const hasUpperCase = /[A-Z]/.test(value);
      const hasNumbers = /\d/.test(value);
      const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);

      if (value.length < 8) {
        return {
          field: fieldName,
          isValid: false,
          message: 'Password must be at least 8 characters long',
          severity: 'error',
        };
      }

      if (!hasLowerCase || !hasUpperCase || !hasNumbers) {
        return {
          field: fieldName,
          isValid: false,
          message: 'Password must contain uppercase, lowercase, and numeric characters',
          severity: 'warning',
        };
      }

      if (!hasSpecialChars) {
        return {
          field: fieldName,
          isValid: false,
          message: 'Consider adding special characters for better security',
          severity: 'info',
        };
      }
    }

    return { field: fieldName, isValid: true };
  };

  // Input sanitization
  const sanitizeInput = (value: string, type: 'text' | 'email' | 'url' | 'password' = 'text'): string => {
    if (!enableSecurityValidation) return value;

    let sanitized = value;

    // Basic XSS prevention
    sanitized = sanitized.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    sanitized = sanitized.replace(/<[^>]*>/g, '');
    sanitized = sanitized.replace(/javascript:/gi, '');
    sanitized = sanitized.replace(/on\w+\s*=/gi, '');

    // Type-specific sanitization
    switch (type) {
      case 'email':
        // Allow only email-safe characters
        sanitized = sanitized.replace(/[^\w@.-]/g, '');
        break;

      case 'url':
        // Allow only URL-safe characters
        sanitized = sanitized.replace(/[^\w:/?#[\]@!$&'()*+,;=.-]/g, '');
        break;

      case 'password':
        // Don't sanitize passwords - let them be as-is for security
        break;

      default:
        // General text sanitization
        sanitized = sanitized.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
        break;
    }

    return sanitized;
  };

  const contextValue: ErrorHandlingContextType = {
    validateField,
    validateForm,
    addValidationRule,
    removeValidationRule,
    getValidationRules,
    suggestCorrection,
    autoCorrect,
    announceValidation,
    announceError,
    formErrors,
    setFormErrors,
    clearFormErrors,
    validateSecurityInput,
    sanitizeInput,
  };

  return (
    <ErrorHandlingContext.Provider value={contextValue}>
      <div className="error-handling-container">
        {/* Live region for screen reader announcements */}
        <div
          ref={liveRegionRef}
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
          role="status"
        />
        {children}
      </div>
    </ErrorHandlingContext.Provider>
  );
};

export const useErrorHandling = (): ErrorHandlingContextType => {
  const context = useContext(ErrorHandlingContext);
  if (!context) {
    throw new Error('useErrorHandling must be used within an ErrorHandling provider');
  }
  return context;
};

// Enhanced Form Field Component with Validation
interface ValidatedFormFieldProps {
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  required?: boolean;
  label?: string;
  className?: string;
  showSuggestions?: boolean;
  autoCorrect?: boolean;
}

export const ValidatedFormField: React.FC<ValidatedFormFieldProps> = ({
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  label,
  className = '',
  showSuggestions = true,
  autoCorrect = true,
}) => {
  const { validateField, validateSecurityInput, suggestCorrection, autoCorrect: autoCorrectFn, sanitizeInput } = useErrorHandling();
  const [error, setError] = useState<ValidationResult | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [touched, setTouched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let newValue = e.target.value;

    // Sanitize input
    newValue = sanitizeInput(newValue, type as 'text' | 'email' | 'url' | 'password');

    // Auto-correct if enabled
    if (autoCorrect && error && !error.isValid) {
      newValue = autoCorrectFn(name, newValue, error);
    }

    onChange(newValue);

    // Clear error if field becomes valid
    if (error && !error.isValid) {
      const validation = validateField(name, newValue);
      if (validation.isValid) {
        setError(null);
        setSuggestions([]);
      }
    }
  };

  const handleBlur = () => {
    setTouched(true);

    // Validate field
    const validation = validateField(name, value);
    const securityValidation = validateSecurityInput(name, value);

    if (!validation.isValid) {
      setError(validation);
      if (showSuggestions) {
        setSuggestions(suggestCorrection(name, value, validation));
      }
    } else if (!securityValidation.isValid) {
      setError(securityValidation);
      setSuggestions([]);
    } else {
      setError(null);
      setSuggestions([]);
    }

    onBlur?.();
  };

  const fieldId = `field-${name}`;
  const errorId = `error-${name}`;

  return (
    <div className={`validated-form-field ${className}`}>
      {label && (
        <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
        </label>
      )}

      {type === 'textarea' ? (
        <textarea
          id={fieldId}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
          }`}
        />
      ) : (
        <input
          id={fieldId}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
          }`}
        />
      )}

      {error && touched && (
        <div
          id={errorId}
          className={`mt-1 text-sm ${
            error.severity === 'error' ? 'text-red-600' :
            error.severity === 'warning' ? 'text-yellow-600' : 'text-blue-600'
          }`}
          role="alert"
          aria-live="polite"
        >
          {error.message}
        </div>
      )}

      {suggestions.length > 0 && showSuggestions && (
        <div className="mt-2">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Suggestions:</p>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ErrorHandling;