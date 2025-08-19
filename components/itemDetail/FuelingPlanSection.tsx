import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Info, Edit3, Droplet, Zap, Salad, Leaf } from 'lucide-react';
import { Event, FuelingPlan, FuelingItem } from '../../App';
import { generateFuelingPlan, getFuelingExplanation } from '../FuelingUtils';
import { EditFuelingModal } from '../EditFuelingModal';

interface FuelingPlanSectionProps {
  workout: Event;
}

export function FuelingPlanSection({ workout }: FuelingPlanSectionProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<'before' | 'during' | 'after' | null>(null);
  
  const fuelingPlan = generateFuelingPlan(workout);

  const getFuelingIcon = (iconType: FuelingItem['icon']) => {
    switch (iconType) {
      case 'droplet':
        return <Droplet size={16} />;
      case 'zap':
        return <Zap size={16} />;
      case 'salt':
        return <Salad size={16} />;
      case 'leaf':
        return <Leaf size={16} />;
      default:
        return <Droplet size={16} />;
    }
  };

  const getFuelingIconColor = (type: FuelingItem['type']) => {
    switch (type) {
      case 'hydration':
        return '#3B82F6'; // Blue
      case 'carbs':
        return '#F97316'; // Orange
      case 'sodium':
        return '#6B7280'; // Gray
      case 'whole-food':
        return '#10B981'; // Green
      default:
        return '#6B7280';
    }
  };

  const handleAIEditFueling = (instructions: string) => {
    console.log('AI Edit Fueling instructions:', instructions);
    // Future: Send to AI service to adjust fueling plan
  };

  const handleManualEditFueling = () => {
    console.log('Manual edit fueling plan');
    // Future: Open manual fueling plan editor
  };

  const renderFuelingItem = (item: FuelingItem, index: number | string) => (
    <motion.div
      key={index}
      className="flex items-center gap-3 p-3 rounded-xl"
      style={{ backgroundColor: 'var(--bg-main)' }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <div 
        className="w-8 h-8 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: getFuelingIconColor(item.type) + '20' }}
      >
        <div style={{ color: getFuelingIconColor(item.type) }}>
          {getFuelingIcon(item.icon)}
        </div>
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span 
            className="text-sm"
            style={{ 
              color: 'var(--text-primary)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            {item.amount}
          </span>
          {item.frequency && (
            <span 
              className="text-xs px-2 py-1 rounded-full"
              style={{ 
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-placeholder)'
              }}
            >
              {item.frequency}
            </span>
          )}
        </div>
        <p 
          className="text-xs"
          style={{ color: 'var(--text-secondary)' }}
        >
          {item.details}
        </p>
      </div>
    </motion.div>
  );

  const renderPhaseCard = (
    title: string,
    phase: any,
    phaseKey: 'before' | 'during' | 'after'
  ) => (
    <motion.div
      className="p-4 rounded-2xl mb-4"
      style={{ backgroundColor: 'var(--bg-card)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-10 rounded-2xl"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--graph-grid) 1px, transparent 1px),
            linear-gradient(to bottom, var(--graph-grid) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h4 
              className="text-sm"
              style={{ 
                color: 'var(--text-primary)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              {title}
            </h4>
            <button
              onClick={() => setSelectedPhase(selectedPhase === phaseKey ? null : phaseKey)}
              className="p-1 rounded-full transition-colors"
              style={{ backgroundColor: 'transparent' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-main)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Info size={14} style={{ color: 'var(--icon-secondary)' }} />
            </button>
          </div>
          <span 
            className="text-xs px-3 py-1 rounded-full"
            style={{ 
              backgroundColor: 'var(--bg-main)',
              color: 'var(--text-secondary)'
            }}
          >
            {Array.isArray(phase) ? phase[0]?.timing : phase.timing}
          </span>
        </div>

        {/* Show explanation if phase is selected */}
        {selectedPhase === phaseKey && (
          <motion.div
            className="mb-3 p-3 rounded-xl"
            style={{ backgroundColor: 'var(--bg-main)' }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <p 
              className="text-xs"
              style={{ color: 'var(--text-secondary)' }}
            >
              {getFuelingExplanation(phaseKey)}
            </p>
          </motion.div>
        )}

        <div className="space-y-2">
          {Array.isArray(phase) ? (
            phase.map((duringPhase, phaseIndex) => (
              <div key={phaseIndex}>
                {phaseIndex > 0 && (
                  <div 
                    className="h-px my-3"
                    style={{ backgroundColor: 'var(--border)' }}
                  />
                )}
                {duringPhase.items.map((item: FuelingItem, itemIndex: number) => 
                  renderFuelingItem(item, `${phaseIndex}-${itemIndex}`)
                )}
              </div>
            ))
          ) : (
            phase.items.map((item: FuelingItem, index: number) => 
              renderFuelingItem(item, `single-${index}`)
            )
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 
          className="text-lg"
          style={{ 
            color: 'var(--text-primary)',
            fontWeight: 'var(--font-weight-medium)'
          }}
        >
          Fueling Plan
        </h3>
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl transition-colors"
          style={{ backgroundColor: 'transparent' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-card)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Edit3 size={16} style={{ color: 'var(--icon-secondary)' }} />
          <span 
            className="text-sm"
            style={{ color: 'var(--text-secondary)' }}
          >
            Edit
          </span>
        </button>
      </div>

      {/* Fueling Phases */}
      {renderPhaseCard('Before', fuelingPlan.before, 'before')}
      {renderPhaseCard('During', fuelingPlan.during, 'during')}
      {renderPhaseCard('After', fuelingPlan.after, 'after')}

      {/* Edit Fueling Modal */}
      <EditFuelingModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        workout={workout}
        fuelingPlan={fuelingPlan}
        onAIEdit={handleAIEditFueling}
        onManualEdit={handleManualEditFueling}
      />
    </motion.div>
  );
}