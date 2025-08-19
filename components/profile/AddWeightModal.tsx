import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar } from 'lucide-react';

export interface WeightEntry {
  id: string;
  date: string;
  weight: number;
  timestamp: number;
}

interface AddWeightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWeight: (weight: number, date: string) => void;
}

export function AddWeightModal({ isOpen, onClose, onAddWeight }: AddWeightModalProps) {
  const [weight, setWeight] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const handleSubmit = () => {
    if (weight && date) {
      onAddWeight(parseFloat(weight), date);
      setWeight('');
      setDate(new Date().toISOString().split('T')[0]);
      onClose();
    }
  };

  const handleCancel = () => {
    setWeight('');
    setDate(new Date().toISOString().split('T')[0]);
    onClose();
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

          {/* Header */}
          <div 
            className="relative z-10 p-6 border-b"
            style={{ borderBottomColor: 'var(--border)' }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl" style={{ color: 'var(--text-primary)' }}>Add Measurement</h2>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Record your current weight</p>
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

          {/* Content */}
          <div className="relative z-10 p-6">
            <div className="space-y-6">
              {/* Weight Input */}
              <div>
                <label 
                  className="block text-sm mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="78.0"
                  step="0.1"
                  className="w-full px-4 py-3 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{
                    backgroundColor: 'var(--input-bg)',
                    border: '1px solid var(--input-border)',
                    color: 'var(--input-text)'
                  }}
                  autoFocus
                />
              </div>

              {/* Date Input */}
              <div>
                <label 
                  className="block text-sm mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                    style={{
                      backgroundColor: 'var(--input-bg)',
                      border: '1px solid var(--input-border)',
                      color: 'var(--input-text)'
                    }}
                  />
                  <Calendar 
                    size={20} 
                    className="absolute right-4 top-3.5 pointer-events-none"
                    style={{ color: 'var(--icon-secondary)' }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 justify-center">
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
                  onClick={handleSubmit}
                  disabled={!weight || !date}
                  className="px-6 py-2.5 rounded-full text-sm transition-colors"
                  style={{
                    backgroundColor: weight && date ? '#4A90E2' : 'var(--text-placeholder)',
                    color: '#FFFFFF',
                    cursor: weight && date ? 'pointer' : 'not-allowed'
                  }}
                  onMouseEnter={(e) => {
                    if (weight && date) {
                      e.currentTarget.style.backgroundColor = '#3A7BD5';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (weight && date) {
                      e.currentTarget.style.backgroundColor = '#4A90E2';
                    }
                  }}
                >
                  Add Weight
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}