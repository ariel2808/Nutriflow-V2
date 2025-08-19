import React from 'react';
import { ProfileInfoItem } from './ProfileInfoItem';
import { profileInfoItems } from './ProfileData';

interface ProfileInfoSectionProps {
  onModalStateChange: (isOpen: boolean) => void;
}

export function ProfileInfoSection({ onModalStateChange }: ProfileInfoSectionProps) {
  return (
    <div>
      <h2 className="mb-4" style={{ color: 'var(--text-primary)' }}>Profile Information</h2>
      <div className="grid grid-cols-2 gap-3">
        {profileInfoItems.map((item, index) => (
          <ProfileInfoItem key={index} item={item} onModalStateChange={onModalStateChange} />
        ))}
      </div>
    </div>
  );
}