'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const toggleSearch = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <motion.button
        onClick={toggleSearch}
        className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-navy-700 transition-colors duration-300"
        aria-label="Search"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
          className="w-5 h-5"
        >
          {/* Search icon */}
          <div className="w-full h-full relative">
            <div className="absolute inset-0 rounded-full border-2 border-current"></div>
            <div className="absolute top-4 right-0 w-2 h-0.5 bg-current origin-left rotate-45"></div>
          </div>
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute right-0 top-full mt-2 w-64 md:w-80 bg-navy-800 border border-navy-600 rounded-lg shadow-xl z-50"
          >
            <div className="p-3">
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search content..."
                    className="w-full px-3 py-2 bg-navy-700 border border-navy-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                    autoFocus
                  />
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-navy-600 rounded-md transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close search"
                >
                  <div className="w-4 h-4">
                    <svg
                      className="w-full h-full"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </motion.button>
              </div>
              
              {/* Search suggestions would go here */}
              {query && (
                <div className="mt-2 p-2 bg-navy-700 rounded-md">
                  <p className="text-sm text-gray-400">
                    Search results for "{query}"
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};