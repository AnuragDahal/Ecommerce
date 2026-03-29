import { create } from 'zustand';
import { productService } from '../../services/product.service';
import { Product, ProductFilters, CreateProductDTO } from '@/types';

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  filters: ProductFilters;
  isLoading: boolean;
  fetchProducts: (filters?: Partial<ProductFilters>) => Promise<void>;
  setSelectedProduct: (product: Product | null) => void;
  updateFilters: (filters: Partial<ProductFilters>) => void;
  createProduct: (product: CreateProductDTO) => Promise<void>;
  updateProduct: (id: string, data: Partial<Product>) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  selectedProduct: null,
  filters: {
    category: '',
    price: '',
    search: '',
    page: 1,
    limit: 12
  },
  isLoading: false,
  fetchProducts: async (filters) => {
    set({ isLoading: true });
    try {
      const updatedFilters = { ...get().filters, ...filters };
      const products = await productService.getAll(updatedFilters);
      set({ products, filters: updatedFilters });
    } finally {
      set({ isLoading: false });
    }
  },
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  updateFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters }
    }));
    get().fetchProducts();
  },
  createProduct: async (product) => {
    set({ isLoading: true });
    try {
      await productService.create(product);
      get().fetchProducts();
    } finally {
      set({ isLoading: false });
    }
  },
  updateProduct: async (id, data) => {
    set({ isLoading: true });
    try {
      await productService.update(id, data);
      get().fetchProducts();
    } finally {
      set({ isLoading: false });
    }
  }
}));