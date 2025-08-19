import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Brain, Dumbbell, BarChart3 } from 'lucide-react';

interface FeaturesOverviewScreenProps {
  onContinue: () => void;
  onBack: () => void;
}

// Progress bar component
function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full h-0.5 rounded-full" style={{ backgroundColor: '#e5e5e7' }}>
      <motion.div
        className="h-full rounded-full"
        style={{ 
          background: 'linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%)'
        }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

// Page dots component
function PageDots({ currentStep, totalSteps }: { currentStep: number, totalSteps: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <motion.div
          key={index}
          className="w-2 h-2 rounded-full"
          style={{ 
            backgroundColor: index === currentStep - 1 ? '#F59E0B' : '#e5e5e7'
          }}
          initial={{ scale: 0.8 }}
          animate={{ scale: index === currentStep - 1 ? 1 : 0.8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
}

// Feature card component
function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ComponentType<any>, 
  title: string, 
  description: string,
  delay: number 
}) {
  return (
    <motion.div
      className="p-4 rounded-xl border"
      style={{ 
        backgroundColor: '#ffffff',
        borderColor: '#f2f2f7',
        borderWidth: '1px'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ 
        borderColor: '#F59E0B',
        y: -2,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-3">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: '#f2f2f7' }}
        >
          <Icon size={20} style={{ color: '#1d1d1f' }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 
            className="mb-1"
            style={{ 
              fontSize: '16px', 
              fontWeight: 600,
              color: '#1d1d1f',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
            }}
          >
            {title}
          </h3>
          <p 
            style={{ 
              fontSize: '14px', 
              fontWeight: 400,
              color: '#86868b',
              lineHeight: '18px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturesOverviewScreen({ onContinue, onBack }: FeaturesOverviewScreenProps) {
  const features = [
    {
      icon: Brain,
      title: "AI Meal Planning",
      description: "Personalized nutrition plans that adapt to your workouts and preferences"
    },
    {
      icon: Dumbbell,
      title: "Workout Integration", 
      description: "Automatic fueling recommendations before and after training sessions"
    },
    {
      icon: BarChart3,
      title: "Smart Tracking",
      description: "Effortless logging with insights that optimize your performance"
    }
  ];

  return (
    <div 
      className="w-full h-screen flex flex-col"
      style={{ 
        backgroundColor: '#ffffff',
        maxWidth: '375px',
        margin: '0 auto'
      }}
    >
      {/* Header with Progress Bar - 80px total */}
      <div className="flex-shrink-0 px-6" style={{ height: '80px' }}>
        {/* Progress Bar */}
        <div className="pt-6 pb-4">
          <ProgressBar progress={50} />
        </div>
        
        {/* Navigation Header */}
        <div className="flex items-center justify-between">
          <motion.button
            onClick={onBack}
            className="p-2 -ml-2 rounded-full"
            style={{ color: '#1d1d1f' }}
            whileHover={{ 
              backgroundColor: '#f2f2f7',
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ArrowLeft size={20} />
          </motion.button>
          
          <motion.span
            style={{ 
              fontSize: '14px', 
              fontWeight: 400,
              color: '#86868b',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            2 of 4
          </motion.span>
          
          <div className="w-10" />
        </div>
      </div>

      {/* Middle Section with Title and Feature Cards - ~550px */}
      <div className="flex-1 flex flex-col px-6" style={{ minHeight: '550px' }}>
        {/* Title Section */}
        <div className="mb-8">
          <motion.h1
            style={{ 
              fontSize: '28px', 
              fontWeight: 700,
              color: '#1d1d1f',
              marginBottom: '12px',
              textAlign: 'center',
              letterSpacing: '-0.3px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Everything you need
          </motion.h1>
          
          <motion.p
            style={{ 
              fontSize: '17px', 
              fontWeight: 400,
              color: '#86868b',
              textAlign: 'center',
              lineHeight: '22px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Powerful features to reach your goals
          </motion.p>
        </div>

        {/* Feature Cards */}
        <div className="flex-1 flex flex-col gap-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.4 + (index * 0.1)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Section with Continue Button and Page Dots - 100px */}
      <div className="flex-shrink-0 px-6 pb-8" style={{ height: '100px' }}>
        <div className="flex flex-col gap-4">
          <motion.button
            onClick={onContinue}
            className="w-full py-4 rounded-xl"
            style={{ 
              backgroundColor: '#1d1d1f',
              color: '#ffffff',
              fontSize: '17px',
              fontWeight: 600,
              border: 'none',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
            }}
            whileHover={{ 
              backgroundColor: '#2d2d2f',
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.98,
              transition: { duration: 0.1 }
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Continue
          </motion.button>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.9 }}
          >
            <PageDots currentStep={2} totalSteps={4} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}