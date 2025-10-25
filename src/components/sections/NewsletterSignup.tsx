'use client';

import { useState } from 'react';

export interface NewsletterSignupProps {
  title?: string;
  subtitle?: string;
  className?: string;
  showBenefits?: boolean;
  onSubmit?: (email: string, name?: string) => void;
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  title = "Subscribe to Cybersecurity Insights",
  subtitle = "Get the latest articles, industry trends, and expert insights delivered to your inbox",
  className = "",
  showBenefits = true,
  onSubmit
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSubmit) {
        onSubmit(email, name);
      }
      
      setIsSubscribed(true);
      setEmail('');
      setName('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className={`bg-navy-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6 text-center ${className}`}>
        <div className="flex justify-center mb-4">
          <svg 
            className="w-12 h-12 text-cyan-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Thank You!</h3>
        <p className="text-gray-300 text-sm">
          You've successfully subscribed to our cybersecurity insights newsletter.
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-navy-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6 ${className}`}>
      <header className="mb-6">
        <div className="inline-flex items-center space-x-2 bg-navy-700/80 backdrop-blur-sm border border-cyan-500/30 rounded-full px-4 py-1 mb-4">
          <svg 
            className="w-3 h-3 text-cyan-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 8l7.89 7.89a2 2 0 002.828 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
            />
          </svg>
          <span className="text-cyan-400 font-medium text-xs">
            Stay Updated
          </span>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{subtitle}</p>
      </header>
      
      <form 
        onSubmit={handleSubmit} 
        className="space-y-4"
        aria-label="Newsletter subscription form"
      >
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            className="w-full px-3 py-2 bg-navy-700 border border-navy-600 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-colors duration-300"
            aria-label="Your name"
          />
        </div>
        
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full px-3 py-2 bg-navy-700 border border-navy-600 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-colors duration-300"
            aria-label="Email address for newsletter subscription"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex items-center space-x-2 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 text-sm font-medium"
          aria-label="Subscribe to cybersecurity newsletter"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Subscribing...</span>
            </>
          ) : (
            <>
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 19l9 2-9-17-9 17 9-2zm0 0v-8" 
                />
              </svg>
              <span>Subscribe</span>
            </>
          )}
        </button>
      </form>
      
      {error && (
        <p className="text-red-400 text-xs mt-2 text-center" role="alert">
          {error}
        </p>
      )}
      
      {showBenefits && (
        <div className="flex flex-wrap justify-center gap-3 mt-4 text-xs">
          <div className="flex items-center space-x-1 text-gray-400">
            <svg 
              className="w-3 h-3 text-cyan-400" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                clipRule="evenodd" 
              />
            </svg>
            <span>Weekly articles</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-400">
            <svg 
              className="w-3 h-3 text-neon-green-400" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                clipRule="evenodd" 
              />
            </svg>
            <span>Expert insights</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-400">
            <svg 
              className="w-3 h-3 text-cyan-400" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                clipRule="evenodd" 
              />
            </svg>
            <span>Industry trends</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-400">
            <svg 
              className="w-3 h-3 text-neon-green-400" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                clipRule="evenodd" 
              />
            </svg>
            <span>No spam guarantee</span>
          </div>
        </div>
      )}
    </div>
  );
};