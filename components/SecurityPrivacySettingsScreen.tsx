import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ChevronRight, Fingerprint, Shield, Timer, BarChart3, Bug, Target, Download, Trash, Trash2 } from 'lucide-react';

interface SecurityPrivacySettingsScreenProps {
  onBack: () => void;
  onSettingChange: (setting: string, value: any) => void;
  onDetailNavigation: (setting: string) => void;
  onAction: (action: string) => void;
  securitySettings: {
    biometricLogin: boolean;
    analyticsSharing: boolean;
    crashReports: boolean;
    personalizedAds: boolean;
  };
}

interface SecuritySetting {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  subtitle: string;
  type: 'toggle' | 'navigation' | 'action';
  isDestructive?: boolean;
  currentValue?: boolean;
}

interface SecuritySection {
  title: string;
  items: SecuritySetting[];
}

export function SecurityPrivacySettingsScreen({ 
  onBack, 
  onSettingChange, 
  onDetailNavigation,
  onAction,
  securitySettings 
}: SecurityPrivacySettingsScreenProps) {
  const sections: SecuritySection[] = [
    {
      title: "AUTHENTICATION",
      items: [
        {
          id: "biometricLogin",
          icon: Fingerprint,
          title: "Face ID & Touch ID",
          subtitle: "Use biometrics to unlock the app",
          type: "toggle",
          currentValue: securitySettings.biometricLogin
        },
        {
          id: "twoFactorAuth", 
          icon: Shield,
          title: "Two-Factor Authentication",
          subtitle: "Extra security for your account",
          type: "navigation"
        },
        {
          id: "autoLock",
          icon: Timer,
          title: "Auto-Lock",
          subtitle: "Immediately",
          type: "navigation"
        }
      ]
    },
    {
      title: "PRIVACY",
      items: [
        {
          id: "analyticsSharing",
          icon: BarChart3,
          title: "Share Analytics",
          subtitle: "Help improve the app with usage data",
          type: "toggle",
          currentValue: securitySettings.analyticsSharing
        },
        {
          id: "crashReports",
          icon: Bug,
          title: "Crash Reports",
          subtitle: "Automatically send crash data",
          type: "toggle",
          currentValue: securitySettings.crashReports
        },
        {
          id: "personalizedAds",
          icon: Target,
          title: "Personalized Ads",
          subtitle: "Use your data for relevant advertising",
          type: "toggle",
          currentValue: securitySettings.personalizedAds
        }
      ]
    },
    {
      title: "DATA MANAGEMENT",
      items: [
        {
          id: "dataDownload",
          icon: Download,
          title: "Download My Data",
          subtitle: "Export all your personal information",
          type: "action"
        },
        {
          id: "clearCache",
          icon: Trash,
          title: "Clear App Cache",
          subtitle: "Free up storage space",
          type: "action"
        },
        {
          id: "deleteAllData",
          icon: Trash2,
          title: "Delete All Data",
          subtitle: "Permanently remove all app data",
          type: "action",
          isDestructive: true
        }
      ]
    }
  ];

  const handleToggleChange = (settingId: string, currentValue: boolean) => {
    const newValue = !currentValue;
    onSettingChange(settingId, newValue);
  };

  const handleItemClick = (item: SecuritySetting) => {
    if (item.type === 'toggle') {
      handleToggleChange(item.id, item.currentValue || false);
    } else if (item.type === 'navigation') {
      onDetailNavigation(item.id);
    } else if (item.type === 'action') {
      onAction(item.id);
    }
  };

  const SecurityItemComponent = ({ item, isFirst, isLast }: { 
    item: SecuritySetting; 
    isFirst: boolean; 
    isLast: boolean; 
  }) => {
    const Icon = item.icon;
    
    return (
      <motion.button
        onClick={() => handleItemClick(item)}
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
        
        {item.type === 'toggle' ? (
          <div className="flex-shrink-0 ml-2">
            <div 
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out ${
                item.currentValue 
                  ? 'bg-green-500' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                  item.currentValue ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </div>
          </div>
        ) : (
          <ChevronRight 
            size={16} 
            className="text-gray-400 dark:text-gray-500 flex-shrink-0 ml-2"
          />
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
            Security & Privacy
          </motion.h1>
        </div>
        
        <motion.p 
          className="text-sm" 
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
        >
          Protect your account and control your data
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
                  <SecurityItemComponent
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