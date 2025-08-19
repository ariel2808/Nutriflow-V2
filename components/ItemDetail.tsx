import React, { useState } from 'react';
import { Event, WorkoutPlanData } from '../App';
import { ChevronLeft, Edit2, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { getIngredients } from './itemDetail/IngredientsData';
import { getIcon, getIconColor } from './itemDetail/EventIconUtils';
import { IngredientsSection } from './itemDetail/IngredientsSection';
import { NutritionSection } from './itemDetail/NutritionSection';
import { FuelingPlanSection } from './itemDetail/FuelingPlanSection';
import { WorkoutDetailsSection } from './itemDetail/WorkoutDetailsSection';
import { EditMealModal } from './EditMealModal';
import { ManualEditForm } from './ManualEditForm';
import { ManualWorkoutPlanningModal } from './ManualWorkoutPlanningModal';
import { needsFueling } from './FuelingUtils';

interface ItemDetailProps {
  event: Event;
  onBack: () => void;
}

export function ItemDetail({ event, onBack }: ItemDetailProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isManualEditOpen, setIsManualEditOpen] = useState(false);
  const [isWorkoutPlanningModalOpen, setIsWorkoutPlanningModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const ingredients = getIngredients(event.id);

  const isWorkout = event.type === 'workout' || event.type === 'swim';
  const isMeal = event.type === 'meal';
  const isFueling = event.type === 'fueling';
  
  // For fueling events, we need to find the associated workout
  const isWorkoutWithFueling = isWorkout && needsFueling(event);
  const shouldShowFuelingPlan = isWorkoutWithFueling || isFueling;

  // Convert Event to WorkoutPlanData format for editing
  const convertEventToWorkoutPlan = (event: Event): WorkoutPlanData => {
    const getWorkoutType = () => {
      if (event.type === 'swim') return 'swimming';
      if (event.title.toLowerCase().includes('run')) return 'running';
      if (event.title.toLowerCase().includes('cycle') || event.title.toLowerCase().includes('bike')) return 'cycling';
      if (event.title.toLowerCase().includes('strength') || event.title.toLowerCase().includes('gym')) return 'strength';
      return 'other';
    };

    const convertIntensity = (intensity?: string) => {
      switch (intensity?.toLowerCase()) {
        case 'low': return 'easy';
        case 'medium': return 'moderate';  
        case 'high': return 'hard';
        default: return 'moderate';
      }
    };

    return {
      name: event.title,
      time: event.time,
      duration: event.duration || 60,
      type: getWorkoutType(),
      intensity: convertIntensity(event.intensity),
      notes: event.description || '',
      sportSpecific: event.workoutDetails
    };
  };

  const handleAIEdit = (instructions: string) => {
    console.log('AI Edit instructions:', instructions);
    // Future: Send instructions to AI service
  };

  const handleManualEdit = () => {
    if (isWorkout) {
      setIsWorkoutPlanningModalOpen(true);
    } else {
      setIsManualEditOpen(true);
    }
  };

  const handleSaveManualEdit = (updatedItem: any, updatedData: any) => {
    console.log('Saving manual edit:', updatedItem, updatedData);
    // Future: Update item data (meal ingredients or workout sets)
  };

  const handleSaveWorkoutPlan = (workoutData: WorkoutPlanData) => {
    console.log('Saving edited workout:', workoutData);
    // Future: Update the existing workout event with new data
    alert(`Workout "${workoutData.name}" updated successfully!`);
    setIsWorkoutPlanningModalOpen(false);
  };

  const handleMarkComplete = () => {
    setIsCompleted(!isCompleted);
    console.log(`Event ${event.id} marked as ${!isCompleted ? 'completed' : 'incomplete'}`);
    // Future: Update event completion status in data store
  };

  return (
    <div className="w-full h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="px-5 pt-12 h-full flex flex-col">
        <motion.div 
          className="flex-1 min-h-0 overflow-y-auto"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ 
            duration: 0.4, 
            ease: [0.16, 1, 0.3, 1],
            staggerChildren: 0.1
          }}
        >
          {/* Status Bar */}
          <div 
            className="flex justify-between items-center mb-8 text-sm flex-shrink-0"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span>8:00 AM</span>
            <div className="flex items-center gap-2">
              <span style={{ fontWeight: 500 }}>22°C</span>
              <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-12 flex-shrink-0">
            <button 
              onClick={onBack} 
              className="p-2 -ml-2 rounded-full transition-all duration-200"
              style={{ backgroundColor: 'transparent' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-card)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <ChevronLeft size={24} style={{ color: 'var(--icon-secondary)' }} />
            </button>
            {(isMeal || isWorkout || isFueling) && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleMarkComplete}
                  className="p-2 rounded-full transition-all duration-200"
                  style={{ 
                    backgroundColor: isCompleted ? 'var(--btn-primary-bg)' : 'transparent',
                    transform: isCompleted ? 'scale(1.05)' : 'scale(1)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isCompleted) {
                      e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isCompleted) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Check 
                    size={20} 
                    style={{ 
                      color: isCompleted ? '#FFFFFF' : 'var(--icon-secondary)',
                      transition: 'color 200ms ease-in-out'
                    }} 
                  />
                </button>
                <button 
                  onClick={() => isWorkout ? setIsWorkoutPlanningModalOpen(true) : setIsEditModalOpen(true)}
                  className="p-2 rounded-full transition-all duration-200"
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Edit2 size={20} style={{ color: 'var(--icon-secondary)' }} />
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          <motion.div 
            className="text-center pb-8"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            initial="hidden"
            animate="visible"
          >
            {/* Large Icon */}
            <motion.div 
              className={`w-24 h-24 rounded-2xl flex items-center justify-center ${getIconColor(event.type)} mx-auto mb-8`}
              variants={{
                hidden: { scale: 0.8, opacity: 0 },
                visible: { scale: 1, opacity: 1 }
              }}
            >
              {getIcon(event.type)}
            </motion.div>

            {/* Title and Time */}
            <motion.div
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
            >
              <h1 className="mb-2" style={{ color: 'var(--text-primary)' }}>{event.title}</h1>
              <p 
                className="text-lg mb-8 font-mono"
                style={{ color: 'var(--text-placeholder)' }}
              >
                {event.time}
              </p>
            </motion.div>

            {/* Workout Details - Show for workouts */}
            {isWorkout && (
              <WorkoutDetailsSection event={event} />
            )}

            {/* Ingredients - Only show for meals with ingredients */}
            {event.type === 'meal' && ingredients.length > 0 && (
              <IngredientsSection ingredients={ingredients} />
            )}

            {/* Description - Show for non-meals or meals without ingredients, and not workouts with details */}
            {(event.type !== 'meal' || ingredients.length === 0) && !isWorkout && (
              <motion.div 
                className="text-left rounded-xl p-6 mb-6"
                style={{ backgroundColor: 'var(--bg-card)' }}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
              >
                <p 
                  className="leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {event.description || event.subtitle}
                </p>
              </motion.div>
            )}

            {/* Macros Table - Only show for meals */}
            {event.type === 'meal' && <NutritionSection />}

            {/* Fueling Plan - Show for workouts that need fueling or fueling events */}
            {shouldShowFuelingPlan && (
              <FuelingPlanSection 
                workout={isFueling ? { 
                  ...event, 
                  type: 'workout',
                  duration: 90, // Default for fueling events
                  intensity: 'HIGH' as const
                } : event} 
              />
            )}
          </motion.div>
        </motion.div>

        {/* Edit Meal Modal */}
        {isMeal && (
          <>
            <EditMealModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              meal={event}
              onAIEdit={handleAIEdit}
              onManualEdit={handleManualEdit}
            />

            <ManualEditForm
              isOpen={isManualEditOpen}
              onClose={() => setIsManualEditOpen(false)}
              meal={event}
              onSave={handleSaveManualEdit}
            />
          </>
        )}

        {/* Workout Planning Modal for Editing */}
        {isWorkout && (
          <ManualWorkoutPlanningModal
            isOpen={isWorkoutPlanningModalOpen}
            onClose={() => setIsWorkoutPlanningModalOpen(false)}
            onSave={handleSaveWorkoutPlan}
            initialData={convertEventToWorkoutPlan(event)}
          />
        )}
      </div>
    </div>
  );
}