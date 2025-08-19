import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Eye, EyeOff, Check, Users } from 'lucide-react';

interface AccountCreationScreenProps {
  onAccountCreated: (email: string) => void;
  onSwitchToSignIn: () => void;
  onBack: () => void;
}

// Password strength indicator component
function PasswordStrengthIndicator({ password }: { password: string }) {
  const getStrength = (password: string): number => {
    if (password.length === 0) return 0;
    if (password.length < 6) return 1;
    if (password.length < 8) return 2;
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return 4;
    return 3;
  };

  const strength = getStrength(password);
  const colors = ['#e5e5e7', '#F59E0B', '#F59E0B', '#10B981', '#10B981'];

  return (
    <div className="flex gap-1 mt-2">
      {[...Array(4)].map((_, index) => (
        <motion.div
          key={index}
          className="w-2 h-2 rounded-full"
          style={{ 
            backgroundColor: index < strength ? colors[strength] : '#e5e5e7'
          }}
          initial={{ scale: 0.8 }}
          animate={{ 
            scale: index < strength ? 1 : 0.8,
            backgroundColor: index < strength ? colors[strength] : '#e5e5e7'
          }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
        />
      ))}
    </div>
  );
}

// Social login button component
function SocialButton({ provider, icon, onClick }: { 
  provider: 'google' | 'apple', 
  icon: React.ReactNode, 
  onClick: () => void 
}) {
  return (
    <motion.button
      onClick={onClick}
      className="w-full flex items-center justify-center py-4 px-4 rounded-xl border"
      style={{ 
        backgroundColor: '#ffffff',
        borderColor: '#e5e5e7',
        color: '#1d1d1f',
        minHeight: '52px'
      }}
      whileHover={{ 
        backgroundColor: '#f9f9f9',
        borderColor: '#d1d1d6',
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.8 }}
    >
      <div className="flex items-center justify-center">
        {icon}
      </div>
    </motion.button>
  );
}

// Google G logo component
function GoogleIcon() {
  return (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24"
      style={{ 
        display: 'block',
        margin: '0 auto'
      }}
    >
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

// Apple logo component
function AppleIcon() {
  return (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="#000000"
      style={{ 
        display: 'block',
        margin: '0 auto'
      }}
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

export function AccountCreationScreen({ onAccountCreated, onSwitchToSignIn, onBack }: AccountCreationScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = email.length > 0 && password.length >= 6 && termsAccepted;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onAccountCreated(email);
    }, 1500);
  };

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    // In real app, this would initiate OAuth flow
    console.log(`Social login with ${provider}`);
    // For social login, use a placeholder email (in real app this would come from OAuth)
    const socialEmail = `user@${provider}.com`;
    onAccountCreated(socialEmail);
  };

  return (
    <div 
      className="w-full flex flex-col"
      style={{ 
        backgroundColor: '#ffffff',
        maxWidth: '375px',
        margin: '0 auto',
        height: '812px',
        overflow: 'hidden'
      }}
    >
      {/* Header - 80px total */}
      <div className="flex-shrink-0 px-6" style={{ height: '80px' }}>
        <div className="flex items-center justify-between h-full">
          <motion.button
            onClick={onBack}
            className="p-2 -ml-2 rounded-full"
            style={{ color: '#1d1d1f' }}
            whileHover={{ 
              backgroundColor: '#f2f2f7',
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ArrowLeft size={24} />
          </motion.button>
          
          <div className="w-10" />
        </div>
      </div>

      {/* Title Section - 120px */}
      <div className="flex-shrink-0 px-6" style={{ height: '120px' }}>
        <motion.h1
          style={{ 
            fontSize: '28px', 
            fontWeight: 700,
            color: '#1d1d1f',
            marginBottom: '8px',
            textAlign: 'center',
            letterSpacing: '-0.3px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Create Your Account
        </motion.h1>
        
        <motion.div
          className="flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Users size={16} style={{ color: '#86868b' }} />
          <span
            style={{ 
              fontSize: '15px', 
              fontWeight: 400,
              color: '#86868b',
              textAlign: 'center',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
            }}
          >
            Join thousands of athletes using NutriFlow
          </span>
        </motion.div>
      </div>

      {/* Form Section - 372px */}
      <div className="flex-1 px-6" style={{ height: '372px' }}>
        <form onSubmit={handleSubmit} className="h-full flex flex-col">
          {/* Email Field */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <label 
              htmlFor="email"
              style={{ 
                fontSize: '15px', 
                fontWeight: 500,
                color: '#1d1d1f',
                marginBottom: '8px',
                display: 'block',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
              }}
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full py-4 px-4 rounded-xl border-2 transition-all duration-200"
              style={{ 
                backgroundColor: '#f9f9f9',
                borderColor: '#e5e5e7',
                color: '#1d1d1f',
                fontSize: '16px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#4A90E2';
                e.target.style.backgroundColor = '#ffffff';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e5e7';
                e.target.style.backgroundColor = '#f9f9f9';
              }}
            />
          </motion.div>

          {/* Password Field */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <label 
              htmlFor="password"
              style={{ 
                fontSize: '15px', 
                fontWeight: 500,
                color: '#1d1d1f',
                marginBottom: '8px',
                display: 'block',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
              }}
            >
              Create password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="w-full py-4 px-4 pr-20 rounded-xl border-2 transition-all duration-200"
                style={{ 
                  backgroundColor: '#f9f9f9',
                  borderColor: '#e5e5e7',
                  color: '#1d1d1f',
                  fontSize: '16px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#4A90E2';
                  e.target.style.backgroundColor = '#ffffff';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e5e7';
                  e.target.style.backgroundColor = '#f9f9f9';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                style={{ 
                  color: '#86868b',
                  fontSize: '14px',
                  fontWeight: 500,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
                }}
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
            <PasswordStrengthIndicator password={password} />
          </motion.div>

          {/* Terms Checkbox */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="relative flex-shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="sr-only"
                />
                <motion.div
                  className="w-5 h-5 rounded border-2 flex items-center justify-center"
                  style={{ 
                    borderColor: termsAccepted ? '#4A90E2' : '#e5e5e7',
                    backgroundColor: termsAccepted ? '#4A90E2' : '#ffffff'
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ 
                    borderColor: termsAccepted ? '#4A90E2' : '#e5e5e7',
                    backgroundColor: termsAccepted ? '#4A90E2' : '#ffffff'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {termsAccepted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2, ease: "backOut" }}
                    >
                      <Check size={12} color="#ffffff" />
                    </motion.div>
                  )}
                </motion.div>
              </div>
              <span
                style={{ 
                  fontSize: '15px', 
                  fontWeight: 400,
                  color: '#1d1d1f',
                  lineHeight: '20px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
                }}
              >
                I agree to the{' '}
                <span style={{ color: '#4A90E2', textDecoration: 'underline' }}>
                  Terms of Service
                </span>
                {' '}and{' '}
                <span style={{ color: '#4A90E2', textDecoration: 'underline' }}>
                  Privacy Policy
                </span>
              </span>
            </label>
          </motion.div>

          {/* Create Account Button */}
          <motion.button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="w-full py-4 rounded-xl mb-6"
            style={{ 
              backgroundColor: isFormValid ? '#1d1d1f' : '#e5e5e7',
              color: isFormValid ? '#ffffff' : '#86868b',
              fontSize: '17px',
              fontWeight: 600,
              border: 'none',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
            }}
            whileHover={isFormValid ? { 
              backgroundColor: '#2d2d2f',
              transition: { duration: 0.2 }
            } : {}}
            whileTap={isFormValid ? { 
              scale: 0.98,
              transition: { duration: 0.1 }
            } : {}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </motion.button>
        </form>
      </div>

      {/* Bottom Section - 240px */}
      <div className="flex-shrink-0 px-6 pb-6" style={{ height: '240px' }}>
        {/* Social Login Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px" style={{ backgroundColor: '#e5e5e7' }} />
            <span 
              style={{ 
                fontSize: '14px', 
                color: '#86868b',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
              }}
            >
              or continue with
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: '#e5e5e7' }} />
          </div>

          <div className="flex gap-3 mb-8">
            <div className="flex-1">
              <SocialButton
                provider="google"
                icon={<GoogleIcon />}
                onClick={() => handleSocialLogin('google')}
              />
            </div>
            <div className="flex-1">
              <SocialButton
                provider="apple"
                icon={<AppleIcon />}
                onClick={() => handleSocialLogin('apple')}
              />
            </div>
          </div>
        </motion.div>

        {/* Sign In Link */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <button
            onClick={onSwitchToSignIn}
            style={{ 
              background: 'none',
              border: 'none',
              fontSize: '15px',
              fontWeight: 400,
              color: '#86868b',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
            }}
            className="hover:text-gray-900 transition-colors duration-200"
          >
            Already have an account?{' '}
            <span style={{ color: '#4A90E2', fontWeight: 500 }}>
              Sign in
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}