import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'npm:stripe@14.21.0'
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const signature = req.headers.get('stripe-signature')
    const body = await req.text()
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')

    if (!signature || !webhookSecret) {
      return new Response('Missing signature or webhook secret', { status: 400 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return new Response('Invalid signature', { status: 400 })
    }

    console.log('Received webhook event:', event.type)

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        
        // Extract metadata
        const { product_id, customer_email, user_id } = paymentIntent.metadata
        
        if (user_id && product_id) {
          // Get product details
          const { data: product } = await supabase
            .from('products')
            .select('*')
            .eq('id', product_id)
            .single()

          if (product) {
            // Create payment record
            await supabase
              .from('payments')
              .insert({
                user_id,
                stripe_payment_intent_id: paymentIntent.id,
                amount: paymentIntent.amount / 100, // Convert from cents
                currency: paymentIntent.currency,
                status: paymentIntent.status,
                product_id,
                metadata: paymentIntent.metadata
              })

            // Create investment record if it's a paid product
            if (product.price > 0) {
              await supabase
                .from('investments')
                .insert({
                  user_id,
                  package_name: product.name,
                  amount: paymentIntent.amount / 100,
                  current_value: paymentIntent.amount / 100,
                  status: 'active'
                })
            }

            // Create transaction record
            await supabase
              .from('transactions')
              .insert({
                user_id,
                type: 'investment',
                amount: -(paymentIntent.amount / 100), // Negative for outgoing payment
                description: `Purchase of ${product.name} - Payment ID: ${paymentIntent.id}`,
                status: 'completed'
              })

            console.log('Successfully processed payment for user:', user_id)
          }
        }
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('Payment failed for payment intent:', paymentIntent.id)
        
        // Update payment record with failed status
        const { user_id } = paymentIntent.metadata
        if (user_id) {
          await supabase
            .from('payments')
            .update({ status: 'failed' })
            .eq('stripe_payment_intent_id', paymentIntent.id)
        }
        break
      }

      case 'customer.created': {
        const customer = event.data.object as Stripe.Customer
        console.log('New customer created:', customer.id)
        break
      }

      default:
        console.log('Unhandled event type:', event.type)
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Webhook error:', error)
    
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