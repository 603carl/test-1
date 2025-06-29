import React, { createContext, useContext, useEffect, ReactNode } from 'react'
import { useSecurityMonitoring } from '../hooks/useSecurityMonitoring'
import { useAuthContext } from '../contexts/AuthContext'

interface SecurityContextType {
  logSecurityEvent: (event: any) => Promise<void>
  securityAlerts: any[]
  detectSuspiciousActivity: (activity: any) => void
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined)

export function SecurityProvider({ children }: { children: ReactNode }) {
  const { logSecurityEvent, securityAlerts, detectSuspiciousActivity } = useSecurityMonitoring()
  const { user } = useAuthContext()

  useEffect(() => {
    // Set up security monitoring when user logs in
    if (user) {
      logSecurityEvent({
        type: 'login_attempt',
        severity: 'low',
        details: {
          user_id: user.id,
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent,
        },
      })

      // Monitor for suspicious patterns
      const monitoringInterval = setInterval(() => {
        // Check for unusual activity patterns
        const userActivity = {
          user_id: user.id,
          timestamp: new Date().toISOString(),
          // Add more activity metrics as needed
        }
        
        // This would be expanded with real activity monitoring
        // detectSuspiciousActivity(userActivity)
      }, 60000) // Check every minute

      return () => clearInterval(monitoringInterval)
    }
  }, [user, logSecurityEvent])

  // Set up global error monitoring
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      logSecurityEvent({
        type: 'suspicious_activity',
        severity: 'medium',
        details: {
          error: event.error?.message || 'Unknown error',
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
      })
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      logSecurityEvent({
        type: 'suspicious_activity',
        severity: 'medium',
        details: {
          reason: event.reason,
          type: 'unhandled_promise_rejection',
        },
      })
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [logSecurityEvent])

  const value = {
    logSecurityEvent,
    securityAlerts,
    detectSuspiciousActivity,
  }

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  )
}

export function useSecurityContext() {
  const context = useContext(SecurityContext)
  if (context === undefined) {
    throw new Error('useSecurityContext must be used within a SecurityProvider')
  }
  return context
}