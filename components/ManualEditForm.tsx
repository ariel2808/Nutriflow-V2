import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Clock } from 'lucide-react';
import { Event } from '../App';

interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit: string;
}

interface ManualEditFormProps {
  isOpen: boolean;
  onClose: () => void;
  meal: Event;
  onSave: (updatedMeal: Event, ingredients: Ingredient[]) => void;
}

export function ManualEditForm({ 
  isOpen, 
  onClose, 
  meal, 
  onSave 
}: ManualEditFormProps) {
  const [title, setTitle] = useState(meal.title);
  const [time, setTime] = useState(meal.time);
  const [subtitle, setSubtitle] = useState(meal.subtitle);
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: '1', name: 'Greek Yogurt', amount: '150', unit: 'g' },
    { id: '2', name: 'Eggs', amount: '2', unit: 'large' },
    { id: '3', name: 'Spinach', amount: '50', unit: 'g' }
  ]);

  const addIngredient = () => {
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name: '',
      amount: '',
      unit: 'g'
    };
    setIngredients([...ingredients, newIngredient]);
  };

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  const updateIngredient = (id: string, field: keyof Ingredient, value: string) => {
    setIngredients(ingredients.map(ing => 
      ing.id === id ? { ...ing, [field]: value } : ing
    ));
  };

  const handleSave = () => {
    const updatedMeal: Event = {
      ...meal,
      title,
      time,
      subtitle
    };
    onSave(updatedMeal, ingredients);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[99999] flex items-end justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{ zIndex: 99999 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          className="relative w-full rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden mx-6"
          style={{ backgroundColor: 'var(--bg-main)' }}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 300,
            duration: 0.3
          }}
        >
          {/* Handle bar */}
          <div className="flex justify-center pt-3 pb-2">
            <div 
              className="w-12 h-1 rounded-full"
              style={{ backgroundColor: 'var(--border)' }}
            />
          </div>

          {/* Header */}
          <div 
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{ borderBottomColor: 'var(--border)' }}
          >
            <h2 className="text-lg" style={{ color: 'var(--text-primary)' }}>Edit Meal</h2>
            <motion.button
              onClick={onClose}
              className="p-2 transition-colors"
              style={{ color: 'var(--icon-secondary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--icon-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--icon-secondary)';
              }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={20} />
            </motion.button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[calc(85vh-120px)]">
            <div className="px-6 py-6 space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <label 
                    className="block text-sm mb-2"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Meal Name
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{
                      backgroundColor: 'var(--input-bg)',
                      border: '1px solid var(--input-border)',
                      color: 'var(--input-text)'
                    }}
                    placeholder="Enter meal name"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label 
                      className="block text-sm mb-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Time
                    </label>
                    <div className="relative">
                      <Clock 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2" 
                        size={16}
                        style={{ color: 'var(--icon-secondary)' }}
                      />
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{
                          backgroundColor: 'var(--input-bg)',
                          border: '1px solid var(--input-border)',
                          color: 'var(--input-text)'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label 
                      className="block text-sm mb-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Notes
                    </label>
                    <input
                      type="text"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{
                        backgroundColor: 'var(--input-bg)',
                        border: '1px solid var(--input-border)',
                        color: 'var(--input-text)'
                      }}
                      placeholder="Quick notes"
                    />
                  </div>
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm" style={{ color: 'var(--text-secondary)' }}>Ingredients</h3>
                  <motion.button
                    onClick={addIngredient}
                    className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus size={16} />
                    <span className="text-sm">Add</span>
                  </motion.button>
                </div>

                <div className="space-y-3">
                  {ingredients.map((ingredient, index) => (
                    <motion.div
                      key={ingredient.id}
                      className="p-3 rounded-xl space-y-3"
                      style={{ backgroundColor: 'var(--bg-card)' }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {/* Ingredient name - full width */}
                      <input
                        type="text"
                        value={ingredient.name}
                        onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
                        className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        style={{
                          backgroundColor: 'var(--input-bg)',
                          border: '1px solid var(--input-border)',
                          color: 'var(--input-text)'
                        }}
                        placeholder="Ingredient name"
                      />
                      
                      {/* Amount, unit, and remove button */}
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={ingredient.amount}
                          onChange={(e) => updateIngredient(ingredient.id, 'amount', e.target.value)}
                          className="flex-1 min-w-0 rounded-lg px-3 py-2 text-sm text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
                          style={{
                            backgroundColor: 'var(--input-bg)',
                            border: '1px solid var(--input-border)',
                            color: 'var(--input-text)'
                          }}
                          placeholder="100"
                        />
                        <select
                          value={ingredient.unit}
                          onChange={(e) => updateIngredient(ingredient.id, 'unit', e.target.value)}
                          className="flex-1 min-w-0 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          style={{
                            backgroundColor: 'var(--input-bg)',
                            border: '1px solid var(--input-border)',
                            color: 'var(--input-text)'
                          }}
                        >
                          <option value="g">g</option>
                          <option value="ml">ml</option>
                          <option value="cup">cup</option>
                          <option value="tbsp">tbsp</option>
                          <option value="tsp">tsp</option>
                          <option value="piece">piece</option>
                          <option value="large">large</option>
                          <option value="medium">medium</option>
                          <option value="small">small</option>
                        </select>
                        <motion.button
                          onClick={() => removeIngredient(ingredient.id)}
                          className="flex-shrink-0 p-2 rounded-lg transition-colors"
                          style={{ 
                            color: 'var(--icon-secondary)',
                            backgroundColor: 'var(--input-bg)',
                            border: '1px solid var(--input-border)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#EF4444';
                            e.currentTarget.style.borderColor = '#EF4444';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--icon-secondary)';
                            e.currentTarget.style.borderColor = 'var(--input-border)';
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Minus size={16} />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div 
            className="border-t px-6 py-4"
            style={{ borderTopColor: 'var(--border)' }}
          >
            <div className="flex gap-3">
              <motion.button
                onClick={onClose}
                className="flex-1 px-6 py-3 rounded-2xl transition-colors"
                style={{
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleSave}
                className="flex-1 px-6 py-3 rounded-2xl transition-colors"
                style={{
                  backgroundColor: '#4A90E2',
                  color: '#FFFFFF'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#3A7BD5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#4A90E2';
                }}
                whileTap={{ scale: 0.98 }}
              >
                Save Changes
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}