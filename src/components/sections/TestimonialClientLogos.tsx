'use client';

import { motion } from 'framer-motion';
import type { ClientInfo } from '@/types/testimonials';

interface TestimonialClientLogosProps {
  clients: ClientInfo[];
}

export const TestimonialClientLogos: React.FC<TestimonialClientLogosProps> = ({
  clients,
}) => {
  if (clients.length === 0) {
    return null;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='bg-deep-navy-800/30 backdrop-blur-sm border border-deep-navy-600 rounded-lg p-6'
    >
      <h3 className='text-lg font-semibold text-white mb-4 text-center'>
        Trusted by Industry Leaders
      </h3>

      <motion.div
        variants={itemVariants}
        className='flex flex-wrap justify-center items-center gap-8 md:gap-12'
      >
        {clients.map(client => (
          <div key={client.id} className='flex flex-col items-center space-y-2'>
            {/* Client Logo or Placeholder */}
            {client.logo ? (
              <div className='w-16 h-16 bg-gradient-to-r from-electric-cyan-500 to-neon-green-500 rounded-lg flex items-center justify-center overflow-hidden'>
                <img
                  src={client.logo}
                  alt={`${client.company} logo`}
                  className='w-full h-full object-cover'
                />
              </div>
            ) : (
              <div className='w-16 h-16 bg-gradient-to-r from-electric-cyan-500 to-neon-green-500 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-sm'>
                  {client.company
                    .split(' ')
                    .map(word => word[0])
                    .join('')}
                </span>
              </div>
            )}

            {/* Client Information */}
            <div className='text-center'>
              <p className='text-white font-medium text-sm'>{client.company}</p>
              <p className='text-gray-400 text-xs'>{client.industry}</p>
              {client.size && (
                <span className='inline-block px-2 py-1 bg-deep-navy-700/50 rounded text-xs text-electric-cyan-400 mt-1'>
                  {client.size}
                </span>
              )}
            </div>
          </div>
        ))}

        {/* "And more" indicator */}
        {clients.length > 8 && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            className='flex flex-col items-center space-y-2'
          >
            <div className='w-16 h-16 bg-deep-navy-700 border-2 border-dashed border-electric-cyan-500 rounded-lg flex items-center justify-center'>
              <span className='text-electric-cyan-400 font-bold text-lg'>
                +
              </span>
            </div>
            <div className='text-center'>
              <p className='text-electric-cyan-400 font-medium text-sm'>
                And more
              </p>
              <p className='text-gray-400 text-xs'>{clients.length}+ clients</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Security Badges */}
      <motion.div
        variants={itemVariants}
        className='flex justify-center space-x-6 mt-6 pt-6 border-t border-deep-navy-600'
      >
        <div className='flex items-center space-x-2 text-gray-400'>
          <svg
            className='w-4 h-4 text-electric-cyan-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.152-.262-2.28-.76-3.318z'
            />
          </svg>
          <span className='text-sm'>7+ Years Experience</span>
        </div>

        <div className='flex items-center space-x-2 text-gray-400'>
          <svg
            className='w-4 h-4 text-neon-green-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
            />
          </svg>
          <span className='text-sm'>50+ Projects Completed</span>
        </div>

        <div className='flex items-center space-x-2 text-gray-400'>
          <svg
            className='w-4 h-4 text-electric-cyan-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707v4.586a2 2 0 01-2 2h-2.5a1 1 0 01-.8-.4L12 16.8l-1.7 1.6a1 1 0 01-.8.4H7a2 2 0 01-2-2v6a2 2 0 012-2zm10-10V7a4 4 0 00-8 0v4h8z'
            />
          </svg>
          <span className='text-sm'>99.9% Success Rate</span>
        </div>
      </motion.div>
    </motion.div>
  );
};
