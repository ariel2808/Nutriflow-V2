import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Edit2, Trash2 } from 'lucide-react';
import { Supplement } from './SupplementTypes';
import { supplementIcons, supplementColors } from './SupplementConstants';
import { formatDosageDisplay } from './SupplementHelpers';
import { EditSupplementModal } from '../EditSupplementModal';
import { ManualSupplementEditForm } from '../ManualSupplementEditForm';

interface SupplementCardProps {
  supplement: Supplement;
  onEdit: (supplement: Supplement) => void;
  onDelete: (supplementId: string) => void;
  onUpdate: (updatedSupplement: Supplement) => void;
}

export function SupplementCard({ supplement, onEdit, onDelete, onUpdate }: SupplementCardProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showManualEdit, setShowManualEdit] = useState(false);
  
  const Icon = supplementIcons[supplement.form];
  const colorClasses = supplementColors[supplement.form];

  const handleAIEdit = (instructions: string) => {
    // For demo purposes, we'll just log the AI instructions
    // In a real app, this would send to an AI service
    console.log('AI Edit Instructions:', instructions);
    // You could call onUpdate with AI-processed changes here
  };

  const handleManualEdit = () => {
    setShowManualEdit(true);
  };
  
  return (
    <motion.div
      layout
      className="rounded-xl p-4 relative group transition-shadow"
      style={{ 
        backgroundColor: 'var(--bg-main)',
        border: '1px solid var(--border)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="flex items-center gap-3">
        {/* Supplement Icon */}
        <div className={`w-10 h-10 rounded-lg ${colorClasses} flex items-center justify-center flex-shrink-0`}>
          <Icon size={18} />
        </div>
        
        {/* Supplement Info */}
        <div className="flex-1 min-w-0">
          <h3 
            className="text-sm truncate"
            style={{ color: 'var(--text-primary)' }}
          >
            {supplement.name}
          </h3>
          <p 
            className="text-xs"
            style={{ color: 'var(--text-secondary)' }}
          >
            {formatDosageDisplay(supplement)}
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setShowEditModal(true)}
            className="p-2 rounded-lg transition-colors"
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
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => onDelete(supplement.id)}
            className="p-2 rounded-lg transition-colors"
            style={{ color: '#EF4444' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      
      {/* Swipe indicator */}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-30 group-hover:opacity-0 transition-opacity">
        <div 
          className="w-1 h-8 rounded-full"
          style={{ backgroundColor: 'var(--border)' }}
        />
      </div>

      {/* Edit Supplement Modal */}
      <EditSupplementModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        supplement={supplement}
        onAIEdit={handleAIEdit}
        onManualEdit={handleManualEdit}
      />

      {/* Manual Edit Form */}
      <ManualSupplementEditForm
        isOpen={showManualEdit}
        onClose={() => setShowManualEdit(false)}
        supplement={supplement}
        onSave={onUpdate}
      />
    </motion.div>
  );
}