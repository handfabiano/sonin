import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'candle' | 'oil';
  scent: string;
  inStock: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

interface StoreState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useStore = create<StoreState>((set, get) => ({
  cart: [],

  addToCart: (product) => set((state) => {
    const existingItem = state.cart.find(item => item.id === product.id);

    if (existingItem) {
      return {
        cart: state.cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }

    return {
      cart: [...state.cart, { ...product, quantity: 1 }],
    };
  }),

  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item.id !== productId),
  })),

  updateQuantity: (productId, quantity) => set((state) => ({
    cart: state.cart.map(item =>
      item.id === productId
        ? { ...item, quantity: Math.max(0, quantity) }
        : item
    ).filter(item => item.quantity > 0),
  })),

  clearCart: () => set({ cart: [] }),

  getTotalPrice: () => {
    const state = get();
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  getTotalItems: () => {
    const state = get();
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  },
}));
