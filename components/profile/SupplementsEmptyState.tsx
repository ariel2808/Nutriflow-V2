import React from 'react';
import { Pill, CircleDot } from 'lucide-react';

interface SupplementsEmptyStateProps {
  onAddSupplement: () => void;
}

export function SupplementsEmptyState({ onAddSupplement }: SupplementsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6">
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: 'var(--bg-card)' }}
      >
        <div className="relative">
          <Pill size={24} className="text-blue-500" />
          <CircleDot size={16} className="text-green-500 absolute -top-1 -right-1" />
        </div>
      </div>
      <h3 
        className="text-lg mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        No supplements added yet
      </h3>
      <p 
        className="text-sm text-center mb-6 leading-relaxed"
        style={{ color: 'var(--text-secondary)' }}
      >
        Track your vitamins, proteins, and other supplements to optimize your nutrition plan.
      </p>
      <button
        onClick={onAddSupplement}
        className="px-6 py-2.5 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-colors"
      >
        Add your first supplement
      </button>
    </div>
  );
}