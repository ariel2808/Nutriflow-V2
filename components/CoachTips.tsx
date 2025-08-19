import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Droplets, 
  Leaf, 
  Dumbbell, 
  Moon, 
  Zap, 
  ArrowRight 
} from 'lucide-react';

interface TipCard {
  id: string;
  category: string;
  icon: React.ReactNode;
  borderColor: string;
  backgroundColor: string;
  message: string;
  actionText: string;
  actionIcon?: React.ReactNode;
}

interface CoachTipsProps {
  className?: string;
}

export function CoachTips({ className = '' }: CoachTipsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const tips: TipCard[] = [
    {
      id: 'hydration',
      category: 'HYDRATION',
      icon: <Droplets size={20} />,
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.05)',
      message: "You're 0.8L behind your daily goal. Drink 300ml now to stay on track.",
      actionText: 'Set Reminder',
      actionIcon: <ArrowRight size={14} />
    },
    {
      id: 'nutrition',
      category: 'NUTRITION', 
      icon: <Leaf size={20} />,
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.05)',
      message: "Great protein intake today! Consider adding carbs before your 5pm workout.",
      actionText: 'View Suggestions',
      actionIcon: <ArrowRight size={14} />
    },
    {
      id: 'training',
      category: 'TRAINING',
      icon: <Dumbbell size={20} />,
      borderColor: '#F97316',
      backgroundColor: 'rgba(249, 115, 22, 0.05)',
      message: "Your running pace improved 12% this week. Ready for a tempo run challenge?",
      actionText: 'Plan Workout',
      actionIcon: <ArrowRight size={14} />
    },
    {
      id: 'recovery',
      category: 'RECOVERY',
      icon: <Moon size={20} />,
      borderColor: '#8B5CF6',
      backgroundColor: 'rgba(139, 92, 246, 0.05)',
      message: "You slept 6.5h last night. Consider an early bedtime for better recovery.",
      actionText: 'Sleep Tips',
      actionIcon: <ArrowRight size={14} />
    }
  ];

  // Handle scroll and update active index
  const handleScroll = () => {
    if (!scrollRef.current) return;
    
    const scrollLeft = scrollRef.current.scrollLeft;
    const cardWidth = 280 + 12; // card width + gap
    const newIndex = Math.round(scrollLeft / cardWidth);
    
    if (newIndex !== activeIndex) {
      setActiveIndex(Math.max(0, Math.min(newIndex, tips.length - 1)));
    }
  };

  // Scroll to specific index
  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    
    const cardWidth = 280 + 12; // card width + gap
    const scrollLeft = index * cardWidth;
    
    scrollRef.current.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
    setActiveIndex(index);
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', handleScroll);
      return () => ref.removeEventListener('scroll', handleScroll);
    }
  }, [activeIndex]);

  const handleCardClick = (tip: TipCard) => {
    console.log(`Coach tip action: ${tip.id} - ${tip.actionText}`);
    // TODO: Implement specific actions for each tip type
  };

  return (
    <motion.div
      className={`${className} overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
    >
      {/* Section Header */}
      <div className="mb-6" style={{ marginBottom: '24px' }}>
        <div className="flex items-center gap-2 mb-1">
          <h2 
            className="text-lg"
            style={{ 
              fontSize: '18px',
              fontWeight: '600',
              color: 'var(--text-primary)',
              lineHeight: '1.3'
            }}
          >
            Coach Tips
          </h2>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0] 
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Zap size={16} style={{ color: '#4A90E2' }} />
          </motion.div>
        </div>
        <p 
          className="text-sm"
          style={{ 
            fontSize: '14px',
            color: 'var(--text-secondary)',
            margin: '0',
            lineHeight: '1.4'
          }}
        >
          Personalized recommendations for you
        </p>
      </div>

      {/* Horizontal Scrollable Cards Container - Reverted */}
      <div className="relative overflow-hidden">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hidden gap-3"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            paddingBottom: '8px',
            // Ensure cards don't overflow container
            maxWidth: '100%'
          }}
        >
          {tips.map((tip, index) => (
            <motion.div
              key={tip.id}
              className="flex-shrink-0 cursor-pointer"
              style={{
                width: '280px',
                scrollSnapAlign: 'start'
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.3 + (index * 0.1),
                ease: "easeOut"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCardClick(tip)}
            >
              <div
                className="rounded-2xl p-4 h-full transition-all duration-200"
                style={{
                  backgroundColor: tip.backgroundColor,
                  borderLeft: `4px solid ${tip.borderColor}`,
                  borderRadius: '16px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.08)',
                  minHeight: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0px)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.08)';
                }}
              >
                {/* Top row: Icon + Category */}
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="flex items-center justify-center flex-shrink-0"
                    style={{ color: tip.borderColor }}
                  >
                    {tip.icon}
                  </div>
                  <span
                    className="text-xs font-medium tracking-wider"
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {tip.category}
                  </span>
                </div>

                {/* Main message */}
                <p
                  className="text-sm leading-relaxed mb-4 flex-grow"
                  style={{
                    fontSize: '14px',
                    fontWeight: '400',
                    color: 'var(--text-primary)',
                    lineHeight: '1.5',
                    margin: '0 0 16px 0'
                  }}
                >
                  {tip.message}
                </p>

                {/* Action button */}
                <button
                  className="flex items-center gap-2 text-sm font-medium transition-colors"
                  style={{
                    color: '#4A90E2',
                    fontSize: '14px',
                    background: 'none',
                    border: 'none',
                    padding: '0',
                    cursor: 'pointer',
                    alignSelf: 'flex-start'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#3A7BD5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#4A90E2';
                  }}
                >
                  <span>{tip.actionText}</span>
                  {tip.actionIcon}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {tips.map((_, index) => (
            <button
              key={index}
              className="w-2 h-2 rounded-full transition-all duration-200"
              style={{
                backgroundColor: index === activeIndex ? '#4A90E2' : 'var(--text-placeholder)',
                opacity: index === activeIndex ? 1 : 0.4,
                cursor: 'pointer',
                border: 'none',
                padding: '0'
              }}
              onClick={() => scrollToIndex(index)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}