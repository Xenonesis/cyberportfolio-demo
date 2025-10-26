'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface FormInputProps {
  label?: string;
  type?: string;
  name: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const FormInput = ({
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
  className = '',
  onChange,
  onBlur,
}: FormInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const baseClasses =
    'w-full px-4 py-3 bg-navy-700 border rounded-md text-white placeholder-gray-400 focus:outline-none transition-all duration-300';

  const stateClasses = {
    default:
      'border-navy-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/50',
    focused: 'border-cyan-500 ring-2 ring-cyan-400/50',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-400/50',
    disabled: 'border-navy-700 bg-navy-800 text-gray-500 cursor-not-allowed',
  };

  const getStateClass = () => {
    if (disabled) return stateClasses.disabled;
    if (error) return stateClasses.error;
    if (isFocused) return stateClasses.focused;
    return stateClasses.default;
  };

  const inputClasses = `${baseClasses} ${getStateClass()} ${className}`;

  return (
    <motion.div className='w-full'>
      {label && (
        <label
          htmlFor={name}
          className='block text-sm font-medium text-gray-300 mb-2'
        >
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>
      )}

      <input
        type={type}
        name={name}
        id={name}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={onChange}
        onBlur={e => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        onFocus={() => setIsFocused(true)}
        className={inputClasses}
      />

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className='mt-2 text-sm text-red-400 flex items-center'
        >
          <div className='w-4 h-4 mr-1'>
            {/* Error icon */}
            <div className='w-full h-full bg-red-400 rounded-sm'></div>
          </div>
          {error}
        </motion.p>
      )}

      {helpText && !error && (
        <p className='mt-2 text-sm text-gray-400'>{helpText}</p>
      )}
    </motion.div>
  );
};
