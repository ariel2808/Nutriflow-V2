import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ChevronRight, Bell, Coffee, Utensils, Salad, Apple, Dumbbell, RotateCcw, Droplets, BarChart3, Calendar, Trophy, Moon, AlertTriangle } from 'lucide-react';

interface NotificationsSettingsScreenProps {
  onBack: () => void;
  onSettingChange: (setting: string, value: any) => void;
  onTimeNavigation: (setting: string) => void;
  notificationSettings: {
    allowNotifications: boolean;
    breakfastReminder: boolean;
    lunchReminder: boolean;
    dinnerReminder: boolean;
    snackReminders: boolean;
    preWorkoutNutrition: boolean;
    postWorkoutRecovery: boolean;
    hydrationReminders: boolean;
    dailySummary: boolean;
    weeklyProgress: boolean;
    achievementAlerts: boolean;
    doNotDisturb: boolean;
    emergencyOverride: boolean;
  };
}

interface NotificationSetting {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  subtitle: string;
  type: 'toggle' | 'timeNavigation';
  currentValue?: boolean;
  disabled?: boolean;
}

interface NotificationSection {
  title: string;
  items: NotificationSetting[];
}

export function NotificationsSettingsScreen({ 
  onBack, 
  onSettingChange, 
  onTimeNavigation,
  notificationSettings 
}: NotificationsSettingsScreenProps) {
  const sections: NotificationSection[] = [
    {
      title: "GENERAL",
      items: [
        {
          id: "allowNotifications",
          icon: Bell,
          title: "Allow Notifications",
          subtitle: "Enable all app notifications",
          type: "toggle",
          currentValue: notificationSettings.allowNotifications
        }
      ]
    },
    {
      title: "MEAL REMINDERS",
      items: [
        {
          id: "breakfastReminder",
          icon: Coffee,
          title: "Breakfast",
          subtitle: "8:00 AM",
          type: "toggle",
          currentValue: notificationSettings.breakfastReminder,
          disabled: !notificationSettings.allowNotifications
        },
        {
          id: "lunchReminder",
          icon: Utensils,
          title: "Lunch",
          subtitle: "1:00 PM",
          type: "toggle",
          currentValue: notificationSettings.lunchReminder,
          disabled: !notificationSettings.allowNotifications
        },
        {
          id: "dinnerReminder",
          icon: Salad,
          title: "Dinner",
          subtitle: "7:00 PM",
          type: "toggle",
          currentValue: notificationSettings.dinnerReminder,
          disabled: !notificationSettings.allowNotifications
        },
        {
          id: "snackReminders",
          icon: Apple,
          title: "Snack Reminders",
          subtitle: "2 times per day",
          type: "toggle",
          currentValue: notificationSettings.snackReminders,
          disabled: !notificationSettings.allowNotifications
        }
      ]
    },
    {
      title: "WORKOUT ALERTS",
      items: [
        {
          id: "preWorkoutNutrition",
          icon: Dumbbell,
          title: "Pre-Workout Fuel",
          subtitle: "30 minutes before workout",
          type: "toggle",
          currentValue: notificationSettings.preWorkoutNutrition,
          disabled: !notificationSettings.allowNotifications
        },
        {
          id: "postWorkoutRecovery",
          icon: RotateCcw,
          title: "Post-Workout Recovery",
          subtitle: "15 minutes after workout",
          type: "toggle",
          currentValue: notificationSettings.postWorkoutRecovery,
          disabled: !notificationSettings.allowNotifications
        },
        {
          id: "hydrationReminders",
          icon: Droplets,
          title: "Hydration",
          subtitle: "Every 2 hours during workouts",
          type: "toggle",
          currentValue: notificationSettings.hydrationReminders,
          disabled: !notificationSettings.allowNotifications
        }
      ]
    },
    {
      title: "PROGRESS & INSIGHTS",
      items: [
        {
          id: "dailySummary",
          icon: BarChart3,
          title: "Daily Summary",
          subtitle: "9:00 PM daily recap",
          type: "toggle",
          currentValue: notificationSettings.dailySummary,
          disabled: !notificationSettings.allowNotifications
        },
        {
          id: "weeklyProgress",
          icon: Calendar,
          title: "Weekly Progress",
          subtitle: "Sunday at 8:00 PM",
          type: "toggle",
          currentValue: notificationSettings.weeklyProgress,
          disabled: !notificationSettings.allowNotifications
        },
        {
          id: "achievementAlerts",
          icon: Trophy,
          title: "Achievements",
          subtitle: "Goal milestones and streaks",
          type: "toggle",
          currentValue: notificationSettings.achievementAlerts,
          disabled: !notificationSettings.allowNotifications
        }
      ]
    },
    {
      title: "QUIET HOURS",
      items: [
        {
          id: "doNotDisturb",
          icon: Moon,
          title: "Do Not Disturb",
          subtitle: "10:00 PM - 7:00 AM",
          type: "timeNavigation",
          currentValue: notificationSettings.doNotDisturb,
          disabled: !notificationSettings.allowNotifications
        },
        {
          id: "emergencyOverride",
          icon: AlertTriangle,
          title: "Emergency Alerts",
          subtitle: "Critical health alerts only",
          type: "toggle",
          currentValue: notificationSettings.emergencyOverride,
          disabled: !notificationSettings.allowNotifications
        }
      ]
    }
  ];

  const handleToggleChange = (settingId: string, currentValue: boolean) => {
    const newValue = !currentValue;
    onSettingChange(settingId, newValue);
  };

  const handleItemClick = (item: NotificationSetting) => {
    if (item.disabled) return;
    
    if (item.type === 'toggle') {
      handleToggleChange(item.id, item.currentValue || false);
    } else if (item.type === 'timeNavigation') {
      // For time navigation items, first toggle the setting, then navigate
      if (item.currentValue) {
        // If it's ON, navigate to time settings
        onTimeNavigation(item.id);
      } else {
        // If it's OFF, turn it ON first
        onSettingChange(item.id, true);
      }
    }
  };

  const NotificationItemComponent = ({ item, isFirst, isLast }: { 
    item: NotificationSetting; 
    isFirst: boolean; 
    isLast: boolean; 
  }) => {
    const Icon = item.icon;
    const isDisabled = item.disabled;
    
    return (
      <motion.button
        onClick={() => handleItemClick(item)}
        disabled={isDisabled}
        className={`w-full bg-white dark:bg-gray-800 flex items-center justify-between p-4 transition-colors ${
          isFirst ? 'rounded-t-xl' : ''
        } ${isLast ? 'rounded-b-xl' : ''} ${
          !isLast ? 'border-b border-gray-200 dark:border-gray-700' : ''
        } ${
          isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
        }`}
        style={{ 
          minHeight: '56px'
        }}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="flex items-center gap-3 flex-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isDisabled ? 'bg-gray-200 dark:bg-gray-600' : 'bg-gray-100 dark:bg-gray-700'
          }`}>
            <Icon 
              size={16} 
              className={isDisabled ? "text-gray-400 dark:text-gray-500" : "text-gray-600 dark:text-gray-400"}
            />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <div className={`text-sm font-medium mb-0.5 ${
              isDisabled 
                ? 'text-gray-400 dark:text-gray-500' 
                : 'text-black dark:text-white'
            }`}>
              {item.title}
            </div>
            <div className={`text-xs ${
              isDisabled
                ? 'text-gray-400 dark:text-gray-500'
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              {item.subtitle}
            </div>
          </div>
        </div>
        
        {item.type === 'toggle' ? (
          <div className="flex-shrink-0 ml-2">
            <div 
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out ${
                item.currentValue && !isDisabled
                  ? 'bg-green-500' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                  item.currentValue && !isDisabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            {/* Toggle for time navigation items */}
            <div 
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out ${
                item.currentValue && !isDisabled
                  ? 'bg-green-500' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                  item.currentValue && !isDisabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </div>
            <ChevronRight 
              size={16} 
              className={`${
                isDisabled || !item.currentValue 
                  ? 'text-gray-300 dark:text-gray-600' 
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            />
          </div>
        )}
      </motion.button>
    );
  };

  return (
    <div 
      className="w-full min-h-screen"
      style={{ 
        backgroundColor: 'var(--bg-main)',
        maxWidth: '375px',
        margin: '0 auto'
      }}
    >
      {/* Status Bar - Same as other screens */}
      <div 
        className="flex justify-between items-center px-6 pt-12 pb-8 text-sm"
        style={{ color: 'var(--text-secondary)' }}
      >
        <span>9:41</span>
        <div className="flex items-center gap-2">
          <span style={{ fontWeight: 500 }}>28°C</span>
          <div className="w-5 h-5 rounded-full bg-red-400 flex items-center justify-center">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Header with back button - Same structure as other screens */}
      <div className="px-6 mb-8">
        <div className="flex items-center mb-1">
          <motion.button
            onClick={onBack}
            className="p-2 -ml-2 mr-3 rounded-full"
            style={{ color: 'var(--text-primary)' }}
            whileHover={{ 
              backgroundColor: 'var(--bg-card)',
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ArrowLeft size={24} />
          </motion.button>
          
          <motion.h1
            className="mb-1"
            style={{ color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
          >
            Notifications
          </motion.h1>
        </div>
        
        <motion.p 
          className="text-sm" 
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
        >
          Stay on track with timely reminders
        </motion.p>
      </div>

      {/* Content with proper spacing - Multiple sections */}
      <div className="px-6 pb-8">
        <div className="space-y-6">
          {sections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + (sectionIndex * 0.1), ease: "easeOut" }}
            >
              {/* Section Header - Same style as existing screens */}
              <div className="mb-3">
                <h2 
                  className="text-lg mb-1"
                  style={{ 
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                    fontSize: '18px'
                  }}
                >
                  {section.title}
                </h2>
              </div>

              {/* Section Items - Same card style as other settings screens */}
              <div 
                className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                style={{ 
                  backgroundColor: 'var(--bg-card)'
                }}
              >
                {section.items.map((item, itemIndex) => (
                  <NotificationItemComponent
                    key={item.id}
                    item={item}
                    isFirst={itemIndex === 0}
                    isLast={itemIndex === section.items.length - 1}
                  />
                ))}
              </div>
            </motion.div>
          ))}

          {/* Bottom padding for safe area */}
          <div style={{ height: '32px' }} />
        </div>
      </div>
    </div>
  );
}