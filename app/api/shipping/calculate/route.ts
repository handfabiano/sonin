import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - Calcular frete
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { subtotal } = body;

    if (!subtotal) {
      return NextResponse.json(
        { error: 'Subtotal é obrigatório' },
        { status: 400 }
      );
    }

    // Buscar regras de frete ativas
    const { data: shippingRules, error } = await supabase
      .from('shipping_config')
      .select('*')
      .eq('active', true)
      .order('priority', { ascending: false });

    if (error) throw error;

    // Encontrar a melhor regra
    let bestRule = null;

    for (const rule of shippingRules || []) {
      if (rule.type === 'free' && subtotal >= rule.min_value) {
        bestRule = rule;
        break;
      } else if (rule.type === 'fixed') {
        if (!bestRule) bestRule = rule;
      } else if (rule.type === 'value') {
        if (
          subtotal >= rule.min_value &&
          (!rule.max_value || subtotal <= rule.max_value)
        ) {
          if (!bestRule || rule.price < bestRule.price) {
            bestRule = rule;
          }
        }
      }
    }

    // Se não encontrou nenhuma regra, usar frete padrão
    if (!bestRule) {
      bestRule = {
        id: 'default',
        name: 'Frete Padrão',
        price: 15.00,
        description: 'Frete padrão para todo o Brasil',
      };
    }

    return NextResponse.json({
      shipping: {
        id: bestRule.id,
        name: bestRule.name,
        price: bestRule.price,
        description: bestRule.description,
      },
    });
  } catch (error: any) {
    console.error('Erro ao calcular frete:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
