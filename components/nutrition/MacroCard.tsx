import React from 'react';
import { MacroWithProgress } from './NutritionTypes';

interface MacroCardProps {
  macro: MacroWithProgress;
}

export function MacroCard({ macro }: MacroCardProps) {
  return (
    <div className="bg-gray-50/40 rounded-xl p-4 border border-gray-200/50 w-32 h-24 flex flex-col justify-between">
      {/* Header with name */}
      <div>
        <span className="text-xs text-foreground">{macro.name}</span>
      </div>
      
      {/* Current vs Target */}
      <div>
        <span className="text-xs text-foreground">
          {macro.current} / {macro.target}{macro.unit}
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-gray-200/60 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{ 
            width: `${Math.min(macro.percentage, 100)}%`,
            backgroundColor: macro.color
          }}
        />
      </div>
    </div>
  );
}