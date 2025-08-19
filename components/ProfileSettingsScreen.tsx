import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ChevronRight, User, Mail, Lock, RotateCcw, Download, Pause, Trash2 } from 'lucide-react';

interface ProfileSettingsScreenProps {
  onBack: () => void;
  onNavigateToSetting: (setting: string) => void;
}

interface SettingItem {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  subtitle: string;
  isDestructive?: boolean;
}

interface SettingSection {
  title: string;
  items: SettingItem[];
}

export function ProfileSettingsScreen({ onBack, onNavigateToSetting }: ProfileSettingsScreenProps) {
  const sections: SettingSection[] = [
    {
      title: "ACCOUNT INFORMATION",
      items: [
        {
          id: "displayName",
          icon: User,
          title: "Display Name",
          subtitle: "Ariel"
        },
        {
          id: "changeEmail", 
          icon: Mail,
          title: "Change Email",
          subtitle: "ariel@example.com"
        },
        {
          id: "changePassword",
          icon: Lock,
          title: "Change Password", 
          subtitle: "Last changed 3 months ago"
        }
      ]
    },
    {
      title: "DATA MANAGEMENT",
      items: [
        {
          id: "resetProfile",
          icon: RotateCcw,
          title: "Reset Profile Data",
          subtitle: "Start fresh while keeping account"
        },
        {
          id: "exportData",
          icon: Download,
          title: "Export My Data",
          subtitle: "Download all your information"
        }
      ]
    },
    {
      title: "ACCOUNT ACTIONS", 
      items: [
        {
          id: "deactivateAccount",
          icon: Pause,
          title: "Deactivate Account",
          subtitle: "Temporarily disable your account"
        },
        {
          id: "deleteAccount",
          icon: Trash2,
          title: "Delete Account",
          subtitle: "Permanently remove your account",
          isDestructive: true
        }
      ]
    }
  ];

  const handleItemClick = (itemId: string) => {
    onNavigateToSetting(itemId);
  };

  const SettingItemComponent = ({ item, isFirst, isLast }: { 
    item: SettingItem; 
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
              className={item.isDestructive ? "text-red-600" : "text-gray-600 dark:text-gray-400"}
            />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <div className={`text-sm font-medium mb-0.5 ${
              item.isDestructive 
                ? 'text-red-600' 
                : 'text-black dark:text-white'
            }`}>
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
      {/* Status Bar - Same as Insights */}
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

      {/* Header with back button - Same structure as Insights */}
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
            Profile Settings
          </motion.h1>
        </div>
        
        <motion.p 
          className="text-sm" 
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
        >
          Manage your account and data
        </motion.p>
      </div>

      {/* Content with proper spacing */}
      <div className="px-6 pb-8">
        <div className="space-y-6">
          {sections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + (sectionIndex * 0.1), ease: "easeOut" }}
            >
              {/* Section Header - Same style as Insights */}
              <div className="mb-3">
                <h2 
                  className="text-lg mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {section.title}
                </h2>
              </div>

              {/* Section Items - Same card style as ActionButton */}
              <div 
                className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                style={{ 
                  backgroundColor: 'var(--bg-card)'
                }}
              >
                {section.items.map((item, itemIndex) => (
                  <SettingItemComponent
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