'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SecurityStatus } from './SecurityElements';
import { SecurityValidator } from '@/lib/encryptionUtils';

// Secure Form Input Component
interface SecureFormInputProps {
  label: string;
  type?: string;
  name: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  securityLevel?: 'standard' | 'high' | 'critical';
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onSecurityChange?: (isValid: boolean, securityScore: number) => void;
}

export const SecureFormInput = ({
  label,
  type = 'text',
  name,
  value,
  defaultValue,
  placeholder,
  required = false,
  disabled = false,
  error,
  helpText,
  securityLevel = 'standard',
  className = '',
  onChange,
  onBlur,
  onSecurityChange,
}: SecureFormInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [securityScore, setSecurityScore] = useState(0);

  const baseClasses =
    'w-full px-4 py-3 bg-navy-700 border rounded-md text-white placeholder-gray-400 focus:outline-none transition-all duration-300';

  const stateClasses = {
    default:
      'border-navy-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/50',
    focused: 'border-cyan-500 ring-2 ring-cyan-400/50',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-400/50',
    disabled: 'border-navy-700 bg-navy-800 text-gray-500 cursor-not-allowed',
  };

  const securityClasses = {
    standard: 'border-electric-cyan-400/30',
    high: 'border-neon-green-400/30',
    critical: 'border-red-400/30 animate-pulse',
  };

  const getStateClass = () => {
    if (disabled) return stateClasses.disabled;
    if (error) return stateClasses.error;
    if (isFocused) return stateClasses.focused;
    return stateClasses.default;
  };

  const getSecurityClass = () => {
    return securityClasses[securityLevel] || securityClasses.standard;
  };

  const inputClasses = `${baseClasses} ${getStateClass()} ${getSecurityClass()} ${className}`;

  const validateInput = (value: string) => {
    let validation = { valid: true, score: 0 };

    switch (type) {
      case 'email':
        validation = { ...SecurityValidator.validateEmail(value), score: 0 };
        break;
      case 'tel':
        validation = { ...SecurityValidator.validatePhone(value), score: 0 };
        break;
      case 'text':
      default:
        if (name === 'name') {
          validation = { ...SecurityValidator.validateName(value), score: 0 };
        } else if (name === 'company') {
          validation = {
            ...SecurityValidator.validateCompany(value),
            score: 0,
          };
        } else {
          validation = { valid: true, score: 0 };
        }
        break;
    }

    setIsValid(validation.valid);
    const score = validation.valid ? 100 : 0;
    setSecurityScore(score);

    if (onSecurityChange) {
      onSecurityChange(validation.valid, score);
    }

    return validation;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateInput(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validateInput(e.target.value);
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <motion.div className='w-full'>
      <div className='flex items-center justify-between mb-2'>
        <label
          htmlFor={name}
          className='block text-sm font-medium text-gray-300'
        >
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>
        {isFocused && (
          <SecurityStatus
            status={isValid ? 'secure' : 'warning'}
            size='sm'
            label={`${securityScore}%`}
          />
        )}
      </div>

      <input
        type={type}
        name={name}
        id={name}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={() => setIsFocused(true)}
        className={inputClasses}
        aria-describedby={`${name}-help ${name}-error`}
      />

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className='mt-2 text-sm text-red-400 flex items-center'
          id={`${name}-error`}
        >
          <div className='w-4 h-4 mr-1'>
            <div className='w-full h-full bg-red-400 rounded-sm'></div>
          </div>
          {error}
        </motion.p>
      )}

      {helpText && !error && (
        <p className='mt-2 text-sm text-gray-400' id={`${name}-help`}>
          {helpText}
        </p>
      )}
    </motion.div>
  );
};

// Secure Textarea Component
interface SecureTextareaProps {
  label: string;
  name: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  rows?: number;
  securityLevel?: 'standard' | 'high' | 'critical';
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onSecurityChange?: (isValid: boolean, securityScore: number) => void;
}

