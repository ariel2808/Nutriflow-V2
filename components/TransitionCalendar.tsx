import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { ArrowLeft, Coffee, Dumbbell, Utensils, Waves, Fuel, Plus } from 'lucide-react';
import { Event } from '../App';
import { AddItemModal } from './AddItemModal';
import { AddWorkoutModal } from './AddWorkoutModal';
import { AddMealModal } from './AddMealModal';
import { ManualWorkoutPlanningModal } from './ManualWorkoutPlanningModal';
import { ManualEditForm } from './ManualEditForm';

export type TransitionState = 'idle' | 'calendar-to-daily' | 'daily-to-calendar';
import { CalendarScreen } from './CalendarScreen';
import { DailyView } from './DailyView';
import { getWeekDays, formatDate, SAMPLE_EVENTS, getCurrentTimePosition, getHourFromTime, generateHours, getSwipeDirection, calculateSlideDirection, easeOut, ANIMATION_DURATIONS, isToday } from './dailyView/DailyViewUtils';

interface TransitionCalendarProps {
  currentScreen: 'calendar' | 'dailyView';
  transitionState: TransitionState;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onEventClick: (event: Event) => void;
  onExpandClick: () => void;
  onDailyViewOpen: (date: Date) => void;
  onBack: () => void;
  onOpenWorkoutPlanningModal?: () => void;
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

// DailyViewContent - Similar to DailyView but without header and week strip
interface DailyViewContentProps {
  selectedDate: Date;
  onEventClick: (event: Event) => void;
  onBack: () => void;
  onModalStateChange?: (isOpen: boolean) => void;
  onDateSelect: (date: Date) => void;
  isTransitioning: boolean;
  transitionState: TransitionState;
}

function DailyViewContent({ selectedDate, onEventClick, onBack, onModalStateChange, onDateSelect, isTransitioning, transitionState }: DailyViewContentProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const hours = generateHours();
  const currentTimePosition = getCurrentTimePosition();
  const showNowLine = isToday(selectedDate);
  
  // Add item modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddWorkoutModalOpen, setIsAddWorkoutModalOpen] = useState(false);
  const [isAddMealModalOpen, setIsAddMealModalOpen] = useState(false);
  const [isManualWorkoutOpen, setIsManualWorkoutOpen] = useState(false);
  const [isManualMealOpen, setIsManualMealOpen] = useState(false);

  // Events data state for drag and drop
  const [eventsData, setEventsData] = useState(SAMPLE_EVENTS);
  
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

  // Check if any modal is open
  const isAnyModalOpen = isAddModalOpen || isAddWorkoutModalOpen || isAddMealModalOpen || isManualWorkoutOpen || isManualMealOpen;

  // Notify parent component of modal state changes
  useEffect(() => {
    onModalStateChange?.(isAnyModalOpen);
  }, [isAnyModalOpen, onModalStateChange]);

  // Icon and color utilities
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
      if (dragState.eventId && dragState.targetTime && handleEventTimeUpdate) {
        handleEventTimeUpdate(dragState.eventId, dragState.targetTime);
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
  }, [dragState, handleEventTimeUpdate, longPressTimer]);

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

