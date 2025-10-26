# Deployment Configuration Guide

## Overview
This guide provides comprehensive deployment configuration for the cybersecurity portfolio website, ensuring secure, performant, and scalable production deployment.

## Prerequisites

### System Requirements
- Node.js 18.17+ (LTS)
- npm 9.0+ or yarn 1.22+
- Git 2.30+
- SSL certificate (Let's Encrypt recommended)

### Environment Setup
```bash
# Clone repository
git clone <repository-url>
cd cybersecurity-portfolio

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

## Environment Configuration

### Required Environment Variables
```env
# Application
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://api.your-domain.com

# Security
NEXT_PUBLIC_CSP_REPORT_URI=https://your-domain.com/api/csp-report
SECURITY_ENCRYPTION_KEY=your-32-character-encryption-key

# Analytics (Optional)
NEXT_PUBLIC_GA_TRACKING_ID=GA_MEASUREMENT_ID
NEXT_PUBLIC_GTM_ID=GTM_CONTAINER_ID

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Database (Optional)
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio
```

### Security Considerations
- Use strong, unique encryption keys (32+ characters)
- Never commit `.env.local` to version control
- Rotate keys regularly in production
- Use environment-specific configurations

## Build Configuration

### Next.js Configuration
The application uses optimized Next.js 16 configuration:

```typescript
// next.config.ts features:
- Static generation for optimal performance
- Image optimization with WebP/AVIF support
- Security headers and CSP implementation
- Compression and caching strategies
- Bundle analysis and optimization
```

### Build Commands
```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Analyze bundle
npm run analyze
```

## Deployment Platforms

### Vercel (Recommended)

#### Automatic Deployment
1. Connect GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

#### Environment Variables
Set all required environment variables in Vercel dashboard:
- Project Settings → Environment Variables

#### Custom Domain
1. Add domain in Vercel dashboard
2. Update DNS records as instructed
3. Enable SSL (automatic with Vercel)

### Netlify

#### Build Configuration
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

#### Deployment Steps
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login and deploy
netlify login
netlify init
netlify deploy --prod
```

### Docker Deployment

#### Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

#### Docker Compose
```yaml
version: '3.8'
services:
  portfolio:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env.local
    restart: unless-stopped
```

### Traditional Server Deployment

#### PM2 Configuration
```json
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'cybersecurity-portfolio',
    script: 'npm start',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

#### Nginx Configuration
```nginx
# /etc/nginx/sites-available/cybersecurity-portfolio
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL configuration
    ssl_certificate /path/to/ssl/certificate.crt;
    ssl_certificate_key /path/to/ssl/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }

    # Static files caching
    location /_next/static {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## SSL/TLS Configuration

### Let's Encrypt (Certbot)
```bash
# Install Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Automatic renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Cloudflare SSL
1. Sign up for Cloudflare
2. Add domain and update nameservers
3. Enable "Always Use HTTPS"
4. Set SSL mode to "Full (strict)"

## Performance Optimization

### CDN Configuration
- Use CDN for static assets (Cloudflare, AWS CloudFront, etc.)
- Enable HTTP/2 and HTTP/3
- Configure proper cache headers

### Database Optimization (if applicable)
```sql
-- Create indexes for better performance
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_posts_published ON posts(published_at) WHERE published = true;

-- Optimize queries
EXPLAIN ANALYZE SELECT * FROM posts WHERE published = true ORDER BY published_at DESC LIMIT 10;
```

## Monitoring and Analytics

### Application Monitoring
```bash
# Install monitoring tools
npm install --save-dev @sentry/nextjs

# Configure Sentry
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

### Performance Monitoring
- Core Web Vitals tracking
- Lighthouse CI integration
- Real User Monitoring (RUM)

### Log Management
```bash
# PM2 logging
pm2 logs cybersecurity-portfolio

# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

## Backup and Recovery

### Database Backup
```bash
# PostgreSQL backup
pg_dump -U username -h localhost database_name > backup.sql

# Automated backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -U username database_name > /backups/backup_$DATE.sql
find /backups -name "backup_*.sql" -mtime +30 -delete
```

### File System Backup
```bash
# Backup user uploads and configurations
tar -czf /backups/files_$DATE.tar.gz /app/uploads /app/config
```

### Disaster Recovery
1. Document recovery procedures
2. Test backup restoration regularly
3. Maintain offsite backups
4. Document incident response procedures

## Security Checklist

### Pre-Deployment
- [ ] Environment variables configured
- [ ] SSL certificates installed
- [ ] Security headers tested
- [ ] Dependencies updated
- [ ] Code scanned for vulnerabilities

### Post-Deployment
- [ ] HTTPS enforced
- [ ] Security headers active
- [ ] CSP policy working
- [ ] Monitoring alerts configured
- [ ] Backup procedures tested

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and rebuild
rm -rf .next node_modules/.cache
npm install
npm run build
```

#### Memory Issues
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

#### SSL Issues
```bash
# Test SSL configuration
openssl s_client -connect your-domain.com:443 -servername your-domain.com

# Check certificate
curl -I https://your-domain.com
```

#### Performance Issues
```bash
# Analyze bundle size
npm run analyze

# Check Core Web Vitals
curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://your-domain.com&strategy=mobile"
```

## Maintenance Schedule

### Daily
- Monitor error logs
- Check disk space
- Verify SSL certificate validity

### Weekly
- Update dependencies
- Review security alerts
- Check performance metrics

### Monthly
- Full backup verification
- Security audit
- Performance optimization review

### Quarterly
- Major dependency updates
- Infrastructure review
- Disaster recovery testing

## Support and Documentation

### Documentation Links
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

### Support Contacts
- Development Team: dev@your-domain.com
- Infrastructure: infra@your-domain.com
- Security: security@your-domain.com

---

*This deployment guide ensures secure, performant, and maintainable production deployment of the cybersecurity portfolio website.*