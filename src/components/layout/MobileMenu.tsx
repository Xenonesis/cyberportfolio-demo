'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { LinkedInIcon } from '@/components/ui/LinkedInIcon';
import { GitHubIcon } from '@/components/ui/GitHubIcon';
import { NavigationItem, SocialLink } from '@/types';

interface MobileMenuProps {
  navigation: NavigationItem[];
  socials: SocialLink[];
  onClose: () => void;
}

export const MobileMenu = ({
  navigation,
  socials,
  onClose,
}: MobileMenuProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='md:hidden fixed inset-0 bg-navy-900/95 backdrop-blur-md z-40'
      >
        <div className='flex flex-col h-full'>
          {/* Header with close button */}
          <div className='flex items-center justify-between p-4 border-b border-navy-700'>
            <h2 className='text-lg font-semibold text-white'>Menu</h2>
            <button
              onClick={onClose}
              className='p-2 text-gray-300 hover:text-white hover:bg-navy-700 rounded-md transition-colors duration-300'
              aria-label='Close menu'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className='flex-1 overflow-y-auto py-4'>
            <ul className='space-y-2 px-4'>
              {navigation.map(item => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * navigation.indexOf(item) }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className='block py-3 px-4 text-lg font-medium text-gray-300 hover:text-cyan-400 hover:bg-navy-700 rounded-md transition-all duration-300 border-l-2 border-transparent hover:border-cyan-400'
                  >
                    {item.title}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Social Links */}
            <div className='px-4 pt-6 border-t border-navy-700'>
              <h3 className='text-sm font-medium text-gray-400 mb-4'>
                Connect
              </h3>
              <div className='flex space-x-4'>
                {socials.map(social => (
                  <motion.a
                    key={social.id}
                    href={social.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + socials.indexOf(social) * 0.1 }}
                    className='p-2 text-gray-400 hover:text-cyan-400 hover:bg-navy-700 rounded-md transition-all duration-300'
                    aria-label={social.title}
                  >
                    <div className='w-5 h-5'>
                      {social.id === 'linkedin' && (
                        <LinkedInIcon size='sm' color='gray' animate />
                      )}
                      {social.id === 'github' && (
                        <GitHubIcon size='sm' color='gray' animate />
                      )}
                      {social.id !== 'linkedin' && social.id !== 'github' && (
                        <div className='w-full h-full bg-current rounded-sm'></div>
                      )}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
