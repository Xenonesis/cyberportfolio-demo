'use client';

import { useEffect, useState } from 'react';
import { SEO_PERFORMANCE_CONFIG } from '@/lib/seo-config';
// Declare LayoutShift interface for TypeScript
interface LayoutShift {
  value: number;
  hadRecentInput: boolean;
}

interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  timeToFirstByte: number;
  domContentLoaded: number;
  totalBlockingTime: number;
  speedIndex: number;
  seoScore: number;
  keywordRankings: Record<string, number>;
  organicTraffic: number;
  bounceRate: number;
  conversionRate: number;
  mobileUsability: number;
  accessibilityScore: number;
}

interface PerformanceMonitoringProps {
  metrics: PerformanceMetrics;
  enableRealTimeMonitoring?: boolean;
  enableCoreWebVitals?: boolean;
  enableKeywordTracking?: boolean;
  enableTrafficAnalytics?: boolean;
  enableAlerts?: boolean;
  className?: string;
}

interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  resolved: boolean;
}

export const PerformanceMonitoring = ({
  metrics,
  enableRealTimeMonitoring = true,
  enableCoreWebVitals = true,
  enableKeywordTracking = true,
  enableTrafficAnalytics = true,
  enableAlerts = true,
  className = '',
}: PerformanceMonitoringProps) => {
  const [currentMetrics, setCurrentMetrics] = useState<PerformanceMetrics>(metrics);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    if (enableRealTimeMonitoring) {
      startMonitoring();
    }

    return () => {
      stopMonitoring();
    };
  }, [enableRealTimeMonitoring]);

  const startMonitoring = () => {
    setIsMonitoring(true);

    // Monitor Core Web Vitals
    if (enableCoreWebVitals && 'PerformanceObserver' in window) {
      observeCoreWebVitals();
    }

    // Monitor keyword rankings
    if (enableKeywordTracking) {
      startKeywordTracking();
    }

    // Monitor traffic analytics
    if (enableTrafficAnalytics) {
      startTrafficMonitoring();
    }

    // Set up periodic updates
    const interval = setInterval(() => {
      updateMetrics();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
  };

  const observeCoreWebVitals = () => {
    // Monitor Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        updateMetric('largestContentfulPaint', lastEntry.startTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Monitor First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fid = entries[0] as PerformanceEventTiming;
        updateMetric('firstInputDelay', fid.processingStart - fid.startTime);
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Monitor Cumulative Layout Shift (CLS)
      const clsObserver = new PerformanceObserver((list) => {
        let clsScore = 0;
        list.getEntries().forEach((entry) => {
          const layoutShift = entry as unknown as LayoutShift;
          if (!layoutShift.hadRecentInput) {
            clsScore += layoutShift.value;
          }
        });
        updateMetric('cumulativeLayoutShift', clsScore);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  };

  const startKeywordTracking = () => {
    // Simulate keyword ranking updates
    const keywords = [
      'cybersecurity specialist',
      'security consultant',
      'penetration testing',
      'vulnerability assessment',
      'incident response',
    ];

    keywords.forEach(keyword => {
      const ranking = Math.floor(Math.random() * 100) + 1;
      updateKeywordRanking(keyword, ranking);
    });
  };

  const startTrafficMonitoring = () => {
    // Simulate traffic data updates
    const traffic = Math.floor(Math.random() * 1000) + 100;
    const bounceRate = Math.random() * 0.5 + 0.2; // 20-70%
    const conversionRate = Math.random() * 0.1 + 0.02; // 2-12%

    updateMetric('organicTraffic', traffic);
    updateMetric('bounceRate', bounceRate);
    updateMetric('conversionRate', conversionRate);
  };

  const updateMetrics = () => {
    // Update performance metrics
    const now = performance.now();

    // Update page load time
    updateMetric('pageLoadTime', now);

    // Update DOM content loaded
    if (document.readyState === 'complete') {
      updateMetric('domContentLoaded', now);
    }

    // Calculate SEO score
    const seoScore = calculateSEOScore();
    updateMetric('seoScore', seoScore);

    // Check for alerts
    checkForAlerts();

    setLastUpdate(new Date());
  };

  const updateMetric = (metric: keyof PerformanceMetrics, value: number) => {
    setCurrentMetrics(prev => ({
      ...prev,
      [metric]: value,
    }));
  };

  const updateKeywordRanking = (keyword: string, ranking: number) => {
    setCurrentMetrics(prev => ({
      ...prev,
      keywordRankings: {
        ...prev.keywordRankings,
        [keyword]: ranking,
      },
    }));
  };

  const calculateSEOScore = (): number => {
    const { coreWebVitals } = SEO_PERFORMANCE_CONFIG;
    let score = 100;

    // Deduct points for poor Core Web Vitals
    if (currentMetrics.largestContentfulPaint > coreWebVitals.LCP) {
      score -= 20;
    }
    if (currentMetrics.firstInputDelay > coreWebVitals.FID) {
      score -= 15;
    }
    if (currentMetrics.cumulativeLayoutShift > coreWebVitals.CLS) {
      score -= 15;
    }

    // Deduct points for poor mobile usability
    if (currentMetrics.mobileUsability < 90) {
      score -= 10;
    }

    // Deduct points for poor accessibility
    if (currentMetrics.accessibilityScore < 80) {
      score -= 10;
    }

    // Add points for good SEO practices
    if (currentMetrics.seoScore > 80) {
      score += 10;
    }

    return Math.max(0, Math.min(100, score));
  };

  const checkForAlerts = () => {
    const newAlerts: Alert[] = [];

    // Check Core Web Vitals
    if (currentMetrics.largestContentfulPaint > 4000) {
      newAlerts.push({
        id: 'lcp-poor',
        type: 'warning',
        title: 'Poor Largest Contentful Paint',
        message: `LCP is ${Math.round(currentMetrics.largestContentfulPaint)}ms (target: <${SEO_PERFORMANCE_CONFIG.coreWebVitals.LCP}ms)`,
        timestamp: new Date(),
        resolved: false,
      });
    }

    if (currentMetrics.firstInputDelay > 300) {
      newAlerts.push({
        id: 'fid-poor',
        type: 'warning',
        title: 'Poor First Input Delay',
        message: `FID is ${Math.round(currentMetrics.firstInputDelay)}ms (target: <${SEO_PERFORMANCE_CONFIG.coreWebVitals.FID}ms)`,
        timestamp: new Date(),
        resolved: false,
      });
    }

    if (currentMetrics.cumulativeLayoutShift > 0.25) {
      newAlerts.push({
        id: 'cls-poor',
        type: 'warning',
        title: 'Poor Cumulative Layout Shift',
        message: `CLS is ${currentMetrics.cumulativeLayoutShift.toFixed(3)} (target: <${SEO_PERFORMANCE_CONFIG.coreWebVitals.CLS})`,
        timestamp: new Date(),
        resolved: false,
      });
    }

    // Check SEO score
    if (currentMetrics.seoScore < 60) {
      newAlerts.push({
        id: 'seo-poor',
        type: 'error',
        title: 'Low SEO Score',
        message: `SEO score is ${Math.round(currentMetrics.seoScore)}/100`,
        timestamp: new Date(),
        resolved: false,
      });
    }

    // Add new alerts
    newAlerts.forEach(alert => {
      if (!alerts.some(existing => existing.id === alert.id)) {
        setAlerts(prev => [...prev, alert]);
      }
    });
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };

  const getPerformanceColor = (metric: string, value: number): string => {
    const thresholds = {
      largestContentfulPaint: { good: 2500, poor: 4000 },
      firstInputDelay: { good: 100, poor: 300 },
      cumulativeLayoutShift: { good: 0.1, poor: 0.25 },
      seoScore: { good: 90, poor: 60 },
      mobileUsability: { good: 90, poor: 70 },
      accessibilityScore: { good: 90, poor: 80 },
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return 'text-gray-400';

    if (metric === 'seoScore' || metric === 'mobileUsability' || metric === 'accessibilityScore') {
      // Higher is better
      return value >= threshold.good ? 'text-green-400' :
             value >= threshold.poor ? 'text-yellow-400' : 'text-red-400';
    } else {
      // Lower is better
      return value <= threshold.good ? 'text-green-400' :
             value <= threshold.poor ? 'text-yellow-400' : 'text-red-400';
    }
  };

  const formatMetricValue = (metric: string, value: number): string => {
    if (metric.includes('Time') || metric.includes('Delay') || metric.includes('Paint')) {
      return `${Math.round(value)}ms`;
    }
    if (metric === 'cumulativeLayoutShift') {
      return value.toFixed(3);
    }
    if (metric === 'seoScore' || metric === 'mobileUsability' || metric === 'accessibilityScore') {
      return `${Math.round(value)}%`;
    }
    if (metric === 'bounceRate' || metric === 'conversionRate') {
      return `${(value * 100).toFixed(1)}%`;
    }
    if (metric === 'organicTraffic') {
      return value.toLocaleString();
    }
    return value.toString();
  };

  return (
    <div className={`performance-monitoring ${className}`} data-testid="performance-monitoring">
      {/* Performance Dashboard */}
      <div className="performance-dashboard">
        <div className="dashboard-header">
          <h3 className="dashboard-title">
            <span className="dashboard-icon">📊</span>
            SEO Performance Dashboard
          </h3>
          <div className="dashboard-controls">
            <span className={`status-indicator ${isMonitoring ? 'active' : 'inactive'}`}>
              {isMonitoring ? '🟢' : '🔴'} {isMonitoring ? 'Monitoring' : 'Stopped'}
            </span>
            <span className="last-update">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </span>
          </div>
        </div>

        {/* Core Web Vitals */}
        {enableCoreWebVitals && (
          <div className="core-web-vitals">
            <h4>Core Web Vitals</h4>
            <div className="vitals-grid">
              <div className="vital-card">
                <div className="vital-header">
                  <span className="vital-icon">⚡</span>
                  <span className="vital-name">LCP</span>
                </div>
                <div className={`vital-value ${getPerformanceColor('largestContentfulPaint', currentMetrics.largestContentfulPaint)}`}>
                  {formatMetricValue('largestContentfulPaint', currentMetrics.largestContentfulPaint)}
                </div>
                <div className="vital-target">Target: {SEO_PERFORMANCE_CONFIG.coreWebVitals.LCP}ms</div>
              </div>

              <div className="vital-card">
                <div className="vital-header">
                  <span className="vital-icon">🖱️</span>
                  <span className="vital-name">FID</span>
                </div>
                <div className={`vital-value ${getPerformanceColor('firstInputDelay', currentMetrics.firstInputDelay)}`}>
                  {formatMetricValue('firstInputDelay', currentMetrics.firstInputDelay)}
                </div>
                <div className="vital-target">Target: {SEO_PERFORMANCE_CONFIG.coreWebVitals.FID}ms</div>
              </div>

              <div className="vital-card">
                <div className="vital-header">
                  <span className="vital-icon">📐</span>
                  <span className="vital-name">CLS</span>
                </div>
                <div className={`vital-value ${getPerformanceColor('cumulativeLayoutShift', currentMetrics.cumulativeLayoutShift)}`}>
                  {formatMetricValue('cumulativeLayoutShift', currentMetrics.cumulativeLayoutShift)}
                </div>
                <div className="vital-target">Target: {SEO_PERFORMANCE_CONFIG.coreWebVitals.CLS}</div>
              </div>
            </div>
          </div>
        )}

        {/* SEO Metrics */}
        <div className="seo-metrics">
          <h4>SEO Performance</h4>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-icon">🔍</span>
                <span className="metric-name">SEO Score</span>
              </div>
              <div className={`metric-value ${getPerformanceColor('seoScore', currentMetrics.seoScore)}`}>
                {formatMetricValue('seoScore', currentMetrics.seoScore)}
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-icon">📱</span>
                <span className="metric-name">Mobile Usability</span>
              </div>
              <div className={`metric-value ${getPerformanceColor('mobileUsability', currentMetrics.mobileUsability)}`}>
                {formatMetricValue('mobileUsability', currentMetrics.mobileUsability)}
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-icon">♿</span>
                <span className="metric-name">Accessibility</span>
              </div>
              <div className={`metric-value ${getPerformanceColor('accessibilityScore', currentMetrics.accessibilityScore)}`}>
                {formatMetricValue('accessibilityScore', currentMetrics.accessibilityScore)}
              </div>
            </div>
          </div>
        </div>

        {/* Keyword Rankings */}
        {enableKeywordTracking && (
          <div className="keyword-rankings">
            <h4>Keyword Rankings</h4>
            <div className="rankings-list">
              {Object.entries(currentMetrics.keywordRankings || {}).map(([keyword, ranking]) => (
                <div key={keyword} className="keyword-item">
                  <span className="keyword-text">{keyword}</span>
                  <span className="keyword-rank">#{ranking}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Traffic Analytics */}
        {enableTrafficAnalytics && (
          <div className="traffic-analytics">
            <h4>Traffic Analytics</h4>
            <div className="traffic-grid">
              <div className="traffic-item">
                <span className="traffic-label">Organic Traffic</span>
                <span className="traffic-value">{formatMetricValue('organicTraffic', currentMetrics.organicTraffic)}</span>
              </div>
              <div className="traffic-item">
                <span className="traffic-label">Bounce Rate</span>
                <span className="traffic-value">{formatMetricValue('bounceRate', currentMetrics.bounceRate)}</span>
              </div>
              <div className="traffic-item">
                <span className="traffic-label">Conversion Rate</span>
                <span className="traffic-value">{formatMetricValue('conversionRate', currentMetrics.conversionRate)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Alerts */}
      {enableAlerts && alerts.length > 0 && (
        <div className="performance-alerts">
          <h4>Performance Alerts</h4>
          <div className="alerts-list">
            {alerts.filter(alert => !alert.resolved).map(alert => (
              <div key={alert.id} className={`alert alert-${alert.type}`} data-testid={`alert-${alert.id}`}>
                <div className="alert-content">
                  <span className="alert-icon">
                    {alert.type === 'error' ? '🚨' :
                     alert.type === 'warning' ? '⚠️' :
                     alert.type === 'info' ? 'ℹ️' : '✅'}
                  </span>
                  <div className="alert-text">
                    <strong>{alert.title}</strong>
                    <p>{alert.message}</p>
                  </div>
                  <div className="alert-time">
                    {alert.timestamp.toLocaleTimeString()}
                  </div>
                  <button
                    className="alert-resolve"
                    onClick={() => resolveAlert(alert.id)}
                    aria-label={`Resolve ${alert.title} alert`}
                  >
                    Resolve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .performance-monitoring {
          padding: 1rem;
          background: #1a202c;
          border: 1px solid #374151;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }

        .performance-dashboard {
          width: 100%;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #374151;
        }

        .dashboard-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.2rem;
          font-weight: 600;
          color: #e5e7eb;
        }

        .dashboard-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.9rem;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.75rem;
          background: #374151;
          border-radius: 0.25rem;
        }

        .core-web-vitals, .seo-metrics, .keyword-rankings, .traffic-analytics {
          margin-bottom: 1.5rem;
        }

        .vitals-grid, .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
        }

        .vital-card, .metric-card {
          background: #2d3748;
          padding: 1rem;
          border-radius: 0.5rem;
          text-align: center;
        }

        .vital-header, .metric-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          color: #d1d5db;
          font-size: 0.9rem;
        }

        .vital-value, .metric-value {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .vital-target {
          font-size: 0.8rem;
          color: #9ca3af;
        }

        .rankings-list, .traffic-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .keyword-item, .traffic-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: #2d3748;
          border-radius: 0.5rem;
        }

        .keyword-text {
          color: #d1d5db;
        }

        .keyword-rank {
          font-weight: 600;
          color: #00ffff;
        }

        .traffic-label {
          color: #9ca3af;
        }

        .traffic-value {
          font-weight: 600;
          color: #00ffff;
        }

        .performance-alerts {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid #374151;
        }

        .alerts-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .alert {
          padding: 1rem;
          border-radius: 0.5rem;
          border-left: 4px solid;
        }

        .alert-error {
          background: #7f1d1d;
          border-left-color: #ef4444;
        }

        .alert-warning {
          background: #78350f;
          border-left-color: #f59e0b;
        }

        .alert-info {
          background: #1e3a8a;
          border-left-color: #3b82f6;
        }

        .alert-success {
          background: #064e3b;
          border-left-color: #10b981;
        }

        .alert-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .alert-text {
          flex: 1;
        }

        .alert-text strong {
          display: block;
          color: #e5e7eb;
          margin-bottom: 0.25rem;
        }

        .alert-text p {
          color: #9ca3af;
          font-size: 0.9rem;
        }

        .alert-time {
          color: #9ca3af;
          font-size: 0.8rem;
          white-space: nowrap;
        }

        .alert-resolve {
          padding: 0.25rem 0.75rem;
          background: #374151;
          color: #e5e7eb;
          border: none;
          border-radius: 0.25rem;
          cursor: pointer;
        }

        .alert-resolve:hover {
          background: #4b5563;
        }

        @media (max-width: 640px) {
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .vitals-grid, .metrics-grid {
            grid-template-columns: 1fr;
          }

          .vital-card, .metric-card {
            padding: 0.75rem;
          }

          .vital-value, .metric-value {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};