import api from './api';
import { Product, ProductFilters, CreateProductDTO } from '@/types';

export const productService = {
  async getAll(filters?: Partial<ProductFilters>): Promise<Product[]> {
    const { data } = await api.get('/api/products', { params: filters });
    return data;
  },

  async getById(id: string): Promise<Product> {
    const { data } = await api.get(`/api/products/${id}`);
    return data;
  },

  async create(productData: CreateProductDTO): Promise<Product> {
    const formData = new FormData();
    Object.entries(productData).forEach(([key, value]) => {
      if (key === 'images') {
        (value as File[]).forEach((file) => formData.append('images', file));
      } else {
        formData.append(key, value.toString());
      }
    });

    const { data } = await api.post('/api/products/create', formData);
    return data;
  },

  async update(id: string, productData: Partial<Product>): Promise<Product> {
    const { data } = await api.put(`/api/products/${id}`, productData);
    return data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/api/products/${id}`);
  },
};
