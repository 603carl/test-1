import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, Shield } from 'lucide-react';
import { useAuthContext } from '../contexts/AuthContext';
import { useSecurityContext } from '../components/SecurityProvider';
import { useRateLimit } from '../hooks/useRateLimit';
import { validatePassword, sanitizeInput, validateEmail } from '../lib/security';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { signIn, signUp } = useAuthContext();
  const { logSecurityEvent } = useSecurityContext();
  const loginRateLimit = useRateLimit('login');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    
    setFormData({
      ...formData,
      [name]: sanitizedValue
    });
    setError(null);

    // Real-time password validation
    if (name === 'password' && !isLogin) {
      const validation = validatePassword(sanitizedValue);
      setPasswordErrors(validation.errors);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    if (!loginRateLimit.canProceed) {
      const remainingTime = Math.ceil(loginRateLimit.remainingTime / 1000 / 60);
      setError(`Too many login attempts. Please wait ${remainingTime} minutes.`);
      return;
    }

    setLoading(true);
    setError(null);
    loginRateLimit.recordAttempt();

    try {
      // Validate email format
      if (!validateEmail(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      if (isLogin) {
        // Login attempt
        await logSecurityEvent({
          type: 'login_attempt',
          severity: 'low',
          details: {
            email: formData.email,
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent,
          },
        });

        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          await logSecurityEvent({
            type: 'failed_login',
            severity: 'medium',
            details: {
              email: formData.email,
              error: error.message,
              timestamp: new Date().toISOString(),
            },
          });
          throw error;
        }
        
        await logSecurityEvent({
          type: 'login_attempt',
          severity: 'low',
          details: {
            email: formData.email,
            status: 'success',
            timestamp: new Date().toISOString(),
          },
        });
        
        navigate('/dashboard');
      } else {
        // Registration validation
        const passwordValidation = validatePassword(formData.password);
        if (!passwordValidation.isValid) {
          setPasswordErrors(passwordValidation.errors);
          throw new Error('Please fix password requirements');
        }

        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }

        if (!formData.firstName.trim() || !formData.lastName.trim()) {
          throw new Error('First name and last name are required');
        }

        const { error } = await signUp(
          formData.email, 
          formData.password, 
          formData.firstName.trim(), 
          formData.lastName.trim()
        );
        
        if (error) {
          await logSecurityEvent({
            type: 'suspicious_activity',
            severity: 'medium',
            details: {
              type: 'failed_registration',
              email: formData.email,
              error: error.message,
            },
          });
          throw error;
        }
        
        await logSecurityEvent({
          type: 'login_attempt',
          severity: 'low',
          details: {
            type: 'new_registration',
            email: formData.email,
            timestamp: new Date().toISOString(),
          },
        });
        
        navigate('/onboarding');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="relative mx-auto mb-6">
            <img 
              src="https://ivory-capitalist-cockroach-275.mypinata.cloud/ipfs/bafkreiavl5es6ojh3gmxhhpowks5hjesbsdm6trxjuhgasvfvm3hlscysm"
              alt="Smart Algos Logo"
              className="h-20 w-20 object-contain mx-auto drop-shadow-md"
              onError={(e) => {
                // Fallback to gradient background if logo fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="hidden h-20 w-20 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl items-center justify-center mx-auto shadow-lg">
              <span className="text-white font-bold text-2xl">SA</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-neutral-900">
            {isLogin ? 'Secure Sign In' : 'Create Secure Account'}
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            {isLogin ? (
              <>
                Or{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  create a new account
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>

        {/* Security Notice */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-primary-600 mr-2" />
            <span className="text-primary-800 text-sm font-medium">Bank-Level Security</span>
          </div>
          <p className="text-primary-700 text-xs mt-1">
            Your data is protected with AES-256 encryption and multi-factor authentication.
          </p>
        </div>

        {/* Rate Limit Warning */}
        {loginRateLimit.isBlocked && (
          <div className="bg-error-50 border border-error-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-error-600 mr-2" />
              <span className="text-error-800 text-sm">
                Too many attempts. Please wait {Math.ceil(loginRateLimit.remainingTime / 1000 / 60)} minutes.
              </span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-error-50 border border-error-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-error-600 mr-2" />
              <span className="text-error-800 text-sm">{error}</span>
            </div>
          </div>
        )}

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="sr-only">
                    First name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required={!isLogin}
                      className="block w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-lg placeholder-neutral-500 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="sr-only">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required={!isLogin}
                    className="block w-full px-3 py-3 border border-neutral-300 rounded-lg placeholder-neutral-500 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-lg placeholder-neutral-500 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  required
                  className="block w-full pl-10 pr-10 py-3 border border-neutral-300 rounded-lg placeholder-neutral-500 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder={isLogin ? 'Password' : 'Strong password (12+ chars)'}
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-neutral-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-neutral-400" />
                  )}
                </button>
              </div>
              
              {/* Password Requirements */}
              {!isLogin && passwordErrors.length > 0 && (
                <div className="mt-2 space-y-1">
                  {passwordErrors.map((error, index) => (
                    <p key={index} className="text-xs text-error-600 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {error}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required={!isLogin}
                    className="block w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-lg placeholder-neutral-500 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}
          </div>

          {isLogin && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  Forgot your password?
                </a>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading || loginRateLimit.isBlocked}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                isLogin ? 'Sign in securely' : 'Create secure account'
              )}
            </button>
          </div>

          {!isLogin && (
            <div className="text-xs text-neutral-600 text-center">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Privacy Policy
              </a>
            </div>
          )}
        </form>

        {/* Security Features */}
        <div className="mt-6 text-center">
          <p className="text-xs text-neutral-500 mb-2">Protected by:</p>
          <div className="flex justify-center space-x-4 text-xs text-neutral-600">
            <span>🔒 SSL/TLS</span>
            <span>🛡️ 2FA Ready</span>
            <span>🔐 AES-256</span>
            <span>✅ SOC 2</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;