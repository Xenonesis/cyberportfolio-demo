'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldIcon } from '@/components/ui/ShieldIcon';
import { LockIcon } from '@/components/ui/LockIcon';
import { SecureFormFields } from '@/components/ui/SecureFormFields';

export const SecureContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    service: '',
    urgency: 'normal'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section
      id="secure-contact-form"
      aria-labelledby="contact-form-heading"
      className="py-20 bg-navy-900"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-800/80 backdrop-blur-sm border border-electric-cyan-500/30 rounded-2xl p-8 md:p-12">
          <header className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-navy-700/80 backdrop-blur-sm border border-electric-cyan-500/30 rounded-full px-6 py-2 mb-6">
              <ShieldIcon size="sm" variant="active" color="electric-cyan" animate />
              <span className="text-electric-cyan-400 font-medium text-sm">
                Secure Contact Form
              </span>
            </div>
            <h2
              id="contact-form-heading"
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Start Your <span className="text-electric-cyan-400">Secure</span> Consultation
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Fill out the form below to initiate a secure consultation. All information is encrypted
              and protected with enterprise-grade security measures.
            </p>
          </header>

          {submitStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-neon-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <LockIcon size="lg" variant="locked" color="neon-green" animate />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent Successfully!</h3>
              <p className="text-gray-300">
                Thank you for your interest. I'll respond to your secure inquiry within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <SecureFormFields
                  type="text"
                  label="Full Name"
                  value={formData.name}
                  onChange={(value) => handleInputChange('name', value)}
                  required
                  securityLevel="high"
                />

                <SecureFormFields
                  type="email"
                  label="Email Address"
                  value={formData.email}
                  onChange={(value) => handleInputChange('email', value)}
                  required
                  securityLevel="high"
                />
              </div>

              <SecureFormFields
                type="text"
                label="Company/Organization"
                value={formData.company}
                onChange={(value) => handleInputChange('company', value)}
                securityLevel="medium"
              />

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Service Interest
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => handleInputChange('service', e.target.value)}
                    className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-lg text-white focus:border-electric-cyan-500 focus:ring-1 focus:ring-electric-cyan-500"
                  >
                    <option value="">Select a service</option>
                    <option value="assessment">Security Assessment</option>
                    <option value="incident">Incident Response</option>
                    <option value="cloud">Cloud Security</option>
                    <option value="consulting">General Consulting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Urgency Level
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => handleInputChange('urgency', e.target.value)}
                    className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-lg text-white focus:border-electric-cyan-500 focus:ring-1 focus:ring-electric-cyan-500"
                  >
                    <option value="low">Low - General Inquiry</option>
                    <option value="normal">Normal - Standard Timeline</option>
                    <option value="high">High - Urgent Security Issue</option>
                    <option value="critical">Critical - Active Breach</option>
                  </select>
                </div>
              </div>

              <SecureFormFields
                type="textarea"
                label="Message"
                value={formData.message}
                onChange={(value) => handleInputChange('message', value)}
                required
                securityLevel="high"
                rows={6}
              />

              <div className="flex items-center justify-between pt-6">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <LockIcon size="sm" variant="locked" color="electric-cyan" />
                  <span>End-to-end encrypted transmission</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center space-x-2 bg-electric-cyan-600 text-navy-900 px-8 py-3 rounded-lg hover:bg-electric-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 font-medium"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" />
                      <span>Encrypting & Sending...</span>
                    </>
                  ) : (
                    <>
                      <ShieldIcon size="sm" variant="active" color="navy" />
                      <span>Send Secure Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
            >
              <p className="text-red-400 text-center">
                There was an error sending your message. Please try again or contact me directly.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};