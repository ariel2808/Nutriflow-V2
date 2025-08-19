import React from 'react';
import { motion } from 'motion/react';

interface MacroMetric {
  consumed: number;
  target: number;
  unit: string;
}

interface MacroDashboardData {
  calories: MacroMetric;
  carbs: MacroMetric;
  protein: MacroMetric;
  fat: MacroMetric;
}

interface MacroDashboardProps {
  data?: MacroDashboardData;
}

// Default sample data
const DEFAULT_DATA: MacroDashboardData = {
  calories: { consumed: 1721, target: 2213, unit: 'kcal' },
  carbs: { consumed: 95, target: 110, unit: 'g' },
  protein: { consumed: 78, target: 90, unit: 'g' },
  fat: { consumed: 45, target: 70, unit: 'g' }
};

// Clean macro configuration
const MACRO_CONFIG = [
  { 
    key: 'calories' as keyof MacroDashboardData, 
    label: 'Calories',
    color: 'var(--chart-1)', // Primary blue
    unit: 'kcal'
  },
  { 
    key: 'protein' as keyof MacroDashboardData, 
    label: 'Protein',
    color: 'var(--chart-2)', // Green
    unit: 'g'
  },
  { 
    key: 'carbs' as keyof MacroDashboardData, 
    label: 'Carbs',
    color: 'var(--chart-5)', // Purple
    unit: 'g'
  },
  { 
    key: 'fat' as keyof MacroDashboardData, 
    label: 'Fat',
    color: 'var(--chart-3)', // Orange
    unit: 'g'
  }
];

interface MacroColumnProps {
  macro: typeof MACRO_CONFIG[0];
  data: MacroMetric;
  index: number;
}

function MacroColumn({ macro, data, index }: MacroColumnProps) {
  const progress = Math.min(data.consumed / data.target, 1);
  const isExceeded = data.consumed > data.target;
  const percentage = Math.round((data.consumed / data.target) * 100);

  return (
    <motion.div 
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        ease: "easeOut" 
      }}
    >
      {/* Macro label */}
      <h4 
        className="text-xs mb-2 text-center"
        style={{ 
          color: 'var(--text-primary)',
          fontWeight: 500
        }}
      >
        {macro.label}
      </h4>
      
      {/* Vertical progress bar container */}
      <div className="relative w-3 h-24 mb-2">
        {/* Background track */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{ 
            backgroundColor: 'var(--border)',
            opacity: 0.3 
          }}
        />
        
        {/* Progress fill - grows from bottom */}
        <motion.div
          className="absolute bottom-0 left-0 w-full rounded-full"
          style={{ 
            backgroundColor: macro.color,
            boxShadow: progress > 0.8 ? `0 0 8px ${macro.color}20` : 'none'
          }}
          initial={{ height: 0 }}
          animate={{ height: `${Math.min(progress * 100, 100)}%` }}
          transition={{ 
            duration: 0.8, 
            delay: 0.3 + (index * 0.1),
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
        />
        
        {/* Overflow indicator for exceeded values */}
        {isExceeded && (
          <motion.div
            className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full"
            style={{ backgroundColor: 'var(--chart-4)' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              delay: 1.2 + (index * 0.1), 
              duration: 0.3,
              ease: "backOut"
            }}
          />
        )}
      </div>
      
      {/* Values */}
      <div 
        className="text-xs text-center tabular-nums"
        style={{ 
          color: isExceeded ? 'var(--chart-4)' : 'var(--text-secondary)',
          fontWeight: 500
        }}
      >
        <div>{data.consumed}</div>
        <div className="opacity-60">/{data.target}{macro.key === 'calories' ? '' : 'g'}</div>
      </div>
    </motion.div>
  );
}

export function MacroDashboard({ data = DEFAULT_DATA }: MacroDashboardProps) {
  return (
    <motion.div 
      className="px-1 py-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="mb-4">
        <h2 
          className="text-lg mb-1"
          style={{ 
            color: 'var(--text-primary)',
            fontWeight: 600
          }}
        >
          Today's Summary
        </h2>
        <p 
          className="text-sm"
          style={{ 
            color: 'var(--text-secondary)'
          }}
        >
          Your nutrition progress for today
        </p>
      </div>

      {/* Vertical macro columns */}
      <div className="flex justify-between items-start gap-2">
        {MACRO_CONFIG.map((macro, index) => (
          <MacroColumn
            key={macro.key}
            macro={macro}
            data={data[macro.key]}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
}