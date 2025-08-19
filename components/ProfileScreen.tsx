import React, { useState } from 'react';
import { ProfileHeader } from './profile/ProfileHeader';
import { ProfileInfoSection } from './profile/ProfileInfoSection';
import { PreferencesSection } from './profile/PreferencesSection';
import { DarkModeToggle } from './profile/DarkModeToggle';
import { AIChatButton } from './profile/AIChatButton';
import { AIChatHistoryModal } from './profile/AIChatHistoryModal';

interface ProfileScreenProps {
  onModalStateChange: (isOpen: boolean) => void;
  isDarkMode: boolean;
  onDarkModeToggle: (isDark: boolean) => void;
  onProfileSettingsOpen: () => void;
  onAppPreferencesOpen: () => void;
  onSupportOpen?: () => void;
}

export function ProfileScreen({ 
  onModalStateChange, 
  isDarkMode, 
  onDarkModeToggle, 
  onProfileSettingsOpen,
  onAppPreferencesOpen,
  onSupportOpen
}: ProfileScreenProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatOpen = () => {
    setIsChatOpen(true);
    onModalStateChange(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
    onModalStateChange(false);
  };

  return (
    <div className="w-full h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="px-5 pt-12 h-full flex flex-col">
        {/* Status Bar */}
        <div 
          className="flex justify-between items-center mb-8 text-sm flex-shrink-0"
          style={{ color: 'var(--text-secondary)' }}
        >
          <span>9:41</span>
          <div className="flex items-center gap-2">
            <span style={{ fontWeight: 500 }}>28°C</span>
            <div className="w-5 h-5 rounded-full bg-red-400 flex items-center justify-center">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Top Controls */}
        <div className="flex justify-between items-center mb-8 flex-shrink-0">
          <DarkModeToggle isDark={isDarkMode} onToggle={onDarkModeToggle} />
          <AIChatButton onOpenChat={handleChatOpen} />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 min-h-0 overflow-y-auto space-y-8 pb-8">
          <ProfileHeader />
          <ProfileInfoSection onModalStateChange={onModalStateChange} />
          <PreferencesSection 
            onProfileSettingsOpen={onProfileSettingsOpen}
            onAppPreferencesOpen={onAppPreferencesOpen}
            onSupportOpen={onSupportOpen}
          />
        </div>

        {/* AI Chat History Modal */}
        <AIChatHistoryModal isOpen={isChatOpen} onClose={handleChatClose} />
      </div>
    </div>
  );
}