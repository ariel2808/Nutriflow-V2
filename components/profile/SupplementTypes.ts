export interface Supplement {
  id: string;
  name: string;
  form: string;
  dosage: string;
  schedule: string;
  startDate: string;
  endDate?: string;
}

export type SupplementForm = 'capsule' | 'tablet' | 'powder' | 'gel' | 'liquid' | 'drops' | 'gummy' | 'bar';