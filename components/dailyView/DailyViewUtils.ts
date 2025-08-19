export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.toDateString() === date2.toDateString();
};

export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

export const getWeekDays = (selectedDate: Date): Date[] => {
  const startOfWeek = new Date(selectedDate);
  const day = startOfWeek.getDay();
  startOfWeek.setDate(startOfWeek.getDate() - day);
  
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });
};

export const getCurrentTimePosition = (): number => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return (hours * 60 + minutes) / (24 * 60); // Percentage of day completed
};

export const getHourFromTime = (timeString: string): number => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours + minutes / 60;
};

export const generateHours = (): Array<{ hour: number; label: string }> => {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    label: i === 0 ? '12 AM' : i < 12 ? `${i} AM` : i === 12 ? '12 PM' : `${i - 12} PM`
  }));
};

export const getSwipeDirection = (offsetX: number, threshold: number = 80): 'left' | 'right' | null => {
  if (Math.abs(offsetX) < threshold) return null;
  return offsetX > 0 ? 'right' : 'left';
};

export const calculateSlideDirection = (currentDate: Date, newDate: Date): 'left' | 'right' | null => {
  if (newDate > currentDate) return 'left';
  if (newDate < currentDate) return 'right';
  return null;
};

// Animation easing functions
export const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number];
export const easeInOut = [0.4, 0, 0.2, 1] as [number, number, number, number];

// Animation durations (in milliseconds)
export const ANIMATION_DURATIONS = {
  dayChange: 240,
  weekPaging: 300,
  nowLine: 120,
  eventTile: 300,
  selectedDayPill: 150,
} as const;

// Sample events data - exported for reuse in transitions
export const SAMPLE_EVENTS = [
  {
    id: '1',
    title: 'Morning Coffee',
    subtitle: 'Double espresso, 2 medjool dates',
    time: '06:00',
    type: 'coffee' as const,
    description: 'Start the day right'
  },
  {
    id: '2',
    title: 'Morning Run',
    subtitle: '10 km easy pace',
    time: '06:30',
    type: 'workout' as const,
    duration: 75,
    intensity: 'MEDIUM' as const,
    description: '10 km easy pace training session'
  },
  {
    id: '3',
    title: 'Breakfast',
    subtitle: 'Eggs, Greek yogurt',
    time: '08:00',
    type: 'meal' as const,
    description: 'Post-workout recovery meal'
  },
  {
    id: '4',
    title: 'Lunch Meeting',
    subtitle: 'Team sync over salads',
    time: '12:30',
    type: 'meal' as const,
    description: 'Weekly team meeting'
  },
  {
    id: '5',
    title: 'Swimming',
    subtitle: '45 min technique session',
    time: '17:00',
    type: 'swim' as const,
    duration: 45,
    intensity: 'LOW' as const,
    description: 'Focus on stroke technique'
  },
  {
    id: '6',
    title: 'Dinner',
    subtitle: 'Salmon, quinoa, vegetables',
    time: '19:30',
    type: 'meal' as const,
    description: 'Balanced dinner for recovery'
  }
];