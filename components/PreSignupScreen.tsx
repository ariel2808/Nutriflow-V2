import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Check, Sparkles, Users, Clock } from 'lucide-react';

interface PreSignupScreenProps {
  onCreateAccount: () => void;
  onAlreadyHaveAccount: () => void;
  onBack: () => void;
}

// Progress bar component with celebration
function ProgressBar({ progress }: { progress: number }) {
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => setShowCelebration(true), 600);
    }
  }, [progress]);

  return (
    <div className="relative w-full h-0.5 rounded-full" style={{ backgroundColor: '#e5e5e7' }}>
      <motion.div
        className="h-full rounded-full relative"
        style={{ 
          background: 'linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%)'
        }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      
      {/* Celebration sparkles */}
      {showCelebration && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${85 + Math.random() * 10}%`,
                top: `${-6 + Math.random() * 12}px`,
              }}
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ 
                opacity: [0, 1, 0], 
                scale: [0, 1, 0],
                rotate: 360,
                y: [-10, -20, -10]
              }}
              transition={{ 
                duration: 1.5, 
                delay: i * 0.1,
                ease: "easeOut" 
              }}
            >
              <Sparkles 
                size={8} 
                style={{ color: '#F59E0B' }}
              />
            </motion.div>
          ))}
        </>
      )}
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

// Celebration graphic component
function CelebrationGraphic() {
  return (
    <motion.div
      className="relative mx-auto mb-6"
      style={{ width: '200px', height: '160px' }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background circles */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ 
          background: 'linear-gradient(135deg, #F59E0B20 0%, #FBBF2420 100%)',
          width: '200px',
          height: '160px'
        }}
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      {/* Central icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#F59E0B' }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7, ease: "backOut" }}
        >
          <Users size={32} color="#ffffff" />
        </motion.div>
      </div>
      
      {/* Floating sparkles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${20 + (i * 20)}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0], 
            scale: [0, 1, 0],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 2, 
            delay: 0.8 + (i * 0.2),
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeOut" 
          }}
        >
          <Sparkles 
            size={12} 
            style={{ color: i % 2 === 0 ? '#F59E0B' : '#FBBF24' }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

// Benefit item component
function BenefitItem({ text, delay }: { text: string, delay: number }) {
  return (
    <motion.div 
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: '#10B981' }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: delay + 0.1, ease: "backOut" }}
      >
        <Check size={12} color="#ffffff" />
      </motion.div>
      <span 
        style={{ 
          fontSize: '15px', 
          fontWeight: 400,
          color: '#1d1d1f',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
        }}
      >
        {text}
      </span>
    </motion.div>
  );
}

export function PreSignupScreen({ onCreateAccount, onAlreadyHaveAccount, onBack }: PreSignupScreenProps) {
  const benefits = [
    "Set up in under 2 minutes",
    "Free for first 14 days", 
    "Cancel anytime"
  ];

  return (
    <div 
      className="w-full flex flex-col"
      style={{ 
        backgroundColor: '#ffffff',
        maxWidth: '375px',
        margin: '0 auto',
        height: '812px',
        overflow: 'hidden'
      }}
    >
      {/* Header with Progress Bar - 80px total */}
      <div className="flex-shrink-0 px-6" style={{ height: '80px' }}>
        {/* Progress Bar */}
        <div className="pt-6 pb-4">
          <ProgressBar progress={100} />
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
            4 of 4
          </motion.span>
          
          <div className="w-10" />
        </div>
      </div>

      {/* Main Content Section - 632px */}
      <div className="flex-1 flex flex-col px-6" style={{ height: '632px' }}>
        {/* Title Section */}
        <div className="text-center mb-6">
          <motion.h1
            style={{ 
              fontSize: '26px', 
              fontWeight: 700,
              color: '#1d1d1f',
              marginBottom: '12px',
              textAlign: 'center',
              letterSpacing: '-0.3px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Ready to Transform Your Nutrition?
          </motion.h1>
          
          <motion.div
            className="flex items-center justify-center gap-2 mb-2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Users size={16} style={{ color: '#86868b' }} />
            <span
              style={{ 
                fontSize: '15px', 
                fontWeight: 400,
                color: '#86868b',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
              }}
            >
              Join 2,000+ athletes already using NutriFlow
            </span>
          </motion.div>
        </div>

        {/* Celebration Graphic */}
        <CelebrationGraphic />

        {/* Benefits List */}
        <div className="flex flex-col gap-4 mb-8">
          {benefits.map((benefit, index) => (
            <BenefitItem
              key={benefit}
              text={benefit}
              delay={0.8 + (index * 0.1)}
            />
          ))}
        </div>

        {/* Quick timing indicator */}
        <motion.div
          className="flex items-center justify-center gap-2 mt-auto mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.2 }}
        >
          <Clock size={14} style={{ color: '#10B981' }} />
          <span
            style={{ 
              fontSize: '14px', 
              fontWeight: 500,
              color: '#10B981',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
            }}
          >
            Less than 2 minutes to get started
          </span>
        </motion.div>
      </div>

      {/* Bottom Section with CTAs - 100px */}
      <div className="flex-shrink-0 px-6 pb-6" style={{ height: '100px' }}>
        <div className="flex flex-col gap-3 justify-end h-full">
          {/* Primary CTA */}
          <motion.button
            onClick={onCreateAccount}
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
            transition={{ duration: 0.5, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Create My Account
          </motion.button>
          
          {/* Secondary CTA */}
          <motion.button
            onClick={onAlreadyHaveAccount}
            className="text-center py-2"
            style={{ 
              background: 'none',
              border: 'none',
              fontSize: '14px',
              fontWeight: 400,
              color: '#86868b',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
            }}
            whileHover={{ 
              color: '#1d1d1f',
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.4 }}
          >
            I already have an account
          </motion.button>
          
          {/* Page Dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.5 }}
          >
            <PageDots currentStep={4} totalSteps={4} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}