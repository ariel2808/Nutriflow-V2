import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Zap, Trophy } from 'lucide-react';

interface PersonalizationPreviewScreenProps {
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
          backgroundColor: '#4A90E2'
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
            backgroundColor: index === currentStep - 1 ? '#4A90E2' : '#e5e5e7'
          }}
          initial={{ scale: 0.8 }}
          animate={{ scale: index === currentStep - 1 ? 1 : 0.8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
}

// Mock phone interface component
function MockPhoneInterface() {
  return (
    <motion.div
      className="relative mx-auto"
      style={{ width: '260px', height: '320px' }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -6, 0]
      }}
      transition={{ 
        opacity: { duration: 0.5, delay: 0.4 },
        scale: { duration: 0.5, delay: 0.4 },
        y: { 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 0.8 
        }
      }}
    >
      {/* Phone frame */}
      <div 
        className="w-full h-full rounded-3xl border-4 p-2 relative overflow-hidden"
        style={{ 
          backgroundColor: '#1d1d1f',
          borderColor: '#d1d1d6'
        }}
      >
        {/* Screen content */}
        <div 
          className="w-full h-full rounded-2xl p-3 relative overflow-hidden"
          style={{ backgroundColor: '#f2f2f7' }}
        >
          {/* Status bar */}
          <div className="flex justify-between items-center mb-3">
            <span style={{ fontSize: '9px', fontWeight: 600, color: '#1d1d1f' }}>9:41</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#1d1d1f' }} />
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#1d1d1f' }} />
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#1d1d1f' }} />
            </div>
          </div>

          {/* Greeting */}
          <div className="mb-4">
            <motion.h3 
              style={{ 
                fontSize: '14px', 
                fontWeight: 600, 
                color: '#1d1d1f',
                marginBottom: '2px'
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              Good morning, Alex!
            </motion.h3>
            <motion.p 
              style={{ 
                fontSize: '10px', 
                color: '#86868b'
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              Today • Marathon Training
            </motion.p>
          </div>

          {/* Mini nutrition summary */}
          <motion.div 
            className="mb-3 p-2 rounded-lg"
            style={{ backgroundColor: '#ffffff' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            <div className="flex justify-between items-center mb-2">
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#1d1d1f' }}>
                Nutrition Today
              </span>
              <span style={{ fontSize: '9px', color: '#10B981' }}>
                On track
              </span>
            </div>
            <div className="flex gap-2">
              {/* Mini progress rings */}
              {[
                { label: 'Cal', value: '1,247', color: '#4A90E2' },
                { label: 'Pro', value: '89g', color: '#10B981' },
                { label: 'Car', value: '156g', color: '#F59E0B' }
              ].map((item, index) => (
                <div key={item.label} className="flex flex-col items-center">
                  <div 
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center mb-1"
                    style={{ borderColor: item.color, backgroundColor: `${item.color}20` }}
                  >
                    <div 
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                  <span style={{ fontSize: '7px', color: '#86868b' }}>{item.label}</span>
                  <span style={{ fontSize: '8px', fontWeight: 600, color: '#1d1d1f' }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sample workout */}
          <motion.div 
            className="mb-3 p-2 rounded-lg"
            style={{ backgroundColor: '#ffffff' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.9 }}
          >
            <div className="flex items-start gap-2">
              <div 
                className="w-5 h-5 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#4A90E2' }}
              >
                <Zap size={10} color="#ffffff" />
              </div>
              <div className="flex-1">
                <p style={{ fontSize: '11px', fontWeight: 600, color: '#1d1d1f' }}>
                  Morning Run - 10km
                </p>
                <p style={{ fontSize: '9px', color: '#86868b' }}>
                  7:00 AM • High intensity
                </p>
                <div className="mt-1 px-2 py-1 rounded-md" style={{ backgroundColor: '#F59E0B20' }}>
                  <p style={{ fontSize: '8px', color: '#F59E0B', fontWeight: 500 }}>
                    Pre-fuel: Energy gel
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sample meal */}
          <motion.div 
            className="mb-3 p-2 rounded-lg"
            style={{ backgroundColor: '#ffffff' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.0 }}
          >
            <div className="flex items-start gap-2">
              <div 
                className="w-5 h-5 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#10B981' }}
              >
                <Trophy size={10} color="#ffffff" />
              </div>
              <div className="flex-1">
                <p style={{ fontSize: '11px', fontWeight: 600, color: '#1d1d1f' }}>
                  Post-workout smoothie
                </p>
                <p style={{ fontSize: '9px', color: '#86868b' }}>
                  25g protein • Recovery
                </p>
              </div>
            </div>
          </motion.div>

          {/* AI suggestion bubble */}
          <motion.div 
            className="p-2 rounded-lg border-2 border-dashed"
            style={{ 
              backgroundColor: '#4A90E220',
              borderColor: '#4A90E2'
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.1 }}
          >
            <div className="flex items-start gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4A90E2' }}>
                <div className="w-full h-full rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#ffffff' }} />
                </div>
              </div>
              <p style={{ fontSize: '9px', color: '#4A90E2', fontWeight: 500 }}>
                Try adding banana for extra energy
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function PersonalizationPreviewScreen({ onContinue, onBack }: PersonalizationPreviewScreenProps) {
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
          <ProgressBar progress={75} />
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
            3 of 4
          </motion.span>
          
          <div className="w-10" />
        </div>
      </div>

      {/* Header Section - 130px */}
      <div className="flex-shrink-0 px-6" style={{ height: '130px' }}>
        <motion.h1
          style={{ 
            fontSize: '26px', 
            fontWeight: 700,
            color: '#1d1d1f',
            marginBottom: '8px',
            textAlign: 'center',
            letterSpacing: '-0.3px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Made Just for You
        </motion.h1>
        
        <motion.p
          style={{ 
            fontSize: '15px', 
            fontWeight: 400,
            color: '#86868b',
            textAlign: 'center',
            lineHeight: '20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          Every recommendation is tailored to your goals, preferences, and schedule
        </motion.p>
      </div>

      {/* Mock Interface Section - 502px */}
      <div className="flex-1 flex items-center justify-center px-6" style={{ height: '502px' }}>
        <MockPhoneInterface />
      </div>

      {/* Bottom Section - 100px */}
      <div className="flex-shrink-0 px-6 pb-6" style={{ height: '100px' }}>
        <div className="flex flex-col gap-3 justify-end h-full">
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
            transition={{ duration: 0.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Set Up My Profile
          </motion.button>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.3 }}
          >
            <PageDots currentStep={3} totalSteps={4} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}