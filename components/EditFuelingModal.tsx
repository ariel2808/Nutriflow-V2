import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Mic, Edit3, Droplet } from 'lucide-react';
import { Event, FuelingPlan } from '../App';
import { AILogo } from './profile/AILogo';

interface EditFuelingModalProps {
  isOpen: boolean;
  onClose: () => void;
  workout: Event;
  fuelingPlan: FuelingPlan;
  onAIEdit: (instructions: string) => void;
  onManualEdit: () => void;
}

export function EditFuelingModal({ 
  isOpen, 
  onClose, 
  workout,
  fuelingPlan,
  onAIEdit, 
  onManualEdit 
}: EditFuelingModalProps) {
  const [aiInput, setAiInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSendAIRequest = () => {
    if (aiInput.trim()) {
      onAIEdit(aiInput.trim());
      setAiInput('');
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendAIRequest();
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Future: Implement speech recognition
    console.log('Voice input toggle:', !isListening);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          className="relative w-full max-w-sm mx-auto rounded-t-3xl shadow-2xl"
          style={{ backgroundColor: 'var(--bg-main)' }}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 300,
            duration: 0.3
          }}
        >
          {/* Grid Background */}
          <div 
            className="absolute inset-0 opacity-20 rounded-t-3xl"
            style={{
              backgroundImage: `
                linear-gradient(to right, var(--graph-grid) 1px, transparent 1px),
                linear-gradient(to bottom, var(--graph-grid) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />

          {/* Handle bar */}
          <div className="relative z-10 flex justify-center pt-3 pb-2">
            <div 
              className="w-12 h-1 rounded-full"
              style={{ backgroundColor: 'var(--border)' }}
            />
          </div>

          {/* Close button */}
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 transition-colors z-10"
            style={{ color: 'var(--icon-secondary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--icon-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--icon-secondary)';
            }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={20} />
          </motion.button>

          <div className="relative z-10 px-6 pb-8">
            {/* Workout Preview Card */}
            <motion.div
              className="mb-6 p-4 rounded-2xl opacity-75"
              style={{ backgroundColor: 'var(--bg-card)' }}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.75 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Droplet size={18} style={{ color: '#F97316' }} />
                </div>
                <div className="flex-1">
                  <h3 
                    className="text-sm"
                    style={{ 
                      color: 'var(--text-secondary)',
                      fontWeight: 'var(--font-weight-normal)'
                    }}
                  >
                    Fueling Plan
                  </h3>
                  <p 
                    className="text-xs"
                    style={{ color: 'var(--text-placeholder)' }}
                  >
                    {workout.title} • {workout.duration || 60} min • {workout.intensity || 'MEDIUM'}
                  </p>
                  <p 
                    className="text-xs mt-1"
                    style={{ color: 'var(--text-placeholder)' }}
                  >
                    Before, During & After phases
                  </p>
                </div>
              </div>
            </motion.div>

            {/* AI Chat Bubble */}
            <motion.div
              className="mb-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* AI Message */}
              <div className="mb-4">
                <div 
                  className="inline-block max-w-[85%] rounded-2xl rounded-tl-lg px-4 py-3 shadow-sm"
                  style={{ backgroundColor: 'var(--bg-card)' }}
                >
                  <p 
                    className="text-sm"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    How would you like to adjust the fueling plan for this session?
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2 ml-2">
                  <AILogo size={20} />
                  <span 
                    className="text-xs"
                    style={{ color: 'var(--text-placeholder)' }}
                  >
                    AI Assistant
                  </span>
                </div>
              </div>

              {/* Input Field */}
              <div className="relative">
                <textarea
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="e.g., 'Reduce sodium intake' or 'Add more carbs during'..."
                  className="w-full rounded-2xl px-4 py-3 pr-20 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all min-h-[48px] max-h-32"
                  style={{
                    backgroundColor: 'var(--input-bg)',
                    border: '1px solid var(--input-border)',
                    color: 'var(--input-text)',
                    height: 'auto',
                    minHeight: '48px'
                  }}
                  rows={1}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                  }}
                />
                
                {/* Action buttons */}
                <div className="absolute right-2 bottom-2 flex items-center gap-1">
                  <motion.button
                    onClick={toggleListening}
                    className="p-2 rounded-xl transition-colors"
                    style={{
                      backgroundColor: isListening ? '#EF4444' : 'transparent',
                      color: isListening ? '#FFFFFF' : 'var(--icon-secondary)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isListening) {
                        e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                        e.currentTarget.style.color = 'var(--icon-primary)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isListening) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--icon-secondary)';
                      }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mic size={16} />
                  </motion.button>
                  
                  <motion.button
                    onClick={handleSendAIRequest}
                    disabled={!aiInput.trim()}
                    className="p-2 rounded-xl transition-colors"
                    style={{
                      backgroundColor: aiInput.trim() ? '#F97316' : 'transparent',
                      color: aiInput.trim() ? '#FFFFFF' : 'var(--text-placeholder)',
                      cursor: aiInput.trim() ? 'pointer' : 'not-allowed'
                    }}
                    onMouseEnter={(e) => {
                      if (aiInput.trim()) {
                        e.currentTarget.style.backgroundColor = '#EA580C';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (aiInput.trim()) {
                        e.currentTarget.style.backgroundColor = '#F97316';
                      }
                    }}
                    whileTap={{ scale: aiInput.trim() ? 0.95 : 1 }}
                  >
                    <Send size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Manual Edit Button */}
            <motion.div
              className="flex justify-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                onClick={() => {
                  onManualEdit();
                  onClose();
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl transition-colors"
                style={{
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                  e.currentTarget.style.borderColor = 'var(--icon-secondary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Edit3 size={16} />
                <span>Manual Edit</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}