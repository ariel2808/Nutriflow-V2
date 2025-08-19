import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

interface ProfileSetupScreenProps {
  step: 1 | 2 | 3 | 4;
  onContinue: (nextStep: number) => void;
  onSkip: () => void;
  onBack: () => void;
}

// Types for form data
interface ProfileSetupData {
  // Screen 1: Basic Info Only
  age: string;
  height: string;
  weight: string;
  gender: 'male' | 'female' | null;
  
  // Screen 2: Training & Goals
  primarySports: string[];
  trainingVolume: 'light' | 'moderate' | 'heavy' | 'elite' | null;
  trainingDays: boolean[];
  primaryGoals: string[];
  
  // Screen 3: Nutrition Preferences
  dietaryPreferences: string[];
  foodAllergies: string[];
  supplements: string[];
  
  // Screen 4: Final Setup
  notifications: {
    mealReminders: boolean;
    workoutAlerts: boolean;
    weeklyProgress: boolean;
  };
}

// Progress bar component
function ProgressBar({ step }: { step: number }) {
  const progress = (step / 4) * 100;
  
  return (
    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{
          background: 'linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%)'
        }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

// Selection button component
function SelectionButton({ 
  selected, 
  onClick, 
  children, 
  variant = 'primary',
  disabled = false
}: { 
  selected: boolean; 
  onClick: () => void; 
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className="p-3 rounded-xl border-2 text-left transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        backgroundColor: selected 
          ? (variant === 'primary' ? '#1d1d1f' : '#FBBF24') 
          : disabled ? '#f5f5f5' : '#f9f9f9',
        borderColor: selected 
          ? (variant === 'primary' ? '#1d1d1f' : '#F59E0B') 
          : disabled ? '#e0e0e0' : '#e5e5e7',
        color: selected ? '#ffffff' : disabled ? '#9e9e9e' : '#1d1d1f'
      }}
      whileHover={!disabled ? {
        backgroundColor: selected ? (variant === 'primary' ? '#2d2d2f' : '#F59E0B') : '#f2f2f7',
        transition: { duration: 0.2 }
      } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {children}
    </motion.button>
  );
}

// Day selector component
function DaySelector({ 
  selectedDays, 
  onDaysChange 
}: { 
  selectedDays: boolean[]; 
  onDaysChange: (days: boolean[]) => void;
}) {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  const toggleDay = (index: number) => {
    const newDays = [...selectedDays];
    newDays[index] = !newDays[index];
    onDaysChange(newDays);
  };

  return (
    <div className="flex gap-2">
      {days.map((day, index) => (
        <motion.button
          key={index}
          onClick={() => toggleDay(index)}
          className="flex-1 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-200"
          style={{
            backgroundColor: selectedDays[index] ? '#FBBF24' : '#f9f9f9',
            borderColor: selectedDays[index] ? '#F59E0B' : '#e5e5e7',
            color: selectedDays[index] ? '#ffffff' : '#1d1d1f'
          }}
          whileHover={{
            backgroundColor: selectedDays[index] ? '#F59E0B' : '#f2f2f7',
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span style={{ fontSize: '14px', fontWeight: 500 }}>{day}</span>
        </motion.button>
      ))}
    </div>
  );
}

// Multi-select chip component
function MultiSelectChips({ 
  options, 
  selected, 
  onChange,
  maxSelect = null
}: { 
  options: string[]; 
  selected: string[]; 
  onChange: (selected: string[]) => void;
  maxSelect?: number | null;
}) {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else if (maxSelect === null || selected.length < maxSelect) {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selected.includes(option);
        const isDisabled = !isSelected && maxSelect !== null && selected.length >= maxSelect;
        
        return (
          <motion.button
            key={option}
            onClick={() => toggleOption(option)}
            disabled={isDisabled}
            className="px-3 py-2 rounded-full border-2 text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: isSelected ? '#FBBF24' : isDisabled ? '#f5f5f5' : '#f9f9f9',
              borderColor: isSelected ? '#F59E0B' : isDisabled ? '#e0e0e0' : '#e5e5e7',
              color: isSelected ? '#ffffff' : isDisabled ? '#9e9e9e' : '#1d1d1f'
            }}
            whileHover={!isDisabled ? {
              backgroundColor: isSelected ? '#F59E0B' : '#f2f2f7',
              transition: { duration: 0.2 }
            } : {}}
            whileTap={!isDisabled ? { scale: 0.95 } : {}}
          >
            {option}
          </motion.button>
        );
      })}
    </div>
  );
}

