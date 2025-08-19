import React from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Bug, 
  HelpCircle, 
  BookOpen, 
  Play, 
  Wrench, 
  CreditCard, 
  User, 
  Star, 
  Lightbulb, 
  Heart, 
  ExternalLink,
  ChevronRight 
} from 'lucide-react';

interface SupportScreenProps {
  onBack: () => void;
  onContact: (contactMethod: string) => void;
  onNavigate: (section: string) => void;
  onExternalLink: (link: string) => void;
}

export function SupportScreen({ 
  onBack, 
  onContact, 
  onNavigate, 
  onExternalLink 
}: SupportScreenProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-main)' }}>
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 pt-4 pb-2">
        <span style={{ fontSize: 16, color: 'var(--text-secondary)' }}>9:41</span>
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 16, fontWeight: 500, color: 'var(--text-secondary)' }}>28°C</span>
          <div className="w-5 h-5 rounded-full bg-red-400 flex items-center justify-center">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="px-6 pt-2 pb-8">
        <div className="flex items-center mb-4">
          <button 
            onClick={onBack}
            className="mr-4 p-2 -ml-2 rounded-lg transition-colors"
            style={{ color: 'var(--text-primary)' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-card)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <ArrowLeft size={24} style={{ color: 'var(--text-primary)' }} />
          </button>
        </div>
        
        <div>
          <h1 className="mb-2" style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.2, color: 'var(--text-primary)' }}>
            Support
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.5, color: 'var(--text-secondary)' }}>
            Get help and find answers
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-8 space-y-8">
        {/* GET HELP Section */}
        <div>
          <h2 className="mb-4" style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>
            GET HELP
          </h2>
          <div style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }} className="rounded-lg border">
            {/* Email Support */}
            <div className="p-4 border-b last:border-b-0" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: 'var(--bg-main)' }}>
                    <Mail size={20} style={{ color: 'var(--icon-secondary)' }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1" style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.3, color: 'var(--text-primary)' }}>
                      Email Support
                    </h3>
                    <p style={{ fontSize: 13, lineHeight: 1.4, color: 'var(--text-secondary)' }}>
                      support@nutriflow.app • Response within 24h
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onContact('email')}
                  className="ml-3 px-4 py-2 rounded-lg transition-colors"
                  style={{ 
                    fontSize: 14, 
                    fontWeight: 500, 
                    backgroundColor: 'var(--btn-primary-bg)', 
                    color: 'var(--btn-primary-text)' 
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  Send Email
                </button>
              </div>
            </div>

            {/* Report a Bug */}
            <div className="p-4 border-b last:border-b-0" style={{ borderColor: 'var(--border)' }}>
              <button 
                onClick={() => onNavigate('reportBug')}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center flex-1">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: 'var(--bg-main)' }}>
                    <Bug size={20} style={{ color: 'var(--icon-secondary)' }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1" style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.3, color: 'var(--text-primary)' }}>
                      Report a Bug
                    </h3>
                    <p style={{ fontSize: 13, lineHeight: 1.4, color: 'var(--text-secondary)' }}>
                      Help us fix issues you encounter
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} style={{ color: 'var(--icon-secondary)' }} className="ml-3" />
              </button>
            </div>
          </div>
        </div>

        {/* HELP CENTER Section */}
        <div>
          <h2 className="mb-4" style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>
            HELP CENTER
          </h2>
          <div style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }} className="rounded-lg border">
            {/* FAQ */}
            <div className="p-4 border-b last:border-b-0" style={{ borderColor: 'var(--border)' }}>
              <button 
                onClick={() => onNavigate('faq')}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center flex-1">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: 'var(--bg-main)' }}>
                    <HelpCircle size={20} style={{ color: 'var(--icon-secondary)' }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1" style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.3, color: 'var(--text-primary)' }}>
                      FAQ
                    </h3>
                    <p style={{ fontSize: 13, lineHeight: 1.4, color: 'var(--text-secondary)' }}>
                      Common questions and answers
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} style={{ color: 'var(--icon-secondary)' }} className="ml-3" />
              </button>
            </div>

            {/* Getting Started */}
            <div className="p-4 border-b last:border-b-0" style={{ borderColor: 'var(--border)' }}>
              <button 
                onClick={() => onNavigate('gettingStarted')}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center flex-1">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: 'var(--bg-main)' }}>
                    <BookOpen size={20} style={{ color: 'var(--icon-secondary)' }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1" style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.3, color: 'var(--text-primary)' }}>
                      Getting Started
                    </h3>
                    <p style={{ fontSize: 13, lineHeight: 1.4, color: 'var(--text-secondary)' }}>
                      Learn the basics of NutriFlow
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} style={{ color: 'var(--icon-secondary)' }} className="ml-3" />
              </button>
            </div>

            {/* Video Tutorials */}
            <div className="p-4 border-b last:border-b-0" style={{ borderColor: 'var(--border)' }}>
              <button 
                onClick={() => onNavigate('videoTutorials')}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center flex-1">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: 'var(--bg-main)' }}>
                    <Play size={20} style={{ color: 'var(--icon-secondary)' }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1" style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.3, color: 'var(--text-primary)' }}>
                      Video Tutorials
                    </h3>
                    <p style={{ fontSize: 13, lineHeight: 1.4, color: 'var(--text-secondary)' }}>
                      Step-by-step video guides
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} style={{ color: 'var(--icon-secondary)' }} className="ml-3" />
              </button>
            </div>

            {/* Troubleshooting */}
            <div className="p-4 border-b last:border-b-0" style={{ borderColor: 'var(--border)' }}>
              <button 
                onClick={() => onNavigate('troubleshooting')}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center flex-1">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: 'var(--bg-main)' }}>
                    <Wrench size={20} style={{ color: 'var(--icon-secondary)' }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1" style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.3, color: 'var(--text-primary)' }}>
                      Troubleshooting
                    </h3>
                    <p style={{ fontSize: 13, lineHeight: 1.4, color: 'var(--text-secondary)' }}>
                      Fix common issues
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} style={{ color: 'var(--icon-secondary)' }} className="ml-3" />
              </button>
            </div>
          </div>
        </div>

        {/* ACCOUNT & BILLING Section */}
        <div>
          <h2 className="mb-4" style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>
            ACCOUNT & BILLING
          </h2>
          <div style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }} className="rounded-lg border">
            {/* Billing Questions */}
            <div className="p-4 border-b last:border-b-0" style={{ borderColor: 'var(--border)' }}>
              <button 
                onClick={() => onNavigate('billing')}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center flex-1">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: 'var(--bg-main)' }}>
                    <CreditCard size={20} style={{ color: 'var(--icon-secondary)' }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1" style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.3, color: 'var(--text-primary)' }}>
                      Billing Questions
                    </h3>
                    <p style={{ fontSize: 13, lineHeight: 1.4, color: 'var(--text-secondary)' }}>
                      Subscription and payment help
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} style={{ color: 'var(--icon-secondary)' }} className="ml-3" />
              </button>
            </div>

            {/* Account Issues */}
            <div className="p-4 border-b last:border-b-0" style={{ borderColor: 'var(--border)' }}>
              <button 
                onClick={() => onNavigate('account')}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center flex-1">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: 'var(--bg-main)' }}>
                    <User size={20} style={{ color: 'var(--icon-secondary)' }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1" style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.3, color: 'var(--text-primary)' }}>
                      Account Issues
                    </h3>
                    <p style={{ fontSize: 13, lineHeight: 1.4, color: 'var(--text-secondary)' }}>
                      Login problems and account settings
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} style={{ color: 'var(--icon-secondary)' }} className="ml-3" />
              </button>
            </div>
          </div>
        </div>

        {/* FEEDBACK Section */}
        <div>
          <h2 className="mb-4" style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>
            FEEDBACK
          </h2>
          <div style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }} className="rounded-lg border">
            {/* Send Feedback */}
            <div className="p-4 border-b last:border-b-0" style={{ borderColor: 'var(--border)' }}>
              <button 
                onClick={() => onNavigate('feedback')}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center flex-1">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: 'var(--bg-main)' }}>
                    <Star size={20} style={{ color: 'var(--icon-secondary)' }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1" style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.3, color: 'var(--text-primary)' }}>
                      Send Feedback
                    </h3>
                    <p style={{ fontSize: 13, lineHeight: 1.4, color: 'var(--text-secondary)' }}>
                      Help us improve NutriFlow
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} style={{ color: 'var(--icon-secondary)' }} className="ml-3" />
              </button>
            </div>

            {/* Feature Requests */}
            <div className="p-4 border-b last:border-b-0" style={{ borderColor: 'var(--border)' }}>
              <button 
                onClick={() => onNavigate('featureRequests')}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center flex-1">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: 'var(--bg-main)' }}>
                    <Lightbulb size={20} style={{ color: 'var(--icon-secondary)' }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1" style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.3, color: 'var(--text-primary)' }}>
                      Feature Requests
                    </h3>
                    <p style={{ fontSize: 13, lineHeight: 1.4, color: 'var(--text-secondary)' }}>
                      Suggest new features
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} style={{ color: 'var(--icon-secondary)' }} className="ml-3" />
              </button>
            </div>

            {/* Rate the App */}
            <div className="p-4 border-b last:border-b-0" style={{ borderColor: 'var(--border)' }}>
              <button 
                onClick={() => onExternalLink('appStore')}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center flex-1">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: 'var(--bg-main)' }}>
                    <Heart size={20} style={{ color: 'var(--icon-secondary)' }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1" style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.3, color: 'var(--text-primary)' }}>
                      Rate the App
                    </h3>
                    <p style={{ fontSize: 13, lineHeight: 1.4, color: 'var(--text-secondary)' }}>
                      Leave a review on the App Store
                    </p>
                  </div>
                </div>
                <ExternalLink size={20} style={{ color: 'var(--icon-secondary)' }} className="ml-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}