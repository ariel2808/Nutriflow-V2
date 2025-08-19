import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ChevronRight, Sun, Lock, Bell, Link } from 'lucide-react';

interface AppPreferencesScreenProps {
  onBack: () => void;
  onNavigateToPreference: (preference: string) => void;
}

interface PreferenceItem {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  subtitle: string;
}

export function AppPreferencesScreen({ onBack, onNavigateToPreference }: AppPreferencesScreenProps) {
  const preferences: PreferenceItem[] = [
    {
      id: "appearance",
      icon: Sun,
      title: "Appearance",
      subtitle: "Theme, language, and display options"
    },
    {
      id: "securityPrivacy", 
      icon: Lock,
      title: "Security & Privacy",
      subtitle: "Biometric login, analytics, and data privacy"
    },
    {
      id: "notifications",
      icon: Bell,
      title: "Notifications", 
      subtitle: "Meal reminders, workout alerts, and timing"
    },
    {
      id: "integrations",
      icon: Link,
      title: "Integrations",
      subtitle: "Health apps, fitness trackers, and sync options"
    }
  ];

  const handleItemClick = (itemId: string) => {
    onNavigateToPreference(itemId);
  };

  const PreferenceItemComponent = ({ item, isFirst, isLast }: { 
    item: PreferenceItem; 
    isFirst: boolean; 
    isLast: boolean; 
  }) => {
    const Icon = item.icon;
    
    return (
      <motion.button
        onClick={() => handleItemClick(item.id)}
        className={`w-full bg-white dark:bg-gray-800 flex items-center justify-between p-4 transition-colors ${
          isFirst ? 'rounded-t-xl' : ''
        } ${isLast ? 'rounded-b-xl' : ''} ${
          !isLast ? 'border-b border-gray-200 dark:border-gray-700' : ''
        } hover:bg-gray-50 dark:hover:bg-gray-700`}
        style={{ 
          minHeight: '56px'
        }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="flex items-center gap-3 flex-1">
          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon 
              size={16} 
              className="text-gray-600 dark:text-gray-400"
            />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <div className="text-sm font-medium mb-0.5 text-black dark:text-white">
              {item.title}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {item.subtitle}
            </div>
          </div>
        </div>
        <ChevronRight 
          size={16} 
          className="text-gray-400 dark:text-gray-500 flex-shrink-0 ml-2"
        />
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
            App Preferences
          </motion.h1>
        </div>
        
        <motion.p 
          className="text-sm" 
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
        >
          Customize your app experience
        </motion.p>
      </div>

      {/* Content with proper spacing - Single grouped section */}
      <div className="px-6 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
        >
          {/* Single section card - Same card style as ProfileSettingsScreen */}
          <div 
            className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            style={{ 
              backgroundColor: 'var(--bg-card)'
            }}
          >
            {preferences.map((item, itemIndex) => (
              <PreferenceItemComponent
                key={item.id}
                item={item}
                isFirst={itemIndex === 0}
                isLast={itemIndex === preferences.length - 1}
              />
            ))}
          </div>

          {/* Bottom padding for safe area */}
          <div style={{ height: '32px' }} />
        </motion.div>
      </div>
    </div>
  );
}