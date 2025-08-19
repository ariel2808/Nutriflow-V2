import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Activity, Bike, Waves, Dumbbell, Target, Timer, MoreHorizontal, Zap, Heart } from 'lucide-react';
import { Event } from '../App';

// WorkoutSet interface removed since sets & reps are not relevant for nutrition tracking

interface ManualWorkoutEditFormProps {
  isOpen: boolean;
  onClose: () => void;
  workout: Event;
  onSave: (updatedWorkout: Event, sets: any[]) => void; // Sets array kept for compatibility but will be empty
}

const workoutTypes = [
  { value: 'running', label: 'Running', icon: Activity },
  { value: 'cycling', label: 'Cycling', icon: Bike },
  { value: 'swimming', label: 'Swimming', icon: Waves },
  { value: 'strength', label: 'Strength', icon: Dumbbell },
  { value: 'pilates', label: 'Pilates', icon: Heart },
  { value: 'crossfit', label: 'CrossFit', icon: Zap }
];

const otherWorkoutType = { 
  value: 'other', 
  label: 'Other', 
  icon: MoreHorizontal
};

const intensityLevels = [
  { value: 'easy', label: 'Easy', color: 'bg-green-100 text-green-800' },
  { value: 'moderate', label: 'Moderate', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'hard', label: 'Hard', color: 'bg-orange-100 text-orange-800' },
  { value: 'max', label: 'Max Effort', color: 'bg-red-100 text-red-800' }
];

