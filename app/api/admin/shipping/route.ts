import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - Listar regras de frete ou buscar por ID
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const activeOnly = searchParams.get('active') === 'true';

    if (id) {
      const { data, error } = await supabase
        .from('shipping_config')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return NextResponse.json(data);
    }

    // Listar todas as regras
    let query = supabase
      .from('shipping_config')
      .select('*')
      .order('priority', { ascending: false });

    if (activeOnly) {
      query = query.eq('active', true);
    }

    const { data, error } = await query;

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Criar regra de frete
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      description,
      type,
      min_value,
      max_value,
      min_weight,
      max_weight,
      price,
      active,
      priority,
    } = body;

    // Validações
    if (!name || !type || price === undefined) {
      return NextResponse.json(
        { error: 'Nome, tipo e preço são obrigatórios' },
        { status: 400 }
      );
    }

    const validTypes = ['fixed', 'weight', 'value', 'free'];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Tipo de frete inválido' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('shipping_config')
      .insert({
        name,
        description,
        type,
        min_value: min_value ? parseFloat(min_value) : 0,
        max_value: max_value ? parseFloat(max_value) : null,
        min_weight: min_weight ? parseFloat(min_weight) : 0,
        max_weight: max_weight ? parseFloat(max_weight) : null,
        price: parseFloat(price),
        active: active !== false,
        priority: priority || 0,
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT - Atualizar regra de frete
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 });
    }

    // Converter valores numéricos se existirem
    if (updates.min_value !== undefined) {
      updates.min_value = parseFloat(updates.min_value);
    }
    if (updates.max_value !== undefined) {
      updates.max_value = updates.max_value ? parseFloat(updates.max_value) : null;
    }
    if (updates.min_weight !== undefined) {
      updates.min_weight = parseFloat(updates.min_weight);
    }
    if (updates.max_weight !== undefined) {
      updates.max_weight = updates.max_weight ? parseFloat(updates.max_weight) : null;
    }
    if (updates.price !== undefined) {
      updates.price = parseFloat(updates.price);
    }

    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('shipping_config')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Deletar regra de frete
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 });
    }

    const { error } = await supabase
      .from('shipping_config')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
