'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { getStripe } from '@/lib/stripe-client';

export default function CartPage() {
  const cart = useStore(state => state.cart);
  const removeFromCart = useStore(state => state.removeFromCart);
  const updateQuantity = useStore(state => state.updateQuantity);
  const getTotalPrice = useStore(state => state.getTotalPrice);
  const clearCart = useStore(state => state.clearCart);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cep, setCep] = useState('');
  const [error, setError] = useState('');
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<{
    name: string;
    price: number;
  } | null>(null);

  const subtotal = getTotalPrice();
  const shipping = shippingInfo?.price || 0;
  const total = subtotal + shipping;

  // Calcular frete automaticamente quando o CEP for válido
  useEffect(() => {
    if (cep.length === 8 && subtotal > 0) {
      calculateShipping();
    } else {
      setShippingInfo(null);
    }
  }, [cep, subtotal]);

  const calculateShipping = async () => {
    setLoadingShipping(true);
    try {
      const response = await fetch('/api/shipping/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subtotal }),
      });

      if (response.ok) {
        const data = await response.json();
        setShippingInfo(data);
      }
    } catch (error) {
      console.error('Erro ao calcular frete:', error);
    } finally {
      setLoadingShipping(false);
    }
  };

  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.slice(0, 8);
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  };

  const handleCheckout = async () => {
    if (!email || !name) {
      setError('Por favor, preencha seu nome e e-mail');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor, insira um e-mail válido');
      return;
    }

    if (!cep || cep.length !== 8) {
      setError('Por favor, insira um CEP válido');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Chamar API para criar sessão de checkout
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart,
          customerEmail: email,
          customerName: name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao processar checkout');
      }

      // Redirecionar para o Stripe Checkout
      const stripe = await getStripe();
      if (!stripe) {
        throw new Error('Stripe não carregado');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (err: any) {
      console.error('Erro no checkout:', err);
      setError(err.message || 'Erro ao processar pagamento. Tente novamente.');
      setLoading(false);
    }
  };

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
          <div className="lg:col-span-2 space-y-3">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-semibold text-lg text-primary-900">
                  Seus produtos ({cart.length})
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {cart.map(item => (
                  <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <Link
                              href={`/produtos/${item.id}`}
                              className="font-semibold text-primary-900 hover:text-accent-600 transition-colors line-clamp-1"
                            >
                              {item.name}
                            </Link>
                            <p className="text-sm text-primary-600 mt-0.5">
                              {item.category === 'candle' ? 'Vela Aromática' : 'Óleo Essencial'} • {item.scent}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-2 text-gray-400 hover:text-red-600 transition-colors flex-shrink-0"
                            aria-label="Remover item"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-md bg-white text-primary-900 font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center"
                              aria-label="Diminuir quantidade"
                            >
                              -
                            </button>
                            <span className="text-sm font-semibold w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-md bg-white text-primary-900 font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center"
                              aria-label="Aumentar quantidade"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="text-lg font-bold text-primary-900">
                              R$ {(item.price * item.quantity).toFixed(2)}
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-xs text-primary-500">
                                R$ {item.price.toFixed(2)} cada
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={clearCart}
              className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Limpar carrinho
            </button>
          </div>

          {/* Order Summary & Checkout */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-primary-900 mb-6">
                Finalizar Compra
              </h2>

              {/* Customer Info Form */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="João Silva"
                    className="w-full px-4 py-3 rounded-lg border-2 border-primary-200 focus:border-accent-500 focus:outline-none transition-colors"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3 rounded-lg border-2 border-primary-200 focus:border-accent-500 focus:outline-none transition-colors"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    placeholder="(11) 98765-4321"
                    className="w-full px-4 py-3 rounded-lg border-2 border-primary-200 focus:border-accent-500 focus:outline-none transition-colors"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    CEP *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cep}
                      onChange={(e) => setCep(formatCep(e.target.value))}
                      placeholder="12345678"
                      maxLength={8}
                      className="w-full px-4 py-3 pr-12 rounded-lg border-2 border-primary-200 focus:border-accent-500 focus:outline-none transition-colors"
                      disabled={loading}
                    />
                    {loadingShipping && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <svg className="animate-spin h-5 w-5 text-accent-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                  {shippingInfo && (
                    <p className="mt-2 text-sm text-green-700 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {shippingInfo.name} calculado
                    </p>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* Price Summary */}
              <div className="space-y-3 mb-6 pb-6 border-b border-primary-200">
                <div className="flex justify-between text-primary-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-primary-700">
                  <div className="flex flex-col">
                    <span>Frete</span>
                    {shippingInfo && (
                      <span className="text-xs text-primary-500">{shippingInfo.name}</span>
                    )}
                    {!shippingInfo && cep.length < 8 && (
                      <span className="text-xs text-primary-500">Informe o CEP</span>
                    )}
                  </div>
                  <span className={`font-semibold ${shipping === 0 && shippingInfo ? 'text-green-600' : ''}`}>
                    {shipping === 0 && shippingInfo ? 'GRÁTIS' : `R$ ${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-bold text-primary-900 pt-3 border-t border-primary-200">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-accent-500 text-white py-4 rounded-lg font-semibold hover:bg-accent-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mb-4 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processando...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Pagar com Cartão
                  </>
                )}
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
                  Pagamento 100% seguro (Stripe)
                </div>
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
              </div>

              {/* Stripe Badge */}
              <div className="mt-6 pt-6 border-t border-primary-200 text-center">
                <p className="text-xs text-primary-600 mb-2">Pagamento processado por</p>
                <div className="text-lg font-bold text-primary-900">Stripe</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
