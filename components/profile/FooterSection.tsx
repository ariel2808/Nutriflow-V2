import React from 'react';
import { ActionButton } from './ActionButton';
import { footerItems } from './ProfileData';

export function FooterSection() {
  return (
    <div className="pb-24">
      <div className="space-y-3">
        {footerItems.map((item, index) => (
          <ActionButton key={index} item={item} />
        ))}
      </div>
    </div>
  );
}