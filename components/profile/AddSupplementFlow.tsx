import React, { useState } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AddSupplementFlowData, FlowStep } from './AddSupplementFlowTypes';
import { NameStep } from './flow-steps/NameStep';
import { FormStep } from './flow-steps/FormStep';
import { DosageStep } from './flow-steps/DosageStep';
import { ScheduleStep } from './flow-steps/ScheduleStep';
import { ReviewStep } from './flow-steps/ReviewStep';
import { Supplement } from './SupplementTypes';
import { generateId } from './SupplementHelpers';

interface AddSupplementFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (supplement: Supplement) => void;
}

const STEP_ORDER: FlowStep[] = ['name', 'form', 'dosage', 'schedule', 'review'];

export function AddSupplementFlow({ isOpen, onClose, onSave }: AddSupplementFlowProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>('name');
  const [data, setData] = useState<AddSupplementFlowData>({
    name: '',
    form: '',
    dosageValue: '',
    dosageUnit: '',
    frequency: 'daily',
    timesPerDay: ['08:00'],
    startDate: new Date().toISOString().split('T')[0],
  });

  const currentStepIndex = STEP_ORDER.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / STEP_ORDER.length) * 100;

  const updateData = (updates: Partial<AddSupplementFlowData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEP_ORDER.length) {
      setCurrentStep(STEP_ORDER[nextIndex]);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(STEP_ORDER[prevIndex]);
    }
  };

  const handleEditStep = (step: FlowStep) => {
    setCurrentStep(step);
  };

  const handleSave = () => {
    const supplement: Supplement = {
      id: generateId(),
      name: data.name,
      form: data.form,
      dosage: `${data.dosageValue} ${data.dosageUnit}`,
      schedule: data.frequency === 'daily' 
        ? `Daily at ${data.timesPerDay.join(', ')}`
        : data.frequency.charAt(0).toUpperCase() + data.frequency.slice(1),
      startDate: data.startDate,
      endDate: data.endDate,
    };

    onSave(supplement);
    handleClose();
  };

  const handleClose = () => {
    setCurrentStep('name');
    setData({
      name: '',
      form: '',
      dosageValue: '',
      dosageUnit: '',
      frequency: 'daily',
      timesPerDay: ['08:00'],
      startDate: new Date().toISOString().split('T')[0],
    });
    onClose();
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 'name':
        return data.name.trim() !== '';
      case 'form':
        return data.form !== '';
      case 'dosage':
        return data.dosageValue.trim() !== '' && data.dosageUnit !== '';
      case 'schedule':
        return data.timesPerDay.length > 0 && data.startDate !== '';
      case 'review':
        return true;
      default:
        return false;
    }
  };

  const stepProps = {
    data,
    onUpdate: updateData,
    onNext: handleNext,
    onBack: handleBack,
    isValid: isStepValid(),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
      className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
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
          className="w-full max-w-sm rounded-2xl shadow-xl overflow-hidden"
          style={{ 
            backgroundColor: 'var(--bg-main)',
            height: '90vh', 
            maxHeight: '700px' 
          }}
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between p-4 border-b"
            style={{ borderBottomColor: 'var(--border)' }}
          >
            <div className="flex items-center gap-3">
              {currentStep !== 'name' && (
                <button
                  onClick={handleBack}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--btn-secondary-bg)' }}
                >
                  <ArrowLeft 
                    className="w-4 h-4"
                    style={{ color: 'var(--icon-secondary)' }}
                  />
                </button>
              )}
              <div 
                className="text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                Step {currentStepIndex + 1} of {STEP_ORDER.length}
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--btn-secondary-bg)' }}
            >
              <X 
                className="w-4 h-4"
                style={{ color: 'var(--icon-secondary)' }}
              />
            </button>
          </div>

          {/* Progress Bar */}
          <div 
            className="h-1"
            style={{ backgroundColor: 'var(--btn-secondary-bg)' }}
          >
            <motion.div
              className="h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Step Content */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {currentStep === 'name' && <NameStep {...stepProps} />}
                {currentStep === 'form' && <FormStep {...stepProps} />}
                {currentStep === 'dosage' && <DosageStep {...stepProps} />}
                {currentStep === 'schedule' && <ScheduleStep {...stepProps} />}
                {currentStep === 'review' && (
                  <ReviewStep
                    {...stepProps}
                    onSave={handleSave}
                    onEditStep={handleEditStep}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
      )}
    </AnimatePresence>
  );
}