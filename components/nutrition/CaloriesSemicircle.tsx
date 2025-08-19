import React from 'react';
import { Flame } from 'lucide-react';
import { CaloriesData } from './NutritionTypes';

interface CaloriesSemicircleProps {
  data: CaloriesData;
}

export function CaloriesSemicircle({ data }: CaloriesSemicircleProps) {
  const percentage = Math.min((data.consumed / data.target) * 100, 100);
  const size = 200;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius; // Half circle
  
  // Create segments for the semicircle
  const segments = 20;
  const segmentAngle = 180 / segments; // 180 degrees for semicircle
  const activeSegments = Math.floor((percentage / 100) * segments);
  
  const createSegmentPath = (index: number) => {
    const angle = 180 + (index * segmentAngle); // Start from left (180°)
    const startAngleRad = (angle * Math.PI) / 180;
    const endAngleRad = ((angle + segmentAngle - 2) * Math.PI) / 180; // -2 for gap
    
    const outerRadius = radius + 6;
    const innerRadius = radius - 6;
    
    const x1 = size / 2 + innerRadius * Math.cos(startAngleRad);
    const y1 = size / 2 + innerRadius * Math.sin(startAngleRad);
    const x2 = size / 2 + outerRadius * Math.cos(startAngleRad);
    const y2 = size / 2 + outerRadius * Math.sin(startAngleRad);
    const x3 = size / 2 + outerRadius * Math.cos(endAngleRad);
    const y3 = size / 2 + outerRadius * Math.sin(endAngleRad);
    const x4 = size / 2 + innerRadius * Math.cos(endAngleRad);
    const y4 = size / 2 + innerRadius * Math.sin(endAngleRad);
    
    return `M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} Z`;
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative">
        <svg width={size} height={size / 2 + 20} className="overflow-visible">
          {/* Background segments */}
          {Array.from({ length: segments }, (_, i) => (
            <path
              key={i}
              d={createSegmentPath(i)}
              fill={i < activeSegments ? '#8b5cf6' : '#f3f4f6'}
              className="transition-all duration-500 ease-out"
            />
          ))}
        </svg>
        
        {/* Flame icon */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
          <div className="bg-orange-50/80 rounded-full p-2">
            <Flame size={16} className="text-orange-400" />
          </div>
        </div>
        
        {/* Center content */}
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-4xl text-foreground mb-1">
            {data.remaining.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">
            kcal
          </div>
        </div>
      </div>
    </div>
  );
}