import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { FlowStepProps, DEFAULT_TIMES } from '../AddSupplementFlowTypes';

export function ScheduleStep({ data, onUpdate, onNext, onBack, isValid }: FlowStepProps) {
  const addTimeSlot = () => {
    const newTime = DEFAULT_TIMES[data.timesPerDay.length % DEFAULT_TIMES.length];
    onUpdate({ timesPerDay: [...data.timesPerDay, newTime] });
  };

  const removeTimeSlot = (index: number) => {
    const newTimes = data.timesPerDay.filter((_, i) => i !== index);
    onUpdate({ timesPerDay: newTimes });
  };

  const updateTime = (index: number, time: string) => {
    const newTimes = [...data.timesPerDay];
    newTimes[index] = time;
    onUpdate({ timesPerDay: newTimes });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="text-center pt-8 pb-6">
        <h2 className="text-2xl mb-2">Schedule</h2>
        <p className="text-muted-foreground">When should you take it?</p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 space-y-6">
        {/* Frequency */}
        <div>
          <label className="block text-sm mb-3">Frequency</label>
          <div className="grid grid-cols-3 gap-2">
            {['daily', 'weekly', 'custom'].map((freq) => (
              <button
                key={freq}
                onClick={() => onUpdate({ frequency: freq as any })}
                className={`py-3 px-4 rounded-xl border transition-all ${
                  data.frequency === freq
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {freq.charAt(0).toUpperCase() + freq.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Times per day */}
        {data.frequency === 'daily' && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm">Times per day</label>
              <div className="flex gap-2">
                <button
                  onClick={addTimeSlot}
                  disabled={data.timesPerDay.length >= 5}
                  className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center disabled:bg-gray-300"
                >
                  <Plus className="w-4 h-4" />
                </button>
                {data.timesPerDay.length > 1 && (
                  <button
                    onClick={() => removeTimeSlot(data.timesPerDay.length - 1)}
                    className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            <div className="space-y-2">
              {data.timesPerDay.map((time, index) => (
                <input
                  key={index}
                  type="time"
                  value={time}
                  onChange={(e) => updateTime(index, e.target.value)}
                  className="w-full px-4 py-3 bg-input-background border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
          </div>
        )}

        {/* Start Date */}
        <div>
          <label className="block text-sm mb-2">Start Date</label>
          <input
            type="date"
            value={data.startDate}
            onChange={(e) => onUpdate({ startDate: e.target.value })}
            className="w-full px-4 py-3 bg-input-background border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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