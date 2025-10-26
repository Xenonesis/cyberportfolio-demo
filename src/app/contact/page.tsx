import { Metadata } from 'next';
import { SITE_CONFIG, SEO_CONFIG } from '@/lib/data';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SecureContactForm } from '@/components/sections/SecureContactForm';

export const metadata: Metadata = {
  title: 'Secure Contact & Consultation - Aditya Kumar Tiwari',
  description:
    'Get in touch with Aditya Kumar Tiwari for cybersecurity consulting with end-to-end encryption and advanced security protection. Schedule a consultation today.',
  keywords: [
    ...SEO_CONFIG.keywords,
    'secure contact',
    'encrypted contact form',
    'cybersecurity consultation',
    'secure messaging',
    'end-to-end encryption',
    'privacy protected',
  ],
  openGraph: {
    title: 'Secure Contact & Consultation - Aditya Kumar Tiwari',
    description:
      'Get in touch with Aditya Kumar Tiwari for cybersecurity consulting with end-to-end encryption and advanced security protection. Schedule a consultation today.',
    images: [
      {
        url: '/images/og-secure-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Secure Contact Form with Encryption',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Secure Contact & Consultation - Aditya Kumar Tiwari',
    description:
      'Get in touch with Aditya Kumar Tiwari for cybersecurity consulting with end-to-end encryption and advanced security protection. Schedule a consultation today.',
    images: ['/images/og-secure-contact.jpg'],
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/contact`,
  },
};

export default function Contact() {
  return (
    <>
      {/* Header with semantic navigation */}
      <Header />

      {/* Main content area */}
      <main className='min-h-screen'>
        {/* Secure Contact Form Section */}
        <section
          aria-labelledby='secure-contact-heading'
          className='py-20 bg-gradient-to-r from-navy-900 via-neon-green-900 to-navy-900'
        >
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-12'>
              <div className='inline-flex items-center space-x-2 bg-navy-800/80 backdrop-blur-sm border border-electric-cyan-500/30 rounded-full px-6 py-2 mb-6'>
                <svg
                  className='w-4 h-4 text-electric-cyan-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 8l7.89 7.89a2 2 0 002.828 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  />
                </svg>
                <span className='text-electric-cyan-400 font-medium text-sm'>
                  Encrypted Communication
                </span>
              </div>
              <h1
                id='secure-contact-heading'
                className='text-5xl md:text-6xl font-bold text-white mb-6'
              >
                Secure <span className='text-electric-cyan-400'>Contact</span> &
                Consultation
              </h1>
              <p className='text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed'>
                Your security is our priority. All communications are protected
                with end-to-end encryption, advanced threat detection, and
                comprehensive privacy safeguards. Contact us with confidence.
              </p>

              {/* Security Badges */}
              <div className='flex flex-wrap justify-center gap-4 text-gray-400'>
                <div className='flex items-center space-x-2'>
                  <svg
                    className='w-4 h-4 text-electric-cyan-400'
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
                  <span>End-to-End Encryption</span>
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
                      d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 4.493a1 1 0 01.293.707v4.586a2 2 0 01-2 2z'
                    />
                  </svg>
                  <span>GDPR Compliant</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <svg
                    className='w-4 h-4 text-electric-cyan-400'
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
                  <span>ISO 27001 Certified</span>
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
                      d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.152-.262-2.28-.76-3.318z'
                    />
                  </svg>
                  <span>99.9% Security Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secure Contact Form Component */}
        <SecureContactForm />

        {/* Security Information Section */}
        <section
          aria-labelledby='security-info-heading'
          className='py-20 bg-navy-800/50'
        >
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='bg-navy-800/80 backdrop-blur-sm border border-electric-cyan-500/30 rounded-2xl p-8 md:p-12'>
              <header className='mb-8'>
                <h2
                  id='security-info-heading'
                  className='text-3xl font-bold text-white mb-4'
                >
                  Security &{' '}
                  <span className='text-electric-cyan-400'>Privacy</span>{' '}
                  Information
                </h2>
                <p className='text-gray-300'>
                  We employ industry-leading security practices to protect your
                  sensitive information and ensure complete privacy throughout
                  our communication process.
                </p>
              </header>

              <div className='grid md:grid-cols-2 gap-8'>
                {/* Security Measures */}
                <div>
                  <h3 className='text-xl font-semibold text-white mb-4'>
                    Security Measures
                  </h3>
                  <ul className='space-y-3 text-gray-400'>
                    <li className='flex items-start space-x-3'>
                      <span className='text-electric-cyan-400 mt-1'>🔒</span>
                      <span>
                        <strong>End-to-End Encryption:</strong> All form
                        submissions are encrypted using AES-256-GCM before
                        transmission
                      </span>
                    </li>
                    <li className='flex items-start space-x-3'>
                      <span className='text-neon-green-400 mt-1'>🛡️</span>
                      <span>
                        <strong>Threat Detection:</strong> Advanced algorithms
                        scan for security threats and malicious content
                      </span>
                    </li>
                    <li className='flex items-start space-x-3'>
                      <span className='text-electric-cyan-400 mt-1'>🔐</span>
                      <span>
                        <strong>Secure Storage:</strong> Encrypted data is
                        stored with zero retention policy for sensitive
                        information
                      </span>
                    </li>
                    <li className='flex items-start space-x-3'>
                      <span className='text-neon-green-400 mt-1'>⚡</span>
                      <span>
                        <strong>Real-time Validation:</strong> Instant security
                        validation and threat assessment
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Privacy Protections */}
                <div>
                  <h3 className='text-xl font-semibold text-white mb-4'>
                    Privacy Protections
                  </h3>
                  <ul className='space-y-3 text-gray-400'>
                    <li className='flex items-start space-x-3'>
                      <span className='text-electric-cyan-400 mt-1'>📋</span>
                      <span>
                        <strong>GDPR Compliance:</strong> Full compliance with
                        European data protection regulations
                      </span>
                    </li>
                    <li className='flex items-start space-x-3'>
                      <span className='text-neon-green-400 mt-1'>🏢</span>
                      <span>
                        <strong>ISO 27001:</strong> Certified information
                        security management system
                      </span>
                    </li>
                    <li className='flex items-start space-x-3'>
                      <span className='text-electric-cyan-400 mt-1'>🔄</span>
                      <span>
                        <strong>Data Minimization:</strong> We only collect
                        essential information needed for consultation
                      </span>
                    </li>
                    <li className='flex items-start space-x-3'>
                      <span className='text-neon-green-400 mt-1'>⏱️</span>
                      <span>
                        <strong>Auto-Delete:</strong> Sensitive data is
                        automatically purged after consultation completion
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Compliance Badges */}
              <div className='mt-8 pt-8 border-t border-navy-700'>
                <h4 className='text-lg font-semibold text-white mb-4'>
                  Compliance & Certifications
                </h4>
                <div className='flex flex-wrap gap-4'>
                  <div className='bg-electric-cyan-500/10 border border-electric-cyan-500/30 rounded-lg px-4 py-2'>
                    <span className='text-electric-cyan-400 font-medium'>
                      🔒 SSL/TLS Encrypted
                    </span>
                  </div>
                  <div className='bg-neon-green-500/10 border border-neon-green-500/30 rounded-lg px-4 py-2'>
                    <span className='text-neon-green-400 font-medium'>
                      📋 GDPR Compliant
                    </span>
                  </div>
                  <div className='bg-electric-cyan-500/10 border border-electric-cyan-500/30 rounded-lg px-4 py-2'>
                    <span className='text-electric-cyan-400 font-medium'>
                      🏢 ISO 27001 Certified
                    </span>
                  </div>
                  <div className='bg-neon-green-500/10 border border-neon-green-500/30 rounded-lg px-4 py-2'>
                    <span className='text-neon-green-400 font-medium'>
                      ⚡ SOC 2 Type II
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section
          aria-labelledby='contact-cta-heading'
          className='py-20 bg-gradient-to-r from-navy-900 via-electric-cyan-900 to-navy-900'
        >
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='bg-navy-800/80 backdrop-blur-sm border border-electric-cyan-500/30 rounded-2xl p-8 md:p-12 text-center'>
              <header className='mb-8'>
                <h2
                  id='contact-cta-heading'
                  className='text-3xl md:text-4xl font-bold text-white mb-4'
                >
                  Ready to Secure Your Organization?
                </h2>
                <p className='text-xl text-gray-300 max-w-2xl mx-auto'>
                  Do not wait for a security incident to take action. Contact me
                  today to discuss your cybersecurity needs and implement
                  proactive protection strategies with complete peace of mind.
                </p>
              </header>

              <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                <a
                  href='#secure-contact-form'
                  className='inline-flex items-center space-x-2 bg-electric-cyan-600 text-navy-900 px-6 py-3 rounded-lg hover:bg-electric-cyan-500 transition-colors duration-300'
                  aria-label='Start secure contact form'
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
                      d='M12 19l9 2-9-17-9 17 9-2zm0 0v-8'
                    />
                  </svg>
                  <span>Start Secure Contact</span>
                </a>
                <a
                  href='tel:+15551234567'
                  className='inline-flex items-center space-x-2 border border-electric-cyan-500 text-electric-cyan-400 px-6 py-3 rounded-lg hover:bg-electric-cyan-500/10 transition-colors duration-300'
                  aria-label='Call +1 (555) 123-4567 for immediate consultation'
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
                      d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                    />
                  </svg>
                  <span>Call Now</span>
                </a>
                <a
                  href='mailto:aditya@cybersecurity.com'
                  className='inline-flex items-center space-x-2 border border-neon-green-500 text-neon-green-400 px-6 py-3 rounded-lg hover:bg-neon-green-500/10 transition-colors duration-300'
                  aria-label='Send secure email to aditya@cybersecurity.com'
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
                      d='M3 8l7.89 7.89a2 2 0 002.828 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                  <span>Send Secure Email</span>
                </a>
              </div>

              {/* Contact Benefits */}
              <div className='flex flex-wrap justify-center gap-6 mt-8 text-gray-400'>
                <div className='flex items-center space-x-2'>
                  <svg
                    className='w-4 h-4 text-electric-cyan-400'
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
                  <span className='text-sm'>24/7 Availability</span>
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
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  <span className='text-sm'>Quick Response</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <svg
                    className='w-4 h-4 text-electric-cyan-400'
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
                  <span className='text-sm'>Expert Consultation</span>
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
                      d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.152-.262-2.28-.76-3.318z'
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
