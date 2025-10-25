'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { LockIcon } from '@/components/ui/LockIcon';
import { ShieldIcon } from '@/components/ui/ShieldIcon';
import { CircuitPattern } from '@/components/ui/CircuitPattern';
import { SecurityBadge, SecurityStatus, ThreatLevel } from '@/components/ui/SecurityElements';
import {
  CAREER_TIMELINE_EVENTS,
  RESUME_SUMMARY,
  CAREER_TIMELINE_CONFIG
} from '@/lib/data';
import {
  TimelineEvent,
  TimelineCategory,
  ResumeSummary as ResumeSummaryType
} from '@/types';

interface CareerTimelineProps {
  className?: string;
}

interface TimelineFilter {
  category: TimelineCategory | 'all';
  search: string;
}

export const CareerTimeline = ({ className = '' }: CareerTimelineProps) => {
  const [filter, setFilter] = useState<TimelineFilter>({
    category: 'all',
    search: ''
  });
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<TimelineCategory | 'all'>('all');

  // Filter and sort timeline events
  const filteredEvents = useMemo(() => {
    return CAREER_TIMELINE_EVENTS.filter(event => {
      const matchesCategory = filter.category === 'all' || event.category === filter.category;
      const matchesSearch = filter.search === '' || 
        event.title.toLowerCase().includes(filter.search.toLowerCase()) ||
        event.description.toLowerCase().includes(filter.search.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      // Sort by priority first, then by date
      if (a.priority !== b.priority) {
        return (b.priority || 0) - (a.priority || 0);
      }
      
      // Sort by date (current events first, then by start date)
      if (a.current && !b.current) return -1;
      if (!a.current && b.current) return 1;
      
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });
  }, [filter]);

  // Category statistics
  const categoryStats = useMemo(() => {
    const stats = { all: 0, education: 0, experience: 0, certification: 0, achievement: 0 };
    CAREER_TIMELINE_EVENTS.forEach(event => {
      stats[event.category]++;
      stats.all++;
    });
    return stats;
  }, []);

  const toggleEventExpansion = (eventId: string) => {
    const newExpanded = new Set(expandedEvents);
    if (newExpanded.has(eventId)) {
      newExpanded.delete(eventId);
    } else {
      newExpanded.add(eventId);
    }
    setExpandedEvents(newExpanded);
  };

  const updateFilter = (newFilter: Partial<TimelineFilter>) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
  };

  const getEventIcon = (event: TimelineEvent) => {
    const baseColor = event.color === 'neon-green' ? 'neon-green' : 'cyan' as const;
    
    switch (event.icon) {
      case 'graduation-cap':
        return <LockIcon size="lg" variant="default" color={baseColor} animate />;
      case 'shield':
        return <ShieldIcon size="lg" variant="default" color={baseColor} animate />;
      case 'alert-circle':
        return <LockIcon size="lg" variant="unlocked" color={baseColor} animate />;
      case 'code':
        return <CircuitPattern size="lg" variant="flowing" color={baseColor} animate />;
      case 'certificate':
        return <ShieldIcon size="lg" variant="active" color={baseColor} animate />;
      case 'target':
        return <LockIcon size="lg" variant="locked" color={baseColor} animate />;
      case 'search':
        return <ShieldIcon size="lg" variant="default" color={baseColor} animate />;
      case 'globe':
        return <CircuitPattern size="lg" variant="pulsing" color={baseColor} animate />;
      case 'bug':
        return <LockIcon size="lg" variant="unlocked" color={baseColor} animate />;
      case 'brain':
        return <CircuitPattern size="lg" variant="flowing" color={baseColor} animate />;
      case 'trophy':
        return <ShieldIcon size="lg" variant="active" color={baseColor} animate />;
      case 'book':
        return <LockIcon size="lg" variant="default" color={baseColor} animate />;
      case 'mic':
        return <ShieldIcon size="lg" variant="default" color={baseColor} animate />;
      default:
        return <LockIcon size="lg" variant="default" color={baseColor} animate />;
    }
  };

  const getCategoryColor = (category: TimelineCategory): 'neon-green' | 'cyan' => {
    switch (category) {
      case 'education':
        return 'neon-green';
      case 'experience':
        return 'cyan';
      case 'certification':
        return 'neon-green';
      case 'achievement':
        return 'cyan';
      default:
        return 'cyan';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  const timelineItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 12,
        duration: 0.5,
      },
    },
  };

  return (
    <section className={`py-20 bg-deep-navy-900 ${className}`} id="career-timeline">
      {/* Enhanced Background with Security Elements */}
      <div className="absolute inset-0 z-0">
        <div className="circuit-pattern bg-deep-navy-900/30 bg-[length:40px_40px] animate-cyber-grid opacity-20"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="binary-texture animate-[binary-rain_35s_linear_infinite] pointer-events-none"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 bg-navy-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-2 mb-6">
            <ShieldIcon size="sm" variant="active" color="cyan" animate pulse />
            <span className="text-cyan-400 font-medium text-sm">
              Career Journey
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Career <span className="text-cyan-400">Timeline</span> & Resume Summary
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore my professional journey through cybersecurity and development, showcasing 
            education, experience, certifications, and key achievements that demonstrate 
            expertise in protecting digital assets.
          </p>
        </motion.div>

        {/* Resume Summary Section */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="bg-navy-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Professional Overview */}
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Professional Summary
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {RESUME_SUMMARY.overview}
                </p>
                
                {/* Key Achievements */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-cyan-400 mb-3">Key Achievements</h4>
                  <ul className="space-y-2">
                    {RESUME_SUMMARY.keyAchievements.map((achievement, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specializations */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-neon-green-400 mb-3">Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {RESUME_SUMMARY.specializations.map((specialization, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-navy-700 text-cyan-400 text-sm rounded-full border border-cyan-500/30"
                      >
                        {specialization}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Professional Philosophy */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-cyan-400 mb-3">Professional Philosophy</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {RESUME_SUMMARY.philosophy}
                  </p>
                </div>
              </div>

              {/* Achievement Metrics & Contact */}
              <div className="space-y-6">
                {/* Achievement Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-navy-700 rounded-lg border border-neon-green-500/30">
                    <div className="text-2xl font-bold text-neon-green-500 mb-1">100+</div>
                    <div className="text-gray-400 text-xs">Security Assessments</div>
                  </div>
                  <div className="text-center p-4 bg-navy-700 rounded-lg border border-cyan-500/30">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">50+</div>
                    <div className="text-gray-400 text-xs">Clients Served</div>
                  </div>
                  <div className="text-center p-4 bg-navy-700 rounded-lg border border-neon-green-500/30">
                    <div className="text-2xl font-bold text-neon-green-500 mb-1">99.9%</div>
                    <div className="text-gray-400 text-xs">Success Rate</div>
                  </div>
                  <div className="text-center p-4 bg-navy-700 rounded-lg border border-cyan-500/30">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">7+</div>
                    <div className="text-gray-400 text-xs">Years Experience</div>
                  </div>
                </div>

                {/* Future Goals */}
                <div>
                  <h4 className="text-lg font-medium text-neon-green-400 mb-3">Future Goals</h4>
                  <ul className="space-y-2">
                    {RESUME_SUMMARY.goals.map((goal, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-neon-green-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact & Download */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href={`mailto:${RESUME_SUMMARY.contactEmail}`}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 text-center"
                  >
                    Contact Me
                  </a>
                  <a
                    href={RESUME_SUMMARY.downloadUrl}
                    download
                    className="flex-1 bg-neon-green-600 hover:bg-neon-green-500 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 text-center flex items-center justify-center space-x-2"
                  >
                    <LockIcon size="sm" variant="locked" color="white" />
                    <span>Download Resume</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline Filter Controls */}
        {CAREER_TIMELINE_CONFIG.enableFiltering && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2">
                {(['all', 'education', 'experience', 'certification', 'achievement'] as const).map(category => (
                  <button
                    key={category}
                    onClick={() => updateFilter({ category })}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      filter.category === category
                        ? 'bg-cyan-600 text-white border border-cyan-500/50'
                        : 'bg-navy-700 text-gray-300 hover:bg-navy-600 border border-navy-600'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)} ({categoryStats[category]})
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Search Bar */}
        {CAREER_TIMELINE_CONFIG.enableSearch && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search timeline events..."
                value={filter.search}
                onChange={(e) => updateFilter({ search: e.target.value })}
                className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors duration-300"
              />
            </div>
          </motion.div>
        )}

        {/* Timeline Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Central Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-cyan-500 to-neon-green-500 h-full opacity-30"></div>
          
          {/* Timeline Events */}
          <div className="space-y-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                variants={timelineItemVariants}
                custom={index}
                className={`relative ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                {/* Timeline Connector for Large Screens */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full border-4 border-navy-900 z-10"></div>
                
                {/* Event Content */}
                <div className={`lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8 lg:ml-auto' : 'lg:pl-8 lg:mr-auto'}`}>
                  <div className="bg-navy-800 border border-navy-700 rounded-lg p-6 hover:border-cyan-500 transition-all duration-300 group">
                    {/* Event Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            getCategoryColor(event.category) === 'neon-green'
                              ? 'bg-neon-green-500/20 text-neon-green-400 border border-neon-green-500/30'
                              : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                          }`}>
                            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                          </span>
                          {event.status === 'in-progress' && (
                            <SecurityBadge type="protected" label="In Progress" size="sm" />
                          )}
                          {event.status === 'completed' && (
                            <SecurityBadge type="certified" label="Completed" size="sm" />
                          )}
                        </div>
                        <h4 className="text-lg font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                          {event.title}
                        </h4>
                        {event.subtitle && (
                          <p className="text-cyan-400 font-medium text-sm">{event.subtitle}</p>
                        )}
                      </div>
                      <div className="lg:hidden">
                        {getEventIcon(event)}
                      </div>
                    </div>

                    {/* Event Date */}
                    <div className="flex items-center space-x-2 mb-4 text-gray-400 text-sm">
                      <span>{event.startDate}</span>
                      {event.endDate ? (
                        <span>– {event.endDate}</span>
                      ) : event.current ? (
                        <span className="text-neon-green-400 font-medium">Present</span>
                      ) : null}
                    </div>

                    {/* Event Description */}
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {event.description}
                    </p>

                    {/* Expandable Details */}
                    {event.achievements && event.achievements.length > 0 && (
                      <div className="mb-4">
                        <button
                          onClick={() => toggleEventExpansion(event.id)}
                          className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center space-x-2 transition-colors duration-300"
                        >
                          <span>{expandedEvents.has(event.id) ? 'Hide' : 'Show'} Details</span>
                          <LockIcon 
                            size="sm" 
                            variant={expandedEvents.has(event.id) ? "locked" : "unlocked"} 
                            color="cyan"
                            animate={expandedEvents.has(event.id)}
                          />
                        </button>
                        
                        <AnimatePresence>
                          {expandedEvents.has(event.id) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-3 space-y-2"
                            >
                              <h5 className="text-sm font-medium text-gray-300">Key Achievements:</h5>
                              <ul className="space-y-1">
                                {event.achievements.map((achievement, i) => (
                                  <li key={i} className="flex items-start space-x-2">
                                    <div className="w-1 h-1 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                                    <span className="text-gray-400 text-sm">{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                              
                              {event.technologies && event.technologies.length > 0 && (
                                <>
                                  <h5 className="text-sm font-medium text-gray-300 mt-3">Technologies:</h5>
                                  <div className="flex flex-wrap gap-2">
                                    {event.technologies.map((tech) => (
                                      <span
                                        key={tech}
                                        className="px-2 py-1 bg-navy-700 text-cyan-400 text-xs rounded border border-cyan-500/30"
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                </>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {/* Event Metrics */}
                    {event.metrics && event.metrics.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-navy-700">
                        {event.metrics.map((metric, i) => (
                          <div key={i} className="text-center">
                            <div className="text-lg font-bold text-cyan-400">{metric.value}</div>
                            <div className="text-xs text-gray-400">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Event Icon for Large Screens */}
                <div className="hidden lg:flex lg:w-2/12 lg:items-center lg:justify-center">
                  <div className="w-16 h-16 bg-navy-700 rounded-full flex items-center justify-center border border-cyan-500/30">
                    {getEventIcon(event)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Statistics */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center space-x-4 bg-navy-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-full px-6 py-3">
            <span className="text-gray-300 text-sm">Total Events:</span>
            <span className="text-cyan-400 font-bold">{filteredEvents.length}</span>
            <span className="text-gray-300 text-sm">|</span>
            <span className="text-gray-300 text-sm">Last Updated:</span>
            <span className="text-neon-green-400 font-medium">{RESUME_SUMMARY.lastUpdated}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};