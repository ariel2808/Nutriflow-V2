import React from 'react';
import { Home, Calendar, Lightbulb, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen } from '../App';

interface BottomNavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  isAITextboxFocused?: boolean;
}

export function BottomNavigation({ currentScreen, onNavigate, isAITextboxFocused = false }: BottomNavigationProps) {
  const navItems = [
    { id: 'home' as Screen, icon: Home, label: 'Home' },
    { id: 'calendar' as Screen, icon: Calendar, label: 'Calendar' },
    { id: 'insights' as Screen, icon: Lightbulb, label: 'Insights' },
    { id: 'profile' as Screen, icon: User, label: 'Profile' }
  ];

  return (
    <div 
      className="bottom-navigation fixed bottom-0 left-0 right-0 w-full z-50 transition-all duration-300"
      style={{
        backgroundColor: 'var(--bg-main)',
        borderTop: '1px solid var(--border)',
        borderLeft: 'none',
        borderRight: 'none',
        borderBottom: 'none',
        boxShadow: '0 -1px 3px 0 rgba(0, 0, 0, 0.1), 0 -1px 2px 0 rgba(0, 0, 0, 0.06)',
        filter: isAITextboxFocused ? 'blur(8px)' : 'none',
        transform: isAITextboxFocused ? 'scale(1.02)' : 'scale(1)',
        pointerEvents: isAITextboxFocused ? 'none' : 'auto',
      }}
    >
      <div className="flex justify-around items-center py-3 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="relative flex items-center justify-center rounded-full transition-all duration-300 ease-out"
              whileTap={{ scale: 0.95 }}
              style={{ minWidth: '40px', height: '40px' }}
            >
              {/* Content container with horizontal layout */}
              <motion.div 
                className="flex items-center gap-2 px-3 py-2 rounded-full"
                animate={{
                  width: isActive ? 'auto' : '40px'
                }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300
                }}
              >
                {/* Icon */}
                <Icon 
                  size={20} 
                  className="flex-shrink-0 transition-colors duration-200"
                  style={{ 
                    color: isActive ? '#FBBF24' : 'var(--icon-secondary)'
                  }}
                />
                
                {/* Label with smooth horizontal animation */}
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.span
                      initial={{ 
                        opacity: 0, 
                        width: 0,
                        marginLeft: -8
                      }}
                      animate={{ 
                        opacity: 1, 
                        width: 'auto',
                        marginLeft: 0,
                        transition: {
                          opacity: { delay: 0.1, duration: 0.2 },
                          width: { type: "spring", damping: 25, stiffness: 300 },
                          marginLeft: { type: "spring", damping: 25, stiffness: 300 }
                        }
                      }}
                      exit={{ 
                        opacity: 0, 
                        width: 0,
                        marginLeft: -8,
                        transition: {
                          opacity: { duration: 0.1 },
                          width: { duration: 0.2 },
                          marginLeft: { duration: 0.2 }
                        }
                      }}
                      className="text-sm whitespace-nowrap overflow-hidden"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}