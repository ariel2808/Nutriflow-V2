import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

interface DarkModeToggleProps {
  isDark: boolean;
  onToggle: (isDark: boolean) => void;
}

export function DarkModeToggle({ isDark, onToggle }: DarkModeToggleProps) {
  const handleToggle = () => {
    onToggle(!isDark);
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="flex items-center gap-2 p-1 rounded-full bg-gray-100 dark:bg-gray-800 transition-colors"
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Toggle Track */}
      <div className="relative w-10 h-6 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors">
        {/* Toggle Indicator */}
        <motion.div
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center"
          animate={{
            x: isDark ? 18 : 2,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        >
          {/* Icon inside toggle */}
          <motion.div
            key={isDark ? 'moon' : 'sun'}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            {isDark ? (
              <Moon size={12} className="text-slate-600" />
            ) : (
              <Sun size={12} className="text-yellow-500" />
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.button>
  );
}