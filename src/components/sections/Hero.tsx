'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { LockIcon } from '@/components/ui/LockIcon';
import { ShieldIcon } from '@/components/ui/ShieldIcon';
import { CircuitPattern } from '@/components/ui/CircuitPattern';
import { SecurityStatus, SecurityBadge, ThreatLevel } from '@/components/ui/SecurityElements';

export const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
        duration: 0.8,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-deep-navy-900">
      {/* Enhanced Background with Animated Circuit Pattern */}
      <div className="absolute inset-0 z-0">
        {/* Main circuit pattern background */}
        <div className="absolute inset-0">
          <div className="circuit-pattern bg-deep-navy-900/50 bg-[length:30px_30px] animate-cyber-grid opacity-30"></div>
        </div>
        
        {/* Animated circuit elements */}
        <div className="absolute top-1/4 left-1/4">
          <CircuitPattern
            size="xl"
            variant="flowing"
            color="cyan"
            animate
            speed="slow"
            className="opacity-15 animate-[circuit-flow_8s_linear_infinite]"
          />
        </div>
        <div className="absolute bottom-1/4 right-1/3">
          <CircuitPattern
            size="lg"
            variant="pulsing"
            color="neon-green"
            animate
            speed="normal"
            className="opacity-10 animate-[circuit-pulse_6s_ease-in-out_infinite]"
          />
        </div>
        
        {/* Binary rain effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="binary-texture animate-[binary-rain_30s_linear_infinite] pointer-events-none"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Security Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center items-center gap-4 mb-8"
          >
            <SecurityBadge type="certified" label="Google Cybersecurity" size="sm" />
            <SecurityBadge type="protected" label="ISO 27001" size="sm" />
            <SecurityBadge type="encrypted" label="SSL Secured" size="sm" />
            <div className="inline-flex items-center space-x-2 bg-navy-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-full px-4 py-2">
              <LockIcon size="sm" variant="locked" color="cyan" animate pulse />
              <span className="text-cyan-400 font-medium text-sm">
                Certified Cybersecurity Expert
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="block text-white">Bridging</span>
            <span className="bg-gradient-to-r from-electric-cyan-400 via-neon-green-500 to-electric-cyan-600 bg-clip-text text-transparent">
              Security & Innovation
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Cybersecurity Specialist & Full-Stack Developer combining security expertise with
            cutting-edge development to create innovative, secure solutions for modern businesses.
          </motion.p>

          {/* Value Proposition */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Protecting digital assets with comprehensive security assessments, secure development practices,
            and AI/ML-powered threat detection. Trusted by startups, SMBs, and tech companies worldwide.
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button
              size="lg"
              variant="security"
              className="px-8 py-4 text-lg font-semibold"
              icon="lock"
            >
              Get Security Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg font-semibold"
              icon="eye"
            >
              View Security Services
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="px-8 py-4 text-lg font-semibold"
              icon="download"
            >
              Download Resume
            </Button>
          </motion.div>

          {/* Enhanced Trust Metrics */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
          >
            <motion.div
              variants={fadeInVariants}
              className="text-center p-6 bg-navy-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20"
            >
              <div className="text-3xl font-bold text-electric-cyan-400 mb-2">1+</div>
              <div className="text-gray-400 text-sm">Years Professional Experience</div>
            </motion.div>
            <motion.div
              variants={fadeInVariants}
              className="text-center p-6 bg-navy-800/50 backdrop-blur-sm rounded-xl border border-neon-green-500/20"
            >
              <div className="text-3xl font-bold text-neon-green-500 mb-2">100+</div>
              <div className="text-gray-400 text-sm">Security Assessments Completed</div>
            </motion.div>
            <motion.div
              variants={fadeInVariants}
              className="text-center p-6 bg-navy-800/50 backdrop-blur-sm rounded-xl border border-electric-cyan-500/20"
            >
              <div className="text-3xl font-bold text-electric-cyan-400 mb-2">99.9%</div>
              <div className="text-gray-400 text-sm">Security Success Rate</div>
            </motion.div>
            <motion.div
              variants={fadeInVariants}
              className="text-center p-6 bg-navy-800/50 backdrop-blur-sm rounded-xl border border-neon-green-500/20"
            >
              <div className="text-3xl font-bold text-neon-green-500 mb-2">24/7</div>
              <div className="text-gray-400 text-sm">Incident Response Support</div>
            </motion.div>
          </motion.div>

          {/* Security Status Indicators */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center items-center gap-6 mt-12"
          >
            <SecurityStatus status="secure" label="SECURE" size="md" />
            <SecurityStatus status="online" label="ONLINE" size="md" />
            <ThreatLevel level="low" title="LOW RISK" className="text-xs" />
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Floating Security Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating data nodes */}
        <motion.div
          className="absolute top-1/3 left-1/5 w-3 h-3 bg-electric-cyan-400 rounded-full opacity-40"
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-neon-green-500 rounded-full opacity-30"
          animate={{
            y: [0, -25, 0],
            x: [0, -12, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
        
        {/* Floating shield icon */}
        <motion.div
          className="absolute top-1/2 right-1/5 opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <ShieldIcon size="lg" variant="default" color="cyan" />
        </motion.div>
      </div>

      {/* Subtle data flow overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="data-flow absolute inset-0 animate-[data-flow_4s_ease-in-out_infinite] opacity-10"></div>
      </div>
    </section>
  );
};