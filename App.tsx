import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { FeaturesOverviewScreen } from './components/FeaturesOverviewScreen';
import { PersonalizationPreviewScreen } from './components/PersonalizationPreviewScreen';
import { PreSignupScreen } from './components/PreSignupScreen';
import { AccountCreationScreen } from './components/AccountCreationScreen';
import { LoginScreen } from './components/LoginScreen';
import { ForgotPasswordScreen } from './components/ForgotPasswordScreen';
import { EmailVerificationScreen } from './components/EmailVerificationScreen';
import { ProfileSetupScreen } from './components/ProfileSetupScreen';
import { HomeScreen } from './components/HomeScreen';
import { CalendarScreen } from './components/CalendarScreen';
import { FullDayView } from './components/FullDayView';
import { DailyView } from './components/DailyView';
import { ItemDetail } from './components/ItemDetail';
import { InsightsScreen } from './components/InsightsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ProfileSettingsScreen } from './components/ProfileSettingsScreen';
import { AppPreferencesScreen } from './components/AppPreferencesScreen';
import { AppearanceSettingsScreen } from './components/AppearanceSettingsScreen';
import { SecurityPrivacySettingsScreen } from './components/SecurityPrivacySettingsScreen';
import { NotificationsSettingsScreen } from './components/NotificationsSettingsScreen';
import { IntegrationsSettingsScreen } from './components/IntegrationsSettingsScreen';
import { SupportScreen } from './components/SupportScreen';
import { BottomNavigation } from './components/BottomNavigation';
import { TransitionCalendar, TransitionState } from './components/TransitionCalendar';
import { ManualWorkoutPlanningModal } from './components/ManualWorkoutPlanningModal';
import { motion, AnimatePresence } from 'motion/react';

export type Screen = 'welcome' | 'featuresOverview' | 'personalizationPreview' | 'preSignup' | 'accountCreation' | 'login' | 'forgotPassword' | 'emailVerification' | 'profileSetup1' | 'profileSetup2' | 'profileSetup3' | 'profileSetup4' | 'home' | 'calendar' | 'insights' | 'profile' | 'profileSettings' | 'appPreferences' | 'appearanceSettings' | 'securityPrivacySettings' | 'notificationsSettings' | 'integrationsSettings' | 'support' | 'fullDay' | 'itemDetail' | 'dailyView';


export interface Event {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  type: 'coffee' | 'workout' | 'meal' | 'swim' | 'fueling';
  description?: string;
  duration?: number; // in minutes
  intensity?: 'LOW' | 'MEDIUM' | 'HIGH';
  workoutId?: string; // Reference to the workout this fueling belongs to
  workoutDetails?: {
    distance?: number;
    pace?: string;
    speed?: number;
    workoutType?: string;
    location?: string;
    customType?: string;
    focus?: string;
    exerciseCount?: number;
  };
}

export interface FuelingPlan {
  before: FuelingPhase;
  during: FuelingPhase[];
  after: FuelingPhase;
}

export interface FuelingPhase {
  timing: string;
  items: FuelingItem[];
  description?: string;
}

export interface FuelingItem {
  icon: 'droplet' | 'zap' | 'salt' | 'leaf';
  type: 'hydration' | 'carbs' | 'sodium' | 'whole-food';
  amount: string;
  frequency?: string;
  details: string;
}

export interface WorkoutPlanData {
  name: string;
  time: string;
  duration: number;
  type: string;
  intensity: string;
  notes: string;
  sportSpecific?: {
    distance?: number;
    pace?: string;
    speed?: number;
    workoutType?: string;
    location?: string;
    customType?: string;
  };
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [navigationStack, setNavigationStack] = useState<Screen[]>(['welcome']); // Track navigation history
  const [selectedDate, setSelectedDate] = useState(new Date(2020, 5, 4)); // June 4th, 2020
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Track if any modal is open
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to light mode
  const [isAITextboxFocused, setIsAITextboxFocused] = useState(false); // Track AI textbox focus
  const [transitionState, setTransitionState] = useState<TransitionState>('idle'); // Track calendar transitions
  const [userEmail, setUserEmail] = useState(''); // Store user email for verification

