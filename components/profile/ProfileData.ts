import { Target, Weight, Calendar, UtensilsCrossed, Pill, Moon, Settings, Bell, Smartphone, HelpCircle, LogOut } from 'lucide-react';

export interface ProfileInfoItem {
  icon: any;
  iconColor: string;
  iconBg: string;
  label: string;
  value: string;
}

export interface PreferenceItem {
  icon: any;
  iconColor: string;
  iconBg: string;
  label: string;
  textColor?: string;
}

export const profileInfoItems: ProfileInfoItem[] = [
  {
    icon: Target,
    iconColor: 'text-red-600',
    iconBg: 'bg-red-50',
    label: 'Goal',
    value: 'Performance'
  },
  {
    icon: Weight,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
    label: 'Current Weight',
    value: '78 kg'
  },
  {
    icon: Calendar,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-50',
    label: 'Training Days',
    value: 'Sun, Mon, Wed, Fri, Sat'
  },
  {
    icon: UtensilsCrossed,
    iconColor: 'text-yellow-600',
    iconBg: 'bg-yellow-50',
    label: 'Dietary Preference',
    value: 'Kosher'
  },
  {
    icon: Pill,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-50',
    label: 'Supplements Used',
    value: 'Creatine, Omega 3, Magnesium'
  },
  {
    icon: Moon,
    iconColor: 'text-indigo-600',
    iconBg: 'bg-indigo-50',
    label: 'Average Sleep',
    value: '6h 45m'
  }
];

export const preferenceItems: PreferenceItem[] = [
  {
    icon: Settings,
    iconColor: 'text-gray-600',
    iconBg: 'bg-gray-50',
    label: 'Profile Settings'
  },
  {
    icon: Smartphone,
    iconColor: 'text-gray-600',
    iconBg: 'bg-gray-50',
    label: 'App Preferences'
  },
  {
    icon: HelpCircle,
    iconColor: 'text-gray-600',
    iconBg: 'bg-gray-50',
    label: 'Support'
  },
  {
    icon: LogOut,
    iconColor: 'text-red-600',
    iconBg: 'bg-red-50',
    label: 'Log Out',
    textColor: 'text-red-600'
  }
];

export const footerItems: PreferenceItem[] = [
  {
    icon: HelpCircle,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
    label: 'Contact Support'
  },
  {
    icon: LogOut,
    iconColor: 'text-red-600',
    iconBg: 'bg-red-50',
    label: 'Log Out',
    textColor: 'text-red-600'
  }
];