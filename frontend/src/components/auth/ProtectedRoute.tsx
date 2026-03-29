import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/app/store';

interface ProtectedRouteProps {
  requiredRole?: string;
  children?: React.ReactNode;
}

export function ProtectedRoute({ requiredRole, children }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children || <Outlet />;
}