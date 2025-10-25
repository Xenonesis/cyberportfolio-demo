'use client';

import { LazySkillsMatrix } from '@/components/sections/LazySkillsMatrix';
import { SEO } from '@/components/shared/SEO';
import { motion } from 'framer-motion';

const SkillsPage = () => {
  // Animation variants for page content
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 150,
        damping: 20,
        duration: 0.6,
      },
    },
  };

  return (
    <>
      <SEO
        title="Skills Matrix - Aditya Kumar Tiwari Cybersecurity Portfolio"
        description="Comprehensive display of cybersecurity and development skills with detailed proficiency levels and expertise across security tools, programming languages, and technologies."
        keywords={[
          'cybersecurity skills',
          'development skills',
          'skills matrix',
          'technical expertise',
          'security tools',
          'programming languages',
          'proficiency levels',
          'skill assessment',
          'Aditya Kumar Tiwari skills'
        ]}
      />
      
      <motion.main
        className="min-h-screen bg-deep-navy-900 text-white"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        {/* Hero Section */}
        <motion.section 
          className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
          variants={contentVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-deep-navy-800 to-security-gray-900 opacity-50"></div>
          <div className="relative max-w-7xl mx-auto text-center">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-electric-cyan-400 to-neon-green-400 bg-clip-text text-transparent"
              variants={contentVariants}
            >
              Skills Matrix
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
              variants={contentVariants}
            >
              A comprehensive display of my technical expertise across cybersecurity and development domains, showcasing proficiency levels and real-world experience with industry-standard tools and technologies.
            </motion.p>
            
            {/* Skills Overview Stats */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12"
              variants={contentVariants}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-electric-cyan-400 mb-1">50+</div>
                <div className="text-gray-400 text-sm">Security Tools</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-green-400 mb-1">30+</div>
                <div className="text-gray-400 text-sm">Programming Skills</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">8+</div>
                <div className="text-gray-400 text-sm">Expert Level</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">95%</div>
                <div className="text-gray-400 text-sm">Avg Proficiency</div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Skills Matrix Section */}
        <motion.section 
          className="py-16 px-4 sm:px-6 lg:px-8"
          variants={contentVariants}
        >
          <div className="max-w-7xl mx-auto">
            <LazySkillsMatrix />
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section 
          className="py-16 px-4 sm:px-6 lg:px-8 bg-security-gray-800/50"
          variants={contentVariants}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
              variants={contentVariants}
            >
              Ready to Secure Your Organization?
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
              variants={contentVariants}
            >
              With my comprehensive skill set in cybersecurity and development, I can help protect your organization from evolving threats while building secure, scalable solutions.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={contentVariants}
            >
              <motion.a
                href="/contact"
                className="px-6 py-3 bg-electric-cyan-500 hover:bg-electric-cyan-400 text-white font-medium rounded-lg transition-colors duration-300 text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
              <motion.a
                href="/portfolio"
                className="px-6 py-3 bg-security-gray-700 hover:bg-security-gray-600 text-white font-medium rounded-lg transition-colors duration-300 text-center border border-security-gray-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Portfolio
              </motion.a>
            </motion.div>
          </div>
        </motion.section>
      </motion.main>
    </>
  );
};

export default SkillsPage;