export function ManualWorkoutEditForm({ 
  isOpen, 
  onClose, 
  workout, 
  onSave 
}: ManualWorkoutEditFormProps) {
  const [title, setTitle] = useState(workout.title);
  const [time, setTime] = useState(workout.time);
  const [type, setType] = useState(workout.type);
  const [duration, setDuration] = useState('45');
  const [intensity, setIntensity] = useState('moderate');
  const [notes, setNotes] = useState(workout.subtitle || '');
  // Sets state removed since sets & reps are not relevant for nutrition tracking

  const selectedWorkoutType = workoutTypes.find(wt => wt.value === type) || workoutTypes[0];
  // Remove strength-specific features since sets & reps aren't relevant for nutrition tracking
  const isStrengthWorkout = false; // Disabled as per requirements

  // Set manipulation functions removed since sets & reps are not relevant for nutrition tracking

  const handleSave = () => {
    const updatedWorkout: Event = {
      ...workout,
      title,
      time,
      type: type as 'workout' | 'swim' | 'coffee' | 'meal',
      subtitle: notes,
      duration: parseInt(duration),
      intensity: intensity.toUpperCase() as 'LOW' | 'MEDIUM' | 'HIGH'
    };
    onSave(updatedWorkout, []); // Empty sets array since we removed sets & reps
    onClose();
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
        style={{ zIndex: 99999 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          className="relative w-full max-w-sm mx-auto rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden"
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
          <div className="flex justify-center pt-3 pb-2">
            <div 
              className="w-12 h-1 rounded-full"
              style={{ backgroundColor: 'var(--border)' }}
            />
          </div>

          {/* Header */}
          <div 
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{ borderBottomColor: 'var(--border)' }}
          >
            <h2 className="text-lg" style={{ color: 'var(--text-primary)' }}>Edit Workout</h2>
            <motion.button
              onClick={onClose}
              className="p-2 transition-colors"
              style={{ color: 'var(--icon-secondary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--icon-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--icon-secondary)';
              }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={20} />
            </motion.button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[calc(85vh-120px)]">
            <div className="px-6 py-6 space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <label 
                    className="block text-sm mb-2"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Workout Name
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{
                      backgroundColor: 'var(--input-bg)',
                      border: '1px solid var(--input-border)',
                      color: 'var(--input-text)'
                    }}
                    placeholder="Enter workout name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label 
                      className="block text-sm mb-2"
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
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{
                          backgroundColor: 'var(--input-bg)',
                          border: '1px solid var(--input-border)',
                          color: 'var(--input-text)'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label 
                      className="block text-sm mb-2"
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
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{
                          backgroundColor: 'var(--input-bg)',
                          border: '1px solid var(--input-border)',
                          color: 'var(--input-text)'
                        }}
                        placeholder="45"
                      />
                      <span 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm"
                        style={{ color: 'var(--text-placeholder)' }}
                      >
                        min
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Workout Type */}
              <div>
                <label 
                  className="block text-sm mb-3"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Workout Type
                </label>
                <div className="space-y-3">
                  {/* Main 6 workout types in 3x2 grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {workoutTypes.map((workoutType) => {
                      const IconComponent = workoutType.icon;
                      const isSelected = type === workoutType.value;
                      return (
                        <motion.button
                          key={workoutType.value}
                          onClick={() => setType(workoutType.value)}
                          className="flex flex-col items-center gap-2 p-3 rounded-xl border transition-all"
                          style={{
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
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center border"
                            style={{ borderColor: 'var(--border)' }}
                          >
                            <IconComponent 
                              size={16} 
                              style={{ color: isSelected ? '#4A90E2' : 'var(--icon-secondary)' }}
                            />
                          </div>
                          <span 
                            className="text-xs font-medium text-center"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {workoutType.label}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                  
                  {/* Other option - full width */}
                  <motion.button
                    onClick={() => setType(otherWorkoutType.value)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border transition-all"
                    style={{
                      borderColor: type === otherWorkoutType.value ? '#4A90E2' : 'var(--border)',
                      backgroundColor: type === otherWorkoutType.value ? 'rgba(74, 144, 226, 0.1)' : 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      if (type !== otherWorkoutType.value) {
                        e.currentTarget.style.borderColor = 'var(--icon-secondary)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (type !== otherWorkoutType.value) {
                        e.currentTarget.style.borderColor = 'var(--border)';
                      }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center border"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <otherWorkoutType.icon 
                        size={16} 
                        style={{ color: type === otherWorkoutType.value ? '#4A90E2' : 'var(--icon-secondary)' }}
                      />
                    </div>
                    <span 
                      className="text-sm font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {otherWorkoutType.label}
                    </span>
                  </motion.button>
                </div>
              </div>

              {/* Intensity */}
              <div>
                <label 
                  className="block text-sm mb-3"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Intensity
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {intensityLevels.map((level) => {
                    const isSelected = intensity === level.value;
                    return (
                      <motion.button
                        key={level.value}
                        onClick={() => setIntensity(level.value)}
                        className="px-3 py-2 rounded-xl text-sm font-medium transition-all"
                        style={{
                          backgroundColor: isSelected ? level.color.includes('green') ? '#DCFCE7' : 
                                         level.color.includes('yellow') ? '#FEF3C7' :
                                         level.color.includes('orange') ? '#FED7AA' :
                                         '#FEE2E2' : 'var(--bg-card)',
                          color: isSelected ? level.color.includes('green') ? '#166534' :
                                level.color.includes('yellow') ? '#92400E' :
                                level.color.includes('orange') ? '#C2410C' :
                                '#991B1B' : 'var(--text-secondary)',
                          border: isSelected ? '2px solid #4A90E2' : 'none'
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor = 'var(--bg-main)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                          }
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {level.label}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Sets & Reps section removed as it's not relevant for nutrition tracking */}

              {/* Notes */}
              <div>
                <label 
                  className="block text-sm mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{
                    backgroundColor: 'var(--input-bg)',
                    border: '1px solid var(--input-border)',
                    color: 'var(--input-text)'
                  }}
                  rows={3}
                  placeholder="Add workout notes or instructions..."
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div 
            className="border-t px-6 py-4"
            style={{ borderTopColor: 'var(--border)' }}
          >
            <div className="flex gap-3">
              <motion.button
                onClick={onClose}
                className="flex-1 px-6 py-3 rounded-2xl transition-colors"
                style={{
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleSave}
                className="flex-1 px-6 py-3 rounded-2xl transition-colors"
                style={{
                  backgroundColor: '#4A90E2',
                  color: '#FFFFFF'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#3A7BD5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#4A90E2';
                }}
                whileTap={{ scale: 0.98 }}
              >
                Save Changes
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}