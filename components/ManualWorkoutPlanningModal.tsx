import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Timer, Activity, Bike, Waves, Dumbbell, Heart, Zap, MoreHorizontal } from 'lucide-react';

interface ManualWorkoutPlanningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (workoutData: WorkoutPlanData) => void;
  initialData?: WorkoutPlanData;
}

interface WorkoutPlanData {
  name: string;
  time: string;
  duration: number;
  type: string;
  intensity: string;
  notes: string;
  sportSpecific?: {
    distance?: number;
    pace?: string;
    speed?: number;
    workoutType?: string;
    location?: string;
    customType?: string;
  };
}

const workoutTypes = [
  { value: 'running', label: 'Running', icon: Activity, color: '#FF6B35' },
  { value: 'cycling', label: 'Cycling', icon: Bike, color: '#4A90E2' },
  { value: 'swimming', label: 'Swimming', icon: Waves, color: '#06B6D4' },
  { value: 'strength', label: 'Strength', icon: Dumbbell, color: '#8B5CF6' },
  { value: 'pilates', label: 'Pilates', icon: Heart, color: '#EC4899' },
  { value: 'crossfit', label: 'CrossFit', icon: Zap, color: '#F59E0B' },
  { value: 'other', label: 'Other', icon: MoreHorizontal, color: '#6B7280' }
];

const intensityLevels = [
  { value: 'easy', label: 'Easy' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'hard', label: 'Hard' },
  { value: 'max', label: 'Max Effort' }
];

const runningWorkoutTypes = ['Endurance', 'Volume', 'Recovery', 'Intervals', 'Fartlek', 'Other'];
const cyclingWorkoutTypes = ['Endurance', 'Volume', 'Recovery', 'Intervals', 'Tempo', 'Other'];
const swimmingWorkoutTypes = ['Sprints', 'Intervals', 'Volume', 'Technique', 'Recovery', 'Other'];

