import { NextRequest, NextResponse } from 'next/server';
import { stripe, formatAmountForStripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, customerEmail, customerName } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Carrinho vazio' },
        { status: 400 }
      );
    }

    // Validar e buscar produtos do banco
    const productIds = items.map((item: any) => item.id);
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .in('id', productIds);

    if (error || !products) {
      return NextResponse.json(
        { error: 'Erro ao buscar produtos' },
        { status: 500 }
      );
    }

    // Criar line items para o Stripe
    const lineItems = items.map((item: any) => {
      const product = products.find((p) => p.id === item.id);

      if (!product) {
        throw new Error(`Produto ${item.id} não encontrado`);
      }

      return {
        price_data: {
          currency: 'brl',
          product_data: {
            name: product.name,
            description: product.description,
            images: [product.image],
            metadata: {
              product_id: product.id,
              scent: product.scent,
              category: product.category,
            },
          },
          unit_amount: formatAmountForStripe(product.price),
        },
        quantity: item.quantity,
      };
    });

    // Calcular total
    const totalAmount = items.reduce((sum: number, item: any) => {
      const product = products.find((p) => p.id === item.id);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);

    // Criar sessão de checkout do Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/carrinho?canceled=true`,
      customer_email: customerEmail,
      metadata: {
        customer_name: customerName || '',
        customer_email: customerEmail || '',
      },
      shipping_address_collection: {
        allowed_countries: ['BR'],
      },
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      locale: 'pt-BR',
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });

  } catch (error: any) {
    console.error('Erro ao criar checkout:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao processar checkout' },
      { status: 500 }
    );
  }
}
