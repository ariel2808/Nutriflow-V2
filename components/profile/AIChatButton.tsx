import React from 'react';
import { motion } from 'motion/react';
import { AILogo } from './AILogo';

interface AIChatButtonProps {
  onOpenChat?: () => void;
  hasUnreadMessages?: boolean;
  disabled?: boolean;
}

export function AIChatButton({ onOpenChat, hasUnreadMessages = false, disabled = false }: AIChatButtonProps) {
  return (
    <div className="relative">
      {/* AI Logo with built-in click functionality */}
      <AILogo 
        size={32} 
        onClick={onOpenChat} 
        disabled={disabled}
        className="transition-all duration-200"
      />
      
      {/* Unread indicator */}
      {hasUnreadMessages && !disabled && (
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900 pointer-events-none"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </div>
  );
}