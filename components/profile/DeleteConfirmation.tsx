import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2 } from 'lucide-react';

interface DeleteConfirmationProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmation({ isVisible, onConfirm, onCancel }: DeleteConfirmationProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
        className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } }}
        onClick={onCancel}
      >
        <motion.div 
          className="rounded-2xl p-6 shadow-xl max-w-xs w-full relative z-10"
          style={{
            backgroundColor: 'var(--bg-main)',
            border: '1px solid var(--border)'
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ 
            scale: 0.8, 
            opacity: 0,
            transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={20} className="text-red-600" />
            </div>
            <h3 className="text-lg mb-2" style={{ color: 'var(--text-primary)' }}>Delete Supplement?</h3>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={onCancel}
                className="px-6 py-2.5 rounded-full text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  color: 'var(--btn-secondary-text)',
                  backgroundColor: 'var(--btn-secondary-bg)',
                  focusRingColor: 'var(--border)'
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
                onClick={onConfirm}
                className="px-6 py-2.5 text-white bg-red-500 rounded-full text-sm hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
              >
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}