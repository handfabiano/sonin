import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

// Inicializar Stripe com a chave secreta
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
});

// Função helper para formatar preço para o Stripe (centavos)
export const formatAmountForStripe = (amount: number): number => {
  return Math.round(amount * 100);
};

// Função helper para formatar preço do Stripe (centavos para reais)
export const formatAmountFromStripe = (amount: number): number => {
  return amount / 100;
};
