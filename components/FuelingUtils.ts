import { Event, FuelingPlan, FuelingItem } from '../App';

// Helper function to parse time string to minutes
export const parseTimeToMinutes = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

// Helper function to convert minutes to time string
export const minutesToTimeString = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

// Check if workout needs fueling based on duration and intensity
export const needsFueling = (workout: Event): boolean => {
  if (!workout.duration && !workout.intensity) return false;
  
  // If duration > 60 minutes
  if (workout.duration && workout.duration > 60) return true;
  
  // If intensity is HIGH and duration >= 45 minutes
  if (workout.intensity === 'HIGH' && workout.duration && workout.duration >= 45) return true;
  
  return false;
};

// Generate fueling events for a workout (before and after)
export const generateFuelingEvents = (workout: Event): Event[] => {
  const workoutStartMinutes = parseTimeToMinutes(workout.time);
  const workoutDuration = workout.duration || 60;
  const events: Event[] = [];
  
  // Before workout fueling event (30 minutes before)
  const beforeFuelingMinutes = workoutStartMinutes - 30;
  if (beforeFuelingMinutes >= 0) { // Only add if it's not before midnight
    events.push({
      id: `fueling-before-${workout.id}`,
      title: 'Fueling - before workout',
      subtitle: '1 banana + 250ml water',
      time: minutesToTimeString(beforeFuelingMinutes),
      type: 'fueling',
      workoutId: workout.id,
      description: 'Pre-workout fueling to prepare your body with easily digestible carbohydrates and hydration'
    });
  }
  
  // After workout fueling event (immediately after workout ends)
  const afterFuelingMinutes = workoutStartMinutes + workoutDuration;
  events.push({
    id: `fueling-after-${workout.id}`,
    title: 'Fueling - post workout',
    subtitle: 'Protein shake + recovery meal',
    time: minutesToTimeString(afterFuelingMinutes),
    type: 'fueling',
    workoutId: workout.id,
    description: 'Post-workout nutrition to accelerate recovery, replenish glycogen, and support muscle protein synthesis'
  });
  
  return events;
};

// Legacy function for backward compatibility - now returns first event from generateFuelingEvents
export const generateFuelingEvent = (workout: Event): Event => {
  const events = generateFuelingEvents(workout);
  return events[0]; // Return the before event for backward compatibility
};

// Generate comprehensive fueling plan for a workout
export const generateFuelingPlan = (workout: Event): FuelingPlan => {
  const duration = workout.duration || 60;
  const intensity = workout.intensity || 'MEDIUM';
  
  // Before phase (30-45 min pre-workout)
  const beforeItems: FuelingItem[] = [
    {
      icon: 'leaf',
      type: 'whole-food',
      amount: '1 banana',
      details: 'Easy to digest carbohydrates',
    },
    {
      icon: 'droplet',
      type: 'hydration',
      amount: '250-300 ml',
      details: 'Water or light sports drink',
    }
  ];

  // Add more pre-workout fuel for high intensity
  if (intensity === 'HIGH') {
    beforeItems.push({
      icon: 'leaf',
      type: 'whole-food',
      amount: '2 dates',
      details: 'Additional quick energy',
    });
  }

  // During phase (every 20-30 min)
  const duringPhases: any[] = [];
  
  if (duration > 60) {
    // Create one consolidated during phase with all recommendations
    duringPhases.push({
      timing: 'Throughout workout',
      items: [
        {
          icon: 'zap',
          type: 'carbs',
          amount: '30g carbs',
          frequency: 'Every 30 min',
          details: 'Sports drink, gel, or 2-3 dates',
        },
        {
          icon: 'droplet',
          type: 'hydration',
          amount: '200-250 ml',
          frequency: 'Every 15-20 min',
          details: 'Small sips to maintain hydration',
        },
        {
          icon: 'salt',
          type: 'sodium',
          amount: '300-700 mg',
          frequency: 'Per hour',
          details: 'Electrolyte replacement in sports drink',
        }
      ]
    });
  } else if (duration > 45) {
    // For shorter but intense workouts
    duringPhases.push({
      timing: 'Mid-workout',
      items: [
        {
          icon: 'droplet',
          type: 'hydration',
          amount: '150-200 ml',
          frequency: 'Every 15 min',
          details: 'Water or diluted sports drink',
        }
      ]
    });
  }

  // After phase (0-30 min post-workout)
  const afterItems: FuelingItem[] = [
    {
      icon: 'zap',
      type: 'carbs',
      amount: '30-60g',
      details: 'Recovery carbohydrates',
    },
    {
      icon: 'leaf',
      type: 'whole-food',
      amount: '20-25g protein',
      details: 'Protein shake or Greek yogurt',
    },
    {
      icon: 'droplet',
      type: 'hydration',
      amount: '500-750 ml',
      details: 'Replace fluid losses',
    }
  ];

  return {
    before: {
      timing: '30-45 min pre-workout',
      items: beforeItems,
      description: 'Prepare your body with easily digestible carbohydrates and hydration'
    },
    during: duringPhases.length > 0 ? duringPhases : [{
      timing: 'During workout',
      items: [{
        icon: 'droplet',
        type: 'hydration',
        amount: '100-150 ml',
        frequency: 'Every 15-20 min',
        details: 'Small, frequent sips of water',
      }]
    }],
    after: {
      timing: '0-30 min post-workout',
      items: afterItems,
      description: 'Kickstart recovery with the optimal 3:1 or 4:1 carb-to-protein ratio'
    }
  };
};

// Get fueling plan explanation for different phases
export const getFuelingExplanation = (phase: 'before' | 'during' | 'after'): string => {
  switch (phase) {
    case 'before':
      return 'Pre-workout nutrition ensures you have adequate energy stores and prevents early fatigue.';
    case 'during':
      return 'During-workout fueling maintains blood glucose and delays glycogen depletion for sustained performance.';
    case 'after':
      return 'Post-workout nutrition accelerates recovery, replenishes glycogen, and supports muscle protein synthesis.';
    default:
      return '';
  }
};