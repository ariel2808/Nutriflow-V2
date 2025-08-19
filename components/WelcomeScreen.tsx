import React from 'react';
import { motion } from 'motion/react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

// Simple geometric logo component
function NutriFlowLogo() {
  return (
    <motion.div
      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
      style={{ backgroundColor: '#1d1d1f' }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div 
        className="w-8 h-8 rounded-full border-2"
        style={{ borderColor: '#ffffff' }}
      />
    </motion.div>
  );
}

export function WelcomeScreen({ onGetStarted, onSignIn }: WelcomeScreenProps) {
  return (
    <div 
      className="w-full h-screen flex flex-col"
      style={{ 
        backgroundColor: '#ffffff',
        maxWidth: '375px',
        margin: '0 auto'
      }}
    >
      {/* Status Bar */}
      <div className="flex justify-between items-center pt-3 pb-2 px-6">
        <div className="flex items-center gap-1">
          <span style={{ color: '#1d1d1f', fontSize: '17px', fontWeight: 600 }}>9:41</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#1d1d1f' }} />
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#1d1d1f' }} />
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#1d1d1f' }} />
        </div>
      </div>

      {/* Top Section - 35% */}
      <div className="flex-shrink-0 flex flex-col items-center justify-center px-8" style={{ height: '35vh' }}>
        <NutriFlowLogo />
        
        <motion.h1
          style={{ 
            fontSize: '32px', 
            fontWeight: 700,
            color: '#1d1d1f',
            marginBottom: '8px',
            textAlign: 'center',
            letterSpacing: '-0.5px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          NutriFlow
        </motion.h1>
        
        <motion.p
          style={{ 
            fontSize: '17px', 
            fontWeight: 400,
            color: '#86868b',
            textAlign: 'center'
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          Smart nutrition planning
        </motion.p>
      </div>

      {/* Middle Section - 45% */}
      <div className="flex-shrink-0 flex flex-col justify-center px-8" style={{ height: '45vh' }}>
        <motion.h2
          style={{ 
            fontSize: '28px', 
            fontWeight: 700,
            color: '#1d1d1f',
            marginBottom: '16px',
            textAlign: 'center',
            letterSpacing: '-0.3px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          Plan. Track. Perform.
        </motion.h2>
        
        <motion.p
          style={{ 
            fontSize: '17px', 
            fontWeight: 400,
            color: '#86868b',
            textAlign: 'center',
            marginBottom: '40px',
            lineHeight: '24px'
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Intelligent nutrition that adapts to your training and goals
        </motion.p>

        <div className="space-y-4">
          {[
            'Personalized meal planning',
            'Workout nutrition timing', 
            'Progress insights'
          ].map((feature, index) => (
            <motion.div
              key={feature}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.6 + (index * 0.1), 
                ease: [0.22, 1, 0.36, 1] 
              }}
            >
              <div 
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: '#1d1d1f' }}
              />
              <span 
                style={{ 
                  fontSize: '17px', 
                  fontWeight: 400,
                  color: '#1d1d1f'
                }}
              >
                {feature}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Section - 20% */}
      <div className="flex-1 flex flex-col justify-center px-8 pb-12">
        <motion.button
          onClick={onGetStarted}
          className="w-full py-4 rounded-xl mb-4"
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
          transition={{ duration: 0.5, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Get Started
        </motion.button>
        
        <motion.button
          onClick={onSignIn}
          className="text-center py-2"
          style={{ 
            backgroundColor: 'transparent',
            color: '#86868b',
            fontSize: '17px',
            fontWeight: 400,
            border: 'none'
          }}
          whileHover={{ 
            color: '#1d1d1f',
            transition: { duration: 0.2 }
          }}
          whileTap={{ 
            scale: 0.98,
            transition: { duration: 0.1 }
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          I already have an account
        </motion.button>
      </div>
    </div>
  );
}