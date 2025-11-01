'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/lib/store';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const clearCart = useStore(state => state.clearCart);
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    const id = searchParams.get('session_id');
    if (id) {
      setSessionId(id);
      // Limpar carrinho após compra bem-sucedida
      clearCart();
    }
  }, [searchParams, clearCart]);

  return (
    <div className="min-h-screen bg-primary-50 flex items-center justify-center py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
            <svg
              className="h-12 w-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-primary-900 mb-4">
            Pagamento Confirmado! 🎉
          </h1>
          <p className="text-lg text-primary-700 mb-6">
            Obrigado pela sua compra! Seu pedido foi recebido e está sendo processado.
          </p>

          {/* Order Details */}
          <div className="bg-primary-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-primary-900 mb-4">
              Próximos Passos
            </h2>
            <div className="text-left space-y-3 text-primary-700">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-accent-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Você receberá um e-mail de confirmação em breve</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-accent-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Seu pedido será preparado com carinho</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-accent-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Enviaremos o código de rastreamento em até 2 dias úteis</span>
              </div>
            </div>
          </div>

          {/* Session ID */}
          {sessionId && (
            <p className="text-sm text-primary-600 mb-6">
              ID da sessão: <span className="font-mono">{sessionId}</span>
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/produtos"
              className="inline-block bg-accent-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors"
            >
              Continuar Comprando
            </Link>
            <Link
              href="/"
              className="inline-block bg-primary-100 text-primary-900 px-8 py-3 rounded-lg font-semibold hover:bg-primary-200 transition-colors"
            >
              Voltar ao Início
            </Link>
          </div>

          {/* Support Info */}
          <div className="mt-8 pt-8 border-t border-primary-200">
            <p className="text-sm text-primary-600">
              Dúvidas sobre seu pedido?{' '}
              <Link href="/contato" className="text-accent-600 hover:text-accent-700 font-semibold">
                Entre em contato
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
