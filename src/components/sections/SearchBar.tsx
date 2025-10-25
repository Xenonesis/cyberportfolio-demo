'use client';

import { useState, useEffect } from 'react';

export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  debounceMs?: number;
  showIcon?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search articles...",
  className = "",
  defaultValue = "",
  debounceMs = 300,
  showIcon = true
}) => {
  const [query, setQuery] = useState(defaultValue);
  const [isTyping, setIsTyping] = useState(false);

  // Debounce search to avoid excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
      setIsTyping(false);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsTyping(true);
  };

  const clearSearch = () => {
    setQuery('');
    setIsTyping(false);
    onSearch('');
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        {showIcon && (
          <svg 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        )}
        
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`w-full bg-navy-700 border border-navy-600 text-white placeholder-gray-400 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent pl-10 pr-20 py-3 transition-colors duration-300 ${
            isTyping ? 'border-cyan-500' : ''
          }`}
          aria-label="Search articles"
        />
        
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      {/* Search indicator */}
      {isTyping && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};