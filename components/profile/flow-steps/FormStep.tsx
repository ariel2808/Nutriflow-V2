import React from 'react';
import { FlowStepProps } from '../AddSupplementFlowTypes';
import { SUPPLEMENT_FORMS } from '../SupplementConstants';

export function FormStep({ data, onUpdate, onNext, onBack }: FlowStepProps) {
  const handleFormSelect = (form: string) => {
    onUpdate({ form });
    // Auto-advance to next step
    setTimeout(() => onNext(), 300);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="text-center pt-8 pb-6">
        <h2 className="text-2xl mb-2">Choose Form</h2>
        <p className="text-muted-foreground">Select the form of this supplement</p>
      </div>

      {/* Form Grid */}
      <div className="flex-1 px-6">
        <div className="grid grid-cols-2 gap-4">
          {SUPPLEMENT_FORMS.map((form) => (
            <button
              key={form.value}
              onClick={() => handleFormSelect(form.value)}
              className={`p-6 rounded-2xl border-2 transition-all ${
                data.form === form.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-3">{form.icon}</div>
                <div className="text-sm">{form.label}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 px-6 pb-6 pt-6 justify-center">
        <button
          onClick={onBack}
          className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!data.form}
          className="px-6 py-2.5 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}