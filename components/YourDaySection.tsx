import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Event } from '../App';
import { EventItem } from './EventItem';
import { Expand, Clock, Plus } from 'lucide-react';
import { parseTimeToMinutes } from './FuelingUtils';

interface YourDaySectionProps {
  events: Event[];
  onEventClick: (event: Event) => void;
  onExpandClick: () => void;
  onDailyViewOpen?: (date: Date) => void;
  onAITextboxFocus?: (focused: boolean) => void;
  isAITextboxFocused?: boolean;
}

export function YourDaySection({ events, onEventClick, onExpandClick, onDailyViewOpen, onAITextboxFocus, isAITextboxFocused = false }: YourDaySectionProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isExpanding, setIsExpanding] = useState(false);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // For demo purposes, use a fixed time that ensures we have scrollable content
  // This simulates it being 10:30 AM, which should show good before/after content
  const demoTimeInMinutes = 10 * 60 + 30; // 10:30 AM
  const currentTimeInMinutes = demoTimeInMinutes;
  
  // Sort events by time
  const sortedEvents = [...events].sort((a, b) => 
    parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time)
  );

  // Find the event selection logic
  const getEventsToDisplay = () => {
    // Find events before and after current time
    const pastEvents = sortedEvents.filter(event => 
      parseTimeToMinutes(event.time) < currentTimeInMinutes
    );
    const upcomingEvents = sortedEvents.filter(event => 
      parseTimeToMinutes(event.time) >= currentTimeInMinutes
    );

    const result = {
      previousEvent: null as Event | null,
      upcomingEvents: upcomingEvents,
      showNowIndicator: true,
      isEmpty: sortedEvents.length === 0
    };

    // Get the last past event (only one)
    if (pastEvents.length > 0) {
      result.previousEvent = pastEvents[pastEvents.length - 1];
    }

    // If no upcoming events but we have past events
    if (upcomingEvents.length === 0 && pastEvents.length > 0) {
      result.upcomingEvents = [];
      result.showNowIndicator = true;
    }

    // If no past events, start from first upcoming
    if (pastEvents.length === 0 && upcomingEvents.length > 0) {
      result.previousEvent = null;
      result.showNowIndicator = true;
    }

    return result;
  };

  const eventsDisplay = getEventsToDisplay();

  const handleExpandClick = async () => {
    setIsExpanding(true);
    setTimeout(() => {
      // Open daily view for today's date if available, otherwise fallback to old expand
      if (onDailyViewOpen) {
        onDailyViewOpen(new Date());
      } else {
        onExpandClick();
      }
      setIsExpanding(false);
    }, 300);
  };

  const renderNowIndicator = () => (
    <div key="current-time" className="flex items-center py-2 my-3">
      <div className="flex items-center flex-1">
        <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
        <div className="flex-1 h-0.5 bg-red-500 mx-3"></div>
        <div className="flex items-center gap-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full flex-shrink-0">
          <Clock size={12} />
          <span className="font-mono">
            10:30
          </span>
        </div>
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div 
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{ backgroundColor: 'var(--bg-card)' }}
      >
        <Clock size={24} style={{ color: 'var(--icon-secondary)' }} />
      </div>
      <p 
        className="text-center mb-4"
        style={{ color: 'var(--text-secondary)' }}
      >
        No events today
      </p>
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-xl transition-colors"
        style={{ 
          backgroundColor: 'var(--btn-primary-bg)',
          color: 'var(--btn-primary-text)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)';
          e.currentTarget.style.opacity = '0.9';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
      >
        <Plus size={16} />
        <span>Add Event</span>
      </button>
    </div>
  );

  const renderAllDoneState = () => (
    <div className="text-center py-8 px-4">
      <p 
        className="text-sm"
        style={{ color: 'var(--text-placeholder)' }}
      >
        All done for today
      </p>
    </div>
  );

  if (eventsDisplay.isEmpty) {
    return (
      <motion.div 
        className="transition-all duration-300"
        style={{
          filter: isAITextboxFocused ? 'blur(8px)' : 'none',
          transform: isAITextboxFocused ? 'scale(1.02)' : 'scale(1)',
        }}
      >
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg" style={{ color: 'var(--text-primary)' }}>Your Day</h2>
          <motion.button 
            onClick={handleExpandClick} 
            className="p-2"
            whileTap={{ scale: 0.9 }}
            animate={isExpanding ? { rotate: 45 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Expand size={20} style={{ color: 'var(--icon-secondary)' }} />
          </motion.button>
        </div>

        {/* Scrollable content area */}
        <div 
          className="overflow-y-auto scrollbar-hidden"
          style={{ 
            height: '50vh',
            scrollSnapType: 'y mandatory'
          }}
        >
          {renderEmptyState()}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="transition-all duration-300 relative"
      style={{
        filter: isAITextboxFocused ? 'blur(8px)' : 'none',
        transform: isAITextboxFocused ? 'scale(1.02)' : 'scale(1)',
      }}
      animate={isExpanding ? {
        scale: 1.05,
        opacity: 0.9,
        y: -10
      } : {
        scale: 1,
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {/* Section Header - Outside scrollable area */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg" style={{ color: 'var(--text-primary)' }}>Your Day</h2>
        <motion.button 
          onClick={handleExpandClick} 
          className="p-2"
          whileTap={{ scale: 0.9 }}
          animate={isExpanding ? { rotate: 45 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Expand size={20} style={{ color: 'var(--icon-secondary)' }} />
        </motion.button>
      </div>

      {/* Scrollable content area - no background, seamless integration */}
      <div 
        className="overflow-y-auto scrollbar-hidden relative"
        style={{ 
          height: '50vh',
          scrollSnapType: 'y mandatory'
        }}
      >
        {/* Events content with space for natural integration */}
        <div className="space-y-3">
          {/* Previous Event (dimmed) */}
          {eventsDisplay.previousEvent && (
            <motion.div
              style={{ scrollSnapAlign: 'start' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <EventItem 
                event={eventsDisplay.previousEvent}
                onClick={() => onEventClick(eventsDisplay.previousEvent!)}
                completed={true}
              />
            </motion.div>
          )}

          {/* Now Indicator */}
          {eventsDisplay.showNowIndicator && renderNowIndicator()}

          {/* Upcoming Events */}
          {eventsDisplay.upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              style={{ scrollSnapAlign: 'start' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <EventItem 
                event={event}
                onClick={() => onEventClick(event)}
                completed={false}
              />
            </motion.div>
          ))}

          {/* All done state if no upcoming events but have past events */}
          {eventsDisplay.upcomingEvents.length === 0 && eventsDisplay.previousEvent && renderAllDoneState()}
          
          {/* Extra spacing at bottom to ensure scrolling works well */}
          <div className="h-20"></div>
        </div>
      </div>

      {/* Subtle fade indicator at bottom to suggest more content */}
      {(eventsDisplay.upcomingEvents.length > 2 || (eventsDisplay.previousEvent && eventsDisplay.upcomingEvents.length > 1)) && (
        <div 
          className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none z-10"
          style={{
            background: `linear-gradient(to bottom, transparent 0%, var(--bg-main) 90%)`
          }}
        />
      )}
    </motion.div>
  );
}