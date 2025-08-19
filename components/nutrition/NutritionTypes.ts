export interface CaloriesData {
  consumed: number;
  target: number;
  remaining: number;
}

export interface MacroData {
  name: string;
  current: number;
  target: number;
  unit: string;
  color: string;
  bgColor: string;
}

export interface MacroWithProgress extends MacroData {
  percentage: number;
}