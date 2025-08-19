import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface NutritionMetric {
  id: string;
  label: string;
  current: number;
  target: number;
  unit: string;
  percentage: number;
  gradient: string[];
  glowColor: string;
}

interface TodaysSummaryProps {
  className?: string;
}

export function TodaysSummary({ className = '' }: TodaysSummaryProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Nutrition data with exact specifications
  const caloriesMetric: NutritionMetric = {
    id: 'calories',
    label: 'Calories',
    current: 1721,
    target: 2213,
    unit: '',
    percentage: 78,
    gradient: ['#BFDBFE', '#93C5FD', '#60A5FA'],
    glowColor: 'rgba(147, 197, 253, 0.3)'
  };

  const macroMetrics: NutritionMetric[] = [
    {
      id: 'protein',
      label: 'Protein',
      current: 78,
      target: 90,
      unit: 'g',
      percentage: 87,
      gradient: ['#A7F3D0', '#6EE7B7', '#34D399'],
      glowColor: 'rgba(110, 231, 183, 0.3)'
    },
    {
      id: 'carbs',
      label: 'Carbs',
      current: 95,
      target: 110,
      unit: 'g',
      percentage: 86,
      gradient: ['#DDD6FE', '#C4B5FD', '#A78BFA'],
      glowColor: 'rgba(196, 181, 253, 0.3)'
    },
    {
      id: 'fat',
      label: 'Fat',
      current: 45,
      target: 70,
      unit: 'g',
      percentage: 64,
      gradient: ['#FEF3C7', '#FDE68A', '#FBBF24'],
      glowColor: 'rgba(253, 230, 138, 0.3)'
    }
  ];

  // Trigger animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const ProgressBar = ({ 
    metric, 
    index, 
    isCalories = false 
  }: { 
    metric: NutritionMetric; 
    index: number; 
    isCalories?: boolean;
  }) => {
    const [hovered, setHovered] = useState(false);
    const isIncomplete = metric.percentage < 100;
    
    // Different bar widths for calories vs macros
    const barWidth = isCalories ? 255 : 75; // Calories bar matches width of 3 macro bars combined
    const barHeight = 16;

    return (
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.1 + (index * 0.1),
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          transform: hovered ? 'translateY(-4px) scale(1.08)' : 'translateY(0) scale(1)',
          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          filter: hovered ? 'brightness(1.1)' : 'brightness(1)',
          width: isCalories ? '100%' : 'auto'
        }}
      >
        {/* Label */}
        <div 
          className={`mb-3 text-center ${isCalories ? 'w-full' : ''}`}
          style={{
            fontSize: '13px',
            fontWeight: 'bold',
            color: 'var(--text-primary)'
          }}
        >
          {metric.label}
        </div>

        {/* Progress Bar Container - Horizontal */}
        <div className="relative mb-4" style={{ width: isCalories ? '100%' : 'auto' }}>
          {/* Track (background) */}
          <div
            className="relative"
            style={{
              width: isCalories ? '100%' : `${barWidth}px`,
              height: `${barHeight}px`,
              background: 'linear-gradient(145deg, var(--bg-card), var(--border))',
              borderRadius: '8px',
              boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.05)',
              position: 'relative'
            }}
          >
            {/* Fill (progress) - Fills left to right */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ 
                width: isVisible ? `${metric.percentage}%` : 0 
              }}
              transition={{
                duration: 1.5,
                delay: 0.2 + (index * 0.1),
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              style={{
                height: `${barHeight}px`,
                borderRadius: '8px',
                background: `linear-gradient(to right, ${metric.gradient[0]}, ${metric.gradient[1]}, ${metric.gradient[2]})`,
                boxShadow: `
                  0 2px 8px rgba(0,0,0,0.15),
                  0 0 20px ${metric.glowColor},
                  inset 0 1px 2px rgba(255,255,255,0.3)
                `,
                position: 'absolute',
                top: 0,
                left: 0
              }}
            >
              {/* Enhanced glow effect on hover and pulse for incomplete */}
              {(hovered || isIncomplete) && (
                <motion.div
                  className="absolute inset-0"
                  style={{
                    borderRadius: '8px',
                    background: `linear-gradient(to right, ${metric.gradient[0]}, ${metric.gradient[1]}, ${metric.gradient[2]})`,
                    opacity: 0.6
                  }}
                  animate={
                    isIncomplete && !hovered 
                      ? {
                          boxShadow: [
                            `0 0 20px ${metric.glowColor}`,
                            `0 0 30px ${metric.glowColor}`,
                            `0 0 20px ${metric.glowColor}`
                          ]
                        }
                      : {
                          boxShadow: `0 0 25px ${metric.glowColor}`
                        }
                  }
                  transition={{
                    duration: isIncomplete && !hovered ? 2 : 0.3,
                    repeat: isIncomplete && !hovered ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.div>
          </div>
        </div>

        {/* Values */}
        <div className="text-center">
          {/* Current value */}
          <div
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: 'var(--text-primary)',
              lineHeight: '1.2'
            }}
          >
            {metric.current}
          </div>
          {/* Target value */}
          <div
            style={{
              fontSize: '12px',
              color: 'var(--text-secondary)',
              lineHeight: '1.2'
            }}
          >
            /{metric.target}{metric.unit}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      className={`relative ${className} w-full overflow-hidden`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        maxWidth: '100%',
        backgroundColor: 'var(--bg-card)',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        margin: '0 auto',
        border: '1px solid var(--border)'
      }}
    >
      {/* Header */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2
          style={{
            fontSize: '18px',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '4px',
            lineHeight: '1.3'
          }}
        >
          Today's Summary
        </h2>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--text-secondary)',
            margin: '0',
            lineHeight: '1.4'
          }}
        >
          Your nutrition progress for today
        </p>
      </motion.div>

      {/* 2-Row Layout */}
      <div className="space-y-6">
        {/* First Row: Calories Only */}
        <div className="w-full">
          <ProgressBar
            key={caloriesMetric.id}
            metric={caloriesMetric}
            index={0}
            isCalories={true}
          />
        </div>

        {/* Second Row: Protein, Carbs, Fat */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            justifyItems: 'center'
          }}
        >
          {macroMetrics.map((metric, index) => (
            <ProgressBar
              key={metric.id}
              metric={metric}
              index={index + 1} // Offset index since calories is first
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}