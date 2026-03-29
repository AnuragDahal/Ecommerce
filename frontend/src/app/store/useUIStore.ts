import { create } from 'zustand';
import { Toast } from '@/types';

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  theme: 'system',
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setTheme: (theme) => set({ theme }),
  toasts: [],
  addToast: (toast) => 
    set((state) => ({ 
      toasts: [...state.toasts, { ...toast, id: Date.now().toString() }] 
    })),
  removeToast: (id) => 
    set((state) => ({ 
      toasts: state.toasts.filter(toast => toast.id !== id) 
    }))
}));