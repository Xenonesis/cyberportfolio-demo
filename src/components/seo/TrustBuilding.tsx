'use client';

import { useEffect, useState } from 'react';
import { SEO_CONFIG } from '@/lib/seo-config';

interface TrustSignal {
  id: string;
  type: 'certification' | 'achievement' | 'client' | 'metric' | 'testimonial';
  title: string;
  description: string;
  icon?: string;
  value?: string;
  verified?: boolean;
  date?: string;
}

interface TrustBuildingProps {
  showCertifications?: boolean;
  showAchievements?: boolean;
  showMetrics?: boolean;
  showTestimonials?: boolean;
  showClients?: boolean;
  className?: string;
}

export const TrustBuilding = ({
  showCertifications = true,
  showAchievements = true,
  showMetrics = true,
  showTestimonials = true,
  showClients = true,
  className = '',
}: TrustBuildingProps) => {
  const [trustSignals, setTrustSignals] = useState<TrustSignal[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initialize trust signals
    const signals: TrustSignal[] = [];

    if (showCertifications) {
      signals.push(
        ...SEO_CONFIG.securitySEO.certifications.map(cert => ({
          id: `cert-${cert.toLowerCase().replace(/\s+/g, '-')}`,
          type: 'certification' as const,
          title: cert,
          description: 'Professional cybersecurity certification',
          icon: 'shield-check',
          verified: true,
        }))
      );
    }

    if (showAchievements) {
      signals.push(
        {
          id: 'security-assessments',
          type: 'achievement' as const,
          title: '100+ Security Assessments',
          description:
            'Successfully completed comprehensive security evaluations',
          icon: 'check-circle',
          value: '100+',
          verified: true,
        },
        {
          id: 'success-rate',
          type: 'achievement' as const,
          title: '99.9% Success Rate',
          description: 'Security incident prevention and mitigation success',
          icon: 'target',
          value: '99.9%',
          verified: true,
        },
        {
          id: 'clients-served',
          type: 'achievement' as const,
          title: '50+ Clients Protected',
          description: 'Startups and SMBs secured across multiple industries',
          icon: 'users',
          value: '50+',
          verified: true,
        }
      );
    }

    if (showMetrics) {
      signals.push(
        {
          id: 'threat-prevention',
          type: 'metric' as const,
          title: 'Threats Prevented',
          description: 'Advanced threat detection and prevention',
          icon: 'alert-circle',
          value: '99.9%',
        },
        {
          id: 'response-time',
          type: 'metric' as const,
          title: 'Rapid Response',
          description: 'Average incident response time',
          icon: 'clock',
          value: '< 1 hour',
        },
        {
          id: 'compliance-rate',
          type: 'metric' as const,
          title: 'Compliance Rate',
          description: 'Regulatory compliance achievement',
          icon: 'file-text',
          value: '100%',
        }
      );
    }

    setTrustSignals(signals);

    // Check if component is in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('.trust-building');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [
    showCertifications,
    showAchievements,
    showMetrics,
    showTestimonials,
    showClients,
  ]);

  const getTrustSignalIcon = (type: string, customIcon?: string) => {
    const icons: Record<string, string> = {
      certification: '🔒',
      achievement: '🏆',
      metric: '📊',
      testimonial: '💬',
      client: '🏢',
      'shield-check': '🛡️',
      'check-circle': '✅',
      target: '🎯',
      users: '👥',
      'alert-circle': '⚠️',
      clock: '⏰',
      'file-text': '📄',
    };

    return icons[customIcon || type] || '🔒';
  };

  const getTrustSignalColor = (type: string) => {
    const colors: Record<string, string> = {
      certification: 'text-cyan-400',
      achievement: 'text-green-400',
      metric: 'text-blue-400',
      testimonial: 'text-purple-400',
      client: 'text-orange-400',
    };

    return colors[type] || 'text-gray-400';
  };

  return (
    <div className={`trust-building ${className}`} data-testid='trust-building'>
      <div className='trust-header'>
        <h2 className='trust-title'>
          <span className='trust-icon'>🔒</span>
          Trusted Cybersecurity Expert
        </h2>
        <p className='trust-subtitle'>
          Proven expertise with verified credentials and satisfied clients
        </p>
      </div>

      <div className='trust-grid'>
        {trustSignals.map(signal => (
          <div
            key={signal.id}
            className={`trust-card ${isVisible ? 'animate-fade-in' : ''}`}
            data-signal-type={signal.type}
          >
            <div className='trust-card-content'>
              <div className='trust-icon-container'>
                <span className='trust-emoji'>
                  {getTrustSignalIcon(signal.type, signal.icon)}
                </span>
              </div>

              <div className='trust-info'>
                <h3
                  className={`trust-title ${getTrustSignalColor(signal.type)}`}
                >
                  {signal.title}
                </h3>
                <p className='trust-description'>{signal.description}</p>
                {signal.value && (
                  <div className='trust-value'>
                    <strong>{signal.value}</strong>
                  </div>
                )}
                {signal.verified && (
                  <div className='trust-verified'>
                    <span className='verified-badge'>✓ Verified</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Additional trust elements */}
        {showClients && (
          <div
            className={`trust-card clients-card ${isVisible ? 'animate-fade-in' : ''}`}
          >
            <div className='trust-card-content'>
              <div className='trust-icon-container'>
                <span className='trust-emoji'>🏢</span>
              </div>
              <div className='trust-info'>
                <h3 className='text-orange-400'>Trusted by Industry Leaders</h3>
                <p className='trust-description'>
                  Serving clients across financial services, healthcare,
                  technology, and government sectors
                </p>
                <div className='client-industries'>
                  {SEO_CONFIG.securitySEO.clientIndustries.map(
                    (industry, index) => (
                      <span key={index} className='client-industry-tag'>
                        {industry}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {showTestimonials && (
          <div
            className={`trust-card testimonials-card ${isVisible ? 'animate-fade-in' : ''}`}
          >
            <div className='trust-card-content'>
              <div className='trust-icon-container'>
                <span className='trust-emoji'>⭐</span>
              </div>
              <div className='trust-info'>
                <h3 className='text-purple-400'>Client Testimonials</h3>
                <p className='trust-description'>
                  "Aditya's expertise transformed our security posture
                  completely. Highly recommended!"
                </p>
                <div className='testimonial-rating'>
                  <span className='rating-stars'>★★★★★</span>
                  <span className='rating-count'>5.0/5 from 50+ reviews</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Schema markup for trust signals */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Aditya Kumar Tiwari',
            url: SEO_CONFIG.siteUrl,
            description: SEO_CONFIG.siteDescription,
            sameAs: SEO_CONFIG.schemaDefaults.organization.sameAs,
            knowsAbout: [
              'Cybersecurity',
              'Penetration Testing',
              'Vulnerability Assessment',
              'Cloud Security',
              'AI Security',
              'Incident Response',
            ],
            award: SEO_CONFIG.securitySEO.certifications,
            alumniOf: 'National Institute of Technology',
            worksFor: 'Freelance/Consulting',
          }),
        }}
      />

      <style jsx>{`
        .trust-building {
          padding: 2rem 0;
          margin: 2rem 0;
        }

        .trust-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .trust-title {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: #e5e7eb;
          margin-bottom: 0.5rem;
        }

        .trust-subtitle {
          color: #9ca3af;
          font-size: 1rem;
        }

        .trust-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .trust-card {
          background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
          border: 1px solid #374151;
          border-radius: 0.75rem;
          padding: 1.5rem;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(20px);
        }

        .trust-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 255, 255, 0.1);
        }

        .animate-fade-in {
          opacity: 1;
          transform: translateY(0);
          transition:
            opacity 0.6s ease,
            transform 0.6s ease;
        }

        .trust-card-content {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .trust-icon-container {
          flex-shrink: 0;
        }

        .trust-emoji {
          font-size: 2rem;
          line-height: 1;
        }

        .trust-info {
          flex: 1;
        }

        .trust-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .trust-description {
          color: #d1d5db;
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 0.75rem;
        }

        .trust-value {
          font-weight: 700;
          font-size: 1.2rem;
          color: #00ffff;
        }

        .trust-verified {
          display: flex;
          align-items: center;
        }

        .verified-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          background: #10b981;
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .clients-card {
          grid-column: 1 / -1;
        }

        .client-industries {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.75rem;
        }

        .client-industry-tag {
          background: #3b82f6;
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.8rem;
        }

        .testimonials-card {
          grid-column: 1 / -1;
        }

        .testimonial-rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.75rem;
        }

        .rating-stars {
          color: #fbbf24;
          font-size: 1.1rem;
        }

        .rating-count {
          color: #9ca3af;
          font-size: 0.9rem;
        }

        @media (max-width: 640px) {
          .trust-building {
            padding: 1rem 0;
          }

          .trust-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .trust-card {
            padding: 1rem;
          }

          .trust-title {
            font-size: 1.2rem;
          }

          .trust-emoji {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};
