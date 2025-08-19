import React from 'react';
import svgPaths from "../../imports/svg-bu1iztwcg8";

interface CircularProgressRingProps {
  value?: number;
  maxValue?: number;
  unit?: string;
  label?: string;
  size?: number;
}

export function CircularProgressRing({ 
  value = 0, 
  maxValue = 1, 
  unit = '', 
  label = '', 
  size = 52 
}: CircularProgressRingProps) {
  // Ensure we have valid numbers and prevent division by zero
  const safeValue = typeof value === 'number' && !isNaN(value) ? value : 0;
  const safeMaxValue = typeof maxValue === 'number' && !isNaN(maxValue) && maxValue > 0 ? maxValue : 1;
  
  const percentage = (safeValue / safeMaxValue) * 100;
  const safePercentage = Math.min(Math.max(percentage || 0, 0), 100); // Clamp between 0-100
  
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (safePercentage / 100) * circumference;

  return (
    <div className="flex flex-col gap-2 items-center justify-start relative">
      {/* Progress Ring Container */}
      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative">
        {/* Background Ring */}
        <div className="[grid-area:1_/_1] ml-0 mt-0 relative" style={{ width: size, height: size }}>
          <div className="absolute inset-[-6.25%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 60 60"
            >
              <circle
                cx="30"
                cy="30"
                r="26"
                stroke="var(--graph-grid)"
                strokeWidth="6.5"
                fill="none"
              />
            </svg>
          </div>
        </div>
        
        {/* Progress Arc */}
        <div className="[grid-area:1_/_1] ml-0 mt-0 relative" style={{ width: size, height: size }}>
          <div className="absolute inset-[-6.25%]">
            <svg
              className="block size-full -rotate-90"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 60 60"
            >
              <circle
                cx="30"
                cy="30"
                r="26"
                stroke="var(--graph-data)"
                strokeWidth="6.5"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300 ease-out"
              />
            </svg>
          </div>
        </div>
        
        {/* Value Text */}
        <div className="[grid-area:1_/_1] leading-[0] ml-[16.25px] mt-[18.688px] relative text-[10px] text-left text-nowrap" style={{ color: 'var(--text-primary)' }}>
          <p className="block leading-[normal] whitespace-pre font-medium">
            {safeValue}{unit}
          </p>
        </div>
      </div>
      
      {/* Label */}
      <div className="min-w-full relative text-[10px] text-center" style={{ color: 'var(--text-primary)' }}>
        <p className="block leading-[normal] font-medium">{label}</p>
      </div>
    </div>
  );
}