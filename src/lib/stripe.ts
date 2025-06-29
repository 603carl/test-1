import { loadStripe } from '@stripe/stripe-js'

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

if (!stripePublishableKey) {
  throw new Error('Missing Stripe publishable key')
}

export const stripePromise = loadStripe(stripePublishableKey)

// Payment types
export interface PaymentIntent {
  id: string
  client_secret: string
  amount: number
  currency: string
  status: string
}

export interface PaymentMethod {
  id: string
  type: string
  card?: {
    brand: string
    last4: string
    exp_month: number
    exp_year: number
  }
}

export interface CreatePaymentIntentRequest {
  amount: number
  currency: string
  product_id: string
  customer_email: string
  customer_name: string
  metadata?: Record<string, string>
}

export interface ConfirmPaymentRequest {
  payment_intent_id: string
  payment_method_id: string
}