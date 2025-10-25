'use client';

import { motion } from 'framer-motion';
import { ShieldIcon } from '@/components/ui/ShieldIcon';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LockIcon } from '@/components/ui/LockIcon';
import { CircuitPattern } from '@/components/ui/CircuitPattern';
import { SecurityProgress } from '@/components/ui/SecurityElements';
import { EXPERIENCE, EDUCATION, SKILLS, CERTIFICATIONS, EXPERIENCE_METRICS } from '@/lib/data';
import Image from 'next/image';

export const EnhancedAbout = () => {
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

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative py-20 bg-navy-900 overflow-hidden">
      {/* Background Security Elements */}
      <CircuitPattern className="absolute inset-0 opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Container - Two Column Layout */}
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            className="relative aspect-square lg:aspect-auto"
          >
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-900/20 to-neon-green-900/20 border border-cyan-500/30 shadow-2xl">
              <Image
                src="/images/profile-placeholder.jpg"
                alt="Aditya Kumar Tiwari - Cybersecurity Expert"
                fill
                className="object-cover"
                priority
              />
              {/* Security Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent flex items-end">
                <div className="p-6 w-full">
                  <Badge variant="success" size="lg" className="mb-3">
                    <LockIcon size="sm" variant="locked" color="neon-green" animate />
                    Security Cleared
                  </Badge>
                  <p className="text-cyan-400 text-sm font-medium">
                    Based in India, Serving Global Clients
                  </p>
                </div>
              </div>
              {/* Security Badge Corner */}
              <div className="absolute top-4 right-4">
                <div className="bg-cyan-600/20 border border-cyan-500/50 rounded-full p-3 backdrop-blur-sm">
                  <ShieldIcon size="lg" variant="active" color="cyan" animate />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Content */}
          <motion.div
            variants={itemVariants}
            className="space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-navy-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-2 mb-6">
              <ShieldIcon size="sm" variant="active" color="cyan" animate />
              <span className="text-cyan-400 font-medium text-sm">
                Professional Profile
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
              Aditya Kumar{' '}
              <span className="text-cyan-400 bg-gradient-to-r from-cyan-400 to-neon-green-400 bg-clip-text text-transparent">
                Tiwari
              </span>
            </h1>

            <p className="text-2xl text-gray-300 mb-6">
              Cybersecurity Specialist & Full-Stack Developer
            </p>

            <p className="text-lg text-gray-400 leading-relaxed mb-8">
              Bridging Security and Innovation. With 1+ years of professional cybersecurity experience, 
              I combine security expertise with full-stack development to create secure, innovative 
              solutions for startups and SMBs. Passionate about making complex security concepts 
              accessible and implementing proactive security measures.
            </p>

            {/* Experience Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {EXPERIENCE_METRICS.slice(0, 2).map((metric) => (
                <motion.div
                  key={metric.id}
                  variants={fadeInUpVariants}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-cyan-400 mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-400">{metric.label}</div>
                  <div className="text-xs text-gray-500">{metric.description}</div>
                </motion.div>
              ))}
            </div>

            {/* Professional Tagline */}
            <div className="flex items-center space-x-3 text-neon-green-400">
              <LockIcon size="sm" variant="locked" color="neon-green" animate />
              <span className="text-sm font-medium">Bridging Security and Innovation</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Expertise Container */}
        <motion.div
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-navy-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-2 mb-6">
              <ShieldIcon size="sm" variant="active" color="cyan" animate />
              <span className="text-cyan-400 font-medium text-sm">
                Expertise Highlights
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Cybersecurity & <span className="text-cyan-400">Development</span> Expertise
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Specializing in proactive security measures and secure development practices. 
              My dual expertise allows me to build security into the foundation of every solution.
            </p>
          </motion.div>

          {/* Cybersecurity Specializations */}
          <motion.div
            variants={itemVariants}
            className="mb-12"
          >
            <h3 className="text-2xl font-semibold text-cyan-400 mb-6 text-center">
              🔒 Cybersecurity Specializations
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SKILLS.filter(skill => skill.category === 'cybersecurity').map((skill) => (
                <Card
                  key={skill.id}
                  className="bg-navy-800 border border-navy-700 hover:border-cyan-500 transition-all duration-300 group"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        {skill.name}
                      </h4>
                      <Badge variant="info" size="sm">
                        {skill.level}/10
                      </Badge>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Proficiency</span>
                        <span>{skill.level}/10</span>
                      </div>
                      <div className="w-full bg-navy-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-cyan-500 to-neon-green-600 h-2 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${skill.level * 10}%` }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level * 10}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Development Expertise */}
          <motion.div
            variants={itemVariants}
            className="mb-12"
          >
            <h3 className="text-2xl font-semibold text-neon-green-400 mb-6 text-center">
              💻 Development Expertise
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {SKILLS.filter(skill => skill.category === 'development').map((skill) => (
                <Card
                  key={skill.id}
                  className="bg-navy-800 border border-navy-700 hover:border-neon-green-500 transition-all duration-300 group"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-white group-hover:text-neon-green-400 transition-colors">
                        {skill.name}
                      </h4>
                      <Badge variant="success" size="sm">
                        {skill.level}/10
                      </Badge>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Proficiency</span>
                        <span>{skill.level}/10</span>
                      </div>
                      <div className="w-full bg-navy-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-neon-green-500 to-cyan-500 h-2 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${skill.level * 10}%` }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level * 10}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Credentials Container */}
        <motion.div
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-navy-800/80 backdrop-blur-sm border border-neon-green-500/30 rounded-full px-6 py-2 mb-6">
              <LockIcon size="sm" variant="locked" color="neon-green" animate />
              <span className="text-neon-green-400 font-medium text-sm">
                Professional Credentials
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Credentials & <span className="text-neon-green-400">Experience</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              1+ Years of Professional Cybersecurity Experience with comprehensive certifications 
              and proven track record in protecting digital assets.
            </p>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div
            variants={itemVariants}
            className="mb-12"
          >
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">
              Professional Journey
            </h3>
            <div className="space-y-6">
              {EXPERIENCE.map((exp, index) => (
                <Card
                  key={exp.id}
                  className="bg-navy-800 border border-navy-700 hover:border-cyan-500 transition-all duration-300"
                >
                  <div className="p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                          <Badge variant="info" size="sm">{exp.period}</Badge>
                        </div>
                        <p className="text-cyan-400 font-medium">{exp.company}</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8 mt-6">
                      <div className="md:col-span-2">
                        <p className="text-gray-300 leading-relaxed mb-6">
                          {exp.description}
                        </p>
                        
                        {/* Technologies Used */}
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-300 mb-3">
                            Key Technologies:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                variant="default"
                                size="sm"
                                className="bg-cyan-600/20 text-cyan-400"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-3">
                          Notable Achievements:
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className="flex items-start space-x-2 text-gray-400 text-sm"
                            >
                              <LockIcon size="sm" variant="locked" color="cyan" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Certifications Grid */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">
              Certifications & Training
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CERTIFICATIONS.map((cert) => (
                <motion.div
                  key={cert.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group"
                >
                  <Card
                    className={`bg-navy-800 border-2 hover:border-${
                      cert.status === 'completed' ? 'cyan' : 'neon-green'
                    }-500/50 transition-all duration-300`}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                            {cert.title}
                          </h4>
                          <p className="text-sm text-gray-400 mt-1">{cert.issuer}</p>
                        </div>
                        <Badge
                          variant={cert.status === 'completed' ? 'success' : 'warning'}
                          size="sm"
                        >
                          {cert.status === 'completed' ? 'Completed' : 'In Progress'}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        {cert.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{cert.date}</span>
                        {cert.status === 'completed' && (
                          <LockIcon size="sm" variant="locked" color="cyan" />
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience Metrics */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {EXPERIENCE_METRICS.map((metric) => (
              <motion.div
                key={metric.id}
                variants={fadeInUpVariants}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-navy-800/50 rounded-xl border border-navy-700"
              >
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-300 font-medium mb-1">
                  {metric.label}
                </div>
                <div className="text-xs text-gray-400">{metric.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Value Proposition Container */}
        <motion.div
          className="mb-24 bg-gradient-to-r from-navy-800/50 to-cyan-900/20 backdrop-blur-sm border border-cyan-500/20 rounded-3xl p-8 md:p-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-navy-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-2 mb-6">
              <ShieldIcon size="sm" variant="active" color="cyan" animate />
              <span className="text-cyan-400 font-medium text-sm">
                Unique Value Proposition
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Why Choose <span className="text-cyan-400">Aditya?</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12">
              Combining cybersecurity expertise with full-stack development to deliver comprehensive 
              security solutions that are both technically sound and business-focused.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                variants={fadeInUpVariants}
                className="text-center p-6"
              >
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Dual Expertise
                </h3>
                <p className="text-gray-400 text-sm">
                  Cybersecurity + Development = Comprehensive security solutions
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUpVariants}
                className="text-center p-6"
              >
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Proactive Security
                </h3>
                <p className="text-gray-400 text-sm">
                  Prevent threats before they become incidents
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUpVariants}
                className="text-center p-6"
              >
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Startup Focus
                </h3>
                <p className="text-gray-400 text-sm">
                  Tailored solutions for startups and SMBs
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUpVariants}
                className="text-center p-6"
              >
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Innovation First
                </h3>
                <p className="text-gray-400 text-sm">
                  Cutting-edge security with AI/ML integration
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Container */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-3xl font-semibold text-white mb-4">
            Ready to secure your digital assets?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how I can help protect your organization with comprehensive 
            cybersecurity solutions and secure development practices.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              variant="primary"
              className="bg-gradient-to-r from-cyan-500 to-neon-green-500 hover:from-cyan-400 hover:to-neon-green-400"
              onClick={() => window.location.href = '/contact'}
            >
              <LockIcon size="sm" variant="locked" color="white" />
              Schedule Consultation
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
              onClick={() => window.location.href = '/services'}
            >
              Explore Services
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-neon-green-500 text-neon-green-400 hover:bg-neon-green-500/10"
              onClick={() => window.location.href = '/portfolio'}
            >
              View Portfolio
            </Button>
          </div>
          
          {/* Security Credentials */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-gray-400">
            <div className="flex items-center space-x-2">
              <LockIcon size="sm" variant="locked" color="cyan" />
              <span className="text-sm">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldIcon size="sm" variant="active" color="neon-green" />
              <span className="text-sm">GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <LockIcon size="sm" variant="locked" color="cyan" />
              <span className="text-sm">Trusted by Security-Conscious Organizations</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};