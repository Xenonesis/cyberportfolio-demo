import { useEffect, useState, ReactNode } from 'react';
import { SEO_CONFIG, CONTENT_OPTIMIZATION_GUIDELINES } from '@/lib/seo-config';

interface ContentOptimizationProps {
  children: ReactNode;
  contentType?: 'article' | 'case-study' | 'service' | 'landing-page' | 'blog-post';
  keywords?: string[];
  readingTime?: string;
  wordCount?: number;
  headings?: { level: number; text: string }[];
  enableAutoOptimization?: boolean;
  className?: string;
}

interface OptimizationMetrics {
  keywordDensity: number;
  readabilityScore: number;
  headingStructure: string;
  contentLength: number;
  optimizationScore: number;
}

export const ContentOptimization = ({
  children,
  contentType = 'article',
  keywords = [],
  readingTime,
  wordCount,
  headings = [],
  enableAutoOptimization = false,
  className = '',
}: ContentOptimizationProps) => {
  const [metrics, setMetrics] = useState<OptimizationMetrics>({
    keywordDensity: 0,
    readabilityScore: 0,
    headingStructure: '',
    contentLength: 0,
    optimizationScore: 0,
  });

  const [optimizedContent, setOptimizedContent] = useState<ReactNode>(children);
  const [showOptimizationTips, setShowOptimizationTips] = useState(false);

  useEffect(() => {
    if (enableAutoOptimization) {
      analyzeContent();
    }
  }, [children, keywords, enableAutoOptimization]);

  const analyzeContent = () => {
    // Extract text content for analysis
    const textContent = extractTextFromChildren(children);
    const words = textContent.split(/\s+/);
    const contentLength = words.length;

    // Calculate keyword density
    const keywordDensity = calculateKeywordDensity(textContent, keywords);

    // Calculate readability score (Flesch-Kincaid approximation)
    const readabilityScore = calculateReadabilityScore(textContent);

    // Analyze heading structure
    const headingStructure = analyzeHeadingStructure(headings);

    // Calculate overall optimization score
    const optimizationScore = calculateOptimizationScore({
      keywordDensity,
      readabilityScore,
      contentLength,
      headingStructure: headingStructure,
    });

    setMetrics({
      keywordDensity,
      readabilityScore,
      headingStructure,
      contentLength,
      optimizationScore,
    });

    // Apply auto-optimization if enabled
    if (enableAutoOptimization) {
      const optimized = applyContentOptimization(children, {
        keywordDensity,
        readabilityScore,
        contentLength,
        headingStructure,
        optimizationScore,
      });
      setOptimizedContent(optimized);
    }
  };

  const extractTextFromChildren = (children: ReactNode): string => {
    if (typeof children === 'string') {
      return children;
    }
    if (Array.isArray(children)) {
      return children.map(extractTextFromChildren).join(' ');
    }
    if (children && typeof children === 'object' && 'props' in children) {
      return extractTextFromChildren(children.props.children);
    }
    return '';
  };

  const calculateKeywordDensity = (text: string, keywords: string[]): number => {
    if (!keywords.length) return 0;

    const wordCount = text.split(/\s+/).length;
    const keywordCount = keywords.reduce((count, keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const matches = text.match(regex);
      return count + (matches ? matches.length : 0);
    }, 0);

    return (keywordCount / wordCount) * 100;
  };

  const calculateReadabilityScore = (text: string): number => {
    const sentences = text.split(/[.!?]+/).length;
    const words = text.split(/\s+/).length;
    const syllables = text.split(/[aeiouy]+/i).length;

    if (sentences === 0 || words === 0) return 0;

    // Flesch-Kincaid Grade Level approximation
    const avgWordsPerSentence = words / sentences;
    const avgSyllablesPerWord = syllables / words;

    return 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
  };

  const analyzeHeadingStructure = (headings: { level: number; text: string }[]): string => {
    if (!headings.length) return 'no-headings';

    const structure = headings.map(h => `H${h.level}`).join('-');
    const hasH1 = headings.some(h => h.level === 1);
    const isSequential = headings.every((h, i) => {
      if (i === 0) return h.level === 1;
      return h.level <= headings[i - 1].level + 1;
    });

    if (!hasH1) return 'missing-h1';
    if (!isSequential) return 'non-sequential';
    return structure;
  };

  const calculateOptimizationScore = (metrics: any): number => {
    let score = 0;

    // Keyword density score (target: 1-2%)
    const keywordTarget = 1.5;
    const keywordDiff = Math.abs(metrics.keywordDensity - keywordTarget);
    score += Math.max(0, 100 - (keywordDiff * 50));

    // Readability score (target: 60-80)
    const readability = Math.min(100, Math.max(0, metrics.readabilityScore));
    score += readability;

    // Content length score
    const guidelines = CONTENT_OPTIMIZATION_GUIDELINES.contentLength[contentType];
    if (guidelines) {
      const { min, max } = guidelines;
      const lengthScore = metrics.contentLength >= min && metrics.contentLength <= max ? 100 : 50;
      score += lengthScore;
    }

    // Heading structure score
    const headingScore = metrics.headingStructure.includes('H1') ? 100 : 50;
    score += headingScore;

    return Math.round(score / 4);
  };

  const applyContentOptimization = (content: ReactNode, metrics: OptimizationMetrics): ReactNode => {
    // This would implement actual content optimization
    // For now, we'll return the original content
    return content;
  };

  const getOptimizationRecommendations = (): string[] => {
    const recommendations: string[] = [];

    if (metrics.keywordDensity < 0.5) {
      recommendations.push('Increase keyword density (aim for 1-2%)');
    }
    if (metrics.keywordDensity > 2.5) {
      recommendations.push('Reduce keyword density (avoid keyword stuffing)');
    }

    if (metrics.readabilityScore < 60) {
      recommendations.push('Improve readability (use shorter sentences)');
    }
    if (metrics.readabilityScore > 80) {
      recommendations.push('Consider more technical language for professional audience');
    }

    if (!metrics.headingStructure.includes('H1')) {
      recommendations.push('Add H1 heading for main topic');
    }
    if (metrics.headingStructure === 'non-sequential') {
      recommendations.push('Fix heading hierarchy (use sequential order)');
    }

    const guidelines = CONTENT_OPTIMIZATION_GUIDELINES.contentLength[contentType];
    if (guidelines) {
      const { min, max } = guidelines;
      if (metrics.contentLength < min) {
        recommendations.push(`Increase content length (minimum ${min} words)`);
      }
      if (metrics.contentLength > max) {
        recommendations.push(`Consider shortening content (maximum ${max} words)`);
      }
    }

    return recommendations;
  };

  const recommendations = getOptimizationRecommendations();

  return (
    <div className={`content-optimization ${className}`}>
      {/* Optimization Metrics Display */}
      <div
        className="optimization-metrics"
        style={{
          display: showOptimizationTips ? 'block' : 'none',
          padding: '1rem',
          backgroundColor: '#1a202c',
          border: '1px solid #374151',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
        }}
      >
        <div className="metrics-header">
          <h3>Content Optimization Analysis</h3>
          <button
            onClick={() => setShowOptimizationTips(false)}
            style={{ float: 'right' }}
          >
            ✕
          </button>
        </div>

        <div className="metrics-grid">
          <div className="metric">
            <strong>Keyword Density:</strong> {metrics.keywordDensity.toFixed(2)}%
            <div
              className="metric-bar"
              style={{
                width: `${Math.min(metrics.keywordDensity * 20, 100)}%`,
                backgroundColor: metrics.keywordDensity >= 0.5 && metrics.keywordDensity <= 2.5 ? '#10b981' : '#ef4444',
              }}
            />
          </div>

          <div className="metric">
            <strong>Readability Score:</strong> {metrics.readabilityScore.toFixed(1)}
            <div
              className="metric-bar"
              style={{
                width: `${Math.min(metrics.readabilityScore, 100)}%`,
                backgroundColor: metrics.readabilityScore >= 60 ? '#10b981' : '#ef4444',
              }}
            />
          </div>

          <div className="metric">
            <strong>Content Length:</strong> {metrics.contentLength} words
            <div
              className="metric-bar"
              style={{
                width: `${Math.min((metrics.contentLength / 1000) * 100, 100)}%`,
                backgroundColor: metrics.contentLength >= 500 && metrics.contentLength <= 2500 ? '#10b981' : '#ef4444',
              }}
            />
          </div>

          <div className="metric">
            <strong>Optimization Score:</strong> {metrics.optimizationScore}/100
            <div
              className="metric-bar"
              style={{
                width: `${metrics.optimizationScore}%`,
                backgroundColor:
                  metrics.optimizationScore >= 80 ? '#10b981' :
                  metrics.optimizationScore >= 60 ? '#f59e0b' : '#ef4444',
              }}
            />
          </div>
        </div>

        {recommendations.length > 0 && (
          <div className="recommendations">
            <h4>Recommendations:</h4>
            <ul>
              {recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="optimized-content">
        {optimizedContent}
      </div>

      {/* Show optimization button for content editors */}
      <button
        onClick={() => setShowOptimizationTips(true)}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#00ffff',
          color: '#0f172a',
          border: 'none',
          borderRadius: '0.25rem',
          cursor: 'pointer',
        }}
      >
        Show SEO Optimization Tips
      </button>

      <style jsx>{`
        .content-optimization {
          position: relative;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin: 1rem 0;
        }

        .metric {
          padding: 0.5rem;
          border: 1px solid #374151;
          border-radius: 0.25rem;
        }

        .metric-bar {
          height: 4px;
          marginTop: 0.5rem;
          transition: width 0.3s ease;
        }

        .recommendations {
          margin-top: 1rem;
          padding: 0.5rem;
          background-color: #374151;
          border-radius: 0.25rem;
        }

        .recommendations ul {
          margin: 0.5rem 0 0 1rem;
        }

        @media (max-width: 640px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .metric {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};