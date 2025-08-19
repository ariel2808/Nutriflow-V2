import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { User, ChevronRight, ChevronLeft } from 'lucide-react';

interface CoachTip {
  id: string;
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  timing?: string;
}

interface SmartCoachSliderProps {
  isAITextboxFocused?: boolean;
}

export function SmartCoachSlider({ isAITextboxFocused = false }: SmartCoachSliderProps) {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [autoAdvanceEnabled, setAutoAdvanceEnabled] = useState(true);
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastInteractionRef = useRef<number>(Date.now());

  // Sample coach tips - ordered by priority (high first)
  const coachTips: CoachTip[] = [
    {
      id: 'immediate',
      title: 'Immediate Action',
      message: 'Swim at 17:00? Fuel at 16:15 – shortcut to add snack/drink.',
      priority: 'high',
      timing: 'Now'
    },
    {
      id: 'hydration',
      title: 'Hot Day Adjustment',
      message: 'Temperature 22°C – increase hydration target by +500ml/hour.',
      priority: 'medium',
      timing: 'Throughout day'
    },
    {
      id: 'recovery',
      title: 'Two Workouts Today',
      message: 'Add recovery snack midday: 30g carbs + 20g protein = 1 banana + Greek yogurt.',
      priority: 'medium',
      timing: 'Midday'
    },
    {
      id: 'nutrition',
      title: 'Protein Distribution',
      message: 'You\'re 15g behind on protein. Consider adding Greek yogurt to your afternoon snack.',
      priority: 'low',
      timing: 'Afternoon'
    },
    {
      id: 'performance',
      title: 'Pre-Workout Fuel',
      message: 'For your 17:00 swim, have a banana 30-45 minutes before for optimal energy.',
      priority: 'medium',
      timing: '16:15'
    }
  ];

  // Auto-advance functionality
  const resetAutoAdvanceTimer = useCallback(() => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
    }
    
    if (autoAdvanceEnabled && coachTips.length > 1) {
      autoAdvanceTimerRef.current = setTimeout(() => {
        // Only auto-advance if user hasn't interacted recently
        const timeSinceLastInteraction = Date.now() - lastInteractionRef.current;
        if (timeSinceLastInteraction >= 6000) { // 6 seconds
          setCurrentTipIndex((prev) => (prev + 1) % coachTips.length);
        } else {
          // Reset timer for another attempt
          resetAutoAdvanceTimer();
        }
      }, 8000); // 8 seconds
    }
  }, [autoAdvanceEnabled, coachTips.length]);

  // Setup auto-advance
  useEffect(() => {
    resetAutoAdvanceTimer();
    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
    };
  }, [resetAutoAdvanceTimer, currentTipIndex]);

  // Handle user interaction
  const handleUserInteraction = useCallback(() => {
    lastInteractionRef.current = Date.now();
    setAutoAdvanceEnabled(false);
    
    // Re-enable auto-advance after 10 seconds of no interaction
    setTimeout(() => {
      setAutoAdvanceEnabled(true);
    }, 10000);
  }, []);

  // Navigation functions
  const goToTip = (index: number) => {
    handleUserInteraction();
    setCurrentTipIndex(index);
  };

  const goToPrevious = () => {
    handleUserInteraction();
    setCurrentTipIndex((prev) => (prev - 1 + coachTips.length) % coachTips.length);
  };

  const goToNext = () => {
    handleUserInteraction();
    setCurrentTipIndex((prev) => (prev + 1) % coachTips.length);
  };

  // Handle pan/swipe gestures
  const handlePanEnd = (event: any, info: PanInfo) => {
    const threshold = 50;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (Math.abs(offset) > threshold || Math.abs(velocity) > 500) {
      if (offset > 0 || velocity > 0) {
        goToPrevious();
        setDragDirection('right');
      } else {
        goToNext();
        setDragDirection('left');
      }
    }

    // Reset drag direction after animation
    setTimeout(() => setDragDirection(null), 300);
  };

  const currentTip = coachTips[currentTipIndex];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#FF3B30';
      case 'medium':
        return 'var(--graph-data)';
      case 'low':
        return '#34C759';
      default:
        return 'var(--graph-data)';
    }
  };

  const getPriorityBgColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'rgba(255, 59, 48, 0.08)';
      case 'medium':
        return 'rgba(74, 144, 226, 0.08)';
      case 'low':
        return 'rgba(52, 199, 89, 0.08)';
      default:
        return 'rgba(74, 144, 226, 0.08)';
    }
  };

  const getPriorityBorderColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'rgba(255, 59, 48, 0.2)';
      case 'medium':
        return 'rgba(74, 144, 226, 0.2)';
      case 'low':
        return 'rgba(52, 199, 89, 0.2)';
      default:
        return 'rgba(74, 144, 226, 0.2)';
    }
  };

  if (coachTips.length === 0) return null;

  return (
    <div 
      className="transition-all duration-300 mb-6"
      style={{
        filter: isAITextboxFocused ? 'blur(8px)' : 'none',
        transform: isAITextboxFocused ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg" style={{ color: 'var(--text-primary)' }}>
          Smart Coach
        </h2>
        {coachTips.length > 1 && (
          <div className="flex items-center gap-2">
            {/* Desktop Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="hidden sm:flex w-8 h-8 rounded-full items-center justify-center transition-colors"
              style={{
                backgroundColor: 'var(--bg-card)',
                color: 'var(--icon-secondary)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                e.currentTarget.style.color = 'var(--icon-secondary)';
              }}
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={goToNext}
              className="hidden sm:flex w-8 h-8 rounded-full items-center justify-center transition-colors"
              style={{
                backgroundColor: 'var(--bg-card)',
                color: 'var(--icon-secondary)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                e.currentTarget.style.color = 'var(--icon-secondary)';
              }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Slider Container */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onPanEnd={handlePanEnd}
          animate={{
            x: `-${currentTipIndex * 100}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.25
          }}
        >
          {coachTips.map((tip, index) => (
            <motion.div
              key={tip.id}
              className="w-full flex-shrink-0 px-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: index === currentTipIndex ? 1 : 0.7,
                scale: index === currentTipIndex ? 1 : 0.95
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="rounded-xl p-5 cursor-pointer transition-all duration-200"
                style={{
                  backgroundColor: getPriorityBgColor(tip.priority),
                  border: `1px solid ${getPriorityBorderColor(tip.priority)}`,
                  boxShadow: index === currentTipIndex 
                    ? '0 4px 16px rgba(0, 0, 0, 0.08)' 
                    : '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => goToTip(index)}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: getPriorityColor(tip.priority) }}
                  >
                    <User size={16} color="#FFFFFF" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 
                        className="text-sm truncate"
                        style={{ 
                          color: 'var(--text-primary)',
                          fontWeight: 600
                        }}
                      >
                        {tip.title}
                      </h4>

                    </div>
                    <p 
                      className="text-sm leading-relaxed mb-3"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {tip.message}
                    </p>
                  </div>
                  <ChevronRight 
                    size={16} 
                    className="flex-shrink-0 mt-1"
                    style={{ color: 'var(--icon-secondary)' }}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Dot Indicators */}
      {coachTips.length > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          {coachTips.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToTip(index)}
              className="transition-all duration-200"
              style={{
                width: index === currentTipIndex ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: index === currentTipIndex 
                  ? 'var(--graph-data)' 
                  : 'var(--border)',
              }}
              whileHover={{
                backgroundColor: index === currentTipIndex 
                  ? 'var(--graph-data)' 
                  : 'var(--icon-secondary)',
                scale: 1.1
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                width: index === currentTipIndex ? '24px' : '8px',
                backgroundColor: index === currentTipIndex 
                  ? 'var(--graph-data)' 
                  : 'var(--border)',
              }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>
      )}

      {/* Auto-advance indicator (subtle) */}
      {autoAdvanceEnabled && coachTips.length > 1 && (
        <motion.div
          className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          initial={{ width: '0%', opacity: 0 }}
          animate={{ width: '100%', opacity: 0.3 }}
          transition={{ 
            duration: 8,
            ease: "linear",
            repeat: Infinity,
            repeatType: "restart"
          }}
          style={{ borderRadius: '1px' }}
        />
      )}
    </div>
  );
}