'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { NAVIGATION, SOCIAL_LINKS } from '@/lib/data';
import { MobileMenu } from './MobileMenu';
import { ThemeToggle } from './ThemeToggle';
import { Search } from './Search';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-navy-900/95 backdrop-blur-md border-b border-navy-700'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 group"
              onClick={closeMobileMenu}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-neon-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-4 h-4 bg-navy-900 rounded-sm"></div>
              </div>
              <span className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                Aditya
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-300 relative group ${
                    pathname === item.href
                      ? 'text-cyan-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.title}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    animate={pathname === item.href ? { scaleX: 1 } : { scaleX: 0 }}
                    style={{ originX: 0.5 }}
                  />
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <Search />
              <ThemeToggle />
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-navy-700 transition-colors duration-300"
                aria-label="Toggle mobile menu"
              >
                <div className="w-6 h-5 flex flex-col justify-center space-y-1">
                  <motion.div
                    animate={isMobileMenuOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                    className="w-full h-0.5 bg-current rounded"
                  />
                  <motion.div
                    animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="w-full h-0.5 bg-current rounded"
                  />
                  <motion.div
                    animate={isMobileMenuOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                    className="w-full h-0.5 bg-current rounded"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <MobileMenu
              navigation={NAVIGATION}
              socials={SOCIAL_LINKS}
              onClose={closeMobileMenu}
            />
          )}
        </AnimatePresence>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16 md:h-20" />
    </>
  );
};