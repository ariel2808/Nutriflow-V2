import React from 'react';
import { EventItem } from './EventItem';
import { Event } from '../App';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { needsFueling, generateFuelingEvents, parseTimeToMinutes } from './FuelingUtils';

interface CalendarScreenProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onEventClick: (event: Event) => void;
  onExpandClick: () => void;
  onDailyViewOpen?: (date: Date) => void;
}

export function CalendarScreen({ selectedDate, onDateSelect, onEventClick, onExpandClick, onDailyViewOpen }: CalendarScreenProps) {
  // Base events for the selected date
  const baseEvents: Event[] = [
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
      title: 'Run',
      subtitle: '10 km easy pace',
      time: '06:30',
      type: 'workout',
      duration: 75,
      intensity: 'MEDIUM',
      description: '10 km easy pace training session'
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
      title: 'Afternoon Snack',
      subtitle: 'Protein shake, banana',
      time: '15:30',
      type: 'meal',
      description: 'Post-workout recovery snack'
    },
    {
      id: '6',
      title: 'Swimming',
      subtitle: '45 min technique session',
      time: '17:00',
      type: 'swim',
      duration: 45,
      intensity: 'LOW',
      description: 'Focus on stroke technique'
    },
    {
      id: '7',
      title: 'Dinner',
      subtitle: 'Salmon, quinoa, vegetables',
      time: '19:30',
      type: 'meal',
      description: 'Balanced dinner for recovery'
    }
  ];

  // Generate fueling events for workouts that need them
  const fuelingEvents = baseEvents
    .filter(event => (event.type === 'workout' || event.type === 'swim') && needsFueling(event))
    .flatMap(workout => generateFuelingEvents(workout));

  // Combine and sort all events by time
  const allEvents = [...baseEvents, ...fuelingEvents].sort((a, b) => 
    parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time)
  );

  // Show only first 3 events
  const events = allEvents.slice(0, 3);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  const currentDay = selectedDate.getDate();

  // Get first day of the month and number of days
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  
  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="w-full h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="px-5 pt-12 h-full flex flex-col">
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

        <div className="flex-1 min-h-0 overflow-y-auto space-y-6 pb-8">
          {/* Calendar Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl" style={{ color: 'var(--text-primary)' }}>
              {monthNames[currentMonth]} {currentYear}
            </h1>
            <div className="flex items-center gap-2">
              <button className="p-2">
                <ChevronLeft size={20} style={{ color: 'var(--icon-secondary)' }} />
              </button>
              <button className="p-2">
                <ChevronRight size={20} style={{ color: 'var(--icon-secondary)' }} />
              </button>
            </div>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-1">
            {dayNames.map((day) => (
              <div 
                key={day} 
                className="text-center text-xs py-2"
                style={{ color: 'var(--text-placeholder)' }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => (
              <div key={index} className="aspect-square flex items-center justify-center">
                {day && (
                  <button
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all duration-200"
                    style={{
                      backgroundColor: day === currentDay ? '#4A90E2' : 'transparent',
                      color: day === currentDay ? '#FFFFFF' : 'var(--text-primary)'
                    }}
                    onMouseEnter={(e) => {
                      if (day !== currentDay) {
                        e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (day !== currentDay) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                    onClick={() => {
                      const newDate = new Date(currentYear, currentMonth, day);
                      onDateSelect(newDate);
                      onDailyViewOpen?.(newDate);
                    }}
                  >
                    {day}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Selected Date Events */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg" style={{ color: 'var(--text-primary)' }}>
                {monthNames[selectedDate.getMonth()]} {selectedDate.getDate()}
                {selectedDate.getDate() === 1 || selectedDate.getDate() === 21 || selectedDate.getDate() === 31 
                  ? 'st' 
                  : selectedDate.getDate() === 2 || selectedDate.getDate() === 22 
                    ? 'nd' 
                    : selectedDate.getDate() === 3 || selectedDate.getDate() === 23 
                      ? 'rd' 
                      : 'th'}
              </h2>
              <button onClick={() => onDailyViewOpen?.(selectedDate)} className="p-2">
                <Expand size={20} style={{ color: 'var(--icon-secondary)' }} />
              </button>
            </div>
            
            <div className="space-y-3">
              {events.map((event) => (
                <EventItem 
                  key={event.id}
                  event={event}
                  onClick={() => onEventClick(event)}
                />
              ))}
              
              {/* Show more indicator if there are additional events */}
              {allEvents.length > 3 && (
                <div className="flex items-center justify-center py-3 text-sm" style={{ color: 'var(--text-placeholder)' }}>
                  <span>+{allEvents.length - 3} more events</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}