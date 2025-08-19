import React from 'react';
import { ChevronRight } from 'lucide-react';
import { PreferenceItem } from './ProfileData';

interface ActionButtonProps {
  item: PreferenceItem;
  onClick?: () => void;
}

export function ActionButton({ item, onClick }: ActionButtonProps) {
  const Icon = item.icon;
  
  return (
    <button 
      onClick={onClick}
      className="w-full rounded-xl p-4 flex items-center justify-between transition-all duration-200"
      style={{ 
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-main)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-card)';
      }}
    >
      <div className="flex items-center gap-3">
        <div 
          className={`w-8 h-8 ${item.iconBg} rounded-full flex items-center justify-center`}
        >
          <Icon size={16} className={item.iconColor} />
        </div>
        <span 
          className="text-sm font-medium"
          style={{ color: item.textColor === 'text-red-500' ? '#EF4444' : 'var(--text-primary)' }}
        >
          {item.label}
        </span>
      </div>
      <ChevronRight size={16} style={{ color: 'var(--text-placeholder)' }} />
    </button>
  );
}