  // Workout Planning Modal State
  const [isWorkoutPlanningModalOpen, setIsWorkoutPlanningModalOpen] = useState(false);

  // Security & Privacy Settings State
  const [securitySettings, setSecuritySettings] = useState({
    biometricLogin: true,
    analyticsSharing: false,
    crashReports: true,
    personalizedAds: false
  });

  // Notifications Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    allowNotifications: true,
    breakfastReminder: true,
    lunchReminder: true,
    dinnerReminder: true,
    snackReminders: false,
    preWorkoutNutrition: true,
    postWorkoutRecovery: true,
    hydrationReminders: true,
    dailySummary: true,
    weeklyProgress: true,
    achievementAlerts: true,
    doNotDisturb: true,
    emergencyOverride: true
  });

  // Integrations Settings State
  const [integrationSettings, setIntegrationSettings] = useState({
    appleHealth: true,
    googleFit: false,
    samsungHealth: false,
    garminConnect: true,
    fitbit: false,
    polarFlow: false,
    wahoo: false,
    strava: true,
    trainingPeaks: false,
    zwift: false,
    autoSync: true,
    backgroundSync: true
  });

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDarkMode]);

  // Helper function to determine if a screen is a main navigation screen
  const isMainScreen = (screen: Screen): boolean => {
    return ['home', 'calendar', 'insights', 'profile'].includes(screen);
  };

  // Helper function to determine if a screen should be full width
  const isFullWidthScreen = (screen: Screen): boolean => {
    const fullWidthScreens = [
      'welcome', 'featuresOverview', 'personalizationPreview', 'preSignup', 
      'accountCreation', 'login', 'forgotPassword', 'emailVerification',
      'home', 'calendar', 'insights', 'profile', 'itemDetail', 
      'profileSettings', 'appPreferences', 'appearanceSettings', 
      'securityPrivacySettings', 'notificationsSettings', 'integrationsSettings', 
      'support', 'dailyView'
    ];
    return fullWidthScreens.includes(screen) || screen.startsWith('profileSetup');
  };

  const handleDailyViewOpen = (date: Date) => {
    setSelectedDate(date);
    setTransitionState('calendar-to-daily');
    
    // Start the transition sequence
    setTimeout(() => {
      setNavigationStack(prev => [...prev, 'dailyView']);
      setCurrentScreen('dailyView');
      
      // Reset transition state after animation completes
      setTimeout(() => {
        setTransitionState('idle');
      }, 800); // Match animation duration
    }, 300); // Allow for week extraction animation
  };

  const handleNavigate = (screen: Screen) => {
    // Clear selected event when navigating away from detail screens
    if (currentScreen === 'itemDetail') {
      setSelectedEvent(null);
    }
    
    // Clear AI textbox focus when navigating away from home
    if (currentScreen === 'home' && screen !== 'home') {
      setIsAITextboxFocused(false);
    }
    
    // Update navigation stack for main screen navigation
    if (isMainScreen(screen)) {
      // Reset stack to just include the new main screen
      setNavigationStack([screen]);
    }
    
    setCurrentScreen(screen);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    
    // Add itemDetail to navigation stack, preserving current path
    setNavigationStack(prev => [...prev, 'itemDetail']);
    setCurrentScreen('itemDetail');
  };

  const handleExpandClick = (fromScreen: Screen) => {
    // Add fullDay to navigation stack
    setNavigationStack(prev => [...prev, 'fullDay']);
    setCurrentScreen('fullDay');
  };

  const handleBack = () => {
    // Clear selected event when going back from item detail
    if (currentScreen === 'itemDetail') {
      setSelectedEvent(null);
    }
    
    // Handle daily view to calendar transition
    if (currentScreen === 'dailyView') {
      setTransitionState('daily-to-calendar');
      
      setTimeout(() => {
        setNavigationStack(prev => {
          const newStack = [...prev];
          if (newStack.length > 1) {
            newStack.pop(); // Remove dailyView
            const previousScreen = newStack[newStack.length - 1];
            setCurrentScreen(previousScreen);
            return newStack;
          } else {
            setCurrentScreen('calendar');
            return ['calendar'];
          }
        });
        
        // Reset transition state after animation completes
        setTimeout(() => {
          setTransitionState('idle');
        }, 600);
      }, 100);
      return;
    }
    
    // Pop the current screen from the stack and go to the previous one
    setNavigationStack(prev => {
      const newStack = [...prev];
      if (newStack.length > 1) {
        newStack.pop(); // Remove current screen
        const previousScreen = newStack[newStack.length - 1];
        setCurrentScreen(previousScreen);
        return newStack;
      } else {
        // Fallback to home if stack is empty or has only one item
        setCurrentScreen('home');
        return ['home'];
      }
    });
  };

  const handleAITextboxFocus = (focused: boolean) => {
    setIsAITextboxFocused(focused);
  };

  // Workout Planning Modal Handlers
  const handleOpenWorkoutPlanningModal = () => {
    setIsWorkoutPlanningModalOpen(true);
    setIsModalOpen(true);
  };

  const handleCloseWorkoutPlanningModal = () => {
    setIsWorkoutPlanningModalOpen(false);
    setIsModalOpen(false);
  };

  const handleSaveWorkoutPlan = (workoutData: WorkoutPlanData) => {
    console.log('Saving workout plan:', workoutData);
    
    // TODO: Here you would typically:
    // 1. Save the workout plan to your data store
    // 2. Create appropriate events on the calendar
    // 3. Generate AI-powered nutrition recommendations
    // 4. Update the UI with the new workout
    
    // For now, just log the data and show success
    alert(`Workout "${workoutData.name}" planned successfully!`);
    
    handleCloseWorkoutPlanningModal();
  };

  const handleGetStarted = () => {
    setCurrentScreen('featuresOverview');
    setNavigationStack(['featuresOverview']);
  };

  const handleSignIn = () => {
    // Navigate to login screen
    setCurrentScreen('login');
    setNavigationStack(['login']);
  };

  const handleFeaturesContinue = () => {
    setCurrentScreen('personalizationPreview');
    setNavigationStack(['personalizationPreview']);
  };

  const handlePersonalizationContinue = () => {
    setCurrentScreen('preSignup');
    setNavigationStack(['preSignup']);
  };

  const handleCreateAccount = () => {
    setCurrentScreen('accountCreation');
    setNavigationStack(['accountCreation']);
  };

  const handleAlreadyHaveAccount = () => {
    // Navigate to login screen
    setCurrentScreen('login');
    setNavigationStack(['login']);
  };

  const handleAccountCreated = (email: string) => {
    // Store email and navigate to verification
    setUserEmail(email);
    setCurrentScreen('emailVerification');
    setNavigationStack(['emailVerification']);
  };

  const handleSwitchToSignIn = () => {
    // Navigate to login screen
    setCurrentScreen('login');
    setNavigationStack(['login']);
  };

  const handleProfileSetupContinue = (nextStep: number) => {
    if (nextStep <= 4) {
      const nextScreen = `profileSetup${nextStep}` as Screen;
      setCurrentScreen(nextScreen);
      setNavigationStack(prev => [...prev, nextScreen]);
    } else {
      // Profile setup complete, go to home
      setCurrentScreen('home');
      setNavigationStack(['home']);
    }
  };

  const handleProfileSetupSkip = () => {
    // Skip to home screen
    setCurrentScreen('home');
    setNavigationStack(['home']);
  };

  // Login screen handlers
  const handleLoginSuccess = () => {
    // Login successful, go to home
    setCurrentScreen('home');
    setNavigationStack(['home']);
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password screen
    setCurrentScreen('forgotPassword');
    setNavigationStack(['forgotPassword']);
  };

  const handleLoginCreateAccount = () => {
    // Navigate to account creation from login
    setCurrentScreen('accountCreation');
    setNavigationStack(['accountCreation']);
  };

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    // Simulate social login success
    console.log(`${provider} login attempted`);
    setTimeout(() => {
      handleLoginSuccess();
    }, 1000);
  };

  // Email verification handlers
  const handleVerificationSuccess = () => {
    // Verification successful, start profile setup
    setCurrentScreen('profileSetup1');
    setNavigationStack(['profileSetup1']);
  };

  const handleVerificationSkip = () => {
    // Skip verification, go to home with limited features
    setCurrentScreen('home');
    setNavigationStack(['home']);
  };

  const handleChangeEmail = () => {
    // Go back to account creation to change email
    setCurrentScreen('accountCreation');
    setNavigationStack(['accountCreation']);
  };

  // Forgot password handlers
  const handleForgotPasswordBackToLogin = () => {
    // Navigate back to login from forgot password
    setCurrentScreen('login');
    setNavigationStack(['login']);
  };

  // Profile settings handlers
  const handleProfileSettingsOpen = () => {
    // Navigate to profile settings
    setCurrentScreen('profileSettings');
    setNavigationStack(prev => [...prev, 'profileSettings']);
  };

  const handleProfileSettingNavigation = (setting: string) => {
    // Handle navigation to specific settings
    console.log(`Navigate to setting: ${setting}`);
    // TODO: Implement specific setting screens
    alert(`${setting} screen would be implemented here`);
  };

  // App preferences handlers
  const handleAppPreferencesOpen = () => {
    // Navigate to app preferences
    setCurrentScreen('appPreferences');
    setNavigationStack(prev => [...prev, 'appPreferences']);
  };

  const handleAppPreferenceNavigation = (preference: string) => {
    // Handle navigation to specific preference screens
    if (preference === 'appearance') {
      setCurrentScreen('appearanceSettings');
      setNavigationStack(prev => [...prev, 'appearanceSettings']);
    } else if (preference === 'securityPrivacy') {
      setCurrentScreen('securityPrivacySettings');
      setNavigationStack(prev => [...prev, 'securityPrivacySettings']);
    } else if (preference === 'notifications') {
      setCurrentScreen('notificationsSettings');
      setNavigationStack(prev => [...prev, 'notificationsSettings']);
    } else if (preference === 'integrations') {
      setCurrentScreen('integrationsSettings');
      setNavigationStack(prev => [...prev, 'integrationsSettings']);
    } else {
      console.log(`Navigate to preference: ${preference}`);
      // TODO: Implement other preference screens
      alert(`${preference} screen would be implemented here`);
    }
  };

  // Appearance settings handlers
  const handleAppearanceSettingChange = (setting: string, value: any) => {
    console.log(`Appearance setting changed: ${setting} = ${value}`);
    
    // Handle dark mode toggle
    if (setting === 'theme') {
      if (value === 'dark') {
        setIsDarkMode(true);
      } else if (value === 'light') {
        setIsDarkMode(false);
      } else if (value === 'auto') {
        // Auto mode - could check system preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(systemPrefersDark);
      }
    }
    
    // TODO: Handle other appearance settings
  };

  const handleAppearanceDetailNavigation = (setting: string) => {
    console.log(`Navigate to appearance detail: ${setting}`);
    // TODO: Implement detail screens for text size, language, etc.
    alert(`${setting} detail screen would be implemented here`);
  };

  // Security & Privacy settings handlers
  const handleSecuritySettingChange = (setting: string, value: any) => {
    console.log(`Security setting changed: ${setting} = ${value}`);
    
    // Update security settings state
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSecurityDetailNavigation = (setting: string) => {
    console.log(`Navigate to security detail: ${setting}`);
    // TODO: Implement detail screens for 2FA setup, auto-lock options, etc.
    alert(`${setting} detail screen would be implemented here`);
  };

  const handleSecurityAction = (action: string) => {
    console.log(`Security action: ${action}`);
    // TODO: Implement security actions like data download, cache clear, data deletion
    alert(`${action} action would be implemented here`);
  };

  // Notifications settings handlers
  const handleNotificationSettingChange = (setting: string, value: any) => {
    console.log(`Notification setting changed: ${setting} = ${value}`);
    
    // Update notification settings state
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: value
    }));

    // If master toggle is turned off, disable all other notifications
    if (setting === 'allowNotifications' && !value) {
      setNotificationSettings(prev => ({
        ...prev,
        allowNotifications: false,
        breakfastReminder: false,
        lunchReminder: false,
        dinnerReminder: false,
        snackReminders: false,
        preWorkoutNutrition: false,
        postWorkoutRecovery: false,
        hydrationReminders: false,
        dailySummary: false,
        weeklyProgress: false,
        achievementAlerts: false
      }));
    }
  };

  const handleNotificationTimeNavigation = (setting: string) => {
    console.log(`Navigate to notification time setting: ${setting}`);
    // TODO: Implement time picker screens for meal times, quiet hours, etc.
    alert(`${setting} time setting screen would be implemented here`);
  };

  // Integrations settings handlers
  const handleIntegrationSettingChange = (setting: string, value: any) => {
    console.log(`Integration setting changed: ${setting} = ${value}`);
    
    // Update integration settings state
    setIntegrationSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleIntegrationSetup = (integration: string) => {
    console.log(`Setup integration: ${integration}`);
    // TODO: Implement integration setup flows
    alert(`${integration} setup flow would be implemented here`);
  };

  const handleSyncFrequencyNavigation = () => {
    console.log('Navigate to sync frequency settings');
    // TODO: Implement sync frequency options screen
    alert('Sync frequency options screen would be implemented here');
  };

  // Support screen handlers
  const handleSupportOpen = () => {
    // Navigate to support screen
    setCurrentScreen('support');
    setNavigationStack(prev => [...prev, 'support']);
  };

  const handleSupportContact = (contactMethod: string) => {
    console.log(`Support contact: ${contactMethod}`);
    
    if (contactMethod === 'email') {
      // Open email client with pre-filled support email
      window.location.href = 'mailto:support@nutriflow.app?subject=NutriFlow Support Request';
    } else {
      // TODO: Implement other contact methods
      alert(`${contactMethod} would be implemented here`);
    }
  };

  const handleSupportNavigation = (section: string) => {
    console.log(`Navigate to support section: ${section}`);
    // TODO: Implement support section screens (FAQ, troubleshooting, etc.)
    alert(`${section} section would be implemented here`);
  };

  const handleExternalLink = (link: string) => {
    console.log(`Open external link: ${link}`);
    // TODO: Open external links in browser
    if (link === 'appStore') {
      alert('Would open App Store rating page');
    } else if (link === 'terms') {
      alert('Would open Terms of Service in browser');
    } else if (link === 'privacy') {
      alert('Would open Privacy Policy in browser');
    } else {
      alert(`${link} external link would be opened`);
    }
  };

  return (
    <div 
      className={`w-full min-h-screen relative ${
        isFullWidthScreen(currentScreen) ? '' : 'max-w-sm mx-auto'
      }`} 
      style={{ backgroundColor: 'var(--bg-main)' }}
    >
      {/* Enhanced Grid Background - Hidden for full-width screens */}
      {!isFullWidthScreen(currentScreen) && (
        <div 
          className="absolute inset-0 transition-all duration-300"
          style={{
            opacity: isDarkMode ? 0.15 : 0.30,
            backgroundImage: `
              linear-gradient(to right, var(--graph-grid) 1px, transparent 1px),
              linear-gradient(to bottom, var(--graph-grid) 1px, transparent 1px)
            `,
            backgroundSize: currentScreen === 'dailyView' ? '24px 24px' : '20px 20px',
            filter: isAITextboxFocused ? 'blur(8px)' : 'none',
            transform: isAITextboxFocused ? 'scale(1.02)' : 'scale(1)',
          }}
        />
      )}
      
      {/* Content */}
      <div className={`relative z-10 ${isMainScreen(currentScreen) ? 'pb-24' : ''}`}>
        <AnimatePresence mode="wait">
          {currentScreen === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <WelcomeScreen 
                onGetStarted={handleGetStarted}
                onSignIn={handleSignIn}
              />
            </motion.div>
          )}
          {currentScreen === 'featuresOverview' && (
            <motion.div
              key="featuresOverview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <FeaturesOverviewScreen 
                onContinue={handleFeaturesContinue}
                onBack={handleBack}
              />
            </motion.div>
          )}
          {currentScreen === 'personalizationPreview' && (
            <motion.div
              key="personalizationPreview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <PersonalizationPreviewScreen 
                onContinue={handlePersonalizationContinue}
                onBack={handleBack}
              />
            </motion.div>
          )}
          {currentScreen === 'preSignup' && (
            <motion.div
              key="preSignup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <PreSignupScreen 
                onCreateAccount={handleCreateAccount}
                onAlreadyHaveAccount={handleAlreadyHaveAccount}
                onBack={handleBack}
              />
            </motion.div>
          )}
          {currentScreen === 'accountCreation' && (
            <motion.div
              key="accountCreation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <AccountCreationScreen 
                onAccountCreated={handleAccountCreated}
                onSwitchToSignIn={handleSwitchToSignIn}
                onBack={handleBack}
              />
            </motion.div>
          )}
          {currentScreen === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <LoginScreen 
                onSignIn={handleLoginSuccess}
                onBack={handleBack}
                onForgotPassword={handleForgotPassword}
                onCreateAccount={handleLoginCreateAccount}
                onGoogleSignIn={() => handleSocialLogin('google')}
                onAppleSignIn={() => handleSocialLogin('apple')}
              />
            </motion.div>
          )}
          {currentScreen === 'forgotPassword' && (
            <motion.div
              key="forgotPassword"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ForgotPasswordScreen 
                onBack={handleBack}
                onBackToLogin={handleForgotPasswordBackToLogin}
              />
            </motion.div>
          )}
          {currentScreen === 'emailVerification' && (
            <motion.div
              key="emailVerification"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <EmailVerificationScreen 
                email={userEmail}
                onVerificationSuccess={handleVerificationSuccess}
                onSkip={handleVerificationSkip}
                onBack={handleBack}
                onChangeEmail={handleChangeEmail}
              />
            </motion.div>
          )}
          {(currentScreen === 'profileSetup1' || currentScreen === 'profileSetup2' || currentScreen === 'profileSetup3' || currentScreen === 'profileSetup4') && (
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ProfileSetupScreen 
                step={parseInt(currentScreen.slice(-1)) as 1 | 2 | 3 | 4}
                onContinue={handleProfileSetupContinue}
                onSkip={handleProfileSetupSkip}
                onBack={handleBack}
              />
            </motion.div>
          )}
          {currentScreen === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <HomeScreen 
                onEventClick={handleEventClick}
                onExpandClick={() => handleExpandClick('home')}
                onDailyViewOpen={handleDailyViewOpen}
                onAITextboxFocus={handleAITextboxFocus}
                isAITextboxFocused={isAITextboxFocused}
              />
            </motion.div>
          )}
          {(currentScreen === 'calendar' || currentScreen === 'dailyView') && (
            <TransitionCalendar
              key="transition-calendar"
              currentScreen={currentScreen}
              transitionState={transitionState}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              onEventClick={handleEventClick}
              onExpandClick={() => handleExpandClick('calendar')}
              onDailyViewOpen={handleDailyViewOpen}
              onBack={handleBack}
            />
          )}
          {currentScreen === 'fullDay' && (
            <motion.div
              key="fullDay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <FullDayView 
                date={selectedDate}
                onEventClick={handleEventClick}
                onBack={handleBack}
              />
            </motion.div>
          )}
          {currentScreen === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <InsightsScreen onModalStateChange={setIsModalOpen} />
            </motion.div>
          )}
          {currentScreen === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <ProfileScreen 
                onModalStateChange={setIsModalOpen}
                isDarkMode={isDarkMode}
                onDarkModeToggle={setIsDarkMode}
                onProfileSettingsOpen={handleProfileSettingsOpen}
                onAppPreferencesOpen={handleAppPreferencesOpen}
                onSupportOpen={handleSupportOpen}
              />
            </motion.div>
          )}
          {currentScreen === 'profileSettings' && (
            <motion.div
              key="profileSettings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ProfileSettingsScreen 
                onBack={handleBack}
                onNavigateToSetting={handleProfileSettingNavigation}
              />
            </motion.div>
          )}
          {currentScreen === 'appPreferences' && (
            <motion.div
              key="appPreferences"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <AppPreferencesScreen 
                onBack={handleBack}
                onNavigateToPreference={handleAppPreferenceNavigation}
              />
            </motion.div>
          )}
          {currentScreen === 'appearanceSettings' && (
            <motion.div
              key="appearanceSettings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <AppearanceSettingsScreen 
                onBack={handleBack}
                onSettingChange={handleAppearanceSettingChange}
                onDetailNavigation={handleAppearanceDetailNavigation}
                currentTheme={isDarkMode ? 'dark' : 'light'}
              />
            </motion.div>
          )}
          {currentScreen === 'securityPrivacySettings' && (
            <motion.div
              key="securityPrivacySettings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <SecurityPrivacySettingsScreen 
                onBack={handleBack}
                onSettingChange={handleSecuritySettingChange}
                onDetailNavigation={handleSecurityDetailNavigation}
                onAction={handleSecurityAction}
                securitySettings={securitySettings}
              />
            </motion.div>
          )}
          {currentScreen === 'notificationsSettings' && (
            <motion.div
              key="notificationsSettings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <NotificationsSettingsScreen 
                onBack={handleBack}
                onSettingChange={handleNotificationSettingChange}
                onTimeNavigation={handleNotificationTimeNavigation}
                notificationSettings={notificationSettings}
              />
            </motion.div>
          )}
          {currentScreen === 'integrationsSettings' && (
            <motion.div
              key="integrationsSettings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <IntegrationsSettingsScreen 
                onBack={handleBack}
                onSettingChange={handleIntegrationSettingChange}
                onSetup={handleIntegrationSetup}
                onSyncFrequencyNavigation={handleSyncFrequencyNavigation}
                integrationSettings={integrationSettings}
              />
            </motion.div>
          )}
          {currentScreen === 'support' && (
            <motion.div
              key="support"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <SupportScreen 
                onBack={handleBack}
                onContact={handleSupportContact}
                onNavigate={handleSupportNavigation}
                onExternalLink={handleExternalLink}
              />
            </motion.div>
          )}
          {currentScreen === 'itemDetail' && selectedEvent && (
            <motion.div
              key={`itemDetail-${selectedEvent.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <ItemDetail 
                event={selectedEvent}
                onBack={handleBack}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Workout Planning Modal */}
      <ManualWorkoutPlanningModal
        isOpen={isWorkoutPlanningModalOpen}
        onClose={handleCloseWorkoutPlanningModal}
        onSave={handleSaveWorkoutPlan}
      />

      {/* Bottom Navigation - Original Implementation with blur support */}
      {isMainScreen(currentScreen) && !isModalOpen && (
        <BottomNavigation 
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          isAITextboxFocused={isAITextboxFocused && currentScreen === 'home'}
        />
      )}


    </div>
  );
}