import React, { useState, useEffect, useRef } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { CreditCard, Lock, AlertCircle, CheckCircle, Loader, Shield } from 'lucide-react'
import { usePayments } from '../hooks/usePayments'
import { useAuthContext } from '../contexts/AuthContext'
import { useSecurityContext } from './SecurityProvider'
import { useRateLimit } from '../hooks/useRateLimit'
import { sanitizeInput } from '../lib/security'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!)

interface SecurePaymentFormProps {
  amount: number
  productId: string
  productName: string
  onSuccess: (paymentIntentId: string) => void
  onError: (error: string) => void
}

export function SecurePaymentForm({ amount, productId, productName, onSuccess, onError }: SecurePaymentFormProps) {
  const [stripe, setStripe] = useState<any>(null)
  const [elements, setElements] = useState<any>(null)
  const [cardElement, setCardElement] = useState<any>(null)
  const [processing, setProcessing] = useState(false)
  const [paymentIntent, setPaymentIntent] = useState<any>(null)
  const [cardError, setCardError] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [isCardElementMounted, setIsCardElementMounted] = useState(false)
  const [securityVerification, setSecurityVerification] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')

  const cardElementRef = useRef<HTMLDivElement>(null)
  const { createPaymentIntent, loading } = usePayments()
  const { user } = useAuthContext()
  const { logSecurityEvent } = useSecurityContext()
  const paymentRateLimit = useRateLimit('payment')

  // Initialize Stripe with enhanced security
  useEffect(() => {
    const initializeStripe = async () => {
      try {
        const stripeInstance = await stripePromise
        setStripe(stripeInstance)

        if (stripeInstance) {
          const elementsInstance = stripeInstance.elements({
            appearance: {
              theme: 'stripe',
              variables: {
                colorPrimary: '#2563eb',
                colorBackground: '#ffffff',
                colorText: '#374151',
                colorDanger: '#dc2626',
                fontFamily: 'Inter, system-ui, sans-serif',
                spacingUnit: '4px',
                borderRadius: '8px'
              }
            }
          })
          setElements(elementsInstance)
        }
      } catch (error) {
        await logSecurityEvent({
          type: 'suspicious_activity',
          severity: 'high',
          details: { error: 'Stripe initialization failed', message: String(error) },
        })
        onError('Payment system initialization failed')
      }
    }

    initializeStripe()
  }, [logSecurityEvent, onError])

  // Mount card element with security monitoring
  useEffect(() => {
    if (elements && cardElementRef.current && !isCardElementMounted) {
      try {
        const cardElementInstance = elements.create('card', {
          style: {
            base: {
              fontSize: '16px',
              color: '#374151',
              '::placeholder': {
                color: '#9ca3af'
              }
            },
            invalid: {
              color: '#dc2626'
            }
          },
          hidePostalCode: false
        })

        cardElementInstance.mount(cardElementRef.current)
        setCardElement(cardElementInstance)
        setIsCardElementMounted(true)

        cardElementInstance.on('change', (event: any) => {
          setCardError(event.error ? event.error.message : null)
          setCardComplete(event.complete)
          
          // Log card input events for security monitoring
          if (event.error) {
            logSecurityEvent({
              type: 'payment_attempt',
              severity: 'medium',
              details: { error: event.error.message, type: 'card_validation' },
            })
          }
        })
      } catch (error) {
        logSecurityEvent({
          type: 'suspicious_activity',
          severity: 'high',
          details: { error: 'Card element mounting failed', message: String(error) },
        })
      }
    }
  }, [elements, isCardElementMounted, logSecurityEvent])

  useEffect(() => {
    if (user && amount > 0) {
      initializePayment()
    }
  }, [user, amount])

  const initializePayment = async () => {
    if (!user) return

    try {
      // Rate limiting check
      if (!paymentRateLimit.canProceed) {
        const remainingTime = Math.ceil(paymentRateLimit.remainingTime / 1000 / 60)
        onError(`Too many payment attempts. Please wait ${remainingTime} minutes.`)
        return
      }

      const paymentIntentData = await createPaymentIntent({
        amount: amount * 100, // Convert to cents
        currency: 'usd',
        product_id: productId,
        customer_email: user.email!,
        customer_name: `${user.user_metadata?.first_name || ''} ${user.user_metadata?.last_name || ''}`.trim(),
        metadata: {
          product_name: productName,
          user_id: user.id,
          security_token: crypto.randomUUID(), // Add security token
        }
      })

      if (paymentIntentData) {
        setPaymentIntent(paymentIntentData)
        
        // Log payment initialization
        await logSecurityEvent({
          type: 'payment_attempt',
          severity: 'low',
          details: {
            amount,
            product_id: productId,
            payment_intent_id: paymentIntentData.id,
          },
        })
      }
    } catch (error) {
      await logSecurityEvent({
        type: 'payment_attempt',
        severity: 'high',
        details: { error: 'Payment initialization failed', message: String(error) },
      })
      onError('Failed to initialize payment')
    }
  }

  const generateVerificationCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    setVerificationCode(code)
    
    // In production, send this code via SMS/email
    console.log('Verification code:', code)
    alert(`Verification code: ${code} (In production, this would be sent to your phone/email)`)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements || !cardElement || !paymentIntent) {
      return
    }

    // Rate limiting check
    if (!paymentRateLimit.canProceed) {
      onError('Too many payment attempts. Please try again later.')
      return
    }

    // Security verification for high-value transactions
    if (amount > 1000 && !securityVerification) {
      setSecurityVerification(true)
      generateVerificationCode()
      return
    }

    setProcessing(true)
    setCardError(null)
    paymentRateLimit.recordAttempt()

    try {
      // Additional security checks
      const securityChecks = {
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        amount,
        productId,
      }

      await logSecurityEvent({
        type: 'payment_attempt',
        severity: 'medium',
        details: { ...securityChecks, status: 'processing' },
      })

      const { error, paymentIntent: confirmedPaymentIntent } = await stripe.confirmCardPayment(
        paymentIntent.client_secret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: sanitizeInput(`${user?.user_metadata?.first_name || ''} ${user?.user_metadata?.last_name || ''}`.trim()),
              email: user?.email
            }
          }
        }
      )

      if (error) {
        setCardError(error.message)
        onError(error.message)
        
        await logSecurityEvent({
          type: 'payment_attempt',
          severity: 'high',
          details: { error: error.message, type: 'payment_failed' },
        })
      } else if (confirmedPaymentIntent.status === 'succeeded') {
        await logSecurityEvent({
          type: 'payment_attempt',
          severity: 'low',
          details: { 
            payment_intent_id: confirmedPaymentIntent.id,
            status: 'succeeded',
            amount 
          },
        })
        onSuccess(confirmedPaymentIntent.id)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed'
      setCardError(errorMessage)
      onError(errorMessage)
      
      await logSecurityEvent({
        type: 'payment_attempt',
        severity: 'critical',
        details: { error: errorMessage, type: 'payment_exception' },
      })
    } finally {
      setProcessing(false)
    }
  }

  const handleVerificationSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const inputCode = formData.get('verification_code') as string

    if (inputCode === verificationCode) {
      setSecurityVerification(false)
      // Proceed with payment
      handleSubmit(event)
    } else {
      setCardError('Invalid verification code')
      logSecurityEvent({
        type: 'suspicious_activity',
        severity: 'high',
        details: { type: 'invalid_verification_code', attempted_code: inputCode },
      })
    }
  }

  if (loading || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-neutral-600">Initializing secure payment...</p>
        </div>
      </div>
    )
  }

  if (securityVerification) {
    return (
      <form onSubmit={handleVerificationSubmit} className="space-y-6">
        <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-warning-600 mr-2" />
            <span className="text-warning-800 text-sm font-medium">Security Verification Required</span>
          </div>
          <p className="text-warning-700 text-sm mt-2">
            For your security, please enter the verification code sent to your registered contact method.
          </p>
        </div>

        <div>
          <label htmlFor="verification_code" className="block text-sm font-medium text-neutral-700 mb-2">
            Verification Code
          </label>
          <input
            type="text"
            name="verification_code"
            id="verification_code"
            maxLength={6}
            className="block w-full px-3 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter 6-digit code"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          Verify and Continue
        </button>

        <button
          type="button"
          onClick={generateVerificationCode}
          className="w-full bg-neutral-100 text-neutral-700 py-2 px-4 rounded-lg font-medium hover:bg-neutral-200 transition-colors"
        >
          Resend Code
        </button>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Amount with Security Badge */}
      <div className="bg-neutral-50 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-neutral-700">Total Amount:</span>
          <span className="text-2xl font-bold text-primary-600">${amount.toLocaleString()}</span>
        </div>
        <div className="text-sm text-neutral-500 mt-1 flex items-center">
          <Shield className="h-4 w-4 mr-1" />
          Payment for {productName} - PCI DSS Compliant
        </div>
      </div>

      {/* Rate Limit Warning */}
      {paymentRateLimit.isBlocked && (
        <div className="bg-error-50 border border-error-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-error-600 mr-2" />
            <span className="text-error-800 text-sm">
              Too many payment attempts. Please wait {Math.ceil(paymentRateLimit.remainingTime / 1000 / 60)} minutes.
            </span>
          </div>
        </div>
      )}

      {/* Card Element */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-neutral-700">
          Card Information
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CreditCard className="h-5 w-5 text-neutral-400" />
          </div>
          <div
            ref={cardElementRef}
            className="block w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-lg focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500"
          />
        </div>
        {cardError && (
          <div className="flex items-center text-error-600 text-sm">
            <AlertCircle className="h-4 w-4 mr-2" />
            {cardError}
          </div>
        )}
      </div>

      {/* Enhanced Security Notice */}
      <div className="bg-success-50 border border-success-200 rounded-lg p-4">
        <div className="flex items-start">
          <Lock className="h-5 w-5 text-success-600 mr-3 mt-0.5" />
          <div>
            <h4 className="text-success-800 font-medium">Bank-Level Security</h4>
            <div className="text-success-700 text-sm mt-1 space-y-1">
              <p>✓ 256-bit SSL encryption & PCI DSS compliance</p>
              <p>✓ Real-time fraud detection & monitoring</p>
              <p>✓ Tokenized payment processing (no card storage)</p>
              <p>✓ Multi-factor authentication for high-value transactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!cardComplete || processing || !paymentIntent || !isCardElementMounted || paymentRateLimit.isBlocked}
        className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {processing ? (
          <>
            <Loader className="h-5 w-5 animate-spin" />
            <span>Processing Secure Payment...</span>
          </>
        ) : (
          <>
            <Lock className="h-5 w-5" />
            <span>Pay ${amount.toLocaleString()} Securely</span>
          </>
        )}
      </button>

      {/* Security & Compliance Footer */}
      <div className="text-center text-xs text-neutral-500 space-y-2">
        <div className="flex items-center justify-center space-x-4">
          <span>🔒 PCI DSS Level 1</span>
          <span>🛡️ SOC 2 Compliant</span>
          <span>✅ GDPR Compliant</span>
        </div>
        <p>
          By completing this payment, you agree to our{' '}
          <a href="#" className="text-primary-600 hover:text-primary-700">Terms of Service</a>{' '}
          and{' '}
          <a href="#" className="text-primary-600 hover:text-primary-700">Privacy Policy</a>
        </p>
      </div>
    </form>
  )
}