import { Metadata } from 'next';
import { SITE_CONFIG, SEO_CONFIG } from '@/lib/data';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// Sample certifications data - in a real implementation, this would come from a database
const CERTIFICATIONS = [
  {
    id: 'cissp',
    title: 'Certified Information Systems Security Professional (CISSP)',
    issuingOrganization: 'ISC²',
    issuedDate: '2020-05-15',
    expirationDate: '2025-05-15',
    credentialId: 'CISSP-12345678',
    description:
      'CISSP is the premier certification for experienced security practitioners, managers, and executives interested in proving their knowledge across a wide array of security practices.',
    verificationUrl: 'https://www.isc2.org/credentials/CISSP',
    skills: [
      'Security and Risk Management',
      'Asset Security',
      'Security Architecture',
      'Communication and Network Security',
      'Identity and Access Management',
      'Security Assessment',
      'Security Operations',
      'Software Development Security',
    ],
    status: 'active',
  },
  {
    id: 'cisa',
    title: 'Certified Information Systems Auditor (CISA)',
    issuingOrganization: 'ISACA',
    issuedDate: '2019-11-20',
    expirationDate: '2024-11-20',
    credentialId: 'CISA-87654321',
    description:
      'CISA is globally recognized as the standard of achievement for IS audit, control, and security professionals.',
    verificationUrl: 'https://www.isaca.org/credentialing/cisa',
    skills: [
      'Information System Auditing Process',
      'Governance and Management',
      'Information Systems Acquisition',
      'Operations and Business Resilience',
      'Protection of Information Assets',
    ],
    status: 'active',
  },
  {
    id: 'ceh',
    title: 'Certified Ethical Hacker (CEH)',
    issuingOrganization: 'EC-Council',
    issuedDate: '2021-03-10',
    expirationDate: '2026-03-10',
    credentialId: 'CEH-11223344',
    description:
      'CEH provides an advanced understanding of ethical hacking, penetration testing, and security assessment methodologies.',
    verificationUrl:
      'https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/',
    skills: [
      'Ethical Hacking Fundamentals',
      'Footprinting and Reconnaissance',
      'Scanning Networks',
      'Enumeration',
      'Vulnerability Analysis',
      'System Hacking',
      'Malware Threats',
      'Social Engineering',
    ],
    status: 'active',
  },
  {
    id: 'aws-security-specialty',
    title: 'AWS Certified Security - Specialty',
    issuingOrganization: 'Amazon Web Services',
    issuedDate: '2022-01-25',
    expirationDate: '2025-01-25',
    credentialId: 'AWS-S-SEC-55667788',
    description:
      'Validates expertise in securing AWS workloads and services, including data protection, access control, and incident response.',
    verificationUrl:
      'https://aws.amazon.com/certification/certified-security-specialty/',
    skills: [
      'Data Protection',
      'Infrastructure Security',
      'Incident Response',
      'Identity and Access Management',
      'Logging and Monitoring',
      'Security Automation',
    ],
    status: 'active',
  },
  {
    id: 'azure-security-engineer',
    title: 'Microsoft Certified: Azure Security Engineer Associate',
    issuingOrganization: 'Microsoft',
    issuedDate: '2022-06-15',
    expirationDate: '2025-06-15',
    credentialId: 'AZ-500-99887766',
    description:
      'Validates skills in implementing security controls and threat protection, managing identity and access, and protecting data, applications, and networks in Azure.',
    verificationUrl:
      'https://learn.microsoft.com/en-us/certifications/azure-security-engineer/',
    skills: [
      'Identity and Access Management',
      'Platform Protection',
      'Security Operations',
      'Data and Applications Protection',
    ],
    status: 'active',
  },
  {
    id: 'gcp-security-engineer',
    title: 'Google Cloud Professional Security Engineer',
    issuingOrganization: 'Google Cloud',
    issuedDate: '2023-02-01',
    expirationDate: '2026-02-01',
    credentialId: 'GCP-SEC-11223344',
    description:
      'Demonstrates ability to design, implement, and manage security solutions on Google Cloud Platform.',
    verificationUrl:
      'https://cloud.google.com/certification/cloud-security-engineer',
    skills: [
      'Security Planning',
      'Threat Protection',
      'Data Protection',
      'Incident Response',
      'Identity Management',
      'Network Security',
    ],
    status: 'active',
  },
];

