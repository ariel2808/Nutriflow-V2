import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Mic, User, Bot } from 'lucide-react';
import { AILogo } from './AILogo';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AIChatHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock chat history data
const mockChatHistory: ChatMessage[] = [
  {
    id: '1',
    type: 'user',
    content: 'How many calories should I eat today?',
    timestamp: new Date(2024, 11, 10, 14, 30)
  },
  {
    id: '2',
    type: 'ai',
    content: 'Based on your profile and today\'s workout, I recommend 2,400 calories with a focus on protein (150g) for muscle recovery.',
    timestamp: new Date(2024, 11, 10, 14, 31)
  },
  {
    id: '3',
    type: 'user',
    content: 'What supplements should I take before my workout?',
    timestamp: new Date(2024, 11, 10, 16, 15)
  },
  {
    id: '4',
    type: 'ai',
    content: 'For your strength training session, I suggest taking creatine (5g) and caffeine (200mg) about 30 minutes before. Your current supplements look good!',
    timestamp: new Date(2024, 11, 10, 16, 16)
  }
];

export function AIChatHistoryModal({ isOpen, onClose }: AIChatHistoryModalProps) {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(mockChatHistory);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: newMessage.trim(),
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Thanks for your question! I\'m here to help with your nutrition and fitness goals. Let me analyze your data and provide personalized recommendations.',
        timestamp: new Date()
      };
      
      setChatHistory(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

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
            transition={{ duration: 0.1, ease: "easeOut" }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-sm rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
            style={{ backgroundColor: 'var(--bg-main)' }}
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
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              duration: 0.3,
              delay: 0.05
            }}
          >
            {/* Grid Background */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(to right, var(--graph-grid) 1px, transparent 1px),
                  linear-gradient(to bottom, var(--graph-grid) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}
            />

            {/* Header */}
            <div 
              className="relative z-10 p-6 border-b"
              style={{ borderBottomColor: 'var(--border)' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AILogo size={32} />
                  <div>
                    <h2 className="text-xl" style={{ color: 'var(--text-primary)' }}>AI Assistant</h2>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Chat history</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full transition-colors"
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
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-4">
              {chatHistory.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 ${message.type === 'user' ? '' : ''}`}>
                      {message.type === 'user' ? (
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                          <User size={14} className="text-white" />
                        </div>
                      ) : (
                        <AILogo size={24} />
                      )}
                    </div>

                    {/* Message bubble */}
                    <div 
                      className={`rounded-2xl px-4 py-3 ${
                        message.type === 'user' ? 'rounded-tr-lg' : 'rounded-tl-lg'
                      }`}
                      style={{
                        backgroundColor: message.type === 'user' ? '#4A90E2' : 'var(--bg-card)',
                        color: message.type === 'user' ? '#FFFFFF' : 'var(--text-primary)'
                      }}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p 
                        className="text-xs mt-1"
                        style={{
                          color: message.type === 'user' ? 'rgba(255, 255, 255, 0.7)' : 'var(--text-placeholder)'
                        }}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start gap-2">
                    <AILogo size={24} />
                    <div 
                      className="rounded-2xl rounded-tl-lg px-4 py-3"
                      style={{ backgroundColor: 'var(--bg-card)' }}
                    >
                      <div className="flex space-x-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: 'var(--text-placeholder)' }}
                            animate={{
                              y: [0, -4, 0],
                            }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div 
              className="relative z-10 p-4 border-t"
              style={{ borderTopColor: 'var(--border)' }}
            >
              <div className="flex items-end gap-2">
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about nutrition, workouts, or goals..."
                    className="w-full rounded-2xl px-4 py-3 pr-12 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[48px] max-h-32"
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
                  
                  {/* Voice input button */}
                  <button 
                    className="absolute right-3 bottom-3 p-1 transition-colors"
                    style={{ color: 'var(--icon-secondary)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--icon-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--icon-secondary)';
                    }}
                  >
                    <Mic size={16} />
                  </button>
                </div>

                {/* Send button */}
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || isTyping}
                  className="p-3 rounded-2xl transition-colors"
                  style={{
                    backgroundColor: newMessage.trim() && !isTyping ? '#4A90E2' : 'var(--btn-secondary-bg)',
                    color: newMessage.trim() && !isTyping ? '#FFFFFF' : 'var(--text-placeholder)',
                    cursor: newMessage.trim() && !isTyping ? 'pointer' : 'not-allowed'
                  }}
                  onMouseEnter={(e) => {
                    if (newMessage.trim() && !isTyping) {
                      e.currentTarget.style.backgroundColor = '#3A7BD5';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (newMessage.trim() && !isTyping) {
                      e.currentTarget.style.backgroundColor = '#4A90E2';
                    }
                  }}
                  whileTap={{ scale: newMessage.trim() && !isTyping ? 0.95 : 1 }}
                >
                  <Send size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}