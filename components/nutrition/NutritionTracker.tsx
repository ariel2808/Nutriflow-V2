import React from 'react';
import { MacroDashboard } from './MacroDashboard';

interface NutritionTrackerProps {
  onExpandClick?: () => void; // Keep for backwards compatibility but don't use
}

export function NutritionTracker({ onExpandClick }: NutritionTrackerProps) {
  return (
    <div className="mb-6">
      {/* Today's Summary with Clean Vertical Progress Bars */}
      <MacroDashboard />
    </div>
  );
}