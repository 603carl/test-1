const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface SecurityEvent {
  user_id?: string
  event_type: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  details: Record<string, any>
  ip_address?: string
  user_agent?: string
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { createClient } = await import('npm:@supabase/supabase-js@2')
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const event: SecurityEvent = await req.json()

    // Validate required fields
    if (!event.event_type || !event.severity) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Log security event
    const { data: securityEvent, error: securityError } = await supabase
      .from('security_events')
      .insert({
        user_id: event.user_id,
        event_type: event.event_type,
        severity: event.severity,
        details: event.details,
      })
      .select()
      .single()

    if (securityError) {
      console.error('Failed to log security event:', securityError)
      return new Response(
        JSON.stringify({ error: 'Failed to log security event' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Log audit event
    await supabase
      .from('audit_logs')
      .insert({
        user_id: event.user_id,
        action: event.event_type,
        resource: 'security_monitoring',
        details: event.details,
        ip_address: event.ip_address,
        user_agent: event.user_agent,
        risk_level: event.severity,
      })

    // Handle critical security events
    if (event.severity === 'critical') {
      // In production, integrate with alerting systems
      console.warn('CRITICAL SECURITY EVENT:', event)
      
      // Example: Send to external monitoring service
      // await sendToSecurityTeam(event)
      
      // Example: Temporarily lock user account if applicable
      if (event.user_id && event.event_type === 'suspicious_activity') {
        // await lockUserAccount(event.user_id)
      }
    }

    // Rate limiting for repeated events
    if (event.user_id) {
      const { data: recentEvents } = await supabase
        .from('security_events')
        .select('id')
        .eq('user_id', event.user_id)
        .eq('event_type', event.event_type)
        .gte('created_at', new Date(Date.now() - 15 * 60 * 1000).toISOString()) // Last 15 minutes

      if (recentEvents && recentEvents.length > 5) {
        // Too many similar events - escalate
        await supabase
          .from('security_events')
          .insert({
            user_id: event.user_id,
            event_type: 'rate_limit_exceeded',
            severity: 'high',
            details: {
              original_event: event.event_type,
              count: recentEvents.length,
              timeframe: '15_minutes'
            },
          })
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        event_id: securityEvent.id,
        message: 'Security event logged successfully' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Security webhook error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Internal server error' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})