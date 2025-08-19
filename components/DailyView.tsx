import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { ArrowLeft, Coffee, Dumbbell, Utensils, Waves, Fuel, Plus } from 'lucide-react';
import { Event } from '../App';
import { AddItemModal } from './AddItemModal';
import { AddWorkoutModal } from './AddWorkoutModal';
import { AddMealModal } from './AddMealModal';
import { ManualWorkoutPlanningModal } from './ManualWorkoutPlanningModal';
import { ManualEditForm } from './ManualEditForm';
import {
  formatDate,
  isSameDay,
  isToday,
  getWeekDays,
  getCurrentTimePosition,
  getHourFromTime,
  generateHours,
  getSwipeDirection,
  calculateSlideDirection,
  easeOut,
  easeInOut,
  ANIMATION_DURATIONS
} from './dailyView/DailyViewUtils';

interface DailyViewProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onEventClick: (event: Event) => void;
  onBack: () => void;
}

// Sample events data
const SAMPLE_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Morning Coffee',
    subtitle: 'Double espresso, 2 medjool dates',
    time: '06:00',
    type: 'coffee',
    description: 'Start the day right'
  },
  {
    id: '2',
    title: 'Morning Run',
    subtitle: '10 km easy pace',
    time: '06:30',
    type: 'workout',
    duration: 75,
    intensity: 'MEDIUM',
    description: '10 km easy pace training session'
  },
  {
    id: '3',
    title: 'Breakfast',
    subtitle: 'Eggs, Greek yogurt',
    time: '08:00',
    type: 'meal',
    description: 'Post-workout recovery meal'
  },
  {
    id: '4',
    title: 'Lunch Meeting',
    subtitle: 'Team sync over salads',
    time: '12:30',
    type: 'meal',
    description: 'Weekly team meeting'
  },
  {
    id: '5',
    title: 'Swimming',
    subtitle: '45 min technique session',
    time: '17:00',
    type: 'swim',
    duration: 45,
    intensity: 'LOW',
    description: 'Focus on stroke technique'
  },
  {
    id: '6',
    title: 'Dinner',
    subtitle: 'Salmon, quinoa, vegetables',
    time: '19:30',
    type: 'meal',
    description: 'Balanced dinner for recovery'
  }
];

interface DayStripProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onSwipe: (direction: 'left' | 'right') => void;
}

function DayStrip({ selectedDate, onDateSelect, onSwipe }: DayStripProps) {
  const weekDays = getWeekDays(selectedDate);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((event: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 50) {
      setIsDragging(true);
    }
  }, []);

  const handleDragEnd = useCallback((event: any, info: PanInfo) => {
    const swipeDirection = getSwipeDirection(info.offset.x);
    if (swipeDirection) {
      onSwipe(swipeDirection === 'right' ? 'right' : 'left');
    }
    setIsDragging(false);
  }, [onSwipe]);

  return (
    <div className="sticky top-0 z-20 py-4" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="max-w-md mx-auto px-6">
        {/* Week Navigation Strip */}
        <motion.div
          className="flex justify-between items-center mb-4"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {weekDays.map((date, index) => {
            const isSelected = isSameDay(date, selectedDate);
            const dayIsToday = isToday(date);
            
            return (
              <motion.button
                key={date.toISOString()}
                onClick={() => onDateSelect(date)}
                className="flex flex-col items-center py-2 px-1 min-w-[40px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Day Letter */}
                <span 
                  className="text-xs mb-1"
                  style={{ 
                    color: isSelected ? 'var(--btn-primary-bg)' : 'var(--text-secondary)',
                    fontWeight: 500
                  }}
                >
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}
                </span>
                
                {/* Day Number */}
                <motion.div
                  className="relative flex items-center justify-center w-8 h-8 rounded-full"
                  style={{
                    backgroundColor: isSelected ? 'var(--btn-primary-bg)' : 'transparent',
                    color: isSelected ? 'var(--btn-primary-text)' : dayIsToday ? 'var(--btn-primary-bg)' : 'var(--text-primary)'
                  }}
                  animate={{
                    scale: isSelected ? 1 : 0.96,
                  }}
                  transition={{ 
                    duration: ANIMATION_DURATIONS.selectedDayPill / 1000, 
                    ease: easeOut
                  }}
                >
                  <span className="text-sm font-medium">
                    {date.getDate()}
                  </span>
                  
                  {/* Today indicator dot */}
                  {dayIsToday && !isSelected && (
                    <div 
                      className="absolute -bottom-1 w-1 h-1 rounded-full"
                      style={{ backgroundColor: 'var(--btn-primary-bg)' }}
                    />
                  )}
                </motion.div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Selected Date Display */}
        <motion.div
          key={selectedDate.toDateString()}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATIONS.dayChange / 1000, ease: easeOut }}
          className="text-center"
        >
          <h2 
            className="text-lg"
            style={{ 
              color: 'var(--text-primary)',
              fontWeight: 600
            }}
          >
            {formatDate(selectedDate)}
          </h2>
        </motion.div>
      </div>
    </div>
  );
}

