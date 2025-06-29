import { useState, useEffect } from 'react'
import { supabase, MarketPrediction, NewsEvent } from '../lib/supabase'

export function useMarketData() {
  const [predictions, setPredictions] = useState<MarketPrediction[]>([])
  const [newsEvents, setNewsEvents] = useState<NewsEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMarketData()
    
    // Set up real-time subscriptions
    const predictionsSubscription = supabase
      .channel('market_predictions')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'market_predictions' }, () => {
        fetchPredictions()
      })
      .subscribe()

    const newsSubscription = supabase
      .channel('news_events')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'news_events' }, () => {
        fetchNewsEvents()
      })
      .subscribe()

    return () => {
      predictionsSubscription.unsubscribe()
      newsSubscription.unsubscribe()
    }
  }, [])

  const fetchMarketData = async () => {
    try {
      setLoading(true)
      await Promise.all([fetchPredictions(), fetchNewsEvents()])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const fetchPredictions = async () => {
    const { data, error } = await supabase
      .from('market_predictions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) throw error
    setPredictions(data || [])
  }

  const fetchNewsEvents = async () => {
    const { data, error } = await supabase
      .from('news_events')
      .select('*')
      .order('event_time', { ascending: true })
      .limit(10)

    if (error) throw error
    setNewsEvents(data || [])
  }

  return {
    predictions,
    newsEvents,
    loading,
    error,
    refetch: fetchMarketData,
  }
}