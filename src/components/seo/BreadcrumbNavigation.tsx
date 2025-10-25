import { useEffect, useState } from 'react';
import { SchemaMarkup } from './SchemaMarkup';
import { SEO_CONFIG } from '@/lib/seo-config';

interface BreadcrumbItem {
  name: string;
  url: string;
  position: number;
}

interface BreadcrumbNavigationProps {
  currentPath?: string;
  customItems?: BreadcrumbItem[];
  showSchema?: boolean;
  className?: string;
  separator?: string;
}

export const BreadcrumbNavigation = ({
  currentPath,
  customItems,
  showSchema = true,
  className = '',
  separator = '>',
}: BreadcrumbNavigationProps) => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    const path = currentPath || (typeof window !== 'undefined' ? window.location.pathname : '');
    setCurrentUrl(path);
    
    if (customItems) {
      setBreadcrumbs(customItems);
    } else {
      generateBreadcrumbs(path);
    }
  }, [currentPath, customItems]);

  const generateBreadcrumbs = (path: string) => {
    if (!path || path === '/') {
      setBreadcrumbs([
        {
          name: 'Home',
          url: SEO_CONFIG.siteUrl,
          position: 1,
        },
      ]);
      return;
    }

    const pathSegments = path.split('/').filter(Boolean);
    const breadcrumbItems: BreadcrumbItem[] = [];

    // Add home breadcrumb
    breadcrumbItems.push({
      name: 'Home',
      url: SEO_CONFIG.siteUrl,
      position: 1,
    });

    // Add path breadcrumbs
    let currentPath = SEO_CONFIG.siteUrl;
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      breadcrumbItems.push({
        name: formatBreadcrumbName(segment),
        url: currentPath,
        position: index + 2,
      });
    });

    setBreadcrumbs(breadcrumbItems);
  };

  const formatBreadcrumbName = (segment: string): string => {
    // Special cases for common segments
    const specialCases: Record<string, string> = {
      'about': 'About',
      'services': 'Services',
      'case-studies': 'Case Studies',
      'portfolio': 'Portfolio',
      'blog': 'Blog',
      'contact': 'Contact',
      'certifications': 'Certifications',
      'career-timeline': 'Career Timeline',
      'skills': 'Skills',
    };

    if (specialCases[segment]) {
      return specialCases[segment];
    }

    // Convert kebab-case or snake_case to Title Case
    return segment
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  if (breadcrumbs.length <= 1) {
    return null; // Don't show breadcrumbs for home page
  }

  return (
    <nav
      className={`breadcrumb-navigation ${className}`}
      aria-label="Breadcrumb"
      role="navigation"
    >
      {showSchema && (
        <SchemaMarkup
          pageType="breadcrumb"
          breadcrumbList={breadcrumbs.map(item => ({
            name: item.name,
            url: item.url,
          }))}
        />
      )}

      <ol className="breadcrumb-list" itemScope itemType="https://schema.org/BreadcrumbList">
        {breadcrumbs.map((item, index) => (
          <li
            key={item.url}
            className={`breadcrumb-item ${index === breadcrumbs.length - 1 ? 'current' : ''}`}
            itemScope
            itemProp="itemListElement"
            itemType="https://schema.org/ListItem"
          >
            {index > 0 && (
              <span className="breadcrumb-separator" aria-hidden="true">
                {separator}
              </span>
            )}
            
            {index < breadcrumbs.length - 1 ? (
              <a
                href={item.url}
                className="breadcrumb-link"
                itemProp="item"
                aria-label={`Go to ${item.name}`}
              >
                <span itemProp="name">{item.name}</span>
              </a>
            ) : (
              <span
                className="breadcrumb-current"
                itemProp="item"
                aria-current="page"
              >
                <span itemProp="name">{item.name}</span>
              </span>
            )}
            
            <meta itemProp="position" content={item.position.toString()} />
          </li>
        ))}
      </ol>

      <style jsx>{`
        .breadcrumb-navigation {
          display: flex;
          align-items: center;
          padding: 0.5rem 0;
          margin-bottom: 1rem;
        }

        .breadcrumb-list {
          display: flex;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
          flex-wrap: wrap;
        }

        .breadcrumb-item {
          display: flex;
          align-items: center;
          font-size: 0.875rem;
        }

        .breadcrumb-item:not(:last-child) {
          color: #6b7280;
        }

        .breadcrumb-current {
          color: #1f2937;
          font-weight: 600;
        }

        .breadcrumb-link {
          color: #374151;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .breadcrumb-link:hover {
          color: #00ffff;
          text-decoration: underline;
        }

        .breadcrumb-separator {
          margin: 0 0.5rem;
          color: #9ca3af;
        }

        @media (max-width: 640px) {
          .breadcrumb-navigation {
            padding: 0.25rem 0;
          }

          .breadcrumb-item {
            font-size: 0.8rem;
          }

          .breadcrumb-separator {
            margin: 0 0.25rem;
          }
        }
      `}</style>
    </nav>
  );
};