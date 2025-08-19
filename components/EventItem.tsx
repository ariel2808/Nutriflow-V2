import React from 'react';
import { Event } from '../App';
import { Coffee, Dumbbell, Utensils, Waves, Fuel } from 'lucide-react';
import { motion } from 'motion/react';

interface EventItemProps {
  event: Event;
  onClick: () => void;
  completed?: boolean;
  style?: React.CSSProperties;
}

export function EventItem({ event, onClick, completed = false, style }: EventItemProps) {
  const getIcon = (type: Event['type']) => {
    const iconColor = completed ? 'var(--icon-secondary)' : '#FFFFFF';
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
    if (completed) {
      return '#9E9E9E'; // Grey for completed events
    }
    
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

  return (
    <motion.div 
      className={`relative flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
        completed ? 'opacity-70' : ''
      }`}
      style={{ backgroundColor: 'var(--bg-card)', ...style }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-main)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-card)';
      }}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div 
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: getIconColor(event.type) }}
      >
        {getIcon(event.type)}
      </div>
      
      <div className="flex-1">
        <h3 
          className="mb-1"
          style={{ 
            color: completed ? 'var(--text-secondary)' : 'var(--text-primary)',
            fontWeight: 'var(--font-weight-normal)'
          }}
        >
          {event.title}
        </h3>
        <p 
          className="text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          {event.subtitle}
        </p>
      </div>
      
      <span 
        className="text-sm font-mono"
        style={{ 
          color: completed ? 'var(--text-placeholder)' : 'var(--text-secondary)'
        }}
      >
        {event.time}
      </span>
      
      {/* Strike-through line for completed events */}
      {completed && (
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div 
            className="w-full h-0.5 opacity-60"
            style={{ backgroundColor: 'var(--text-secondary)' }}
          ></div>
        </div>
      )}
    </motion.div>
  );
}