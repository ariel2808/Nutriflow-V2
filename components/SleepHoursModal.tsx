import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Moon } from 'lucide-react';

interface SleepHoursModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentHours: number;
  onSave: (hours: number) => void;
}

export function SleepHoursModal({ isOpen, onClose, currentHours, onSave }: SleepHoursModalProps) {
  const [sleepHours, setSleepHours] = useState(currentHours);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const minHours = 4;
  const maxHours = 10;
  const trackWidth = 240; // Fixed track width in pixels

  // Convert hours to position percentage
  const hoursToPosition = useCallback((hours: number) => {
    return ((hours - minHours) / (maxHours - minHours)) * 100;
  }, []);

  // Convert position to hours
  const positionToHours = useCallback((position: number) => {
    const hours = minHours + (position / 100) * (maxHours - minHours);
    return Math.round(hours * 2) / 2; // Round to nearest 0.5
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    handleMouseMove(e);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent | MouseEvent) => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const newHours = positionToHours(position);
    
    setSleepHours(newHours);
  }, [positionToHours]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    handleTouchMove(touch);
  }, []);

  const handleTouchMove = useCallback((touch: Touch) => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const newHours = positionToHours(position);
    
    setSleepHours(newHours);
  }, [positionToHours]);

  const handleTouchMoveEvent = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleTouchMove(touch);
  }, [handleTouchMove]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Global mouse event listeners
  React.useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => handleMouseMove(e);
      const handleGlobalMouseUp = () => setIsDragging(false);

      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, handleMouseMove]);

  const handleSave = () => {
    onSave(sleepHours);
    onClose();
  };

  const handleCancel = () => {
    setSleepHours(currentHours);
    onClose();
  };

  const currentPosition = hoursToPosition(sleepHours);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeInOut" } }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-sm rounded-2xl shadow-2xl"
            style={{ 
              backgroundColor: 'var(--bg-main)',
              border: '1px solid var(--border)'
            }}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ 
              scale: 0.85, 
              opacity: 0, 
              y: 30,
              transition: { 
                duration: 0.25, 
                ease: [0.4, 0, 0.2, 1],
                scale: { duration: 0.2 },
                opacity: { duration: 0.15 }
              }
            }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grid Background */}
            <div 
              className="absolute inset-0 opacity-20 rounded-2xl"
              style={{
                backgroundImage: `
                  linear-gradient(to right, var(--graph-grid) 1px, transparent 1px),
                  linear-gradient(to bottom, var(--graph-grid) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full transition-colors z-20"
              style={{ color: 'var(--icon-secondary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                e.currentTarget.style.color = 'var(--icon-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--icon-secondary)';
              }}
            >
              <X size={18} />
            </button>

            {/* Content */}
            <div className="relative z-10 p-6 text-center">
              {/* Header */}
              <div className="mb-8">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Moon size={24} className="text-purple-600" />
                  </div>
                </div>
                <h2 className="text-xl mb-1" style={{ color: 'var(--text-primary)' }}>Average Sleep Hours</h2>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Drag to adjust your nightly goal</p>
              </div>

              {/* Current Value Display */}
              <div className="mb-8">
                <motion.div 
                  className="text-4xl mb-1"
                  style={{ color: 'var(--text-primary)' }}
                  key={sleepHours}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {sleepHours}h
                </motion.div>
                <p className="text-sm" style={{ color: 'var(--text-placeholder)' }}>per night</p>
              </div>

              {/* Interactive Sleep Graph */}
              <div className="mb-8 px-4">
                <div className="relative">
                  {/* Hour labels */}
                  <div className="flex justify-between text-xs mb-2" style={{ color: 'var(--text-placeholder)' }}>
                    <span>{minHours}h</span>
                    <span>{maxHours}h</span>
                  </div>

                  {/* Track */}
                  <div 
                    ref={trackRef}
                    className="relative h-2 rounded-full cursor-pointer"
                    style={{ 
                      width: trackWidth,
                      backgroundColor: 'var(--btn-secondary-bg)'
                    }}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMoveEvent}
                    onTouchEnd={handleTouchEnd}
                  >
                    {/* Progress fill */}
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-purple-600 rounded-full transition-all duration-200"
                      style={{ width: `${currentPosition}%` }}
                    />

                    {/* Draggable handle with ZZZ logo */}
                    <motion.div
                      className={`absolute w-8 h-8 border-2 border-purple-600 rounded-full shadow-md cursor-grab flex items-center justify-center ${
                        isDragging ? 'cursor-grabbing' : ''
                      } transition-all duration-200`}
                      style={{ 
                        backgroundColor: 'var(--bg-main)',
                        left: `${currentPosition}%`,
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 30
                      }}
                      animate={{ 
                        scale: isDragging ? 1.2 : 1,
                        boxShadow: isDragging 
                          ? '0 4px 12px rgba(147, 51, 234, 0.4)' 
                          : '0 2px 4px rgba(0, 0, 0, 0.1)'
                      }}
                      transition={{ duration: 0.15 }}
                    >
                      {/* ZZZ Sleep Logo */}
                      <div className="flex flex-col items-end space-y-[-1px] scale-75">
                        <span className="text-purple-600 text-[6px] leading-none opacity-50">z</span>
                        <span className="text-purple-600 text-[8px] leading-none opacity-75">z</span>
                        <span className="text-purple-600 text-[10px] leading-none opacity-100">z</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Tick marks */}
                  <div className="flex justify-between mt-1">
                    {[...Array(7)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-px h-2 rounded-full"
                        style={{ 
                          backgroundColor: 'var(--border)',
                          opacity: i % 2 === 0 ? 0.8 : 0.4
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2.5 rounded-full text-sm transition-colors"
                  style={{
                    backgroundColor: 'var(--btn-secondary-bg)',
                    color: 'var(--btn-secondary-text)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--btn-secondary-bg)';
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-purple-600 text-white rounded-full text-sm hover:bg-purple-700 transition-colors"
                >
                  Save Goal
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}