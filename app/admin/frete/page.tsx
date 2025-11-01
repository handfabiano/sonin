'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface ShippingRule {
  id: string;
  name: string;
  description: string;
  type: 'fixed' | 'weight' | 'value' | 'free';
  min_value: number;
  max_value: number | null;
  min_weight: number;
  max_weight: number | null;
  price: number;
  active: boolean;
  priority: number;
}

const typeLabels = {
  fixed: 'Valor Fixo',
  weight: 'Por Peso',
  value: 'Por Valor',
  free: 'Frete Grátis',
};

export default function ShippingConfigPage() {
  const [rules, setRules] = useState<ShippingRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRule, setEditingRule] = useState<ShippingRule | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'fixed' as 'fixed' | 'weight' | 'value' | 'free',
    min_value: '0',
    max_value: '',
    min_weight: '0',
    max_weight: '',
    price: '0',
    active: true,
    priority: '0',
  });

  useEffect(() => {
    loadRules();
  }, []);

  const loadRules = async () => {
    try {
      const response = await fetch('/api/admin/shipping');
      const data = await response.json();
      setRules(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar regras:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = '/api/admin/shipping';
      const method = editingRule ? 'PUT' : 'POST';
      const body = editingRule
        ? { ...formData, id: editingRule.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar regra');
      }

      await loadRules();
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar regra de frete');
    }
  };

  const handleEdit = (rule: ShippingRule) => {
    setEditingRule(rule);
    setFormData({
      name: rule.name,
      description: rule.description || '',
      type: rule.type,
      min_value: rule.min_value.toString(),
      max_value: rule.max_value?.toString() || '',
      min_weight: rule.min_weight.toString(),
      max_weight: rule.max_weight?.toString() || '',
      price: rule.price.toString(),
      active: rule.active,
      priority: rule.priority.toString(),
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente deletar esta regra?')) return;

    try {
      const response = await fetch(`/api/admin/shipping?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadRules();
      }
    } catch (error) {
      console.error('Erro ao deletar:', error);
    }
  };

  const toggleActive = async (rule: ShippingRule) => {
    try {
      const response = await fetch('/api/admin/shipping', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: rule.id, active: !rule.active }),
      });

      if (response.ok) {
        await loadRules();
      }
    } catch (error) {
      console.error('Erro ao atualizar:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      type: 'fixed',
      min_value: '0',
      max_value: '',
      min_weight: '0',
      max_weight: '',
      price: '0',
      active: true,
      priority: '0',
    });
    setEditingRule(null);
    setShowForm(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600"></div>
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
              <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Configuração de Frete</h1>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-accent-500 text-white px-6 py-3 rounded-lg hover:bg-accent-600 transition-colors font-medium"
            >
              + Nova Regra
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingRule ? 'Editar Regra' : 'Nova Regra de Frete'}
                  </h2>
                  <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nome */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      placeholder="Ex: Frete Padrão"
                    />
                  </div>

                  {/* Descrição */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      placeholder="Breve descrição"
                    />
                  </div>

                  {/* Tipo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo *</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    >
                      <option value="fixed">Valor Fixo</option>
                      <option value="value">Por Valor do Carrinho</option>
                      <option value="weight">Por Peso</option>
                      <option value="free">Frete Grátis</option>
                    </select>
                  </div>

                  {/* Campos condicionais por tipo */}
                  {(formData.type === 'value' || formData.type === 'free') && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Valor Mínimo (R$)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.min_value}
                          onChange={(e) => setFormData({ ...formData, min_value: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Valor Máximo (R$)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.max_value}
                          onChange={(e) => setFormData({ ...formData, max_value: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                          placeholder="Opcional"
                        />
                      </div>
                    </div>
                  )}

                  {formData.type === 'weight' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Peso Mínimo (kg)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.min_weight}
                          onChange={(e) => setFormData({ ...formData, min_weight: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Peso Máximo (kg)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.max_weight}
                          onChange={(e) => setFormData({ ...formData, max_weight: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                          placeholder="Opcional"
                        />
                      </div>
                    </div>
                  )}

                  {/* Preço e Prioridade */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preço (R$) *</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prioridade
                      </label>
                      <input
                        type="number"
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                        placeholder="0 = menor, 10 = maior"
                      />
                    </div>
                  </div>

                  {/* Ativo */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="active"
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="h-4 w-4 text-accent-600 focus:ring-accent-500 border-gray-300 rounded"
                    />
                    <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
                      Regra ativa
                    </label>
                  </div>

                  {/* Buttons */}
                  <div className="flex space-x-4 pt-6 border-t">
                    <button
                      type="submit"
                      className="flex-1 bg-accent-500 text-white px-6 py-3 rounded-lg hover:bg-accent-600 transition-colors font-medium"
                    >
                      {editingRule ? 'Salvar Alterações' : 'Criar Regra'}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Rules List */}
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Regra
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Condições
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rules.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      Nenhuma regra de frete configurada
                    </td>
                  </tr>
                ) : (
                  rules.map((rule) => (
                    <tr key={rule.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{rule.name}</div>
                        {rule.description && (
                          <div className="text-sm text-gray-500">{rule.description}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{typeLabels[rule.type]}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {rule.type === 'value' || rule.type === 'free' ? (
                            <>
                              Acima de {formatCurrency(rule.min_value)}
                              {rule.max_value && ` até ${formatCurrency(rule.max_value)}`}
                            </>
                          ) : rule.type === 'weight' ? (
                            <>
                              {rule.min_weight}kg
                              {rule.max_weight && ` até ${rule.max_weight}kg`}
                            </>
                          ) : (
                            'Sempre aplicável'
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(rule.price)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleActive(rule)}
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            rule.active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {rule.active ? 'Ativa' : 'Inativa'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                        <button
                          onClick={() => handleEdit(rule)}
                          className="text-accent-600 hover:text-accent-900"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(rule.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Deletar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Como funciona?</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• <strong>Valor Fixo:</strong> Cobra o mesmo valor para todos os pedidos</li>
            <li>• <strong>Por Valor:</strong> Aplica quando o carrinho está dentro da faixa de valor especificada</li>
            <li>• <strong>Por Peso:</strong> Aplica quando o peso total está dentro da faixa especificada</li>
            <li>• <strong>Frete Grátis:</strong> Aplica frete R$ 0,00 quando o carrinho atinge o valor mínimo</li>
            <li>• <strong>Prioridade:</strong> Quando múltiplas regras se aplicam, a de maior prioridade é escolhida</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
