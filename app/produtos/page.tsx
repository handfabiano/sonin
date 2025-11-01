'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export default function ProductsPage() {
  const [filter, setFilter] = useState<'all' | 'candle' | 'oil'>('all');

  const filteredProducts = filter === 'all'
    ? products
    : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-primary-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl font-bold text-primary-900 mb-4">
            Nossos Produtos
          </h1>
          <p className="text-lg text-primary-700 max-w-2xl mx-auto">
            Explore nossa coleção completa de velas aromáticas artesanais e óleos essenciais premium
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              filter === 'all'
                ? 'bg-primary-800 text-white shadow-lg'
                : 'bg-white text-primary-800 hover:bg-primary-100'
            }`}
          >
            Todos os Produtos
          </button>
          <button
            onClick={() => setFilter('candle')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              filter === 'candle'
                ? 'bg-primary-800 text-white shadow-lg'
                : 'bg-white text-primary-800 hover:bg-primary-100'
            }`}
          >
            Velas Aromáticas
          </button>
          <button
            onClick={() => setFilter('oil')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              filter === 'oil'
                ? 'bg-primary-800 text-white shadow-lg'
                : 'bg-white text-primary-800 hover:bg-primary-100'
            }`}
          >
            Óleos Essenciais
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-primary-600">
              Nenhum produto encontrado nesta categoria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