export const SecureTextarea = ({
  label,
  name,
  value,
  defaultValue,
  placeholder,
  required = false,
  disabled = false,
  error,
  helpText,
  rows = 6,
  securityLevel = 'standard',
  className = '',
  onChange,
  onBlur,
  onSecurityChange,
}: SecureTextareaProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [securityScore, setSecurityScore] = useState(0);

  const baseClasses =
    'w-full px-4 py-3 bg-navy-700 border rounded-md text-white placeholder-gray-400 focus:outline-none transition-all duration-300 resize-vertical';

  const stateClasses = {
    default:
      'border-navy-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/50',
    focused: 'border-cyan-500 ring-2 ring-cyan-400/50',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-400/50',
    disabled: 'border-navy-700 bg-navy-800 text-gray-500 cursor-not-allowed',
  };

  const securityClasses = {
    standard: 'border-electric-cyan-400/30',
    high: 'border-neon-green-400/30',
    critical: 'border-red-400/30 animate-pulse',
  };

  const getStateClass = () => {
    if (disabled) return stateClasses.disabled;
    if (error) return stateClasses.error;
    if (isFocused) return stateClasses.focused;
    return stateClasses.default;
  };

  const getSecurityClass = () => {
    return (
      securityClasses[securityLevel as keyof typeof securityClasses] ||
      securityClasses.standard
    );
  };

  const textareaClasses = `${baseClasses} ${getStateClass()} ${getSecurityClass()} ${className}`;

  const validateTextarea = (value: string) => {
    const validation = SecurityValidator.validateSecurityConcerns(value);
    setIsValid(validation.valid);
    const score = validation.valid ? 100 : 0;
    setSecurityScore(score);

    if (onSecurityChange) {
      onSecurityChange(validation.valid, score);
    }

    return validation;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    validateTextarea(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    validateTextarea(e.target.value);
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <motion.div className='w-full'>
      <div className='flex items-center justify-between mb-2'>
        <label
          htmlFor={name}
          className='block text-sm font-medium text-gray-300'
        >
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>
        {isFocused && (
          <SecurityStatus
            status={isValid ? 'secure' : 'warning'}
            size='sm'
            label={`${securityScore}%`}
          />
        )}
      </div>

      <textarea
        name={name}
        id={name}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={() => setIsFocused(true)}
        className={textareaClasses}
        aria-describedby={`${name}-help ${name}-error`}
      />

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className='mt-2 text-sm text-red-400 flex items-center'
          id={`${name}-error`}
        >
          <div className='w-4 h-4 mr-1'>
            <div className='w-full h-full bg-red-400 rounded-sm'></div>
          </div>
          {error}
        </motion.p>
      )}

      {helpText && !error && (
        <p className='mt-2 text-sm text-gray-400' id={`${name}-help`}>
          {helpText}
        </p>
      )}
    </motion.div>
  );
};

// Secure Select Component
interface SecureSelectProps {
  label: string;
  name: string;
  value?: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  securityLevel?: 'standard' | 'high' | 'critical';
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onSecurityChange?: (isValid: boolean, securityScore: number) => void;
}

export const SecureSelect = ({
  label,
  name,
  value,
  defaultValue,
  required = false,
  disabled = false,
  error,
  helpText,
  options,
  securityLevel = 'standard',
  className = '',
  onChange,
  onBlur,
  onSecurityChange,
}: SecureSelectProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [securityScore, setSecurityScore] = useState(0);

  const baseClasses =
    'w-full px-4 py-3 bg-navy-700 border rounded-md text-white focus:outline-none transition-all duration-300';

  const stateClasses = {
    default:
      'border-navy-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/50',
    focused: 'border-cyan-500 ring-2 ring-cyan-400/50',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-400/50',
    disabled: 'border-navy-700 bg-navy-800 text-gray-500 cursor-not-allowed',
  };

  const securityClasses = {
    standard: 'border-electric-cyan-400/30',
    high: 'border-neon-green-400/30',
    critical: 'border-red-400/30 animate-pulse',
  };

  const getStateClass = () => {
    if (disabled) return stateClasses.disabled;
    if (error) return stateClasses.error;
    if (isFocused) return stateClasses.focused;
    return stateClasses.default;
  };

  const getSecurityClass = () => {
    return (
      securityClasses[securityLevel as keyof typeof securityClasses] ||
      securityClasses.standard
    );
  };

  const selectClasses = `${baseClasses} ${getStateClass()} ${getSecurityClass()} ${className}`;

  const validateSelect = (value: string) => {
    const isValid = value !== '' || !required;
    setIsValid(isValid);
    const score = isValid ? 100 : 0;
    setSecurityScore(score);

    if (onSecurityChange) {
      onSecurityChange(isValid, score);
    }

    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    validateSelect(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    validateSelect(e.target.value);
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <motion.div className='w-full'>
      <div className='flex items-center justify-between mb-2'>
        <label
          htmlFor={name}
          className='block text-sm font-medium text-gray-300'
        >
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>
        {isFocused && (
          <SecurityStatus
            status={isValid ? 'secure' : 'warning'}
            size='sm'
            label={`${securityScore}%`}
          />
        )}
      </div>

      <select
        name={name}
        id={name}
        value={value}
        defaultValue={defaultValue}
        required={required}
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={() => setIsFocused(true)}
        className={selectClasses}
        aria-describedby={`${name}-help ${name}-error`}
      >
        <option value=''>Select an option</option>
        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className='mt-2 text-sm text-red-400 flex items-center'
          id={`${name}-error`}
        >
          <div className='w-4 h-4 mr-1'>
            <div className='w-full h-full bg-red-400 rounded-sm'></div>
          </div>
          {error}
        </motion.p>
      )}

      {helpText && !error && (
        <p className='mt-2 text-sm text-gray-400' id={`${name}-help`}>
          {helpText}
        </p>
      )}
    </motion.div>
  );
};

