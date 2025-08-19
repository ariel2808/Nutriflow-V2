import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';

interface DietaryPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPreferences?: string[];
  onSave: (preferences: string[]) => void;
}

interface DietaryOption {
  id: string;
  label: string;
  description: string;
  emoji: string;
}

const dietaryOptions: DietaryOption[] = [
  {
    id: 'none',
    label: 'No preference',
    description: 'All foods',
    emoji: '🍽️'
  },
  {
    id: 'kosher',
    label: 'Kosher',
    description: 'Kosher dietary laws',
    emoji: '🕎'
  },
  {
    id: 'vegan',
    label: 'Vegan',
    description: 'Plant-based only',
    emoji: '🌱'
  },
  {
    id: 'vegetarian',
    label: 'Vegetarian',
    description: 'No meat or fish',
    emoji: '🥗'
  },
  {
    id: 'low-carb',
    label: 'Low carb',
    description: 'Reduced carbohydrates',
    emoji: '🥩'
  },
  {
    id: 'gluten-free',
    label: 'Gluten-free',
    description: 'No gluten proteins',
    emoji: '🌾'
  },
  {
    id: 'paleo',
    label: 'Paleo',
    description: 'Whole foods only',
    emoji: '🥜'
  },
  {
    id: 'pescatarian',
    label: 'Pescatarian',
    description: 'Fish but no meat',
    emoji: '🐟'
  }
];

export function DietaryPreferencesModal({ 
  isOpen, 
  onClose, 
  currentPreferences = ['kosher'], 
  onSave 
}: DietaryPreferencesModalProps) {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(currentPreferences);

  const handleTogglePreference = (optionId: string) => {
    if (optionId === 'none') {
      // If selecting "No preference", clear all others
      setSelectedPreferences(['none']);
    } else {
      // If selecting any other option, remove "none" and toggle the option
      let newPreferences = selectedPreferences.filter(p => p !== 'none');
      
      if (newPreferences.includes(optionId)) {
        newPreferences = newPreferences.filter(p => p !== optionId);
      } else {
        newPreferences = [...newPreferences, optionId];
      }
      
      // If no preferences selected, default to "none"
      if (newPreferences.length === 0) {
        newPreferences = ['none'];
      }
      
      setSelectedPreferences(newPreferences);
    }
  };

  const handleSave = () => {
    onSave(selectedPreferences);
    onClose();
  };

  const handleCancel = () => {
    setSelectedPreferences(currentPreferences);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCancel}
        />

        {/* Modal Content */}
        <motion.div
          className="relative w-full max-w-sm mx-auto rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col"
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
          <div className="flex justify-center pt-3 pb-2 shrink-0">
            <div 
              className="w-12 h-1 rounded-full"
              style={{ backgroundColor: 'var(--border)' }}
            />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-6 pb-4 shrink-0">
            <div>
              <h2 className="text-xl" style={{ color: 'var(--text-primary)' }}>Dietary Preferences</h2>
              <p className="text-sm mt-1" style={{ color: 'var(--text-placeholder)' }}>Select one or more preferences</p>
            </div>
            <motion.button
              onClick={handleCancel}
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

          {/* Options List - Scrollable */}
          <div className="flex-1 overflow-y-auto px-6">
            <motion.div
              className="space-y-2 pb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {dietaryOptions.map((option, index) => {
                const isSelected = selectedPreferences.includes(option.id);
                
                return (
                  <motion.button
                    key={option.id}
                    onClick={() => handleTogglePreference(option.id)}
                    className="w-full flex items-center justify-between p-4 rounded-2xl transition-all border-2"
                    style={{
                      backgroundColor: isSelected ? 'rgba(74, 144, 226, 0.1)' : 'var(--bg-card)',
                      borderColor: isSelected ? '#4A90E2' : 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = 'var(--border)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = 'transparent';
                      }
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.03 }}
                  >
                    {/* Left Side - Emoji and Text */}
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.emoji}</span>
                      <div className="text-left">
                        <h3 
                          className="text-sm mb-0.5"
                          style={{ color: isSelected ? '#4A90E2' : 'var(--text-primary)' }}
                        >
                          {option.label}
                        </h3>
                        <p className="text-xs" style={{ color: 'var(--text-placeholder)' }}>
                          {option.description}
                        </p>
                      </div>
                    </div>

                    {/* Right Side - Check Icon */}
                    {isSelected && (
                      <motion.div
                        className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center ml-2"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                      >
                        <Check size={14} className="text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          {/* Action Buttons - Fixed at bottom */}
          <motion.div
            className="px-6 pb-6 shrink-0 border-t pt-4"
            style={{ 
              backgroundColor: 'var(--bg-main)',
              borderTopColor: 'var(--border)'
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex gap-3 justify-center">
              <motion.button
                onClick={handleCancel}
                className="px-6 py-2.5 rounded-full text-sm transition-colors"
                style={{
                  backgroundColor: 'var(--btn-secondary-bg)',
                  color: 'var(--btn-secondary-text)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--btn-secondary-bg)';
                }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              
              <motion.button
                onClick={handleSave}
                className="px-6 py-2.5 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-colors"
                whileTap={{ scale: 0.98 }}
              >
                Save Preferences
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}