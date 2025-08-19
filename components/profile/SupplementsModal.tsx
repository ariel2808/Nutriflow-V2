import React, { useState } from 'react';
import { X, Plus, Edit, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Supplement } from './SupplementTypes';
import { SupplementCard } from './SupplementCard';
import { SupplementsEmptyState } from './SupplementsEmptyState';
import { DeleteConfirmation } from './DeleteConfirmation';
import { AddSupplementFlow } from './AddSupplementFlow';
import { getFormIcon } from './SupplementHelpers';

interface SupplementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplements: Supplement[];
  onUpdate: (supplements: Supplement[]) => void;
}

export function SupplementsModal({ isOpen, onClose, supplements, onUpdate }: SupplementsModalProps) {
  const [showAddFlow, setShowAddFlow] = useState(false);
  const [editingSupplement, setEditingSupplement] = useState<Supplement | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ supplement: Supplement } | null>(null);

  const handleAddSupplement = (supplement: Supplement) => {
    onUpdate([...supplements, supplement]);
    setShowAddFlow(false);
  };

  const handleEditSupplement = (supplement: Supplement) => {
    const updatedSupplements = supplements.map(s => 
      s.id === supplement.id ? supplement : s
    );
    onUpdate(updatedSupplements);
    setEditingSupplement(null);
  };

  const handleDeleteSupplement = (supplementId: string) => {
    const updatedSupplements = supplements.filter(s => s.id !== supplementId);
    onUpdate(updatedSupplements);
    setDeleteConfirmation(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } }}
      >
        <div className="flex items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 0.9, 
              y: 20,
              transition: { 
                duration: 0.25, 
                ease: [0.4, 0, 0.2, 1],
                scale: { duration: 0.2 },
                opacity: { duration: 0.15 }
              }
            }}
            className="w-full max-w-sm rounded-2xl shadow-xl overflow-hidden flex flex-col"
            style={{ 
              backgroundColor: 'var(--bg-main)',
              minHeight: '300px',
              maxHeight: '80vh'
            }}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between p-6 border-b"
              style={{ borderBottomColor: 'var(--border)' }}
            >
              <h2 className="text-xl" style={{ color: 'var(--text-primary)' }}>Supplements Used</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddFlow(true)}
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
                  <Plus size={20} />
                </button>
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
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(80vh - 100px)' }}>
              {supplements.length === 0 ? (
                <div className="flex items-center justify-center p-6" style={{ minHeight: '200px' }}>
                  <SupplementsEmptyState onAddSupplement={() => setShowAddFlow(true)} />
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {supplements.map((supplement) => (
                    <SupplementCard
                      key={supplement.id}
                      supplement={supplement}
                      onEdit={() => setEditingSupplement(supplement)}
                      onDelete={() => setDeleteConfirmation({ supplement })}
                      onUpdate={handleEditSupplement}
                    />
                  ))}
                </div>
              )}
            </div>

          </motion.div>
        </div>
      </motion.div>

      {/* Add Supplement Flow */}
      <AddSupplementFlow
        isOpen={showAddFlow}
        onClose={() => setShowAddFlow(false)}
        onSave={handleAddSupplement}
      />

      {/* Delete Confirmation */}
      {deleteConfirmation && (
        <DeleteConfirmation
          isVisible={true}
          onCancel={() => setDeleteConfirmation(null)}
          onConfirm={() => handleDeleteSupplement(deleteConfirmation.supplement.id)}
        />
      )}
        </>
      )}
    </AnimatePresence>
  );
}