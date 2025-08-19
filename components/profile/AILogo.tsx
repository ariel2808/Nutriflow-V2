import React from 'react';
import { motion } from 'motion/react';

interface AILogoProps {
  size?: number;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function AILogo({ size = 24, className = "", onClick, disabled = false }: AILogoProps) {
  const isClickable = !!onClick && !disabled;

  const content = (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Main Chat Bubble Container */}
      <motion.div
        className="absolute inset-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden"
        whileHover={isClickable ? { scale: 1.05 } : {}}
        whileTap={isClickable ? { scale: 0.95 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        style={{
          cursor: isClickable ? 'pointer' : 'default',
          opacity: disabled ? 0.6 : 1
        }}
      >
        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e5e7eb 0.5px, transparent 0.5px),
              linear-gradient(to bottom, #e5e7eb 0.5px, transparent 0.5px)
            `,
            backgroundSize: '4px 4px'
          }}
        />
        
        {/* Chat Bubble Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            width={size * 0.6}
            height={size * 0.6}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Main chat bubble */}
            <motion.path
              d="M7 9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9C17 11.7614 14.7614 14 12 14H8L7 15V9Z"
              className="fill-blue-500"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300, duration: 0.4 }}
            />
            
            {/* Chat dots */}
            <motion.circle
              cx="10"
              cy="9"
              r="1"
              className="fill-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 400 }}
            />
            <motion.circle
              cx="12"
              cy="9"
              r="1"
              className="fill-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 400 }}
            />
            <motion.circle
              cx="14"
              cy="9"
              r="1"
              className="fill-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 400 }}
            />
          </svg>
        </div>

        {/* Subtle pulse animation */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div 
            className="w-1 h-1 bg-blue-400 rounded-full opacity-40"
            style={{
              filter: 'blur(0.5px)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Enhanced glow effect for clickable state */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none"
        animate={{
          opacity: isClickable ? [0.2, 0.4, 0.2] : [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Click ripple effect */}
      {isClickable && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(74, 144, 226, 0.3) 0%, transparent 70%)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 1.2, opacity: [0, 0.6, 0] }}
          transition={{ duration: 0.3 }}
        />
      )}
    </div>
  );

  if (isClickable) {
    return (
      <motion.button
        onClick={onClick}
        disabled={disabled}
        className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-xl"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: disabled ? 'not-allowed' : 'pointer'
        }}
      >
        {content}
      </motion.button>
    );
  }

  return content;
}