import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, ChevronDown } from 'lucide-react';
import { Supplement, SupplementForm } from './profile/SupplementTypes';
import { SUPPLEMENT_FORMS, SUPPLEMENT_TIMING } from './profile/SupplementConstants';

interface ManualSupplementEditFormProps {
  isOpen: boolean;
  onClose: () => void;
  supplement: Supplement;
  onSave: (updatedSupplement: Supplement) => void;
}

export function ManualSupplementEditForm({ 
  isOpen, 
  onClose, 
  supplement, 
  onSave 
}: ManualSupplementEditFormProps) {
  const [formData, setFormData] = useState<Supplement>({
    ...supplement
  });

  const [showFormDropdown, setShowFormDropdown] = useState(false);
  const [showTimingDropdown, setShowTimingDropdown] = useState(false);

  const handleInputChange = (field: keyof Supplement, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleCancel = () => {
    setFormData({ ...supplement });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden"
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
                linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />

          {/* Header */}
          <div className="relative z-10 p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl text-black">Edit Supplement</h2>
                <p className="text-sm text-gray-600">Update supplement details</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col max-h-[calc(90vh-120px)]">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Supplement Name */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Supplement Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Whey Protein, Creatine, Vitamin D"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                />
              </div>

              {/* Form Type */}
              <div className="relative">
                <label className="block text-sm text-gray-700 mb-2">
                  Form
                </label>
                <button
                  onClick={() => setShowFormDropdown(!showFormDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-xl text-sm text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span>
                      {SUPPLEMENT_FORMS.find(form => form.value === formData.form)?.emoji}
                    </span>
                    <span className="text-gray-800">
                      {SUPPLEMENT_FORMS.find(form => form.value === formData.form)?.label || 'Select form'}
                    </span>
                  </div>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform ${showFormDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Form Dropdown */}
                <AnimatePresence>
                  {showFormDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-48 overflow-y-auto"
                    >
                      {SUPPLEMENT_FORMS.map((form) => (
                        <button
                          key={form.value}
                          onClick={() => {
                            handleInputChange('form', form.value);
                            setShowFormDropdown(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors text-sm"
                        >
                          <span>{form.emoji}</span>
                          <span className="text-gray-800">{form.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Dosage */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Dosage
                </label>
                <input
                  type="text"
                  value={formData.dosage}
                  onChange={(e) => handleInputChange('dosage', e.target.value)}
                  placeholder="e.g., 25g, 5mg, 2 capsules"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                />
              </div>

              {/* Schedule/Timing */}
              <div className="relative">
                <label className="block text-sm text-gray-700 mb-2">
                  Schedule
                </label>
                <button
                  onClick={() => setShowTimingDropdown(!showTimingDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-xl text-sm text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-800">
                    {formData.schedule || 'Select timing'}
                  </span>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform ${showTimingDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Timing Dropdown */}
                <AnimatePresence>
                  {showTimingDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-48 overflow-y-auto"
                    >
                      {SUPPLEMENT_TIMING.map((timing) => (
                        <button
                          key={timing}
                          onClick={() => {
                            handleInputChange('schedule', timing);
                            setShowTimingDropdown(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-sm text-gray-800"
                        >
                          {timing}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Start Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white pr-12"
                  />
                  <Calendar size={16} className="absolute right-4 top-3.5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* End Date (Optional) */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  End Date (Optional)
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.endDate || ''}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white pr-12"
                  />
                  <Calendar size={16} className="absolute right-4 top-3.5 text-gray-400 pointer-events-none" />
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="px-6 pb-6 shrink-0 bg-white border-t border-gray-100 pt-4">
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!formData.name || !formData.form || !formData.dosage}
                  className="px-6 py-2.5 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}