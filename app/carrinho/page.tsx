'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/lib/store';

export default function CartPage() {
  const cart = useStore(state => state.cart);
  const removeFromCart = useStore(state => state.removeFromCart);
  const updateQuantity = useStore(state => state.updateQuantity);
  const getTotalPrice = useStore(state => state.getTotalPrice);
  const clearCart = useStore(state => state.clearCart);

  const subtotal = getTotalPrice();
  const shipping = subtotal > 0 ? 15.00 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-24 h-24 text-primary-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h1 className="text-3xl font-bold text-primary-900 mb-4">Seu carrinho está vazio</h1>
          <p className="text-primary-600 mb-8">Adicione alguns produtos para começar!</p>
          <Link
            href="/produtos"
            className="inline-block bg-accent-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors"
          >
            Explorar Produtos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="font-serif text-4xl font-bold text-primary-900 mb-8">
          Carrinho de Compras
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex gap-6">
                  <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Link
                          href={`/produtos/${item.id}`}
                          className="text-xl font-semibold text-primary-900 hover:text-accent-600 transition-colors"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-primary-600 mt-1">
                          {item.category === 'candle' ? 'Vela Aromática' : 'Óleo Essencial'} • {item.scent}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-primary-400 hover:text-red-600 transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg bg-primary-100 text-primary-900 font-semibold hover:bg-primary-200 transition-colors"
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg bg-primary-100 text-primary-900 font-semibold hover:bg-primary-200 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-900">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-sm text-primary-600">
                          R$ {item.price.toFixed(2)} cada
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 font-semibold transition-colors"
            >
              Limpar Carrinho
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-primary-900 mb-6">
                Resumo do Pedido
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-primary-700">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-primary-700">
                  <span>Frete</span>
                  <span>R$ {shipping.toFixed(2)}</span>
                </div>
                <div className="border-t border-primary-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-primary-900">
                    <span>Total</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-accent-500 text-white py-4 rounded-lg font-semibold hover:bg-accent-600 transition-colors mb-4">
                Finalizar Compra
              </button>

              <Link
                href="/produtos"
                className="block text-center text-accent-600 hover:text-accent-700 font-semibold transition-colors"
              >
                Continuar Comprando
              </Link>

              {/* Benefits */}
              <div className="mt-6 pt-6 border-t border-primary-200 space-y-3">
                <div className="flex items-center text-sm text-primary-700">
                  <svg className="w-5 h-5 text-accent-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Frete grátis acima de R$ 150
                </div>
                <div className="flex items-center text-sm text-primary-700">
                  <svg className="w-5 h-5 text-accent-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Devolução grátis em 30 dias
                </div>
                <div className="flex items-center text-sm text-primary-700">
                  <svg className="w-5 h-5 text-accent-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Pagamento seguro
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
