export interface AddSupplementFlowData {
  name: string;
  form: string;
  dosageValue: string;
  dosageUnit: string;
  frequency: 'daily' | 'weekly' | 'custom';
  timesPerDay: string[];
  startDate: string;
  endDate?: string;
  customSchedule?: {
    daysOfWeek: number[];
    timesPerWeek: number;
  };
}

export type FlowStep = 'name' | 'form' | 'dosage' | 'schedule' | 'review';

export interface FlowStepProps {
  data: AddSupplementFlowData;
  onUpdate: (updates: Partial<AddSupplementFlowData>) => void;
  onNext: () => void;
  onBack: () => void;
  isValid: boolean;
}

export const DOSAGE_UNITS = [
  'mg',
  'g',
  'mcg',
  'ml',
  'IU',
  '%',
  'tablets',
  'capsules',
  'scoops',
  'drops'
] as const;

export const DEFAULT_TIMES = [
  '08:00',
  '12:00',
  '18:00'
];