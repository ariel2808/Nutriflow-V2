import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

interface LoginScreenProps {
  onSignIn: () => void;
  onBack: () => void;
  onForgotPassword: () => void;
  onCreateAccount: () => void;
  onGoogleSignIn: () => void;
  onAppleSignIn: () => void;
}

export function LoginScreen({ 
  onSignIn, 
  onBack, 
  onForgotPassword, 
  onCreateAccount,
  onGoogleSignIn,
  onAppleSignIn 
}: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Check if form is valid
  const isFormValid = () => {
    return email && password && validateEmail(email) && password.length >= 6;
  };

  const handleSignIn = async () => {
    // Clear previous errors
    setEmailError('');
    setPasswordError('');

    // Validate email
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Validate password
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    setIsSigningIn(true);

    // Simulate sign-in process
    setTimeout(() => {
      setIsSigningIn(false);
      onSignIn();
    }, 1500);
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
      {/* Header - 160px total */}
      <div className="flex-shrink-0" style={{ height: '160px' }}>
        {/* Back Button Row */}
        <div className="flex items-center justify-start px-6 pt-6 pb-4" style={{ height: '60px' }}>
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
        </div>

        {/* Logo and Welcome Section */}
        <div className="flex-1 px-6 flex flex-col justify-center" style={{ height: '100px' }}>
          <div className="flex flex-col items-start">
            {/* Logo */}
            <motion.div
              className="flex items-center mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div 
                className="rounded-full flex items-center justify-center mr-3"
                style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)'
                }}
              >
                <div className="text-white text-lg font-bold">N</div>
              </div>
              <span 
                style={{ 
                  fontSize: '28px', 
                  fontWeight: 700,
                  color: '#1d1d1f',
                  letterSpacing: '-0.5px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
                }}
              >
                NutriFlow
              </span>
            </motion.div>

            {/* Welcome Text */}
            <motion.span
              style={{ 
                fontSize: '17px', 
                fontWeight: 400,
                color: '#86868b',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Welcome back
            </motion.span>
          </div>
        </div>
      </div>

      {/* Form Section - flexible ~400px */}
      <div className="flex-1 px-6 flex flex-col justify-center" style={{ minHeight: '0' }}>
        <motion.div
          className="space-y-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Email Field */}
          <div>
            <label 
              className="block mb-2" 
              style={{ 
                fontSize: '15px', 
                color: '#1d1d1f', 
                fontWeight: 500,
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
              }}
            >
              Email address
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
              className="w-full py-4 px-4 rounded-xl border-2 transition-all duration-200"
              style={{
                backgroundColor: '#f9f9f9',
                borderColor: emailError ? '#DC2626' : '#e5e5e7',
                color: '#1d1d1f',
                fontSize: '16px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
              }}
              autoComplete="email"
              inputMode="email"
            />
            {emailError && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ 
                  fontSize: '13px', 
                  color: '#DC2626', 
                  marginTop: '6px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
                }}
              >
                {emailError}
              </motion.p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label 
              className="block mb-2" 
              style={{ 
                fontSize: '15px', 
                color: '#1d1d1f', 
                fontWeight: 500,
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
              }}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                className="w-full py-4 px-4 pr-12 rounded-xl border-2 transition-all duration-200"
                style={{
                  backgroundColor: '#f9f9f9',
                  borderColor: passwordError ? '#DC2626' : '#e5e5e7',
                  color: '#1d1d1f',
                  fontSize: '16px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
                }}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1"
                style={{ color: '#86868b' }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {passwordError && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ 
                  fontSize: '13px', 
                  color: '#DC2626', 
                  marginTop: '6px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
                }}
              >
                {passwordError}
              </motion.p>
            )}
          </div>

          {/* Options Row */}
          <div className="flex items-center justify-between">
            {/* Remember Me */}
            <div className="flex items-center">
              <motion.button
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center justify-center w-5 h-5 rounded border-2 mr-2 transition-all duration-200"
                style={{
                  backgroundColor: rememberMe ? '#1d1d1f' : 'transparent',
                  borderColor: rememberMe ? '#1d1d1f' : '#e5e5e7'
                }}
                whileTap={{ scale: 0.95 }}
              >
                {rememberMe && (
                  <motion.svg
                    width="12"
                    height="9"
                    viewBox="0 0 12 9"
                    fill="none"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      d="M10.5 1.5L4.5 7.5L1.5 4.5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                )}
              </motion.button>
              <span
                style={{ 
                  fontSize: '15px', 
                  color: '#1d1d1f',
                  fontWeight: 400,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
                }}
              >
                Remember me
              </span>
            </div>

            {/* Forgot Password */}
            <motion.button
              onClick={onForgotPassword}
              style={{ 
                fontSize: '15px', 
                color: '#4A90E2',
                fontWeight: 500,
                background: 'none',
                border: 'none',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
              }}
              whileHover={{ color: '#357ABD' }}
              whileTap={{ scale: 0.98 }}
            >
              Forgot password?
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Actions Section - 250px total */}
      <div className="flex-shrink-0 px-6 pb-8" style={{ height: '250px' }}>
        <motion.div
          className="space-y-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Sign In Button */}
          <motion.button
            onClick={handleSignIn}
            disabled={!isFormValid() || isSigningIn}
            className="w-full py-4 rounded-xl"
            style={{ 
              backgroundColor: isFormValid() ? '#1d1d1f' : '#e5e5e7',
              color: isFormValid() ? '#ffffff' : '#86868b',
              fontSize: '17px',
              fontWeight: 600,
              border: 'none',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
            }}
            whileHover={isFormValid() ? { 
              backgroundColor: '#2d2d2f',
              transition: { duration: 0.2 }
            } : {}}
            whileTap={isFormValid() ? { 
              scale: 0.98,
              transition: { duration: 0.1 }
            } : {}}
          >
            {isSigningIn ? 'Signing in...' : 'Sign In'}
          </motion.button>

          {/* Social Login */}
          <div className="flex gap-3">
            <motion.button
              onClick={onGoogleSignIn}
              className="flex-1 py-4 rounded-xl border-2 flex items-center justify-center"
              style={{
                backgroundColor: 'transparent',
                borderColor: '#e5e5e7',
                color: '#1d1d1f'
              }}
              whileHover={{ 
                backgroundColor: '#f9f9f9',
                borderColor: '#d1d1d6',
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </motion.button>

            <motion.button
              onClick={onAppleSignIn}
              className="flex-1 py-4 rounded-xl border-2 flex items-center justify-center"
              style={{
                backgroundColor: 'transparent',
                borderColor: '#e5e5e7',
                color: '#1d1d1f'
              }}
              whileHover={{ 
                backgroundColor: '#f9f9f9',
                borderColor: '#d1d1d6',
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
            </motion.button>
          </div>

          {/* Create Account Link */}
          <div className="flex items-center justify-center pt-4">
            <span
              style={{ 
                fontSize: '15px', 
                color: '#86868b',
                fontWeight: 400,
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
              }}
            >
              Don't have an account?{' '}
            </span>
            <motion.button
              onClick={onCreateAccount}
              style={{ 
                fontSize: '15px', 
                color: '#4A90E2',
                fontWeight: 500,
                background: 'none',
                border: 'none',
                marginLeft: '4px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
              }}
              whileHover={{ color: '#357ABD' }}
              whileTap={{ scale: 0.98 }}
            >
              Create one
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}