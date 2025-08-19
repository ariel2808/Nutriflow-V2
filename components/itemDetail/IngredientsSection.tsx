import React from 'react';
import { motion } from 'motion/react';
import { Ingredient } from './IngredientsData';

interface IngredientsSectionProps {
  ingredients: Ingredient[];
}

export function IngredientsSection({ ingredients }: IngredientsSectionProps) {
  return (
    <motion.div 
      className="text-left rounded-xl p-6 mb-6"
      style={{ backgroundColor: 'var(--bg-card)' }}
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
      }}
    >
      <h3 className="text-lg mb-4" style={{ color: 'var(--text-primary)' }}>Ingredients</h3>
      <div className="space-y-4">
        {ingredients.map((ingredient, index) => (
          <motion.div 
            key={index}
            className="flex items-center gap-4"
            variants={{
              hidden: { x: -20, opacity: 0 },
              visible: { x: 0, opacity: 1 }
            }}
            transition={{ delay: index * 0.1 }}
          >
            <div 
              className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center"
              style={{ 
                backgroundColor: 'var(--bg-main)',
                border: '1px solid var(--border)'
              }}
            >
              <span className="text-2xl">{ingredient.emoji}</span>
            </div>
            <div className="flex-1">
              <p className="text-base" style={{ color: 'var(--text-primary)' }}>
                {ingredient.name} - {ingredient.amount}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}