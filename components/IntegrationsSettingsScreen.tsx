import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ChevronRight, Heart, Activity, Shield, Watch, Zap, Target, Utensils, Calculator, Crosshair, MapPin, BarChart3, Bike, RefreshCw, Smartphone, Clock } from 'lucide-react';

interface IntegrationsSettingsScreenProps {
  onBack: () => void;
  onSettingChange: (setting: string, value: any) => void;
  onSetup: (integration: string) => void;
  onSyncFrequencyNavigation: () => void;
  integrationSettings: {
    appleHealth: boolean;
    googleFit: boolean;
    samsungHealth: boolean;
    garminConnect: boolean;
    fitbit: boolean;
    polarFlow: boolean;
    wahoo: boolean;
    strava: boolean;
    trainingPeaks: boolean;
    zwift: boolean;
    autoSync: boolean;
    backgroundSync: boolean;
  };
}

interface IntegrationSetting {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  subtitle: string;
  type: 'toggle' | 'setup' | 'navigation';
  currentValue?: boolean;
  connected?: boolean;
}

interface IntegrationSection {
  title: string;
  items: IntegrationSetting[];
}

export function IntegrationsSettingsScreen({ 
  onBack, 
  onSettingChange, 
  onSetup,
  onSyncFrequencyNavigation,
  integrationSettings 
}: IntegrationsSettingsScreenProps) {
  const sections: IntegrationSection[] = [
    {
      title: "HEALTH PLATFORMS",
      items: [
        {
          id: "appleHealth",
          icon: Heart,
          title: "Apple Health",
          subtitle: integrationSettings.appleHealth ? "Connected - Syncing nutrition & workouts" : "Not connected",
          type: "toggle",
          currentValue: integrationSettings.appleHealth,
          connected: integrationSettings.appleHealth
        },
        {
          id: "googleFit",
          icon: Activity,
          title: "Google Fit",
          subtitle: integrationSettings.googleFit ? "Connected - Syncing activities" : "Not connected",
          type: "toggle",
          currentValue: integrationSettings.googleFit,
          connected: integrationSettings.googleFit
        },
        {
          id: "samsungHealth",
          icon: Shield,
          title: "Samsung Health",
          subtitle: integrationSettings.samsungHealth ? "Connected - Health data sync" : "Not connected",
          type: "toggle",
          currentValue: integrationSettings.samsungHealth,
          connected: integrationSettings.samsungHealth
        }
      ]
    },
    {
      title: "FITNESS TRACKERS",
      items: [
        {
          id: "garminConnect",
          icon: Watch,
          title: "Garmin Connect",
          subtitle: integrationSettings.garminConnect ? "Connected - Fenix 7 Pro" : "Not connected",
          type: "toggle",
          currentValue: integrationSettings.garminConnect,
          connected: integrationSettings.garminConnect
        },
        {
          id: "fitbit",
          icon: Zap,
          title: "Fitbit",
          subtitle: integrationSettings.fitbit ? "Connected - Activity tracking" : "Not connected",
          type: "toggle",
          currentValue: integrationSettings.fitbit,
          connected: integrationSettings.fitbit
        },
        {
          id: "polarFlow",
          icon: Target,
          title: "Polar Flow",
          subtitle: integrationSettings.polarFlow ? "Connected - Heart rate data" : "Not connected",
          type: "toggle",
          currentValue: integrationSettings.polarFlow,
          connected: integrationSettings.polarFlow
        },
        {
          id: "wahoo",
          icon: Bike,
          title: "Wahoo",
          subtitle: integrationSettings.wahoo ? "Connected - Cycling data" : "Not connected",
          type: "toggle",
          currentValue: integrationSettings.wahoo,
          connected: integrationSettings.wahoo
        }
      ]
    },
    {
      title: "NUTRITION APPS",
      items: [
        {
          id: "myFitnessPal",
          icon: Utensils,
          title: "MyFitnessPal",
          subtitle: "Import food database access",
          type: "setup"
        },
        {
          id: "cronometer",
          icon: Calculator,
          title: "Cronometer",
          subtitle: "Detailed micronutrient tracking",
          type: "setup"
        },
        {
          id: "loseIt",
          icon: Crosshair,
          title: "Lose It!",
          subtitle: "Food logging integration",
          type: "setup"
        }
      ]
    },
    {
      title: "TRAINING PLATFORMS",
      items: [
        {
          id: "strava",
          icon: MapPin,
          title: "Strava",
          subtitle: integrationSettings.strava ? "Connected - Auto-sync workouts" : "Not connected",
          type: "toggle",
          currentValue: integrationSettings.strava,
          connected: integrationSettings.strava
        },
        {
          id: "trainingPeaks",
          icon: BarChart3,
          title: "TrainingPeaks",
          subtitle: integrationSettings.trainingPeaks ? "Connected - Performance data" : "Not connected",
          type: "toggle",
          currentValue: integrationSettings.trainingPeaks,
          connected: integrationSettings.trainingPeaks
        },
        {
          id: "zwift",
          icon: Bike,
          title: "Zwift",
          subtitle: integrationSettings.zwift ? "Connected - Indoor training" : "Not connected",
          type: "toggle",
          currentValue: integrationSettings.zwift,
          connected: integrationSettings.zwift
        }
      ]
    },
    {
      title: "SYNC SETTINGS",
      items: [
        {
          id: "autoSync",
          icon: RefreshCw,
          title: "Automatic Sync",
          subtitle: "Sync data every 15 minutes",
          type: "toggle",
          currentValue: integrationSettings.autoSync
        },
        {
          id: "backgroundSync",
          icon: Smartphone,
          title: "Background Sync",
          subtitle: "Sync when app is closed",
          type: "toggle",
          currentValue: integrationSettings.backgroundSync
        },
        {
          id: "syncFrequency",
          icon: Clock,
          title: "Sync Frequency",
          subtitle: "Every 15 minutes",
          type: "navigation"
        }
      ]
    }
  ];

  const handleToggleChange = (settingId: string, currentValue: boolean) => {
    const newValue = !currentValue;
    onSettingChange(settingId, newValue);
  };

  const handleItemClick = (item: IntegrationSetting) => {
    if (item.type === 'toggle') {
      handleToggleChange(item.id, item.currentValue || false);
    } else if (item.type === 'setup') {
      onSetup(item.id);
    } else if (item.type === 'navigation') {
      if (item.id === 'syncFrequency') {
        onSyncFrequencyNavigation();
      }
    }
  };

  const IntegrationItemComponent = ({ item, isFirst, isLast }: { 
    item: IntegrationSetting; 
    isFirst: boolean; 
    isLast: boolean; 
  }) => {
    const Icon = item.icon;
    const isConnected = item.connected;
    
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
              className="text-gray-600 dark:text-gray-400"
            />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <div className="text-sm font-medium mb-0.5 text-black dark:text-white">
              {item.title}
            </div>
            <div className={`text-xs ${
              isConnected 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              {item.subtitle}
            </div>
          </div>
        </div>
        
        {item.type === 'toggle' ? (
          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
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
            {!item.currentValue && (
              <ChevronRight 
                size={16} 
                className="text-gray-400 dark:text-gray-500"
              />
            )}
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
            Integrations
          </motion.h1>
        </div>
        
        <motion.p 
          className="text-sm" 
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
        >
          Connect your health apps and devices
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
                  <IntegrationItemComponent
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