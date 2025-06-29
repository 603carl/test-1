import { useState, useEffect } from 'react'
import { supabase, Insight } from '../lib/supabase'

export function useInsights() {
  const [insights, setInsights] = useState<Insight[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchInsights()
  }, [])

  const fetchInsights = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('insights')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setInsights(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getInsightsByCategory = (category: string) => {
    if (category === 'All') return insights
    return insights.filter(insight => insight.category === category)
  }

  const getFeaturedInsights = () => {
    return insights.filter(insight => insight.featured)
  }

  return {
    insights,
    loading,
    error,
    getInsightsByCategory,
    getFeaturedInsights,
    refetch: fetchInsights,
  }
}