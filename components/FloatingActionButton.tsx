import React from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
  className?: string;
  isDarkMode?: boolean;
}

export function FloatingActionButton({ onClick, className = '', isDarkMode = false }: FloatingActionButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`fixed bottom-28 right-6 w-14 h-14 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center z-40 transition-all duration-200 ${className}`}
      style={{
        backgroundColor: 'var(--fab-bg)',
        color: 'var(--btn-primary-text)',
        boxShadow: isDarkMode ? '0 10px 25px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)' : '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      }}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        type: 'spring',
        damping: 15,
        stiffness: 300
      }}
    >
      <motion.div
        animate={{ rotate: 0 }}
        whileTap={{ rotate: 45 }}
        transition={{ duration: 0.2 }}
      >
        <Plus size={24} style={{ color: 'var(--btn-primary-text)' }} />
      </motion.div>
    </motion.button>
  );
}