const TRAINING_HISTORY = [
  {
    id: 'zero-trust-fundamentals',
    title: 'Zero Trust Architecture Fundamentals',
    provider: 'SANS Institute',
    date: '2023-11-15',
    duration: '40 hours',
    description:
      'Comprehensive training on Zero Trust principles, implementation strategies, and practical deployment techniques.',
    skills: [
      'Zero Trust Architecture',
      'Identity Verification',
      'Micro-segmentation',
      'Continuous Monitoring',
    ],
  },
  {
    id: 'incident-response-advanced',
    title: 'Advanced Incident Response Techniques',
    provider: 'SANS Institute',
    date: '2023-08-20',
    duration: '32 hours',
    description:
      'Advanced techniques for incident detection, analysis, containment, and recovery in modern enterprise environments.',
    skills: [
      'Incident Detection',
      'Forensic Analysis',
      'Threat Hunting',
      'Recovery Strategies',
    ],
  },
  {
    id: 'cloud-security-architect',
    title: 'Cloud Security Architecture',
    provider: 'AWS Training',
    date: '2023-05-10',
    duration: '24 hours',
    description:
      'Designing and implementing secure cloud architectures across multiple cloud providers.',
    skills: [
      'Cloud Architecture',
      'Security Design',
      'Multi-cloud Security',
      'Compliance Frameworks',
    ],
  },
  {
    id: 'threat-intelligence',
    title: 'Threat Intelligence and Analysis',
    provider: 'Coursera',
    date: '2023-02-15',
    duration: '28 hours',
    description:
      'Understanding threat actors, attack patterns, and implementing proactive defense strategies.',
    skills: [
      'Threat Analysis',
      'Intelligence Gathering',
      'Risk Assessment',
      'Proactive Defense',
    ],
  },
];

