import { ReactNode } from 'react';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  children?: ReactNode;
  textAlign?: 'left' | 'center' | 'right';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  className = '',
  children,
  textAlign = 'center',
}) => {
  return (
    <header className={`text-${textAlign} ${className}`}>
      <div className='inline-flex items-center space-x-2 bg-navy-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-2 mb-6'>
        <svg
          className='w-4 h-4 text-cyan-400'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          aria-hidden='true'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
          />
        </svg>
        <span className='text-cyan-400 font-medium text-sm'>
          Cybersecurity Insights
        </span>
      </div>

      <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
        {title}
      </h2>

      {subtitle && (
        <p className='text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed'>
          {subtitle}
        </p>
      )}

      {children && <div className='mt-8'>{children}</div>}
    </header>
  );
};
