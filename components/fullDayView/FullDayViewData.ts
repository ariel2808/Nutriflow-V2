import { Event } from '../../App';

export const baseEvents: Event[] = [
  {
    id: '1',
    title: 'Morning Coffee',
    subtitle: 'Double espresso, 2 medjool dates',
    time: '06:00',
    type: 'coffee',
    description: 'Double espresso, 2 medjool dates'
  },
  {
    id: '2',
    title: 'Swim',
    subtitle: '2km freestyle',
    time: '06:30',
    type: 'swim',
    duration: 75,
    intensity: 'MEDIUM',
    description: 'Recovery workout • 2000m • Pool • Target pace 1:45/100m • Moderate effort',
    workoutDetails: {
      distance: 2000,
      pace: '1:45',
      location: 'Pool',
      workoutType: 'Technique'
    }
  },
  {
    id: '3',
    title: 'Breakfast, post workout',
    subtitle: 'Eggs, Greek yogurt',
    time: '08:00',
    type: 'meal',
    description: 'Post-workout breakfast with eggs and Greek yogurt'
  },
  {
    id: '4',
    title: 'Lunch',
    subtitle: 'Rice, chicken breast',
    time: '12:00',
    type: 'meal',
    description: 'Rice, chicken breast, balanced meal'
  },
  {
    id: '5',
    title: 'Pre Workout',
    subtitle: 'Banana, coffee',
    time: '16:00',
    type: 'meal',
    description: 'Pre-workout snack with banana and coffee'
  },
  {
    id: '6',
    title: 'Strength Workout',
    subtitle: 'Upper body',
    time: '17:00',
    type: 'workout',
    duration: 90,
    intensity: 'HIGH',
    description: 'High intensity upper body strength training focusing on push/pull movements with compound exercises',
    workoutDetails: {
      focus: 'Upper Body',
      exerciseCount: 6
    }
  },
  {
    id: '7',
    title: 'Dinner, post Workout',
    subtitle: 'Steak, potatoes',
    time: '19:30',
    type: 'meal',
    description: 'Post-workout dinner with steak and potatoes'
  },
  {
    id: '8',
    title: 'Morning Run',
    subtitle: '10km recovery run',
    time: '07:00',
    type: 'workout',
    duration: 60,
    intensity: 'LOW',
    description: 'Easy recovery run to start the day with focus on maintaining conversational pace',
    workoutDetails: {
      distance: 10,
      pace: '5:30',
      workoutType: 'Recovery'
    }
  }
];