// Toggle switch component
function ToggleSwitch({ 
  enabled, 
  onChange, 
  label 
}: { 
  enabled: boolean; 
  onChange: (enabled: boolean) => void; 
  label: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span style={{ fontSize: '15px', color: '#1d1d1f' }}>{label}</span>
      <motion.button
        onClick={() => onChange(!enabled)}
        className="relative w-12 h-6 rounded-full transition-all duration-200"
        style={{
          backgroundColor: enabled ? '#F59E0B' : '#e5e5e7'
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
          animate={{
            left: enabled ? '26px' : '2px'
          }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.button>
    </div>
  );
}

// Sport card component
function SportCard({ 
  emoji, 
  name, 
  selected, 
  onClick 
}: { 
  emoji: string; 
  name: string; 
  selected: boolean; 
  onClick: () => void;
}) {
  return (
    <SelectionButton
      selected={selected}
      onClick={onClick}
      variant="secondary"
    >
      <div className="flex items-center gap-3">
        <span style={{ fontSize: '20px' }}>{emoji}</span>
        <span style={{ fontSize: '15px', fontWeight: 500 }}>{name}</span>
      </div>
    </SelectionButton>
  );
}

// Goal card component  
function GoalCard({ 
  emoji, 
  name, 
  description, 
  selected, 
  onClick,
  disabled = false
}: { 
  emoji: string; 
  name: string; 
  description: string;
  selected: boolean; 
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <SelectionButton
      selected={selected}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex items-start gap-3">
        <span style={{ fontSize: '20px' }}>{emoji}</span>
        <div>
          <div style={{ fontSize: '15px', fontWeight: 500, marginBottom: '2px' }}>{name}</div>
          <div style={{ fontSize: '13px', opacity: disabled ? 0.5 : 0.8 }}>{description}</div>
        </div>
      </div>
    </SelectionButton>
  );
}

export function ProfileSetupScreen({ step, onContinue, onSkip, onBack }: ProfileSetupScreenProps) {
  const [formData, setFormData] = useState<ProfileSetupData>({
    age: '',
    height: '',
    weight: '',
    gender: null,
    primarySports: [],
    trainingVolume: null,
    trainingDays: [false, false, false, false, false, false, false],
    primaryGoals: [],
    dietaryPreferences: [],
    foodAllergies: [],
    supplements: [],
    notifications: {
      mealReminders: true,
      workoutAlerts: true,
      weeklyProgress: false
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Goal conflict logic
  const getConflictingGoals = (goal: string, currentGoals: string[]): string[] => {
    const conflicts: Record<string, string[]> = {
      'Muscle gain': ['Weight loss'],
      'Weight loss': ['Muscle gain']
    };
    
    return conflicts[goal] || [];
  };

  const isGoalDisabled = (goal: string): boolean => {
    const conflictingGoals = getConflictingGoals(goal, formData.primaryGoals);
    return conflictingGoals.some(conflictGoal => formData.primaryGoals.includes(conflictGoal));
  };

  // Check if current step is valid
  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.age && formData.height && formData.weight && formData.gender;
      case 2:
        return formData.primarySports.length > 0 && formData.trainingVolume && formData.primaryGoals.length > 0;
      case 3:
        return formData.dietaryPreferences.length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleContinue = async () => {
    if (step === 4) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
        
        // Show success animation then continue
        setTimeout(() => {
          onContinue(step + 1);
        }, 1500);
      }, 1000);
    } else {
      onContinue(step + 1);
    }
  };

  const handleSportToggle = (sport: string) => {
    const newSports = formData.primarySports.includes(sport)
      ? formData.primarySports.filter(s => s !== sport)
      : [...formData.primarySports, sport];
    setFormData(prev => ({ ...prev, primarySports: newSports }));
  };

  const handleGoalToggle = (goal: string) => {
    if (isGoalDisabled(goal)) return;
    
    const newGoals = formData.primaryGoals.includes(goal)
      ? formData.primaryGoals.filter(g => g !== goal)
      : [...formData.primaryGoals, goal];
    setFormData(prev => ({ ...prev, primaryGoals: newGoals }));
  };

  const handleDietaryPreferenceToggle = (preference: string) => {
    const isKosherOrHalal = preference === 'Kosher' || preference === 'Halal';
    const hasKosherOrHalal = formData.dietaryPreferences.includes('Kosher') || formData.dietaryPreferences.includes('Halal');
    const isCurrentlySelected = formData.dietaryPreferences.includes(preference);
    
    if (preference === 'No restrictions') {
      // "No restrictions" clears all other selections
      setFormData(prev => ({ 
        ...prev, 
        dietaryPreferences: isCurrentlySelected ? [] : ['No restrictions'] 
      }));
    } else if (isKosherOrHalal) {
      // Kosher/Halal can be combined with other dietary approaches (except "No restrictions")
      let newPreferences = [...formData.dietaryPreferences.filter(p => p !== 'No restrictions')];
      
      if (isCurrentlySelected) {
        newPreferences = newPreferences.filter(p => p !== preference);
      } else {
        newPreferences.push(preference);
      }
      
      setFormData(prev => ({ ...prev, dietaryPreferences: newPreferences }));
    } else {
      // Other dietary approaches: single select unless combined with Kosher/Halal
      if (hasKosherOrHalal && !isCurrentlySelected) {
        // Add to existing Kosher/Halal selection
        const newPreferences = [
          ...formData.dietaryPreferences.filter(p => p === 'Kosher' || p === 'Halal'),
          preference
        ];
        setFormData(prev => ({ ...prev, dietaryPreferences: newPreferences }));
      } else if (isCurrentlySelected) {
        // Remove the selection
        setFormData(prev => ({ 
          ...prev, 
          dietaryPreferences: formData.dietaryPreferences.filter(p => p !== preference)
        }));
      } else {
        // Replace with new selection (single select for non-Kosher/Halal)
        setFormData(prev => ({ 
          ...prev, 
          dietaryPreferences: [preference]
        }));
      }
    }
  };

  const getStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            {/* Basic Info Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-2" style={{ fontSize: '15px', color: '#1d1d1f', fontWeight: 500 }}>
                  Age
                </label>
                <input
                  type="number"
                  placeholder="25"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  className="w-full py-3 px-3 rounded-xl border-2 transition-all duration-200"
                  style={{
                    backgroundColor: '#f9f9f9',
                    borderColor: '#e5e5e7',
                    color: '#1d1d1f',
                    fontSize: '16px'
                  }}
                />
              </div>
              <div>
                <label className="block mb-2" style={{ fontSize: '15px', color: '#1d1d1f', fontWeight: 500 }}>
                  Height (cm)
                </label>
                <input
                  type="number"
                  placeholder="175"
                  value={formData.height}
                  onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                  className="w-full py-3 px-3 rounded-xl border-2 transition-all duration-200"
                  style={{
                    backgroundColor: '#f9f9f9',
                    borderColor: '#e5e5e7',
                    color: '#1d1d1f',
                    fontSize: '16px'
                  }}
                />
              </div>
            </div>

            {/* Weight */}
            <div>
              <label className="block mb-2" style={{ fontSize: '15px', color: '#1d1d1f', fontWeight: 500 }}>
                Weight (kg)
              </label>
              <input
                type="number"
                placeholder="70"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                className="w-full py-3 px-3 rounded-xl border-2 transition-all duration-200"
                style={{
                  backgroundColor: '#f9f9f9',
                  borderColor: '#e5e5e7',
                  color: '#1d1d1f',
                  fontSize: '16px'
                }}
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block mb-3" style={{ fontSize: '15px', color: '#1d1d1f', fontWeight: 500 }}>
                Gender
              </label>
              <div className="grid grid-cols-2 gap-3">
                <SelectionButton
                  selected={formData.gender === 'male'}
                  onClick={() => setFormData(prev => ({ ...prev, gender: 'male' }))}
                >
                  <span style={{ fontSize: '16px', fontWeight: 500 }}>Male</span>
                </SelectionButton>
                <SelectionButton
                  selected={formData.gender === 'female'}
                  onClick={() => setFormData(prev => ({ ...prev, gender: 'female' }))}
                >
                  <span style={{ fontSize: '16px', fontWeight: 500 }}>Female</span>
                </SelectionButton>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            {/* Primary Sports */}
            <div>
              <label className="block mb-3" style={{ fontSize: '15px', color: '#1d1d1f', fontWeight: 500 }}>
                Primary Sports/Activities
              </label>
              <div className="grid grid-cols-2 gap-2">
                <SportCard
                  emoji="🏋️"
                  name="Strength Training"
                  selected={formData.primarySports.includes('Strength Training')}
                  onClick={() => handleSportToggle('Strength Training')}
                />
                <SportCard
                  emoji="🏃"
                  name="Running"
                  selected={formData.primarySports.includes('Running')}
                  onClick={() => handleSportToggle('Running')}
                />
                <SportCard
                  emoji="🚴"
                  name="Cycling"
                  selected={formData.primarySports.includes('Cycling')}
                  onClick={() => handleSportToggle('Cycling')}
                />
                <SportCard
                  emoji="🏊"
                  name="Swimming"
                  selected={formData.primarySports.includes('Swimming')}
                  onClick={() => handleSportToggle('Swimming')}
                />
                <SportCard
                  emoji="🥊"
                  name="Combat Sports"
                  selected={formData.primarySports.includes('Combat Sports')}
                  onClick={() => handleSportToggle('Combat Sports')}
                />
                <SportCard
                  emoji="⚽"
                  name="Team Sports"
                  selected={formData.primarySports.includes('Team Sports')}
                  onClick={() => handleSportToggle('Team Sports')}
                />
                <SportCard
                  emoji="🧘"
                  name="Yoga/Flexibility"
                  selected={formData.primarySports.includes('Yoga/Flexibility')}
                  onClick={() => handleSportToggle('Yoga/Flexibility')}
                />
                <SportCard
                  emoji="🏃‍♂️"
                  name="CrossFit"
                  selected={formData.primarySports.includes('CrossFit')}
                  onClick={() => handleSportToggle('CrossFit')}
                />
              </div>
            </div>

            {/* Weekly Training Volume */}
            <div>
              <label className="block mb-3" style={{ fontSize: '15px', color: '#1d1d1f', fontWeight: 500 }}>
                Weekly Training Volume
              </label>
              <div className="grid grid-cols-2 gap-2">
                <SelectionButton
                  selected={formData.trainingVolume === 'light'}
                  onClick={() => setFormData(prev => ({ ...prev, trainingVolume: 'light' }))}
                  variant="secondary"
                >
                  <div className="flex items-start gap-3">
                    <span style={{ fontSize: '20px' }}>💪</span>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 500 }}>3-5 hours</div>
                      <div style={{ fontSize: '13px', opacity: 0.8 }}>Light load</div>
                    </div>
                  </div>
                </SelectionButton>
                <SelectionButton
                  selected={formData.trainingVolume === 'moderate'}
                  onClick={() => setFormData(prev => ({ ...prev, trainingVolume: 'moderate' }))}
                  variant="secondary"
                >
                  <div className="flex items-start gap-3">
                    <span style={{ fontSize: '20px' }}>🔥</span>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 500 }}>5-10 hours</div>
                      <div style={{ fontSize: '13px', opacity: 0.8 }}>Moderate load</div>
                    </div>
                  </div>
                </SelectionButton>
                <SelectionButton
                  selected={formData.trainingVolume === 'heavy'}
                  onClick={() => setFormData(prev => ({ ...prev, trainingVolume: 'heavy' }))}
                  variant="secondary"
                >
                  <div className="flex items-start gap-3">
                    <span style={{ fontSize: '20px' }}>⚡</span>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 500 }}>10-15 hours</div>
                      <div style={{ fontSize: '13px', opacity: 0.8 }}>Heavy load</div>
                    </div>
                  </div>
                </SelectionButton>
                <SelectionButton
                  selected={formData.trainingVolume === 'elite'}
                  onClick={() => setFormData(prev => ({ ...prev, trainingVolume: 'elite' }))}
                  variant="secondary"
                >
                  <div className="flex items-start gap-3">
                    <span style={{ fontSize: '20px' }}>🚀</span>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 500 }}>15+ hours</div>
                      <div style={{ fontSize: '13px', opacity: 0.8 }}>Full-time athlete</div>
                    </div>
                  </div>
                </SelectionButton>
              </div>
            </div>

            {/* Training Days */}
            <div>
              <label className="block mb-3" style={{ fontSize: '15px', color: '#1d1d1f', fontWeight: 500 }}>
                Training Days
              </label>
              <DaySelector
                selectedDays={formData.trainingDays}
                onDaysChange={(days) => setFormData(prev => ({ ...prev, trainingDays: days }))}
              />
            </div>

            {/* Primary Goals */}
            <div>
              <label className="block mb-3" style={{ fontSize: '15px', color: '#1d1d1f', fontWeight: 500 }}>
                Primary Goals
              </label>
              <div className="grid grid-cols-2 gap-2">
                <GoalCard
                  emoji="🎯"
                  name="Performance"
                  description="Optimize nutrition for training"
                  selected={formData.primaryGoals.includes('Performance')}
                  onClick={() => handleGoalToggle('Performance')}
                />
                <GoalCard
                  emoji="💪"
                  name="Muscle gain"
                  description="Build lean muscle mass"
                  selected={formData.primaryGoals.includes('Muscle gain')}
                  onClick={() => handleGoalToggle('Muscle gain')}
                  disabled={isGoalDisabled('Muscle gain')}
                />
                <GoalCard
                  emoji="⚖️"
                  name="Fat loss"
                  description="Reduce body fat percentage"
                  selected={formData.primaryGoals.includes('Fat loss')}
                  onClick={() => handleGoalToggle('Fat loss')}
                />
                <GoalCard
                  emoji="📉"
                  name="Weight loss"
                  description="Lose overall body weight"
                  selected={formData.primaryGoals.includes('Weight loss')}
                  onClick={() => handleGoalToggle('Weight loss')}
                  disabled={isGoalDisabled('Weight loss')}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            {/* Dietary Preferences */}
            <div>
              <label className="block mb-3" style={{ fontSize: '15px', color: '#1d1d1f', fontWeight: 500 }}>
                Dietary Preferences
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { emoji: '🍽️', name: 'No restrictions' },
                  { emoji: '🥬', name: 'Vegetarian' },
                  { emoji: '🌱', name: 'Vegan' },
                  { emoji: '🥩', name: 'Keto' },
                  { emoji: '🐟', name: 'Paleo' },
                  { emoji: '🫒', name: 'Mediterranean' },
                  { emoji: '✡️', name: 'Kosher' },
                  { emoji: '☪️', name: 'Halal' }
                ].map(({ emoji, name }) => (
                  <SelectionButton
                    key={name}
                    selected={formData.dietaryPreferences.includes(name)}
                    onClick={() => handleDietaryPreferenceToggle(name)}
                    variant="secondary"
                  >
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: '16px' }}>{emoji}</span>
                      <span style={{ fontSize: '14px', fontWeight: 500 }}>{name}</span>
                    </div>
                  </SelectionButton>
                ))}
              </div>
              {/* Helper text for multi-select capability */}
              {(formData.dietaryPreferences.includes('Kosher') || formData.dietaryPreferences.includes('Halal')) && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ 
                    fontSize: '13px', 
                    color: '#86868b', 
                    marginTop: '8px',
                    fontStyle: 'italic'
                  }}
                >
                  You can combine Kosher/Halal with other dietary approaches
                </motion.p>
              )}
            </div>

            {/* Food Allergies */}
            <div>
              <label className="block mb-3" style={{ fontSize: '15px', color: '#1d1d1f', fontWeight: 500 }}>
                Food Allergies
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { emoji: '🥜', name: 'Nuts' },
                  { emoji: '🥛', name: 'Dairy' },
                  { emoji: '🌾', name: 'Gluten' },
                  { emoji: '🦐', name: 'Shellfish' },
                  { emoji: '🥚', name: 'Eggs' },
                  { emoji: '🫘', name: 'Soy' },
                  { emoji: '✅', name: 'None' }
                ].map(({ emoji, name }) => (
                  <motion.button
                    key={name}
                    onClick={() => {
                      const newAllergies = formData.foodAllergies.includes(name)
                        ? formData.foodAllergies.filter(a => a !== name)
                        : name === 'None' 
                          ? ['None']
                          : formData.foodAllergies.includes('None')
                            ? [name]
                            : [...formData.foodAllergies, name];
                      setFormData(prev => ({ ...prev, foodAllergies: newAllergies }));
                    }}
                    className="px-3 py-2 rounded-full border-2 text-sm transition-all duration-200 flex items-center gap-2"
                    style={{
                      backgroundColor: formData.foodAllergies.includes(name) ? '#FBBF24' : '#f9f9f9',
                      borderColor: formData.foodAllergies.includes(name) ? '#F59E0B' : '#e5e5e7',
                      color: formData.foodAllergies.includes(name) ? '#ffffff' : '#1d1d1f'
                    }}
                    whileHover={{
                      backgroundColor: formData.foodAllergies.includes(name) ? '#F59E0B' : '#f2f2f7',
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span style={{ fontSize: '14px' }}>{emoji}</span>
                    <span>{name}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Supplements */}
            <div>
              <label className="block mb-3" style={{ fontSize: '15px', color: '#1d1d1f', fontWeight: 500 }}>
                Supplements Used
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { emoji: '💊', name: 'Creatine' },
                  { emoji: '🧪', name: 'Pre-workout' },
                  { emoji: '💊', name: 'Vitamins' },
                  { emoji: '🐟', name: 'Omega-3' },
                  { emoji: '🟢', name: 'Magnesium' },
                  { emoji: '❌', name: 'None' }
                ].map(({ emoji, name }) => (
                  <motion.button
                    key={name}
                    onClick={() => {
                      const newSupplements = formData.supplements.includes(name)
                        ? formData.supplements.filter(s => s !== name)
                        : name === 'None' 
                          ? ['None']
                          : formData.supplements.includes('None')
                            ? [name]
                            : [...formData.supplements, name];
                      setFormData(prev => ({ ...prev, supplements: newSupplements }));
                    }}
                    className="px-3 py-2 rounded-full border-2 text-sm transition-all duration-200 flex items-center gap-2"
                    style={{
                      backgroundColor: formData.supplements.includes(name) ? '#FBBF24' : '#f9f9f9',
                      borderColor: formData.supplements.includes(name) ? '#F59E0B' : '#e5e5e7',
                      color: formData.supplements.includes(name) ? '#ffffff' : '#1d1d1f'
                    }}
                    whileHover={{
                      backgroundColor: formData.supplements.includes(name) ? '#F59E0B' : '#f2f2f7',
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span style={{ fontSize: '14px' }}>{emoji}</span>
                    <span>{name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            {/* Quick Summary */}
            <div>
              <label className="block mb-3" style={{ fontSize: '15px', color: '#1d1d1f', fontWeight: 500 }}>
                Quick Summary
              </label>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <div style={{ fontSize: '13px', color: '#86868b', marginBottom: '4px' }}>Training & Goals</div>
                  <div style={{ fontSize: '14px', color: '#1d1d1f' }}>
                    {formData.primaryGoals.join(', ')} • {formData.trainingDays.filter(Boolean).length} days/week
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <div style={{ fontSize: '13px', color: '#86868b', marginBottom: '4px' }}>Sports & Volume</div>
                  <div style={{ fontSize: '14px', color: '#1d1d1f' }}>
                    {formData.primarySports.slice(0, 2).join(', ')} • {formData.trainingVolume} load
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <div style={{ fontSize: '13px', color: '#86868b', marginBottom: '4px' }}>Nutrition</div>
                  <div style={{ fontSize: '14px', color: '#1d1d1f' }}>
                    {formData.dietaryPreferences.length > 0 ? formData.dietaryPreferences.join(' + ') : 'No preferences'} • {formData.foodAllergies.includes('None') ? 'No allergies' : `${formData.foodAllergies.length} allergies`}
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div>
              <label className="block mb-3" style={{ fontSize: '15px', color: '#1d1d1f', fontWeight: 500 }}>
                Notifications
              </label>
              <div className="space-y-4">
                <ToggleSwitch
                  enabled={formData.notifications.mealReminders}
                  onChange={(enabled) => setFormData(prev => ({ 
                    ...prev, 
                    notifications: { ...prev.notifications, mealReminders: enabled }
                  }))}
                  label="Meal reminders"
                />
                <ToggleSwitch
                  enabled={formData.notifications.workoutAlerts}
                  onChange={(enabled) => setFormData(prev => ({ 
                    ...prev, 
                    notifications: { ...prev.notifications, workoutAlerts: enabled }
                  }))}
                  label="Pre-workout nutrition alerts"
                />
                <ToggleSwitch
                  enabled={formData.notifications.weeklyProgress}
                  onChange={(enabled) => setFormData(prev => ({ 
                    ...prev, 
                    notifications: { ...prev.notifications, weeklyProgress: enabled }
                  }))}
                  label="Weekly progress summaries"
                />
              </div>
            </div>

            {/* Success Animation */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center justify-center py-6"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, ease: "backOut" }}
                    >
                      <CheckCircle2 size={28} style={{ color: '#10B981' }} />
                    </motion.div>
                    <span style={{ fontSize: '16px', fontWeight: 600, color: '#10B981' }}>
                      Profile created successfully!
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return 'Tell us about yourself';
      case 2:
        return 'Your training routine';
      case 3:
        return 'Nutrition preferences';
      case 4:
        return 'Almost ready!';
      default:
        return '';
    }
  };

  const getStepSubtitle = () => {
    switch (step) {
      case 1:
        return 'Basic information for nutrition calculations';
      case 2:
        return 'Help us understand your athletic lifestyle';
      case 3:
        return 'Any dietary restrictions or preferences?';
      case 4:
        return 'Review and confirm your setup';
      default:
        return '';
    }
  };

  return (
    <div 
      className="w-full flex flex-col"
      style={{ 
        backgroundColor: '#ffffff',
        maxWidth: '375px',
        margin: '0 auto',
        height: '812px',
        overflow: 'hidden'
      }}
    >
      {/* Header - 80px total */}
      <div className="flex-shrink-0 px-6" style={{ height: '80px' }}>
        <div className="flex items-center justify-between h-full">
          <motion.button
            onClick={onBack}
            className="p-2 -ml-2 rounded-full"
            style={{ color: '#1d1d1f' }}
            whileHover={{ 
              backgroundColor: '#f2f2f7',
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ArrowLeft size={24} />
          </motion.button>
          
          <span 
            style={{ 
              fontSize: '15px', 
              color: '#86868b',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
            }}
          >
            {step} of 4
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex-shrink-0 px-6 pb-4">
        <ProgressBar step={step} />
      </div>

      {/* Title Section - 90px */}
      <div className="flex-shrink-0 px-6" style={{ height: '90px' }}>
        <motion.h1
          style={{ 
            fontSize: '24px', 
            fontWeight: 700,
            color: '#1d1d1f',
            marginBottom: '6px',
            letterSpacing: '-0.3px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {getStepTitle()}
        </motion.h1>
        
        <motion.span
          style={{ 
            fontSize: '15px', 
            fontWeight: 400,
            color: '#86868b',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {getStepSubtitle()}
        </motion.span>
      </div>

      {/* Content Section - flexible ~542px */}
      <div className="flex-1 px-6 overflow-y-auto scrollbar-hidden" style={{ minHeight: '0' }}>
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {getStepContent()}
        </motion.div>
      </div>

      {/* Footer - 140px total */}
      <div className="flex-shrink-0 px-6 pt-6 pb-8" style={{ height: '140px' }}>
        <div className="space-y-3">
          <motion.button
            onClick={handleContinue}
            disabled={!isStepValid() || isSubmitting}
            className="w-full py-4 rounded-xl"
            style={{ 
              backgroundColor: isStepValid() ? '#1d1d1f' : '#e5e5e7',
              color: isStepValid() ? '#ffffff' : '#86868b',
              fontSize: '17px',
              fontWeight: 600,
              border: 'none',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
              height: '52px'
            }}
            whileHover={isStepValid() ? { 
              backgroundColor: '#2d2d2f',
              transition: { duration: 0.2 }
            } : {}}
            whileTap={isStepValid() ? { 
              scale: 0.98,
              transition: { duration: 0.1 }
            } : {}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {isSubmitting 
              ? 'Setting up...' 
              : step === 4 
                ? 'Complete Setup' 
                : 'Continue'
            }
          </motion.button>

          <motion.button
            onClick={onSkip}
            className="w-full py-4 rounded-xl border-2"
            style={{ 
              backgroundColor: 'transparent',
              borderColor: '#e5e5e7',
              color: '#86868b',
              fontSize: '17px',
              fontWeight: 500,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
              height: '52px'
            }}
            whileHover={{ 
              backgroundColor: '#f9f9f9',
              borderColor: '#d1d1d6',
              color: '#1d1d1f',
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.98,
              transition: { duration: 0.1 }
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            I'll set this up later
          </motion.button>
        </div>
      </div>
    </div>
  );
}