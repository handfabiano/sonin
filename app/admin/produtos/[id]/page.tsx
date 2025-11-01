'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Product {
  id?: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: 'candle' | 'oil';
  scent: string;
  in_stock: boolean;
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const isNew = id === 'novo';

  const [product, setProduct] = useState<Product>({
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'candle',
    scent: '',
    in_stock: true,
  });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isNew) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await fetch(`/api/admin/products?id=${id}`);
      const data = await response.json();
      setProduct({
        ...data,
        price: data.price.toString(),
      });
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar produto:', error);
      setError('Erro ao carregar produto');
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const url = '/api/admin/products';
      const method = isNew ? 'POST' : 'PUT';
      const body = isNew ? product : { ...product, id };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erro ao salvar produto');
      }

      router.push('/admin/produtos');
    } catch (error: any) {
      setError(error.message);
      setSaving(false);
    }
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
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/produtos"
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
            <h1 className="text-3xl font-bold text-gray-900">
              {isNew ? 'Novo Produto' : 'Editar Produto'}
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Produto *
              </label>
              <input
                type="text"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                placeholder="Vela Lavanda Serenidade"
              />
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição *
              </label>
              <textarea
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                placeholder="Vela artesanal de lavanda, perfeita para momentos de relaxamento..."
              />
            </div>

            {/* Preço e Categoria */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço (R$) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  placeholder="89.90"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria *
                </label>
                <select
                  value={product.category}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      category: e.target.value as 'candle' | 'oil',
                    })
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                >
                  <option value="candle">Vela Aromática</option>
                  <option value="oil">Óleo Essencial</option>
                </select>
              </div>
            </div>

            {/* Fragrância e URL da Imagem */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fragrância *
                </label>
                <input
                  type="text"
                  value={product.scent}
                  onChange={(e) =>
                    setProduct({ ...product, scent: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  placeholder="Lavanda"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL da Imagem
                </label>
                <input
                  type="url"
                  value={product.image}
                  onChange={(e) =>
                    setProduct({ ...product, image: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* Em Estoque */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="in_stock"
                checked={product.in_stock}
                onChange={(e) =>
                  setProduct({ ...product, in_stock: e.target.checked })
                }
                className="h-4 w-4 text-accent-600 focus:ring-accent-500 border-gray-300 rounded"
              />
              <label
                htmlFor="in_stock"
                className="ml-2 block text-sm text-gray-900"
              >
                Produto em estoque
              </label>
            </div>

            {/* Botões */}
            <div className="flex space-x-4 pt-6 border-t">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-accent-500 text-white px-6 py-3 rounded-lg hover:bg-accent-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
              >
                {saving ? 'Salvando...' : isNew ? 'Criar Produto' : 'Salvar Alterações'}
              </button>
              <Link
                href="/admin/produtos"
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors text-center font-medium"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
