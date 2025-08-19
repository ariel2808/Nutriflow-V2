import React from 'react';
import { Pill } from 'lucide-react';
import { FlowStepProps } from '../AddSupplementFlowTypes';

export function NameStep({ data, onUpdate, onNext, isValid }: FlowStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="text-center pt-8 pb-6">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
            <Pill className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <h2 className="text-2xl mb-2" style={{ color: 'var(--text-primary)' }}>Supplement Name</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Add the name of your supplement</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="px-6 mb-8">
          <input
            type="text"
            placeholder="Enter supplement name"
            value={data.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            className="w-full px-4 py-4 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            style={{
              backgroundColor: 'var(--input-bg)',
              color: 'var(--input-text)'
            }}
            autoFocus
          />
        </div>

        {/* Next Button */}
        <div className="mt-auto px-6 pb-6 flex justify-center">
          <button
            type="submit"
            disabled={!isValid}
            className="px-8 py-2.5 rounded-full text-sm transition-all"
            style={{
              backgroundColor: isValid ? '#4A90E2' : 'var(--text-placeholder)',
              color: '#FFFFFF',
              cursor: isValid ? 'pointer' : 'not-allowed'
            }}
            onMouseEnter={(e) => {
              if (isValid) {
                e.currentTarget.style.backgroundColor = '#3A7BD5';
              }
            }}
            onMouseLeave={(e) => {
              if (isValid) {
                e.currentTarget.style.backgroundColor = '#4A90E2';
              }
            }}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}