import React from 'react';
import { motion } from 'motion/react';

interface WorkoutDetailsProps {
  event: {
    id: string;
    title: string;
    subtitle: string;
    time: string;
    type: 'coffee' | 'workout' | 'meal' | 'swim' | 'fueling';
    description?: string;
    duration?: number;
    intensity?: 'LOW' | 'MEDIUM' | 'HIGH';
    workoutDetails?: {
      distance?: number;
      pace?: string;
      speed?: number;
      workoutType?: string;
      location?: string;
      customType?: string;
      focus?: string;
      exerciseCount?: number;
    };
  };
}

export function WorkoutDetailsSection({ event }: WorkoutDetailsProps) {
  const getWorkoutType = (): string => {
    if (event.type === 'swim') return 'swimming';
    if (event.title.toLowerCase().includes('run')) return 'running';
    if (event.title.toLowerCase().includes('cycle') || event.title.toLowerCase().includes('bike')) return 'cycling';
    if (event.title.toLowerCase().includes('strength') || event.title.toLowerCase().includes('gym')) return 'strength';
    return 'other';
  };

  const getIntensityColor = (intensity?: string) => {
    switch (intensity?.toLowerCase()) {
      case 'low':
      case 'easy':
        return '#10B981'; // Green
      case 'medium':
      case 'moderate':
        return '#4A90E2'; // Blue
      case 'high':
      case 'hard':
        return '#F59E0B'; // Orange
      case 'max':
      case 'max effort':
        return '#EF4444'; // Red
      default:
        return '#6B7280'; // Gray
    }
  };

  const getIntensityText = (intensity?: string) => {
    switch (intensity?.toLowerCase()) {
      case 'low':
        return 'Easy';
      case 'medium':
        return 'Moderate';
      case 'high':
        return 'Hard';
      default:
        return intensity || 'Moderate';
    }
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return event.duration ? `${event.duration} minutes` : '45 minutes';
    return `${minutes} minutes`;
  };

  const workoutType = getWorkoutType();
  const details = event.workoutDetails || {};
  
  // Create sample data for demonstration if no details exist
  const sampleData = {
    swimming: {
      distance: 2000,
      pace: '1:45',
      location: 'Pool',
      workoutType: 'Technique'
    },
    running: {
      distance: 10,
      pace: '5:30',
      workoutType: 'Recovery'
    },
    cycling: {
      distance: 40,
      speed: 30,
      workoutType: 'Endurance'
    },
    strength: {
      // Only show custom type for "Other" workouts - strength typically doesn't have custom type
    }
  };

  const displayData = Object.keys(details).length > 0 ? details : sampleData[workoutType as keyof typeof sampleData] || {};

  const renderWorkoutInfo = () => {
    if (workoutType === 'swimming') {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <InfoCard 
              label="Distance" 
              value={`${displayData.distance || 2000}m`} 
              isPrimary 
            />
            <InfoCard 
              label="Location" 
              value={displayData.location || 'Pool'} 
              isPill 
            />
          </div>
          <div className="space-y-3">
            <InfoCard 
              label="Target Pace" 
              value={`${displayData.pace || '1:45'} /100m`} 
              isPrimary 
            />
            <InfoCard 
              label="Workout Type" 
              value={displayData.workoutType || 'Technique'} 
              isPill 
            />
          </div>
        </div>
      );
    }

    if (workoutType === 'running') {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InfoCard 
              label="Distance" 
              value={`${displayData.distance || 10}km`} 
              isPrimary 
            />
            <InfoCard 
              label="Target Pace" 
              value={`${displayData.pace || '5:30'} /km`} 
              isPrimary 
            />
          </div>
          <InfoCard 
            label="Workout Type" 
            value={displayData.workoutType || 'Recovery'} 
            isPill 
          />
        </div>
      );
    }

    if (workoutType === 'cycling') {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InfoCard 
              label="Distance" 
              value={`${displayData.distance || 40}km`} 
              isPrimary 
            />
            <InfoCard 
              label="Target Speed" 
              value={`${displayData.speed || 30} km/h`} 
              isPrimary 
            />
          </div>
          <InfoCard 
            label="Workout Type" 
            value={displayData.workoutType || 'Endurance'} 
            isPill 
          />
        </div>
      );
    }

    if (workoutType === 'strength') {
      return (
        <div className="grid grid-cols-1 gap-4">
          {displayData.customType && (
            <InfoCard 
              label="Workout Type" 
              value={displayData.customType} 
              isPill 
            />
          )}
        </div>
      );
    }

    // Default for other workout types - show custom type if available
    return (
      <div className="grid grid-cols-1 gap-4">
        {displayData.customType && (
          <InfoCard 
            label="Workout Type" 
            value={displayData.customType} 
            isPill 
          />
        )}
      </div>
    );
  };

  return (
    <motion.div
      className="text-left mb-6"
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
      }}
    >
      {/* Section Header */}
      <h3 
        className="text-sm font-medium mb-4"
        style={{ color: 'var(--text-secondary)' }}
      >
        Workout Details
      </h3>

      {/* Workout Information Cards */}
      <div 
        className="rounded-xl p-5 mb-4"
        style={{ backgroundColor: 'var(--bg-card)' }}
      >
        {renderWorkoutInfo()}
        
        {/* Intensity Row */}
        <div 
          className="grid grid-cols-1 gap-4 mt-4 pt-4 border-t"
          style={{ borderTopColor: 'var(--border)' }}
        >
          <InfoCard 
            label="Intensity" 
            value={getIntensityText(event.intensity)} 
            intensityColor={getIntensityColor(event.intensity)}
          />
        </div>
      </div>

      {/* Summary Text */}
      {event.description && (
        <motion.div 
          className="text-left rounded-xl p-4"
          style={{ backgroundColor: 'var(--bg-card)' }}
          variants={{
            hidden: { y: 10, opacity: 0 },
            visible: { y: 0, opacity: 1 }
          }}
        >
          <p 
            className="text-sm leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {event.description}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

interface InfoCardProps {
  label: string;
  value: string;
  isPrimary?: boolean;
  isPill?: boolean;
  intensityColor?: string;
}

function InfoCard({ label, value, isPrimary, isPill, intensityColor }: InfoCardProps) {
  if (isPill) {
    return (
      <div>
        <p 
          className="text-xs mb-2"
          style={{ color: 'var(--text-secondary)' }}
        >
          {label}
        </p>
        <div 
          className="inline-block px-3 py-1.5 rounded-full text-xs font-medium"
          style={{ 
            backgroundColor: intensityColor ? `${intensityColor}20` : 'var(--bg-card)',
            color: intensityColor || 'var(--text-primary)',
            border: `1px solid ${intensityColor ? `${intensityColor}40` : 'var(--border)'}`
          }}
        >
          {value}
        </div>
      </div>
    );
  }

  return (
    <div>
      <p 
        className="text-xs mb-1"
        style={{ color: 'var(--text-secondary)' }}
      >
        {label}
      </p>
      <p 
        className={isPrimary ? 'text-base font-semibold' : 'text-sm'}
        style={{ color: intensityColor || 'var(--text-primary)' }}
      >
        {value}
      </p>
    </div>
  );
}