import { useState, useEffect } from 'react'
import { logAuditEvent } from '../lib/security'

interface SecurityEvent {
  type: 'login_attempt' | 'failed_login' | 'suspicious_activity' | 'data_access' | 'payment_attempt'
  severity: 'low' | 'medium' | 'high' | 'critical'
  details: Record<string, any>
}

export function useSecurityMonitoring() {
  const [securityAlerts, setSecurityAlerts] = useState<SecurityEvent[]>([])
  const [isMonitoring, setIsMonitoring] = useState(true)

  const logSecurityEvent = async (event: SecurityEvent) => {
    // Add to local alerts
    setSecurityAlerts(prev => [event, ...prev.slice(0, 99)]) // Keep last 100 events

    // Log to audit system
    await logAuditEvent({
      action: event.type,
      resource: 'security_monitoring',
      details: event.details,
      risk_level: event.severity,
    })

    // Send real-time alerts for high/critical events
    if (event.severity === 'high' || event.severity === 'critical') {
      await sendSecurityAlert(event)
    }
  }

  const sendSecurityAlert = async (event: SecurityEvent) => {
    // In production, integrate with alerting systems like PagerDuty, Slack, etc.
    console.warn('SECURITY ALERT:', event)
    
    // Example: Send to monitoring service
    try {
      // await fetch('/api/security-alerts', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(event)
      // })
    } catch (error) {
      console.error('Failed to send security alert:', error)
    }
  }

  const detectSuspiciousActivity = (userActivity: any) => {
    // Implement suspicious activity detection logic
    const suspiciousPatterns = [
      // Multiple failed login attempts
      userActivity.failedLogins > 3,
      // Unusual trading patterns
      userActivity.tradesPerMinute > 10,
      // Access from unusual locations
      userActivity.newLocation && userActivity.highValueActions,
      // Large financial transactions
      userActivity.transactionAmount > 50000,
    ]

    if (suspiciousPatterns.some(pattern => pattern)) {
      logSecurityEvent({
        type: 'suspicious_activity',
        severity: 'high',
        details: userActivity,
      })
    }
  }

  const monitorUserSession = () => {
    // Monitor for session anomalies
    const checkSessionSecurity = () => {
      const lastActivity = localStorage.getItem('lastActivity')
      const currentTime = Date.now()
      
      if (lastActivity) {
        const timeSinceActivity = currentTime - parseInt(lastActivity)
        const thirtyMinutes = 30 * 60 * 1000
        
        if (timeSinceActivity > thirtyMinutes) {
          logSecurityEvent({
            type: 'suspicious_activity',
            severity: 'medium',
            details: { reason: 'session_timeout_exceeded' },
          })
        }
      }
      
      localStorage.setItem('lastActivity', currentTime.toString())
    }

    const interval = setInterval(checkSessionSecurity, 60000) // Check every minute
    return () => clearInterval(interval)
  }

  useEffect(() => {
    if (isMonitoring) {
      const cleanup = monitorUserSession()
      return cleanup
    }
  }, [isMonitoring])

  return {
    securityAlerts,
    logSecurityEvent,
    detectSuspiciousActivity,
    isMonitoring,
    setIsMonitoring,
  }
}