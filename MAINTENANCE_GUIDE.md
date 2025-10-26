# Maintenance and Troubleshooting Guide

## Overview
This guide provides comprehensive maintenance procedures, troubleshooting steps, and operational guidelines for the cybersecurity portfolio website.

## Daily Maintenance Tasks

### System Health Checks

#### Application Health Check
```bash
# Check if application is running
curl -f http://localhost:3000/api/health

# Check response time
curl -o /dev/null -s -w "%{time_total}\n" http://localhost:3000

# Check for errors in logs
tail -f logs/application.log | grep ERROR
```

#### System Resource Monitoring
```bash
# Check CPU usage
top -bn1 | grep "Cpu(s)"

# Check memory usage
free -h

# Check disk space
df -h

# Check network connections
netstat -tlnp | grep :3000
```

#### Database Health (if applicable)
```sql
-- Check database connections
SELECT count(*) as connections FROM pg_stat_activity;

-- Check for long-running queries
SELECT pid, now() - pg_stat_activity.query_start as duration, query
FROM pg_stat_activity
WHERE state = 'active' AND now() - pg_stat_activity.query_start > interval '1 minute';

-- Check table sizes
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### Log Management

#### Log Rotation
```bash
# Rotate application logs
logrotate -f /etc/logrotate.d/portfolio

# Compress old logs
find /var/log/portfolio -name "*.log" -mtime +7 -exec gzip {} \;

# Clean old compressed logs (keep 30 days)
find /var/log/portfolio -name "*.gz" -mtime +30 -delete
```

#### Log Analysis
```bash
# Count errors in last 24 hours
grep "ERROR" /var/log/portfolio/application.log | wc -l

# Find most common errors
grep "ERROR" /var/log/portfolio/application.log | cut -d' ' -f4- | sort | uniq -c | sort -nr | head -10

# Check for security-related logs
grep "SECURITY\|AUTH\|CSP" /var/log/portfolio/application.log
```

## Weekly Maintenance Tasks

### Security Updates

#### Dependency Updates
```bash
# Check for outdated packages
npm outdated

# Update dependencies (review changes first)
npm update

# Run security audit
npm audit fix

# Test after updates
npm run test
npm run build
```

#### Security Scanning
```bash
# Run vulnerability scan
npm audit --audit-level moderate

# Check for exposed secrets
grep -r "password\|secret\|key" . --exclude-dir=node_modules --exclude-dir=.git

# Verify SSL certificate expiry
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com 2>/dev/null | openssl x509 -noout -dates
```

### Performance Monitoring

#### Core Web Vitals Check
```bash
# Run Lighthouse performance test
npx lighthouse https://yourdomain.com --output=json --output-path=./lighthouse-report.json

# Check Core Web Vitals scores
cat lighthouse-report.json | jq '.categories.performance.score'
```

#### Database Optimization
```sql
-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM posts WHERE published = true;

-- Vacuum and analyze tables
VACUUM ANALYZE;

-- Reindex tables if needed
REINDEX TABLE posts;
```

### Backup Verification
```bash
# Test backup restoration
pg_restore --clean --if-exists --create backup.sql

# Verify backup integrity
pg_restore --list backup.sql > /dev/null

# Check backup file size
ls -lh backups/
```

## Monthly Maintenance Tasks

### System Updates

#### Server Updates
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Node.js if needed
nvm install --lts
nvm use --lts

# Restart services
sudo systemctl restart portfolio
```

#### SSL Certificate Renewal
```bash
# Check certificate expiry
certbot certificates

# Renew certificates
certbot renew

# Reload web server
sudo systemctl reload nginx
```

### Performance Optimization

#### Bundle Analysis
```bash
# Analyze bundle size
npm run analyze

# Check for unused dependencies
npx depcheck

# Optimize images
find public/images -name "*.jpg" -o -name "*.png" | xargs -I {} convert {} -strip -quality 85 {}
```

#### Database Maintenance
```sql
-- Full vacuum
VACUUM FULL;

-- Recluster tables
CLUSTER posts;

-- Update statistics
ANALYZE;
```

### Compliance Checks

#### Accessibility Audit
```bash
# Run automated accessibility tests
npx axe-core-cli http://localhost:3000 --stdout

# Check WCAG compliance
npx lighthouse https://yourdomain.com --output=json | jq '.categories.accessibility.score'
```

#### Security Audit
```bash
# Run security headers check
curl -I https://yourdomain.com

# Check CSP violations
grep "CSP" /var/log/portfolio/security.log

# Verify HTTPS enforcement
curl -I http://yourdomain.com
```

## Troubleshooting Guide

