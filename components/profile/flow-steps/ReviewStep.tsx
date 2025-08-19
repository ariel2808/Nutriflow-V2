import React from 'react';
import { Edit2, Check } from 'lucide-react';
import { FlowStepProps } from '../AddSupplementFlowTypes';
import { SUPPLEMENT_FORMS } from '../SupplementConstants';

interface ReviewStepProps extends FlowStepProps {
  onSave: () => void;
  onEditStep: (step: 'name' | 'form' | 'dosage' | 'schedule') => void;
}

export function ReviewStep({ data, onBack, onSave, onEditStep }: ReviewStepProps) {
  const selectedForm = SUPPLEMENT_FORMS.find(f => f.value === data.form);

  const formatSchedule = () => {
    if (data.frequency === 'daily') {
      return `Daily at ${data.timesPerDay.join(', ')}`;
    }
    return data.frequency.charAt(0).toUpperCase() + data.frequency.slice(1);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="text-center pt-8 pb-6">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center">
            <Check className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <h2 className="text-2xl mb-2">Review Supplement</h2>
        <p className="text-muted-foreground">Check your supplement details</p>
      </div>

      {/* Review Details */}
      <div className="flex-1 px-6 space-y-4">
        {/* Name */}
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Name</div>
              <div>{data.name}</div>
            </div>
            <button
              onClick={() => onEditStep('name')}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <Edit2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Form</div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{selectedForm?.icon}</span>
                <span>{selectedForm?.label}</span>
              </div>
            </div>
            <button
              onClick={() => onEditStep('form')}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <Edit2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Dosage */}
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Dosage</div>
              <div>{data.dosageValue} {data.dosageUnit}</div>
            </div>
            <button
              onClick={() => onEditStep('dosage')}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <Edit2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Schedule</div>
              <div>{formatSchedule()}</div>
            </div>
            <button
              onClick={() => onEditStep('schedule')}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <Edit2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 px-6 pb-6 justify-center">
        <button
          onClick={onBack}
          className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onSave}
          className="px-6 py-2.5 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition-colors"
        >
          Save Supplement
        </button>
      </div>
    </div>
  );
}