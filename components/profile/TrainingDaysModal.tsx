import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';

interface TrainingDaysModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTrainingDays: string[];
  onTrainingDaysUpdate: (days: string[]) => void;
}

const daysOfWeek = [
  { short: 'Sun', full: 'Sunday' },
  { short: 'Mon', full: 'Monday' },
  { short: 'Tue', full: 'Tuesday' },
  { short: 'Wed', full: 'Wednesday' },
  { short: 'Thu', full: 'Thursday' },
  { short: 'Fri', full: 'Friday' },
  { short: 'Sat', full: 'Saturday' }
];

export function TrainingDaysModal({ isOpen, onClose, currentTrainingDays, onTrainingDaysUpdate }: TrainingDaysModalProps) {
  const [selectedDays, setSelectedDays] = useState<string[]>(currentTrainingDays);

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const selectAll = () => {
    setSelectedDays(daysOfWeek.map(day => day.short));
  };

  const clearAll = () => {
    setSelectedDays([]);
  };

  const handleSave = () => {
    onTrainingDaysUpdate(selectedDays);
    onClose();
  };

  const handleCancel = () => {
    setSelectedDays(currentTrainingDays); // Reset to original state
    onClose();
  };

  const formatTrainingDays = (days: string[]): string => {
    if (days.length === 0) return 'No training days';
    if (days.length === 7) return 'Every day';
    return days.join(', ');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeInOut" } }}
          onClick={handleCancel}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-sm rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden"
          style={{ backgroundColor: 'var(--bg-main)' }}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ 
            scale: 0.85, 
            opacity: 0, 
            y: 30,
            transition: { 
              duration: 0.25, 
              ease: [0.4, 0, 0.2, 1],
              scale: { duration: 0.2 },
              opacity: { duration: 0.15 }
            }
          }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Grid Background */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, var(--graph-grid) 1px, transparent 1px),
                linear-gradient(to bottom, var(--graph-grid) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />

          {/* Header */}
          <div 
            className="relative z-10 p-6 border-b"
            style={{ borderBottomColor: 'var(--border)' }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl" style={{ color: 'var(--text-primary)' }}>Training Days</h2>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Select the days you usually train</p>
              </div>
              <button
                onClick={handleCancel}
                className="p-2 rounded-full transition-colors"
                style={{ color: 'var(--icon-secondary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                  e.currentTarget.style.color = 'var(--icon-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--icon-secondary)';
                }}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-6">
            {/* Quick Actions */}
            <div className="flex gap-3 mb-6 justify-center">
              <button
                onClick={selectAll}
                className="px-5 py-2 text-sm rounded-full transition-colors"
                style={{
                  color: 'var(--btn-secondary-text)',
                  backgroundColor: 'var(--btn-secondary-bg)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--btn-secondary-bg)';
                }}
              >
                Select All
              </button>
              <button
                onClick={clearAll}
                className="px-5 py-2 text-sm rounded-full transition-colors"
                style={{
                  color: 'var(--btn-secondary-text)',
                  backgroundColor: 'var(--btn-secondary-bg)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--btn-secondary-bg)';
                }}
              >
                Clear All
              </button>
            </div>

            {/* Day Selector */}
            <div className="grid grid-cols-7 gap-2 mb-6">
              {daysOfWeek.map((day) => {
                const isSelected = selectedDays.includes(day.short);
                return (
                  <motion.button
                    key={day.short}
                    onClick={() => toggleDay(day.short)}
                    className="aspect-square rounded-xl transition-all duration-200 text-sm border-2"
                    style={{
                      backgroundColor: isSelected ? '#10B981' : 'var(--bg-main)',
                      color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                      borderColor: isSelected ? '#10B981' : 'var(--border)',
                      boxShadow: isSelected ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = '#10B981';
                        e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = 'var(--border)';
                        e.currentTarget.style.backgroundColor = 'var(--bg-main)';
                      }
                    }}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <span className="font-medium">{day.short}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Current Selection Display */}
            <div 
              className="rounded-xl p-4 mb-6"
              style={{ backgroundColor: 'var(--bg-card)' }}
            >
              <div className="text-center">
                <p className="text-xs mb-1" style={{ color: 'var(--text-placeholder)' }}>Current Selection</p>
                <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                  {selectedDays.length === 0 ? 'No training days selected' : 
                   selectedDays.length === 7 ? 'Training every day' :
                   `${selectedDays.length} day${selectedDays.length === 1 ? '' : 's'} per week`}
                </p>
                {selectedDays.length > 0 && selectedDays.length < 7 && (
                  <p className="text-xs mt-1" style={{ color: 'var(--text-placeholder)' }}>
                    {formatTrainingDays(selectedDays)}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleCancel}
                className="px-6 py-2.5 rounded-full transition-colors text-sm"
                style={{
                  color: 'var(--btn-secondary-text)',
                  backgroundColor: 'var(--btn-secondary-bg)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--btn-secondary-bg)';
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2.5 text-white bg-green-500 rounded-full hover:bg-green-600 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Check size={16} />
                Save
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}