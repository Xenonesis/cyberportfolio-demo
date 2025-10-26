'use client';

import { motion } from 'framer-motion';
import { ShieldIcon } from '@/components/ui/ShieldIcon';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { EXPERIENCE, EDUCATION, SKILLS, SOCIAL_LINKS } from '@/lib/data';
import { PDFResumeGenerator } from '@/components/pdf/PDFResumeGenerator';
import { LinkedInIcon } from '@/components/ui/LinkedInIcon';
import { GitHubIcon } from '@/components/ui/GitHubIcon';

export const About = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className='py-20 bg-navy-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section header */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className='inline-flex items-center space-x-2 bg-navy-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-2 mb-6'>
            <ShieldIcon size='sm' variant='active' color='cyan' animate />
            <span className='text-cyan-400 font-medium text-sm'>About Me</span>
          </div>
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
            Cybersecurity <span className='text-cyan-400'>Expertise</span>
          </h2>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
            With over 7 years of experience in the cybersecurity field, I've
            dedicated my career to protecting organizations from evolving cyber
            threats. My expertise spans from enterprise security architecture to
            incident response and cloud security.
          </p>
          <div className='flex justify-center space-x-6 mt-8'>
            {SOCIAL_LINKS.slice(0, 2).map(social => (
              <motion.a
                key={social.id}
                href={social.url}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors duration-300'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.title}
              >
                <div className='w-6 h-6'>
                  {social.id === 'linkedin' && (
                    <LinkedInIcon size='sm' color='gray' animate />
                  )}
                  {social.id === 'github' && (
                    <GitHubIcon size='sm' color='gray' animate />
                  )}
                </div>
                <span className='text-sm font-medium'>{social.title}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Experience Section */}
        <motion.div variants={itemVariants} className='mb-16'>
          <h3 className='text-2xl font-semibold text-white mb-8 text-center'>
            Professional Experience
          </h3>
          <div className='space-y-6'>
            {EXPERIENCE.slice(0, 2).map(exp => (
              <div
                key={exp.id}
                className='bg-navy-800 border border-navy-700 rounded-lg p-6 hover:border-cyan-500 transition-all duration-300'
              >
                <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-4'>
                  <div>
                    <h4 className='text-lg font-semibold text-white'>
                      {exp.title}
                    </h4>
                    <p className='text-cyan-400'>{exp.company}</p>
                    <p className='text-sm text-gray-400'>{exp.period}</p>
                  </div>
                </div>
                <p className='text-gray-300 mb-4'>{exp.description}</p>
                <div className='flex flex-wrap gap-2'>
                  {exp.technologies.map(tech => (
                    <span
                      key={tech}
                      className='px-2 py-1 bg-cyan-600/20 text-cyan-400 text-xs rounded'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills Preview */}
        <motion.div variants={itemVariants} className='mb-16'>
          <h3 className='text-2xl font-semibold text-white mb-8 text-center'>
            Core Skills
          </h3>
          <div className='grid md:grid-cols-2 gap-6'>
            {SKILLS.slice(0, 4).map(skill => (
              <div
                key={skill.id}
                className='bg-navy-800 border border-navy-700 rounded-lg p-6 hover:border-cyan-500 transition-all duration-300'
              >
                <div className='flex items-center justify-between mb-2'>
                  <h4 className='font-semibold text-white'>{skill.name}</h4>
                  <span className='text-cyan-400 text-sm'>
                    {skill.level}/10
                  </span>
                </div>
                <div className='w-full bg-navy-700 rounded-full h-2 mb-2'>
                  <div
                    className='bg-cyan-500 h-2 rounded-full'
                    style={{ width: `${skill.level * 10}%` }}
                  />
                </div>
                <p className='text-gray-400 text-sm'>{skill.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={itemVariants} className='text-center'>
          <PDFResumeGenerator />
        </motion.div>
      </div>
    </section>
  );
};
