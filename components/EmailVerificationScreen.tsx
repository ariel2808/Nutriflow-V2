import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Mail, Check } from 'lucide-react';

interface EmailVerificationScreenProps {
  email: string;
  onVerificationSuccess: () => void;
  onSkip: () => void;
  onBack: () => void;
  onChangeEmail: () => void;
}

export function EmailVerificationScreen({ 
  email, 
  onVerificationSuccess, 
  onSkip, 
  onBack,
  onChangeEmail 
}: EmailVerificationScreenProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Start resend countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Reset resend timer
  const resetResendTimer = () => {
    setResendTimer(60);
    setCanResend(false);
  };

  // Handle input change
  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digits
    if (value && !/^\d$/.test(value)) return; // Only allow digits

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError(''); // Clear any existing error

    // Auto-advance to next field
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newCode = [...code];
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newCode[i] = pastedData[i];
    }
    
    setCode(newCode);
    
    // Focus the next empty field or the last field
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  // Check if code is complete
  const isCodeComplete = code.every(digit => digit !== '');

  // Handle verification
  const handleVerify = async () => {
    if (!isCodeComplete) return;

    setIsVerifying(true);
    setError('');

    // Simulate verification process
    setTimeout(() => {
      const enteredCode = code.join('');
      
      // Mock verification - in real app this would be an API call
      if (enteredCode === '123456') {
        setIsVerified(true);
        setTimeout(() => {
          onVerificationSuccess();
        }, 1500);
      } else {
        setError('Invalid verification code. Please try again.');
        setCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
      
      setIsVerifying(false);
    }, 1500);
  };

  // Handle resend code
  const handleResendCode = () => {
    if (!canResend) return;
    
    // Simulate resending code
    console.log('Resending verification code to:', email);
    resetResendTimer();
    setError('');
    
    // Clear current code
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
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
      {/* Header - 200px total */}
      <div className="flex-shrink-0" style={{ height: '200px' }}>
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

        {/* Email Icon and Title Section */}
        <div className="flex-1 px-6 flex flex-col justify-center items-center" style={{ height: '140px' }}>
          {/* Email Icon */}
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
                background: 'linear-gradient(135deg, #4CAF50 0%, #45A049 100%)'
              }}
            >
              <Mail size={36} color="#ffffff" />
              
              {/* Shine animation */}
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
            Check your email
          </motion.h1>

          {/* Subtitle and Email */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              style={{ 
                fontSize: '16px', 
                fontWeight: 400,
                color: '#86868b',
                marginBottom: '4px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
              }}
            >
              We sent a verification code to
            </p>
            <p
              style={{ 
                fontSize: '16px', 
                fontWeight: 500,
                color: '#1d1d1f',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
              }}
            >
              {email}
            </p>
          </motion.div>
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
          {/* Code Input Label */}
          <div className="text-center">
            <label 
              style={{ 
                fontSize: '15px', 
                color: '#1d1d1f', 
                fontWeight: 500,
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
              }}
            >
              Enter 6-digit code
            </label>
          </div>

          {/* Code Input Fields */}
          <div className="flex justify-center gap-3">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="text-center rounded-xl border-2 transition-all duration-200"
                style={{
                  width: '48px',
                  height: '56px',
                  backgroundColor: digit ? '#f0f9f0' : '#f9f9f9',
                  borderColor: error ? '#DC2626' : digit ? '#4CAF50' : '#e5e5e7',
                  color: '#1d1d1f',
                  fontSize: '24px',
                  fontWeight: 700,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
                }}
                disabled={isVerifying || isVerified}
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ 
                fontSize: '14px', 
                color: '#DC2626', 
                textAlign: 'center',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
              }}
            >
              {error}
            </motion.p>
          )}

          {/* Resend Section */}
          <div className="text-center space-y-2">
            <p
              style={{ 
                fontSize: '15px', 
                color: '#86868b',
                fontWeight: 400,
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
              }}
            >
              Didn't receive the code?
            </p>
            <motion.button
              onClick={handleResendCode}
              disabled={!canResend}
              style={{ 
                fontSize: '15px', 
                color: canResend ? '#4CAF50' : '#86868b',
                fontWeight: 500,
                background: 'none',
                border: 'none',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
              }}
              whileHover={canResend ? { color: '#45A049' } : {}}
              whileTap={canResend ? { scale: 0.98 } : {}}
            >
              {canResend ? 'Resend code' : `Resend in 0:${resendTimer.toString().padStart(2, '0')}`}
            </motion.button>
          </div>

          {/* Help Section */}
          <div 
            className="rounded-xl p-4"
            style={{ backgroundColor: '#f9f9f9' }}
          >
            <h4
              style={{ 
                fontSize: '15px', 
                color: '#1d1d1f', 
                fontWeight: 500,
                marginBottom: '8px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
              }}
            >
              Can't find the email?
            </h4>
            <div className="space-y-2">
              {[
                'Check your spam or junk folder',
                'Verify your email address is correct',
                'Wait a few minutes for delivery'
              ].map((tip, index) => (
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
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
                    }}
                  >
                    {tip}
                  </p>
                </div>
              ))}
            </div>
            <motion.button
              onClick={onChangeEmail}
              style={{ 
                fontSize: '14px', 
                color: '#4CAF50',
                fontWeight: 500,
                background: 'none',
                border: 'none',
                marginTop: '8px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
              }}
              whileHover={{ color: '#45A049' }}
              whileTap={{ scale: 0.98 }}
            >
              Use a different email address
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Actions Section - 100px total */}
      <div className="flex-shrink-0 px-6 pb-8" style={{ height: '100px' }}>
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Verify Button */}
          <motion.button
            onClick={handleVerify}
            disabled={!isCodeComplete || isVerifying || isVerified}
            className="w-full py-4 rounded-xl flex items-center justify-center"
            style={{ 
              backgroundColor: isVerified ? '#4CAF50' : (isCodeComplete && !isVerifying) ? '#1d1d1f' : '#e5e5e7',
              color: isVerified ? '#ffffff' : (isCodeComplete && !isVerifying) ? '#ffffff' : '#86868b',
              fontSize: '17px',
              fontWeight: 600,
              border: 'none',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
            }}
            whileHover={(isCodeComplete && !isVerifying && !isVerified) ? { 
              backgroundColor: '#2d2d2f',
              transition: { duration: 0.2 }
            } : {}}
            whileTap={(isCodeComplete && !isVerifying && !isVerified) ? { 
              scale: 0.98,
              transition: { duration: 0.1 }
            } : {}}
          >
            {isVerified ? (
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Check size={20} />
                Verified!
              </motion.div>
            ) : isVerifying ? (
              'Verifying...'
            ) : (
              'Verify Email'
            )}
          </motion.button>

          {/* Skip Link */}
          <div className="flex items-center justify-center">
            <motion.button
              onClick={onSkip}
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
              I'll verify later
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}