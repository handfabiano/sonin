'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/products';
import { useStore } from '@/lib/store';
import { useState } from 'react';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find(p => p.id === id);
  const addToCart = useStore(state => state.addToCart);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary-900 mb-4">Produto não encontrado</h1>
          <Link href="/produtos" className="text-accent-600 hover:text-accent-700">
            ← Voltar para produtos
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-primary-50 py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-primary-600">
          <Link href="/" className="hover:text-accent-600">Início</Link>
          <span className="mx-2">/</span>
          <Link href="/produtos" className="hover:text-accent-600">Produtos</Link>
          <span className="mx-2">/</span>
          <span className="text-primary-900">{product.name}</span>
        </div>

        {/* Product Detail */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="mb-4">
              <span className="inline-block text-xs uppercase tracking-wide text-accent-600 font-semibold bg-accent-50 px-3 py-1 rounded">
                {product.category === 'candle' ? 'Vela Aromática' : 'Óleo Essencial'}
              </span>
            </div>

            <h1 className="font-serif text-4xl font-bold text-primary-900 mb-4">
              {product.name}
            </h1>

            <div className="mb-6">
              <span className="text-xs text-primary-600 bg-primary-100 px-3 py-1 rounded-full">
                {product.scent}
              </span>
            </div>

            <p className="text-lg text-primary-700 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="text-4xl font-bold text-primary-900 mb-8">
              R$ {product.price.toFixed(2)}
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-primary-900 mb-2">
                Quantidade
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-white border-2 border-primary-300 text-primary-900 font-semibold hover:bg-primary-100 transition-colors"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg bg-white border-2 border-primary-300 text-primary-900 font-semibold hover:bg-primary-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!product.in_stock}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
                added
                  ? 'bg-green-500 text-white'
                  : product.in_stock
                  ? 'bg-accent-500 text-white hover:bg-accent-600'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              {added ? '✓ Adicionado ao Carrinho' : product.in_stock ? 'Adicionar ao Carrinho' : 'Produto Esgotado'}
            </button>

            {/* Product Features */}
            <div className="mt-8 pt-8 border-t border-primary-200">
              <h3 className="font-semibold text-primary-900 mb-4">Características</h3>
              <ul className="space-y-3 text-primary-700">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-accent-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  100% ingredientes naturais
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-accent-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Feito artesanalmente
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-accent-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Livre de toxinas
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-accent-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Sustentável e ecológico
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-3xl font-bold text-primary-900 mb-8 text-center">
              Produtos Relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map(p => (
                <Link key={p.id} href={`/produtos/${p.id}`}>
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all">
                    <div className="relative h-64">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-primary-900 mb-2">{p.name}</h3>
                      <p className="text-xl font-bold text-primary-900">R$ {p.price.toFixed(2)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
