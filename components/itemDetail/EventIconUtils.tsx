import React from 'react';
import { Coffee, Dumbbell, Utensils, Waves, Fuel } from 'lucide-react';
import { Event } from '../../App';

export const getIcon = (type: Event['type']) => {
  switch (type) {
    case 'coffee':
      return <Coffee size={48} className="text-white" />;
    case 'workout':
      return <Dumbbell size={48} className="text-white" />;
    case 'meal':
      return <Utensils size={48} className="text-white" />;
    case 'swim':
      return <Waves size={48} className="text-white" />;
    case 'fueling':
      return <Fuel size={48} className="text-white" />;
    default:
      return <Utensils size={48} className="text-white" />;
  }
};

export const getIconColor = (type: Event['type']) => {
  switch (type) {
    case 'coffee':
      return 'bg-amber-700'; // Brown
    case 'workout':
      return 'bg-red-500'; // Red
    case 'meal':
      return 'bg-yellow-500'; // Yellow
    case 'swim':
      return 'bg-blue-500'; // Blue
    case 'fueling':
      return 'bg-orange-500'; // Orange
    default:
      return 'bg-gray-500';
  }
};