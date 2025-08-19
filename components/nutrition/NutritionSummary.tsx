import React from 'react';
import { CircularProgressRing } from './CircularProgressRing';
import { SAMPLE_CALORIES, SAMPLE_MACROS } from './NutritionData';

export function NutritionSummary() {
  // Calculate calorie percentage
  const caloriePercentage = (SAMPLE_CALORIES.consumed / SAMPLE_CALORIES.target) * 100;

  return (
    <div className="box-border flex flex-col gap-[30px] items-center justify-start px-[18px] py-4 relative w-full">
      {/* Header */}
      <div className="leading-[0] relative w-full text-left">
        <h2 className="text-lg text-foreground">Today's Summary</h2>
      </div>
      
      {/* Progress Rings */}
      <div className="box-border flex flex-row items-center justify-between p-0 relative w-full">
        {/* Calories */}
        <CircularProgressRing
          value={SAMPLE_CALORIES.consumed}
          maxValue={SAMPLE_CALORIES.target}
          unit=""
          label="Calories"
        />
        
        {/* Protein */}
        <CircularProgressRing
          value={SAMPLE_MACROS[1].current}
          maxValue={SAMPLE_MACROS[1].target}
          unit="g"
          label="Protein"
        />
        
        {/* Carbs */}
        <CircularProgressRing
          value={SAMPLE_MACROS[0].current}
          maxValue={SAMPLE_MACROS[0].target}
          unit="g"
          label="Carbs"
        />
        
        {/* Fat */}
        <CircularProgressRing
          value={SAMPLE_MACROS[2].current}
          maxValue={SAMPLE_MACROS[2].target}
          unit="g"
          label="Fat"
        />
      </div>
    </div>
  );
}