### Application Issues

#### Application Not Starting
```bash
# Check application logs
tail -f logs/application.log

# Check system resources
top -p $(pgrep -f "next")

# Check environment variables
env | grep -E "(NODE_ENV|PORT|DATABASE_URL)"

# Restart application
npm run restart
```

#### High Memory Usage
```bash
# Check memory usage
ps aux --sort=-%mem | head -10

# Check for memory leaks
node --inspect --max-old-space-size=4096

# Restart with increased memory
NODE_OPTIONS="--max-old-space-size=4096" npm start
```

#### Slow Response Times
```bash
# Check database query performance
EXPLAIN ANALYZE SELECT * FROM slow_query_table;

# Check cache hit rates
# (Redis/Memcached monitoring commands)

# Check network latency
ping -c 5 your-cdn-domain.com

# Profile application performance
npx clinic flame -- node server.js
```

### Database Issues

#### Connection Pool Exhausted
```sql
-- Check active connections
SELECT count(*) FROM pg_stat_activity;

-- Kill idle connections
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE state = 'idle' AND now() - query_start > interval '5 minutes';
```

#### Slow Queries
```sql
-- Find slow queries
SELECT query, total_time, calls, mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;

-- Add missing indexes
CREATE INDEX CONCURRENTLY idx_posts_published ON posts(published_at) WHERE published = true;
```

### Network Issues

#### SSL/TLS Problems
```bash
# Test SSL connection
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com

# Check certificate chain
openssl verify -CAfile /etc/ssl/certs/ca-certificates.crt your-cert.pem

# Test SSL labs rating
curl -s "https://www.ssllabs.com/ssltest/analyze.html?d=yourdomain.com" | grep -o "rating.*"
```

#### CDN Issues
```bash
# Check CDN status
curl -I https://your-cdn-domain.com/path/to/asset

# Purge CDN cache
# (Use CDN provider's API or dashboard)

# Test direct origin access
curl -H "Host: yourdomain.com" http://origin-server-ip
```

### Security Issues

#### CSP Violations
```bash
# Check CSP reports
tail -f logs/csp-violations.log

# Update CSP policy in next.config.js
// Add violated source to appropriate directive

# Test CSP policy
curl -H "Content-Security-Policy-Report-Only: [your-policy]" https://yourdomain.com
```

#### Rate Limiting Issues
```bash
# Check rate limit logs
grep "RATE_LIMIT" logs/security.log

# Adjust rate limits in nginx.conf
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

# Whitelist legitimate IPs
geo $whitelist {
    default 0;
    192.168.1.0/24 1;
}
```

## Emergency Procedures

### Service Outage Response

#### Immediate Actions
1. Check application status
   ```bash
   curl -f https://yourdomain.com/api/health
   ```

2. Check server resources
   ```bash
   htop
   df -h
   ```

3. Review recent logs
   ```bash
   tail -n 100 logs/application.log
   ```

4. Check external dependencies
   ```bash
   # Database connectivity
   pg_isready -h localhost

   # Redis connectivity
   redis-cli ping
   ```

#### Escalation Steps
1. **Level 1**: Restart application service
2. **Level 2**: Restart server (if application-level issue)
3. **Level 3**: Rollback to previous deployment
4. **Level 4**: Contact infrastructure provider

### Data Loss Recovery

#### Database Recovery
```bash
# Stop application
npm run stop

# Restore from backup
pg_restore --clean --if-exists --create latest-backup.sql

# Verify data integrity
psql -d portfolio -c "SELECT count(*) FROM posts;"

# Restart application
npm start
```

#### File System Recovery
```bash
# Restore from backup
tar -xzf latest-files-backup.tar.gz -C /

# Verify file integrity
find /app/uploads -type f -exec sha256sum {} \; > current-hashes.txt
diff backup-hashes.txt current-hashes.txt
```

## Monitoring and Alerting

### Application Metrics

#### Key Metrics to Monitor
- Response time (< 2 seconds)
- Error rate (< 1%)
- CPU usage (< 80%)
- Memory usage (< 85%)
- Disk space (> 10% free)
- SSL certificate expiry (> 30 days)

#### Alert Configuration
```yaml
# Prometheus alerting rules
groups:
  - name: portfolio
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m]) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"

      - alert: SlowResponseTime
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 2
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Slow response time detected"
```

### Log Monitoring