export function ManualWorkoutPlanningModal({ 
  isOpen, 
  onClose, 
  onSave,
  initialData 
}: ManualWorkoutPlanningModalProps) {
  const [workoutData, setWorkoutData] = useState<WorkoutPlanData>({
    name: '',
    time: '',
    duration: 60,
    type: '',
    intensity: '',
    notes: '',
    sportSpecific: {}
  });

  // Update workoutData when initialData changes (for editing)
  useEffect(() => {
    if (initialData && isOpen) {
      setWorkoutData(initialData);
    } else if (isOpen && !initialData) {
      // Reset to empty state for new workouts
      setWorkoutData({
        name: '',
        time: '',
        duration: 60,
        type: '',
        intensity: '',
        notes: '',
        sportSpecific: {}
      });
    }
  }, [initialData, isOpen]);

  const handleInputChange = (field: keyof WorkoutPlanData, value: any) => {
    setWorkoutData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSportSpecificChange = (field: string, value: any) => {
    setWorkoutData(prev => ({
      ...prev,
      sportSpecific: {
        ...prev.sportSpecific,
        [field]: value
      }
    }));
  };

  const handleWorkoutTypeSelect = (type: string) => {
    setWorkoutData(prev => ({
      ...prev,
      type,
      sportSpecific: {} // Reset sport-specific data when changing type
    }));
  };

  const handleSave = () => {
    onSave(workoutData);
    onClose();
  };

  const isFormValid = workoutData.name && workoutData.time && workoutData.type && workoutData.intensity;

  const renderSportSpecificFields = () => {
    const { type } = workoutData;
    
    if (type === 'running') {
      return (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {/* Section Header */}
          <div 
            className="pt-4 border-t"
            style={{ borderColor: 'var(--border)' }}
          >
            <h4 
              className="text-sm font-medium mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Running Details
            </h4>
          </div>

          {/* Distance and Pace */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label 
                className="block text-xs font-medium mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                Distance
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={workoutData.sportSpecific?.distance || ''}
                  onChange={(e) => handleSportSpecificChange('distance', parseFloat(e.target.value))}
                  className="w-full rounded-xl px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: 'var(--input-bg)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'var(--input-border)',
                    color: 'var(--input-text)'
                  }}
                  placeholder="10"
                />
                <span 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  km
                </span>
              </div>
            </div>
            <div>
              <label 
                className="block text-xs font-medium mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                Avg Pace
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={workoutData.sportSpecific?.pace || ''}
                  onChange={(e) => handleSportSpecificChange('pace', e.target.value)}
                  className="w-full rounded-xl px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: 'var(--input-bg)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'var(--input-border)',
                    color: 'var(--input-text)'
                  }}
                  placeholder="5:30"
                />
                <span 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  /km
                </span>
              </div>
            </div>
          </div>

          {/* Workout Type Pills */}
          <div>
            <label 
              className="block text-xs font-medium mb-3"
              style={{ color: 'var(--text-secondary)' }}
            >
              Workout Type
            </label>
            <div className="flex flex-wrap gap-2">
              {runningWorkoutTypes.map((type) => (
                <motion.button
                  key={type}
                  onClick={() => handleSportSpecificChange('workoutType', type)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                  style={{
                    backgroundColor: workoutData.sportSpecific?.workoutType === type ? '#4A90E2' : 'var(--bg-card)',
                    color: workoutData.sportSpecific?.workoutType === type ? '#FFFFFF' : 'var(--text-primary)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: workoutData.sportSpecific?.workoutType === type ? '#4A90E2' : 'var(--border)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {type}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      );
    }

    if (type === 'cycling') {
      return (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div 
            className="pt-4 border-t"
            style={{ borderColor: 'var(--border)' }}
          >
            <h4 
              className="text-sm font-medium mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Cycling Details
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label 
                className="block text-xs font-medium mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                Distance
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={workoutData.sportSpecific?.distance || ''}
                  onChange={(e) => handleSportSpecificChange('distance', parseFloat(e.target.value))}
                  className="w-full rounded-xl px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: 'var(--input-bg)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'var(--input-border)',
                    color: 'var(--input-text)'
                  }}
                  placeholder="50"
                />
                <span 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  km
                </span>
              </div>
            </div>
            <div>
              <label 
                className="block text-xs font-medium mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                Avg Speed
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={workoutData.sportSpecific?.speed || ''}
                  onChange={(e) => handleSportSpecificChange('speed', parseFloat(e.target.value))}
                  className="w-full rounded-xl px-3 py-2 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: 'var(--input-bg)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'var(--input-border)',
                    color: 'var(--input-text)'
                  }}
                  placeholder="30"
                />
                <span 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  km/h
                </span>
              </div>
            </div>
          </div>

          <div>
            <label 
              className="block text-xs font-medium mb-3"
              style={{ color: 'var(--text-secondary)' }}
            >
              Workout Type
            </label>
            <div className="flex flex-wrap gap-2">
              {cyclingWorkoutTypes.map((type) => (
                <motion.button
                  key={type}
                  onClick={() => handleSportSpecificChange('workoutType', type)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                  style={{
                    backgroundColor: workoutData.sportSpecific?.workoutType === type ? '#4A90E2' : 'var(--bg-card)',
                    color: workoutData.sportSpecific?.workoutType === type ? '#FFFFFF' : 'var(--text-primary)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: workoutData.sportSpecific?.workoutType === type ? '#4A90E2' : 'var(--border)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {type}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      );
    }

    if (type === 'swimming') {
      return (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div 
            className="pt-4 border-t"
            style={{ borderColor: 'var(--border)' }}
          >
            <h4 
              className="text-sm font-medium mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Swimming Details
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label 
                className="block text-xs font-medium mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                Distance
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={workoutData.sportSpecific?.distance || ''}
                  onChange={(e) => handleSportSpecificChange('distance', parseFloat(e.target.value))}
                  className="w-full rounded-xl px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: 'var(--input-bg)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'var(--input-border)',
                    color: 'var(--input-text)'
                  }}
                  placeholder="2000"
                />
                <span 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  m
                </span>
              </div>
            </div>
            <div>
              <label 
                className="block text-xs font-medium mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                Avg Pace
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={workoutData.sportSpecific?.pace || ''}
                  onChange={(e) => handleSportSpecificChange('pace', e.target.value)}
                  className="w-full rounded-xl px-3 py-2 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: 'var(--input-bg)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'var(--input-border)',
                    color: 'var(--input-text)'
                  }}
                  placeholder="1:45"
                />
                <span 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  /100m
                </span>
              </div>
            </div>
          </div>

          {/* Location Toggle */}
          <div>
            <label 
              className="block text-xs font-medium mb-3"
              style={{ color: 'var(--text-secondary)' }}
            >
              Location
            </label>
            <div className="flex gap-2">
              {['Pool', 'Open Water'].map((location) => (
                <motion.button
                  key={location}
                  onClick={() => handleSportSpecificChange('location', location)}
                  className="flex-1 px-3 py-2 rounded-xl text-xs font-medium transition-all"
                  style={{
                    backgroundColor: workoutData.sportSpecific?.location === location ? '#4A90E2' : 'var(--bg-card)',
                    color: workoutData.sportSpecific?.location === location ? '#FFFFFF' : 'var(--text-primary)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: workoutData.sportSpecific?.location === location ? '#4A90E2' : 'var(--border)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {location}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label 
              className="block text-xs font-medium mb-3"
              style={{ color: 'var(--text-secondary)' }}
            >
              Workout Type
            </label>
            <div className="flex flex-wrap gap-2">
              {swimmingWorkoutTypes.map((type) => (
                <motion.button
                  key={type}
                  onClick={() => handleSportSpecificChange('workoutType', type)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                  style={{
                    backgroundColor: workoutData.sportSpecific?.workoutType === type ? '#4A90E2' : 'var(--bg-card)',
                    color: workoutData.sportSpecific?.workoutType === type ? '#FFFFFF' : 'var(--text-primary)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: workoutData.sportSpecific?.workoutType === type ? '#4A90E2' : 'var(--border)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {type}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      );
    }

    if (type === 'other') {
      return (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div 
            className="pt-4 border-t"
            style={{ borderColor: 'var(--border)' }}
          >
            <h4 
              className="text-sm font-medium mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Other Details
            </h4>
          </div>

          <div>
            <label 
              className="block text-xs font-medium mb-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              Workout Type
            </label>
            <input
              type="text"
              value={workoutData.sportSpecific?.customType || ''}
              onChange={(e) => handleSportSpecificChange('customType', e.target.value)}
              className="w-full rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                backgroundColor: 'var(--input-bg)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'var(--input-border)',
                color: 'var(--input-text)'
              }}
              placeholder="e.g., Yoga, Boxing, Rock Climbing"
            />
          </div>
        </motion.div>
      );
    }

    return null;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[99999] flex items-end justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Backdrop with blur */}
        <motion.div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          className="relative w-full rounded-t-[24px] shadow-2xl max-h-[85vh] overflow-hidden mx-6"
          style={{ backgroundColor: 'var(--bg-main)' }}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 300,
            duration: 0.3
          }}
        >
          {/* Handle bar */}
          <div className="flex justify-center pt-2 pb-1">
            <div 
              className="w-10 h-1 rounded-full"
              style={{ backgroundColor: 'var(--border)' }}
            />
          </div>

          {/* Header with gradient */}
          <div 
            className="px-5 py-4"
            style={{
              background: 'linear-gradient(to bottom, var(--bg-card), var(--bg-main))'
            }}
          >
            <div className="flex items-center justify-between">
              <h2 
                className="text-lg font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                {initialData ? 'Edit Workout' : 'Plan Workout'}
              </h2>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-lg transition-colors"
                style={{ color: 'var(--icon-secondary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--icon-primary)';
                  e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--icon-secondary)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={20} />
              </motion.button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[calc(85vh-140px)] scrollbar-hidden">
            <div className="px-5 py-4 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <label 
                    className="block text-xs font-medium mb-2"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Workout Name
                  </label>
                  <input
                    type="text"
                    value={workoutData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{
                      backgroundColor: 'var(--input-bg)',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: 'var(--input-border)',
                      color: 'var(--input-text)'
                    }}
                    placeholder="Morning Run"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label 
                      className="block text-xs font-medium mb-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Time
                    </label>
                    <div className="relative">
                      <Clock 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2" 
                        size={16}
                        style={{ color: 'var(--icon-secondary)' }}
                      />
                      <input
                        type="time"
                        value={workoutData.time}
                        onChange={(e) => handleInputChange('time', e.target.value)}
                        className="w-full rounded-xl pl-10 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{
                          backgroundColor: 'var(--input-bg)',
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          borderColor: 'var(--input-border)',
                          color: 'var(--input-text)'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label 
                      className="block text-xs font-medium mb-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Duration
                    </label>
                    <div className="relative">
                      <Timer 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2" 
                        size={16}
                        style={{ color: 'var(--icon-secondary)' }}
                      />
                      <input
                        type="number"
                        value={workoutData.duration}
                        onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                        className="w-full rounded-xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{
                          backgroundColor: 'var(--input-bg)',
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          borderColor: 'var(--input-border)',
                          color: 'var(--input-text)'
                        }}
                        placeholder="60"
                      />
                      <span 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        min
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Workout Type Selection */}
              <div>
                <label 
                  className="block text-sm font-medium mb-3"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Workout Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {workoutTypes.slice(0, 6).map((type) => {
                    const IconComponent = type.icon;
                    const isSelected = workoutData.type === type.value;
                    return (
                      <motion.button
                        key={type.value}
                        onClick={() => handleWorkoutTypeSelect(type.value)}
                        className="flex items-center gap-3 p-3 rounded-xl transition-all h-12"
                        style={{
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          borderColor: isSelected ? '#4A90E2' : 'var(--border)',
                          backgroundColor: isSelected ? 'rgba(74, 144, 226, 0.1)' : 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.borderColor = 'var(--icon-secondary)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.borderColor = 'var(--border)';
                          }
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <IconComponent 
                          size={20} 
                          style={{ 
                            color: isSelected ? '#4A90E2' : type.color,
                            flexShrink: 0
                          }} 
                        />
                        <span 
                          className="text-xs font-medium truncate"
                          style={{ 
                            color: isSelected ? '#4A90E2' : 'var(--text-primary)' 
                          }}
                        >
                          {type.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Other Workout Type Button */}
                <motion.button
                  onClick={() => handleWorkoutTypeSelect('other')}
                  className="w-full flex items-center justify-center gap-3 p-3 rounded-xl transition-all h-12 mt-2"
                  style={{
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: workoutData.type === 'other' ? '#4A90E2' : 'var(--border)',
                    backgroundColor: workoutData.type === 'other' ? 'rgba(74, 144, 226, 0.1)' : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (workoutData.type !== 'other') {
                      e.currentTarget.style.borderColor = 'var(--icon-secondary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (workoutData.type !== 'other') {
                      e.currentTarget.style.borderColor = 'var(--border)';
                    }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MoreHorizontal 
                    size={20} 
                    style={{ 
                      color: workoutData.type === 'other' ? '#4A90E2' : '#6B7280',
                      flexShrink: 0
                    }} 
                  />
                  <span 
                    className="text-xs font-medium"
                    style={{ 
                      color: workoutData.type === 'other' ? '#4A90E2' : 'var(--text-primary)' 
                    }}
                  >
                    Other
                  </span>
                </motion.button>
              </div>

              {/* Sport-specific Fields */}
              <AnimatePresence mode="wait">
                {workoutData.type && renderSportSpecificFields()}
              </AnimatePresence>

              {/* Intensity Selection */}
              <div>
                <label 
                  className="block text-sm font-medium mb-3"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Intensity Level
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {intensityLevels.map((level) => (
                    <motion.button
                      key={level.value}
                      onClick={() => handleInputChange('intensity', level.value)}
                      className="p-3 rounded-xl text-xs font-medium transition-all"
                      style={{
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: workoutData.intensity === level.value ? '#4A90E2' : 'var(--border)',
                        backgroundColor: workoutData.intensity === level.value ? 'rgba(74, 144, 226, 0.1)' : 'transparent',
                        color: workoutData.intensity === level.value ? '#4A90E2' : 'var(--text-primary)'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {level.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label 
                  className="block text-xs font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Notes (Optional)
                </label>
                <textarea
                  value={workoutData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="w-full rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  style={{
                    backgroundColor: 'var(--input-bg)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'var(--input-border)',
                    color: 'var(--input-text)'
                  }}
                  placeholder="Add any additional notes about your workout..."
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Footer with Save Button */}
          <div 
            className="px-5 py-4 border-t"
            style={{ 
              borderColor: 'var(--border)',
              backgroundColor: 'var(--bg-main)'
            }}
          >
            <motion.button
              onClick={handleSave}
              className="w-full px-6 py-3 rounded-xl font-medium transition-all"
              style={{
                backgroundColor: isFormValid ? 'var(--btn-primary-bg)' : 'var(--btn-secondary-bg)',
                color: isFormValid ? 'var(--btn-primary-text)' : 'var(--btn-secondary-text)',
                opacity: isFormValid ? 1 : 0.6
              }}
              disabled={!isFormValid}
              whileTap={{ scale: isFormValid ? 0.98 : 1 }}
            >
              {initialData ? 'Update Workout' : 'Save Workout'}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}