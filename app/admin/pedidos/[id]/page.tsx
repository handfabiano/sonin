'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';

interface OrderItem {
  id: string;
  product_id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  shipping_address?: string;
  shipping_city?: string;
  shipping_state?: string;
  shipping_zip?: string;
  subtotal: number;
  shipping: number;
  total: number;
  status: string;
  payment_method?: string;
  payment_status?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

const statusConfig = {
  pending: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
  processing: { label: 'Processando', color: 'bg-blue-100 text-blue-800' },
  shipped: { label: 'Enviado', color: 'bg-purple-100 text-purple-800' },
  delivered: { label: 'Entregue', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Cancelado', color: 'bg-red-100 text-red-800' },
};

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      const response = await fetch(`/api/admin/orders?id=${id}`);
      const data = await response.json();
      setOrder(data);
      setNotes(data.notes || '');
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar pedido:', error);
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus: string) => {
    if (!order) return;

    setSaving(true);
    try {
      const response = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: order.id, status: newStatus }),
      });

      if (response.ok) {
        await loadOrder();
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    } finally {
      setSaving(false);
    }
  };

  const saveNotes = async () => {
    if (!order) return;

    setSaving(true);
    try {
      const response = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: order.id, notes }),
      });

      if (response.ok) {
        await loadOrder();
      }
    } catch (error) {
      console.error('Erro ao salvar observações:', error);
    } finally {
      setSaving(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pedido não encontrado</h2>
          <Link
            href="/admin/pedidos"
            className="text-accent-600 hover:text-accent-900"
          >
            Voltar para pedidos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/pedidos"
                className="text-gray-600 hover:text-gray-900"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Pedido #{order.id.substring(0, 8)}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Criado em {formatDate(order.created_at)}
                </p>
              </div>
            </div>
            <span
              className={`px-4 py-2 text-sm font-semibold rounded-full ${
                statusConfig[order.status as keyof typeof statusConfig]?.color
              }`}
            >
              {statusConfig[order.status as keyof typeof statusConfig]?.label}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Items */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Itens do Pedido
              </h2>
              <div className="space-y-4">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex justify-between items-start border-b pb-4 last:border-0">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        Quantidade: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatCurrency(item.price)} cada
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Frete</span>
                  <span className="text-gray-900">{formatCurrency(order.shipping)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Informações do Cliente
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Nome</p>
                  <p className="font-medium text-gray-900">{order.customer_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">E-mail</p>
                  <p className="font-medium text-gray-900">{order.customer_email}</p>
                </div>
                {order.customer_phone && (
                  <div>
                    <p className="text-sm text-gray-600">Telefone</p>
                    <p className="font-medium text-gray-900">{order.customer_phone}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Shipping Address */}
            {order.shipping_address && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Endereço de Entrega
                </h2>
                <div className="text-gray-900">
                  <p>{order.shipping_address}</p>
                  <p>
                    {order.shipping_city}, {order.shipping_state}
                  </p>
                  <p>CEP: {order.shipping_zip}</p>
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Observações
              </h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                placeholder="Adicione observações sobre este pedido..."
              />
              <button
                onClick={saveNotes}
                disabled={saving}
                className="mt-3 bg-accent-500 text-white px-6 py-2 rounded-lg hover:bg-accent-600 transition-colors disabled:bg-gray-400"
              >
                {saving ? 'Salvando...' : 'Salvar Observações'}
              </button>
            </div>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            {/* Status Update */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Atualizar Status
              </h2>
              <div className="space-y-2">
                <button
                  onClick={() => updateStatus('pending')}
                  disabled={saving || order.status === 'pending'}
                  className="w-full px-4 py-3 text-left rounded-lg border-2 hover:border-accent-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="font-medium">Pendente</span>
                  <p className="text-sm text-gray-500">Aguardando processamento</p>
                </button>
                <button
                  onClick={() => updateStatus('processing')}
                  disabled={saving || order.status === 'processing'}
                  className="w-full px-4 py-3 text-left rounded-lg border-2 hover:border-accent-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="font-medium">Processando</span>
                  <p className="text-sm text-gray-500">Pedido em separação</p>
                </button>
                <button
                  onClick={() => updateStatus('shipped')}
                  disabled={saving || order.status === 'shipped'}
                  className="w-full px-4 py-3 text-left rounded-lg border-2 hover:border-accent-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="font-medium">Enviado</span>
                  <p className="text-sm text-gray-500">A caminho do cliente</p>
                </button>
                <button
                  onClick={() => updateStatus('delivered')}
                  disabled={saving || order.status === 'delivered'}
                  className="w-full px-4 py-3 text-left rounded-lg border-2 hover:border-accent-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="font-medium">Entregue</span>
                  <p className="text-sm text-gray-500">Pedido concluído</p>
                </button>
                <button
                  onClick={() => updateStatus('cancelled')}
                  disabled={saving || order.status === 'cancelled'}
                  className="w-full px-4 py-3 text-left rounded-lg border-2 border-red-200 hover:border-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="font-medium text-red-600">Cancelar</span>
                  <p className="text-sm text-gray-500">Cancelar este pedido</p>
                </button>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Histórico
              </h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-accent-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Pedido criado</p>
                    <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
                  </div>
                </div>
                {order.updated_at !== order.created_at && (
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-accent-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">Última atualização</p>
                      <p className="text-sm text-gray-500">{formatDate(order.updated_at)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
