'use client';

import { BlogCategory } from '@/types';

export interface CategoryFilterProps {
  categories: BlogCategory[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
  showAllOption?: boolean;
  allLabel?: string;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  className = "",
  showAllOption = true,
  allLabel = "All Categories"
}) => {
  const getCategoryColor = (category: BlogCategory) => {
    switch (category.color) {
      case 'neon-green':
        return 'bg-neon-green-600/20 text-neon-green-400 border-neon-green-500/30';
      case 'electric-cyan':
        return 'bg-cyan-600/20 text-cyan-400 border-cyan-500/30';
      case 'light-blue':
        return 'bg-blue-600/20 text-blue-400 border-blue-500/30';
      case 'purple':
        return 'bg-purple-600/20 text-purple-400 border-purple-500/30';
      case 'orange':
        return 'bg-orange-600/20 text-orange-400 border-orange-500/30';
      case 'red':
        return 'bg-red-600/20 text-red-400 border-red-500/30';
      case 'yellow':
        return 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30';
      case 'pink':
        return 'bg-pink-600/20 text-pink-400 border-pink-500/30';
      default:
        return 'bg-navy-700 text-gray-300 border-navy-600';
    }
  };

  const getSelectedCategoryColor = (category: BlogCategory) => {
    switch (category.color) {
      case 'neon-green':
        return 'bg-neon-green-600 text-white border-neon-green-500';
      case 'electric-cyan':
        return 'bg-cyan-600 text-white border-cyan-500';
      case 'light-blue':
        return 'bg-blue-600 text-white border-blue-500';
      case 'purple':
        return 'bg-purple-600 text-white border-purple-500';
      case 'orange':
        return 'bg-orange-600 text-white border-orange-500';
      case 'red':
        return 'bg-red-600 text-white border-red-500';
      case 'yellow':
        return 'bg-yellow-600 text-white border-yellow-500';
      case 'pink':
        return 'bg-pink-600 text-white border-pink-500';
      default:
        return 'bg-cyan-600 text-white border-cyan-500';
    }
  };

  const renderCategoryButton = (category: BlogCategory, index: number) => {
    const isSelected = selectedCategory === category.slug;
    const baseClasses = "px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-300 flex items-center space-x-2 min-w-max";
    const colorClasses = isSelected 
      ? getSelectedCategoryColor(category)
      : getCategoryColor(category);

    return (
      <button
        key={category.id}
        onClick={() => onCategoryChange(category.slug)}
        className={`${baseClasses} ${colorClasses}`}
        aria-pressed={isSelected}
        aria-label={`Filter by ${category.name} category`}
      >
        {category.icon && (
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
            />
          </svg>
        )}
        <span>{category.name}</span>
        <span className="text-xs opacity-75">({category.postCount})</span>
      </button>
    );
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`} role="group" aria-label="Category filter">
      {showAllOption && (
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-300 flex items-center space-x-2 min-w-max ${
            selectedCategory === 'all'
              ? 'bg-cyan-600 text-white border-cyan-500'
              : 'bg-navy-700 text-gray-300 border-navy-600 hover:bg-navy-600'
          }`}
          aria-pressed={selectedCategory === 'all'}
          aria-label="Show all categories"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
          <span>{allLabel}</span>
        </button>
      )}
      
      {categories.map((category, index) => renderCategoryButton(category, index))}
    </div>
  );
};