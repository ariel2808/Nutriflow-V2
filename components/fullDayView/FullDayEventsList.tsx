import React from 'react';
import { motion } from 'motion/react';
import { Event } from '../../App';
import { EventItem } from '../EventItem';

interface FullDayEventsListProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

export function FullDayEventsList({ events, onEventClick }: FullDayEventsListProps) {
  return (
    <motion.div 
      className="space-y-3 pb-8"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.2 + index * 0.05,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <EventItem 
            event={event}
            onClick={() => onEventClick(event)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}