export const metadata: Metadata = {
  title: 'Certifications - Aditya Kumar Tiwari',
  description:
    "View Aditya Kumar Tiwari's cybersecurity certifications including CISSP, CISA, CEH, AWS Security Specialty, and other industry-recognized credentials.",
  keywords: [
    ...SEO_CONFIG.keywords,
    'certifications',
    'CISSP',
    'CISA',
    'CEH',
    'AWS Security',
    'Azure Security',
    'Google Cloud Security',
    'professional credentials',
  ],
  openGraph: {
    title: 'Certifications - Aditya Kumar Tiwari',
    description:
      "View Aditya Kumar Tiwari's cybersecurity certifications including CISSP, CISA, CEH, AWS Security Specialty, and other industry-recognized credentials.",
    images: [
      {
        url: '/images/og-certifications.jpg',
        width: 1200,
        height: 630,
        alt: 'Cybersecurity Certifications - Aditya Kumar Tiwari',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Certifications - Aditya Kumar Tiwari',
    description:
      "View Aditya Kumar Tiwari's cybersecurity certifications including CISSP, CISA, CEH, AWS Security Specialty, and other industry-recognized credentials.",
    images: ['/images/og-certifications.jpg'],
  },
};

export default function Certifications() {
  return (
    <>
      {/* Header with semantic navigation */}
      <Header />

      {/* Main content area */}
      <main className='min-h-screen'>
        {/* Hero Section - Certifications Overview */}
        <section
          aria-labelledby='certifications-hero-heading'
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
                  Professional Credentials
                </span>
              </div>
              <h1
                id='certifications-hero-heading'
                className='text-5xl md:text-6xl font-bold text-white mb-6'
              >
                Professional{' '}
                <span className='text-cyan-400'>Certifications</span>
              </h1>
              <p className='text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed'>
                Industry-recognized cybersecurity certifications and credentials
                that validate my expertise in security architecture, incident
                response, cloud security, and compliance frameworks.
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
                      d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.152-.262-2.28-.76-3.318z'
                    />
                  </svg>
                  <span>ISC² CISSP Certified</span>
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
                  <span>AWS Security Specialty</span>
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
                      d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                    />
                  </svg>
                  <span>Microsoft Azure Security</span>
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
                      d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.97V10h1a2 2 0 012 2v4a2 2 0 01-2 2h-2.5a1 1 0 01-.8-.4L12 16.8l-1.7 1.6a1 1 0 01-.8.4H7a2 2 0 01-2-2v-4a2 2 0 012-2h1zm0 0a3 3 0 003 3h6a3 3 0 003-3V8a3 3 0 00-3-3H7a3 3 0 00-3 3v8z'
                    />
                  </svg>
                  <span>Google Cloud Security</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Credential Display Section */}
        <section
          aria-labelledby='credentials-heading'
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
                  Current Credentials
                </span>
              </div>
              <h2
                id='credentials-heading'
                className='text-4xl md:text-5xl font-bold text-white mb-6'
              >
                Current <span className='text-cyan-400'>Credentials</span>
              </h2>
              <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
                Active certifications that demonstrate my commitment to
                maintaining the highest standards of cybersecurity expertise and
                staying current with industry best practices.
              </p>
            </header>

            {/* Certifications Grid */}
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {CERTIFICATIONS.map(cert => (
                <article
                  key={cert.id}
                  className='bg-navy-800 border border-navy-700 rounded-lg p-6 hover:border-cyan-500 transition-all duration-300'
                  role='article'
                  aria-labelledby={`cert-${cert.id}-title`}
                >
                  <header className='flex items-start justify-between mb-4'>
                    <div>
                      <h3
                        id={`cert-${cert.id}-title`}
                        className='text-lg font-semibold text-white mb-2'
                      >
                        {cert.title}
                      </h3>
                      <p className='text-cyan-400 font-medium text-sm'>
                        {cert.issuingOrganization}
                      </p>
                    </div>
                    <div className='w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0'>
                      <svg
                        className='w-5 h-5 text-white'
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

                  <div className='mb-4'>
                    <div className='flex items-center justify-between text-sm text-gray-400 mb-1'>
                      <span>Issued:</span>
                      <span>
                        {new Date(cert.issuedDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className='flex items-center justify-between text-sm text-gray-400 mb-1'>
                      <span>Expires:</span>
                      <span className='text-red-400'>
                        {new Date(cert.expirationDate).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </span>
                    </div>
                    <div className='flex items-center justify-between text-sm text-gray-400'>
                      <span>Credential ID:</span>
                      <span className='font-mono text-xs'>
                        {cert.credentialId}
                      </span>
                    </div>
                  </div>

                  <p className='text-gray-400 text-sm mb-4 leading-relaxed'>
                    {cert.description}
                  </p>

                  {/* Skills Covered */}
                  <div className='mb-4'>
                    <h4 className='text-xs font-medium text-gray-300 mb-2'>
                      Skills Covered:
                    </h4>
                    <div className='flex flex-wrap gap-1'>
                      {cert.skills.slice(0, 3).map(skill => (
                        <span
                          key={skill}
                          className='px-2 py-1 bg-navy-700 text-gray-300 text-xs rounded'
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 3 && (
                        <span className='px-2 py-1 bg-navy-700 text-gray-500 text-xs rounded'>
                          +{cert.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className='flex items-center justify-between text-sm mb-4'>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        cert.status === 'active'
                          ? 'bg-green-600/20 text-green-400'
                          : 'bg-red-600/20 text-red-400'
                      }`}
                    >
                      {cert.status === 'active' ? 'Active' : 'Expired'}
                    </span>
                    <a
                      href={cert.verificationUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-cyan-400 hover:text-white transition-colors duration-300 text-xs'
                      aria-label={`Verify ${cert.title} certification`}
                    >
                      Verify Credential
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Verification Links Section */}
        <section
          aria-labelledby='verification-heading'
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
                    d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707v4.586a2 2 0 01-2 2z'
                  />
                </svg>
                <span className='text-neon-green-400 font-medium text-sm'>
                  Credential Verification
                </span>
              </div>
              <h2
                id='verification-heading'
                className='text-4xl md:text-5xl font-bold text-white mb-6'
              >
                Credential{' '}
                <span className='text-neon-green-400'>Verification</span>
              </h2>
              <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
                All certifications can be independently verified through the
                issuing organizations. This ensures transparency and validates
                my professional credentials.
              </p>
            </header>

            {/* Verification Links */}
            <div className='bg-navy-700 border border-navy-600 rounded-lg p-8'>
              <h3 className='text-lg font-semibold text-white mb-6'>
                Verification Links
              </h3>
              <ul className='space-y-4'>
                {CERTIFICATIONS.map(cert => (
                  <li
                    key={cert.id}
                    className='flex items-center justify-between p-4 bg-navy-800 rounded-lg'
                  >
                    <div>
                      <h4 className='font-medium text-white'>{cert.title}</h4>
                      <p className='text-gray-400 text-sm'>
                        {cert.issuingOrganization}
                      </p>
                    </div>
                    <a
                      href={cert.verificationUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center space-x-2 bg-neon-green-600 text-white px-4 py-2 rounded-lg hover:bg-neon-green-500 transition-colors duration-300 text-sm'
                      aria-label={`Verify ${cert.title} certification through ${cert.issuingOrganization}`}
                    >
                      <span>Verify</span>
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
                          d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L14 16'
                        />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Progress Indicators Section */}
        <section
          aria-labelledby='progress-heading'
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
                    d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                  />
                </svg>
                <span className='text-cyan-400 font-medium text-sm'>
                  Professional Development
                </span>
              </div>
              <h2
                id='progress-heading'
                className='text-4xl md:text-5xl font-bold text-white mb-6'
              >
                Professional <span className='text-cyan-400'>Development</span>
              </h2>
              <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
                Continuous learning and skill development through advanced
                training programs and specialized courses to stay ahead of
                evolving cybersecurity challenges.
              </p>
            </header>

            {/* Progress Bars */}
            <div className='space-y-6 mb-8'>
              <div>
                <div className='flex items-center justify-between text-sm text-gray-300 mb-2'>
                  <span>Cybersecurity Certifications</span>
                  <span>85%</span>
                </div>
                <div className='w-full bg-navy-700 rounded-full h-3'>
                  <div
                    className='bg-gradient-to-r from-cyan-500 to-neon-green-600 h-3 rounded-full'
                    style={{ width: '85%' }}
                  />
                </div>
              </div>

              <div>
                <div className='flex items-center justify-between text-sm text-gray-300 mb-2'>
                  <span>Cloud Security Expertise</span>
                  <span>90%</span>
                </div>
                <div className='w-full bg-navy-700 rounded-full h-3'>
                  <div
                    className='bg-gradient-to-r from-neon-green-500 to-cyan-500 h-3 rounded-full'
                    style={{ width: '90%' }}
                  />
                </div>
              </div>

              <div>
                <div className='flex items-center justify-between text-sm text-gray-300 mb-2'>
                  <span>Incident Response</span>
                  <span>80%</span>
                </div>
                <div className='w-full bg-navy-700 rounded-full h-3'>
                  <div
                    className='bg-gradient-to-r from-cyan-500 to-neon-green-600 h-3 rounded-full'
                    style={{ width: '80%' }}
                  />
                </div>
              </div>

              <div>
                <div className='flex items-center justify-between text-sm text-gray-300 mb-2'>
                  <span>Compliance & Governance</span>
                  <span>75%</span>
                </div>
                <div className='w-full bg-navy-700 rounded-full h-3'>
                  <div
                    className='bg-gradient-to-r from-neon-green-500 to-cyan-500 h-3 rounded-full'
                    style={{ width: '75%' }}
                  />
                </div>
              </div>
            </div>

            {/* Training History */}
            <div>
              <h3 className='text-lg font-semibold text-white mb-6'>
                Recent Training
              </h3>
              <div className='grid gap-6 md:grid-cols-2'>
                {TRAINING_HISTORY.map(training => (
                  <article
                    key={training.id}
                    className='bg-navy-800 border border-navy-700 rounded-lg p-6'
                    role='article'
                    aria-labelledby={`training-${training.id}-title`}
                  >
                    <header className='mb-4'>
                      <h4
                        id={`training-${training.id}-title`}
                        className='text-lg font-semibold text-white mb-2'
                      >
                        {training.title}
                      </h4>
                      <p className='text-neon-green-400 font-medium'>
                        {training.provider}
                      </p>
                    </header>

                    <div className='mb-4'>
                      <div className='flex items-center justify-between text-sm text-gray-400 mb-1'>
                        <span>Completed:</span>
                        <span>
                          {new Date(training.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className='flex items-center justify-between text-sm text-gray-400'>
                        <span>Duration:</span>
                        <span>{training.duration}</span>
                      </div>
                    </div>

                    <p className='text-gray-400 text-sm mb-4 leading-relaxed'>
                      {training.description}
                    </p>

                    {/* Skills Gained */}
                    <div>
                      <h5 className='text-xs font-medium text-gray-300 mb-2'>
                        Skills Gained:
                      </h5>
                      <div className='flex flex-wrap gap-1'>
                        {training.skills.map(skill => (
                          <span
                            key={skill}
                            className='px-2 py-1 bg-neon-green-600/20 text-neon-green-400 text-xs rounded'
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section
          aria-labelledby='certifications-cta-heading'
          className='py-20 bg-gradient-to-r from-navy-900 via-cyan-900 to-navy-900'
        >
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='bg-navy-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 md:p-12 text-center'>
              <header className='mb-8'>
                <h2
                  id='certifications-cta-heading'
                  className='text-3xl md:text-4xl font-bold text-white mb-4'
                >
                  Ready to Work with a Certified Expert?
                </h2>
                <p className='text-xl text-gray-300 max-w-2xl mx-auto'>
                  My comprehensive certifications and continuous professional
                  development ensure that I bring the highest level of expertise
                  to every cybersecurity project and consultation.
                </p>
              </header>

              <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                <a
                  href='/contact'
                  className='inline-flex items-center space-x-2 bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-500 transition-colors duration-300'
                  aria-label='Schedule a cybersecurity consultation with certified expert'
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
                  href='/services'
                  className='inline-flex items-center space-x-2 border border-cyan-500 text-cyan-400 px-6 py-3 rounded-lg hover:bg-cyan-500/10 transition-colors duration-300'
                  aria-label='Explore cybersecurity services'
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
                      d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707v4.586a2 2 0 01-2 2z'
                    />
                  </svg>
                  <span>View Services</span>
                </a>
                <a
                  href='/portfolio'
                  className='inline-flex items-center space-x-2 border border-neon-green-500 text-neon-green-400 px-6 py-3 rounded-lg hover:bg-neon-green-500/10 transition-colors duration-300'
                  aria-label='View cybersecurity project portfolio'
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
                  <span>View Portfolio</span>
                </a>
              </div>

              {/* Certification Benefits */}
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
                      d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.00 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.152-.262-2.28-.76-3.318z'
                    />
                  </svg>
                  <span className='text-sm'>Industry Recognition</span>
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
                  <span className='text-sm'>Continuous Learning</span>
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
                  <span className='text-sm'>Expert Validation</span>
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
                  <span className='text-sm'>Professional Excellence</span>
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
