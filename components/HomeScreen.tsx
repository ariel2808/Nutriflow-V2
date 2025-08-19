import React, { useState, useRef, useEffect } from 'react';
import { YourDaySection } from './YourDaySection';
import { TodaysSummary } from './TodaysSummary';
import { CoachTips } from './CoachTips';
import { Event } from '../App';
import { baseEvents } from './fullDayView/FullDayViewData';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Send } from 'lucide-react';

interface HomeScreenProps {
  onEventClick: (event: Event) => void;
  onExpandClick: () => void;
  onDailyViewOpen: (date: Date) => void;
  onAITextboxFocus: (focused: boolean) => void;
  isAITextboxFocused: boolean;
}

export function HomeScreen({ 
  onEventClick, 
  onExpandClick, 
  onDailyViewOpen,
  onAITextboxFocus,
  isAITextboxFocused
}: HomeScreenProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [aiInput, setAIInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleAISubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    console.log('AI Query:', aiInput);
    setIsTyping(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      setIsTyping(false);
      setAIInput('');
      onAITextboxFocus(false);
      // TODO: Handle AI response
    }, 2000);
  };

  const handleInputFocus = () => {
    onAITextboxFocus(true);
  };

  const handleInputBlur = () => {
    // Small delay to allow for form submission
    setTimeout(() => {
      if (!aiInput.trim() && !isTyping) {
        onAITextboxFocus(false);
      }
    }, 100);
  };

  return (
    <div className="w-full h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg-main)' }}>
      {/* Ensure no horizontal overflow */}
      <div className="px-5 pt-12 h-full flex flex-col max-w-full overflow-hidden">
        {/* Status Bar */}
        <div 
          className="flex justify-between items-center mb-8 text-sm flex-shrink-0"
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

        {/* Header */}
        <div className="mb-8 flex-shrink-0">
          <motion.h1 
            className="mb-2"
            style={{ color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Good morning, Alex
          </motion.h1>
          <motion.p 
            className="text-sm"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            Ready to fuel your day?
          </motion.p>
        </div>

        {/* AI Text Input Box - Moved here below header */}
        <motion.div
          className="mb-8 flex-shrink-0"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            type: "spring",
            damping: 25,
            stiffness: 300,
            delay: 0.15
          }}
        >
          <form onSubmit={handleAISubmit}>
            <div
              className="relative rounded-2xl shadow-lg transition-all duration-300 w-full"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: `2px solid ${isAITextboxFocused ? '#4A90E2' : 'var(--border)'}`,
                boxShadow: isAITextboxFocused 
                  ? '0 20px 40px rgba(74, 144, 226, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1)' 
                  : '0 8px 25px rgba(0, 0, 0, 0.08)',
                transform: isAITextboxFocused ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)'
              }}
            >
              {/* Input Field */}
              <div className="flex items-center gap-3 p-4">
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
                  style={{ backgroundColor: 'var(--btn-primary-bg)' }}
                >
                  <MessageCircle size={16} style={{ color: 'var(--btn-primary-text)' }} />
                </div>
                
                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAIInput(e.target.value)}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder="Ask me about nutrition, workouts, or goals..."
                  className="flex-1 bg-transparent outline-none text-base min-w-0"
                  style={{
                    color: 'var(--text-primary)',
                    fontSize: '16px'
                  }}
                  disabled={isTyping}
                />
                
                <motion.button
                  type="submit"
                  disabled={!aiInput.trim() || isTyping}
                  className="flex items-center justify-center w-8 h-8 rounded-full transition-colors flex-shrink-0"
                  style={{
                    backgroundColor: (aiInput.trim() && !isTyping) ? '#4A90E2' : 'var(--btn-secondary-bg)',
                    color: (aiInput.trim() && !isTyping) ? '#FFFFFF' : 'var(--text-placeholder)',
                    cursor: (aiInput.trim() && !isTyping) ? 'pointer' : 'not-allowed'
                  }}
                  whileTap={{ scale: (aiInput.trim() && !isTyping) ? 0.95 : 1 }}
                  animate={isTyping ? {
                    rotate: 360,
                  } : {}}
                  transition={{
                    duration: isTyping ? 1 : 0.2,
                    repeat: isTyping ? Infinity : 0,
                    ease: "linear"
                  }}
                >
                  <Send size={14} />
                </motion.button>
              </div>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  className="px-4 pb-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: 'var(--btn-primary-bg)' }}
                          animate={{
                            y: [0, -4, 0],
                            opacity: [0.4, 1, 0.4]
                          }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                    <span>AI is thinking...</span>
                  </div>
                </motion.div>
              )}
            </div>
          </form>
        </motion.div>

        {/* Scrollable Content - Ensure no horizontal overflow */}
        <div 
          ref={scrollRef}
          className="flex-1 min-h-0 overflow-y-auto scrollbar-hidden pb-8 overflow-x-hidden"
          style={{
            filter: isAITextboxFocused ? 'blur(8px)' : 'none',
            transform: isAITextboxFocused ? 'scale(0.98)' : 'scale(1)',
            transition: 'all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            opacity: isAITextboxFocused ? 0.7 : 1,
          }}
        >
          <div className="space-y-8 w-full">
            {/* Today's Summary - Updated Component with 2-row layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="w-full"
            >
              <TodaysSummary />
            </motion.div>

            {/* Coach Tips - Reverted to horizontal swipe style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="w-full overflow-hidden"
            >
              <CoachTips />
            </motion.div>

            {/* Your Day Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="w-full"
            >
              <YourDaySection 
                events={baseEvents}
                onEventClick={onEventClick}
                onExpandClick={onExpandClick}
                onDailyViewOpen={onDailyViewOpen}
                onAITextboxFocus={onAITextboxFocus}
                isAITextboxFocused={isAITextboxFocused}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}