'use client';

import { useState, useEffect } from 'react';
import { SkillsMatrix } from './SkillsMatrix';

interface LazySkillsMatrixProps {
  className?: string;
}

export const LazySkillsMatrix = ({ className = '' }: LazySkillsMatrixProps) => {
  const [isInView, setIsInView] = useState(false);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setHasBeenViewed(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    const target = document.querySelector('#skills-matrix-root');
    if (target) {
      observer.observe(target);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div id="skills-matrix-root" className={className}>
      {isInView || hasBeenViewed ? (
        <SkillsMatrix />
      ) : (
        <div className="skills-matrix-placeholder">
          {/* Loading skeleton */}
          <div className="animate-pulse">
            <div className="h-8 bg-security-gray-700 rounded mb-4"></div>
            <div className="h-4 bg-security-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-security-gray-700 rounded w-3/4 mb-8"></div>
            
            {/* Controls skeleton */}
            <div className="mb-8 p-6 bg-security-gray-800 rounded-xl border border-security-gray-700">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 h-10 bg-security-gray-700 rounded-lg"></div>
                <div className="flex flex-wrap gap-2">
                  <div className="h-8 bg-security-gray-700 rounded-full w-16"></div>
                  <div className="h-8 bg-security-gray-700 rounded-full w-20"></div>
                  <div className="h-8 bg-security-gray-700 rounded-full w-24"></div>
                </div>
              </div>
            </div>

            {/* Categories skeleton */}
            <div className="grid gap-8">
              {[1, 2].map((category) => (
                <div key={category} className="category-skeleton">
                  <div className="mb-6 p-4 bg-deep-navy-700 rounded-lg border border-electric-cyan-500/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-electric-cyan-500 rounded"></div>
                        <div>
                          <div className="h-6 bg-security-gray-700 rounded w-32 mb-2"></div>
                          <div className="h-4 bg-security-gray-700 rounded w-48"></div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="h-6 bg-electric-cyan-400 rounded w-8 mb-1"></div>
                        <div className="h-3 bg-gray-500 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((skill) => (
                      <div key={skill} className="skill-skeleton">
                        <div className="bg-security-gray-800 rounded-xl p-6 border border-security-gray-700">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-electric-cyan-500 rounded"></div>
                              <div>
                                <div className="h-5 bg-security-gray-700 rounded w-24 mb-2"></div>
                                <div className="h-3 bg-security-gray-700 rounded w-16"></div>
                              </div>
                            </div>
                            <div className="h-5 bg-neon-green-500 rounded w-12"></div>
                          </div>
                          
                          <div className="h-3 bg-security-gray-700 rounded mb-4"></div>
                          <div className="h-3 bg-security-gray-700 rounded w-3/4 mb-4"></div>
                          
                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <div className="h-3 bg-gray-500 rounded w-16"></div>
                              <div className="h-3 bg-electric-cyan-400 rounded w-8"></div>
                            </div>
                            <div className="w-full bg-security-gray-600 rounded-full h-2"></div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            <div className="h-4 bg-security-gray-700 rounded w-12"></div>
                            <div className="h-4 bg-security-gray-700 rounded w-16"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};