'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaseStudy } from '@/types/caseStudies';
import Image from 'next/image';
import { CaseStudyCard } from './CaseStudyCard';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  caseStudy,
  isOpen,
  onClose,
}) => {
  if (!caseStudy) return null;

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: 50,
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      y: 50,
      transition: { 
        duration: 0.2,
        ease: 'easeIn'
      }
    }
  };

  const getDifficultyColor = (difficulty: CaseStudy['difficultyLevel']) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400';
      case 'intermediate': return 'text-yellow-400';
      case 'advanced': return 'text-orange-400';
      case 'expert': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div 
              className="bg-navy-900 border border-navy-700 rounded-xl max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative h-64 bg-gradient-to-r from-cyan-600 to-neon-green-600">
                {caseStudy.image && (
                  <Image
                    src={caseStudy.image}
                    alt={caseStudy.title}
                    fill
                    className="object-cover opacity-30"
                  />
                )}
                <div className="absolute inset-0 p-6 flex items-end">
                  <div className="flex items-center space-x-3">
                    <h1 className="text-3xl font-bold text-white">
                      {caseStudy.title}
                    </h1>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(caseStudy.difficultyLevel)}`}>
                      {caseStudy.difficultyLevel}
                    </span>
                  </div>
                </div>
                
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Client and Timeline Info */}
                <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                  <div>
                    <span className="text-gray-400 text-sm">Client:</span>
                    <h3 className="text-lg font-semibold text-white">
                      {caseStudy.client.name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {caseStudy.client.industry} • {caseStudy.client.size}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-gray-400 text-sm">Timeline:</span>
                    <p className="text-lg font-semibold text-white">
                      {caseStudy.timeline.duration}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {new Date(caseStudy.timeline.startDate).toLocaleDateString()} - {new Date(caseStudy.timeline.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Project Overview */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Project Overview</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {caseStudy.description}
                  </p>
                  
                  {/* Category Tags */}
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.category.map((category) => (
                      <span
                        key={category}
                        className="px-3 py-1 bg-cyan-600/20 text-cyan-400 text-sm rounded-full"
                      >
                        {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Security Domains */}
                {caseStudy.securityDomain.length > 0 && (
                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4">Security Domains</h3>
                    <div className="flex flex-wrap gap-3">
                      {caseStudy.securityDomain.map((domain) => (
                        <span
                          key={domain}
                          className="px-4 py-2 bg-navy-800 border border-navy-700 rounded-lg text-cyan-400 text-sm"
                        >
                          {domain.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {/* Challenges */}
                {caseStudy.challenges.length > 0 && (
                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4">Challenges</h3>
                    <ul className="space-y-2">
                      {caseStudy.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-300">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Solutions */}
                {caseStudy.solutions.length > 0 && (
                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4">Solutions Implemented</h3>
                    <ul className="space-y-2">
                      {caseStudy.solutions.map((solution, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-300">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Results and Metrics */}
                {caseStudy.results.length > 0 && (
                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4">Results & Impact</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                      {caseStudy.results.map((result) => (
                        <div
                          key={result.id}
                          className="bg-navy-800 border border-navy-700 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-white">{result.title}</h4>
                            {result.icon && (
                              <span className="text-cyan-400">
                                {result.icon}
                              </span>
                            )}
                          </div>
                          <div className="flex items-end space-x-2">
                            <span className="text-2xl font-bold text-neon-green-400">
                              {result.value}
                            </span>
                            <span className="text-gray-400 text-sm">{result.unit}</span>
                          </div>
                          {result.beforeValue !== undefined && result.afterValue !== undefined && (
                            <div className="text-gray-500 text-sm mt-1">
                              From {result.beforeValue} to {result.afterValue}
                            </div>
                          )}
                          <p className="text-gray-400 text-sm mt-2">{result.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Metrics Details */}
                {caseStudy.metrics && caseStudy.metrics.length > 0 && (
                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4">Detailed Metrics</h3>
                    <div className="space-y-4">
                      {caseStudy.metrics.map((metric) => (
                        <div
                          key={metric.id}
                          className="bg-navy-800 border border-navy-700 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-white">{metric.label}</h4>
                              <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <span>Before: {metric.before}</span>
                                <span>After: {metric.after}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`font-semibold ${metric.isPositive ? 'text-neon-green-400' : 'text-red-400'}`}>
                                {metric.improvement}
                              </span>
                              {metric.icon && (
                                <span className="text-cyan-400">
                                  {metric.icon}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Technologies */}
                {caseStudy.technologies.length > 0 && (
                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-navy-800 border border-navy-700 rounded text-gray-300 text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {/* Testimonial */}
                {caseStudy.testimonial && (
                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4">Client Testimonial</h3>
                    <blockquote className="bg-navy-800 border-l-4 border-cyan-500 p-6 rounded-r-lg">
                      <p className="text-gray-300 italic mb-4">"{caseStudy.testimonial.content}"</p>
                      <footer className="text-white font-medium">
                        {caseStudy.testimonial.name}, {caseStudy.testimonial.role}
                      </footer>
                      <div className="flex items-center space-x-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.932c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </blockquote>
                  </section>
                )}

                {/* Compliance */}
                {caseStudy.compliance && caseStudy.compliance.length > 0 && (
                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4">Compliance Achieved</h3>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.compliance.map((compliance) => (
                        <span
                          key={compliance}
                          className="px-3 py-1 bg-green-600/20 text-green-400 border border-green-500/30 rounded text-sm"
                        >
                          {compliance}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-navy-700">
                  <a
                    href={caseStudy.caseStudyUrl || '#'}
                    className="flex-1 bg-cyan-600 text-white text-center px-6 py-3 rounded-lg hover:bg-cyan-500 transition-colors duration-300 font-medium"
                  >
                    View Full Case Study
                  </a>
                  <a
                    href="/contact"
                    className="flex-1 bg-navy-800 border border-cyan-500 text-cyan-400 text-center px-6 py-3 rounded-lg hover:bg-cyan-500/10 transition-colors duration-300 font-medium"
                  >
                    Discuss Similar Project
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};