#### Logstash Configuration
```json
{
  "input": {
    "file": {
      "path": "/var/log/portfolio/*.log",
      "start_position": "beginning"
    }
  },
  "filter": {
    "grok": {
      "match": {
        "message": "%{TIMESTAMP_ISO8601:timestamp} %{LOGLEVEL:level} %{GREEDYDATA:message}"
      }
    }
  },
  "output": {
    "elasticsearch": {
      "hosts": ["localhost:9200"],
      "index": "portfolio-logs-%{+YYYY.MM.dd}"
    }
  }
}
```

## Backup and Recovery

### Automated Backup Strategy

#### Daily Backups
```bash
#!/bin/bash
# Daily backup script
DATE=$(date +%Y%m%d)
BACKUP_DIR="/backups/daily"

# Database backup
pg_dump -U portfolio -h localhost portfolio > $BACKUP_DIR/db_$DATE.sql

# File system backup
tar -czf $BACKUP_DIR/files_$DATE.tar.gz /app/uploads /app/config

# Retention policy (keep 7 days)
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
```

#### Weekly Backups
```bash
#!/bin/bash
# Weekly backup script
DATE=$(date +%Y%m%d)
BACKUP_DIR="/backups/weekly"

# Full backup
pg_dumpall -U postgres > $BACKUP_DIR/full_$DATE.sql
tar -czf $BACKUP_DIR/full_files_$DATE.tar.gz /app

# Retention policy (keep 4 weeks)
find $BACKUP_DIR -name "*.sql" -mtime +28 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +28 -delete
```

### Disaster Recovery Plan

#### Recovery Time Objectives (RTO)
- Critical services: 1 hour
- Full application: 4 hours
- Database: 2 hours

#### Recovery Point Objectives (RPO)
- Database: 1 hour
- User uploads: 24 hours
- Configuration: 1 hour

#### Recovery Steps
1. Assess damage and impact
2. Activate backup systems
3. Restore from latest backup
4. Verify system integrity
5. Redirect traffic
6. Communicate with stakeholders

## Performance Tuning

### Application Optimization

#### Next.js Performance
```javascript
// next.config.js optimizations
module.exports = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
    optimizeCss: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  compress: true,
}
```

#### Database Optimization
```sql
-- Query optimization
CREATE INDEX idx_posts_category_published ON posts(category, published_at DESC);
CREATE INDEX idx_posts_tags ON posts USING gin(tags);

-- Connection pooling
-- Use PgBouncer or similar connection pooler

-- Query caching
-- Implement Redis caching for frequently accessed data
```

### Infrastructure Optimization

#### Server Configuration
```nginx
# nginx.conf optimizations
worker_processes auto;
worker_rlimit_nofile 65536;

events {
    worker_connections 65536;
    use epoll;
    multi_accept on;
}

http {
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    client_max_body_size 100M;

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss;
}
```

#### CDN Configuration
- Enable HTTP/2 and HTTP/3
- Configure proper cache headers
- Set up image optimization
- Implement edge computing for dynamic content

## Compliance and Security

### Regular Security Assessments

#### Vulnerability Scanning
```bash
# OWASP ZAP scanning
zap.sh -cmd -quickurl https://yourdomain.com -quickout /reports/zap-report.html

# Nikto web server scanner
nikto -h https://yourdomain.com -o /reports/nikto-report.html

# SSL/TLS assessment
sslyze --regular yourdomain.com
```

#### Penetration Testing
- Schedule quarterly penetration tests
- Include automated security scanning in CI/CD
- Monitor for new vulnerabilities in dependencies
- Implement responsible disclosure program

### Compliance Monitoring

#### GDPR Compliance
- Regular data mapping exercises
- User consent management
- Data retention policy enforcement
- Privacy impact assessments

#### Accessibility Compliance
- Regular WCAG audits
- User testing with assistive technologies
- Accessibility statement maintenance
- Remediation of identified issues

## Support and Escalation

### Support Tiers

#### Tier 1: Basic Support
- Application monitoring
- Basic troubleshooting
- User-facing documentation

#### Tier 2: Advanced Support
- Code-level debugging
- Performance optimization
- Security incident response

#### Tier 3: Expert Support
- Architecture changes
- Critical security issues
- Infrastructure modifications

### Escalation Matrix

| Issue Severity | Response Time | Escalation Path |
|----------------|---------------|-----------------|
| Critical | 15 minutes | On-call engineer → CTO |
| High | 1 hour | Team lead → DevOps |
| Medium | 4 hours | Assigned developer |
| Low | 24 hours | Next sprint |

### Communication Plan

#### Internal Communication
- Slack channels for different teams
- Weekly status updates
- Incident post-mortems

#### External Communication
- Status page for users
- Social media updates for outages
- Email notifications for critical issues

---

*This maintenance guide ensures the long-term reliability, security, and performance of the cybersecurity portfolio website.*