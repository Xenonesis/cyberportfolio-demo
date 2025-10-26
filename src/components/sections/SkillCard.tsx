'use client';

import { motion } from 'framer-motion';
import { DetailedSkill, ProficiencyLevel } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { LockIcon } from '@/components/ui/LockIcon';
import { ShieldIcon } from '@/components/ui/ShieldIcon';

interface SkillCardProps {
  skill: DetailedSkill;
  proficiencyLevels: ProficiencyLevel[];
  showProficiencyLevels?: boolean;
  showYearsOfExperience?: boolean;
  showCertifications?: boolean;
  onClick?: (skill: DetailedSkill) => void;
  className?: string;
}

export const SkillCard = ({
  skill,
  proficiencyLevels,
  showProficiencyLevels = true,
  showYearsOfExperience = true,
  showCertifications = true,
  onClick,
  className = '',
}: SkillCardProps) => {
  // Get proficiency level for display
  const proficiencyLevel =
    proficiencyLevels.find(
      level =>
        skill.proficiency >= level.minPercentage &&
        skill.proficiency <= level.maxPercentage
    ) || proficiencyLevels[2]; // Default to intermediate

  // Format years of experience
  const formatExperience = (years?: number) => {
    if (!years) return '';
    if (years === 1) return '1 year';
    return `${years} years`;
  };

  // Get appropriate icon for the skill
  const getSkillIcon = (skillName: string) => {
    const iconMap: Record<string, string> = {
      nmap: '🔍',
      nessus: '🛡️',
      openvas: '🔓',
      qualys: '📊',
      metasploit: '🎯',
      'burp-suite': '🕷️',
      'owasp-zap': '🕷️',
      'kali-linux': '🐧',
      wireshark: '🦈',
      snort: '🚨',
      suricata: '⚡',
      pfsense: '🔒',
      autopsy: '🔍',
      ftk: '📁',
      volatility: '🧠',
      osforensics: '💻',
      'aws-security-hub': '☁️',
      'azure-security-center': '🔵',
      'gcp-security': '🟢',
      splunk: '📈',
      'elk-stack': '🦡',
      graylog: '🐺',
      qradar: '🚨',
      javascript: '⚡',
      typescript: '🔷',
      python: '🐍',
      php: '🐘',
      sql: '🗄️',
      react: '⚛️',
      nextjs: '🚀',
      nodejs: '🟢',
      laravel: '🔥',
      express: '⚡',
      snyk: '🔒',
      sonarqube: '🔍',
      'owasp-dependency-check': '🛡️',
      docker: '🐳',
      kubernetes: '☸️',
      jenkins: '⚙️',
      'gitlab-ci': '🦊',
      aws: '☁️',
      azure: '🔵',
      'google-cloud': '🟢',
      digitalocean: '🌊',
      mysql: '🐬',
      postgresql: '🐘',
      mongodb: '🍃',
      redis: '🔴',
    };
    return iconMap[skill.id] || '🛠️';
  };

  // Animation variants
  const cardVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      boxShadow: '0 0 0 rgba(0, 255, 255, 0.1)',
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      boxShadow: '0 8px 32px rgba(0, 255, 255, 0.15)',
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
        duration: 0.6,
      },
    },
    hover: {
      scale: 1.02,
      y: -4,
      boxShadow: '0 12px 40px rgba(0, 255, 255, 0.25)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
      },
    },
    tap: {
      scale: 0.98,
      boxShadow: '0 4px 16px rgba(0, 255, 255, 0.1)',
    },
  };

  const progressBarVariants = {
    initial: { scaleX: 0, originX: 0 },
    animate: {
      scaleX: skill.proficiency / 100,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  return (
    <motion.div
      className={`skill-card bg-security-gray-800 rounded-xl p-6 border border-security-gray-700 hover:border-electric-cyan-500 transition-all duration-300 ${className}`}
      variants={cardVariants}
      initial='initial'
      animate='animate'
      whileHover='hover'
      whileTap='tap'
      onClick={() => onClick?.(skill)}
      role='button'
      tabIndex={0}
      aria-label={`Skill: ${skill.name}, proficiency: ${skill.proficiency}%`}
    >
      {/* Skill Header */}
      <div className='flex items-start justify-between mb-4'>
        <div className='flex items-center space-x-3'>
          <div className='text-2xl' aria-hidden='true'>
            {getSkillIcon(skill.name)}
          </div>
          <div>
            <h4 className='font-semibold text-white text-lg mb-1'>
              {skill.name}
            </h4>
            <Badge variant='info' size='sm' className='text-xs'>
              {skill.category
                .replace('-', ' ')
                .replace(/\b\w/g, l => l.toUpperCase())}
            </Badge>
          </div>
        </div>

        {/* Proficiency Level Badge */}
        {showProficiencyLevels && (
          <Badge
            variant={
              proficiencyLevel.level === 'expert' ? 'success' : 'default'
            }
            size='sm'
            pulse={proficiencyLevel.level === 'expert'}
            className='text-xs font-medium'
          >
            {proficiencyLevel.level.toUpperCase()}
          </Badge>
        )}
      </div>

      {/* Skill Description */}
      <p className='text-gray-400 text-sm mb-4 leading-relaxed'>
        {skill.description}
      </p>

      {/* Progress Bar */}
      <div className='mb-4'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-sm font-medium text-gray-300'>Proficiency</span>
          <span className='text-sm font-bold text-electric-cyan-400'>
            {skill.proficiency}%
          </span>
        </div>
        <div className='w-full bg-security-gray-600 rounded-full h-2 overflow-hidden'>
          <motion.div
            className={`h-full rounded-full ${
              proficiencyLevel.level === 'expert'
                ? 'bg-neon-green-500'
                : proficiencyLevel.level === 'advanced'
                  ? 'bg-electric-cyan-500'
                  : proficiencyLevel.level === 'intermediate'
                    ? 'bg-light-gray-400'
                    : proficiencyLevel.level === 'beginner'
                      ? 'bg-security-gray-500'
                      : 'bg-deep-navy-500'
            }`}
            variants={progressBarVariants}
            initial='initial'
            animate='animate'
          />
        </div>
      </div>

      {/* Additional Info */}
      <div className='flex flex-wrap gap-2'>
        {showYearsOfExperience && skill.yearsOfExperience && (
          <Badge variant='default' size='sm' className='text-xs'>
            <ShieldIcon className='w-3 h-3 mr-1' />
            {formatExperience(skill.yearsOfExperience)}
          </Badge>
        )}

        {skill.certificationLinks &&
          skill.certificationLinks.length > 0 &&
          showCertifications && (
            <Badge variant='default' size='sm' className='text-xs'>
              <LockIcon className='w-3 h-3 mr-1' />
              Certified
            </Badge>
          )}

        {/* Security Badges */}
        {skill.isExpert && (
          <Badge variant='success' size='sm' className='text-xs'>
            <ShieldIcon className='w-3 h-3 mr-1' />
            Expert
          </Badge>
        )}
        {skill.isAdvanced && (
          <Badge variant='info' size='sm' className='text-xs'>
            <ShieldIcon className='w-3 h-3 mr-1' />
            Advanced
          </Badge>
        )}
      </div>

      {/* Hover Tooltip Content */}
      <div className='absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 bg-black/50 rounded-xl p-4'>
        <div className='text-white text-sm'>
          <p>
            <strong>Experience:</strong>{' '}
            {formatExperience(skill.yearsOfExperience)}
          </p>
          {skill.projectExamples && skill.projectExamples.length > 0 && (
            <p>
              <strong>Projects:</strong> {skill.projectExamples.length} case
              studies
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
