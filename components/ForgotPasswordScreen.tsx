import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Lock, Mail, Info, Check } from 'lucide-react';

interface ForgotPasswordScreenProps {
  onBack: () => void;
  onBackToLogin: () => void;
}

export function ForgotPasswordScreen({ onBack, onBackToLogin }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Check if form is valid
  const isFormValid = () => {
    return email && validateEmail(email);
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Clear previous errors
    setEmailError('');

    // Validate email
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    // Simulate sending reset email
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setResendTimer(60); // Start 60 second timer
      
      // Start countdown
      const timer = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1500);
  };

  // Handle resend
  const handleResend = () => {
    if (resendTimer > 0) return;
    
    console.log('Resending reset email to:', email);
    setResendTimer(60);
    
    // Start countdown again
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
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
      {/* Header - 220px total */}
      <div className="flex-shrink-0" style={{ height: '220px' }}>
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

        {/* Icon and Title Section */}
        <div className="flex-1 px-6 flex flex-col justify-center items-center" style={{ height: '160px' }}>
          {/* Icon */}
          <motion.div
            className="relative mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div 
              className="rounded-full flex items-center justify-center relative overflow-hidden"
              style={{
                width: '80px',
                height: '80px',
                background: isSubmitted 
                  ? 'linear-gradient(135deg, #4CAF50 0%, #45A049 100%)'
                  : 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)'
              }}
            >
              <motion.div
                initial={false}
                animate={{ 
                  rotateY: isSubmitted ? 180 : 0,
                  scale: isSubmitted ? 0.8 : 1
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {isSubmitted ? (
                  <Mail size={36} color="#ffffff" />
                ) : (
                  <Lock size={36} color="#ffffff" />
                )}
              </motion.div>
              
              {/* Shine animation - only when not submitted */}
              {!isSubmitted && (
                <motion.div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
                    transform: 'translateX(-100%)'
                  }}
                  animate={{
                    transform: ['translateX(-100%)', 'translateX(100%)']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                />
              )}
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            style={{ 
              fontSize: '26px', 
              fontWeight: 700,
              color: '#1d1d1f',
              marginBottom: '8px',
              textAlign: 'center',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {isSubmitted ? 'Check your email' : 'Forgot your password?'}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            style={{ 
              fontSize: '16px', 
              fontWeight: 400,
              color: '#86868b',
              textAlign: 'center',
              lineHeight: '22px',
              maxWidth: '280px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {isSubmitted 
              ? `We sent password reset instructions to ${email}`
              : 'No worries! Enter your email and we\'ll send you reset instructions'
            }
          </motion.p>
        </div>
      </div>

      {/* Form Section - flexible ~400px */}
      <div className="flex-1 px-6 flex flex-col justify-center" style={{ minHeight: '0' }}>
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {!isSubmitted ? (
            <>
              {/* Email Input */}
              <div>
                <label 
                  style={{ 
                    fontSize: '15px', 
                    color: '#1d1d1f', 
                    fontWeight: 500,
                    marginBottom: '8px',
                    display: 'block',
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

              {/* Info Card */}
              <div 
                className="rounded-xl p-4"
                style={{ backgroundColor: '#f9f9f9' }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div 
                    className="rounded-full p-1 flex-shrink-0"
                    style={{ backgroundColor: '#4CAF50' }}
                  >
                    <Info size={14} color="#ffffff" />
                  </div>
                  <h4
                    style={{ 
                      fontSize: '15px', 
                      color: '#1d1d1f', 
                      fontWeight: 500,
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
                    }}
                  >
                    What happens next?
                  </h4>
                </div>
                <div className="space-y-2 ml-6">
                  {[
                    'We\'ll send a secure reset link to your email',
                    'Click the link to create a new password',
                    'Link expires in 24 hours for security'
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div 
                        className="rounded-full flex-shrink-0 mt-1"
                        style={{ 
                          width: '6px', 
                          height: '6px', 
                          backgroundColor: '#4CAF50' 
                        }}
                      />
                      <p
                        style={{ 
                          fontSize: '14px', 
                          color: '#86868b',
                          fontWeight: 400,
                          lineHeight: '20px',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
                        }}
                      >
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Success State Info Card */
            <div 
              className="rounded-xl p-4"
              style={{ backgroundColor: '#f0f9f0' }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div 
                  className="rounded-full p-1 flex-shrink-0"
                  style={{ backgroundColor: '#4CAF50' }}
                >
                  <Check size={14} color="#ffffff" />
                </div>
                <h4
                  style={{ 
                    fontSize: '15px', 
                    color: '#1d1d1f', 
                    fontWeight: 500,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
                  }}
                >
                  Reset link sent successfully
                </h4>
              </div>
              <div className="space-y-2 ml-6">
                {[
                  'Check your email inbox and spam folder',
                  'Click the "Reset Password" link in the email',
                  'Create your new secure password'
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div 
                      className="rounded-full flex-shrink-0 mt-1"
                      style={{ 
                        width: '6px', 
                        height: '6px', 
                        backgroundColor: '#4CAF50' 
                      }}
                    />
                    <p
                      style={{ 
                        fontSize: '14px', 
                        color: '#86868b',
                        fontWeight: 400,
                        lineHeight: '20px',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
                      }}
                    >
                      {step}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Resend option */}
              <div className="mt-4 pt-3 border-t" style={{ borderColor: '#e5e5e7' }}>
                <div className="flex items-center justify-between">
                  <span
                    style={{ 
                      fontSize: '14px', 
                      color: '#86868b',
                      fontWeight: 400,
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
                    }}
                  >
                    Didn't receive the email?
                  </span>
                  <motion.button
                    onClick={handleResend}
                    disabled={resendTimer > 0}
                    style={{ 
                      fontSize: '14px', 
                      color: resendTimer > 0 ? '#86868b' : '#4CAF50',
                      fontWeight: 500,
                      background: 'none',
                      border: 'none',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
                    }}
                    whileHover={resendTimer === 0 ? { color: '#45A049' } : {}}
                    whileTap={resendTimer === 0 ? { scale: 0.98 } : {}}
                  >
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend'}
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Actions Section - 120px total */}
      <div className="flex-shrink-0 px-6 pb-8" style={{ height: '120px' }}>
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Primary Button */}
          {!isSubmitted ? (
            <motion.button
              onClick={handleSubmit}
              disabled={!isFormValid() || isSubmitting}
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
              {isSubmitting ? 'Sending Reset Link...' : 'Send Reset Link'}
            </motion.button>
          ) : (
            <motion.button
              onClick={onBackToLogin}
              className="w-full py-4 rounded-xl"
              style={{ 
                backgroundColor: '#4CAF50',
                color: '#ffffff',
                fontSize: '17px',
                fontWeight: 600,
                border: 'none',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
              }}
              whileHover={{ 
                backgroundColor: '#45A049',
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Back to Sign In
            </motion.button>
          )}

          {/* Back to Login Link */}
          {!isSubmitted && (
            <div className="flex items-center justify-center">
              <motion.button
                onClick={onBackToLogin}
                className="flex items-center gap-2"
                style={{ 
                  fontSize: '15px', 
                  color: '#86868b',
                  fontWeight: 400,
                  background: 'none',
                  border: 'none',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
                }}
                whileHover={{ color: '#1d1d1f' }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowLeft size={16} />
                Back to Sign In
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}