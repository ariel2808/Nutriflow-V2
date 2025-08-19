import React from 'react';

export function ProfileHeader() {
  return (
    <div className="text-center">
      <div 
        className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4"
        style={{ backgroundColor: 'var(--btn-primary-bg)' }}
      >
        <span 
          className="text-2xl font-medium"
          style={{ color: 'var(--btn-primary-text)' }}
        >
          A
        </span>
      </div>
      <h1 style={{ color: 'var(--text-primary)' }}>Ariel</h1>
    </div>
  );
}