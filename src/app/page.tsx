import Image from 'next/image';
import { Metadata } from 'next';
import { SITE_CONFIG, SEO_CONFIG } from '@/lib/data';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';

export const metadata: Metadata = {
  title: SEO_CONFIG.title,
  description: SEO_CONFIG.description,
  keywords: SEO_CONFIG.keywords,
  openGraph: {
    title: SEO_CONFIG.title,
    description: SEO_CONFIG.description,
    images: [
      {
        url: SEO_CONFIG.image,
        width: 1200,
        height: 630,
        alt: 'Aditya Kumar Tiwari - Cybersecurity Expert',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_CONFIG.title,
    description: SEO_CONFIG.description,
    images: [SEO_CONFIG.image],
  },
};

export default function Home() {
  return (
    <>
      {/* Header with semantic navigation */}
      <Header />

      {/* Main content area */}
      <main className='min-h-screen'>
        {/* Hero Section - Primary landing area */}
        <Hero />

        {/* About Section - Professional introduction */}
        <About />

        {/* Services Preview Section */}
        <section
          aria-labelledby='services-preview-heading'
          className='py-20 bg-navy-800/50'
        >
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <header className='text-center mb-16'>
              <div className='inline-flex items-center space-x-2 bg-navy-700/80 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-2 mb-6'>
                <svg
                  className='w-4 h-4 text-cyan-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 100 4m-6 8a2 2 0 100-4m0 0a2 2 0 000-4m0 4h12m-12 0h12m-12 0a2 2 0 00-2 2m0 0a2 2 0 002 2m0 0h2a2 2 0 002-2m0 0a2 2 0 00-2-2m10 0a2 2 0 00-2-2m0 0a2 2 0 002-2m0 0h2a2 2 0 002 2m0 0a2 2 0 00-2 2m-12 0h12'
                  />
                </svg>
                <span className='text-cyan-400 font-medium text-sm'>
                  Services Overview
                </span>
              </div>
              <h2
                id='services-preview-heading'
                className='text-4xl md:text-5xl font-bold text-white mb-6'
              >
                Comprehensive{' '}
                <span className='text-cyan-400'>Security Services</span>
              </h2>
              <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
                From vulnerability assessment to incident response, I provide
                end-to-end cybersecurity solutions tailored to your
                organization's specific needs and compliance requirements.
              </p>
            </header>

            {/* Services Grid */}
            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {/* Security Assessment Card */}
              <article
                className='bg-navy-700 border border-navy-600 rounded-lg p-6 hover:border-cyan-500 transition-all duration-300'
                role='article'
              >
                <header className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-white'>
                    Security Assessment
                  </h3>
                  <div className='w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center'>
                    <svg
                      className='w-4 h-4 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707v4.586a2 2 0 01-2 2z'
                      />
                    </svg>
                  </div>
                </header>
                <p className='text-gray-400 text-sm mb-4 leading-relaxed'>
                  Comprehensive evaluation of your organization's security
                  posture including vulnerability scanning, penetration testing,
                  and risk assessment.
                </p>
                <ul className='text-gray-400 text-sm space-y-1 mb-4'>
                  <li className='flex items-start space-x-2'>
                    <div className='w-1 h-1 bg-cyan-400 rounded-full mt-2 flex-shrink-0' />
                    <span>External and internal vulnerability assessment</span>
                  </li>
                  <li className='flex items-start space-x-2'>
                    <div className='w-1 h-1 bg-cyan-400 rounded-full mt-2 flex-shrink-0' />
                    <span>Web application security testing</span>
                  </li>
                  <li className='flex items-start space-x-2'>
                    <div className='w-1 h-1 bg-cyan-400 rounded-full mt-2 flex-shrink-0' />
                    <span>
                      Detailed findings report with remediation guidance
                    </span>
                  </li>
                </ul>
                <footer>
                  <a
                    href='/services'
                    className='text-cyan-400 hover:text-white transition-colors duration-300 text-sm font-medium'
                    aria-label='Learn more about Security Assessment services'
                  >
                    Learn More →
                  </a>
                </footer>
              </article>

              {/* Incident Response Card */}
              <article
                className='bg-navy-700 border border-navy-600 rounded-lg p-6 hover:border-neon-green-500 transition-all duration-300'
                role='article'
              >
                <header className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-white'>
                    Incident Response
                  </h3>
                  <div className='w-8 h-8 bg-neon-green-600 rounded-lg flex items-center justify-center'>
                    <svg
                      className='w-4 h-4 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.822-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z'
                      />
                    </svg>
                  </div>
                </header>
                <p className='text-gray-400 text-sm mb-4 leading-relaxed'>
                  Rapid response to security incidents with forensic analysis,
                  containment, and recovery planning.
                </p>
                <ul className='text-gray-400 text-sm space-y-1 mb-4'>
                  <li className='flex items-start space-x-2'>
                    <div className='w-1 h-1 bg-neon-green-600 rounded-full mt-2 flex-shrink-0' />
                    <span>24/7 incident response hotline</span>
                  </li>
                  <li className='flex items-start space-x-2'>
                    <div className='w-1 h-1 bg-neon-green-600 rounded-full mt-2 flex-shrink-0' />
                    <span>Digital forensics and evidence collection</span>
                  </li>
                  <li className='flex items-start space-x-2'>
                    <div className='w-1 h-1 bg-neon-green-600 rounded-full mt-2 flex-shrink-0' />
                    <span>Business continuity planning</span>
                  </li>
                </ul>
                <footer>
                  <a
                    href='/services'
                    className='text-neon-green-400 hover:text-white transition-colors duration-300 text-sm font-medium'
                    aria-label='Learn more about Incident Response services'
                  >
                    Learn More →
                  </a>
                </footer>
              </article>

              {/* Cloud Security Card */}
              <article
                className='bg-navy-700 border border-navy-600 rounded-lg p-6 hover:border-cyan-500 transition-all duration-300'
                role='article'
              >
                <header className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-white'>
                    Cloud Security
                  </h3>
                  <div className='w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center'>
                    <svg
                      className='w-4 h-4 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.97V10h1a2 2 0 012 2v4a2 2 0 01-2 2h-2.5a1 1 0 01-.8-.4L12 16.8l-1.7 1.6a1 1 0 01-.8.4H7a2 2 0 01-2-2v-4a2 2 0 012-2h1zm0 0a3 3 0 003 3h6a3 3 0 003-3V8a3 3 0 00-3-3H7a3 3 0 00-3 3v8z'
                      />
                    </svg>
                  </div>
                </header>
                <p className='text-gray-400 text-sm mb-4 leading-relaxed'>
                  Secure your cloud infrastructure with Zero Trust principles,
                  proper configuration, and continuous monitoring.
                </p>
                <ul className='text-gray-400 text-sm space-y-1 mb-4'>
                  <li className='flex items-start space-x-2'>
                    <div className='w-1 h-1 bg-cyan-400 rounded-full mt-2 flex-shrink-0' />
                    <span>Cloud security assessment and hardening</span>
                  </li>
                  <li className='flex items-start space-x-2'>
                    <div className='w-1 h-1 bg-cyan-400 rounded-full mt-2 flex-shrink-0' />
                    <span>Zero Trust architecture implementation</span>
                  </li>
                  <li className='flex items-start space-x-2'>
                    <div className='w-1 h-1 bg-cyan-400 rounded-full mt-2 flex-shrink-0' />
                    <span>Continuous monitoring and alerting</span>
                  </li>
                </ul>
                <footer>
                  <a
                    href='/services'
                    className='text-cyan-400 hover:text-white transition-colors duration-300 text-sm font-medium'
                    aria-label='Learn more about Cloud Security services'
                  >
                    Learn More →
                  </a>
                </footer>
              </article>
            </div>

            {/* Services CTA */}
            <div className='text-center mt-12'>
              <a
                href='/services'
                className='inline-flex items-center space-x-2 bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-500 transition-colors duration-300'
                aria-label='View all cybersecurity services'
              >
                <span>View All Services</span>
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 8l4 4m0 0l-4 4m4-4H3'
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Portfolio Preview Section */}
        <section
          aria-labelledby='portfolio-preview-heading'
          className='py-20 bg-navy-900'
        >
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <header className='text-center mb-16'>
              <div className='inline-flex items-center space-x-2 bg-navy-800/80 backdrop-blur-sm border border-neon-green-500/30 rounded-full px-6 py-2 mb-6'>
                <svg
                  className='w-4 h-4 text-neon-green-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h8a2 2 0 012 2v2M7 7h10'
                  />
                </svg>
                <span className='text-neon-green-400 font-medium text-sm'>
                  Recent Projects
                </span>
              </div>
              <h2
                id='portfolio-preview-heading'
                className='text-4xl md:text-5xl font-bold text-white mb-6'
              >
                Proven{' '}
                <span className='text-neon-green-400'>Security Results</span>
              </h2>
              <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
                Explore successful cybersecurity implementations that have
                protected organizations and prevented potential breaches.
              </p>
            </header>

            {/* Portfolio Grid */}
            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {/* Project 1: Enterprise Security Overhaul */}
              <article
                className='bg-navy-800 border border-navy-700 rounded-lg overflow-hidden hover:border-neon-green-500 transition-all duration-300'
                role='article'
              >
                <div className='relative h-48 bg-gradient-to-r from-cyan-600 to-neon-green-600'>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <svg
                      className='w-12 h-12 text-white opacity-20'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={1}
                        d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.152-.262-2.28-.76-3.318z'
                      />
                    </svg>
                  </div>
                </div>
                <div className='p-6'>
                  <header className='mb-4'>
                    <h3 className='text-lg font-semibold text-white mb-2'>
                      Enterprise Security Overhaul
                    </h3>
                    <p className='text-sm text-gray-400'>
                      Complete security transformation for Fortune 500 company
                    </p>
                  </header>
                  <p className='text-gray-400 text-sm mb-4 leading-relaxed'>
                    Led a comprehensive security transformation implementing
                    Zero Trust architecture and reducing security incidents by
                    75%.
                  </p>
                  <div className='flex flex-wrap gap-2 mb-4'>
                    <span className='px-2 py-1 bg-cyan-600/20 text-cyan-400 text-xs rounded'>
                      Zero Trust
                    </span>
                    <span className='px-2 py-1 bg-neon-green-600/20 text-neon-green-400 text-xs rounded'>
                      Enterprise
                    </span>
                    <span className='px-2 py-1 bg-navy-600 text-gray-400 text-xs rounded'>
                      Incident Response
                    </span>
                  </div>
                  <footer>
                    <a
                      href='/portfolio'
                      className='text-neon-green-400 hover:text-white transition-colors duration-300 text-sm font-medium'
                      aria-label='View Enterprise Security Overhaul case study'
                    >
                      View Case Study →
                    </a>
                  </footer>
                </div>
              </article>

              {/* Project 2: Cloud Migration Security */}
              <article
                className='bg-navy-800 border border-navy-700 rounded-lg overflow-hidden hover:border-cyan-500 transition-all duration-300'
                role='article'
              >
                <div className='relative h-48 bg-gradient-to-r from-navy-700 to-cyan-600'>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <svg
                      className='w-12 h-12 text-white opacity-20'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={1}
                        d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.97V10h1a2 2 0 012 2v4a2 2 0 01-2 2h-2.5a1 1 0 01-.8-.4L12 16.8l-1.7 1.6a1 1 0 01-.8.4H7a2 2 0 01-2-2v-4a2 2 0 012-2h1zm0 0a3 3 0 003 3h6a3 3 0 003-3V8a3 3 0 00-3-3H7a3 3 0 00-3 3v8z'
                      />
                    </svg>
                  </div>
                </div>
                <div className='p-6'>
                  <header className='mb-4'>
                    <h3 className='text-lg font-semibold text-white mb-2'>
                      Cloud Migration Security
                    </h3>
                    <p className='text-sm text-gray-400'>
                      Secure cloud migration for healthcare provider
                    </p>
                  </header>
                  <p className='text-gray-400 text-sm mb-4 leading-relaxed'>
                    Designed and implemented security controls ensuring HIPAA
                    compliance and patient data protection during AWS migration.
                  </p>
                  <div className='flex flex-wrap gap-2 mb-4'>
                    <span className='px-2 py-1 bg-cyan-600/20 text-cyan-400 text-xs rounded'>
                      Cloud Security
                    </span>
                    <span className='px-2 py-1 bg-neon-green-600/20 text-neon-green-400 text-xs rounded'>
                      Healthcare
                    </span>
                    <span className='px-2 py-1 bg-navy-600 text-gray-400 text-xs rounded'>
                      Compliance
                    </span>
                  </div>
                  <footer>
                    <a
                      href='/portfolio'
                      className='text-cyan-400 hover:text-white transition-colors duration-300 text-sm font-medium'
                      aria-label='View Cloud Migration Security case study'
                    >
                      View Case Study →
                    </a>
                  </footer>
                </div>
              </article>

              {/* Project 3: Financial Institution Penetration Test */}
              <article
                className='bg-navy-800 border border-navy-700 rounded-lg overflow-hidden hover:border-neon-green-500 transition-all duration-300'
                role='article'
              >
                <div className='relative h-48 bg-gradient-to-r from-gray-700 to-cyan-600'>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <svg
                      className='w-12 h-12 text-white opacity-20'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={1}
                        d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                      />
                    </svg>
                  </div>
                </div>
                <div className='p-6'>
                  <header className='mb-4'>
                    <h3 className='text-lg font-semibold text-white mb-2'>
                      Financial Institution Penetration Test
                    </h3>
                    <p className='text-sm text-gray-400'>
                      Comprehensive security assessment for bank
                    </p>
                  </header>
                  <p className='text-gray-400 text-sm mb-4 leading-relaxed'>
                    Conducted extensive penetration testing identifying critical
                    vulnerabilities and providing actionable remediation
                    guidance.
                  </p>
                  <div className='flex flex-wrap gap-2 mb-4'>
                    <span className='px-2 py-1 bg-cyan-600/20 text-cyan-400 text-xs rounded'>
                      Penetration Testing
                    </span>
                    <span className='px-2 py-1 bg-neon-green-600/20 text-neon-green-400 text-xs rounded'>
                      Financial
                    </span>
                    <span className='px-2 py-1 bg-navy-600 text-gray-400 text-xs rounded'>
                      Vulnerability Assessment
                    </span>
                  </div>
                  <footer>
                    <a
                      href='/portfolio'
                      className='text-neon-green-400 hover:text-white transition-colors duration-300 text-sm font-medium'
                      aria-label='View Financial Institution Penetration Test case study'
                    >
                      View Case Study →
                    </a>
                  </footer>
                </div>
              </article>
            </div>

            {/* Portfolio CTA */}
            <div className='text-center mt-12'>
              <a
                href='/portfolio'
                className='inline-flex items-center space-x-2 bg-neon-green-600 text-white px-6 py-3 rounded-lg hover:bg-neon-green-500 transition-colors duration-300'
                aria-label='View full portfolio of cybersecurity projects'
              >
                <span>View Full Portfolio</span>
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 8l4 4m0 0l-4 4m4-4H3'
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          aria-labelledby='testimonials-heading'
          className='py-20 bg-navy-800/30'
        >
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <header className='text-center mb-16'>
              <div className='inline-flex items-center space-x-2 bg-navy-700/80 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-2 mb-6'>
                <svg
                  className='w-4 h-4 text-cyan-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.477 8-10 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.477-8 10-8s10 3.582 10 8z'
                  />
                </svg>
                <span className='text-cyan-400 font-medium text-sm'>
                  Client Testimonials
                </span>
              </div>
              <h2
                id='testimonials-heading'
                className='text-4xl md:text-5xl font-bold text-white mb-6'
              >
                Trusted by{' '}
                <span className='text-cyan-400'>Industry Leaders</span>
              </h2>
              <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
                Hear from executives and security professionals who have
                benefited from my cybersecurity expertise.
              </p>
            </header>

            {/* Testimonials Grid */}
            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {/* Testimonial 1 */}
              <blockquote
                className='bg-navy-700 border border-navy-600 rounded-lg p-6'
                cite='https://example.com/testimonial1'
              >
                <div className='flex items-center space-x-4 mb-4'>
                  <div className='w-12 h-12 bg-gradient-to-r from-cyan-400 to-neon-green-600 rounded-full flex items-center justify-center'>
                    <span className='text-white font-semibold'>SJ</span>
                  </div>
                  <div>
                    <cite className='text-white font-semibold'>
                      Sarah Johnson
                    </cite>
                    <p className='text-gray-400 text-sm'>
                      CEO, TechManufacture Inc.
                    </p>
                  </div>
                </div>
                <p className='text-gray-300 mb-4 leading-relaxed'>
                  "Aditya transformed our security posture completely. His
                  expertise in Zero Trust architecture and incident response
                  saved our company from potential catastrophic breaches. The
                  75% reduction in security incidents speaks volumes about his
                  capabilities."
                </p>
                <div className='flex space-x-1'>
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className='w-4 h-4 text-yellow-400'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      aria-hidden='true'
                    >
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.932c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                    </svg>
                  ))}
                </div>
              </blockquote>

              {/* Testimonial 2 */}
              <blockquote
                className='bg-navy-700 border border-navy-600 rounded-lg p-6'
                cite='https://example.com/testimonial2'
              >
                <div className='flex items-center space-x-4 mb-4'>
                  <div className='w-12 h-12 bg-gradient-to-r from-neon-green-400 to-cyan-400 rounded-full flex items-center justify-center'>
                    <span className='text-white font-semibold'>MC</span>
                  </div>
                  <div>
                    <cite className='text-white font-semibold'>
                      Dr. Michael Chen
                    </cite>
                    <p className='text-gray-400 text-sm'>
                      CTO, HealthCare Plus
                    </p>
                  </div>
                </div>
                <p className='text-gray-300 mb-4 leading-relaxed'>
                  "Working with Aditya on our cloud migration was exceptional.
                  His deep understanding of HIPAA compliance and AWS security
                  ensured our patient data remained protected throughout the
                  transition. His strategic approach and attention to detail are
                  unmatched."
                </p>
                <div className='flex space-x-1'>
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className='w-4 h-4 text-yellow-400'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      aria-hidden='true'
                    >
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.932c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                    </svg>
                  ))}
                </div>
              </blockquote>

              {/* Testimonial 3 */}
              <blockquote
                className='bg-navy-700 border border-navy-600 rounded-lg p-6'
                cite='https://example.com/testimonial3'
              >
                <div className='flex items-center space-x-4 mb-4'>
                  <div className='w-12 h-12 bg-gradient-to-r from-cyan-400 to-neon-green-600 rounded-full flex items-center justify-center'>
                    <span className='text-white font-semibold'>LR</span>
                  </div>
                  <div>
                    <cite className='text-white font-semibold'>
                      Lisa Rodriguez
                    </cite>
                    <p className='text-gray-400 text-sm'>
                      Security Director, Global Bank Corp.
                    </p>
                  </div>
                </div>
                <p className='text-gray-300 mb-4 leading-relaxed'>
                  "Aditya's penetration testing revealed critical
                  vulnerabilities we never knew existed. His comprehensive
                  report and remediation guidance have significantly
                  strengthened our security program. His professionalism and
                  expertise are top-notch."
                </p>
                <div className='flex space-x-1'>
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className='w-4 h-4 text-yellow-400'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      aria-hidden='true'
                    >
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.932c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                    </svg>
                  ))}
                </div>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section
          aria-labelledby='cta-heading'
          className='py-20 bg-gradient-to-r from-navy-900 via-cyan-900 to-navy-900'
        >
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='bg-navy-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 md:p-12 text-center'>
              <header className='mb-8'>
                <h2
                  id='cta-heading'
                  className='text-3xl md:text-4xl font-bold text-white mb-4'
                >
                  Ready to Secure Your Organization?
                </h2>
                <p className='text-xl text-gray-300 max-w-2xl mx-auto'>
                  Let's discuss how I can help protect your digital assets and
                  implement comprehensive cybersecurity solutions tailored to
                  your needs.
                </p>
              </header>

              <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                <a
                  href='/contact'
                  className='inline-flex items-center space-x-2 bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-500 transition-colors duration-300'
                  aria-label='Schedule a cybersecurity consultation'
                >
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 8v6a2 2 0 002 2h8a2 2 0 002-2v-6m-6 0V9a2 2 0 012-2h4a2 2 0 012 2v7h-4m-6-9h8M8 19l4-4 4 4M0 20h24'
                    />
                  </svg>
                  <span>Schedule Consultation</span>
                </a>
                <a
                  href='/about'
                  className='inline-flex items-center space-x-2 border border-cyan-500 text-cyan-400 px-6 py-3 rounded-lg hover:bg-cyan-500/10 transition-colors duration-300'
                  aria-label='Learn more about cybersecurity expertise'
                >
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  <span>Learn More About Me</span>
                </a>
              </div>

              {/* Security Badges */}
              <div className='flex flex-wrap justify-center gap-4 mt-8'>
                <div className='flex items-center space-x-2 text-gray-400'>
                  <svg
                    className='w-4 h-4 text-cyan-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
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
                    aria-hidden='true'
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
                    className='w-4 h-4 text-cyan-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707v4.586a2 2 0 01-2 2z'
                    />
                  </svg>
                  <span className='text-sm'>99.9% Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer with semantic structure */}
      <Footer />
    </>
  );
}
