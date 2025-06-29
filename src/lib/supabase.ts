import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  created_at: string
  updated_at: string
}

export interface Investment {
  id: string
  user_id: string
  package_name: string
  amount: number
  current_value: number
  status: 'active' | 'completed' | 'paused'
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  user_id: string
  type: 'investment' | 'profit' | 'withdrawal' | 'fee'
  amount: number
  description: string
  status: 'pending' | 'completed' | 'failed'
  created_at: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  type: string
  features: string[]
  status: 'active' | 'beta' | 'coming_soon'
  created_at: string
  updated_at: string
}

export interface NewsEvent {
  id: string
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  currency: string
  prediction: string
  confidence: number
  event_time: string
  created_at: string
}

export interface MarketPrediction {
  id: string
  pair: string
  current_price: number
  predicted_price: number
  prediction_type: 'bullish' | 'bearish' | 'neutral'
  confidence: number
  timeframe: string
  signals: string[]
  created_at: string
}

export interface Insight {
  id: string
  title: string
  content: string
  category: string
  type: 'article' | 'video' | 'whitepaper' | 'report'
  author: string
  featured: boolean
  image_url: string
  read_time: string
  created_at: string
  updated_at: string
}

export interface AuditLog {
  id: string
  user_id?: string
  action: string
  resource: string
  details: Record<string, any>
  ip_address?: string
  user_agent?: string
  risk_level: 'low' | 'medium' | 'high' | 'critical'
  timestamp: string
}

export interface SecurityEvent {
  id: string
  user_id?: string
  event_type: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  details: Record<string, any>
  resolved: boolean
  created_at: string
}

export interface UserSession {
  id: string
  user_id: string
  session_token: string
  ip_address?: string
  user_agent?: string
  expires_at: string
  created_at: string
  last_activity: string
}