  // Auto-scroll to current time or earliest event on mount
  useEffect(() => {
    if (scrollRef.current) {
      let scrollToHour = 8; // Default to 8 AM
      
      if (isToday(selectedDate)) {
        scrollToHour = Math.max(new Date().getHours() - 2, 0);
      } else if (eventsData.length > 0) {
        const earliestEvent = eventsData.reduce((earliest, event) => {
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
      }, 300); // Delay to account for transition
    }
  }, [selectedDate, eventsData, hourHeight]);

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

  // Get events for specific hour
  const getEventsForHour = useCallback((hour: number) => {
    return eventsData.filter(event => {
      const eventHour = getHourFromTime(event.time);
      return Math.floor(eventHour) === hour;
    });
  }, [eventsData]);

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
    <div className="flex flex-col h-full w-full" style={{ backgroundColor: 'var(--bg-main)' }}>
      {/* Header - Full width with proper spacing */}
      <div 
        className="flex items-center justify-between pt-12 pb-4 w-full px-5 relative flex-shrink-0 transition-all duration-300"
        style={{ 
          backgroundColor: 'var(--bg-main)',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
          zIndex: 100, // Highest z-index to ensure visibility
          filter: isAnyModalOpen ? 'blur(8px)' : 'none',
          pointerEvents: isAnyModalOpen ? 'none' : 'auto'
        }}
      >
        <motion.button
          onClick={() => {
            console.log('Back button clicked in DailyViewContent');
            onBack();
          }}
          className="p-3 -ml-2 rounded-full transition-colors"
          style={{ 
            color: 'var(--icon-primary)',
            backgroundColor: 'transparent',
            zIndex: 100 // Ensure it's on top
          }}
          whileHover={{ 
            backgroundColor: 'var(--btn-secondary-bg)',
            scale: 1.05 
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <ArrowLeft size={22} />
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
          className="p-3 -mr-2 rounded-full transition-colors"
          style={{ 
            color: 'var(--icon-primary)',
            backgroundColor: 'transparent',
            zIndex: 100 // Ensure it's on top
          }}
          whileHover={{ 
            backgroundColor: 'var(--btn-secondary-bg)',
            scale: 1.05 
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Plus size={20} />
        </motion.button>
      </div>

      {/* Integrated Weekly Navigation Strip */}
      <motion.div 
        className="w-full py-4 px-5 flex-shrink-0 transition-all duration-300"
        style={{ 
          backgroundColor: 'var(--bg-main)',
          borderBottom: '1px solid var(--border)',
          filter: isAnyModalOpen ? 'blur(8px)' : 'none',
          pointerEvents: isAnyModalOpen ? 'none' : 'auto'
        }}
        initial={transitionState === 'calendar-to-daily' ? { 
          y: -50, 
          opacity: 0
        } : { 
          y: 0, 
          opacity: 1 
        }}
        animate={{ 
          y: 0, 
          opacity: 1 
        }}
        transition={{ 
          duration: 0.6, 
          ease: [0.32, 0.72, 0, 1],
          delay: transitionState === 'calendar-to-daily' ? 0.4 : 0 
        }}
      >
        <div className="w-full">
          {/* Week Navigation Strip */}
          <div className="flex justify-between items-center mb-4">
            {getWeekDays(selectedDate).map((date, index) => {
              const isSelected = date.toDateString() === selectedDate.toDateString();
              const dayIsToday = date.toDateString() === new Date().toDateString();
              
              return (
                <motion.button
                  key={date.toISOString()}
                  onClick={() => onDateSelect(date)}
                  className="flex flex-col items-center py-2 px-1 min-w-[40px]"
                  whileHover={{ scale: isTransitioning ? 1 : 1.05 }}
                  whileTap={{ scale: isTransitioning ? 1 : 0.95 }}
                  style={{ pointerEvents: isTransitioning ? 'none' : 'auto' }}
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
                    transition={{ duration: 0.2, ease: "easeOut" }}
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
          </div>

          {/* Selected Date Display */}
          <motion.div
            key={selectedDate.toDateString()}
            initial={isTransitioning ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
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
      </motion.div>

      {/* Hour Grid - Full Width */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto scrollbar-visible daily-view-scroll pb-6 transition-all duration-300"
        style={{
          filter: isAnyModalOpen ? 'blur(8px)' : 'none',
          pointerEvents: (isAnyModalOpen || dragState.isDragging) ? 'none' : 'auto',
          userSelect: dragState.isDragging ? 'none' : 'auto'
        }}
      >
        <div className="w-full" style={{ minHeight: `${hours.length * 50}px` }}>
          <div className="relative" style={{ zIndex: 1 }}>
            {hours.map((hourInfo, index) => {
              const hourEvents = getEventsForHour(hourInfo.hour);
              
              return (
                <motion.div
                  key={hourInfo.hour}
                  className="relative flex flex-col h-[50px] w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.01, duration: 0.3 }}
                  style={getDropZoneStyle(hourInfo.hour)}
                >
                  {/* Time and Line Row */}
                  <div className="flex flex-row items-center justify-center relative w-full px-5">
                    <div 
                      className="flex flex-row items-center justify-end pr-[5px] w-[52px] text-[11px] tracking-[0.06px] text-nowrap text-right"
                      style={{ 
                        color: '#8e8e93',
                        fontWeight: 590
                      }}
                    >
                      <span>{hourInfo.label.replace(' ', ' ')}</span>
                    </div>
                    
                    <div 
                      className="flex-1 h-[0.66px] min-h-px min-w-px"
                      style={{ 
                        backgroundColor: '#c7c7cc',
                        marginRight: '6px'
                      }}
                    />
                  </div>
                  
                  {/* Event Area */}
                  {hourEvents.length > 0 && (
                    <div 
                      className="absolute top-0 bottom-0 flex items-center w-full px-5"
                      style={{ 
                        zIndex: 3,
                        left: 0
                      }}
                    >
                      <div className="w-[52px] flex-shrink-0" />
                      <div className="flex-1 space-y-1 h-full flex flex-col justify-center pl-[5px]">
                        {hourEvents.map((event, eventIndex) => (
                          <motion.button
                            key={event.id}
                            onClick={() => !dragState.isDragging && onEventClick(event)}
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
                              if (!dragState.isDragging) {
                                e.currentTarget.style.backgroundColor = 'rgba(var(--bg-main-rgb), 0.95)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!dragState.isDragging) {
                                e.currentTarget.style.backgroundColor = 'rgba(var(--bg-card-rgb), 0.85)';
                              }
                            }}
                            whileTap={{ scale: dragState.isDragging ? 1 : 0.98 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                              delay: 0.4 + eventIndex * 0.05,
                              duration: 0.3,
                              ease: easeOut
                            }}
                          >
                            <div 
                              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: getIconColor(event.type) }}
                            >
                              {getIcon(event.type)}
                            </div>
                            
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
                      className="absolute left-0 right-0 flex items-center px-5"
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

            {/* Now Line */}
            {showNowLine && (
              <motion.div
                className="absolute left-0 right-0 h-px translate-y-[-50%] pointer-events-none px-5"
                style={{ 
                  top: `${currentTimePosition * 24 * 50}px`,
                  zIndex: 4
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="flex flex-row items-center justify-center relative w-full h-px">
                  <div className="flex flex-row gap-0.5 h-px items-center justify-center pl-1.5 pr-0 py-0 relative w-full">
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
          </div>
        </div>
      </div>

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
          setIsAddWorkoutModalOpen(true); // Return to workout modal
        }}
        onSave={handleManualWorkoutSave}
      />

      {/* Manual Meal Form */}
      <ManualEditForm
        isOpen={isManualMealOpen}
        onClose={() => {
          setIsManualMealOpen(false);
          setIsAddMealModalOpen(true); // Return to meal modal
        }}
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
    </div>
  );
}

export function TransitionCalendar({
  currentScreen,
  transitionState,
  selectedDate,
  onDateSelect,
  onEventClick,
  onExpandClick,
  onDailyViewOpen,
  onBack
}: TransitionCalendarProps) {
  
  const isTransitioning = transitionState !== 'idle';
  
  // Modal state from DailyViewContent (we'll need to pass this up or track it here)
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg-main)' }}>
      <AnimatePresence mode="sync">
        {/* Calendar View */}
        {currentScreen === 'calendar' && (
          <motion.div
            key="calendar"
            initial={{ opacity: 1, y: 0 }}
            exit={{ 
              opacity: transitionState === 'calendar-to-daily' ? 0.3 : 0,
              y: transitionState === 'calendar-to-daily' ? -50 : 0,
              scale: transitionState === 'calendar-to-daily' ? 0.95 : 1
            }}
            transition={{ 
              duration: transitionState === 'calendar-to-daily' ? 0.5 : 0.3, 
              ease: [0.32, 0.72, 0, 1]
            }}
            className="absolute inset-0 z-10 transition-all duration-300"
            style={{
              filter: isModalOpen ? 'blur(8px)' : 'none',
              pointerEvents: isModalOpen ? 'none' : 'auto'
            }}
          >
            <CalendarScreen
              selectedDate={selectedDate}
              onDateSelect={onDateSelect}
              onEventClick={onEventClick}
              onExpandClick={onExpandClick}
              onDailyViewOpen={onDailyViewOpen}
            />
          </motion.div>
        )}
        

        
        {/* Daily View - slides up from bottom */}
        {currentScreen === 'dailyView' && (
          <motion.div
            key="dailyView"
            initial={transitionState === 'calendar-to-daily' ? { 
              y: '100%',
              opacity: 0.9
            } : { 
              opacity: 0,
              y: 20
            }}
            animate={{ 
              y: 0,
              opacity: 1 
            }}
            exit={{ 
              y: transitionState === 'daily-to-calendar' ? '100%' : 20,
              opacity: transitionState === 'daily-to-calendar' ? 0.9 : 0
            }}
            transition={{ 
              duration: transitionState === 'calendar-to-daily' ? 0.7 : 0.3, 
              ease: transitionState === 'calendar-to-daily' ? [0.32, 0.72, 0, 1] : "easeInOut",
              delay: transitionState === 'calendar-to-daily' ? 0.3 : 0
            }}
            className="absolute inset-0 z-10"
            style={{
              backgroundColor: 'var(--bg-main)',
              // Add subtle shadow during slide up
              boxShadow: transitionState === 'calendar-to-daily' 
                ? '0 -8px 32px rgba(0, 0, 0, 0.12)' 
                : 'none',
              borderTopLeftRadius: transitionState === 'calendar-to-daily' ? '16px' : '0px',
              borderTopRightRadius: transitionState === 'calendar-to-daily' ? '16px' : '0px'
            }}
          >
            <DailyViewContent
              selectedDate={selectedDate}
              onEventClick={onEventClick}
              onBack={onBack}
              onModalStateChange={setIsModalOpen}
              onDateSelect={onDateSelect}
              isTransitioning={isTransitioning}
              transitionState={transitionState}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}