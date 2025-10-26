'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FOOTER_NAVIGATION, SOCIAL_LINKS } from '@/lib/data';
import { LinkedInIcon } from '@/components/ui/LinkedInIcon';
import { GitHubIcon } from '@/components/ui/GitHubIcon';

export const Footer = () => {
  return (
    <footer className='bg-navy-900 border-t border-navy-700'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className='flex items-center space-x-2 mb-4'>
              <div className='w-8 h-8 bg-gradient-to-r from-cyan-400 to-neon-green-600 rounded-lg flex items-center justify-center'>
                <div className='w-4 h-4 bg-navy-900 rounded-sm'></div>
              </div>
              <span className='text-xl font-bold text-white'>Aditya</span>
            </div>
            <p className='text-gray-400 mb-4'>
              Expert cybersecurity consultant specializing in enterprise
              security, incident response, and cloud security solutions.
            </p>
            <div className='flex space-x-4'>
              {SOCIAL_LINKS.slice(0, 3).map(social => (
                <motion.a
                  key={social.id}
                  href={social.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-10 h-10 bg-navy-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-navy-600 transition-all duration-300'
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
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
          </motion.div>

          {/* Navigation Links */}
          <div className='grid grid-cols-2 gap-6'>
            {FOOTER_NAVIGATION.map(section => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className='text-sm font-semibold text-white mb-4'>
                  {section.title}
                </h3>
                <ul className='space-y-2'>
                  {section.children?.map(item => (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        className='text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-300'
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className='text-sm font-semibold text-white mb-4'>Contact</h3>
            <div className='space-y-2 text-gray-400 text-sm'>
              <p>Email: aditya@cybersecurity.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>New York, NY, USA</p>
            </div>

            {/* Newsletter Signup */}
            <div className='mt-6'>
              <h4 className='text-sm font-semibold text-white mb-2'>
                Stay Updated
              </h4>
              <div className='flex space-x-2'>
                <input
                  type='email'
                  placeholder='Your email'
                  className='flex-1 px-3 py-2 bg-navy-700 border border-navy-600 rounded-md text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent'
                />
                <button className='px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-500 transition-colors duration-300 text-sm'>
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className='border-t border-navy-700 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className='text-gray-400 text-sm'>
            © 2024 Aditya Kumar Tiwari. All rights reserved.
          </p>
          <div className='flex space-x-6 mt-4 md:mt-0'>
            <Link
              href='/privacy'
              className='text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-300'
            >
              Privacy Policy
            </Link>
            <Link
              href='/terms'
              className='text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-300'
            >
              Terms of Service
            </Link>
            <Link
              href='/sitemap'
              className='text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-300'
            >
              Sitemap
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
