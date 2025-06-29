import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { CreatePaymentIntentRequest, ConfirmPaymentRequest, PaymentIntent } from '../lib/stripe'

export function usePayments() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createPaymentIntent = async (request: CreatePaymentIntentRequest): Promise<PaymentIntent | null> => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: request
      })

      if (error) throw error
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create payment intent'
      setError(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }

  const confirmPayment = async (request: ConfirmPaymentRequest) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase.functions.invoke('confirm-payment', {
        body: request
      })

      if (error) throw error
      return { data, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to confirm payment'
      setError(errorMessage)
      return { data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const getPaymentMethods = async (customer_id: string) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase.functions.invoke('get-payment-methods', {
        body: { customer_id }
      })

      if (error) throw error
      return { data, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get payment methods'
      setError(errorMessage)
      return { data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const createCustomer = async (email: string, name: string) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase.functions.invoke('create-customer', {
        body: { email, name }
      })

      if (error) throw error
      return { data, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create customer'
      setError(errorMessage)
      return { data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    createPaymentIntent,
    confirmPayment,
    getPaymentMethods,
    createCustomer
  }
}