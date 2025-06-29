// Security utilities and configurations

// Password validation
export const passwordRequirements = {
  minLength: 12,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  preventCommonPasswords: true,
}

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []

  if (password.length < passwordRequirements.minLength) {
    errors.push(`Password must be at least ${passwordRequirements.minLength} characters long`)
  }

  if (passwordRequirements.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  if (passwordRequirements.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }

  if (passwordRequirements.requireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  if (passwordRequirements.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }

  // Common password check (basic implementation)
  const commonPasswords = [
    'password', '123456', 'password123', 'admin', 'qwerty', 'letmein',
    'welcome', 'monkey', '1234567890', 'password1', 'abc123'
  ]
  
  if (commonPasswords.some(common => password.toLowerCase().includes(common))) {
    errors.push('Password cannot contain common words or patterns')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Session management
export const sessionConfig = {
  maxAge: 24 * 60 * 60, // 24 hours in seconds
  inactivityTimeout: 30 * 60, // 30 minutes in seconds
  maxConcurrentSessions: 3,
}

// Rate limiting configuration
export const rateLimits = {
  login: { attempts: 5, windowMs: 15 * 60 * 1000 }, // 5 attempts per 15 minutes
  api: { requests: 100, windowMs: 60 * 1000 }, // 100 requests per minute
  trading: { orders: 10, windowMs: 60 * 1000 }, // 10 orders per minute
  payment: { attempts: 3, windowMs: 60 * 60 * 1000 }, // 3 payment attempts per hour
}

// Input sanitization
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/['"]/g, '') // Remove quotes
    .trim()
}

// Validate email format
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

// Generate secure random tokens
export const generateSecureToken = (length: number = 32): string => {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

// Audit logging
export interface AuditLog {
  user_id?: string
  action: string
  resource: string
  details: Record<string, any>
  ip_address?: string
  user_agent?: string
  timestamp: string
  risk_level: 'low' | 'medium' | 'high' | 'critical'
}

export const logAuditEvent = async (event: Omit<AuditLog, 'timestamp'>): Promise<void> => {
  try {
    const auditEvent: AuditLog = {
      ...event,
      timestamp: new Date().toISOString(),
    }

    // Log to console for development
    console.log('Audit Event:', auditEvent)
    
    // In production, you would also send to external logging service
    // await sendToSecurityMonitoring(auditEvent)
  } catch (error) {
    console.error('Failed to log audit event:', error)
  }
}

// Security headers configuration
export const securityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co https://api.stripe.com;",
}

// Trading security validations
export const validateTradeRequest = (request: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []

  // Validate trade amount
  if (!request.amount || request.amount <= 0) {
    errors.push('Invalid trade amount')
  }

  if (request.amount > 1000000) { // $1M limit
    errors.push('Trade amount exceeds maximum limit')
  }

  // Validate currency pair
  const validPairs = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CAD', 'NZD/USD']
  if (!validPairs.includes(request.pair)) {
    errors.push('Invalid currency pair')
  }

  // Validate trade type
  const validTypes = ['buy', 'sell', 'limit', 'stop']
  if (!validTypes.includes(request.type)) {
    errors.push('Invalid trade type')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Circuit breaker for trading
export class TradingCircuitBreaker {
  private failures: number = 0
  private lastFailureTime: number = 0
  private readonly threshold: number = 5
  private readonly timeout: number = 60000 // 1 minute

  canExecute(): boolean {
    const now = Date.now()
    
    if (this.failures >= this.threshold) {
      if (now - this.lastFailureTime < this.timeout) {
        return false // Circuit is open
      } else {
        this.reset() // Reset after timeout
      }
    }
    
    return true
  }

  recordFailure(): void {
    this.failures++
    this.lastFailureTime = Date.now()
  }

  recordSuccess(): void {
    this.failures = 0
  }

  private reset(): void {
    this.failures = 0
    this.lastFailureTime = 0
  }
}

// Data encryption utilities
export const encryptSensitiveData = async (data: string): Promise<string> => {
  // In production, use proper encryption library like Web Crypto API
  // This is a simplified example
  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(data)
  
  // In real implementation, use AES-256-GCM
  const encrypted = btoa(String.fromCharCode(...dataBuffer))
  return encrypted
}

export const decryptSensitiveData = async (encryptedData: string): Promise<string> => {
  // Simplified decryption - use proper crypto in production
  try {
    const decrypted = atob(encryptedData)
    return decrypted
  } catch (error) {
    throw new Error('Failed to decrypt data')
  }
}