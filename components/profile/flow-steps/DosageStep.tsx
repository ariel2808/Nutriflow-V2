import React from 'react';
import { ChevronDown } from 'lucide-react';
import { FlowStepProps, DOSAGE_UNITS } from '../AddSupplementFlowTypes';
import { SUPPLEMENT_FORMS } from '../SupplementConstants';

export function DosageStep({ data, onUpdate, onNext, onBack, isValid }: FlowStepProps) {
  const selectedForm = SUPPLEMENT_FORMS.find(f => f.value === data.form);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="text-center pt-8 pb-6">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
            <span className="text-3xl">{selectedForm?.icon}</span>
          </div>
        </div>
        <h2 className="text-2xl mb-2">Dosage</h2>
        <p className="text-muted-foreground">Specify the strength and unit</p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6">
        <div className="space-y-4">
          {/* Dosage Value */}
          <div>
            <label className="block text-sm mb-2">Amount</label>
            <input
              type="text"
              placeholder="Enter amount"
              value={data.dosageValue}
              onChange={(e) => onUpdate({ dosageValue: e.target.value })}
              className="w-full px-4 py-4 bg-input-background border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Unit Selector */}
          <div>
            <label className="block text-sm mb-2">Unit</label>
            <div className="relative">
              <select
                value={data.dosageUnit}
                onChange={(e) => onUpdate({ dosageUnit: e.target.value })}
                className="w-full px-4 py-4 bg-input-background border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="">Select unit</option>
                {DOSAGE_UNITS.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
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
          disabled={!isValid}
          className="px-6 py-2.5 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}