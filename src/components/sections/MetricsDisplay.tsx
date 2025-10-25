'use client';

import { motion } from 'framer-motion';
import { CaseStudy } from '@/types/caseStudies';

interface MetricsDisplayProps {
  caseStudies: CaseStudy[];
}

export const MetricsDisplay: React.FC<MetricsDisplayProps> = ({ caseStudies }) => {
  // Calculate aggregate metrics
  const aggregateMetrics = caseStudies.reduce((acc, caseStudy) => {
    caseStudy.metrics.forEach(metric => {
      if (metric.isPositive) {
        acc.totalImprovements++;
        if (metric.type === 'percentage') {
          const improvementValue = parseFloat(metric.improvement.replace('%', ''));
          acc.totalPercentageImprovement += improvementValue;
        }
      }
    });
    
    if (caseStudy.results) {
      acc.totalResults += caseStudy.results.length;
    }
    
    return acc;
  }, {
    totalImprovements: 0,
    totalPercentageImprovement: 0,
    totalResults: 0,
  });

  const averageImprovement = aggregateMetrics.totalImprovements > 0 
    ? Math.round(aggregateMetrics.totalPercentageImprovement / aggregateMetrics.totalImprovements)
    : 0;

  // Get top performing case studies
  const topCaseStudies = caseStudies
    .filter(cs => cs.metrics && cs.metrics.length > 0)
    .sort((a, b) => {
      const aImprovement = a.metrics?.reduce((sum, m) => sum + (m.isPositive ? 1 : 0), 0) || 0;
      const bImprovement = b.metrics?.reduce((sum, m) => sum + (m.isPositive ? 1 : 0), 0) || 0;
      return bImprovement - aImprovement;
    })
    .slice(0, 3);

  // Animation variants
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
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-navy-800/50 backdrop-blur-sm border border-navy-700 rounded-lg p-6"
    >
      <h3 className="text-xl font-semibold text-white mb-6 text-center">
        Security Impact Overview
      </h3>
      
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {/* Total Case Studies */}
        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <div className="text-3xl font-bold text-cyan-400 mb-2">
            {caseStudies.length}
          </div>
          <div className="text-gray-400 text-sm">Case Studies</div>
        </motion.div>

        {/* Total Improvements */}
        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <div className="text-3xl font-bold text-neon-green-400 mb-2">
            {aggregateMetrics.totalImprovements}
          </div>
          <div className="text-gray-400 text-sm">Security Improvements</div>
        </motion.div>

        {/* Average Improvement */}
        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <div className="text-3xl font-bold text-neon-green-400 mb-2">
            {averageImprovement}%
          </div>
          <div className="text-gray-400 text-sm">Average Improvement</div>
        </motion.div>

        {/* Total Results */}
        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <div className="text-3xl font-bold text-cyan-400 mb-2">
            {aggregateMetrics.totalResults}
          </div>
          <div className="text-gray-400 text-sm">Measurable Results</div>
        </motion.div>
      </div>

      {/* Top Performing Case Studies */}
      {topCaseStudies.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="mt-8 pt-6 border-t border-navy-700"
        >
          <h4 className="text-lg font-semibold text-white mb-4 text-center">
            Top Performing Projects
          </h4>
          <div className="grid gap-4 md:grid-cols-3">
            {topCaseStudies.map((caseStudy) => (
              <motion.div
                key={caseStudy.id}
                whileHover={{ y: -4 }}
                className="bg-navy-700 border border-navy-600 rounded-lg p-4"
              >
                <h5 className="font-medium text-white mb-2 line-clamp-2">
                  {caseStudy.title}
                </h5>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {caseStudy.client.name}
                </p>
                
                {/* Top Metrics */}
                <div className="space-y-1">
                  {caseStudy.metrics?.slice(0, 2).map((metric) => (
                    <div
                      key={metric.id}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="text-gray-300">{metric.label}:</span>
                      <span className={metric.isPositive ? 'text-neon-green-400 font-medium' : 'text-red-400 font-medium'}>
                        {metric.improvement}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Security Domain Distribution */}
      <motion.div
        variants={itemVariants}
        className="mt-8 pt-6 border-t border-navy-700"
      >
        <h4 className="text-lg font-semibold text-white mb-4 text-center">
          Security Domains Covered
        </h4>
        <div className="flex flex-wrap justify-center gap-2">
          {Array.from(
            new Set(caseStudies.flatMap(cs => cs.securityDomain))
          ).map((domain) => (
            <span
              key={domain}
              className="px-3 py-1 bg-cyan-600/20 text-cyan-400 text-xs rounded-full border border-cyan-500/30"
            >
              {domain.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Client Industries */}
      <motion.div
        variants={itemVariants}
        className="mt-8 pt-6 border-t border-navy-700"
      >
        <h4 className="text-lg font-semibold text-white mb-4 text-center">
          Industries Served
        </h4>
        <div className="flex flex-wrap justify-center gap-2">
          {Array.from(
            new Set(caseStudies.map(cs => cs.client.industry))
          ).map((industry) => (
            <span
              key={industry}
              className="px-3 py-1 bg-navy-700 text-gray-300 text-xs rounded-full border border-navy-600"
            >
              {industry}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};