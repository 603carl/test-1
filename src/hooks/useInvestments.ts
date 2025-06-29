import { useState, useEffect } from 'react'
import { supabase, Investment } from '../lib/supabase'
import { useAuth } from './useAuth'

export function useInvestments() {
  const { user } = useAuth()
  const [investments, setInvestments] = useState<Investment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      fetchInvestments()
    }
  }, [user])

  const fetchInvestments = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setInvestments(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const createInvestment = async (packageName: string, amount: number) => {
    try {
      const { data, error } = await supabase
        .from('investments')
        .insert([
          {
            user_id: user?.id,
            package_name: packageName,
            amount,
            current_value: amount,
            status: 'active',
          },
        ])
        .select()

      if (error) throw error
      await fetchInvestments()
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'An error occurred' }
    }
  }

  const updateInvestment = async (id: string, updates: Partial<Investment>) => {
    try {
      const { data, error } = await supabase
        .from('investments')
        .update(updates)
        .eq('id', id)
        .select()

      if (error) throw error
      await fetchInvestments()
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'An error occurred' }
    }
  }

  return {
    investments,
    loading,
    error,
    createInvestment,
    updateInvestment,
    refetch: fetchInvestments,
  }
}