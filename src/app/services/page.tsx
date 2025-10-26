import { Metadata } from 'next';
import { SITE_CONFIG, SEO_CONFIG, SERVICES } from '@/lib/data';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Cybersecurity Services - Aditya Kumar Tiwari',
  description:
    'Comprehensive cybersecurity services including security assessment, incident response, cloud security, compliance, and security training. Expert protection for your organization.',
  keywords: [
    ...SEO_CONFIG.keywords,
    'services',
    'security assessment',
    'incident response',
    'cloud security',
    'compliance',
    'security training',
  ],
  openGraph: {
    title: 'Cybersecurity Services - Aditya Kumar Tiwari',
    description:
      'Comprehensive cybersecurity services including security assessment, incident response, cloud security, compliance, and security training. Expert protection for your organization.',
    images: [
      {
        url: '/images/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Cybersecurity Services - Aditya Kumar Tiwari',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cybersecurity Services - Aditya Kumar Tiwari',
    description:
      'Comprehensive cybersecurity services including security assessment, incident response, cloud security, compliance, and security training. Expert protection for your organization.',
    images: ['/images/og-services.jpg'],
  },
};

export default function Services() {
  return (
    <>
      {/* Header with semantic navigation */}
      <Header />

      {/* Main content area */}
      <main className='min-h-screen'>
        {/* Hero Section - Services Overview */}
        <section
          aria-labelledby='services-hero-heading'
          className='py-20 bg-gradient-to-r from-navy-900 via-cyan-900 to-navy-900'
        >
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center'>
              <div className='inline-flex items-center space-x-2 bg-navy-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-2 mb-6'>
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
                <span className='text-cyan-400 font-medium text-sm'>
                  Comprehensive Security Solutions
                </span>
              </div>
              <h1
                id='services-hero-heading'
                className='text-5xl md:text-6xl font-bold text-white mb-6'
              >
                Professional{' '}
                <span className='text-cyan-400'>Cybersecurity Services</span>
              </h1>
              <p className='text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed'>
                From vulnerability assessment to incident response, I provide
                end-to-end cybersecurity solutions tailored to your
                organization's specific needs, compliance requirements, and
                threat landscape.
              </p>
              <div className='flex flex-wrap justify-center gap-4 text-gray-400'>
                <div className='flex items-center space-x-2'>
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
                  <span>Custom Solutions</span>
                </div>
                <div className='flex items-center space-x-2'>
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
                      d='M12 15v2m-6 4h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                    />
                  </svg>
                  <span>24/7 Support</span>
                </div>
                <div className='flex items-center space-x-2'>
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
                  <span>99.9% Success Rate</span>
                </div>
                <div className='flex items-center space-x-2'>
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
                  <span>Expert Consultation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Services Section */}
        <section
          aria-labelledby='security-services-heading'
          className='py-20 bg-navy-900'
        >
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <header className='text-center mb-16'>
              <div className='inline-flex items-center space-x-2 bg-navy-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-2 mb-6'>
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
                <span className='text-cyan-400 font-medium text-sm'>
                  Security Services
                </span>
              </div>
              <h2
                id='security-services-heading'
                className='text-4xl md:text-5xl font-bold text-white mb-6'
              >
                Core <span className='text-cyan-400'>Security Services</span>
              </h2>
              <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
                Comprehensive security assessments and protection services
                designed to identify vulnerabilities, prevent attacks, and
                ensure your organization's digital safety.
              </p>
            </header>

            {/* Security Services Grid */}
            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {SERVICES.filter(service =>
                [
                  'security-assessment',
                  'incident-response',
                  'cloud-security',
                ].includes(service.id)
              ).map(service => (
                <article
                  key={service.id}
                  className='bg-navy-800 border border-navy-700 rounded-lg p-8 hover:border-cyan-500 transition-all duration-300'
                  role='article'
                  aria-labelledby={`service-${service.id}-title`}
                >
                  <header className='flex items-start justify-between mb-6'>
                    <div>
                      <h3
                        id={`service-${service.id}-title`}
                        className='text-xl font-semibold text-white mb-2'
                      >
                        {service.title}
                      </h3>
                      <p className='text-gray-400 text-sm leading-relaxed'>
                        {service.description}
                      </p>
                    </div>
                    <div className='w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0'>
                      {service.icon === 'shield-check' && (
                        <svg
                          className='w-6 h-6 text-white'
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
                      )}
                      {service.icon === 'alert-circle' && (
                        <svg
                          className='w-6 h-6 text-white'
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
                      )}
                      {service.icon === 'cloud' && (
                        <svg
                          className='w-6 h-6 text-white'
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
                      )}
                    </div>
                  </header>

                  {/* Features List */}
                  <div className='mb-6'>
                    <h4 className='text-sm font-medium text-gray-300 mb-3'>
                      Key Features:
                    </h4>
                    <ul className='space-y-2'>
                      {service.features.map((feature, index) => (
                        <li
                          key={index}
                          className='flex items-start space-x-2 text-gray-400 text-sm'
                        >
                          <svg
                            className='w-3 h-3 text-cyan-400 mt-1 flex-shrink-0'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            aria-hidden='true'
                          >
                            <path
                              fillRule='evenodd'
                              d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                              clipRule='evenodd'
                            />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Service Details */}
                  <div className='flex items-center justify-between text-sm'>
                    {service.duration && (
                      <div className='text-gray-400'>
                        <span className='font-medium'>Duration:</span>{' '}
                        {service.duration}
                      </div>
                    )}
                    {service.price && (
                      <div className='text-cyan-400 font-medium'>
                        {service.price}
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <footer className='mt-6'>
                    <a
                      href='/contact'
                      className='w-full inline-flex items-center justify-center space-x-2 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-500 transition-colors duration-300 text-sm'
                      aria-label={`Get consultation for ${service.title}`}
                    >
                      <span>Get Consultation</span>
                      <svg
                        className='w-3 h-3'
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
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Consulting Services Section */}
        <section
          aria-labelledby='consulting-services-heading'
          className='py-20 bg-navy-800/50'
        >
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <header className='text-center mb-16'>
              <div className='inline-flex items-center space-x-2 bg-navy-700/80 backdrop-blur-sm border border-neon-green-500/30 rounded-full px-6 py-2 mb-6'>
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
                    d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a7.918 7.918 0 010 5.306m-12.65 0a7.918 7.918 0 010-5.306c.426 1.756 2.924 1.756 3.35 0m12.65 0a7.918 7.918 0 010 5.306c.426 1.756 2.924 1.756 3.35 0M3.123 16.877c.426 1.756 2.924 1.756 3.35 0a7.918 7.918 0 010-5.306c-.426-1.756-2.924-1.756-3.35 0m12.65 0a7.918 7.918 0 010 5.306c.426 1.756 2.924 1.756 3.35 0'
                  />
                </svg>
                <span className='text-neon-green-400 font-medium text-sm'>
                  Consulting Services
                </span>
              </div>
              <h2
                id='consulting-services-heading'
                className='text-4xl md:text-5xl font-bold text-white mb-6'
              >
                Strategic{' '}
                <span className='text-neon-green-400'>Consulting Services</span>
              </h2>
              <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
                Expert guidance and strategic planning to help your organization
                build robust security frameworks, achieve compliance, and
                develop comprehensive security programs.
              </p>
            </header>

            {/* Consulting Services Grid */}
            <div className='grid gap-8 md:grid-cols-2'>
              {SERVICES.filter(service =>
                [
                  'security-consulting',
                  'compliance',
                  'security-training',
                ].includes(service.id)
              ).map(service => (
                <article
                  key={service.id}
                  className='bg-navy-700 border border-navy-600 rounded-lg p-8 hover:border-neon-green-500 transition-all duration-300'
                  role='article'
                  aria-labelledby={`consulting-service-${service.id}-title`}
                >
                  <header className='flex items-start justify-between mb-6'>
                    <div>
                      <h3
                        id={`consulting-service-${service.id}-title`}
                        className='text-xl font-semibold text-white mb-2'
                      >
                        {service.title}
                      </h3>
                      <p className='text-gray-400 text-sm leading-relaxed'>
                        {service.description}
                      </p>
                    </div>
                    <div className='w-12 h-12 bg-neon-green-600 rounded-lg flex items-center justify-center flex-shrink-0'>
                      {service.icon === 'settings' && (
                        <svg
                          className='w-6 h-6 text-white'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          aria-hidden='true'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a7.918 7.918 0 010 5.306m-12.65 0a7.918 7.918 0 010-5.306c.426 1.756 2.924 1.756 3.35 0m12.65 0a7.918 7.918 0 010 5.306c.426 1.756 2.924 1.756 3.35 0M3.123 16.877c.426 1.756 2.924 1.756 3.35 0a7.918 7.918 0 010-5.306c-.426-1.756-2.924-1.756-3.35 0m12.65 0a7.918 7.918 0 010 5.306c.426 1.756 2.924 1.756 3.35 0'
                          />
                        </svg>
                      )}
                      {service.icon === 'file-text' && (
                        <svg
                          className='w-6 h-6 text-white'
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
                      )}
                      {service.icon === 'users' && (
                        <svg
                          className='w-6 h-6 text-white'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          aria-hidden='true'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
                          />
                        </svg>
                      )}
                    </div>
                  </header>

                  {/* Features List */}
                  <div className='mb-6'>
                    <h4 className='text-sm font-medium text-gray-300 mb-3'>
                      Key Features:
                    </h4>
                    <ul className='space-y-2'>
                      {service.features.map((feature, index) => (
                        <li
                          key={index}
                          className='flex items-start space-x-2 text-gray-400 text-sm'
                        >
                          <svg
                            className='w-3 h-3 text-neon-green-400 mt-1 flex-shrink-0'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            aria-hidden='true'
                          >
                            <path
                              fillRule='evenodd'
                              d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                              clipRule='evenodd'
                            />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Service Details */}
                  <div className='flex items-center justify-between text-sm'>
                    {service.duration && (
                      <div className='text-gray-400'>
                        <span className='font-medium'>Duration:</span>{' '}
                        {service.duration}
                      </div>
                    )}
                    {service.price && (
                      <div className='text-neon-green-400 font-medium'>
                        {service.price}
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <footer className='mt-6'>
                    <a
                      href='/contact'
                      className='w-full inline-flex items-center justify-center space-x-2 bg-neon-green-600 text-white px-4 py-2 rounded-lg hover:bg-neon-green-500 transition-colors duration-300 text-sm'
                      aria-label={`Get consultation for ${service.title}`}
                    >
                      <span>Get Consultation</span>
                      <svg
                        className='w-3 h-3'
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
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Security Badges Section */}
        <section
          aria-labelledby='security-badges-heading'
          className='py-20 bg-navy-900'
        >
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <header className='text-center mb-16'>
              <div className='inline-flex items-center space-x-2 bg-navy-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-2 mb-6'>
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
                <span className='text-cyan-400 font-medium text-sm'>
                  Security Credentials
                </span>
              </div>
              <h2
                id='security-badges-heading'
                className='text-4xl md:text-5xl font-bold text-white mb-6'
              >
                Security{' '}
                <span className='text-cyan-400'>Credentials & Badges</span>
              </h2>
              <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
                My services are backed by industry-recognized certifications,
                proven methodologies, and a track record of successful
                implementations across various industries.
              </p>
            </header>

            {/* Security Badges Grid */}
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
              {/* Zero Trust Architecture */}
              <div className='bg-navy-800 border border-navy-700 rounded-lg p-6 text-center'>
                <div className='w-16 h-16 bg-gradient-to-r from-cyan-400 to-neon-green-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg
                    className='w-8 h-8 text-white'
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
                <h3 className='text-lg font-semibold text-white mb-2'>
                  Zero Trust Architecture
                </h3>
                <p className='text-gray-400 text-sm leading-relaxed'>
                  Implement comprehensive Zero Trust frameworks that verify
                  every access request and minimize attack surface.
                </p>
              </div>

              {/* SOC 2 Compliance */}
              <div className='bg-navy-800 border border-navy-700 rounded-lg p-6 text-center'>
                <div className='w-16 h-16 bg-gradient-to-r from-neon-green-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg
                    className='w-8 h-8 text-white'
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
                </div>
                <h3 className='text-lg font-semibold text-white mb-2'>
                  SOC 2 Compliance
                </h3>
                <p className='text-gray-400 text-sm leading-relaxed'>
                  Achieve and maintain SOC 2 Type II compliance with
                  comprehensive audit support.
                </p>
              </div>

              {/* Incident Response */}
              <div className='bg-navy-800 border border-navy-700 rounded-lg p-6 text-center'>
                <div className='w-16 h-16 bg-gradient-to-r from-cyan-400 to-neon-green-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg
                    className='w-8 h-8 text-white'
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
                <h3 className='text-lg font-semibold text-white mb-2'>
                  24/7 Incident Response
                </h3>
                <p className='text-gray-400 text-sm leading-relaxed'>
                  Rapid response to security incidents with forensic analysis
                  and containment.
                </p>
              </div>

              {/* Cloud Security */}
              <div className='bg-navy-800 border border-navy-700 rounded-lg p-6 text-center'>
                <div className='w-16 h-16 bg-gradient-to-r from-neon-green-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg
                    className='w-8 h-8 text-white'
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
                <h3 className='text-lg font-semibold text-white mb-2'>
                  Cloud Security
                </h3>
                <p className='text-gray-400 text-sm leading-relaxed'>
                  Secure your cloud infrastructure with proper configuration and
                  continuous monitoring.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section
          aria-labelledby='services-cta-heading'
          className='py-20 bg-gradient-to-r from-navy-900 via-cyan-900 to-navy-900'
        >
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='bg-navy-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 md:p-12 text-center'>
              <header className='mb-8'>
                <h2
                  id='services-cta-heading'
                  className='text-3xl md:text-4xl font-bold text-white mb-4'
                >
                  Ready to Secure Your Organization?
                </h2>
                <p className='text-xl text-gray-300 max-w-2xl mx-auto'>
                  Choose the right cybersecurity service for your organization's
                  needs and let me help you implement comprehensive security
                  solutions that protect against evolving threats.
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
                  href='/portfolio'
                  className='inline-flex items-center space-x-2 border border-cyan-500 text-cyan-400 px-6 py-3 rounded-lg hover:bg-cyan-500/10 transition-colors duration-300'
                  aria-label='View cybersecurity project case studies'
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
                      d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h8a2 2 0 012 2v2M7 7h10'
                    />
                  </svg>
                  <span>View Case Studies</span>
                </a>
                <a
                  href='/about'
                  className='inline-flex items-center space-x-2 border border-neon-green-500 text-neon-green-400 px-6 py-3 rounded-lg hover:bg-neon-green-500/10 transition-colors duration-300'
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
                      d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                    />
                  </svg>
                  <span>Learn About Me</span>
                </a>
              </div>

              {/* Service Benefits */}
              <div className='flex flex-wrap justify-center gap-6 mt-8 text-gray-400'>
                <div className='flex items-center space-x-2'>
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
                  <span className='text-sm'>99.9% Success Rate</span>
                </div>
                <div className='flex items-center space-x-2'>
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
                      d='M12 15v2m-6 4h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                    />
                  </svg>
                  <span className='text-sm'>24/7 Support Available</span>
                </div>
                <div className='flex items-center space-x-2'>
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
                  <span className='text-sm'>Custom Solutions</span>
                </div>
                <div className='flex items-center space-x-2'>
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
                  <span className='text-sm'>Expert Consultation</span>
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
