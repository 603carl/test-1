import { useState, useEffect } from 'react'
import { supabase, Transaction } from '../lib/supabase'
import { useAuth } from './useAuth'

export function useTransactions() {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      fetchTransactions()
    }
  }, [user])

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(20)

      if (error) throw error
      setTransactions(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const createTransaction = async (
    type: Transaction['type'],
    amount: number,
    description: string
  ) => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([
          {
            user_id: user?.id,
            type,
            amount,
            description,
            status: 'completed',
          },
        ])
        .select()

      if (error) throw error
      await fetchTransactions()
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'An error occurred' }
    }
  }

  return {
    transactions,
    loading,
    error,
    createTransaction,
    refetch: fetchTransactions,
  }
}