interface HourGridProps {
  selectedDate: Date;
  events: Event[];
  onEventClick: (event: Event) => void;
  isDragging?: boolean;
  onEventTimeUpdate?: (eventId: string, newTime: string) => void;
}

// Drag and drop utilities
const snapToFifteenMinutes = (y: number, hourHeight: number = 50): { hour: number; minutes: number; snapY: number } => {
  const totalMinutes = (y / hourHeight) * 60;
  const snappedMinutes = Math.round(totalMinutes / 15) * 15;
  const hour = Math.floor(snappedMinutes / 60);
  const minutes = snappedMinutes % 60;
  const snapY = (snappedMinutes / 60) * hourHeight;
  
  return { hour: Math.max(0, Math.min(23, hour)), minutes, snapY };
};

const formatTimeFromSnap = (hour: number, minutes: number): string => {
  return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

interface DragState {
  isDragging: boolean;
  eventId: string | null;
  startY: number;
  currentY: number;
  snapY: number;
  targetTime: string;
}

function HourGrid({ selectedDate, events, onEventClick, isDragging = false, onEventTimeUpdate }: HourGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const hours = generateHours();
  const currentTimePosition = getCurrentTimePosition();
  const showNowLine = isToday(selectedDate);
  
  // Drag and drop state
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    eventId: null,
    startY: 0,
    currentY: 0,
    snapY: 0,
    targetTime: ''
  });
  
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const hourHeight = 50;

  // Icon and color utilities (same as EventItem component)
  const getIcon = (type: Event['type']) => {
    const iconColor = '#FFFFFF';
    switch (type) {
      case 'coffee':
        return <Coffee size={20} style={{ color: iconColor }} />;
      case 'workout':
        return <Dumbbell size={20} style={{ color: iconColor }} />;
      case 'meal':
        return <Utensils size={20} style={{ color: iconColor }} />;
      case 'swim':
        return <Waves size={20} style={{ color: iconColor }} />;
      case 'fueling':
        return <Fuel size={20} style={{ color: iconColor }} />;
      default:
        return <Utensils size={20} style={{ color: iconColor }} />;
    }
  };

  const getIconColor = (type: Event['type']) => {
    switch (type) {
      case 'coffee':
        return '#B45309'; // Brown
      case 'workout':
        return '#EF4444'; // Red
      case 'meal':
        return '#EAB308'; // Yellow
      case 'swim':
        return '#3B82F6'; // Blue
      case 'fueling':
        return '#F97316'; // Orange
      default:
        return '#6B7280';
    }
  };

  // Auto-scroll to current time or earliest event on mount
  useEffect(() => {
    if (scrollRef.current) {
      let scrollToHour = 8; // Default to 8 AM
      
      if (isToday(selectedDate)) {
        scrollToHour = Math.max(new Date().getHours() - 2, 0); // Current time - 2 hours
      } else if (events.length > 0) {
        const earliestEvent = events.reduce((earliest, event) => {
          const eventHour = getHourFromTime(event.time);
          const earliestHour = getHourFromTime(earliest.time);
          return eventHour < earliestHour ? event : earliest;
        });
        scrollToHour = Math.max(getHourFromTime(earliestEvent.time) - 1, 0);
      }

      const scrollTo = scrollToHour * hourHeight;
      
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollTo,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [selectedDate, events]);

  // Drag event handlers
  const handleEventPressStart = useCallback((event: Event, clientY: number) => {
    const rect = scrollRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const scrollTop = scrollRef.current?.scrollTop || 0;
    const relativeY = clientY - rect.top + scrollTop;
    
    // Haptic feedback on supported devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    const timer = setTimeout(() => {
      setDragState(prev => ({
        ...prev,
        isDragging: true,
        eventId: event.id,
        startY: relativeY,
        currentY: relativeY,
        snapY: relativeY,
        targetTime: event.time
      }));
    }, 300); // 300ms long press
    
    setLongPressTimer(timer);
  }, []);

  const handleEventPressEnd = useCallback(() => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
    
    if (dragState.isDragging) {
      // Haptic feedback on drop
      if ('vibrate' in navigator) {
        navigator.vibrate(30);
      }
      
      // Update event time if changed
      if (dragState.eventId && dragState.targetTime && onEventTimeUpdate) {
        onEventTimeUpdate(dragState.eventId, dragState.targetTime);
      }
      
      setDragState({
        isDragging: false,
        eventId: null,
        startY: 0,
        currentY: 0,
        snapY: 0,
        targetTime: ''
      });
    }
  }, [dragState, onEventTimeUpdate, longPressTimer]);

  const handleEventMove = useCallback((clientY: number) => {
    if (!dragState.isDragging || !scrollRef.current) return;
    
    const rect = scrollRef.current.getBoundingClientRect();
    const scrollTop = scrollRef.current.scrollTop;
    const relativeY = clientY - rect.top + scrollTop;
    
    // Calculate snap position and target time
    const { snapY, hour, minutes } = snapToFifteenMinutes(relativeY, hourHeight);
    const targetTime = formatTimeFromSnap(hour, minutes);
    
    setDragState(prev => ({
      ...prev,
      currentY: relativeY,
      snapY,
      targetTime
    }));
  }, [dragState.isDragging, hourHeight]);

  // Touch event handlers
  const handleTouchStart = useCallback((event: Event, touchEvent: React.TouchEvent) => {
    const touch = touchEvent.touches[0];
    handleEventPressStart(event, touch.clientY);
  }, [handleEventPressStart]);

  const handleTouchMove = useCallback((touchEvent: React.TouchEvent) => {
    if (dragState.isDragging) {
      touchEvent.preventDefault(); // Prevent scrolling while dragging
      const touch = touchEvent.touches[0];
      handleEventMove(touch.clientY);
    }
  }, [dragState.isDragging, handleEventMove]);

  const handleTouchEnd = useCallback(() => {
    handleEventPressEnd();
  }, [handleEventPressEnd]);

  // Mouse event handlers for desktop
  const handleMouseDown = useCallback((event: Event, mouseEvent: React.MouseEvent) => {
    handleEventPressStart(event, mouseEvent.clientY);
  }, [handleEventPressStart]);

  const handleMouseMove = useCallback((mouseEvent: MouseEvent) => {
    if (dragState.isDragging) {
      handleEventMove(mouseEvent.clientY);
    }
  }, [dragState.isDragging, handleEventMove]);

  const handleMouseUp = useCallback(() => {
    handleEventPressEnd();
  }, [handleEventPressEnd]);

  // Global mouse events for dragging
  useEffect(() => {
    if (dragState.isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragState.isDragging, handleMouseMove, handleMouseUp]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
      }
    };
  }, [longPressTimer]);

  // Get events for specific hour
  const getEventsForHour = useCallback((hour: number): Event[] => {
    return events.filter(event => {
      const eventHour = getHourFromTime(event.time);
      return Math.floor(eventHour) === hour;
    });
  }, [events]);

  // Get drop zone highlights
  const getDropZoneStyle = useCallback((hour: number): React.CSSProperties => {
    if (!dragState.isDragging) return {};
    
    const snapHour = Math.floor(dragState.snapY / hourHeight);
    if (Math.abs(hour - snapHour) <= 0.5) {
      return {
        backgroundColor: 'rgba(74, 144, 226, 0.1)',
        transition: 'background-color 150ms ease-out'
      };
    }
    
    return {};
  }, [dragState, hourHeight]);

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto scrollbar-visible daily-view-scroll pb-6"
      style={{ 
        pointerEvents: isDragging || dragState.isDragging ? 'none' : 'auto',
        userSelect: isDragging || dragState.isDragging ? 'none' : 'auto'
      }}
    >
      {/* Full-width container */}
      <div className="w-full" style={{ minHeight: `${hours.length * 50}px` }}>
        {/* Hour Content */}
        <div className="relative" style={{ zIndex: 1 }}>
          {hours.map((hourInfo, index) => {
            const hourEvents = getEventsForHour(hourInfo.hour);
            
            return (
              <motion.div
                key={hourInfo.hour}
                className="relative flex flex-col h-[50px] w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.02, duration: 0.3 }}
                style={getDropZoneStyle(hourInfo.hour)}
              >
                {/* Time and Line Row */}
                <div className="flex flex-row items-center justify-center relative w-full px-6">
                  {/* Hour Label */}
                  <div 
                    className="flex flex-row items-center justify-end pr-[5px] w-[52px] text-[11px] tracking-[0.06px] text-nowrap text-right"
                    style={{ 
                      color: '#8e8e93',
                      fontWeight: 590
                    }}
                  >
                    <span>{hourInfo.label.replace(' ', ' ')}</span>
                  </div>
                  
                  {/* Separator Line - Extends full width */}
                  <div 
                    className="flex-1 h-[0.66px] min-h-px min-w-px"
                    style={{ 
                      backgroundColor: '#c7c7cc',
                      marginRight: '6px' // Match right margin
                    }}
                  />
                </div>
                
                {/* Event Area - Full width with proper constraints */}
                {hourEvents.length > 0 && (
                  <div 
                    className="absolute top-0 bottom-0 flex items-center w-full px-6"
                    style={{ 
                      zIndex: 3,
                      left: 0
                    }}
                  >
                    <div className="w-[52px] flex-shrink-0" /> {/* Time column spacer */}
                    <div className="flex-1 space-y-1 h-full flex flex-col justify-center pl-[5px]">
                      {hourEvents.map((event, eventIndex) => (
                        <motion.button
                          key={event.id}
                          onClick={() => !isDragging && !dragState.isDragging && onEventClick(event)}
                          onMouseDown={(e) => handleMouseDown(event, e)}
                          onTouchStart={(e) => handleTouchStart(event, e)}
                          onTouchMove={handleTouchMove}
                          onTouchEnd={handleTouchEnd}
                          className="w-full text-left flex items-center gap-4 p-3 rounded-lg event-tile cursor-pointer transition-all duration-200"
                          style={{
                            backgroundColor: dragState.eventId === event.id && dragState.isDragging 
                              ? 'rgba(var(--bg-card-rgb), 0.6)' // Semi-transparent when dragging
                              : 'rgba(var(--bg-card-rgb), 0.85)',
                            marginLeft: `${eventIndex * 8}px`,
                            pointerEvents: isDragging ? 'none' : 'auto',
                            maxWidth: `calc(100% - ${eventIndex * 8}px)`,
                            opacity: dragState.isDragging && dragState.eventId !== event.id ? 0.5 : 1, // Dim other events
                            transform: dragState.eventId === event.id && dragState.isDragging 
                              ? 'scale(1.05)' // Slight scale increase
                              : 'scale(1)',
                            boxShadow: dragState.eventId === event.id && dragState.isDragging
                              ? '0 8px 25px rgba(74, 144, 226, 0.3), 0 3px 10px rgba(0, 0, 0, 0.2)' // Elevated glow
                              : '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
                            zIndex: dragState.eventId === event.id && dragState.isDragging ? 10 : 3,
                            position: dragState.eventId === event.id && dragState.isDragging ? 'fixed' : 'relative',
                            left: dragState.eventId === event.id && dragState.isDragging ? '20px' : 'auto',
                            right: dragState.eventId === event.id && dragState.isDragging ? '20px' : 'auto',
                            top: dragState.eventId === event.id && dragState.isDragging ? `${dragState.snapY}px` : 'auto',
                            transition: dragState.eventId === event.id && dragState.isDragging 
                              ? 'box-shadow 150ms ease-out, transform 150ms ease-out'
                              : 'all 200ms ease-out'
                          }}
                          onMouseEnter={(e) => {
                            if (!isDragging && !dragState.isDragging) {
                              e.currentTarget.style.backgroundColor = 'rgba(var(--bg-main-rgb), 0.95)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!dragState.isDragging) {
                              e.currentTarget.style.backgroundColor = 'rgba(var(--bg-card-rgb), 0.85)';
                            }
                          }}
                          whileTap={{ scale: isDragging || dragState.isDragging ? 1 : 0.98 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: 0.1 + eventIndex * 0.05,
                            duration: ANIMATION_DURATIONS.eventTile / 1000,
                            ease: easeOut,
                            type: "spring", 
                            stiffness: 400, 
                            damping: 25
                          }}
                        >
                          {/* Icon */}
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: getIconColor(event.type) }}
                          >
                            {getIcon(event.type)}
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h3 
                              style={{ 
                                color: 'var(--text-primary)',
                                fontWeight: 'var(--font-weight-normal)'
                              }}
                            >
                              {event.title}
                            </h3>
                          </div>
                          
                          {/* Time */}
                          <span 
                            className="text-sm font-mono flex-shrink-0"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            {dragState.eventId === event.id && dragState.isDragging 
                              ? dragState.targetTime 
                              : event.time}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Now Line */}
          {showNowLine && (
            <motion.div
              className="absolute left-0 right-0 h-px translate-y-[-50%] pointer-events-none px-6"
              style={{ 
                top: `${currentTimePosition * 24 * 50}px`, // 24 hours * 50px per hour
                zIndex: 4 // Above events and grid
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: ANIMATION_DURATIONS.nowLine / 1000, ease: "easeOut" }}
            >
              <div className="flex flex-row items-center justify-center relative w-full h-px">
                <div className="flex flex-row gap-0.5 h-px items-center justify-center pl-1.5 pr-0 py-0 relative w-full">
                  {/* Time */}
                  <div 
                    className="flex flex-row items-center justify-center text-[10px] tracking-[0.12px] text-nowrap text-right pr-2"
                    style={{ 
                      color: '#ff382b',
                      fontWeight: 590
                    }}
                  >
                    <span>
                      {new Date().toLocaleTimeString('en-US', { 
                        hour: 'numeric', 
                        minute: '2-digit',
                        hour12: true 
                      }).replace(' ', ' ')}
                    </span>
                  </div>
                  {/* Separators and Dot */}
                  <div className="flex-1 h-px flex items-center justify-center min-h-px min-w-px">
                    <div className="bg-[#ff382b] h-px w-[5px]" />
                    <div className="bg-[#ff382b] rounded-full w-[7px] h-[7px] relative">
                      <div className="absolute border-white border-[0.5px] border-solid inset-[-0.5px] pointer-events-none rounded-full" />
                    </div>
                    <div className="flex-1 bg-[#ff382b] h-px min-h-px min-w-px" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Time Snap Indicators - Show during drag */}
          {dragState.isDragging && (
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
              {Array.from({ length: 24 * 4 }, (_, i) => {
                const hour = Math.floor(i / 4);
                const minutes = (i % 4) * 15;
                const y = (hour + minutes / 60) * hourHeight;
                const isSnapTarget = Math.abs(y - dragState.snapY) < 5;
                
                return (
                  <div
                    key={i}
                    className="absolute left-0 right-0 flex items-center px-6"
                    style={{ top: `${y}px`, transform: 'translateY(-50%)' }}
                  >
                    <div className="w-[52px] flex-shrink-0" />
                    <div className="flex-1 pl-[5px]">
                      {isSnapTarget && (
                        <motion.div
                          className="flex items-center"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div 
                            className="h-px bg-blue-400 flex-1"
                            style={{ 
                              boxShadow: '0 0 4px rgba(74, 144, 226, 0.6)',
                              opacity: 0.8
                            }}
                          />
                          <div 
                            className="ml-2 px-2 py-1 rounded text-xs font-medium bg-blue-500 text-white shadow-lg"
                            style={{ fontSize: '10px' }}
                          >
                            {formatTimeFromSnap(hour, minutes)}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {events.length === 0 && (
            <motion.div
              className="absolute flex items-center justify-center px-6 w-full"
              style={{ 
                top: '450px', // Around 9 AM with 50px rows
                zIndex: 2 // Above grid lines
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <div className="w-[52px] flex-shrink-0" /> {/* Time column spacer */}
              <div className="flex-1 pl-[5px]">
                <div 
                  className="text-center py-8 px-4 rounded-lg"
                  style={{ 
                    backgroundColor: 'rgba(var(--bg-card-rgb), 0.85)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)'
                  }}
                >
                  <p 
                    className="text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    No events yet
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export function DailyView({ selectedDate, onDateSelect, onEventClick, onBack }: DailyViewProps) {
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [eventsData, setEventsData] = useState(SAMPLE_EVENTS);
  
  // Add item modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddWorkoutModalOpen, setIsAddWorkoutModalOpen] = useState(false);
  const [isAddMealModalOpen, setIsAddMealModalOpen] = useState(false);
  const [isManualWorkoutOpen, setIsManualWorkoutOpen] = useState(false);
  const [isManualMealOpen, setIsManualMealOpen] = useState(false);

  // Calculate the current week's selected date
  const weekStartDate = new Date(selectedDate);
  weekStartDate.setDate(weekStartDate.getDate() + (currentWeekOffset * 7));

  // Handle event time updates from drag and drop
  const handleEventTimeUpdate = useCallback((eventId: string, newTime: string) => {
    setEventsData(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId 
          ? { ...event, time: newTime }
          : event
      )
    );
  }, []);

  // Add item handlers
  const handleAIAddWorkout = (instructions: string) => {
    console.log('AI Add Workout instructions:', instructions);
    // Future: Send to AI service to create workout
    setIsAddWorkoutModalOpen(false);
    setIsAddModalOpen(false);
  };

  const handleAIAddMeal = (instructions: string) => {
    console.log('AI Add Meal instructions:', instructions);
    // Future: Send to AI service to create meal
    setIsAddMealModalOpen(false);
    setIsAddModalOpen(false);
  };

  const handleManualWorkoutSave = (workoutData: any) => {
    console.log('Manual workout save:', workoutData);
    // Future: Save workout data
    setIsManualWorkoutOpen(false);
    setIsAddWorkoutModalOpen(false);
    setIsAddModalOpen(false);
  };

  const handleManualMealSave = (meal: any, ingredients: any) => {
    console.log('Manual meal save:', meal, ingredients);
    // Future: Save meal data
    setIsManualMealOpen(false);
    setIsAddMealModalOpen(false);
    setIsAddModalOpen(false);
  };

  const handleDateSelect = useCallback((date: Date) => {
    const slideDir = calculateSlideDirection(selectedDate, date);
    setSlideDirection(slideDir);
    onDateSelect(date);
    
    // Clear slide direction after animation
    setTimeout(() => setSlideDirection(null), ANIMATION_DURATIONS.dayChange);
  }, [selectedDate, onDateSelect]);

  const handleWeekSwipe = useCallback((direction: 'left' | 'right') => {
    const newOffset = direction === 'left' ? currentWeekOffset + 1 : currentWeekOffset - 1;
    setCurrentWeekOffset(newOffset);
    
    // Auto-select the first day of the new week
    const newWeekStart = new Date(selectedDate);
    newWeekStart.setDate(newWeekStart.getDate() + (newOffset * 7) - selectedDate.getDay());
    onDateSelect(newWeekStart);
  }, [currentWeekOffset, selectedDate, onDateSelect]);

  // Handle day-to-day swipe navigation
  const handleDaySwipe = useCallback((direction: 'left' | 'right') => {
    const newDate = new Date(selectedDate);
    if (direction === 'left') {
      // Swipe left = next day
      newDate.setDate(newDate.getDate() + 1);
    } else {
      // Swipe right = previous day
      newDate.setDate(newDate.getDate() - 1);
    }
    
    setSlideDirection(direction === 'left' ? 'left' : 'right');
    onDateSelect(newDate);
    
    // Clear slide direction after animation
    setTimeout(() => setSlideDirection(null), ANIMATION_DURATIONS.dayChange);
  }, [selectedDate, onDateSelect]);

  const handleMainContentDrag = useCallback((event: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 15) {
      setIsDragging(true);
    }
  }, []);

  const handleMainContentDragEnd = useCallback((event: any, info: PanInfo) => {
    const swipeDirection = getSwipeDirection(info.offset.x);
    const velocity = Math.abs(info.velocity.x);
    
    // Trigger swipe based on distance (60px) or velocity (300px/s)
    if (swipeDirection && (Math.abs(info.offset.x) > 60 || velocity > 300)) {
      handleDaySwipe(swipeDirection === 'right' ? 'right' : 'left');
    }
    
    setIsDragging(false);
  }, [handleDaySwipe]);

  // Filter events for selected date
  const dayEvents = eventsData.filter(event => {
    // For now, show events for all days. In real app, filter by selectedDate
    return true;
  });

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handleDaySwipe('right'); // Previous day
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleDaySwipe('left'); // Next day
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDaySwipe]);

  return (
    <div className="flex flex-col h-screen w-full" style={{ backgroundColor: 'var(--bg-main)' }}>
      {/* Header - Centered */}
      <div className="flex items-center justify-between pt-12 pb-4 max-w-md mx-auto w-full px-6">
        <motion.button
          onClick={onBack}
          className="p-2 -ml-2 rounded-full"
          style={{ color: 'var(--icon-primary)' }}
          whileHover={{ backgroundColor: 'var(--btn-secondary-bg)' }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
        </motion.button>
        
        <h1 
          className="text-lg"
          style={{ 
            color: 'var(--text-primary)',
            fontWeight: 600
          }}
        >
          Calendar
        </h1>
        
        {/* Fixed Add Button - Top Right Corner */}
        <motion.button
          onClick={() => setIsAddModalOpen(true)}
          className="p-2 rounded-full transition-colors"
          style={{ 
            color: 'var(--icon-primary)',
            backgroundColor: 'transparent'
          }}
          whileHover={{ 
            backgroundColor: 'var(--btn-secondary-bg)',
            scale: 1.05 
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={20} />
        </motion.button>
      </div>

      {/* Day Strip - Centered */}
      <DayStrip 
        selectedDate={weekStartDate}
        onDateSelect={handleDateSelect}
        onSwipe={handleWeekSwipe}
      />

      {/* Swipe Indicator - Centered */}
      <div className="flex justify-center items-center py-2">
        <div className="flex items-center gap-1 opacity-40">
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--text-secondary)' }} />
          <div className="w-8 h-px" style={{ backgroundColor: 'var(--text-secondary)' }} />
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--text-secondary)' }} />
        </div>
      </div>

      {/* Hour Grid with Slide Animation and Swipe Gestures - Full Width */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDate.toDateString()}
          className="flex-1 flex flex-col w-full"
          initial={{ 
            opacity: 0.9, 
            x: slideDirection === 'left' ? 24 : slideDirection === 'right' ? -24 : 0
          }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ 
            opacity: 0.9, 
            x: slideDirection === 'left' ? -24 : slideDirection === 'right' ? 24 : 0
          }}
          transition={{ 
            duration: ANIMATION_DURATIONS.dayChange / 1000, 
            ease: easeOut
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          dragMomentum={false}
          onDrag={handleMainContentDrag}
          onDragEnd={handleMainContentDragEnd}
          style={{ 
            cursor: isDragging ? 'grabbing' : 'grab',
            touchAction: 'pan-y pinch-zoom', // Allow vertical scrolling while enabling horizontal drag
            opacity: isDragging ? 0.9 : 1,
            transition: 'opacity 150ms ease-out'
          }}
        >
          <HourGrid 
            selectedDate={selectedDate}
            events={dayEvents}
            onEventClick={onEventClick}
            isDragging={isDragging}
            onEventTimeUpdate={handleEventTimeUpdate}
          />
        </motion.div>
      </AnimatePresence>

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
        onClose={() => {
          setIsAddWorkoutModalOpen(false);
          setIsAddModalOpen(true); // Return to main add modal
        }}
        onAIAdd={handleAIAddWorkout}
        onManualAdd={() => {
          setIsAddWorkoutModalOpen(false);
          setIsManualWorkoutOpen(true);
        }}
      />

      {/* Add Meal Modal */}
      <AddMealModal
        isOpen={isAddMealModalOpen}
        onClose={() => {
          setIsAddMealModalOpen(false);
          setIsAddModalOpen(true); // Return to main add modal
        }}
        onAIAdd={handleAIAddMeal}
        onManualAdd={() => {
          setIsAddMealModalOpen(false);
          setIsManualMealOpen(true);
        }}
      />

      {/* Manual Workout Planning Modal */}
      <ManualWorkoutPlanningModal
        isOpen={isManualWorkoutOpen}
        onClose={() => {
          setIsManualWorkoutOpen(false);
        }}
        onSave={handleManualWorkoutSave}
      />

      {/* Manual Meal Edit Form */}
      <ManualEditForm
        isOpen={isManualMealOpen}
        onClose={() => {
          setIsManualMealOpen(false);
        }}
        item={{ 
          id: 'new-meal', 
          title: 'New Meal', 
          subtitle: '', 
          time: '12:00', 
          type: 'meal' as const,
          description: ''
        }}
        onSave={handleManualMealSave}
      />
    </div>
  );
}