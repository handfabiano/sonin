'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/store';
import { useStore } from '@/lib/store';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useStore(state => state.addToCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link href={`/produtos/${product.id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {!product.in_stock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">Esgotado</span>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wide text-accent-600 font-semibold">
              {product.category === 'candle' ? 'Vela' : 'Óleo Essencial'}
            </span>
            <span className="text-xs text-primary-600 bg-primary-100 px-2 py-1 rounded">
              {product.scent}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">
            {product.name}
          </h3>

          <p className="text-sm text-primary-600 mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary-900">
              R$ {product.price.toFixed(2)}
            </span>

            <button
              onClick={handleAddToCart}
              disabled={!product.in_stock}
              className="bg-accent-500 text-white px-4 py-2 rounded-lg hover:bg-accent-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
