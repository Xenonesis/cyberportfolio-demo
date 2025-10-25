'use client';

import React from 'react';
import Image, { ImageProps } from 'next/image';
import { usePerformance } from './PerformanceProvider';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  alt: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export const ImageOptimizer: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  priority = false,
 quality = 75,
  placeholder = 'empty',
  blurDataURL,
  ...props
}) => {
  const { isMobile } = usePerformance();

  // Determine image dimensions based on device
  const optimizedWidth = props.width ? (isMobile ? Math.min(Number(props.width), 400) : Number(props.width)) : undefined;
  const optimizedHeight = props.height ? (isMobile ? Math.min(Number(props.height), 400) : Number(props.height)) : undefined;

 // Use WebP format with fallback
  const imageSrc = src.endsWith('.svg') ? src : src.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={optimizedWidth}
      height={optimizedHeight}
      priority={priority}
      quality={quality}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      loading={priority ? 'eager' : 'lazy'}
      sizes={props.sizes || (isMobile ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw')}
      style={{
        ...props.style,
        maxWidth: '100%',
        height: 'auto',
      }}
      {...props}
    />
  );
};

// Performance optimized image with intersection observer for lazy loading
export const LazyImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  priority = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  ...props
}) => {
  const [isVisible, setIsVisible] = React.useState(priority);
  const imageRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [priority]);

  if (!isVisible && !priority) {
    return (
      <div 
        ref={imageRef} 
        style={{ 
          width: props.width, 
          height: props.height, 
          background: 'rgba(0, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: props.style?.borderRadius || 0
        }}
      >
        <div className="animate-pulse" style={{ width: '50%', height: '50%', background: 'rgba(0, 255, 255, 0.2)', borderRadius: 4 }} />
      </div>
    );
  }

  return (
    <ImageOptimizer
      src={src}
      alt={alt}
      priority={priority}
      quality={quality}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      {...props}
    />
  );
};