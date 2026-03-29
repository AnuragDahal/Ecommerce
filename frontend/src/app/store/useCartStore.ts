import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { cartService } from '../../services/cart.service';
import { CartItem, Product } from '../../types';

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  total: number;
  addItem: (product: Product, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  fetchCart: () => Promise<void>;
}

export const useCartStore = create<CartState>()(
  devtools(
    (set) => ({
      items: [],
      isLoading: false,
      total: 0,
      addItem: async (product, quantity) => {
        set({ isLoading: true });
        try {
          await cartService.addToCart({ productId: product.id, quantity });
          set((state) => ({
            items: [...state.items, { ...product, quantity }],
            total: state.total + (product.price * quantity)
          }));
        } finally {
          set({ isLoading: false });
        }
      },
      removeItem: async (productId) => {
        set({ isLoading: true });
        try {
          await cartService.removeFromCart(productId);
          set((state) => ({
            items: state.items.filter(item => item.id !== productId),
            total: state.total - (state.items.find(item => item.id === productId)?.price || 0)
          }));
        } finally {
          set({ isLoading: false });
        }
      },
      updateQuantity: async (productId, quantity) => {
        set({ isLoading: true });
        try {
          await cartService.updateQuantity(productId, quantity);
          set((state) => ({
            items: state.items.map(item => 
              item.id === productId ? { ...item, quantity } : item
            )
          }));
        } finally {
          set({ isLoading: false });
        }
      },
      clearCart: () => set({ items: [], total: 0 }),
      fetchCart: async () => {
        set({ isLoading: true });
        try {
          const cart = await cartService.getCart();
          set({ items: cart.items, total: cart.total });
        } finally {
          set({ isLoading: false });
        }
      }
    })
  )
);