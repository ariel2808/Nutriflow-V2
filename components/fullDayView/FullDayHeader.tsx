import React from 'react';
import { ChevronLeft, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { formatDate } from './DateUtils';

interface FullDayHeaderProps {
  date: Date;
  onBack: () => void;
  onAddClick: () => void;
}

export function FullDayHeader({ date, onBack, onAddClick }: FullDayHeaderProps) {
  return (
    <>
      {/* Status Bar */}
      <div 
        className="flex justify-between items-center mb-8 text-sm"
        style={{ color: 'var(--text-secondary)' }}
      >
        <span>8:00 AM</span>
        <div className="flex items-center gap-2">
          <span style={{ fontWeight: 500 }}>22°C</span>
          <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <motion.button 
            onClick={onBack} 
            className="p-2 -ml-2 rounded-lg transition-all duration-200"
            style={{ backgroundColor: 'transparent' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-card)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <ChevronLeft size={24} style={{ color: 'var(--icon-secondary)' }} />
          </motion.button>
          <h1 className="text-xl" style={{ color: 'var(--text-primary)' }}>{formatDate(date)}</h1>
        </div>
        
        {/* Add Button */}
        <motion.button 
          onClick={onAddClick}
          className="p-2 rounded-lg transition-all duration-200"
          style={{ backgroundColor: 'transparent' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-card)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Plus size={20} style={{ color: 'var(--icon-secondary)' }} />
        </motion.button>
      </div>
    </>
  );
}