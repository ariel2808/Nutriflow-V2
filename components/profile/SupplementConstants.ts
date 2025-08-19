import { Pill, Circle, Utensils, Droplets, TestTube, Sun, Square } from 'lucide-react';

export const SUPPLEMENT_FORMS = [
  { value: 'capsule', label: 'Capsule', icon: '💊' },
  { value: 'tablet', label: 'Tablet', icon: '⚪' },
  { value: 'powder', label: 'Powder', icon: '🥄' },
  { value: 'gel', label: 'Gel Cap', icon: '🔵' },
  { value: 'liquid', label: 'Liquid', icon: '🧪' },
  { value: 'drops', label: 'Drops', icon: '💧' },
  { value: 'gummy', label: 'Gummy', icon: '🟡' },
  { value: 'bar', label: 'Bar', icon: '🍫' },
] as const;

// Icon mapping for supplement forms
export const supplementIcons = {
  capsule: Pill,
  tablet: Circle,
  powder: Utensils,
  gel: Circle,
  liquid: TestTube,
  drops: Droplets,
  gummy: Sun,
  bar: Square,
} as const;

// Color classes for supplement forms
export const supplementColors = {
  capsule: 'bg-blue-100 text-blue-600',
  tablet: 'bg-gray-100 text-gray-600',
  powder: 'bg-yellow-100 text-yellow-600',
  gel: 'bg-blue-100 text-blue-600',
  liquid: 'bg-green-100 text-green-600',
  drops: 'bg-blue-100 text-blue-600',
  gummy: 'bg-orange-100 text-orange-600',
  bar: 'bg-amber-100 text-amber-600',
} as const;

export type SupplementForm = typeof SUPPLEMENT_FORMS[number]['value'];

export const SUPPLEMENT_CATEGORIES = [
  'Protein',
  'Vitamins',
  'Minerals',
  'Pre-Workout',
  'Post-Workout',
  'Recovery',
  'Endurance',
  'Strength',
  'General Health',
  'Other'
] as const;

export const SUPPLEMENT_TIMING = [
  'Morning',
  'Pre-Workout',
  'Post-Workout',
  'With Meals',
  'Before Bed',
  'As Needed'
] as const;