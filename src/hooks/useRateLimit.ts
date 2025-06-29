import { useState, useCallback } from 'react'
import { rateLimits } from '../lib/security'

interface RateLimitState {
  attempts: number
  windowStart: number
  isBlocked: boolean
}

export function useRateLimit(type: keyof typeof rateLimits) {
  const [state, setState] = useState<RateLimitState>({
    attempts: 0,
    windowStart: Date.now(),
    isBlocked: false,
  })

  const checkRateLimit = useCallback((): boolean => {
    const now = Date.now()
    const config = rateLimits[type]
    
    // Reset window if expired
    if (now - state.windowStart >= config.windowMs) {
      setState({
        attempts: 0,
        windowStart: now,
        isBlocked: false,
      })
      return true
    }

    // Check if blocked
    if (state.attempts >= config.attempts) {
      setState(prev => ({ ...prev, isBlocked: true }))
      return false
    }

    return true
  }, [type, state])

  const recordAttempt = useCallback(() => {
    setState(prev => ({
      ...prev,
      attempts: prev.attempts + 1,
    }))
  }, [])

  const getRemainingTime = useCallback((): number => {
    if (!state.isBlocked) return 0
    const config = rateLimits[type]
    return Math.max(0, config.windowMs - (Date.now() - state.windowStart))
  }, [type, state])

  const reset = useCallback(() => {
    setState({
      attempts: 0,
      windowStart: Date.now(),
      isBlocked: false,
    })
  }, [])

  return {
    canProceed: checkRateLimit(),
    isBlocked: state.isBlocked,
    attempts: state.attempts,
    remainingTime: getRemainingTime(),
    recordAttempt,
    reset,
  }
}