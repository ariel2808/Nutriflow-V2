import React from 'react';
import { ActionButton } from './ActionButton';
import { preferenceItems } from './ProfileData';

interface PreferencesSectionProps {
  onProfileSettingsOpen: () => void;
  onAppPreferencesOpen: () => void;
  onSupportOpen?: () => void;
}

export function PreferencesSection({ 
  onProfileSettingsOpen, 
  onAppPreferencesOpen, 
  onSupportOpen 
}: PreferencesSectionProps) {
  return (
    <div>
      <h2 className="mb-4" style={{ color: 'var(--text-primary)' }}>Preferences</h2>
      <div className="space-y-3">
        {preferenceItems.map((item, index) => {
          let handleClick: (() => void) | undefined;
          
          if (item.label === 'Profile Settings') {
            handleClick = onProfileSettingsOpen;
          } else if (item.label === 'App Preferences') {
            handleClick = onAppPreferencesOpen;
          } else if (item.label === 'Support' && onSupportOpen) {
            handleClick = onSupportOpen;
          }
          
          return (
            <ActionButton key={index} item={item} onClick={handleClick} />
          );
        })}
      </div>
    </div>
  );
}