// Secure Checkbox Component
interface SecureCheckboxProps {
  label: string;
  name: string;
  checked?: boolean;
  defaultChecked?: boolean;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  securityLevel?: 'standard' | 'high' | 'critical';
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onSecurityChange?: (isValid: boolean, securityScore: number) => void;
}

export const SecureCheckbox = ({
  label,
  name,
  checked,
  defaultChecked,
  required = false,
  disabled = false,
  error,
  helpText,
  securityLevel = 'standard',
  className = '',
  onChange,
  onBlur,
  onSecurityChange,
}: SecureCheckboxProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [securityScore, setSecurityScore] = useState(0);

  const baseClasses =
    'w-4 h-4 text-electric-cyan-500 bg-navy-700 border border-navy-600 rounded focus:outline-none focus:ring-2 focus:ring-electric-cyan-400/50 transition-all duration-300';

  const stateClasses = {
    default: 'border-navy-600',
    focused: 'border-electric-cyan-500 ring-2 ring-electric-cyan-400/50',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-400/50',
    disabled: 'border-navy-700 bg-navy-800 text-gray-500 cursor-not-allowed',
  };

  const securityClasses = {
    standard: 'border-electric-cyan-400/30',
    high: 'border-neon-green-400/30',
    critical: 'border-red-400/30 animate-pulse',
  };

  const getStateClass = () => {
    if (disabled) return stateClasses.disabled;
    if (error) return stateClasses.error;
    if (isFocused) return stateClasses.focused;
    return stateClasses.default;
  };

  const getSecurityClass = () => {
    return (
      securityClasses[securityLevel as keyof typeof securityClasses] ||
      securityClasses.standard
    );
  };

  const checkboxClasses = `${baseClasses} ${getStateClass()} ${getSecurityClass()} ${className}`;

  const validateCheckbox = (checked: boolean) => {
    const isValid = checked || !required;
    setIsValid(isValid);
    const score = isValid ? 100 : 0;
    setSecurityScore(score);

    if (onSecurityChange) {
      onSecurityChange(isValid, score);
    }

    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateCheckbox(e.target.checked);
    if (onChange) {
      onChange(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validateCheckbox(e.target.checked);
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <motion.div className='flex items-start space-x-3'>
      <input
        type='checkbox'
        name={name}
        id={name}
        checked={checked}
        defaultChecked={defaultChecked}
        required={required}
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={() => setIsFocused(true)}
        className={checkboxClasses}
        aria-describedby={`${name}-help ${name}-error`}
      />

      <div className='flex-1'>
        <label
          htmlFor={name}
          className='block text-sm font-medium text-gray-300'
        >
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className='mt-1 text-sm text-red-400 flex items-center'
            id={`${name}-error`}
          >
            <div className='w-4 h-4 mr-1'>
              <div className='w-full h-full bg-red-400 rounded-sm'></div>
            </div>
            {error}
          </motion.p>
        )}

        {helpText && !error && (
          <p className='mt-1 text-sm text-gray-400' id={`${name}-help`}>
            {helpText}
          </p>
        )}
      </div>
    </motion.div>
  );
};
