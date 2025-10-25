'use client';

import { motion } from 'framer-motion';
import { ShieldIcon } from '@/components/ui/ShieldIcon';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { EXPERIENCE, EDUCATION, SKILLS } from '@/lib/data';

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
    <section className="py-20 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 bg-navy-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-2 mb-6">
            <ShieldIcon size="sm" variant="active" color="cyan" animate />
            <span className="text-cyan-400 font-medium text-sm">
              About Me
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Cybersecurity <span className="text-cyan-400">Expertise</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            With over 7 years of experience in the cybersecurity field, I've dedicated my career 
            to protecting organizations from evolving cyber threats. My expertise spans from 
            enterprise security architecture to incident response and cloud security.
          </p>
        </motion.div>

        {/* Professional Experience */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">
            Professional Experience
          </h3>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {EXPERIENCE.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className="bg-navy-800 border border-navy-700 rounded-lg p-6 hover:border-cyan-500 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">
                      {exp.title}
                    </h4>
                    <p className="text-cyan-400 font-medium">{exp.company}</p>
                  </div>
                  <Badge variant="info" size="sm">
                    {exp.period}
                  </Badge>
                </div>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {exp.description}
                </p>
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-gray-300 mb-2">
                    Key Technologies:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="default" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-300 mb-2">
                    Notable Achievements:
                  </h5>
                  <ul className="text-gray-400 text-sm space-y-1">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <div className="w-1 h-1 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">
            Education
          </h3>
          <div className="grid gap-8 md:grid-cols-2">
            {EDUCATION.map((edu) => (
              <motion.div
                key={edu.id}
                variants={itemVariants}
                className="bg-navy-800 border border-navy-700 rounded-lg p-6 hover:border-neon-green-500 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">
                      {edu.degree}
                    </h4>
                    <p className="text-neon-green-400 font-medium">{edu.institution}</p>
                  </div>
                  <Badge variant="success" size="sm">
                    {edu.year}
                  </Badge>
                </div>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {edu.description}
                </p>
                {edu.honors && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-300 mb-2">
                      Honors & Awards:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {edu.honors.map((honor) => (
                        <Badge key={honor} variant="success" size="sm">
                          {honor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">
            Skills & Expertise
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SKILLS.map((skill) => (
              <motion.div
                key={skill.id}
                variants={itemVariants}
                className="bg-navy-800 border border-navy-700 rounded-lg p-6 hover:border-cyan-500 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">{skill.name}</h4>
                  <Badge variant="info" size="sm">
                    {skill.category}
                  </Badge>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Proficiency</span>
                    <span>{skill.level}/10</span>
                  </div>
                  <div className="w-full bg-navy-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-neon-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${skill.level * 10}%` }}
                    />
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl font-semibold text-white mb-4">
            Ready to secure your organization?
          </h3>
          <p className="text-gray-400 mb-8">
            Let's discuss how I can help protect your digital assets.
          </p>
          <Button size="lg" variant="primary">
            Schedule Consultation
          </Button>
        </motion.div>
      </div>
    </section>
  );
};