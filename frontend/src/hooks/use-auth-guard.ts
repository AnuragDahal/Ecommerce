import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/app/store';

export function useAuthGuard(requiredRole?: string) {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login');
      return;
    }

    if (requiredRole && user?.role !== requiredRole) {
      navigate('/');
    }
  }, [isAuthenticated, user, requiredRole, navigate]);

  return { isAuthenticated, user };
}