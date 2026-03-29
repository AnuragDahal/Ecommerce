import { useEffect } from 'react';
import { useAuthStore } from '@/app/store';
import { authService } from '@/services/auth.service';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { token, setUser } = useAuthStore();

  useEffect(() => {
    if (token) {
      authService.getProfile()
        .then(user => setUser(user))
        .catch(() => useAuthStore.getState().logout());
    }
  }, [token]);

  return children;
}