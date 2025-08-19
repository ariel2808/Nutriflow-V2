import React from 'react';
import { motion } from 'motion/react';

export function NutritionSection() {
  return (
    <motion.div 
      className="text-left rounded-xl p-6"
      style={{ 
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)'
      }}
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
      }}
    >
      <h3 className="text-lg mb-6" style={{ color: 'var(--text-primary)' }}>Nutrition Facts</h3>
      
      {/* Calories - Centered and Prominent */}
      <div className="text-center mb-6">
        <div className="text-3xl mb-1" style={{ color: 'var(--text-primary)' }}>450</div>
        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>calories</div>
      </div>
      
      {/* Main Macros Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-lg mb-1" style={{ color: 'var(--text-primary)' }}>25g</div>
          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>Protein</div>
        </div>
        <div className="text-center">
          <div className="text-lg mb-1" style={{ color: 'var(--text-primary)' }}>52g</div>
          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>Carbs</div>
        </div>
        <div className="text-center">
          <div className="text-lg mb-1" style={{ color: 'var(--text-primary)' }}>18g</div>
          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>Fat</div>
        </div>
      </div>
      
      {/* Other Nutrition Info List */}
      <div 
        className="pt-4 border-t"
        style={{ borderTopColor: 'var(--border)' }}
      >
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Fiber</span>
            <span className="text-sm" style={{ color: 'var(--text-primary)' }}>8g</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Sugar</span>
            <span className="text-sm" style={{ color: 'var(--text-primary)' }}>12g</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Sodium</span>
            <span className="text-sm" style={{ color: 'var(--text-primary)' }}>680mg</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}