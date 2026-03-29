import api from './api';
import { CartItem } from '@/types';

export interface CartResponse {
  items: CartItem[];
  total: number;
}

export const cartService = {
  async getCart(): Promise<CartResponse> {
    const { data } = await api.get('/api/user/cart');
    return data;
  },

  async addToCart(payload: { productId: string; quantity: number }): Promise<CartResponse> {
    const { data } = await api.post('/api/user/cart', payload);
    return data;
  },

  async updateQuantity(productId: string, quantity: number): Promise<CartResponse> {
    const { data } = await api.put(`/api/user/cart/${productId}`, { quantity });
    return data;
  },

  async removeFromCart(productId: string): Promise<CartResponse> {
    const { data } = await api.delete(`/api/user/cart/${productId}`);
    return data;
  },

  async clearCart(): Promise<void> {
    await api.delete('/api/user/cart');
  },
};
