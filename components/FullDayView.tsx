import React, { useState } from 'react';
import { Event } from '../App';
import { motion } from 'motion/react';
import { AddItemModal } from './AddItemModal';
import { AddWorkoutModal } from './AddWorkoutModal';
import { AddMealModal } from './AddMealModal';
import { ManualWorkoutEditForm } from './ManualWorkoutEditForm';
import { ManualEditForm } from './ManualEditForm';
import { needsFueling, generateFuelingEvents, parseTimeToMinutes } from './FuelingUtils';
import { baseEvents } from './fullDayView/FullDayViewData';
import { FullDayHeader } from './fullDayView/FullDayHeader';
import { FullDayEventsList } from './fullDayView/FullDayEventsList';

interface FullDayViewProps {
  date: Date;
  onEventClick: (event: Event) => void;
  onBack: () => void;
}

export function FullDayView({ date, onEventClick, onBack }: FullDayViewProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddWorkoutModalOpen, setIsAddWorkoutModalOpen] = useState(false);
  const [isAddMealModalOpen, setIsAddMealModalOpen] = useState(false);
  const [isManualWorkoutOpen, setIsManualWorkoutOpen] = useState(false);
  const [isManualMealOpen, setIsManualMealOpen] = useState(false);

  const handleAIAddWorkout = (instructions: string) => {
    console.log('AI Add Workout instructions:', instructions);
    // Future: Send to AI service to create workout
  };

  const handleAIAddMeal = (instructions: string) => {
    console.log('AI Add Meal instructions:', instructions);
    // Future: Send to AI service to create meal
  };

  const handleManualWorkoutSave = (workout: any, sets: any) => {
    console.log('Manual workout save:', workout, sets);
    // Future: Save workout data
  };

  const handleManualMealSave = (meal: any, ingredients: any) => {
    console.log('Manual meal save:', meal, ingredients);
    // Future: Save meal data
  };

  // Generate fueling events for workouts that need them
  const fuelingEvents = baseEvents
    .filter(event => (event.type === 'workout' || event.type === 'swim') && needsFueling(event))
    .flatMap(workout => generateFuelingEvents(workout));

  // Combine and sort all events by time
  const events = [...baseEvents, ...fuelingEvents].sort((a, b) => 
    parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time)
  );

  return (
    <motion.div 
      className="px-6 pt-12"
      style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}
      initial={{ 
        scale: 1.02,
        opacity: 0.9
      }}
      animate={{ 
        scale: 1,
        opacity: 1
      }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <FullDayHeader 
        date={date}
        onBack={onBack}
        onAddClick={() => setIsAddModalOpen(true)}
      />

      <FullDayEventsList 
        events={events}
        onEventClick={onEventClick}
      />

      {/* Add Item Modal */}
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddWorkout={() => {
          setIsAddWorkoutModalOpen(true);
        }}
        onAddMeal={() => {
          setIsAddMealModalOpen(true);
        }}
      />

      {/* Add Workout Modal */}
      <AddWorkoutModal
        isOpen={isAddWorkoutModalOpen}
        onClose={() => setIsAddWorkoutModalOpen(false)}
        onAIAdd={handleAIAddWorkout}
        onManualAdd={() => setIsManualWorkoutOpen(true)}
      />

      {/* Add Meal Modal */}
      <AddMealModal
        isOpen={isAddMealModalOpen}
        onClose={() => setIsAddMealModalOpen(false)}
        onAIAdd={handleAIAddMeal}
        onManualAdd={() => setIsManualMealOpen(true)}
      />

      {/* Manual Workout Form */}
      <ManualWorkoutEditForm
        isOpen={isManualWorkoutOpen}
        onClose={() => setIsManualWorkoutOpen(false)}
        workout={{
          id: 'new',
          title: '',
          subtitle: '',
          time: new Date().toTimeString().slice(0, 5),
          type: 'workout',
          description: ''
        }}
        onSave={handleManualWorkoutSave}
      />

      {/* Manual Meal Form */}
      <ManualEditForm
        isOpen={isManualMealOpen}
        onClose={() => setIsManualMealOpen(false)}
        meal={{
          id: 'new',
          title: '',
          subtitle: '',
          time: new Date().toTimeString().slice(0, 5),
          type: 'meal',
          description: ''
        }}
        onSave={handleManualMealSave}
      />
    </motion.div>
  );
}