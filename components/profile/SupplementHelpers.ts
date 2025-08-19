import { Supplement } from './SupplementTypes';
import { SUPPLEMENT_FORMS } from './SupplementConstants';

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const getFormIcon = (form: string): string => {
  const formData = SUPPLEMENT_FORMS.find(f => f.value === form);
  return formData?.icon || '💊';
};

export const formatDosageDisplay = (supplement: Supplement): string => {
  return `${supplement.dosage} • ${supplement.schedule}`;
};

export const formatSupplementsDisplay = (supplements: Supplement[]): string => {
  if (supplements.length === 0) return 'No supplements';
  if (supplements.length <= 3) return supplements.map(s => s.name).join(', ');
  return `${supplements.slice(0, 2).map(s => s.name).join(', ')}, +${supplements.length - 2} more`;
};

// Mock data for demonstration
export const mockSupplements: Supplement[] = [
  {
    id: '1',
    name: 'Vitamin D3',
    form: 'capsule',
    dosage: '2000 IU',
    schedule: 'Daily at 08:00',
    startDate: '2024-01-01'
  },
  {
    id: '2',
    name: 'Whey Protein',
    form: 'powder',
    dosage: '30g',
    schedule: 'After workout',
    startDate: '2024-01-01'
  },
  {
    id: '3',
    name: 'Omega-3',
    form: 'capsule',
    dosage: '1000mg',
    schedule: 'Daily at 08:00, 18:00',
    startDate: '2024-01-01'
  }
];