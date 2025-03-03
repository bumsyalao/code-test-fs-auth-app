import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  redirectPath = '/signin',
}) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading if authentication is still being checked
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // Redirect to signin if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // Render the protected component
  return <Outlet />;
};

export default ProtectedRoute;
