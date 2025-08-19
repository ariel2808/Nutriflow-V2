import { CaloriesData, MacroData } from './NutritionTypes';

export const SAMPLE_CALORIES: CaloriesData = {
  consumed: 720,
  target: 2000,
  remaining: 1280
};

export const SAMPLE_MACROS: MacroData[] = [
  {
    name: 'Carbs',
    current: 241,
    target: 359,
    unit: 'g',
    color: '#10b981', // emerald-500 - softer green
    bgColor: '#d1fae5' // emerald-100
  },
  {
    name: 'Protein',
    current: 95,
    target: 143,
    unit: 'g',
    color: '#f59e0b', // amber-500 - softer orange
    bgColor: '#fef3c7' // amber-100
  },
  {
    name: 'Fat',
    current: 45,
    target: 89,
    unit: 'g',
    color: '#8b5cf6', // violet-500 - softer purple
    bgColor: '#ede9fe' // violet-100
  }
];