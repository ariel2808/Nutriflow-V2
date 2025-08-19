import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Mic, Edit3, Activity, Bike, Waves, Dumbbell } from 'lucide-react';

interface AddWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAIAdd: (instructions: string) => void;
  onManualAdd: () => void;
}

const workoutSuggestions = [
  { icon: Activity, label: 'Running', bg: 'bg-orange-100', color: 'text-orange-600' },
  { icon: Bike, label: 'Cycling', bg: 'bg-blue-100', color: 'text-blue-600' },
  { icon: Waves, label: 'Swimming', bg: 'bg-cyan-100', color: 'text-cyan-600' },
  { icon: Dumbbell, label: 'Strength', bg: 'bg-purple-100', color: 'text-purple-600' }
];

export function AddWorkoutModal({ 
  isOpen, 
  onClose, 
  onAIAdd, 
  onManualAdd 
}: AddWorkoutModalProps) {
  const [aiInput, setAiInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSendAIRequest = () => {
    if (aiInput.trim()) {
      onAIAdd(aiInput.trim());
      setAiInput('');
      onClose();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setAiInput(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendAIRequest();
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    console.log('Voice input toggle:', !isListening);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9995] flex items-end justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{ zIndex: 9995 }}
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
          className="relative w-full rounded-t-3xl shadow-2xl mx-6"
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
          {/* Handle bar */}
          <div className="flex justify-center pt-3 pb-2">
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

          <div className="px-6 pb-8">
            {/* AI Chat Bubble */}
            <motion.div
              className="mb-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {/* AI Message */}
              <div className="mb-4">
                <div 
                  className="inline-block max-w-[85%] rounded-2xl rounded-tl-lg px-4 py-3 shadow-sm"
                  style={{ backgroundColor: 'var(--bg-card)' }}
                >
                  <p style={{ color: 'var(--text-primary)' }}>
                    What workout would you like to add to your day?
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2 ml-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Activity size={12} className="text-white" />
                  </div>
                  <span 
                    className="text-xs"
                    style={{ color: 'var(--text-placeholder)' }}
                  >
                    Training Assistant
                  </span>
                </div>
              </div>

              {/* Quick Suggestions */}
              <motion.div
                className="mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p 
                  className="text-sm mb-3"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Quick suggestions:
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {workoutSuggestions.map((suggestion, index) => {
                    const IconComponent = suggestion.icon;
                    return (
                      <motion.button
                        key={suggestion.label}
                        onClick={() => handleSuggestionClick(suggestion.label)}
                        className="flex items-center gap-2 p-2 rounded-xl transition-colors"
                        style={{ 
                          backgroundColor: 'var(--bg-card)' 
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--btn-secondary-bg)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                        }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                      >
                        <div className={`w-8 h-8 ${suggestion.bg} rounded-lg flex items-center justify-center`}>
                          <IconComponent size={14} className={suggestion.color} />
                        </div>
                        <span 
                          className="text-sm"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {suggestion.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Input Field */}
              <motion.div
                className="relative"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <textarea
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe your workout..."
                  className="w-full rounded-2xl px-4 py-3 pr-20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[48px] max-h-32"
                  style={{
                    backgroundColor: 'var(--input-bg)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'var(--input-border)',
                    color: 'var(--input-text)'
                  }}
                  rows={1}
                  style={{
                    height: 'auto',
                    minHeight: '48px'
                  }}
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
                      backgroundColor: aiInput.trim() ? '#4A90E2' : 'transparent',
                      color: aiInput.trim() ? '#FFFFFF' : 'var(--text-placeholder)',
                      cursor: aiInput.trim() ? 'pointer' : 'not-allowed'
                    }}
                    onMouseEnter={(e) => {
                      if (aiInput.trim()) {
                        e.currentTarget.style.backgroundColor = '#3A7BD5';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (aiInput.trim()) {
                        e.currentTarget.style.backgroundColor = '#4A90E2';
                      }
                    }}
                    whileTap={{ scale: aiInput.trim() ? 0.95 : 1 }}
                  >
                    <Send size={16} />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>

            {/* Manual Add Button */}
            <motion.div
              className="flex justify-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={() => {
                  onManualAdd();
                  onClose();
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl transition-colors"
                style={{
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'var(--border)',
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
                <span>Manual Entry</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}