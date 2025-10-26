'use client';

import { useState, useEffect } from 'react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showNumbers?: boolean;
  showEllipsis?: boolean;
  maxVisiblePages?: number;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showNumbers = true,
  showEllipsis = true,
  maxVisiblePages = 5,
  className = '',
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle page change with animation
  const handlePageChange = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) return;

    setIsAnimating(true);
    onPageChange(page);

    // Reset animation state after transition
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if needed to ensure we show maxVisiblePages
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Add first page
    if (showFirstLast && startPage > 1) {
      pages.push(1);
      if (showEllipsis && startPage > 2) {
        pages.push('ellipsis-start');
      }
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add last page
    if (showFirstLast && endPage < totalPages) {
      if (showEllipsis && endPage < totalPages - 1) {
        pages.push('ellipsis-end');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      className={`pagination ${className}`}
      role='navigation'
      aria-label='Pagination'
    >
      <ul
        className={`inline-flex items-center space-x-1 ${isAnimating ? 'opacity-75' : 'opacity-100'} transition-opacity duration-300`}
      >
        {/* Previous button */}
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='flex items-center justify-center w-8 h-8 bg-navy-700 text-gray-300 rounded-lg border border-navy-600 hover:bg-cyan-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300'
            aria-label='Previous page'
            aria-disabled={currentPage === 1}
          >
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>
        </li>

        {/* Page numbers */}
        {showNumbers &&
          pages.map((page, index) => (
            <li key={index}>
              {page === 'ellipsis-start' || page === 'ellipsis-end' ? (
                <span className='flex items-center justify-center w-8 h-8 text-gray-400'>
                  <svg
                    className='w-4 h-4'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 3a1 1 0 011 1v1a1 1 0 11-2 0V4a1 1 0 011-1zM10 13a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM10 8a1 1 0 011 1v1a1 1 0 11-2 0V9a1 1 0 011-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
              ) : (
                <button
                  onClick={() => handlePageChange(page as number)}
                  className={`flex items-center justify-center w-8 h-8 rounded-lg border transition-colors duration-300 ${
                    currentPage === page
                      ? 'bg-cyan-600 text-white border-cyan-500'
                      : 'bg-navy-700 text-gray-300 border-navy-600 hover:bg-cyan-600 hover:text-white'
                  }`}
                  aria-label={`Go to page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              )}
            </li>
          ))}

        {/* Next button */}
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='flex items-center justify-center w-8 h-8 bg-navy-700 text-gray-300 rounded-lg border border-navy-600 hover:bg-cyan-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300'
            aria-label='Next page'
            aria-disabled={currentPage === totalPages}
          >
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        </li>
      </ul>

      {/* Page info for screen readers */}
      <div className='sr-only'>
        Page {currentPage} of {totalPages}
      </div>

      <style jsx>{`
        .pagination ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .pagination li {
          display: inline-block;
        }

        .pagination button {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </nav>
  );
};
