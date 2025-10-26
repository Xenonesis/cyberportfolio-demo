'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className='p-2 rounded-md text-gray-300 hover:text-white hover:bg-navy-700 transition-colors duration-300'
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {isDark ? (
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
          className='w-5 h-5'
        >
          {/* Sun icon */}
          <div className='w-full h-full bg-yellow-300 rounded-full relative'>
            <div className='absolute -top-1 -left-1 w-2 h-2 bg-yellow-300 rounded-full'></div>
            <div className='absolute top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full'></div>
            <div className='absolute -bottom-1 left-1 w-2 h-2 bg-yellow-300 rounded-full'></div>
            <div className='absolute -top-1 right-1 w-2 h-2 bg-yellow-300 rounded-full'></div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ rotate: 180 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.3 }}
          className='w-5 h-5'
        >
          {/* Moon icon */}
          <div className='w-full h-full bg-gray-600 rounded-full relative'>
            <div className='absolute top-1 left-1 w-1 h-1 bg-gray-400 rounded-full'></div>
            <div className='absolute top-2 right-1 w-1 h-1 bg-gray-400 rounded-full'></div>
            <div className='absolute bottom-1 left-2 w-1 h-1 bg-gray-400 rounded-full'></div>
          </div>
        </motion.div>
      )}
    </motion.button>
  );
};
