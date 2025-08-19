import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Activity, UtensilsCrossed, Dumbbell, Apple } from 'lucide-react';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWorkout: () => void;
  onAddMeal: () => void;
}

export function AddItemModal({ 
  isOpen, 
  onClose, 
  onAddWorkout, 
  onAddMeal 
}: AddItemModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9990] flex items-end justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{ zIndex: 9990 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          className="relative w-full bg-popover rounded-t-3xl shadow-2xl transition-colors duration-300 mx-6"
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
            <div className="w-12 h-1 bg-muted rounded-full" />
          </div>

          {/* Close button */}
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors z-10"
            whileTap={{ scale: 0.95 }}
          >
            <X size={20} />
          </motion.button>

          <div className="px-6 pb-8">
            {/* Title */}
            <motion.div
              className="text-center mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-xl text-foreground mb-2">Add to Your Day</h2>
              <p className="text-muted-foreground">What would you like to add?</p>
            </motion.div>

            {/* Selection Cards */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Add Workout Card */}
              <motion.button
                onClick={() => {
                  onAddWorkout();
                  onClose();
                }}
                className="flex flex-col items-center gap-4 p-6 bg-muted hover:bg-accent rounded-2xl border-2 border-transparent hover:border-blue-500 transition-all duration-200"
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center">
                  <Dumbbell size={28} className="text-orange-600" />
                </div>
                <div className="text-center">
                  <h3 className="text-base text-foreground mb-1">Add Workout</h3>
                  <p className="text-sm text-muted-foreground">Training session</p>
                </div>
              </motion.button>

              {/* Add Meal Card */}
              <motion.button
                onClick={() => {
                  onAddMeal();
                  onClose();
                }}
                className="flex flex-col items-center gap-4 p-6 bg-muted hover:bg-accent rounded-2xl border-2 border-transparent hover:border-blue-500 transition-all duration-200"
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                  <Apple size={28} className="text-green-600" />
                </div>
                <div className="text-center">
                  <h3 className="text-base text-foreground mb-1">Add Meal</h3>
                  <p className="text-sm text-muted-foreground">Food & nutrition</p>
                </div>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}