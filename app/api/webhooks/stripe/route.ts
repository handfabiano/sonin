import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import Stripe from 'stripe';

// Desabilitar o body parser padrão do Next.js para webhooks
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET não está configurado');
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('Erro ao verificar webhook:', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Processar eventos do Stripe
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('PaymentIntent succeeded:', paymentIntent.id);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('PaymentIntent failed:', paymentIntent.id);
        break;
      }

      default:
        console.log(`Evento não tratado: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Erro ao processar webhook:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log('Checkout completed:', session.id);

  // Buscar line items da sessão
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    expand: ['data.price.product'],
  });

  // Calcular total
  const totalAmount = session.amount_total ? session.amount_total / 100 : 0;

  // Criar pedido no banco
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      customer_name: session.metadata?.customer_name || session.customer_details?.name || '',
      customer_email: session.customer_details?.email || '',
      customer_phone: session.customer_details?.phone || '',
      total_amount: totalAmount,
      status: 'processing',
    })
    .select()
    .single();

  if (orderError || !order) {
    console.error('Erro ao criar pedido:', orderError);
    return;
  }

  // Criar itens do pedido
  const orderItems = lineItems.data.map((item) => {
    const product = item.price?.product as Stripe.Product;
    return {
      order_id: order.id,
      product_id: product.metadata?.product_id || '',
      quantity: item.quantity || 1,
      price: item.price?.unit_amount ? item.price.unit_amount / 100 : 0,
    };
  });

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    console.error('Erro ao criar itens do pedido:', itemsError);
  }

  console.log('Pedido criado com sucesso:', order.id);
}
